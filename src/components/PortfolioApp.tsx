"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import IPhoneFrame from "./device/iPhoneFrame";
import TabBar from "./device/TabBar";
import HomeScreen from "./screens/HomeScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ResumeScreen from "./screens/ResumeScreen";
import ContactScreen from "./screens/ContactScreen";

const VALID_TABS = ["home", "projects", "skills", "resume", "contact"] as const;
type TabId = (typeof VALID_TABS)[number];

function normalizeTab(tab: string | null): TabId | null {
  if (!tab) return null;
  const normalized = tab.toLowerCase();

  // Backward compat (old manifest / shared links)
  if (normalized === "cv") return "resume";

  if (VALID_TABS.includes(normalized as TabId)) {
    return normalized as TabId;
  }

  return null;
}

interface PortfolioAppProps {
  showFrame?: boolean;
}

const PortfolioApp = ({ showFrame = true }: PortfolioAppProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const rawTab = searchParams.get("tab");
  const activeTab = normalizeTab(rawTab) ?? "home";

  // En mode fullscreen, on cache la StatusBar des screens
  const hideStatusBar = !showFrame;

  // Normaliser les valeurs legacy (tab=cv) et la casse (tab=Projects -> tab=projects)
  useEffect(() => {
    if (!rawTab) return;

    const normalized = normalizeTab(rawTab);
    if (!normalized || normalized === "home") return;

    const desiredTabParam = normalized;
    if (rawTab === desiredTabParam) return;

    const hash = typeof window !== "undefined" ? window.location.hash : "";

    const nextParams = new URLSearchParams(searchParamsString);
    nextParams.set("tab", desiredTabParam);

    const nextSearch = nextParams.toString();
    const desired = `${pathname}${nextSearch ? `?${nextSearch}` : ""}${hash}`;
    const current = `${pathname}${searchParamsString ? `?${searchParamsString}` : ""}${hash}`;
    if (desired === current) return;

    router.replace(desired, { scroll: false });
  }, [pathname, rawTab, router, searchParamsString]);

  const handleTabChange = (tab: string) => {
    const nextTab = normalizeTab(tab) ?? "home";
    const nextParams = new URLSearchParams(searchParamsString);
    if (nextTab === "home") {
      nextParams.delete("tab");
    } else {
      nextParams.set("tab", nextTab);
    }
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const nextSearch = nextParams.toString();
    router.replace(`${pathname}${nextSearch ? `?${nextSearch}` : ""}${hash}`, { scroll: false });
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={handleTabChange} hideStatusBar={hideStatusBar} />;
      case "projects":
        return <ProjectsScreen onNavigate={handleTabChange} hideStatusBar={hideStatusBar} />;
      case "skills":
        return <SkillsScreen hideStatusBar={hideStatusBar} />;
      case "resume":
        return <ResumeScreen hideStatusBar={hideStatusBar} />;
      case "contact":
        return <ContactScreen hideStatusBar={hideStatusBar} />;
      default:
        return <HomeScreen onNavigate={handleTabChange} hideStatusBar={hideStatusBar} />;
    }
  };

  const content = (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} isFullscreen={hideStatusBar} />
    </div>
  );

  // Mode fullscreen (mobile réel) : pas de cadre
  if (!showFrame) {
    return (
      <div className="fixed inset-0 bg-background overflow-hidden">
        {content}
      </div>
    );
  }

  // Mode normal : avec cadre iPhone
  return <IPhoneFrame>{content}</IPhoneFrame>;
};

export default PortfolioApp;
