"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  FeaturedWorkId,
  MotionMode,
  PortfolioSectionId,
  SceneQuality,
  ViewMode,
  ViewTransitionState,
} from "@/data/portfolio-content";

const VIEW_MODE_KEY = "portfolio-view-mode-v2";
const LEGACY_VIEW_MODE_KEY = "portfolio-view-mode";
const MORPH_DURATION_MS = 850;

type PortfolioExperienceValue = {
  viewMode: ViewMode;
  activeSection: PortfolioSectionId;
  activeWorkId: FeaturedWorkId;
  transitionState: ViewTransitionState;
  motionMode: MotionMode;
  sceneQuality: SceneQuality;
  isCompactDevice: boolean;
  requestViewMode: (mode: ViewMode) => void;
  setActiveSection: (section: PortfolioSectionId) => void;
  setActiveWork: (work: FeaturedWorkId) => void;
};

const PortfolioExperienceContext = createContext<PortfolioExperienceValue | null>(null);

function webGlAvailable() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function storedViewMode(): ViewMode | null {
  const stored = localStorage.getItem(VIEW_MODE_KEY);
  if (stored === "web" || stored === "iphone") return stored;
  const legacy = localStorage.getItem(LEGACY_VIEW_MODE_KEY);
  if (legacy === "device") return "iphone";
  if (legacy === "web") return "web";
  return null;
}

function sectionFromTab(tab: string | null): PortfolioSectionId {
  if (tab === "work" || tab === "projects" || tab === "experiences") return "work";
  if (tab === "skills") return "skills";
  if (tab === "resume" || tab === "cv") return "resume";
  if (tab === "contact") return "contact";
  return "home";
}

