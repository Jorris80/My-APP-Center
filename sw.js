/* MY APP CENTER — Service Worker (offline shell + katalog publik) */
const VERSION = 'mac-v1.0.0';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 1) Halaman (navigasi): network-first, fallback ke shell offline
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // 2) Katalog publik GAS (?api=public): network-first, simpan salinan untuk offline
  if (url.searchParams.get('api') === 'public') {
    e.respondWith(
      fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('catalog-public', copy)); } return res; })
        .catch(() => caches.match('catalog-public').then((r) => r || new Response(JSON.stringify({ apps: [], categories: [] }), { headers: { 'Content-Type': 'application/json' } })))
    );
    return;
  }

  // 3) Aset statis milik repo sendiri: stale-while-revalidate
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => hit);
        return hit || net;
      })
    );
  }
  // 4) Lainnya (iframe GAS, Google Fonts, dll.) dibiarkan lewat jaringan.
});
