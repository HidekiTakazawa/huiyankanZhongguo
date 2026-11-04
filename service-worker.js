// キャッシュするファイルの名前とバージョンを定義
const CACHE_NAME = 'huiyankanzhongguo-app-showcase-v10';
// キャッシュするファイルのリスト
const urlsToCache = [
  './', // index.html を示す
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
  // 注意: 紹介しているアプリの画像 (images/ フォルダ内の画像) は、数が多いとキャッシュサイズが
  // 大きくなるため、ここではキャッシュ対象に含めていません。
  // 含めたい場合は、'./images/app1_screen1.png', のようにリストに追加します。
];

// 1. インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        // ★重要: ブラウザのHTTPキャッシュ（古いファイル）を無視してサーバーから最新を取得してキャッシュする
        return Promise.all(
          urlsToCache.map((url) =>
            fetch(new Request(url, { cache: 'reload' })).then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
              }
              return cache.put(url, response);
            })
          )
        );
      })
  );
});

// ★★★ 追加: メッセージを受け取ったら skipWaiting を実行するリスナー ★★★
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 2. フェッチイベント（リクエストがあった場合）の処理
self.addEventListener('fetch', (event) => {
  // chrome-extension:// スキームのリクエストはキャッシュ対象外にする
  if (event.request.url.startsWith('chrome-extension://')) {
    return; // 何もせず、ブラウザのデフォルトのフェッチ動作に任せる
  }

  // ナビゲーションリクエスト（ページの読み込み）の場合
  if (event.request.mode === 'navigate') {
    // 常にネットワークからの最新取得を優先する（HTTPキャッシュも再検証）
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('./index.html', responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // オフラインの場合はキャッシュから index.html を返す
          return caches.match('./index.html');
        })
    );
    return;
  }

  // ナビゲーションリクエスト以外（CSS, JS, 画像など）の場合
  // 現在のバージョンのキャッシュ（CACHE_NAME）から優先して返す
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // キャッシュにあればそれを返す
        if (response) {
          return response;
        }
        // キャッシュになければネットワークから取得し、キャッシュに追加
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        });
      });
    })
  );
});

// activateイベント
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients.');
      return self.clients.claim();
    })
  );
});
