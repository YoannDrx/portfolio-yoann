"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { IOSButton, IOSCard, IOSInput, IOSTextarea } from "@/components/ios";
import { toast } from "@/hooks/use-toast";
import { uiTexts } from "@/data";

const MIN_SUBMISSION_INTERVAL_MS = 5000;

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  // Honeypot (doit rester vide)
  company: string;
};

export type ContactFormCardProps = {
  className?: string;
  titleClassName?: string;
};

export function ContactFormCard({ className, titleClassName }: ContactFormCardProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (lastSubmittedAt && now - lastSubmittedAt < MIN_SUBMISSION_INTERVAL_MS) {
      toast({
        title: "Veuillez patienter",
        description:
          "Merci de patienter quelques secondes avant de renvoyer un message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmittedAt(now);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          setFormData({ name: "", email: "", message: "", company: "" });
        }, 3000);
      } else {
        const data = await response.json();
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IOSCard variant="glass" padding="lg" className={className}>
      <h3 className={titleClassName ?? "text-lg font-semibold text-foreground mb-4"}>
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
          {/* Honeypot field (anti-spam) */}
          <div
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <label>
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </label>
          </div>

          <IOSInput
            type="text"
            label={uiTexts.form.name}
            placeholder={uiTexts.form.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            autoComplete="name"
            maxLength={100}
            required
          />

          <IOSInput
            type="email"
            label={uiTexts.form.email}
            placeholder={uiTexts.form.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autoComplete="email"
            maxLength={254}
            required
          />

          <IOSTextarea
            label={uiTexts.form.message}
            placeholder={uiTexts.form.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            maxLength={4000}
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
  );
}

