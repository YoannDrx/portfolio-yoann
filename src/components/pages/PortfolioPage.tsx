"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const PortfolioApp = dynamic(() => import("@/components/PortfolioApp"), {
  ssr: false,
});
import TouchIndicator from "@/components/TouchIndicator";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleToggle } from "@/components/LocaleToggle";
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
  Smartphone,
  Monitor,
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
    freelance: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    cdi: "bg-green-500/20 text-green-600 dark:text-green-400",
    personal: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    ponctuel: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    hors_tech: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
    cinema: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    ops: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
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

const VIEW_MODE_KEY = "portfolio-view-mode";

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

export default function Home() {
  const { locale } = useI18n();
  const [viewMode, setViewMode] = useState<"device" | "web">("web");

  // The editorial web view is intentionally the entry point. The device
  // simulator remains available as an optional interaction.
  const handleViewModeChange = (mode: "device" | "web") => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <TouchIndicator />

      {/* View Mode Toggle - Desktop Only */}
      {viewMode === "device" && <nav aria-label="View mode" className="fixed right-6 top-6 z-50 hidden items-center gap-2 rounded-full border border-border/50 bg-card/80 p-1.5 shadow-soft backdrop-blur-xl lg:flex">
        <button
          onClick={() => handleViewModeChange("device")}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all"
        >
          <Smartphone className="h-4 w-4" />
          iPhone
        </button>
        <button
          onClick={() => handleViewModeChange("web")}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
        >
          <Monitor className="h-4 w-4" />
          Web
        </button>
        <LocaleToggle />
        <ThemeToggle />
      </nav>}

      {/* Device View */}
      {viewMode === "device" && (
        <div className="flex min-h-screen animate-ios-fade-in items-center justify-center px-4 py-8">
          <div className="relative">
            {/* Background Decorations */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 animate-pulse-soft rounded-full bg-gradient-to-r from-primary/20 to-cyan-400/20 blur-3xl" />
              <div
                className="absolute inset-20 animate-pulse-soft rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <PortfolioApp />

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
          <WebView onDeviceView={() => handleViewModeChange("device")} />
        </div>
      )}
    </main>
  );
}

// Full Web View Component
const WebView = ({ onDeviceView }: { onDeviceView: () => void }) => {
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="font-mono text-sm font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            YA<span className="text-primary">.</span>
          </a>
          <nav aria-label={locale === "en" ? "Portfolio" : "Portfolio"} className="hidden items-center gap-5 md:flex">
            <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground">{locale === "en" ? "Projects" : "Projets"}</a>
            <a href="#experiences" className="text-sm font-medium text-muted-foreground hover:text-foreground">{uiTexts.nav.experiences}</a>
            <a href="#skills" className="text-sm font-medium text-muted-foreground hover:text-foreground">{uiTexts.nav.skills}</a>
            <Link href={`/${locale}/cv`} className="text-sm font-medium text-muted-foreground hover:text-foreground">{uiTexts.nav.resume}</Link>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">{uiTexts.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onDeviceView}
              className="hidden min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground lg:flex"
            >
              <Smartphone className="size-4" aria-hidden="true" />
              iPhone
            </button>
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      {/* Wrapper avec transform pour l'effet push */}
      <div
        className={`transition-transform duration-300 ease-out ${
          selectedExperience ? "-translate-x-[288px]" : "translate-x-0"
        }`}
      >
        {/* Hero Section */}
        <section id="top" className="relative min-h-screen overflow-hidden px-6 pb-20 pt-28 2xl:h-screen 2xl:py-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>

          <header className="stagger-children relative z-10 mx-auto flex min-h-screen max-w-5xl items-center 2xl:h-full 2xl:min-h-0">
            <div className="grid w-full grid-cols-1 items-center gap-12 2xl:grid-cols-2">
              {/* Left: Text content */}
              <div className="text-center 2xl:text-left">
                {/* Small avatar - visible < lg only */}
                <div className="relative mx-auto mb-5 h-36 w-36 md:mb-8 md:h-52 md:w-52 2xl:hidden">
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

                <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:mb-8 md:text-xl 2xl:mx-0">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap justify-center gap-4 2xl:justify-start">
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
                <div className="mt-16 flex justify-center gap-8 md:gap-12 2xl:justify-start">
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
                      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                        {stat.label}
                      </p>
                    </IOSCard>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Right: Full silhouette anchored to bottom - visible 2xl+ only */}
          <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-1/2 2xl:block">
            <div className="relative h-full w-full">
              {/* White stroke + blue glow layer (behind) */}
              <div className="silhouette-stroke absolute inset-0">
                <Image
                  src={profile.avatar}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="50vw"
                  quality={100}
                  unoptimized
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
                sizes="50vw"
                quality={100}
                unoptimized
              />
            </div>
          </div>
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
                        <p className="font-mono text-lg font-bold" style={{ color: study.accent }}>
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
                        variant="subtle"
                        padding="none"
                        className="card-premium-hover group relative h-full cursor-pointer overflow-hidden"
                        interactive
                        onPress={() => setSelectedExperience(experience)}
                      >
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
                                  className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/70 dark:bg-muted/40"
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
                            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground/70">
                              {experience.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-3">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                                <span>{experience.platforms.join(" · ")}</span>
                                <span>·</span>
                                <span>{experience.stats.teamSize}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground/50 transition-colors group-hover:text-primary/70">
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
                      <span className="rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 text-xs font-medium text-muted-foreground/60">
                        {skill.level}
                      </span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground/80">
                      {skill.narrative}
                    </p>
                    <ul className="space-y-1.5">
                      {skill.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground/70"
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
                    <p className="text-xs text-muted-foreground/60">
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
                      <span className="text-foreground/80">{highlight}</span>
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
                  <p className="text-sm leading-relaxed text-muted-foreground/80">
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
                                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                : "bg-blue-500/20 text-blue-600 dark:text-blue-400"
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
                  <p className="mt-0.5 text-sm text-muted-foreground/70">
                    {edu.school}
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary/70">
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
                      email: "text-emerald-500",
                      phone: "text-violet-500",
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
