/**
 * Data - Export Central
 *
 * Usage:
 * import { profile, projects, skillCategories } from '@/data';
 */

// Types
export * from './types';

// Profile
export { profile, navigationItems } from './profile';

// Projects
export {
  projects,
  getProjectsCount,
  getProjectById,
  getProjectsByPlatform,
} from './projects';

// Skills
export {
  skillCategories,
  tools,
  getAllSkills,
  getCategoryAverageLevel,
} from './skills';

// Resume (CV)
export {
  experiences,
  education,
  getExperiencesByType,
  getDevExperiences,
  getTotalYearsOfExperience,
} from './resume';

// Social
export { socialLinks, getSocialLinkById, getContactEmail } from './social';

// Config
export { siteConfig, uiTexts } from './config';
