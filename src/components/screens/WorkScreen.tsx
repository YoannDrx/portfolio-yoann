"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const content = useMemo(() => getPortfolioContent(locale), [locale]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"selection" | "journey">("selection");
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } =
    useExperienceFilter(content.experiences, "dev");

  const selectedExperience = content.experiences.find(
    (item) => item.id === (selectedExperienceId ?? searchParams.get("project"))
  ) ?? null;

  const openExperience = (experience: Experience) => {
    setSelectedExperienceId(experience.id);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", "iphone");
    params.set("tab", "work");
    params.set("project", experience.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeExperience = () => {
    setSelectedExperienceId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("project");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (selectedExperience) {
    return (
      <div className="phone-canvas h-full overflow-y-auto pb-28">
        <button
          type="button"
          onClick={closeExperience}
          className="sticky left-3 top-3 z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/70 bg-background/75 px-4 text-sm font-semibold shadow-lg backdrop-blur-2xl dark:border-white/10"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {locale === "en" ? "Back" : "Retour"}
        </button>
        <ExperienceDetailPanel experience={selectedExperience} />
      </div>
    );
  }

  return (
    <div className="phone-canvas flex h-full flex-col bg-background">
      {!hideStatusBar ? <StatusBar /> : null}
      <div className="flex-1 overflow-y-auto pb-32">
        <IOSNavigationBar
          title={locale === "en" ? "Work" : "Projets"}
          subtitle={content.copy.featuredIntro}
        />

        <div className="phone-surface mx-5 mb-6 grid grid-cols-2 rounded-[22px] p-1.5" role="tablist" aria-label={locale === "en" ? "Work view" : "Vue des projets"}>
          {(["selection", "journey"] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={view === item}
              onClick={() => setView(item)}
              className={cn(
                "min-h-10 rounded-[17px] px-3 text-xs font-semibold transition-all",
                view === item ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"
              )}
            >
              {item === "selection" ? content.copy.selection : content.copy.journey}
            </button>
          ))}
        </div>

        {view === "selection" ? (
          <div className="space-y-4 px-5" data-content-id="iphone-selection">
            {content.featuredWork.map((work, index) => {
              const card = (
                <>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <Image src={work.media.primary} alt="" fill className="object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.025]" sizes="353px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {work.media.gallery && work.media.gallery.length > 1 ? <div className="absolute bottom-3 right-3 flex gap-1.5">{work.media.gallery.slice(1, 3).map((src) => <span key={src} className="relative block aspect-[4/3] w-14 overflow-hidden rounded-lg border border-white/45 bg-black shadow-lg"><Image src={src} alt="" fill className="object-cover object-top" sizes="56px" /></span>)}</div> : null}
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wide text-white backdrop-blur-xl">0{index + 1} / {work.presentation}</span>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-primary">{work.category}</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">{work.title}</h2>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">{work.summary}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3"><span className="font-mono text-[8px] uppercase tracking-wide text-foreground/65">{work.proof.value} · {work.proof.label}</span><ArrowUpRight className="size-4 text-primary" /></div>
                  </div>
                </>
              );

              if (work.destination.type === "route") {
                return <Link key={work.id} href={`/${locale}/projects/${work.destination.slug}`} data-content-id={`featured-${work.id}`} className="phone-surface group block overflow-hidden rounded-[30px] text-left outline-none focus-visible:ring-2 focus-visible:ring-primary">{card}</Link>;
              }

              const experienceId = work.destination.experienceId;
              const experience = content.experiences.find((item) => item.id === experienceId);
              return <button key={work.id} type="button" disabled={!experience} onClick={() => experience && openExperience(experience)} data-content-id={`featured-${work.id}`} className="phone-surface group w-full overflow-hidden rounded-[30px] text-left outline-none focus-visible:ring-2 focus-visible:ring-primary">{card}</button>;
            })}
          </div>
        ) : (
          <div data-content-id="complete-journey">
            <div className="mx-5 mb-4">
              <Link href={`/${locale}/projects/pressay`} data-content-id="journey-pressay" className="flex min-h-20 items-center justify-between rounded-[22px] border border-primary/20 bg-primary/[0.055] p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span><span className="font-mono text-[8px] font-bold uppercase tracking-wide text-primary">2026 · {locale === "en" ? "Independent case study" : "Étude de cas indépendante"}</span><strong className="mt-1 block text-lg">Pressay</strong></span><ArrowUpRight className="size-5 text-primary" />
              </Link>
            </div>
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
                        onClick={() => openExperience(experience)}
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
