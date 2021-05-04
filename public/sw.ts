const assetUrls = ['index.html', '/', '/main.js', '/login'];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('pickle').then((cache) => {
            return cache.addAll(assetUrls);
        })
    );
});

self.addEventListener('fetch', function (event) {
    const { request } = event;
    const url = new URL(event.request.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

const cacheFirst = (request) => {
    return caches.match(request).then((cached) => {
        if (cached) {
            return cached;
        } else {
            return networkFirst(request);
        }
    });
};

const networkFirst = (request) => {
    let gCache: Cache = null;
    return caches
        .open('pickle')
        .then((cache) => {
            gCache = cache;
            return fetch(request);
        })
        .then((response) => {
            if (request.method === 'GET') {
                gCache.put(request, response.clone());
            }
            return response;
        });
};
