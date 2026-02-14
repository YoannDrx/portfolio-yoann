'use client';

import { useState, useMemo } from 'react';
import type { Project, ProjectType } from '@/data';

export type ProjectFilter = 'all' | ProjectType;

const SECTION_ORDER: ProjectType[] = ['cdi', 'freelance', 'personal'];

export interface ProjectSection {
  type: ProjectType;
  projects: Project[];
}

export function useProjectFilter(projects: Project[]) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const counts = useMemo(() => {
    const result: Record<ProjectFilter, number> = {
      all: projects.length,
      cdi: 0,
      freelance: 0,
      personal: 0,
    };
    for (const p of projects) {
      result[p.projectType]++;
    }
    return result;
  }, [projects]);

  const sections = useMemo<ProjectSection[]>(() => {
    if (activeFilter === 'all') {
      return SECTION_ORDER
        .map((type) => ({
          type,
          projects: projects.filter((p) => p.projectType === type),
        }))
        .filter((s) => s.projects.length > 0);
    }
    const filtered = projects.filter((p) => p.projectType === activeFilter);
    return filtered.length > 0 ? [{ type: activeFilter, projects: filtered }] : [];
  }, [projects, activeFilter]);

  const showSectionHeaders = activeFilter === 'all';

  return { activeFilter, setActiveFilter, sections, counts, showSectionHeaders };
}
