/**
 * ContactScreen
 * Écran de contact avec formulaire et liens sociaux
 */

import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import {
  IOSCard,
  IOSButton,
  IOSInput,
  IOSTextarea,
  IOSBadge,
  IOSNavigationBar,
  IOSToast,
} from '../ios';
import { socialLinks, profile, uiTexts } from '@/data';
import { toast } from '@/hooks/use-toast';

// Map icon names to components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: uiTexts.messages.messageSent,
      description: uiTexts.messages.messageSentDescription,
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
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

        {/* Social Links */}
        <div className="px-5 mb-6 stagger-children">
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-2xl ${link.color} flex items-center justify-center shadow-soft ios-interactive`}
                  aria-label={link.name}
                >
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-5">
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
