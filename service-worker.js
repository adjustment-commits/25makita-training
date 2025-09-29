const CACHE_NAME = "training-app-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./style.css",   // もしCSSを分離していれば
  "./script.js",   // もしJSを分離していれば
  // ここに必要なイラスト画像ファイルも追加
];

// インストール時にキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// リクエスト時にキャッシュを返す
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
