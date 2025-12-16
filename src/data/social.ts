/**
 * Social Links Data
 * Liens vers les réseaux sociaux et contact
 */

import type { SocialLink } from './types';
import type { Locale } from '@/i18n/locales';

const socialLinksByLocale: Record<Locale, SocialLink[]> = {
  fr: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yoann-andrieux/',
      icon: 'Linkedin',
      color: 'bg-blue-600',
    },
    {
      id: 'malt',
      name: 'Malt',
      href: 'https://www.malt.fr/profile/yoannandrieux',
      icon: 'Briefcase',
      color: 'bg-red-500',
    },
    {
      id: 'github',
      name: 'GitHub',
      href: 'https://github.com/YoannDrx',
      icon: 'Github',
      color: 'bg-zinc-800',
    },
    {
      id: 'email',
      name: 'Email',
      href: 'mailto:yoann.andrieux@gmail.com',
      icon: 'Mail',
      color: 'bg-green-500',
    },
    {
      id: 'phone',
      name: 'Téléphone',
      href: 'tel:+33663434665',
      icon: 'Phone',
      color: 'bg-purple-500',
    },
  ],
  en: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yoann-andrieux/',
      icon: 'Linkedin',
      color: 'bg-blue-600',
    },
    {
      id: 'malt',
      name: 'Malt',
      href: 'https://www.malt.fr/profile/yoannandrieux',
      icon: 'Briefcase',
      color: 'bg-red-500',
    },
    {
      id: 'github',
      name: 'GitHub',
      href: 'https://github.com/YoannDrx',
      icon: 'Github',
      color: 'bg-zinc-800',
    },
    {
      id: 'email',
      name: 'Email',
      href: 'mailto:yoann.andrieux@gmail.com',
      icon: 'Mail',
      color: 'bg-green-500',
    },
    {
      id: 'phone',
      name: 'Phone',
      href: 'tel:+33663434665',
      icon: 'Phone',
      color: 'bg-purple-500',
    },
  ],
};

export const socialLinks: SocialLink[] = socialLinksByLocale.fr;

export function getSocialLinks(locale: Locale): SocialLink[] {
  return socialLinksByLocale[locale] ?? socialLinksByLocale.fr;
}

/**
 * Helper pour obtenir un lien social par son ID
 */
export const getSocialLinkById = (id: string, locale: Locale = 'fr') =>
  getSocialLinks(locale).find((link) => link.id === id);

/**
 * Helper pour obtenir l'email de contact
 */
export const getContactEmail = (locale: Locale = 'fr') => {
  const emailLink = getSocialLinks(locale).find((link) => link.id === 'email');
  return emailLink?.href.replace('mailto:', '') ?? '';
};
