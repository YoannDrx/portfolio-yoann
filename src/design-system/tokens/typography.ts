/**
 * Design System - Typography Tokens
 * Échelle typographique style SF Pro (iOS)
 */

import type { TypographyScale, TypographyStyle } from '../types';

// ============ TYPOGRAPHY SCALE ============

export const typography: TypographyScale = {
  // Display - Grands titres
  displayLarge: {
    fontSize: '2.125rem', // 34px - iOS Large Title
    lineHeight: '1.2',
    fontWeight: 700,
    letterSpacing: '-0.03em',
  },
  displayMedium: {
    fontSize: '1.75rem', // 28px
    lineHeight: '1.25',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  displaySmall: {
    fontSize: '1.375rem', // 22px
    lineHeight: '1.3',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },

  // Headlines
  headlineLarge: {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  headlineMedium: {
    fontSize: '1.0625rem', // 17px - iOS Body Large
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  headlineSmall: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0',
  },

  // Body
  bodyLarge: {
    fontSize: '1.0625rem', // 17px
    lineHeight: '1.5',
    fontWeight: 400,
    letterSpacing: '0',
  },
  bodyMedium: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.5',
    fontWeight: 400,
    letterSpacing: '0',
  },
  bodySmall: {
    fontSize: '0.8125rem', // 13px
    lineHeight: '1.5',
    fontWeight: 400,
    letterSpacing: '0',
  },

  // Labels - Semibold variants
  labelLarge: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0',
  },
  labelMedium: {
    fontSize: '0.8125rem', // 13px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0',
  },
  labelSmall: {
    fontSize: '0.6875rem', // 11px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0',
  },

  // Caption & Overline
  caption: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.4',
    fontWeight: 400,
    letterSpacing: '0',
  },
  overline: {
    fontSize: '0.625rem', // 10px
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '0.08em',
  },
};

// ============ FONT FAMILY ============

export const fontFamily = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'SF Pro Display',
    'SF Pro Text',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  mono: [
    'SF Mono',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
} as const;

// ============ TAILWIND CLASSES MAPPING ============

export const typographyClasses = {
  displayLarge: 'text-[2.125rem] leading-[1.2] font-bold tracking-[-0.03em]',
  displayMedium: 'text-[1.75rem] leading-[1.25] font-bold tracking-[-0.02em]',
  displaySmall: 'text-[1.375rem] leading-[1.3] font-bold tracking-[-0.02em]',

  headlineLarge: 'text-[1.25rem] leading-[1.4] font-semibold tracking-[-0.01em]',
  headlineMedium: 'text-[1.0625rem] leading-[1.4] font-semibold tracking-[-0.01em]',
  headlineSmall: 'text-[0.9375rem] leading-[1.4] font-semibold',

  bodyLarge: 'text-[1.0625rem] leading-[1.5] font-normal',
  bodyMedium: 'text-[0.9375rem] leading-[1.5] font-normal',
  bodySmall: 'text-[0.8125rem] leading-[1.5] font-normal',

  labelLarge: 'text-[0.9375rem] leading-[1.4] font-semibold',
  labelMedium: 'text-[0.8125rem] leading-[1.4] font-semibold',
  labelSmall: 'text-[0.6875rem] leading-[1.4] font-semibold',

  caption: 'text-xs leading-[1.4] font-normal',
  overline: 'text-[0.625rem] leading-[1.4] font-semibold tracking-[0.08em] uppercase',
} as const;

// ============ HELPER FUNCTION ============

export const getTypographyStyle = (variant: keyof TypographyScale): TypographyStyle => {
  return typography[variant];
};
