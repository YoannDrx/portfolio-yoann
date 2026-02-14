/**
 * Resume Data
 * Expériences professionnelles et formations
 */

import type { WorkExperience, Education } from "./types";
import type { Locale } from "@/i18n/locales";

const experiencesByLocale: Record<Locale, WorkExperience[]> = {
  fr: [
    {
      id: "1",
      company: "KLESIA",
      role: "Développeur applications mobiles",
      type: "cdi",
      startDate: "Janv. 2025",
      endDate: undefined,
      location: "Montreuil",
      remote: "hybrid",
      description: [
        "Maintenance React Native",
        "Refacto code legacy",
        "Amélioration archi et codebase",
        "Développement de nouvelles features en marque blanche",
        "Résolution de bugs et hotfix",
      ],
      skills: ["React Native", "iOS", "Android Studio", "Xcode", "Node.js"],
      url: "https://www.klesia.fr/",
    },
    {
      id: "2",
      company: "Jaji",
      role: "Développeur applications mobiles",
      type: "cdi",
      startDate: "Sept. 2023",
      endDate: "Janv. 2025",
      location: "Paris",
      remote: "hybrid",
      description: ["Développement de nouvelles features", "Résolution de bugs", "Méthode Agile / Scrum / Safe"],
      skills: ["React Native", "TypeScript", "Redux"],
      url: "https://jaji.fr/",
    },
    {
      id: "3",
      company: "Weil & Associés",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Nov. 2023",
      endDate: "Févr. 2024",
      location: "Paris",
      remote: "onsite",
      description: [
        "Définir les besoins client",
        "Refonte du design du site et de la DA",
        "Développement avec Next.js et Tailwind",
        "Développement d'un back office",
      ],
      skills: ["Next.js", "Tailwind", "React.js"],
      url: "https://www.weil-paris.fr/",
    },
    {
      id: "4",
      company: "Agence Néon",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Mars 2023",
      endDate: "Janv. 2024",
      location: "Paris",
      remote: "onsite",
      description: [
        "Développement avec Next.js",
        "Maintenance et débogage de sites web et applications existants",
        "Gestion de projets AGILE et SCRUM",
        "Analyse de données Google Analytics",
        "Optimisation SEO",
      ],
      skills: ["React Native", "Next.js", "React.js", "Bootstrap", "Gestion de projet"],
    },
    {
      id: "4b",
      company: "Caroline Senyk",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Oct. 2023",
      endDate: "Déc. 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Développement portfolio artiste avec Next.js",
        "Intégration galerie photo et CMS",
        "Mise en place i18n multi-langues",
      ],
      skills: ["Next.js", "React.js", "Bootstrap", "Prisma", "i18n"],
      url: "https://www.caroline-senyk.fr/",
    },
    {
      id: "4c",
      company: "Loïc Ghanem",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Juil. 2023",
      endDate: "Sept. 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Développement portfolio compositeur musique",
        "Intégration lecteur audio personnalisé",
        "Design responsive et animations",
      ],
      skills: ["Next.js", "React.js", "Bootstrap", "Agile"],
      url: "https://www.loic-ghanem.com/",
    },
    {
      id: "5",
      company: "Nos Instants Précieux",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Mars 2023",
      endDate: "Sept. 2023",
      location: "Paris",
      remote: "onsite",
      description: [
        "Développement du projet en utilisant Next.js et Bootstrap",
        "Gestion de projet AGILE avec le client",
        "Mise en place d'une stratégie SEO",
        "Mise en place de stratégies marketing",
      ],
      skills: ["Next.js", "React.js", "Communication", "Stratégie marketing", "Gestion de projet"],
    },
    {
      id: "6",
      company: "Mail Certificate",
      role: "Développeur front-end React",
      type: "freelance",
      startDate: "Févr. 2023",
      endDate: "Mai 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Développement React.js",
        "Intégration d'un système de paiement (Stripe)",
        "Intégration d'une double authentification 2FA via code mail/sms (Twilio)",
        "Intégration d'un Back-Office pour les tâches CRUD",
        "Maintenance diverse : refonte design, modification wording",
      ],
      skills: ["Next.js", "Node.js", "Express.js", "React.js", "Tailwind"],
      url: "https://www.mail-certificate.com/",
    },
    {
      id: "7",
      company: "Test & Ride",
      role: "Développeur React Native",
      type: "freelance",
      startDate: "Févr. 2023",
      endDate: "Mars 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Développement en React Native",
        "Redux ToolKit & Expo",
        "Node.js & Express.js",
        "MongoDB",
        "Microservices / API (Airtable, GoogleMaps, Api.gouv, Cloudinary)",
      ],
      skills: ["React Native", "Node.js", "MongoDB", "Express.js", "Expo"],
    },
    {
      id: "8",
      company: "Cyclofix",
      role: "Responsable des opérations",
      type: "cdi",
      startDate: "Mai 2016",
      endDate: "Août 2022",
      location: "Paris",
      remote: "onsite",
      description: [
        "Surveillance et analyse du marché de la mobilité",
        "Gestion des partenariats B2B",
        "Gestion du recrutement et de l'intégration de plus de 1000 travailleurs indépendants",
        "Conception d'un entonnoir d'acquisition automatisé (Zapier, Airtable)",
        "Optimisation des procédures opérationnelles",
      ],
      skills: ["Management", "B2B", "Recrutement", "Zapier", "Airtable"],
      url: "https://www.cyclofix.com/",
    },
  ],
  en: [
    {
      id: "1",
      company: "KLESIA",
      role: "Mobile app developer",
      type: "cdi",
      startDate: "Jan. 2025",
      endDate: undefined,
      location: "Montreuil",
      remote: "hybrid",
      description: [
        "React Native maintenance",
        "Legacy code refactoring",
        "Codebase and architecture improvements",
        "White-label feature development",
        "Bug fixes and hotfixes",
      ],
      skills: ["React Native", "iOS", "Android Studio", "Xcode", "Node.js"],
      url: "https://www.klesia.fr/",
    },
    {
      id: "2",
      company: "Jaji",
      role: "Mobile app developer",
      type: "cdi",
      startDate: "Sep. 2023",
      endDate: "Jan. 2025",
      location: "Paris",
      remote: "hybrid",
      description: ["Feature development", "Bug fixing", "Agile / Scrum / SAFe"],
      skills: ["React Native", "TypeScript", "Redux"],
      url: "https://jaji.fr/",
    },
    {
      id: "3",
      company: "Weil & Associés",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Nov. 2023",
      endDate: "Feb. 2024",
      location: "Paris",
      remote: "onsite",
      description: [
        "Define client requirements",
        "Website redesign and visual identity update",
        "Development with Next.js and Tailwind",
        "Back-office development",
      ],
      skills: ["Next.js", "Tailwind", "React.js"],
      url: "https://www.weil-paris.fr/",
    },
    {
      id: "4",
      company: "Agence Néon",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Mar. 2023",
      endDate: "Jan. 2024",
      location: "Paris",
      remote: "onsite",
      description: [
        "Next.js development",
        "Maintenance and debugging of existing websites and apps",
        "Agile / Scrum project management",
        "Google Analytics data analysis",
        "SEO optimization",
      ],
      skills: ["React Native", "Next.js", "React.js", "Bootstrap", "Project management"],
    },
    {
      id: "4b",
      company: "Caroline Senyk",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Oct. 2023",
      endDate: "Dec. 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Artist portfolio development with Next.js",
        "Photo gallery and CMS integration",
        "Multilingual i18n setup",
      ],
      skills: ["Next.js", "React.js", "Bootstrap", "Prisma", "i18n"],
      url: "https://www.caroline-senyk.fr/",
    },
    {
      id: "4c",
      company: "Loïc Ghanem",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Jul. 2023",
      endDate: "Sep. 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "Composer portfolio development",
        "Custom audio player integration",
        "Responsive design and animations",
      ],
      skills: ["Next.js", "React.js", "Bootstrap", "Agile"],
      url: "https://www.loic-ghanem.com/",
    },
    {
      id: "5",
      company: "Nos Instants Précieux",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Mar. 2023",
      endDate: "Sep. 2023",
      location: "Paris",
      remote: "onsite",
      description: [
        "Project development using Next.js and Bootstrap",
        "Agile project management with the client",
        "SEO strategy implementation",
        "Marketing strategy setup",
      ],
      skills: ["Next.js", "React.js", "Communication", "Marketing strategy", "Project management"],
    },
    {
      id: "6",
      company: "Mail Certificate",
      role: "Front-end React developer",
      type: "freelance",
      startDate: "Feb. 2023",
      endDate: "May 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "React.js development",
        "Stripe payment system integration",
        "2FA via email/SMS codes (Twilio)",
        "Back-office integration for CRUD tasks",
        "Maintenance: design refresh and copy updates",
      ],
      skills: ["Next.js", "Node.js", "Express.js", "React.js", "Tailwind"],
      url: "https://www.mail-certificate.com/",
    },
    {
      id: "7",
      company: "Test & Ride",
      role: "React Native developer",
      type: "freelance",
      startDate: "Feb. 2023",
      endDate: "Mar. 2023",
      location: "Paris",
      remote: "remote",
      description: [
        "React Native development",
        "Redux Toolkit & Expo",
        "Node.js & Express.js",
        "MongoDB",
        "Microservices / APIs (Airtable, Google Maps, api.gouv, Cloudinary)",
      ],
      skills: ["React Native", "Node.js", "MongoDB", "Express.js", "Expo"],
    },
    {
      id: "8",
      company: "Cyclofix",
      role: "Operations manager",
      type: "cdi",
      startDate: "May 2016",
      endDate: "Aug. 2022",
      location: "Paris",
      remote: "onsite",
      description: [
        "Mobility market monitoring and analysis",
        "B2B partnership management",
        "Recruitment and onboarding of 1,000+ independent workers",
        "Design of an automated acquisition funnel (Zapier, Airtable)",
        "Operational process optimization",
      ],
      skills: ["Management", "B2B", "Recruitment", "Zapier", "Airtable"],
      url: "https://www.cyclofix.com/",
    },
  ],
};

