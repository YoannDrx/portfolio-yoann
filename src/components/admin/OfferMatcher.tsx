"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, Target, TriangleAlert } from "lucide-react";
import { OfferAnalysis, Persona } from "@/admin/types";

const DEMO_OFFER = `React Native Developer - CDI Paris

Nous recherchons un profil React Native senior pour renforcer notre equipe produit mobile.
Missions: developper de nouvelles features iOS / Android, maintenir une base TypeScript, collaborer avec les equipes produit/design en agile scrum.
Exige: React Native, TypeScript, Redux, API REST, Git.
Bonus: Next.js, experience de migration legacy.
Mode de travail: hybride (3 jours sur site Paris).
`;

function ScorePill({ label, value }: { label: string; value: number }) {
  const color = value >= 75 ? "bg-emerald-500" : value >= 55 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function OfferMatcher() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [personaId, setPersonaId] = useState("");
  const [offerText, setOfferText] = useState(DEMO_OFFER);
  const [analysis, setAnalysis] = useState<OfferAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCatalog() {
      setIsLoadingCatalog(true);
      try {
        const response = await fetch("/api/admin/state");
        const payload = await response.json();

        if (!response.ok) {
          if (!active) return;
          setError(payload.error || "Impossible de charger les personas.");
          return;
        }

        if (!active) return;

        const nextPersonas = (payload.personas || []) as Persona[];
        setPersonas(nextPersonas);
        setPersonaId((current) => current || nextPersonas[0]?.id || "");
      } catch {
        if (active) {
          setError("Erreur reseau pendant le chargement des personas.");
        }
      } finally {
        if (active) {
          setIsLoadingCatalog(false);
        }
      }
    }

    loadCatalog();

    return () => {
      active = false;
    };
  }, []);

  const selectedPersona = useMemo(
    () => personas.find((persona) => persona.id === personaId),
    [personaId, personas]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/offers/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerText, personaId }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Analyse impossible.");
        return;
      }

      setAnalysis(payload.analysis);
    } catch {
      setError("Erreur reseau pendant l'analyse.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingCatalog) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="inline-flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Chargement des personas...
        </p>
      </div>
    );
  }

  if (!personas.length) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        Aucun persona configure. Cree d'abord une persona dans l'onglet Activities.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Persona cible</label>
            <select
              value={personaId}
              onChange={(event) => setPersonaId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-400"
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

          <div className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-3 text-xs text-cyan-900">
            Le moteur utilise un mode evidence-first: uniquement des preuves existantes ou explicitement marquees non verifiees.
          </div>

          <button
            type="submit"
            disabled={isLoading || !personaId}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
            {isLoading ? "Analyse en cours..." : "Analyser l'offre"}
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Texte de l'annonce</label>
          <textarea
            value={offerText}
            onChange={(event) => setOfferText(event.target.value)}
            className="h-[280px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-cyan-400"
            placeholder="Colle l'offre complete ici..."
          />
        </div>
      </form>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      {analysis ? (
        <div className="space-y-6">
          <section className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-2 lg:grid-cols-5">
            <ScorePill label="Global" value={analysis.score.global} />
            <ScorePill label="Hard skills" value={analysis.score.hardSkills} />
            <ScorePill label="Domain fit" value={analysis.score.domainFit} />
            <ScorePill label="Contraintes" value={analysis.score.constraints} />
            <ScorePill label="Preuves" value={analysis.score.evidenceCoverage} />
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">Insights offre</h3>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p><span className="font-medium text-slate-900">Titre:</span> {analysis.insights.title}</p>
                <p><span className="font-medium text-slate-900">Contrat:</span> {analysis.insights.contract}</p>
                <p><span className="font-medium text-slate-900">Lieu:</span> {analysis.insights.location}</p>
                <p><span className="font-medium text-slate-900">Remote:</span> {analysis.insights.remote}</p>
                <p><span className="font-medium text-slate-900">Seniorite:</span> {analysis.insights.seniority}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.insights.extractedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">Gaps ATS</h3>
              <p className="mt-1 text-sm text-slate-500">Mots-cles attendus par la persona mais absents de l'offre ou de ton evidence pack.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.missingKeywords.length > 0 ? (
                  analysis.missingKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-emerald-700">Aucun gap critique detecte.</span>
                )}
              </div>
            </article>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">Recommandations prioritaires</h3>
              <div className="mt-4 space-y-3">
                {analysis.recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-2">
                      {recommendation.priority === "high" ? (
                        <TriangleAlert className="h-4 w-4 text-rose-600" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-cyan-600" />
                      )}
                      <p className="text-sm font-semibold text-slate-900">{recommendation.title}</p>
                    </div>
                    <p className="text-xs text-slate-600">{recommendation.rationale}</p>
                    <p className="mt-1 text-xs font-medium text-slate-800">Action: {recommendation.action}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">Draft CV suggere</h3>
              <p className="mt-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-3 text-sm leading-relaxed text-cyan-900">
                {analysis.suggestedSummary}
              </p>

              <div className="mt-4 space-y-2">
                {analysis.suggestedBullets.map((bullet) => (
                  <div
                    key={bullet.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    <span className="mr-2 inline-flex rounded-md border border-slate-300 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                      {bullet.verified ? "verifie" : "a verifier"}
                    </span>
                    {bullet.text}
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      ) : null}
    </div>
  );
}
