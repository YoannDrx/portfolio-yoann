/**
 * Design System - Shadow Tokens
 * Ombres style iOS avec plusieurs niveaux d'élévation
 */

import type { ShadowScale } from '../types';

// ============ SHADOW SCALE ============

export const shadows: ShadowScale = {
  none: 'none',

  // Subtle elevation - cards au repos
  soft: '0 8px 32px -8px rgba(0, 0, 0, 0.15)',

  // Medium elevation - cards hover, popups
  medium: '0 16px 48px -12px rgba(0, 0, 0, 0.25)',

  // High elevation - modals, tooltips
  elevated: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',

  // Device frame shadow
  device: '0 50px 100px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.4), inset 0 -1px 0 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
};

// ============ COMPONENT SHADOWS ============

export const componentShadows = {
  // Cards
  card: {
    default: shadows.soft,
    hover: shadows.medium,
    active: shadows.soft,
  },

  // Buttons
  button: {
    primary: '0 4px 14px -4px rgba(0, 122, 255, 0.4)',
    hover: '0 6px 20px -4px rgba(0, 122, 255, 0.5)',
    active: '0 2px 8px -2px rgba(0, 122, 255, 0.4)',
  },

  // Inputs
  input: {
    focus: '0 0 0 4px rgba(0, 122, 255, 0.15)',
    error: '0 0 0 4px rgba(255, 59, 48, 0.15)',
    success: '0 0 0 4px rgba(52, 199, 89, 0.15)',
  },

  // Modals
  modal: shadows.elevated,

  // Tab bar
  tabBar: '0 -8px 32px -8px rgba(0, 0, 0, 0.1)',

  // Status bar
  statusBar: 'none',

  // Toast
  toast: shadows.medium,
} as const;

// ============ DARK MODE SHADOWS ============

export const darkShadows: ShadowScale = {
  none: 'none',
  soft: '0 8px 32px -8px rgba(0, 0, 0, 0.4)',
  medium: '0 16px 48px -12px rgba(0, 0, 0, 0.5)',
  elevated: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  device: '0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 30px 60px -30px rgba(0, 0, 0, 0.6), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
};

// ============ TAILWIND CLASSES MAPPING ============

export const shadowClasses = {
  none: 'shadow-none',
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  elevated: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]',
  device: 'shadow-device',
} as const;

// ============ CSS VARIABLES ============

export const shadowCSSVariables = {
  '--shadow-soft': shadows.soft,
  '--shadow-medium': shadows.medium,
  '--shadow-elevated': shadows.elevated,
  '--shadow-device': shadows.device,
} as const;
