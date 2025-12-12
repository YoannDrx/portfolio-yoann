/**
 * Social Links Data
 * Liens vers les réseaux sociaux et contact
 */

import type { SocialLink } from './types';

export const socialLinks: SocialLink[] = [
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
