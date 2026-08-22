import type { Locale } from "@/i18n/locales";
import { getAiContent } from "./ai";
import { getCaseStudySummaries } from "./case-studies";
import { getEducation, getWorkExperiences } from "./resume";
import { getExperiences } from "./experiences";
import { getProfile } from "./profile";
import {
  getSkillStoryIntro,
  getSoftSkills,
  getTechnicalSkills,
} from "./skills";
import { getSocialLinks } from "./social";
import type { Experience, ExperienceType } from "./types";

export type ViewMode = "web" | "iphone";
export type PortfolioSectionId = "home" | "work" | "skills" | "resume" | "contact";

export type PortfolioNavItem = {
  id: PortfolioSectionId;
  webAnchor: string;
  label: string;
};

export type PortfolioContent = ReturnType<typeof getPortfolioContent>;

export const DEV_EXPERIENCE_TYPES: ExperienceType[] = [
  "cdi",
  "freelance",
  "personal",
  "ponctuel",
];

export const EXPERIENCE_TYPE_ORDER: ExperienceType[] = [
  "cdi",
  "freelance",
  "personal",
  "ponctuel",
  "ops",
  "cinema",
  "hors_tech",
];

export function getExperienceTypeLabel(type: ExperienceType, locale: Locale) {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: "Freelance", en: "Freelance" },
    cdi: { fr: "CDI", en: "Full-time" },
    personal: { fr: "Personnel", en: "Personal" },
    ponctuel: { fr: "Mission", en: "Contract" },
    hors_tech: { fr: "Production", en: "Production" },
    cinema: { fr: "Cinéma", en: "Cinema" },
    ops: { fr: "Management", en: "Management" },
  };
  return labels[type][locale];
}

export function getExperienceTypeClasses(type: ExperienceType) {
  if (type === "cdi") return "border-emerald-600/35 text-emerald-700 dark:text-emerald-300";
  if (type === "cinema") return "border-amber-600/35 text-amber-700 dark:text-amber-300";
  if (type === "ops") return "border-teal-600/35 text-teal-700 dark:text-teal-300";
  if (type === "hors_tech") return "border-violet-600/35 text-violet-700 dark:text-violet-300";
  return "border-primary/35 text-primary";
}

function requiredExperience(experiences: Experience[], name: string) {
  const experience = experiences.find((item) => item.name === name);
  if (!experience) throw new Error(`Missing featured experience: ${name}`);
  return experience;
}

export function getPortfolioContent(locale: Locale) {
  const experiences = getExperiences(locale);
  const caseStudyOrder = ["pressay", "jobio", "moodday", "mycryptopilot"];
  const caseStudies = getCaseStudySummaries(locale).toSorted(
    (left, right) =>
      caseStudyOrder.indexOf(left.slug) - caseStudyOrder.indexOf(right.slug)
  );
  const featuredMobile = [
    requiredExperience(experiences, "KLESIA"),
    requiredExperience(experiences, "Jaji"),
  ];

  const nav: PortfolioNavItem[] = [
    { id: "home", webAnchor: "top", label: locale === "en" ? "Home" : "Accueil" },
    { id: "work", webAnchor: "work", label: locale === "en" ? "Work" : "Projets" },
    { id: "skills", webAnchor: "skills", label: locale === "en" ? "Skills" : "Compétences" },
    { id: "resume", webAnchor: "resume", label: locale === "en" ? "Resume" : "CV" },
    { id: "contact", webAnchor: "contact", label: "Contact" },
  ];

  return {
    locale,
    profile: getProfile(locale),
    nav,
    featuredMobile,
    caseStudies,
    experiences,
    technicalSkills: getTechnicalSkills(locale),
    softSkills: getSoftSkills(locale),
    skillStoryIntro: getSkillStoryIntro(locale),
    ai: getAiContent(locale),
    workExperiences: getWorkExperiences(locale),
    education: getEducation(locale),
    socialLinks: getSocialLinks(locale),
    copy:
      locale === "en"
        ? {
            eyebrow: "Mobile engineering · Product craft",
            stack: "React Native · React · Next.js · TypeScript · Product & UX",
            projects: "View my work",
            download: "Download my resume",
            contact: "Contact me",
            featured: "Selected work",
            featuredTitle: "Mobile foundations, product decisions",
            featuredIntro:
              "Production React Native experience first, followed by four case studies showing framing, trade-offs and delivery.",
            fullJourney: "Complete journey",
            fullJourneyIntro:
              "All of my technical, management and creative experience remains available without competing with the main evidence.",
            selection: "Selection",
            journey: "Full journey",
            readCase: "Read the case study",
            details: "View details",
            skillsTitle: "Skills proven through delivery",
            resumeTitle: "A path built across disciplines",
            contactTitle: "A role, team or product to discuss?",
            contactIntro:
              "Tell me about the context, the team and the problems you want to solve. I’ll reply with the same level of care.",
          }
        : {
            eyebrow: "Ingénierie mobile · Culture produit",
            stack: "React Native · React · Next.js · TypeScript · Produit & UX",
            projects: "Voir mes projets",
            download: "Télécharger mon CV",
            contact: "Me contacter",
            featured: "Sélection recruteur",
            featuredTitle: "Du mobile en production aux décisions produit",
            featuredIntro:
              "D’abord mes expériences React Native en production, puis quatre études de cas qui rendent visibles le cadrage, les arbitrages et la livraison.",
            fullJourney: "Parcours complet",
            fullJourneyIntro:
              "Toutes mes expériences techniques, managériales et créatives restent accessibles sans concurrencer les preuves principales.",
            selection: "Sélection",
            journey: "Parcours complet",
            readCase: "Lire l’étude de cas",
            details: "Voir le détail",
            skillsTitle: "Des compétences prouvées par la livraison",
            resumeTitle: "Un parcours construit entre plusieurs métiers",
            contactTitle: "Un poste, une équipe ou un produit à me présenter ?",
            contactIntro:
              "Parlez-moi du contexte, de l’équipe et des problèmes à résoudre. Je vous répondrai avec le même niveau de soin.",
          },
  };
}
