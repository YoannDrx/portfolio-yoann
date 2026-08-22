"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const PortfolioApp = dynamic(() => import("@/components/PortfolioApp"), {
  ssr: false,
});
import TouchIndicator from "@/components/TouchIndicator";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import { ViewModeControls } from "@/components/portfolio/ViewModeControls";
import { ContactFormCard } from "@/components/contact/ContactFormCard";
import {
  IOSCard,
  IOSButton,
  IOSChip,
  IOSAvailabilityBadge,
  IOSSidePanel,
} from "@/components/ios";
import { ExperienceDetailPanel } from "@/components/experiences/ExperienceDetailPanel";
import { ExperienceFilterBar } from "@/components/experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "@/components/experiences/ExperienceSectionHeader";
import {
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import {
  getAiContent,
  getEducation,
  getWorkExperiences,
  getProfile,
  getCaseStudySummaries,
  getExperiences,
  getSocialLinks,
  getSoftSkills,
  getTechnicalSkills,
  getUiTexts,
} from "@/data";
import { useExperienceFilter } from "@/hooks/use-experience-filter";
import type { Experience, ExperienceType } from "@/data";
import type { ViewMode } from "@/data/portfolio-content";

// Helper functions for experience type labels and colors
const getExperienceTypeLabel = (type: ExperienceType, locale: string) => {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: "Freelance", en: "Freelance" },
    cdi: { fr: "CDI", en: "Full-time" },
    personal: { fr: "Perso", en: "Personal" },
    ponctuel: { fr: "Freelance", en: "Freelance" },
    hors_tech: { fr: "Autre", en: "Other" },
    cinema: { fr: "Cinéma", en: "Cinema" },
    ops: { fr: "Management Ops", en: "Management Ops" },
  };
  return locale === "en" ? labels[type].en : labels[type].fr;
};

const getExperienceTypeColor = (type: ExperienceType) => {
  const colors: Record<ExperienceType, string> = {
    freelance: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    cdi: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300",
    personal: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
    ponctuel: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    hors_tech: "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300",
    cinema: "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300",
    ops: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  };
  return colors[type];
};
import { skillCategories } from "@/data/skills";
import { useI18n } from "@/i18n/I18nProvider";

// Icon mapping for social links
const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
};

const VIEW_MODE_KEY = "portfolio-view-mode-v2";
const LEGACY_VIEW_MODE_KEY = "portfolio-view-mode";

const caseSectionCopy = {
  fr: {
    eyebrow: "Études de cas principales",
    title: "Des produits, des problèmes de fond",
    subtitle:
      "Le code compte, mais les contraintes, les options rejetées et les preuves de fonctionnement racontent davantage la qualité du travail.",
    cta: "Lire l’étude de cas",
    primaryCta: "Voir les études de cas",
  },
  en: {
    eyebrow: "Featured case studies",
    title: "Products built around fundamental problems",
    subtitle:
      "Code matters, but constraints, rejected options and evidence of operation say more about the quality of the work.",
    cta: "Read the case study",
    primaryCta: "View case studies",
  },
} as const;

