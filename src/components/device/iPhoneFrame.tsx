import { ReactNode } from "react";

interface iPhoneFrameProps {
  children: ReactNode;
}

const IPhoneFrame = ({ children }: iPhoneFrameProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[390px] md:max-w-[430px]">
      {/* Device Shadow */}
      <div className="absolute inset-0 rounded-[55px] bg-gradient-to-b from-black/20 to-black/40 blur-3xl scale-95 translate-y-8" />
      
      {/* Device Frame */}
      <div className="relative rounded-[55px] bg-device-bg p-3 shadow-device">
        {/* Inner Bezel */}
        <div className="relative rounded-[45px] bg-device-bezel p-[3px]">
          {/* Screen Container */}
          <div className="relative overflow-hidden rounded-[42px] bg-background">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <div className="mt-3 h-[35px] w-[126px] rounded-full bg-device-notch flex items-center justify-center gap-3">
                {/* Camera */}
                <div className="h-3 w-3 rounded-full bg-zinc-800 ring-1 ring-zinc-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400/30 ml-0.5 mt-0.5" />
                </div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="h-[844px] md:h-[932px] overflow-hidden">
              {children}
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <div className="h-[5px] w-[134px] rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
        
        {/* Side Buttons */}
        {/* Volume Up */}
        <div className="absolute left-[-2px] top-[180px] h-[32px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Volume Down */}
        <div className="absolute left-[-2px] top-[230px] h-[32px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Silent Switch */}
        <div className="absolute left-[-2px] top-[130px] h-[18px] w-[3px] rounded-l-sm bg-device-bezel" />
        {/* Power Button */}
        <div className="absolute right-[-2px] top-[200px] h-[48px] w-[3px] rounded-r-sm bg-device-bezel" />
      </div>
    </div>
  );
};

export default IPhoneFrame;
