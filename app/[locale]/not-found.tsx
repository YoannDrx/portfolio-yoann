"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

const copy = {
  fr: {
    title: "Page non trouvée",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  en: {
    title: "Page not found",
    description: "The page you’re looking for doesn’t exist or has been moved.",
    back: "Back to home",
  },
} as const;

export default function NotFound() {
  const { locale } = useI18n();
  const t = locale === "en" ? copy.en : copy.fr;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">{t.title}</h2>
        <p className="text-muted-foreground max-w-md">{t.description}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}

