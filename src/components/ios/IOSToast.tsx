/**
 * IOSToast
 * Notification toast style iOS
 */

import * as React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IOSToastProps, SemanticVariant } from '@/design-system/types';

const variantIcons: Record<SemanticVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

const variantClasses: Record<SemanticVariant, string> = {
  default: 'bg-card border-border',
  success: 'bg-success/10 border-success/20 text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  error: 'bg-error/10 border-error/20 text-error',
  info: 'bg-info/10 border-info/20 text-info',
};

const IOSToast = React.forwardRef<
  HTMLDivElement,
  IOSToastProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      icon,
      action,
      onClose,
      ...props
    },
    ref
  ) => {
    const displayIcon = icon ?? variantIcons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-start gap-3 p-4',
          'rounded-2xl border',
          'shadow-medium',
          'animate-ios-slide-up',
          variantClasses[variant],
          className
        )}
        role="alert"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className="flex-shrink-0 mt-0.5">{displayIcon}</div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'font-semibold',
              variant === 'default' ? 'text-foreground' : ''
            )}
          >
            {title}
          </p>
          {description && (
            <p
              className={cn(
                'text-sm mt-1',
                variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
              )}
            >
              {description}
            </p>
          )}

          {/* Action */}
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                'text-sm font-semibold mt-2',
                'hover:underline',
                variant === 'default' ? 'text-primary' : ''
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              'flex-shrink-0 p-1 rounded-full',
              'hover:bg-black/5 transition-colors',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-60'
            )}
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

IOSToast.displayName = 'IOSToast';

export { IOSToast };
