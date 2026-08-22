"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import IPhoneFrame from "./device/iPhoneFrame";
import TabBar from "./device/TabBar";
import HomeScreen from "./screens/HomeScreen";
import WorkScreen from "./screens/WorkScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ResumeScreen from "./screens/ResumeScreen";
import ContactScreen from "./screens/ContactScreen";
import { usePortfolioExperience } from "./portfolio/PortfolioExperienceContext";

const VALID_TABS = ["home", "work", "skills", "resume", "contact"] as const;
type TabId = (typeof VALID_TABS)[number];

function normalizeTab(tab: string | null): TabId | null {
  if (!tab) return null;
  const normalized = tab.toLowerCase();

  // Backward compat (old manifest / shared links)
  if (normalized === "cv") return "resume";
  if (normalized === "projects" || normalized === "experiences") return "work";

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
  const { motionMode, setActiveSection } = usePortfolioExperience();

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

  useEffect(() => {
    setActiveSection(activeTab);
  }, [activeTab, setActiveSection]);

  const handleTabChange = (tab: string) => {
    const nextTab = normalizeTab(tab) ?? "home";
    setActiveSection(nextTab);
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

  const handleSwipe = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const intent = info.offset.x + info.velocity.x * 0.08;
    if (Math.abs(intent) < 70) return;
    const index = VALID_TABS.indexOf(activeTab);
    const nextIndex = intent < 0 ? Math.min(VALID_TABS.length - 1, index + 1) : Math.max(0, index - 1);
    if (nextIndex !== index) handleTabChange(VALID_TABS[nextIndex]);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={handleTabChange} hideStatusBar={hideStatusBar} />;
      case "work":
        return <WorkScreen hideStatusBar={hideStatusBar} />;
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className="h-full"
            drag={motionMode === "full" ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleSwipe}
            initial={motionMode === "full" ? { opacity: 0, x: 18 } : { opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={motionMode === "full" ? { opacity: 0, x: -14 } : { opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} isFullscreen={hideStatusBar} />
    </div>
  );

  // Mode fullscreen (mobile réel) : pas de cadre
  if (!showFrame) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-background pt-16">
        {content}
      </div>
    );
  }

  // Mode normal : avec cadre iPhone
  return <IPhoneFrame>{content}</IPhoneFrame>;
};

export default PortfolioApp;
