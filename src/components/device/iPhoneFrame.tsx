import { ReactNode } from "react";

interface iPhoneFrameProps {
  children: ReactNode;
}

const IPhoneFrame = ({ children }: iPhoneFrameProps) => {
  return (
    <div className="relative mx-auto w-[375px]">
      {/* Device Shadow */}
      <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-black/20 to-black/40 blur-3xl scale-95 translate-y-8" />

      {/* Device Frame */}
      <div className="relative rounded-[50px] bg-device-bg p-2.5 shadow-device">
        {/* Inner Bezel */}
        <div className="relative rounded-[42px] bg-device-bezel p-[2px]">
          {/* Screen Container */}
          <div className="relative overflow-hidden rounded-[40px] bg-background">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <div className="mt-2.5 h-[30px] w-[110px] rounded-full bg-device-notch flex items-center justify-center gap-3">
                {/* Camera */}
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                  <div className="h-1 w-1 rounded-full bg-blue-400/30 ml-0.5 mt-0.5" />
                </div>
              </div>
            </div>

            {/* Screen Content - ratio iPhone 16 Pro (375x800 = 2.13:1, réel: 2.17:1) */}
            <div className="h-[800px] overflow-hidden">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
              <div className="h-[4px] w-[120px] rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
        
        {/* Side Buttons */}
        {/* Volume Up */}
        <div className="absolute left-[-2px] top-[140px] h-[28px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Volume Down */}
        <div className="absolute left-[-2px] top-[180px] h-[28px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Silent Switch */}
        <div className="absolute left-[-2px] top-[100px] h-[16px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Power Button */}
        <div className="absolute right-[-2px] top-[160px] h-[42px] w-[3px] rounded-r-sm bg-device-bezel" />
      </div>
    </div>
  );
};

export default IPhoneFrame;
