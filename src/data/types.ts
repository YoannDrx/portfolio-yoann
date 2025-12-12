/**
 * Data Types
 * Interfaces pour les données du portfolio
 */

// ============ PROFILE ============

export interface ProfileStat {
  label: string;
  value: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  subtitle: string;
  bio: string;
  avatar?: string;
  isAvailable: boolean;
  availabilityText: string;
  availabilityOptions: string[];
  stats: ProfileStat[];
}

// ============ PROJECTS ============

export type Platform = 'ios' | 'android' | 'web';

export interface ProjectStats {
  rating: number;
  downloads: string;
}

export interface ProjectLinks {
  appStore?: string;
  playStore?: string;
  website?: string;
  github?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: Platform[];
  gradient: string;
  emoji: string;
  image?: string;
  stats: ProjectStats;
  features: string[];
  links?: ProjectLinks;
}

// ============ SKILLS ============

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  gradient: string;
  icon: string;
  skills: Skill[];
}

export interface Tool {
  name: string;
  icon?: string;
}

// ============ SOCIAL ============

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  color: string;
}

// ============ NAVIGATION ============

export interface NavigationItem {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  gradient: string;
}

// ============ SITE CONFIG ============

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  locale: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
