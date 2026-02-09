# Portfolio Yoann

Portfolio personnel de développeur React Native / Mobile.

## Stack technique

- **Framework** : Next.js 15 (App Router)
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

# Admin dashboard (prive)
ADMIN_SESSION_SECRET="change-me-with-a-long-random-secret"
```

## Dashboard admin prive

Le front public (`/fr` et `/en`) reste inchangé.

Un espace admin prive est disponible sur :

- `/admin/login` : connexion
- `/admin` : overview
- `/admin/offers` : matching annonce -> recommandations CV
- `/admin/cv-lab` : composition de CV cible
- `/admin/activities` : personas et evidence pack
- `/admin/applications` : suivi candidatures
- `/admin/content` : snapshots de contenu public

Notes :

- Auth via cookie HTTP-only signe.
- Les credentials admin (email/password) sont stockes en base locale (JSON store), pas dans `.env`.
- Seul `ADMIN_SESSION_SECRET` est requis dans `.env`.
- L'analyse d'offre actuelle est heuristique locale (mode evidence-first).
- Les donnees admin sont persistées localement dans `data/admin-store.json` (mode MVP).

## Déploiement

Le projet est configuré pour Vercel :

```bash
pnpm build
```

## URL de production

https://yoann-andrieux.fr
