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
      disabled,
      id: idProp,
      'aria-describedby': ariaDescribedByProp,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const textareaId = idProp ?? autoId;
    const currentState = disabled ? 'disabled' : state;
    const showError = currentState === 'error' && !!errorText;
    const displayHelperText = showError ? errorText : helperText;
    const helperTextId = displayHelperText ? `${textareaId}-help` : undefined;
    const ariaDescribedBy = [ariaDescribedByProp, helperTextId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'bg-muted text-foreground',
            'placeholder:text-muted-foreground',
            'transition-all duration-150',
            'border-0 resize-none',
            'focus:ring-2 focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            stateClasses[currentState],
            className
          )}
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-invalid={showError || undefined}
          {...props}
        />

        {displayHelperText && (
          <p
            id={helperTextId}
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
