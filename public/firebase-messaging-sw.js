/* eslint-env serviceworker */
/* global firebase */



importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');

// Firebase 構成情報
const firebaseConfig = {
  apiKey: "AIzaSyBJS4vl9KGH5qPIIGv6aMBNhV4bSMStyGs",
  authDomain: "schedular-412113.firebaseapp.com",
  projectId: "schedular-412113",
  storageBucket: "schedular-412113.appspot.com",
  messagingSenderId: "860429400662",
  appId: "1:860429400662:web:ea6b26102be323177f19f7",
  measurementId: "G-6VRDPLPHDT"
};

// Firebase を初期化
firebase.initializeApp(firebaseConfig);

// Firebase Messaging を初期化
const messaging = firebase.messaging();

// バックグラウンドメッセージの受信設定


/* eslint-disable no-restricted-globals */

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  console.log(payload.data)
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/logo192.png'  // 通知アイコンのパスを指定
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

});

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();  // 通知を閉じる

  // 通知のクリックで指定されたURLを開く
  const url = '/';
  event.waitUntil(
    clients.openWindow(url)  // 指定されたURLを開く
  );
});
/* eslint-enable no-restricted-globals */
