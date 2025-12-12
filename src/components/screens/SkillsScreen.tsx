/**
 * SkillsScreen
 * Écran affichant les compétences techniques par catégorie
 */

import StatusBar from '../device/StatusBar';
import { IOSCard, IOSProgressBar, IOSBadge, IOSNavigationBar } from '../ios';
import { skillCategories, tools, uiTexts } from '@/data';

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

        {/* Skill Categories */}
        <div className="px-5 space-y-6 stagger-children">
          {skillCategories.map((category, categoryIndex) => (
            <IOSCard key={category.id} variant="glass" padding="md">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}
                >
                  <span className="text-lg">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.icon}</span>
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {skill.level}%
                      </span>
                    </div>
                    <IOSProgressBar
                      value={skill.level}
                      variant="gradient"
                      gradientFrom={category.gradient.split(' ')[0]}
                      gradientTo={category.gradient.split(' ')[1]}
                      animated
                      style={{
                        animationDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </IOSCard>
          ))}
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
