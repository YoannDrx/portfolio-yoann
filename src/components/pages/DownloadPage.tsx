"use client";

import { useDownload } from "@/hooks/use-download";
import { DownloadAssetCard } from "@/components/download/DownloadAssetCard";
import { getAssetsByCategory, type DownloadAsset } from "@/data/download-assets";
import { getUiTexts } from "@/data/config";
import type { Locale } from "@/i18n/locales";

interface DownloadPageProps {
  locale: Locale;
}

function AssetGrid({
  assets,
  locale,
  columns,
  download,
  isLoading,
  texts,
}: {
  assets: DownloadAsset[];
  locale: Locale;
  columns: "banners" | "portrait" | "circle" | "social";
  download: (id: string, url: string, filename: string) => void;
  isLoading: (id: string) => boolean;
  texts: {
    previewButton: string;
    previewTitle: string;
    downloadButton: string;
    downloading: string;
    formatLabel: string;
    dimensionsLabel: string;
  };
}) {
  const gridClass = {
    banners: "grid grid-cols-1 lg:grid-cols-2 gap-4",
    portrait: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
    circle: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
    social: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  }[columns];

  return (
    <div className={gridClass}>
      {assets.map((asset) => (
        <DownloadAssetCard
          key={asset.id}
          asset={asset}
          locale={locale}
          onDownload={download}
          isLoading={isLoading(asset.id)}
          texts={texts}
        />
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight mb-1">{children}</h2>
  );
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-muted-foreground mb-3">
      {children}
    </h3>
  );
}

export function DownloadPage({ locale }: DownloadPageProps) {
  const { download, isLoading } = useDownload();
  const ui = getUiTexts(locale);
  const texts = (ui as Record<string, unknown>).download as {
    pageTitle: string;
    pageSubtitle: string;
    sectionBanners: string;
    sectionPortraitRaw: string;
    sectionPortrait: string;
    sectionPortraitHalo: string;
    sectionPortraitSolid: string;
    sectionCircle: string;
    sectionCircleHalo: string;
    sectionCircleSolid: string;
    sectionCirclePlain: string;
    sectionCircleBustHalo: string;
    sectionCircleBust: string;
    sectionSocial: string;
    sectionDocuments: string;
    previewButton: string;
    previewTitle: string;
    downloadButton: string;
    downloading: string;
    formatLabel: string;
    dimensionsLabel: string;
  };

  const banners = getAssetsByCategory("banner");
  const portraits = getAssetsByCategory("portrait");
  const circles = getAssetsByCategory("circle");
  const socials = getAssetsByCategory("social");
  const documents = getAssetsByCategory("document");

  const portraitRaw = portraits.filter((a) => a.id === "portrait-raw");
  const portraitHalo = portraits.filter((a) => a.id.includes("halo"));
  const portraitSolid = portraits.filter((a) => !a.id.includes("halo") && a.id !== "portrait-raw");
  const circleHalo = circles.filter((a) => a.id.includes("halo") && !a.id.startsWith("bust-"));
  const circleSolid = circles.filter((a) => !a.id.includes("halo") && !a.id.includes("plain") && !a.id.startsWith("bust-"));
  const circleBustHalo = circles.filter((a) => a.id.startsWith("bust-halo-"));
  const circleBust = circles.filter((a) => a.id.startsWith("bust-") && !a.id.includes("halo"));
  const circlePlain = circles.filter((a) => a.id.includes("plain"));

  const downloadTexts = {
    previewButton: texts.previewButton,
    previewTitle: texts.previewTitle,
    downloadButton: texts.downloadButton,
    downloading: texts.downloading,
    formatLabel: texts.formatLabel,
    dimensionsLabel: texts.dimensionsLabel,
  };

  const handleCvDownload = (id: string, _url: string, filename: string) => {
    // CV uses POST
    const doDownload = async () => {
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
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    doDownload();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {texts.pageTitle}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {texts.pageSubtitle}
          </p>
        </div>

        <div className="space-y-12">
          {/* Banners */}
          <section>
            <SectionTitle>{texts.sectionBanners}</SectionTitle>
            <p className="text-sm text-muted-foreground mb-4">1584 × 396 px · PNG</p>
            <AssetGrid
              assets={banners}
              locale={locale}
              columns="banners"
              download={download}
              isLoading={isLoading}
              texts={downloadTexts}
            />
          </section>

          {/* Portrait Raw */}
          <section>
            <SectionTitle>{texts.sectionPortraitRaw}</SectionTitle>
            <p className="text-sm text-muted-foreground mb-4">1024 × 1536 px · PNG</p>
            <AssetGrid
              assets={portraitRaw}
              locale={locale}
              columns="portrait"
              download={download}
              isLoading={isLoading}
              texts={downloadTexts}
            />
          </section>

          {/* Portrait Photos */}
          <section>
            <SectionTitle>{texts.sectionPortrait}</SectionTitle>
            <p className="text-sm text-muted-foreground mb-6">1400 × 2100 px</p>

            <div className="space-y-6">
              <div>
                <SubSectionTitle>{texts.sectionPortraitHalo}</SubSectionTitle>
                <AssetGrid
                  assets={portraitHalo}
                  locale={locale}
                  columns="portrait"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>

              <div>
                <SubSectionTitle>{texts.sectionPortraitSolid}</SubSectionTitle>
                <AssetGrid
                  assets={portraitSolid}
                  locale={locale}
                  columns="portrait"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>
            </div>
          </section>

          {/* Circle Medallions */}
          <section>
            <SectionTitle>{texts.sectionCircle}</SectionTitle>
            <p className="text-sm text-muted-foreground mb-6">1024 × 1024 px</p>

            <div className="space-y-6">
              <div>
                <SubSectionTitle>{texts.sectionCircleHalo}</SubSectionTitle>
                <AssetGrid
                  assets={circleHalo}
                  locale={locale}
                  columns="circle"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>

              <div>
                <SubSectionTitle>{texts.sectionCircleSolid}</SubSectionTitle>
                <AssetGrid
                  assets={circleSolid}
                  locale={locale}
                  columns="circle"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>

              <div>
                <SubSectionTitle>{texts.sectionCircleBustHalo}</SubSectionTitle>
                <AssetGrid
                  assets={circleBustHalo}
                  locale={locale}
                  columns="circle"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>

              <div>
                <SubSectionTitle>{texts.sectionCircleBust}</SubSectionTitle>
                <AssetGrid
                  assets={circleBust}
                  locale={locale}
                  columns="circle"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>

              <div>
                <SubSectionTitle>{texts.sectionCirclePlain}</SubSectionTitle>
                <AssetGrid
                  assets={circlePlain}
                  locale={locale}
                  columns="circle"
                  download={download}
                  isLoading={isLoading}
                  texts={downloadTexts}
                />
              </div>
            </div>
          </section>

          {/* Social */}
          <section>
            <SectionTitle>{texts.sectionSocial}</SectionTitle>
            <AssetGrid
              assets={socials}
              locale={locale}
              columns="social"
              download={download}
              isLoading={isLoading}
              texts={downloadTexts}
            />
          </section>

          {/* Documents */}
          <section>
            <SectionTitle>{texts.sectionDocuments}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((asset) => (
                <DownloadAssetCard
                  key={asset.id}
                  asset={asset}
                  locale={locale}
                  onDownload={handleCvDownload}
                  isLoading={isLoading(asset.id)}
                  texts={downloadTexts}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
