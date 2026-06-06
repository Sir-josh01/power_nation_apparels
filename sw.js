const CACHE_NAME = 'apparel-store-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js'
];

// Install Event - Store core structural assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Cache Intercept Policy (Cache-First strategy for images/CDN scripts)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then(networkResponse => {
                // Dynamically cache external catalog images and Tailwind CDN hits as they download
                if (event.request.url.includes('images.unsplash.com') || event.request.url.includes('tailwindcss.com')) {
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