# CLAUDE.md

Ce fichier fournit des instructions à Claude Code pour ce projet.

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
