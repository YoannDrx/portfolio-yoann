# CLAUDE.md

---

## ⚡ AUTO-START mgrep (à faire automatiquement)

**Dès que tu commences à travailler sur ce projet, lance cette commande en background :**

```bash
mgrep watch --store "portfolio-yoann" &
```

> Lance cette commande UNE SEULE FOIS au début de la session. Ne la relance pas à chaque question.

---


Ce fichier fournit des instructions à Claude Code pour ce projet.

---

## mgrep - Assistant de recherche de code

**mgrep est l'outil principal pour explorer ce codebase.** Il retourne une réponse en langage naturel + les sources pertinentes.

### Store : `portfolio-yoann`

### Lancer le watch (à faire à chaque ouverture du projet)

```bash
cd ~/Projets/portfolio-yoann
mgrep watch --store "portfolio-yoann"
```

> Garde ce terminal ouvert : il surveille les modifications en temps réel.

### Commande de recherche

```bash
mgrep "ta question en langage naturel" --store "portfolio-yoann" -a -m <nombre>
```

### Paramètres

| Paramètre | Description |
|-----------|-------------|
| `--store "portfolio-yoann"` | **Obligatoire** - le store indexé du projet |
| `-a` | Active la réponse en langage naturel |
| `-m <n>` | Nombre de résultats (minimum 10) |

### Ajuster `-m` selon la complexité

| Type de requête | `-m` recommandé |
|-----------------|-----------------|
| Question simple (1-2 fichiers) | 10 |
| Question moyenne (flow, feature) | 20-30 |
| Question complexe (debug, architecture) | 30-50 |

### Stratégie pour requêtes complexes

Lance plusieurs mgrep en parallèle plutôt qu'une seule requête surchargée :

```bash
mgrep "comment fonctionne le système de thème dark/light" --store "portfolio-yoann" -a -m 20
mgrep "comment est gérée l'internationalisation" --store "portfolio-yoann" -a -m 20
mgrep "comment fonctionne la génération de PDF" --store "portfolio-yoann" -a -m 20
```

### Règles

- **OBLIGATOIRE** : Utilise mgrep pour TOUTE recherche de code. N'utilise JAMAIS grep, Grep tool, ou Glob.
- **Langage naturel** : Parle à mgrep comme à un collègue
  - ❌ `"theme dark light next-themes"` (mots-clés)
  - ✅ `"Comment fonctionne le système de thème sombre/clair ?"` (question naturelle)

---

## Subagents (Task tool)

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle cette section mgrep dans le prompt du subagent.

---

## A propos du projet

**Portfolio Yoann** - Site portfolio personnel.

## Commandes de développement

```bash
pnpm dev          # Serveur de développement
pnpm build        # Compilation production
pnpm start        # Serveur production
pnpm lint         # ESLint
```

---

## Architecture

### Stack technique

- **Framework** : Next.js avec App Router
- **Langage** : TypeScript
- **Styling** : TailwindCSS + Radix UI
- **Animations** : Framer Motion
- **i18n** : next-intl
- **Thème** : next-themes (dark/light)
- **PDF** : @react-pdf/renderer
- **Package Manager** : pnpm

### Composants UI

Le projet utilise une collection complète de composants Radix UI :
- Accordion, Dialog, Dropdown Menu
- Tabs, Tooltip, Toast
- Form elements (Checkbox, Radio, Select, etc.)

---

## Subagents

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle les instructions mgrep dans son prompt.
