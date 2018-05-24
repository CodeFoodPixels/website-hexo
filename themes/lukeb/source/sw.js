'use strict';

// Based on Jeremy Keith's example https://gist.github.com/adactio/fbaa3a5952774553f5e7
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/

(function () {

    // Update 'version' if you need to refresh the cache
    const version = '1.0.0';

    // Store core files in a cache (including a page to display when offline)
    function updateStaticCache() {
        return caches.open(`lukeb@${version}`)
            .then((cache) => {
                cache.addAll([
                    '/about/',
                    '/projects/'
                ]);

                return cache.addAll([
                    '/js/easter.js',
                    '/css/styles.css',
                    '/css/pressstart2p-webfont.woff2',
                    '/img/asteroid.png',
                    '/img/spaceship.png',
                    '/img/stars.png',
                    '/',
                    '/offline/'
                ]);
            });
    };

    self.addEventListener('install', (event) => {
        event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
    });

    self.addEventListener('activate', (event) => {
        event.waitUntil(
            caches.keys()
            .then((keys) => {
                // Remove caches whose name is no longer valid
                return Promise.all(keys
                    .filter((key) => {
                        return key.indexOf(`@${version}`) === -1;
                    })
                    .map((key) => {
                        return caches.delete(key);
                    })
                );
            })
        );
    });

    self.addEventListener('fetch', (event) => {
        const request = event.request;
        // Always fetch non-GET requests from the network
        if (request.method !== 'GET') {
            event.respondWith(
                fetch(request)
                .catch(() => {
                    return caches.match('/offline/');
                })
            );
            return;
        }

        // For HTML requests, try the network first, fall back to the cache, finally the offline page
        if (request.headers.get('Accept').indexOf('text/html') !== -1) {
            // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
            if (request.mode != 'navigate') {
                request = new Request(request.url, {
                    method: 'GET',
                    headers: request.headers,
                    mode: request.mode,
                    credentials: request.credentials,
                    redirect: request.redirect
                });
            }
            event.respondWith(
                fetch(request)
                .then((response) => {
                    // Stash a copy of this page in the cache
                    const copy = response.clone();
                    caches.open(`lukeb@${version}`)
                        .then((cache) => {
                            cache.put(request, copy);
                        });
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then((response) => {
                            return response || caches.match('/offline/');
                        })
                })
            );
            return;
        }

        // For non-HTML requests, look in the cache first, fall back to the network
        event.respondWith(
            caches.match(request)
            .then((response) => {
                return response || fetch(request).then((response) => {
                        // Stash a copy of this page in the cache
                        const copy = response.clone();
                        caches.open(`lukeb@${version}`)
                            .then((cache) => {
                                cache.put(request, copy);
                            });
                        return response;
                    }).catch(() => {
                        // If the request is for an image, show an offline placeholder
                        if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
                            return new Response('<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {
                                headers: {
                                    'Content-Type': 'image/svg+xml'
                                }
                            });
                        }
                    });
            })
        );
    });
})();
