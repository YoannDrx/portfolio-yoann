import { readFileSync } from "fs";
import { join } from "path";

export type BannerDesign = "dark-gradient" | "minimal-light" | "gradient-mesh" | "code-terminal" | "portrait";

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
      return renderPortrait();
    default:
      return renderDarkGradient();
  }
}

function renderDarkGradient(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${fontFace}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px;
  height: 396px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #2d4a8e 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
}

.grid-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.3) 0%, transparent 70%);
  top: -150px;
  right: -100px;
}

.orb2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(88, 86, 214, 0.3) 0%, transparent 70%);
  bottom: -100px;
  left: 300px;
}

.orb3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
  top: 50%;
  right: 200px;
}

.geometric-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.08;
}

.shape {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.shape1 {
  width: 80px;
  height: 80px;
  top: 50px;
  right: 150px;
  transform: rotate(45deg);
}

.shape2 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  bottom: 100px;
  right: 300px;
}

.shape3 {
  width: 60px;
  height: 60px;
  top: 200px;
  right: 50px;
  transform: rotate(20deg);
}

.code-snippet {
  position: absolute;
  font-family: 'Courier New', monospace;
  color: rgba(255, 255, 255, 0.08);
  font-size: 12px;
  line-height: 1.4;
  pointer-events: none;
}

.snippet1 {
  top: 80px;
  left: 100px;
  width: 200px;
}

.snippet2 {
  bottom: 80px;
  right: 100px;
  width: 200px;
  text-align: right;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  padding-right: 60px;
}

.name {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.title {
  font-size: 22px;
  color: #8899bb;
  margin-bottom: 24px;
  font-weight: 500;
}

.badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  color: #aabbcc;
  font-weight: 500;
  white-space: nowrap;
}
</style>
</head>
<body>
<div class="grid-pattern"></div>
<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>

<div class="geometric-shapes">
  <div class="shape shape1"></div>
  <div class="shape shape2"></div>
  <div class="shape shape3"></div>
</div>

<div class="code-snippet snippet1">
const portfolio = {<br/>
&nbsp;&nbsp;name: "Yoann",<br/>
&nbsp;&nbsp;focus: "React Native"<br/>
}
</div>

<div class="code-snippet snippet2">
import React from "react";<br/>
export const skills = [...];<br/>
await deploy();
</div>

<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="title">Dev React Native · Freelance</div>
  <div class="badges">
    <div class="badge">React Native</div>
    <div class="badge">TypeScript</div>
    <div class="badge">Next.js</div>
    <div class="badge">Node.js</div>
  </div>
</div>
</body>
</html>`;
}

function renderMinimalLight(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${fontFace}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px;
  height: 396px;
  overflow: hidden;
  background: #f8f9fa;
  font-family: 'Inter', sans-serif;
  position: relative;
}

.accent-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: #007AFF;
}

.subtle-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0, 122, 255, 0.05) 0px,
    rgba(0, 122, 255, 0.05) 1px,
    transparent 1px,
    transparent 60px
  );
  pointer-events: none;
}

.accent-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #007AFF;
  border-radius: 50%;
  top: 50%;
  right: 100px;
  transform: translateY(-50%);
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;
  padding-right: 80px;
}

.name {
  font-size: 52px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: -0.8px;
}

.title {
  font-size: 24px;
  color: #007AFF;
  margin-bottom: 28px;
  font-weight: 600;
}

.badges {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.badge {
  display: inline;
}

.badge:not(:last-child)::after {
  content: " · ";
  margin-left: 16px;
}
</style>
</head>
<body>
<div class="accent-line"></div>
<div class="subtle-lines"></div>
<div class="accent-dot"></div>

<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="title">Dev React Native</div>
  <div class="badges">
    <div class="badge">React Native</div>
    <div class="badge">TypeScript</div>
    <div class="badge">Next.js</div>
    <div class="badge">Node.js</div>
  </div>
</div>
</body>
</html>`;
}

