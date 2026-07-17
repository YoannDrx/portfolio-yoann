# Portfolio Yoann

Portfolio recruteur de développeur produit React / Next.js : architecture, UX, qualité et livraison du prototype à la production. Le simulateur iPhone reste une vue interactive optionnelle ; la lecture éditoriale web est l'entrée par défaut.

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **PWA** : Service Worker + manifest
- **Emails** : Resend

## Installation

```bash
# Cloner le repo
git clone git@github.com:YoannDrx/portfolio-yoann.git
cd portfolio-yoann

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev
```

## Variables d'environnement

Copier `.env.example` vers `.env` et configurer :

```bash
RESEND_API_KEY="re_xxxxx"
CONTACT_EMAIL="ton@email.com"
```

## Déploiement

Le projet est configuré pour Vercel :

```bash
pnpm build
```

## URL de production

https://yoann-andrieux.fr
