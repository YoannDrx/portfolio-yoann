"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { locale } = useI18n();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const title = locale === "en" ? "Toggle theme" : "Changer de thème";
  const toDark = locale === "en" ? "Switch to dark mode" : "Passer en mode sombre";
  const toLight = locale === "en" ? "Switch to light mode" : "Passer en mode clair";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "flex items-center justify-center px-3 py-2 rounded-full text-sm font-medium transition-all",
        "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      title={title}
      aria-label={title}
    >
      <span className="sr-only dark:hidden">{toDark}</span>
      <span className="sr-only hidden dark:inline">{toLight}</span>
      <Sun className="hidden w-4 h-4 dark:block" />
      <Moon className="block w-4 h-4 dark:hidden" />
    </button>
  );
}
