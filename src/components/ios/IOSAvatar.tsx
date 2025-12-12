/**
 * IOSAvatar
 * Avatar style iOS avec initiales et indicateur de statut
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { IOSAvatarProps, AvatarStatus } from '@/design-system/types';

const sizeClasses = {
  xs: 'w-8 h-8 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-2xl',
  '2xl': 'w-28 h-28 text-4xl',
} as const;

const statusSizeClasses = {
  xs: 'w-2 h-2 border',
  sm: 'w-2.5 h-2.5 border',
  md: 'w-3 h-3 border-2',
  lg: 'w-4 h-4 border-2',
  xl: 'w-5 h-5 border-2',
  '2xl': 'w-6 h-6 border-4',
} as const;

const statusColorClasses: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
} as const;

const IOSAvatar = React.forwardRef<HTMLDivElement, IOSAvatarProps>(
  (
    {
      className,
      src,
      alt,
      initials,
      size = 'md',
      status,
      statusIcon,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const showInitials = !src || imageError;

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        <div
          className={cn(
            'rounded-full overflow-hidden',
            'bg-gradient-to-br from-primary to-primary/80',
            'flex items-center justify-center',
            'shadow-soft',
            sizeClasses[size]
          )}
        >
          {showInitials ? (
            <span className="font-bold text-primary-foreground">{initials}</span>
          ) : (
            <img
              src={src}
              alt={alt || 'Avatar'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Status indicator */}
        {(status || statusIcon) && (
          <div
            className={cn(
              'absolute -bottom-0.5 -right-0.5',
              'rounded-full border-background',
              'flex items-center justify-center',
              statusSizeClasses[size],
              status && statusColorClasses[status]
            )}
          >
            {statusIcon}
          </div>
        )}
      </div>
    );
  }
);

IOSAvatar.displayName = 'IOSAvatar';

export { IOSAvatar };
