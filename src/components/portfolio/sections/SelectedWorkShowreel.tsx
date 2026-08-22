"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Experience, PortfolioContent } from "@/data";
import type { FeaturedWorkItem } from "@/data/portfolio-content";
import { cn } from "@/lib/utils";
import { usePortfolioExperience } from "../PortfolioExperienceContext";

function destinationExperience(item: FeaturedWorkItem, experiences: Experience[]) {
  if (item.destination.type !== "panel") return undefined;
  const experienceId = item.destination.experienceId;
  return experiences.find((experience) => experience.id === experienceId);
}

function WorkAction({
  item,
  locale,
  experience,
  onExperience,
}: {
  item: FeaturedWorkItem;
  locale: "fr" | "en";
  experience?: Experience;
  onExperience: (experience: Experience) => void;
}) {
  const content = item.destination.type === "route"
    ? locale === "en" ? "Read the case study" : "Lire l’étude de cas"
    : locale === "en" ? "Open the experience" : "Ouvrir l’expérience";

  if (item.destination.type === "route") {
    return (
      <Link
        href={`/${locale}/projects/${item.destination.slug}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (experience) onExperience(experience);
      }}
      disabled={!experience}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {content}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </button>
  );
}

function WorkStory({ item, index, locale }: { item: FeaturedWorkItem; index: number; locale: "fr" | "en" }) {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        <span style={{ color: item.accent }}>0{index + 1}</span>
        <span>{item.category}</span>
      </div>
      <div>
        <h3 className="font-display text-4xl font-bold uppercase tracking-[-0.045em] text-foreground sm:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{item.summary}</p>
      </div>
      <dl className="grid gap-4 border-y border-border/80 py-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {[
          [locale === "en" ? "Constraint" : "Contrainte", item.constraint],
          [locale === "en" ? "Decision" : "Décision", item.decision],
          [locale === "en" ? "Impact" : "Impact", item.impact],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-2 text-xs leading-5 text-foreground/78">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-3xl font-bold tracking-tight" style={{ color: item.accent }}>
            {item.proof.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{item.proof.label}</p>
        </div>
      </div>
    </div>
  );
}

export function SelectedWorkShowreel({
  content,
  onExperience,
}: {
  content: PortfolioContent;
  onExperience: (experience: Experience) => void;
}) {
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const { activeWorkId, motionMode, setActiveWork } = usePortfolioExperience();
  const activeIndex = Math.max(0, content.featuredWork.findIndex((work) => work.id === activeWorkId));
  const activeWork = content.featuredWork[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        const workId = activeEntry?.target.getAttribute("data-work-id") as FeaturedWorkItem["id"] | undefined;
        if (workId) setActiveWork(workId);
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 }
    );
    articleRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [setActiveWork]);

  const goTo = (index: number) => {
    const target = Math.min(content.featuredWork.length - 1, Math.max(0, index));
    const item = content.featuredWork[target];
    setActiveWork(item.id);
    document.getElementById(`featured-work-${item.id}`)?.scrollIntoView({
      behavior: motionMode === "full" ? "smooth" : "auto",
      block: "center",
    });
  };

  return (
    <section
      id="work"
      aria-labelledby="selected-work-title"
      className="group relative z-10 border-y border-border/70 bg-[#FAF9F6]/94 px-5 py-20 text-slate-950 backdrop-blur-[2px] dark:bg-slate-950/94 dark:text-slate-50 sm:px-8"
      data-locale={content.locale}
    >
      <div className="mx-auto max-w-6xl">
        <div className="sr-only" aria-hidden="true">
          {content.featuredWork.map((item) => (
            <span key={item.id} data-content-id={`featured-${item.id}`}>{item.title}</span>
          ))}
        </div>
        <div className="grid gap-6 border-b border-current/15 pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {content.copy.featured}
            </p>
            <h2 id="selected-work-title" className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
              {content.copy.featuredTitle}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 lg:justify-self-end">
            {content.copy.featuredIntro}
          </p>
        </div>

        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {content.featuredWork.map((item, index) => (
              <article
                key={item.id}
                id={`featured-work-${item.id}`}
                ref={(element) => { articleRefs.current[index] = element; }}
                data-work-id={item.id}
                className="flex min-h-[72svh] scroll-mt-24 flex-col justify-center py-14"
              >
                <WorkStory item={item} index={index} locale={content.locale} />
                <div className="mt-7">
                  <WorkAction
                    item={item}
                    locale={content.locale}
                    experience={destinationExperience(item, content.experiences)}
                    onExperience={onExperience}
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white/82 p-5 shadow-[0_35px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/82">
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <span>PRODUCT CINEMA / {String(activeIndex + 1).padStart(2, "0")}</span>
                <span>{activeWork.presentation}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork.id}
                  initial={motionMode === "full" ? { opacity: 0, scale: 0.965, y: 18 } : false}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={motionMode === "full" ? { opacity: 0, scale: 1.02, y: -10 } : undefined}
                  className={cn(
                    "relative mx-auto overflow-hidden border bg-slate-100 shadow-2xl dark:bg-slate-800",
                    activeWork.presentation === "phone"
                      ? "aspect-[9/16] max-h-[66svh] w-[46%] rounded-[2rem] border-slate-950 p-2 dark:border-white/30"
                      : "aspect-[16/10] w-full rounded-xl border-slate-300 dark:border-slate-700"
                  )}
                  style={{ boxShadow: `0 32px 80px -40px ${activeWork.accent}` }}
                >
                  <Image
                    src={activeWork.media.primary}
                    alt={activeWork.media.alt}
                    fill
                    className={cn("object-cover object-top", activeWork.presentation === "phone" && "rounded-[1.5rem]")}
                    sizes="(max-width: 1279px) 50vw, 560px"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-display text-xl font-bold">{activeWork.title}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 disabled:opacity-30 dark:border-slate-700" aria-label={content.locale === "en" ? "Previous project" : "Projet précédent"}>
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === content.featuredWork.length - 1} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 disabled:opacity-30 dark:border-slate-700" aria-label={content.locale === "en" ? "Next project" : "Projet suivant"}>
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 lg:hidden">
          {content.featuredWork.map((item, index) => (
            <article key={item.id} id={`featured-work-mobile-${item.id}`} className="scroll-mt-24 border-b border-current/15 pb-10 last:border-0">
              <div className={cn("relative mb-6 overflow-hidden border bg-slate-100 dark:bg-slate-800", item.presentation === "phone" ? "mx-auto aspect-[9/16] max-h-[520px] w-[64%] rounded-[1.5rem]" : "aspect-[16/10] rounded-xl")}>
                <Image src={item.media.primary} alt={item.media.alt} fill className="object-cover object-top" sizes="(max-width: 1023px) 90vw, 50vw" />
              </div>
              <WorkStory item={item} index={index} locale={content.locale} />
              <div className="mt-6">
                <WorkAction
                  item={item}
                  locale={content.locale}
                  experience={destinationExperience(item, content.experiences)}
                  onExperience={onExperience}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
