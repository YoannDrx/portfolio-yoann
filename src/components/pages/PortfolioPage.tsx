"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PortfolioApp from "@/components/PortfolioApp";
import TouchIndicator from "@/components/TouchIndicator";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import { useIsRealMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ContactFormCard } from "@/components/contact/ContactFormCard";
import {
  IOSCard,
  IOSButton,
  IOSBadge,
  IOSChip,
  IOSAvailabilityBadge,
  IOSSidePanel,
} from "@/components/ios";
import { ExperienceDetailPanel } from "@/components/experiences/ExperienceDetailPanel";
import { ExperienceFilterBar } from "@/components/experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "@/components/experiences/ExperienceSectionHeader";
import { Smartphone, Monitor, ExternalLink, Linkedin, Github, Mail, Phone, Briefcase, ChevronRight } from "lucide-react";
import { getAiContent, getEducation, getWorkExperiences, getProfile, getExperiences, getSocialLinks, getSoftSkills, getTechnicalSkills, getUiTexts } from "@/data";
import { useExperienceFilter } from "@/hooks/use-experience-filter";
import type { Experience, ExperienceType } from "@/data";

// Helper functions for experience type labels and colors
const getExperienceTypeLabel = (type: ExperienceType, locale: string) => {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: 'Freelance', en: 'Freelance' },
    cdi: { fr: 'CDI', en: 'Full-time' },
    personal: { fr: 'Perso', en: 'Personal' },
  };
  return locale === 'en' ? labels[type].en : labels[type].fr;
};

const getExperienceTypeColor = (type: ExperienceType) => {
  const colors: Record<ExperienceType, string> = {
    freelance: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    cdi: 'bg-green-500/20 text-green-600 dark:text-green-400',
    personal: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
  };
  return colors[type];
};
import { skillCategories } from "@/data/skills";
import { useI18n } from "@/i18n/I18nProvider";

// Icon mapping for social links
const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
};

const VIEW_MODE_KEY = "portfolio-view-mode";

