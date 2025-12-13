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
  bio: "Développeur Frontend React passionné par l'UI/UX et le sens du détail. Mon parcours atypique, enrichi par plusieurs années de management, m'a appris à allier rigueur technique, empathie et efficacité. J'aide les entrepreneurs à transformer leurs idées en applications solides, utiles et centrées sur l'expérience utilisateur.",
  avatar: '/images/avatar.jpg',
  isAvailable: true,
  availabilityText: 'Disponible immédiatement',
  availabilityOptions: ['CDI', 'Freelance', 'Mission longue'],
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
