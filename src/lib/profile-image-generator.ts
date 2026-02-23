/**
 * Profile Image Generator
 * Sharp-based pipeline for portrait & circle profile images with halo effects
 */

import sharp from "sharp";
import { join } from "path";

export interface GenerateProfileImageOptions {
  shape: "portrait" | "circle" | "raw";
  background: "transparent" | "dark" | "light" | "primary";
  haloColor: string | null; // hex like "#007AFF"
  preview: boolean;
}

const BG_COLORS: Record<string, string> = {
  dark: "#0a0a1a",
  light: "#f5f5f7",
  primary: "#007AFF",
};

// Source image is 1024x1536
const SRC_W = 1024;
const SRC_H = 1536;

// Output sizes — bigger containers with padding for breathing room
const PORTRAIT_OUT_W = 1400;
const PORTRAIT_OUT_H = 2100;
const CIRCLE_OUT = 1024;

// Circle: scale portrait down to ~88% inside the circle so bonnet isn't clipped
const CIRCLE_FACE_SCALE = 0.88;

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
  const outW = isCircle ? CIRCLE_OUT : PORTRAIT_OUT_W;
  const outH = isCircle ? CIRCLE_OUT : PORTRAIT_OUT_H;

  // 1. Load source at original size (1024x1536)
  const fullSource = await sharp(imagePath).ensureAlpha().png().toBuffer();

  // 2. Prepare subject positioned on the output canvas
  let subject: Buffer;
  let subjectTop: number;
  let subjectLeft: number;

  if (isCircle) {
    // Crop top of the portrait (head area), scale down to fit inside circle
    const cropH = SRC_W; // 1024x1024 square from top
    const cropped = await sharp(fullSource)
      .extract({ left: 0, top: 0, width: SRC_W, height: cropH })
      .png()
      .toBuffer();

    // Scale down to ~88% of circle size
    const innerSize = Math.round(CIRCLE_OUT * CIRCLE_FACE_SCALE);
    subject = await sharp(cropped)
      .resize(innerSize, innerSize)
      .png()
      .toBuffer();

    // Center in the output
    subjectLeft = Math.round((CIRCLE_OUT - innerSize) / 2);
    subjectTop = Math.round((CIRCLE_OUT - innerSize) / 2);
  } else {
    // Portrait: place the 1024x1536 source centered in the larger canvas
    subject = fullSource;
    subjectLeft = Math.round((PORTRAIT_OUT_W - SRC_W) / 2);
    subjectTop = Math.round((PORTRAIT_OUT_H - SRC_H) / 2);
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
  const alphaMask = await sharp(alphaBuf, { raw: { width: outW, height: outH, channels: 1 } })
    .toColorspace("b-w")
    .png()
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
    const halo = await buildHalo(alphaMask, outW, outH, options.haloColor);
    layers.push({ input: halo, top: 0, left: 0 });
  }

  // White stroke (lisere)
  if (options.haloColor) {
    const stroke = await buildStroke(alphaMask, outW, outH);
    layers.push({ input: stroke, top: 0, left: 0 });
  }

  // Subject on canvas (with circle mask if needed)
  if (isCircle) {
    const masked = await applyCircleMask(subjectOnCanvas, CIRCLE_OUT);
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

  if (options.background === "transparent") {
    return output.png().toBuffer();
  }
  return output.jpeg({ quality: 95 }).toBuffer();
}

/**
 * Create a blurred halo glow from the alpha silhouette.
 */
async function buildHalo(
  alphaMask: Buffer,
  width: number,
  height: number,
  color: string
): Promise<Buffer> {
  const { r, g, b } = hexToRgb(color);

  const colorLayer = await sharp({
    create: { width, height, channels: 4, background: { r, g, b, alpha: 255 } },
  })
    .png()
    .toBuffer();

  const tinted = await sharp(colorLayer)
    .composite([{ input: alphaMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  return sharp(tinted).blur(35).png().toBuffer();
}

/**
 * Create a white outline by dilating the alpha then subtracting the original.
 */
async function buildStroke(
  alphaMask: Buffer,
  width: number,
  height: number
): Promise<Buffer> {
  const dilated = await sharp(alphaMask)
    .blur(5)
    .threshold(15)
    .png()
    .toBuffer();

  const whiteFill = await sharp({
    create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 255 } },
  })
    .composite([{ input: dilated, blend: "dest-in" }])
    .png()
    .toBuffer();

  return sharp(whiteFill)
    .composite([{ input: alphaMask, blend: "dest-out" }])
    .png()
    .toBuffer();
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
