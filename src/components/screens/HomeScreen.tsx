import { ChevronRight, Sparkles } from "lucide-react";
import StatusBar from "../device/StatusBar";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="h-full bg-background flex flex-col">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {/* Hero Section */}
        <div className="pt-4 animate-ios-spring">
          <div className="relative">
            {/* Avatar */}
            <div className="relative mx-auto w-28 h-28 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-soft">
                <span className="text-4xl font-bold text-primary-foreground">RN</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Name & Title */}
            <div className="text-center space-y-2">
              <h1 className="ios-nav-title-large">React Native</h1>
              <h2 className="text-xl font-semibold text-primary">Developer</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                Créateur d'expériences mobiles natives. 
                iOS & Android. Animations fluides. UX impeccable.
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8 stagger-children">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">5+</p>
            <p className="text-xs text-muted-foreground mt-1">Années XP</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">20+</p>
            <p className="text-xs text-muted-foreground mt-1">Apps</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">1M+</p>
            <p className="text-xs text-muted-foreground mt-1">Downloads</p>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="mt-8 space-y-3 stagger-children">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Explorer
          </h3>
          
          <button 
            onClick={() => onNavigate("projects")}
            className="w-full glass-card p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
              <span className="text-xl">📱</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Mes Projets</p>
              <p className="text-sm text-muted-foreground">Apps iOS & Android</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button 
            onClick={() => onNavigate("skills")}
            className="w-full glass-card p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Compétences</p>
              <p className="text-sm text-muted-foreground">Stack & Expertise</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button 
            onClick={() => onNavigate("contact")}
            className="w-full glass-card p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Me Contacter</p>
              <p className="text-sm text-muted-foreground">Discutons de votre projet</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Availability Badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600">Disponible pour de nouveaux projets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
