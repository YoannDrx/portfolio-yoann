import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle } from "lucide-react";
import StatusBar from "../device/StatusBar";
import { toast } from "@/hooks/use-toast";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com", color: "bg-zinc-800" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "bg-blue-600" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "bg-sky-500" },
  { name: "Email", icon: Mail, href: "mailto:hello@example.com", color: "bg-primary" },
];

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message envoyé !",
      description: "Je vous répondrai dans les plus brefs délais.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="h-full bg-secondary flex flex-col">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-5 pt-2 pb-4">
          <h1 className="ios-nav-title-large">Contact</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Discutons de votre projet
          </p>
        </div>
        
        {/* Social Links */}
        <div className="px-5 mb-6 stagger-children">
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-2xl ${link.color} flex items-center justify-center shadow-soft active:scale-95 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="px-5">
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Envoyez-moi un message</h3>
            
            {isSubmitted ? (
              <div className="py-8 text-center animate-ios-spring">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="font-semibold text-foreground">Message envoyé !</p>
                <p className="text-sm text-muted-foreground mt-1">Je vous répondrai bientôt</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border-0 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border-0 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border-0 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Availability */}
        <div className="px-5 mt-6">
          <div className="glass-card p-5 text-center">
            <div className="w-3 h-3 mx-auto mb-3 rounded-full bg-green-500 animate-pulse" />
            <p className="font-semibold text-foreground">Disponible pour de nouveaux projets</p>
            <p className="text-sm text-muted-foreground mt-1">
              Freelance • Mission longue • CDI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
