/**
 * IOSSafeArea
 * Wrapper pour gérer les safe areas iOS (notch, home indicator)
 * Design System Apple iOS - Support Dynamic Island et Home Indicator
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iosSafeAreaVariants = cva(
  [
    'relative',
  ],
  {
    variants: {
      /** Apply top safe area */
      top: {
        true: 'pt-safe-top',
        false: '',
      },
      /** Apply bottom safe area */
      bottom: {
        true: 'pb-safe-bottom',
        false: '',
      },
      /** Apply horizontal safe areas */
      horizontal: {
        true: 'px-safe-left',
        false: '',
      },
      /** Fill available height */
      fill: {
        true: 'h-full',
        false: '',
      },
      /** Enable scrolling */
      scroll: {
        true: 'overflow-y-auto',
        false: 'overflow-hidden',
      },
    },
    defaultVariants: {
      top: true,
      bottom: true,
      horizontal: false,
      fill: false,
      scroll: false,
    },
  }
);

export interface IOSSafeAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iosSafeAreaVariants> {
  /** Content to render */
  children: React.ReactNode;
  /** As element type */
  as?: 'div' | 'main' | 'section' | 'article';
}

const IOSSafeArea = React.forwardRef<HTMLDivElement, IOSSafeAreaProps>(
  (
    {
      className,
      top,
      bottom,
      horizontal,
      fill,
      scroll,
      children,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          iosSafeAreaVariants({
            top,
            bottom,
            horizontal,
            fill,
            scroll,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

IOSSafeArea.displayName = 'IOSSafeArea';

// Convenience components for specific use cases
const IOSSafeAreaView = React.forwardRef<
  HTMLDivElement,
  Omit<IOSSafeAreaProps, 'as'>
>((props, ref) => <IOSSafeArea ref={ref} {...props} fill scroll />);

IOSSafeAreaView.displayName = 'IOSSafeAreaView';

const IOSSafeAreaContent = React.forwardRef<
  HTMLDivElement,
  Omit<IOSSafeAreaProps, 'as' | 'top' | 'bottom'>
>((props, ref) => (
  <IOSSafeArea ref={ref} top={false} bottom={false} {...props} />
));

IOSSafeAreaContent.displayName = 'IOSSafeAreaContent';

export { IOSSafeArea, IOSSafeAreaView, IOSSafeAreaContent, iosSafeAreaVariants };
