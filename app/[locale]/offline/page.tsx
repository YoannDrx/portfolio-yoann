"use client";

import { RefreshCw, WifiOff } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const offlineCopy = {
  fr: {
    title: "Vous êtes hors ligne",
    description: (
      <>
        Impossible de charger cette page.
        <br />
        Vérifiez votre connexion internet.
      </>
    ),
    retry: "Réessayer",
    tipLabel: "Astuce :",
    tipText: "Les pages déjà visitées sont disponibles hors ligne.",
    brand: "Yoann Andrieux • Portfolio",
  },
  en: {
    title: "You're offline",
    description: (
      <>
        This page can’t be loaded right now.
        <br />
        Check your internet connection.
      </>
    ),
    retry: "Retry",
    tipLabel: "Tip:",
    tipText: "Pages you already visited are available offline.",
    brand: "Yoann Andrieux • Portfolio",
  },
} as const;

export default function OfflinePage() {
  const { locale } = useI18n();
  const copy = locale === "en" ? offlineCopy.en : offlineCopy.fr;

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 w-28 h-28 mx-auto bg-gradient-to-br from-[#0070F3]/30 to-[#00C4CC]/20 rounded-full blur-xl" />
          <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#0070F3] to-[#00C4CC] flex items-center justify-center shadow-lg">
            <WifiOff className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1D1D1F] mb-3">
          {copy.title}
        </h1>

        <p className="text-[#86868B] mb-8 leading-relaxed">
          {copy.description}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0070F3] hover:bg-[#0062D9] text-white rounded-xl font-semibold transition-colors shadow-lg shadow-[#0070F3]/25"
        >
          <RefreshCw className="w-5 h-5" />
          {copy.retry}
        </button>

        <div className="mt-12 p-4 bg-white/60 rounded-2xl border border-[#E5E5E7]">
          <p className="text-sm text-[#86868B]">
            <span className="font-medium text-[#1D1D1F]">{copy.tipLabel}</span>{" "}
            {copy.tipText}
          </p>
        </div>

        <p className="mt-8 text-xs text-[#C7C7CC]">
          {copy.brand}
        </p>
      </div>
    </div>
  );
}
