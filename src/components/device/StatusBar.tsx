import { Wifi, Battery, Signal } from "lucide-react";

const StatusBar = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between px-8 pt-16 pb-2">
      {/* Time */}
      <span className="text-sm font-semibold text-foreground">
        {hours}:{minutes}
      </span>
      
      {/* Right Icons */}
      <div className="flex items-center gap-1.5">
        <Signal className="h-4 w-4 text-foreground" strokeWidth={2.5} />
        <Wifi className="h-4 w-4 text-foreground" strokeWidth={2.5} />
        <div className="flex items-center gap-0.5">
          <Battery className="h-5 w-5 text-foreground" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
