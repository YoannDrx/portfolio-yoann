'use client';

import { IOSChip } from '@/components/ios';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { ExperienceFilter } from '@/hooks/use-experience-filter';
import type { ExperienceType } from '@/data';

const FILTER_OPTIONS: ExperienceFilter[] = ['all', 'cdi', 'freelance', 'personal'];

interface ExperienceFilterBarProps {
  activeFilter: ExperienceFilter;
  onFilterChange: (filter: ExperienceFilter) => void;
  counts: Record<ExperienceFilter, number>;
  compact?: boolean;
}

export function ExperienceFilterBar({ activeFilter, onFilterChange, counts, compact }: ExperienceFilterBarProps) {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  const getLabel = (filter: ExperienceFilter) => {
    return uiTexts.filters[filter as keyof typeof uiTexts.filters];
  };

  return (
    <div
      className={
        compact
          ? 'flex gap-2 px-5 overflow-x-auto scrollbar-hide'
          : 'flex flex-wrap justify-center gap-3'
      }
    >
      {FILTER_OPTIONS.map((filter) => (
        <IOSChip
          key={filter}
          size={compact ? 'sm' : 'md'}
          selected={activeFilter === filter}
          onToggle={() => onFilterChange(filter)}
        >
          {getLabel(filter)} ({counts[filter]})
        </IOSChip>
      ))}
    </div>
  );
}
