"use client";

import { useCallback, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "@/hooks/use-toast";
import { trackPortfolioEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PDFDownloadButtonProps { className?: string; }

const PDFDownloadButton = ({ className }: PDFDownloadButtonProps) => {
  const { locale } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const download = useCallback(async () => {
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
      const prefix = locale === "en" ? "Resume" : "CV";
      link.href = url;
      link.download = `${prefix}_Yoann_Andrieux_2026.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      trackPortfolioEvent("cv_downloaded", { variant: "visual", locale, mode: window.matchMedia("(max-width: 767px)").matches ? "iphone" : "web" });
    } catch {
      toast({
        title: locale === "en" ? "Download failed" : "Téléchargement impossible",
        description: locale === "en" ? "The resume could not be generated. Please try again." : "Le CV n’a pas pu être généré. Réessayez dans un instant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  return (
    <button type="button" onClick={download} disabled={isLoading} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-55", className)}>
      {isLoading ? <LoaderCircle className="size-4 animate-spin" /> : <Download className="size-4" />}
      {isLoading ? (locale === "en" ? "Generating…" : "Génération…") : "PDF"}
    </button>
  );
};

export default PDFDownloadButton;
