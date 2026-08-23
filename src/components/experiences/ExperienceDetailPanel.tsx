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
  const comparisonSections = experience.comparison
    ? [
        {
          title: experience.comparison.title ?? (locale === "en" ? "Home" : "Accueil"),
          before: experience.comparison.before,
          after: experience.comparison.after,
          beforeLabel: experience.comparison.beforeLabel,
          afterLabel: experience.comparison.afterLabel,
        },
        ...(experience.comparison.additional ?? []),
      ]
    : [];

  return (
    <div className="min-h-full bg-background">
      {/* Hero Image Gallery */}
      <ImageGallery
        images={galleryImages}
        projectName={experience.name}
        gradient={experience.gradient}
        emoji={experience.emoji}
        firstImageContain
        containAllImages
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

        {(experience.role || experience.employer || experience.client || experience.venue) ? (
          <dl className="mt-5 grid gap-3 rounded-[20px] border border-border bg-muted/25 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {experience.role ? <div><dt className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">{locale === "en" ? "Role" : "Rôle"}</dt><dd className="mt-1 font-semibold">{experience.role}</dd></div> : null}
            {experience.employer ? <div><dt className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">{locale === "en" ? "Employer" : "Employeur"}</dt><dd className="mt-1 font-semibold">{experience.employer}</dd></div> : null}
            {experience.client ? <div><dt className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">Client</dt><dd className="mt-1 font-semibold">{experience.client}</dd></div> : null}
            {experience.venue ? <div><dt className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">{locale === "en" ? "Venue" : "Lieu"}</dt><dd className="mt-1 font-semibold">{experience.venue}</dd></div> : null}
          </dl>
        ) : null}

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
              {experience.stats.downloadsLabel ?? uiTexts.stats.downloads}
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

        {comparisonSections.length > 0 ? (
          <section className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{locale === "en" ? "Before / after" : "Avant / après"}</h3>
            <div className="space-y-7">
              {comparisonSections.map((comparison) => (
                <article key={comparison.title} className="rounded-[26px] border border-border bg-muted/15 p-3 sm:p-4">
                  <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[.17em] text-primary">{comparison.title}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {([[comparison.before, comparison.beforeLabel], [comparison.after, comparison.afterLabel]] as const).map(([src, label]) => (
                      <figure key={src} className="overflow-hidden rounded-[20px] border border-border bg-slate-950">
                        <div className="relative aspect-[16/10]"><Image src={src} alt={label} fill className="object-contain object-center" sizes="(max-width: 640px) 90vw, 520px" /></div>
                        <figcaption className="border-t border-white/10 bg-background px-4 py-3 text-sm font-semibold text-foreground">{label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {experience.mediaCredit ? <p className="mt-3 text-[10px] text-muted-foreground">{experience.mediaCredit}</p> : null}

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
