/**
 * Design System - Animation Tokens
 * Animations et transitions style iOS
 */

import type { AnimationDuration, AnimationEasing, AnimationPresets } from '../types';

// ============ DURATION SCALE ============

export const duration: AnimationDuration = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
};

// ============ EASING FUNCTIONS ============

export const easing: AnimationEasing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // iOS specific easings
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  iosDefault: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// ============ ANIMATION PRESETS ============

export const presets: AnimationPresets = {
  fadeIn: {
    duration: duration.normal,
    easing: easing.easeOut,
    keyframe: 'fadeIn',
  },
  fadeOut: {
    duration: duration.normal,
    easing: easing.easeIn,
    keyframe: 'fadeOut',
  },
  slideUp: {
    duration: duration.slow,
    easing: easing.iosDefault,
    keyframe: 'slideUp',
  },
  slideDown: {
    duration: duration.slow,
    easing: easing.iosDefault,
    keyframe: 'slideDown',
  },
  slideLeft: {
    duration: duration.slow,
    easing: easing.iosDefault,
    keyframe: 'slideLeft',
  },
  slideRight: {
    duration: duration.slow,
    easing: easing.iosDefault,
    keyframe: 'slideRight',
  },
  scaleIn: {
    duration: duration.normal,
    easing: easing.spring,
    keyframe: 'scaleIn',
  },
  scaleOut: {
    duration: duration.fast,
    easing: easing.easeIn,
    keyframe: 'scaleOut',
  },
  spring: {
    duration: duration.slowest,
    easing: easing.spring,
    keyframe: 'spring',
  },
  bounce: {
    duration: duration.slower,
    easing: easing.bounce,
    keyframe: 'bounce',
  },
  pulse: {
    duration: '2000ms',
    easing: easing.easeInOut,
    keyframe: 'pulse',
  },
  spin: {
    duration: '1000ms',
    easing: easing.linear,
    keyframe: 'spin',
  },
};

// ============ KEYFRAMES DEFINITIONS ============

export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideUp: {
    from: { transform: 'translateY(100%)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    from: { transform: 'translateY(-100%)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideLeft: {
    from: { transform: 'translateX(100%)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  slideRight: {
    from: { transform: 'translateX(-100%)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.9)', opacity: '0' },
  },
  spring: {
    '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
    '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.7' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  // iOS specific
  iosSpring: {
    '0%': { transform: 'scale(0.9) translateY(20px)', opacity: '0' },
    '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
  },
  iosPush: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  iosSlideUp: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  pulseSoft: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.7' },
  },
} as const;

// ============ STAGGER DELAYS ============

export const staggerDelays = {
  1: '0.05s',
  2: '0.1s',
  3: '0.15s',
  4: '0.2s',
  5: '0.25s',
  6: '0.3s',
  7: '0.35s',
  8: '0.4s',
} as const;

// ============ TAILWIND ANIMATION CLASSES ============

export const animationClasses = {
  fadeIn: 'animate-[fadeIn_0.2s_ease-out]',
  fadeOut: 'animate-[fadeOut_0.2s_ease-in]',
  slideUp: 'animate-[slideUp_0.3s_ease-out]',
  slideDown: 'animate-[slideDown_0.3s_ease-out]',
  spring: 'animate-ios-spring',
  push: 'animate-ios-push',
  pulse: 'animate-pulse-soft',
  spin: 'animate-spin',
  float: 'animate-float',
} as const;

// ============ CSS VARIABLES ============

export const animationCSSVariables = {
  '--duration-instant': duration.instant,
  '--duration-fast': duration.fast,
  '--duration-normal': duration.normal,
  '--duration-slow': duration.slow,
  '--duration-slower': duration.slower,
  '--duration-slowest': duration.slowest,
  '--ease-spring': easing.spring,
  '--ease-ios': easing.iosDefault,
  '--ease-bounce': easing.bounce,
} as const;
