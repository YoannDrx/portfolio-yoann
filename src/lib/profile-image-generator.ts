/**
 * Profile Image Generator
 * Sharp-based pipeline for portrait & circle profile images with halo effects
 */

import sharp from "sharp";
import { join } from "path";

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

// Source image is 1024x1536
const SRC_W = 1024;
const SRC_H = 1536;

// Output sizes
const PORTRAIT_OUT_W = 1400;
const PORTRAIT_OUT_H = 2100;
const CIRCLE_OUT = 1024;
const SQUARE_OUT = 1024;

// Subject scales / offsets per target format
const PORTRAIT_SUBJECT_SCALE = 0.88;
const CIRCLE_SUBJECT_SCALE = 0.78;
const SQUARE_SUBJECT_SCALE = 0.86;
const CIRCLE_VERTICAL_SHIFT = 34;
const SQUARE_VERTICAL_SHIFT = 20;

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
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
  const isRoundOrSquare = isCircle || isSquare;
  const outW = isCircle ? CIRCLE_OUT : isSquare ? SQUARE_OUT : PORTRAIT_OUT_W;
  const outH = isCircle ? CIRCLE_OUT : isSquare ? SQUARE_OUT : PORTRAIT_OUT_H;

  // 1. Load source at original size (1024x1536)
  const fullSource = await sharp(imagePath).ensureAlpha().png().toBuffer();

  // 2. Prepare subject positioned on the output canvas
  let subject: Buffer;
  let subjectTop: number;
  let subjectLeft: number;

  if (isRoundOrSquare) {
    // Use the upper square area then scale down to keep the bonnet clear from the top edge.
    const cropH = SRC_W; // 1024x1024 square from top
    const cropped = await sharp(fullSource)
      .extract({ left: 0, top: 0, width: SRC_W, height: cropH })
      .png()
      .toBuffer();

    const innerSize = Math.round(
      outW * (isCircle ? CIRCLE_SUBJECT_SCALE : SQUARE_SUBJECT_SCALE)
    );
    subject = await sharp(cropped)
      .resize(innerSize, innerSize)
      .png()
      .toBuffer();

    subjectLeft = Math.round((outW - innerSize) / 2);
    subjectTop = Math.round((outH - innerSize) / 2) + (isCircle ? CIRCLE_VERTICAL_SHIFT : SQUARE_VERTICAL_SHIFT);
  } else {
    // Portrait: slightly scale down and anchor to bottom to create more breathing room around the subject.
    const portraitW = Math.round(SRC_W * PORTRAIT_SUBJECT_SCALE);
    const portraitH = Math.round(SRC_H * PORTRAIT_SUBJECT_SCALE);
    subject = await sharp(fullSource)
      .resize(portraitW, portraitH)
      .png()
      .toBuffer();
    subjectLeft = Math.round((PORTRAIT_OUT_W - portraitW) / 2);
    subjectTop = PORTRAIT_OUT_H - portraitH;
  }

  // 3. Build the subject on canvas (for alpha extraction)
  const subjectOnCanvas = await sharp({
    create: { width: outW, height: outH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: subject, top: subjectTop, left: subjectLeft }])
    .png()
    .toBuffer();

  // 4. Extract alpha mask from the canvas-placed subject
  const alphaBuf = await sharp(subjectOnCanvas)
    .extractChannel(3)
    .raw()
    .toBuffer();

  // 5. Build compositing layers
  const layers: sharp.OverlayOptions[] = [];

  // Background
  if (options.background !== "transparent") {
    const c = BG_COLORS[options.background];
    const svg = `<svg width="${outW}" height="${outH}"><rect width="${outW}" height="${outH}" fill="${c}"/></svg>`;
    layers.push({ input: Buffer.from(svg), top: 0, left: 0 });
  }

  // Halo glow
  if (options.haloColor) {
    const halo = await buildHalo(alphaBuf, outW, outH, options.haloColor);
    layers.push({ input: halo, top: 0, left: 0 });
  }

  // White stroke (lisere)
  if (options.haloColor) {
    const stroke = await buildStroke(alphaBuf, outW, outH);
    layers.push({ input: stroke, top: 0, left: 0 });
  }

  // Subject on canvas (with circle mask if needed)
  if (isCircle) {
    const masked = await applyCircleMask(subjectOnCanvas, outW);
    layers.push({ input: masked, top: 0, left: 0 });
  } else {
    layers.push({ input: subjectOnCanvas, top: 0, left: 0 });
  }

  // 6. Compose — materialize first (Sharp runs resize BEFORE composite)
  const composed = await sharp({
    create: { width: outW, height: outH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(layers)
    .png()
    .toBuffer();

  // 7. Preview resize + export
  let output = sharp(composed);
  if (options.preview) {
    const pw = 400;
    const ph = Math.round((pw * outH) / outW);
    output = output.resize(pw, ph);
  }

  return output.png().toBuffer();
}

/**
 * Create a blurred halo glow from the alpha silhouette.
 */
async function buildHalo(
  alphaRaw: Buffer,
  width: number,
  height: number,
  color: string
): Promise<Buffer> {
  const { r, g, b } = hexToRgb(color);
  const raw = { raw: { width, height, channels: 1 as const } };

  const inner = await sharp(alphaRaw, raw)
    .blur(18)
    .extractChannel(0)
    .raw()
    .toBuffer();
  const outer = await sharp(alphaRaw, raw)
    .blur(46)
    .extractChannel(0)
    .raw()
    .toBuffer();

  const haloAlpha = Buffer.alloc(width * height);
  for (let i = 0; i < haloAlpha.length; i += 1) {
    haloAlpha[i] = Math.min(
      255,
      Math.round(inner[i] * 0.58 + outer[i] * 0.34)
    );
  }

  return solidWithAlpha(width, height, { r, g, b }, haloAlpha);
}

/**
 * Create a white outline by dilating the alpha then subtracting the original.
 */
async function buildStroke(
  alphaRaw: Buffer,
  width: number,
  height: number
): Promise<Buffer> {
  const raw = { raw: { width, height, channels: 1 as const } };

  const base = await sharp(alphaRaw, raw)
    .threshold(1)
    .extractChannel(0)
    .raw()
    .toBuffer();
  const dilatedInner = await sharp(alphaRaw, raw)
    .blur(4)
    .threshold(8)
    .extractChannel(0)
    .raw()
    .toBuffer();
  const dilatedOuter = await sharp(alphaRaw, raw)
    .blur(8)
    .threshold(6)
    .extractChannel(0)
    .raw()
    .toBuffer();

  const strokeAlpha = Buffer.alloc(width * height);
  for (let i = 0; i < strokeAlpha.length; i += 1) {
    const innerRing = Math.max(0, dilatedInner[i] - base[i]);
    const outerRing = Math.max(0, dilatedOuter[i] - dilatedInner[i]);
    strokeAlpha[i] = Math.min(255, innerRing + Math.round(outerRing * 0.52));
  }

  return solidWithAlpha(
    width,
    height,
    { r: 255, g: 255, b: 255 },
    strokeAlpha
  );
}

/**
 * Apply a circular mask to a square image.
 */
async function applyCircleMask(source: Buffer, size: number): Promise<Buffer> {
  const r = size / 2;
  const svg = `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`;
  return sharp(source)
    .composite([{ input: Buffer.from(svg), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function solidWithAlpha(
  width: number,
  height: number,
  color: { r: number; g: number; b: number },
  alphaRaw: Buffer
): Promise<Buffer> {
  return sharp({
    create: { width, height, channels: 3, background: color },
  })
    .joinChannel(alphaRaw, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}
