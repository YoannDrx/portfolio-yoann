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
  level: 'Expert' | 'Avancé' | 'Confirmé' | 'Intermédiaire';
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
};

export default aiContent;
