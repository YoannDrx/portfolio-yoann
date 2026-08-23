"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import IPhoneFrame from "@/components/device/iPhoneFrame";
import type { Experience, PortfolioContent } from "@/data";
import type { FeaturedWorkItem } from "@/data/portfolio-content";
import { cn } from "@/lib/utils";

function destinationExperience(item: FeaturedWorkItem, experiences: Experience[]) {
  if (item.destination.type !== "panel") return undefined;
  const experienceId = item.destination.experienceId;
  return experiences.find((experience) => experience.id === experienceId);
}

function WorkAction({
  item,
  locale,
  experience,
  onExperience,
}: {
  item: FeaturedWorkItem;
  locale: "fr" | "en";
  experience?: Experience;
  onExperience: (experience: Experience) => void;
}) {
  const content = item.destination.type === "route"
    ? locale === "en" ? "Read the case study" : "Lire l’étude de cas"
    : locale === "en" ? "Open the experience" : "Ouvrir l’expérience";

  if (item.destination.type === "route") {
    return (
      <Link
        href={`/${locale}/projects/${item.destination.slug}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {content}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (experience) onExperience(experience);
      }}
      disabled={!experience}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {content}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </button>
  );
}

function WorkMedia({
  item,
  compact = false,
  locale,
  onOpen,
}: {
  item: FeaturedWorkItem;
  compact?: boolean;
  locale: "fr" | "en";
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
}) {
  const gallery = item.media.gallery;

  if (gallery?.length) {
    const isPhoneGallery = item.presentation === "phone";

    if (!compact && !isPhoneGallery) {
      return (
        <div
          className="relative h-[min(54svh,470px)] w-full"
          aria-label={`${item.title} — ${gallery.length} ${locale === "en" ? "previews" : "aperçus"}`}
        >
          {gallery.map((src, index) => (
            <button
              type="button"
              key={src}
              onClick={(event) => onOpen(index, event.currentTarget)}
              aria-label={locale === "en"
                ? `Enlarge ${item.title} preview ${index + 1}`
                : `Agrandir l’aperçu ${index + 1} de ${item.title}`}
              className={cn(
                "group absolute aspect-[16/10] cursor-zoom-in overflow-hidden rounded-xl bg-white text-left shadow-2xl ring-1 ring-slate-950/10 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-slate-900 dark:ring-white/10",
                index === 0
                  ? "left-0 top-0 w-[88%]"
                  : "bottom-0 right-0 z-10 w-[58%] ring-4 ring-white dark:ring-slate-900"
              )}
            >
              <Image
                src={src}
                alt={`${item.media.alt} — ${index + 1}`}
                fill
                className="object-contain"
                sizes={index === 0 ? "480px" : "320px"}
              />
              <span className="absolute right-2.5 top-2.5 inline-flex size-9 items-center justify-center rounded-full bg-slate-950/72 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="size-4" aria-hidden="true" />
              </span>
            </button>
          ))}
          {item.media.logo ? <span className="absolute bottom-3 left-3 z-20 grid size-12 place-items-center rounded-[15px] border border-white/70 bg-white/82 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/82"><Image src={item.media.logo} alt="" width={34} height={34} className="rounded-[10px]" aria-hidden="true" /></span> : null}
        </div>
      );
    }

    return (
      <div
        className={cn(
          "w-full gap-3",
          compact
            ? "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2"
            : isPhoneGallery
              ? "grid grid-cols-3"
              : "grid grid-cols-2"
        )}
        aria-label={`${item.title} — ${gallery.length} ${locale === "en" ? "previews" : "aperçus"}`}
      >
        {gallery.map((src, index) => (
          <button
            type="button"
            key={src}
            onClick={(event) => onOpen(index, event.currentTarget)}
            aria-label={locale === "en"
              ? `Enlarge ${item.title} preview ${index + 1}`
              : `Agrandir l’aperçu ${index + 1} de ${item.title}`}
            className={cn(
              "group relative cursor-zoom-in overflow-hidden rounded-xl bg-white text-left shadow-lg ring-1 ring-slate-950/5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-slate-900 dark:ring-white/10",
              isPhoneGallery ? "aspect-[6/13]" : "aspect-[16/10]",
              compact && cn(
                "shrink-0 snap-center first:snap-start last:snap-end",
                isPhoneGallery ? "w-[72%]" : "w-[88%]"
              )
            )}
          >
            <Image
              src={src}
              alt={`${item.media.alt} — ${index + 1}`}
              fill
              className="object-contain"
              sizes={compact ? (isPhoneGallery ? "72vw" : "88vw") : (isPhoneGallery ? "180px" : "280px")}
            />
            <span className="absolute right-2.5 top-2.5 inline-flex size-9 items-center justify-center rounded-full bg-slate-950/72 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (item.presentation === "phone") {
    return (
      <button
        type="button"
        onClick={(event) => onOpen(0, event.currentTarget)}
        className="flex w-full cursor-zoom-in items-center justify-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:py-3"
        aria-label={locale === "en" ? `Enlarge ${item.title} preview` : `Agrandir l’aperçu de ${item.title}`}
      >
        <IPhoneFrame
          scale={compact ? 0.7 : 0.68}
          className="shrink-0"
        >
          <div className="relative h-full w-full bg-slate-100">
            <Image
              src={item.media.primary}
              alt={item.media.alt}
              fill
              className="object-cover object-top"
              sizes="280px"
            />
          </div>
        </IPhoneFrame>
      </button>
    );
  }

  const isDesktopApp = item.presentation === "desktop-app";

  return (
    <div
      className={cn(
        "w-full overflow-hidden border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900",
        isDesktopApp ? "rounded-[1.25rem]" : "rounded-xl"
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        {isDesktopApp ? (
          <div className="mx-auto flex min-w-0 items-center gap-2 pr-[46px] text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <Image
              src="/images/projects/pressay-icon-current.webp"
              alt=""
              width={18}
              height={18}
              className="rounded-[5px]"
              aria-hidden="true"
            />
            <span className="truncate">Pressay</span>
          </div>
        ) : (
          <div className="mx-auto flex h-6 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-slate-100 px-3 font-mono text-[8px] text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            {item.media.logo ? (
              <Image
                src={item.media.logo}
                alt=""
                width={14}
                height={14}
                className="rounded-[4px]"
                aria-hidden="true"
              />
            ) : null}
            <span>{item.title.toLowerCase().replaceAll(" ", "-")}.app</span>
          </div>
        )}
      </div>
      {isDesktopApp ? (
        <button
          type="button"
          onClick={(event) => onOpen(0, event.currentTarget)}
          className="grid aspect-[16/10] w-full cursor-zoom-in grid-cols-[0.36fr_0.64fr] overflow-hidden bg-[#EEF1F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-slate-950"
          aria-label={locale === "en" ? `Enlarge ${item.title} preview` : `Agrandir l’aperçu de ${item.title}`}
        >
          <div className="flex flex-col items-center justify-center border-r border-white/10 bg-[radial-gradient(circle_at_50%_35%,#182867_0%,#080D2F_72%)] p-4 text-center text-white">
            <Image
              src="/images/projects/pressay-icon-current.webp"
              alt=""
              width={88}
              height={88}
              className="rounded-[22px] shadow-2xl"
              aria-hidden="true"
            />
            <p className="mt-4 text-sm font-semibold">Pressay</p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-cyan-200/75">
              macOS · Voice
            </p>
          </div>
          <div className="relative overflow-hidden bg-white dark:bg-slate-900">
            <Image
              src={item.media.primary}
              alt={item.media.alt}
              fill
              className="scale-[1.04] object-cover object-top"
              sizes="(max-width: 1023px) 58vw, 360px"
            />
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={(event) => onOpen(0, event.currentTarget)}
          className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={locale === "en" ? `Enlarge ${item.title} preview` : `Agrandir l’aperçu de ${item.title}`}
        >
          <Image
            src={item.media.primary}
            alt={item.media.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1023px) 90vw, 560px"
          />
          <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-slate-950/72 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIn className="size-4" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

type PreviewLightboxState = {
  item: FeaturedWorkItem;
  images: string[];
  index: number;
};

function PreviewLightbox({
  state,
  locale,
  onChange,
  onReturnFocus,
}: {
  state: PreviewLightboxState | null;
  locale: "fr" | "en";
  onChange: (state: PreviewLightboxState | null) => void;
  onReturnFocus: () => void;
}) {
  const setIndex = (index: number) => {
    if (!state) return;
    const nextIndex = (index + state.images.length) % state.images.length;
    onChange({ ...state, index: nextIndex });
  };

  return (
    <Dialog.Root open={Boolean(state)} onOpenChange={(open) => { if (!open) onChange(null); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-950/86 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[101] flex h-[min(92svh,960px)] w-[min(96vw,1500px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-950 p-3 text-white shadow-2xl focus:outline-none sm:p-5"
          onKeyDown={(event) => {
            if (!state || state.images.length < 2) return;
            if (event.key === "ArrowLeft") setIndex(state.index - 1);
            if (event.key === "ArrowRight") setIndex(state.index + 1);
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            window.requestAnimationFrame(onReturnFocus);
          }}
        >
          <Dialog.Title className="sr-only">
            {state ? `${state.item.title} — ${locale === "en" ? "enlarged preview" : "aperçu agrandi"}` : ""}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {locale === "en"
              ? "Use the arrow buttons or keyboard arrows to browse previews."
              : "Utilisez les boutons ou les flèches du clavier pour parcourir les aperçus."}
          </Dialog.Description>

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-black/35">
            {state ? (
              <Image
                key={state.images[state.index]}
                src={state.images[state.index]}
                alt={`${state.item.media.alt} — ${state.index + 1}`}
                fill
                className="object-contain"
                sizes="96vw"
                priority
              />
            ) : null}
          </div>

          <div className="mt-3 flex min-h-11 items-center justify-between gap-4 px-1">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">{state?.item.title}</p>
              {state && state.images.length > 1 ? (
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55" aria-live="polite">
                  {String(state.index + 1).padStart(2, "0")} / {String(state.images.length).padStart(2, "0")}
                </p>
              ) : null}
            </div>
            {state && state.images.length > 1 ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => setIndex(state.index - 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/8 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={locale === "en" ? "Previous image" : "Image précédente"}>
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setIndex(state.index + 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/8 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={locale === "en" ? "Next image" : "Image suivante"}>
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>

          <Dialog.Close asChild>
            <button type="button" className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white backdrop-blur-md transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={locale === "en" ? "Close enlarged preview" : "Fermer l’aperçu agrandi"}>
              <X className="size-5" aria-hidden="true" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function WorkStory({ item, index, locale }: { item: FeaturedWorkItem; index: number; locale: "fr" | "en" }) {
  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-primary">0{index + 1}</span>
        <span>{item.category}</span>
      </div>
      <div>
        <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{item.summary}</p>
      </div>
      <dl className="grid gap-4 border-y border-border/80 py-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {[
          [locale === "en" ? "Constraint" : "Contrainte", item.constraint],
          [locale === "en" ? "Decision" : "Décision", item.decision],
          [locale === "en" ? "Impact" : "Impact", item.impact],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-2 text-xs leading-5 text-foreground/78">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-3xl font-bold tracking-tight text-primary">
            {item.proof.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{item.proof.label}</p>
        </div>
      </div>
    </div>
  );
}

export function SelectedWorkShowreel({
  content,
  onExperience,
}: {
  content: PortfolioContent;
  onExperience: (experience: Experience) => void;
}) {
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeWorkId, setActiveWork] = useState<FeaturedWorkItem["id"]>(
    content.featuredWork[0]?.id ?? "klesia"
  );
  const [lightbox, setLightbox] = useState<PreviewLightboxState | null>(null);
  const activeIndex = Math.max(0, content.featuredWork.findIndex((work) => work.id === activeWorkId));
  const activeWork = content.featuredWork[activeIndex];

  const openPreview = (item: FeaturedWorkItem, index: number, trigger: HTMLButtonElement) => {
    lightboxTriggerRef.current = trigger;
    setLightbox({
      item,
      images: item.media.gallery?.length ? item.media.gallery : [item.media.primary],
      index,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        const workId = activeEntry?.target.getAttribute("data-work-id") as FeaturedWorkItem["id"] | undefined;
        if (workId) setActiveWork(workId);
      },
      { rootMargin: "-46% 0px -46% 0px", threshold: 0 }
    );
    articleRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [setActiveWork]);

  const goTo = (index: number) => {
    const target = Math.min(content.featuredWork.length - 1, Math.max(0, index));
    const item = content.featuredWork[target];
    setActiveWork(item.id);
    document.getElementById(`featured-work-${item.id}`)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      id="projects"
      aria-labelledby="selected-work-title"
      className="relative z-10 border-y border-border/70 bg-[#FAF9F6] px-6 py-20 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
      data-locale={content.locale}
    >
      <div className="mx-auto max-w-6xl">
        <div className="sr-only" aria-hidden="true">
          {content.featuredWork.map((item) => (
            <span key={item.id} data-content-id={`featured-${item.id}`}>{item.title}</span>
          ))}
        </div>
        <div className="grid gap-6 border-b border-current/15 pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {content.copy.featured}
            </p>
            <h2 id="selected-work-title" className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {content.copy.featuredTitle}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 lg:justify-self-end">
            {content.copy.featuredIntro}
          </p>
        </div>

        <div className="mt-10 hidden gap-12 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {content.featuredWork.map((item, index) => (
              <article
                key={item.id}
                id={`featured-work-${item.id}`}
                ref={(element) => { articleRefs.current[index] = element; }}
                data-work-id={item.id}
                className="flex min-h-[72svh] scroll-mt-24 flex-col justify-center py-14"
              >
                <WorkStory item={item} index={index} locale={content.locale} />
                <div className="mt-7">
                  <WorkAction
                    item={item}
                    locale={content.locale}
                    experience={destinationExperience(item, content.experiences)}
                    onExperience={onExperience}
                  />
                </div>
              </article>
            ))}
          </div>

          <aside className="sticky top-0 flex h-[100svh] self-start items-center py-8" data-showreel-preview>
            <div className="relative w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <span>{content.locale === "en" ? "Project preview" : "Aperçu du projet"} / {String(activeIndex + 1).padStart(2, "0")}</span>
                <span>{activeWork.presentation}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork.id}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.965, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 1.02, y: -10 }}
                  className="relative mx-auto flex min-h-[min(66svh,620px)] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70"
                  data-preview-project={activeWork.id}
                >
                  <WorkMedia
                    item={activeWork}
                    locale={content.locale}
                    onOpen={(index, trigger) => openPreview(activeWork, index, trigger)}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xl font-bold tracking-tight">{activeWork.title}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 disabled:opacity-30 dark:border-slate-700" aria-label={content.locale === "en" ? "Previous project" : "Projet précédent"}>
                    <ChevronLeft className="size-4" />
                  </button>
                  <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === content.featuredWork.length - 1} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 disabled:opacity-30 dark:border-slate-700" aria-label={content.locale === "en" ? "Next project" : "Projet suivant"}>
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 space-y-8 lg:hidden">
          {content.featuredWork.map((item, index) => (
            <article key={item.id} id={`featured-work-mobile-${item.id}`} className="scroll-mt-24 border-b border-current/15 pb-10 last:border-0">
              <div className="relative mb-6 flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/70">
                <WorkMedia
                  item={item}
                  compact
                  locale={content.locale}
                  onOpen={(mediaIndex, trigger) => openPreview(item, mediaIndex, trigger)}
                />
              </div>
              <WorkStory item={item} index={index} locale={content.locale} />
              <div className="mt-6">
                <WorkAction
                  item={item}
                  locale={content.locale}
                  experience={destinationExperience(item, content.experiences)}
                  onExperience={onExperience}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
      <PreviewLightbox
        state={lightbox}
        locale={content.locale}
        onChange={setLightbox}
        onReturnFocus={() => lightboxTriggerRef.current?.focus()}
      />
    </section>
  );
}
