"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronRight,
  Code2,
  DraftingCompass,
  Github,
  LayoutGrid,
  Linkedin,
  List,
  Mail,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  Sparkles,
  TestTube2,
  WandSparkles,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ContactFormCard } from "@/components/contact/ContactFormCard";
import { ExperienceModal } from "@/components/experiences/ExperienceModal";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import { SelectedWorkShowreel } from "@/components/portfolio/sections/SelectedWorkShowreel";
import IPhoneFrame from "@/components/device/iPhoneFrame";
import { PhoneAppPreview } from "./PhoneAppPreview";
import {
  getPortfolioContent,
  type Experience,
  type PortfolioContent,
} from "@/data";
import { trackPortfolioEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

const SpatialGlow = dynamic(() => import("./SpatialGlow"), { ssr: false });

function LazySpatialGlow() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px), (prefers-reduced-motion: reduce)").matches) return;
    if ((navigator.hardwareConcurrency ?? 8) < 6) return;
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => setEnabled(entry.isIntersecting && !document.hidden), { rootMargin: "240px" });
    observer.observe(host);
    const handleVisibility = () => setEnabled(!document.hidden && host.getBoundingClientRect().top < window.innerHeight + 240 && host.getBoundingClientRect().bottom > -240);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", handleVisibility); };
  }, []);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 z-[2] opacity-[.85] saturate-125 dark:opacity-90 dark:saturate-150" aria-hidden="true">{enabled ? <SpatialGlow /> : null}</div>;
}

const socialIcons: Record<string, ReactNode> = {
  Linkedin: <Linkedin className="size-5" />,
  Github: <Github className="size-5" />,
  Mail: <Mail className="size-5" />,
  Phone: <Phone className="size-5" />,
};

function SectionHeading({ eyebrow, title, intro, invert = false }: { eyebrow: string; title: string; intro?: string; invert?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.22em]", invert ? "text-cyan-300" : "text-primary")}>{eyebrow}</p>
        <h2 className={cn("mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-6xl", invert ? "text-white" : "text-foreground")}>{title}</h2>
      </div>
      {intro ? <p className={cn("max-w-2xl text-base leading-7 lg:justify-self-end", invert ? "text-white/64" : "text-muted-foreground")}>{intro}</p> : null}
    </div>
  );
}

function PortraitSilhouette({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <>
      <div className="silhouette-stroke liquid-silhouette absolute inset-0 z-0">
        <Image src={src} alt="" fill className="object-contain object-bottom" priority={priority} sizes={sizes} aria-hidden />
      </div>
      <Image src={src} alt={alt} fill className="z-10 object-contain object-bottom" priority={priority} sizes={sizes} />
    </>
  );
}

