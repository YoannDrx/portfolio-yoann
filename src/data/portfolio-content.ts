import type { Locale } from "@/i18n/locales";
import { getAiContent } from "./ai";
import { getCaseStudy, getCaseStudySummaries, type CaseStudySlug } from "./case-studies";
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
export type MotionMode = "full" | "reduced" | "static";
export type SceneQuality = "high" | "balanced" | "static";
export type PortfolioSceneId = "hero" | "mode-transition" | "showreel" | "career";
export type ViewTransitionState = "idle" | "preparing" | "morphing" | "settling";
export type WorkPresentation = "phone" | "browser" | "desktop-app";
export type FeaturedWorkId =
  | "klesia"
  | "jaji"
  | "pressay"
  | "jobio"
  | "moodday"
  | "mycryptopilot";

export type FeaturedWorkItem = {
  id: FeaturedWorkId;
  sourceType: "experience" | "case-study";
  presentation: WorkPresentation;
  title: string;
  category: string;
  summary: string;
  constraint: string;
  decision: string;
  impact: string;
  proof: { value: string; label: string; detail: string };
  media: { primary: string; secondary?: string; gallery?: string[]; logo?: string; alt: string };
  accent: string;
  destination:
    | { type: "panel"; experienceId: string }
    | { type: "route"; slug: CaseStudySlug };
};

export type Capability = {
  id: "react-native" | "react-next" | "architecture" | "product-ux";
  title: string;
  summary: string;
  proofWorkIds: FeaturedWorkId[];
  decisions: string[];
  outcomes: string[];
};

export type CareerChapter = {
  id: "cinema" | "operations" | "product" | "mobile";
  label: string;
  period: string;
  experienceIds: string[];
  transferStatement: string;
  media: string[];
};

export type ContactIntent = {
  id: "full-time" | "freelance" | "long-term";
  label: string;
  heading: string;
  placeholder: string;
  payloadPrefix: string;
};

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

function getFeaturedWork(locale: Locale, experiences: Experience[]): FeaturedWorkItem[] {
  const klesia = requiredExperience(experiences, "KLESIA");
  const jaji = requiredExperience(experiences, "Jaji");
  const localized = locale === "en";

  const mobile: FeaturedWorkItem[] = [
    {
      id: "klesia",
      sourceType: "experience",
      presentation: "phone",
      title: klesia.name,
      category: localized ? "Mobile insurance · Production" : "Assurance mobile · Production",
      summary: klesia.description,
      constraint: localized
        ? "Make one multi-tenant application support business modules, brands and delivery environments without fragmenting the experience."
        : "Faire vivre dans une même application multi-tenant des modules métier, des marques et des environnements de livraison différents.",
      decision: localized
        ? "A Clean/DDD modular foundation, typed boundaries and a shared design system across iOS and Android."
        : "Un socle modulaire Clean/DDD, des frontières typées et un design system commun à iOS et Android.",
      impact: localized
        ? "A production application that remains evolvable across 22+ business modules and 12 delivery configurations."
        : "Une application en production qui reste évolutive sur 22+ modules métier et 12 configurations de livraison.",
      proof: {
        value: klesia.stats.downloads,
        label: localized ? "production downloads" : "téléchargements en production",
        detail: localized ? "Public mobile distribution" : "Distribution mobile publique",
      },
      media: {
        primary: "/images/projects/klesia-appstore-01.webp",
        gallery: [
          "/images/projects/klesia-appstore-01.webp",
          "/images/projects/klesia-appstore-02.webp",
          "/images/projects/klesia-appstore-03.webp",
        ],
        alt: localized ? "KLESIA mobile application" : "Application mobile KLESIA",
      },
      accent: "#2563EB",
      destination: { type: "panel", experienceId: klesia.id },
    },
    {
      id: "jaji",
      sourceType: "experience",
      presentation: "phone",
      title: jaji.name,
      category: localized ? "Mobile health insurance · Product team" : "Mutuelle mobile · Équipe produit",
      summary: jaji.description,
      constraint: localized
        ? "Deliver sensitive health-insurance journeys while keeping state, notifications and native behavior predictable."
        : "Livrer des parcours de mutuelle sensibles en gardant les états, notifications et comportements natifs prévisibles.",
      decision: localized
        ? "Hybrid Redux/RxJS state, explicit domain mapping and observable Firebase delivery signals."
        : "Un état hybride Redux/RxJS, des mappings métier explicites et une livraison observable avec Firebase.",
      impact: localized
        ? "Core reimbursement, contract, beneficiary and document journeys delivered in a production app."
        : "Les parcours remboursements, contrats, bénéficiaires et documents livrés dans une application en production.",
      proof: {
        value: jaji.stats.downloads,
        label: localized ? "mobile downloads" : "téléchargements mobiles",
        detail: localized ? "iOS and Android distribution" : "Distribution iOS et Android",
      },
      media: {
        primary: "/images/projects/jaji-appstore-01.webp",
        gallery: [
          "/images/projects/jaji-appstore-01.webp",
          "/images/projects/jaji-appstore-02.webp",
          "/images/projects/jaji-appstore-03.webp",
        ],
        alt: localized ? "Jaji mobile application" : "Application mobile Jaji",
      },
      accent: "#0F9F7A",
      destination: { type: "panel", experienceId: jaji.id },
    },
  ];

  const caseOrder: Array<{ slug: CaseStudySlug; presentation: WorkPresentation }> = [
    { slug: "pressay", presentation: "desktop-app" },
    { slug: "jobio", presentation: "browser" },
    { slug: "moodday", presentation: "browser" },
    { slug: "mycryptopilot", presentation: "browser" },
  ];

  const cases = caseOrder.map(({ slug, presentation }): FeaturedWorkItem => {
    const study = getCaseStudy(locale, slug);
    if (!study) throw new Error(`Missing case study: ${slug}`);
    const decision = study.decisions[0];
    const textureBySlug: Partial<Record<CaseStudySlug, string>> = {
      pressay: "/images/projects/pressay-home-dark.webp",
      jobio: "/images/projects/jobio-texture.webp",
      moodday: "/images/projects/moodday-home-current.webp",
    };
    const logoBySlug: Partial<Record<CaseStudySlug, string>> = {
      moodday: "/images/projects/moodday-icon-current.webp",
    };
    return {
      id: slug,
      sourceType: "case-study",
      presentation,
      title: study.name,
      category: study.eyebrow,
      summary: study.summary,
      constraint: study.constraints[0] ?? study.context[0],
      decision: decision?.choice ?? study.delivered[0],
      impact: study.delivered[0] ?? study.nextSteps[0],
      proof: study.evidence[0],
      media: {
        primary: textureBySlug[slug] ?? study.image,
        secondary: study.secondaryImage,
        logo: logoBySlug[slug],
        gallery: slug === "pressay"
          ? [
              "/images/projects/pressay-home-dark.webp",
              "/images/projects/pressay-modes-light.webp",
            ]
          : undefined,
        alt: `${study.name} — ${study.tagline}`,
      },
      accent: study.accent,
      destination: { type: "route", slug },
    };
  });

  return [...mobile, ...cases];
}

