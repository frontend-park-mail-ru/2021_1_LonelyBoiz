const assetUrls = ['index.html', '/', '/main.js', '/login'];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('pickle').then(function (cache) {
            return cache.addAll(assetUrls);
        })
    );
});

self.addEventListener('fetch', function (event) {
    const { request } = event;
    const url = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return (
                response ||
                fetch(event.request).then((response) => {
                    if (
                        url.origin === location.origin ||
                        url.pathname === '/auth'
                    ) {
                        return caches
                            .open('pickle')
                            .then((cache) => {
                                return cache.put(request, response.clone());
                            })
                            .then(() => {
                                return response;
                            });
                    } else {
                        return response;
                    }
                })
            );
        })
    );
});
