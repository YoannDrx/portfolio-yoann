/**
 * Skills Data
 * Compétences narratives du portfolio
 */

import type { NarrativeSkillCard, SoftSkillCard, Tool } from './types';

// ============ INTRO NARRATIVE ============

export const skillStoryIntro = `Je suis un développeur front-end et mobile avec un parcours atypique : après une licence en cinéma, j'ai passé dix ans dans l'événementiel et le management avant de me reconvertir dans le code. Cette trajectoire m'a donné une approche différente : je ne vois pas seulement les lignes de code, mais l'expérience qu'elles créent pour l'utilisateur final. Je garde le même souci du détail qu'en régie de projection, où chaque milliseconde compte.`;

// ============ TECHNICAL SKILLS ============

export const technicalSkills: NarrativeSkillCard[] = [
  {
    id: 'react-native',
    title: 'React Native',
    level: 'Expert',
    gradient: 'from-blue-500 to-cyan-400',
    icon: '⚛️',
    narrative: `Je développe des applications mobiles complètes depuis 2023, d'abord en freelance puis en CDI chez Jaji et Klesia. Je suis à l'aise avec l'écosystème Expo comme le bare workflow, la gestion de builds multi-environnements, les animations complexes avec Reanimated, et le déploiement sur les stores. J'aime que le code soit propre, modulaire, et facile à maintenir sur le long terme.`,
    highlights: [
      'Navigation avancée & Deep Linking',
      'Animations fluides (Reanimated, Gesture Handler)',
      'Architecture modulaire et scalable',
      'CI/CD avec Expo EAS',
      'Déploiement App Store & Play Store',
    ],
  },
  {
    id: 'react-nextjs',
    title: 'React & Next.js',
    level: 'Avancé',
    gradient: 'from-indigo-500 to-purple-400',
    icon: '▲',
    narrative: `Je construis des applications web modernes avec Next.js, en privilégiant la performance et l'expérience utilisateur. J'ai réalisé plusieurs projets from scratch : portfolios artistiques, sites vitrines avec back-office, et SaaS comme MyCryptoPilot. Je fais attention à la structure du code, au SEO, et à la maintenabilité.`,
    highlights: [
      'Server Components & App Router',
      'Composants réutilisables et typés',
      'Intégration APIs & webhooks',
      'Optimisation SEO et performances',
      'Authentification sécurisée',
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    level: 'Avancé',
    gradient: 'from-blue-600 to-blue-400',
    icon: '📘',
    narrative: `Je code en TypeScript par défaut. Ça sécurise le code, évite les régressions, et rend la collaboration plus fluide. J'apprécie de pouvoir structurer proprement les modèles de données et d'avoir un feedback immédiat dans l'éditeur.`,
    highlights: [
      'Typage strict et cohérent',
      'Modèles de données évolutifs',
      'API clients robustes',
      "Gestion d'erreurs structurée",
    ],
  },
  {
    id: 'backend',
    title: 'Node.js & Services',
    level: 'Confirmé',
    gradient: 'from-green-500 to-emerald-400',
    icon: '🔧',
    narrative: `Je peux concevoir un backend léger quand le projet le demande : API REST, authentification, webhooks, bases de données. J'ai intégré Stripe, Twilio, Firebase, et diverses APIs tierces. Je ne suis pas un expert backend, mais je sais me débrouiller pour livrer une solution fonctionnelle.`,
    highlights: [
      'API REST avec Express',
      'Auth & sessions',
      'Webhooks (Stripe, Discord)',
      'Firebase / Firestore',
      'Intégrations tierces',
    ],
  },
];

// ============ SOFT SKILLS ============

export const softSkills: SoftSkillCard[] = [
  {
    id: 'leadership',
    title: 'Leadership & coordination',
    icon: '👥',
    gradient: 'from-amber-500 to-orange-400',
    narrative: `Pendant six ans chez Cyclofix, j'ai géré le recrutement et l'intégration de plus de 1000 travailleurs indépendants. J'ai appris à poser un cadre clair, accompagner les profils différents, et faire avancer une équipe même dans les moments tendus. Aujourd'hui, cette expérience me sert à bien communiquer avec les équipes produit, design, et les autres devs.`,
  },
  {
    id: 'resilience',
    title: 'Résilience & sang-froid',
    icon: '💪',
    gradient: 'from-red-500 to-rose-400',
    narrative: `Mon dernier événement en régie : l'avant-première européenne d'AVATAR, avec James Cameron, 300 prestataires, et la pression d'une projection parfaite pour la presse et les influenceurs. Dans ce contexte, tu apprends à garder ton calme, anticiper les problèmes, et trouver des solutions en temps réel. Cette capacité à rester efficace sous pression, je l'applique maintenant aux deadlines serrées et aux bugs critiques.`,
  },
  {
    id: 'communication',
    title: 'Communication & écoute',
    icon: '💬',
    gradient: 'from-sky-500 to-cyan-400',
    narrative: `Des années à travailler avec des clients exigeants — Netflix, Amazon Prime, Canal+ — m'ont appris à écouter vraiment, comprendre les besoins non-dits, et adapter ma communication. En tant que dev, ça m'aide à poser les bonnes questions, à comprendre ce que veut vraiment le PO ou le client, et à éviter les malentendus coûteux.`,
  },
  {
    id: 'creativity',
    title: 'Sens du détail & UX',
    icon: '🎬',
    gradient: 'from-purple-500 to-pink-400',
    narrative: `Mon background en cinéma et en projection m'a donné un œil pour le détail technique et le souci de l'expérience spectateur. Chaque frame compte, chaque transition doit être fluide. C'est la même approche que j'applique au développement : je veux que l'utilisateur ait une expérience sans accroc, avec des animations soignées et une interface intuitive.`,
  },
];

// ============ TOOLS ============

export const tools: Tool[] = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Xcode', icon: '🍎' },
  { name: 'Android Studio', icon: '🤖' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Expo', icon: '📱' },
  { name: 'Postman', icon: '📮' },
];

// ============ LEGACY EXPORTS (for compatibility) ============
// These are kept for backward compatibility with other parts of the app

import type { SkillCategory, Skill } from './types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    title: 'Core',
    gradient: 'from-blue-500 to-cyan-400',
    icon: '⚛️',
    skills: [
      { name: 'React Native', level: 90, icon: '⚛️', category: 'core' },
      { name: 'React.js', level: 90, icon: '⚛️', category: 'core' },
      { name: 'Next.js', level: 85, icon: '▲', category: 'core' },
      { name: 'TypeScript', level: 80, icon: '📘', category: 'core' },
      { name: 'JavaScript', level: 90, icon: '🟨', category: 'core' },
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
