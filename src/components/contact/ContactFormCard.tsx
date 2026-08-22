"use client";

import { useRef, useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { IOSButton, IOSCard, IOSInput, IOSTextarea } from "@/components/ios";
import { toast } from "@/hooks/use-toast";
import { getUiTexts } from "@/data";
import { useI18n } from "@/i18n/I18nProvider";

const MIN_SUBMISSION_INTERVAL_MS = 5000;

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  // Honeypot (doit rester vide)
  company: string;
};

type ContactField = "name" | "email" | "message";

export type ContactFormCardProps = {
  className?: string;
  titleClassName?: string;
};

export function ContactFormCard({ className, titleClassName }: ContactFormCardProps) {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number | null>(null);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const requestIdRef = useRef<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    const nextErrors: Partial<Record<ContactField, string>> = {};
    if (!formData.name.trim()) {
      nextErrors.name = locale === "en" ? "Enter your name." : "Indiquez votre nom.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = locale === "en" ? "Enter a valid email." : "Indiquez un email valide.";
    }
    if (formData.message.trim().length < 20) {
      nextErrors.message = locale === "en" ? "Write at least 20 characters." : "Écrivez au moins 20 caractères.";
    }
    setErrors(nextErrors);

    const firstError = (Object.keys(nextErrors) as ContactField[])[0];
    if (firstError === "name") nameRef.current?.focus();
    if (firstError === "email") emailRef.current?.focus();
    if (firstError === "message") messageRef.current?.focus();
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const now = Date.now();
    if (lastSubmittedAt && now - lastSubmittedAt < MIN_SUBMISSION_INTERVAL_MS) {
      toast({
        title: uiTexts.messages.pleaseWaitTitle,
        description: uiTexts.messages.pleaseWaitDescription,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmittedAt(now);
    requestIdRef.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-locale": locale,
          "x-contact-request-id": requestIdRef.current,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setErrors({});
        requestIdRef.current = null;
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
          title: uiTexts.messages.errorTitle,
          description: data.error || uiTexts.messages.genericError,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: uiTexts.messages.errorTitle,
        description: uiTexts.messages.cannotSend,
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
        <div className="py-8 text-center animate-ios-spring" role="status" aria-live="polite">
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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            ref={nameRef}
            id="contact-name"
            type="text"
            label={uiTexts.form.name}
            placeholder={uiTexts.form.namePlaceholder}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
            }}
            state={errors.name ? "error" : "default"}
            errorText={errors.name}
            autoComplete="name"
            maxLength={100}
            required
          />

          <IOSInput
            ref={emailRef}
            id="contact-email"
            type="email"
            label={uiTexts.form.email}
            placeholder={uiTexts.form.emailPlaceholder}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
            }}
            state={errors.email ? "error" : "default"}
            errorText={errors.email}
            autoComplete="email"
            maxLength={254}
            required
          />

          <IOSTextarea
            ref={messageRef}
            id="contact-message"
            label={uiTexts.form.message}
            placeholder={uiTexts.form.messagePlaceholder}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors((current) => ({ ...current, message: undefined }));
            }}
            state={errors.message ? "error" : "default"}
            errorText={errors.message}
            rows={4}
            minLength={20}
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
