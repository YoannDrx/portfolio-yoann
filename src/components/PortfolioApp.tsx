"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import IPhoneFrame from "./device/iPhoneFrame";
import TabBar from "./device/TabBar";
import HomeScreen from "./screens/HomeScreen";
import WorkScreen from "./screens/WorkScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ResumeScreen from "./screens/ResumeScreen";
import ContactScreen from "./screens/ContactScreen";

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
  const reducedMotion = useReducedMotion();

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

  const screens = [
    { id: "home", node: <HomeScreen onNavigate={handleTabChange} hideStatusBar={hideStatusBar} /> },
    { id: "work", node: <WorkScreen hideStatusBar={hideStatusBar} /> },
    { id: "skills", node: <SkillsScreen hideStatusBar={hideStatusBar} /> },
    { id: "resume", node: <ResumeScreen hideStatusBar={hideStatusBar} /> },
    { id: "contact", node: <ContactScreen hideStatusBar={hideStatusBar} /> },
  ] as const;
  const activeIndex = screens.findIndex((screen) => screen.id === activeTab);

  const content = (
    <div className="phone-canvas relative flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden">
        {screens.map((screen, index) => {
          const active = screen.id === activeTab;
          return (
            <motion.div
              key={screen.id}
              className={`absolute inset-0 h-full ${active ? "pointer-events-auto" : "pointer-events-none"}`}
              aria-hidden={!active}
              inert={!active}
              initial={false}
              animate={active ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, x: reducedMotion ? 0 : index < activeIndex ? -26 : 26, scale: reducedMotion ? 1 : .985, filter: reducedMotion ? "blur(0px)" : "blur(5px)" }}
              transition={reducedMotion ? { duration: .16 } : { type: "spring", stiffness: 340, damping: 34, mass: .82 }}
            >
              {screen.node}
            </motion.div>
          );
        })}
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} isFullscreen={hideStatusBar} />
    </div>
  );

  // Mode fullscreen (mobile réel) : pas de cadre
  if (!showFrame) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-background pt-[max(4rem,env(safe-area-inset-top))]">
        {content}
      </div>
    );
  }

  // Mode normal : avec cadre iPhone
  return <IPhoneFrame>{content}</IPhoneFrame>;
};

export default PortfolioApp;
