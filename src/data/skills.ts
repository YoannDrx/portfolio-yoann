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
      { name: 'React Native', level: 90, icon: '⚛️', category: 'core' },
      { name: 'React.js', level: 90, icon: '⚛️', category: 'core' },
      { name: 'Next.js', level: 85, icon: '▲', category: 'core' },
      { name: 'TypeScript', level: 80, icon: '📘', category: 'core' },
      { name: 'JavaScript', level: 90, icon: '🟨', category: 'core' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    gradient: 'from-green-500 to-emerald-400',
    icon: '📱',
    skills: [
      { name: 'Expo', level: 85, icon: '📱', category: 'mobile' },
      { name: 'iOS / Xcode', level: 70, icon: '🍎', category: 'mobile' },
      { name: 'Android Studio', level: 70, icon: '🤖', category: 'mobile' },
      { name: 'Redux Toolkit', level: 80, icon: '🗃️', category: 'mobile' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    gradient: 'from-purple-500 to-pink-400',
    icon: '🔧',
    skills: [
      { name: 'Node.js', level: 70, icon: '🟢', category: 'backend' },
      { name: 'Express.js', level: 70, icon: '🚀', category: 'backend' },
      { name: 'Firebase', level: 70, icon: '🔥', category: 'backend' },
      { name: 'MongoDB', level: 65, icon: '🍃', category: 'backend' },
    ],
  },
  {
    id: 'styling',
    title: 'Styling',
    gradient: 'from-orange-500 to-yellow-400',
    icon: '🎨',
    skills: [
      { name: 'Tailwind CSS', level: 85, icon: '💨', category: 'styling' },
      { name: 'Bootstrap', level: 80, icon: '🅱️', category: 'styling' },
      { name: 'Styled Components', level: 80, icon: '💅', category: 'styling' },
      { name: 'CSS / HTML', level: 90, icon: '🎨', category: 'styling' },
    ],
  },
];

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
