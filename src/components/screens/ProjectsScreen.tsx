/**
 * ProjectsScreen
 * Écran listant les projets du portfolio avec vue détaillée
 */

import { useState } from 'react';
import { ChevronRight, Apple, Smartphone, Star, Download, ExternalLink } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar } from '../ios';
import { projects, getProjectsCount, uiTexts } from '@/data';
import type { Project } from '@/data';

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
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-br ${project.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">{project.emoji}</span>
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
          className={`mx-5 mt-4 h-48 rounded-3xl bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl animate-float">{project.emoji}</span>
          </div>
        </div>

        {/* Info */}
        <div className="px-5 mt-6">
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
                {project.platforms.includes('ios') && <Apple className="w-5 h-5" />}
                {project.platforms.includes('android') && <Smartphone className="w-5 h-5" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{uiTexts.stats.platforms}</p>
            </div>
          </div>

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

          {/* CTA */}
          <div className="mt-8">
            <IOSButton fullWidth leftIcon={<ExternalLink className="w-5 h-5" />}>
              {uiTexts.buttons.viewProject}
            </IOSButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
