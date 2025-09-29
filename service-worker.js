const CACHE_NAME = "training-cache-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./img/icon-192.png",
  "./img/icon-512.png"
];

// インストール（キャッシュ登録）
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 有効化（古いキャッシュ削除）
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// fetch イベントでキャッシュ利用
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
