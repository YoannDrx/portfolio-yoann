"use client";

/**
 * TabBar
 * Barre de navigation inférieure style iOS
 */

import * as React from 'react';
import { Home, FolderOpen, Layers, FileText, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { TabItem, IOSTabBarProps } from '@/design-system/types';

function getDefaultTabs(labels: ReturnType<typeof getUiTexts>): TabItem[] {
  return [
    { id: 'home', label: labels.nav.home, icon: <Home /> },
    { id: 'work', label: labels.nav.experiences, icon: <FolderOpen /> },
    { id: 'skills', label: labels.nav.skills, icon: <Layers /> },
    { id: 'resume', label: labels.nav.resume, icon: <FileText /> },
    { id: 'contact', label: labels.nav.contact, icon: <Mail /> },
  ];
}

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: TabItem[];
  variant?: 'default' | 'floating';
  isFullscreen?: boolean;
}

const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  tabs,
  variant = 'default',
  isFullscreen = false,
}) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const resolvedTabs = tabs ?? getDefaultTabs(uiTexts);

  return (
    <div
      className={cn(
        'left-3 right-3 z-40',
        isFullscreen ? 'fixed bottom-[max(.7rem,env(safe-area-inset-bottom))]' : 'absolute bottom-3'
      )}
    >
	      <div className="rounded-[27px] border border-white/70 bg-background/78 shadow-[0_18px_55px_-20px_hsl(var(--foreground)/.55)] backdrop-blur-2xl dark:border-white/10">
	        <div className="grid min-h-[68px] grid-cols-5 items-center gap-0.5 p-1.5">
	          {resolvedTabs.map((tab) => {
	            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn('relative isolate grid h-[56px] min-w-0 grid-rows-[34px_13px] place-items-center self-center rounded-[21px] px-0.5 py-1 text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary', isActive && 'text-primary')}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive ? <motion.span layoutId="iphone-tab-active" className="absolute inset-0 -z-10 rounded-[21px] bg-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,.55)]" transition={{ type: 'spring', stiffness: 430, damping: 32 }} /> : null}
                <motion.span animate={isActive ? { y: -1, scale: 1.12 } : { y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }} className={cn('grid size-8 place-items-center [&_svg]:size-5', isActive && '[&_svg]:stroke-[2.5px]')}>{tab.icon}</motion.span>
                <span className="block max-w-full truncate text-[8px] font-semibold leading-none">{tab.label}</span>

                {/* Badge */}
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      'absolute -top-1 -right-1',
                      'min-w-[18px] h-[18px] px-1',
                      'flex items-center justify-center',
                      'text-[10px] font-bold text-white',
                      'bg-error rounded-full'
                    )}
                  >
                    {typeof tab.badge === 'number' && tab.badge > 99
                      ? '99+'
                      : tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
