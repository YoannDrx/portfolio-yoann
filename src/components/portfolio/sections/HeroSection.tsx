"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import type { PortfolioContent } from "@/data/portfolio-content";
import { usePortfolioExperience } from "../PortfolioExperienceContext";

function FocusStatement({ locale, staticMotion }: { locale: "fr" | "en"; staticMotion: boolean }) {
  const words = locale === "en"
    ? ["obvious mobile experiences", "robust interfaces", "enjoyable products", "reliable delivery"]
    : ["expériences mobiles évidentes", "interfaces robustes", "produits agréables à utiliser", "livraisons fiables"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (staticMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2800);
    return () => window.clearInterval(timer);
  }, [staticMotion, words.length]);

  return (
    <p className="mb-7 flex min-h-8 flex-wrap items-center justify-center gap-x-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground xl:justify-start">
      <span>{locale === "en" ? "I turn product constraints into" : "Je transforme des contraintes produit en"}</span>
      <span className="relative inline-flex min-h-5 w-full shrink-0 justify-center overflow-hidden text-center text-primary sm:w-auto sm:min-w-[17rem] sm:justify-start sm:text-left">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            className="absolute inset-y-0 left-0 whitespace-nowrap"
            initial={staticMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={staticMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

export function HeroSection({ content }: { content: PortfolioContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionMode, setActiveWork } = usePortfolioExperience();
  const { profile, locale } = content;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.025]);
  const staticMotion = motionMode !== "full";

  const scrollToWork = (workId: "klesia" | "jaji") => {
    setActiveWork(workId);
    const targetId = window.matchMedia("(min-width: 1024px)").matches
      ? `featured-work-${workId}`
      : `featured-work-mobile-${workId}`;
    document.getElementById(targetId)?.scrollIntoView({ behavior: staticMotion ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="product-cinema-grain relative z-10 min-h-[100svh] overflow-hidden px-5 pb-16 pt-24 sm:px-8 xl:px-10 xl:py-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_36%,hsl(var(--primary)/0.13),transparent_32%),radial-gradient(circle_at_22%_82%,rgba(58,196,224,0.08),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-6xl items-center gap-9 xl:grid-cols-[1.05fr_0.95fr] xl:gap-4">
        <motion.div className="relative z-20 order-2 text-center xl:order-1 xl:text-left" style={{ y: staticMotion ? 0 : copyY }}>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
            {content.copy.eyebrow}
          </p>
          <h1 id="hero-title" className="text-balance font-display text-5xl font-bold tracking-[-0.055em] text-foreground sm:text-7xl xl:text-[5.7rem] xl:leading-[0.9]">
            {profile.firstName}<br className="hidden xl:block" /> {profile.lastName}
            <span className="mt-3 block text-2xl tracking-[-0.035em] text-primary sm:text-4xl xl:text-5xl">
              {profile.title}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg xl:mx-0 xl:max-w-xl">
            {profile.bio}
          </p>
          <div className="mt-6">
            <FocusStatement locale={locale} staticMotion={staticMotion} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 xl:justify-start">
            <motion.button
              type="button"
              onClick={() => scrollToWork("klesia")}
              whileHover={staticMotion ? undefined : { y: -2 }}
              whileTap={staticMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-[0_14px_28px_-16px_hsl(var(--primary)/0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {content.copy.projects}
              <ArrowDownRight className="size-4" aria-hidden="true" />
            </motion.button>
            <PDFDownloadButton fullLabel className="!h-12 !rounded-xl !px-5 !text-sm" />
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-foreground underline decoration-border decoration-1 underline-offset-8 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              {content.copy.contact}
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 border-y border-border/80 xl:mx-0">
            {profile.stats.map((stat, index) => (
              <button
                key={stat.label}
                type="button"
                onClick={() => scrollToWork(index === 1 ? "jaji" : "klesia")}
                className="group min-h-28 border-l border-border/80 px-2 py-5 text-center first:border-l-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary xl:text-left"
                aria-label={`${stat.value} ${stat.label}`}
              >
                <span className="block font-display text-2xl font-bold tabular-nums tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-muted-foreground sm:text-[10px]">
                  {stat.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 order-1 mx-auto h-[205px] w-[205px] sm:h-[260px] sm:w-[260px] xl:order-2 xl:h-[calc(100svh-5rem)] xl:max-h-[840px] xl:min-h-[610px] xl:w-full"
          style={{ y: staticMotion ? 0 : portraitY, scale: staticMotion ? 1 : portraitScale }}
        >
          <div className="absolute inset-[8%] rounded-full bg-primary/16 blur-3xl xl:inset-[16%_2%_5%_8%]" />
          <div className="absolute inset-x-[8%] bottom-[5%] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent xl:inset-x-0" />
          <Image
            src={profile.avatar ?? "/images/yoann-profile-nobg.png"}
            alt={`${profile.firstName} ${profile.lastName}`}
            fill
            priority
            className="hero-portrait object-contain object-bottom"
            sizes="(max-width: 639px) 205px, (max-width: 1279px) 260px, 48vw"
          />
          <span className="absolute right-0 top-[22%] hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70 xl:block">
            UX / MOBILE / PRODUCT
          </span>
        </motion.div>
      </div>
    </section>
  );
}
