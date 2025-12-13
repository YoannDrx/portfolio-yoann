/**
 * IOSCard
 * Carte style iOS avec variants glassmorphism/elevated/flat
 * Design System Apple iOS - Glassmorphism premium et animations spring
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
        // Premium glassmorphism effect
        frosted: [
          'bg-white/60 dark:bg-black/40',
          'backdrop-blur-xl',
          'border border-white/30 dark:border-white/10',
          'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.4)]',
          'dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]',
        ],
        // Gradient border card
        gradient: [
          'bg-card',
          'border-0',
          'before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px]',
          'before:bg-gradient-to-br before:from-primary/50 before:to-primary/10',
          'before:-z-10',
          'shadow-soft',
        ],
      },
      padding: {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-xl',
        md: 'rounded-2xl',
        lg: 'rounded-3xl',
        full: 'rounded-[32px]',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'transition-all duration-200',
          'hover:brightness-[1.02]',
          'hover:shadow-medium',
          'hover:-translate-y-0.5',
          'active:scale-[0.98]',
          'active:brightness-95',
          'active:translate-y-0',
          'motion-safe:transition-transform motion-safe:duration-150',
        ],
        false: '',
      },
      // Animation d'entrée
      animated: {
        true: 'animate-ios-spring',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      rounded: 'md',
      interactive: false,
      animated: false,
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
      animated,
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
      const paddingValue = padding as string;
      if (paddingValue === 'none') return '';
      if (paddingValue === 'xs') return 'p-2';
      if (paddingValue === 'sm') return 'p-3';
      if (paddingValue === 'lg') return 'p-6';
      if (paddingValue === 'xl') return 'p-8';
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
            animated,
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
