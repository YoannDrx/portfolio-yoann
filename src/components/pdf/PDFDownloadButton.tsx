/**
 * PDFDownloadButton
 * Bouton de téléchargement PDF via API route
 */

"use client";

import { useState, useCallback } from "react";
import { Download } from "lucide-react";
import { IOSButton } from "../ios";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "@/hooks/use-toast";

interface PDFDownloadButtonProps {
  className?: string;
}

const PDFDownloadButton = ({ className }: PDFDownloadButtonProps) => {
  const { locale } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!res.ok) throw new Error("PDF generation failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        locale === "en"
          ? "Resume_Yoann_Andrieux_2026.pdf"
          : "CV_Yoann_Andrieux_2026.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: locale === "en" ? "Download failed" : "Téléchargement impossible",
        description:
          locale === "en"
            ? "The resume could not be generated. Please try again."
            : "Le CV n’a pas pu être généré. Réessayez dans un instant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  return (
    <IOSButton
      variant="ghost"
      size="sm"
      isLoading={isLoading}
      onClick={handleClick}
      aria-label={
        locale === "en"
          ? "Download the resume as PDF"
          : "Télécharger le CV en PDF"
      }
      className={className}
    >
      <Download className="h-4 w-4" />
      PDF
    </IOSButton>
  );
};

export default PDFDownloadButton;
