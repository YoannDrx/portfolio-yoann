"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import TouchIndicator from "@/components/TouchIndicator";
import PortfolioApp from "@/components/PortfolioApp";
import { ViewModeControls } from "@/components/portfolio/ViewModeControls";
import { ImmersiveWebView } from "@/components/portfolio/v2/ImmersiveWebView";
import type { ViewMode } from "@/data/portfolio-content";
import { trackPortfolioEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const VIEW_MODE_KEY = "portfolio-view-mode-v2";
const LEGACY_VIEW_MODE_KEY = "portfolio-view-mode";

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("web");
  const [isCompactDevice, setIsCompactDevice] = useState(false);
  const [isModeResolved, setIsModeResolved] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<ViewMode | null>(null);
  const savedWebScrollRef = useRef(0);
  const previousRootOverflowRef = useRef<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const writeModeToUrl = useCallback((mode: ViewMode) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("mode", mode);
    window.history.replaceState(window.history.state, "", nextUrl);
  }, []);

  const lockWebPosition = useCallback(() => {
    if (previousRootOverflowRef.current !== null) return;
    savedWebScrollRef.current = window.scrollY;
    previousRootOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlockWebPosition = useCallback(() => {
    const previous = previousRootOverflowRef.current;
    if (previous === null) return;
    const savedTop = savedWebScrollRef.current;
    document.documentElement.style.overflow = previous;
    previousRootOverflowRef.current = null;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const restore = () => window.scrollTo({ top: savedTop, left: 0, behavior: "auto" });
    restore();
    window.requestAnimationFrame(() => {
      restore();
      window.requestAnimationFrame(() => {
        restore();
        root.style.scrollBehavior = previousScrollBehavior;
      });
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const query = window.matchMedia("(max-width: 767px)");
    const updateCompactState = () => setIsCompactDevice(query.matches);
    updateCompactState();
    query.addEventListener("change", updateCompactState);

    const urlMode = new URLSearchParams(window.location.search).get("mode");
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    const legacy = localStorage.getItem(LEGACY_VIEW_MODE_KEY);
    const resolved: ViewMode =
      urlMode === "iphone" || urlMode === "web"
        ? urlMode
        : stored === "iphone" || stored === "web"
          ? stored
          : legacy === "device"
            ? "iphone"
            : legacy === "web"
              ? "web"
              : query.matches
                ? "iphone"
                : "web";

    queueMicrotask(() => {
      if (cancelled) return;
      setViewMode(resolved);
      setIsModeResolved(true);
      if (resolved === "iphone" && !query.matches) lockWebPosition();
    });
    localStorage.setItem(VIEW_MODE_KEY, resolved);
    localStorage.removeItem(LEGACY_VIEW_MODE_KEY);

    return () => {
      cancelled = true;
      query.removeEventListener("change", updateCompactState);
    };
  }, [lockWebPosition]);

  useEffect(() => () => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    unlockWebPosition();
  }, [unlockWebPosition]);

  const handleViewModeChange = useCallback((mode: ViewMode, trigger: "toggle" | "scroll" = "toggle") => {
    if (mode === viewMode || transitionTarget) return;
    if (viewMode === "web" && !isCompactDevice) lockWebPosition();

    setTransitionTarget(mode);
    // Keep both surfaces mounted one frame beyond the CSS fade so the browser
    // cannot cut the final transition frame while resolving the new mode.
    const duration = shouldReduceMotion ? 180 : 400;
    transitionTimerRef.current = window.setTimeout(() => {
      setViewMode(mode);
      localStorage.setItem(VIEW_MODE_KEY, mode);
      writeModeToUrl(mode);
      trackPortfolioEvent("view_mode_changed", { source: viewMode, destination: mode, trigger });
      if (mode === "web") unlockWebPosition();
      setTransitionTarget(null);
    }, duration);
  }, [isCompactDevice, lockWebPosition, shouldReduceMotion, transitionTarget, unlockWebPosition, viewMode, writeModeToUrl]);

  const isTransitioning = transitionTarget !== null;
  const webShown = isModeResolved && (transitionTarget ? transitionTarget === "web" : viewMode === "web");
  const iphoneShown = isModeResolved && (transitionTarget ? transitionTarget === "iphone" : viewMode === "iphone");
  const keepWebMounted = isModeResolved && (viewMode === "web" || isTransitioning);
  const keepIphoneMounted = isModeResolved && (viewMode === "iphone" || isTransitioning);
  const controlsAtRight = transitionTarget ? transitionTarget === "iphone" : viewMode === "iphone";

  return (
    <main className="min-h-screen overflow-x-clip bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <TouchIndicator />
      {isModeResolved ? (
        <div className="pointer-events-none fixed inset-x-0 top-3 z-[90] grid px-3 sm:top-5 sm:px-6">
          <motion.div
            layout="position"
            className={cn("pointer-events-auto w-fit", controlsAtRight ? "justify-self-end" : "justify-self-center")}
            transition={shouldReduceMotion ? { duration: 0.16 } : { type: "spring", stiffness: 360, damping: 34, mass: 0.8 }}
          >
            <ViewModeControls
              mode={transitionTarget ?? viewMode}
              onChange={(mode) => handleViewModeChange(mode, "toggle")}
              compact
              className="shadow-soft"
            />
          </motion.div>
        </div>
      ) : null}

      {!isModeResolved ? <div className="min-h-[100svh] bg-background" /> : null}

      <div
        data-view-surface="web"
        aria-hidden={!webShown}
        inert={!webShown}
        style={{
          transitionDuration: shouldReduceMotion ? "150ms" : "360ms",
          transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
        }}
        className={cn(
          "min-h-screen transition-opacity",
          webShown ? "visible opacity-100" : keepWebMounted ? "visible pointer-events-none opacity-0" : "invisible pointer-events-none opacity-0"
        )}
      >
        <ImmersiveWebView onEnterIphone={() => handleViewModeChange("iphone", "scroll")} />
      </div>

      <div
        data-view-surface="iphone"
        aria-hidden={!iphoneShown}
        inert={!iphoneShown}
        style={{
          transitionDuration: shouldReduceMotion ? "150ms" : "360ms",
          transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
        }}
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity md:px-4 md:py-8",
          iphoneShown ? "visible opacity-100" : keepIphoneMounted ? "visible pointer-events-none opacity-0" : "invisible pointer-events-none opacity-0"
        )}
      >
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/18 blur-3xl" />
          {isModeResolved ? <PortfolioApp showFrame={!isCompactDevice} /> : null}
        </div>
      </div>

    </main>
  );
}
