/**
 * IOSProgressBar
 * Barre de progression style iOS avec gradient et animation
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { IOSProgressBarProps } from '@/design-system/types';

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
} as const;

const colorClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
} as const;

const IOSProgressBar = React.forwardRef<HTMLDivElement, IOSProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size = 'md',
      variant = 'default',
      color = 'primary',
      showValue = false,
      animated = true,
      gradientFrom,
      gradientTo,
      style,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const getBarClasses = () => {
      if (variant === 'gradient' && (gradientFrom || gradientTo)) {
        return `bg-gradient-to-r ${gradientFrom ?? 'from-primary'} ${gradientTo ?? 'to-primary/70'}`;
      }
      if (variant === 'striped') {
        return cn(
          colorClasses[color],
          'bg-[length:1rem_1rem]',
          'bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]'
        );
      }
      return colorClasses[color];
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showValue && (
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-foreground">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        <div
          className={cn(
            'w-full rounded-full overflow-hidden bg-muted',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full',
              getBarClasses(),
              animated && 'transition-all duration-1000 ease-out'
            )}
            style={{
              width: `${percentage}%`,
              ...style,
            }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);

IOSProgressBar.displayName = 'IOSProgressBar';

export { IOSProgressBar };
