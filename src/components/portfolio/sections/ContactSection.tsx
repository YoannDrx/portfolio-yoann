"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Briefcase } from "lucide-react";
import { ContactFormCard } from "@/components/contact/ContactFormCard";
import { IOSAvailabilityBadge } from "@/components/ios";
import type { ContactIntent, PortfolioContent } from "@/data/portfolio-content";

const icons = {
  Linkedin,
  Github,
  Mail,
  Phone,
  Briefcase,
} as const;

export function ContactSection({ content }: { content: PortfolioContent }) {
  const [intentId, setIntentId] = useState<ContactIntent["id"]>("full-time");
  const intent = content.contactIntents.find((item) => item.id === intentId) ?? content.contactIntents[0];

  return (
    <section id="contact" aria-labelledby="contact-title" className="product-cinema-grain relative z-10 overflow-hidden bg-background px-5 py-20 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,hsl(var(--primary)/0.1),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(132,88,255,0.07),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{content.locale === "en" ? "Final frame / Contact" : "Dernier plan / Contact"}</p>
            <h2 id="contact-title" className="mt-4 max-w-xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
              {content.locale === "en"
                ? "A role, a team or a product to tell me about?"
                : "Un poste, une équipe ou un produit à me présenter ?"}
            </h2>
            <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{intent.heading}</p>
            <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">{content.copy.contactIntro}</p>

            <div className="mt-7">
              <IOSAvailabilityBadge text={content.profile.availabilityText} variant="prominent" status="available" animated />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {content.socialLinks.map((link) => {
                const Icon = icons[link.icon as keyof typeof icons] ?? Mail;
                return (
                  <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="group inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={link.name}>
                    <Icon className="size-5 transition-colors group-hover:text-primary" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <ContactFormCard
            className="!rounded-2xl !border-border/80 !bg-card/88 !shadow-[0_32px_90px_-58px_hsl(var(--foreground)/0.55)]"
            titleClassName="mb-5 font-display text-2xl font-bold"
            intents={content.contactIntents}
            activeIntentId={intentId}
            onIntentChange={setIntentId}
          />
        </div>
      </div>
    </section>
  );
}
