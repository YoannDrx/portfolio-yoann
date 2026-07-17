import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { getProfile } from "@/data";
import { renderCvHtml } from "@/lib/cv-renderer";
import { CvViewPage } from "@/components/pages/CvViewPage";

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
      ? `Resume — ${profile.firstName} ${profile.lastName} — React / Next.js Product Developer`
      : `CV — ${profile.firstName} ${profile.lastName} — Développeur produit React / Next.js`;

  const description =
    locale === "en"
      ? `View the resume of ${profile.firstName} ${profile.lastName}, React / Next.js product developer`
      : `Consultez le CV de ${profile.firstName} ${profile.lastName}, développeur produit React / Next.js`;

  return {
    title,
    description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "fr";

  const cvHtml = renderCvHtml(locale);

  return <CvViewPage locale={locale} cvHtml={cvHtml} />;
}
