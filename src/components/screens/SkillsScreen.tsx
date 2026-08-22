"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Braces, Layers3, Smartphone, Sparkles } from "lucide-react";
import { IOSNavigationBar } from "@/components/ios";
import { getPortfolioContent, type Capability } from "@/data/portfolio-content";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import StatusBar from "../device/StatusBar";

const icons = { "react-native": Smartphone, "react-next": Layers3, architecture: Braces, "product-ux": Sparkles };

export default function SkillsScreen({ hideStatusBar = false }: { hideStatusBar?: boolean }) {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const [activeId, setActiveId] = useState<Capability["id"]>("react-native");
  const active = content.capabilities.find((capability) => capability.id === activeId) ?? content.capabilities[0];
  const Icon = icons[active.id];

  return (
    <div className="flex h-full flex-col bg-background">
      {!hideStatusBar ? <StatusBar /> : null}
      <div className="flex-1 overflow-y-auto pb-32">
        <IOSNavigationBar title={locale === "en" ? "Skills" : "Compétences"} subtitle={content.copy.skillsTitle} />
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-5 pb-4" role="tablist" aria-label={locale === "en" ? "Capabilities" : "Compétences"}>
          {content.capabilities.map((capability) => (
            <button key={capability.id} type="button" role="tab" aria-selected={activeId === capability.id} onClick={() => setActiveId(capability.id)} className={cn("min-h-11 shrink-0 rounded-full border px-4 text-xs font-semibold", activeId === capability.id ? "border-primary bg-primary text-white" : "border-border text-muted-foreground")}>
              {capability.title}
            </button>
          ))}
        </div>

        <div className="px-5">
          <AnimatePresence mode="wait">
            <motion.article key={active.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border p-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-6" /></div>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight">{active.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{active.summary}</p>
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2">
                <div className="bg-card p-5"><h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "en" ? "Decisions" : "Décisions"}</h3><ul className="mt-4 space-y-3">{active.decisions.map((item) => <li key={item} className="flex gap-2 text-xs leading-5"><span className="mt-2 size-1 rounded-full bg-primary" />{item}</li>)}</ul></div>
                <div className="bg-card p-5"><h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "en" ? "Outcomes" : "Résultats"}</h3><ul className="mt-4 space-y-3">{active.outcomes.map((item) => <li key={item} className="flex gap-2 text-xs leading-5"><span className="mt-2 size-1 rounded-full bg-emerald-500" />{item}</li>)}</ul></div>
              </div>
              <div className="p-5"><h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "en" ? "Evidence" : "Preuves"}</h3><div className="mt-3 flex flex-wrap gap-2">{active.proofWorkIds.map((id) => <span key={id} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">{content.featuredWork.find((work) => work.id === id)?.title}</span>)}</div></div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
