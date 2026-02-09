import {
  Activity,
  AdminStore,
  ApplicationItem,
  ContentSnapshot,
  ExperienceAsset,
  Persona,
} from "./types";

export const activities: Activity[] = [
  {
    id: "software",
    name: "Developpement logiciel",
    tagline: "React, React Native, produit digital",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "event",
    name: "Evenementiel",
    tagline: "Production, coordination, exploitation",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "courier",
    name: "Coursier velo",
    tagline: "Livraison urbaine, discipline terrain",
    color: "from-emerald-500 to-teal-600",
  },
];

export const personas: Persona[] = [
  {
    id: "software-react-native",
    activityId: "software",
    name: "Dev React Native",
    headline: "Developpeur mobile React Native orienté produit",
    targetRoles: ["React Native Developer", "Frontend Mobile Developer", "Mobile Engineer"],
    baseSummary:
      "Developpeur React Native avec experience en architecture modulaire, maintenance legacy et livraison de features business sur iOS/Android.",
    coreSkills: ["React Native", "TypeScript", "Redux", "Next.js", "iOS", "Android", "Clean Architecture"],
    atsKeywords: ["react native", "typescript", "mobile", "ios", "android", "redux", "scrum", "app store"],
  },
  {
    id: "event-operations",
    activityId: "event",
    name: "Coordination evenementielle",
    headline: "Coordinateur operations evenementielles",
    targetRoles: ["Coordinateur evenementiel", "Responsable operations", "Chef de projet evenementiel"],
    baseSummary:
      "Profil operationnel avec experience de coordination d'equipes, gestion de planning et execution sous forte contrainte temps.",
    coreSkills: ["Coordination", "Gestion d'equipe", "Logistique", "Relation prestataires", "Resolution de probleme"],
    atsKeywords: ["evenement", "coordination", "planning", "prestataires", "logistique", "operationnel", "terrain"],
  },
  {
    id: "courier-urban",
    activityId: "courier",
    name: "Coursier urbain",
    headline: "Coursier velo fiable et autonome",
    targetRoles: ["Coursier velo", "Livreur urbain", "Agent logistique dernier kilometre"],
    baseSummary:
      "Profil terrain discipline, rapide et autonome, habitue a tenir des objectifs de ponctualite et qualite de service.",
    coreSkills: ["Ponctualite", "Orientation urbaine", "Endurance", "Service client", "Gestion priorites"],
    atsKeywords: ["coursier", "livraison", "velo", "ponctualite", "autonomie", "terrain", "logistique"],
  },
];

