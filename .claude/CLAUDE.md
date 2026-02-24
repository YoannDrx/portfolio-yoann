# CLAUDE.md

Ce fichier fournit des instructions à Claude Code pour ce projet.

---

## grepai - OBLIGATOIRE

**Tu DOIS utiliser les commandes CLI grepai pour TOUTE recherche de code.**

- ❌ INTERDIT : Grep, Glob, grep, find, rg, outils MCP grepai
- ✅ OBLIGATOIRE : `grepai search "query"` via Bash

Voir `~/.claude/CLAUDE.md` pour les instructions complètes.

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

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript
- **Styling** : TailwindCSS + Radix UI
- **Animations** : CSS pur (animations iOS spring, stagger)
- **i18n** : Implémentation custom (I18nProvider)
- **Thème** : next-themes (dark/light)
- **PDF** : Rendu HTML → Playwright (screenshot/PDF)
- **Package Manager** : pnpm

### Composants UI

Le projet utilise une collection complète de composants Radix UI :
- Accordion, Dialog, Dropdown Menu
- Tabs, Tooltip, Toast
- Form elements (Checkbox, Radio, Select, etc.)

---

## Subagents

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle les instructions grepai dans son prompt.
