/**
 * PDFDownloadButton
 * Bouton de téléchargement PDF avec lazy loading complet côté client
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import { IOSButton } from "../ios";
import { useI18n } from "@/i18n/I18nProvider";

interface PDFDownloadButtonProps {
  className?: string;
}

const PDFDownloadButton = ({ className }: PDFDownloadButtonProps) => {
  const { locale } = useI18n();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [PDFComponents, setPDFComponents] = useState<{
    PDFDownloadLink: any;
    CVDocument: any;
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePreload = useCallback(() => {
    if (!PDFComponents && isClient) {
      // Pre-load les composants PDF au hover
      Promise.all([import("@react-pdf/renderer"), import("./CVDocument")]).then(([pdfRenderer, cvDoc]) => {
        setPDFComponents({
          PDFDownloadLink: pdfRenderer.PDFDownloadLink,
          CVDocument: cvDoc.default,
        });
      });
    }
  }, [PDFComponents, isClient]);

  const handleClick = useCallback(async () => {
    if (PDFComponents) return; // Déjà chargé, le lien gérera le téléchargement

    setIsLoading(true);
    try {
      const [pdfRenderer, cvDoc] = await Promise.all([import("@react-pdf/renderer"), import("./CVDocument")]);
      const CVDocument = cvDoc.default;
      const pdfBlob = await pdfRenderer.pdf(<CVDocument locale={locale} />).toBlob();

      // Créer le lien de téléchargement
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = locale === 'en' ? 'Resume_Yoann_Andrieux_2025.pdf' : 'CV_Yoann_Andrieux_2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Sauvegarder les composants pour les prochains clics
      setPDFComponents({
        PDFDownloadLink: pdfRenderer.PDFDownloadLink,
        CVDocument: cvDoc.default,
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    } finally {
      setIsLoading(false);
    }
  }, [PDFComponents, locale]);

  if (!isClient) {
    return (
      <IOSButton variant="ghost" size="sm" disabled className={className}>
        <Download className="w-4 h-4" />
        PDF
      </IOSButton>
    );
  }

  // Si les composants sont chargés, utiliser PDFDownloadLink
  if (PDFComponents) {
    const { PDFDownloadLink, CVDocument } = PDFComponents;
    return (
      <PDFDownloadLink
        document={<CVDocument locale={locale} />}
        fileName={locale === 'en' ? 'Resume_Yoann_Andrieux_2025.pdf' : 'CV_Yoann_Andrieux_2025.pdf'}
      >
        {({ loading }: { loading: boolean }) => (
          <IOSButton
            variant="ghost"
            size="sm"
            isLoading={loading}
            aria-label={locale === 'en' ? 'Download the resume as PDF' : 'Télécharger le CV en PDF'}
            className={className}
          >
            <Download className="w-4 h-4" />
            PDF
          </IOSButton>
        )}
      </PDFDownloadLink>
    );
  }

  // Sinon, bouton qui charge et télécharge au clic
  return (
    <IOSButton
      variant="ghost"
      size="sm"
      isLoading={isLoading}
      onClick={handleClick}
      onMouseEnter={handlePreload}
      onFocus={handlePreload}
      aria-label={locale === 'en' ? 'Download the resume as PDF' : 'Télécharger le CV en PDF'}
      className={className}
    >
      <Download className="w-4 h-4" />
      PDF
    </IOSButton>
  );
};

export default PDFDownloadButton;
