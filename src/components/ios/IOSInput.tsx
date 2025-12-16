/**
 * IOSInput
 * Champ de saisie style iOS avec états et icônes
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { IOSInputProps } from '@/design-system/types';

const iosInputVariants = cva(
  [
    'w-full',
    'bg-muted text-foreground',
    'placeholder:text-muted-foreground',
    'transition-all duration-150',
    'border-0',
    'focus:ring-2 focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      state: {
        default: 'focus:ring-primary',
        error: 'ring-2 ring-error focus:ring-error',
        success: 'ring-2 ring-success focus:ring-success',
        disabled: 'bg-muted/50 cursor-not-allowed',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-lg',
        md: 'h-11 px-4 text-base rounded-xl',
        lg: 'h-14 px-5 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  }
);

export type IOSInputVariantProps = VariantProps<typeof iosInputVariants>;

const IOSInput = React.forwardRef<HTMLInputElement, IOSInputProps & IOSInputVariantProps>(
  (
    {
      className,
      state,
      size,
      leftIcon,
      rightIcon,
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
    const inputId = idProp ?? autoId;
    const currentState = disabled ? 'disabled' : state;
    const showError = currentState === 'error' && !!errorText;
    const displayHelperText = showError ? errorText : helperText;
    const helperTextId = displayHelperText ? `${inputId}-help` : undefined;
    const ariaDescribedBy = [ariaDescribedByProp, helperTextId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground mb-1.5 block"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-5">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              iosInputVariants({ state: currentState, size }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            disabled={disabled}
            aria-describedby={ariaDescribedBy}
            aria-invalid={showError || undefined}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-5">
              {rightIcon}
            </div>
          )}
        </div>

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

IOSInput.displayName = 'IOSInput';

export { IOSInput, iosInputVariants };