function renderGradientMesh(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${fontFace}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px;
  height: 396px;
  overflow: hidden;
  background: linear-gradient(135deg, #007AFF 0%, #5856D6 50%, #8B5CF6 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
}

.mesh-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.glass-pill {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px 60px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}

.name {
  font-size: 46px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.title {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
  font-weight: 500;
}

.badges {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 13px;
  color: #ffffff;
  font-weight: 500;
  white-space: nowrap;
}
</style>
</head>
<body>
<div class="mesh-layer"></div>

<div class="content">
  <div class="glass-pill">
    <div class="name">Yoann Andrieux</div>
    <div class="title">Dev React Native · Freelance</div>
    <div class="badges">
      <div class="badge">React Native</div>
      <div class="badge">TypeScript</div>
      <div class="badge">Next.js</div>
      <div class="badge">Node.js</div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function renderCodeTerminal(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${fontFace}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px;
  height: 396px;
  overflow: hidden;
  background: #0d1117;
  font-family: 'Courier New', monospace;
  position: relative;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
}

.terminal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #c9d1d9;
}

.terminal-header {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  color: #8b949e;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.title-text {
  margin-left: 8px;
  color: #8b949e;
  font-weight: 500;
}

.code-content {
  flex: 1;
  padding: 32px 40px;
  font-size: 16px;
  line-height: 1.6;
  overflow: hidden;
}

.code-line {
  margin-bottom: 8px;
}

.comment { color: #6a737d; }
.keyword { color: #ff7b72; }
.string { color: #a5d6ff; }
.variable { color: #79c0ff; }
.bracket { color: #8b949e; }
</style>
</head>
<body>
<div class="terminal">
  <div class="terminal-header">
    <span class="dot dot-red"></span>
    <span class="dot dot-yellow"></span>
    <span class="dot dot-green"></span>
    <span class="title-text">portfolio.tsx</span>
  </div>

  <div class="code-content">
    <div class="code-line"><span class="comment">// Yoann Andrieux — Dev React Native</span></div>
    <div class="code-line"><span class="keyword">import</span> <span class="bracket">{</span> <span class="variable">skills</span> <span class="bracket">}</span> <span class="keyword">from</span> <span class="string">"./expertise"</span><span class="bracket">;</span></div>
    <div class="code-line"></div>
    <div class="code-line"><span class="keyword">export const</span> <span class="variable">stack</span> <span class="bracket">=</span> <span class="bracket">[</span></div>
    <div class="code-line">&nbsp;&nbsp;<span class="string">"React Native"</span><span class="bracket">,</span> <span class="string">"TypeScript"</span><span class="bracket">,</span></div>
    <div class="code-line">&nbsp;&nbsp;<span class="string">"Next.js"</span><span class="bracket">,</span> <span class="string">"Node.js"</span></div>
    <div class="code-line"><span class="bracket">];</span></div>
    <div class="code-line"></div>
    <div class="code-line"><span class="keyword">export const</span> <span class="variable">status</span> <span class="bracket">=</span> <span class="string">"Available for new projects"</span><span class="bracket">;</span></div>
  </div>
</div>
</body>
</html>`;
}

function renderPortrait(): string {
  const profilePath = join(process.cwd(), "public/images/yoann-profile-nobg.png");
  const profileBase64 = readFileSync(profilePath).toString("base64");
  const profileDataUri = `data:image/png;base64,${profileBase64}`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${fontFace}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  width: 1584px;
  height: 396px;
  overflow: hidden;
  background: linear-gradient(to right, #0a0a1a 0%, #0a0a1a 60%, #1a2744 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
}

/* Hero-style silhouette: glow → white stroke → portrait */
.portrait-wrapper {
  position: absolute;
  right: 60px;
  bottom: 0;
  height: 460px;
  width: auto;
  pointer-events: none;
}

/* Colored halo glow behind the silhouette */
.portrait-glow {
  position: absolute;
  right: 30px;
  bottom: -30px;
  height: 520px;
  width: auto;
  filter: blur(30px) brightness(1.5);
  opacity: 0.5;
  pointer-events: none;
}

/* White stroke: same image slightly enlarged */
.portrait-stroke {
  position: absolute;
  right: 57px;
  bottom: -3px;
  height: 466px;
  width: auto;
  filter: brightness(0) invert(1) drop-shadow(0 0 2px white) drop-shadow(0 0 1px white);
  pointer-events: none;
}

/* Main portrait on top */
.portrait-image {
  position: absolute;
  right: 60px;
  bottom: 0;
  height: 460px;
  width: auto;
  object-fit: contain;
}

/* Diffuse ambient glow */
.halo {
  position: absolute;
  right: -20px;
  bottom: -60px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, transparent 65%);
  filter: blur(50px);
  pointer-events: none;
}

.content {
  position: absolute;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  padding-right: 40px;
}

.name {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.title {
  font-size: 22px;
  color: #8899bb;
  margin-bottom: 24px;
  font-weight: 500;
}

.badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  color: #aabbcc;
  font-weight: 500;
  white-space: nowrap;
}
</style>
</head>
<body>
<div class="halo"></div>
<img src="${profileDataUri}" class="portrait-glow" alt="" />
<img src="${profileDataUri}" class="portrait-stroke" alt="" />
<img src="${profileDataUri}" class="portrait-image" alt="Yoann Andrieux" />

<div class="content">
  <div class="name">Yoann Andrieux</div>
  <div class="title">Dev React Native · Freelance</div>
  <div class="badges">
    <div class="badge">React Native</div>
    <div class="badge">TypeScript</div>
    <div class="badge">Next.js</div>
    <div class="badge">Node.js</div>
  </div>
</div>
</body>
</html>`;
}
