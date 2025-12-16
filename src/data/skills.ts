/**
 * Skills Data
 * Compétences narratives du portfolio
 */

import type { NarrativeSkillCard, SoftSkillCard, Tool } from "./types";
import type { Locale } from "@/i18n/locales";

// ============ INTRO NARRATIVE ============

const skillStoryIntroByLocale: Record<Locale, string> = {
  fr: `Je suis un développeur front-end et mobile avec un parcours atypique : après une licence en cinéma, j'ai passé dix ans dans l'événementiel et le management avant de me reconvertir dans le code. Cette trajectoire m'a donné une approche différente : je ne vois pas seulement les lignes de code, mais l'expérience qu'elles créent pour l'utilisateur final. Je garde le même souci du détail.`,
  en: `I'm a front-end and mobile developer with an atypical background: after a degree in cinema, I spent ten years in events and management before transitioning into software development. That journey gave me a different perspective: I don't just see lines of code, I focus on the experience they create for the end user. I keep the same attention to detail.`,
};

export const skillStoryIntro = skillStoryIntroByLocale.fr;

export function getSkillStoryIntro(locale: Locale): string {
  return skillStoryIntroByLocale[locale] ?? skillStoryIntroByLocale.fr;
}

// ============ TECHNICAL SKILLS ============

