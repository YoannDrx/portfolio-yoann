import type { Locale } from "@/i18n/locales";

export type CaseStudySlug = "moodday" | "jobio" | "mycryptopilot" | "pressay";

export type CaseStudyDecision = {
  title: string;
  context: string;
  choice: string;
  rejected: string;
  tradeoff: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  role: string;
  period: string;
  status: string;
  image: string;
  secondaryImage: string;
  accent: string;
  softAccent: string;
  evidence: { value: string; label: string; detail: string }[];
  context: string[];
  constraints: string[];
  decisions: CaseStudyDecision[];
  architecture: { title: string; description: string }[];
  quality: string[];
  delivered: string[];
  limits: string[];
  nextSteps: string[];
  stack: readonly string[];
  sourceNote: string;
  release?: {
    available: boolean;
    downloadUrl: string;
    version: string;
    requirements: string;
    sourceUrl: string;
    productUrl?: string;
    releasesUrl: string;
    privacyUrl: string;
    downloadLabel: string;
    unavailableLabel: string;
    installTitle: string;
    installSteps: string[];
    privacySummary: string;
    apiNotice: string;
  };
};

const shared = {
  moodday: {
    slug: "moodday",
    name: "Moodday",
    image: "/images/projects/moodday-landing.png",
    secondaryImage: "/images/projects/moodday-dashboard.png",
    accent: "#1E7775",
    softAccent: "#D8ECE8",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL / Neon",
      "IndexedDB",
      "Playwright",
      "Web Push",
    ],
  },
  jobio: {
    slug: "jobio",
    name: "Jobio",
    image: "/images/projects/jobio-landing.png",
    secondaryImage: "/images/projects/jobio-dashboard.png",
    accent: "#3B5CCC",
    softAccent: "#E5EAFE",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Server Actions",
      "Playwright",
      "Stripe",
    ],
  },
  mycryptopilot: {
    slug: "mycryptopilot",
    name: "MyCryptoPilot",
    image: "/images/projects/mycryptopilot-landing.png",
    secondaryImage: "/images/projects/mycryptopilot-dashboard.png",
    accent: "#28E8A3",
    softAccent: "#D8FFF0",
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Exchange APIs",
      "Workers",
      "Vitest",
    ],
  },
  pressay: {
    slug: "pressay",
    name: "Pressay",
    image: "/images/projects/pressay-icon.png",
    secondaryImage: "/images/projects/pressay-icon-concept.png",
    accent: "#5668FF",
    softAccent: "#E5E8FF",
    stack: [
      "Swift 6",
      "SwiftUI",
      "AppKit",
      "AVFoundation",
      "CryptoKit",
      "Sparkle 2.9.2",
      "OpenAI API",
      "GitHub Actions",
    ],
  },
} as const;

