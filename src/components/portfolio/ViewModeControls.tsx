"use client";

import { Monitor, Smartphone } from "lucide-react";
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
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 border border-white/60 bg-background/80 p-1.5 shadow-[0_12px_40px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-card/80",
        compact ? "rounded-full" : "rounded-2xl",
        className
      )}
      aria-label="Mode d’affichage"
      role="group"
    >
      {(["web", "iphone"] as const).map((view) => {
        const active = mode === view;
        const Icon = view === "web" ? Monitor : Smartphone;
        return (
          <button
            key={view}
            type="button"
            onClick={() => onChange(view)}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              active
                ? "bg-primary text-primary-foreground shadow-[0_6px_16px_-8px_hsl(var(--primary)/0.8)]"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
            aria-pressed={active}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className={compact ? "sr-only sm:not-sr-only" : undefined}>
              {view === "web" ? "Web" : "iPhone"}
            </span>
          </button>
        );
      })}
      <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
      <LocaleToggle className="min-h-11 min-w-11 px-2" />
      <ThemeToggle className="min-h-11 min-w-11 px-2" />
    </div>
  );
}
