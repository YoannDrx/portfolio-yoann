/**
 * Design System Tokens - Breakpoints & Device Configuration
 * Mobile-first responsive system targeting iOS devices
 */

// ============ BREAKPOINTS (Mobile-First) ============

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// ============ DEVICE CONFIGURATIONS ============

export const devices = {
  iPhoneSE: {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    safeAreaTop: 20,
    safeAreaBottom: 0,
    hasNotch: false,
    hasDynamicIsland: false,
    pixelRatio: 2,
  },
  iPhone12Mini: {
    name: 'iPhone 12 mini',
    width: 375,
    height: 812,
    safeAreaTop: 47,
    safeAreaBottom: 34,
    hasNotch: true,
    hasDynamicIsland: false,
    pixelRatio: 3,
  },
  iPhone14: {
    name: 'iPhone 14',
    width: 390,
    height: 844,
    safeAreaTop: 47,
    safeAreaBottom: 34,
    hasNotch: true,
    hasDynamicIsland: false,
    pixelRatio: 3,
  },
  iPhone14Pro: {
    name: 'iPhone 14 Pro',
    width: 393,
    height: 852,
    safeAreaTop: 59,
    safeAreaBottom: 34,
    hasNotch: false,
    hasDynamicIsland: true,
    pixelRatio: 3,
  },
  iPhone14ProMax: {
    name: 'iPhone 14 Pro Max',
    width: 430,
    height: 932,
    safeAreaTop: 59,
    safeAreaBottom: 34,
    hasNotch: false,
    hasDynamicIsland: true,
    pixelRatio: 3,
  },
  iPhone15Pro: {
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    safeAreaTop: 59,
    safeAreaBottom: 34,
    hasNotch: false,
    hasDynamicIsland: true,
    pixelRatio: 3,
  },
  iPadMini: {
    name: 'iPad mini',
    width: 744,
    height: 1133,
    safeAreaTop: 24,
    safeAreaBottom: 20,
    hasNotch: false,
    hasDynamicIsland: false,
    pixelRatio: 2,
  },
  iPadPro11: {
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    safeAreaTop: 24,
    safeAreaBottom: 20,
    hasNotch: false,
    hasDynamicIsland: false,
    pixelRatio: 2,
  },
} as const;

export type DeviceType = keyof typeof devices;
export type DeviceConfig = typeof devices[DeviceType];

// ============ SAFE AREAS ============

export const safeAreas = {
  top: {
    none: '0px',
    statusBar: '20px',      // iPhone SE, older devices
    notch: '47px',          // iPhone X - 14
    dynamicIsland: '59px',  // iPhone 14 Pro+
  },
  bottom: {
    none: '0px',
    homeIndicator: '34px',  // Devices with gesture navigation
    homeButton: '0px',      // iPhone SE, older devices
  },
} as const;

// ============ TOUCH TARGETS ============

export const touchTargets = {
  minimum: '44px',      // Apple HIG minimum
  comfortable: '48px',  // Recommended
  large: '56px',        // For important actions
} as const;

// ============ DEFAULT DEVICE ============

export const defaultDevice: DeviceType = 'iPhone14Pro';

// ============ CSS VARIABLES GENERATOR ============

export const generateBreakpointCSSVariables = (device: DeviceType = defaultDevice) => {
  const config = devices[device];
  return {
    '--device-width': `${config.width}px`,
    '--device-height': `${config.height}px`,
    '--safe-area-top': `${config.safeAreaTop}px`,
    '--safe-area-bottom': `${config.safeAreaBottom}px`,
    '--touch-target-min': touchTargets.minimum,
    '--touch-target-comfortable': touchTargets.comfortable,
    '--touch-target-large': touchTargets.large,
  };
};

// ============ MEDIA QUERY HELPERS ============

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  '3xl': `@media (min-width: ${breakpoints['3xl']})`,
  '4xl': `@media (min-width: ${breakpoints['4xl']})`,
  // Special queries
  mobile: `@media (max-width: ${breakpoints.xl})`,
  tablet: `@media (min-width: ${breakpoints.xl}) and (max-width: ${breakpoints['2xl']})`,
  desktop: `@media (min-width: ${breakpoints['2xl']})`,
  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  // Preferences
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  darkMode: '@media (prefers-color-scheme: dark)',
} as const;

// ============ TAILWIND SCREENS CONFIG ============

export const tailwindScreens = {
  xs: breakpoints.xs,
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  '2xl': breakpoints['2xl'],
  '3xl': breakpoints['3xl'],
  '4xl': breakpoints['4xl'],
} as const;
