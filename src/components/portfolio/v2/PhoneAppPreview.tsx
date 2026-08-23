"use client";

import HomeScreen from "@/components/screens/HomeScreen";
import TabBar from "@/components/device/TabBar";

/**
 * The transition scene deliberately renders the real phone home and tab bar.
 * Keeping a single implementation prevents the preview from drifting away from
 * the interactive mini-app.
 */
export function PhoneAppPreview() {
  return (
    <div className="phone-canvas relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        <HomeScreen onNavigate={() => undefined} />
      </div>
      <TabBar activeTab="home" onTabChange={() => undefined} />
    </div>
  );
}