const technicalSkillsByLocale: Record<Locale, NarrativeSkillCard[]> = {
  fr: [
    {
      id: "react-native",
      title: "React Native",
      level: "Confirmé",
      gradient: "from-blue-500 to-cyan-400",
      icon: "⚛️",
      narrative: `Je développe des applications mobiles, web et web apps en React Native depuis 2023, en freelance puis en CDI chez Jaji et Klesia. Je porte une attention particulière aux différences de comportements et d'UI entre iOS et Android, ainsi qu'aux contraintes spécifiques des petits écrans, qui nécessitent souvent de repenser complètement l'UX. L'accessibilité fait également partie de mes priorités : contrastes, lisibilité, tailles de zones tactiles et parcours utilisateur cohérents sur tous les devices.`,
      highlights: [
        "Navigation avancée & deep linking",
        "Animations fluides (Reanimated, Gesture Handler)",
        "Architecture modulaire et scalable",
        "Builds multi-environnements",
        "Déploiement App Store & Play Store",
      ],
    },
    {
      id: "react-nextjs",
      title: "React & Next.js",
      level: "Avancé",
      gradient: "from-indigo-500 to-purple-400",
      icon: "▲",
      narrative: `Je conçois des applications web modernes avec React et Next.js, en mettant l'accent sur la performance, la clarté de l'architecture et l'expérience utilisateur. J'ai réalisé plusieurs projets from scratch : portfolios, sites vitrines avec back-office et applications web plus complexes. Je veille particulièrement à la structure du code, à la maintenabilité à long terme et aux bonnes pratiques liées au SEO et aux performances.`,
      highlights: [
        "App Router & Server Components",
        "Composants réutilisables et typés",
        "Intégration d'APIs & webhooks",
        "Optimisation SEO et performances",
        "Authentification sécurisée",
      ],
    },
    {
      id: "architecture",
      title: "Architecture & organisation",
      level: "Avancé",
      gradient: "from-slate-600 to-slate-400",
      icon: "⚙️",
      narrative: `Je sais structurer un projet de manière claire et durable, en séparant les responsabilités et en évitant les dépendances inutiles. J'accorde une grande importance aux principes de separation of concerns, de lisibilité et de maintenabilité, en particulier sur des projets amenés à évoluer ou à être repris par d'autres développeurs.`,
      highlights: [
        "Séparation des responsabilités (Domain, Services, ViewModels)",
        "Architecture orientée métier",
        "DRY et factorisation raisonnée",
        'Composants "dumb" / "smart" clairement identifiés',
        "Limitation des effets de bord et dépendances croisées",
      ],
    },
    {
      id: "typescript",
      title: "TypeScript",
      level: "Avancé",
      gradient: "from-blue-600 to-blue-400",
      icon: "📘",
      narrative: `Je code en TypeScript par défaut. Ça sécurise le code, évite les régressions, et rend la collaboration plus fluide. J'apprécie de pouvoir structurer proprement les modèles de données et d'avoir un feedback immédiat dans l'éditeur.`,
      highlights: [
        "Typage strict et cohérent",
        "Modèles de données évolutifs",
        "API clients robustes",
        "Gestion d'erreurs structurée",
      ],
    },
    {
      id: "backend",
      title: "Backend",
      subtitle: "Node.js & Services",
      level: "Intermédiaire",
      gradient: "from-green-500 to-emerald-400",
      icon: "🔧",
      narrative: `Je peux concevoir un backend léger quand le projet le demande : API REST, authentification, webhooks, bases de données. J'ai intégré Stripe, Twilio, Firebase, et diverses APIs tierces. Je ne suis pas un expert backend, mais je sais me débrouiller pour livrer une solution fonctionnelle.`,
      highlights: [
        "API REST",
        "Auth & sessions",
        "Webhooks (Stripe, Discord)",
        "Firebase / Firestore",
        "PostgreSQL, Neon, Supabase",
        "Prisma ORM",
        "Intégrations tierces",
      ],
    },
  ],
  en: [
    {
      id: "react-native",
      title: "React Native",
      level: "Proficient",
      gradient: "from-blue-500 to-cyan-400",
      icon: "⚛️",
      narrative: `I've been building mobile apps, websites and PWAs with React Native since 2023—first as a freelancer, then full-time at Jaji and Klesia. I pay close attention to iOS vs Android behavior and UI differences, as well as the constraints of small screens, which often require a complete UX rethink. Accessibility is also a priority: contrast, readability, touch target sizes, and consistent user flows across devices.`,
      highlights: [
        "Advanced navigation & deep linking",
        "Smooth animations (Reanimated, Gesture Handler)",
        "Modular, scalable architecture",
        "Multi-environment builds",
        "App Store & Play Store releases",
      ],
    },
    {
      id: "react-nextjs",
      title: "React & Next.js",
      level: "Advanced",
      gradient: "from-indigo-500 to-purple-400",
      icon: "▲",
      narrative: `I build modern web applications with React and Next.js, focusing on performance, clean architecture, and user experience. I've delivered multiple projects from scratch: portfolios, marketing sites with back-office, and more complex web apps. I care a lot about code structure, long-term maintainability, and best practices around SEO and performance.`,
      highlights: [
        "App Router & Server Components",
        "Reusable, typed components",
        "API & webhook integrations",
        "SEO and performance optimization",
        "Secure authentication",
      ],
    },
    {
      id: "architecture",
      title: "Architecture & organization",
      level: "Advanced",
      gradient: "from-slate-600 to-slate-400",
      icon: "⚙️",
      narrative: `I know how to structure a project in a clear, durable way by separating responsibilities and avoiding unnecessary dependencies. I care about separation of concerns, readability, and maintainability—especially on products that evolve over time or may be handed off to other developers.`,
      highlights: [
        "Clear separation of concerns (Domain, Services, ViewModels)",
        "Business-oriented architecture",
        "DRY with thoughtful abstractions",
        'Clearly separated "dumb" / "smart" components',
        "Minimizing side effects and cross-dependencies",
      ],
    },
    {
      id: "typescript",
      title: "TypeScript",
      level: "Advanced",
      gradient: "from-blue-600 to-blue-400",
      icon: "📘",
      narrative: `I default to TypeScript. It makes code safer, prevents regressions, and improves collaboration. I like being able to model data cleanly and get immediate feedback in the editor.`,
      highlights: [
        "Consistent, strict typing",
        "Evolvable data models",
        "Robust API clients",
        "Structured error handling",
      ],
    },
    {
      id: "backend",
      title: "Backend",
      subtitle: "Node.js & services",
      level: "Intermediate",
      gradient: "from-green-500 to-emerald-400",
      icon: "🔧",
      narrative: `I can build a lightweight backend when needed: REST APIs, authentication, webhooks, databases. I've integrated Stripe, Twilio, Firebase, and various third-party APIs. I'm not a backend specialist, but I can deliver a working, reliable solution end-to-end.`,
      highlights: [
        "REST APIs",
        "Auth & sessions",
        "Webhooks (Stripe, Discord)",
        "Firebase / Firestore",
        "PostgreSQL, Neon, Supabase",
        "Prisma ORM",
        "Third-party integrations",
      ],
    },
  ],
};

export const technicalSkills: NarrativeSkillCard[] = technicalSkillsByLocale.fr;

export function getTechnicalSkills(locale: Locale): NarrativeSkillCard[] {
  return technicalSkillsByLocale[locale] ?? technicalSkillsByLocale.fr;
}

// ============ SOFT SKILLS ============

