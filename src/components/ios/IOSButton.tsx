/**
 * IOSButton
 * Bouton style iOS avec variants et interactions
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
    // Transitions
    'transition-all duration-150',
    // Interactions
    'active:scale-[0.98] active:brightness-95',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-primary focus-visible:ring-offset-background',
    // Disabled
    'disabled:opacity-50 disabled:pointer-events-none',
    // Icon sizing
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:brightness-105',
          'shadow-soft',
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
        ],
        outline: [
          'border-2 border-primary text-primary bg-transparent',
          'hover:bg-primary/10',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg [&_svg]:size-4',
        md: 'h-11 px-4 text-base rounded-xl min-h-[44px] [&_svg]:size-5',
        lg: 'h-14 px-6 text-lg rounded-xl [&_svg]:size-6',
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
