"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { getPortfolioContent, type PortfolioSceneId } from "@/data/portfolio-content";
import { useI18n } from "@/i18n/I18nProvider";
import { usePortfolioExperience } from "../PortfolioExperienceContext";

const ImmersiveCanvas = dynamic(() => import("./ImmersiveCanvas"), { ssr: false });

type WebGlState = "loading" | "ready" | "fallback" | "lost";

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function sceneForState(
  viewMode: "web" | "iphone",
  visibleScene: PortfolioSceneId | null,
  transitioning: boolean
): PortfolioSceneId {
  if (transitioning || viewMode === "iphone") return "mode-transition";
  return visibleScene ?? "hero";
}

export function ImmersiveSceneRoot() {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const {
    activeWorkId,
    motionMode,
    sceneQuality,
    transitionState,
    viewMode,
  } = usePortfolioExperience();
  const [canLoad, setCanLoad] = useState(false);
  const [webGlState, setWebGlState] = useState<WebGlState>("loading");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [visibleScene, setVisibleScene] = useState<PortfolioSceneId | null>("hero");
  const frameRef = useRef<number | null>(null);
  const activeScene = sceneForState(viewMode, visibleScene, transitionState !== "idle");
  const activeWork = useMemo(
    () => content.featuredWork.find((work) => work.id === activeWorkId) ?? content.featuredWork[0],
    [activeWorkId, content.featuredWork]
  );

  useEffect(() => {
    if (viewMode !== "web") return;
    const targets: Array<[string, PortfolioSceneId]> = [
      ["top", "hero"],
      ["work", "showreel"],
      ["resume", "career"],
    ];
    const visibility = new Map<PortfolioSceneId, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const scene = targets.find(([id]) => id === entry.target.id)?.[1];
          if (scene) visibility.set(scene, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        const next = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0];
        setVisibleScene(next && next[1] > 0.04 ? next[0] : null);
      },
      { threshold: [0, 0.05, 0.2, 0.5] }
    );
    targets.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [viewMode]);

  useEffect(() => {
    if (sceneQuality === "static") return;
    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 900));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = schedule(() => setCanLoad(true), { timeout: 1600 });
    return () => cancel(id);
  }, [sceneQuality]);

  useEffect(() => {
    const sceneIsVisible = viewMode === "iphone" || visibleScene !== null || transitionState !== "idle";
    if (motionMode !== "full" || !sceneIsVisible || document.hidden) return;
    const onPointerMove = (event: PointerEvent) => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        setPointer({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * -2,
        });
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [motionMode, transitionState, viewMode, visibleScene]);

  const effectiveWebGlState = sceneQuality === "static" ? "fallback" : webGlState;
  const showCanvas = canLoad && sceneQuality !== "static" && effectiveWebGlState !== "fallback" && effectiveWebGlState !== "lost";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-300"
      style={{
        opacity: viewMode === "web" && visibleScene === null
          ? 0
          : activeScene === "showreel"
            ? 0.1
            : 1,
      }}
      data-scene-quality={sceneQuality}
      data-scene-active={activeScene}
      data-webgl-state={effectiveWebGlState}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,hsl(var(--primary)/0.08),transparent_34%)]" />
      {showCanvas ? (
        <SceneErrorBoundary onError={() => setWebGlState("fallback")}>
          <ImmersiveCanvas
            activeScene={activeScene}
            activeWork={activeWork}
            pointer={pointer}
            quality={sceneQuality}
            onReady={() => setWebGlState("ready")}
            onContextLost={() => setWebGlState("lost")}
          />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
