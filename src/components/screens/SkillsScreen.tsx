"use client";

/**
 * SkillsScreen
 * Écran affichant les compétences avec cartes cliquables et vue détaillée
 * Design System Apple iOS
 */

import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import StatusBar from '../device/StatusBar';
import { IOSCard, IOSButton, IOSBadge, IOSNavigationBar, IOSChip } from '../ios';
import { getAiContent, getSkillStoryIntro, getSoftSkills, getTechnicalSkills, getTools, getUiTexts } from '@/data';
import { useI18n } from '@/i18n/I18nProvider';
import type { NarrativeSkillCard, SoftSkillCard } from '@/data/types';

// Type union pour skill sélectionnée
type SelectedSkill =
  | { type: 'technical'; skill: NarrativeSkillCard }
  | { type: 'soft'; skill: SoftSkillCard }
  | { type: 'ai' };

// Badge de niveau avec couleur
const LevelBadge = ({
  level,
  label,
  size = 'sm',
}: {
  level: string;
  label?: string;
  size?: 'sm' | 'md';
}) => {
  const { locale } = useI18n();
  const resolvedLabel = useMemo(() => {
    if (label) return label;
    if (locale !== 'en') return level;

    const map: Record<string, string> = {
      Expert: 'Expert',
      Avancé: 'Advanced',
      Confirmé: 'Proficient',
      Intermédiaire: 'Intermediate',
    };

    return map[level] ?? level;
  }, [label, level, locale]);

  const colorMap: Record<string, string> = {
    Expert: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
    Avancé: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    Confirmé: 'bg-green-500/20 text-green-600 dark:text-green-400',
    Intermédiaire: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
  };

  const sizeClass = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`${sizeClass} rounded-full font-medium flex-shrink-0 ${colorMap[level] || colorMap.Confirmé}`}>
      {resolvedLabel}
    </span>
  );
};

// Carte compacte cliquable pour compétence technique
const TechSkillCardCompact = ({
  skill,
  onPress
}: {
  skill: NarrativeSkillCard;
  onPress: () => void;
}) => (
  <IOSCard variant="subtle" padding="md" interactive onPress={onPress} className="card-premium-hover">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-[3px] h-8 rounded-full bg-gradient-to-b ${skill.gradient} flex-shrink-0`} />
        <h3 className="font-semibold text-foreground truncate">{skill.title}</h3>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <LevelBadge level={skill.level} />
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  </IOSCard>
);

// Carte compacte cliquable pour soft skill
const SoftSkillCardCompact = ({
  skill,
  onPress
}: {
  skill: SoftSkillCard;
  onPress: () => void;
}) => (
  <IOSCard variant="subtle" padding="md" interactive onPress={onPress} className="card-premium-hover">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-[3px] h-8 rounded-full bg-gradient-to-b ${skill.gradient} flex-shrink-0`} />
        <h3 className="font-semibold text-foreground truncate">{skill.title}</h3>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </div>
  </IOSCard>
);

// Carte compacte cliquable pour IA
const AICardCompact = ({ onPress }: { onPress: () => void }) => {
  const { locale } = useI18n();
  const aiContent = getAiContent(locale);

  return (
    <IOSCard variant="subtle" padding="md" interactive onPress={onPress} className="card-premium-hover">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-500/20 bg-purple-500/[0.06] text-purple-600 dark:text-purple-400 flex-shrink-0">
            AI
          </span>
          <h3 className="font-semibold text-foreground truncate">{aiContent.subtitle}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <LevelBadge level={aiContent.level} />
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </IOSCard>
  );
};

