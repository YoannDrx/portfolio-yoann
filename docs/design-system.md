# Portfolio Yoann — design system

Le portfolio s'adresse aux recruteurs et responsables produit. Son positionnement est **« Dev React Native »**, avec React, Next.js et produit/UX comme spécialités complémentaires. Il reste distinct de la marque commerciale Yodev.

## Direction artistique

La référence est la DA claire et bleue du portfolio de production : minimalisme chaleureux, volumes souples, lumière atmosphérique et portrait noir et blanc détouré. Les évolutions doivent raffiner cette identité sans la transformer en template SaaS générique.

- Blanc chaud `#F5F5F7` et surfaces blanches
- Encre `#111827`
- Bleu principal `#2457E6`
- Bleu historique `#0070F3` et cyan atmosphérique `#00C4CC`
- Gris de lecture renforcé pour respecter le contraste AA
- Titres Space Grotesk, texte Inter, métadonnées Geist Mono
- Rayons généreux sur les cartes et capsules ; ombres uniquement sur les éléments élevés
- Halo bleu/cyan diffus derrière le portrait, jamais derrière du texte long

Il n'y a pas de navbar globale. Les contrôles Web/iPhone, langue et thème forment une capsule fixe indépendante du contenu. Sur desktop, le portrait est dimensionné pour que le bonnet reste entièrement sous cette capsule. Sur smartphone, la vue iPhone est affichée sans coque.

Les animations sont courtes et utiles : parallaxe léger du hero, alternance du texte de spécialité et transitions de cartes. Le contenu essentiel doit être visible dès la première frame et toutes les animations respectent `prefers-reduced-motion`.

## Identité en cours de sélection

Le symbole Y bleu/cyan historique reste l'identité active provisoire. Quatre pistes vectorielles sont disponibles dans `output/logos/` : Repère, Liaison YA, Mobile natif et Signal. Aucune piste ne doit remplacer les assets publics, le CV ou les images sociales avant validation explicite.

La vue web et la vue iPhone exposent les mêmes preuves : KLESIA, Jaji, Pressay, Jobio, MoodDay et MyCryptoPilot, puis le parcours complet. Tout chiffre doit rester vérifiable et chaque étude de cas explicite ses limites.
