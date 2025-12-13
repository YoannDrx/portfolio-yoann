/**
 * SkillsScreen
 * Écran affichant les compétences avec cartes narratives
 * Design System Apple iOS - Inclut bloc IA
 */

import StatusBar from '../device/StatusBar';
import { IOSCard, IOSBadge, IOSNavigationBar, IOSChip } from '../ios';
import { skillStoryIntro, technicalSkills, softSkills, tools, uiTexts, aiContent } from '@/data';
import type { NarrativeSkillCard, SoftSkillCard } from '@/data/types';

// Badge de niveau avec couleur
const LevelBadge = ({ level }: { level: NarrativeSkillCard['level'] }) => {
  const colorMap = {
    Expert: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    Avancé: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    Confirmé: 'bg-green-500/20 text-green-600 dark:text-green-400',
    Intermédiaire: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[level]}`}
    >
      {level}
    </span>
  );
};

// Carte de compétence technique narrative
const TechSkillCard = ({ skill }: { skill: NarrativeSkillCard }) => (
  <IOSCard variant="glass" padding="md">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center`}
        >
          <span className="text-lg">{skill.icon}</span>
        </div>
        <h3 className="font-semibold text-foreground">{skill.title}</h3>
      </div>
      <LevelBadge level={skill.level} />
    </div>

    {/* Narrative */}
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
      {skill.narrative}
    </p>

    {/* Highlights */}
    <ul className="space-y-1.5">
      {skill.highlights.map((highlight, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <span className="text-primary mt-0.5">•</span>
          <span className="text-foreground/80">{highlight}</span>
        </li>
      ))}
    </ul>
  </IOSCard>
);

// Carte de soft skill narrative
const SoftSkillCardComponent = ({ skill }: { skill: SoftSkillCard }) => (
  <IOSCard variant="glass" padding="md">
    {/* Header */}
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center`}
      >
        <span className="text-lg">{skill.icon}</span>
      </div>
      <h3 className="font-semibold text-foreground">{skill.title}</h3>
    </div>

    {/* Narrative */}
    <p className="text-sm text-muted-foreground leading-relaxed">
      {skill.narrative}
    </p>
  </IOSCard>
);

const SkillsScreen = () => {
  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <IOSNavigationBar
          title={uiTexts.nav.skills}
          subtitle={uiTexts.stats.stackExpertise}
        />

        {/* Intro narrative */}
        <div className="px-5 mb-6">
          <IOSCard variant="glass" padding="md">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{skillStoryIntro}"
            </p>
          </IOSCard>
        </div>

        {/* Technical Skills Section */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Compétences techniques
          </h3>
          <div className="space-y-4 stagger-children">
            {technicalSkills.map((skill) => (
              <TechSkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Soft skills
          </h3>
          <div className="space-y-4 stagger-children">
            {softSkills.map((skill) => (
              <SoftSkillCardComponent key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

        {/* AI Section - New */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {aiContent.title}
          </h3>
          <IOSCard variant="glass" padding="md" className="border-l-4 border-purple-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                <span className="text-lg">{aiContent.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{aiContent.subtitle}</h4>
                <p className="text-xs text-muted-foreground">Outils IA intégrés au workflow</p>
              </div>
            </div>

            {/* Narrative - shortened for mobile */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              J&apos;utilise l&apos;IA comme un levier de qualité et d&apos;efficacité, pas comme un raccourci. Mon objectif est de construire des applications solides, scalables et maintenables, en tirant parti des outils les plus récents sans perdre l&apos;exigence technique.
            </p>

            {/* Highlights */}
            <ul className="space-y-1.5 mb-4">
              {aiContent.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span className="text-foreground/80">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Tools */}
            <div className="flex flex-wrap gap-2">
              {aiContent.tools.map((tool) => (
                <IOSChip key={tool.name} variant="default" size="sm">
                  {tool.icon && <span>{tool.icon}</span>}
                  {tool.name}
                </IOSChip>
              ))}
            </div>
          </IOSCard>
        </div>

        {/* Tools Section */}
        <div className="px-5 mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {uiTexts.sections.toolsEnvironment}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <IOSBadge
                key={tool.name}
                variant="default"
                size="md"
                className="bg-muted text-muted-foreground"
              >
                {tool.icon && <span className="mr-1">{tool.icon}</span>}
                {tool.name}
              </IOSBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsScreen;
