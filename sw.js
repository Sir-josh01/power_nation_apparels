const CACHE_NAME = 'apparel-store-v2'; // 1. Bumped version to flush out old ghost caches
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. NEW: Activate Event (Force deletes 'apparel-store-v1' completely)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old stale cache block...', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Cache Intercept Policy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then(networkResponse => {
                // 3. UPDATED: Caches your new local images directory OR any online fallbacks dynamically
                if (
                    event.request.url.includes('/images/') || 
                    event.request.url.includes('images.unsplash.com') || 
                    event.request.url.includes('tailwindcss.com')
                ) {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            });
        })
    );
});