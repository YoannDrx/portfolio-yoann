"use client";

/**
 * ProjectsScreen
 * Écran listant les projets du portfolio avec vue détaillée
 */

import { useState } from 'react';
import { ChevronRight, Apple, Smartphone, Globe, Star, Download, ExternalLink, Github } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar } from '../ios';
import { projects, getProjectsCount, uiTexts } from '@/data';
import type { Project, ProjectType } from '@/data';

const getProjectTypeLabel = (type: ProjectType) => {
  const labels: Record<ProjectType, string> = {
    freelance: 'Client Freelance',
    cdi: 'CDI',
    personal: 'Projet Perso',
  };
  return labels[type];
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
}

const ProjectsScreen = ({ onNavigate }: ProjectsScreenProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
    );
  }

  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <IOSNavigationBar
          title={uiTexts.nav.projects}
          subtitle={`${getProjectsCount()} ${uiTexts.stats.publishedApps}`}
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
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                )}
                {/* Overlay gradient pour lisibilité des tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                {/* Project Type Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-[10px] font-semibold rounded-full backdrop-blur-sm ${getProjectTypeColor(project.projectType)}`}>
                    {getProjectTypeLabel(project.projectType)}
                  </span>
                </div>
                {/* Year */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-black/30 backdrop-blur-sm text-white">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {project.category}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
                </div>

                {/* Stats & Platforms */}
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
                  <div className="flex-1" />
                  <div className="flex items-center gap-1.5">
                    {project.platforms.includes('web') && (
                      <Globe className="w-4 h-4 text-foreground" />
                    )}
                    {project.platforms.includes('ios') && (
                      <Apple className="w-4 h-4 text-foreground" />
                    )}
                    {project.platforms.includes('android') && (
                      <Smartphone className="w-4 h-4 text-foreground" />
                    )}
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
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  return (
    <div className="h-full bg-secondary flex flex-col animate-ios-push">
      <StatusBar />

      {/* Back Button */}
      <div className="px-5 pt-2">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto">
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
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top"
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
              {getProjectTypeLabel(project.projectType)}
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
                  <h4 className="text-xs font-semibold text-primary mb-2">Frontend</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">Backend</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">Database</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">DevOps</h4>
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
                  <h4 className="text-xs font-semibold text-primary mb-2">Testing</h4>
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
                Points forts
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
                Projet privé
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
                  Voir le code
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
