/**
 * Profile Data
 * Informations personnelles du portfolio
 */

import type { Profile, NavigationItem } from './types';
import type { Locale } from '@/i18n/locales';

const profiles: Record<Locale, Profile> = {
  fr: {
    firstName: 'Yoann',
    lastName: 'Andrieux',
    initials: 'YA',
    title: 'Dev React Native',
    subtitle: 'Paris, France',
    bio: "Développeur Frontend React passionné par l'UI/UX et le sens du détail. Mon parcours atypique, enrichi par plusieurs années de management, m'a appris à allier rigueur technique, empathie et efficacité. Passionné par l'IA, j'accompagne les équipes dans l'adoption des outils et bonnes pratiques pour booster leur productivité. J'aide les entrepreneurs à transformer leurs idées en applications solides, utiles et centrées sur l'expérience utilisateur.",
    avatar: '/images/avatar.jpg',
    isAvailable: true,
    availabilityText: 'Disponible immédiatement',
    availabilityOptions: ['CDI', 'Freelance', 'Mission longue'],
    stats: [
      { label: 'Années XP', value: '4+' },
      { label: 'Projets', value: '15+' },
      { label: 'Clients', value: '10+' },
    ],
  },
  en: {
    firstName: 'Yoann',
    lastName: 'Andrieux',
    initials: 'YA',
    title: 'React Native Developer',
    subtitle: 'Paris, France',
    bio: "Frontend and mobile developer passionate about UI/UX and attention to detail. My atypical background—shaped by several years in management—taught me to combine technical rigor, empathy, and efficiency. AI enthusiast, I help teams adopt the right tools and best practices to boost their productivity. I help founders turn ideas into solid, useful products centered around the user experience.",
    avatar: '/images/avatar.jpg',
    isAvailable: true,
    availabilityText: 'Available now',
    availabilityOptions: ['Full-time', 'Freelance', 'Long-term'],
    stats: [
      { label: 'Years XP', value: '4+' },
      { label: 'Projects', value: '15+' },
      { label: 'Clients', value: '10+' },
    ],
  },
};

export const profile: Profile = profiles.fr;

export function getProfile(locale: Locale): Profile {
  return profiles[locale] ?? profiles.fr;
}

const navigationItemsByLocale: Record<Locale, NavigationItem[]> = {
  fr: [
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
  ],
  en: [
    {
      id: 'projects',
      label: 'Projects',
      subtitle: 'Web & Mobile',
      icon: '📱',
      gradient: 'from-orange-400 to-pink-500',
    },
    {
      id: 'skills',
      label: 'Skills',
      subtitle: 'Stack & Expertise',
      icon: '⚡',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      id: 'resume',
      label: 'Resume',
      subtitle: 'Experience & Education',
      icon: '📄',
      gradient: 'from-purple-400 to-violet-500',
    },
    {
      id: 'contact',
      label: 'Contact',
      subtitle: "Let's talk about your project",
      icon: '💬',
      gradient: 'from-green-400 to-emerald-500',
    },
  ],
};

export const navigationItems: NavigationItem[] = navigationItemsByLocale.fr;

export function getNavigationItems(locale: Locale): NavigationItem[] {
  return navigationItemsByLocale[locale] ?? navigationItemsByLocale.fr;
}
