self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('chumonOoi').then(function(cache) {
      return cache.addAll([
        '/',
        '/service-worker.js',
        '/home.html',
        '/manifest.json',
        '/css/style.css',
        '/data/chumon.txt',
        '/scripts/jquery.js',
        '/scripts/reader.js'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(caches.match(event.request));
});
