"use client";

import { IOSChip } from "@/components/ios";
import { getUiTexts } from "@/data";
import { useI18n } from "@/i18n/I18nProvider";
import type { ExperienceFilter } from "@/hooks/use-experience-filter";

const FILTER_OPTIONS: ExperienceFilter[] = [
  "all",
  "dev",
  "cdi",
  "freelance",
  "personal",
  "cinema",
  "ops",
];

interface ExperienceFilterBarProps {
  activeFilter: ExperienceFilter;
  onFilterChange: (filter: ExperienceFilter) => void;
  counts: Record<ExperienceFilter, number>;
  compact?: boolean;
}

export function ExperienceFilterBar({
  activeFilter,
  onFilterChange,
  counts,
  compact,
}: ExperienceFilterBarProps) {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  const getLabel = (filter: ExperienceFilter) => {
    return uiTexts.filters[filter as keyof typeof uiTexts.filters];
  };

  return (
    <div
      role="tablist"
      aria-label="Filter experiences"
      className={
        compact
          ? "scrollbar-hide flex gap-2 overflow-x-auto px-5"
          : "flex flex-wrap justify-center gap-3"
      }
    >
      {FILTER_OPTIONS.map((filter) => {
        const count = counts[filter];
        if (filter !== "all" && count === 0) return null;
        return (
          <IOSChip
            key={filter}
            size={compact ? "sm" : "md"}
            selected={activeFilter === filter}
            onToggle={() => onFilterChange(filter)}
            role="tab"
            aria-selected={activeFilter === filter}
          >
            {getLabel(filter)} ({count})
          </IOSChip>
        );
      })}
    </div>
  );
}
