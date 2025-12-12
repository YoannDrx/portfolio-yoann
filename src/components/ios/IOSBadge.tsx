/**
 * IOSBadge
 * Badge style iOS avec variants sémantiques
 */

import * as React from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { IOSBadgeProps } from '@/design-system/types';

const iosBadgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
        info: 'bg-info/10 text-info',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-sm px-3 py-1 rounded-lg',
        lg: 'text-base px-4 py-1.5 rounded-xl',
      },
      dot: {
        true: 'pl-0 pr-0 gap-1.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
    },
  }
);

const dotColorClasses = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
} as const;

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
} as const;

export type IOSBadgeVariantProps = VariantProps<typeof iosBadgeVariants>;

const IOSBadge = React.forwardRef<HTMLSpanElement, IOSBadgeProps & IOSBadgeVariantProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    // Si dot est true et pas d'enfants, afficher juste le point
    if (dot && !children) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            dotSizeClasses[size],
            dotColorClasses[variant],
            'animate-pulse',
            className
          )}
          {...props}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          iosBadgeVariants({ variant, size, dot }),
          removable && 'pr-1',
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full',
              dotSizeClasses[size],
              dotColorClasses[variant],
              'animate-pulse'
            )}
          />
        )}
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 transition-colors"
            aria-label="Supprimer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }
);

IOSBadge.displayName = 'IOSBadge';

export { IOSBadge, iosBadgeVariants };
