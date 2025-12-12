/**
 * IOSCard
 * Carte style iOS avec variants glassmorphism/elevated/flat
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { IOSCardProps } from '@/design-system/types';

const iosCardVariants = cva(
  [
    'relative overflow-hidden',
    'text-card-foreground',
  ],
  {
    variants: {
      variant: {
        elevated: [
          'bg-card',
          'shadow-soft',
          'border border-border/50',
        ],
        flat: [
          'bg-card',
          'border border-border',
        ],
        glass: [
          'glass-card',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      rounded: {
        sm: 'rounded-xl',
        md: 'rounded-2xl',
        lg: 'rounded-3xl',
        full: 'rounded-[32px]',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'transition-all duration-200',
          'hover:brightness-105',
          'hover:shadow-medium',
          'active:scale-[0.98]',
          'active:brightness-95',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      rounded: 'md',
      interactive: false,
    },
  }
);

export type IOSCardVariantProps = VariantProps<typeof iosCardVariants>;

const IOSCard = React.forwardRef<HTMLDivElement, IOSCardProps & IOSCardVariantProps>(
  (
    {
      className,
      variant,
      padding,
      rounded,
      interactive,
      header,
      footer,
      children,
      onClick,
      onPress,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      onPress?.();
    };

    const isInteractive = interactive || !!onPress || !!onClick;

    const getPaddingClass = () => {
      if (padding === 'none') return '';
      if (padding === 'sm') return 'p-3';
      if (padding === 'lg') return 'p-6';
      return 'p-4';
    };

    return (
      <div
        ref={ref}
        className={cn(
          iosCardVariants({
            variant,
            padding: header || footer ? 'none' : padding,
            rounded,
            interactive: isInteractive,
          }),
          className
        )}
        onClick={isInteractive ? handleClick : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        {...props}
      >
        {header && (
          <div className={cn('border-b border-border/50', getPaddingClass())}>
            {header}
          </div>
        )}

        <div className={cn(header || footer ? getPaddingClass() : '')}>
          {children}
        </div>

        {footer && (
          <div className={cn('border-t border-border/50', getPaddingClass())}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

IOSCard.displayName = 'IOSCard';

export { IOSCard, iosCardVariants };
