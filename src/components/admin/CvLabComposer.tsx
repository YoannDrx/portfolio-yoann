"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, FileText, Loader2 } from "lucide-react";
import { ExperienceAsset, Persona } from "@/admin/types";

export default function CvLabComposer() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [assets, setAssets] = useState<ExperienceAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [personaId, setPersonaId] = useState("");
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadState() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/admin/state");
        const payload = await response.json();

        if (!response.ok) {
          if (active) {
            setError(payload.error || "Impossible de charger les donnees.");
          }
          return;
        }

        if (!active) return;

        const nextPersonas = (payload.personas || []) as Persona[];
        const nextAssets = (payload.experienceAssets || []) as ExperienceAsset[];

        setPersonas(nextPersonas);
        setAssets(nextAssets);

        const firstPersonaId = nextPersonas[0]?.id || "";
        setPersonaId(firstPersonaId);

        const firstPersona = nextPersonas[0];
        if (firstPersona) {
          const defaultAssetIds = nextAssets
            .filter((asset) => asset.activityId === firstPersona.activityId && asset.verified)
            .map((asset) => asset.id);
          setSelectedAssetIds(defaultAssetIds);
        }
      } catch {
        if (active) {
          setError("Erreur reseau pendant le chargement.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadState();

    return () => {
      active = false;
    };
  }, []);

  const selectedPersona = useMemo(
    () => personas.find((persona) => persona.id === personaId),
    [personaId, personas]
  );

  const personaAssets = useMemo(() => {
    if (!selectedPersona) return [];
    return assets.filter((asset) => asset.activityId === selectedPersona.activityId);
  }, [assets, selectedPersona]);

  function toggleAsset(assetId: string) {
    setSelectedAssetIds((current) => {
      if (current.includes(assetId)) {
        return current.filter((id) => id !== assetId);
      }
      return [...current, assetId];
    });
  }

  const selectedAssets = useMemo(
    () => personaAssets.filter((asset) => selectedAssetIds.includes(asset.id)),
    [personaAssets, selectedAssetIds]
  );

  const generatedDraft = useMemo(() => {
    if (!selectedPersona) {
      return "";
    }

    const intro = `${selectedPersona.baseSummary} Poste cible: ${selectedPersona.targetRoles[0]}.`;
    const bulletLines = selectedAssets
      .slice(0, 4)
      .flatMap((asset) =>
        asset.highlights.slice(0, 2).map((highlight) => `- ${highlight} (${asset.organization}, ${asset.period})`)
      );

    const skillsLine = `Competences a mettre en avant: ${selectedPersona.coreSkills.join(", ")}.`;

    return [intro, "", "Experiences prioritaires:", ...bulletLines, "", skillsLine].join("\n");
  }, [selectedAssets, selectedPersona]);

  async function copyDraft() {
    if (!generatedDraft) return;
    await navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="inline-flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement de CV Lab...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">{error}</div>;
  }

  if (!personas.length) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        Aucun persona configure. Cree d'abord une persona dans l'onglet Activities.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Persona active</label>
            <select
              value={personaId}
              onChange={(event) => {
                const nextPersonaId = event.target.value;
                setPersonaId(nextPersonaId);

                const persona = personas.find((item) => item.id === nextPersonaId);
                if (!persona) {
                  setSelectedAssetIds([]);
                  return;
                }

                const nextAssetIds = assets
                  .filter((asset) => asset.activityId === persona.activityId && asset.verified)
                  .map((asset) => asset.id);

                setSelectedAssetIds(nextAssetIds);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
            >
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.name}
                </option>
              ))}
            </select>
            {selectedPersona ? (
              <p className="mt-2 text-xs text-slate-500">{selectedPersona.headline}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
            Mode premium: les blocs non verifies restent visibles mais signales. Tu decideras ensuite s'ils peuvent etre publies dans une version finale.
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-semibold text-slate-900">Assets utilises</h3>
          <div className="mt-3 space-y-2">
            {personaAssets.map((asset) => {
              const checked = selectedAssetIds.includes(asset.id);

              return (
                <label
                  key={asset.id}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAsset(asset.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{asset.title}</p>
                    <p className="text-xs text-slate-500">{asset.organization}</p>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        asset.verified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {asset.verified ? "verifie" : "a verifier"}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <FileText className="h-4 w-4" />
              Draft ATS
            </h3>
            <button
              type="button"
              onClick={copyDraft}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copie" : "Copier"}
            </button>
          </div>

          <pre className="mt-4 min-h-[320px] whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
            {generatedDraft || "Selectionne une persona pour generer un brouillon."}
          </pre>
        </article>
      </section>
    </div>
  );
}
