import Link from "next/link";
import { readAdminStore } from "@/admin/store";
import { adminNavItems } from "@/components/admin/admin-nav";

function KpiCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
    </article>
  );
}

export default async function AdminHomePage() {
  const store = await readAdminStore();

  const verifiedAssets = store.experienceAssets.filter((asset) => asset.verified).length;
  const unverifiedAssets = store.experienceAssets.length - verifiedAssets;
  const activeApplications = store.applications.filter((application) =>
    ["target", "applied", "interview"].includes(application.status)
  ).length;
  const publishedSnapshots = store.contentSnapshots.filter((snapshot) => snapshot.status === "published").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Personas" value={String(store.personas.length)} hint="Profils de candidature actifs" />
        <KpiCard label="Assets verifies" value={String(verifiedAssets)} hint="Preuves utilisables immediatement" />
        <KpiCard label="Assets a completer" value={String(unverifiedAssets)} hint="Champs incomplets ou non verifies" />
        <KpiCard label="Candidatures actives" value={String(activeApplications)} hint="Dossiers en cours de suivi" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Execution pipeline</h2>
          <p className="mt-1 text-sm text-slate-500">Ordre recommande pour produire un CV cible de maniere fiable.</p>

          <div className="mt-4 space-y-3">
            {[
              "1. Selectionner la persona cible selon l'annonce",
              "2. Analyser l'offre et identifier les gaps ATS",
              "3. Generer un brouillon evidence-first dans CV Lab",
              "4. Exporter le CV et ouvrir la candidature dans le pipeline",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/admin/offers"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Lancer une analyse d'offre
            </Link>
            <Link
              href="/admin/cv-lab"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ouvrir CV Lab
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Acces rapides</h2>
          <div className="mt-4 space-y-2">
            {adminNavItems
              .filter((item) => item.href !== "/admin")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-cyan-200 hover:bg-cyan-50"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </Link>
              ))}
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">Publication publique</p>
            <p className="text-xs text-emerald-800">
              {publishedSnapshots} snapshot publie actif. Utilise le module Public Content pour versionner avant toute mise en ligne.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