export function PortfolioExperienceProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const [viewMode, setViewMode] = useState<ViewMode>("web");
  const [activeSection, setActiveSectionState] = useState<PortfolioSectionId>(() =>
    sectionFromTab(searchParams.get("tab"))
  );
  const [activeWorkId, setActiveWorkId] = useState<FeaturedWorkId>("klesia");
  const [transitionState, setTransitionState] = useState<ViewTransitionState>("idle");
  const [motionMode, setMotionMode] = useState<MotionMode>("static");
  const [sceneQuality, setSceneQuality] = useState<SceneQuality>("static");
  const [isCompactDevice, setIsCompactDevice] = useState(false);
  const [pendingMode, setPendingMode] = useState<ViewMode | null>(null);
  const webScrollRef = useRef(0);
  const sectionAtSwitchRef = useRef<PortfolioSectionId>(activeSection);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    );

    const update = () => {
      const reduced = media.matches;
      const supported = webGlAvailable();
      const compactDevice = compact.matches;
      setIsCompactDevice(compactDevice);
      setMotionMode(reduced || saveData || !supported ? "static" : compactDevice ? "reduced" : "full");
      setSceneQuality(reduced || saveData || !supported ? "static" : window.innerWidth >= 1024 ? "high" : "balanced");
    };

    update();
    media.addEventListener("change", update);
    compact.addEventListener("change", update);

    const stored = storedViewMode();
    if (stored) {
      queueMicrotask(() => setViewMode(stored));
      localStorage.setItem(VIEW_MODE_KEY, stored);
      localStorage.removeItem(LEGACY_VIEW_MODE_KEY);
    }

    const timers = timersRef.current;
    return () => {
      media.removeEventListener("change", update);
      compact.removeEventListener("change", update);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const updateTab = useCallback(
    (section: PortfolioSectionId) => {
      const params = new URLSearchParams(paramsString);
      if (section === "home") params.delete("tab");
      else params.set("tab", section);
      const query = params.toString();
      const hash = window.location.hash;
      const target = `${pathname}${query ? `?${query}` : ""}${hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (target !== current) router.replace(target, { scroll: false });
    },
    [paramsString, pathname, router]
  );

  const sectionForIphone = useCallback(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab ? sectionFromTab(tab) : activeSection;
  }, [activeSection]);

  const completeModeChange = useCallback(
    (mode: ViewMode) => {
      startTransition(() => setViewMode(mode));
      localStorage.setItem(VIEW_MODE_KEY, mode);
      if (mode === "iphone") {
        const targetSection = sectionForIphone();
        setActiveSectionState(targetSection);
        updateTab(targetSection);
      }

      const settleTimer = window.setTimeout(() => {
        setTransitionState("settling");
        if (mode === "web") {
          requestAnimationFrame(() => {
            if (sectionAtSwitchRef.current === activeSection && webScrollRef.current > 0) {
              window.scrollTo({ top: webScrollRef.current });
            } else {
              const anchor = activeSection === "home" ? "top" : activeSection;
              document.getElementById(anchor)?.scrollIntoView();
            }
          });
        }
      }, motionMode === "static" ? 80 : MORPH_DURATION_MS - 120);

      const endTimer = window.setTimeout(() => {
        setTransitionState("idle");
      }, motionMode === "static" ? 150 : MORPH_DURATION_MS);
      timersRef.current.push(settleTimer, endTimer);
    },
    [activeSection, motionMode, sectionForIphone, updateTab]
  );

  const requestViewMode = useCallback(
    (mode: ViewMode) => {
      if (mode === viewMode && transitionState === "idle") return;
      if (motionMode === "static") {
        if (viewMode === "web") webScrollRef.current = window.scrollY;
        sectionAtSwitchRef.current = activeSection;
        setViewMode(mode);
        localStorage.setItem(VIEW_MODE_KEY, mode);
        if (mode === "iphone") {
          const targetSection = sectionForIphone();
          setActiveSectionState(targetSection);
          updateTab(targetSection);
        }
        if (mode === "web") {
          requestAnimationFrame(() => {
            const anchor = activeSection === "home" ? "top" : activeSection;
            document.getElementById(anchor)?.scrollIntoView();
          });
        }
        return;
      }
      if (transitionState !== "idle") {
        setPendingMode(mode);
        return;
      }
      if (viewMode === "web") webScrollRef.current = window.scrollY;
      sectionAtSwitchRef.current = activeSection;
      setTransitionState("preparing");
      const timer = window.setTimeout(() => {
        setTransitionState("morphing");
        completeModeChange(mode);
      }, 120);
      timersRef.current.push(timer);
    },
    [activeSection, completeModeChange, motionMode, sectionForIphone, transitionState, updateTab, viewMode]
  );

  useEffect(() => {
    if (transitionState !== "idle" || !pendingMode) return;
    const nextMode = pendingMode;
    queueMicrotask(() => {
      setPendingMode(null);
      if (nextMode !== viewMode) requestViewMode(nextMode);
    });
  }, [pendingMode, requestViewMode, transitionState, viewMode]);

  const setActiveSection = useCallback((section: PortfolioSectionId) => {
    setActiveSectionState(section);
  }, []);

  const value = useMemo<PortfolioExperienceValue>(
    () => ({
      viewMode,
      activeSection,
      activeWorkId,
      transitionState,
      motionMode,
      sceneQuality,
      isCompactDevice,
      requestViewMode,
      setActiveSection,
      setActiveWork: setActiveWorkId,
    }),
    [
      activeSection,
      activeWorkId,
      isCompactDevice,
      motionMode,
      requestViewMode,
      sceneQuality,
      setActiveSection,
      transitionState,
      viewMode,
    ]
  );

  return (
    <PortfolioExperienceContext.Provider value={value}>
      {children}
    </PortfolioExperienceContext.Provider>
  );
}

export function usePortfolioExperience() {
  const value = useContext(PortfolioExperienceContext);
  if (!value) throw new Error("usePortfolioExperience must be used inside PortfolioExperienceProvider");
  return value;
}
