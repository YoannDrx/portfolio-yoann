'use client';

import { useState, useMemo } from 'react';
import type { Experience, ExperienceType } from '@/data';

export type ExperienceFilter = 'all' | ExperienceType;

const SECTION_ORDER: ExperienceType[] = ['cdi', 'freelance', 'personal'];

export interface ExperienceSection {
  type: ExperienceType;
  experiences: Experience[];
}

export function useExperienceFilter(experiences: Experience[]) {
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all');

  const counts = useMemo(() => {
    const result: Record<ExperienceFilter, number> = {
      all: experiences.length,
      cdi: 0,
      freelance: 0,
      personal: 0,
    };
    for (const p of experiences) {
      result[p.experienceType]++;
    }
    return result;
  }, [experiences]);

  const sections = useMemo<ExperienceSection[]>(() => {
    if (activeFilter === 'all') {
      return SECTION_ORDER
        .map((type) => ({
          type,
          experiences: experiences
            .filter((p) => p.experienceType === type)
            .sort((a, b) => b.year.localeCompare(a.year)),
        }))
        .filter((s) => s.experiences.length > 0);
    }
    const filtered = experiences
      .filter((p) => p.experienceType === activeFilter)
      .sort((a, b) => b.year.localeCompare(a.year));
    return filtered.length > 0 ? [{ type: activeFilter, experiences: filtered }] : [];
  }, [experiences, activeFilter]);

  const showSectionHeaders = activeFilter === 'all';

  return { activeFilter, setActiveFilter, sections, counts, showSectionHeaders };
}
