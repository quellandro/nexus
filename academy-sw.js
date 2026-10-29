'use strict';
const VERSION="mvti23xx";
const BASE=new URL('./',self.location.href);
const PREFIX='pwa-academy:'+BASE.pathname+':';
const CACHE=PREFIX+VERSION;
const ASSETS=["index.html","academy-app.webmanifest","academy-install.js","academy-mobile.css","academy-offline.html","academy-icons/icon-192.png","academy-icons/icon-512.png","academy-icons/apple-touch-icon.png","about.html","assets/favicon.svg","assets/main.js","assets/style.css","innovations.html"];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 // A failed optional file must not prevent the complete app from installing.
 for(let i=0;i<ASSETS.length;i+=8)await Promise.all(ASSETS.slice(i,i+8).map(async path=>{try{const url=new URL(path,BASE);const response=await fetch(url,{cache:'reload'});if(response.ok)await cache.put(url,response);else console.warn('PWA asset not cached:',path,response.status)}catch(error){console.warn('PWA asset unavailable:',path)}}));
 if(!await cache.match(new URL('academy-offline.html',BASE)))throw Error('Offline fallback could not be cached.');
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||url.search)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok&&['document','style','script','image','font'].includes(event.request.destination))await cache.put(event.request,response.clone());return response}catch(error){let cached=await cache.match(event.request);if(!cached&&url.pathname===BASE.pathname)cached=await cache.match(new URL('index.html',BASE))||await cache.match(new URL('index.htm',BASE));if(cached)return cached;if(event.request.mode==='navigate')return await cache.match(new URL('academy-offline.html',BASE));return Response.error()}})());
});
