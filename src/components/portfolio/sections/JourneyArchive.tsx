"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ExperienceFilterBar } from "@/components/experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "@/components/experiences/ExperienceSectionHeader";
import { DEV_EXPERIENCE_TYPES, getExperienceTypeClasses, getExperienceTypeLabel, type Experience, type PortfolioContent } from "@/data";
import { useExperienceFilter, type ExperienceFilter } from "@/hooks/use-experience-filter";

export function JourneyArchive({
  content,
  onExperience,
}: {
  content: PortfolioContent;
  onExperience: (experience: Experience) => void;
}) {
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } = useExperienceFilter(content.experiences, "dev");
  const [preview, setPreview] = useState<Experience>(() =>
    content.experiences
      .filter((experience) => DEV_EXPERIENCE_TYPES.includes(experience.experienceType))
      .sort((a, b) => b.year.localeCompare(a.year))[0] ?? content.experiences[0]
  );

  const handleFilterChange = (filter: ExperienceFilter) => {
    setActiveFilter(filter);
    const matching = content.experiences
      .filter((experience) => {
        if (filter === "all") return true;
        if (filter === "dev") return DEV_EXPERIENCE_TYPES.includes(experience.experienceType);
        return experience.experienceType === filter;
      })
      .sort((a, b) => b.year.localeCompare(a.year));
    setPreview(matching[0] ?? content.experiences[0]);
  };

  return (
    <section id="experiences" aria-labelledby="journey-title" className="relative z-10 bg-background/96 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-border pb-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{content.copy.fullJourney}</p>
            <h2 id="journey-title" className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
              {content.locale === "en" ? "Everything behind the selection" : "Tout ce qui existe derrière la sélection"}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">{content.copy.fullJourneyIntro}</p>
        </div>

        <div className="mt-8">
          <ExperienceFilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} counts={counts} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.type}>
                {showSectionHeaders ? <ExperienceSectionHeader type={section.type} count={section.experiences.length} /> : null}
                <div className="border-t border-border">
                  {section.experiences.map((experience) => (
                    <button
                      key={experience.id}
                      type="button"
                      data-content-id={`journey-${experience.id}`}
                      onMouseEnter={() => setPreview(experience)}
                      onFocus={() => setPreview(experience)}
                      onClick={() => onExperience(experience)}
                      className="group grid min-h-[92px] w-full grid-cols-[3.4rem_1fr_auto] items-center gap-3 border-b border-border py-4 text-left transition-colors hover:bg-muted/45 focus-visible:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:grid-cols-[4.5rem_1fr_9rem_auto] sm:gap-5"
                    >
                      <span className="font-mono text-xs font-semibold text-muted-foreground">{experience.year}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-display text-lg font-bold uppercase tracking-[-0.02em] text-foreground sm:text-xl">{experience.name}</span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">{experience.category} · {experience.features.slice(0, 3).join(" · ")}</span>
                      </span>
                      <span className={`hidden w-fit rounded border px-2 py-1 font-mono text-[9px] uppercase sm:inline-flex ${getExperienceTypeClasses(experience.experienceType)}`}>
                        {getExperienceTypeLabel(experience.experienceType, content.locale)}
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="sticky top-24 hidden h-fit overflow-hidden rounded-2xl border border-border bg-card shadow-[0_28px_70px_-48px_hsl(var(--foreground)/0.5)] lg:block" aria-live="polite">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {preview.image ? <Image src={preview.image} alt="" fill className="object-cover object-top transition-opacity" sizes="380px" /> : (
                <div className={`absolute inset-0 bg-gradient-to-br ${preview.gradient} opacity-20`} />
              )}
            </div>
            <div className="p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">{preview.year} / {preview.category}</p>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase">{preview.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{preview.description}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
