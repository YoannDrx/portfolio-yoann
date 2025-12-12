/**
 * Site Configuration
 * Configuration globale du portfolio
 */

import type { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  name: 'Portfolio Yoann',
  description: 'Portfolio de développeur React Native - Applications mobiles iOS & Android',
  url: 'https://yoann-andrieux.fr',
  ogImage: '/og-image.png',
  locale: 'fr-FR',
  theme: {
    primaryColor: '#007AFF', // iOS Blue
    accentColor: '#5856D6', // iOS Indigo
  },
  contact: {
    email: 'hello@example.com',
    phone: undefined,
  },
  seo: {
    title: 'React Native Developer | Portfolio',
    description:
      "Développeur React Native spécialisé dans la création d'applications mobiles iOS et Android performantes avec des animations fluides.",
    keywords: [
      'React Native',
      'iOS',
      'Android',
      'Mobile Developer',
      'TypeScript',
      'Animations',
      'UX',
      'App Development',
    ],
  },
};

/**
 * Textes de l'interface utilisateur
 */
export const uiTexts = {
  // Navigation
  nav: {
    home: 'Accueil',
    projects: 'Projets',
    skills: 'Skills',
    contact: 'Contact',
  },

  // Sections
  sections: {
    explorer: 'Explorer',
    techStack: 'Technologies utilisées',
    toolsEnvironment: 'Outils & Environnement',
    sendMessage: 'Envoyez-moi un message',
  },

  // Boutons
  buttons: {
    viewProject: 'Voir le projet',
    send: 'Envoyer',
    back: 'Retour',
  },

  // Formulaire
  form: {
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    message: 'Message',
    messagePlaceholder: 'Décrivez votre projet...',
  },

  // Messages
  messages: {
    messageSent: 'Message envoyé !',
    messageSentDescription: 'Je vous répondrai dans les plus brefs délais.',
    willReplyShort: 'Je vous répondrai bientôt',
  },

  // Stats
  stats: {
    rating: 'Note',
    downloads: 'Downloads',
    platforms: 'Platforms',
    publishedApps: 'applications publiées',
    stackExpertise: 'Stack technique & expertise',
    discussProject: 'Discutons de votre projet',
  },
} as const;
