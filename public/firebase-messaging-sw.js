/* eslint-env serviceworker */
/* global firebase */



importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');

// Firebase 構成情報
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

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
