"use client";

/**
 * ExperiencesScreen
 * Écran listant les expériences du portfolio avec vue détaillée
 */

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Apple,
  Smartphone,
  Globe,
  Users,
  Download,
  ExternalLink,
  Github,
} from "lucide-react";
import StatusBar from "../device/StatusBar";
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar } from "../ios";
import { ImageGallery } from "../experiences/ImageGallery";
import { ExperienceFilterBar } from "../experiences/ExperienceFilterBar";
import { ExperienceSectionHeader } from "../experiences/ExperienceSectionHeader";
import { getExperiences, getExperiencesCount, getUiTexts } from "@/data";
import { useExperienceFilter } from "@/hooks/use-experience-filter";
import { useI18n } from "@/i18n/I18nProvider";
import type { Experience, ExperienceType } from "@/data";

const getExperienceTypeLabel = (type: ExperienceType, locale: string) => {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: "Client Freelance", en: "Freelance client" },
    cdi: { fr: "CDI", en: "Full-time" },
    personal: { fr: "Perso", en: "Personal" },
    ponctuel: { fr: "Freelance", en: "Freelance" },
    hors_tech: { fr: "Autre", en: "Other" },
    cinema: { fr: "Cinéma", en: "Cinema" },
    ops: { fr: "Ops", en: "Ops" },
  };
  return locale === "en" ? labels[type].en : labels[type].fr;
};

const getExperienceTypeColor = (type: ExperienceType) => {
  const colors: Record<ExperienceType, string> = {
    freelance: "bg-blue-500/20 text-blue-600",
    cdi: "bg-green-500/20 text-green-600",
    personal: "bg-purple-500/20 text-purple-600",
    ponctuel: "bg-blue-500/20 text-blue-600",
    hors_tech: "bg-violet-500/20 text-violet-600",
    cinema: "bg-amber-500/20 text-amber-600",
    ops: "bg-emerald-500/20 text-emerald-600",
  };
  return colors[type];
};

interface ExperiencesScreenProps {
  onNavigate: (tab: string) => void;
  hideStatusBar?: boolean;
}

