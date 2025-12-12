/**
 * Design System - Interaction Primitives
 * Classes CSS pour les interactions iOS-like
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ============ BASE INTERACTION CLASSES ============

export const iosInteractions = {
  /** Effet hover - légère augmentation de luminosité */
  hover: 'hover:brightness-105 transition-all duration-150',

  /** Effet press/active - scale down */
  press: 'active:scale-[0.98] active:brightness-95 transition-transform duration-100',

  /** Focus ring style iOS */
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',

  /** État disabled */
  disabled: 'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',

  /** Combinaison pour éléments cliquables */
  clickable: 'hover:brightness-105 active:scale-[0.98] active:brightness-95 transition-all duration-150 cursor-pointer',

  /** Touch target iOS minimum (44px) */
  touchTarget: 'min-h-[44px] min-w-[44px]',

  /** État de sélection */
  selected: 'ring-2 ring-primary',

  /** État loading */
  loading: 'pointer-events-none opacity-70',
} as const;

// ============ COMBINED INTERACTION CLASSES ============

/** Classes complètes pour un élément interactif */
export const interactiveClasses = [
  iosInteractions.hover,
  iosInteractions.press,
  iosInteractions.focus,
  iosInteractions.disabled,
  'cursor-pointer',
].join(' ');

/** Classes pour un bouton accessible */
export const buttonBaseClasses = [
  'inline-flex items-center justify-center',
  'font-semibold whitespace-nowrap select-none',
  iosInteractions.press,
  iosInteractions.focus,
  iosInteractions.disabled,
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
].join(' ');

/** Classes pour une carte interactive */
export const cardInteractiveClasses = [
  'cursor-pointer',
  'transition-all duration-200',
  'hover:brightness-105 hover:shadow-medium',
  'active:scale-[0.98] active:brightness-95',
].join(' ');

/** Classes pour un list item */
export const listItemClasses = [
  'flex items-center gap-3',
  'transition-colors duration-150',
  'active:bg-muted',
].join(' ');

// ============ CVA BUTTON INTERACTIONS ============

export const buttonInteractions = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold whitespace-nowrap select-none',
    'transition-all duration-150',
    'active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg [&_svg]:size-4',
        md: 'h-11 px-4 text-base rounded-xl min-h-[44px] [&_svg]:size-5',
        lg: 'h-14 px-6 text-lg rounded-xl [&_svg]:size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ButtonInteractionsProps = VariantProps<typeof buttonInteractions>;

// ============ CVA CARD INTERACTIONS ============

export const cardInteractions = cva(
  [
    'rounded-2xl',
    'transition-all duration-200',
  ],
  {
    variants: {
      interactive: {
        true: [
          'cursor-pointer',
          'hover:brightness-105',
          'hover:shadow-medium',
          'active:scale-[0.98]',
          'active:brightness-95',
        ],
        false: '',
      },
      elevated: {
        true: 'shadow-soft',
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
      elevated: false,
    },
  }
);

export type CardInteractionsProps = VariantProps<typeof cardInteractions>;

// ============ CVA INPUT INTERACTIONS ============

export const inputInteractions = cva(
  [
    'w-full',
    'transition-all duration-150',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      state: {
        default: 'border-input focus-visible:ring-primary focus-visible:border-primary',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
        disabled: 'bg-muted border-muted cursor-not-allowed',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg',
        md: 'h-11 px-4 text-base rounded-xl',
        lg: 'h-14 px-5 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  }
);

export type InputInteractionsProps = VariantProps<typeof inputInteractions>;

// ============ HELPER FUNCTIONS ============

/**
 * Combine les classes d'interaction de base
 */
export const getInteractiveClasses = (options?: {
  hover?: boolean;
  press?: boolean;
  focus?: boolean;
  disabled?: boolean;
  touchTarget?: boolean;
}) => {
  const {
    hover = true,
    press = true,
    focus = true,
    disabled = true,
    touchTarget = false,
  } = options ?? {};

  const classes: string[] = ['cursor-pointer'];

  if (hover) classes.push(iosInteractions.hover);
  if (press) classes.push(iosInteractions.press);
  if (focus) classes.push(iosInteractions.focus);
  if (disabled) classes.push(iosInteractions.disabled);
  if (touchTarget) classes.push(iosInteractions.touchTarget);

  return classes.join(' ');
};

/**
 * Classes de transition prédéfinies
 */
export const transitions = {
  fast: 'transition-all duration-100',
  normal: 'transition-all duration-150',
  slow: 'transition-all duration-200',
  colors: 'transition-colors duration-150',
  transform: 'transition-transform duration-150',
  opacity: 'transition-opacity duration-150',
} as const;
