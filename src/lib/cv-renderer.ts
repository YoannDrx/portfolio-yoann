/**
 * CV Renderer
 * Génère un HTML standalone avec CSS inline pour le CV — Dark Sidebar Split Layout
 */

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
    },
    employmentTypes: {
      cdi: "CDI",
      freelance: "Freelance",
      independant: "Indep.",
      cdd: "CDD",
      intermittent: "Intermittent",
      ponctuel: "Ponctuel",
      hors_tech: "Autre",
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
    },
    employmentTypes: {
      cdi: "Full-time",
      freelance: "Freelance",
      independant: "Self-employed",
      cdd: "Fixed-term",
      intermittent: "Intermittent",
      ponctuel: "Short-term",
      hors_tech: "Other",
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
    ponctuel: { bg: "#FEF3C7", text: "#D97706" },
    hors_tech: { bg: "#F3E8FF", text: "#7C3AED" },
  };
  return map[type] ?? { bg: "#E5E5EA", text: "#8E8E93" };
}

function getAccentColor(type: string): string {
  const map: Record<string, string> = {
    cdi: "#10B981",
    freelance: "#3B82F6",
    ponctuel: "#F59E0B",
    hors_tech: "#8B5CF6",
  };
  return map[type] ?? "#3B82F6";
}

