"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { Activity, ExperienceAsset, Persona } from "@/admin/types";

interface AdminStatePayload {
  activities: Activity[];
  personas: Persona[];
  experienceAssets: ExperienceAsset[];
}

const DEFAULT_NEW_ASSET = {
  activityId: "software",
  title: "",
  organization: "",
  period: "",
  location: "",
  highlights: "",
  skills: "",
  metrics: "",
};

const DEFAULT_NEW_PERSONA = {
  activityId: "software",
  name: "",
  headline: "",
  targetRoles: "",
  baseSummary: "",
  coreSkills: "",
  atsKeywords: "",
};

export default function ActivitiesManager() {
  const [state, setState] = useState<AdminStatePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingAsset, setIsSavingAsset] = useState(false);
  const [isSavingPersona, setIsSavingPersona] = useState(false);
  const [newAsset, setNewAsset] = useState(DEFAULT_NEW_ASSET);
  const [newPersona, setNewPersona] = useState(DEFAULT_NEW_PERSONA);

  async function loadState() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/state");
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Impossible de charger les activites.");
        return;
      }

      setState({
        activities: payload.activities,
        personas: payload.personas,
        experienceAssets: payload.experienceAssets,
      });
    } catch {
      setError("Erreur reseau pendant le chargement des activites.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadState();
  }, []);

  const groupedPersonas = useMemo(() => {
    if (!state) return [];

    return state.activities.map((activity) => ({
      activity,
      personas: state.personas.filter((persona) => persona.activityId === activity.id),
    }));
  }, [state]);

  async function handleToggleAsset(assetId: string, verified: boolean) {
    try {
      const response = await fetch("/api/admin/assets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId, verified }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de mettre a jour l'asset.");
        return;
      }

      setState((current) =>
        current
          ? {
              ...current,
              experienceAssets: payload.assets,
            }
          : current
      );
    } catch {
      setError("Erreur reseau pendant la mise a jour de l'asset.");
    }
  }

  async function handleCreateAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSavingAsset(true);

    try {
      const response = await fetch("/api/admin/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: newAsset.activityId,
          title: newAsset.title,
          organization: newAsset.organization,
          period: newAsset.period,
          location: newAsset.location,
          highlights: newAsset.highlights
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
          skills: newAsset.skills
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          metrics: newAsset.metrics
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de creer l'asset.");
        return;
      }

      setState((current) =>
        current
          ? {
              ...current,
              experienceAssets: payload.assets,
            }
          : current
      );

      setNewAsset(DEFAULT_NEW_ASSET);
    } catch {
      setError("Erreur reseau pendant la creation de l'asset.");
    } finally {
      setIsSavingAsset(false);
    }
  }

  async function handleCreatePersona(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSavingPersona(true);

    try {
      const response = await fetch("/api/admin/personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityId: newPersona.activityId,
          name: newPersona.name,
          headline: newPersona.headline,
          targetRoles: newPersona.targetRoles
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
          baseSummary: newPersona.baseSummary,
          coreSkills: newPersona.coreSkills
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          atsKeywords: newPersona.atsKeywords
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error || "Impossible de creer la persona.");
        return;
      }

      setState((current) =>
        current
          ? {
              ...current,
              personas: payload.personas,
            }
          : current
      );

      setNewPersona(DEFAULT_NEW_PERSONA);
    } catch {
      setError("Erreur reseau pendant la creation de la persona.");
    } finally {
      setIsSavingPersona(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des activites...
        </span>
      </div>
    );
  }

  if (!state) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">{error || "Aucune donnee."}</div>;
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        {groupedPersonas.map(({ activity, personas }) => (
          <article key={activity.id} className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className={`h-2 rounded-full bg-gradient-to-r ${activity.color}`} />
            <h3 className="mt-3 text-base font-semibold text-slate-900">{activity.name}</h3>
            <p className="text-sm text-slate-500">{activity.tagline}</p>

            <div className="mt-4 space-y-2">
              {personas.map((persona) => (
                <div key={persona.id} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-sm font-medium text-slate-800">{persona.name}</p>
                  <p className="text-xs text-slate-500">{persona.targetRoles.slice(0, 2).join(" • ")}</p>
                </div>
              ))}
              {!personas.length ? (
                <p className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
                  Aucune persona pour cette activite.
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <form onSubmit={handleCreatePersona} className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-semibold text-slate-900">Nouvelle persona</h3>
          <div className="mt-3 grid gap-3">
            <select
              value={newPersona.activityId}
              onChange={(event) => setNewPersona((current) => ({ ...current, activityId: event.target.value as Activity["id"] }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              {state.activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <input
              value={newPersona.name}
              onChange={(event) => setNewPersona((current) => ({ ...current, name: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Nom de la persona"
            />
            <input
              value={newPersona.headline}
              onChange={(event) => setNewPersona((current) => ({ ...current, headline: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Headline"
            />
            <textarea
              value={newPersona.targetRoles}
              onChange={(event) => setNewPersona((current) => ({ ...current, targetRoles: event.target.value }))}
              className="h-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Roles cibles (1 par ligne)"
            />
            <textarea
              value={newPersona.baseSummary}
              onChange={(event) => setNewPersona((current) => ({ ...current, baseSummary: event.target.value }))}
              className="h-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Resume base"
            />
            <input
              value={newPersona.coreSkills}
              onChange={(event) => setNewPersona((current) => ({ ...current, coreSkills: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Core skills (separees par virgules)"
            />
            <input
              value={newPersona.atsKeywords}
              onChange={(event) => setNewPersona((current) => ({ ...current, atsKeywords: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="ATS keywords (separees par virgules)"
            />
            <button
              type="submit"
              disabled={isSavingPersona}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              {isSavingPersona ? "Creation..." : "Creer la persona"}
            </button>
          </div>
        </form>

        <form onSubmit={handleCreateAsset} className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-semibold text-slate-900">Nouvel asset experience</h3>
          <div className="mt-3 grid gap-3">
            <select
              value={newAsset.activityId}
              onChange={(event) => setNewAsset((current) => ({ ...current, activityId: event.target.value as Activity["id"] }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              {state.activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <input
              value={newAsset.title}
              onChange={(event) => setNewAsset((current) => ({ ...current, title: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Titre du role"
            />
            <input
              value={newAsset.organization}
              onChange={(event) => setNewAsset((current) => ({ ...current, organization: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Organisation"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={newAsset.period}
                onChange={(event) => setNewAsset((current) => ({ ...current, period: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                placeholder="Periode"
              />
              <input
                value={newAsset.location}
                onChange={(event) => setNewAsset((current) => ({ ...current, location: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                placeholder="Lieu"
              />
            </div>
            <textarea
              value={newAsset.highlights}
              onChange={(event) => setNewAsset((current) => ({ ...current, highlights: event.target.value }))}
              className="h-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Highlights (1 par ligne)"
            />
            <input
              value={newAsset.skills}
              onChange={(event) => setNewAsset((current) => ({ ...current, skills: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Skills (separees par virgules)"
            />
            <textarea
              value={newAsset.metrics}
              onChange={(event) => setNewAsset((current) => ({ ...current, metrics: event.target.value }))}
              className="h-16 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              placeholder="Metrics (1 par ligne, optionnel)"
            />
            <button
              type="submit"
              disabled={isSavingAsset}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              {isSavingAsset ? "Creation..." : "Creer l'asset"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Evidence Pack</h3>
        <p className="mt-1 text-sm text-slate-500">Tous les assets utilises pour les recommandations IA et la generation de CV.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 py-3">Activity</th>
                <th className="px-2 py-3">Role</th>
                <th className="px-2 py-3">Organisation</th>
                <th className="px-2 py-3">Periode</th>
                <th className="px-2 py-3">Verification</th>
              </tr>
            </thead>
            <tbody>
              {state.experienceAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-100 text-slate-700">
                  <td className="px-2 py-3">{asset.activityId}</td>
                  <td className="px-2 py-3 font-medium">{asset.title}</td>
                  <td className="px-2 py-3">{asset.organization}</td>
                  <td className="px-2 py-3">{asset.period}</td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleAsset(asset.id, !asset.verified)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                        asset.verified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {asset.verified ? <ShieldCheck className="h-3.5 w-3.5" /> : null}
                      {asset.verified ? "Verifie" : "A verifier"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
