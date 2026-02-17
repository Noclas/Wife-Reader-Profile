const CACHE_NAME = 'wife-books-cache-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // agrega aquí otros recursos críticos si quieres:
  // './css/styles.css',
  // './js/app.js',
];

// Install: cachea archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate: limpieza de caches viejos si cambias versión
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch: intenta red, si falla, usa cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
