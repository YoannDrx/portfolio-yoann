'use client';

import { IOSChip } from '@/components/ios';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { ProjectFilter } from '@/hooks/use-project-filter';
import type { ProjectType } from '@/data';

const FILTER_OPTIONS: ProjectFilter[] = ['all', 'cdi', 'freelance', 'personal'];

interface ProjectFilterBarProps {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  counts: Record<ProjectFilter, number>;
  compact?: boolean;
}

export function ProjectFilterBar({ activeFilter, onFilterChange, counts, compact }: ProjectFilterBarProps) {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  const getLabel = (filter: ProjectFilter) => {
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