const studiesByLocale: Record<Locale, Record<CaseStudySlug, CaseStudy>> = {
  fr: {
    moodday: {
      ...shared.moodday,
      eyebrow: "Produit sensible · Offline-first · Permissions",
      tagline: "Rendre un suivi personnel fiable sans se faire passer pour un outil clinique.",
      summary:
        "Moodday est un compagnon non clinique de suivi de l’humeur et des traitements. La refonte s’est concentrée sur la continuité hors ligne, les rappels multi-horaires, la confidentialité et un partage aidant révocable.",
      role: "Conception produit, UX, architecture et développement full-stack en solo",
      period: "Refonte 2026",
      status: "Release candidate technique · bêta utilisateur à mener",
      evidence: [
        {
          value: "122/122",
          label: "tests actifs",
          detail: "Baseline locale vérifiée le 16 juillet 2026",
        },
        {
          value: "7 jours",
          label: "hors ligne",
          detail: "Check-ins rejoués jusqu’à Postgres sans doublon",
        },
        {
          value: "2 sessions",
          label: "parcours aidant",
          detail: "Invitation, observation, révocation et blocage immédiat",
        },
        {
          value: "59",
          label: "pages au build",
          detail: "Build de production de référence",
        },
      ],
      context: [
        "Le produit mélange des actions très courtes — humeur, énergie, prise — et des données que l’utilisateur peut considérer comme intimes.",
        "La difficulté principale n’était pas d’ajouter des graphiques, mais de garantir qu’une action reste cohérente entre mobile, hors ligne, synchronisation serveur et historique.",
        "Le périmètre a donc été explicitement limité à un compagnon personnel : aucune formulation diagnostique, aucune recommandation de traitement et aucune promesse médicale.",
      ],
      constraints: [
        "Ne jamais perdre ni dupliquer un check-in ou une prise après une coupure réseau.",
        "Gérer plusieurs horaires, snooze, prises ponctuelles, fuseaux et changement d’heure.",
        "Autoriser un aidant uniquement sur une relation active et révocable, pas seulement sur un rôle global.",
        "Exporter et supprimer les données sans conserver de résidu hors cascade.",
        "Écarter toute donnée médicale, note ou identité d’aidant des analytics.",
      ],
      decisions: [
        {
          title: "Une file d’opérations structurée",
          context: "Une simple liste locale ne permettait pas d’expliquer les conflits ni de rejouer proprement les actions.",
          choice: "IndexedDB stocke chaque opération avec identifiant, statut, retry borné et résolution explicite des conflits ; le serveur applique une idempotence correspondante.",
          rejected: "Une queue localStorage opaque et un retry infini en arrière-plan.",
          tradeoff: "Davantage d’états à tester, mais un diagnostic possible sans exposer le contenu sensible.",
        },
        {
          title: "Des permissions relationnelles",
          context: "Le rôle “aidant” ne suffit pas à savoir quelle personne peut consulter quel suivi.",
          choice: "Les contrôles serveur vérifient invitation, relation, statut et révocation pour chaque route concernée.",
          rejected: "Masquer les écrans côté client ou autoriser par rôle générique.",
          tradeoff: "Plus de contrôles et de scénarios E2E, en échange d’une révocation immédiate et explicable.",
        },
        {
          title: "Un résumé facultatif, jamais un conseil",
          context: "Une synthèse peut aider à relire une période, mais une formulation causale serait trompeuse.",
          choice: "Les tendances séparent faits observés et corrélations, avec une synthèse optionnelle non clinique.",
          rejected: "Un coach IA qui conseille un diagnostic ou une modification de traitement.",
          tradeoff: "Une promesse marketing plus sobre, cohérente avec la responsabilité réelle du produit.",
        },
      ],
      architecture: [
        {
          title: "Interface PWA",
          description: "Check-in rapide, traitements, tendances et rôle aidant dans cinq destinations principales.",
        },
        {
          title: "IndexedDB",
          description: "Données locales et opérations rejouables avec statuts, quotas et conflits visibles.",
        },
        {
          title: "Actions idempotentes",
          description: "Validation, autorisation relationnelle et déduplication côté serveur.",
        },
        {
          title: "PostgreSQL / Neon",
          description: "Historique durable, exports transactionnels et journal de notifications.",
        },
        {
          title: "VAPID + cron",
          description: "Planification multi-horaires, claim concurrent et retry borné.",
        },
      ],
      quality: [
        "E2E d’un check-in hors ligne puis d’une semaine complète avec fermeture et réouverture de page.",
        "Exports JSON, CSV et PDF téléchargés puis contrôlés automatiquement.",
        "Suppression de compte vérifiée jusque dans les tables sans cascade.",
        "Matrice de permissions aidant couverte par tests positifs, négatifs, refus et expiration.",
        "Migration du journal de notification validée sur branche isolée puis promue sur Neon principal avec diff vide.",
      ],
      delivered: [
        "Un parcours quotidien court et utilisable sans réseau.",
        "Une synchronisation observable qui sépare conflit permanent et panne transitoire.",
        "Des rappels multi-horaires idempotents, y compris autour des changements d’heure.",
        "Un partage aidant limité, explicite et révocable.",
        "Un export complet et une suppression sans résidu sur le périmètre actuel.",
      ],
      limits: [
        "Le produit n’est ni un dispositif médical ni un outil diagnostique.",
        "La validation d’usage — cinq personnes pendant sept jours sans assistance — n’a pas encore été menée.",
        "Le changement de fuseau et le compactage de file demandent encore un durcissement dédié.",
        "VAPID et cron doivent être observés en preview puis en production avant une ouverture large.",
      ],
      nextSteps: [
        "Mener une bêta fermée de sept jours avec cinq personnes et observer uniquement activation, action cœur et erreurs techniques.",
        "Tester gros volumes, stockage de fichiers et changement de fuseau.",
        "Ajouter un journal d’accès aidant lisible par l’utilisateur.",
      ],
      sourceNote:
        "Les chiffres décrivent la baseline locale auditée ; ils ne constituent ni une mesure clinique ni une métrique d’adoption.",
    },
    jobio: {
      ...shared.jobio,
      eyebrow: "Product strategy · Workflow · Fiabilité",
      tagline: "Transformer un SaaS trop large en prochaine action commerciale claire.",
      summary:
        "Jobio aide un freelance tech à savoir quoi faire aujourd’hui pour avancer vers sa prochaine mission. La refonte a supprimé la logique de “suite tout-en-un” au profit de cinq zones cœur et d’un workflow testable.",
      role: "Product strategy, UX, architecture et développement full-stack en solo",
      period: "Réduction de périmètre 2026",
      status: "Cœur fonctionnel · validation commerciale à mener",
      evidence: [
        { value: "399/399", label: "tests actifs", detail: "Trois auto-saves historiques restent ignorés" },
        { value: "5", label: "zones cœur", detail: "Aujourd’hui, Pipeline, Relances, CV, Contacts" },
        { value: "3 max", label: "priorités / jour", detail: "Impact, urgence et contexte visibles" },
        { value: "137", label: "routes au build", detail: "Build de production de référence" },
      ],
      context: [
        "Le produit accumulait CRM, facturation, profils publics, plateformes, programmes, analytics et assistants IA. Cette largeur rendait la promesse difficile à comprendre et chaque écran coûteux à terminer.",
        "Le besoin retenu est plus étroit : capturer une opportunité, voir la prochaine action, relancer sans sur-solliciter et adapter un CV.",
        "La finition a commencé par la source de vérité du périmètre, puis par les mutations à risque : Kanban, relances, fusion de contacts et export CV.",
      ],
      constraints: [
        "Un module masqué ne doit être accessible ni par navigation, ni par deep-link, ni par pricing.",
        "Un déplacement Kanban optimiste doit rester annulable et résister aux doubles actions.",
        "Les relances doivent s’arrêter après réponse, désinscription, mission terminale ou cadence excessive.",
        "Une fusion de contacts ne doit ni perdre les relations ni écraser silencieusement un champ.",
        "Le CV exporté doit rester lisible par un ATS et stable sur une page A4.",
      ],
      decisions: [
        {
          title: "Un manifeste serveur pour couper le produit",
          context: "Cacher un lien ne supprime pas une route, un prix ou une action serveur.",
          choice: "Navigation, deep-links, pricing et contrôles serveur consomment le même statut active, hidden ou beta.",
          rejected: "Finir tous les modules historiques ou les masquer uniquement en CSS.",
          tradeoff: "Du code reste temporairement présent mais inaccessible pendant que la V1 est validée.",
        },
        {
          title: "Une transition Kanban conditionnelle",
          context: "Deux actions rapides pouvaient produire un statut obsolète ou un compteur incohérent.",
          choice: "La mutation compare le statut attendu, devient rejouable, met à jour atomiquement et propose undo puis retry.",
          rejected: "Une mutation aveugle suivie d’un refresh complet.",
          tradeoff: "Plus de logique de conflit, mais une interface instantanée sans sacrifier la cohérence.",
        },
        {
          title: "Une politique unique de relance",
          context: "Actions manuelles, règles et séquences appliquaient des garde-fous différents.",
          choice: "Une fonction métier commune bloque doublon à 24 h, trois touches sur sept jours, réponse, désinscription et statuts terminaux.",
          rejected: "Des vérifications dispersées dans chaque formulaire ou cron.",
          tradeoff: "Certaines automatisations s’arrêtent volontairement plus tôt pour protéger la relation.",
        },
        {
          title: "Prévisualiser avant de fusionner",
          context: "Un email déjà connu pouvait correspondre à des informations complémentaires ou contradictoires.",
          choice: "Chaque champ est comparé ; l’utilisateur garde les deux fiches ou fusionne explicitement avant une transaction relationnelle.",
          rejected: "Écraser automatiquement le contact le plus ancien.",
          tradeoff: "Une étape de décision supplémentaire évite une perte de données silencieuse.",
        },
      ],
      architecture: [
        { title: "Feature manifest", description: "Une source serveur pilote disponibilité, navigation et offre." },
        { title: "Aujourd’hui", description: "Agrégation de trois actions maximum à partir des missions et relances." },
        { title: "Pipeline", description: "Vue Kanban/liste avec transitions optimistes conditionnelles." },
        { title: "Follow-up policy", description: "Garde-fous communs aux actions, règles et séquences." },
        { title: "CV renderer", description: "Profil maître, overrides puis sorties A4 et ATS déterministes." },
      ],
      quality: [
        "Mutation Kanban testée sur no-op, conflit, undo et échec auxiliaire.",
        "Politique de relance couverte sur tous les motifs d’arrêt.",
        "Fusion transactionnelle des missions, interactions, emails, sociétés et tags.",
        "Export ATS sans photo, colonnes, décoration ni section masquée.",
        "Onboarding persistant en quatre jalons, reprenable côté serveur.",
      ],
      delivered: [
        "Une navigation ramenée à cinq zones et une page Aujourd’hui orientée action.",
        "Un pipeline optimiste, annulable et cohérent en cas de concurrence.",
        "Des relances qui protègent contre doublons et sur-sollicitation.",
        "Une prévisualisation de doublon avant création ou fusion.",
        "Un export CV ATS déterministe en complément de la preview A4.",
      ],
      limits: [
        "Le gate de cinq freelances réels, dont deux veulent poursuivre ou payer, n’est pas encore atteint.",
        "La détection de doublon LinkedIn et le journal réversible de fusion restent à faire.",
        "Le PDF A4 doit encore être éprouvé sur un corpus long et sur le moteur de production.",
        "Les filtres/vues enregistrées et les parcours E2E de propriété restent incomplets.",
      ],
      nextSteps: [
        "Faire exécuter l’onboarding chronométré et les cinq parcours cœur à cinq freelances.",
        "Ajouter journal d’envoi par canal et restauration de fusion.",
        "Valider un seul plan Pro avec Stripe test avant tout changement du catalogue réel.",
      ],
      sourceNote:
        "Les preuves portent sur le fonctionnement et les tests locaux ; aucune conversion commerciale n’est revendiquée à ce stade.",
    },
    mycryptopilot: {
      ...shared.mycryptopilot,
      eyebrow: "Security boundary · Testnet · Risk-first",
      tagline: "Montrer une architecture financière sans inciter à confier ou copier des fonds.",
      summary:
        "MyCryptoPilot est conservé comme démonstrateur technique. La surface publique est limitée au testnet, aux connexions read-only et à la simulation du risque ; copy trading réel, garde de fonds et promesses de rendement sont hors périmètre.",
      role: "Cadrage sécurité, architecture et développement full-stack en solo",
      period: "Durcissement 2026",
      status: "Démonstrateur · durcissement testnet restant",
      evidence: [
        { value: "482/482", label: "tests actifs", detail: "Baseline locale vérifiée" },
        { value: "98", label: "pages au build", detail: "Build de production de référence" },
        { value: "Read-only", label: "frontière exchange", detail: "Aucun droit d’ordre attendu" },
        { value: "0", label: "fonds gardés", detail: "Aucune custody dans le périmètre public" },
      ],
      context: [
        "Le thème initial — signaux et copy trading — crée un risque produit immédiat : une interface convaincante peut être interprétée comme une promesse financière.",
        "Le projet est donc repositionné en cas d’étude d’architecture et de sécurité, avec données de démonstration et connexions limitées à la lecture.",
        "La priorité n’est plus l’exécution d’un trade, mais la compréhension de l’exposition, du drawdown et des hypothèses d’un signal.",
      ],
      constraints: [
        "Aucune garde de fonds, aucun ordre réel et aucune promesse de rendement.",
        "Une clé exchange ne doit jamais être stockée ou loggée en clair.",
        "Toute performance affichée doit être réelle, sourcée, ou étiquetée comme exemple déterministe.",
        "Le mode Démo / Testnet doit rester visible sur toutes les surfaces.",
        "Les workers doivent pouvoir être arrêtés et observés sans exposer les secrets.",
      ],
      decisions: [
        {
          title: "Remplacer l’exécution par la simulation",
          context: "Un bouton “Execute Trade” suggérait une capacité et une responsabilité que le produit public ne doit pas assumer.",
          choice: "La Risk Console simule exposition, taille et scénarios sans envoyer d’ordre.",
          rejected: "Activer progressivement le copy trading réel.",
          tradeoff: "Moins de potentiel transactionnel, mais un démonstrateur plus sûr et plus crédible techniquement.",
        },
        {
          title: "Une frontière exchange read-only",
          context: "Une clé trop permissive transforme une fuite applicative en risque financier direct.",
          choice: "Le modèle cible valide les permissions, refuse le trading/retrait et permet la révocation explicite.",
          rejected: "Demander une clé universelle pour simplifier l’onboarding.",
          tradeoff: "Plus d’erreurs de configuration à expliquer, avec un blast radius fortement réduit.",
        },
        {
          title: "Des exemples déterministes",
          context: "Des métriques aléatoires ou non sourcées ressemblent à des résultats obtenus.",
          choice: "Le jeu de démonstration est stable, identifiable et séparé des données read-only.",
          rejected: "Conserver des statistiques marketing fictives pour rendre la landing plus persuasive.",
          tradeoff: "Une présentation moins spectaculaire, mais reproductible dans les tests et honnête pour le visiteur.",
        },
      ],
      architecture: [
        { title: "Mode Démo", description: "Dataset déterministe, badge permanent et aucune dépendance à un compte réel." },
        { title: "Connexion read-only", description: "Permissions minimales, secret protégé et révocation attendue." },
        { title: "Signal normalisé", description: "Hypothèses, source et horodatage séparés de toute exécution." },
        { title: "Risk Console", description: "Simulation d’exposition, scénarios et limites sans ordre réel." },
        { title: "Workers observables", description: "Traitement asynchrone avec circuit breaker comme prochaine barrière de fiabilité." },
      ],
      quality: [
        "Suite locale de 482 tests active et build de 98 pages.",
        "Navigation publique recentrée sur Risk Console, Signaux, Portfolio read-only, Traders et Compte.",
        "School, Tax, paiements crypto et copy trading publics bloqués.",
        "Statistiques marketing fictives retirées du hero.",
        "Badge Démo / Testnet permanent sur le périmètre exposé.",
      ],
      delivered: [
        "Une promesse publique recentrée sur le risque plutôt que le rendement.",
        "Une frontière explicite entre exemple, testnet et donnée read-only.",
        "Aucun parcours public de paiement crypto, garde ou copy trading.",
        "Une base de tests suffisamment large pour documenter les prochains durcissements.",
      ],
      limits: [
        "La validation complète des permissions de clés exchange doit encore être prouvée en E2E testnet.",
        "Les sources de prix et le calcul PnL doivent être explicités sur chaque vue concernée.",
        "Circuit breaker, révocation et observabilité des workers restent des critères de sortie.",
        "Ce projet ne constitue ni un service de conseil financier ni une preuve de rendement.",
      ],
      nextSteps: [
        "Ajouter quatre E2E testnet : connexion read-only, signal, simulation du risque et révocation.",
        "Vérifier qu’aucun secret exchange n’apparaît dans logs, traces ou erreurs.",
        "Documenter le modèle de menace et les sources de prix dans l’interface.",
      ],
      sourceNote:
        "Les nombres sont des preuves de build et de tests, pas des performances financières. Les données d’exemple sont explicitement étiquetées.",
    },
    pressay: {
      ...shared.pressay,
      eyebrow: "macOS natif · Voix universelle · Local-first",
      tagline: "Maintenir, parler, relâcher — pour écrire depuis n’importe quelle application.",
      summary:
        "Pressay transforme la voix en texte depuis n’importe quelle application macOS. La version 1.2.4 préserve le presse-papiers après l’insertion et ajoute un chemin de dictée dédié au compositeur Codex.",
      role: "Conception produit, UX macOS, architecture et développement Swift en solo",
      period: "Release publique 2026",
      status: "Version stable 1.2.4 · téléchargement disponible",
      evidence: [
        { value: "arm64 + x86_64", label: "binaire universel", detail: "Apple Silicon et Mac Intel" },
        { value: "macOS 14+", label: "compatibilité", detail: "Sonoma ou version ultérieure" },
        { value: "AES-256-GCM", label: "historique local", detail: "Optionnel et à rétention configurable" },
        { value: "120/120", label: "tests Swift", detail: "CI de la release publique validée" },
      ],
      context: [
        "Le geste de base est volontairement immédiat : maintenir Fn/Globe, parler puis relâcher pour écrire là où se trouve le curseur.",
        "L’interaction doit rester invisible jusqu’au moment utile : l’app vit dans la barre de menu, démarre sur Fn/Globe et restitue le presse-papiers après l’insertion.",
        "La vision va au-delà de la dictée — transformer une sélection et préparer des actions — mais chaque capacité ne sera exposée qu’une fois son parcours complet réellement fonctionnel.",
      ],
      constraints: [
        "Fonctionner sur les Mac Intel et Apple Silicon capables d’exécuter macOS 14+.",
        "Ne jamais envoyer d’audio lorsqu’aucune voix n’est détectée localement.",
        "Stocker la clé API dans le Trousseau et l’historique optionnel dans un fichier local chiffré.",
        "Conserver la cible d’insertion même si l’utilisateur démarre une nouvelle dictée.",
        "Distribuer des mises à jour complètes signées sans télémétrie ni profil système.",
      ],
      decisions: [
        {
          title: "Un raccourci modificateur natif",
          context: "La dictée doit démarrer sans voler le focus ni imposer une fenêtre flottante permanente.",
          choice: "Fn/Globe, Option droite ou Commande droite déclenchent un mode maintenir ou bascule depuis la barre de menu.",
          rejected: "Une combinaison globale complexe ou un champ de saisie propre à l’application.",
          tradeoff: "Les permissions Microphone et Accessibilité doivent être expliquées clairement au premier lancement.",
        },
        {
          title: "Une clé OpenAI appartenant à l’utilisateur",
          context: "Un backend Yodev ajouterait comptes, facturation, rétention et responsabilités opérationnelles.",
          choice: "La clé personnelle reste dans le Trousseau macOS et authentifie directement la transcription OpenAI.",
          rejected: "Un proxy mutualisé avec abonnement Yodev.",
          tradeoff: "L’utilisateur gère sa facturation OpenAI, mais Yodev ne reçoit ni audio ni texte.",
        },
        {
          title: "DMG Developer ID et Sparkle",
          context: "Un ZIP non notarialisé déclenche des avertissements et ne fournit aucun chemin de mise à jour fiable.",
          choice: "Un DMG universel notarialisé, signé Developer ID et référencé par un appcast Sparkle Ed25519.",
          rejected: "Un binaire ad hoc à ouvrir par contournement Gatekeeper.",
          tradeoff: "La publication exige un compte Apple Developer et une chaîne de secrets CI protégée.",
        },
      ],
      architecture: [
        { title: "Raccourci global", description: "Écoute de Fn/Globe ou du modificateur droit sans prendre le focus." },
        { title: "Capture locale", description: "Audio temporaire et détection de voix avant tout appel réseau." },
        { title: "Transcription", description: "Envoi direct à OpenAI avec langue, modèle et vocabulaire actifs." },
        { title: "Insertion sûre", description: "Retour à l’application cible, collage et restauration conditionnelle du presse-papiers." },
        { title: "Mise à jour", description: "DMG complet validé par Sparkle, Ed25519, Developer ID et Gatekeeper." },
      ],
      quality: [
        "Tests de migration des préférences, de la clé API et de la clé d’historique depuis l’ancienne identité.",
        "Migration idempotente : les valeurs actuelles ne sont jamais écrasées et une erreur Keychain peut être rejouée.",
        "Suite Xcode, analyse statique et archive Release universelle intégrées au pipeline.",
        "Signature profonde de l’app et de Sparkle, notarisation, agrafage et évaluation Gatekeeper avant publication.",
        "DMG monté automatiquement pour vérifier l’app, le lien Applications et la somme SHA-256.",
      ],
      delivered: [
        "Une dictée Fn/Globe disponible depuis toute application macOS.",
        "Une compatibilité Codex dédiée lorsque son compositeur personnalisé n’est pas exposé à l’accessibilité.",
        "Pressay restitue votre presse-papiers après une insertion réussie, sans écraser une nouvelle copie effectuée entre-temps.",
        "Douze modes natifs, des modes personnalisés et des profils activables par application.",
        "Une transformation de sélection avec aperçu éditable, revalidation de la cible et récupération par copie.",
        "Une politique cloud par mode : traitement direct lorsqu’il est autorisé, ou aperçu exact et confirmation à la demande.",
        "Un HUD configurable et refermable, avec choix du mode pendant l’écoute et actions post-insertion.",
        "Une correction vocale de la dernière insertion et des politiques injection, aperçu, copie ou exclusion par application.",
        "Une Voice Inbox optionnelle, chiffrée séparément et soumise à sa propre rétention.",
        "Un historique local optionnel chiffré avec rétention de 24 heures, 7 jours ou 30 jours.",
        "Une file de transcriptions annulable qui conserve chaque application cible.",
        "Une chaîne de release reproductible produisant DMG, checksum et appcast.",
      ],
      limits: [
        "WhisperKit permet la transcription locale ; une clé OpenAI personnelle reste nécessaire pour les traitements cloud et peut être facturée par OpenAI.",
        "Microphone et Accessibilité doivent être accordés dans les Réglages Système.",
        "Les moteurs locaux, commandes vocales exécutables, intégrations et réunions appartiennent aux versions suivantes.",
        "L’application est indépendante et n’est ni éditée ni approuvée par OpenAI.",
      ],
      nextSteps: [
        "Intégrer les moteurs locaux et le routage hybride prévus pour 1.3.",
        "Mesurer qualité, latence et consommation sur le corpus français, anglais et technique.",
        "Étudier une version App Store complémentaire compatible avec les limites du sandbox, sans dégrader le produit direct.",
      ],
      sourceNote:
        "Le CTA pointe vers le DMG universel 1.2.4 signé Developer ID, notarisé par Apple et publié avec son checksum.",
      release: {
        available: true,
        downloadUrl: "/download/pressay",
        version: "1.2.4",
        requirements: "macOS 14+ · Intel et Apple Silicon",
        sourceUrl: "https://github.com/YoannDrx/pressay",
        productUrl: "https://press-say.app/fr",
        releasesUrl: "https://github.com/YoannDrx/pressay/releases",
        privacyUrl: "https://github.com/YoannDrx/pressay/blob/main/PRIVACY.md",
        downloadLabel: "Télécharger pour macOS",
        unavailableLabel: "Téléchargement bientôt disponible",
        installTitle: "Installer Pressay",
        installSteps: [
          "Télécharger Pressay.dmg depuis cette page.",
          "Ouvrir le DMG et glisser Pressay dans Applications.",
          "Lancer Pressay puis accorder Microphone et Accessibilité.",
          "Ajouter sa clé API OpenAI personnelle dans les réglages.",
        ],
        privacySummary:
          "Historique optionnel chiffré sur le Mac, clé API dans le Trousseau et aucune télémétrie envoyée à Yodev.",
        apiNotice:
          "Le téléchargement est gratuit. Les appels à l’API peuvent être facturés directement par OpenAI.",
      },
    },
  },
  en: {} as Record<CaseStudySlug, CaseStudy>,
};

