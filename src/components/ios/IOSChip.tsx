/**
 * IOSChip
 * Chip/Tag style iOS pour CDI, Freelance, Mission longue, etc.
 * Design System Apple iOS - Composant compact et interactif
 */

import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iosChipVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'font-medium whitespace-nowrap select-none',
    'transition-all duration-200',
    'motion-safe:active:scale-95',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-secondary text-secondary-foreground',
          'border border-border/50',
        ],
        primary: [
          'bg-primary/10 text-primary',
          'border border-primary/20',
        ],
        success: [
          'bg-success/10 text-success',
          'border border-success/20',
        ],
        outline: [
          'bg-transparent text-foreground',
          'border border-border',
        ],
        glass: [
          'bg-white/10 backdrop-blur-sm text-foreground',
          'border border-white/20',
        ],
        // Availability chips
        availability: [
          'bg-muted text-muted-foreground',
          'border border-border/50',
          'hover:bg-muted/80',
        ],
        // Selected state
        selected: [
          'bg-primary text-primary-foreground',
          'border border-primary',
          'shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.4)]',
        ],
      },
      size: {
        sm: 'text-xs px-2 py-1 rounded-md',
        md: 'text-sm px-3 py-1.5 rounded-lg',
        lg: 'text-base px-4 py-2 rounded-xl',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:brightness-95',
          'active:brightness-90',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
);

export interface IOSChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iosChipVariants> {
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Show remove button */
  removable?: boolean;
  /** Remove callback */
  onRemove?: () => void;
  /** Selected state */
  selected?: boolean;
  /** Click handler for toggle behavior */
  onToggle?: () => void;
}

const IOSChip = React.forwardRef<HTMLSpanElement, IOSChipProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      leftIcon,
      rightIcon,
      removable,
      onRemove,
      selected,
      onToggle,
      children,
      onClick,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onToggle || !!onClick;
    const effectiveVariant = selected ? 'selected' : variant;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      onClick?.(e);
      onToggle?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || !isInteractive) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.click();
      }

      if (e.key === ' ') {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      onKeyUp?.(e);
      if (e.defaultPrevented || !isInteractive) return;

      if (e.key === ' ') {
        e.preventDefault();
        e.currentTarget.click();
      }
    };

    return (
      <span
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={cn(
          iosChipVariants({
            variant: effectiveVariant,
            size,
            interactive: isInteractive,
          }),
          className
        )}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : onKeyDown}
        onKeyUp={isInteractive ? handleKeyUp : onKeyUp}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Supprimer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }
);

IOSChip.displayName = 'IOSChip';

export { IOSChip, iosChipVariants };
