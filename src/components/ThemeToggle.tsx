"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

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
      title="Changer de thème"
    >
      <span className="sr-only dark:hidden">Passer en mode sombre</span>
      <span className="sr-only hidden dark:inline">Passer en mode clair</span>
      <Sun className="hidden w-4 h-4 dark:block" />
      <Moon className="block w-4 h-4 dark:hidden" />
    </button>
  );
}
