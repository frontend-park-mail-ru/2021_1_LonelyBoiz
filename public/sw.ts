const assetUrls = ['index.html', '/', '/main.js', '/login'];

interface ExtendableEvent extends Event {
    waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response> | Response): Promise<Response>;
}

self.addEventListener('install', (e: ExtendableEvent): void => {
    e.waitUntil(
        caches.open('pickle').then((cache) => {
            return cache.addAll(assetUrls);
        })
    );
});

self.addEventListener('fetch', (e: FetchEvent): void => {
    const { request } = e;
    const url = new URL(e.request.url);
    if (url.origin === location.origin && url.pathname.indexOf('.') !== -1) {
        e.respondWith(cacheFirst(request));
    } else {
        e.respondWith(networkFirst(request));
    }
});

const cacheFirst = (request: Request): Promise<Response> => {
    return caches.match(request).then((cached) => {
        if (cached) {
            return cached;
        } else {
            return networkFirst(request);
        }
    });
};

const networkFirst = (request: Request): Promise<Response> => {
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
