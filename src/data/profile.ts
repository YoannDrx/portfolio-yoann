/**
 * Profile Data
 * Informations personnelles du portfolio
 */

import type { Profile, NavigationItem } from "./types";
import type { Locale } from "@/i18n/locales";

const profiles: Record<Locale, Profile> = {
  fr: {
    firstName: "Yoann",
    lastName: "Andrieux",
    initials: "YA",
    title: "Dev React Native",
    subtitle: "Paris, France",
    bio: "Dev frontend et mobile passionné par l’UI/UX et le sens du détail. Mon parcours atypique, nourri par six années de management, m’aide à conjuguer rigueur technique, empathie et efficacité. Je conçois des applications React Native et des produits React/Next.js clairs, robustes et agréables à utiliser, du cadrage à la livraison.",
    avatar: "/images/yoann-profile-nobg.png",
    isAvailable: true,
    availabilityText: "Ouvert aux échanges",
    availabilityOptions: ["CDI", "Freelance", "Mission longue"],
    stats: [
      { label: "Production mobile", value: "100K+" },
      { label: "Modules métier", value: "22+" },
      { label: "Composants UI", value: "59+" },
    ],
  },
  en: {
    firstName: "Yoann",
    lastName: "Andrieux",
    initials: "YA",
    title: "React Native Dev",
    subtitle: "Paris, France",
    bio: "Frontend and mobile developer with a passion for UI/UX and careful details. My unconventional path, shaped by six years in management, helps me combine technical rigor, empathy and efficiency. I design clear, robust and enjoyable React Native applications and React/Next.js products, from product framing through delivery.",
    avatar: "/images/yoann-profile-nobg.png",
    isAvailable: true,
    availabilityText: "Open to conversations",
    availabilityOptions: ["Full-time", "Freelance", "Long-term"],
    stats: [
      { label: "Mobile production", value: "100K+" },
      { label: "Business modules", value: "22+" },
      { label: "UI components", value: "59+" },
    ],
  },
};

export const profile: Profile = profiles.fr;

export function getProfile(locale: Locale): Profile {
  return profiles[locale] ?? profiles.fr;
}

const navigationItemsByLocale: Record<Locale, NavigationItem[]> = {
  fr: [
    {
      id: "work",
      label: "Mes Projets",
      subtitle: "Sélection & parcours",
      icon: "📱",
      gradient: "from-orange-400 to-pink-500",
    },
    {
      id: "skills",
      label: "Compétences",
      subtitle: "Stack & Expertise",
      icon: "⚡",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      id: "resume",
      label: "CV",
      subtitle: "Parcours & Formation",
      icon: "📄",
      gradient: "from-purple-400 to-violet-500",
    },
    {
      id: "contact",
      label: "Me Contacter",
      subtitle: "Discutons de votre projet",
      icon: "💬",
      gradient: "from-green-400 to-emerald-500",
    },
  ],
  en: [
    {
      id: "work",
      label: "Work",
      subtitle: "Selection & journey",
      icon: "📱",
      gradient: "from-orange-400 to-pink-500",
    },
    {
      id: "skills",
      label: "Skills",
      subtitle: "Stack & Expertise",
      icon: "⚡",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      id: "resume",
      label: "Resume",
      subtitle: "Experience & Education",
      icon: "📄",
      gradient: "from-purple-400 to-violet-500",
    },
    {
      id: "contact",
      label: "Contact",
      subtitle: "Let's talk about your project",
      icon: "💬",
      gradient: "from-green-400 to-emerald-500",
    },
  ],
};

export const navigationItems: NavigationItem[] = navigationItemsByLocale.fr;

export function getNavigationItems(locale: Locale): NavigationItem[] {
  return navigationItemsByLocale[locale] ?? navigationItemsByLocale.fr;
}
