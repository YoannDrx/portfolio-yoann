"use client";

/**
 * ExperiencesScreen
 * Écran listant les expériences du portfolio avec vue détaillée
 */

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Apple, Smartphone, Globe, Users, Download, ExternalLink, Github } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar } from '../ios';
import { ImageGallery } from '../experiences/ImageGallery';
import { ExperienceFilterBar } from '../experiences/ExperienceFilterBar';
import { ExperienceSectionHeader } from '../experiences/ExperienceSectionHeader';
import { getExperiences, getExperiencesCount, getUiTexts } from '@/data';
import { useExperienceFilter } from '@/hooks/use-experience-filter';
import { useI18n } from '@/i18n/I18nProvider';
import type { Experience, ExperienceType } from '@/data';

const getExperienceTypeLabel = (type: ExperienceType, locale: string) => {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: 'Client Freelance', en: 'Freelance client' },
    cdi: { fr: 'CDI', en: 'Full-time' },
    personal: { fr: 'Perso', en: 'Personal' },
  };
  return locale === 'en' ? labels[type].en : labels[type].fr;
};

const getExperienceTypeColor = (type: ExperienceType) => {
  const colors: Record<ExperienceType, string> = {
    freelance: 'bg-blue-500/20 text-blue-600',
    cdi: 'bg-green-500/20 text-green-600',
    personal: 'bg-purple-500/20 text-purple-600',
  };
  return colors[type];
};

interface ExperiencesScreenProps {
  onNavigate: (tab: string) => void;
  hideStatusBar?: boolean;
}

const ExperiencesScreen = ({ onNavigate, hideStatusBar = false }: ExperiencesScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const experiences = getExperiences(locale);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { activeFilter, setActiveFilter, sections, counts, showSectionHeaders } = useExperienceFilter(experiences);

  if (selectedExperience) {
    return (
      <ExperienceDetail experience={selectedExperience} onBack={() => setSelectedExperience(null)} hideStatusBar={hideStatusBar} />
    );
  }

  return (
    <div className="h-full bg-background flex flex-col">
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
                <ExperienceSectionHeader type={section.type} count={section.experiences.length} compact />
              )}
              <div className="px-5 space-y-4 stagger-children">
                {section.experiences.map((experience) => (
                  <IOSCard
                    key={experience.id}
                    variant="glass"
                    padding="none"
                    interactive
                    onPress={() => setSelectedExperience(experience)}
                  >
                    {/* Header avec Image ou Gradient */}
                    <div className={`h-32 relative overflow-hidden ${!experience.image ? `bg-gradient-to-br ${experience.gradient}` : ''}`}>
                      {experience.image ? (
                        <Image
                          src={experience.image}
                          alt={experience.name}
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl">{experience.emoji}</span>
                        </div>
                      )}
                      {/* Overlay gradient pour lisibilité des tags */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                      {/* Year - coin gauche */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-black/30 backdrop-blur-sm text-white">
                          {experience.year}
                        </span>
                      </div>
                      {/* Platform Icons - coin droit */}
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                          {experience.platforms.includes('web') && (
                            <Globe className="w-3 h-3 text-white" />
                          )}
                          {experience.platforms.includes('ios') && (
                            <Apple className="w-3 h-3 text-white" />
                          )}
                          {experience.platforms.includes('android') && (
                            <Smartphone className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Titre + Tag aligné à droite */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground flex-1">{experience.name}</h3>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getExperienceTypeColor(experience.experienceType)}`}>
                            {getExperienceTypeLabel(experience.experienceType, locale)}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Catégorie */}
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {experience.category}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {experience.stats.teamSize}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {experience.stats.downloads}
                          </span>
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
    </div>
  );
};

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
  hideStatusBar?: boolean;
}

const ExperienceDetail = ({ experience, onBack, hideStatusBar = false }: ExperienceDetailProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="h-full bg-background flex flex-col animate-ios-push">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button - Added padding bottom */}
      <div className="px-5 pt-2 pb-4">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto min-h-0 min-w-0">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero - Image Gallery */}
        <div className="mx-5 mt-4">
          {(experience.images && experience.images.length > 0) || experience.image ? (
            <ImageGallery
              images={experience.images && experience.images.length > 0 ? experience.images : experience.image ? [experience.image] : []}
              projectName={experience.name}
              gradient={experience.gradient}
              emoji={experience.emoji}
              forceStackLayout={true}
              heightClass="h-40"
            />
          ) : (
            <div className={`h-40 rounded-2xl relative overflow-hidden bg-gradient-to-br ${experience.gradient}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl animate-float">{experience.emoji}</span>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-5 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getExperienceTypeColor(experience.experienceType)}`}>
              {getExperienceTypeLabel(experience.experienceType, locale)}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
              {experience.year}
            </span>
          </div>
          <h1 className="ios-nav-title-large">{experience.name}</h1>
          <p className="text-primary font-medium mt-1">{experience.category}</p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            {experience.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-xl font-bold text-foreground">
                  {experience.stats.teamSize}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.team}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{experience.stats.downloads}</p>
              <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.downloads}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                {experience.platforms.includes('web') && <Globe className="w-5 h-5" />}
                {experience.platforms.includes('ios') && <Apple className="w-5 h-5" />}
                {experience.platforms.includes('android') && <Smartphone className="w-5 h-5" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.platforms}</p>
            </div>
          </div>

          {/* Long Description */}
          {experience.longDescription && (
            <div className="mt-6 p-4 bg-muted/50 rounded-2xl">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {experience.longDescription}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
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
              {experience.stack.frontend && experience.stack.frontend.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.frontend}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.stack.frontend.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {experience.stack.backend && experience.stack.backend.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.backend}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.stack.backend.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {experience.stack.database && experience.stack.database.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.database}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.stack.database.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {experience.stack.devops && experience.stack.devops.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.devops}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.stack.devops.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {experience.stack.testing && experience.stack.testing.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.testing}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.stack.testing.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600">
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
	              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
	                {uiTexts.sections.highlights}
	              </h3>
              <div className="space-y-3">
                {experience.highlights.map((highlight) => (
                  <div key={highlight.title} className="p-3 bg-muted/30 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground">{highlight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{highlight.description}</p>
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
                <IOSButton fullWidth leftIcon={<ExternalLink className="w-5 h-5" />}>
                  {uiTexts.buttons.viewProject}
                </IOSButton>
              </a>
	            ) : (
	              <IOSButton
                fullWidth
                leftIcon={<ExternalLink className="w-5 h-5" />}
                disabled
                className="opacity-50 cursor-not-allowed"
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
	                <IOSButton variant="secondary" fullWidth leftIcon={<Github className="w-5 h-5" />}>
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
                <IOSButton variant="secondary" fullWidth leftIcon={<Apple className="w-5 h-5" />}>
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
                <IOSButton variant="secondary" fullWidth leftIcon={<Smartphone className="w-5 h-5" />}>
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
