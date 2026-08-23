"use client";

import Image from "next/image";
import { ArrowRight, type LucideIcon, Layers, Zap, FileText, Send } from "lucide-react";
import { motion } from "motion/react";
import StatusBar from "../device/StatusBar";
import { getNavigationItems, getProfile, getUiTexts } from "@/data";
import { useI18n } from "@/i18n/I18nProvider";

const navIcons: Record<string, LucideIcon> = { work: Layers, skills: Zap, resume: FileText, contact: Send };

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  hideStatusBar?: boolean;
}

const HomeScreen = ({ onNavigate, hideStatusBar = false }: HomeScreenProps) => {
  const { locale } = useI18n();
  const profile = getProfile(locale);
  const navigationItems = getNavigationItems(locale);
  const uiTexts = getUiTexts(locale);

  return (
    <div className="phone-canvas flex h-full flex-col bg-background">
      {!hideStatusBar ? <StatusBar /> : null}
      <div
        role="region"
        aria-label={locale === "en" ? "Home content" : "Contenu de l’accueil"}
        tabIndex={0}
        className="flex-1 overflow-y-auto pb-32 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <section className="relative overflow-hidden px-5 pb-1 pt-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_15%,hsl(var(--primary)/.28),transparent_34%),radial-gradient(circle_at_12%_52%,rgba(34,211,238,.17),transparent_34%)]" />
          <div className="relative z-20">
            <p className="font-mono text-[8px] font-bold uppercase tracking-[.2em] text-primary">{profile.subtitle}</p>
            <h1 className="mt-4 font-display text-[2.8rem] font-bold uppercase leading-[0.86] tracking-[-0.06em]">{profile.firstName}<span className="block">{profile.lastName}</span></h1>
            <p className="mt-3 text-lg font-semibold tracking-tight text-primary">{profile.title}</p>
          </div>

          <div className="relative z-10 mx-auto mt-6 aspect-square w-[68%] max-w-[260px]">
            <motion.div className="absolute inset-0 rounded-[47%_53%_44%_56%/48%_44%_56%_52%] bg-[linear-gradient(145deg,#315df4,#62d4f0_52%,#e5f3ff)] shadow-[0_30px_75px_-28px_rgba(42,100,255,.78)]" animate={{ borderRadius: ["47% 53% 44% 56% / 48% 44% 56% 52%", "54% 46% 55% 45% / 54% 52% 48% 46%", "47% 53% 44% 56% / 48% 44% 56% 52%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
            <div className="absolute inset-[5px] overflow-hidden rounded-[46%_54%_43%_57%/47%_43%_57%_53%] border border-white/70 bg-blue-100/30">
              <div className="silhouette-stroke liquid-silhouette absolute inset-x-[-3%] bottom-[-7%] top-0"><Image src={profile.avatar} alt="" fill className="object-contain object-bottom" priority sizes="260px" aria-hidden /></div>
              <div className="absolute inset-x-[-3%] bottom-[-7%] top-0"><Image src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} fill className="object-contain object-bottom" priority sizes="260px" /></div>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.38),transparent_38%)]" />
            </div>
          </div>
          <div className="relative z-20 mt-5 flex divide-x divide-border border-y border-border/70">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 flex-1 py-4 text-center">
                <p className="text-xl font-bold tabular-nums">{stat.value}</p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.11em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="relative z-20 mt-5 text-sm leading-6 text-muted-foreground">{profile.bio}</p>
        </section>

        <section className="px-5 pt-8">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">{uiTexts.sections.explorer}</p>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {navigationItems.map((item) => {
              const Icon = navIcons[item.id] ?? Layers;
              return (
                <button key={item.id} type="button" aria-label={`${item.label} — ${item.subtitle}`} onClick={() => onNavigate(item.id === "experiences" ? "work" : item.id)} className="group flex min-h-[76px] w-full items-center gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br ${item.gradient} text-white shadow-lg`}><Icon className="size-5" /></span>
                  <span className="min-w-0 flex-1"><strong className="block text-[15px]">{item.label}</strong><span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.subtitle}</span></span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
