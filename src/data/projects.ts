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
    longDescription: 'EggscuseMe aide les utilisateurs à tracker leurs boîtes d\'œufs avec des indicateurs de fraîcheur colorés, des recommandations de cuisson intelligentes, et des statistiques anti-gaspillage. L\'app inclut un scanner de codes-barres et un scanner IA (Gemini Vision) pour extraire automatiquement les dates de ponte.',
    category: 'SaaS / Anti-gaspi',
    projectType: 'personal',
    year: '2025',
    platforms: ['web'],
    gradient: 'from-yellow-300 to-orange-400',
    emoji: '🥚',
    image: '/images/projects/eggscuseme-landing.jpg',
    stats: { rating: 4.9, downloads: 'Freemium' },
    features: ['Next.js 16', 'React 19', 'TypeScript', 'TailwindCSS v4', 'PostgreSQL', 'Prisma 6', 'Stripe', 'Better Auth', 'PWA'],
    stack: {
      frontend: ['Next.js 16 (Turbopack)', 'React 19', 'TypeScript 5.9', 'TailwindCSS v4', 'Shadcn/UI', 'Zustand', 'TanStack Query', 'Motion', 'Recharts'],
      backend: ['Next.js API Routes', 'Zod', 'next-safe-action', 'Resend', 'React Email', 'web-push'],
      database: ['PostgreSQL', 'Prisma ORM 6.16', 'Redis'],
      devops: ['GitHub Actions CI/CD', 'Vercel', 'Vercel Cron Jobs', 'Docker (PostgreSQL/Redis)'],
      testing: ['Vitest', 'Playwright', 'React Testing Library'],
    },
    highlights: [
      { title: 'Scanner IA Vision', description: 'Extraction automatique des dates via Google Gemini Vision API (OCR)' },
      { title: 'PWA complète', description: 'Service Worker, Push Notifications, Installation native' },
      { title: 'CI/CD Pipeline', description: '5 jobs GitHub Actions: lint, types, tests, migrations, e2e Playwright' },
      { title: 'Multi-frigo', description: 'Système de partage entre famille/colocataires avec invitations email' },
      { title: 'i18n', description: 'Support FR/EN via next-intl' },
    ],
    links: {
      website: 'https://eggscuseme.app/',
      github: 'https://github.com/YoannDrx/EggscuseMe',
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
    longDescription: 'MyCryptoPilot est une plateforme de trading social "risk-first" permettant de suivre des traders vérifiés, recevoir leurs signaux en temps réel et consulter des performances vérifiées via APIs Binance & Bybit. Inclut paiements crypto natifs (Base/Tron), bot Discord 24/7, et calcul de KPIs (winrate, profit factor, drawdown).',
    category: 'Web3 / Crypto',
    projectType: 'personal',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-amber-400 to-orange-500',
    emoji: '🚀',
    image: '/images/projects/mycryptopilot-landing.jpg',
    stats: { rating: 4.9, downloads: 'SaaS' },
    features: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Crypto', 'Discord.js'],
    stack: {
      frontend: ['Next.js 15 (Turbopack)', 'React 19', 'TypeScript 5.9', 'TailwindCSS v4', 'Shadcn/UI', 'Recharts', 'Motion'],
      backend: ['Prisma ORM', 'Better Auth', 'BullMQ', 'Discord.js 14', 'ccxt', 'Resend', 'OpenAI SDK'],
      database: ['PostgreSQL', 'Prisma ORM 6.15', 'Redis (ioredis)'],
      devops: ['GitHub Actions CI/CD (6 jobs)', 'Vercel', 'Fly.io Worker', 'Docker'],
      testing: ['Vitest (21 suites)', 'Playwright (26 specs)', 'Codecov'],
    },
    highlights: [
      { title: 'Paiements Crypto Natifs', description: 'Génération HD wallet (Base/Tron), watcher on-chain, script sweep vers Binance' },
      { title: 'APIs Exchange', description: 'Intégration native Binance, Bybit, Bitget via ccxt et SDKs officiels' },
      { title: 'Bot Discord 24/7', description: 'Worker Fly.io avec slash commands, rôles dynamiques, notifications signaux' },
      { title: 'Portfolio Tracking', description: 'Connexion API read-only, calcul KPIs (winrate, profit factor, drawdown)' },
      { title: 'Trading Social', description: 'Profils traders vérifiés, TradingCard JSON, feed avec filtres' },
    ],
    links: {
      website: 'https://mycryptopilot.app/',
      github: 'https://github.com/YoannDrx/mycryptopilot',
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
    longDescription: 'ChooseWisely est une application SaaS permettant de prendre des décisions éclairées avec cartographie interactive (Mapbox), génération de rapports PDF, et intelligence artificielle. Inclut un système complet d\'authentification, de paiements Stripe et de gestion d\'organisations.',
    category: 'SaaS',
    projectType: 'personal',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-cyan-400 to-blue-500',
    emoji: '🎯',
    stats: { rating: 4.7, downloads: 'SaaS' },
    features: ['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Better Auth', 'Mapbox GL'],
    stack: {
      frontend: ['Next.js 15 (Turbopack)', 'React 19', 'TypeScript 5.8', 'TailwindCSS v4', 'Mapbox GL', 'Recharts', 'Motion'],
      backend: ['Prisma ORM', 'Better Auth', 'Stripe', 'OpenAI SDK', 'Resend', 'jsPDF'],
      database: ['PostgreSQL', 'Prisma ORM 6.12'],
      devops: ['Vercel', 'Prisma Migrations'],
      testing: ['Vitest', 'Playwright', 'React Testing Library'],
    },
    highlights: [
      { title: 'Cartographie Interactive', description: 'Intégration Mapbox GL pour visualisation géographique des données' },
      { title: 'Export PDF', description: 'Génération de rapports PDF avec jsPDF et autotable' },
      { title: 'IA Intégrée', description: 'Assistance OpenAI pour aide à la décision' },
      { title: 'Multi-tenant', description: 'Système d\'organisations avec rôles et permissions' },
    ],
  },
  // 2023-2024
  {
    id: '5',
    name: 'Caroline Senyk',
    description: 'Portfolio pour artiste et créatrice avec galerie et CMS',
    longDescription: 'Portfolio artistique avec galerie photo interactive, carousel, effets visuels créatifs (water wave), intégration vidéo YouTube, et système de contact. Multi-langues FR/EN avec CMS intégré pour gestion du contenu.',
    category: 'Portfolio',
    projectType: 'freelance',
    year: '2024',
    platforms: ['web'],
    gradient: 'from-rose-400 to-pink-500',
    emoji: '🎨',
    image: '/images/projects/caroline-senyk-landing.jpg',
    stats: { rating: 5.0, downloads: 'B2C' },
    features: ['Next.js 16', 'React 19', 'Bootstrap 5', 'Prisma', 'i18n', 'Resend'],
    stack: {
      frontend: ['Next.js 16', 'React 19', 'Bootstrap 5', 'SASS', 'Swiper', 'React Slick'],
      backend: ['Prisma ORM', 'Resend', 'Zod'],
      database: ['PostgreSQL', 'Prisma ORM 6.19'],
    },
    highlights: [
      { title: 'Galerie Artistique', description: 'Lightbox, carousel, modal images avec effets visuels créatifs' },
      { title: 'i18n FR/EN', description: 'Internationalisation complète via i18next' },
      { title: 'Vidéo YouTube', description: 'Intégration native des vidéos de l\'artiste' },
    ],
    links: {
      website: 'https://www.caroline-senyk.fr/',
    },
  },
  {
    id: '6',
    name: 'Weil & Associés',
    description: 'Site vitrine pour cabinet juridique avec back-office de gestion',
    longDescription: 'Site vitrine corporate pour cabinet d\'avocats parisien avec design moderne, back-office de gestion du contenu (équipe, actualités), formulaire de contact avancé et optimisation SEO pour le secteur juridique.',
    category: 'Corporate',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-slate-400 to-gray-500',
    emoji: '⚖️',
    image: '/images/projects/weil-paris-landing.jpg',
    stats: { rating: 5.0, downloads: 'B2B' },
    features: ['Next.js 13', 'React 18', 'TailwindCSS', 'DaisyUI', 'Supabase', 'i18n'],
    stack: {
      frontend: ['Next.js 13', 'React 18', 'TailwindCSS', 'DaisyUI', 'React Hook Form'],
      backend: ['Supabase Auth', 'Nodemailer', 'i18next'],
      database: ['Supabase (PostgreSQL)'],
    },
    highlights: [
      { title: 'Design Corporate', description: 'Interface professionnelle adaptée au secteur juridique' },
      { title: 'Back-Office', description: 'Gestion de l\'équipe, actualités, et contenu via Supabase' },
      { title: 'SEO Juridique', description: 'Optimisation pour le référencement cabinet d\'avocats Paris' },
    ],
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
    longDescription: 'Portfolio immersif pour compositeur de musique avec visualisations 3D (Three.js), lecteur audio personnalisé, galerie de projets avec intégration vidéo, cartographie des collaborations mondiales, et génération de CV PDF. Multi-langues et responsive.',
    category: 'Portfolio',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-purple-400 to-violet-500',
    emoji: '🎵',
    image: '/images/projects/loic-ghanem-landing.jpg',
    stats: { rating: 5.0, downloads: 'B2C' },
    features: ['Next.js 16', 'React 19', 'Three.js', 'TailwindCSS', 'Prisma', 'Better Auth'],
    stack: {
      frontend: ['Next.js 16', 'React 19', 'TailwindCSS', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Mapbox GL'],
      backend: ['Prisma ORM', 'Better Auth', 'Tiptap Editor', 'React PDF Renderer', 'Vercel Blob'],
      database: ['PostgreSQL', 'Prisma ORM 6.19', 'Upstash Redis'],
      devops: ['Vercel', 'Husky', 'lint-staged'],
    },
    highlights: [
      { title: 'Visualisation 3D', description: 'Animations immersives avec Three.js et React Three Fiber' },
      { title: 'Lecteur Audio', description: 'Player personnalisé pour écouter les compositions' },
      { title: 'Carte Interactive', description: 'Mapbox GL pour visualiser les collaborations mondiales' },
      { title: 'Export CV PDF', description: 'Génération de CV professionnel via React PDF Renderer' },
    ],
    links: {
      website: 'https://www.loic-ghanem.com/',
    },
  },
  {
    id: '9',
    name: 'Mail Certificate',
    description: "Plateforme d'envoi de courriers certifiés avec paiement Stripe et authentification 2FA",
    longDescription: 'Plateforme SaaS B2B permettant l\'envoi de courriers recommandés numériques certifiés. Inclut système de paiement Stripe, double authentification 2FA via SMS/email (Twilio), éditeur de texte riche, et back-office complet de gestion.',
    category: 'SaaS',
    projectType: 'freelance',
    year: '2023',
    platforms: ['web'],
    gradient: 'from-blue-400 to-cyan-500',
    emoji: '📧',
    image: '/images/projects/mail-certificate-landing.jpg',
    stats: { rating: 4.8, downloads: 'B2B' },
    features: ['React 16', 'Bootstrap', 'Stripe', 'Twilio 2FA', 'Draft.js', 'Styled Components'],
    stack: {
      frontend: ['React 16 (CRA)', 'Bootstrap 4', 'Reactstrap', 'Styled Components', 'Draft.js WYSIWYG'],
      backend: ['Node.js', 'Express.js', 'Stripe API', 'Twilio API'],
    },
    highlights: [
      { title: '2FA Sécurisé', description: 'Double authentification via SMS/email avec Twilio' },
      { title: 'Paiements Stripe', description: 'Intégration complète pour achat de crédits et abonnements' },
      { title: 'Éditeur WYSIWYG', description: 'Composition de courriers avec Draft.js' },
      { title: 'Back-Office', description: 'Gestion des utilisateurs, courriers et statistiques' },
    ],
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