export const workExperiences: WorkExperience[] = experiencesByLocale.fr;

export function getWorkExperiences(locale: Locale): WorkExperience[] {
  return experiencesByLocale[locale] ?? experiencesByLocale.fr;
}

const educationByLocale: Record<Locale, Education[]> = {
  fr: [
    {
      id: "1",
      degree: "Chef de Projet Web et Mobile",
      school: "La Capsule",
      year: "2023",
    },
    {
      id: "2",
      degree: "Développeur Web Fullstack",
      school: "OpenClassrooms",
      year: "2022",
    },
    {
      id: "3",
      degree: "Licence Cinéma et Audiovisuel",
      school: "Université Paris 8",
      year: "2008",
    },
  ],
  en: [
    {
      id: "1",
      degree: "Web & Mobile Project Manager",
      school: "La Capsule",
      year: "2023",
    },
    {
      id: "2",
      degree: "Full-stack Web Developer",
      school: "OpenClassrooms",
      year: "2022",
    },
    {
      id: "3",
      degree: "Bachelor's degree in Cinema & Audiovisual",
      school: "University Paris 8",
      year: "2008",
    },
  ],
};

export const education: Education[] = educationByLocale.fr;

export function getEducation(locale: Locale): Education[] {
  return educationByLocale[locale] ?? educationByLocale.fr;
}

// Helpers
export const getWorkExperiencesByType = (type: WorkExperience["type"], locale: Locale = "fr") =>
  getWorkExperiences(locale).filter((exp) => exp.type === type);

export const getDevWorkExperiences = (locale: Locale = "fr") =>
  getWorkExperiences(locale).filter((exp) => exp.role.toLowerCase().includes("développeur") || exp.role.toLowerCase().includes("dev"));

export const getTotalYearsOfExperience = (): number => {
  const devStart = new Date("2023-02-01");
  const now = new Date();
  const years = (now.getTime() - devStart.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(years);
};
