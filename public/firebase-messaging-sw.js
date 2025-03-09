// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD14lQYW1oUvozl-kUTVacAmndXeS9lNQU",
  authDomain: "rajatflix-3be48.firebaseapp.com",
  projectId: "rajatflix-3be48",
  storageBucket: "rajatflix-3be48.appspot.com",
  messagingSenderId: "696542563427",
  appId: "1:696542563427:web:ccc6e274f1873ed5f13c56",
  measurementId: "G-45S1MW3W72",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
const link = payload?.data?.link || "https://rajatflix.vercel.app/Home";
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    data: { url: link },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      const url = event.notification.data.url;
      if (!url) return;
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (client.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
