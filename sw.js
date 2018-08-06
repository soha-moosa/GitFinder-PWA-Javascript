var cacheName = 'Git-Followers-Cache-basic-01';
var dataCacheName = 'Git-Followers-Cache-01';


self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('cacheName').then(function(cache) {
        return cache.addAll([
            './css/searchForm.css',
            './css/style.css',
            './searchForm.html',
            './index.html',
            './images/image1.png',
            './js//searchForm.js',
            '/',
        ]);
      })
    );
  });

self.addEventListener('activate', function(e){
console.log('[Service Worker] Activate');
e.waitUntil(
    caches.keys().then(function(keyList){
        return Promise.all(keyList.map(function(key){
            if(key != cacheName){
                console.log("Removing old cache" , key);
                return caches.delete(key);
            }
        }));
    })
);
});

self.addEventListener("fetch", function(e){
    if(e.request.url.startsWith("https://api.github.com/users/")){
        console.log("[Service Worker] Fetch", e.request.url);
        caches.open(dataCacheName).then(function(cache){
            return fetch(e.request).then(function(response){
                cache.put(e.request, response.clone());
                return response;
            })
         })
    }
    else{
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
}
});


