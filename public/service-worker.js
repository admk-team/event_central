self.addEventListener('push', function (event) {
    const payload = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(payload.notification.title, {
            body: payload.notification.body,
            data: payload.notification.deep_link,
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.notification.data) {
        clients.openWindow(event.notification.data);
    }
});