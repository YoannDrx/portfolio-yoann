"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window === "undefined") return "home";
    const params = new URLSearchParams(window.location.search);
    return normalizeTab(params.get("tab")) ?? "home";
  });

  // En mode fullscreen, on cache la StatusBar des screens
  const hideStatusBar = !showFrame;

  // URL -> state (deep-linking, back/forward buttons)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const nextTab = normalizeTab(params.get("tab")) ?? "home";
      setActiveTab((prev) => (prev === nextTab ? prev : nextTab));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // state -> URL (shareable navigation)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const url = new URL(window.location.href);

    if (activeTab === "home") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", activeTab);
    }

    const desired = `${url.pathname}${url.search}${url.hash}`;
    if (desired === current) return;

    router.replace(desired, { scroll: false });
  }, [activeTab, router]);

  const handleTabChange = (tab: string) => {
    setActiveTab(normalizeTab(tab) ?? "home");
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
