export type ActivityId = "software" | "event" | "courier";

export type Priority = "high" | "medium" | "low";

export type ApplicationStatus =
  | "target"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface Activity {
  id: ActivityId;
  name: string;
  tagline: string;
  color: string;
}

export interface Persona {
  id: string;
  activityId: ActivityId;
  name: string;
  headline: string;
  targetRoles: string[];
  baseSummary: string;
  coreSkills: string[];
  atsKeywords: string[];
}

export interface ExperienceAsset {
  id: string;
  activityId: ActivityId;
  title: string;
  organization: string;
  period: string;
  location: string;
  verified: boolean;
  highlights: string[];
  skills: string[];
  metrics: string[];
}

export interface JobOfferInput {
  offerText: string;
  personaId: string;
}

export interface MatchingScore {
  global: number;
  hardSkills: number;
  domainFit: number;
  constraints: number;
  evidenceCoverage: number;
}

export interface MatchingRecommendation {
  id: string;
  priority: Priority;
  title: string;
  rationale: string;
  action: string;
}

export interface SuggestedBullet {
  id: string;
  sourceAssetId: string;
  text: string;
  verified: boolean;
}

export interface OfferInsights {
  title: string;
  contract: string;
  location: string;
  remote: string;
  seniority: string;
  extractedKeywords: string[];
}

export interface OfferAnalysis {
  persona: Persona;
  insights: OfferInsights;
  score: MatchingScore;
  matchedSkills: string[];
  missingKeywords: string[];
  recommendedAssets: ExperienceAsset[];
  recommendations: MatchingRecommendation[];
  suggestedSummary: string;
  suggestedBullets: SuggestedBullet[];
}

export interface ApplicationItem {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  lastUpdate: string;
  personaId: string;
  source: string;
}

export interface ContentSnapshot {
  id: string;
  label: string;
  status: "draft" | "published";
  updatedAt: string;
  updatedBy: string;
  notes: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface AdminStore {
  activities: Activity[];
  personas: Persona[];
  experienceAssets: ExperienceAsset[];
  applications: ApplicationItem[];
  contentSnapshots: ContentSnapshot[];
  adminUsers: AdminUser[];
  updatedAt: string;
}
