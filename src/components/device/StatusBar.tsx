/**
 * StatusBar
 * Barre de statut style iOS avec heure et icônes système
 */

import * as React from 'react';
import { Wifi, Battery, Signal, BatteryCharging } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IOSStatusBarProps } from '@/design-system/types';

const StatusBar: React.FC<IOSStatusBarProps> = ({
  time,
  batteryLevel = 100,
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

  // Battery icon based on charging state
  const BatteryIcon = isCharging ? BatteryCharging : Battery;

  return (
    <div className="flex items-center justify-between px-8 pt-16 pb-2">
      {/* Time */}
      <span className={cn('text-sm font-semibold', textColor)}>{displayTime}</span>

      {/* Right Icons */}
      <div className="flex items-center gap-1.5">
        {/* Signal strength indicator */}
        <Signal
          className={cn('h-4 w-4', textColor)}
          strokeWidth={2.5}
          style={{
            opacity: signalStrength ? signalStrength / 4 : 0.25,
          }}
        />

        {/* WiFi indicator */}
        <Wifi
          className={cn('h-4 w-4', textColor)}
          strokeWidth={2.5}
          style={{
            opacity: wifiStrength ? wifiStrength / 3 : 0.25,
          }}
        />

        {/* Battery indicator */}
        <div className="flex items-center gap-0.5">
          <BatteryIcon
            className={cn(
              'h-5 w-5',
              textColor,
              batteryLevel <= 20 && !isCharging && 'text-error',
              isCharging && 'text-success'
            )}
            strokeWidth={2}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
