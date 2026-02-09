"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

interface AdminLoginFormProps {
  defaultEmail?: string;
}

export default function AdminLoginForm({ defaultEmail = "" }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Connexion impossible.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur reseau. Reessaie dans quelques secondes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8">
      <div className="grid w-full gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.65)] backdrop-blur-xl md:grid-cols-2 md:p-10">
        <div className="rounded-3xl border border-cyan-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.18),transparent_42%),linear-gradient(160deg,#082f49_0%,#0f172a_65%,#111827_100%)] p-8 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Private Control Panel</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
            Admin premium pour piloter tes activites et tes candidatures.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Zone strictement privee: matching offre vers CV cible, suivi du pipeline de candidature et edition du contenu public via snapshots.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-300">
            <p>1. Session securisee (cookie HTTP-only)</p>
            <p>2. Recommandations basees sur preuves verifiees</p>
            <p>3. Workspace unifie multi-activite</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-semibold text-slate-900">Connexion admin</h1>
          <p className="mt-2 text-sm text-slate-500">Utilise les credentials admin stockes en base locale securisee.</p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe</span>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <LockKeyhole className="h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            {error ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {isSubmitting ? "Connexion en cours..." : "Acceder au dashboard"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
