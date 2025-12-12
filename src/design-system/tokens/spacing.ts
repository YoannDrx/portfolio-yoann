/**
 * Design System - Spacing Tokens
 * Échelle d'espacement base 4px
 */

import type { SpacingScale } from '../types';

// ============ SPACING SCALE ============

export const spacing: SpacingScale = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px', // iOS minimum touch target
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
};

// ============ SEMANTIC SPACING ============

export const semanticSpacing = {
  // Component spacing
  buttonPaddingX: {
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
  },
  buttonPaddingY: {
    sm: spacing[2],   // 8px
    md: spacing[2.5], // 10px
    lg: spacing[3],   // 12px
  },

  // Card spacing
  cardPadding: {
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
  },

  // Input spacing
  inputPaddingX: {
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[5],   // 20px
  },
  inputPaddingY: {
    sm: spacing[2],   // 8px
    md: spacing[3],   // 12px
    lg: spacing[3.5], // 14px
  },

  // List item spacing
  listItemPaddingX: spacing[4], // 16px
  listItemPaddingY: spacing[3], // 12px
  listItemGap: spacing[3],      // 12px

  // Section spacing
  sectionGap: spacing[8],       // 32px
  componentGap: spacing[4],     // 16px
  elementGap: spacing[2],       // 8px

  // iOS specific
  safeAreaTop: spacing[11],     // 44px
  safeAreaBottom: spacing[8],   // 32px
  touchTarget: spacing[11],     // 44px - iOS minimum
} as const;

// ============ TAILWIND CLASSES MAPPING ============

export const spacingClasses = {
  // Gap utilities
  'gap-xs': 'gap-1',      // 4px
  'gap-sm': 'gap-2',      // 8px
  'gap-md': 'gap-4',      // 16px
  'gap-lg': 'gap-6',      // 24px
  'gap-xl': 'gap-8',      // 32px

  // Padding utilities
  'p-xs': 'p-1',          // 4px
  'p-sm': 'p-2',          // 8px
  'p-md': 'p-4',          // 16px
  'p-lg': 'p-6',          // 24px
  'p-xl': 'p-8',          // 32px

  // iOS touch target
  'touch-target': 'min-h-[44px] min-w-[44px]',
} as const;
