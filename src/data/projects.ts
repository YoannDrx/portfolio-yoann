/**
 * Projects Data
 * Liste des projets du portfolio
 */

import type { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    name: 'FinTrack Pro',
    description: 'Application de gestion financière personnelle avec synchronisation bancaire',
    category: 'Finance',
    platforms: ['ios', 'android'],
    gradient: 'from-emerald-400 to-teal-500',
    emoji: '💰',
    stats: { rating: 4.8, downloads: '500K+' },
    features: ['Reanimated 3', 'Skia Charts', 'Biometric Auth'],
    links: {
      appStore: 'https://apps.apple.com',
      playStore: 'https://play.google.com',
    },
  },
  {
    id: '2',
    name: 'FitPulse',
    description: "Coach sportif personnel avec suivi d'activité et plans d'entraînement",
    category: 'Santé & Fitness',
    platforms: ['ios', 'android'],
    gradient: 'from-orange-400 to-red-500',
    emoji: '🏋️',
    stats: { rating: 4.9, downloads: '200K+' },
    features: ['HealthKit', 'Google Fit', 'Animations fluides'],
    links: {
      appStore: 'https://apps.apple.com',
      playStore: 'https://play.google.com',
    },
  },
  {
    id: '3',
    name: 'TravelMate',
    description: 'Planificateur de voyages avec cartes offline et recommandations IA',
    category: 'Voyage',
    platforms: ['ios', 'android'],
    gradient: 'from-blue-400 to-indigo-500',
    emoji: '✈️',
    stats: { rating: 4.7, downloads: '150K+' },
    features: ['Maps SDK', 'Offline Mode', 'ML Kit'],
    links: {
      appStore: 'https://apps.apple.com',
      playStore: 'https://play.google.com',
    },
  },
  {
    id: '4',
    name: 'MindfulMe',
    description: 'Application de méditation et bien-être mental avec séances guidées',
    category: 'Bien-être',
    platforms: ['ios'],
    gradient: 'from-purple-400 to-pink-500',
    emoji: '🧘',
    stats: { rating: 4.9, downloads: '300K+' },
    features: ['Audio Player', 'Notifications', 'Widgets'],
    links: {
      appStore: 'https://apps.apple.com',
    },
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
