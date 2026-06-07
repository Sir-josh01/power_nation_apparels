const CACHE_NAME = 'apparel-store-v2';
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

// Activate Event - Force flushes older cache versions
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

// NETWORK-FIRST STRATEGY INTERCEPT
self.addEventListener('fetch', event => {
    event.respondWith(
        // 1. Always attempt to hit the network first
        fetch(event.request)
            .then(networkResponse => {
                // If response is invalid, send it straight to the browser
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                // 2. Dynamically cache or update styles and media files as you work
                if (
                    event.request.url.includes('/images/') || 
                    event.request.url.includes('images.unsplash.com') || 
                    event.request.url.includes('tailwindcss.com') ||
                    event.request.url.endsWith('.html') ||
                    event.request.url.endsWith('.js')
                ) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }

                return networkResponse;
            })
            .catch(() => {
                // 3. FALLBACK: Network failed (offline). Serve the asset from cache instead!
                return caches.match(event.request);
            })
    );
});