"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

type LocaleToggleProps = {
  className?: string;
};

export function LocaleToggle({ className }: LocaleToggleProps) {
  const router = useRouter();
  const { locale, messages } = useI18n();

  const nextLocale = locale === "fr" ? "en" : "fr";
  const label = locale === "fr" ? messages.language.switchToEn : messages.language.switchToFr;

  const handleClick = () => {
    if (typeof window === "undefined") return;

    const { pathname, search, hash } = window.location;
    const nextPathname = pathname.replace(/^\/(fr|en)(\/|$)/, `/${nextLocale}$2`);
    router.push(`${nextPathname}${search}${hash}`, { scroll: false });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center px-3 py-2 rounded-full text-sm font-medium transition-all",
        "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      aria-label={label}
      title={label}
    >
      <span className="text-xs font-semibold tracking-wide">
        {nextLocale === "fr" ? messages.language.frShort : messages.language.enShort}
      </span>
    </button>
  );
}

