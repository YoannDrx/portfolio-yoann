"use client";

import * as React from "react";
import type { Locale } from "./locales";
import { messagesEn, messagesFr, type Messages } from "./messages";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const messages: Messages = locale === "en" ? messagesEn : messagesFr;
  const value = React.useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within <I18nProvider />");
  }
  return ctx;
}
