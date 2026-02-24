/**
 * Projects Data
 * Liste des projets du portfolio (ordre chronologique décroissant)
 */

import type { Experience, ExperienceType } from "./types";
import type { Locale } from "@/i18n/locales";

const experiencesByLocale: Record<Locale, Experience[]> = {
  fr: [
    // 2025
    {
      id: "0",
      name: "KLESIA",
      description:
        "Application mobile de gestion de retraite et prévoyance en marque blanche",
      longDescription:
        "Application mobile enterprise-grade pour la gestion de retraite et prévoyance, développée en architecture multi-tenant. Architecture Clean/DDD avec 22+ modules métier (remboursements, contrats, bénéficiaires, cotisations...), 59+ composants UI custom, et 12 environnements de déploiement. Refactoring de code legacy, maintenance évolutive et développement de nouvelles fonctionnalités en équipe.",
      category: "Assurance",
      experienceType: "cdi",
      year: "2025",
      platforms: ["ios", "android"],
      gradient: "from-sky-400 to-blue-600",
      emoji: "🏦",
      image: "/images/projects/klesia-landing.png",
      stats: { teamSize: "3 devs", downloads: "100K+" },
      features: [
        "React Native 0.82",
        "TypeScript",
        "Redux Toolkit",
        "RxJS",
        "Clean Architecture",
        "iOS",
        "Android",
      ],
      stack: {
        frontend: [
          "React Native 0.82",
          "React 18",
          "TypeScript 5.6",
          "Redux Toolkit",
          "RxJS",
          "React Navigation v6",
          "Reanimated 3",
          "Moti",
        ],
        backend: [
          "Axios (Pattern Singleton)",
          "60+ DTOs typés",
          "JWT Authentication",
          "Token Refresh automatique",
        ],
        database: ["Async Storage", "Redux Persist", "Keychain (sécurisé)"],
        devops: [
          "12 environnements (.env)",
          "Android Product Flavors",
          "iOS Xcode Schemes (13)",
          "Firebase Distribution",
        ],
        testing: [
          "Jest",
          "React Testing Library",
          "130+ mocks configurés",
          "ESLint + Prettier",
        ],
      },
      highlights: [
        {
          title: "Architecture Multi-tenant",
          description:
            "Système permettant le déploiement de plusieurs configurations et environnements depuis une base de code unique",
        },
        {
          title: "Clean Architecture / DDD",
          description:
            "22+ modules métier avec séparation Domain/Infrastructure/Presentation",
        },
        {
          title: "Design System Custom",
          description:
            "59+ composants UI (LcButton, LcModal, LcCalendarPicker, LcMutuelleCard...)",
        },
        {
          title: "Multi-environnement",
          description:
            "12 configurations de build (Android Flavors + iOS Schemes)",
        },
        {
          title: "Sécurité",
          description:
            "Biométrie (Face ID, Touch ID), Keychain, gestion sécurisée des tokens",
        },
      ],
      links: {
        website: "https://www.klesia.fr/",
        appStore: "https://apps.apple.com/fr/app/klesia-mut-vous/id1664447197",
        playStore:
          "https://play.google.com/store/apps/details?id=com.klesia.kmut&hl=fr",
      },
    },
    {
      id: "00",
      name: "EggscuseMe",
      description:
        "Application web pour gérer la fraîcheur des œufs et éviter le gaspillage alimentaire",
      longDescription:
        "EggscuseMe aide les utilisateurs à tracker leurs boîtes d'œufs avec des indicateurs de fraîcheur colorés, des recommandations de cuisson intelligentes, et des statistiques anti-gaspillage. L'app inclut un scanner de codes-barres et un scanner IA (Gemini Vision) pour extraire automatiquement les dates de ponte.",
      category: "WebApp PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-yellow-300 to-orange-400",
      emoji: "🥚",
      image: "/images/projects/eggscuseme-landing.png",
      images: [
        "/images/projects/eggscuseme-landing.png",
        "/images/projects/eggscuseme-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "Freemium" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "Better Auth",
        "PWA",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Motion",
          "Recharts",
        ],
        backend: [
          "Next.js API Routes",
          "Zod",
          "next-safe-action",
          "Resend",
          "React Email",
          "web-push",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.16", "Redis"],
        devops: [
          "GitHub Actions CI/CD",
          "Vercel",
          "Vercel Cron Jobs",
          "Docker (PostgreSQL/Redis)",
        ],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Scanner IA Vision",
          description:
            "Extraction automatique des dates via Google Gemini Vision API (OCR)",
        },
        {
          title: "PWA complète",
          description:
            "Service Worker, Push Notifications, Installation native",
        },
        {
          title: "CI/CD Pipeline",
          description:
            "5 jobs GitHub Actions: lint, types, tests, migrations, e2e Playwright",
        },
        {
          title: "Multi-frigo",
          description:
            "Système de partage entre famille/colocataires avec invitations email",
        },
        { title: "i18n", description: "Support FR/EN via next-intl" },
      ],
      links: {
        website: "https://eggscuseme.app/",
        github: "https://github.com/YoannDrx/EggscuseMe",
      },
    },
    {
      id: "000",
      name: "Impulsion",
      description:
        "Plateforme hybride de coaching sportif connectant coachs et athlètes",
      longDescription:
        "Impulsion est une plateforme hybride qui connecte coachs et athlètes. Elle permet de planifier des séances avec un calendrier drag & drop, d'annoter des vidéos, de calculer la charge d'entraînement (ACWR), et de suivre la progression des athlètes en temps réel. Inclut des visualisations 3D immersives et un système d'abonnement complet.",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-lime-400 to-green-500",
      emoji: "🏃",
      image: "/images/projects/impulsion-landing.png",
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Three.js",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Three.js",
          "React Three Fiber",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.19", "Redis (ioredis)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Calendrier Drag & Drop",
          description: "Planification intuitive des séances d'entraînement",
        },
        {
          title: "Annotations Vidéo",
          description:
            "Analyse vidéo avec annotations pour feedback personnalisé",
        },
        {
          title: "Charge ACWR",
          description: "Calcul automatique du ratio charge aiguë/chronique",
        },
        {
          title: "Visualisations 3D",
          description: "Interface immersive avec Three.js et React Three Fiber",
        },
      ],
      links: {
        website: "https://impulsion.app/",
      },
    },
    {
      id: "0000",
      name: "Jobio",
      description: "CRM de prospection freelance intelligent avec IA intégrée",
      longDescription:
        "Jobio est un CRM de prospection freelance qui centralise la gestion des missions, profils, plateformes et contacts. Il intègre un tableau Kanban drag & drop avec 8 statuts, un assistant IA pour générer des candidatures et auditer les profils LinkedIn, un CV Lab IA pour créer des CV sur mesure par mission, un système de séquences automatisées de relance, un calendrier intégré pour visualiser les échéances et relances, un gestionnaire de plateformes freelance (Malt, Upwork...), un CRM contacts, et des analytics de conversion. Inclut un système d'abonnement Stripe avec 3 plans (Free, Pro, Ultra).",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-indigo-400 to-purple-600",
      emoji: "💼",
      image: "/images/projects/jobio-landing.png",
      images: [
        "/images/projects/jobio-landing.png",
        "/images/projects/jobio-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "OpenAI",
        "Better Auth",
        "Redis",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Recharts",
          "Motion",
          "@hello-pangea/dnd",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK (Vercel AI)",
          "next-safe-action",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL (NeonDB)", "Prisma ORM 6.16", "Redis (ioredis)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Mission Tracker Kanban",
          description:
            "Tableau drag & drop avec 8 statuts pour suivre le pipeline de prospection",
        },
        {
          title: "Assistant IA Métier",
          description:
            "Génération de candidatures, évaluation d'offres, audit LinkedIn, posts LinkedIn",
        },
        {
          title: "CV Lab IA",
          description:
            "Génération de CV sur mesure par mission avec personnalisation IA et export PDF",
        },
        {
          title: "Séquences automatisées",
          description:
            "Relances cadencées multi-canal avec templates et déclenchement automatique",
        },
        {
          title: "Calendrier intégré",
          description:
            "Vue calendrier des échéances, relances et rendez-vous liés aux missions",
        },
      ],
      links: {
        website: "https://www.jobio.fr/",
      },
    },
    {
      id: "00000",
      name: "Hyrun",
      description:
        "Application d'entraînement hybride HYROX & running avec coaching IA et nutrition personnalisée",
      longDescription:
        "Hyrun est un coach personnel IA pour athlètes hybrides (HYROX & running). L'app génère des plans d'entraînement intelligents avec gestion des phases (Base, Build, Peak, Taper), propose des substitutions d'exercices selon l'équipement disponible, unifie le calendrier d'entraînement avec logs détaillés (RPE, mood, douleur), et fournit des plans nutritionnels personnalisés par IA. Inclut un système de benchmarks running (5K, 10K, semi, marathon), un chat coach IA, et un suivi de progression avec graphiques.",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-amber-400 to-orange-600",
      emoji: "🏋️",
      image: "/images/projects/hyrun-landing.png",
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "OpenAI",
        "Better Auth",
        "Recharts",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK (Vercel AI)",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.16", "Redis (Upstash)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Plans d'entraînement IA",
          description:
            "Génération de plans hybrides HYROX + running avec phases périodisées (Base → Taper)",
        },
        {
          title: "Substitutions intelligentes",
          description:
            "Propositions d'exercices alternatifs selon l'équipement disponible",
        },
        {
          title: "Nutrition IA",
          description:
            "Plans nutritionnels personnalisés avec macros, repas et listes de courses",
        },
        {
          title: "Coach IA",
          description:
            "Assistant conversationnel pour conseils d'entraînement personnalisés",
        },
        {
          title: "Calendrier unifié",
          description:
            "Suivi par session avec logs RPE, humeur, douleur, énergie et sommeil",
        },
      ],
      links: {
        website: "https://hyrun.app/",
      },
    },
    // 2024
    {
      id: "1",
      name: "Jaji",
      description:
        "Application mobile de mutuelle santé et services financiers",
      longDescription:
        "Application mobile React Native pour la gestion de mutuelle santé et services financiers. Architecture Clean/DDD avec développement de features métier (remboursements, contrats, bénéficiaires, documents), résolution de bugs en équipe Agile/Scrum/SAFe. Contribution à un design system de 59+ composants réutilisables et intégration Firebase complète (Analytics, Crashlytics, Push Notifications via Notifee).",
      category: "Fintech",
      experienceType: "cdi",
      year: "2024",
      platforms: ["ios", "android"],
      gradient: "from-teal-400 to-emerald-500",
      emoji: "💼",
      image: "/images/projects/jaji-landing.png",
      stats: { teamSize: "3 devs", downloads: "50K+" },
      features: [
        "React Native",
        "TypeScript",
        "Redux Toolkit",
        "RxJS",
        "Agile/Scrum/SAFe",
        "Firebase",
        "Clean Architecture",
      ],
      stack: {
        frontend: [
          "React Native 0.82",
          "React 18",
          "TypeScript",
          "Redux Toolkit",
          "RxJS Observables",
          "React Navigation v6",
          "i18next",
        ],
        backend: [
          "Axios avec intercepteurs",
          "Pattern Repository",
          "Mappers DTO ↔ Domain",
        ],
        database: ["Async Storage", "Redux Persist"],
        devops: [
          "Firebase Analytics",
          "Firebase Crashlytics",
          "Firebase Cloud Messaging",
          "Notifee Push",
        ],
        testing: ["Jest", "Testing Library", "Axios Mock Adapter"],
      },
      highlights: [
        {
          title: "Modules Métier",
          description:
            "Développement features: Remboursements, Contrats, Bénéficiaires, Documents, Cotisations",
        },
        {
          title: "State Management Hybride",
          description:
            "Redux Toolkit + RxJS BehaviorSubject pour les stores observables",
        },
        {
          title: "Méthodologie Agile",
          description: "Scrum/SAFe avec sprints, reviews, et planification",
        },
        {
          title: "Intégration Firebase",
          description:
            "Analytics, Crashlytics, Cloud Messaging, Push Notifications",
        },
        {
          title: "Internationalisation",
          description: "Support multi-langue via i18next",
        },
      ],
      links: {
        website: "https://jaji.fr/",
        appStore: "https://apps.apple.com/fr/app/jaji/id1611736477",
        playStore:
          "https://play.google.com/store/apps/details?id=com.jaji&hl=fr",
      },
    },
    {
      id: "2",
      name: "MyCryptoPilot",
      description:
        "Plateforme de trading crypto avec suivi de traders et signaux en temps réel",
      longDescription:
        'MyCryptoPilot est une plateforme de trading social "risk-first" permettant de suivre des traders vérifiés, recevoir leurs signaux en temps réel et consulter des performances vérifiées via APIs Binance & Bybit. Inclut paiements crypto natifs (Base/Tron), bot Discord 24/7, et calcul de KPIs (winrate, profit factor, drawdown).',
      category: "WebApp PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-amber-400 to-orange-500",
      emoji: "🚀",
      image: "/images/projects/mycryptopilot-landing.png",
      images: [
        "/images/projects/mycryptopilot-landing.png",
        "/images/projects/mycryptopilot-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Crypto",
        "Discord.js",
      ],
      stack: {
        frontend: [
          "Next.js 15 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "BullMQ",
          "Discord.js 14",
          "ccxt",
          "Resend",
          "OpenAI SDK",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.15", "Redis (ioredis)"],
        devops: [
          "GitHub Actions CI/CD (6 jobs)",
          "Vercel",
          "Fly.io Worker",
          "Docker",
        ],
        testing: ["Vitest (21 suites)", "Playwright (26 specs)", "Codecov"],
      },
      highlights: [
        {
          title: "Paiements Crypto Natifs",
          description:
            "Génération HD wallet (Base/Tron), watcher on-chain, script sweep vers Binance",
        },
        {
          title: "APIs Exchange",
          description:
            "Intégration native Binance, Bybit, Bitget via ccxt et SDKs officiels",
        },
        {
          title: "Bot Discord 24/7",
          description:
            "Worker Fly.io avec slash commands, rôles dynamiques, notifications signaux",
        },
        {
          title: "Portfolio Tracking",
          description:
            "Connexion API read-only, calcul KPIs (winrate, profit factor, drawdown)",
        },
        {
          title: "Trading Social",
          description:
            "Profils traders vérifiés, TradingCard JSON, feed avec filtres",
        },
      ],
      links: {
        website: "https://mycryptopilot.app/",
        github: "https://github.com/YoannDrx/mycryptopilot",
      },
    },
    {
      id: "3",
      name: "MoodDay",
      description:
        "Application de suivi émotionnel et bien-être mental conçue avec des psychiatres",
      longDescription:
        "MoodDay est un compagnon digital conçu avec des psychiatres pour aider à mieux comprendre ses humeurs, suivre ses traitements et préparer ses consultations. L'application inclut un suivi d'humeur quotidien, la gestion des médicaments, des analyses et des rappels. Conforme RGPD avec données chiffrées et export PDF médical.",
      category: "WebApp PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-teal-400 to-emerald-500",
      emoji: "🧠",
      image: "/images/projects/moodday-landing.png",
      images: [
        "/images/projects/moodday-landing.png",
        "/images/projects/moodday-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "App" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma",
        "Better Auth",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Resend",
          "React Email",
          "jsPDF",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.x"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Suivi d'humeur",
          description:
            "Enregistrement quotidien avec détection automatique des patterns",
        },
        {
          title: "Gestion médicaments",
          description: "Suivi des traitements avec rappels personnalisés",
        },
        {
          title: "Export PDF médical",
          description: "Génération de rapports pour préparer les consultations",
        },
        {
          title: "Conforme RGPD",
          description: "Données chiffrées et sécurité renforcée",
        },
      ],
      links: {
        website: "https://moodday.app/",
      },
    },
    {
      id: "4",
      name: "HomeGo",
      description:
        "Plateforme immobilière nouvelle génération avec données DVF et analyse IA",
      longDescription:
        "HomeGo est une plateforme immobilière permettant d'investir intelligemment avec agrégation d'annonces, analyse des prix via données DVF certifiées, et négociation assistée par IA. Inclut un tableau de bord intelligent, des alertes personnalisées, et un simulateur de capacité d'emprunt.",
      category: "SaaS",
      experienceType: "personal",
      year: "2024",
      platforms: ["web"],
      gradient: "from-cyan-400 to-blue-500",
      emoji: "🏠",
      image: "/images/projects/homego-landing.png",
      images: [
        "/images/projects/homego-landing.png",
        "/images/projects/homego-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Better Auth",
        "Mapbox GL",
      ],
      stack: {
        frontend: [
          "Next.js 15 (Turbopack)",
          "React 19",
          "TypeScript 5.8",
          "TailwindCSS v4",
          "Mapbox GL",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK",
          "Resend",
          "jsPDF",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.12"],
        devops: ["Vercel", "Prisma Migrations"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Données DVF",
          description: "Analyse des prix du marché avec données certifiées",
        },
        {
          title: "Tableau de bord intelligent",
          description:
            "Vue d'ensemble avec favoris, alertes et tendances du marché",
        },
        {
          title: "IA Intégrée",
          description: "Assistance OpenAI pour négociation et analyse",
        },
        {
          title: "Simulateur Emprunt",
          description: "Calcul de capacité d'emprunt et financement",
        },
      ],
    },
    // 2023-2024
    {
      id: "5",
      name: "Portfolio Caroline",
      description: "Portfolio pour artiste et créatrice avec galerie et CMS",
      longDescription:
        "Portfolio artistique avec galerie photo interactive, carousel, effets visuels créatifs (water wave), intégration vidéo YouTube, et système de contact. Multi-langues FR/EN avec CMS intégré pour gestion du contenu.",
      category: "Portfolio",
      experienceType: "freelance",
      year: "2024",
      platforms: ["web"],
      gradient: "from-rose-400 to-pink-500",
      emoji: "🎨",
      image: "/images/projects/caroline-senyk-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: [
        "Next.js 16",
        "React 19",
        "Bootstrap 5",
        "Prisma",
        "i18n",
        "Resend",
      ],
      stack: {
        frontend: [
          "Next.js 16",
          "React 19",
          "Bootstrap 5",
          "SASS",
          "Swiper",
          "React Slick",
        ],
        backend: ["Prisma ORM", "Resend", "Zod"],
        database: ["PostgreSQL", "Prisma ORM 6.19"],
      },
      highlights: [
        {
          title: "Galerie Artistique",
          description:
            "Lightbox, carousel, modal images avec effets visuels créatifs",
        },
        {
          title: "i18n FR/EN",
          description: "Internationalisation complète via i18next",
        },
        {
          title: "Vidéo YouTube",
          description: "Intégration native des vidéos de l'artiste",
        },
      ],
      links: {
        website: "https://www.caroline-senyk.fr/",
      },
    },
    {
      id: "6",
      name: "Weil & Associés",
      description:
        "Site vitrine pour cabinet juridique avec back-office de gestion",
      longDescription:
        "Site vitrine corporate pour cabinet d'avocats parisien avec design moderne, back-office de gestion du contenu (équipe, actualités), formulaire de contact avancé et optimisation SEO pour le secteur juridique.",
      category: "Corporate",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-slate-400 to-gray-500",
      emoji: "⚖️",
      image: "/images/projects/weil-paris-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2B" },
      features: [
        "Next.js 13",
        "React 18",
        "TailwindCSS",
        "DaisyUI",
        "Supabase",
        "i18n",
      ],
      stack: {
        frontend: [
          "Next.js 13",
          "React 18",
          "TailwindCSS",
          "DaisyUI",
          "React Hook Form",
        ],
        backend: ["Supabase Auth", "Nodemailer", "i18next"],
        database: ["Supabase (PostgreSQL)"],
      },
      highlights: [
        {
          title: "Design Corporate",
          description: "Interface professionnelle adaptée au secteur juridique",
        },
        {
          title: "Back-Office",
          description:
            "Gestion de l'équipe, actualités, et contenu via Supabase",
        },
        {
          title: "SEO Juridique",
          description:
            "Optimisation pour le référencement cabinet d'avocats Paris",
        },
      ],
      links: {
        website: "https://www.weil-paris.fr/",
      },
    },
    {
      id: "7",
      name: "Agence Néon",
      description: "Site web et maintenance pour agence digitale parisienne",
      category: "Agence",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-orange-400 to-red-500",
      emoji: "🔥",
      image: "/images/projects/agence-neon-landing.jpg",
      stats: { teamSize: "3 devs", downloads: "B2B" },
      features: ["Next.js", "SEO", "Google Analytics", "Bootstrap"],
    },
    {
      id: "8",
      name: "Portfolio Loïc Ghanem",
      description:
        "Portfolio immersif pour compositeur de musique avec 3D, cartographie, lecteur audio et back-office",
      longDescription:
        "Portfolio immersif pour le compositeur Loïc Ghanem (musiques de films, jeux vidéo, publicités). Visualisations 3D (Three.js / React Three Fiber), lecteur audio personnalisé, cartographie interactive des collaborations mondiales (Mapbox GL), générateur de CV PDF, et back-office de gestion de contenu avec éditeur Tiptap. Multi-langues et responsive.",
      category: "Portfolio",
      experienceType: "freelance",
      year: "2023 - 2025",
      platforms: ["web"],
      gradient: "from-purple-400 to-violet-500",
      emoji: "🎵",
      image: "/images/projects/portfolio-loic-landing.png",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: [
        "Next.js 16",
        "React 19",
        "Three.js",
        "React Three Fiber",
        "Mapbox GL",
        "Tiptap",
      ],
      stack: {
        frontend: [
          "Next.js 16",
          "React 19",
          "TailwindCSS",
          "Three.js",
          "React Three Fiber",
          "Framer Motion",
          "Mapbox GL",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Tiptap Editor",
          "React PDF Renderer",
          "Vercel Blob",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.19", "Upstash Redis"],
        devops: ["Vercel", "Husky", "lint-staged"],
      },
      highlights: [
        {
          title: "Visualisation 3D",
          description:
            "Animations immersives avec Three.js et React Three Fiber",
        },
        {
          title: "Lecteur Audio",
          description: "Player personnalisé pour écouter les compositions",
        },
        {
          title: "Carte Interactive",
          description: "Mapbox GL pour visualiser les collaborations mondiales",
        },
        {
          title: "Back-Office CMS",
          description: "Gestion de contenu avec éditeur Tiptap WYSIWYG",
        },
      ],
      links: {
        website: "https://www.loic-ghanem.com/",
      },
    },
    {
      id: "9",
      name: "Mail Certificate",
      description:
        "Plateforme d'envoi de courriers certifiés avec paiement Stripe et authentification 2FA",
      longDescription:
        "Plateforme SaaS B2B permettant l'envoi de courriers recommandés numériques certifiés. Inclut système de paiement Stripe, double authentification 2FA via SMS/email (Twilio), éditeur de texte riche, et back-office complet de gestion.",
      category: "SaaS",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-blue-400 to-cyan-500",
      emoji: "📧",
      image: "/images/projects/mail-certificate-landing.jpg",
      stats: { teamSize: "2 devs", downloads: "B2B" },
      features: [
        "React 16",
        "Bootstrap",
        "Stripe",
        "Twilio 2FA",
        "Draft.js",
        "Styled Components",
      ],
      stack: {
        frontend: [
          "React 16 (CRA)",
          "Bootstrap 4",
          "Reactstrap",
          "Styled Components",
          "Draft.js WYSIWYG",
        ],
        backend: ["Node.js", "Express.js", "Stripe API", "Twilio API"],
      },
      highlights: [
        {
          title: "2FA Sécurisé",
          description: "Double authentification via SMS/email avec Twilio",
        },
        {
          title: "Paiements Stripe",
          description:
            "Intégration complète pour achat de crédits et abonnements",
        },
        {
          title: "Éditeur WYSIWYG",
          description: "Composition de courriers avec Draft.js",
        },
        {
          title: "Back-Office",
          description: "Gestion des utilisateurs, courriers et statistiques",
        },
      ],
      links: {
        website: "https://www.mail-certificate.com/",
      },
    },
    {
      id: "10",
      name: "Nos Instants Précieux",
      description:
        "Site web e-commerce avec stratégie SEO et marketing intégrée",
      category: "E-commerce",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-pink-400 to-rose-500",
      emoji: "💝",
      image: "/images/projects/nos-instants-precieux-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: ["Next.js", "Bootstrap", "SEO", "Marketing"],
    },
    {
      id: "11",
      name: "Test and Ride",
      description:
        "Application mobile pour plateforme de test de véhicules avec intégration API",
      category: "Mobilité",
      experienceType: "freelance",
      year: "2023",
      platforms: ["ios", "android"],
      gradient: "from-green-400 to-lime-500",
      emoji: "🏍️",
      image: "/images/projects/test-and-ride-dashboard.jpg",
      stats: { teamSize: "2 devs", downloads: "10K+" },
      features: ["React Native", "Expo", "Node.js", "MongoDB", "API Airtable"],
    },
    {
      id: "12",
      name: "Crazee Burger",
      description: "MVP de commande en ligne avec gestion des menus et panier",
      category: "Food Tech",
      experienceType: "personal",
      year: "2023",
      platforms: ["web"],
      gradient: "from-yellow-400 to-amber-500",
      emoji: "🍔",
      image: "/images/projects/crazee-burger.jpg",
      stats: { teamSize: "Solo", downloads: "MVP" },
      features: ["React.js", "Firebase", "Styled Components", "React Router"],
    },
    {
      id: "18",
      name: "Cyclofix (Roulez Jeunesse)",
      description:
        "Pilotage de la croissance opérationnelle d'une scale-up leader de la réparation vélo à domicile pendant 6 ans",
      category: "Management Ops",
      experienceType: "ops",
      year: "2022",
      platforms: ["web"],
      gradient: "from-emerald-400 to-teal-500",
      emoji: "🚲",
      image: "/images/projects/roulez-jeunesse-landing.png",
      images: [
        "/images/projects/roulez-jeunesse-landing.png",
        "/images/projects/roulez-jeunesse-reparations.png",
      ],
      stats: { teamSize: "1000+ recrutés", downloads: "B2B/B2C" },
      features: ["Management", "Recrutement", "B2B", "Operations", "Zapier", "Airtable", "KPI Tracking"],
      highlights: [
        {
          title: "1000+ recrutements",
          description:
            "Travailleurs indépendants recrutés et onboardés à l'échelle nationale",
        },
        {
          title: "Partenariats B2B stratégiques",
          description: "Société Générale, Fnac, Decathlon, L'Oréal et autres grands comptes",
        },
        {
          title: "Acquisition automatisée",
          description: "Entonnoir de recrutement optimisé via Zapier et Airtable",
        },
        {
          title: "6 ans de croissance",
          description: "Management d'équipes larges et dispersées avec suivi de KPIs opérationnels",
        },
      ],
      links: {
        website: "https://www.cyclofix.com/",
      },
    },
    {
      id: "19",
      name: "Pub CUPRA x AVNIER",
      description:
        "Régie générale sur un tournage publicitaire CUPRA x AVNIER, tourné de nuit à Noisy-le-Grand",
      longDescription:
        "Régie générale et coordination logistique sur le tournage publicitaire de la collaboration CUPRA x AVNIER. Gestion du plateau en équipe de nuit avec suivi rigoureux des plannings et coordination des équipes techniques. Réalisation Benjamin Marchal, directrice de la photographie Lara Perrotte. Production Wilders, agence BBDO.",
      category: "Publicité",
      experienceType: "cinema",
      year: "2026",
      platforms: ["web"],
      gradient: "from-amber-400 to-yellow-500",
      emoji: "🎬",
      image: "/images/projects/cupra-formentor.jpg",
      images: [
        "/images/projects/cupra-formentor.jpg",
        "/images/projects/cupra-tournage-nuit.jpg",
        "/images/projects/avnier-landing.png",
      ],
      stats: { teamSize: "Équipe nuit", downloads: "Pub" },
      features: [
        "Régie générale",
        "Coordination logistique",
        "Tournage de nuit",
        "Production Wilders",
        "Agence BBDO",
      ],
      highlights: [
        {
          title: "Réalisation",
          description: "Benjamin Marchal, DOP Lara Perrotte",
        },
        {
          title: "Production",
          description: "Production Wilders, Agence BBDO",
        },
        {
          title: "Tournage de nuit",
          description:
            "Régie générale du plateau en équipe de nuit, suivi des plannings et coordination technique",
        },
        {
          title: "Adaptation",
          description:
            "Réactivité face aux contraintes de tournage en conditions live",
        },
      ],
    },
    {
      id: "20",
      name: "Pub Optic 2000",
      description:
        "Premier assistant caméra sur un tournage publicitaire national sous la direction du chef opérateur Julien Froment",
      longDescription:
        "Premier assistant caméra sur un tournage publicitaire pour Optic 2000. Préparation et gestion du matériel caméra (objectifs, filtres, supports), suivi des plans sous la direction du chef opérateur Julien Froment. Gestion des changements de configuration entre les séquences.",
      category: "Publicité",
      experienceType: "cinema",
      year: "2023",
      platforms: ["web"],
      gradient: "from-sky-400 to-blue-500",
      emoji: "🎥",
      image: "/images/projects/optic2000-landing.png",
      stats: { teamSize: "Équipe tournage", downloads: "Pub" },
      features: [
        "1er assistant caméra",
        "Gestion matériel",
        "Chef op Julien Froment",
        "Optic 2000",
      ],
      highlights: [
        {
          title: "Rôle",
          description:
            "Premier assistant caméra — préparation et gestion du matériel (objectifs, filtres, supports)",
        },
        {
          title: "Chef opérateur",
          description: "Julien Froment",
        },
        {
          title: "Tournage",
          description:
            "Campagne publicitaire nationale Optic 2000 — suivi des plans et changements de configuration",
        },
      ],
    },
    {
      id: "21",
      name: "Oppenheimer — 70mm Grand Rex",
      description:
        "Première projection publique en pellicule 70mm au Grand Rex depuis 1989 — 6,2 km de pellicule, 140 kg de bobines",
      longDescription:
        "Assistant projectionniste pour l'avant-première et l'exploitation du film Oppenheimer de Christopher Nolan en pellicule 70mm au Grand Rex. Première projection publique 70mm dans cette salle mythique depuis Indiana Jones en 1989. Installation et opération d'une cabine de projection délocalisée dans la salle, au-dessus des spectateurs. 6,2 km de pellicule, 140 kg de bobines. Accueil et visites de la cabine pour les spectateurs.",
      category: "Cinéma",
      experienceType: "cinema",
      year: "2023",
      platforms: ["web"],
      gradient: "from-orange-400 to-red-500",
      emoji: "🎞️",
      image: "/images/projects/oppenheimer-projecteur-70mm.png",
      images: [
        "/images/projects/oppenheimer-projecteur-70mm.png",
        "/images/projects/oppenheimer-pellicule-70mm.png",
        "/images/projects/oppenheimer-cabine-rex.jpg",
      ],
      stats: { teamSize: "Équipe projection", downloads: "70mm" },
      features: [
        "Pellicule 70mm",
        "Grand Rex Paris",
        "Christopher Nolan",
        "Cabine délocalisée",
      ],
      highlights: [
        {
          title: "Format exceptionnel",
          description:
            "Pellicule 70mm — 6,2 km de film, 140 kg de bobines par copie",
        },
        {
          title: "Événement historique",
          description:
            "Première projection publique 70mm au Grand Rex depuis Indiana Jones (1989)",
        },
        {
          title: "Installation sur mesure",
          description:
            "Cabine de projection délocalisée installée dans la salle, au-dessus des spectateurs",
        },
        {
          title: "Accueil public",
          description:
            "Visites de la cabine et démonstration du processus de projection pellicule",
        },
      ],
      links: {
        website: "https://www.dailymotion.com/video/x8mvpm2",
      },
    },
    {
      id: "22",
      name: "Avatar — La Seine Musicale",
      description:
        "Avant-première européenne d'Avatar 3 en présence de James Cameron — installation cabine de projection et système son IMAX",
      longDescription:
        "Assistant projectionniste et responsable technique pour l'avant-première européenne d'Avatar : De feu et de cendres à La Seine Musicale (Boulogne-Billancourt). Installation complète de la cabine de projection, branchement et configuration du système son IMAX, calibration image, préparation de la venue du public. Événement en présence de James Cameron et de l'équipe du film.",
      category: "Cinéma",
      experienceType: "cinema",
      year: "2025",
      platforms: ["web"],
      gradient: "from-cyan-400 to-blue-600",
      emoji: "🌊",
      image: "/images/projects/avatar-affiche.jpg",
      images: [
        "/images/projects/avatar-affiche.jpg",
        "/images/projects/avatar-seine-musicale.jpg",
        "/images/projects/avatar-cabine-projection.jpg",
      ],
      stats: { teamSize: "Équipe technique", downloads: "IMAX" },
      features: [
        "Projection IMAX",
        "La Seine Musicale",
        "James Cameron",
        "20th Century Studios",
      ],
      highlights: [
        {
          title: "Événement majeur",
          description:
            "Avant-première européenne en présence de James Cameron et de l'équipe du film",
        },
        {
          title: "Installation complète",
          description:
            "Cabine de projection, système son IMAX, calibration image",
        },
        {
          title: "Production",
          description: "20th Century Studios — Avatar : De feu et de cendres",
        },
        {
          title: "Coordination technique",
          description:
            "Coordination son et image pour projection événementielle à La Seine Musicale",
        },
      ],
    },
  ],
  en: [
    // 2025
    {
      id: "0",
      name: "KLESIA",
      description: "White-label retirement & benefits management mobile app",
      longDescription:
        "Enterprise-grade mobile app for retirement and benefits management, built with multi-tenant architecture. Clean Architecture/DDD with 22+ business modules (reimbursements, contracts, beneficiaries, contributions...), 59+ custom UI components, and 12 deployment environments. Legacy code refactoring, progressive maintenance, and new feature development in team.",
      category: "Insurance",
      experienceType: "cdi",
      year: "2025",
      platforms: ["ios", "android"],
      gradient: "from-sky-400 to-blue-600",
      emoji: "🏦",
      image: "/images/projects/klesia-landing.png",
      stats: { teamSize: "3 devs", downloads: "100K+" },
      features: [
        "React Native 0.82",
        "TypeScript",
        "Redux Toolkit",
        "RxJS",
        "Clean Architecture",
        "iOS",
        "Android",
      ],
      stack: {
        frontend: [
          "React Native 0.82",
          "React 18",
          "TypeScript 5.6",
          "Redux Toolkit",
          "RxJS",
          "React Navigation v6",
          "Reanimated 3",
          "Moti",
        ],
        backend: [
          "Axios (Singleton Pattern)",
          "60+ typed DTOs",
          "JWT Authentication",
          "Auto Token Refresh",
        ],
        database: ["Async Storage", "Redux Persist", "Keychain (secure)"],
        devops: [
          "12 environments (.env)",
          "Android Product Flavors",
          "iOS Xcode Schemes (13)",
          "Firebase Distribution",
        ],
        testing: [
          "Jest",
          "React Testing Library",
          "130+ configured mocks",
          "ESLint + Prettier",
        ],
      },
      highlights: [
        {
          title: "Multi-tenant Architecture",
          description:
            "System enabling deployment of multiple configurations and environments from a single codebase",
        },
        {
          title: "Clean Architecture / DDD",
          description:
            "22+ business modules with Domain/Infrastructure/Presentation separation",
        },
        {
          title: "Custom Design System",
          description:
            "59+ UI components (LcButton, LcModal, LcCalendarPicker, LcMutuelleCard...)",
        },
        {
          title: "Multi-environment",
          description:
            "12 build configurations (Android Flavors + iOS Schemes)",
        },
        {
          title: "Security",
          description:
            "Biometrics (Face ID, Touch ID), Keychain, secure token management",
        },
      ],
      links: {
        website: "https://www.klesia.fr/",
        appStore: "https://apps.apple.com/fr/app/klesia-mut-vous/id1664447197",
        playStore:
          "https://play.google.com/store/apps/details?id=com.klesia.kmut&hl=fr",
      },
    },
    {
      id: "00",
      name: "EggscuseMe",
      description: "Web app to track egg freshness and reduce food waste",
      longDescription:
        "EggscuseMe helps users track their egg cartons with color-coded freshness indicators, smart cooking recommendations, and anti-waste insights. The app includes a barcode scanner and an AI scanner (Gemini Vision) to automatically extract laying dates.",
      category: "PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-yellow-300 to-orange-400",
      emoji: "🥚",
      image: "/images/projects/eggscuseme-landing.png",
      images: [
        "/images/projects/eggscuseme-landing.png",
        "/images/projects/eggscuseme-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "Freemium" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "Better Auth",
        "PWA",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Motion",
          "Recharts",
        ],
        backend: [
          "Next.js API Routes",
          "Zod",
          "next-safe-action",
          "Resend",
          "React Email",
          "web-push",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.16", "Redis"],
        devops: [
          "GitHub Actions CI/CD",
          "Vercel",
          "Vercel Cron Jobs",
          "Docker (PostgreSQL/Redis)",
        ],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "AI Vision Scanner",
          description:
            "Automatic date extraction with Google Gemini Vision (OCR)",
        },
        {
          title: "Full PWA",
          description:
            "Service Worker, push notifications, installable experience",
        },
        {
          title: "CI/CD Pipeline",
          description:
            "5 GitHub Actions jobs: lint, types, tests, migrations, Playwright e2e",
        },
        {
          title: "Shared fridges",
          description:
            "Sharing system for families/roommates with email invites",
        },
        { title: "i18n", description: "FR/EN support via next-intl" },
      ],
      links: {
        website: "https://eggscuseme.app/",
        github: "https://github.com/YoannDrx/EggscuseMe",
      },
    },
    {
      id: "000",
      name: "Impulsion",
      description: "Hybrid coaching platform connecting coaches and athletes",
      longDescription:
        "Impulsion is a hybrid platform that connects coaches and athletes. It enables session planning with a drag & drop calendar, video annotations, training load calculation (ACWR), and real-time athlete progress tracking. Includes immersive 3D visualizations and a complete subscription system.",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-lime-400 to-green-500",
      emoji: "🏃",
      image: "/images/projects/impulsion-landing.png",
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Three.js",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Three.js",
          "React Three Fiber",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.19", "Redis (ioredis)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Drag & Drop Calendar",
          description: "Intuitive training session planning",
        },
        {
          title: "Video Annotations",
          description:
            "Video analysis with annotations for personalized feedback",
        },
        {
          title: "ACWR Load",
          description: "Automatic acute/chronic workload ratio calculation",
        },
        {
          title: "3D Visualizations",
          description:
            "Immersive interface with Three.js and React Three Fiber",
        },
      ],
      links: {
        website: "https://impulsion.app/",
      },
    },
    {
      id: "0000",
      name: "Jobio",
      description: "Intelligent freelance prospection CRM with built-in AI",
      longDescription:
        "Jobio is a freelance prospection CRM that centralizes mission, profile, platform and contact management. It features a drag & drop Kanban board with 8 statuses, an AI assistant to generate applications and audit LinkedIn profiles, an AI CV Lab to create tailored resumes per mission, automated follow-up sequences, an integrated calendar to visualize deadlines and follow-ups, a freelance platform manager (Malt, Upwork...), a contact CRM, and conversion analytics. Includes a Stripe subscription system with 3 plans (Free, Pro, Ultra).",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-indigo-400 to-purple-600",
      emoji: "💼",
      image: "/images/projects/jobio-landing.png",
      images: [
        "/images/projects/jobio-landing.png",
        "/images/projects/jobio-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "OpenAI",
        "Better Auth",
        "Redis",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Recharts",
          "Motion",
          "@hello-pangea/dnd",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK (Vercel AI)",
          "next-safe-action",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL (NeonDB)", "Prisma ORM 6.16", "Redis (ioredis)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Mission Tracker Kanban",
          description:
            "Drag & drop board with 8 statuses to track the prospection pipeline",
        },
        {
          title: "AI Business Assistant",
          description:
            "Application generation, offer evaluation, LinkedIn audit, LinkedIn posts",
        },
        {
          title: "AI CV Lab",
          description:
            "Tailored resume generation per mission with AI customization and PDF export",
        },
        {
          title: "Automated Sequences",
          description:
            "Multi-channel cadenced follow-ups with templates and automatic triggers",
        },
        {
          title: "Integrated Calendar",
          description:
            "Calendar view of deadlines, follow-ups and appointments linked to missions",
        },
      ],
      links: {
        website: "https://www.jobio.fr/",
      },
    },
    {
      id: "00000",
      name: "Hyrun",
      description:
        "Hybrid HYROX & running training app with AI coaching and personalized nutrition",
      longDescription:
        "Hyrun is a personal AI coach for hybrid athletes (HYROX & running). The app generates smart training plans with periodization phases (Base, Build, Peak, Taper), offers exercise substitutions based on available equipment, provides a unified training calendar with detailed logs (RPE, mood, pain), and delivers AI-powered personalized nutrition plans. Includes running benchmarks (5K, 10K, half marathon, marathon), an AI coach chat, and progress tracking with charts.",
      category: "SaaS",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-amber-400 to-orange-600",
      emoji: "🏋️",
      image: "/images/projects/hyrun-landing.png",
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma 6",
        "Stripe",
        "OpenAI",
        "Better Auth",
        "Recharts",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Zustand",
          "TanStack Query",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK (Vercel AI)",
          "Resend",
          "React Email",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.16", "Redis (Upstash)"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "AI Training Plans",
          description:
            "Hybrid HYROX + running plan generation with periodized phases (Base → Taper)",
        },
        {
          title: "Smart Substitutions",
          description:
            "Alternative exercise suggestions based on available equipment",
        },
        {
          title: "AI Nutrition",
          description:
            "Personalized nutrition plans with macros, meals and shopping lists",
        },
        {
          title: "AI Coach",
          description:
            "Conversational assistant for personalized training advice",
        },
        {
          title: "Unified Calendar",
          description:
            "Session tracking with RPE, mood, pain, energy and sleep logs",
        },
      ],
      links: {
        website: "https://hyrun.app/",
      },
    },
    // 2024
    {
      id: "1",
      name: "Jaji",
      description: "Mobile app for health insurance and financial services",
      longDescription:
        "React Native mobile app for health insurance and financial services management. Clean Architecture/DDD with business feature development (reimbursements, contracts, beneficiaries, documents), bug resolution in Agile/Scrum/SAFe team. Contribution to a 59+ reusable component design system and full Firebase integration (Analytics, Crashlytics, Push Notifications via Notifee).",
      category: "Fintech",
      experienceType: "cdi",
      year: "2024",
      platforms: ["ios", "android"],
      gradient: "from-teal-400 to-emerald-500",
      emoji: "💼",
      image: "/images/projects/jaji-landing.png",
      stats: { teamSize: "3 devs", downloads: "50K+" },
      features: [
        "React Native",
        "TypeScript",
        "Redux Toolkit",
        "RxJS",
        "Agile/Scrum/SAFe",
        "Firebase",
        "Clean Architecture",
      ],
      stack: {
        frontend: [
          "React Native 0.82",
          "React 18",
          "TypeScript",
          "Redux Toolkit",
          "RxJS Observables",
          "React Navigation v6",
          "i18next",
        ],
        backend: [
          "Axios with interceptors",
          "Repository Pattern",
          "DTO ↔ Domain Mappers",
        ],
        database: ["Async Storage", "Redux Persist"],
        devops: [
          "Firebase Analytics",
          "Firebase Crashlytics",
          "Firebase Cloud Messaging",
          "Notifee Push",
        ],
        testing: ["Jest", "Testing Library", "Axios Mock Adapter"],
      },
      highlights: [
        {
          title: "Business Modules",
          description:
            "Feature development: Reimbursements, Contracts, Beneficiaries, Documents, Contributions",
        },
        {
          title: "Hybrid State Management",
          description:
            "Redux Toolkit + RxJS BehaviorSubject for observable stores",
        },
        {
          title: "Agile Methodology",
          description: "Scrum/SAFe with sprints, reviews, and planning",
        },
        {
          title: "Firebase Integration",
          description:
            "Analytics, Crashlytics, Cloud Messaging, Push Notifications",
        },
        {
          title: "Internationalization",
          description: "Multi-language support via i18next",
        },
      ],
      links: {
        website: "https://jaji.fr/",
        appStore: "https://apps.apple.com/fr/app/jaji/id1611736477",
        playStore:
          "https://play.google.com/store/apps/details?id=com.jaji&hl=fr",
      },
    },
    {
      id: "2",
      name: "MyCryptoPilot",
      description:
        "Crypto trading platform with verified traders tracking and real-time signals",
      longDescription:
        'MyCryptoPilot is a "risk-first" social trading platform to follow verified traders, receive real-time signals, and review verified performance via Binance & Bybit APIs. It includes native crypto payments (Base/Tron), a 24/7 Discord bot, and KPI computation (win rate, profit factor, drawdown).',
      category: "PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-amber-400 to-orange-500",
      emoji: "🚀",
      image: "/images/projects/mycryptopilot-landing.png",
      images: [
        "/images/projects/mycryptopilot-landing.png",
        "/images/projects/mycryptopilot-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Crypto",
        "Discord.js",
      ],
      stack: {
        frontend: [
          "Next.js 15 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "BullMQ",
          "Discord.js 14",
          "ccxt",
          "Resend",
          "OpenAI SDK",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.15", "Redis (ioredis)"],
        devops: [
          "GitHub Actions CI/CD (6 jobs)",
          "Vercel",
          "Fly.io Worker",
          "Docker",
        ],
        testing: ["Vitest (21 suites)", "Playwright (26 specs)", "Codecov"],
      },
      highlights: [
        {
          title: "Native crypto payments",
          description:
            "HD wallet generation (Base/Tron), on-chain watcher, sweep script to Binance",
        },
        {
          title: "Exchange APIs",
          description:
            "Native Binance, Bybit, Bitget integrations via ccxt and official SDKs",
        },
        {
          title: "24/7 Discord bot",
          description:
            "Fly.io worker with slash commands, dynamic roles, signal notifications",
        },
        {
          title: "Portfolio tracking",
          description:
            "Read-only API connections, KPI computation (win rate, profit factor, drawdown)",
        },
        {
          title: "Social trading",
          description:
            "Verified trader profiles, JSON TradingCard, feed with filters",
        },
      ],
      links: {
        website: "https://mycryptopilot.app/",
        github: "https://github.com/YoannDrx/mycryptopilot",
      },
    },
    {
      id: "3",
      name: "MoodDay",
      description:
        "Mood tracking and mental well-being app designed with psychiatrists",
      longDescription:
        "MoodDay is a digital companion designed with psychiatrists to help users better understand their moods, track treatments, and prepare for consultations. The app includes daily mood tracking, medication management, analytics, and reminders. GDPR compliant with encrypted data and medical PDF export.",
      category: "PWA",
      experienceType: "personal",
      year: "2025",
      platforms: ["web"],
      gradient: "from-teal-400 to-emerald-500",
      emoji: "🧠",
      image: "/images/projects/moodday-landing.png",
      images: [
        "/images/projects/moodday-landing.png",
        "/images/projects/moodday-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "App" },
      features: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "TailwindCSS v4",
        "PostgreSQL",
        "Prisma",
        "Better Auth",
      ],
      stack: {
        frontend: [
          "Next.js 16 (Turbopack)",
          "React 19",
          "TypeScript 5.9",
          "TailwindCSS v4",
          "Shadcn/UI",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Resend",
          "React Email",
          "jsPDF",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.x"],
        devops: ["Vercel", "GitHub Actions CI/CD"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "Mood tracking",
          description: "Daily recording with automatic pattern detection",
        },
        {
          title: "Medication management",
          description: "Treatment tracking with personalized reminders",
        },
        {
          title: "Medical PDF export",
          description: "Report generation for consultation preparation",
        },
        {
          title: "GDPR compliant",
          description: "Encrypted data and enhanced security",
        },
      ],
      links: {
        website: "https://moodday.app/",
      },
    },
    {
      id: "4",
      name: "HomeGo",
      description:
        "Next-gen real estate platform with DVF data and AI analysis",
      longDescription:
        "HomeGo is a real estate platform for smart investing with listing aggregation, market price analysis via certified DVF data, and AI-assisted negotiation. Includes an intelligent dashboard, personalized alerts, and a borrowing capacity simulator.",
      category: "SaaS",
      experienceType: "personal",
      year: "2024",
      platforms: ["web"],
      gradient: "from-cyan-400 to-blue-500",
      emoji: "🏠",
      image: "/images/projects/homego-landing.png",
      images: [
        "/images/projects/homego-landing.png",
        "/images/projects/homego-dashboard.png",
      ],
      stats: { teamSize: "Solo", downloads: "SaaS" },
      features: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "Better Auth",
        "Mapbox GL",
      ],
      stack: {
        frontend: [
          "Next.js 15 (Turbopack)",
          "React 19",
          "TypeScript 5.8",
          "TailwindCSS v4",
          "Mapbox GL",
          "Recharts",
          "Motion",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Stripe",
          "OpenAI SDK",
          "Resend",
          "jsPDF",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.12"],
        devops: ["Vercel", "Prisma Migrations"],
        testing: ["Vitest", "Playwright", "React Testing Library"],
      },
      highlights: [
        {
          title: "DVF Data",
          description: "Market price analysis with certified data",
        },
        {
          title: "Smart Dashboard",
          description: "Overview with favorites, alerts and market trends",
        },
        {
          title: "Built-in AI",
          description: "OpenAI assistant for negotiation and analysis",
        },
        {
          title: "Loan Simulator",
          description: "Borrowing capacity and financing calculator",
        },
      ],
    },
    // 2023-2024
    {
      id: "5",
      name: "Portfolio Caroline",
      description: "Portfolio for an artist with gallery and CMS",
      longDescription:
        "Artistic portfolio with an interactive photo gallery, carousel, creative visual effects (water wave), YouTube video integration, and a contact system. Full FR/EN multi-language with an integrated CMS to manage content.",
      category: "Portfolio",
      experienceType: "freelance",
      year: "2024",
      platforms: ["web"],
      gradient: "from-rose-400 to-pink-500",
      emoji: "🎨",
      image: "/images/projects/caroline-senyk-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: [
        "Next.js 16",
        "React 19",
        "Bootstrap 5",
        "Prisma",
        "i18n",
        "Resend",
      ],
      stack: {
        frontend: [
          "Next.js 16",
          "React 19",
          "Bootstrap 5",
          "SASS",
          "Swiper",
          "React Slick",
        ],
        backend: ["Prisma ORM", "Resend", "Zod"],
        database: ["PostgreSQL", "Prisma ORM 6.19"],
      },
      highlights: [
        {
          title: "Art gallery",
          description:
            "Lightbox, carousel, image modals with creative visual effects",
        },
        {
          title: "FR/EN i18n",
          description: "Full internationalization via i18next",
        },
        {
          title: "YouTube video",
          description: "Native integration of the artist's videos",
        },
      ],
      links: {
        website: "https://www.caroline-senyk.fr/",
      },
    },
    {
      id: "6",
      name: "Weil & Associés",
      description:
        "Corporate website for a law firm with a content management back office",
      longDescription:
        "Corporate website for a Paris-based law firm with a modern design, a content management back-office (team, news), an advanced contact form, and SEO optimization for the legal sector.",
      category: "Corporate",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-slate-400 to-gray-500",
      emoji: "⚖️",
      image: "/images/projects/weil-paris-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2B" },
      features: [
        "Next.js 13",
        "React 18",
        "TailwindCSS",
        "DaisyUI",
        "Supabase",
        "i18n",
      ],
      stack: {
        frontend: [
          "Next.js 13",
          "React 18",
          "TailwindCSS",
          "DaisyUI",
          "React Hook Form",
        ],
        backend: ["Supabase Auth", "Nodemailer", "i18next"],
        database: ["Supabase (PostgreSQL)"],
      },
      highlights: [
        {
          title: "Corporate design",
          description: "Professional UI tailored to the legal industry",
        },
        {
          title: "Back office",
          description: "Team, news and content management via Supabase",
        },
        {
          title: "Legal SEO",
          description: "SEO optimization targeting law firms in Paris",
        },
      ],
      links: {
        website: "https://www.weil-paris.fr/",
      },
    },
    {
      id: "7",
      name: "Agence Néon",
      description: "Website and maintenance for a Paris-based digital agency",
      category: "Agency",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-orange-400 to-red-500",
      emoji: "🔥",
      image: "/images/projects/agence-neon-landing.jpg",
      stats: { teamSize: "3 devs", downloads: "B2B" },
      features: ["Next.js", "SEO", "Google Analytics", "Bootstrap"],
    },
    {
      id: "8",
      name: "Portfolio Loïc Ghanem",
      description:
        "Immersive portfolio for a film/video game/commercial music composer with 3D, mapping, audio player and back-office",
      longDescription:
        "Immersive portfolio for composer Loïc Ghanem (film, video game, commercial music). 3D visualizations (Three.js / React Three Fiber), custom audio player, interactive world map of collaborations (Mapbox GL), PDF resume generator, and content management back-office with Tiptap editor. Multi-language and responsive.",
      category: "Portfolio",
      experienceType: "freelance",
      year: "2023 - 2025",
      platforms: ["web"],
      gradient: "from-purple-400 to-violet-500",
      emoji: "🎵",
      image: "/images/projects/portfolio-loic-landing.png",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: [
        "Next.js 16",
        "React 19",
        "Three.js",
        "React Three Fiber",
        "Mapbox GL",
        "Tiptap",
      ],
      stack: {
        frontend: [
          "Next.js 16",
          "React 19",
          "TailwindCSS",
          "Three.js",
          "React Three Fiber",
          "Framer Motion",
          "Mapbox GL",
        ],
        backend: [
          "Prisma ORM",
          "Better Auth",
          "Tiptap Editor",
          "React PDF Renderer",
          "Vercel Blob",
        ],
        database: ["PostgreSQL", "Prisma ORM 6.19", "Upstash Redis"],
        devops: ["Vercel", "Husky", "lint-staged"],
      },
      highlights: [
        {
          title: "3D visualization",
          description:
            "Immersive animations with Three.js and React Three Fiber",
        },
        {
          title: "Audio player",
          description: "Custom player to listen to compositions",
        },
        {
          title: "Interactive map",
          description: "Mapbox GL to visualize worldwide collaborations",
        },
        {
          title: "CMS Back-office",
          description: "Content management with Tiptap WYSIWYG editor",
        },
      ],
      links: {
        website: "https://www.loic-ghanem.com/",
      },
    },
    {
      id: "9",
      name: "Mail Certificate",
      description:
        "Certified mail sending platform with Stripe payments and 2FA",
      longDescription:
        "B2B SaaS platform to send certified digital registered letters. Includes Stripe payments, two-factor authentication via SMS/email (Twilio), a rich text editor, and a complete management back office.",
      category: "SaaS",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-blue-400 to-cyan-500",
      emoji: "📧",
      image: "/images/projects/mail-certificate-landing.jpg",
      stats: { teamSize: "2 devs", downloads: "B2B" },
      features: [
        "React 16",
        "Bootstrap",
        "Stripe",
        "Twilio 2FA",
        "Draft.js",
        "Styled Components",
      ],
      stack: {
        frontend: [
          "React 16 (CRA)",
          "Bootstrap 4",
          "Reactstrap",
          "Styled Components",
          "Draft.js WYSIWYG",
        ],
        backend: ["Node.js", "Express.js", "Stripe API", "Twilio API"],
      },
      highlights: [
        {
          title: "Secure 2FA",
          description: "Two-factor authentication via SMS/email with Twilio",
        },
        {
          title: "Stripe payments",
          description:
            "Full integration for credit purchases and subscriptions",
        },
        {
          title: "WYSIWYG editor",
          description: "Letter composition with Draft.js",
        },
        {
          title: "Back office",
          description: "Users, letters and analytics management",
        },
      ],
      links: {
        website: "https://www.mail-certificate.com/",
      },
    },
    {
      id: "10",
      name: "Nos Instants Précieux",
      description:
        "E-commerce website with built-in SEO and marketing strategy",
      category: "E-commerce",
      experienceType: "freelance",
      year: "2023",
      platforms: ["web"],
      gradient: "from-pink-400 to-rose-500",
      emoji: "💝",
      image: "/images/projects/nos-instants-precieux-landing.jpg",
      stats: { teamSize: "Solo", downloads: "B2C" },
      features: ["Next.js", "Bootstrap", "SEO", "Marketing"],
    },
    {
      id: "11",
      name: "Test and Ride",
      description:
        "Mobile app for a vehicle testing platform with API integrations",
      category: "Mobility",
      experienceType: "freelance",
      year: "2023",
      platforms: ["ios", "android"],
      gradient: "from-green-400 to-lime-500",
      emoji: "🏍️",
      image: "/images/projects/test-and-ride-dashboard.jpg",
      stats: { teamSize: "2 devs", downloads: "10K+" },
      features: ["React Native", "Expo", "Node.js", "MongoDB", "Airtable API"],
    },
    {
      id: "12",
      name: "Crazee Burger",
      description: "Online ordering MVP with menu and cart management",
      category: "Food Tech",
      experienceType: "personal",
      year: "2023",
      platforms: ["web"],
      gradient: "from-yellow-400 to-amber-500",
      emoji: "🍔",
      image: "/images/projects/crazee-burger.jpg",
      stats: { teamSize: "Solo", downloads: "MVP" },
      features: ["React.js", "Firebase", "Styled Components", "React Router"],
    },
    {
      id: "18",
      name: "Cyclofix (Roulez Jeunesse)",
      description: "Led operational growth of a leading home bike repair scale-up for 6 years",
      category: "Management Ops",
      experienceType: "ops",
      year: "2022",
      platforms: ["web"],
      gradient: "from-emerald-400 to-teal-500",
      emoji: "🚲",
      image: "/images/projects/roulez-jeunesse-landing.png",
      images: [
        "/images/projects/roulez-jeunesse-landing.png",
        "/images/projects/roulez-jeunesse-reparations.png",
      ],
      stats: { teamSize: "1000+ recruited", downloads: "B2B/B2C" },
      features: ["Management", "Recrutement", "B2B", "Operations", "Zapier", "Airtable", "KPI Tracking"],
      highlights: [
        {
          title: "1000+ recruitments",
          description: "Independent workers recruited and onboarded nationwide",
        },
        {
          title: "Strategic B2B partnerships",
          description: "Société Générale, Fnac, Decathlon, L'Oréal and other major accounts",
        },
        {
          title: "Automated acquisition",
          description: "Optimized recruitment funnel via Zapier and Airtable",
        },
        {
          title: "6 years of growth",
          description: "Managing large, geographically dispersed teams with operational KPI tracking",
        },
      ],
      links: {
        website: "https://www.cyclofix.com/",
      },
    },
    {
      id: "19",
      name: "CUPRA x AVNIER Ad",
      description:
        "General stage management on a CUPRA x AVNIER ad shoot, filmed at night in Noisy-le-Grand",
      longDescription:
        "General stage management and logistics coordination on the CUPRA x AVNIER advertising shoot. Night crew management with rigorous schedule tracking and technical team coordination. Directed by Benjamin Marchal, DOP Lara Perrotte. Production Wilders, BBDO agency.",
      category: "Advertising",
      experienceType: "cinema",
      year: "2026",
      platforms: ["web"],
      gradient: "from-amber-400 to-yellow-500",
      emoji: "🎬",
      image: "/images/projects/cupra-formentor.jpg",
      images: [
        "/images/projects/cupra-formentor.jpg",
        "/images/projects/cupra-tournage-nuit.jpg",
        "/images/projects/avnier-landing.png",
      ],
      stats: { teamSize: "Night crew", downloads: "Ad" },
      features: [
        "General stage management",
        "Logistics coordination",
        "Night shoot",
        "Production Wilders",
        "BBDO Agency",
      ],
      highlights: [
        {
          title: "Direction",
          description: "Benjamin Marchal, DOP Lara Perrotte",
        },
        {
          title: "Production",
          description: "Production Wilders, BBDO Agency",
        },
        {
          title: "Night shoot",
          description:
            "General stage management on a night crew, schedule tracking and technical coordination",
        },
        {
          title: "Adaptability",
          description:
            "Quick adaptation to live shooting constraints and changing conditions",
        },
      ],
    },
    {
      id: "20",
      name: "Optic 2000 Ad",
      description:
        "First assistant camera on a national ad shoot under DOP Julien Froment",
      longDescription:
        "First assistant camera on an advertising shoot for Optic 2000. Camera equipment preparation and management (lenses, filters, supports), shot tracking under the direction of DOP Julien Froment. Configuration changes between sequences.",
      category: "Advertising",
      experienceType: "cinema",
      year: "2023",
      platforms: ["web"],
      gradient: "from-sky-400 to-blue-500",
      emoji: "🎥",
      image: "/images/projects/optic2000-landing.png",
      stats: { teamSize: "Film crew", downloads: "Ad" },
      features: [
        "1st assistant camera",
        "Equipment management",
        "DOP Julien Froment",
        "Optic 2000",
      ],
      highlights: [
        {
          title: "Role",
          description:
            "First assistant camera — equipment prep and management (lenses, filters, supports)",
        },
        {
          title: "Director of photography",
          description: "Julien Froment",
        },
        {
          title: "Shoot",
          description:
            "National Optic 2000 ad campaign — shot tracking and configuration changes",
        },
      ],
    },
    {
      id: "21",
      name: "Oppenheimer — 70mm Grand Rex",
      description:
        "First public 70mm screening at the Grand Rex since 1989 — 6.2 km of film, 140 kg of reels",
      longDescription:
        "Assistant projectionist for the premiere and exhibition of Christopher Nolan's Oppenheimer in 70mm film at the Grand Rex. First public 70mm screening in this iconic venue since Indiana Jones in 1989. Setup and operation of a projection booth relocated inside the auditorium, above the audience. 6.2 km of film, 140 kg of reels. Public tours and demonstrations of the film projection process.",
      category: "Cinema",
      experienceType: "cinema",
      year: "2023",
      platforms: ["web"],
      gradient: "from-orange-400 to-red-500",
      emoji: "🎞️",
      image: "/images/projects/oppenheimer-projecteur-70mm.png",
      images: [
        "/images/projects/oppenheimer-projecteur-70mm.png",
        "/images/projects/oppenheimer-pellicule-70mm.png",
        "/images/projects/oppenheimer-cabine-rex.jpg",
      ],
      stats: { teamSize: "Projection crew", downloads: "70mm" },
      features: [
        "70mm film",
        "Grand Rex Paris",
        "Christopher Nolan",
        "Relocated booth",
      ],
      highlights: [
        {
          title: "Exceptional format",
          description: "70mm film — 6.2 km of reel, 140 kg of film per copy",
        },
        {
          title: "Historic event",
          description:
            "First public 70mm screening at the Grand Rex since Indiana Jones (1989)",
        },
        {
          title: "Custom setup",
          description:
            "Projection booth relocated inside the auditorium, installed above spectators",
        },
        {
          title: "Public engagement",
          description:
            "Booth tours and demonstration of the film projection process",
        },
      ],
      links: {
        website: "https://www.dailymotion.com/video/x8mvpm2",
      },
    },
    {
      id: "22",
      name: "Avatar — La Seine Musicale",
      description:
        "European premiere of Avatar 3 with James Cameron — projection booth and IMAX sound system installation",
      longDescription:
        "Assistant projectionist and technical lead for the European premiere of Avatar: Fire and Ash at La Seine Musicale (Boulogne-Billancourt). Complete projection booth installation, IMAX sound system setup and configuration, image calibration, and audience preparation. Event attended by James Cameron and the film's cast and crew.",
      category: "Cinema",
      experienceType: "cinema",
      year: "2025",
      platforms: ["web"],
      gradient: "from-cyan-400 to-blue-600",
      emoji: "🌊",
      image: "/images/projects/avatar-affiche.jpg",
      images: [
        "/images/projects/avatar-affiche.jpg",
        "/images/projects/avatar-seine-musicale.jpg",
        "/images/projects/avatar-cabine-projection.jpg",
      ],
      stats: { teamSize: "Technical crew", downloads: "IMAX" },
      features: [
        "IMAX projection",
        "La Seine Musicale",
        "James Cameron",
        "20th Century Studios",
      ],
      highlights: [
        {
          title: "Major event",
          description:
            "European premiere with James Cameron and the film's cast and crew",
        },
        {
          title: "Full installation",
          description: "Projection booth, IMAX sound system, image calibration",
        },
        {
          title: "Production",
          description: "20th Century Studios — Avatar: Fire and Ash",
        },
        {
          title: "Technical coordination",
          description:
            "Sound and image coordination for a premiere event at La Seine Musicale",
        },
      ],
    },
  ],
};

export const experiences: Experience[] = experiencesByLocale.fr;

export function getExperiences(locale: Locale): Experience[] {
  return experiencesByLocale[locale] ?? experiencesByLocale.fr;
}

/**
 * Helper pour obtenir le nombre total de projets
 */
export const getExperiencesCount = (locale: Locale = "fr") =>
  getExperiences(locale).length;

/**
 * Helper pour obtenir un projet par son ID
 */
export const getExperienceById = (id: string, locale: Locale = "fr") =>
  getExperiences(locale).find((p) => p.id === id);

/**
 * Helper pour filtrer les projets par plateforme
 */
export const getExperiencesByPlatform = (
  platform: "ios" | "android" | "web",
  locale: Locale = "fr"
) => getExperiences(locale).filter((p) => p.platforms.includes(platform));

/**
 * Helper pour filtrer les projets par type
 */
export const getExperiencesByType = (
  type: ExperienceType,
  locale: Locale = "fr"
) => getExperiences(locale).filter((p) => p.experienceType === type);
