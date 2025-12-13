/**
 * AI & Development Data
 * Contenu pour le bloc IA & développement assisté
 */

export interface AITool {
  name: string;
  icon?: string;
  description?: string;
}

export interface AIContent {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  narrative: string;
  highlights: string[];
  tools: AITool[];
}

export const aiContent: AIContent = {
  id: 'ai-development',
  title: 'IA & développement assisté',
  subtitle: 'Enthousiaste et pragmatique',
  icon: '🤖',
  gradient: 'from-purple-500 to-pink-400',
  narrative: `Je m'intéresse de près aux évolutions de l'IA appliquées au développement logiciel. Là où certains y voient une menace pour le métier, j'y vois au contraire une opportunité : celle de recentrer le travail du développeur sur la conception produit, la logique métier et l'architecture des applications.

J'utilise l'IA comme un levier de qualité et d'efficacité, pas comme un raccourci. Je passe du temps à configurer mes projets pour qu'ils soient réellement compatibles avec des workflows assistés par IA : conventions claires, typage strict, documentation exploitable et architecture lisible. Mon objectif est de construire des applications solides, scalables et maintenables, en tirant parti des outils les plus récents sans perdre l'exigence technique.

Je m'appuie régulièrement sur des outils de code review automatisée, des LLMs agentiques et des assistants de conception pour améliorer la qualité du code, accélérer l'itération et challenger mes choix techniques.`,
  highlights: [
    'Workflows IA-ready (typage strict, conventions claires)',
    'Code review automatisée et assistée',
    'Architecture pensée pour la maintenabilité',
    'Itération rapide avec validation qualité',
  ],
  tools: [
    { name: 'GitHub Copilot', icon: '🤖', description: 'Autocomplétion intelligente' },
    { name: 'Claude', icon: '🧠', description: 'Agents, review, design & architecture' },
    { name: 'CodeRabbit', icon: '🐰', description: 'Code review automatisée' },
    { name: 'Figma AI', icon: '🎨', description: 'Design & prototypage assisté' },
    { name: 'ChatGPT', icon: '💬', description: 'Raisonnement, refactoring, documentation' },
  ],
};

export default aiContent;
