"use client";

/**
 * ExperienceDetailPanel
 * Contenu du panneau latéral pour afficher les détails d'une expérience
 */

import Image from "next/image";
import {
  Users,
  Download,
  Globe,
  Apple,
  Smartphone,
  ExternalLink,
  Github,
} from "lucide-react";
import { IOSButton, IOSBadge } from "@/components/ios";
import { ImageGallery } from "./ImageGallery";
import {
  getExperienceTypeClasses,
  getExperienceTypeLabel,
  getUiTexts,
} from "@/data";
import { useI18n } from "@/i18n/I18nProvider";
import type { Experience } from "@/data";

interface ExperienceDetailPanelProps {
  experience: Experience;
}

export const ExperienceDetailPanel = ({
  experience,
}: ExperienceDetailPanelProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  // Use images array if available, otherwise fallback to single image
  const galleryImages =
    experience.images && experience.images.length > 0
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
      <div className="relative -mt-8 px-6 pb-8">
        {/* Badges */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase ${getExperienceTypeClasses(experience.experienceType)}`}
          >
            {getExperienceTypeLabel(experience.experienceType, locale)}
          </span>
          <span className="rounded-sm border border-border px-2.5 py-1 font-mono text-[10px] font-semibold text-muted-foreground">
            {experience.year}
          </span>
        </div>

        {/* Title & Category */}
        <h2 className="font-display text-4xl font-bold uppercase text-foreground">
          {experience.name}
        </h2>
        <p className="mt-1 font-medium text-primary">{experience.category}</p>

        {/* Short Description */}
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {experience.description}
        </p>

        {/* Stats */}
        <div className="mt-6 flex items-center gap-6 border-y border-border py-4">
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
          <div className="mt-6 rounded-md border border-border bg-muted/35 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {experience.longDescription}
            </p>
          </div>
        )}

        {/* Tech Stack - Simple tags */}
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

        {/* Detailed Stack by category */}
        {experience.stack && (
          <div className="mt-6 space-y-4">
            {experience.stack.frontend &&
              experience.stack.frontend.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-blue-600">
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
                  <h4 className="mb-2 text-xs font-semibold text-green-600">
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
                  <h4 className="mb-2 text-xs font-semibold text-purple-600">
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
            {experience.stack.devops && experience.stack.devops.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold text-orange-600">
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
                  <h4 className="mb-2 text-xs font-semibold text-red-600">
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

        {/* CTA Buttons */}
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
                  className="flex-1"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPanel;
