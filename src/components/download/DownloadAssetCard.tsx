"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Eye } from "lucide-react";
import { IOSCard } from "@/components/ios/IOSCard";
import { IOSButton } from "@/components/ios/IOSButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { DownloadAsset } from "@/data/download-assets";
import type { Locale } from "@/i18n/locales";

interface DownloadAssetCardProps {
  asset: DownloadAsset;
  locale: Locale;
  onDownload: (id: string, url: string, filename: string) => void;
  isLoading: boolean;
  texts: {
    previewButton: string;
    previewTitle: string;
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const assetVersion = "20260224-portrait-fix-6";
  const withVersion = (url: string) =>
    `${url}${url.includes("?") ? "&" : "?"}v=${assetVersion}`;

  const isTransparent = /[?&]bg=transparent(?:&|$)/.test(asset.previewUrl);

  const isBanner = asset.category === "banner";
  const isDocument = asset.category === "document";
  const inlinePreviewUrl = withVersion(
    `${asset.apiUrl}${asset.apiUrl.includes("?") ? "&" : "?"}inline=true`
  );

  return (
    <>
      <IOSCard variant="subtle" padding="none" rounded="md">
        {/* Preview */}
        {!isDocument && (
          <div
            className={`relative w-full overflow-hidden rounded-t-2xl ${
              isBanner ? "aspect-[4/1] cursor-zoom-in" : "aspect-square"
            } ${
              isTransparent
                ? "bg-[length:20px_20px] bg-[image:linear-gradient(45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(-45deg,hsl(var(--muted))_25%,transparent_25%),linear-gradient(45deg,transparent_75%,hsl(var(--muted))_75%),linear-gradient(-45deg,transparent_75%,hsl(var(--muted))_75%)] bg-[position:0_0,0_10px,10px_-10px,-10px_0]"
                : "bg-muted"
            }`}
            onClick={isBanner ? () => setIsPreviewOpen(true) : undefined}
            onKeyDown={
              isBanner
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsPreviewOpen(true);
                    }
                  }
                : undefined
            }
            role={isBanner ? "button" : undefined}
            tabIndex={isBanner ? 0 : undefined}
          >
            <Image
              src={withVersion(asset.previewUrl)}
              alt={asset.title[locale]}
              fill
              className="object-contain"
              unoptimized
            />
            {isBanner && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/45 to-transparent px-2 py-2">
                <span className="inline-flex items-center gap-1 rounded-md border border-white/35 bg-black/40 px-2 py-1 text-xs font-medium text-white">
                  <Eye className="size-3" />
                  {texts.previewButton}
                </span>
              </div>
            )}
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

      {isBanner && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="w-[min(96vw,1584px)] max-w-[96vw] border-white/15 bg-black p-3">
            <DialogTitle className="px-1 text-sm font-medium text-white/85">
              {texts.previewTitle}
            </DialogTitle>
            <div className="relative aspect-[4/1] w-full overflow-hidden rounded-md bg-black">
              <Image
                src={inlinePreviewUrl}
                alt={asset.title[locale]}
                fill
                className="object-contain"
                unoptimized
                priority={isPreviewOpen}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
