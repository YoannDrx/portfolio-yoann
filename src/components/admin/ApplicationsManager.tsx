"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { ApplicationItem, ApplicationStatus, Persona } from "@/admin/types";

const columns: { id: ApplicationStatus; label: string }[] = [
  { id: "target", label: "Target" },
  { id: "applied", label: "Applied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];

const statusColor: Record<ApplicationStatus, string> = {
  target: "border-slate-200",
  applied: "border-cyan-200",
  interview: "border-amber-200",
  offer: "border-emerald-200",
  rejected: "border-rose-200",
};

const DEFAULT_FORM = {
  company: "",
  role: "",
  source: "",
  personaId: "",
  status: "target" as ApplicationStatus,
};

export default function ApplicationsManager() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);

  async function loadApplications() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/applications");
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Impossible de charger les candidatures.");
        return;
      }

      setApplications(payload.applications || []);
      setPersonas(payload.personas || []);
      setForm((current) => ({
        ...current,
        personaId: current.personaId || payload.personas?.[0]?.id || "",
      }));
    } catch {
      setError("Erreur reseau pendant le chargement des candidatures.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  const applicationsByColumn = useMemo(() => {
    return columns.map((column) => ({
      column,
      items: applications.filter((application) => application.status === column.id),
    }));
  }, [applications]);

  async function handleStatusChange(applicationId: string, status: ApplicationStatus) {
    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de mettre a jour le statut.");
        return;
      }

      setApplications(payload.applications || []);
    } catch {
      setError("Erreur reseau pendant la mise a jour du statut.");
    }
  }

  async function handleCreateApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de creer la candidature.");
        return;
      }

      setApplications(payload.applications || []);
      setForm((current) => ({
        ...DEFAULT_FORM,
        personaId: current.personaId,
      }));
    } catch {
      setError("Erreur reseau pendant la creation de candidature.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des candidatures...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <form onSubmit={handleCreateApplication} className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Nouvelle candidature</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            placeholder="Entreprise"
          />
          <input
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            placeholder="Role"
          />
          <select
            value={form.personaId}
            onChange={(event) => setForm((current) => ({ ...current, personaId: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          >
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.name}
              </option>
            ))}
          </select>
          <input
            value={form.source}
            onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            placeholder="Source"
          />
          <div className="flex gap-2">
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as ApplicationStatus }))}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              {isSaving ? "..." : "Ajouter"}
            </button>
          </div>
        </div>
      </form>

      <section className="grid gap-3 xl:grid-cols-5">
        {applicationsByColumn.map(({ column, items }) => (
          <article key={column.id} className="rounded-3xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">{column.label}</h3>
            <div className="mt-3 space-y-2">
              {items.map((application) => {
                const persona = personas.find((item) => item.id === application.personaId);

                return (
                  <div
                    key={application.id}
                    className={`rounded-2xl border bg-slate-50 px-3 py-3 text-sm ${statusColor[column.id]}`}
                  >
                    <p className="font-semibold text-slate-900">{application.company}</p>
                    <p className="text-xs text-slate-600">{application.role}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-500">{persona?.name || "Persona"}</p>
                    <p className="mt-2 text-[11px] text-slate-500">{application.source} • {application.lastUpdate}</p>

                    <select
                      value={application.status}
                      onChange={(event) => handleStatusChange(application.id, event.target.value as ApplicationStatus)}
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                    >
                      {columns.map((next) => (
                        <option key={next.id} value={next.id}>
                          {next.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}

              {!items.length ? (
                <p className="rounded-xl border border-dashed border-slate-300 px-3 py-3 text-xs text-slate-500">Aucune candidature.</p>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
