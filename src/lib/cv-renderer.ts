import { readFileSync } from "fs";
import { join } from "path";
import type { Locale } from "@/i18n/locales";
import {
  getEducation,
  getProfile,
  getSoftSkills,
  getTechnicalSkills,
  getWorkExperiences,
  type WorkExperience,
} from "@/data";

const copy = {
  fr: {
    title: "CV Yoann Andrieux - Dev React Native",
    present: "Présent",
    available: "Ouvert aux échanges - CDI / Freelance / Mission longue",
    experience: "Expériences sélectionnées",
    previous: "Projets React antérieurs",
    management: "Management & opérations",
    creative: "Cinéma & production",
    skills: "Compétences principales",
    human: "Compétences humaines",
    education: "Formation",
    languages: "Langues : Français natif · Anglais professionnel",
    interests: "Musique (bassiste professionnel) · Running · Nature & randonnée · Voyage",
    mobility: "Mobilité : Permis A · Permis B",
  },
  en: {
    title: "Resume Yoann Andrieux - React Native Dev",
    present: "Present",
    available: "Open to conversations - Full-time / Freelance / Long-term",
    experience: "Selected experience",
    previous: "Previous React projects",
    management: "Management & operations",
    creative: "Cinema & production",
    skills: "Core skills",
    human: "Human skills",
    education: "Education",
    languages: "Languages: Native French · Professional English",
    interests: "Music (professional bassist) · Running · Nature & hiking · Travel",
    mobility: "Mobility: motorcycle and car driving licences",
  },
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function profileImage() {
  try {
    const buffer = readFileSync(join(process.cwd(), "public/images/yoann-profile-nobg.png"));
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    return "https://yoann-andrieux.fr/images/yoann-profile-nobg.png";
  }
}

function findCompany(experiences: WorkExperience[], company: string) {
  return experiences.find((item) => item.company === company);
}

function renderMonogram(color = "#F5F2EA") {
  return `<svg viewBox="0 0 48 40" width="45" height="38" fill="none" aria-label="Yoann Andrieux">
    <path d="M4 4 24 22 44 4M24 22v15" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="42" cy="35" r="3" fill="#7DA3FF"/>
  </svg>`;
}

function renderSectionTitle(title: string) {
  return `<div class="section-title"><span>${escapeHtml(title)}</span><i></i></div>`;
}

function renderExperience(
  experience: WorkExperience,
  locale: Locale,
  options: { compact?: boolean; bullets?: number } = {}
) {
  const bullets = options.bullets ?? 2;
  const intro = experience.description.slice(0, options.compact ? 1 : 2).join(". ");
  const detailStart = options.compact ? 1 : 2;
  const detail = experience.description
    .slice(detailStart, detailStart + bullets)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
  const skills = experience.skills
    .slice(0, options.compact ? 4 : 6)
    .map((skill) => `<span>${escapeHtml(skill)}</span>`)
    .join("");
  const href = experience.url
    ? `<a href="${experience.url}" aria-label="${escapeHtml(experience.company)}">↗</a>`
    : "";

  return `<article class="experience ${options.compact ? "compact" : ""}">
    <div class="experience-heading">
      <div>
        <h3>${escapeHtml(experience.company)} ${href}</h3>
        <p class="role">${escapeHtml(experience.role)}</p>
      </div>
      <p class="dates">${escapeHtml(experience.startDate)} - ${escapeHtml(experience.endDate ?? copy[locale].present)}</p>
    </div>
    <p class="summary">${escapeHtml(intro)}${intro.endsWith(".") ? "" : "."}</p>
    ${detail ? `<ul>${detail}</ul>` : ""}
    ${skills ? `<div class="skills">${skills}</div>` : ""}
  </article>`;
}

function renderCompactGroup(experiences: WorkExperience[], locale: Locale) {
  return experiences.map((item) => renderExperience(item, locale, { compact: true, bullets: 0 })).join("");
}

export function renderCvHtml(locale: Locale) {
  const t = copy[locale];
  const profile = getProfile(locale);
  const experiences = getWorkExperiences(locale);
  const technicalSkills = getTechnicalSkills(locale).slice(0, 4);
  const softSkills = getSoftSkills(locale).slice(0, 4);
  const education = getEducation(locale);

  const selectedCompanies = ["KLESIA", "Jaji", "Jobio", "MoodDay", "Loïc Ghanem"];
  const selected = selectedCompanies
    .map((name) => findCompany(experiences, name))
    .filter((item): item is WorkExperience => Boolean(item));

  const previousCompanies = [
    "Weil & Associés",
    "Agence Néon",
    "Caroline Senyk",
    "Nos Instants Précieux",
    "Mail Certificate",
    "Test&Ride",
    "Crazee Burger",
  ];
  const previous = previousCompanies
    .map((name) => findCompany(experiences, name))
    .filter((item): item is WorkExperience => Boolean(item));

  const cyclofix = findCompany(experiences, "Cyclofix (Roulez Jeunesse)");
  const courier = findCompany(experiences, "Couriier - Coursier.fr");
  const creative = experiences.filter((item) =>
    ["cinema", "hors_tech", "intermittent"].includes(item.type)
  );

  const skillCards = technicalSkills
    .map(
      (skill) => `<article class="skill-card">
        <h3>${escapeHtml(skill.title)}</h3>
        <p>${escapeHtml(skill.highlights.slice(0, 3).join(" · "))}</p>
      </article>`
    )
    .join("");

  const humanCards = softSkills
    .map(
      (skill) => `<article class="human-card">
        <h3>${escapeHtml(skill.title)}</h3>
        <p>${escapeHtml(skill.narrative.split(". ").slice(0, 2).join(". "))}.</p>
      </article>`
    )
    .join("");

  const educationCards = education
    .map(
      (item) => `<article class="education-card">
        <strong>${escapeHtml(item.degree)}</strong>
        <span>${escapeHtml(item.school)} · ${escapeHtml(item.year)}</span>
      </article>`
    )
    .join("");

  const creativeCards = creative
    .slice(0, 6)
    .map(
      (item) => `<article class="creative-card">
        <strong>${escapeHtml(item.company)}</strong>
        <span>${escapeHtml(item.role)}</span>
      </article>`
    )
    .join("");

  const previousCards = previous
    .map(
      (item) => `<article class="previous-card">
        <strong>${escapeHtml(item.company)}</strong>
        <span>${escapeHtml(item.role)}</span>
        <p>${escapeHtml(item.description[0] ?? "")}</p>
      </article>`
    )
    .join("");

  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(t.title)}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    p, li { orphans: 3; widows: 3; }
    html, body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #0D1728; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 210mm; height: 297mm; overflow: hidden; position: relative; padding: 12mm 12mm 10mm; }
    .page + .page { page-break-before: always; }
    .page::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 2.4mm; background: #2457E6; }
    .header { height: 53mm; margin: -12mm -12mm 7mm; padding: 10mm 12mm 8mm 16mm; background: #0D1728; color: #F5F2EA; display: grid; grid-template-columns: 26mm 1fr; gap: 7mm; position: relative; overflow: hidden; }
    .portrait { position: absolute; left: 9mm; bottom: 0; width: 34mm; height: 47mm; object-fit: contain; object-position: bottom; filter: grayscale(1); }
    .brand { position: relative; z-index: 2; }
    .intro { grid-column: 2; position: relative; z-index: 2; }
    .intro h1 { margin: 0; font-size: 25pt; line-height: .95; letter-spacing: -.6pt; text-transform: uppercase; }
    .intro .title { margin: 1.5mm 0 0; color: #7DA3FF; font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: .4pt; }
    .availability { margin: 2mm 0 0; color: #4ADE80; font-size: 7pt; font-weight: 700; }
    .bio { margin: 2.4mm 0 0; max-width: 145mm; color: #CBD5E1; font-size: 7.7pt; line-height: 1.4; }
    .contact { margin: 2.2mm 0 0; color: #94A3B8; font-size: 7pt; }
    .contact a { color: #7DA3FF; text-decoration: none; }
    .section-title { margin: 0 0 3mm; display: flex; align-items: center; gap: 3mm; break-after: avoid; }
    .section-title span { font-size: 12pt; font-weight: 800; text-transform: uppercase; letter-spacing: -.1pt; }
    .section-title i { display: block; height: 1px; flex: 1; background: #CBD5E1; }
    .experience { break-inside: avoid; page-break-inside: avoid; border-left: 1.2mm solid #2457E6; padding: 0 0 2.8mm 3mm; margin-bottom: 2.8mm; }
    .experience-heading { display: flex; align-items: start; justify-content: space-between; gap: 6mm; }
    .experience h3 { margin: 0; font-size: 9.8pt; line-height: 1.05; }
    .experience h3 a { color: #2457E6; text-decoration: none; }
    .role { margin: .6mm 0 0; color: #2457E6; font-size: 7.7pt; font-weight: 700; }
    .dates { margin: 0; color: #64748B; font-size: 6.7pt; white-space: nowrap; }
    .summary { margin: 1.2mm 0 0; color: #334155; font-size: 7.2pt; line-height: 1.35; font-style: italic; }
    .experience ul { margin: 1mm 0 0; padding: 0 0 0 3.5mm; color: #475569; font-size: 6.9pt; line-height: 1.35; }
    .skills { margin-top: 1.2mm; display: flex; flex-wrap: wrap; gap: 1mm; }
    .skills span { padding: .65mm 1.6mm; border: .25mm solid #D7DFEA; border-radius: .8mm; color: #475569; font-size: 6.2pt; }
    .compact { border-left-width: .7mm; padding-bottom: 1.8mm; margin-bottom: 1.8mm; }
    .compact .summary { font-size: 6.8pt; }
    .compact .skills { display: none; }
    .grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 2.2mm; }
    .skill-card, .human-card, .education-card { break-inside: avoid; border: .25mm solid #D7DFEA; padding: 1.8mm 2mm; background: #F8FAFC; }
    .skill-card h3, .human-card h3 { margin: 0; font-size: 8pt; }
    .skill-card p, .human-card p { margin: .7mm 0 0; color: #64748B; font-size: 6.2pt; line-height: 1.28; }
    .creative-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 4mm; margin-bottom: 3mm; break-inside: avoid; }
    .creative-card { padding-left: 2mm; border-left: .7mm solid #2457E6; }
    .creative-card strong { display: block; font-size: 7.2pt; line-height: 1.15; }
    .creative-card span { display: block; margin-top: .5mm; color: #64748B; font-size: 6.2pt; line-height: 1.2; }
    .previous-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 3mm; margin-bottom: 3mm; break-inside: avoid; }
    .previous-card { min-height: 14mm; padding: 1.6mm 2mm; border-left: .7mm solid #2457E6; background: #F8FAFC; break-inside: avoid; }
    .previous-card strong { display: block; font-size: 7.5pt; line-height: 1.1; }
    .previous-card span { display: block; margin-top: .5mm; color: #2457E6; font-size: 6.3pt; font-weight: 700; }
    .previous-card p { margin: .8mm 0 0; color: #475569; font-size: 6pt; line-height: 1.25; font-style: italic; }
    .education { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2mm; }
    .education-card { text-align: center; }
    .education-card strong { display: block; font-size: 7pt; }
    .education-card span { display: block; margin-top: .8mm; color: #64748B; font-size: 6.3pt; }
    .meta { margin-top: 3mm; padding-top: 2.5mm; border-top: .25mm solid #CBD5E1; color: #475569; font-size: 6.8pt; line-height: 1.6; }
    .footer { position: absolute; left: 12mm; right: 12mm; bottom: 5mm; display: flex; justify-content: space-between; color: #64748B; font-size: 6.2pt; }
    .footer a { color: #2457E6; text-decoration: none; }
  </style>
</head>
<body>
  <section class="page">
    <header class="header">
      <div class="brand">${renderMonogram()}</div>
      <img class="portrait" src="${profileImage()}" alt="" />
      <div class="intro">
        <h1>${escapeHtml(profile.firstName)} ${escapeHtml(profile.lastName)}</h1>
        <p class="title">${escapeHtml(profile.title)}</p>
        <p class="availability">● ${escapeHtml(t.available)}</p>
        <p class="bio">${escapeHtml(profile.bio)}</p>
        <p class="contact">yoann.andrieux@gmail.com · +33 6 63 43 46 65 · <a href="https://yoann-andrieux.fr">yoann-andrieux.fr</a> · <a href="https://www.linkedin.com/in/yoann-andrieux/">LinkedIn</a> · <a href="https://github.com/YoannDrx">GitHub</a></p>
      </div>
    </header>
    ${renderSectionTitle(t.experience)}
    ${selected.map((item, index) => renderExperience(item, locale, { bullets: index < 2 ? 3 : 2 })).join("")}
    <footer class="footer"><span>YOANN ANDRIEUX / PORTFOLIO</span><span>01 / 02</span></footer>
  </section>

  <section class="page">
    ${renderSectionTitle(t.previous)}
    <div class="previous-grid">${previousCards}</div>

    ${renderSectionTitle(t.management)}
    ${cyclofix ? renderExperience(cyclofix, locale, { bullets: 3 }) : ""}
    ${courier ? renderExperience(courier, locale, { compact: true, bullets: 1 }) : ""}

    ${renderSectionTitle(t.creative)}
    <div class="creative-grid">${creativeCards}</div>

    ${renderSectionTitle(t.skills)}
    <div class="grid-two">${skillCards}</div>

    <div style="height:3mm"></div>
    ${renderSectionTitle(t.human)}
    <div class="grid-two">${humanCards}</div>

    <div style="height:3mm"></div>
    ${renderSectionTitle(t.education)}
    <div class="education">${educationCards}</div>

    <div class="meta">${escapeHtml(t.languages)}<br />${escapeHtml(t.interests)}<br />${escapeHtml(t.mobility)}</div>
    <footer class="footer"><span><a href="https://yoann-andrieux.fr">yoann-andrieux.fr</a> · <a href="https://www.linkedin.com/in/yoann-andrieux/">LinkedIn</a> · <a href="https://github.com/YoannDrx">GitHub</a></span><span>02 / 02</span></footer>
  </section>
</body>
</html>`;
}
