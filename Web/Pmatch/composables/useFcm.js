import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const useFcm = () => {
    // 1. 您的 Firebase Config (請填入您剛剛複製的那一串)
    const firebaseConfig = {
        apiKey: "AIzaSyB7JxRjM7h0KEUuwm1gM5JUDoKQ6Dqtwtc",
        authDomain: "pmatch-3ea5d.firebaseapp.com",
        projectId: "pmatch-3ea5d",
        storageBucket: "pmatch-3ea5d.firebasestorage.app",
        messagingSenderId: "561692466410",
        appId: "1:561692466410:web:75b182dd8e64303ecd4b93",
        measurementId: "G-3WDYF48V27"
    };

    // 2. 初始化變數
    let messaging = null;

    // 3. 確保只在客戶端 (瀏覽器) 執行，避開 SSR 報錯
    if (process.client) {
        try {
            const app = initializeApp(firebaseConfig);
            messaging = getMessaging(app);
        } catch (e) {
            console.error("Firebase 初始化失敗:", e);
        }
    }

    // === 請求權限 ===
    const requestPermission = async () => {
        // 如果是在伺服器端或初始化失敗，直接跳出
        if (!process.client || !messaging) return;

        try {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                console.log('通知權限已允許');

                // ★★★ 這裡記得填入您的 VAPID Key (從 Firebase Console -> Cloud Messaging -> Web Config 產生) ★★★
                const vapidKey = "BKvSZTOjNd7YZASZxHnQEIP1z2a97g1o6XFojMZO8gW2clfyUegZ2wnA4Ihuz5zCaaob4KMheJMxhla8nCjHt7M";

                if (vapidKey === "請填入_您的_VAPID_KEY_PAIR") {
                    alert("請先在程式碼中填入 VAPID Key 才能測試！");
                    return;
                }

                const token = await getToken(messaging, { vapidKey });

                if (token) {
                    console.log('您的 FCM Token:', token);
                    // TODO: 呼叫 API 把 Token 存回資料庫
                } else {
                    console.log('無法取得 Token');
                }
            } else {
                alert('權限被拒絕');
            }
        } catch (error) {
            console.error('發生錯誤:', error);
            alert('發生錯誤，請看 Console');
        }
    };

    // === 監聽訊息 ===
    const listenToMessages = () => {
        if (!process.client || !messaging) return;

        onMessage(messaging, (payload) => {
            console.log('收到前台訊息:', payload);
            // Nuxt 3 內建的 alert 或使用其他 UI library
            alert(`[前台通知] ${payload.notification?.title}: ${payload.notification?.body}`);
        });
    };

    return {
        requestPermission,
        listenToMessages
    };
};