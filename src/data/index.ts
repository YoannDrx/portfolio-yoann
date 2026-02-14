/**
 * Data - Export Central
 *
 * Usage:
 * import { profile, projects, skillCategories } from '@/data';
 */

// Types
export * from './types';

// Profile
export { profile, navigationItems, getProfile, getNavigationItems } from './profile';

// Projects
export {
  projects,
  getProjects,
  getProjectsCount,
  getProjectById,
  getProjectsByPlatform,
  getProjectsByType,
} from './projects';

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
  experiences,
  education,
  getExperiences,
  getEducation,
  getExperiencesByType,
  getDevExperiences,
  getTotalYearsOfExperience,
} from './resume';

// Social
export { socialLinks, getSocialLinks, getSocialLinkById, getContactEmail } from './social';

// Config
export { siteConfig, getSiteConfig, uiTexts, getUiTexts } from './config';

// AI Content
export { aiContent, getAiContent, type AIContent, type AITool } from './ai';
