/**
 * IOSListItem
 * Élément de liste style iOS natif avec chevron
 */

import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IOSListItemProps } from '@/design-system/types';

const IOSListItem = React.forwardRef<HTMLDivElement, IOSListItemProps>(
  (
    {
      className,
      title,
      subtitle,
      leftIcon,
      leftImage,
      rightText,
      rightIcon,
      showChevron = true,
      destructive = false,
      disabled = false,
      onPress,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      onPress?.();
    };

    const isClickable = !!onPress || !!onClick;

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'flex items-center gap-3 px-4 py-3',
          'bg-card',
          // Interactive states
          isClickable &&
            !disabled && [
              'cursor-pointer',
              'transition-colors duration-150',
              'active:bg-muted',
            ],
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {/* Left Section */}
        {(leftIcon || leftImage) && (
          <div className="flex-shrink-0">
            {leftImage ? (
              <img
                src={leftImage}
                alt=""
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  destructive ? 'bg-destructive/10' : 'bg-primary/10'
                )}
              >
                <span
                  className={cn(
                    destructive ? 'text-destructive' : 'text-primary',
                    '[&_svg]:w-5 [&_svg]:h-5',
                    'text-xl'
                  )}
                >
                  {leftIcon}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'font-semibold truncate',
              destructive ? 'text-destructive' : 'text-foreground'
            )}
          >
            {title}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightText && (
            <span className="text-sm text-muted-foreground">{rightText}</span>
          )}
          {rightIcon}
          {showChevron && isClickable && !rightIcon && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
          )}
        </div>
      </div>
    );
  }
);

IOSListItem.displayName = 'IOSListItem';

export { IOSListItem };
