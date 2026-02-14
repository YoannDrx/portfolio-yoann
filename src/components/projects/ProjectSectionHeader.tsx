'use client';

import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { ProjectType } from '@/data';

interface ProjectSectionHeaderProps {
  type: ProjectType;
  count: number;
  compact?: boolean;
}

export function ProjectSectionHeader({ type, count, compact }: ProjectSectionHeaderProps) {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  const label = uiTexts.filters[type as keyof typeof uiTexts.filters];

  if (compact) {
    return (
      <div className="px-5 pt-5 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label} ({count})
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mb-6">
      <h3 className="text-xl font-semibold text-foreground whitespace-nowrap">
        {label}
      </h3>
      <span className="text-sm text-muted-foreground">({count})</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
