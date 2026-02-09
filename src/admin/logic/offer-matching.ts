import { getPersonaById } from "@/admin/data";
import {
  ExperienceAsset,
  JobOfferInput,
  MatchingRecommendation,
  OfferAnalysis,
  Persona,
  SuggestedBullet,
} from "@/admin/types";

const KEYWORDS = [
  "react native",
  "react",
  "next.js",
  "typescript",
  "javascript",
  "redux",
  "ios",
  "android",
  "scrum",
  "agile",
  "api",
  "node",
  "coordination",
  "logistique",
  "planning",
  "prestataires",
  "operations",
  "management",
  "service client",
  "livraison",
  "coursier",
  "velo",
  "ponctualite",
  "autonomie",
  "terrain",
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

function detectContract(text: string) {
  if (text.includes("cdi")) return "CDI";
  if (text.includes("cdd")) return "CDD";
  if (text.includes("freelance") || text.includes("independant")) return "Freelance";
  if (text.includes("interim")) return "Interim";
  if (text.includes("stage")) return "Stage";
  if (text.includes("alternance")) return "Alternance";
  return "Non detecte";
}

function detectRemote(text: string) {
  if (text.includes("full remote") || text.includes("100% remote") || text.includes("teletravail complet")) {
    return "Full remote";
  }
  if (text.includes("hybride") || text.includes("hybrid")) return "Hybride";
  if (text.includes("sur site") || text.includes("onsite")) return "Sur site";
  if (text.includes("remote") || text.includes("teletravail")) return "Remote";
  return "Non precise";
}

function detectLocation(text: string) {
  const cities = ["paris", "lyon", "lille", "bordeaux", "nantes", "marseille", "toulouse"];
  const found = cities.find((city) => text.includes(city));
  if (!found) return "Non detectee";
  return found.charAt(0).toUpperCase() + found.slice(1);
}

function detectSeniority(text: string) {
  if (text.includes("lead") || text.includes("expert")) return "Lead / Expert";
  if (text.includes("senior")) return "Senior";
  if (text.includes("junior")) return "Junior";
  if (text.includes("mid") || text.includes("confirme")) return "Intermediaire";
  return "Non precise";
}

function detectTitle(rawText: string) {
  const firstLine = rawText
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 3);

  if (!firstLine) return "Poste non detecte";
  return firstLine.slice(0, 80);
}

function extractKeywords(text: string) {
  const keywords = KEYWORDS.filter((keyword) => text.includes(keyword));
  return uniq(keywords);
}

