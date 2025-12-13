/**
 * IOSAvailabilityBadge
 * Badge "Disponible pour de nouveaux projets" premium
 * Design System Apple iOS - Avec animation pulse et glow effect
 */

import * as React from 'react';
import { Sparkles, Check, Clock } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iosAvailabilityBadgeVariants = cva(
  [
    'inline-flex items-center gap-2',
    'font-medium',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        // Subtle badge for small spaces
        subtle: [
          'px-3 py-1.5 rounded-full',
          'bg-success/10 text-success',
          'border border-success/20',
        ],
        // Prominent badge with glow
        prominent: [
          'px-4 py-2 rounded-2xl',
          'bg-success/10 text-success',
          'border border-success/30',
          'shadow-[0_0_20px_-4px_hsl(var(--success)/0.4)]',
        ],
        // Pill style
        pill: [
          'px-4 py-2 rounded-full',
          'bg-gradient-to-r from-success/20 to-success/10',
          'text-success',
          'border border-success/20',
        ],
        // Card style
        card: [
          'px-5 py-3 rounded-2xl',
          'bg-card text-card-foreground',
          'border border-success/30',
          'shadow-soft',
        ],
        // Unavailable variant
        unavailable: [
          'px-3 py-1.5 rounded-full',
          'bg-muted text-muted-foreground',
          'border border-border',
        ],
        // Busy variant
        busy: [
          'px-3 py-1.5 rounded-full',
          'bg-warning/10 text-warning',
          'border border-warning/20',
        ],
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      animated: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'prominent',
      size: 'md',
      animated: true,
    },
  }
);

export interface IOSAvailabilityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iosAvailabilityBadgeVariants> {
  /** Main text */
  text?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Available status */
  status?: 'available' | 'unavailable' | 'busy';
}

const statusConfig = {
  available: {
    icon: Sparkles,
    defaultText: 'Disponible pour de nouveaux projets',
    variant: 'prominent' as const,
    dotColor: 'bg-success',
  },
  unavailable: {
    icon: Check,
    defaultText: 'Non disponible actuellement',
    variant: 'unavailable' as const,
    dotColor: 'bg-muted-foreground',
  },
  busy: {
    icon: Clock,
    defaultText: 'Disponible prochainement',
    variant: 'busy' as const,
    dotColor: 'bg-warning',
  },
};

const IOSAvailabilityBadge = React.forwardRef<HTMLDivElement, IOSAvailabilityBadgeProps>(
  (
    {
      className,
      variant,
      size,
      animated = true,
      text,
      showIcon = true,
      icon,
      status = 'available',
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status];
    const effectiveVariant = variant || config.variant;
    const effectiveText = text || config.defaultText;
    const IconComponent = config.icon;

    return (
      <div
        ref={ref}
        className={cn(
          iosAvailabilityBadgeVariants({
            variant: effectiveVariant,
            size,
            animated,
          }),
          className
        )}
        {...props}
      >
        {/* Animated dot */}
        <span className="relative flex h-2.5 w-2.5">
          {animated && status === 'available' && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75',
                config.dotColor,
                'animate-ping'
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex h-2.5 w-2.5 rounded-full',
              config.dotColor
            )}
          />
        </span>

        {/* Text */}
        <span className="font-medium">{effectiveText}</span>

        {/* Icon */}
        {showIcon && (
          <span className="ml-0.5">
            {icon || <IconComponent className="w-4 h-4" />}
          </span>
        )}
      </div>
    );
  }
);

IOSAvailabilityBadge.displayName = 'IOSAvailabilityBadge';

export { IOSAvailabilityBadge, iosAvailabilityBadgeVariants };
