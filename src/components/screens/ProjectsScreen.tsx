"use client";

/**
 * ProjectsScreen
 * Écran listant les projets du portfolio avec vue détaillée
 */

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Apple, Smartphone, Globe, Star, Download, ExternalLink, Github } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar } from '../ios';
import { getProjects, getProjectsCount, getUiTexts } from '@/data';
import { LocaleToggle } from '@/components/LocaleToggle';
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

interface ProjectsScreenProps {
  onNavigate: (tab: string) => void;
  hideStatusBar?: boolean;
}

const ProjectsScreen = ({ onNavigate, hideStatusBar = false }: ProjectsScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const projects = getProjects(locale);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} hideStatusBar={hideStatusBar} />
    );
  }

  return (
    <div className="h-full bg-secondary flex flex-col">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <IOSNavigationBar
          title={uiTexts.nav.projects}
          subtitle={`${getProjectsCount(locale)} ${uiTexts.stats.publishedApps}`}
          rightAction={<LocaleToggle />}
        />

        {/* Project Cards */}
        <div className="px-5 space-y-4 stagger-children">
          {projects.map((project) => (
            <IOSCard
              key={project.id}
              variant="glass"
              padding="none"
              interactive
              onPress={() => setSelectedProject(project)}
            >
              {/* Header avec Image ou Gradient */}
              <div className={`h-32 relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                )}
                {/* Overlay gradient pour lisibilité des tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                {/* Year - coin gauche */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-black/30 backdrop-blur-sm text-white">
                    {project.year}
                  </span>
                </div>
                {/* Platform Icons - coin droit */}
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    {project.platforms.includes('web') && (
                      <Globe className="w-3 h-3 text-white" />
                    )}
                    {project.platforms.includes('ios') && (
                      <Apple className="w-3 h-3 text-white" />
                    )}
                    {project.platforms.includes('android') && (
                      <Smartphone className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Titre + Tag aligné à droite */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground flex-1">{project.name}</h3>
                  <div className="flex flex-col items-end gap-1.5">
	                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getProjectTypeColor(project.projectType)}`}>
	                      {getProjectTypeLabel(project.projectType, locale)}
	                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Catégorie */}
                <p className="text-sm text-muted-foreground mt-0.5">
                  {project.category}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-foreground">
                      {project.stats.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.stats.downloads}
                    </span>
                  </div>
                </div>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  hideStatusBar?: boolean;
}

const ProjectDetail = ({ project, onBack, hideStatusBar = false }: ProjectDetailProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="h-full bg-secondary flex flex-col animate-ios-push">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button - Added padding bottom */}
      <div className="px-5 pt-2 pb-4">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto min-h-0 min-w-0">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero */}
        <div
          className={`mx-5 mt-4 h-48 rounded-3xl relative overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl animate-float">{project.emoji}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-5 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getProjectTypeColor(project.projectType)}`}>
              {getProjectTypeLabel(project.projectType, locale)}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
              {project.year}
            </span>
          </div>
          <h1 className="ios-nav-title-large">{project.name}</h1>
          <p className="text-primary font-medium mt-1">{project.category}</p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-foreground">
                  {project.stats.rating}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.rating}</p>
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

          {/* Tech Stack */}
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

          {/* Detailed Stack */}
          {project.stack && (
            <div className="mt-6 space-y-4">
              {project.stack.frontend && project.stack.frontend.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.frontend}</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.backend}</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.database}</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.devops}</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">{uiTexts.stackLabels.testing}</h4>
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

          {/* CTA - Boutons fonctionnels */}
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

            {project.links?.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
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

export default ProjectsScreen;
