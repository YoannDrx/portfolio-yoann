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
npm install

# Lancer en développement
npm run dev
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
npm run build
```

## URL de production

https://yoann-andrieux.fr
