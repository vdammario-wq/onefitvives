const CACHE='onefitVIVES-v23';
const STATISCH=['./','./index.html','./manifest.json','./manifest-rood.json','./icon-192.png','./icon-512.png','./icon-192-rood.png','./icon-512-rood.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATISCH)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('index.html')){
    e.respondWith(
      fetch(e.request).then(r=>{const kopie=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',kopie));return r;})
      .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
