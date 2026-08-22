/**
 * Design System Components Types
 * Définit les interfaces pour tous les props des composants iOS
 */

import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, TextareaHTMLAttributes } from 'react';

// ============ COMMON TYPES ============

export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type SemanticVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type CardVariant = 'elevated' | 'flat' | 'glass' | 'subtle';

// ============ IOS BUTTON ============

export interface IOSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style variant du bouton */
  variant?: ButtonVariant;
  /** Taille du bouton */
  size?: Size;
  /** Affiche un spinner de chargement */
  isLoading?: boolean;
  /** Icône à gauche du texte */
  leftIcon?: ReactNode;
  /** Icône à droite du texte */
  rightIcon?: ReactNode;
  /** Prend toute la largeur disponible */
  fullWidth?: boolean;
  /** Permet de render un composant enfant comme bouton */
  asChild?: boolean;
}

// ============ IOS CARD ============

export interface IOSCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Style variant de la carte */
  variant?: CardVariant;
  /** Padding interne */
  padding?: Size | 'none';
  /** Rayon des bordures */
  rounded?: Size | 'none' | 'full';
  /** Active les interactions hover/press */
  interactive?: boolean;
  /** Contenu du header */
  header?: ReactNode;
  /** Contenu du footer */
  footer?: ReactNode;
  /** Callback au clic (rend la carte interactive) */
  onPress?: () => void;
}

// ============ IOS INPUT ============

export type InputState = 'default' | 'error' | 'success' | 'disabled';

export interface IOSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** État visuel de l'input */
  state?: InputState;
  /** Taille de l'input */
  size?: Size;
  /** Icône à gauche */
  leftIcon?: ReactNode;
  /** Icône à droite */
  rightIcon?: ReactNode;
  /** Label au-dessus de l'input */
  label?: string;
  /** Texte d'aide sous l'input */
  helperText?: string;
  /** Message d'erreur (override helperText si state=error) */
  errorText?: string;
}

// ============ IOS TEXTAREA ============

export interface IOSTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** État visuel */
  state?: InputState;
  /** Nombre de lignes visibles */
  rows?: number;
  /** Label au-dessus */
  label?: string;
  /** Texte d'aide */
  helperText?: string;
  /** Message d'erreur */
  errorText?: string;
}

// ============ IOS BADGE ============

export interface IOSBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Variant sémantique */
  variant?: SemanticVariant;
  /** Taille du badge */
  size?: Size;
  /** Affiche uniquement un point coloré */
  dot?: boolean;
  /** Affiche un bouton de suppression */
  removable?: boolean;
  /** Callback de suppression */
  onRemove?: () => void;
}

// ============ IOS LIST ITEM ============

export interface IOSListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Titre principal */
  title: string;
  /** Sous-titre optionnel */
  subtitle?: string;
  /** Icône ou emoji à gauche */
  leftIcon?: ReactNode;
  /** Image à gauche (prioritaire sur leftIcon) */
  leftImage?: string;
  /** Texte à droite (avant le chevron) */
  rightText?: string;
  /** Icône à droite (remplace le chevron) */
  rightIcon?: ReactNode;
  /** Affiche le chevron de navigation */
  showChevron?: boolean;
  /** Style destructif (rouge) */
  destructive?: boolean;
  /** État désactivé */
  disabled?: boolean;
  /** Callback au clic */
  onPress?: () => void;
}

// ============ IOS AVATAR ============

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface IOSAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** URL de l'image */
  src?: string;
  /** Texte alternatif */
  alt?: string;
  /** Initiales affichées si pas d'image */
  initials?: string;
  /** Taille de l'avatar */
  size?: ExtendedSize;
  /** Indicateur de statut */
  status?: AvatarStatus;
  /** Icône de statut personnalisée */
  statusIcon?: ReactNode;
}

// ============ IOS PROGRESS BAR ============

export type ProgressVariant = 'default' | 'gradient' | 'striped';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error';

export interface IOSProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Valeur actuelle (0-100) */
  value: number;
  /** Valeur maximum */
  max?: number;
  /** Taille de la barre */
  size?: Size;
  /** Style de la barre */
  variant?: ProgressVariant;
  /** Couleur de la barre */
  color?: ProgressColor;
  /** Affiche la valeur en pourcentage */
  showValue?: boolean;
  /** Animation de remplissage */
  animated?: boolean;
  /** Gradient personnalisé (pour variant=gradient) */
  gradientFrom?: string;
  /** Gradient personnalisé (pour variant=gradient) */
  gradientTo?: string;
}

// ============ IOS NAVIGATION BAR ============

export type NavBarTitleSize = 'large' | 'small' | 'inline';

export interface IOSNavigationBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Titre de la page */
  title: string;
  /** Taille du titre */
  titleSize?: NavBarTitleSize;
  /** Sous-titre optionnel */
  subtitle?: string;
  /** Action à gauche (retour, menu, etc.) */
  leftAction?: ReactNode;
  /** Action à droite */
  rightAction?: ReactNode;
  /** Fond transparent */
  transparent?: boolean;
  /** Effet blur sur le fond */
  blurred?: boolean;
}

// ============ IOS TOAST ============

export interface IOSToastAction {
  label: string;
  onClick: () => void;
}

export interface IOSToastProps {
  /** Variant sémantique */
  variant?: SemanticVariant;
  /** Titre du toast */
  title: string;
  /** Description optionnelle */
  description?: string;
  /** Icône personnalisée */
  icon?: ReactNode;
  /** Action button */
  action?: IOSToastAction;
  /** Durée d'affichage en ms */
  duration?: number;
  /** Callback à la fermeture */
  onClose?: () => void;
}

// ============ IOS SPINNER ============

export type SpinnerColor = 'primary' | 'white' | 'muted';

export interface IOSSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Taille du spinner */
  size?: Size;
  /** Couleur du spinner */
  color?: SpinnerColor;
}

// ============ IOS TAB BAR ============

export interface TabItem {
  /** Identifiant unique */
  id: string;
  /** Label affiché */
  label: string;
  /** Icône du tab */
  icon: ReactNode;
  /** Badge optionnel (nombre ou texte) */
  badge?: number | string;
}

export interface IOSTabBarProps {
  /** Liste des tabs */
  tabs: TabItem[];
  /** ID du tab actif */
  activeTab: string;
  /** Callback de changement de tab */
  onTabChange: (tabId: string) => void;
  /** Style de la tab bar */
  variant?: 'default' | 'floating';
}

// ============ IOS STATUS BAR ============

export interface IOSStatusBarProps {
  /** Heure affichée (format HH:MM) */
  time?: string;
  /** Niveau de batterie (0-100) */
  batteryLevel?: number;
  /** Indicateur de charge */
  isCharging?: boolean;
  /** Force du signal (1-4) */
  signalStrength?: 1 | 2 | 3 | 4;
  /** Force du WiFi (1-3) */
  wifiStrength?: 1 | 2 | 3;
  /** Thème de couleur */
  theme?: 'light' | 'dark';
}
