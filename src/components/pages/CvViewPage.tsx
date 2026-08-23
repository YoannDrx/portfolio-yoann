"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Download, Printer, Share2 } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { trackPortfolioEvent } from "@/lib/analytics";

interface CvViewPageProps { locale: Locale; cvHtml: string; }

const texts = {
  fr: { print: "Imprimer", download: "Télécharger PDF", downloading: "Téléchargement…", share: "Copier le lien", shared: "Lien copié !", title: "CV — Yoann Andrieux", description: "Version complète, éditoriale et prête à imprimer" },
  en: { print: "Print", download: "Download PDF", downloading: "Downloading…", share: "Copy link", shared: "Link copied!", title: "Resume — Yoann Andrieux", description: "Complete editorial version, ready to print" },
};

export function CvViewPage({ locale, cvHtml }: CvViewPageProps) {
  const t = texts[locale] ?? texts.fr;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = useCallback(() => iframeRef.current?.contentWindow?.print(), []);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const res = await fetch("/api/cv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale }) });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${locale === "en" ? "Resume" : "CV"}_Yoann_Andrieux_2026.pdf`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      trackPortfolioEvent("cv_downloaded", { variant: "visual", locale, mode: "cv_page" });
    } finally { setIsDownloading(false); }
  }, [isDownloading, locale]);

  const handleShare = useCallback(async () => {
    const url = new URL(window.location.href); url.searchParams.delete("variant");
    try { await navigator.clipboard.writeText(url.toString()); }
    catch { const input = document.createElement("input"); input.value = url.toString(); document.body.appendChild(input); input.select(); document.execCommand("copy"); document.body.removeChild(input); }
    setCopied(true); window.setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="liquid-canvas min-h-screen">
      <div className="sticky top-0 z-50 border-b border-white/60 bg-background/76 backdrop-blur-2xl dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div><h1 className="text-sm font-semibold">{t.title}</h1><p className="hidden text-[11px] text-muted-foreground sm:block">{t.description}</p></div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={handleShare} className="liquid-button !min-h-10 !px-3">{copied ? <Check className="size-4 text-emerald-500" /> : <Share2 className="size-4" />}<span className="sr-only sm:not-sr-only">{copied ? t.shared : t.share}</span></button>
            <button type="button" onClick={handlePrint} className="liquid-button !min-h-10 !px-3"><Printer className="size-4" /><span className="sr-only sm:not-sr-only">{t.print}</span></button>
            <button type="button" onClick={handleDownload} disabled={isDownloading} className="liquid-button liquid-button-primary !min-h-10 !px-3"><Download className="size-4" /><span className="sr-only sm:not-sr-only">{isDownloading ? t.downloading : t.download}</span></button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-3 py-8 sm:px-4">
        <div className="mx-auto" style={{ maxWidth: "210mm" }}>
          <iframe ref={iframeRef} srcDoc={cvHtml} className="w-full rounded-lg border-0 bg-white shadow-2xl" style={{ height: "calc(297mm * 2 + 16px)", minHeight: "80vh" }} title={t.title} />
        </div>
      </div>
    </div>
  );
}
