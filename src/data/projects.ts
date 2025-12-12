/**
 * Projects Data
 * Liste des projets du portfolio (ordre chronologique décroissant)
 */

import type { Project } from './types';

export const projects: Project[] = [
  // 2025
  {
    id: '0',
    name: 'KLESIA',
    description: 'Application mobile de gestion de retraite et prévoyance en marque blanche',
    category: 'Assurance',
    projectType: 'cdi',
    year: '2025',
    platforms: ['ios', 'android'],
    gradient: 'from-sky-400 to-blue-600',
    emoji: '🏦',
    image: '/images/projects/klesia-landing.png',
    stats: { rating: 4.6, downloads: '100K+' },
    features: ['React Native', 'TypeScript', 'iOS', 'Android', 'Xcode', 'Node.js'],
    links: {
      website: 'https://www.klesia.fr/',
    },
  },
  {
    id: '00',
    name: 'EggscuseMe',
    description: 'Application web pour gérer la fraîcheur des œufs et éviter le gaspillage alimentaire',
    category: 'SaaS / Anti-gaspi',
    projectType: 'personal',
    year: '2025',
    platforms: ['web'],
    gradient: 'from-yellow-300 to-orange-400',
    emoji: '🥚',
    stats: { rating: 4.9, downloads: 'Freemium' },
    features: ['Next.js 16', 'React 19', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Prisma', 'Stripe', 'Better Auth'],
    links: {
      website: 'https://eggscuseme.app/',
    },
  },
  // 2024
  {
    id: '1',
    name: 'Jaji',
    description: 'Application mobile de services financiers et bancaires',
    category: 'Fintech',
    projectType: 'cdi',
    year: '2024',
    platforms: ['ios', 'android'],
    gradient: 'from-teal-400 to-emerald-500',
    emoji: '💼',
    image: '/images/projects/jaji-landing.png',
    stats: { rating: 4.7, downloads: '50K+' },
    features: ['React Native', 'TypeScript', 'Redux', 'Agile/Scrum'],
    links: {
      website: 'https://jaji.fr/',
    },
  },
  {
    id: '2',
    name: 'MyCryptoPilot',
    description: 'Plateforme de trading crypto avec suivi de traders et signaux en temps réel',
    category: 'Web3 / Crypto',
    projectType: 'personal',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-amber-400 to-orange-500',
    emoji: '🚀',
    stats: { rating: 4.9, downloads: 'SaaS' },
    features: ['Next.js 15', 'React 19', 'Prisma', 'Stripe', 'Web3'],
    links: {
      website: 'https://mycryptopilot.app/',
    },
  },
  {
    id: '3',
    name: 'MoodTrace',
    description: 'Application de suivi émotionnel et bien-être mental',
    category: 'Santé',
    projectType: 'personal',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-indigo-400 to-purple-500',
    emoji: '🧠',
    stats: { rating: 4.8, downloads: 'App' },
    features: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    links: {
      website: 'https://moodtrace.app/',
    },
  },
  {
    id: '4',
    name: 'ChooseWisely',
    description: 'Application web SaaS avec authentification et paiements',
    category: 'SaaS',
    projectType: 'personal',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-cyan-400 to-blue-500',
    emoji: '🎯',
    stats: { rating: 4.7, downloads: 'SaaS' },
    features: ['Next.js 15', 'React 19', 'Prisma', 'Stripe', 'Better Auth'],
  },
  // 2023-2024
  {
    id: '5',
    name: 'Caroline Senyk',
    description: 'Portfolio pour artiste et créatrice avec galerie et CMS',
    category: 'Portfolio',
    projectType: 'freelance',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-rose-400 to-pink-500',
    emoji: '🎨',
    stats: { rating: 5.0, downloads: 'B2C' },
    features: ['Next.js', 'React', 'Bootstrap', 'Prisma', 'i18n'],
    links: {
      website: 'https://www.caroline-senyk.fr/',
    },
  },
  {
    id: '6',
    name: 'Weil & Associés',
    description: 'Site vitrine pour cabinet juridique avec back-office de gestion',
    category: 'Corporate',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-slate-400 to-gray-500',
    emoji: '⚖️',
    stats: { rating: 5.0, downloads: 'B2B' },
    features: ['Next.js', 'Tailwind CSS', 'Back-Office'],
    links: {
      website: 'https://www.weil-paris.fr/',
    },
  },
  {
    id: '7',
    name: 'Agence Néon',
    description: 'Site web et maintenance pour agence digitale parisienne',
    category: 'Agence',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-orange-400 to-red-500',
    emoji: '🔥',
    image: '/images/projects/agence-neon-landing.jpg',
    stats: { rating: 4.9, downloads: 'B2B' },
    features: ['Next.js', 'SEO', 'Google Analytics', 'Bootstrap'],
  },
  {
    id: '8',
    name: 'Loïc Ghanem',
    description: 'Portfolio pour compositeur de musique de films, jeux vidéo et publicités',
    category: 'Portfolio',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-purple-400 to-violet-500',
    emoji: '🎵',
    stats: { rating: 5.0, downloads: 'B2C' },
    features: ['Next.js', 'Bootstrap', 'Agile'],
    links: {
      website: 'https://www.loic-ghanem.com/',
    },
  },
  {
    id: '9',
    name: 'Mail Certificate',
    description: "Plateforme d'envoi de courriers certifiés avec paiement Stripe et authentification 2FA",
    category: 'SaaS',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-blue-400 to-cyan-500',
    emoji: '📧',
    stats: { rating: 4.8, downloads: 'B2B' },
    features: ['React', 'Next.js', 'Stripe', 'Twilio 2FA', 'Back-Office'],
    links: {
      website: 'https://www.mail-certificate.com/',
    },
  },
  {
    id: '10',
    name: 'Nos Instants Précieux',
    description: 'Site web e-commerce avec stratégie SEO et marketing intégrée',
    category: 'E-commerce',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-pink-400 to-rose-500',
    emoji: '💝',
    image: '/images/projects/nos-instants-precieux-landing.jpg',
    stats: { rating: 4.8, downloads: 'B2C' },
    features: ['Next.js', 'Bootstrap', 'SEO', 'Marketing'],
  },
  {
    id: '11',
    name: 'Test and Ride',
    description: 'Application mobile pour plateforme de test de véhicules avec intégration API',
    category: 'Mobilité',
    projectType: 'freelance',
    year: '2023',
    platforms: ['ios', 'android'],
    gradient: 'from-green-400 to-lime-500',
    emoji: '🏍️',
    image: '/images/projects/test-and-ride-dashboard.jpg',
    stats: { rating: 4.6, downloads: '10K+' },
    features: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'API Airtable'],
  },
  {
    id: '12',
    name: 'Crazee Burger',
    description: 'MVP de commande en ligne avec gestion des menus et panier',
    category: 'Food Tech',
    projectType: 'personal',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-yellow-400 to-amber-500',
    emoji: '🍔',
    image: '/images/projects/crazee-burger.jpg',
    stats: { rating: 4.5, downloads: 'MVP' },
    features: ['React.js', 'Firebase', 'Styled Components', 'React Router'],
  },
];

/**
 * Helper pour obtenir le nombre total de projets
 */
export const getProjectsCount = () => projects.length;

/**
 * Helper pour obtenir un projet par son ID
 */
export const getProjectById = (id: string) => projects.find((p) => p.id === id);

/**
 * Helper pour filtrer les projets par plateforme
 */
export const getProjectsByPlatform = (platform: 'ios' | 'android' | 'web') =>
  projects.filter((p) => p.platforms.includes(platform));

/**
 * Helper pour filtrer les projets par type
 */
export const getProjectsByType = (type: 'freelance' | 'cdi' | 'personal') =>
  projects.filter((p) => p.projectType === type);