// Vue détaillée d'une compétence technique
const TechSkillDetail = ({
  skill,
  onBack,
  hideStatusBar = false
}: {
  skill: NarrativeSkillCard;
  onBack: () => void;
  hideStatusBar?: boolean;
}) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="h-full bg-background flex flex-col animate-ios-push">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button */}
      <div className="px-5 pt-2 pb-4">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto min-h-0 min-w-0">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-5">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-[3px] rounded-full bg-gradient-to-r ${skill.gradient} mb-3`} />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{skill.title}</h1>
          {skill.subtitle && <p className="text-sm text-muted-foreground mt-1">{skill.subtitle}</p>}
          <div className="mt-2"><LevelBadge level={skill.level} size="sm" /></div>
        </div>

        {/* Narrative */}
        <IOSCard variant="subtle" padding="md" className="mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {skill.narrative}
          </p>
        </IOSCard>

        {/* Highlights */}
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {uiTexts.sections.keyPoints}
        </h3>
        <IOSCard variant="subtle" padding="md">
          <ul className="space-y-2">
            {skill.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-foreground/90">{highlight}</span>
              </li>
            ))}
          </ul>
        </IOSCard>
      </div>
    </div>
  );
};

// Vue détaillée d'un soft skill
const SoftSkillDetail = ({
  skill,
  onBack,
  hideStatusBar = false
}: {
  skill: SoftSkillCard;
  onBack: () => void;
  hideStatusBar?: boolean;
}) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);

  return (
    <div className="h-full bg-background flex flex-col animate-ios-push">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button */}
      <div className="px-5 pt-2 pb-4">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto min-h-0 min-w-0">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-5">
        {/* Header */}
        <div className="mb-6">
          <div className={`w-12 h-[3px] rounded-full bg-gradient-to-r ${skill.gradient} mb-3`} />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{skill.title}</h1>
        </div>

        {/* Narrative */}
        <IOSCard variant="subtle" padding="lg">
          <p className="text-muted-foreground leading-relaxed">
            {skill.narrative}
          </p>
        </IOSCard>
      </div>
    </div>
  );
};

// Vue détaillée de la section IA
const AIDetail = ({ onBack, hideStatusBar = false }: { onBack: () => void; hideStatusBar?: boolean }) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const aiContent = getAiContent(locale);

  return (
    <div className="h-full bg-background flex flex-col animate-ios-push">
      {!hideStatusBar && <StatusBar />}

      {/* Back Button */}
      <div className="px-5 pt-2 pb-4">
        <IOSButton variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto min-h-0 min-w-0">
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>{uiTexts.buttons.back}</span>
        </IOSButton>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 px-5">
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg border border-purple-500/20 bg-purple-500/[0.06] text-purple-600 dark:text-purple-400 inline-block mb-3">
            AI
          </span>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{aiContent.subtitle}</h1>
          <div className="mt-2"><LevelBadge level={aiContent.level} size="sm" /></div>
        </div>

        {/* Narrative */}
        <IOSCard variant="subtle" padding="md" className="mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {aiContent.narrative}
          </p>
        </IOSCard>

        {/* Highlights */}
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {uiTexts.sections.keyPoints}
        </h3>
        <IOSCard variant="subtle" padding="md" className="mb-6">
          <ul className="space-y-2">
            {aiContent.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="text-purple-500 mt-0.5">•</span>
                <span className="text-foreground/90">{highlight}</span>
              </li>
            ))}
          </ul>
        </IOSCard>

        {/* Tools */}
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {uiTexts.sections.toolsUsed}
        </h3>
        <IOSCard variant="subtle" padding="md">
          <div className="flex flex-wrap gap-2">
            {aiContent.tools.map((tool) => (
              <IOSChip key={tool.name} variant="default" size="md">
                {tool.icon && <span>{tool.icon}</span>}
                {tool.name}
              </IOSChip>
            ))}
          </div>
        </IOSCard>
      </div>
    </div>
  );
};

interface SkillsScreenProps {
  hideStatusBar?: boolean;
}

const SkillsScreen = ({ hideStatusBar = false }: SkillsScreenProps) => {
  const { locale } = useI18n();
  const uiTexts = getUiTexts(locale);
  const skillStoryIntro = getSkillStoryIntro(locale);
  const technicalSkills = getTechnicalSkills(locale);
  const softSkills = getSoftSkills(locale);
  const tools = getTools();
  const aiContent = getAiContent(locale);

  const [selectedSkill, setSelectedSkill] = useState<SelectedSkill | null>(null);

  // Vue détaillée
  if (selectedSkill) {
    if (selectedSkill.type === 'technical') {
      return <TechSkillDetail skill={selectedSkill.skill} onBack={() => setSelectedSkill(null)} hideStatusBar={hideStatusBar} />;
    }
    if (selectedSkill.type === 'soft') {
      return <SoftSkillDetail skill={selectedSkill.skill} onBack={() => setSelectedSkill(null)} hideStatusBar={hideStatusBar} />;
    }
    if (selectedSkill.type === 'ai') {
      return <AIDetail onBack={() => setSelectedSkill(null)} hideStatusBar={hideStatusBar} />;
    }
  }

  // Vue liste
  return (
    <div className="h-full bg-background flex flex-col">
      {!hideStatusBar && <StatusBar />}

	      <div className="flex-1 overflow-y-auto pb-32">
	        {/* Header */}
	        <IOSNavigationBar
	          title={uiTexts.nav.skills}
	          subtitle={uiTexts.stats.stackExpertise}
	        />

        {/* Intro narrative */}
        <div className="px-5 mb-6">
          <IOSCard variant="subtle" padding="md">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{skillStoryIntro}"
            </p>
          </IOSCard>
        </div>

	        {/* Technical Skills Section */}
	        <div className="px-5 mb-6">
	          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
	            {uiTexts.sections.technicalSkills}
	          </h3>
          <div className="space-y-3 stagger-children">
            {technicalSkills.map((skill) => (
              <TechSkillCardCompact
                key={skill.id}
                skill={skill}
                onPress={() => setSelectedSkill({ type: 'technical', skill })}
              />
            ))}
          </div>
        </div>

        {/* AI Section */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {aiContent.title}
          </h3>
          <AICardCompact onPress={() => setSelectedSkill({ type: 'ai' })} />
        </div>

        {/* Soft Skills Section */}
        <div className="px-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {uiTexts.sections.softSkills}
          </h3>
          <div className="space-y-3 stagger-children">
            {softSkills.map((skill) => (
              <SoftSkillCardCompact
                key={skill.id}
                skill={skill}
                onPress={() => setSelectedSkill({ type: 'soft', skill })}
              />
            ))}
          </div>
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
