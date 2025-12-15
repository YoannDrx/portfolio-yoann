"use client";

/**
 * ProjectDetailPanel
 * Contenu du panneau latéral pour afficher les détails d'un projet
 */

import Image from 'next/image';
import { Users, Download, Globe, Apple, Smartphone, ExternalLink, Github } from 'lucide-react';
import { IOSButton, IOSBadge } from '@/components/ios';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { Project, ProjectType } from '@/data';

const getProjectTypeLabel = (type: ProjectType, locale: string) => {
  const labels: Record<ProjectType, { fr: string; en: string }> = {
    freelance: { fr: 'Client Freelance', en: 'Freelance client' },
    cdi: { fr: 'CDI', en: 'Full-time' },
    personal: { fr: 'Projet Perso', en: 'Personal project' },
  };
  return locale === 'en' ? labels[type].en : labels[type].fr;
};

const getProjectTypeColor = (type: ProjectType) => {
  const colors: Record<ProjectType, string> = {
    freelance: 'bg-blue-500/20 text-blue-600',
    cdi: 'bg-green-500/20 text-green-600',
    personal: 'bg-purple-500/20 text-purple-600',
  };
  return colors[type];
};

interface ProjectDetailPanelProps {
  project: Project;
}

export const ProjectDetailPanel = ({ project }: ProjectDetailPanelProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="min-h-full bg-background">
      {/* Hero Image */}
      <div
        className={`h-56 relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 576px"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">{project.emoji}</span>
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 pb-8 -mt-8 relative">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getProjectTypeColor(project.projectType)}`}>
            {getProjectTypeLabel(project.projectType, locale)}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
            {project.year}
          </span>
        </div>

        {/* Title & Category */}
        <h2 className="text-3xl font-bold text-foreground">{project.name}</h2>
        <p className="text-primary font-medium mt-1">{project.category}</p>

        {/* Short Description */}
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6 py-4 border-y border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold text-foreground">{project.stats.teamSize}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.team}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{project.stats.downloads}</p>
            <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.downloads}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {project.platforms.includes('web') && <Globe className="w-5 h-5" />}
              {project.platforms.includes('ios') && <Apple className="w-5 h-5" />}
              {project.platforms.includes('android') && <Smartphone className="w-5 h-5" />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.platforms}</p>
          </div>
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="mt-6 p-4 bg-muted/50 rounded-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>
        )}

        {/* Tech Stack - Simple tags */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {uiTexts.sections.techStack}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <IOSBadge key={feature} variant="default" size="md">
                {feature}
              </IOSBadge>
            ))}
          </div>
        </div>

        {/* Detailed Stack by category */}
        {project.stack && (
          <div className="mt-6 space-y-4">
            {project.stack.frontend && project.stack.frontend.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-blue-600 mb-2">{uiTexts.stackLabels.frontend}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.frontend.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.stack.backend && project.stack.backend.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-green-600 mb-2">{uiTexts.stackLabels.backend}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.backend.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.stack.database && project.stack.database.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-purple-600 mb-2">{uiTexts.stackLabels.database}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.database.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.stack.devops && project.stack.devops.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-orange-600 mb-2">{uiTexts.stackLabels.devops}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.devops.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.stack.testing && project.stack.testing.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-red-600 mb-2">{uiTexts.stackLabels.testing}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.testing.map((tech) => (
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
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {uiTexts.sections.highlights}
            </h3>
            <div className="space-y-3">
              {project.highlights.map((highlight) => (
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
          {project.links?.website ? (
            <a
              href={project.links.website}
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
              {uiTexts.labels.privateProject}
            </IOSButton>
          )}

          {project.links?.github && (
            <a
              href={project.links.github}
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
          {(project.links?.appStore || project.links?.playStore) && (
            <div className="flex gap-3">
              {project.links?.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <IOSButton variant="secondary" fullWidth leftIcon={<Apple className="w-5 h-5" />}>
                    App Store
                  </IOSButton>
                </a>
              )}
              {project.links?.playStore && (
                <a
                  href={project.links.playStore}
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

export default ProjectDetailPanel;