function Hero({ content }: { content: PortfolioContent }) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.18]);

  const scrollTo = (id: string, action: string) => {
    trackPortfolioEvent("cta_clicked", { action, mode: "web" });
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={heroRef} id="top" className="liquid-canvas relative h-[100svh] overflow-hidden px-5 pb-0 pt-20 sm:px-8 lg:min-h-0 lg:px-12 lg:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,hsl(var(--primary)/0.2),transparent_26%),radial-gradient(circle_at_24%_72%,rgba(34,211,238,.13),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-start pt-1 lg:h-[calc(100svh-6rem)] lg:items-center lg:pt-0">
        <motion.div
          style={{ y: reducedMotion ? 0 : copyY, opacity: reducedMotion ? 1 : copyOpacity }}
          className="relative z-20 w-full text-center lg:max-w-[55%] lg:pb-24 lg:text-left"
        >
          <p className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary sm:block">{content.copy.eyebrow}</p>
          <h1 className="mt-2 text-[clamp(2.55rem,12vw,4.8rem)] font-bold leading-[0.82] tracking-[-0.075em] text-foreground sm:mt-4 lg:mt-5 lg:text-[clamp(3.35rem,8vw,7.5rem)]">
            {content.profile.firstName}
            <span className="block">{content.profile.lastName}</span>
          </h1>
          <p className="mt-3 text-xl font-semibold tracking-[-0.035em] text-primary sm:mt-5 sm:text-3xl lg:mt-6 lg:text-4xl">{content.profile.title}</p>
          <p className="mx-auto mt-3 line-clamp-3 max-w-2xl text-xs leading-5 text-muted-foreground sm:mt-5 sm:text-sm sm:leading-6 lg:mx-0 lg:mt-6 lg:line-clamp-none lg:text-lg lg:leading-7">{content.profile.bio}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6 lg:mt-8 lg:justify-start lg:gap-3">
            <button type="button" onClick={() => scrollTo("projects", "hero_projects")} className="liquid-button liquid-button-primary">
              {content.copy.projects}<ArrowDown className="size-4" />
            </button>
            <button type="button" onClick={() => scrollTo("contact", "hero_contact")} className="liquid-button">
              {content.copy.contact}
            </button>
            <span className="hidden sm:inline-flex"><PDFDownloadButton className="liquid-button !h-12 !rounded-full !px-5" /></span>
          </div>

          <div className="mt-10 hidden justify-center divide-x divide-border/70 border-y border-border/60 lg:flex lg:justify-start">
            {content.profile.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 flex-1 px-3 py-4 first:pl-0 sm:flex-none sm:px-7">
                <p className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-muted-foreground sm:text-[9px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46svh] lg:left-auto lg:right-[-2vw] lg:h-[calc(100svh-5.5rem)] lg:w-[56vw]"
        style={{ y: reducedMotion ? 0 : portraitY, scale: reducedMotion ? 1 : portraitScale }}
      >
        <div className="absolute inset-x-[12%] bottom-[7%] h-[64%] rounded-[50%] bg-primary/28 blur-[90px] lg:inset-x-[20%]" />
        <PortraitSilhouette
          src={content.profile.avatar ?? "/images/yoann-profile-nobg.png"}
          alt={`${content.profile.firstName} ${content.profile.lastName}`}
          sizes="(max-width: 1023px) 100vw, 56vw"
          priority
        />
      </motion.div>
    </section>
  );
}

