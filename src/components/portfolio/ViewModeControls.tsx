"use client";

import { motion } from "motion/react";
import { Monitor, Smartphone } from "lucide-react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/data/portfolio-content";
import { useI18n } from "@/i18n/I18nProvider";

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
  const { locale } = useI18n();
  const anchors = locale === "en"
    ? [["projects", "Selected"], ["skills", "Skills"], ["work", "Universe"], ["resume", "Journey"], ["contact", "Contact"]]
    : [["projects", "Sélection"], ["skills", "Compétences"], ["work", "Univers"], ["resume", "Parcours"], ["contact", "Contact"]];

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 border border-white/70 bg-background/70 p-1.5 shadow-[0_12px_40px_-18px_hsl(var(--foreground)/0.45)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-card/70",
        compact ? "rounded-full" : "rounded-2xl",
        className
      )}
      aria-label="Mode d’affichage"
      role="group"
    >
      {mode === "web" ? (
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={locale === "en" ? "Main sections" : "Sections principales"}>
          {anchors.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/65 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              {label}
            </a>
          ))}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        </nav>
      ) : null}
      {(["web", "iphone"] as const).map((view) => {
        const active = mode === view;
        const Icon = view === "web" ? Monitor : Smartphone;
        return (
          <button
            key={view}
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
            {active ? <motion.span layoutId="view-mode-active" className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_6px_16px_-8px_hsl(var(--primary)/0.8)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
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
