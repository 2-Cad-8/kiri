const assets = [
    "/",
    "css/stilos.css",
    "css/avatars_icons.css",
    "js/main_functions.js",
    
  ];

const KIRI_ASSETS = "kiri-assets";
self.addEventListener("install", (installEvt) => {
  installEvt.waitUntil(
    caches
      .open(KIRI_ASSETS)
      .then((cache) => {
        cache.addAll(assets);
      })
      .then(self.skipWaiting())
      .catch((e) => {
        console.log(e);
      })
  );
});

self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches
      .keys()
      .then((keysList) => {
        return Promise.all(
          keysList.map((key) => {
            if (key === KIRI_ASSETS) {
              console.log(`Removed old cache from ${key}`);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", function (evt) {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.open(KIRI_ASSETS).then((cache) => {
          return cache.match(evt.request);
        });
      })
    );
  })

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/kiri.serviceWorker.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }