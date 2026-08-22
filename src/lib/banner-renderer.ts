import { readFileSync } from "fs";
import { join } from "path";

export type BannerDesign =
  | "dark-gradient"
  | "minimal-light"
  | "gradient-mesh"
  | "code-terminal"
  | "portrait"
  | "portrait-indigo"
  | "portrait-teal"
  | "portrait-pink";

const fontPath = join(process.cwd(), "public/fonts/Inter-Variable.woff2");
const fontBase64 = readFileSync(fontPath).toString("base64");
const fontFace = `@font-face { font-family: 'Inter'; src: url(data:font/woff2;base64,${fontBase64}) format('woff2'); font-weight: 100 900; }`;

export function renderBannerHtml(design: BannerDesign): string {
  switch (design) {
    case "dark-gradient":
      return renderDarkGradient();
    case "minimal-light":
      return renderMinimalLight();
    case "gradient-mesh":
      return renderGradientMesh();
    case "code-terminal":
      return renderCodeTerminal();
    case "portrait":
      return renderPortrait("#2457E6", "Crafting Mobile Experiences", "React Native Dev · Product & UX");
    case "portrait-indigo":
      return renderPortrait("#0D1728", "Code. Ship. Refine.", "React Native · TypeScript · Product");
    case "portrait-teal":
      return renderPortrait("#B85C3A", "Building Apps That Feel Native", "React Native Dev · Product & UX");
    case "portrait-pink":
      return renderPortrait("#2457E6", "Du concept au store.", "Dev React Native · Produit & UX");
    default:
      return renderDarkGradient();
  }
}

function hexToRgbCss(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `${r}, ${g}, ${b}`;
}

// ─── Dark Gradient ─────────────────────────────────────────────

function renderDarkGradient(): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px; height: 396px;
  overflow: hidden;
  background: #07070f;
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* Gradient base layer */
.bg-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #07070f 0%, #0e1028 45%, #161640 100%);
}

/* Subtle dot grid */
.dot-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

/* Soft orbs */
.orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, transparent 70%);
  top: -200px; right: -80px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(88, 86, 214, 0.1) 0%, transparent 70%);
  bottom: -180px; left: 200px;
}

/* Content */
.content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  padding-left: 80px;
}
.name {
  font-size: 58px; font-weight: 800; color: #fff;
  letter-spacing: -1.5px; line-height: 1;
}
.accent-bar {
  width: 180px; height: 2px; margin: 20px 0;
  background: linear-gradient(to right, #007AFF, transparent);
  border-radius: 1px;
}
.title {
  font-size: 22px; font-weight: 500; color: #667799;
  margin-bottom: 24px;
}
.skills {
  font-size: 14px; font-weight: 500; color: #4a5568;
  letter-spacing: 0.5px;
}
</style></head>
<body>
<div class="bg-gradient"></div>
<div class="dot-grid"></div>
<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="accent-bar"></div>
  <div class="title">Dev React Native &middot; Freelance</div>
  <div class="skills">React Native &nbsp;&middot;&nbsp; TypeScript &nbsp;&middot;&nbsp; Next.js &nbsp;&middot;&nbsp; Node.js</div>
</div>
</body></html>`;
}

// ─── Minimal Light ─────────────────────────────────────────────

function renderMinimalLight(): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px; height: 396px;
  overflow: hidden;
  background: #fafbfc;
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* Left accent gradient bar */
.accent-bar {
  position: absolute; left: 0; top: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to bottom, #007AFF, #5856D6);
}

/* Subtle background texture */
.texture {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

/* Soft ambient orb */
.orb {
  position: absolute;
  width: 600px; height: 600px;
  top: -200px; right: -100px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.04) 0%, transparent 60%);
  filter: blur(40px);
  pointer-events: none;
}

.content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  padding-left: 80px;
}
.name {
  font-size: 58px; font-weight: 800; color: #111827;
  letter-spacing: -1.5px; line-height: 1;
}
.divider {
  width: 48px; height: 2px; margin: 20px 0;
  background: #007AFF;
  border-radius: 1px;
}
.title {
  font-size: 24px; font-weight: 600; color: #007AFF;
  margin-bottom: 24px;
}
.skills {
  font-size: 15px; font-weight: 500; color: #6b7280;
  letter-spacing: 0.3px;
}
</style></head>
<body>
<div class="accent-bar"></div>
<div class="texture"></div>
<div class="orb"></div>
<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="divider"></div>
  <div class="title">Dev React Native</div>
  <div class="skills">React Native &nbsp;&middot;&nbsp; TypeScript &nbsp;&middot;&nbsp; Next.js &nbsp;&middot;&nbsp; Node.js</div>
</div>
</body></html>`;
}

