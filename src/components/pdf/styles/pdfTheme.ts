/**
 * PDF Theme
 * Couleurs et styles iOS adaptés pour @react-pdf/renderer
 */

export const pdfColors = {
  // Couleurs iOS primaires
  iosBlue: "#0A84FF",
  iosGreen: "#30D158",
  iosPurple: "#BF5AF2",
  iosOrange: "#FF9500",
  iosPink: "#FF375F",
  iosTeal: "#64D2FF",
  iosIndigo: "#5E5CE6",

  // Badges par type d'emploi
  badge: {
    cdi: { bg: "#DCFCE7", text: "#16A34A" },
    freelance: { bg: "#DBEAFE", text: "#2563EB" },
    independant: { bg: "#F3E8FF", text: "#9333EA" },
    cdd: { bg: "#FFF7ED", text: "#EA580C" },
    intermittent: { bg: "#FCE7F3", text: "#DB2777" },
    ponctuel: { bg: "#DBEAFE", text: "#2563EB" },
    hors_tech: { bg: "#F3E8FF", text: "#7C3AED" },
    cinema: { bg: "#FEF3C7", text: "#D97706" },
    ops: { bg: "#D1FAE5", text: "#059669" },
  },

  // Niveaux de compétence
  level: {
    expert: "#0A84FF",
    avance: "#5E5CE6",
    confirme: "#30D158",
    intermediaire: "#FF9500",
  },

  // Texte
  text: {
    primary: "#1C1C1E",
    secondary: "#8E8E93",
    muted: "#AEAEB2",
    white: "#FFFFFF",
  },

  // Fond (simuler glassmorphism)
  glass: {
    background: "#F2F2F7",
    card: "#FFFFFF",
    border: "#E5E5EA",
    sidebar: "#F8F8FA",
  },

  // Dark sidebar split theme
  sidebar: {
    bg: "#0F172A", // slate-900
    text: "#F8FAFC", // slate-50
    muted: "#94A3B8", // slate-400
    accent: "#60A5FA", // blue-400
    divider: "#1E293B", // slate-800
    accentLine: "#3B82F6", // blue-500
  },
  experience: {
    cdi: "#10B981", // emerald-500
    freelance: "#3B82F6", // blue-500
    ponctuel: "#3B82F6", // blue-500 (same as freelance)
    hors_tech: "#8B5CF6", // violet-500
    cinema: "#D97706", // amber-600
    ops: "#059669", // emerald-600
  },
};

export const pdfFontSizes = {
  xs: 7,
  sm: 8,
  base: 9,
  md: 10,
  lg: 12,
  xl: 14,
  "2xl": 18,
  "3xl": 22,
};

export const pdfSpacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
};
