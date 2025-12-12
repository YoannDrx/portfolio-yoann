/**
 * Social Links Data
 * Liens vers les réseaux sociaux et contact
 */

import type { SocialLink } from './types';

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com',
    icon: 'Github',
    color: 'bg-zinc-800',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: 'Linkedin',
    color: 'bg-blue-600',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: 'Twitter',
    color: 'bg-sky-500',
  },
  {
    id: 'email',
    name: 'Email',
    href: 'mailto:hello@example.com',
    icon: 'Mail',
    color: 'bg-primary',
  },
];

/**
 * Helper pour obtenir un lien social par son ID
 */
export const getSocialLinkById = (id: string) => socialLinks.find((link) => link.id === id);

/**
 * Helper pour obtenir l'email de contact
 */
export const getContactEmail = () => {
  const emailLink = socialLinks.find((link) => link.id === 'email');
  return emailLink?.href.replace('mailto:', '') ?? '';
};
