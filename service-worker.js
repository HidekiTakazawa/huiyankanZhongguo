// キャッシュするファイルの名前とバージョンを定義
const CACHE_NAME = 'huiyankanzhongguo-app-showcase-v4';
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
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // ★追加: 新しいサービスワーカーが待機状態に入ったらすぐに有効化を試みる
  // self.skipWaiting(); 
});
// ★★★ 追加: メッセージを受け取ったら skipWaiting を実行するリスナー ★★★
// messageイベントリスナーを拡張
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 2. フェッチイベント（リクエストがあった場合）の処理
self.addEventListener('fetch', (event) => {
  // ★★★ ここからが重要な変更点 ★★★

  // chrome-extension:// スキームのリクエストはキャッシュ対象外にする
  if (event.request.url.startsWith('chrome-extension://')) {
    return; // 何もせず、ブラウザのデフォルトのフェッチ動作に任せる
  }


  // ナビゲーションリクエスト（ページの読み込み）の場合
  if (event.request.mode === 'navigate') {
    // 常にネットワークからの取得を優先する（ネットワークファースト戦略）
    event.respondWith(
      fetch(event.request).catch(() => {
        // オフラインの場合はキャッシュから index.html を返す
        return caches.match('./index.html');
      })
    );
    return;
  }

  // ナビゲーションリクエスト以外（CSS, JS, 画像など）の場合
  // キャッシュファースト戦略
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュにあればそれを返す
      if (response) {
        return response;
      }
      // キャッシュになければネットワークから取得し、キャッシュに追加
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
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
      // ★★★ clients.claim() は、開かれている全てのクライアントに即座に通知を送るわけではない。
      // ★★★ そのため、この後、ページ側と連携してリロードするのが確実。
      return self.clients.claim();
    })
  );
});