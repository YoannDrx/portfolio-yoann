import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Download,
  ExternalLink,
  GitBranch,
  Github,
  ShieldCheck,
  TestTube2,
  XCircle,
} from "lucide-react";
import { caseStudySlugs, getCaseStudy, getSiteConfig } from "@/data";
import { isLocale, type Locale } from "@/i18n/locales";

const labels = {
  fr: {
    back: "Retour au portfolio",
    evidence: "Preuves vérifiables",
    context: "Contexte et rôle",
    constraints: "Contraintes retenues",
    decisions: "Décisions et options rejetées",
    choice: "Choix",
    rejected: "Rejeté",
    tradeoff: "Compromis",
    architecture: "Architecture du parcours",
    quality: "Qualité et vérifications",
    delivered: "Ce qui est réellement livré",
    limits: "Limites assumées",
    next: "Prochaine étape",
    stack: "Socle technique",
    note: "Lecture des chiffres",
    version: "Version publique",
    product: "Site officiel",
    source: "Code source",
    releases: "Versions",
    privacy: "Confidentialité",
    contactTitle: "Vous cherchez ce niveau de raisonnement produit ?",
    contactBody:
      "Je peux intervenir du cadrage à la livraison, en rendant visibles les risques, les choix et les preuves de fonctionnement.",
    contactCta: "Me contacter",
    role: "Rôle",
    period: "Période",
    status: "Statut",
  },
  en: {
    back: "Back to portfolio",
    evidence: "Verifiable evidence",
    context: "Context and role",
    constraints: "Retained constraints",
    decisions: "Decisions and rejected options",
    choice: "Choice",
    rejected: "Rejected",
    tradeoff: "Trade-off",
    architecture: "Journey architecture",
    quality: "Quality and verification",
    delivered: "What is actually delivered",
    limits: "Known limits",
    next: "Next step",
    stack: "Technical foundation",
    note: "How to read the numbers",
    version: "Public version",
    product: "Official site",
    source: "Source code",
    releases: "Releases",
    privacy: "Privacy",
    contactTitle: "Looking for this level of product reasoning?",
    contactBody:
      "I can contribute from framing to delivery while making risks, decisions and evidence visible.",
    contactCta: "Contact me",
    role: "Role",
    period: "Period",
    status: "Status",
  },
} as const;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const study = getCaseStudy(rawLocale, slug);
  if (!study) {
    return {};
  }

  const config = getSiteConfig(rawLocale);
  const title = `${study.name} — ${study.tagline}`;

  return {
    title,
    description: study.summary,
    alternates: {
      canonical: `/${rawLocale}/projects/${slug}`,
      languages: {
        fr: `/fr/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description: study.summary,
      url: `${config.url}/${rawLocale}/projects/${slug}`,
      type: "article",
      locale: config.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const study = getCaseStudy(locale, slug);

  if (!study) {
    notFound();
  }

  const copy = labels[locale];
  const jsonLd = study.release
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: study.name,
        alternateName: study.name,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "macOS 14 or later",
        softwareVersion: study.release.version,
        description: study.summary,
        author: { "@type": "Person", name: "Yoann Andrieux" },
        downloadUrl: `https://www.yoann-andrieux.fr${study.release.downloadUrl}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: study.release.apiNotice,
        },
        inLanguage: locale,
      }
    : {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: `${study.name} — ${study.tagline}`,
        description: study.summary,
        author: { "@type": "Person", name: "Yoann Andrieux" },
        dateModified: "2026-07-27",
        inLanguage: locale,
      };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <nav className="mb-12 flex items-center justify-between gap-4" aria-label={copy.back}>
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.back}
          </Link>
          <span className="hidden font-mono text-xs text-slate-500 sm:block">
            CASE / {study.slug.toUpperCase()}
          </span>
        </nav>

        <header className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {study.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
              {study.name}
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-slate-800 dark:text-slate-100 sm:text-2xl">
              {study.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {study.summary}
            </p>
            {study.release && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {study.release.available ? (
                  <a
                    href={study.release.downloadUrl}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {study.release.downloadLabel}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-full bg-slate-200 px-6 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {study.release.unavailableLabel}
                  </span>
                )}
                {study.release.productUrl && (
                  <a
                    href={study.release.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    {copy.product}
                  </a>
                )}
                <a
                  href={study.release.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Github className="size-4" aria-hidden="true" />
                  {copy.source}
                </a>
              </div>
            )}
            <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm dark:border-slate-800 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase text-slate-500">{copy.role}</dt>
                <dd className="mt-2 leading-relaxed">{study.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase text-slate-500">{copy.period}</dt>
                <dd className="mt-2">{study.period}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase text-slate-500">{copy.status}</dt>
                <dd className="mt-2">{study.status}</dd>
              </div>
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3]">
              <Image
                src={study.image}
                alt={`${study.name} — interface principale`}
                fill
                priority
                className={study.release ? "object-contain p-10 sm:p-14" : "object-cover object-top"}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-1.5"
              style={{ backgroundColor: study.accent }}
            />
          </div>
        </header>

        {study.release && (
          <section
            className="mt-16 grid gap-6 rounded-[2rem] border border-blue-200 bg-blue-50 p-6 dark:border-blue-950 dark:bg-blue-950/30 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]"
            aria-labelledby="install-title"
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
                {copy.version} {study.release.version}
              </p>
              <h2 id="install-title" className="mt-3 text-3xl font-bold">
                {study.release.installTitle}
              </h2>
              <p className="mt-3 font-semibold text-slate-700 dark:text-slate-200">
                {study.release.requirements}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {study.release.privacySummary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {study.release.apiNotice}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                <a href={study.release.releasesUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-700 hover:underline dark:text-blue-300">
                  {copy.releases}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
                <a href={study.release.privacyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-700 hover:underline dark:text-blue-300">
                  {copy.privacy}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {study.release.installSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-relaxed dark:border-blue-900 dark:bg-slate-900">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-20" aria-labelledby="evidence-title">
          <SectionTitle id="evidence-title" icon={<TestTube2 />} title={copy.evidence} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.evidence.map((item) => (
              <article key={`${item.value}-${item.label}`} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-mono text-3xl font-bold" style={{ color: study.accent }}>
                  {item.value}
                </p>
                <h3 className="mt-2 font-semibold">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-4 flex gap-3 rounded-2xl border border-slate-200 bg-slate-100/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p><strong>{copy.note} :</strong> {study.sourceNote}</p>
          </div>
        </section>

        <div className="mt-24 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <section aria-labelledby="context-title">
            <SectionTitle id="context-title" title={copy.context} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {study.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
          <section aria-labelledby="constraints-title">
            <SectionTitle id="constraints-title" icon={<ShieldCheck />} title={copy.constraints} />
            <ul className="mt-6 space-y-3">
              {study.constraints.map((constraint) => (
                <li key={constraint} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed dark:border-slate-800 dark:bg-slate-900">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: study.accent }} aria-hidden="true" />
                  {constraint}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-24" aria-labelledby="decisions-title">
          <SectionTitle id="decisions-title" icon={<GitBranch />} title={copy.decisions} />
          <div className="mt-8 space-y-6">
            {study.decisions.map((decision, index) => (
              <article key={decision.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                  <div className="p-6 sm:p-8" style={{ backgroundColor: study.softAccent }}>
                    <span className="font-mono text-xs font-bold text-slate-600">DECISION 0{index + 1}</span>
                    <h3 className="mt-4 text-2xl font-bold text-slate-950">{decision.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{decision.context}</p>
                  </div>
                  <dl className="grid gap-0 sm:grid-cols-3">
                    <DecisionCell label={copy.choice} value={decision.choice} icon={<CheckCircle2 className="text-emerald-600" />} />
                    <DecisionCell label={copy.rejected} value={decision.rejected} icon={<XCircle className="text-rose-600" />} />
                    <DecisionCell label={copy.tradeoff} value={decision.tradeoff} icon={<CircleAlert className="text-amber-600" />} />
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="architecture-title">
          <SectionTitle id="architecture-title" icon={<GitBranch />} title={copy.architecture} />
          <ol className="mt-8 grid gap-3 lg:grid-cols-5">
            {study.architecture.map((node, index) => (
              <li key={node.title} className="relative">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <span className="font-mono text-xs font-bold" style={{ color: study.accent }}>0{index + 1}</span>
                  <h3 className="mt-3 font-bold">{node.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{node.description}</p>
                </div>
                {index < study.architecture.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-[#FAF9F6] p-1 text-slate-400 dark:bg-slate-950 lg:block" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-2" aria-label={copy.quality}>
          <ListPanel title={copy.quality} icon={<TestTube2 />} items={study.quality} />
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 dark:border-slate-800">
            <div className="relative aspect-[16/9]">
              <Image
                src={study.secondaryImage}
                alt={`${study.name} — vue produit`}
                fill
                className={study.release ? "object-cover object-center opacity-95" : "object-cover object-top opacity-90"}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-6 lg:grid-cols-3">
          <ListPanel title={copy.delivered} items={study.delivered} tone="success" />
          <ListPanel title={copy.limits} items={study.limits} tone="warning" />
          <ListPanel title={copy.next} items={study.nextSteps} tone="info" />
        </section>

        <section className="mt-20 border-t border-slate-200 pt-10 dark:border-slate-800" aria-labelledby="stack-title">
          <h2 id="stack-title" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{copy.stack}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((technology) => (
              <li key={technology} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900">
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <aside className="mt-24 rounded-[2rem] bg-[#111827] p-8 text-white sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">React Native · React / Next.js · Product · UX · Quality</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">{copy.contactTitle}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">{copy.contactBody}</p>
          <Link href={`/${locale}#contact`} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            {copy.contactCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </main>
  );
}

function SectionTitle({ id, title, icon }: { id: string; title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">{icon}</span>}
      <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

function DecisionCell({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="border-t border-slate-200 p-5 dark:border-slate-800 sm:border-l sm:border-t-0 sm:p-6">
      <dt className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-slate-500">
        <span className="[&>svg]:size-4">{icon}</span>{label}
      </dt>
      <dd className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{value}</dd>
    </div>
  );
}

function ListPanel({ title, items, icon, tone = "default" }: { title: string; items: string[]; icon?: React.ReactNode; tone?: "default" | "success" | "warning" | "info" }) {
  const toneClass = {
    default: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    success: "border-emerald-200 bg-emerald-50 dark:border-emerald-950 dark:bg-emerald-950/30",
    warning: "border-amber-200 bg-amber-50 dark:border-amber-950 dark:bg-amber-950/30",
    info: "border-blue-200 bg-blue-50 dark:border-blue-950 dark:bg-blue-950/30",
  }[tone];

  return (
    <article className={`rounded-3xl border p-6 sm:p-8 ${toneClass}`}>
      <h2 className="flex items-center gap-3 text-xl font-bold">
        {icon && <span className="[&>svg]:size-5">{icon}</span>}{title}
      </h2>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 opacity-70" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
