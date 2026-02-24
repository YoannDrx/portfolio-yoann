/**
 * Profile Image Generator
 * Playwright+CSS pipeline for portrait, circle & square profile images with halo effects.
 * Uses the same brightness(0) invert(1) + drop-shadow() technique as the hero/banner
 * for premium-quality anti-aliased strokes and smooth organic glow.
 */

import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";
import { renderHtmlToImage } from "./browser";

export interface GenerateProfileImageOptions {
  shape: "portrait" | "circle" | "square" | "raw";
  background:
    | "transparent"
    | "dark"
    | "light"
    | "primary"
    | "midnight"
    | "ocean"
    | "forest"
    | "plum"
    | "sunset"
    | "royal";
  haloColor: string | null; // hex like "#007AFF"
  preview: boolean;
}

const BG_COLORS: Record<string, string> = {
  dark: "#0a0a1a",
  light: "#f5f5f7",
  primary: "#007AFF",
  midnight: "#14182b",
  ocean: "#12253a",
  forest: "#14281d",
  plum: "#2a1730",
  sunset: "#3a2413",
  royal: "#1f2458",
};

// Source image dimensions
const SRC_W = 1024;
const SRC_H = 1536;

// Output dimensions
const PORTRAIT_OUT_W = 1400;
const PORTRAIT_OUT_H = 2100;
const CIRCLE_OUT = 1024;
const SQUARE_OUT = 1024;

// Subject sizing per shape
const PORTRAIT_SUBJECT_SCALE = 0.88;
const CIRCLE_SUBJECT_HEIGHT_RATIO = 0.96;
const CIRCLE_VERTICAL_SHIFT = 10;
const SQUARE_SUBJECT_SCALE = 0.86;
const SQUARE_VERTICAL_SHIFT = 20;

function hexToRgbCss(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export async function generateProfileImage(
  options: GenerateProfileImageOptions
): Promise<Buffer> {
  const imagePath = join(process.cwd(), "public/images/yoann-profile-nobg.png");

  // RAW: just return the source image as-is
  if (options.shape === "raw") {
    let raw = sharp(imagePath).png();
    if (options.preview) {
      raw = raw.resize(400, Math.round((400 * SRC_H) / SRC_W));
    }
    return raw.toBuffer();
  }

  const isCircle = options.shape === "circle";
  const isSquare = options.shape === "square";
  const outW = isCircle ? CIRCLE_OUT : isSquare ? SQUARE_OUT : PORTRAIT_OUT_W;
  const outH = isCircle ? CIRCLE_OUT : isSquare ? SQUARE_OUT : PORTRAIT_OUT_H;

  // Encode source as base64 data URI
  const imageBase64 = readFileSync(imagePath).toString("base64");
  const dataUri = `data:image/png;base64,${imageBase64}`;

  // Generate HTML template
  const html = renderProfileHtml(
    options.shape,
    options.background,
    options.haloColor,
    dataUri,
    outW,
    outH
  );

  // Render via browser (Puppeteer on Vercel, Playwright locally)
  const isTransparent = options.background === "transparent";

  const screenshot = await renderHtmlToImage({
    html,
    width: outW,
    height: outH,
    fullPage: true,
    omitBackground: isTransparent,
  });

  // Preview resize
  if (options.preview) {
    const pw = 400;
    const ph = Math.round((pw * outH) / outW);
    return sharp(screenshot).resize(pw, ph).png().toBuffer();
  }

  return Buffer.from(screenshot);
}

// ─── HTML Template Dispatch ────────────────────────────────────

function renderProfileHtml(
  shape: "portrait" | "circle" | "square",
  background: string,
  haloColor: string | null,
  dataUri: string,
  outW: number,
  outH: number
): string {
  switch (shape) {
    case "portrait":
      return renderPortraitHtml(background, haloColor, dataUri, outW, outH);
    case "circle":
      return renderCircleHtml(background, haloColor, dataUri, outW, outH);
    case "square":
      return renderSquareHtml(background, haloColor, dataUri, outW, outH);
  }
}

// ─── Portrait Template (1400x2100) ─────────────────────────────

function renderPortraitHtml(
  background: string,
  haloColor: string | null,
  dataUri: string,
  outW: number,
  outH: number
): string {
  const bgCss =
    background === "transparent"
      ? "transparent"
      : BG_COLORS[background] || "transparent";
  const subjectH = Math.round(SRC_H * PORTRAIT_SUBJECT_SCALE);
  const haloRgb = haloColor ? hexToRgbCss(haloColor) : "";

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: ${outW}px; height: ${outH}px;
  position: relative; overflow: hidden;
  background: ${bgCss};
}
.halo {
  position: absolute;
  bottom: 12%; left: 50%; transform: translateX(-50%);
  width: ${Math.round(outW * 0.78)}px;
  height: ${Math.round(outH * 0.52)}px;
  background: radial-gradient(circle, rgba(${haloRgb}, 0.12) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}
.stroke-layer {
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%) scale(1.012);
  transform-origin: bottom center;
  height: ${subjectH}px; width: auto;
  filter: brightness(0) invert(1)
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 14px rgba(${haloRgb}, 0.3));
  pointer-events: none;
}
.subject {
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%);
  height: ${subjectH}px; width: auto;
}
</style></head>
<body>
${haloColor ? `<div class="halo"></div>` : ""}
${haloColor ? `<img src="${dataUri}" class="stroke-layer" />` : ""}
<img src="${dataUri}" class="subject" />
</body></html>`;
}

// ─── Circle Template (1024x1024) ───────────────────────────────

function renderCircleHtml(
  background: string,
  haloColor: string | null,
  dataUri: string,
  outW: number,
  outH: number
): string {
  const bgCss =
    background === "transparent"
      ? "transparent"
      : BG_COLORS[background] || "transparent";
  const subjectH = Math.round(CIRCLE_OUT * CIRCLE_SUBJECT_HEIGHT_RATIO);
  const haloRgb = haloColor ? hexToRgbCss(haloColor) : "";

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: ${outW}px; height: ${outH}px;
  position: relative; overflow: hidden;
  background: ${bgCss};
}
.halo {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: ${Math.round(outW * 0.85)}px;
  height: ${Math.round(outH * 0.85)}px;
  background: radial-gradient(circle, rgba(${haloRgb}, 0.15) 0%, transparent 70%);
  filter: blur(30px);
  pointer-events: none;
}
.stroke-wrapper {
  position: absolute; inset: 0;
  transform: scale(1.012);
  transform-origin: center center;
  filter: brightness(0) invert(1)
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 14px rgba(${haloRgb}, 0.3));
  pointer-events: none;
}
.circle-clip {
  width: ${outW}px; height: ${outH}px;
  border-radius: 50%; overflow: hidden;
  position: relative;
}
.circle-img {
  position: absolute;
  bottom: ${-CIRCLE_VERTICAL_SHIFT}px;
  left: 50%; transform: translateX(-50%);
  height: ${subjectH}px; width: auto;
}
.subject-clip {
  position: absolute; inset: 0;
  border-radius: 50%; overflow: hidden;
}
</style></head>
<body>
${haloColor ? `<div class="halo"></div>` : ""}
${haloColor ? `<div class="stroke-wrapper"><div class="circle-clip"><img src="${dataUri}" class="circle-img" /></div></div>` : ""}
<div class="subject-clip"><img src="${dataUri}" class="circle-img" /></div>
</body></html>`;
}

