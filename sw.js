const CACHE_NAME = 'trading-pro-v1';

// Install Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('[Service Worker] បានដំឡើងរួចរាល់');
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('[Service Worker] កំពុងដំណើរការ');
});

// ឲ្យ Network រត់ធម្មតា ដើម្បីកុំឲ្យរំខានដល់ការ Sync របស់ Firebase
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request).catch(() => {
        // បើគ្មានសេវាអ៊ីនធឺណិត វាអាចនឹង Error ប៉ុន្តែ Firebase Offline នឹងជួយ back up ទិន្នន័យ
        return new Response('កម្មវិធីកំពុងស្ថិតក្នុង Offline Mode');
    }));
});