"use client";

import { useEffect, useState } from "react";
import { IOSSidePanel } from "@/components/ios";
import { ExperienceDetailPanel } from "@/components/experiences/ExperienceDetailPanel";
import type { Experience, PortfolioContent, PortfolioSectionId } from "@/data";
import { HeroSection } from "./sections/HeroSection";
import { SelectedWorkShowreel } from "./sections/SelectedWorkShowreel";
import { JourneyArchive } from "./sections/JourneyArchive";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { CareerStorySection } from "./sections/CareerStorySection";
import { ContactSection } from "./sections/ContactSection";
import { usePortfolioExperience } from "./PortfolioExperienceContext";

const observedSections: Array<{ id: string; section: PortfolioSectionId }> = [
  { id: "top", section: "home" },
  { id: "work", section: "work" },
  { id: "skills", section: "skills" },
  { id: "resume", section: "resume" },
  { id: "contact", section: "contact" },
];

export function PortfolioWebView({ content }: { content: PortfolioContent }) {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { setActiveSection } = usePortfolioExperience();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        if (!visible) return;
        const match = observedSections.find((item) => item.id === visible.target.id);
        if (match) setActiveSection(match.section);
      },
      { rootMargin: "-24% 0px -54% 0px", threshold: [0.01, 0.2, 0.45] }
    );
    observedSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="relative z-10 min-h-screen overflow-x-hidden bg-background/82">
      <HeroSection content={content} />
      <SelectedWorkShowreel content={content} onExperience={setSelectedExperience} />
      <JourneyArchive content={content} onExperience={setSelectedExperience} />
      <CapabilitiesSection content={content} />
      <CareerStorySection content={content} />
      <ContactSection content={content} />
      <footer className="relative z-10 border-t border-border bg-background px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {content.profile.firstName} {content.profile.lastName}</p>
          <p>{content.locale === "en" ? "React Native · Product · UX" : "React Native · Produit · UX"}</p>
        </div>
      </footer>

      <IOSSidePanel isOpen={Boolean(selectedExperience)} onClose={() => setSelectedExperience(null)} width="xl">
        {selectedExperience ? <ExperienceDetailPanel experience={selectedExperience} /> : null}
      </IOSSidePanel>
    </div>
  );
}
