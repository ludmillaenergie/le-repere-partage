// Le Repère : réception de la notification du matin.
// Le message est fixe : aucun texte personnel ne voyage par le service de notification.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("Le Repère", {
      body: "Ton énergie du jour est prête.",
      icon: "icon-192.png",
      badge: "favicon-32x32.png",
      tag: "repere-matin",
      renotify: false
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) {
      if ("focus" in c) return c.focus();
    }
    return self.clients.openWindow("./");
  })());
});
