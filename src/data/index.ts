/**
 * Data - Export Central
 *
 * Usage:
 * import { profile, experiences, skillCategories } from '@/data';
 */

// Types
export * from './types';

// Profile
export { profile, navigationItems, getProfile, getNavigationItems } from './profile';

// Experiences
export {
  experiences,
  getExperiences,
  getExperiencesCount,
  getExperienceById,
  getExperiencesByPlatform,
  getExperiencesByType,
} from './experiences';

// Skills
export {
  skillCategories,
  tools,
  getAllSkills,
  getCategoryAverageLevel,
  // Narrative skills
  skillStoryIntro,
  getSkillStoryIntro,
  technicalSkills,
  getTechnicalSkills,
  softSkills,
  getSoftSkills,
  getTools,
} from './skills';

// Resume (CV)
export {
  workExperiences,
  education,
  getWorkExperiences,
  getEducation,
  getWorkExperiencesByType,
  getDevWorkExperiences,
  getTotalYearsOfExperience,
} from './resume';

// Social
export { socialLinks, getSocialLinks, getSocialLinkById, getContactEmail } from './social';

// Config
export { siteConfig, getSiteConfig, uiTexts, getUiTexts } from './config';

// AI Content
export { aiContent, getAiContent, type AIContent, type AITool } from './ai';

// Recruiter-facing case studies
export {
  caseStudySlugs,
  getCaseStudy,
  getCaseStudySummaries,
  type CaseStudy,
  type CaseStudyDecision,
  type CaseStudySlug,
} from "./case-studies";

// Download Assets
export { downloadAssets, getAssetsByCategory, type DownloadAsset, type AssetCategory, type AssetFormat } from './download-assets';
