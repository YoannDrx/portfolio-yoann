"use client";

import { useCallback, useRef, useState } from "react";
import { Download, Printer, Share2, Check } from "lucide-react";
import type { Locale } from "@/i18n/locales";

interface CvViewPageProps {
  locale: Locale;
  cvHtml: string;
}

const texts = {
  fr: {
    print: "Imprimer",
    download: "Télécharger PDF",
    downloading: "Téléchargement...",
    share: "Copier le lien",
    shared: "Lien copié !",
    title: "CV — Yoann Andrieux",
  },
  en: {
    print: "Print",
    download: "Download PDF",
    downloading: "Downloading...",
    share: "Copy link",
    shared: "Link copied!",
    title: "Resume — Yoann Andrieux",
  },
};

export function CvViewPage({ locale, cvHtml }: CvViewPageProps) {
  const t = texts[locale] ?? texts.fr;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        locale === "en"
          ? "Resume_Yoann_Andrieux_2026.pdf"
          : "CV_Yoann_Andrieux_2026.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [locale, isDownloading]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t.title}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {copied ? t.shared : t.share}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">{t.print}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isDownloading ? t.downloading : t.download}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: "210mm" }}>
          <iframe
            ref={iframeRef}
            srcDoc={cvHtml}
            className="w-full border-0 rounded-lg shadow-2xl bg-white"
            style={{ height: "calc(297mm * 2 + 16px)", minHeight: "80vh" }}
            title={t.title}
          />
        </div>
      </div>
    </div>
  );
}
