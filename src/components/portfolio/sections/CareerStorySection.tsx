"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import type { CareerChapter, PortfolioContent } from "@/data/portfolio-content";
import { cn } from "@/lib/utils";
import { usePortfolioExperience } from "../PortfolioExperienceContext";

export function CareerStorySection({ content }: { content: PortfolioContent }) {
  const refs = useRef<Array<HTMLElement | null>>([]);
  const [activeId, setActiveId] = useState<CareerChapter["id"]>("cinema");
  const [expanded, setExpanded] = useState(false);
  const { motionMode } = usePortfolioExperience();
  const active = content.careerChapters.find((chapter) => chapter.id === activeId) ?? content.careerChapters[0];

  useEffect(() => {
    const observers = refs.current.map((element) => {
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.48) {
          setActiveId(entry.target.getAttribute("data-career-id") as CareerChapter["id"]);
        }
      }, { threshold: [0.48, 0.65] });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <section id="resume" aria-labelledby="career-title" className="relative z-10 overflow-hidden bg-[#0B1020] px-5 py-20 text-[#F5F2EA] sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(36,87,230,0.28),transparent_32%),linear-gradient(130deg,transparent,rgba(255,255,255,0.025))]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">{content.locale === "en" ? "Two paths / One craft" : "Deux parcours / Un même geste"}</p>
            <h2 id="career-title" className="mt-4 max-w-4xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">{content.copy.resumeTitle}</h2>
          </div>
          <PDFDownloadButton className="!border-white/20 !bg-white/10 !text-white hover:!bg-white/15" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {content.careerChapters.map((chapter, index) => (
              <article
                key={chapter.id}
                ref={(element) => { refs.current[index] = element; }}
                data-career-id={chapter.id}
                className="flex min-h-[58svh] flex-col justify-center border-b border-white/12 py-12 last:border-0"
              >
                <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
                  <span>0{index + 1}</span>
                  <span>{chapter.period}</span>
                </div>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.04em] sm:text-5xl">{chapter.label}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/66">{chapter.transferStatement}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {chapter.experienceIds.map((id) => {
                    const experience = content.workExperiences.find((item) => item.id === id);
                    return experience ? <span key={id} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">{experience.company}</span> : null;
                  })}
                </div>
              </article>
            ))}
          </div>

          <div className="sticky top-0 hidden h-[100svh] items-center lg:flex">
            <div className="w-full">
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                <span>CAREER FILM / {active.period}</span>
                <span>{active.label}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={motionMode === "full" ? { opacity: 0, x: 30, rotate: 1 } : false}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={motionMode === "full" ? { opacity: 0, x: -24, rotate: -1 } : undefined}
                  className="grid grid-cols-2 gap-3 rounded-2xl border border-white/12 bg-white/[0.035] p-3 shadow-2xl"
                >
                  {active.media.map((media, index) => (
                    <div key={media} className={cn("relative overflow-hidden rounded-xl bg-white/5", index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]")}>
                      <Image src={media} alt="" fill className="object-cover" sizes="520px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/45 to-transparent" />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 h-px bg-white/15"><motion.div className="h-full bg-blue-400" animate={{ width: `${((content.careerChapters.findIndex((chapter) => chapter.id === active.id) + 1) / content.careerChapters.length) * 100}%` }} /></div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <button type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded} className="flex min-h-11 w-full items-center justify-between text-left font-display text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            {content.locale === "en" ? "View every experience" : "Voir toutes les expériences"}
            <ChevronDown className={cn("size-5 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {content.workExperiences.map((experience) => (
                    <div key={experience.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div>
                        <p className="font-display text-lg font-bold">{experience.company}</p>
                        <p className="mt-1 text-sm text-blue-300">{experience.role}</p>
                      </div>
                      <p className="font-mono text-[10px] uppercase text-white/50">{experience.startDate} — {experience.endDate ?? (content.locale === "en" ? "Present" : "Présent")}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
