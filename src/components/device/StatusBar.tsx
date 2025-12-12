/**
 * StatusBar
 * Barre de statut style iOS avec heure et icônes système
 */

import * as React from 'react';
import { Wifi, Signal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IOSStatusBarProps } from '@/design-system/types';

// Icône batterie iOS avec remplissage continu
const BatteryIcon: React.FC<{ level: number; className?: string }> = ({ level, className }) => {
  // Largeur du remplissage (max 17px sur 21px de largeur interne)
  const fillWidth = Math.max(2, (level / 100) * 17);

  return (
    <svg viewBox="0 0 25 12" className={className} fill="currentColor">
      {/* Contour de la batterie */}
      <rect x="0" y="0.5" width="21" height="11" rx="2.5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Borne positive */}
      <path d="M22 4 C23 4 24 4.5 24 5.5 L24 6.5 C24 7.5 23 8 22 8 L22 4 Z" fill="currentColor" opacity="0.4" />
      {/* Remplissage du niveau */}
      <rect
        x="1.5"
        y="2"
        width={fillWidth}
        height="8"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
};

const StatusBar: React.FC<IOSStatusBarProps> = ({
  time,
  batteryLevel = 50,
  isCharging = false,
  signalStrength = 4,
  wifiStrength = 3,
  theme = 'light',
}) => {
  // Auto-update time if not provided
  const [currentTime, setCurrentTime] = React.useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  });

  React.useEffect(() => {
    if (time) return;

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const displayTime = time ?? currentTime;
  const textColor = theme === 'dark' ? 'text-white' : 'text-foreground';

  return (
    <div className="relative h-12 flex items-start pt-3">
      {/* Time - à gauche du Dynamic Island */}
      <div className="absolute left-6 top-3">
        <span className={cn('text-sm font-semibold', textColor)}>{displayTime}</span>
      </div>

      {/* Right Icons - à droite du Dynamic Island */}
      <div className="absolute right-6 top-3 flex items-center gap-1">
        {/* Signal strength indicator */}
        <Signal
          className={cn('h-[15px] w-[15px]', textColor)}
          strokeWidth={2.5}
          style={{
            opacity: signalStrength ? signalStrength / 4 : 0.25,
          }}
        />

        {/* WiFi indicator */}
        <Wifi
          className={cn('h-[15px] w-[15px]', textColor)}
          strokeWidth={2.5}
          style={{
            opacity: wifiStrength ? wifiStrength / 3 : 0.25,
          }}
        />

        {/* Battery indicator */}
        <BatteryIcon
          level={batteryLevel}
          className={cn(
            'h-[14px] w-[22px]',
            textColor,
            batteryLevel <= 20 && !isCharging && 'text-error',
            isCharging && 'text-success'
          )}
        />
      </div>
    </div>
  );
};

export default StatusBar;
