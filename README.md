# Portfolio Yoann

Portfolio recruteur de développeur produit React / Next.js : architecture, UX, qualité et livraison du prototype à la production. Le simulateur iPhone reste une vue interactive optionnelle ; la lecture éditoriale web est l'entrée par défaut.

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **PWA** : Service Worker + manifest
- **Emails** : Mail by Yodev, avec Resend conservé comme rollback manuel pendant le canari

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

Copier `.env.example` vers `.env.local` et configurer :

```bash
CONTACT_EMAIL_PROVIDER="yodev_mail"
CONTACT_EMAIL="ton@email.com"
CONTACT_FROM_EMAIL="portfolio-yoann@yodev.fr"
YODEV_MAIL_API_KEY="ym_test_xxxxx"
YODEV_MAIL_TEMPLATE_ID="00000000-0000-0000-0000-000000000000"
```

Le formulaire utilise un template transactionnel approuvé et transmet une clé
d'idempotence stable à Mail by Yodev. En cas d'incident, le rollback est manuel :
remettre `CONTACT_EMAIL_PROVIDER=resend` et redéployer. Un timeout ne déclenche
jamais automatiquement un second fournisseur.

## Déploiement

Le projet est configuré pour Vercel :

```bash
pnpm build
```

## URL de production

https://yoann-andrieux.fr