export const experienceAssets: ExperienceAsset[] = [
  {
    id: "asset-klesia-mobile",
    activityId: "software",
    title: "Developpeur applications mobiles",
    organization: "KLESIA",
    period: "Janv. 2025 - Present",
    location: "Montreuil (hybrid)",
    verified: true,
    highlights: [
      "Maintenance React Native et refactoring de code legacy",
      "Developpement de nouvelles features en marque blanche",
      "Resolution de bugs et hotfix sur app en production",
    ],
    skills: ["React Native", "TypeScript", "Redux", "iOS", "Android"],
    metrics: ["Application distribuee a grande echelle", "Equipe mobile pluridisciplinaire"],
  },
  {
    id: "asset-jaji-mobile",
    activityId: "software",
    title: "Developpeur applications mobiles",
    organization: "Jaji",
    period: "Sept. 2023 - Janv. 2025",
    location: "Paris (hybrid)",
    verified: true,
    highlights: [
      "Developpement de nouvelles fonctionnalites produit",
      "Resolution de bugs critiques et stabilisation",
      "Travail en methode Agile / Scrum / SAFe",
    ],
    skills: ["React Native", "TypeScript", "Redux", "Agile"],
    metrics: ["Cycle de livraison continu", "Collaboration produit/design/dev"],
  },
  {
    id: "asset-freelance-next",
    activityId: "software",
    title: "Developpeur front-end React / Next.js",
    organization: "Freelance (plusieurs clients)",
    period: "2023 - 2024",
    location: "Paris / remote",
    verified: true,
    highlights: [
      "Conception et developpement de sites et applications web",
      "Mise en place de back-offices et workflows CRUD",
      "Optimisations SEO et performances",
    ],
    skills: ["Next.js", "React", "Tailwind", "Node.js"],
    metrics: ["Plusieurs projets livres from scratch", "Interventions en contexte client varie"],
  },
  {
    id: "asset-cyclofix-operations",
    activityId: "event",
    title: "Responsable des operations",
    organization: "Cyclofix",
    period: "Mai 2016 - Aout 2022",
    location: "Paris",
    verified: true,
    highlights: [
      "Gestion des partenariats B2B et de l'activite operationnelle",
      "Recrutement et integration de plus de 1000 independants",
      "Optimisation de process et automatisations (Zapier, Airtable)",
    ],
    skills: ["Operations", "Management", "B2B", "Recrutement", "Airtable"],
    metrics: ["1000+ independants integres", "Process operationnels standardises"],
  },
  {
    id: "asset-event-template",
    activityId: "event",
    title: "Mission evenementielle a detailler",
    organization: "A renseigner",
    period: "A renseigner",
    location: "A renseigner",
    verified: false,
    highlights: [
      "Ajouter ici une mission evenementielle concrete",
      "Ajouter un resultat chiffre (delai, equipe, budget)",
    ],
    skills: ["Coordination", "Logistique", "Execution"],
    metrics: ["A completer"],
  },
  {
    id: "asset-courier-template",
    activityId: "courier",
    title: "Experience coursier velo a detailler",
    organization: "A renseigner",
    period: "A renseigner",
    location: "A renseigner",
    verified: false,
    highlights: [
      "Ajouter ici un contexte de livraison concret",
      "Preciser cadence et contraintes terrain",
    ],
    skills: ["Ponctualite", "Autonomie", "Service client"],
    metrics: ["A completer"],
  },
];

export const applications: ApplicationItem[] = [
  {
    id: "app-1",
    company: "Agence Mobile Paris",
    role: "React Native Developer",
    status: "interview",
    lastUpdate: "2026-02-07",
    personaId: "software-react-native",
    source: "LinkedIn",
  },
  {
    id: "app-2",
    company: "Studio Event Ops",
    role: "Coordinateur evenementiel",
    status: "applied",
    lastUpdate: "2026-02-05",
    personaId: "event-operations",
    source: "Welcome to the Jungle",
  },
  {
    id: "app-3",
    company: "Fleet City",
    role: "Coursier velo",
    status: "target",
    lastUpdate: "2026-02-02",
    personaId: "courier-urban",
    source: "Indeed",
  },
];

export const contentSnapshots: ContentSnapshot[] = [
  {
    id: "snapshot-1",
    label: "Portfolio public - baseline",
    status: "published",
    updatedAt: "2026-02-01 10:20",
    updatedBy: "yoann",
    notes: "Version stable orientee recruteurs dev.",
  },
  {
    id: "snapshot-2",
    label: "Ajout projet SaaS 2025",
    status: "draft",
    updatedAt: "2026-02-08 19:42",
    updatedBy: "yoann",
    notes: "Brouillon enrichi des projets perso avec stats.",
  },
];

export function createAdminStoreSeed(): AdminStore {
  return {
    activities: structuredClone(activities),
    personas: structuredClone(personas),
    experienceAssets: structuredClone(experienceAssets),
    applications: structuredClone(applications),
    contentSnapshots: structuredClone(contentSnapshots),
    adminUsers: [],
    updatedAt: new Date().toISOString(),
  };
}

export function getPersonaById(personaId: string, list: Persona[] = personas) {
  return list.find((persona) => persona.id === personaId);
}

export function getAssetsByActivity(activityId: Activity["id"], assets: ExperienceAsset[] = experienceAssets) {
  return assets.filter((asset) => asset.activityId === activityId);
}
