"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ExperienceDetailPanel } from "@/components/experiences/ExperienceDetailPanel";
import { ExperienceFilterBar } from "@/components/experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "@/components/experiences/ExperienceSectionHeader";
import { IOSNavigationBar } from "@/components/ios";
import {
  getExperienceTypeClasses,
  getExperienceTypeLabel,
  getPortfolioContent,
  type Experience,
} from "@/data";
import { useExperienceFilter } from "@/hooks/use-experience-filter";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import StatusBar from "../device/StatusBar";

type WorkScreenProps = {
  hideStatusBar?: boolean;
};

export default function WorkScreen({ hideStatusBar = false }: WorkScreenProps) {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const [view, setView] = useState<"selection" | "journey">("selection");
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } =
    useExperienceFilter(content.experiences, "dev");

  if (selectedExperience) {
    return (
      <div className="h-full overflow-y-auto bg-background pb-28">
        <button
          type="button"
          onClick={() => setSelectedExperience(null)}
          className="sticky left-3 top-3 z-30 inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background/95 px-3 text-sm font-semibold shadow-sm backdrop-blur"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {locale === "en" ? "Back" : "Retour"}
        </button>
        <ExperienceDetailPanel experience={selectedExperience} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {!hideStatusBar ? <StatusBar /> : null}
      <div className="flex-1 overflow-y-auto pb-32">
        <IOSNavigationBar
          title={locale === "en" ? "Work" : "Projets"}
          subtitle={content.copy.featuredIntro}
        />

        <div className="mx-5 mb-5 grid grid-cols-2 rounded-md border border-border p-1" role="tablist" aria-label={locale === "en" ? "Work view" : "Vue des projets"}>
          {(["selection", "journey"] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={view === item}
              onClick={() => setView(item)}
              className={cn(
                "min-h-10 rounded px-3 text-xs font-semibold transition-colors",
                view === item ? "bg-foreground text-background" : "text-muted-foreground"
              )}
            >
              {item === "selection" ? content.copy.selection : content.copy.journey}
            </button>
          ))}
        </div>

        {view === "selection" ? (
          <div className="space-y-4 px-5" data-content-id="iphone-selection">
            {content.featuredMobile.map((experience, index) => (
              <button
                key={experience.id}
                type="button"
                onClick={() => setSelectedExperience(experience)}
                data-content-id={`featured-${experience.name.toLowerCase()}`}
                className="w-full overflow-hidden rounded-md border border-border bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-32 overflow-hidden border-b border-border bg-muted">
                  {experience.image ? (
                    <Image
                      src={experience.image}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="353px"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 bg-foreground px-2 py-1 font-mono text-[9px] text-background">
                    0{index + 1} / MOBILE
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">{experience.category}</p>
                  <h2 className="mt-2 text-2xl font-bold uppercase">{experience.name}</h2>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{experience.description}</p>
                  <p className="mt-3 font-mono text-[8px] uppercase tracking-wide text-foreground/65">
                    {experience.features.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </button>
            ))}

            {content.caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/${locale}/projects/${study.slug}`}
                data-content-id={`featured-${study.slug}`}
                className="block overflow-hidden rounded-md border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-32 overflow-hidden border-b border-border bg-muted">
                  <Image src={study.image} alt="" fill className="object-cover object-top" sizes="353px" />
                  <span className="absolute left-3 top-3 bg-foreground px-2 py-1 font-mono text-[9px] text-background">
                    0{index + 3} / CASE
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary">{study.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-bold uppercase">{study.name}</h2>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{study.tagline}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div data-content-id="complete-journey">
            <ExperienceFilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
              compact
            />
            <div className="mt-3">
              {sections.map((section) => (
                <div key={section.type}>
                  {showSectionHeaders ? (
                    <ExperienceSectionHeader type={section.type} count={section.experiences.length} compact />
                  ) : null}
                  <div className="mx-5 overflow-hidden rounded-md border border-border">
                    {section.experiences.map((experience) => (
                      <button
                        key={experience.id}
                        data-content-id={`journey-${experience.id}`}
                        type="button"
                        onClick={() => setSelectedExperience(experience)}
                        className="block w-full border-b border-border p-4 text-left last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={`rounded-sm border px-2 py-0.5 font-mono text-[8px] uppercase ${getExperienceTypeClasses(experience.experienceType)}`}>
                            {getExperienceTypeLabel(experience.experienceType, locale)}
                          </span>
                          <span className="font-mono text-[9px] text-muted-foreground">{experience.year}</span>
                        </div>
                        <h2 className="mt-3 text-xl font-bold uppercase">{experience.name}</h2>
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
