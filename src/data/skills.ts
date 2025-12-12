/**
 * Skills Data
 * Compétences et outils du portfolio
 */

import type { SkillCategory, Tool } from './types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    title: 'Core',
    gradient: 'from-blue-500 to-cyan-400',
    icon: '⚛️',
    skills: [
      { name: 'React Native', level: 95, icon: '⚛️', category: 'core' },
      { name: 'TypeScript', level: 90, icon: '📘', category: 'core' },
      { name: 'JavaScript', level: 95, icon: '🟨', category: 'core' },
      { name: 'React', level: 90, icon: '⚛️', category: 'core' },
    ],
  },
  {
    id: 'animation',
    title: 'Animation & UI',
    gradient: 'from-purple-500 to-pink-400',
    icon: '🎬',
    skills: [
      { name: 'Reanimated 3', level: 88, icon: '🎬', category: 'animation' },
      { name: 'Skia', level: 75, icon: '🎨', category: 'animation' },
      { name: 'Gesture Handler', level: 85, icon: '👆', category: 'animation' },
      { name: 'Lottie', level: 80, icon: '✨', category: 'animation' },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation & State',
    gradient: 'from-orange-500 to-yellow-400',
    icon: '🧭',
    skills: [
      { name: 'React Navigation', level: 92, icon: '🧭', category: 'navigation' },
      { name: 'Redux Toolkit', level: 85, icon: '🗃️', category: 'state' },
      { name: 'Zustand', level: 88, icon: '🐻', category: 'state' },
      { name: 'TanStack Query', level: 82, icon: '🔄', category: 'state' },
    ],
  },
  {
    id: 'native',
    title: 'Native & Platform',
    gradient: 'from-green-500 to-emerald-400',
    icon: '📱',
    skills: [
      { name: 'iOS (Swift)', level: 70, icon: '🍎', category: 'native' },
      { name: 'Android (Kotlin)', level: 65, icon: '🤖', category: 'native' },
      { name: 'Expo', level: 90, icon: '📱', category: 'platform' },
      { name: 'EAS Build', level: 85, icon: '🏗️', category: 'platform' },
    ],
  },
];

export const tools: Tool[] = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Xcode', icon: '🍎' },
  { name: 'Android Studio', icon: '🤖' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub Actions', icon: '⚙️' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Sentry', icon: '🐛' },
];

/**
 * Helper pour obtenir toutes les compétences à plat
 */
export const getAllSkills = () => skillCategories.flatMap((cat) => cat.skills);

/**
 * Helper pour obtenir le niveau moyen par catégorie
 */
export const getCategoryAverageLevel = (categoryId: string) => {
  const category = skillCategories.find((c) => c.id === categoryId);
  if (!category) return 0;
  const total = category.skills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / category.skills.length);
};
