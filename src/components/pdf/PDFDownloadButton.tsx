/**
 * PDFDownloadButton
 * Bouton de téléchargement PDF avec lazy loading complet côté client
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import { IOSButton } from '../ios';

interface PDFDownloadButtonProps {
  className?: string;
}

const PDFDownloadButton = ({ className }: PDFDownloadButtonProps) => {
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
      Promise.all([
        import('@react-pdf/renderer'),
        import('./CVDocument'),
      ]).then(([pdfRenderer, cvDoc]) => {
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
      const [pdfRenderer, cvDoc, pdfBlob] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./CVDocument'),
        import('@react-pdf/renderer').then(async (mod) => {
          const { pdf } = mod;
          const CVDoc = (await import('./CVDocument')).default;
          return pdf(<CVDoc />).toBlob();
        }),
      ]);

      // Créer le lien de téléchargement
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Yoann_Andrieux_2025.pdf';
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
      console.error('Erreur lors de la génération du PDF:', error);
    } finally {
      setIsLoading(false);
    }
  }, [PDFComponents]);

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
        document={<CVDocument />}
        fileName="CV_Yoann_Andrieux_2025.pdf"
      >
        {({ loading }: { loading: boolean }) => (
          <IOSButton
            variant="ghost"
            size="sm"
            isLoading={loading}
            aria-label="Télécharger le CV en PDF"
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
      aria-label="Télécharger le CV en PDF"
      className={className}
    >
      <Download className="w-4 h-4" />
      PDF
    </IOSButton>
  );
};

export default PDFDownloadButton;
