// 使用 CDN 引入 Firebase 核心與 Messaging (這是 Service Worker 的標準寫法)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// 1. 初始化 Firebase (填入您剛剛提供的 Config)
firebase.initializeApp({
  apiKey: "AIzaSyB7JxRjM7h0KEUuwm1gM5JUDoKQ6Dqtwtc",
  authDomain: "pmatch-3ea5d.firebaseapp.com",
  projectId: "pmatch-3ea5d",
  storageBucket: "pmatch-3ea5d.firebasestorage.app",
  messagingSenderId: "561692466410",
  appId: "1:561692466410:web:75b182dd8e64303ecd4b93",
  measurementId: "G-3WDYF48V27"
});

// 2. 初始化 Messaging
const messaging = firebase.messaging();

// 3. 設定背景接收通知的行為
messaging.onBackgroundMessage((payload) => {
  console.log('[Service Worker] 收到背景通知:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png', // 請確保 public 資料夾裡有一張 icon.png
    data: {
        url: '/' 
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 4. 點擊通知後的行為
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});