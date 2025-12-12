/**
 * iOS Components - Export Central
 *
 * Usage:
 * import { IOSButton, IOSCard, IOSListItem } from '@/components/ios';
 */

// Core components
export { IOSButton, iosButtonVariants } from './IOSButton';
export { IOSCard, iosCardVariants } from './IOSCard';
export { IOSInput, iosInputVariants } from './IOSInput';
export { IOSTextarea } from './IOSTextarea';
export { IOSBadge, iosBadgeVariants } from './IOSBadge';

// List & Navigation
export { IOSListItem } from './IOSListItem';
export { IOSNavigationBar } from './IOSNavigationBar';

// Feedback
export { IOSSpinner } from './IOSSpinner';
export { IOSProgressBar } from './IOSProgressBar';
export { IOSToast } from './IOSToast';

// Display
export { IOSAvatar } from './IOSAvatar';

// Re-export types for convenience
export type {
  IOSButtonProps,
  IOSCardProps,
  IOSInputProps,
  IOSTextareaProps,
  IOSBadgeProps,
  IOSListItemProps,
  IOSNavigationBarProps,
  IOSSpinnerProps,
  IOSProgressBarProps,
  IOSToastProps,
  IOSAvatarProps,
} from '@/design-system/types';
