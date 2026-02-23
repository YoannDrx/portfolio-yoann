/**
 * CV Renderer
 * Generates a standalone HTML with inline CSS for the CV — Premium 2-page A4 Layout
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { Locale } from "@/i18n/locales";
import {
  getEducation,
  getWorkExperiences,
  getProfile,
  getSoftSkills,
  getTechnicalSkills,
  type Education,
  type WorkExperience,
  type NarrativeSkillCard,
  type SoftSkillCard,
} from "@/data";

type CvLanguage = { id: string; name: string; level: string };
type CvInterest = { id: string; title: string; detail?: string };

const labels = {
  fr: {
    present: "Présent",
    contact: "Contact",
    availability: "Disponible",
    sectionTitles: {
      experiences: "Expériences",
      skills: "Compétences",
      education: "Formation",
      languages: "Langues",
      interests: "Centres d'intérêt",
      softSkills: "Soft Skills",
      managementAndOthers: "Management & Autres expériences",
      cinemaEvents: "Cinéma & Événementiel",
    },
    employmentTypes: {
      cdi: "CDI",
      freelance: "Freelance",
      independant: "Indep.",
      cdd: "CDD",
      intermittent: "Intermittent",
      ponctuel: "Freelance",
      hors_tech: "Spectacle vivant",
      ops: "Ops",
      cinema: "Cinéma",
    } as Record<string, string>,
    remoteLabels: {
      remote: "Remote",
      hybrid: "Hybride",
    } as Record<string, string>,
    languages: [
      { id: "fr", name: "Français", level: "Natif" },
      { id: "en", name: "Anglais", level: "Professionnel" },
    ] as CvLanguage[],
    interests: [
      { id: "music", title: "Musique", detail: "Bassiste pro" },
      { id: "running", title: "Running" },
      { id: "nature", title: "Nature & randonnée" },
      { id: "travel", title: "Voyage & culture" },
    ] as CvInterest[],
    mobility: "Mobilité : Permis A · Permis B",
    document: { title: "CV Yoann Andrieux - Dev React Native" },
  },
  en: {
    present: "Present",
    contact: "Contact",
    availability: "Available",
    sectionTitles: {
      experiences: "Experience",
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      interests: "Interests",
      softSkills: "Soft Skills",
      managementAndOthers: "Management & Other Experience",
      cinemaEvents: "Cinema & Events",
    },
    employmentTypes: {
      cdi: "Full-time",
      freelance: "Freelance",
      independant: "Self-employed",
      cdd: "Fixed-term",
      intermittent: "Intermittent",
      ponctuel: "Freelance",
      hors_tech: "Live Performance",
      ops: "Ops",
      cinema: "Cinema",
    } as Record<string, string>,
    remoteLabels: {
      remote: "Remote",
      hybrid: "Hybrid",
    } as Record<string, string>,
    languages: [
      { id: "fr", name: "French", level: "Native" },
      { id: "en", name: "English", level: "Professional" },
    ] as CvLanguage[],
    interests: [
      { id: "music", title: "Music", detail: "Professional bassist" },
      { id: "running", title: "Running" },
      { id: "nature", title: "Nature & hiking" },
      { id: "travel", title: "Travel & culture" },
    ] as CvInterest[],
    mobility: "Mobility: License A (motorcycle) · License B (car)",
    document: { title: "Resume Yoann Andrieux - React Native Developer" },
  },
};

function getLabels(locale: Locale) {
  return labels[locale] ?? labels.fr;
}

function getBadgeStyle(type: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    cdi: { bg: "#DCFCE7", text: "#16A34A" },
    freelance: { bg: "#DBEAFE", text: "#2563EB" },
    ponctuel: { bg: "#DBEAFE", text: "#2563EB" },
    ops: { bg: "#D1FAE5", text: "#059669" },
    cinema: { bg: "#FEF3C7", text: "#D97706" },
    hors_tech: { bg: "#F3E8FF", text: "#7C3AED" },
  };
  return map[type] ?? { bg: "#E5E5EA", text: "#8E8E93" };
}

function getAccentColor(type: string): string {
  const map: Record<string, string> = {
    cdi: "#10B981",
    freelance: "#3B82F6",
    ponctuel: "#3B82F6",
    ops: "#059669",
    cinema: "#D97706",
    hors_tech: "#8B5CF6",
  };
  return map[type] ?? "#3B82F6";
}


function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sortByDateDesc(exps: WorkExperience[]): WorkExperience[] {
  const parseDate = (d: string | undefined): number => {
    if (!d) return Date.now();
    const monthMap: Record<string, number> = {
      "Janv.": 0, "Févr.": 1, "Mars": 2, "Avr.": 3, "Mai": 4, "Juin": 5,
      "Juil.": 6, "Août": 7, "Sept.": 8, "Oct.": 9, "Nov.": 10, "Déc.": 11,
      "Jan.": 0, "Feb.": 1, "Mar.": 2, "Apr.": 3, "May": 4, "Jun.": 5,
      "Jul.": 6, "Aug.": 7, "Sep.": 8, "Dec.": 11,
    };
    const parts = d.split(" ");
    if (parts.length === 2) {
      const month = monthMap[parts[0]] ?? 0;
      return new Date(parseInt(parts[1]), month).getTime();
    }
    return new Date(parseInt(d)).getTime();
  };
  return [...exps].sort((a, b) => parseDate(b.endDate) - parseDate(a.endDate));
}

function loadProfileImageBase64(): string {
  try {
    const imagePath = join(
      process.cwd(),
      "public",
      "images",
      "yoann-profile-nobg.png"
    );
    const imageBuffer = readFileSync(imagePath);
    return `data:image/png;base64,${imageBuffer.toString("base64")}`;
  } catch {
    return "https://yoann-andrieux.fr/images/yoann-profile-nobg.png";
  }
}

export function renderCvHtml(locale: Locale): string {
  const l = getLabels(locale);
  const profile = getProfile(locale);
  const experiences = getWorkExperiences(locale);
  const edu = getEducation(locale);
  const techSkills = getTechnicalSkills(locale);
  const softSkills = getSoftSkills(locale);

  // Embed profile image as base64 data URL
  const profileImageSrc = loadProfileImageBase64();

  // ── Split experiences into groups ──
  const detailedIds = new Set(["1", "1b", "2", "3", "4", "6"]);
  const semiDetailedTechIds = new Set(["1c", "1d", "4b"]);
  const allPage1Ids = [...detailedIds, ...semiDetailedTechIds];
  const allPage1Exps = sortByDateDesc(
    allPage1Ids
      .map((id) => experiences.find((e) => e.id === id))
      .filter(Boolean) as WorkExperience[]
  );

  const cyclofix = experiences.find((e) => e.id === "8");
  const courrier = experiences.find((e) => e.id === "9");
  const cinemaIds = ["0a", "0d", "0c", "0b", "10b"];
  const cinemaExps = sortByDateDesc(cinemaIds
    .map((id) => experiences.find((e) => e.id === id))
    .filter(Boolean) as WorkExperience[]);
  const ourTheory = experiences.find((e) => e.id === "10a");
  const ugcCgr = experiences.find((e) => e.id === "10c");

  // Full bio from profile (same as hero)

  // Availability text from profile
  const availDetail = profile.availabilityOptions.join(" / ");

  // ── Render helpers ──

  const renderAccentLine = () =>
    `<div style="height:3px;background:#3B82F6;width:100%;flex-shrink:0;"></div>`;

  const renderSectionTitle = (title: string) => `
    <div style="margin-bottom:8px;">
      <div style="font-size:12px;font-weight:700;color:#0F172A;margin-bottom:3px;">${escapeHtml(title)}</div>
      <div style="width:30px;height:2px;background:#3B82F6;border-radius:1px;"></div>
    </div>`;

  const renderSubSectionTitle = (title: string) => `
    <div style="font-size:9.5px;font-weight:700;color:#475569;margin:8px 0 5px 0;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(title)}</div>`;

  // Detailed experience: 2-line intro paragraph + 3 bullets + skills + optional link
  const renderDetailedExp = (exp: WorkExperience, maxBullets = 3) => {
    const badge = getBadgeStyle(exp.type);
    const accent = getAccentColor(exp.type);
    const typeLabel = l.employmentTypes[exp.type] ?? exp.type;
    const remoteLabel =
      exp.remote && exp.remote !== "onsite"
        ? ` · ${l.remoteLabels[exp.remote] ?? exp.remote}`
        : "";

    // Combine first 2 descriptions into a longer intro paragraph (~2 lines)
    const introparts = exp.description.slice(0, 2).filter(Boolean);
    const introDesc = introparts.join(". ") + (introparts.length > 1 ? "." : "");
    const bullets = exp.description
      .slice(2, 2 + maxBullets)
      .map(
        (d) =>
          `<div style="font-size:7.5px;color:#475569;line-height:1.4;">&#8226; ${escapeHtml(d)}</div>`
      )
      .join("");

    const skills = exp.skills
      .slice(0, 6)
      .map(
        (s) =>
          `<span style="background:#F1F5F9;padding:1.5px 5px;border-radius:3px;font-size:6.5px;color:#475569;white-space:nowrap;">${escapeHtml(s)}</span>`
      )
      .join(" ");

    const linkIcon = exp.url
      ? ` <a href="${exp.url}" style="color:#3B82F6;text-decoration:none;" title="${exp.url}"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:2px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`
      : "";

    return `
    <div style="display:flex;margin-bottom:8px;padding-bottom:8px;border-bottom:0.5px solid #E2E8F0;">
      <div style="width:2px;border-radius:1px;background:${accent};margin-right:8px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span style="font-size:10px;font-weight:700;color:#0F172A;">${escapeHtml(exp.company)}</span>${linkIcon}
            <span style="background:${badge.bg};color:${badge.text};padding:1.5px 5px;border-radius:3px;font-size:6.5px;font-weight:700;margin-left:5px;">${escapeHtml(typeLabel)}</span>
          </div>
          <span style="font-size:7.5px;color:#64748B;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate ?? l.present)}</span>
        </div>
        <div style="font-size:8.5px;color:#3B82F6;font-weight:600;margin-bottom:1px;">${escapeHtml(exp.role)}</div>
        <div style="font-size:7.5px;color:#94A3B8;margin-bottom:3px;">${escapeHtml(exp.location)}${remoteLabel}</div>
        <div style="font-size:7.5px;color:#334155;line-height:1.45;margin-bottom:2px;font-style:italic;">${escapeHtml(introDesc)}</div>
        ${bullets}
        <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:3px;">${skills}</div>
      </div>
    </div>`;
  };

  // Semi-detailed: 2-line intro paragraph + 2 bullets + optional link
  const renderSemiDetailedExp = (exp: WorkExperience) => {
    const badge = getBadgeStyle(exp.type);
    const accent = getAccentColor(exp.type);
    const typeLabel = l.employmentTypes[exp.type] ?? exp.type;

    // Combine first 2 descriptions into longer intro
    const introparts = exp.description.slice(0, 2).filter(Boolean);
    const introDesc = introparts.join(". ") + (introparts.length > 1 ? "." : "");
    const bullets = exp.description
      .slice(2, 4)
      .map(
        (d) =>
          `<div style="font-size:7.5px;color:#475569;line-height:1.35;">&#8226; ${escapeHtml(d)}</div>`
      )
      .join("");

    const linkIcon = exp.url
      ? ` <a href="${exp.url}" style="color:#3B82F6;text-decoration:none;" title="${exp.url}"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:2px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`
      : "";

    return `
    <div style="display:flex;margin-bottom:6px;padding-bottom:6px;border-bottom:0.5px solid #E2E8F0;">
      <div style="width:2px;border-radius:1px;background:${accent};margin-right:8px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span style="font-size:9px;font-weight:700;color:#0F172A;">${escapeHtml(exp.company)}</span>${linkIcon}
            <span style="background:${badge.bg};color:${badge.text};padding:1px 4px;border-radius:3px;font-size:6px;font-weight:700;margin-left:4px;">${escapeHtml(typeLabel)}</span>
          </div>
          <span style="font-size:7px;color:#64748B;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate ?? l.present)}</span>
        </div>
        <div style="font-size:8px;color:#3B82F6;font-weight:600;margin-bottom:2px;">${escapeHtml(exp.role)}</div>
        <div style="font-size:7.5px;color:#334155;line-height:1.4;margin-bottom:1px;font-style:italic;">${escapeHtml(introDesc)}</div>
        ${bullets}
      </div>
    </div>`;
  };

  // Compact: role + 1 line description
  const renderCompactExp = (exp: WorkExperience) => {
    const badge = getBadgeStyle(exp.type);
    const accent = getAccentColor(exp.type);
    const typeLabel = l.employmentTypes[exp.type] ?? exp.type;
    const shortDesc = exp.description[0] ?? "";

    return `
    <div style="display:flex;margin-bottom:5px;padding-bottom:5px;border-bottom:0.5px solid #F1F5F9;">
      <div style="width:2px;border-radius:1px;background:${accent};margin-right:8px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <span style="font-size:9px;font-weight:700;color:#0F172A;">${escapeHtml(exp.company)}</span>
            <span style="background:${badge.bg};color:${badge.text};padding:1px 4px;border-radius:3px;font-size:6px;font-weight:700;margin-left:4px;">${escapeHtml(typeLabel)}</span>
          </div>
          <span style="font-size:7px;color:#64748B;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate ?? l.present)}</span>
        </div>
        <div style="font-size:7.5px;color:#3B82F6;font-weight:600;">${escapeHtml(exp.role)} <span style="color:#475569;font-weight:400;">&#8226; ${escapeHtml(shortDesc)}</span></div>
      </div>
    </div>`;
  };

  // Skill card: compact card with background, badge, and bullet highlights
  const renderSkillCard = (skill: NarrativeSkillCard) => {
    const highlights = skill.highlights
      .slice(0, 3)
      .map((h) => `<div style="font-size:7px;color:#475569;line-height:1.3;">&#8226; ${escapeHtml(h)}</div>`)
      .join("");

    return `
    <div style="flex:1;min-width:30%;background:#F8FAFC;border:0.5px solid #E2E8F0;border-radius:6px;padding:6px 8px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;">
        <span style="font-size:8.5px;font-weight:700;color:#0F172A;">${escapeHtml(skill.title)}</span>
        <span style="background:#DBEAFE;color:#2563EB;padding:1px 5px;border-radius:3px;font-size:6px;font-weight:600;">${escapeHtml(skill.level)}</span>
      </div>
      ${highlights}
    </div>`;
  };

  // Soft skill card: compact card with enriched narrative (2 sentences)
  const renderSoftSkillCard = (skill: SoftSkillCard) => {
    const sentences = skill.narrative.split(". ");
    const shortNarrative = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "." : "");
    return `
    <div style="flex:1;min-width:45%;background:#F8FAFC;border:0.5px solid #E2E8F0;border-radius:6px;padding:6px 8px;">
      <div style="font-size:8px;font-weight:700;color:#0F172A;margin-bottom:2px;">${escapeHtml(skill.title)}</div>
      <div style="font-size:7px;color:#64748B;line-height:1.35;">${escapeHtml(shortNarrative)}</div>
    </div>`;
  };

  // Education card
  const renderEducationCard = (e: Education) => `
    <div style="flex:1;background:#F8FAFC;border:0.5px solid #E2E8F0;border-radius:6px;padding:8px 10px;text-align:center;">
      <div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-bottom:2px;">${escapeHtml(e.degree)}</div>
      <div style="font-size:7.5px;color:#64748B;">${escapeHtml(e.school)}</div>
      <div style="font-size:7.5px;color:#3B82F6;font-weight:600;">${escapeHtml(e.year)}</div>
    </div>`;

  // ── Header — Full silhouette on left with white outline + blue glow ──

  const renderHeader = () => {
    const statsHtml = profile.stats
      .map(
        (s) => `
      <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:5px 12px;text-align:center;">
        <div style="font-size:13px;font-weight:800;color:#F8FAFC;">${escapeHtml(s.value)}</div>
        <div style="font-size:6.5px;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(s.label)}</div>
      </div>`
      )
      .join("");

    return `
    <div style="background:#0F172A;padding:16px 20px 16px 20px;flex-shrink:0;position:relative;overflow:hidden;min-height:155px;">
      <!-- Silhouette: full-body, anchored bottom-left, white outline + blue glow -->
      <div style="position:absolute;left:18px;bottom:0;height:90%;z-index:10;">
        <!-- Back layer: white outline via brightness(0) invert(1) + blue glow via drop-shadow -->
        <img src="${profileImageSrc}"
             style="position:absolute;bottom:-2px;left:-2px;height:calc(100% + 4px);width:auto;filter:brightness(0) invert(1) drop-shadow(0 0 6px rgba(59,130,246,0.7)) drop-shadow(0 0 14px rgba(59,130,246,0.3));pointer-events:none;" />
        <!-- Front layer: actual image -->
        <img src="${profileImageSrc}"
             style="position:relative;height:100%;width:auto;display:block;" />
      </div>

      <!-- Right content (offset to clear the silhouette) -->
      <div style="margin-left:125px;">
        <!-- Name -->
        <div style="font-size:22px;font-weight:800;color:#F8FAFC;line-height:1.1;">${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</div>
        <div style="font-size:12px;font-weight:600;color:#60A5FA;margin-bottom:2px;">${escapeHtml(profile.title)}</div>
        <div style="font-size:9px;color:#94A3B8;margin-bottom:4px;">${escapeHtml(profile.subtitle)}</div>

        <!-- Availability -->
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:8px;">
          <div style="width:7px;height:7px;border-radius:50%;background:#10B981;flex-shrink:0;"></div>
          <span style="font-size:8px;color:#10B981;font-weight:600;">${escapeHtml(l.availability)} &mdash; ${escapeHtml(availDetail)}</span>
        </div>

        <!-- Bio -->
        <div style="font-size:8.5px;color:#CBD5E1;line-height:1.45;margin-bottom:8px;">${escapeHtml(profile.bio)}</div>

        <!-- Contact line -->
        <div style="font-size:8px;color:#94A3B8;margin-bottom:8px;">
          &#9993; yoann.andrieux@gmail.com
          <span style="margin:0 4px;">&#183;</span>
          &#9742; +33 6 63 43 46 65
          <span style="margin:0 4px;">&#183;</span>
          <a href="https://www.linkedin.com/in/yoann-andrieux/" style="color:#60A5FA;text-decoration:none;">LinkedIn</a>
          <span style="margin:0 4px;">&#183;</span>
          <a href="https://github.com/YoannDrx" style="color:#60A5FA;text-decoration:none;">GitHub</a>
          <span style="margin:0 4px;">&#183;</span>
          <a href="https://www.malt.fr/profile/yoannandrieux" style="color:#60A5FA;text-decoration:none;">Malt</a>
        </div>

        <!-- Stats badges -->
        <div style="display:flex;gap:10px;">${statsHtml}</div>
      </div>
    </div>`;
  };

  // ── Languages & Interests ──

  const langLine = l.languages
    .map(
      (lang) => `${escapeHtml(lang.name)} (${escapeHtml(lang.level)})`
    )
    .join(" &middot; ");
  const interestLine = l.interests
    .map((i) =>
      i.detail
        ? `${escapeHtml(i.title)} (${escapeHtml(i.detail)})`
        : escapeHtml(i.title)
    )
    .join(" &middot; ");

  // ── Footer ──

  const renderFooter = () => `
    <div style="text-align:center;padding-top:8px;border-top:0.5px solid #E2E8F0;font-size:7.5px;">
      <span>LinkedIn : </span><a href="https://www.linkedin.com/in/yoann-andrieux/" style="color:#3B82F6;text-decoration:none;">linkedin.com/in/yoann-andrieux</a>
      <span style="color:#94A3B8;"> | </span>
      <span>GitHub : </span><a href="https://github.com/YoannDrx" style="color:#3B82F6;text-decoration:none;">github.com/YoannDrx</a>
      <span style="color:#94A3B8;"> | </span>
      <span>Malt : </span><a href="https://www.malt.fr/profile/yoannandrieux" style="color:#3B82F6;text-decoration:none;">malt.fr/profile/yoannandrieux</a>
      <span style="color:#94A3B8;"> | </span>
      <span>Portfolio : </span><a href="https://yoann-andrieux.fr" style="color:#3B82F6;text-decoration:none;">yoann-andrieux.fr</a>
    </div>`;

  // ── Assemble HTML ──

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(l.document.title)}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 9px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 210mm; height: 297mm; overflow: hidden; position: relative; display: flex; flex-direction: column; }
    .page + .page { page-break-before: always; }
  </style>
</head>
<body>
  <!-- ═══════════ PAGE 1 ═══════════ -->
  <div class="page">
    ${renderAccentLine()}
    ${renderHeader()}
    <div style="padding:16px 20px 10px 20px;flex:1;display:flex;flex-direction:column;">
      ${renderSectionTitle(l.sectionTitles.experiences)}
      ${allPage1Exps.map((exp) =>
        detailedIds.has(exp.id) ? renderDetailedExp(exp, 3) : renderSemiDetailedExp(exp)
      ).join("")}
    </div>
  </div>

  <!-- ═══════════ PAGE 2 ═══════════ -->
  <div class="page">
    ${renderAccentLine()}
    <div style="padding:12px 20px;flex:1;display:flex;flex-direction:column;">
      ${renderSectionTitle(l.sectionTitles.managementAndOthers)}
      ${cyclofix ? renderDetailedExp(cyclofix, 3) : ""}
      ${courrier ? renderSemiDetailedExp(courrier) : ""}

      ${renderSubSectionTitle(l.sectionTitles.cinemaEvents)}
      ${cinemaExps.map(renderSemiDetailedExp).join("")}

      ${ourTheory ? renderSemiDetailedExp(ourTheory) : ""}
      ${ugcCgr ? renderSemiDetailedExp(ugcCgr) : ""}

      ${renderSectionTitle(l.sectionTitles.skills)}
      <div style="display:flex;gap:6px;margin-bottom:4px;">
        ${techSkills.slice(0, 3).map(renderSkillCard).join("")}
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        ${techSkills.slice(3).map(renderSkillCard).join("")}
      </div>

      ${renderSectionTitle(l.sectionTitles.softSkills)}
      <div style="display:flex;gap:6px;margin-bottom:4px;">
        ${softSkills.slice(0, 2).map(renderSoftSkillCard).join("")}
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        ${softSkills.slice(2, 4).map(renderSoftSkillCard).join("")}
      </div>

      ${renderSectionTitle(l.sectionTitles.education)}
      <div style="display:flex;gap:8px;margin-bottom:10px;">
        ${edu.map(renderEducationCard).join("")}
      </div>

      <div style="font-size:8px;color:#475569;margin-bottom:3px;">
        <strong>${escapeHtml(l.sectionTitles.languages)} :</strong> ${langLine}
      </div>
      <div style="font-size:8px;color:#475569;margin-bottom:3px;">
        <strong>${escapeHtml(l.sectionTitles.interests)} :</strong> ${interestLine}
      </div>
      <div style="font-size:8px;color:#475569;margin-bottom:8px;">
        ${escapeHtml(l.mobility)}
      </div>

      <div style="margin-top:auto;">
        ${renderFooter()}
      </div>
    </div>
  </div>
</body>
</html>`;
}
