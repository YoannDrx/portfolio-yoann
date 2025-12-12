/**
 * IOSSpinner
 * Indicateur de chargement style iOS
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { IOSSpinnerProps } from '@/design-system/types';

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-6 h-6 border-[3px]',
} as const;

const colorClasses = {
  primary: 'border-primary/30 border-t-primary',
  white: 'border-white/30 border-t-white',
  muted: 'border-muted-foreground/30 border-t-muted-foreground',
} as const;

const IOSSpinner = React.forwardRef<HTMLDivElement, IOSSpinnerProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full animate-spin',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        role="status"
        aria-label="Chargement..."
        {...props}
      />
    );
  }
);

IOSSpinner.displayName = 'IOSSpinner';

export { IOSSpinner };
