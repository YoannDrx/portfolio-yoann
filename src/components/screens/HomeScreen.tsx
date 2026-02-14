"use client";

/**
 * HomeScreen
 * Écran d'accueil du portfolio avec présentation et navigation
 * Design System Apple iOS - Mobile-first avec animations spring
 */

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSListItem, IOSAvailabilityBadge, IOSChip } from '../ios';
import { getNavigationItems, getProfile, getUiTexts } from '@/data';
import { LocaleToggle } from '@/components/LocaleToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useI18n } from '@/i18n/I18nProvider';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  hideStatusBar?: boolean;
}

const HomeScreen = ({ onNavigate, hideStatusBar = false }: HomeScreenProps) => {
  const { locale } = useI18n();
  const profile = getProfile(locale);
  const navigationItems = getNavigationItems(locale);
  const uiTexts = getUiTexts(locale);

  return (
    <div className="h-full bg-background flex flex-col">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <div className="flex justify-end items-center gap-1 pt-2">
          <ThemeToggle />
          <LocaleToggle />
        </div>

        {/* Hero Section */}
        <div className="pt-4 animate-ios-spring">
          <div className="relative">
            {/* Avatar avec cercle blanc */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
                {/* Avatar avec bordure blanche - Next/Image optimisé */}
                <div className="relative w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="144px"
                  />
                </div>
                {/* Badge disponible */}
                {profile.isAvailable && (
                  <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1.5 border-2 border-white shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center space-y-2">
              <h1 className="ios-nav-title-large">
                {profile.firstName} {profile.lastName}
              </h1>
              <h2 className="text-xl font-semibold text-primary">{profile.title}</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8 stagger-children">
          {profile.stats.map((stat) => (
            <IOSCard key={stat.label} variant="subtle" padding="md" className="text-center">
              <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground/60 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
            </IOSCard>
          ))}
        </div>

	          {/* Quick Links */}
	        <div className="mt-8 space-y-3 stagger-children">
	          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
	            {uiTexts.sections.explorer}
	          </h3>

          {navigationItems.map((item) => (
            <IOSCard
              key={item.id}
              variant="subtle"
              padding="md"
              interactive
              onPress={() => onNavigate(item.id)}
              className="card-premium-hover"
            >
              <IOSListItem
                title={item.label}
                subtitle={item.subtitle}
                leftIcon={
                  <div className={`w-[3px] h-10 rounded-full bg-gradient-to-b ${item.gradient} self-center`} />
                }
                showChevron
                className="p-0 bg-transparent"
              />
            </IOSCard>
          ))}
        </div>

        {/* Availability Section - Redesigned */}
        {profile.isAvailable && (
          <div className="mt-8 space-y-4 stagger-children">
            {/* Main availability badge */}
            <div className="flex justify-center">
              <IOSAvailabilityBadge
                text={profile.availabilityText}
                variant="prominent"
                status="available"
                animated
              />
            </div>

            {/* Availability tags (CDI, Freelance, Mission longue) */}
            <div className="flex justify-center gap-2 flex-wrap">
              {profile.availabilityOptions?.map((option) => (
                <IOSChip
                  key={option}
                  variant="availability"
                  size="sm"
                >
                  {option}
                </IOSChip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
