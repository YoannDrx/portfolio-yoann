/**
 * Profile Data
 * Informations personnelles du portfolio
 */

import type { Profile, NavigationItem } from './types';

export const profile: Profile = {
  firstName: 'React',
  lastName: 'Native',
  initials: 'RN',
  title: 'Developer',
  subtitle: 'Mobile & Web',
  bio: "Créateur d'expériences mobiles natives. iOS & Android. Animations fluides. UX impeccable.",
  avatar: undefined,
  isAvailable: true,
  availabilityText: 'Disponible pour de nouveaux projets',
  availabilityOptions: ['Freelance', 'Mission longue', 'CDI'],
  stats: [
    { label: 'Années XP', value: '5+' },
    { label: 'Apps', value: '20+' },
    { label: 'Downloads', value: '1M+' },
  ],
};

export const navigationItems: NavigationItem[] = [
  {
    id: 'projects',
    label: 'Mes Projets',
    subtitle: 'Apps iOS & Android',
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
    id: 'contact',
    label: 'Me Contacter',
    subtitle: 'Discutons de votre projet',
    icon: '💬',
    gradient: 'from-green-400 to-emerald-500',
  },
];
