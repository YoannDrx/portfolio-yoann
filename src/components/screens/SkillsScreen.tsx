import StatusBar from "../device/StatusBar";

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core",
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React Native", level: 95, icon: "⚛️", category: "core" },
      { name: "TypeScript", level: 90, icon: "📘", category: "core" },
      { name: "JavaScript", level: 95, icon: "🟨", category: "core" },
      { name: "React", level: 90, icon: "⚛️", category: "core" },
    ],
  },
  {
    title: "Animation & UI",
    color: "from-purple-500 to-pink-400",
    skills: [
      { name: "Reanimated 3", level: 88, icon: "🎬", category: "animation" },
      { name: "Skia", level: 75, icon: "🎨", category: "animation" },
      { name: "Gesture Handler", level: 85, icon: "👆", category: "animation" },
      { name: "Lottie", level: 80, icon: "✨", category: "animation" },
    ],
  },
  {
    title: "Navigation & State",
    color: "from-orange-500 to-yellow-400",
    skills: [
      { name: "React Navigation", level: 92, icon: "🧭", category: "navigation" },
      { name: "Redux Toolkit", level: 85, icon: "🗃️", category: "state" },
      { name: "Zustand", level: 88, icon: "🐻", category: "state" },
      { name: "TanStack Query", level: 82, icon: "🔄", category: "state" },
    ],
  },
  {
    title: "Native & Platform",
    color: "from-green-500 to-emerald-400",
    skills: [
      { name: "iOS (Swift)", level: 70, icon: "🍎", category: "native" },
      { name: "Android (Kotlin)", level: 65, icon: "🤖", category: "native" },
      { name: "Expo", level: 90, icon: "📱", category: "platform" },
      { name: "EAS Build", level: 85, icon: "🏗️", category: "platform" },
    ],
  },
];

const SkillsScreen = () => {
  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-5 pt-2 pb-4">
          <h1 className="ios-nav-title-large">Compétences</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Stack technique & expertise
          </p>
        </div>
        
        {/* Skill Categories */}
        <div className="px-5 space-y-6 stagger-children">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="glass-card p-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <span className="text-lg">{category.skills[0].icon}</span>
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
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tools Section */}
        <div className="px-5 mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Outils & Environnement
          </h3>
          <div className="flex flex-wrap gap-2">
            {["VS Code", "Xcode", "Android Studio", "Figma", "Git", "GitHub Actions", "Firebase", "Sentry"].map((tool) => (
              <span 
                key={tool}
                className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsScreen;
