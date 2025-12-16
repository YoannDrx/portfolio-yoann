import type { ReactNode } from "react";
import type { Metadata } from "next";
import { I18nProvider } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/locales";
import { getProfile, getSiteConfig } from "@/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "fr";

  const profile = getProfile(locale);
  const siteConfig = getSiteConfig(locale);

  const title = `${profile.firstName} ${profile.lastName} — ${profile.title}`;
  const description = siteConfig.seo.description;

  return {
    title: {
      default: title,
      template: `%s — ${profile.firstName} ${profile.lastName}`,
    },
    description,
    keywords: siteConfig.seo.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: `${profile.firstName} ${profile.lastName}`,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <I18nProvider locale={locale}>
      {children}
    </I18nProvider>
  );
}
