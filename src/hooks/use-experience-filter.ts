"use client";

import { useState, useMemo } from "react";
import {
  DEV_EXPERIENCE_TYPES,
  EXPERIENCE_TYPE_ORDER,
  type Experience,
  type ExperienceType,
} from "@/data";

export type ExperienceFilter = "all" | "dev" | ExperienceType;

export interface ExperienceSection {
  type: ExperienceType;
  experiences: Experience[];
}

export function useExperienceFilter(
  experiences: Experience[],
  initialFilter: ExperienceFilter = "dev"
) {
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>(initialFilter);

  const counts = useMemo(() => {
    const result: Record<ExperienceFilter, number> = {
      all: experiences.length,
      dev: 0,
      cdi: 0,
      freelance: 0,
      personal: 0,
      ponctuel: 0,
      hors_tech: 0,
      cinema: 0,
      ops: 0,
    };
    for (const p of experiences) {
      result[p.experienceType]++;
      if (DEV_EXPERIENCE_TYPES.includes(p.experienceType)) {
        result.dev++;
      }
    }
    return result;
  }, [experiences]);

  const sections = useMemo<ExperienceSection[]>(() => {
    if (activeFilter === "all") {
      return EXPERIENCE_TYPE_ORDER.map((type) => ({
        type,
        experiences: experiences
          .filter((p) => p.experienceType === type)
          .sort((a, b) => b.year.localeCompare(a.year)),
      })).filter((s) => s.experiences.length > 0);
    }
    if (activeFilter === "dev") {
      return EXPERIENCE_TYPE_ORDER.filter((t) => DEV_EXPERIENCE_TYPES.includes(t))
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
    return filtered.length > 0
      ? [{ type: activeFilter, experiences: filtered }]
      : [];
  }, [experiences, activeFilter]);

  const showSectionHeaders = activeFilter === "all" || activeFilter === "dev";

  return {
    activeFilter,
    setActiveFilter,
    sections,
    counts,
    showSectionHeaders,
  };
}
