/**
 * Design System Tokens Types
 * Définit les interfaces pour tous les tokens de design
 */

// ============ COLORS ============

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Default
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  primary: ColorScale;
  secondary: ColorScale;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface SystemColors {
  background: { light: string; dark: string };
  foreground: { light: string; dark: string };
  card: { light: string; dark: string };
  muted: { light: string; dark: string };
  border: { light: string; dark: string };
}

export interface IOSSystemColors {
  blue: string;
  green: string;
  indigo: string;
  orange: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
  gray: ColorScale;
}

export interface GradientDefinition {
  from: string;
  to: string;
  direction?: 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl' | 'to-t' | 'to-tr';
}

export interface Gradients {
  primary: GradientDefinition;
  success: GradientDefinition;
  warning: GradientDefinition;
  error: GradientDefinition;
  glass: { light: GradientDefinition; dark: GradientDefinition };
}

// ============ TYPOGRAPHY ============

export type FontWeight = 300 | 400 | 500 | 600 | 700;

export interface TypographyStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: FontWeight;
  letterSpacing: string;
}

export interface TypographyScale {
  // Display
  displayLarge: TypographyStyle;
  displayMedium: TypographyStyle;
  displaySmall: TypographyStyle;

  // Headlines
  headlineLarge: TypographyStyle;
  headlineMedium: TypographyStyle;
  headlineSmall: TypographyStyle;

  // Body
  bodyLarge: TypographyStyle;
  bodyMedium: TypographyStyle;
  bodySmall: TypographyStyle;

  // Labels
  labelLarge: TypographyStyle;
  labelMedium: TypographyStyle;
  labelSmall: TypographyStyle;

  // Caption & Overline
  caption: TypographyStyle;
  overline: TypographyStyle;
}

// ============ SPACING ============

export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string; // 44px - iOS touch target
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
}

// ============ RADIUS ============

export interface RadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  full: string;
  // iOS specific
  card: string;
  button: string;
  input: string;
  badge: string;
  avatar: string;
}

// ============ SHADOWS ============

export interface ShadowDefinition {
  boxShadow: string;
}

export interface ShadowScale {
  none: string;
  soft: string;
  medium: string;
  elevated: string;
  device: string;
}

// ============ ANIMATIONS ============

export interface AnimationDuration {
  instant: string;
  fast: string;
  normal: string;
  slow: string;
  slower: string;
  slowest: string;
}

export interface AnimationEasing {
  linear: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  spring: string;
  iosDefault: string;
  bounce: string;
}

export interface AnimationPreset {
  duration: string;
  easing: string;
  keyframe?: string;
}

export interface AnimationPresets {
  fadeIn: AnimationPreset;
  fadeOut: AnimationPreset;
  slideUp: AnimationPreset;
  slideDown: AnimationPreset;
  slideLeft: AnimationPreset;
  slideRight: AnimationPreset;
  scaleIn: AnimationPreset;
  scaleOut: AnimationPreset;
  spring: AnimationPreset;
  bounce: AnimationPreset;
  pulse: AnimationPreset;
  spin: AnimationPreset;
}

// ============ COMPLETE DESIGN TOKENS ============

export interface DesignTokens {
  colors: {
    semantic: SemanticColors;
    system: SystemColors;
    ios: IOSSystemColors;
    gradients: Gradients;
  };
  typography: TypographyScale;
  spacing: SpacingScale;
  radius: RadiusScale;
  shadows: ShadowScale;
  animations: {
    duration: AnimationDuration;
    easing: AnimationEasing;
    presets: AnimationPresets;
  };
}