// ─── Square Template (1024x1024) ───────────────────────────────

function renderSquareHtml(
  background: string,
  haloColor: string | null,
  dataUri: string,
  outW: number,
  outH: number
): string {
  const bgCss =
    background === "transparent"
      ? "transparent"
      : BG_COLORS[background] || "transparent";
  const innerSize = Math.round(outW * SQUARE_SUBJECT_SCALE);
  const offset = Math.round((outW - innerSize) / 2);
  const topPos = offset + SQUARE_VERTICAL_SHIFT;
  const haloRgb = haloColor ? hexToRgbCss(haloColor) : "";

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: ${outW}px; height: ${outH}px;
  position: relative; overflow: hidden;
  background: ${bgCss};
}
.halo {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: ${Math.round(outW * 0.8)}px;
  height: ${Math.round(outH * 0.8)}px;
  background: radial-gradient(circle, rgba(${haloRgb}, 0.12) 0%, transparent 70%);
  filter: blur(30px);
  pointer-events: none;
}
.stroke-wrapper {
  position: absolute;
  top: ${topPos}px; left: ${offset}px;
  width: ${innerSize}px; height: ${innerSize}px;
  transform: scale(1.012);
  transform-origin: center center;
  filter: brightness(0) invert(1)
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 14px rgba(${haloRgb}, 0.3));
  pointer-events: none;
}
.square-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
}
.subject-wrapper {
  position: absolute;
  top: ${topPos}px; left: ${offset}px;
  width: ${innerSize}px; height: ${innerSize}px;
}
</style></head>
<body>
${haloColor ? `<div class="halo"></div>` : ""}
${haloColor ? `<div class="stroke-wrapper"><img src="${dataUri}" class="square-img" /></div>` : ""}
<div class="subject-wrapper"><img src="${dataUri}" class="square-img" /></div>
</body></html>`;
}
