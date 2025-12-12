/**
 * IOSNavigationBar
 * Barre de navigation style iOS avec titre large/small
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { IOSNavigationBarProps } from '@/design-system/types';

const titleSizeClasses = {
  large: 'ios-nav-title-large',
  small: 'ios-nav-title',
  inline: 'text-base font-semibold text-foreground',
} as const;

const IOSNavigationBar = React.forwardRef<HTMLDivElement, IOSNavigationBarProps>(
  (
    {
      className,
      title,
      titleSize = 'large',
      subtitle,
      leftAction,
      rightAction,
      transparent = false,
      blurred = false,
      ...props
    },
    ref
  ) => {
    const isInline = titleSize === 'inline';

    return (
      <div
        ref={ref}
        className={cn(
          'px-5 pt-2 pb-4',
          transparent && 'bg-transparent',
          blurred && 'backdrop-blur-lg bg-background/80',
          className
        )}
        {...props}
      >
        {/* Top row with actions (for inline mode) */}
        {isInline && (leftAction || rightAction) && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex-shrink-0">{leftAction}</div>
            <h1 className={cn(titleSizeClasses[titleSize], 'flex-1 text-center')}>
              {title}
            </h1>
            <div className="flex-shrink-0">{rightAction}</div>
          </div>
        )}

        {/* Large/Small title mode */}
        {!isInline && (
          <>
            {/* Actions row */}
            {(leftAction || rightAction) && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex-shrink-0">{leftAction}</div>
                <div className="flex-shrink-0">{rightAction}</div>
              </div>
            )}

            {/* Title */}
            <h1 className={titleSizeClasses[titleSize]}>{title}</h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
            )}
          </>
        )}

        {/* Subtitle for inline mode */}
        {isInline && subtitle && (
          <p className="text-muted-foreground text-sm text-center">{subtitle}</p>
        )}
      </div>
    );
  }
);

IOSNavigationBar.displayName = 'IOSNavigationBar';

export { IOSNavigationBar };
