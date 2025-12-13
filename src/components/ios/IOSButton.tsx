/**
 * IOSButton
 * Bouton style iOS avec variants et interactions avancées
 * Design System Apple iOS - Touch targets et animations spring
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IOSSpinner } from './IOSSpinner';
import type { IOSButtonProps } from '@/design-system/types';

const iosButtonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'font-semibold whitespace-nowrap select-none',
    // Touch target minimum (iOS HIG)
    'min-h-touch min-w-touch',
    // Transitions with spring easing
    'transition-all duration-200',
    // Spring animation on press
    'active:scale-[0.97] active:brightness-95',
    'motion-safe:transition-transform motion-safe:duration-150',
    'motion-safe:active:transition-none',
    // Focus ring iOS style
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-primary/50 focus-visible:ring-offset-background',
    // Disabled
    'disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed',
    // Icon sizing
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:brightness-105',
          'shadow-[0_4px_14px_-4px_hsl(var(--primary)/0.4)]',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
        ],
        ghost: [
          'text-primary bg-transparent',
          'hover:bg-primary/10',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:brightness-105',
          'shadow-[0_4px_14px_-4px_hsl(var(--destructive)/0.4)]',
        ],
        outline: [
          'border-2 border-primary text-primary bg-transparent',
          'hover:bg-primary/10',
        ],
        // New variants
        text: [
          'text-primary bg-transparent',
          'hover:opacity-70',
          'p-0 h-auto min-h-0 min-w-0',
        ],
        icon: [
          'p-2 rounded-full',
          'text-muted-foreground',
          'hover:bg-muted hover:text-foreground',
          'min-h-touch min-w-touch',
        ],
        glass: [
          'bg-white/10 backdrop-blur-md text-foreground',
          'border border-white/20',
          'hover:bg-white/20',
          'shadow-soft',
        ],
      },
      size: {
        xs: 'h-8 px-2 text-xs rounded-lg [&_svg]:size-3.5',
        sm: 'h-9 px-3 text-sm rounded-lg [&_svg]:size-4',
        md: 'h-11 px-4 text-base rounded-xl [&_svg]:size-5',
        lg: 'h-14 px-6 text-lg rounded-2xl [&_svg]:size-6',
        xl: 'h-16 px-8 text-xl rounded-2xl [&_svg]:size-7',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type IOSButtonVariantProps = VariantProps<typeof iosButtonVariants>;

const IOSButton = React.forwardRef<HTMLButtonElement, IOSButtonProps & IOSButtonVariantProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        className={cn(iosButtonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <IOSSpinner
              size={size === 'sm' ? 'sm' : 'md'}
              color={variant === 'primary' || variant === 'destructive' ? 'white' : 'primary'}
            />
            <span className="sr-only">Chargement...</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);

IOSButton.displayName = 'IOSButton';

export { IOSButton, iosButtonVariants };
