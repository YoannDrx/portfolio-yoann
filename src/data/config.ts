/**
 * Site Configuration
 * Configuration globale du portfolio
 */

import type { SiteConfig } from "./types";
import type { Locale } from "@/i18n/locales";

const baseSiteConfig = {
  name: "Portfolio Yoann",
  url: "https://yoann-andrieux.fr",
  ogImage: "/og-image.png",
  theme: {
    primaryColor: "#007AFF", // iOS Blue
    accentColor: "#5856D6", // iOS Indigo
  },
  contact: {
    email: "hello@example.com",
    phone: undefined,
  },
} as const;

const siteConfigs: Record<Locale, SiteConfig> = {
  fr: {
    ...baseSiteConfig,
    description:
      "Portfolio de développeur React Native - Applications mobiles iOS & Android",
    locale: "fr-FR",
    seo: {
      title: "Développeur React Native | Portfolio",
      description:
        "Développeur React Native spécialisé dans la création d'applications mobiles iOS et Android performantes avec des animations fluides.",
      keywords: [
        "React Native",
        "iOS",
        "Android",
        "Développeur mobile",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Freelance",
        "Animations",
        "UX",
        "Développement application",
        "Développeur React",
        "Portfolio développeur",
      ],
    },
  },
  en: {
    ...baseSiteConfig,
    description: "React Native developer portfolio — iOS & Android mobile apps",
    locale: "en-US",
    seo: {
      title: "React Native Developer | Portfolio",
      description:
        "React Native developer focused on building fast, polished iOS and Android apps with smooth animations and great UX.",
      keywords: [
        "React Native",
        "iOS",
        "Android",
        "Mobile Developer",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Freelance",
        "Animations",
        "UX",
        "App Development",
        "React Developer",
        "Developer Portfolio",
      ],
    },
  },
};

export const siteConfig: SiteConfig = siteConfigs.fr;

export function getSiteConfig(locale: Locale): SiteConfig {
  return siteConfigs[locale] ?? siteConfigs.fr;
}

/**
 * Textes de l'interface utilisateur
 */