function AnimatedFocus({
  locale,
  reducedMotion,
}: {
  locale: "fr" | "en";
  reducedMotion: boolean;
}) {
  const words = locale === "en"
    ? ["mobile products", "useful interfaces", "reliable delivery", "product craft"]
    : ["produits mobiles", "interfaces utiles", "livraisons fiables", "culture produit"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [reducedMotion, words.length]);

  return (
    <div className="mx-auto mb-7 flex min-h-7 max-w-2xl items-center justify-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground xl:mx-0 xl:justify-start">
      <span>{locale === "en" ? "I build" : "Je conçois"}</span>
      <span className="relative inline-flex min-h-5 min-w-[10.5rem] overflow-hidden text-left text-primary">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[wordIndex]}
            className="absolute inset-y-0 left-0 whitespace-nowrap"
            initial={reducedMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export default function Home() {
  const { locale } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>("web");
  const [isCompactDevice, setIsCompactDevice] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const query = window.matchMedia("(max-width: 767px)");
    const updateCompactState = () => setIsCompactDevice(query.matches);
    updateCompactState();
    query.addEventListener("change", updateCompactState);

    const stored = localStorage.getItem(VIEW_MODE_KEY);
    const legacy = localStorage.getItem(LEGACY_VIEW_MODE_KEY);
    const resolved: ViewMode | null =
      stored === "iphone" || stored === "web"
        ? stored
        : legacy === "device"
          ? "iphone"
          : legacy === "web"
            ? "web"
            : null;

    if (resolved) {
      queueMicrotask(() => {
        if (!cancelled) setViewMode(resolved);
      });
      localStorage.setItem(VIEW_MODE_KEY, resolved);
      localStorage.removeItem(LEGACY_VIEW_MODE_KEY);
    }

    return () => {
      cancelled = true;
      query.removeEventListener("change", updateCompactState);
    };
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <TouchIndicator />
      <ViewModeControls
        mode={viewMode}
        onChange={handleViewModeChange}
        compact
        className="fixed right-3 top-3 z-[70] shadow-soft sm:right-5 sm:top-5"
      />

      {/* Device View */}
      {viewMode === "iphone" && (
        <div className="flex min-h-[100svh] animate-ios-fade-in items-center justify-center px-0 py-0 md:px-4 md:py-8">
          <div className="relative">
            {/* Background Decorations */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 animate-pulse-soft rounded-full bg-gradient-to-r from-primary/20 to-cyan-400/20 blur-3xl" />
              <div
                className="absolute inset-20 animate-pulse-soft rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <PortfolioApp showFrame={!isCompactDevice} />

            {/* Caption */}
            <p className="mt-6 hidden text-center text-sm text-muted-foreground lg:block">
              {getUiTexts(locale).hero.swipeToNavigate}
            </p>
          </div>
        </div>
      )}

      {/* Web View - Full Width */}
      {viewMode === "web" && (
        <div className="min-h-screen animate-ios-fade-in">
          <WebView />
        </div>
      )}
    </main>
  );
}

// Full Web View Component
const WebView = () => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const profile = getProfile(locale);
  const experiences = getExperiences(locale);
  const technicalSkills = getTechnicalSkills(locale);
  const softSkills = getSoftSkills(locale);
  const aiContent = getAiContent(locale);
  const workExperiences = getWorkExperiences(locale);
  const education = getEducation(locale);
  const socialLinks = getSocialLinks(locale);
  const caseStudies = getCaseStudySummaries(locale);
  const caseCopy = caseSectionCopy[locale];
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.24]);

  // State pour le panneau de détail expérience
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  // Filtres expériences
  const {
    activeFilter,
    setActiveFilter,
    sections,
    counts,
    showSectionHeaders,
  } = useExperienceFilter(experiences);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      {/* Wrapper avec transform pour l'effet push */}
      <div
        className={`transition-transform duration-300 ease-out ${
          selectedExperience ? "-translate-x-[288px]" : "translate-x-0"
        }`}
      >
        {/* Hero Section */}
        <section ref={heroRef} id="top" className="relative min-h-[100svh] overflow-hidden px-6 pb-20 pt-20 xl:py-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>

          <header className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-5xl items-center xl:h-full xl:min-h-[100svh]">
            <div className="grid w-full grid-cols-1 items-center gap-12 xl:grid-cols-2">
              {/* Left: Text content */}
              <motion.div
                className="text-center xl:text-left"
                style={{
                  y: shouldReduceMotion ? 0 : copyY,
                  opacity: shouldReduceMotion ? 1 : copyOpacity,
                }}
              >
                {/* Small avatar - visible < lg only */}
                <div className="relative mx-auto mb-5 h-36 w-36 md:mb-8 md:h-52 md:w-52 xl:hidden">
                  <div className="absolute -inset-5 animate-pulse-soft rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" />
                  <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-background bg-blue-200 shadow-medium md:h-52 md:w-52 dark:bg-blue-900/60">
                    <Image
                      src={profile.avatar}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 767px) 144px, 208px"
                    />
                  </div>
                </div>

                <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground md:mb-4 md:text-7xl">
                  {profile.firstName} {profile.lastName}
                  <span className="mt-1 block text-xl leading-tight text-primary md:mt-2 md:text-4xl">
                    {profile.title}
                  </span>
                </h1>

                <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-8 md:text-xl xl:mx-0">
                  {profile.bio}
                </p>

                <AnimatedFocus locale={locale} reducedMotion={Boolean(shouldReduceMotion)} />

                <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
                  <IOSButton
                    size="lg"
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {caseCopy.primaryCta}
                  </IOSButton>
                  <IOSButton
                    variant="secondary"
                    size="lg"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {uiTexts.buttons.contactMe}
                  </IOSButton>
                  <PDFDownloadButton className="!h-14 !px-6 !text-base" />
                </div>

                {/* Stats */}
                <div className="mt-12 flex justify-center gap-4 sm:gap-8 md:mt-16 md:gap-12 xl:justify-start">
                  {profile.stats.map((stat) => (
                    <IOSCard
                      key={stat.label}
                      variant="subtle"
                      padding="md"
                      className="card-premium-hover min-w-[120px] text-center"
                    >
                      <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground md:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                    </IOSCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </header>

          {/* Right: Full silhouette anchored to bottom - visible 2xl+ only */}
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 hidden h-[calc(100svh-6rem)] w-1/2 xl:block"
            style={{
              y: shouldReduceMotion ? 0 : portraitY,
              scale: shouldReduceMotion ? 1 : portraitScale,
            }}
          >
            <div className="relative h-full w-full">
              {/* White stroke + blue glow layer (behind) */}
              <div className="silhouette-stroke absolute inset-0">
                <Image
                  src={profile.avatar}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 1535px) 48vw, 50vw"
                  aria-hidden
                />
              </div>
              {/* Real image (on top) */}
              <Image
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                fill
                className="relative object-contain object-bottom"
                priority
                sizes="(max-width: 1535px) 48vw, 50vw"
              />
            </div>
          </motion.div>
        </section>

        <section
          id="projects"
          aria-labelledby="case-studies-title"
          className="border-y border-border/70 bg-[#FAF9F6] px-6 py-20 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {caseCopy.eyebrow}
            </p>
            <div className="mt-4 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <h2 id="case-studies-title" className="text-4xl font-bold tracking-tight sm:text-5xl">
                {caseCopy.title}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 lg:justify-self-end">
                {caseCopy.subtitle}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.slug}
                  href={`/${locale}/projects/${study.slug}`}
                  data-content-id={`featured-${study.slug}`}
                  className="group flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={study.image}
                      alt=""
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {study.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold">{study.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {study.tagline}
                    </p>
                    <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <div>
                        <p className="font-mono text-lg font-bold text-primary">
                          {study.evidence.value}
                        </p>
                        <p className="text-xs text-slate-500">{study.evidence.label}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold">
                        {caseCopy.cta}
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section
          id="experiences"
          aria-labelledby="experiences-title"
          className="bg-gradient-to-br from-blue-50/80 via-background to-indigo-50/50 px-6 py-20 dark:from-blue-950/30 dark:via-background dark:to-indigo-950/20"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="experiences-title" className="mb-4 text-center text-4xl font-bold text-foreground">
              {uiTexts.nav.experiences}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
              {uiTexts.descriptions.experiencesSubtitle}
            </p>

            <ExperienceFilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />

            <div className="mt-10 space-y-16">
              {sections.map((section) => (
                <div key={section.type}>
                  {showSectionHeaders && (
                    <ExperienceSectionHeader
                      type={section.type}
                      count={section.experiences.length}
                    />
                  )}
                  <div className="stagger-children grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {section.experiences.map((experience) => (
                      <IOSCard
                        key={experience.id}
                        data-content-id={`journey-${experience.id}`}
                        variant="subtle"
                        padding="none"
                        className="card-premium-hover group relative h-full cursor-pointer overflow-hidden"
                        interactive
                        onPress={() => setSelectedExperience(experience)}
                      >
                        {experience.name === "KLESIA" || experience.name === "Jaji" ? (
                          <span
                            data-content-id={`featured-${experience.name.toLowerCase()}`}
                            className="sr-only"
                          >
                            {experience.name}
                          </span>
                        ) : null}
                        {/* Accent gradient line top */}
                        <div
                          className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${experience.gradient} z-10`}
                        />

                        <div className="flex h-full flex-col">
                          {/* Image zone */}
                          <div className="relative h-48 flex-shrink-0 overflow-hidden">
                            {experience.image ? (
                              <>
                                <Image
                                  src={experience.image}
                                  alt={experience.name}
                                  fill
                                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                              </>
                            ) : (
                              <div className="relative h-full overflow-hidden bg-muted/40 dark:bg-muted/20">
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-[0.12] dark:opacity-[0.18]`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                  <span className="select-none px-4 text-center text-[4rem] font-black leading-none tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.06]">
                                    {experience.name}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Contenu */}
                          <div className="flex flex-1 flex-col p-5">
                            {/* Badges type/year + tech chips */}
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span
                                className={`border-current/20 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getExperienceTypeColor(experience.experienceType)}`}
                              >
                                {getExperienceTypeLabel(
                                  experience.experienceType,
                                  locale
                                )}
                              </span>
                              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                {experience.year}
                              </span>
                              <div className="mx-0.5 h-3 w-px bg-border/60" />
                              {experience.features.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-muted/70"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <h3 className="mb-0.5 text-lg font-semibold tracking-tight text-foreground">
                              {experience.name}
                            </h3>
                            <p className="mb-2 text-sm font-medium text-primary">
                              {experience.category}
                            </p>
                            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {experience.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-3">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{experience.platforms.join(" · ")}</span>
                                <span>·</span>
                                <span>{experience.stats.teamSize}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground transition-colors group-hover:text-primary">
                                <span>{uiTexts.buttons.viewDetails}</span>
                                <ChevronRight className="ml-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </IOSCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" aria-labelledby="skills-title" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 id="skills-title" className="mb-4 text-center text-4xl font-bold text-foreground">
              {uiTexts.nav.skills}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              {uiTexts.descriptions.myTechStack}
            </p>

            {/* Technical Skills - Narrative cards */}
            <div className="mb-12 grid gap-6 md:grid-cols-2">
              {technicalSkills.map((skill) => (
                <IOSCard
                  key={skill.id}
                  variant="subtle"
                  padding="lg"
                  className="card-premium-hover relative"
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b ${skill.gradient}`}
                  />

                  <div className="pl-3">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {skill.title}
                      </h3>
                      <span className="rounded-md border border-border/50 bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {skill.level}
                      </span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {skill.narrative}
                    </p>
                    <ul className="space-y-1.5">
                      {skill.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-foreground/25" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </IOSCard>
              ))}
            </div>

            {/* AI Section */}
            <div className="mb-12">
              <h3 className="mb-6 text-center text-2xl font-bold text-foreground">
                {aiContent.title}
              </h3>
              <IOSCard
                variant="subtle"
                padding="lg"
                className="card-premium-hover relative mx-auto max-w-3xl"
              >
                <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-purple-500/40" />
                <div className="mb-4 flex items-center gap-3 pl-3">
                  <span className="rounded-lg border border-purple-500/20 bg-purple-500/[0.06] bg-clip-padding px-2.5 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                    AI
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {aiContent.subtitle}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {uiTexts.descriptions.aiToolsIntegrated}
                    </p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {aiContent.narrative}
                </p>
                <ul className="mb-6 space-y-2">
                  {aiContent.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-purple-500/40" />
                      <span className="text-foreground/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {aiContent.tools.map((tool) => (
                    <IOSChip
                      key={tool.name}
                      variant="default"
                      size="md"
                      className="!border-purple-500/15 !bg-purple-500/[0.06] !text-purple-700 dark:!text-purple-300"
                    >
                      {tool.name}
                    </IOSChip>
                  ))}
                </div>
              </IOSCard>
            </div>

            {/* Soft Skills */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {softSkills.map((skill) => (
                <IOSCard
                  key={skill.id}
                  variant="subtle"
                  padding="md"
                  className="card-premium-hover relative overflow-hidden"
                >
                  <div
                    className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${skill.gradient} opacity-50`}
                  />
                  <h3 className="mb-2 text-sm font-semibold tracking-tight text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {skill.narrative}
                  </p>
                </IOSCard>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section
          id="resume"
          aria-labelledby="resume-title"
          className="bg-gradient-to-br from-teal-50/70 via-background to-emerald-50/50 px-6 py-20 dark:from-teal-950/30 dark:via-background dark:to-emerald-950/20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="resume-title" className="text-4xl font-bold text-foreground">
                {uiTexts.sections.career}
              </h2>
              <PDFDownloadButton />
            </div>
            <p className="mb-12 max-w-2xl text-muted-foreground">
              {uiTexts.descriptions.myProfessionalBackground}
            </p>

            <div className="space-y-6">
              {workExperiences.map((exp) => (
                <IOSCard
                  key={exp.id}
                  variant="subtle"
                  padding="md"
                  className="card-premium-hover relative"
                >
                  {/* Accent bar gauche par type */}
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-[2px] rounded-l-xl ${
                      exp.type === "cdi"
                        ? "bg-gradient-to-b from-green-400 to-green-500"
                        : "bg-gradient-to-b from-blue-400 to-blue-500"
                    }`}
                  />

                  <div className="pl-3">
                    <div className="mb-0 flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-xl font-semibold tracking-tight text-foreground">
                            {exp.company}
                          </h3>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                              exp.type === "cdi"
                                ? "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                            }`}
                          >
                            {exp.type === "cdi"
                              ? locale === "en"
                                ? "Full-time"
                                : "CDI"
                              : "Freelance"}
                          </span>
                        </div>
                        <p className="font-medium text-primary">{exp.role}</p>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground md:mt-0 md:text-right">
                        <p className="font-medium">
                          {exp.startDate} -{" "}
                          {exp.endDate || uiTexts.labels.present}
                        </p>
                        <p>
                          {exp.location}
                          {exp.remote === "remote"
                            ? " · Remote"
                            : exp.remote === "hybrid"
                              ? " · Hybride"
                              : ""}
                        </p>
                      </div>
                    </div>
                    {exp.url && (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {uiTexts.buttons.viewWebsite}
                      </a>
                    )}
                  </div>
                </IOSCard>
              ))}
            </div>

            {/* Education */}
            <h3 className="mb-6 mt-16 text-center text-2xl font-bold text-foreground">
              {uiTexts.sections.education}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {education.map((edu) => (
                <IOSCard
                  key={edu.id}
                  variant="subtle"
                  padding="md"
                  className="card-premium-hover"
                >
                  <p className="text-base font-semibold tracking-tight text-foreground">
                    {edu.degree}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {edu.school}
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary">
                    {edu.year}
                  </p>
                </IOSCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="bg-gradient-to-br from-violet-50/70 via-background to-purple-50/50 px-6 py-20 dark:from-violet-950/30 dark:via-background dark:to-purple-950/20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="grid items-start gap-12 md:grid-cols-2">
              {/* Gauche: Titre, sous-titre, icônes */}
              <div className="space-y-6">
                <div>
                  <h2 id="contact-title" className="mb-3 text-4xl font-bold text-foreground">
                    {uiTexts.hero.letsWorkTogether}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {uiTexts.hero.projectQuestion}
                    <br />
                    {uiTexts.hero.letsDiscuss}
                  </p>
                </div>

                {profile.isAvailable && (
                  <IOSAvailabilityBadge
                    text={profile.availabilityText}
                    variant="prominent"
                    status="available"
                    animated
                  />
                )}

                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    const brandColors: Record<string, string> = {
                      linkedin: "text-[#0A66C2]",
                      github: "text-zinc-800 dark:text-zinc-200",
                      malt: "text-[#FC5757]",
                      email: "text-emerald-600 dark:text-emerald-400",
                      phone: "text-violet-600 dark:text-violet-400",
                    };
                    const iconColor = brandColors[link.id] || "text-foreground";
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group"
                        title={link.name}
                      >
                        <div className="flex h-12 w-12 transform items-center justify-center rounded-2xl border border-border/50 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-border group-hover:shadow-lg group-active:scale-95">
                          <span
                            className={`${iconColor} transition-transform duration-200 group-hover:scale-110`}
                          >
                            {iconMap[link.icon]}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.availabilityOptions?.map((option) => (
                    <IOSChip key={option} variant="availability" size="md">
                      {option}
                    </IOSChip>
                  ))}
                </div>
              </div>

              {/* Droite: Formulaire */}
              <ContactFormCard />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {profile.firstName}{" "}
              {profile.lastName}. {uiTexts.labels.allRightsReserved}
            </p>
            <PDFDownloadButton />
          </div>
        </footer>
      </div>

      {/* Side Panel pour détails expérience */}
      <IOSSidePanel
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        width="xl"
      >
        {selectedExperience && (
          <ExperienceDetailPanel experience={selectedExperience} />
        )}
      </IOSSidePanel>
    </div>
  );
};
