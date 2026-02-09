import { BarChart3, Briefcase, FileText, FolderKanban, Layers3, Target } from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  icon: typeof BarChart3;
};

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "KPI et statut global",
    icon: BarChart3,
  },
  {
    href: "/admin/offers",
    label: "Offer Matching",
    description: "Analyse d'offre et recommandations",
    icon: Target,
  },
  {
    href: "/admin/cv-lab",
    label: "CV Lab",
    description: "Construction de CV cible",
    icon: FileText,
  },
  {
    href: "/admin/activities",
    label: "Activities",
    description: "Personas, competences, preuves",
    icon: Briefcase,
  },
  {
    href: "/admin/applications",
    label: "Applications",
    description: "Pipeline candidatures",
    icon: FolderKanban,
  },
  {
    href: "/admin/content",
    label: "Public Content",
    description: "Snapshot et publication",
    icon: Layers3,
  },
];
