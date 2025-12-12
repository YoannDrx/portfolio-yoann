/**
 * Service Worker Registration
 * Enregistre et gère les mises à jour du Service Worker
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Workers non supportés');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[SW] Service Worker enregistré avec succès');

      // Vérifier les mises à jour périodiquement (toutes les heures)
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Écouter les mises à jour
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // Nouvelle version disponible
              console.log('[SW] Nouvelle version disponible');

              // Optionnel : notifier l'utilisateur
              if (window.confirm('Une nouvelle version est disponible. Recharger ?')) {
                newWorker.postMessage('skipWaiting');
                window.location.reload();
              }
            }
          });
        }
      });

      // Écouter quand le SW prend le contrôle
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW] Nouveau Service Worker actif');
      });

    } catch (error) {
      console.error('[SW] Erreur d\'enregistrement:', error);
    }
  });
}

/**
 * Désinscrire le Service Worker (utile pour le dev)
 */
export async function unregisterServiceWorker() {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
    console.log('[SW] Service Worker désinscrit');
  }
}