export default function Home() {
  const { locale } = useI18n();
  const isRealMobile = useIsRealMobile();
  const [viewMode, setViewMode] = useState<"device" | "web">("device");

  // Restore viewMode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    if (saved === "web" || saved === "device") {
      setViewMode(saved);
    }
  }, []);

  // Persist viewMode to localStorage
  const handleViewModeChange = (mode: "device" | "web") => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  };

  // Mobile réel → fullscreen automatique (pas de cadre iPhone)
  if (isRealMobile) {
    return (
      <main className="min-h-screen bg-background">
        <PortfolioApp showFrame={false} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <TouchIndicator />

      {/* View Mode Toggle - Desktop Only */}
      <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center gap-2 p-1.5 rounded-full bg-card/80 backdrop-blur-xl shadow-soft border border-border/50">
        <button
          onClick={() => handleViewModeChange("device")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "device"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          iPhone
        </button>
        <button
          onClick={() => handleViewModeChange("web")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "web"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
	        >
	          <Monitor className="w-4 h-4" />
	          Web
	        </button>
	        <LocaleToggle />
	        <ThemeToggle />
	      </div>

      {/* Device View */}
      {viewMode === "device" && (
        <div className="flex items-center justify-center min-h-screen py-8 px-4 animate-ios-fade-in">
          <div className="relative">
            {/* Background Decorations */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-soft" />
              <div className="absolute inset-20 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
            </div>

            <PortfolioApp />

	            {/* Caption */}
	            <p className="hidden lg:block text-center text-sm text-muted-foreground mt-6">
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

  // State pour le panneau de détail expérience
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Filtres expériences
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } = useExperienceFilter(experiences);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Wrapper avec transform pour l'effet push */}
      <div className={`transition-transform duration-300 ease-out ${
        selectedExperience ? '-translate-x-[288px]' : 'translate-x-0'
      }`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center stagger-children">
          {/* Avatar */}
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute -inset-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-medium border-4 border-background">
              <Image
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                fill
                className="object-cover"
                priority
                sizes="160px"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            {profile.firstName} {profile.lastName}
            <span className="block text-primary text-3xl md:text-4xl mt-2">{profile.title}</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <IOSButton
              size="lg"
              onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {uiTexts.buttons.viewMyExperiences}
            </IOSButton>
            <IOSButton
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {uiTexts.buttons.contactMe}
            </IOSButton>
            <PDFDownloadButton className="!h-14 !px-6 !text-base" />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-16">
            {profile.stats.map((stat) => (
              <IOSCard key={stat.label} variant="subtle" padding="md" className="text-center card-premium-hover min-w-[120px]">
                <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground/70 font-medium mt-1.5 uppercase tracking-wider">{stat.label}</p>
              </IOSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-20 px-6 bg-gradient-to-br from-blue-50/80 via-background to-indigo-50/50 dark:from-blue-950/30 dark:via-background dark:to-indigo-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">{uiTexts.nav.experiences}</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
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
                  <ExperienceSectionHeader type={section.type} count={section.experiences.length} />
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                  {section.experiences.map((experience) => (
                    <IOSCard
                      key={experience.id}
                      variant="subtle"
                      padding="none"
                      className="card-premium-hover overflow-hidden group cursor-pointer h-full relative"
                      interactive
                      onPress={() => setSelectedExperience(experience)}
                    >
                      {/* Accent gradient line top */}
                      <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${experience.gradient} z-10`} />

                      <div className="flex flex-col h-full">
                        {/* Image zone */}
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          {experience.image ? (
                            <>
                              <Image
                                src={experience.image}
                                alt={experience.name}
                                fill
                                className="object-cover object-top group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                            </>
                          ) : (
                            <div className="h-full relative overflow-hidden bg-muted/40 dark:bg-muted/20">
                              <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-[0.12] dark:opacity-[0.18]`} />
                              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                <span className="text-[4rem] font-black text-foreground/[0.04] dark:text-foreground/[0.06] select-none leading-none tracking-tighter text-center px-4">
                                  {experience.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contenu */}
                        <div className="p-5 flex flex-col flex-1">
                          {/* Badges type/year + tech chips */}
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border border-current/20 ${getExperienceTypeColor(experience.experienceType)}`}>
                              {getExperienceTypeLabel(experience.experienceType, locale)}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground">
                              {experience.year}
                            </span>
                            <div className="w-px h-3 bg-border/60 mx-0.5" />
                            {experience.features.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-muted/60 text-muted-foreground/70 dark:bg-muted/40">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-lg font-semibold text-foreground tracking-tight mb-0.5">{experience.name}</h3>
                          <p className="text-sm text-primary font-medium mb-2">{experience.category}</p>
                          <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 mb-4">{experience.description}</p>

                          {/* Footer */}
                          <div className="mt-auto pt-3 border-t border-border/30 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                              <span>{experience.platforms.join(' · ')}</span>
                              <span>·</span>
                              <span>{experience.stats.teamSize}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                              <span>{uiTexts.buttons.viewDetails}</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
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
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">{uiTexts.nav.skills}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {uiTexts.descriptions.myTechStack}
          </p>

          {/* Technical Skills - Narrative cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {technicalSkills.map((skill) => (
              <IOSCard key={skill.id} variant="subtle" padding="lg" className="card-premium-hover relative">
                {/* Accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${skill.gradient}`} />

                <div className="pl-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">{skill.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground/60 px-2 py-0.5 rounded-md border border-border/50 bg-muted/30">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{skill.narrative}</p>
                  <ul className="space-y-1.5">
                    {skill.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-foreground/25 flex-shrink-0" />
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
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{aiContent.title}</h3>
            <IOSCard variant="subtle" padding="lg" className="card-premium-hover relative max-w-3xl mx-auto">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-purple-500/40" />
              <div className="flex items-center gap-3 mb-4 pl-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-purple-500/20 bg-purple-500/[0.06] bg-clip-padding text-purple-600 dark:text-purple-400">
                  AI
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{aiContent.subtitle}</h4>
                  <p className="text-xs text-muted-foreground/60">{uiTexts.descriptions.aiToolsIntegrated}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{aiContent.narrative}</p>
              <ul className="space-y-2 mb-6">
                {aiContent.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-purple-500/40 flex-shrink-0" />
                    <span className="text-foreground/80">{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {aiContent.tools.map((tool) => (
                  <IOSChip key={tool.name} variant="default" size="md" className="!bg-purple-500/[0.06] !border-purple-500/15 !text-purple-700 dark:!text-purple-300">
                    {tool.name}
                  </IOSChip>
                ))}
              </div>
            </IOSCard>
          </div>

          {/* Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {softSkills.map((skill) => (
              <IOSCard key={skill.id} variant="subtle" padding="md" className="card-premium-hover relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${skill.gradient} opacity-50`} />
                <h3 className="font-semibold text-foreground text-sm mb-2 tracking-tight">{skill.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{skill.narrative}</p>
              </IOSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6 bg-gradient-to-br from-teal-50/70 via-background to-emerald-50/50 dark:from-teal-950/30 dark:via-background dark:to-emerald-950/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold text-foreground">{uiTexts.sections.experience}</h2>
            <PDFDownloadButton />
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            {uiTexts.descriptions.myProfessionalBackground}
          </p>

          <div className="space-y-6">
            {workExperiences.slice(0, 9).map((exp) => (
              <IOSCard key={exp.id} variant="subtle" padding="lg" className="card-premium-hover">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">{exp.company}</h3>
                    <p className="text-primary font-medium">{exp.role}</p>
                  </div>
	                  <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
	                    <p className="font-medium">
	                      {exp.startDate} - {exp.endDate || uiTexts.labels.present}
	                    </p>
	                    <p>{exp.location}</p>
	                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.description.slice(0, 3).map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-foreground/20 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.slice(0, 6).map((skill) => (
                    <IOSBadge key={skill} variant="default" size="sm" className="!bg-muted/50 !text-muted-foreground border border-border/30">
                      {skill}
                    </IOSBadge>
                  ))}
                </div>
              </IOSCard>
            ))}
          </div>

          {/* Education */}
          <h3 className="text-2xl font-bold text-foreground mt-16 mb-6 text-center">
            {uiTexts.sections.education}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu) => (
              <IOSCard key={edu.id} variant="subtle" padding="md" className="card-premium-hover">
                <p className="text-base font-semibold text-foreground tracking-tight">{edu.degree}</p>
                <p className="text-sm text-muted-foreground/70 mt-0.5">{edu.school}</p>
                <p className="text-xs text-primary/70 font-medium mt-2">{edu.year}</p>
              </IOSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-violet-50/70 via-background to-purple-50/50 dark:from-violet-950/30 dark:via-background dark:to-purple-950/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Gauche: Titre, sous-titre, icônes */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-3">
                  {uiTexts.hero.letsWorkTogether}
                </h2>
                <p className="text-muted-foreground text-lg">
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
                    linkedin: 'text-[#0A66C2]',
                    github: 'text-zinc-800 dark:text-zinc-200',
                    malt: 'text-[#FC5757]',
                    email: 'text-emerald-500',
                    phone: 'text-violet-500',
                  };
                  const iconColor = brandColors[link.id] || 'text-foreground';
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group"
                      title={link.name}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-sm transform transition-all duration-200 ease-out group-hover:scale-110 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-border group-active:scale-95">
                        <span className={`${iconColor} transition-transform duration-200 group-hover:scale-110`}>
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
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}.{" "}
            {uiTexts.labels.allRightsReserved}
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
        {selectedExperience && <ExperienceDetailPanel experience={selectedExperience} />}
      </IOSSidePanel>
    </div>
  );
};
