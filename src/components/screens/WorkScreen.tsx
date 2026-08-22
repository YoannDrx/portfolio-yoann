"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ExperienceDetailPanel } from "@/components/experiences/ExperienceDetailPanel";
import { ExperienceFilterBar } from "@/components/experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "@/components/experiences/ExperienceSectionHeader";
import { IOSNavigationBar } from "@/components/ios";
import { usePortfolioExperience } from "@/components/portfolio/PortfolioExperienceContext";
import { getExperienceTypeClasses, getExperienceTypeLabel, getPortfolioContent, type Experience } from "@/data";
import { useExperienceFilter } from "@/hooks/use-experience-filter";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import StatusBar from "../device/StatusBar";

type WorkScreenProps = { hideStatusBar?: boolean };

export default function WorkScreen({ hideStatusBar = false }: WorkScreenProps) {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const { activeWorkId, motionMode, setActiveWork } = usePortfolioExperience();
  const [view, setView] = useState<"selection" | "journey">("selection");
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } = useExperienceFilter(content.experiences, "dev");

  if (selectedExperience) {
    return (
      <motion.div layoutId={`iphone-work-${activeWorkId}`} className="h-full overflow-y-auto bg-background pb-28">
        <button type="button" onClick={() => setSelectedExperience(null)} className="sticky left-3 top-3 z-30 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background/95 px-3 text-sm font-semibold shadow-sm backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {locale === "en" ? "Back" : "Retour"}
        </button>
        <ExperienceDetailPanel experience={selectedExperience} />
      </motion.div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {!hideStatusBar ? <StatusBar /> : null}
      <div className="flex-1 overflow-y-auto pb-32">
        <IOSNavigationBar title={locale === "en" ? "Work" : "Projets"} subtitle={content.copy.featuredIntro} />

        <div className="mx-5 mb-5 grid grid-cols-2 rounded-lg border border-border p-1" role="tablist" aria-label={locale === "en" ? "Work view" : "Vue des projets"}>
          {(["selection", "journey"] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={view === item} onClick={() => setView(item)} className={cn("relative min-h-10 rounded-md px-3 text-xs font-semibold transition-colors", view === item ? "text-background" : "text-muted-foreground")}>
              {view === item ? <motion.span layoutId="iphone-work-view" className="absolute inset-0 -z-10 rounded-md bg-foreground" /> : null}
              {item === "selection" ? content.copy.selection : content.copy.journey}
            </button>
          ))}
        </div>

        {view === "selection" ? (
          <div className="space-y-5 px-5" data-content-id="iphone-selection">
            {content.featuredWork.map((work, index) => {
              const card = (
                <motion.div layoutId={`iphone-work-${work.id}`} className="overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm">
                  <div className="relative h-36 overflow-hidden border-b border-border bg-muted">
                    <Image src={work.media.primary} alt="" fill className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]" sizes="353px" />
                    <span className="absolute left-3 top-3 bg-foreground px-2 py-1 font-mono text-[9px] font-bold text-background">0{index + 1} / {work.presentation.toUpperCase()}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">{work.category}</p>
                    <h2 className="mt-2 font-display text-2xl font-bold uppercase">{work.title}</h2>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">{work.summary}</p>
                    <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                      <div><p className="font-mono text-lg font-bold" style={{ color: work.accent }}>{work.proof.value}</p><p className="text-[9px] text-muted-foreground">{work.proof.label}</p></div>
                      <ArrowUpRight className="size-5 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              );

              if (work.destination.type === "route") {
                return <Link key={work.id} href={`/${locale}/projects/${work.destination.slug}`} onClick={() => setActiveWork(work.id)} data-content-id={`featured-${work.id}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{card}</Link>;
              }

              const experienceId = work.destination.experienceId;
              const experience = content.experiences.find((item) => item.id === experienceId);
              return (
                <button key={work.id} type="button" onClick={() => { setActiveWork(work.id); if (experience) setSelectedExperience(experience); }} data-content-id={`featured-${work.id}`} className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {card}
                </button>
              );
            })}
          </div>
        ) : (
          <div data-content-id="complete-journey">
            <ExperienceFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} counts={counts} compact />
            <div className="mt-4">
              {sections.map((section) => (
                <div key={section.type}>
                  {showSectionHeaders ? <ExperienceSectionHeader type={section.type} count={section.experiences.length} compact /> : null}
                  <div className="mx-5 overflow-hidden rounded-xl border border-border">
                    {section.experiences.map((experience) => (
                      <button key={experience.id} data-content-id={`journey-${experience.id}`} type="button" onClick={() => setSelectedExperience(experience)} className="block w-full border-b border-border p-4 text-left last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                        <div className="flex items-center justify-between gap-3">
                          <span className={`rounded-sm border px-2 py-0.5 font-mono text-[8px] uppercase ${getExperienceTypeClasses(experience.experienceType)}`}>{getExperienceTypeLabel(experience.experienceType, locale)}</span>
                          <span className="font-mono text-[9px] text-muted-foreground">{experience.year}</span>
                        </div>
                        <h2 className="mt-3 font-display text-xl font-bold uppercase">{experience.name}</h2>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{experience.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