const uiTextsByLocale = {
  fr: {
    nav: {
      home: "Accueil",
      experiences: "Expériences",
      skills: "Compétences",
      resume: "CV",
      contact: "Contact",
    },
    sections: {
      explorer: "Explorer",
      techStack: "Technologies utilisées",
      toolsEnvironment: "Outils & Environnement",
      sendMessage: "Envoyez-moi un message",
      highlights: "Points forts",
      keyPoints: "Points clés",
      toolsUsed: "Outils utilisés",
      technicalSkills: "Compétences techniques",
      softSkills: "Soft skills",
      experience: "Expérience",
      career: "Parcours",
      education: "Formation",
      experienceAndEducation: "Parcours & Formation",
    },
    stackLabels: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      testing: "Testing",
    },
    buttons: {
      viewProject: "Voir le projet",
      viewCode: "Voir le code",
      viewDetails: "Voir détails",
      viewWebsite: "Voir le site",
      send: "Envoyer",
      back: "Retour",
      retry: "Réessayer",
      viewMyExperiences: "Voir mes expériences",
      contactMe: "Me contacter",
    },
    labels: {
      present: "Présent",
      privateExperience: "Confidentiel",
      allRightsReserved: "Tous droits réservés.",
      availableForProjects: "Disponible pour de nouveaux projets",
    },
    hero: {
      swipeToNavigate: "Faites glisser pour naviguer • Cliquez sur les onglets",
      letsWorkTogether: "Travaillons ensemble",
      projectQuestion: "Vous avez un projet de Saas, mobile ou web en tête ?",
      letsDiscuss: "Discutons-en !",
    },
    descriptions: {
      experiencesSubtitle: "Une sélection de mes expériences web et mobile",
      myTechStack: "Mon stack technique et mes expertises",
      myProfessionalBackground: "Mon parcours professionnel",
      aiToolsIntegrated: "Outils IA intégrés au workflow",
    },
    form: {
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      message: "Message",
      messagePlaceholder: "Décrivez votre projet...",
    },
    messages: {
      messageSent: "Message envoyé !",
      messageSentDescription: "Je vous répondrai dans les plus brefs délais.",
      willReplyShort: "Je vous répondrai bientôt",
      pleaseWaitTitle: "Veuillez patienter",
      pleaseWaitDescription:
        "Merci de patienter quelques secondes avant de renvoyer un message.",
      errorTitle: "Erreur",
      genericError: "Une erreur est survenue",
      cannotSend: "Impossible d'envoyer le message",
    },
    stats: {
      team: "Équipe",
      downloads: "Téléchargements",
      platforms: "Plateformes",
      publishedApps: "applications publiées",
      stackExpertise: "Stack technique & expertise",
      discussProject: "Discutons de votre projet",
    },
    filters: {
      all: "Tous",
      dev: "Dev",
      cdi: "CDI",
      freelance: "Freelance",
      personal: "Perso",
      ponctuel: "Ponctuel",
      hors_tech: "Autre",
      cinema: "Cinéma",
      ops: "Management Ops",
    },
  },
  en: {
    nav: {
      home: "Home",
      experiences: "Experiences",
      skills: "Skills",
      resume: "Resume",
      contact: "Contact",
    },
    sections: {
      explorer: "Explore",
      techStack: "Tech stack",
      toolsEnvironment: "Tools & Environment",
      sendMessage: "Send me a message",
      highlights: "Highlights",
      keyPoints: "Key points",
      toolsUsed: "Tools used",
      technicalSkills: "Technical skills",
      softSkills: "Soft skills",
      experience: "Experience",
      career: "Career Path",
      education: "Education",
      experienceAndEducation: "Experience & Education",
    },
    stackLabels: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      testing: "Testing",
    },
    buttons: {
      viewProject: "View project",
      viewCode: "View code",
      viewDetails: "View details",
      viewWebsite: "View website",
      send: "Send",
      back: "Back",
      retry: "Try again",
      viewMyExperiences: "View my experiences",
      contactMe: "Contact me",
    },
    labels: {
      present: "Present",
      privateExperience: "Confidential",
      allRightsReserved: "All rights reserved.",
      availableForProjects: "Available for new projects",
    },
    hero: {
      swipeToNavigate: "Swipe to navigate • Tap the tabs",
      letsWorkTogether: "Let's work together",
      projectQuestion: "Have a SaaS, mobile or web project in mind?",
      letsDiscuss: "Let's discuss!",
    },
    descriptions: {
      experiencesSubtitle: "A selection of my web and mobile experiences",
      myTechStack: "My tech stack and expertise",
      myProfessionalBackground: "My professional background",
      aiToolsIntegrated: "AI tools integrated into workflow",
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project…",
    },
    messages: {
      messageSent: "Message sent!",
      messageSentDescription: "Thanks! I'll get back to you shortly.",
      willReplyShort: "I'll reply soon",
      pleaseWaitTitle: "Please wait",
      pleaseWaitDescription:
        "Please wait a few seconds before sending another message.",
      errorTitle: "Error",
      genericError: "Something went wrong",
      cannotSend: "Couldn't send the message",
    },
    stats: {
      team: "Team",
      downloads: "Downloads",
      platforms: "Platforms",
      publishedApps: "apps shipped",
      stackExpertise: "Tech stack & expertise",
      discussProject: "Let's talk about your project",
    },
    filters: {
      all: "All",
      dev: "Dev",
      cdi: "Full-time",
      freelance: "Freelance",
      personal: "Personal",
      ponctuel: "Short-term",
      hors_tech: "Other",
      cinema: "Cinema",
      ops: "Management Ops",
    },
  },
} as const;

export const uiTexts = uiTextsByLocale.fr;

export function getUiTexts(locale: Locale) {
  return uiTextsByLocale[locale] ?? uiTextsByLocale.fr;
}
