/**
 * Tema global do aplicativo Prodify
 * Centraliza cores, espaçamentos e padrões de estilização
 */

export const colors = {
  // Cores de fundo
  background: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceLight: '#252525',

  // Cores principais
  primary: '#22C55E',
  primaryLight: '#4ADE80',
  primaryDark: '#16A34A',

  // Cores de estado
  inactive: '#4A4A4A',
  
  // Cores de texto
  text: '#FFFFFF',
  textSecondary: '#8A8A8A',

  // Cores de feedback
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#60A5FA',

  // Cores de destaque
  accent: {
    purple: '#A78BFA',
    blue: '#60A5FA',
    yellow: '#FBBF24',
    green: '#4ADE80',
  },

  // Cores com transparência (para backgrounds de ícones)
  transparent: {
    primary: 'rgba(34, 197, 94, 0.15)',
    success: 'rgba(74, 222, 128, 0.15)',
    warning: 'rgba(251, 191, 36, 0.15)',
    error: 'rgba(239, 68, 68, 0.15)',
    errorLight: 'rgba(255, 77, 77, 0.1)',
    info: 'rgba(96, 165, 250, 0.15)',
    purple: 'rgba(167, 139, 250, 0.15)',
    white: 'rgba(255, 255, 255, 0.8)',
    whiteMedium: 'rgba(255, 255, 255, 0.6)',
    whiteLow: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 28,
  display: 32,
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Tema completo exportado
export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