const softSkillsByLocale: Record<Locale, SoftSkillCard[]> = {
  fr: [
    {
      id: "leadership",
      title: "Leadership & coordination",
      icon: "👥",
      gradient: "from-amber-500 to-orange-400",
      narrative: `Pendant six ans chez Cyclofix, j'ai géré le recrutement et l'intégration de plus de 1000 travailleurs indépendants. J'ai appris à poser un cadre clair, accompagner les profils différents, et faire avancer une équipe même dans les moments tendus. Aujourd'hui, cette expérience me sert à bien communiquer avec les équipes produit, design, et les autres devs.`,
    },
    {
      id: "resilience",
      title: "Résilience & sang-froid",
      icon: "💪",
      gradient: "from-red-500 to-rose-400",
      narrative: `Mon dernier événement en projection (décembre 2025): l'avant-première européenne d'AVATAR, avec James Cameron, 300 prestataires, et la pression d'une projection parfaite pour la presse et les influenceurs. Dans ce contexte, tu apprends à garder ton calme, anticiper les problèmes, et trouver des solutions en temps réel. Cette capacité à rester efficace sous pression, je l'applique maintenant aux deadlines serrées et aux bugs critiques.`,
    },
    {
      id: "communication",
      title: "Communication & écoute",
      icon: "💬",
      gradient: "from-sky-500 to-cyan-400",
      narrative: `Des années à travailler avec des clients exigeants — Netflix, Amazon Prime, Canal+ — m'ont appris à écouter vraiment, comprendre les besoins non-dits, et adapter ma communication. En tant que dev, ça m'aide à poser les bonnes questions, à comprendre ce que veut vraiment le PO ou le client, et à éviter les malentendus coûteux.`,
    },
    {
      id: "creativity",
      title: "Sens du détail & UX",
      icon: "🎬",
      gradient: "from-purple-500 to-pink-400",
      narrative: `Mon background en cinéma et en projection m'a donné un œil pour le détail technique et le souci de l'expérience spectateur. Chaque frame compte, chaque transition doit être fluide. C'est la même approche que j'applique au développement : je veux que l'utilisateur ait une expérience sans accroc, avec des animations soignées et une interface intuitive.`,
    },
  ],
  en: [
    {
      id: "leadership",
      title: "Leadership & coordination",
      icon: "👥",
      gradient: "from-amber-500 to-orange-400",
      narrative: `For six years at Cyclofix, I managed the recruitment and onboarding of more than 1,000 independent workers. I learned how to set a clear framework, support different profiles, and keep a team moving even under pressure. Today, that experience helps me communicate effectively with product, design, and engineering teams.`,
    },
    {
      id: "resilience",
      title: "Resilience & composure",
      icon: "💪",
      gradient: "from-red-500 to-rose-400",
      narrative: `My last projection event (December 2025): the European premiere of AVATAR, with James Cameron, 300 contractors, and the pressure of a flawless screening for press and influencers. In that context, you learn to stay calm, anticipate issues, and find solutions in real time. I now apply that ability to tight deadlines and critical bugs.`,
    },
    {
      id: "communication",
      title: "Communication & listening",
      icon: "💬",
      gradient: "from-sky-500 to-cyan-400",
      narrative: `Years working with demanding clients—Netflix, Amazon Prime, Canal+—taught me to truly listen, understand what is not explicitly said, and adapt my communication. As a developer, it helps me ask the right questions, understand what a PM or client really wants, and avoid costly misunderstandings.`,
    },
    {
      id: "creativity",
      title: "Attention to detail & UX",
      icon: "🎬",
      gradient: "from-purple-500 to-pink-400",
      narrative: `My background in cinema and projection trained my eye for technical detail and the viewer experience. Every frame matters; every transition should feel smooth. I bring the same approach to development: I want users to have a seamless experience, with polished animations and an intuitive interface.`,
    },
  ],
};

export const softSkills: SoftSkillCard[] = softSkillsByLocale.fr;

export function getSoftSkills(locale: Locale): SoftSkillCard[] {
  return softSkillsByLocale[locale] ?? softSkillsByLocale.fr;
}

// ============ TOOLS ============

export const tools: Tool[] = [
  { name: "VS Code", icon: "💻" },
  { name: "Xcode", icon: "🍎" },
  { name: "Android Studio", icon: "🤖" },
  { name: "Figma", icon: "🎨" },
  { name: "Git", icon: "📦" },
  { name: "GitHub", icon: "🐙" },
  { name: "Expo", icon: "📱" },
  { name: "Postman", icon: "📮" },
];

export function getTools(): Tool[] {
  return tools;
}

// ============ LEGACY EXPORTS (for compatibility) ============
// These are kept for backward compatibility with other parts of the app

import type { SkillCategory, Skill } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "core",
    title: "Core",
    gradient: "from-blue-500 to-cyan-400",
    icon: "⚛️",
    skills: [
      { name: "React Native", level: 90, icon: "⚛️", category: "core" },
      { name: "React.js", level: 90, icon: "⚛️", category: "core" },
      { name: "Next.js", level: 85, icon: "▲", category: "core" },
      { name: "TypeScript", level: 80, icon: "📘", category: "core" },
      { name: "JavaScript", level: 90, icon: "🟨", category: "core" },
    ],
  },
];

export const getAllSkills = () => skillCategories.flatMap((cat) => cat.skills);

export const getCategoryAverageLevel = (categoryId: string) => {
  const category = skillCategories.find((c) => c.id === categoryId);
  if (!category) return 0;
  const total = category.skills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / category.skills.length);
};
