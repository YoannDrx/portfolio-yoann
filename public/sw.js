/**
 * Service Worker - Portfolio Yoann Andrieux
 * Stratégies de cache intelligentes pour PWA offline
 */

const CACHE_VERSION = 'v2';
const CACHE_NAMES = {
  core: `portfolio-yoann-core-${CACHE_VERSION}`,
  images: `portfolio-yoann-images-${CACHE_VERSION}`,
  fonts: `portfolio-yoann-fonts-${CACHE_VERSION}`,
};

// Assets critiques à pré-cacher (120 KB)
const CORE_ASSETS = [
  '/fr',
  '/en',
  '/fr/offline',
  '/en/offline',
  '/offline',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/images/avatar.jpg',
  '/fonts/Inter-Variable.woff2',
];

// ============================================
// INSTALL : Pré-cache des assets critiques
// ============================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAMES.core).then((cache) => {
      console.log('[SW] Pré-cache des assets critiques');
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Activation immédiate sans attendre les autres tabs
  self.skipWaiting();
});

// ============================================
// ACTIVATE : Nettoyage des vieux caches
// ============================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            // Supprimer les caches qui ne correspondent pas à la version actuelle
            return !Object.values(CACHE_NAMES).includes(key);
          })
          .map((key) => {
            console.log('[SW] Suppression ancien cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  // Prendre le contrôle de tous les clients immédiatement
  self.clients.claim();
});

// ============================================
// FETCH : Stratégies par type de ressource
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes chrome-extension, etc.
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // ---- API : Network-only (formulaire contact) ----
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // ---- Images : Cache-first ----
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)
  ) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.images));
    return;
  }

  // ---- Fonts : Cache-first ----
  if (
    request.destination === 'font' ||
    url.pathname.match(/\.(woff2?|ttf|otf|eot)$/i)
  ) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.fonts));
    return;
  }

  // ---- Navigation (HTML) : Network-first avec fallback offline ----
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithOffline(request));
    return;
  }

  // ---- Défaut (JS, CSS, etc.) : Stale-while-revalidate ----
  event.respondWith(staleWhileRevalidate(request, CACHE_NAMES.core));
});

// ============================================
// STRATÉGIES DE CACHE
// ============================================

/**
 * Cache-First : Retourne le cache si disponible, sinon fetch et cache
 * Utilisé pour : Images, Fonts (ressources statiques)
 */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Retourner une réponse vide pour les images manquantes
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

/**
 * Network-First avec fallback Offline : Essaie le réseau d'abord
 * Si offline, retourne le cache ou la page /offline
 * Utilisé pour : Navigation (pages HTML)
 */
async function networkFirstWithOffline(request) {
  try {
    const response = await fetch(request);
    // Cacher la réponse pour usage offline futur
    const cache = await caches.open(CACHE_NAMES.core);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    // Offline : essayer le cache
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    // Aucun cache : retourner la page offline
    const { pathname } = new URL(request.url);
    const offlinePath = pathname.startsWith('/en') ? '/en/offline' : '/fr/offline';
    const offlineResponse = await caches.match(offlinePath);
    if (offlineResponse) return offlineResponse;
    return caches.match('/offline');
  }
}

/**
 * Stale-While-Revalidate : Retourne le cache immédiatement
 * et met à jour en arrière-plan
 * Utilisé pour : JS, CSS (ressources qui changent parfois)
 */
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        const cache = caches.open(cacheName);
        cache.then((c) => c.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => {
      // Erreur réseau, retourner null (on utilisera le cache)
      return null;
    });

  // Retourner le cache immédiatement, ou attendre le fetch
  return cached || fetchPromise;
}

// ============================================
// MESSAGE : Communication avec l'app
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker chargé - version', CACHE_VERSION);
