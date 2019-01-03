var cacheName = 'Git-Followers-Cache-basic-01';
var dataCacheName = 'Git-Followers-Cache-01';

// ===== Install the Service Worker ===== //

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './css/searchForm.css',
        './css/style.css',
        './searchForm.html',
        './index.html',
        './images/image1.png',
        './js/searchForm.js',
        '/'
      ]);
    })
  );
});

// ===== Activate the Service Worker ===== //
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key != cacheName) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// ===== Fetch ===== //
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('https://api.github.com/users/')) {
    console.log('[Service Worker] Fetch', event.request.url);
    caches.open(dataCacheName).then(cache => {
      return fetch(event.request).then(response => {
        cache.put(event.request, response.clone());
        return response;
      });
    });
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
