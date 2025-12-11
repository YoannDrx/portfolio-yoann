import { useState } from "react";
import { ChevronRight, Apple, Smartphone, Star, Download, ExternalLink } from "lucide-react";
import StatusBar from "../device/StatusBar";

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: ("ios" | "android")[];
  color: string;
  emoji: string;
  stats: {
    rating: number;
    downloads: string;
  };
  features: string[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "FinTrack Pro",
    description: "Application de gestion financière personnelle avec synchronisation bancaire",
    category: "Finance",
    platforms: ["ios", "android"],
    color: "from-emerald-400 to-teal-500",
    emoji: "💰",
    stats: { rating: 4.8, downloads: "500K+" },
    features: ["Reanimated 3", "Skia Charts", "Biometric Auth"],
  },
  {
    id: "2",
    name: "FitPulse",
    description: "Coach sportif personnel avec suivi d'activité et plans d'entraînement",
    category: "Santé & Fitness",
    platforms: ["ios", "android"],
    color: "from-orange-400 to-red-500",
    emoji: "🏋️",
    stats: { rating: 4.9, downloads: "200K+" },
    features: ["HealthKit", "Google Fit", "Animations fluides"],
  },
  {
    id: "3",
    name: "TravelMate",
    description: "Planificateur de voyages avec cartes offline et recommandations IA",
    category: "Voyage",
    platforms: ["ios", "android"],
    color: "from-blue-400 to-indigo-500",
    emoji: "✈️",
    stats: { rating: 4.7, downloads: "150K+" },
    features: ["Maps SDK", "Offline Mode", "ML Kit"],
  },
  {
    id: "4",
    name: "MindfulMe",
    description: "Application de méditation et bien-être mental avec séances guidées",
    category: "Bien-être",
    platforms: ["ios"],
    color: "from-purple-400 to-pink-500",
    emoji: "🧘",
    stats: { rating: 4.9, downloads: "300K+" },
    features: ["Audio Player", "Notifications", "Widgets"],
  },
];

interface ProjectsScreenProps {
  onNavigate: (tab: string) => void;
}

const ProjectsScreen = ({ onNavigate }: ProjectsScreenProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)} 
      />
    );
  }

  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-5 pt-2 pb-4">
          <h1 className="ios-nav-title-large">Projets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {projects.length} applications publiées
          </p>
        </div>
        
        {/* Project Cards */}
        <div className="px-5 space-y-4 stagger-children">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="w-full glass-card overflow-hidden text-left active:scale-[0.98] transition-transform"
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-br ${project.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl">{project.emoji}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{project.category}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
                </div>
                
                {/* Stats & Platforms */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-foreground">{project.stats.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{project.stats.downloads}</span>
                  </div>
                  <div className="flex-1" />
                  <div className="flex items-center gap-1.5">
                    {project.platforms.includes("ios") && (
                      <Apple className="w-4 h-4 text-foreground" />
                    )}
                    {project.platforms.includes("android") && (
                      <Smartphone className="w-4 h-4 text-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  return (
    <div className="h-full bg-secondary flex flex-col animate-ios-push">
      <StatusBar />
      
      {/* Back Button */}
      <div className="px-5 pt-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-primary font-medium"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Retour</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero */}
        <div className={`mx-5 mt-4 h-48 rounded-3xl bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl animate-float">{project.emoji}</span>
          </div>
        </div>
        
        {/* Info */}
        <div className="px-5 mt-6">
          <h1 className="ios-nav-title-large">{project.name}</h1>
          <p className="text-primary font-medium mt-1">{project.category}</p>
          <p className="text-muted-foreground mt-3 leading-relaxed">{project.description}</p>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-foreground">{project.stats.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Note</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{project.stats.downloads}</p>
              <p className="text-xs text-muted-foreground mt-1">Downloads</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                {project.platforms.includes("ios") && <Apple className="w-5 h-5" />}
                {project.platforms.includes("android") && <Smartphone className="w-5 h-5" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Platforms</p>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Technologies utilisées
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span 
                  key={feature}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-8 flex gap-3">
            <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              <ExternalLink className="w-5 h-5" />
              Voir le projet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