// ─── Gradient Mesh ─────────────────────────────────────────────

function renderGradientMesh(): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px; height: 396px;
  overflow: hidden;
  background: linear-gradient(135deg, #0055CC 0%, #4338CA 40%, #7C3AED 75%, #9333EA 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* Mesh overlays */
.mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 15% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 20%, rgba(0, 0, 0, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.05) 0%, transparent 40%),
    radial-gradient(ellipse at 70% 60%, rgba(99, 102, 241, 0.15) 0%, transparent 40%);
  pointer-events: none;
}

/* Subtle grain */
.grain {
  position: absolute; inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px;
  pointer-events: none;
}

.content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  align-items: center; text-align: center;
}
.name {
  font-size: 56px; font-weight: 800; color: #fff;
  letter-spacing: -1px; line-height: 1;
}
.underline {
  width: 120px; height: 2px; margin: 18px auto;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1px;
}
.title {
  font-size: 22px; font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 28px;
}
.badges {
  display: flex; gap: 10px;
}
.badge {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 7px 18px;
  font-size: 13px; font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}
</style></head>
<body>
<div class="mesh"></div>
<div class="grain"></div>
<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="underline"></div>
  <div class="title">Dev React Native &middot; Freelance</div>
  <div class="badges">
    <div class="badge">React Native</div>
    <div class="badge">TypeScript</div>
    <div class="badge">Next.js</div>
    <div class="badge">Node.js</div>
  </div>
</div>
</body></html>`;
}

// ─── Code Terminal ─────────────────────────────────────────────

function renderCodeTerminal(): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px; height: 396px;
  overflow: hidden;
  background: #0a0e14;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
  position: relative;
}

/* Subtle scanlines */
.scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 1px,
    rgba(255, 255, 255, 0.015) 1px,
    rgba(255, 255, 255, 0.015) 2px
  );
  pointer-events: none;
}

/* Terminal window */
.terminal {
  position: absolute;
  top: 32px; left: 48px; right: 48px; bottom: 32px;
  background: #0d1117;
  border-radius: 10px;
  border: 1px solid #1e2530;
  overflow: hidden;
  display: flex; flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.terminal-bar {
  height: 36px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  display: flex; align-items: center;
  padding: 0 14px; gap: 8px;
  flex-shrink: 0;
}
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-r { background: #ff5f57; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }
.tab {
  margin-left: 16px;
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 12px; font-weight: 500;
  color: #8b949e;
  padding: 4px 12px;
  border-radius: 6px 6px 0 0;
  background: #0d1117;
  border: 1px solid #21262d;
  border-bottom: none;
  position: relative; top: 1px;
}

.code {
  flex: 1; padding: 24px 28px;
  font-size: 15px; line-height: 1.7;
  color: #c9d1d9;
  overflow: hidden;
}
.ln { color: #30363d; user-select: none; display: inline-block; width: 32px; text-align: right; margin-right: 20px; }
.cm { color: #6e7681; font-style: italic; }
.kw { color: #ff7b72; }
.fn { color: #d2a8ff; }
.st { color: #a5d6ff; }
.vr { color: #79c0ff; }
.pr { color: #ffa657; }
.br { color: #8b949e; }
.bl { color: #7ee787; }
</style></head>
<body>
<div class="scanlines"></div>
<div class="terminal">
  <div class="terminal-bar">
    <span class="dot dot-r"></span>
    <span class="dot dot-y"></span>
    <span class="dot dot-g"></span>
    <span class="tab">portfolio.ts</span>
  </div>
  <div class="code">
    <div><span class="ln">1</span><span class="cm">// Yoann Andrieux &mdash; React Native Dev</span></div>
    <div><span class="ln">2</span></div>
    <div><span class="ln">3</span><span class="kw">const</span> <span class="vr">developer</span> <span class="br">=</span> <span class="br">{</span></div>
    <div><span class="ln">4</span>&nbsp;&nbsp;<span class="pr">name</span><span class="br">:</span> <span class="st">"Yoann Andrieux"</span><span class="br">,</span></div>
    <div><span class="ln">5</span>&nbsp;&nbsp;<span class="pr">role</span><span class="br">:</span> <span class="st">"Dev React Native &middot; Freelance"</span><span class="br">,</span></div>
    <div><span class="ln">6</span>&nbsp;&nbsp;<span class="pr">stack</span><span class="br">:</span> <span class="br">[</span><span class="st">"React Native"</span><span class="br">,</span> <span class="st">"TypeScript"</span><span class="br">,</span> <span class="st">"Next.js"</span><span class="br">,</span> <span class="st">"Node.js"</span><span class="br">],</span></div>
    <div><span class="ln">7</span>&nbsp;&nbsp;<span class="pr">available</span><span class="br">:</span> <span class="bl">true</span><span class="br">,</span></div>
    <div><span class="ln">8</span><span class="br">};</span></div>
  </div>
</div>
</body></html>`;
}

