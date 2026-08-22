"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { usePortfolioExperience } from "./PortfolioExperienceContext";

export function MotionBoundary({ children }: { children: ReactNode }) {
  const { motionMode } = usePortfolioExperience();

  return (
    <MotionConfig
      reducedMotion={motionMode === "full" ? "never" : "always"}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
