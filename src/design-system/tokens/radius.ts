/**
 * Design System - Border Radius Tokens
 * Rayons de bordure style iOS
 */

import type { RadiusScale } from '../types';

// ============ RADIUS SCALE ============

export const radius: RadiusScale = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',      // iOS default for cards
  '2xl': '20px',
  '3xl': '24px',
  '4xl': '32px',
  full: '9999px',

  // iOS specific components
  card: '16px',
  button: '12px',
  input: '12px',
  badge: '9999px',
  avatar: '9999px',
};

// ============ COMPONENT RADIUS MAPPING ============

export const componentRadius = {
  // Buttons
  button: {
    sm: radius.md,      // 8px
    md: radius.lg,      // 12px
    lg: radius.xl,      // 16px
  },

  // Cards
  card: {
    sm: radius.lg,      // 12px
    md: radius.xl,      // 16px
    lg: radius['2xl'],  // 20px
    full: radius['4xl'], // 32px
  },

  // Inputs
  input: {
    sm: radius.md,      // 8px
    md: radius.lg,      // 12px
    lg: radius.xl,      // 16px
  },

  // Badges
  badge: radius.full,   // pill shape

  // Avatars
  avatar: radius.full,  // circle

  // Icons containers
  iconContainer: {
    sm: radius.md,      // 8px
    md: radius.lg,      // 12px
    lg: radius.xl,      // 16px
  },

  // Modals / Sheets
  modal: radius['3xl'], // 24px
  sheet: radius['3xl'], // 24px

  // Tab bar
  tabBar: radius['3xl'], // 24px
} as const;

// ============ TAILWIND CLASSES MAPPING ============

export const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-[20px]',
  '3xl': 'rounded-3xl',
  '4xl': 'rounded-[32px]',
  full: 'rounded-full',
} as const;