// English studies keep the same technical evidence while exposing a fully
// localized narrative. The object is built explicitly to avoid translating
// user-facing content at runtime.
studiesByLocale.en = {
  moodday: {
    ...studiesByLocale.fr.moodday,
    eyebrow: "Sensitive product · Offline-first · Permissions",
    tagline: "Make personal tracking reliable without presenting it as a clinical tool.",
    summary:
      "Moodday is a non-clinical companion for mood and treatment tracking. The redesign focuses on offline continuity, multi-time reminders, privacy and revocable caregiver sharing.",
    role: "Solo product design, UX, architecture and full-stack development",
    period: "2026 redesign",
    status: "Technical release candidate · user beta pending",
    evidence: [
      { value: "122/122", label: "active tests", detail: "Local baseline verified on July 16, 2026" },
      { value: "7 days", label: "offline", detail: "Check-ins replayed to Postgres without duplicates" },
      { value: "2 sessions", label: "caregiver flow", detail: "Invite, observe, revoke and block immediately" },
      { value: "59", label: "build pages", detail: "Reference production build" },
    ],
    context: [
      "The product combines very short actions — mood, energy and intake — with information users may consider deeply private.",
      "The main challenge was not adding charts, but keeping one action consistent across mobile, offline storage, server synchronization and history.",
      "The scope is explicitly a personal companion: no diagnostic language, treatment recommendation or medical claim.",
    ],
    constraints: [
      "Never lose or duplicate a check-in or intake after network loss.",
      "Handle multiple times, snooze, as-needed intake, time zones and daylight saving changes.",
      "Authorize a caregiver through an active revocable relationship, not a global role.",
      "Export and delete data without leaving records outside cascades.",
      "Keep medical values, notes and caregiver identities out of analytics.",
    ],
    decisions: studiesByLocale.fr.moodday.decisions.map((decision, index) => [
      {
        title: "A structured operation queue",
        context: "A plain local list could not explain conflicts or safely replay actions.",
        choice: "IndexedDB stores each operation with an ID, status, bounded retry and explicit conflict resolution; the server mirrors it with idempotency.",
        rejected: "An opaque localStorage queue with infinite background retries.",
        tradeoff: "More states to test, but diagnostics without exposing sensitive content.",
      },
      {
        title: "Relationship-level permissions",
        context: "A caregiver role alone does not identify whose data can be viewed.",
        choice: "Server checks invitation, relationship, status and revocation on each relevant route.",
        rejected: "Client-side hiding or generic role authorization.",
        tradeoff: "More checks and E2E scenarios in exchange for immediate, explainable revocation.",
      },
      {
        title: "Optional summary, never advice",
        context: "A summary can support reflection, while causal language would be misleading.",
        choice: "Trends separate observed facts from correlations and keep summaries optional and non-clinical.",
        rejected: "An AI coach recommending diagnoses or treatment changes.",
        tradeoff: "A quieter marketing promise aligned with the product’s actual responsibility.",
      },
    ][index] ?? decision),
    architecture: [
      { title: "PWA interface", description: "Quick check-in, treatments, trends and caregiver role across five main destinations." },
      { title: "IndexedDB", description: "Local data and replayable operations with visible status, quotas and conflicts." },
      { title: "Idempotent actions", description: "Validation, relationship authorization and server-side deduplication." },
      { title: "PostgreSQL / Neon", description: "Durable history, transactional exports and notification journal." },
      { title: "VAPID + cron", description: "Multi-time scheduling, concurrent claim and bounded retries." },
    ],
    quality: [
      "E2E for one offline check-in and a full week with page close and reopen.",
      "JSON, CSV and PDF exports downloaded and automatically inspected.",
      "Account deletion verified through tables without cascades.",
      "Caregiver permission matrix covered by positive, negative, refusal and expiry tests.",
      "Notification-journal migration tested on an isolated branch then promoted to Neon main with an empty diff.",
    ],
    delivered: [
      "A short daily journey that works without a network.",
      "Observable sync separating permanent conflicts from transient failures.",
      "Idempotent multi-time reminders including daylight saving changes.",
      "Limited, explicit and revocable caregiver sharing.",
      "Complete export and residue-free deletion for the current scope.",
    ],
    limits: [
      "The product is not a medical device or diagnostic tool.",
      "The usage gate — five people for seven days without assistance — has not been run yet.",
      "Time-zone changes and queue compaction still need dedicated hardening.",
      "VAPID and cron must be observed in preview and production before broad access.",
    ],
    nextSteps: [
      "Run a seven-day closed beta with five people and measure only activation, core action and technical errors.",
      "Test high volume, file storage and time-zone changes.",
      "Add a caregiver-access journal users can read.",
    ],
    sourceNote: "Numbers describe an audited local baseline, not clinical efficacy or adoption.",
  },
  jobio: {
    ...studiesByLocale.fr.jobio,
    eyebrow: "Product strategy · Workflow · Reliability",
    tagline: "Turn an oversized SaaS into a clear next commercial action.",
    summary:
      "Jobio helps a tech freelancer decide what to do today to move toward the next engagement. The redesign replaced an all-in-one suite with five core areas and a testable workflow.",
    role: "Solo product strategy, UX, architecture and full-stack development",
    period: "2026 scope reduction",
    status: "Functional core · commercial validation pending",
    evidence: [
      { value: "399/399", label: "active tests", detail: "Three historical auto-save tests remain skipped" },
      { value: "5", label: "core areas", detail: "Today, Pipeline, Follow-ups, CV, Contacts" },
      { value: "3 max", label: "daily priorities", detail: "Impact, urgency and context remain visible" },
      { value: "137", label: "build routes", detail: "Reference production build" },
    ],
    context: [
      "The product had accumulated CRM, billing, public profiles, platforms, programs, analytics and AI assistants. That breadth blurred the promise and made every screen expensive to finish.",
      "The retained need is narrower: capture an opportunity, see the next action, follow up without over-contacting and tailor a CV.",
      "Finishing started with one source of truth for scope, followed by high-risk mutations: Kanban, follow-ups, contact merge and CV export.",
    ],
    constraints: [
      "A hidden module must be inaccessible through navigation, deep links and pricing.",
      "Optimistic Kanban movement must be undoable and resist double actions.",
      "Follow-ups must stop after response, opt-out, terminal mission or excessive cadence.",
      "Contact merge must preserve relationships and never silently overwrite a field.",
      "CV export must remain ATS-readable and stable on A4.",
    ],
    decisions: [
      { title: "A server manifest to cut scope", context: "Hiding a link does not remove a route, price or server action.", choice: "Navigation, deep links, pricing and server checks consume the same active, hidden or beta status.", rejected: "Finishing every historical module or hiding them with CSS.", tradeoff: "Some code remains temporarily present but inaccessible while V1 is validated." },
      { title: "Conditional Kanban transitions", context: "Fast concurrent actions could produce stale status or inconsistent counters.", choice: "The mutation compares expected status, is replayable, updates atomically and offers undo then retry.", rejected: "A blind mutation followed by a full refresh.", tradeoff: "More conflict logic for an instant UI that keeps data coherent." },
      { title: "One follow-up policy", context: "Manual actions, rules and sequences used different safeguards.", choice: "One domain function blocks duplicates within 24 hours, three touches in seven days, replies, opt-outs and terminal statuses.", rejected: "Checks scattered across each form and cron.", tradeoff: "Some automation intentionally stops earlier to protect the relationship." },
      { title: "Preview before merge", context: "A known email may carry complementary or conflicting information.", choice: "Fields are compared and the user either keeps both records or explicitly merges before a relational transaction.", rejected: "Automatically overwrite the oldest contact.", tradeoff: "One extra decision prevents silent data loss." },
    ],
    architecture: [
      { title: "Feature manifest", description: "One server source drives availability, navigation and offering." },
      { title: "Today", description: "No more than three actions aggregated from missions and follow-ups." },
      { title: "Pipeline", description: "Kanban/list views with conditional optimistic transitions." },
      { title: "Follow-up policy", description: "Shared safeguards across actions, rules and sequences." },
      { title: "CV renderer", description: "Master profile, overrides, then deterministic A4 and ATS outputs." },
    ],
    quality: [
      "Kanban mutation tested for no-op, conflict, undo and auxiliary failure.",
      "Follow-up policy covered across every stop reason.",
      "Transactional merge of missions, interactions, emails, companies and tags.",
      "ATS export without photos, columns, decoration or hidden sections.",
      "Persistent four-step onboarding resumable from server state.",
    ],
    delivered: [
      "Navigation reduced to five areas and a Today page focused on action.",
      "An optimistic, undoable pipeline coherent under concurrent updates.",
      "Follow-ups protected against duplicates and over-contacting.",
      "Duplicate preview before creation or merge.",
      "Deterministic ATS CV export alongside A4 preview.",
    ],
    limits: [
      "The gate of five real freelancers, with two willing to continue or pay, is not reached.",
      "LinkedIn duplicate detection and reversible merge history remain to build.",
      "A4 PDF still needs a long-corpus and production-engine check.",
      "Saved filters/views and ownership E2E remain incomplete.",
    ],
    nextSteps: [
      "Have five freelancers run the timed onboarding and five core journeys.",
      "Add per-channel delivery journal and merge restoration.",
      "Validate one Pro plan in Stripe test mode before any live catalogue change.",
    ],
    sourceNote: "Evidence covers local operation and tests; no commercial conversion is claimed yet.",
  },
  mycryptopilot: {
    ...studiesByLocale.fr.mycryptopilot,
    eyebrow: "Security boundary · Testnet · Risk-first",
    tagline: "Demonstrate financial architecture without asking users to custody or copy funds.",
    summary:
      "MyCryptoPilot is kept as a technical demonstrator. The public surface is limited to testnet, read-only connections and risk simulation; real copy trading, custody and return promises are out of scope.",
    role: "Solo security framing, architecture and full-stack development",
    period: "2026 hardening",
    status: "Demonstrator · testnet hardening pending",
    evidence: [
      { value: "482/482", label: "active tests", detail: "Verified local baseline" },
      { value: "98", label: "build pages", detail: "Reference production build" },
      { value: "Read-only", label: "exchange boundary", detail: "No order permission expected" },
      { value: "0", label: "funds held", detail: "No custody in the public scope" },
    ],
    context: [
      "The original signal and copy-trading theme creates immediate product risk: a persuasive interface can be read as a financial promise.",
      "The project is repositioned as an architecture and security case study with demo data and read-only connections.",
      "The priority is no longer executing a trade, but understanding exposure, drawdown and signal assumptions.",
    ],
    constraints: [
      "No custody, real orders or return promises.",
      "Exchange keys must never be stored or logged in plain text.",
      "Any displayed performance must be real and sourced or labeled as a deterministic example.",
      "Demo / Testnet mode must remain visible everywhere.",
      "Workers must be stoppable and observable without exposing secrets.",
    ],
    decisions: [
      { title: "Simulation instead of execution", context: "An Execute Trade button implied a capability and responsibility the public product should not assume.", choice: "The Risk Console simulates exposure, size and scenarios without placing an order.", rejected: "Gradually enabling real copy trading.", tradeoff: "Less transaction potential for a safer, technically more credible demonstrator." },
      { title: "A read-only exchange boundary", context: "An over-permissive key turns an application leak into direct financial risk.", choice: "The target model validates permissions, rejects trading/withdrawal and supports explicit revocation.", rejected: "Requesting a universal key to simplify onboarding.", tradeoff: "More configuration errors to explain with a much smaller blast radius." },
      { title: "Deterministic examples", context: "Random or unsourced metrics look like achieved results.", choice: "Demo data is stable, identifiable and separate from read-only data.", rejected: "Keeping fictional marketing metrics to make the landing more persuasive.", tradeoff: "A quieter presentation that remains reproducible in tests and honest to visitors." },
    ],
    architecture: [
      { title: "Demo mode", description: "Deterministic dataset, permanent badge and no dependency on a real account." },
      { title: "Read-only connection", description: "Minimal permissions, protected secret and expected revocation." },
      { title: "Normalized signal", description: "Assumptions, source and timestamp separated from execution." },
      { title: "Risk Console", description: "Exposure, scenarios and limits simulated without real orders." },
      { title: "Observable workers", description: "Async processing with a circuit breaker as the next reliability boundary." },
    ],
    quality: [
      "482 active local tests and a 98-page build.",
      "Public navigation focused on Risk Console, Signals, read-only Portfolio, Traders and Account.",
      "School, Tax, crypto payments and public copy trading blocked.",
      "Fictional marketing metrics removed from the hero.",
      "Permanent Demo / Testnet badge across exposed scope.",
    ],
    delivered: [
      "A public promise focused on risk rather than returns.",
      "An explicit boundary between examples, testnet and read-only data.",
      "No public crypto payment, custody or copy-trading journey.",
      "A broad test baseline from which to document the remaining hardening.",
    ],
    limits: [
      "Full exchange-key permission validation still needs testnet E2E proof.",
      "Price sources and PnL calculation must be explicit on every relevant view.",
      "Circuit breaker, revocation and worker observability remain release criteria.",
      "This project is neither financial advice nor evidence of returns.",
    ],
    nextSteps: [
      "Add four testnet E2E flows: read-only connection, signal, risk simulation and revocation.",
      "Verify no exchange secret appears in logs, traces or errors.",
      "Document the threat model and price sources in the interface.",
    ],
    sourceNote: "Numbers are build and test evidence, not financial performance. Example data is explicitly labeled.",
  },
  pressay: {
    ...studiesByLocale.fr.pressay,
    eyebrow: "Native macOS · Universal voice · Local-first",
    tagline: "Hold, speak, release — to write from any application.",
    summary:
      "Pressay turns speech into text from any macOS application. Version 1.2.4 preserves the clipboard after insertion and adds a dedicated dictation path for the Codex composer.",
    role: "Solo product design, macOS UX, architecture and Swift development",
    period: "2026 public release",
    status: "Stable 1.2.4 · download available",
    evidence: [
      { value: "arm64 + x86_64", label: "universal binary", detail: "Apple Silicon and Intel Macs" },
      { value: "macOS 14+", label: "compatibility", detail: "Sonoma or later" },
      { value: "AES-256-GCM", label: "local history", detail: "Optional with configurable retention" },
      { value: "120/120", label: "Swift tests", detail: "Public release CI validated" },
    ],
    context: [
      "The core gesture is deliberately immediate: hold Fn/Globe, speak, then release to write at the current cursor.",
      "The interaction stays out of the way until needed: the app lives in the menu bar, starts on Fn/Globe and restores the clipboard after insertion.",
      "The vision extends beyond dictation to selection transformations and controlled actions, but each capability will only be exposed once its complete journey is genuinely functional.",
    ],
    constraints: [
      "Run on Intel and Apple Silicon Macs capable of macOS 14 or later.",
      "Never upload audio when no speech is detected locally.",
      "Store the API key in Keychain and optional history in an encrypted local file.",
      "Preserve the insertion target when a user starts another dictation.",
      "Ship complete signed updates without telemetry or system profiling.",
    ],
    decisions: [
      {
        title: "A native modifier shortcut",
        context: "Dictation must start without stealing focus or keeping a permanent floating window.",
        choice: "Fn/Globe, Right Option or Right Command trigger hold or toggle mode from the menu bar.",
        rejected: "A complex global shortcut or an app-specific text field.",
        tradeoff: "Microphone and Accessibility permissions need a clear first-run explanation.",
      },
      {
        title: "An OpenAI key owned by the user",
        context: "A Yodev backend would add accounts, billing, retention and operational responsibility.",
        choice: "The personal key stays in macOS Keychain and authenticates transcription directly with OpenAI.",
        rejected: "A shared proxy bundled with a Yodev subscription.",
        tradeoff: "The user manages OpenAI billing, while Yodev receives neither audio nor text.",
      },
      {
        title: "Developer ID DMG and Sparkle",
        context: "An unnotarized ZIP raises warnings and provides no trustworthy update path.",
        choice: "A notarized universal DMG, signed with Developer ID and referenced by an Ed25519 Sparkle appcast.",
        rejected: "An ad hoc binary that requires bypassing Gatekeeper.",
        tradeoff: "Publishing requires an Apple Developer account and a protected CI secret chain.",
      },
    ],
    architecture: [
      { title: "Global shortcut", description: "Observes Fn/Globe or a right modifier without taking focus." },
      { title: "Local capture", description: "Temporary audio and speech detection before any network call." },
      { title: "Transcription", description: "Direct OpenAI request with the active language, model and vocabulary." },
      { title: "Safe insertion", description: "Returns to the target app, pastes and conditionally restores the clipboard." },
      { title: "Update", description: "Complete DMG validated by Sparkle, Ed25519, Developer ID and Gatekeeper." },
    ],
    quality: [
      "Migration tests for preferences, API key and history key from the previous app identity.",
      "Idempotent migration: current values are never overwritten and Keychain failures can be retried.",
      "Xcode tests, static analysis and a universal Release archive included in the pipeline.",
      "Deep app and Sparkle signing, notarization, stapling and Gatekeeper assessment before publication.",
      "Automated DMG mount checking the app, Applications link and SHA-256 checksum.",
    ],
    delivered: [
      "Fn/Globe dictation available from any macOS application.",
      "Dedicated Codex compatibility when its custom composer is not exposed through Accessibility.",
      "Pressay restores the clipboard after a successful insertion without overwriting anything copied in the meantime.",
      "Twelve built-in modes, custom modes and opt-in per-app profiles.",
      "Selection transformation with an editable preview, target revalidation and copy fallback.",
      "A per-mode cloud policy: direct processing when allowed, or an exact payload preview and confirmation on request.",
      "A configurable, dismissible HUD with in-capture mode selection and post-insertion actions.",
      "Voice correction for the latest insertion and per-app inject, preview, copy or exclude policies.",
      "An optional Voice Inbox with separate encryption and retention.",
      "Optional encrypted local history retained for 24 hours, 7 days or 30 days.",
      "A cancellable transcription queue preserving each target application.",
      "A reproducible release chain producing a DMG, checksum and appcast.",
    ],
    limits: [
      "WhisperKit provides local transcription; a personal OpenAI key is still required for cloud processing and may be billed by OpenAI.",
      "Microphone and Accessibility must be granted in System Settings.",
      "Local engines, executable voice commands, integrations and meetings are planned for later releases.",
      "The app is independent and is neither published nor endorsed by OpenAI.",
    ],
    nextSteps: [
      "Integrate the local engines and hybrid routing planned for 1.3.",
      "Benchmark quality, latency and resource usage on the French, English and technical corpus.",
      "Evaluate a complementary App Store edition within sandbox limits without weakening the direct product.",
    ],
    sourceNote:
      "The CTA points to the universal 1.2.4 DMG signed with Developer ID, notarized by Apple and published with its checksum.",
    release: {
      available: true,
      downloadUrl: "/download/pressay",
      version: "1.2.4",
      requirements: "macOS 14+ · Intel and Apple Silicon",
      sourceUrl: "https://github.com/YoannDrx/pressay",
      productUrl: "https://press-say.app/en",
      releasesUrl: "https://github.com/YoannDrx/pressay/releases",
      privacyUrl: "https://github.com/YoannDrx/pressay/blob/main/PRIVACY.md",
      downloadLabel: "Download for macOS",
      unavailableLabel: "Download coming soon",
      installTitle: "Install Pressay",
      installSteps: [
        "Download Pressay.dmg from this page.",
        "Open the DMG and drag Pressay into Applications.",
        "Launch Pressay, then grant Microphone and Accessibility.",
        "Add your personal OpenAI API key in settings.",
      ],
      privacySummary:
        "Optional history is encrypted on the Mac, the API key stays in Keychain and no telemetry is sent to Yodev.",
      apiNotice:
        "The download is free. API calls may be billed directly by OpenAI.",
    },
  },
};

export const caseStudySlugs = Object.keys(
  studiesByLocale.fr
) as CaseStudySlug[];

export function getCaseStudy(
  locale: Locale,
  slug: string
): CaseStudy | undefined {
  if (!caseStudySlugs.includes(slug as CaseStudySlug)) {
    return undefined;
  }

  return studiesByLocale[locale][slug as CaseStudySlug];
}

export function getCaseStudySummaries(locale: Locale) {
  return caseStudySlugs.map((slug) => {
    const study = studiesByLocale[locale][slug];
    return {
      slug,
      name: study.name,
      eyebrow: study.eyebrow,
      tagline: study.tagline,
      image: study.image,
      accent: study.accent,
      evidence: study.evidence[0],
    };
  });
}
