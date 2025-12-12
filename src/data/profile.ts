/**
 * Profile Data
 * Informations personnelles du portfolio
 */

import type { Profile, NavigationItem } from './types';

export const profile: Profile = {
  firstName: 'Yoann',
  lastName: 'Andrieux',
  initials: 'YA',
  title: 'Dev React Native',
  subtitle: 'Paris, France',
  bio: "Développeur Frontend React passionné. Après une expérience stimulante en start-up, j'ai fait de ma passion pour le code mon métier. Mobile & Web, je transforme vos idées en applications.",
  avatar: '/images/avatar.jpg',
  isAvailable: true,
  availabilityText: 'Disponible pour de nouveaux projets',
  availabilityOptions: ['Freelance', 'Mission longue', 'CDI'],
  stats: [
    { label: 'Années XP', value: '3+' },
    { label: 'Projets', value: '15+' },
    { label: 'Clients', value: '10+' },
  ],
};

export const navigationItems: NavigationItem[] = [
  {
    id: 'projects',
    label: 'Mes Projets',
    subtitle: 'Web & Mobile',
    icon: '📱',
    gradient: 'from-orange-400 to-pink-500',
  },
  {
    id: 'skills',
    label: 'Compétences',
    subtitle: 'Stack & Expertise',
    icon: '⚡',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'resume',
    label: 'CV',
    subtitle: 'Parcours & Formation',
    icon: '📄',
    gradient: 'from-purple-400 to-violet-500',
  },
  {
    id: 'contact',
    label: 'Me Contacter',
    subtitle: 'Discutons de votre projet',
    icon: '💬',
    gradient: 'from-green-400 to-emerald-500',
  },
];
