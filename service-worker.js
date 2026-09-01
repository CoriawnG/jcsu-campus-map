const CACHE_NAME = "jcsu-campus-map-v20260901-basemap-picker-label-units";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css?v=20260901-basemap-picker-label-units",
  "./locations.js?v=20260901-basemap-picker-label-units",
  "./paths.js?v=20260901-basemap-picker-label-units",
  "./navigation.js?v=20260901-basemap-picker-label-units",
  "./script.js?v=20260901-basemap-picker-label-units",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/golden-bull-logo.png",
  "./icons/golden-bull-logo-transparent.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }

          return networkResponse;
        })
        .catch(() => cachedResponse || caches.match("./index.html"));

      return cachedResponse || fetchPromise;
    })
  );
});
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
