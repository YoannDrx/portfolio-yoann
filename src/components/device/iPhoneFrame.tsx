/**
 * IPhoneFrame
 * Frame iPhone responsive avec support multi-devices
 * Utilise les CSS variables du design system
 */

import { ReactNode, useMemo } from "react";
import { devices, type DeviceType } from "@/design-system/tokens/breakpoints";
import { cn } from "@/lib/utils";

interface IPhoneFrameProps {
  children: ReactNode;
  /** Device type - defaults to iPhone14Pro */
  device?: DeviceType;
  /** Show/hide frame for fullscreen mode */
  showFrame?: boolean;
  /** Additional className */
  className?: string;
}

const IPhoneFrame = ({
  children,
  device = 'iPhone14Pro',
  showFrame = true,
  className
}: IPhoneFrameProps) => {
  // Get device config from tokens
  const deviceConfig = useMemo(() => devices[device], [device]);

  // Calculate dimensions - scale down for display
  const scale = 0.95; // Scale factor for display
  const width = Math.round(deviceConfig.width * scale);
  const height = Math.round(deviceConfig.height * scale);

  // Border radius calculations based on device
  const frameRadius = deviceConfig.hasDynamicIsland ? 50 : deviceConfig.hasNotch ? 44 : 20;
  const bezelRadius = frameRadius - 8;
  const screenRadius = bezelRadius - 2;

  // Dynamic Island or Notch dimensions
  const notchHeight = deviceConfig.hasDynamicIsland ? 30 : deviceConfig.hasNotch ? 28 : 0;
  const notchWidth = deviceConfig.hasDynamicIsland ? 110 : deviceConfig.hasNotch ? 150 : 0;

  // Fullscreen mode (no frame)
  if (!showFrame) {
    return (
      <div
        className={cn("relative overflow-hidden bg-background", className)}
        style={{ width, height }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width }}
    >
      {/* Device Shadow */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 blur-3xl scale-95 translate-y-8"
        style={{ borderRadius: frameRadius }}
      />

      {/* Device Frame */}
      <div
        className="relative bg-device-bg p-2.5 shadow-device"
        style={{ borderRadius: frameRadius }}
      >
        {/* Inner Bezel */}
        <div
          className="relative bg-device-bezel p-[2px]"
          style={{ borderRadius: bezelRadius }}
        >
          {/* Screen Container */}
          <div
            className="relative overflow-hidden bg-background"
            style={{ borderRadius: screenRadius }}
          >
            {/* Dynamic Island / Notch */}
            {(deviceConfig.hasDynamicIsland || deviceConfig.hasNotch) && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                <div
                  className={cn(
                    "mt-2.5 bg-device-notch flex items-center justify-center",
                    deviceConfig.hasDynamicIsland ? "rounded-full gap-3" : "rounded-b-2xl"
                  )}
                  style={{
                    height: notchHeight,
                    width: notchWidth
                  }}
                >
                  {/* Camera - only for Dynamic Island */}
                  {deviceConfig.hasDynamicIsland && (
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                      <div className="h-1 w-1 rounded-full bg-blue-400/30 ml-0.5 mt-0.5" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Screen Content */}
            <div
              className="overflow-hidden"
              style={{ height }}
            >
              {children}
            </div>

            {/* Home Indicator - only for devices with safe area bottom */}
            {deviceConfig.safeAreaBottom > 0 && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                <div className="h-[4px] w-[120px] rounded-full bg-foreground/20" />
              </div>
            )}
          </div>
        </div>

        {/* Side Buttons - proportional to device height */}
        {/* Volume Up */}
        <div
          className="absolute left-[-2px] h-[28px] w-[3px] rounded-l-sm bg-device-bezel"
          style={{ top: Math.round(height * 0.175) }}
        />
        {/* Volume Down */}
        <div
          className="absolute left-[-2px] h-[28px] w-[3px] rounded-l-sm bg-device-bezel"
          style={{ top: Math.round(height * 0.225) }}
        />
        {/* Silent Switch */}
        <div
          className="absolute left-[-2px] h-[16px] w-[3px] rounded-l-sm bg-device-bezel"
          style={{ top: Math.round(height * 0.125) }}
        />
        {/* Power Button */}
        <div
          className="absolute right-[-2px] h-[42px] w-[3px] rounded-r-sm bg-device-bezel"
          style={{ top: Math.round(height * 0.2) }}
        />
      </div>
    </div>
  );
};

export default IPhoneFrame;
