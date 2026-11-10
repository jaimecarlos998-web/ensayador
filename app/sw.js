/* Service worker del Ensayador: todo queda guardado en el teléfono. */
const CACHE = 'ensayapp-5d1b1173a4';
const PRECACHE = [
 "./",
 "fonts/alfa-slab-one-latin-400-normal.woff2",
 "fonts/alfa-slab-one-latin-ext-400-normal.woff2",
 "fonts/barlow-semi-condensed-latin-500-normal.woff2",
 "fonts/barlow-semi-condensed-latin-600-normal.woff2",
 "fonts/barlow-semi-condensed-latin-700-normal.woff2",
 "fonts/barlow-semi-condensed-latin-ext-500-normal.woff2",
 "fonts/barlow-semi-condensed-latin-ext-600-normal.woff2",
 "fonts/barlow-semi-condensed-latin-ext-700-normal.woff2",
 "fonts/fonts.css",
 "fonts/literata-latin-400-italic.woff2",
 "fonts/literata-latin-400-normal.woff2",
 "fonts/literata-latin-600-normal.woff2",
 "fonts/literata-latin-ext-400-italic.woff2",
 "fonts/literata-latin-ext-400-normal.woff2",
 "fonts/literata-latin-ext-600-normal.woff2",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "index.html",
 "manifest.webmanifest",
 "vendor/pdf.min.js",
 "vendor/pdf.worker.min.js"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => (k.startsWith('ensayador-') || k.startsWith('ensayapp-')) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return;
  const shell = req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/') || url.pathname.endsWith('manifest.webmanifest');
  if(shell){
    // la página: se abre al toque desde el teléfono y se actualiza en segundo plano
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match('index.html', {ignoreSearch:true}) || await c.match('./', {ignoreSearch:true});
      const net = fetch(req).then(r => { if(r && r.ok && req.mode === 'navigate') c.put('index.html', r.clone()); return r; }).catch(() => null);
      if(hit){ e.waitUntil(net); return req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/') ? hit : (await caches.match(req) || hit); }
      return (await net) || Response.error();
    }));
    return;
  }
  // librerías, fuentes e íconos: primero lo guardado
  e.respondWith(caches.match(req, {ignoreSearch:true}).then(hit => hit || fetch(req).then(r => {
    if(r && r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return r;
  })));
});
