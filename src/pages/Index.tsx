import { useEffect, useState } from "react";
import PortfolioApp from "@/components/PortfolioApp";
import TouchIndicator from "@/components/TouchIndicator";
import { Smartphone, Monitor, ExternalLink, Linkedin, Github, Mail, Phone, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, education } from "@/data/resume";
import { socialLinks } from "@/data/social";

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

// Icon mapping for social links
const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
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
            <img
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="relative w-32 h-32 rounded-full object-cover shadow-medium border-4 border-background"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            {profile.firstName} {profile.lastName}
            <span className="block text-primary text-3xl md:text-4xl mt-2">{profile.title}</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {profile.bio}
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
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Projets</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Une sélection de mes projets web et mobile
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {projects.map((project) => (
              <div key={project.id} className="glass-card overflow-hidden group cursor-pointer">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.platforms.map((platform) => (
                      <span key={platform} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {platform}
                      </span>
                    ))}
                  </div>
                  {project.links?.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir le projet
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Compétences</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Mon stack technique et mes expertises
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <div key={category.id} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Expériences</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Mon parcours professionnel
          </p>

          <div className="space-y-6">
            {experiences.slice(0, 6).map((exp) => (
              <div key={exp.id} className="glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.company}</h3>
                    <p className="text-primary">{exp.role}</p>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                    <p>{exp.startDate} - {exp.endDate || 'Présent'}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-3">
                  {exp.description.slice(0, 3).map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <h3 className="text-2xl font-bold text-foreground mt-16 mb-6 text-center">Formation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="glass-card p-4 text-center">
                <p className="text-lg font-semibold text-foreground">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.school}</p>
                <p className="text-sm text-primary mt-1">{edu.year}</p>
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
            Vous avez un projet mobile ou web en tête ? Discutons-en !
          </p>

          {profile.isAvailable && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-600">{profile.availabilityText}</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl ${link.color} text-white font-medium hover:opacity-90 transition-opacity`}
              >
                {iconMap[link.icon]}
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            {profile.availabilityOptions?.map((option) => (
              <span key={option} className="px-3 py-1 rounded-full bg-secondary">
                {option}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
