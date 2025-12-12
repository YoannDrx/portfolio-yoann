/**
 * IOSTextarea
 * Zone de texte style iOS avec états
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { IOSTextareaProps } from '@/design-system/types';

const stateClasses = {
  default: 'focus:ring-primary',
  error: 'ring-2 ring-error focus:ring-error',
  success: 'ring-2 ring-success focus:ring-success',
  disabled: 'bg-muted/50 cursor-not-allowed opacity-50',
} as const;

const IOSTextarea = React.forwardRef<HTMLTextAreaElement, IOSTextareaProps>(
  (
    {
      className,
      state = 'default',
      rows = 4,
      label,
      helperText,
      errorText,
      ...props
    },
    ref
  ) => {
    const showError = state === 'error' && errorText;
    const displayHelperText = showError ? errorText : helperText;

    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-muted text-foreground',
            'placeholder:text-muted-foreground',
            'transition-all duration-150',
            'border-0 resize-none',
            'focus:ring-2 focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            stateClasses[state],
            className
          )}
          {...props}
        />

        {displayHelperText && (
          <p
            className={cn(
              'text-sm mt-1.5',
              showError ? 'text-error' : 'text-muted-foreground'
            )}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

IOSTextarea.displayName = 'IOSTextarea';

export { IOSTextarea };
