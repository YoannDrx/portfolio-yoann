"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">Oops</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Une erreur est survenue
        </h2>
        <p className="text-muted-foreground max-w-md">
          Quelque chose s&apos;est mal passé. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
