import { useEffect, useState } from "react";
import PortfolioApp from "@/components/PortfolioApp";
import TouchIndicator from "@/components/TouchIndicator";
import { Smartphone, Monitor } from "lucide-react";

const Index = () => {
  const [viewMode, setViewMode] = useState<"device" | "web">("device");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <TouchIndicator />
      
      {/* View Mode Toggle - Desktop Only */}
      <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center gap-2 p-1.5 rounded-full bg-card/80 backdrop-blur-xl shadow-soft border border-border/50">
        <button
          onClick={() => setViewMode("device")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "device"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          iPhone
        </button>
        <button
          onClick={() => setViewMode("web")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "web"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Web
        </button>
      </div>

      {/* Device View */}
      {viewMode === "device" && (
        <div className={`flex items-center justify-center min-h-screen py-8 px-4 ${mounted ? "animate-ios-fade-in" : "opacity-0"}`}>
          <div className="relative">
            {/* Background Decorations */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-soft" />
              <div className="absolute inset-20 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
            </div>
            
            <PortfolioApp />
            
            {/* Caption */}
            <p className="hidden lg:block text-center text-sm text-muted-foreground mt-6">
              Faites glisser pour naviguer • Cliquez sur les onglets
            </p>
          </div>
        </div>
      )}

      {/* Web View - Full Width */}
      {viewMode === "web" && (
        <div className={`min-h-screen ${mounted ? "animate-ios-fade-in" : "opacity-0"}`}>
          <WebView />
        </div>
      )}
    </main>
  );
};

// Full Web View Component
const WebView = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center stagger-children">
          {/* Avatar */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-medium">
              <span className="text-5xl font-bold text-primary-foreground">RN</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            React Native
            <span className="block text-primary">Developer</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Créateur d'expériences mobiles natives exceptionnelles. 
            Spécialisé en animations fluides, UI/UX impeccable et performance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
            >
              Me contacter
            </a>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">5+</p>
              <p className="text-sm text-muted-foreground mt-1">Années XP</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="text-sm text-muted-foreground mt-1">Apps publiées</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">1M+</p>
              <p className="text-sm text-muted-foreground mt-1">Downloads</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Projets</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Une sélection de mes meilleures applications mobiles
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            {[
              { name: "FinTrack Pro", emoji: "💰", color: "from-emerald-400 to-teal-500", desc: "Gestion financière personnelle" },
              { name: "FitPulse", emoji: "🏋️", color: "from-orange-400 to-red-500", desc: "Coach sportif personnel" },
              { name: "TravelMate", emoji: "✈️", color: "from-blue-400 to-indigo-500", desc: "Planificateur de voyages" },
              { name: "MindfulMe", emoji: "🧘", color: "from-purple-400 to-pink-500", desc: "Méditation et bien-être" },
            ].map((project) => (
              <div key={project.name} className="glass-card overflow-hidden group cursor-pointer">
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                  <p className="text-muted-foreground mt-1">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Travaillons ensemble</h2>
          <p className="text-muted-foreground mb-8">
            Vous avez un projet mobile en tête ? Discutons-en !
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600">Disponible pour de nouveaux projets</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:hello@example.com"
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
