"use client";

/**
 * TabBar
 * Barre de navigation inférieure style iOS
 */

import * as React from 'react';
import { Home, FolderOpen, Layers, FileText, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { TabItem, IOSTabBarProps } from '@/design-system/types';

function getDefaultTabs(labels: ReturnType<typeof getUiTexts>): TabItem[] {
  return [
    { id: 'home', label: labels.nav.home, icon: <Home /> },
    { id: 'projects', label: labels.nav.projects, icon: <FolderOpen /> },
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
        'left-0 right-0 z-40 bg-background',
        isFullscreen ? 'fixed bottom-0' : 'absolute bottom-0'
      )}
    >
	      {/* Border top */}
	      <div className="border-t border-border/50">
	        <div className="flex items-center justify-around py-2 pb-6">
	          {resolvedTabs.map((tab) => {
	            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'ios-tab-item',
                  'ios-press',
                  isActive && 'active'
                )}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'transition-transform duration-200',
                    '[&_svg]:h-6 [&_svg]:w-6',
                    isActive && 'scale-110 [&_svg]:stroke-[2.5px]'
                  )}
                >
                  {tab.icon}
                </span>
                <span className="text-[10px] font-medium">{tab.label}</span>

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
