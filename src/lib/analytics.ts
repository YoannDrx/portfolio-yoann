"use client";

import { track } from "@vercel/analytics";

type PortfolioEvent =
  | "cta_clicked"
  | "section_reached"
  | "view_mode_changed"
  | "cv_downloaded"
  | "contact_submit_result";

type SafeValue = string | number | boolean | null;

export function trackPortfolioEvent(
  event: PortfolioEvent,
  properties: Record<string, SafeValue>
) {
  if (process.env.NODE_ENV === "test") return;

  try {
    track(event, properties);
  } catch {
    // Analytics must never interrupt a recruiter journey.
  }
}
