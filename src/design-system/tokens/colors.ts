/**
 * Design System - Color Tokens
 * Palette complète iOS avec couleurs sémantiques
 */

import type { ColorScale, IOSSystemColors, Gradients } from '../types';

// ============ iOS SYSTEM COLORS ============

export const iosColors: IOSSystemColors = {
  // iOS Blue - Primary
  blue: '211 100% 50%', // #007AFF

  // iOS Semantic Colors
  green: '142 71% 45%',   // #34C759
  red: '0 84% 60%',       // #FF3B30
  orange: '32 100% 50%',  // #FF9500
  yellow: '45 100% 50%',  // #FFCC00
  teal: '199 78% 55%',    // #5AC8FA
  purple: '280 67% 60%',  // #AF52DE
  pink: '349 100% 59%',   // #FF2D55
  indigo: '240 60% 59%',  // #5856D6

  // iOS Gray Scale
  gray: {
    50: '0 0% 98%',
    100: '240 5% 96%',
    200: '240 6% 90%',
    300: '240 5% 84%',
    400: '240 4% 65%',
    500: '240 4% 46%',
    600: '240 4% 36%',
    700: '240 4% 26%',
    800: '240 4% 16%',
    900: '240 6% 10%',
    950: '240 10% 4%',
  },
};

// ============ PRIMARY COLOR SCALE ============

export const primaryScale: ColorScale = {
  50: '211 100% 97%',
  100: '211 100% 94%',
  200: '211 100% 86%',
  300: '211 100% 74%',
  400: '211 100% 62%',
  500: '211 100% 50%', // #007AFF - Default
  600: '211 100% 45%',
  700: '211 100% 38%',
  800: '211 100% 30%',
  900: '211 100% 22%',
  950: '211 100% 15%',
};

// ============ SEMANTIC COLORS ============

export const semanticColors = {
  success: iosColors.green,
  warning: iosColors.orange,
  error: iosColors.red,
  info: iosColors.teal,
} as const;

// ============ SYSTEM COLORS ============

export const systemColors = {
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 11%',
    card: '0 0% 100%',
    cardForeground: '0 0% 11%',
    muted: iosColors.gray[100],
    mutedForeground: iosColors.gray[500],
    border: iosColors.gray[200],
    input: iosColors.gray[200],
    ring: primaryScale[500],
  },
  dark: {
    background: '0 0% 0%',
    foreground: '0 0% 98%',
    card: '240 6% 10%',
    cardForeground: '0 0% 98%',
    muted: iosColors.gray[800],
    mutedForeground: iosColors.gray[400],
    border: iosColors.gray[800],
    input: iosColors.gray[800],
    ring: primaryScale[500],
  },
} as const;

// ============ GRADIENTS ============

export const gradients: Gradients = {
  primary: {
    from: 'hsl(211 100% 50%)',
    to: 'hsl(211 100% 40%)',
    direction: 'to-br',
  },
  success: {
    from: 'hsl(142 71% 45%)',
    to: 'hsl(142 71% 35%)',
    direction: 'to-br',
  },
  warning: {
    from: 'hsl(32 100% 50%)',
    to: 'hsl(32 100% 40%)',
    direction: 'to-br',
  },
  error: {
    from: 'hsl(0 84% 60%)',
    to: 'hsl(0 84% 50%)',
    direction: 'to-br',
  },
  glass: {
    light: {
      from: 'hsla(0 0% 100% / 0.8)',
      to: 'hsla(0 0% 100% / 0.6)',
      direction: 'to-br',
    },
    dark: {
      from: 'hsla(240 6% 10% / 0.9)',
      to: 'hsla(240 6% 10% / 0.7)',
      direction: 'to-br',
    },
  },
};

// ============ GRADIENT PRESETS (Tailwind classes) ============

export const gradientPresets = {
  // Project card gradients
  emeraldTeal: 'from-emerald-400 to-teal-500',
  violetPurple: 'from-violet-400 to-purple-500',
  skyBlue: 'from-sky-400 to-blue-500',
  roseOrange: 'from-rose-400 to-orange-500',
  orangePink: 'from-orange-400 to-pink-500',
  cyanBlue: 'from-cyan-400 to-blue-500',
  greenEmerald: 'from-green-400 to-emerald-500',

  // Skill category gradients
  blueCyan: 'from-blue-500 to-cyan-400',
  purplePink: 'from-purple-500 to-pink-400',
  orangeYellow: 'from-orange-500 to-yellow-400',
  greenEmeraldLight: 'from-green-500 to-emerald-400',
} as const;

// ============ CSS VARIABLES GENERATOR ============

export const generateColorCSSVariables = (mode: 'light' | 'dark') => {
  const colors = systemColors[mode];

  return {
    '--background': colors.background,
    '--foreground': colors.foreground,
    '--card': colors.card,
    '--card-foreground': colors.cardForeground,
    '--muted': colors.muted,
    '--muted-foreground': colors.mutedForeground,
    '--border': colors.border,
    '--input': colors.input,
    '--ring': colors.ring,
    '--primary': primaryScale[500],
    '--primary-foreground': '0 0% 100%',
    '--secondary': colors.muted,
    '--secondary-foreground': colors.foreground,
    '--destructive': semanticColors.error,
    '--destructive-foreground': '0 0% 100%',
    '--success': semanticColors.success,
    '--success-foreground': '0 0% 100%',
    '--warning': semanticColors.warning,
    '--warning-foreground': '0 0% 0%',
    '--error': semanticColors.error,
    '--error-foreground': '0 0% 100%',
    '--info': semanticColors.info,
    '--info-foreground': '0 0% 100%',
  };
};