function ModeTransitionScene({ content, onEnterIphone }: { content: PortfolioContent; onEnterIphone: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const browserOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 0.48, 0.5, 1] : [0, 0.08, 0.36, 0.58, 1],
    reducedMotion ? [1, 1, 0, 0] : [1, 1, 0.56, 0, 0]
  );
  const browserScale = useTransform(scrollYProgress, [0.08, 0.58], reducedMotion ? [1, 1] : [1, 0.93]);
  const browserY = useTransform(scrollYProgress, [0.08, 0.58], reducedMotion ? [0, 0] : [0, -12]);
  const phoneOpacity = useTransform(
    scrollYProgress,
    reducedMotion ? [0, 0.48, 0.5, 1] : [0, 0.08, 0.34, 0.58, 1],
    reducedMotion ? [0, 0, 1, 1] : [0, 0, 0.52, 1, 1]
  );
  const phoneY = useTransform(scrollYProgress, [0.08, 0.58], reducedMotion ? [0, 0] : [24, 0]);
  const phoneScale = useTransform(scrollYProgress, [0.08, 0.58], reducedMotion ? [0.86, 0.86] : [0.76, 0.86]);
  const exitCopyY = useTransform(scrollYProgress, [0.7, 1], reducedMotion ? [0, 0] : [0, -190]);
  const exitCopyOpacity = useTransform(scrollYProgress, [0.74, 1], reducedMotion ? [1, 1] : [1, 0.08]);
  const exitVisualY = useTransform(scrollYProgress, [0.7, 1], reducedMotion ? [0, 0] : [0, -128]);
  const exitVisualScale = useTransform(scrollYProgress, [0.7, 1], reducedMotion ? [1, 1] : [1, 0.93]);
  const exitSpatialY = useTransform(scrollYProgress, [0.68, 1], reducedMotion ? [0, 0] : [0, -282]);

  return (
    <section
      ref={ref}
      id="iphone-experience"
      className="relative overflow-clip bg-background text-foreground"
      style={{ height: reducedMotion ? "120svh" : "150svh" }}
    >
      <div data-transition-stage className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 py-10 sm:px-8 lg:py-14">
        {!reducedMotion ? <motion.div style={{ y: exitSpatialY }} className="pointer-events-none absolute inset-0 z-[2]"><LazySpatialGlow /></motion.div> : null}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_62%_48%,hsl(var(--primary)/.13),transparent_44%),linear-gradient(180deg,hsl(var(--background)/.44),hsl(var(--background)/.88))] dark:bg-[radial-gradient(circle_at_62%_48%,hsl(var(--primary)/.18),transparent_46%),linear-gradient(180deg,hsl(var(--background)/.36),hsl(var(--background)/.82))]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <motion.div data-transition-copy style={{ y: exitCopyY, opacity: exitCopyOpacity }}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Web → iPhone</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
              {content.locale === "en" ? "Two formats. One portfolio." : "Deux formats. Le même portfolio."}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              {content.locale === "en"
                ? "The same content is reorganized as a real interactive mini-app, with its own navigation and mobile rhythm."
                : "Le même contenu se réorganise dans une vraie mini-app interactive, avec sa navigation et son rythme mobile."}
            </p>
            <button type="button" onClick={() => { trackPortfolioEvent("cta_clicked", { action: "enter_iphone", mode: "web" }); onEnterIphone(); }} className="liquid-button liquid-button-primary mt-8">
              <MonitorSmartphone className="size-4" />
              {content.locale === "en" ? "Explore on iPhone" : "Explorer dans l’iPhone"}
            </button>
          </motion.div>

          <motion.div data-transition-visual style={{ y: exitVisualY, scale: exitVisualScale }} className="relative flex min-h-[68svh] origin-center items-center justify-center">
            <motion.div data-transition-card="web" style={{ opacity: browserOpacity, scale: browserScale, y: browserY }} className="absolute aspect-[16/10] w-[min(94%,780px)] overflow-hidden rounded-[24px] border border-border bg-background text-foreground shadow-[0_60px_150px_-55px_hsl(var(--foreground)/.45)]">
              <div className="flex h-11 items-center gap-2 border-b border-slate-200/80 bg-background/82 px-4"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /><span className="ml-3 h-5 flex-1 rounded-full bg-slate-200/90 dark:bg-slate-700" /></div>
              <div className="relative grid h-[calc(100%-2.75rem)] grid-cols-[1.12fr_.88fr] overflow-hidden bg-[radial-gradient(circle_at_16%_82%,hsl(var(--liquid-cyan)/.1),transparent_34%),radial-gradient(circle_at_78%_28%,hsl(var(--primary)/.12),transparent_36%)] px-8">
                <div className="relative z-20 flex min-w-0 flex-col py-7">
                  <p className="font-mono text-[7px] font-bold uppercase tracking-[.2em] text-primary">{content.copy.eyebrow}</p>
                  <p className="mt-3 text-[3.25rem] font-bold leading-[.82] tracking-[-.07em]">{content.profile.firstName}<span className="block">{content.profile.lastName}</span></p>
                  <p className="mt-3 text-[13px] font-semibold text-primary">{content.profile.title}</p>
                  <p className="mt-3 max-w-[360px] text-[9px] leading-[1.55] text-muted-foreground">{content.profile.bio}</p>
                  <div className="mt-4 flex items-center gap-2 text-[8px] font-semibold">
                    <span className="rounded-full bg-primary px-3 py-2 text-primary-foreground">{content.copy.projects}</span>
                    <span className="rounded-full border border-border bg-background/72 px-3 py-2">{content.copy.contact}</span>
                    <span className="rounded-full border border-border bg-background/72 px-3 py-2">PDF</span>
                  </div>
                  <div className="mt-auto flex divide-x divide-border border-t border-border/70 pt-3">
                    {content.profile.stats.map((stat) => (
                      <div key={stat.label} className="min-w-0 flex-1 px-3 first:pl-0">
                        <p className="text-[17px] font-bold leading-none tabular-nums">{stat.value}</p>
                        <p className="mt-1 truncate font-mono text-[5px] uppercase tracking-[.1em] text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none relative z-10">
                  <div className="absolute inset-x-[8%] bottom-[5%] h-[72%] rounded-[50%] bg-primary/24 blur-[44px]" />
                  <div className="absolute inset-x-[-8%] bottom-0 top-[3%]">
                    <PortraitSilhouette
                      src={content.profile.avatar ?? "/images/yoann-profile-nobg.png"}
                      alt=""
                      sizes="340px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div data-transition-card="iphone" style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }} className="relative z-10 origin-center">
              <IPhoneFrame scale={0.86} className="drop-shadow-[0_55px_70px_hsl(var(--primary)/.28)]">
                <PhoneAppPreview />
              </IPhoneFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Capabilities({ content }: { content: PortfolioContent }) {
  const [activeId, setActiveId] = useState(content.capabilities[0].id);
  const active = content.capabilities.find((item) => item.id === activeId) ?? content.capabilities[0];
  const capabilityIcons = [Code2, Boxes, ShieldCheck, Sparkles];

  return (
    <section id="skills" className="liquid-canvas relative z-20 -mt-[12svh] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={content.locale === "en" ? "Capabilities" : "Compétences"} title={content.copy.skillsTitle} intro={content.skillStoryIntro} />
        <div className="mt-16 overflow-hidden rounded-[36px] border border-white/70 bg-background/62 p-2 shadow-[0_40px_110px_-58px_hsl(var(--foreground)/.6)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[.04] lg:grid lg:grid-cols-[.38fr_.62fr] lg:p-3">
          <div className="grid gap-1.5 p-2 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label={content.locale === "en" ? "Capability chapters" : "Chapitres de compétences"}>
            {content.capabilities.map((capability, index) => {
              const Icon = capabilityIcons[index];
              const selected = capability.id === active.id;
              return (
                <button key={capability.id} type="button" role="tab" aria-selected={selected} onClick={() => setActiveId(capability.id)} className={cn("group relative grid min-h-20 grid-cols-[44px_1fr_44px] items-center gap-3 overflow-hidden rounded-[25px] px-4 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-primary", selected ? "text-white" : "hover:bg-foreground/[.04]")}>
                  {selected ? <motion.span layoutId="capability-active" className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)),#2944bf)]" transition={{ type: "spring", stiffness: 360, damping: 34 }} /> : null}
                  <span className={cn("relative grid size-11 shrink-0 place-items-center rounded-[16px] border", selected ? "border-white/18 bg-white/12" : "border-border bg-background/72 text-primary")}><Icon className="size-5" /></span>
                  <strong className="relative block min-w-0 text-sm leading-tight">{capability.title}</strong>
                  <span aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <motion.article key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[30px] border border-border/70 bg-background p-6 sm:p-9 lg:min-h-[520px] lg:p-11">
            <div className="absolute right-[-12%] top-[-18%] size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap gap-2">{active.proofWorkIds.map((id) => <span key={id} className="rounded-full border border-primary/18 bg-primary/[.06] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wide text-[#173fa8] dark:text-blue-300">{id}</span>)}</div>
              <h3 className="mt-7 max-w-2xl text-4xl font-bold tracking-[-.045em] sm:text-5xl">{active.title}</h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{active.summary}</p>
              <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
                <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-primary">{content.locale === "en" ? "Decisions made" : "Décisions prises"}</p><ul className="mt-4 space-y-3">{active.decisions.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><ChevronRight className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></div>
                <div><p className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-300">{content.locale === "en" ? "Visible evidence" : "Preuves visibles"}</p><ul className="mt-4 space-y-3">{active.outcomes.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-300" />{item}</li>)}</ul></div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function AiWorkflow({ content }: { content: PortfolioContent }) {
  const stages = content.locale === "en"
    ? [
        { title: "Prepare", description: "Framing, architecture, task breakdown and useful context.", icon: DraftingCompass },
        { title: "Build", description: "Specialized agents, implementation and documentation in the same loop.", icon: WandSparkles },
        { title: "Verify", description: "Human review, types, tests and explicit delivery boundaries.", icon: TestTube2 },
      ]
    : [
        { title: "Préparer", description: "Cadrage, architecture, découpage et contexte réellement utile.", icon: DraftingCompass },
        { title: "Construire", description: "Agents spécialisés, implémentation et documentation dans la même boucle.", icon: WandSparkles },
        { title: "Vérifier", description: "Review humaine, typage, tests et limites de livraison explicites.", icon: TestTube2 },
      ];
  const concepts = content.locale === "en"
    ? ["Agentic workflows", "Specialized agents", "Context engineering", "MCP", "Human review", "Typed guardrails"]
    : ["Workflows agentiques", "Agents spécialisés", "Context engineering", "MCP", "Review humaine", "Garde-fous typés"];
  return (
    <section className="relative overflow-hidden bg-[#07101E] px-5 py-28 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(87,117,255,.26),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(34,211,238,.16),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading invert eyebrow={content.locale === "en" ? "Working method" : "Méthode de travail"} title={content.locale === "en" ? "AI, integrated into the workflow." : "L’IA, intégrée au workflow."} intro={content.ai.narrative} />
        <div className="mt-16 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="rounded-[30px] border border-white/12 bg-white/[.045] p-6 backdrop-blur-xl sm:p-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-cyan-300">Human in the loop</p>
            <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-.035em]">{content.locale === "en" ? "The tool accelerates the work. Responsibility stays human." : "L’outil accélère le travail. La responsabilité reste humaine."}</p>
            <p className="mt-5 text-sm leading-7 text-white/58">{content.locale === "en" ? "Every assisted output returns to an explicit contract: product intent, types, review, tests and release boundaries." : "Chaque production assistée revient vers un contrat explicite : intention produit, typage, review, tests et limites de livraison."}</p>
            <div className="mt-7 flex flex-wrap gap-2">{concepts.map((concept) => <span key={concept} className="rounded-full border border-white/12 bg-white/[.045] px-3 py-1.5 text-[10px] text-white/64">{concept}</span>)}</div>
          </div>

          <ol className="overflow-hidden rounded-[32px] border border-white/12 bg-[#0A162A]/72 shadow-2xl backdrop-blur-xl">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return <motion.li key={stage.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="grid gap-5 border-b border-white/10 p-6 last:border-0 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8"><span className="grid size-12 place-items-center rounded-[17px] border border-white/12 bg-white/[.06] text-cyan-300"><Icon className="size-5" /></span><span><strong className="text-xl">{stage.title}</strong><span className="mt-2 block max-w-xl text-sm leading-6 text-white/55">{stage.description}</span></span><span className="font-mono text-[10px] text-white/28">0{index + 1}</span></motion.li>;
            })}
            <li className="p-6 sm:p-8"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/36">Toolbox</p><div className="mt-3 flex flex-wrap gap-2">{content.ai.tools.map((tool) => <span key={tool.name} className="rounded-full border border-white/10 bg-white/[.045] px-3 py-1.5 text-[10px] text-white/58">{tool.name}</span>)}</div></li>
          </ol>
        </div>
      </div>
    </section>
  );
}

type ProjectFamily = "all" | "mobile" | "web" | "personal" | "cinema" | "operations";

function getProjectFamilies(project: Experience): ProjectFamily[] {
  const families: ProjectFamily[] = [];
  if (project.platforms.includes("ios") || project.platforms.includes("android")) families.push("mobile");
  if (project.platforms.includes("web") && !["cinema", "hors_tech", "ops"].includes(project.experienceType)) families.push("web");
  if (project.experienceType === "personal") families.push("personal");
  if (["cinema", "hors_tech"].includes(project.experienceType)) families.push("cinema");
  if (project.experienceType === "ops") families.push("operations");
  return families.length > 0 ? families : ["web"];
}

function displayYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? period;
}

function ProjectUniverse({ content, onExperience }: { content: PortfolioContent; onExperience: (experience: Experience) => void }) {
  const [listView, setListView] = useState(false);
  const [family, setFamily] = useState<ProjectFamily>("all");
  const pressay = content.caseStudies.find((study) => study.slug === "pressay");
  const projects = useMemo(() => [...content.experiences].sort((a, b) => b.year.localeCompare(a.year)), [content.experiences]);
  const items = useMemo(() => [
    ...(pressay ? [{ id: "pressay", year: "2026", title: pressay.name, description: pressay.tagline, image: "/images/projects/pressay-home-dark.webp", families: ["web"] as ProjectFamily[], kind: "pressay" as const }] : []),
    ...projects.map((project) => ({ id: project.id, year: project.year, title: project.name, description: project.description, image: project.image, category: project.category, families: getProjectFamilies(project), kind: "experience" as const, project })),
  ], [pressay, projects]);
  const visibleItems = useMemo(() => family === "all" ? items : items.filter((item) => item.families.includes(family)), [family, items]);
  const families: Array<{ id: ProjectFamily; fr: string; en: string }> = [
    { id: "all", fr: "Tout", en: "All" },
    { id: "mobile", fr: "Mobile", en: "Mobile" },
    { id: "web", fr: "Web & produit", en: "Web & product" },
    { id: "personal", fr: "Projets personnels", en: "Personal projects" },
    { id: "cinema", fr: "Cinéma", en: "Cinema" },
    { id: "operations", fr: "Opérations", en: "Operations" },
  ];

  return (
    <section id="work" className="overflow-hidden bg-[#F2F5FA] px-5 py-28 dark:bg-[#060A12] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={content.locale === "en" ? "Work & missions" : "Réalisations & missions"} title={content.copy.fullJourney} intro={content.copy.fullJourneyIntro} />
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group" aria-label={content.locale === "en" ? "Filter work by family" : "Filtrer les réalisations par famille"}>
            {families.map((item) => <button key={item.id} type="button" aria-pressed={family === item.id} onClick={() => setFamily(item.id)} className={cn("liquid-button shrink-0 !h-11 !px-4", family === item.id && "liquid-button-primary")}>{content.locale === "en" ? item.en : item.fr}</button>)}
          </div>
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground" aria-live="polite">{visibleItems.length} {content.locale === "en" ? "entries" : "réalisations"}</p>
            <button type="button" aria-pressed={listView} onClick={() => setListView((value) => !value)} className="liquid-button shrink-0">{listView ? <LayoutGrid className="size-4" /> : <List className="size-4" />}{listView ? (content.locale === "en" ? "Card view" : "Vue cartes") : (content.locale === "en" ? "List view" : "Vue liste")}</button>
          </div>
        </div>

        {listView ? (
          <div className="mt-10 divide-y divide-border rounded-[28px] border border-border bg-background/75 px-5 backdrop-blur-xl sm:px-8">
            {visibleItems.map((item) => item.kind === "pressay"
              ? <Link key={item.id} href={`/${content.locale}/projects/pressay`} data-content-id="journey-pressay" className="group grid min-h-24 items-center gap-3 py-5 sm:grid-cols-[100px_1fr_auto]"><span className="font-mono text-xs text-muted-foreground">{displayYear(item.year)}</span><span><strong className="block text-xl">{item.title}</strong><span className="text-sm text-muted-foreground">{item.description}</span></span><ArrowUpRight className="size-5 text-primary" /></Link>
              : <button key={item.id} type="button" data-content-id={`journey-${item.id}`} onClick={() => onExperience(item.project)} className="group grid min-h-24 w-full items-center gap-3 py-5 text-left sm:grid-cols-[100px_1fr_auto]"><span className="font-mono text-xs text-muted-foreground">{displayYear(item.year)}</span><span><strong className="block text-xl">{item.title}</strong><span className="text-sm text-muted-foreground">{item.description}</span></span><ChevronRight className="size-5 text-primary transition-transform group-hover:translate-x-1" /></button>)}
          </div>
        ) : (
          <div className="mt-12 grid auto-rows-[minmax(340px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-12">
            {visibleItems.map((item, index) => {
              const cardClass = cn("group relative isolate min-h-[360px] overflow-hidden rounded-[30px] border border-white/70 bg-slate-950 text-left text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,.9)] outline-none transition duration-500 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-primary/35 dark:border-white/12", index % 7 === 0 || index % 7 === 3 ? "lg:col-span-7" : "lg:col-span-5");
              const accessibleName = `${item.title} — ${item.description}`;
              const cardContent = <><div className="absolute inset-0 overflow-hidden">{item.image ? <Image src={item.image} alt="" fill quality={92} className="object-cover object-center opacity-[.88] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-75" sizes="(max-width: 768px) 100vw, 56vw" /> : null}<div className="absolute inset-0 bg-gradient-to-t from-black via-black/12 to-transparent" /></div><div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-black/54 p-5 backdrop-blur-xl sm:p-6"><div className="flex items-center justify-between gap-4"><p className="font-mono text-[9px] font-bold uppercase tracking-[.17em] text-cyan-200">{displayYear(item.year)}{"category" in item ? ` · ${item.category}` : " · Case study"}</p><ArrowUpRight className="size-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h3 className="mt-3 text-2xl font-bold tracking-[-.04em] sm:text-3xl">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/62">{item.description}</p></div></>;
              return item.kind === "pressay"
                ? <Link key={item.id} href={`/${content.locale}/projects/pressay`} aria-label={accessibleName} data-content-id={`journey-${item.id}`} className={cardClass}>{cardContent}</Link>
                : <button key={item.id} type="button" aria-label={accessibleName} onClick={() => onExperience(item.project)} data-content-id={`journey-${item.id}`} className={cardClass}>{cardContent}</button>;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CareerStory({ content }: { content: PortfolioContent }) {
  return (
    <section id="resume" className="liquid-canvas px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={content.locale === "en" ? "Thread" : "Fil rouge"} title={content.copy.resumeTitle} intro={content.locale === "en" ? "Cinema taught me precision. Operations taught me clarity. Product and mobile brought both together." : "Le cinéma m’a appris la précision. Les opérations, la clarté. Le produit et le mobile ont réuni les deux."} />
        <ol className="relative mt-14 grid overflow-hidden rounded-[30px] border border-border bg-background/62 backdrop-blur-xl md:grid-cols-4">
          {content.careerChapters.map((chapter, index) => (
            <li key={chapter.id} className="relative border-b border-border p-6 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-7">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-primary">0{index + 1} · {chapter.period}</span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-.04em]">{chapter.label}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{chapter.transferStatement}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
          <div><p className="text-xl font-semibold">{content.locale === "en" ? "One resume. The complete path." : "Un CV. Le parcours complet."}</p><p className="mt-1 text-sm text-muted-foreground">FR · EN · PDF</p></div>
          <PDFDownloadButton className="liquid-button liquid-button-primary !h-12 !rounded-full !px-5" />
        </div>
      </div>
    </section>
  );
}

function ContactAndFooter({ content }: { content: PortfolioContent }) {
  const [intentId, setIntentId] = useState(content.contactIntents[0].id);
  const intent = content.contactIntents.find((item) => item.id === intentId) ?? content.contactIntents[0];

  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-[#061226] px-5 py-28 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(63,115,255,.28),transparent_34%),radial-gradient(circle_at_18%_90%,rgba(34,211,238,.12),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Contact</p>
            <h2 className="mt-5 text-5xl font-bold tracking-[-0.055em] sm:text-7xl">{intent.heading}</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/62">{content.copy.contactIntro}</p>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={content.locale === "en" ? "Contact intent" : "Type de contact"}>
              {content.contactIntents.map((item) => <button key={item.id} type="button" aria-pressed={intentId === item.id} onClick={() => setIntentId(item.id)} className={cn("liquid-button liquid-button-clear", intentId === item.id && "!bg-white !text-slate-950")}>{item.label}</button>)}
            </div>
            <div className="mt-10 flex gap-3">{content.socialLinks.map((link) => <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={link.name} className="liquid-icon-button">{socialIcons[link.icon] ?? <Sparkles className="size-5" />}</a>)}</div>
          </div>
          <ContactFormCard contrast className="!rounded-[34px] !border-white/16 !bg-white/[0.08] !p-6 shadow-2xl sm:!p-9" titleClassName="mb-8 text-2xl font-semibold text-white" intent={intent} />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#030711] px-5 py-7 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-semibold">{content.profile.firstName} {content.profile.lastName}</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[.14em] text-white/38">© {new Date().getFullYear()} · {content.profile.title}</p></div>
          <div className="flex flex-wrap items-center gap-1.5">
            {content.socialLinks.slice(0, 3).map((link) => <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 items-center px-3 text-xs text-white/55 transition hover:text-white">{link.name}</a>)}
            <PDFDownloadButton className="!min-h-11 !text-white/70" />
            <button type="button" onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex size-11 items-center justify-center rounded-full text-white/55 transition hover:bg-white/10 hover:text-white" aria-label={content.locale === "en" ? "Back to top" : "Retour en haut"}><ArrowUp className="size-4" /></button>
          </div>
        </div>
      </footer>
    </>
  );
}

export function ImmersiveWebView({ onEnterIphone }: { onEnterIphone: () => void }) {
  const { locale } = useI18n();
  const content = getPortfolioContent(locale);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const sections = ["top", "projects", "iphone-experience", "skills", "work", "resume", "contact"];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const key = `portfolio-section-${entry.target.id}`;
        if (sessionStorage.getItem(key)) continue;
        sessionStorage.setItem(key, "1");
        trackPortfolioEvent("section_reached", { section: entry.target.id, mode: "web" });
      }
    }, { threshold: 0.22 });
    sections.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Hero content={content} />
      <SelectedWorkShowreel content={content} onExperience={setSelectedExperience} />
      <ModeTransitionScene content={content} onEnterIphone={onEnterIphone} />
      <Capabilities content={content} />
      <AiWorkflow content={content} />
      <ProjectUniverse content={content} onExperience={setSelectedExperience} />
      <CareerStory content={content} />
      <ContactAndFooter content={content} />
      <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
    </div>
  );
}
