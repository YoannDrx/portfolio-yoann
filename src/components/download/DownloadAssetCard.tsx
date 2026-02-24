"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { IOSCard } from "@/components/ios/IOSCard";
import { IOSButton } from "@/components/ios/IOSButton";
import type { DownloadAsset } from "@/data/download-assets";
import type { Locale } from "@/i18n/locales";

interface DownloadAssetCardProps {
  asset: DownloadAsset;
  locale: Locale;
  onDownload: (id: string, url: string, filename: string) => void;
  isLoading: boolean;
  texts: {
    downloadButton: string;
    downloading: string;
    formatLabel: string;
    dimensionsLabel: string;
  };
}

export function DownloadAssetCard({
  asset,
  locale,
  onDownload,
  isLoading,
  texts,
}: DownloadAssetCardProps) {
  const assetVersion = "20260224-portrait-fix-2";
  const withVersion = (url: string) =>
    `${url}${url.includes("?") ? "&" : "?"}v=${assetVersion}`;

  const isTransparent =
    asset.id.includes("halo") ||
    asset.id === "profile-square" ||
    asset.format === "PNG";

  const isBanner = asset.category === "banner";
  const isDocument = asset.category === "document";

  return (
    <IOSCard variant="subtle" padding="none" rounded="md">
      {/* Preview */}
      {!isDocument && (
        <div
          className={`relative w-full overflow-hidden rounded-t-2xl ${
            isBanner ? "aspect-[4/1]" : "aspect-square"
          } ${
            isTransparent
              ? "bg-[length:20px_20px] bg-[image:linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(-45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(45deg,transparent_75%,hsl(var(--muted))_75%),linear-gradient(-45deg,transparent_75%,hsl(var(--muted))_75%)] bg-[position:0_0,0_10px,10px_-10px,-10px_0]"
              : "bg-muted"
          }`}
        >
          <Image
            src={withVersion(asset.previewUrl)}
            alt={asset.title[locale]}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}

      {/* Document placeholder */}
      {isDocument && (
        <div className="flex items-center justify-center aspect-[4/3] bg-muted/50 rounded-t-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm text-muted-foreground font-medium">PDF · A4</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm leading-tight">
            {asset.title[locale]}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {asset.description[locale]}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {texts.dimensionsLabel}: {asset.dimensions.width}×
            {asset.dimensions.height}
          </span>
          <span>
            {texts.formatLabel}: {asset.format}
          </span>
        </div>

        <IOSButton
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<Download className="size-4" />}
          isLoading={isLoading}
          onClick={() =>
            onDownload(asset.id, withVersion(asset.apiUrl), asset.filename[locale])
          }
        >
          {isLoading ? texts.downloading : texts.downloadButton}
        </IOSButton>
      </div>
    </IOSCard>
  );
}
