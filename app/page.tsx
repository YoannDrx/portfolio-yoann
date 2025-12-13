"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PortfolioApp from "@/components/PortfolioApp";
import TouchIndicator from "@/components/TouchIndicator";
import PDFDownloadButton from "@/components/pdf/PDFDownloadButton";
import { useIsRealMobile } from "@/hooks/use-mobile";
import {
  IOSCard,
  IOSButton,
  IOSBadge,
  IOSChip,
  IOSAvailabilityBadge,
  IOSInput,
  IOSTextarea,
} from "@/components/ios";
import { Smartphone, Monitor, ExternalLink, Linkedin, Github, Mail, Phone, Briefcase, Download, FileText, Send, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { uiTexts } from "@/data";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { technicalSkills, softSkills, aiContent } from "@/data";
import { experiences, education } from "@/data/resume";
import { socialLinks } from "@/data/social";

// Icon mapping for social links
const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
};

export default function Home() {
  const isRealMobile = useIsRealMobile();
  const [viewMode, setViewMode] = useState<"device" | "web">("device");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile réel → fullscreen automatique (pas de cadre iPhone)
  if (mounted && isRealMobile) {
    return (
      <main className="min-h-screen bg-background">
        <PortfolioApp showFrame={false} />
      </main>
    );
  }

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
}

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: uiTexts.messages.messageSent,
          description: uiTexts.messages.messageSentDescription,
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        const data = await response.json();
        toast({
          title: 'Erreur',
          description: data.error || 'Une erreur est survenue',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible d'envoyer le message",
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IOSCard variant="glass" padding="lg">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {uiTexts.sections.sendMessage}
      </h3>

      {isSubmitted ? (
        <div className="py-8 text-center animate-ios-spring">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="font-semibold text-foreground">
            {uiTexts.messages.messageSent}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {uiTexts.messages.willReplyShort}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <IOSInput
            type="text"
            label={uiTexts.form.name}
            placeholder={uiTexts.form.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <IOSInput
            type="email"
            label={uiTexts.form.email}
            placeholder={uiTexts.form.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <IOSTextarea
            label={uiTexts.form.message}
            placeholder={uiTexts.form.messagePlaceholder}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            required
          />

          <IOSButton
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={<Send className="w-5 h-5" />}
          >
            {uiTexts.buttons.send}
          </IOSButton>
        </form>
      )}
    </IOSCard>
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
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute -inset-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse-soft" />
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-medium border-4 border-background">
              <Image
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                fill
                className="object-cover"
                priority
                sizes="160px"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            {profile.firstName} {profile.lastName}
            <span className="block text-primary text-3xl md:text-4xl mt-2">{profile.title}</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <IOSButton
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir mes projets
            </IOSButton>
            <IOSButton
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me contacter
            </IOSButton>
            <PDFDownloadButton className="!h-14 !px-6 !text-base" />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-16">
            {profile.stats.map((stat) => (
              <IOSCard key={stat.label} variant="glass" padding="md" className="text-center min-w-[100px]">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </IOSCard>
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
              <IOSCard key={project.id} variant="glass" padding="none" className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                      <span className="text-7xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                    </div>
                  )}
                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3">
                    <IOSBadge variant="default" size="sm" className="bg-black/40 backdrop-blur-sm text-white border-0">
                      {project.year}
                    </IOSBadge>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    {project.platforms.map((platform) => (
                      <IOSBadge key={platform} variant="default" size="sm" className="bg-primary/80 backdrop-blur-sm text-white border-0">
                        {platform}
                      </IOSBadge>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  {project.links?.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IOSButton variant="ghost" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                        Voir le projet
                      </IOSButton>
                    </a>
                  )}
                </div>
              </IOSCard>
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

          {/* Technical Skills - Narrative cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {technicalSkills.map((skill) => (
              <IOSCard key={skill.id} variant="glass" padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center`}>
                      <span className="text-xl">{skill.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{skill.title}</h3>
                  </div>
                  <IOSBadge variant="default" size="sm">{skill.level}</IOSBadge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{skill.narrative}</p>
                <ul className="space-y-2">
                  {skill.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </IOSCard>
            ))}
          </div>

          {/* AI Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{aiContent.title}</h3>
            <IOSCard variant="glass" padding="lg" className="border-l-4 border-purple-500 max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                  <span className="text-2xl">{aiContent.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground">{aiContent.subtitle}</h4>
                  <p className="text-sm text-muted-foreground">Outils IA intégrés au workflow</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{aiContent.narrative}</p>
              <ul className="space-y-2 mb-6">
                {aiContent.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span className="text-foreground/80">{highlight}</span>
                  </li>
                ))}
              </ul>
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

          {/* Soft Skills */}
          <div className="grid md:grid-cols-3 gap-6">
            {softSkills.map((skill) => (
              <IOSCard key={skill.id} variant="glass" padding="md">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center`}>
                    <span className="text-lg">{skill.icon}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{skill.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.narrative}</p>
              </IOSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold text-foreground">Expériences</h2>
            <PDFDownloadButton />
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Mon parcours professionnel
          </p>

          <div className="space-y-6">
            {experiences.slice(0, 6).map((exp) => (
              <IOSCard key={exp.id} variant="glass" padding="lg">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.company}</h3>
                    <p className="text-primary font-medium">{exp.role}</p>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 md:mt-0 md:text-right">
                    <p className="font-medium">{exp.startDate} - {exp.endDate || 'Présent'}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.description.slice(0, 3).map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.slice(0, 6).map((skill) => (
                    <IOSBadge key={skill} variant="default" size="sm">
                      {skill}
                    </IOSBadge>
                  ))}
                </div>
              </IOSCard>
            ))}
          </div>

          {/* Education */}
          <h3 className="text-2xl font-bold text-foreground mt-16 mb-6 text-center">Formation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu) => (
              <IOSCard key={edu.id} variant="glass" padding="md" className="text-center">
                <p className="text-lg font-semibold text-foreground">{edu.degree}</p>
                <p className="text-muted-foreground">{edu.school}</p>
                <p className="text-sm text-primary font-medium mt-2">{edu.year}</p>
              </IOSCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Gauche: Titre, sous-titre, icônes */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-3">Travaillons ensemble</h2>
                <p className="text-muted-foreground text-lg">
                  Vous avez un projet de Saas, mobile ou web en tête ?<br />
                  Discutons-en !
                </p>
              </div>

              {profile.isAvailable && (
                <IOSAvailabilityBadge
                  text={profile.availabilityText}
                  variant="prominent"
                  status="available"
                  animated
                />
              )}

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const brandColors: Record<string, string> = {
                    linkedin: 'bg-[#0A66C2]',
                    github: 'bg-zinc-800 dark:bg-zinc-700',
                    malt: 'bg-[#FC5757]',
                    email: 'bg-emerald-500',
                    phone: 'bg-violet-500',
                  };
                  const bgColor = brandColors[link.id] || link.color;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`w-12 h-12 rounded-xl ${bgColor} text-white flex items-center justify-center hover:opacity-90 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200`}
                      title={link.name}
                    >
                      {iconMap[link.icon]}
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.availabilityOptions?.map((option) => (
                  <IOSChip key={option} variant="availability" size="md">
                    {option}
                  </IOSChip>
                ))}
              </div>
            </div>

            {/* Droite: Formulaire */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Tous droits réservés.
          </p>
          <PDFDownloadButton />
        </div>
      </footer>
    </div>
  );
};