function getCapabilities(locale: Locale): Capability[] {
  if (locale === "en") {
    return [
      {
        id: "react-native",
        title: "React Native in production",
        summary: "Native-feeling journeys, business modules and reliable iOS/Android delivery on applications used at scale.",
        proofWorkIds: ["klesia", "jaji"],
        decisions: ["Modular domain boundaries", "Shared UI foundations", "Observable multi-environment delivery"],
        outcomes: ["100K+ production downloads", "22+ business modules", "59+ shared UI components"],
      },
      {
        id: "react-next",
        title: "React & Next.js products",
        summary: "Products framed, designed and delivered end to end, with a focus on the smallest useful workflow.",
        proofWorkIds: ["jobio", "moodday", "mycryptopilot"],
        decisions: ["Server-first product boundaries", "Offline and optimistic workflows", "Deterministic exports and permissions"],
        outcomes: ["Production-grade prototypes", "Verifiable test baselines", "Clear release limits"],
      },
      {
        id: "architecture",
        title: "Architecture, TypeScript & quality",
        summary: "Explicit contracts, maintainable modules and verification that follows the actual product risks.",
        proofWorkIds: ["klesia", "pressay", "jobio"],
        decisions: ["Typed domain and service boundaries", "Idempotent operations", "Tests tied to failure modes"],
        outcomes: ["Safer refactors", "Observable failures", "Readable handover"],
      },
      {
        id: "product-ux",
        title: "Product craft & UX",
        summary: "A cinema-trained eye for rhythm and detail, combined with management experience and product trade-offs.",
        proofWorkIds: ["moodday", "pressay", "jaji"],
        decisions: ["Shorter core journeys", "Accessible native patterns", "AI used as a workflow tool, not a promise"],
        outcomes: ["Clearer product scope", "Less interaction friction", "Decisions recruiters can inspect"],
      },
    ];
  }

  return [
    {
      id: "react-native",
      title: "React Native en production",
      summary: "Des parcours natifs, des modules métier et une livraison iOS/Android fiable sur des applications utilisées à grande échelle.",
      proofWorkIds: ["klesia", "jaji"],
      decisions: ["Frontières métier modulaires", "Socle UI partagé", "Livraison multi-environnement observable"],
      outcomes: ["100K+ téléchargements en production", "22+ modules métier", "59+ composants UI partagés"],
    },
    {
      id: "react-next",
      title: "Produits React & Next.js",
      summary: "Des produits cadrés, conçus et livrés de bout en bout, concentrés sur le plus petit workflow réellement utile.",
      proofWorkIds: ["jobio", "moodday", "mycryptopilot"],
      decisions: ["Frontières produit côté serveur", "Parcours offline et optimistes", "Exports et permissions déterministes"],
      outcomes: ["Prototypes prêts pour la production", "Baselines de tests vérifiables", "Limites de release explicites"],
    },
    {
      id: "architecture",
      title: "Architecture, TypeScript & qualité",
      summary: "Des contrats explicites, des modules maintenables et des vérifications alignées sur les risques réels du produit.",
      proofWorkIds: ["klesia", "pressay", "jobio"],
      decisions: ["Frontières domaine et services typées", "Opérations idempotentes", "Tests liés aux modes de panne"],
      outcomes: ["Refactors plus sûrs", "Erreurs observables", "Reprise de code lisible"],
    },
    {
      id: "product-ux",
      title: "Culture produit & UX",
      summary: "Un regard formé par le cinéma, six années de management et des arbitrages produit rendus visibles.",
      proofWorkIds: ["moodday", "pressay", "jaji"],
      decisions: ["Parcours cœur raccourcis", "Conventions natives accessibles", "IA utilisée comme outil, jamais comme promesse"],
      outcomes: ["Périmètres plus clairs", "Moins de friction", "Décisions inspectables par un recruteur"],
    },
  ];
}

