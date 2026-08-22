"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import TouchIndicator from "@/components/TouchIndicator";
import { ViewModeControls } from "@/components/portfolio/ViewModeControls";
import { MotionBoundary } from "@/components/portfolio/MotionBoundary";
import {
  PortfolioExperienceProvider,
  usePortfolioExperience,
} from "@/components/portfolio/PortfolioExperienceContext";
import { PortfolioWebView } from "@/components/portfolio/PortfolioWebView";
import { ImmersiveSceneRoot } from "@/components/portfolio/immersive/ImmersiveSceneRoot";
import { getPortfolioContent } from "@/data/portfolio-content";
import { useI18n } from "@/i18n/I18nProvider";

const PortfolioApp = dynamic(() => import("@/components/PortfolioApp"), {
  ssr: false,
  loading: () => <div className="h-[720px] w-[350px] animate-pulse rounded-[3rem] bg-muted" />,
});

function DeviceMorphTransition() {
  const { motionMode, transitionState, viewMode } = usePortfolioExperience();
  const visible = transitionState !== "idle";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="device-morph"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center overflow-hidden bg-background/42 backdrop-blur-sm"
          initial={motionMode === "full" ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionMode === "full" ? 0.16 : 0.08 }}
        >
          <motion.div
            className="relative overflow-hidden border border-white/50 bg-background shadow-[0_50px_120px_-45px_hsl(var(--foreground)/0.65)] dark:border-white/10"
            initial={
              motionMode === "full"
                ? { width: "92vw", height: "82svh", borderRadius: 18, rotateY: 0, scale: 1 }
                : false
            }
            animate={
              viewMode === "iphone"
                ? { width: 350, height: 720, borderRadius: 52, rotateY: -2, scale: 0.98 }
                : { width: "92vw", height: "82svh", borderRadius: 18, rotateY: 0, scale: 1 }
            }
            exit={
              motionMode === "full"
                ? viewMode === "iphone"
                  ? { width: 350, height: 720, borderRadius: 52, rotateY: 0, opacity: 0 }
                  : { width: "96vw", height: "88svh", borderRadius: 12, opacity: 0 }
                : { opacity: 0 }
            }
            transition={{ duration: motionMode === "full" ? 0.73 : 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1300 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,hsl(var(--primary)/0.2),transparent_38%)]" />
            <div className="absolute inset-x-[10%] top-[14%] h-px bg-primary/30" />
            <div className="absolute bottom-[12%] left-[10%] font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              WEB ↔ IPHONE / PRODUCT CINEMA
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PortfolioExperience() {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const {
    isCompactDevice,
    motionMode,
    requestViewMode,
    transitionState,
    viewMode,
  } = usePortfolioExperience();

  return (
    <LayoutGroup id="portfolio-experience">
      <main
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-[#F7F5EF] to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950"
        data-view-transition-state={transitionState}
      >
        <TouchIndicator />
        <ImmersiveSceneRoot />

        <ViewModeControls
          mode={viewMode}
          onChange={requestViewMode}
          compact
          className="fixed left-1/2 top-[max(0.75rem,env(safe-area-inset-top))] z-[80] -translate-x-1/2 shadow-soft sm:left-auto sm:right-5 sm:top-5 sm:translate-x-0"
        />

        <DeviceMorphTransition />

        <AnimatePresence mode="wait" initial={false}>
          {viewMode === "web" ? (
            <motion.div
              key="web"
              layoutId="portfolio-live-surface"
              initial={motionMode === "full" ? { opacity: 0, scale: 0.992 } : { opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={motionMode === "full" ? { opacity: 0, scale: 0.985 } : { opacity: 0 }}
              transition={{ duration: motionMode === "full" ? 0.28 : 0.12 }}
            >
              <PortfolioWebView content={content} />
            </motion.div>
          ) : (
            <motion.div
              key="iphone"
              layoutId="portfolio-live-surface"
              className="relative z-10 flex min-h-[100svh] items-center justify-center px-0 py-0 md:px-6 md:py-8"
              initial={motionMode === "full" ? { opacity: 0, y: 22, rotateY: 2 } : { opacity: 0 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={motionMode === "full" ? { opacity: 0, y: 12, rotateY: -2 } : { opacity: 0 }}
              transition={{ duration: motionMode === "full" ? 0.38 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <div className="iphone-studio relative">
                <div className="absolute left-1/2 top-1/2 -z-10 hidden h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl md:block" />
                <PortfolioApp showFrame={!isCompactDevice} />
                <p className="mt-6 hidden text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground lg:block">
                  {locale === "en" ? "Swipe to navigate · Use the tabs" : "Faites glisser pour naviguer · Utilisez les onglets"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

export default function PortfolioPage() {
  return (
    <PortfolioExperienceProvider>
      <MotionBoundary>
        <PortfolioExperience />
      </MotionBoundary>
    </PortfolioExperienceProvider>
  );
}
