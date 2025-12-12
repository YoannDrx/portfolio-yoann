/**
 * PDF Theme
 * Couleurs et styles iOS adaptés pour @react-pdf/renderer
 */

export const pdfColors = {
  // Couleurs iOS primaires
  iosBlue: '#0A84FF',
  iosGreen: '#30D158',
  iosPurple: '#BF5AF2',
  iosOrange: '#FF9500',
  iosPink: '#FF375F',
  iosTeal: '#64D2FF',
  iosIndigo: '#5E5CE6',

  // Badges par type d'emploi
  badge: {
    cdi: { bg: '#DCFCE7', text: '#16A34A' },
    freelance: { bg: '#DBEAFE', text: '#2563EB' },
    independant: { bg: '#F3E8FF', text: '#9333EA' },
    cdd: { bg: '#FFF7ED', text: '#EA580C' },
    intermittent: { bg: '#FCE7F3', text: '#DB2777' },
  },

  // Niveaux de compétence
  level: {
    expert: '#0A84FF',
    avance: '#5E5CE6',
    confirme: '#30D158',
    intermediaire: '#FF9500',
  },

  // Texte
  text: {
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    muted: '#AEAEB2',
    white: '#FFFFFF',
  },

  // Fond (simuler glassmorphism)
  glass: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    border: '#E5E5EA',
    sidebar: '#F8F8FA',
  },
};

export const pdfFontSizes = {
  xs: 7,
  sm: 8,
  base: 9,
  md: 10,
  lg: 12,
  xl: 14,
  '2xl': 18,
  '3xl': 22,
};

export const pdfSpacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
};
