"use client";

/**
 * ContactScreen
 * Écran de contact avec formulaire et liens sociaux
 */

import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, Phone, Briefcase } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import {
  IOSCard,
  IOSButton,
  IOSInput,
  IOSTextarea,
  IOSBadge,
  IOSNavigationBar,
} from '../ios';
import { socialLinks, profile, uiTexts } from '@/data';
import { toast } from '@/hooks/use-toast';

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

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: uiTexts.messages.messageSent,
          description: uiTexts.messages.messageSentDescription,
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        const data = await response.json();
        toast({
          title: 'Erreur',
          description: data.error || 'Une erreur est survenue',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />

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
          <IOSCard variant="glass" padding="lg">
            <h3 className="font-semibold text-foreground mb-4">
              {uiTexts.sections.sendMessage}
            </h3>

            {isSubmitted ? (
              <div className="py-8 text-center animate-ios-spring">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <p className="font-semibold text-foreground">
                  {uiTexts.messages.messageSent}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {uiTexts.messages.willReplyShort}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <IOSInput
                  type="text"
                  label={uiTexts.form.name}
                  placeholder={uiTexts.form.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <IOSInput
                  type="email"
                  label={uiTexts.form.email}
                  placeholder={uiTexts.form.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <IOSTextarea
                  label={uiTexts.form.message}
                  placeholder={uiTexts.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />

                <IOSButton
                  type="submit"
                  fullWidth
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-5 h-5" />}
                >
                  {uiTexts.buttons.send}
                </IOSButton>
              </form>
            )}
          </IOSCard>
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
