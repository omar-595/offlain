const cacheName = 'offline-cache-v1';
const assetsToCache = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
    'images/image1.png',
    'images/image2.png',
    'images/image3.png'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Caching assets');
            return cache.addAll(assetsToCache);
        })
    );
});

// الاستجابة لطلبات الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // إذا كان الملف موجودًا في الكاش، قم بإرجاعه
            return cachedResponse || fetch(event.request);
        })
    );
});

// تحديث Service Worker عند تغيير الملفات المخزنة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cache) => cache !== cacheName).map((cache) => caches.delete(cache))
            );
        })
    );
});
