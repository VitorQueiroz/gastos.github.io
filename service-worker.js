const CACHE_NAME = 'gastos-app-v1';
const urlsToCache = [
    'gastos.html',
'manifest.json',
'icone.png',
'icone512.png'
];

// Instala o Service Worker e armazena os arquivos em cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache aberto');
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepta as requisições de rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Se o arquivo estiver no cache, retorna a versão em cache
            if (response) {
                return response;
            }
            // Caso contrário, faz a requisição de rede
            return fetch(event.request);
        })
    );
});

// Ativa o Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Deleta caches antigos
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
