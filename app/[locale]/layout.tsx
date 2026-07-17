import type { ReactNode } from "react";
import type { Metadata } from "next";
import { I18nProvider } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/locales";
import { getProfile, getSiteConfig, getSocialLinks } from "@/data";

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
      absolute: title,
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
  const profile = getProfile(locale);
  const siteConfig = getSiteConfig(locale);
  const socialLinks = getSocialLinks(locale);

  const sameAs = socialLinks
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${profile.firstName} ${profile.lastName}`,
    jobTitle: profile.title,
    url: siteConfig.url,
    sameAs,
    knowsAbout: siteConfig.seo.keywords,
  };

  return (
    <I18nProvider locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </I18nProvider>
  );
}
