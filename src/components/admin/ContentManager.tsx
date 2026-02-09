"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Rocket } from "lucide-react";
import { ContentSnapshot } from "@/admin/types";

const DEFAULT_FORM = {
  label: "",
  notes: "",
};

export default function ContentManager() {
  const [snapshots, setSnapshots] = useState<ContentSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  async function loadSnapshots() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/content/snapshots");
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Impossible de charger les snapshots.");
        return;
      }

      setSnapshots(payload.snapshots || []);
    } catch {
      setError("Erreur reseau pendant le chargement des snapshots.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSnapshots();
  }, []);

  async function handleCreateSnapshot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/content/snapshots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Impossible de creer le snapshot.");
        return;
      }

      setSnapshots(payload.snapshots || []);
      setForm(DEFAULT_FORM);
    } catch {
      setError("Erreur reseau pendant la creation de snapshot.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublishSnapshot(snapshotId: string) {
    setError(null);

    try {
      const response = await fetch("/api/admin/content/snapshots", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snapshotId, action: "publish" }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de publier ce snapshot.");
        return;
      }

      setSnapshots(payload.snapshots || []);
    } catch {
      setError("Erreur reseau pendant la publication.");
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des snapshots...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <form onSubmit={handleCreateSnapshot} className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Nouveau snapshot</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={form.label}
            onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            placeholder="Nom du snapshot"
          />
          <input
            value={form.notes}
            onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            placeholder="Notes"
          />
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
          >
            {isSaving ? "Creation..." : "Creer"}
          </button>
        </div>
      </form>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-3">Snapshot</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3">Updated at</th>
                <th className="px-2 py-3">Updated by</th>
                <th className="px-2 py-3">Notes</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map((snapshot) => (
                <tr key={snapshot.id} className="border-b border-slate-100 text-slate-700">
                  <td className="px-2 py-3 font-medium text-slate-900">{snapshot.label}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                        snapshot.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {snapshot.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">{snapshot.updatedAt}</td>
                  <td className="px-2 py-3">{snapshot.updatedBy}</td>
                  <td className="px-2 py-3 text-slate-600">{snapshot.notes}</td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      onClick={() => handlePublishSnapshot(snapshot.id)}
                      disabled={snapshot.status === "published"}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50"
                    >
                      <Rocket className="h-3.5 w-3.5" />
                      Publier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
          <h3 className="text-base font-semibold text-cyan-950">Workflow recommande</h3>
          <ol className="mt-3 space-y-2 text-sm text-cyan-900">
            <li>1. Editer en mode draft uniquement.</li>
            <li>2. Comparer le snapshot draft avec le snapshot publie.</li>
            <li>3. Valider SEO/meta avant publication.</li>
            <li>4. Publier et garder un rollback instantane.</li>
          </ol>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-semibold text-slate-900">Etat du module</h3>
          <p className="mt-2 text-sm text-slate-500">
            Le module snapshot est maintenant persistant en local (JSON store). Prochaine etape recommande: basculer sur PostgreSQL
            pour un historique robuste en production.
          </p>
        </article>
      </section>
    </div>
  );
}
