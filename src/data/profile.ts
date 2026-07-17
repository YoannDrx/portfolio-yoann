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
    title: "Développeur React Native, React & Next.js",
    subtitle: "Paris, France",
    bio: "Développeur produit polyvalent, avec un socle fort en React Native et une pratique complète de React et Next.js. Mon parcours en management nourrit une approche attentive aux usages, à l'UI/UX et au travail d'équipe. Je transforme un besoin en parcours clair, architecture maintenable et livraison vérifiée, du mobile au web.",
    avatar: "/images/yoann-profile-nobg.png",
    isAvailable: true,
    availabilityText: "Ouvert aux échanges",
    availabilityOptions: ["CDI", "Freelance", "Mission longue"],
    stats: [
      { label: "Architecture", value: "React" },
      { label: "Produit", value: "UX" },
      { label: "Livraison", value: "Qualité" },
    ],
  },
  en: {
    firstName: "Yoann",
    lastName: "Andrieux",
    initials: "YA",
    title: "React Native, React & Next.js Developer",
    subtitle: "Paris, France",
    bio: "I am a versatile product developer with strong React Native foundations and end-to-end React and Next.js experience. My management background shapes an empathetic approach to users, UI/UX and teamwork. I turn product needs into clear journeys, maintainable architecture and verified delivery across mobile and web.",
    avatar: "/images/yoann-profile-nobg.png",
    isAvailable: true,
    availabilityText: "Open to conversations",
    availabilityOptions: ["Full-time", "Freelance", "Long-term"],
    stats: [
      { label: "Architecture", value: "React" },
      { label: "Product", value: "UX" },
      { label: "Delivery", value: "Quality" },
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
      id: "experiences",
      label: "Mes Expériences",
      subtitle: "Web & Mobile",
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
      id: "experiences",
      label: "Experiences",
      subtitle: "Web & Mobile",
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