const ExperiencesScreen = ({
  onNavigate,
  hideStatusBar = false,
}: ExperiencesScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const experiences = getExperiences(locale);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const {
    activeFilter,
    setActiveFilter,
    sections,
    counts,
    showSectionHeaders,
  } = useExperienceFilter(experiences);

  if (selectedExperience) {
    return (
      <ExperienceDetail
        experience={selectedExperience}
        onBack={() => setSelectedExperience(null)}
        hideStatusBar={hideStatusBar}
      />
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <IOSNavigationBar
          title={uiTexts.nav.experiences}
          subtitle={`${counts[activeFilter]} ${uiTexts.stats.publishedApps}`}
        />

        {/* Filter Chips */}
        <div className="py-2">
          <ExperienceFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            compact
          />
        </div>

        {/* Experience Cards */}
        <div className="space-y-0 pb-32">
          {sections.map((section) => (
            <div key={section.type}>
              {showSectionHeaders && (
                <ExperienceSectionHeader
                  type={section.type}
                  count={section.experiences.length}
                  compact
                />
              )}
              <div className="stagger-children space-y-4 px-5">
                {section.experiences.map((experience) => (
                  <IOSCard
                    key={experience.id}
                    variant="subtle"
                    padding="none"
                    interactive
                    onPress={() => setSelectedExperience(experience)}
                    className="card-premium-hover relative"
                  >
                    {/* Accent gradient line top */}
                    <div
                      className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${experience.gradient} z-10`}
                    />

                    {/* Header avec Image ou Gradient */}
                    <div className="relative h-32 overflow-hidden">
                      {experience.image ? (
                        <Image
                          src={experience.image}
                          alt={experience.name}
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted/30 dark:bg-muted/15">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-[0.10] dark:opacity-[0.15]`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            <span className="select-none px-4 text-center text-[2.5rem] font-black leading-none tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.06]">
                              {experience.name}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      {/* Year - coin gauche */}
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                          {experience.year}
                        </span>
                      </div>
                      {/* Platform Icons - coin droit */}
                      <div className="absolute right-3 top-3">
                        <div className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
                          {experience.platforms.includes("web") && (
                            <Globe className="h-3 w-3 text-white" />
                          )}
                          {experience.platforms.includes("ios") && (
                            <Apple className="h-3 w-3 text-white" />
                          )}
                          {experience.platforms.includes("android") && (
                            <Smartphone className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Titre + Tag */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="flex-1 font-semibold text-foreground">
                          {experience.name}
                        </h3>
                        <span
                          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${getExperienceTypeColor(experience.experienceType)}`}
                        >
                          {getExperienceTypeLabel(
                            experience.experienceType,
                            locale
                          )}
                        </span>
                      </div>

                      {/* Catégorie */}
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {experience.category}
                      </p>

                      {/* Tech chips */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {experience.features.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60 dark:bg-muted/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Footer stats + chevron */}
                      <div className="mt-3 flex items-center justify-between border-t border-border/20 pt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className="text-xs text-muted-foreground">
                              {experience.stats.teamSize}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className="text-xs text-muted-foreground">
                              {experience.stats.downloads}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    </div>
                  </IOSCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
  hideStatusBar?: boolean;
}

const ExperienceDetail = ({
  experience,
  onBack,
  hideStatusBar = false,
}: ExperienceDetailProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="flex h-full animate-ios-push flex-col bg-background">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button - Added padding bottom */}
      <div className="px-5 pb-4 pt-2">
        <IOSButton
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto min-h-0 min-w-0 p-0"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero - Image Gallery */}
        <div className="mx-5 mt-4">
          {(experience.images && experience.images.length > 0) ||
          experience.image ? (
            <ImageGallery
              images={
                experience.images && experience.images.length > 0
                  ? experience.images
                  : experience.image
                    ? [experience.image]
                    : []
              }
              projectName={experience.name}
              gradient={experience.gradient}
              emoji={experience.emoji}
              forceStackLayout={true}
              heightClass="h-40"
            />
          ) : (
            <div className={`relative h-40 overflow-hidden rounded-2xl`}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-20`}
              />
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${experience.gradient}`}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 px-5">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getExperienceTypeColor(experience.experienceType)}`}
            >
              {getExperienceTypeLabel(experience.experienceType, locale)}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
              {experience.year}
            </span>
          </div>
          <h1 className="ios-nav-title-large">{experience.name}</h1>
          <p className="mt-1 font-medium text-primary">{experience.category}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {experience.description}
          </p>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  {experience.stats.teamSize}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {uiTexts.stats.team}
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {experience.stats.downloads}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {uiTexts.stats.downloads}
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                {experience.platforms.includes("web") && (
                  <Globe className="h-5 w-5" />
                )}
                {experience.platforms.includes("ios") && (
                  <Apple className="h-5 w-5" />
                )}
                {experience.platforms.includes("android") && (
                  <Smartphone className="h-5 w-5" />
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {uiTexts.stats.platforms}
              </p>
            </div>
          </div>

          {/* Long Description */}
          {experience.longDescription && (
            <div className="mt-6 rounded-2xl bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {experience.longDescription}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {uiTexts.sections.techStack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.features.map((feature) => (
                <IOSBadge key={feature} variant="default" size="md">
                  {feature}
                </IOSBadge>
              ))}
            </div>
          </div>

          {/* Detailed Stack */}
          {experience.stack && (
            <div className="mt-6 space-y-4">
              {experience.stack.frontend &&
                experience.stack.frontend.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-primary">
                      {uiTexts.stackLabels.frontend}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.stack.frontend.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {experience.stack.backend &&
                experience.stack.backend.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-primary">
                      {uiTexts.stackLabels.backend}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.stack.backend.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {experience.stack.database &&
                experience.stack.database.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-primary">
                      {uiTexts.stackLabels.database}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.stack.database.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {experience.stack.devops &&
                experience.stack.devops.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-primary">
                      {uiTexts.stackLabels.devops}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.stack.devops.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-orange-500/10 px-2 py-1 text-xs text-orange-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {experience.stack.testing &&
                experience.stack.testing.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold text-primary">
                      {uiTexts.stackLabels.testing}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.stack.testing.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Highlights */}
          {experience.highlights && experience.highlights.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {uiTexts.sections.highlights}
              </h3>
              <div className="space-y-3">
                {experience.highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-xl bg-muted/30 p-3"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {highlight.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA - Boutons fonctionnels */}
          <div className="mt-8 space-y-3">
            {experience.links?.website ? (
              <a
                href={experience.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <IOSButton
                  fullWidth
                  leftIcon={<ExternalLink className="h-5 w-5" />}
                >
                  {uiTexts.buttons.viewProject}
                </IOSButton>
              </a>
            ) : (
              <IOSButton
                fullWidth
                leftIcon={<ExternalLink className="h-5 w-5" />}
                disabled
                className="cursor-not-allowed opacity-50"
              >
                {uiTexts.labels.privateExperience}
              </IOSButton>
            )}

            {experience.links?.github && (
              <a
                href={experience.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <IOSButton
                  variant="secondary"
                  fullWidth
                  leftIcon={<Github className="h-5 w-5" />}
                >
                  {uiTexts.buttons.viewCode}
                </IOSButton>
              </a>
            )}

            {experience.links?.appStore && (
              <a
                href={experience.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <IOSButton
                  variant="secondary"
                  fullWidth
                  leftIcon={<Apple className="h-5 w-5" />}
                >
                  App Store
                </IOSButton>
              </a>
            )}

            {experience.links?.playStore && (
              <a
                href={experience.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <IOSButton
                  variant="secondary"
                  fullWidth
                  leftIcon={<Smartphone className="h-5 w-5" />}
                >
                  Play Store
                </IOSButton>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesScreen;
