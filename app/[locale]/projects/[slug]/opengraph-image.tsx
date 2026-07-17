import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/data";
import { isLocale } from "@/i18n/locales";

export const alt = "Product case study — Yoann Andrieux";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const study = isLocale(locale) ? getCaseStudy(locale, slug) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          color: "#111827",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>YOANN ANDRIEUX</span>
          <span style={{ color: "#64748B" }}>PRODUCT CASE STUDY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 82, fontWeight: 800 }}>{study?.name ?? "Case study"}</div>
          <div style={{ maxWidth: 980, fontSize: 38, lineHeight: 1.2, color: "#334155" }}>
            {study?.tagline ?? "Architecture, UX, quality and delivery"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24 }}>
          <span style={{ width: 180, height: 10, borderRadius: 999, background: study?.accent ?? "#2457E6" }} />
          <span>React Native · React / Next.js · Product · Quality</span>
        </div>
      </div>
    ),
    size
  );
}
