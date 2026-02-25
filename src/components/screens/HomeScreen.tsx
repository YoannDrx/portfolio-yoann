"use client";

/**
 * HomeScreen
 * Écran d'accueil du portfolio avec présentation et navigation
 * Design System Apple iOS - Mobile-first avec animations spring
 */

import Image from "next/image";
import { Sparkles, ChevronRight, Layers, Zap, FileText, Send, type LucideIcon } from "lucide-react";
import StatusBar from "../device/StatusBar";
import { IOSCard, IOSAvailabilityBadge, IOSChip } from "../ios";
import { getNavigationItems, getProfile, getUiTexts } from "@/data";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";

const navIcons: Record<string, LucideIcon> = {
  experiences: Layers,
  skills: Zap,
  resume: FileText,
  contact: Send,
};

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
    <div className="flex h-full flex-col bg-background">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <div className="flex items-center justify-end gap-1 pt-2">
          <ThemeToggle />
          <LocaleToggle />
        </div>

        {/* Hero Section */}
        <div className="animate-ios-spring pt-4">
          <div className="relative">
            {/* Avatar avec cercle blanc */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-5 animate-pulse-soft rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" />
                {/* Avatar avec bordure blanche - Next/Image optimisé */}
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-blue-200 shadow-lg dark:bg-blue-900/60">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="192px"
                  />
                </div>
                {/* Badge disponible */}
                {profile.isAvailable && (
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-success p-1.5 shadow-md">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-2 text-center">
              <h1 className="ios-nav-title-large">
                {profile.firstName} {profile.lastName}
              </h1>
              <h2 className="text-xl font-semibold text-primary">
                {profile.title}
              </h2>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stagger-children mt-8 grid grid-cols-3 gap-3">
          {profile.stats.map((stat) => (
            <IOSCard
              key={stat.label}
              variant="subtle"
              padding="md"
              className="text-center"
            >
              <p className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                {stat.label}
              </p>
            </IOSCard>
          ))}
        </div>

        {/* Quick Links */}
        <div className="stagger-children mt-8 space-y-3">
          <h3 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {uiTexts.sections.explorer}
          </h3>

          {navigationItems.map((item) => {
            const Icon = navIcons[item.id] ?? Layers;
            return (
              <IOSCard
                key={item.id}
                variant="subtle"
                padding="md"
                interactive
                onPress={() => onNavigate(item.id)}
                className="card-premium-hover"
              >
                <div className="flex items-center gap-3.5">
                  {/* Icône Apple Settings style */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br ${item.gradient} shadow-sm`}
                    >
                      <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.8} />
                    </div>
                  </div>
                  {/* Contenu */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                  {/* Chevron */}
                  <ChevronRight className="h-4.5 w-4.5 flex-shrink-0 text-muted-foreground/40" />
                </div>
              </IOSCard>
            );
          })}
        </div>

        {/* Availability Section - Redesigned */}
        {profile.isAvailable && (
          <div className="stagger-children mt-8 space-y-4">
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
            <div className="flex flex-wrap justify-center gap-2">
              {profile.availabilityOptions?.map((option) => (
                <IOSChip key={option} variant="availability" size="sm">
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