function getLevelPercent(level: string, id?: string): number {
  const base: Record<string, number> = {
    Expert: 100,
    Avancé: 80,
    Confirmé: 60,
    Intermédiaire: 40,
    Advanced: 80,
    Proficient: 60,
    Intermediate: 40,
  };
  let pct = base[level] ?? 60;
  if (id === "react-native") pct = Math.min(pct + 20, 100);
  return pct;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderCvHtml(locale: Locale): string {
  const l = getLabels(locale);
  const profile = getProfile(locale);
  const experiences = getWorkExperiences(locale);
  const edu = getEducation(locale);
  const techSkills = getTechnicalSkills(locale);
  const softSkills = getSoftSkills(locale);

  const renderSidebar = () => {
    const skillBars = techSkills
      .map((sk: NarrativeSkillCard) => {
        const pct = getLevelPercent(sk.level, sk.id);
        return `
        <div style="margin-bottom:8px;">
          <div style="font-size:7px;color:#F8FAFC;margin-bottom:3px;">${escapeHtml(sk.title)}</div>
          <div style="height:4px;background:#334155;border-radius:2px;">
            <div style="height:4px;background:#60A5FA;border-radius:2px;width:${pct}%;"></div>
          </div>
        </div>`;
      })
      .join("");

    const eduItems = edu
      .map(
        (e: Education) => `
        <div style="margin-bottom:8px;">
          <div style="font-size:7px;font-weight:700;color:#F8FAFC;">${escapeHtml(e.degree)}</div>
          <div style="font-size:6.5px;color:#94A3B8;">${escapeHtml(e.school)}</div>
          <div style="font-size:6.5px;color:#60A5FA;">${escapeHtml(e.year)}</div>
        </div>`
      )
      .join("");

    const langItems = l.languages
      .map(
        (lang: CvLanguage) => `
        <div style="margin-bottom:4px;">
          <span style="font-size:7px;font-weight:700;color:#F8FAFC;">${escapeHtml(lang.name)}</span>
          <span style="font-size:7px;color:#94A3B8;"> ${escapeHtml(lang.level)}</span>
        </div>`
      )
      .join("");

    const interestItems = l.interests
      .map(
        (i: CvInterest) => `
        <div style="margin-bottom:3px;">
          <div style="font-size:7px;color:#F8FAFC;">${escapeHtml(i.title)}</div>
          ${i.detail ? `<div style="font-size:6.5px;color:#94A3B8;">${escapeHtml(i.detail)}</div>` : ""}
        </div>`
      )
      .join("");

    const divider =
      '<div style="height:1px;background:#1E293B;margin:10px 0;"></div>';

    return `
    <div style="width:185px;min-height:100%;background:#0F172A;padding:20px 18px 18px 18px;box-sizing:border-box;display:flex;flex-direction:column;">
      <!-- Avatar -->
      <div style="width:60px;height:60px;border-radius:30px;overflow:hidden;margin:0 auto 12px auto;">
        <img src="https://yoann-andrieux.fr/images/avatar.jpg" style="width:60px;height:60px;object-fit:cover;" />
      </div>
      <!-- Name -->
      <div style="font-size:16px;font-weight:700;color:#F8FAFC;text-align:center;">${escapeHtml(profile.firstName)}</div>
      <div style="font-size:16px;font-weight:700;color:#F8FAFC;text-align:center;margin-bottom:2px;">${escapeHtml(profile.lastName)}</div>
      <div style="font-size:10px;color:#60A5FA;text-align:center;margin-bottom:4px;">${escapeHtml(profile.title)}</div>
      <div style="font-size:7px;color:#94A3B8;text-align:center;margin-bottom:12px;">${escapeHtml(profile.subtitle)}</div>

      ${divider}
      <div style="font-size:8px;font-weight:700;color:#F8FAFC;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(l.contact)}</div>
      <div style="font-size:7px;color:#94A3B8;margin-bottom:2px;">Email</div>
      <div style="font-size:7px;color:#F8FAFC;margin-bottom:6px;">yoann.andrieux@gmail.com</div>
      <div style="font-size:7px;color:#94A3B8;margin-bottom:2px;">Tel</div>
      <div style="font-size:7px;color:#F8FAFC;margin-bottom:6px;">+33 6 63 43 46 65</div>

      ${divider}
      <div style="font-size:8px;font-weight:700;color:#F8FAFC;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(l.sectionTitles.skills)}</div>
      ${skillBars}

      ${divider}
      <div style="font-size:8px;font-weight:700;color:#F8FAFC;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(l.sectionTitles.education)}</div>
      ${eduItems}

      ${divider}
      <div style="font-size:8px;font-weight:700;color:#F8FAFC;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(l.sectionTitles.languages)}</div>
      ${langItems}

      ${divider}
      <div style="font-size:8px;font-weight:700;color:#F8FAFC;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${escapeHtml(l.sectionTitles.interests)}</div>
      ${interestItems}

      <!-- Available badge -->
      <div style="margin-top:auto;padding-top:10px;display:flex;align-items:center;gap:4px;">
        <div style="width:6px;height:6px;border-radius:3px;background:#10B981;"></div>
        <span style="font-size:7px;font-weight:700;color:#10B981;">${escapeHtml(l.availability)}</span>
      </div>
    </div>`;
  };

  const renderExperience = (exp: WorkExperience) => {
    const badge = getBadgeStyle(exp.type);
    const accent = getAccentColor(exp.type);
    const typeLabel = l.employmentTypes[exp.type] ?? exp.type;
    const isCdi = exp.type === "cdi";
    const remoteLabel =
      exp.remote === "remote"
        ? " · Remote"
        : exp.remote === "hybrid"
          ? " · Hybride"
          : "";

    const descriptions = isCdi
      ? exp.description
          .slice(0, 2)
          .map(
            (d) =>
              `<div style="font-size:6.5px;color:#475569;margin-bottom:1px;line-height:1.3;">• ${escapeHtml(d)}</div>`
          )
          .join("")
      : "";

    const skills = exp.skills
      .slice(0, 5)
      .map(
        (s) =>
          `<span style="background:#F1F5F9;padding:1.5px 4px;border-radius:3px;font-size:5.5px;color:#475569;">${escapeHtml(s)}</span>`
      )
      .join(" ");

    return `
    <div style="display:flex;flex-direction:row;margin-bottom:5px;padding-bottom:5px;border-bottom:0.5px solid #E2E8F0;">
      <div style="width:2px;border-radius:1px;background:${accent};margin-right:8px;min-height:100%;"></div>
      <div style="flex:1;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:8.5px;font-weight:700;color:#0F172A;">${escapeHtml(exp.company)}</span>
            <span style="background:${badge.bg};color:${badge.text};padding:1.5px 5px;border-radius:3px;font-size:5.5px;font-weight:700;">${escapeHtml(typeLabel)}</span>
          </div>
          <span style="font-size:6.5px;color:#64748B;">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate ?? l.present)}</span>
        </div>
        <div style="font-size:7.5px;color:#3B82F6;font-weight:700;margin-bottom:1px;">${escapeHtml(exp.role)}</div>
        <div style="font-size:6.5px;color:#94A3B8;margin-bottom:3px;">${escapeHtml(exp.location)}${remoteLabel}</div>
        ${descriptions}
        <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:2px;">${skills}</div>
      </div>
    </div>`;
  };

  const renderSoftSkills = (skills: SoftSkillCard[]) => {
    const cards = skills
      .map(
        (sk: SoftSkillCard) => `
      <div style="width:47%;background:#F8FAFC;border-radius:6px;padding:8px;border:0.5px solid #E2E8F0;">
        <div style="font-size:7px;font-weight:700;color:#0F172A;margin-bottom:3px;">${escapeHtml(sk.title)}</div>
        <div style="font-size:5.5px;color:#64748B;line-height:1.3;">${escapeHtml(sk.narrative.split(".")[0] + ".")}</div>
      </div>`
      )
      .join("");
    return `
    <div style="margin-top:8px;">
      <div style="font-size:10px;font-weight:700;color:#0F172A;letter-spacing:0.5px;margin-bottom:4px;">${escapeHtml(l.sectionTitles.softSkills)}</div>
      <div style="width:30px;height:2px;background:#3B82F6;margin-bottom:10px;border-radius:1px;"></div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${cards}</div>
    </div>`;
  };

  const footer = `
  <div style="display:flex;justify-content:center;gap:20px;margin-top:auto;padding-top:10px;border-top:0.5px solid #E2E8F0;">
    <a href="https://www.linkedin.com/in/yoann-andrieux/" style="font-size:7px;color:#3B82F6;text-decoration:none;">LinkedIn</a>
    <a href="https://github.com/YoannDrx" style="font-size:7px;color:#3B82F6;text-decoration:none;">GitHub</a>
    <a href="https://www.malt.fr/profile/yoannandrieux" style="font-size:7px;color:#3B82F6;text-decoration:none;">Malt</a>
  </div>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(l.document.title)}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 8px; }
    .page { width: 210mm; height: 297mm; display: flex; flex-direction: column; }
    .accent-line { height: 3px; background: #3B82F6; }
    .container { display: flex; flex-direction: row; flex: 1; }
    .main { flex: 1; padding: 16px 18px 18px 18px; display: flex; flex-direction: column; }
    .section-title { font-size: 10px; font-weight: 700; color: #0F172A; letter-spacing: 0.5px; margin-bottom: 4px; }
    .section-bar { width: 30px; height: 2px; background: #3B82F6; margin-bottom: 10px; border-radius: 1px; }
  </style>
</head>
<body>
  <div class="page">
    <div class="accent-line"></div>
    <div class="container">
      ${renderSidebar()}
      <div class="main">
        <div class="section-title">${escapeHtml(l.sectionTitles.experiences)}</div>
        <div class="section-bar"></div>
        ${experiences.map(renderExperience).join("")}
        ${renderSoftSkills(softSkills)}
        ${footer}
      </div>
    </div>
  </div>
</body>
</html>`;
}
