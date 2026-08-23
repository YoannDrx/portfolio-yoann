"use client";

/**
 * ContactScreen
 * Écran de contact avec formulaire et liens sociaux
 */

import { Mail, Github, Linkedin, Twitter, Phone, Briefcase } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import {
  IOSCard,
  IOSBadge,
  IOSNavigationBar,
} from '../ios';
import { getPortfolioContent, getProfile, getSocialLinks, getUiTexts } from '@/data';
import { ContactFormCard } from '@/components/contact/ContactFormCard';
import { useI18n } from '@/i18n/I18nProvider';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Map icon names to components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Briefcase,
};

// Couleurs de marque pour chaque icône
const brandColors: Record<string, string> = {
  linkedin: 'text-[#0A66C2]', // LinkedIn Blue
  github: 'text-zinc-800 dark:text-zinc-200',
  malt: 'text-[#FC5757]', // Malt Red
  email: 'text-emerald-500',
  phone: 'text-violet-500',
  twitter: 'text-[#1DA1F2]',
};

interface ContactScreenProps {
  hideStatusBar?: boolean;
}

const ContactScreen = ({ hideStatusBar = false }: ContactScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const profile = getProfile(locale);
  const socialLinks = getSocialLinks(locale);
  const content = getPortfolioContent(locale);
  const [intentId, setIntentId] = useState(content.contactIntents[0].id);
  const intent = content.contactIntents.find((item) => item.id === intentId) ?? content.contactIntents[0];

  return (
    <div className="phone-canvas h-full bg-background flex flex-col">
      {!hideStatusBar && <StatusBar />}

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <IOSNavigationBar
          title={uiTexts.nav.contact}
          subtitle={uiTexts.stats.discussProject}
        />

        {/* Social Links - Icônes colorées sur fond glass */}
        <div className="px-5 mb-6">
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const iconColor = brandColors[link.id] || 'text-foreground';
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative"
                  aria-label={link.name}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-2xl
                      bg-card/80 backdrop-blur-sm
                      border border-border/50
                      flex items-center justify-center
                      shadow-sm
                      transform transition-all duration-200 ease-out
                      group-hover:scale-110 group-hover:shadow-lg
                      group-hover:-translate-y-1
                      group-hover:border-border
                      group-active:scale-95
                    `}
                  >
                    {Icon && <Icon className={`w-6 h-6 ${iconColor} transition-transform duration-200 group-hover:scale-110`} />}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-5 mt-4">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={locale === 'en' ? 'Contact intent' : 'Type de contact'}>
            {content.contactIntents.map((item) => <button key={item.id} type="button" aria-pressed={intentId === item.id} onClick={() => setIntentId(item.id)} className={cn('liquid-button shrink-0 !min-h-10 !px-3 !text-xs', intentId === item.id && 'liquid-button-primary')}>{item.label}</button>)}
          </div>
          <h2 className="mb-5 text-3xl font-bold tracking-[-0.045em]">{intent.heading}</h2>
          <ContactFormCard idPrefix="phone-contact" titleClassName="mb-6 text-xl font-semibold text-foreground" intent={intent} className="phone-surface !rounded-[28px] !border-white/70 !bg-background/72 backdrop-blur-2xl dark:!border-white/10" />
        </div>

        {/* Availability */}
        {profile.isAvailable && (
          <div className="px-5 mt-6">
            <IOSCard variant="glass" padding="lg" className="text-center">
              <IOSBadge variant="success" dot className="mb-3" />
              <p className="font-semibold text-foreground">{profile.availabilityText}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {profile.availabilityOptions.join(' • ')}
              </p>
            </IOSCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactScreen;
