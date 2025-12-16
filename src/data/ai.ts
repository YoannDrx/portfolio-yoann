/**
 * AI & Development Data
 * Contenu pour le bloc IA & développement assisté
 */

import type { Locale } from '@/i18n/locales';

export interface AITool {
  name: string;
  icon?: string;
  description?: string;
}

export interface AIContent {
  id: string;
  title: string;
  subtitle: string;
  level: 'Expert' | 'Avancé' | 'Confirmé' | 'Intermédiaire' | 'Advanced' | 'Proficient' | 'Intermediate';
  icon: string;
  gradient: string;
  narrative: string;
  highlights: string[];
  tools: AITool[];
}

const aiContentByLocale: Record<Locale, AIContent> = {
  fr: {
    id: 'ai-development',
    title: 'IA & développement assisté',
    subtitle: 'Enthousiaste et pragmatique',
    level: 'Avancé',
    icon: '✨',
    gradient: 'from-purple-500 to-pink-400',
    narrative: `J'utilise l'IA comme un levier de qualité et d'efficacité, pas comme un raccourci. Je passe du temps à configurer mes projets pour qu'ils soient réellement compatibles avec des workflows assistés par IA : conventions claires, typage strict, documentation exploitable et architecture lisible. Mon objectif est de construire des applications solides, scalables et maintenables, en tirant parti des outils les plus récents sans perdre l'exigence technique.`,
    highlights: [
      'Workflows IA-ready (typage strict, conventions claires)',
      'Code review automatisée et assistée',
      'Architecture pensée pour la maintenabilité',
      'Itération rapide avec validation qualité',
    ],
    tools: [
      { name: 'Copilot', icon: '🤖', description: 'Autocomplétion intelligente' },
      { name: 'Claude', icon: '🧠', description: 'Agents, review, design & architecture' },
      { name: 'Codex', icon: '💬', description: 'Raisonnement, refactoring, documentation' },
      { name: 'CodeRabbit', icon: '🐰', description: 'Code review automatisée' },
      { name: 'MCP', icon: '🔌', description: 'Model Context Protocol' },
      { name: 'Plugins', icon: '🧩', description: 'Extensions et intégrations' },
    ],
  },
  en: {
    id: 'ai-development',
    title: 'AI-assisted development',
    subtitle: 'Enthusiastic and pragmatic',
    level: 'Advanced',
    icon: '✨',
    gradient: 'from-purple-500 to-pink-400',
    narrative: `I use AI as a lever for quality and efficiency—not as a shortcut. I invest time setting up projects so they truly work with AI-assisted workflows: clear conventions, strong typing, actionable documentation, and readable architecture. My goal is to build solid, scalable, maintainable applications while taking advantage of the latest tools without compromising engineering standards.`,
    highlights: [
      'AI-ready workflows (strong typing, clear conventions)',
      'Automated and assisted code reviews',
      'Architecture designed for maintainability',
      'Fast iteration with quality checks',
    ],
    tools: [
      { name: 'Copilot', icon: '🤖', description: 'Smart autocompletion' },
      { name: 'Claude', icon: '🧠', description: 'Agents, review, design & architecture' },
      { name: 'Codex', icon: '💬', description: 'Reasoning, refactoring, documentation' },
      { name: 'CodeRabbit', icon: '🐰', description: 'Automated code review' },
      { name: 'MCP', icon: '🔌', description: 'Model Context Protocol' },
      { name: 'Plugins', icon: '🧩', description: 'Extensions and integrations' },
    ],
  },
};

export const aiContent: AIContent = aiContentByLocale.fr;

export function getAiContent(locale: Locale): AIContent {
  return aiContentByLocale[locale] ?? aiContentByLocale.fr;
}

export default aiContent;