function getCareerChapters(locale: Locale): CareerChapter[] {
  const english = locale === "en";
  return [
    {
      id: "cinema",
      label: english ? "Cinema & projection" : "Cinéma & projection",
      period: "2004—2026",
      experienceIds: ["0c", "0d"],
      transferStatement: english
        ? "Every frame matters: preparation, calibration and calm under live constraints shaped my attention to user experience."
        : "Chaque frame compte : préparation, calibration et sang-froid sous contrainte ont construit mon attention à l’expérience utilisateur.",
      media: ["/images/projects/oppenheimer-cabine-rex.webp", "/images/projects/avatar-cabine-projection.webp"],
    },
    {
      id: "operations",
      label: english ? "Operations & management" : "Opérations & management",
      period: "2016—2022",
      experienceIds: ["8"],
      transferStatement: english
        ? "Six years coordinating people and operations taught me to clarify a framework, listen and deliver under pressure."
        : "Six années à coordonner des personnes et des opérations m’ont appris à clarifier un cadre, écouter et livrer sous pression.",
      media: ["/images/projects/roulez-jeunesse-landing.png", "/images/projects/roulez-jeunesse-reparations.png"],
    },
    {
      id: "product",
      label: english ? "Web products" : "Produits web",
      period: "2022—2026",
      experienceIds: ["1c", "1d", "3"],
      transferStatement: english
        ? "Moving from interfaces to products meant learning to reduce scope, expose trade-offs and verify delivery."
        : "Passer des interfaces aux produits m’a appris à réduire le périmètre, exposer les arbitrages et vérifier la livraison.",
      media: ["/images/projects/jobio-landing.png", "/images/projects/moodday-home-current.webp"],
    },
    {
      id: "mobile",
      label: "React Native",
      period: "2023—2026",
      experienceIds: ["1", "2"],
      transferStatement: english
        ? "Mobile brings the whole path together: technical rigor, product empathy and care for every interaction."
        : "Le mobile réunit tout le parcours : rigueur technique, empathie produit et soin porté à chaque interaction.",
      media: ["/images/projects/klesia-landing.png", "/images/projects/jaji-landing.png"],
    },
  ];
}

function getContactIntents(locale: Locale): ContactIntent[] {
  return locale === "en"
    ? [
        { id: "full-time", label: "Full-time", heading: "A product team to join?", placeholder: "Tell me about the role, the team and the product challenges…", payloadPrefix: "Full-time opportunity" },
        { id: "freelance", label: "Freelance", heading: "A focused mission to deliver?", placeholder: "Describe the mission, timing and expected outcome…", payloadPrefix: "Freelance mission" },
        { id: "long-term", label: "Long-term", heading: "A long-term product challenge?", placeholder: "Share the context, collaboration model and roadmap…", payloadPrefix: "Long-term mission" },
      ]
    : [
        { id: "full-time", label: "CDI", heading: "Une équipe produit à rejoindre ?", placeholder: "Présentez-moi le poste, l’équipe et les enjeux produit…", payloadPrefix: "Opportunité CDI" },
        { id: "freelance", label: "Freelance", heading: "Une mission ciblée à livrer ?", placeholder: "Décrivez la mission, le calendrier et le résultat attendu…", payloadPrefix: "Mission freelance" },
        { id: "long-term", label: "Mission longue", heading: "Un produit à accompagner dans la durée ?", placeholder: "Partagez le contexte, le mode de collaboration et la roadmap…", payloadPrefix: "Mission longue" },
      ];
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
  const featuredWork = getFeaturedWork(locale, experiences);

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
    featuredWork,
    caseStudies,
    experiences,
    capabilities: getCapabilities(locale),
    careerChapters: getCareerChapters(locale),
    contactIntents: getContactIntents(locale),
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
