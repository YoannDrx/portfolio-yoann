"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const copy = {
  fr: {
    title: "Une erreur est survenue",
    description:
      "Quelque chose s'est mal passé. Veuillez réessayer.",
    retry: "Réessayer",
  },
  en: {
    title: "Something went wrong",
    description:
      "An unexpected error occurred. Please try again.",
    retry: "Try again",
  },
} as const;

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useI18n();
  const t = locale === "en" ? copy.en : copy.fr;

  useEffect(() => {
    console.error("Locale error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">Oops</h1>
        <h2 className="text-2xl font-semibold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground max-w-md">{t.description}</p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          {t.retry}
        </button>
      </div>
    </div>
  );
}