// ─── Portrait Banners ──────────────────────────────────────────

function renderPortrait(haloHex: string, tagline: string, subtitle: string): string {
  const profilePath = join(process.cwd(), "public/images/yoann-profile-nobg.png");
  const profileBase64 = readFileSync(profilePath).toString("base64");
  const profileDataUri = `data:image/png;base64,${profileBase64}`;
  const haloRgb = hexToRgbCss(haloHex);

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontFace}
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px; height: 396px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  position: relative;
  background: #08081a;
}

/* Background gradient with halo tint on the right */
.bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(to right, #08081a 0%, #08081a 55%, rgba(${haloRgb}, 0.06) 100%),
    linear-gradient(180deg, #08081a 0%, #0c0c24 100%);
}

/* Subtle dot grid */
.dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

/* Diffuse ambient halo glow behind portrait */
.halo {
  position: absolute;
  right: 0; bottom: -40px;
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(${haloRgb}, 0.1) 0%, transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}

/* Stroke layer — white silhouette with colored glow, rising from bottom */
.portrait-stroke {
  position: absolute;
  right: 60px; bottom: 0;
  height: 390px; width: auto;
  transform: scale(1.015);
  transform-origin: bottom center;
  filter: brightness(0) invert(1)
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 6px rgba(${haloRgb}, 0.6))
    drop-shadow(0 0 14px rgba(${haloRgb}, 0.3));
  pointer-events: none;
}

/* Main portrait — anchored at bottom, body rises from the edge */
.portrait-image {
  position: absolute;
  right: 60px; bottom: 0;
  height: 390px; width: auto;
  object-fit: contain;
}

/* Text content — left side, anchored near top */
.content {
  position: absolute; inset: 0;
  width: 58%;
  display: flex; flex-direction: column;
  padding-left: 80px;
  padding-top: 52px;
}
.tagline {
  font-size: 46px; font-weight: 800; color: #fff;
  letter-spacing: -1.2px; line-height: 1.1;
}
.accent-bar {
  width: 160px; height: 2px; margin: 16px 0;
  background: linear-gradient(to right, rgba(${haloRgb}, 0.8), transparent);
  border-radius: 1px;
}
.subtitle {
  font-size: 18px; font-weight: 500; color: #667799;
}
</style></head>
<body>
<div class="bg"></div>
<div class="dots"></div>
<div class="halo"></div>
<img src="${profileDataUri}" class="portrait-stroke" alt="" />
<img src="${profileDataUri}" class="portrait-image" alt="Yoann Andrieux" />
<div class="content">
  <div class="tagline">${tagline}</div>
  <div class="accent-bar"></div>
  <div class="subtitle">${subtitle}</div>
</div>
</body></html>`;
}