function scoreAsset(asset: ExperienceAsset, keywords: string[]) {
  const haystack = normalize([asset.title, asset.organization, ...asset.highlights, ...asset.skills].join(" "));
  const score = keywords.reduce((total, keyword) => {
    if (haystack.includes(keyword)) return total + 1;
    return total;
  }, 0);

  if (asset.verified) return score + 0.4;
  return score;
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function buildRecommendations(params: {
  missingKeywords: string[];
  evidenceCoverage: number;
  matchedSkills: string[];
  unverifiedAssetsCount: number;
}): MatchingRecommendation[] {
  const recommendations: MatchingRecommendation[] = [];

  if (params.missingKeywords.length > 0) {
    recommendations.push({
      id: "missing-keywords",
      priority: "high",
      title: "Combler les mots-cles ATS manquants",
      rationale: `L'offre contient ${params.missingKeywords.length} mots-cles non couverts par ta base actuelle.`,
      action: `Ajouter ou reformuler des bullets autour de: ${params.missingKeywords.slice(0, 6).join(", ")}`,
    });
  }

  if (params.evidenceCoverage < 60) {
    recommendations.push({
      id: "proof-gap",
      priority: "high",
      title: "Augmenter les preuves verifiees",
      rationale: "Le score de couverture preuve est faible. Le CV risque d'etre moins credible en entretien.",
      action: "Ajouter des resultats chiffres et des contextes projet verifiables sur les experiences prioritaires.",
    });
  }

  if (params.matchedSkills.length >= 4) {
    recommendations.push({
      id: "reorder-cv",
      priority: "medium",
      title: "Reordonner le CV sur le fit direct",
      rationale: "Le matching est bon: il faut maximiser la lisibilite en tete de CV.",
      action: "Monter en haut les experiences qui prouvent directement les 3 competences attendues.",
    });
  }

  if (params.unverifiedAssetsCount > 0) {
    recommendations.push({
      id: "verify-assets",
      priority: "medium",
      title: "Verifier les assets incomplets",
      rationale: `${params.unverifiedAssetsCount} experience(s) sont marquees comme non verifiees.`,
      action: "Completer periode, contexte, resultat et preuve pour debloquer un usage IA sans risque.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "ready-to-apply",
      priority: "low",
      title: "Dossier deja bien aligne",
      rationale: "Le score global est solide et la couverture de preuves est correcte.",
      action: "Generer le CV cible et personnaliser seulement la section resume en 4-5 lignes.",
    });
  }

  return recommendations;
}

function buildSuggestedBullets(assets: ExperienceAsset[], limit = 6): SuggestedBullet[] {
  return assets
    .flatMap((asset) =>
      asset.highlights.slice(0, 2).map((highlight, index) => ({
        id: `${asset.id}-${index}`,
        sourceAssetId: asset.id,
        verified: asset.verified,
        text: `${highlight} (${asset.organization})`,
      }))
    )
    .slice(0, limit);
}

interface OfferMatchingContext {
  personas: Persona[];
  experienceAssets: ExperienceAsset[];
}

export function analyzeOffer(input: JobOfferInput, context: OfferMatchingContext): OfferAnalysis {
  const persona = getPersonaById(input.personaId, context.personas);

  if (!persona) {
    throw new Error("Persona not found");
  }

  const normalizedOffer = normalize(input.offerText);
  const extractedKeywords = extractKeywords(normalizedOffer);

  const personaKeywords = persona.atsKeywords.map(normalize);
  const personaSkills = persona.coreSkills.map(normalize);

  const matchedSkills = personaSkills.filter((skill) => extractedKeywords.includes(skill));
  const missingKeywords = personaKeywords.filter((keyword) => !extractedKeywords.includes(keyword));

  const personaAssets = context.experienceAssets.filter((asset) => asset.activityId === persona.activityId);
  const rankedAssets = [...personaAssets].sort(
    (a, b) => scoreAsset(b, extractedKeywords) - scoreAsset(a, extractedKeywords)
  );

  const recommendedAssets = rankedAssets.slice(0, 4);

  const evidenceSupportedKeywords = extractedKeywords.filter((keyword) => {
    return recommendedAssets.some((asset) => {
      if (!asset.verified) return false;
      const haystack = normalize([asset.title, ...asset.highlights, ...asset.skills].join(" "));
      return haystack.includes(keyword);
    });
  });

  const hardSkillsScore = clamp((matchedSkills.length / Math.max(1, personaSkills.length)) * 100);
  const domainFitScore = clamp(
    ((personaKeywords.length - missingKeywords.length) / Math.max(1, personaKeywords.length)) * 100
  );

  const constraintsScore = clamp(
    (detectContract(normalizedOffer) !== "Non detecte" ? 40 : 20) +
      (detectRemote(normalizedOffer) !== "Non precise" ? 30 : 15) +
      (detectLocation(normalizedOffer) !== "Non detectee" ? 30 : 20)
  );

  const evidenceCoverage = clamp((evidenceSupportedKeywords.length / Math.max(1, extractedKeywords.length)) * 100);

  const global = clamp(
    hardSkillsScore * 0.4 + domainFitScore * 0.25 + constraintsScore * 0.15 + evidenceCoverage * 0.2
  );

  const recommendations = buildRecommendations({
    missingKeywords,
    evidenceCoverage,
    matchedSkills,
    unverifiedAssetsCount: personaAssets.filter((asset) => !asset.verified).length,
  });

  const suggestedBullets = buildSuggestedBullets(recommendedAssets);

  const suggestedSummary = `${persona.baseSummary} Focus annonce: ${detectTitle(input.offerText)}. Positionner en priorite les preuves sur ${matchedSkills
    .slice(0, 3)
    .join(", ") || "les competences coeur du poste"}.`;

  return {
    persona,
    insights: {
      title: detectTitle(input.offerText),
      contract: detectContract(normalizedOffer),
      location: detectLocation(normalizedOffer),
      remote: detectRemote(normalizedOffer),
      seniority: detectSeniority(normalizedOffer),
      extractedKeywords,
    },
    score: {
      global,
      hardSkills: hardSkillsScore,
      domainFit: domainFitScore,
      constraints: constraintsScore,
      evidenceCoverage,
    },
    matchedSkills,
    missingKeywords,
    recommendedAssets,
    recommendations,
    suggestedSummary,
    suggestedBullets,
  };
}
