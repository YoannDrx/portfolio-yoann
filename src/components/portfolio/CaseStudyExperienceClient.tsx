"use client";

import { useEffect, useState } from "react";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";

const sections = [
  "evidence-title",
  "context-title",
  "constraints-title",
  "decisions-title",
  "architecture-title",
  "stack-title",
  "quality",
  "retrospective",
];

export function CaseStudyExperienceClient() {
  const { locale } = useI18n();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const maximum = root.scrollHeight - window.innerHeight;
      setProgress(maximum <= 0 ? 0 : Math.min(1, window.scrollY / maximum));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed right-3 top-3 z-50 flex items-center rounded-full border border-white/60 bg-background/86 p-1.5 shadow-soft backdrop-blur-2xl dark:border-white/10">
        <LocaleToggle className="min-h-11 min-w-11 px-2" />
        <ThemeToggle className="min-h-11 min-w-11 px-2" />
      </div>
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent" aria-hidden="true">
        <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
        aria-label={locale === "en" ? "Case study contents" : "Sommaire de l’étude de cas"}
      >
        {sections.map((id, index) => (
          <a key={id} href={`#${id}`} className="group flex min-h-8 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <span className="size-1.5 rounded-full bg-slate-400 transition-transform group-hover:scale-150 group-hover:bg-primary" />
            <span className="sr-only">{locale === "en" ? "Section" : "Section"} {index + 1}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
