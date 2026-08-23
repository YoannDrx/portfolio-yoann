"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { Experience } from "@/data";
import { useI18n } from "@/i18n/I18nProvider";
import { ExperienceDetailPanel } from "./ExperienceDetailPanel";

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const reducedMotion = useReducedMotion();
  const { locale } = useI18n();

  return (
    <Dialog.Root open={Boolean(experience)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AnimatePresence>
        {experience ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                data-modal-viewport-layer
                className="fixed inset-0 z-[110] h-[100dvh] w-screen max-w-none bg-slate-950/82 backdrop-blur-lg will-change-transform"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 1, scaleX: 0, scaleY: 0.003 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scaleX: [0, 1, 1, 1], scaleY: [0.003, 0.003, 1, 1] }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 1, scaleX: [1, 1, 1, 0], scaleY: [1, 1, 0.003, 0.003], transition: { duration: 0.9, delay: 0.25, times: [0, 0.28, 0.66, 1], ease: [0.76, 0, 0.24, 1] } }}
                transition={reducedMotion ? { duration: 0.16 } : { duration: 0.9, times: [0, 0.35, 0.68, 1], ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "50% 50%" }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                data-modal-viewport-content
                className="fixed inset-0 z-[120] h-[100dvh] w-screen max-w-none overflow-hidden border-0 bg-background shadow-[0_45px_160px_-40px_rgba(2,6,23,.95)] outline-none will-change-transform"
                initial={{ opacity: 0, visibility: "hidden", scale: reducedMotion ? 1 : 0.5 }}
                animate={{ opacity: 1, visibility: "visible", scale: 1 }}
                exit={{ opacity: 0, visibility: "hidden", scale: reducedMotion ? 1 : 0.5, transition: { duration: reducedMotion ? 0.12 : 0.4, delay: 0, ease: [0.4, 0, 1, 1] } }}
                transition={{ duration: reducedMotion ? 0.16 : 0.5, delay: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dialog.Title className="sr-only">{experience.name}</Dialog.Title>
                <Dialog.Description className="sr-only">{experience.description}</Dialog.Description>
                <Dialog.Close className="group absolute right-4 top-4 z-50 grid size-12 place-items-center rounded-full border border-white/70 bg-primary text-primary-foreground shadow-[0_14px_34px_-12px_hsl(var(--primary)/.95)] outline-none transition duration-200 hover:scale-105 hover:bg-cyan-500 focus-visible:ring-4 focus-visible:ring-primary/35 sm:right-6 sm:top-6" aria-label={locale === "en" ? "Close" : "Fermer"}>
                  <X className="size-5 transition-transform duration-300 group-hover:rotate-90" />
                </Dialog.Close>
                <div className="h-full overflow-y-auto overscroll-contain">
                  <ExperienceDetailPanel experience={experience} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
