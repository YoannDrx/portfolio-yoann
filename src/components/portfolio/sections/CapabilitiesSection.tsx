"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Braces, Layers3, Smartphone, Sparkles } from "lucide-react";
import type { Capability, PortfolioContent } from "@/data/portfolio-content";
import { cn } from "@/lib/utils";
import { usePortfolioExperience } from "../PortfolioExperienceContext";

const capabilityIcons = {
  "react-native": Smartphone,
  "react-next": Layers3,
  architecture: Braces,
  "product-ux": Sparkles,
};

function CapabilityFlow({ capability, locale }: { capability: Capability; locale: "fr" | "en" }) {
  const labels = locale === "en"
    ? ["Need", "Architecture", "Components", "Tests", "Delivery"]
    : ["Besoin", "Architecture", "Composants", "Tests", "Livraison"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative grid grid-cols-5 gap-1" role="group" aria-label={locale === "en" ? "Delivery flow" : "Flux de livraison"}>
        <span className="absolute left-[8%] right-[8%] top-5 h-px bg-border" aria-hidden="true" />
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            className="relative z-10 flex min-h-20 flex-col items-center gap-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-pressed={active === index}
          >
            <span className={cn("flex size-10 items-center justify-center rounded-full border bg-background font-mono text-[10px] transition-colors", active === index ? "border-primary bg-primary text-white" : "border-border text-muted-foreground")}>
              0{index + 1}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-[10px]">{label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-2 min-h-12 border-l-2 border-primary/40 pl-4 text-sm leading-6 text-muted-foreground"
        >
          {active === 0 ? capability.summary : active < 4 ? capability.decisions[(active - 1) % capability.decisions.length] : capability.outcomes[0]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function CapabilitiesSection({ content }: { content: PortfolioContent }) {
  const { motionMode, setActiveWork } = usePortfolioExperience();
  const [activeCapability, setActiveCapability] = useState<Capability["id"]>("react-native");
  const active = content.capabilities.find((capability) => capability.id === activeCapability) ?? content.capabilities[0];

  const navigateToWork = (workId: Capability["proofWorkIds"][number]) => {
    setActiveWork(workId);
    const desktopTarget = document.getElementById(`featured-work-${workId}`);
    const mobileTarget = document.getElementById(`featured-work-mobile-${workId}`);
    (window.innerWidth >= 1024 ? desktopTarget : mobileTarget)?.scrollIntoView({ behavior: motionMode === "full" ? "smooth" : "auto", block: "center" });
  };

  return (
    <section id="skills" aria-labelledby="capabilities-title" className="relative z-10 overflow-hidden border-y border-border bg-[#F7F5EF]/96 px-5 py-20 dark:bg-slate-950/96 sm:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.9%,hsl(var(--border)/0.35)_50%,transparent_50.1%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{content.locale === "en" ? "Capabilities / Evidence" : "Compétences / Preuves"}</p>
          <h2 id="capabilities-title" className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">{content.copy.skillsTitle}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{content.skillStoryIntro}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div role="tablist" aria-label={content.locale === "en" ? "Capabilities" : "Compétences"} className="border-t border-border">
            {content.capabilities.map((capability, index) => {
              const Icon = capabilityIcons[capability.id];
              const selected = capability.id === active.id;
              return (
                <button
                  key={capability.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCapability(capability.id)}
                  className={cn("group flex min-h-24 w-full items-center gap-4 border-b border-border px-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", selected ? "bg-foreground text-background" : "hover:bg-muted/60")}
                >
                  <span className={cn("font-mono text-[10px]", selected ? "text-background/65" : "text-muted-foreground")}>0{index + 1}</span>
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className="font-display text-lg font-bold uppercase leading-tight">{capability.title}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={motionMode === "full" ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionMode === "full" ? { opacity: 0, y: -10 } : undefined}
              className="rounded-2xl border border-border bg-background/88 p-5 shadow-[0_28px_80px_-56px_hsl(var(--foreground)/0.55)] backdrop-blur sm:p-8"
            >
              <p className="max-w-2xl text-lg leading-8 text-foreground/85">{active.summary}</p>
              <div className="mt-8">
                <CapabilityFlow capability={active} locale={content.locale} />
              </div>
              <div className="mt-8 grid gap-6 border-t border-border pt-7 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{content.locale === "en" ? "Decisions" : "Décisions"}</h3>
                  <ul className="mt-4 space-y-3">
                    {active.decisions.map((decision) => <li key={decision} className="flex gap-3 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{decision}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{content.locale === "en" ? "Outcomes" : "Résultats"}</h3>
                  <ul className="mt-4 space-y-3">
                    {active.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />{outcome}</li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {active.proofWorkIds.map((workId) => {
                  const work = content.featuredWork.find((item) => item.id === workId);
                  return (
                    <button key={workId} type="button" onClick={() => navigateToWork(workId)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      {work?.title ?? workId}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
