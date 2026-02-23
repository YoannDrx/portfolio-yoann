import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { I18nProvider } from "@/i18n/I18nProvider";
import { DownloadPage } from "@/components/pages/DownloadPage";
import { getProfile } from "@/data";

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

  const title =
    locale === "en"
      ? `Resources — ${profile.firstName} ${profile.lastName}`
      : `Ressources — ${profile.firstName} ${profile.lastName}`;

  const description =
    locale === "en"
      ? "Download profile photos, LinkedIn banners and social media assets"
      : "Téléchargez photos de profil, bannières LinkedIn et assets réseaux sociaux";

  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "fr";

  return (
    <I18nProvider locale={locale}>
      <DownloadPage locale={locale} />
    </I18nProvider>
  );
}
