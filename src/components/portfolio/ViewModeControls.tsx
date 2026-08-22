"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/data/portfolio-content";

type ViewModeControlsProps = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  compact?: boolean;
  className?: string;
};

export function ViewModeControls({
  mode,
  onChange,
  compact = false,
  className,
}: ViewModeControlsProps) {
  const pointerStartRef = useRef<number | null>(null);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIdle(true), 4500);
    return () => window.clearTimeout(timer);
  }, [mode]);

  return (
    <motion.div
      layoutRoot
      className={cn(
        "flex items-center gap-0.5 border border-white/60 bg-background/80 p-1.5 shadow-[0_12px_40px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-2xl transition-opacity dark:border-white/10 dark:bg-card/80",
        compact ? "rounded-full" : "rounded-2xl",
        idle && "opacity-75 hover:opacity-100 focus-within:opacity-100",
        className
      )}
      aria-label="Mode d’affichage"
      role="group"
      onPointerEnter={() => setIdle(false)}
      onPointerLeave={() => setIdle(true)}
      onPointerDown={(event) => { pointerStartRef.current = event.clientX; setIdle(false); }}
      onPointerUp={(event) => {
        if (pointerStartRef.current === null) return;
        const delta = event.clientX - pointerStartRef.current;
        pointerStartRef.current = null;
        if (Math.abs(delta) < 28) return;
        onChange(delta > 0 ? "iphone" : "web");
      }}
    >
      <LayoutGroup id="view-mode-control">
      {(["web", "iphone"] as const).map((view) => {
        const active = mode === view;
        const Icon = view === "web" ? Monitor : Smartphone;
        return (
          <motion.button
            key={view}
            layout
            type="button"
            onClick={() => onChange(view)}
            className={cn(
              "relative isolate inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              active
                ? "text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
            aria-pressed={active}
          >
            {active ? (
              <motion.span
                layoutId="view-mode-active-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_6px_16px_-8px_hsl(var(--primary)/0.8)]"
                transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
              />
            ) : null}
            <Icon className="size-4" aria-hidden="true" />
            <span className={compact ? "sr-only sm:not-sr-only" : undefined}>
              {view === "web" ? "Web" : "iPhone"}
            </span>
          </motion.button>
        );
      })}
      </LayoutGroup>
      <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
      <LocaleToggle className="min-h-11 min-w-11 px-2" />
      <ThemeToggle className="min-h-11 min-w-11 px-2" />
    </motion.div>
  );
}
