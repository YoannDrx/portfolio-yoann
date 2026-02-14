"use client";

/**
 * ExperienceDetailPanel
 * Contenu du panneau latéral pour afficher les détails d'une expérience
 */

import Image from 'next/image';
import { Users, Download, Globe, Apple, Smartphone, ExternalLink, Github } from 'lucide-react';
import { IOSButton, IOSBadge } from '@/components/ios';
import { ImageGallery } from './ImageGallery';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { Experience, ExperienceType } from '@/data';

const getExperienceTypeLabel = (type: ExperienceType, locale: string) => {
  const labels: Record<ExperienceType, { fr: string; en: string }> = {
    freelance: { fr: 'Client Freelance', en: 'Freelance client' },
    cdi: { fr: 'CDI', en: 'Full-time' },
    personal: { fr: 'Perso', en: 'Personal project' },
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

interface ExperienceDetailPanelProps {
  experience: Experience;
}

export const ExperienceDetailPanel = ({ experience }: ExperienceDetailPanelProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  // Use images array if available, otherwise fallback to single image
  const galleryImages = experience.images && experience.images.length > 0
    ? experience.images
    : experience.image
      ? [experience.image]
      : [];

  return (
    <div className="min-h-full bg-background">
      {/* Hero Image Gallery */}
      <ImageGallery
        images={galleryImages}
        projectName={experience.name}
        gradient={experience.gradient}
        emoji={experience.emoji}
      />

      {/* Content */}
      <div className="px-6 pb-8 -mt-8 relative">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getExperienceTypeColor(experience.experienceType)}`}>
            {getExperienceTypeLabel(experience.experienceType, locale)}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
            {experience.year}
          </span>
        </div>

        {/* Title & Category */}
        <h2 className="text-3xl font-bold text-foreground">{experience.name}</h2>
        <p className="text-primary font-medium mt-1">{experience.category}</p>

        {/* Short Description */}
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6 py-4 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold text-foreground">{experience.stats.teamSize}</span>
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

        {/* Tech Stack - Simple tags */}
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

        {/* Detailed Stack by category */}
        {experience.stack && (
          <div className="mt-6 space-y-4">
            {experience.stack.frontend && experience.stack.frontend.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-blue-600 mb-2">{uiTexts.stackLabels.frontend}</h4>
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
                <h4 className="text-xs font-semibold text-green-600 mb-2">{uiTexts.stackLabels.backend}</h4>
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
                <h4 className="text-xs font-semibold text-purple-600 mb-2">{uiTexts.stackLabels.database}</h4>
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
                <h4 className="text-xs font-semibold text-orange-600 mb-2">{uiTexts.stackLabels.devops}</h4>
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
                <h4 className="text-xs font-semibold text-red-600 mb-2">{uiTexts.stackLabels.testing}</h4>
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

        {/* CTA Buttons */}
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

          {/* Store buttons in a row */}
          {(experience.links?.appStore || experience.links?.playStore) && (
            <div className="flex gap-3">
              {experience.links?.appStore && (
                <a
                  href={experience.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
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
                  className="flex-1"
                >
                  <IOSButton variant="secondary" fullWidth leftIcon={<Smartphone className="w-5 h-5" />}>
                    Play Store
                  </IOSButton>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPanel;
