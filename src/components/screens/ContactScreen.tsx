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

        {/* Social Links - Nouveau design avec hover effects */}
        <div className="px-5 mb-6">
          <div className="flex justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative"
                  aria-label={link.name}
                >
                  {/* Background avec gradient et hover effect */}
                  <div
                    className={`
                      w-14 h-14 rounded-2xl ${link.color}
                      flex items-center justify-center
                      shadow-lg
                      transform transition-all duration-300 ease-out
                      group-hover:scale-110 group-hover:shadow-xl
                      group-hover:-translate-y-1
                      group-active:scale-95
                    `}
                  >
                    {Icon && <Icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  {/* Tooltip avec nom */}
                  <span
                    className="
                      absolute -bottom-7 left-1/2 -translate-x-1/2
                      text-[10px] font-medium text-muted-foreground
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      whitespace-nowrap
                      bg-background/80 backdrop-blur-sm
                      px-2 py-0.5 rounded-full
                    "
                  >
                    {link.name}
                  </span>
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
