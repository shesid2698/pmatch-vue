import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import { resolve } from 'chart.js/helpers';

// 輔助函數
const base64UrlEncode = str => {
    return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const hmacSHA256 = (data, secret) => {
    const hmac = CryptoJS.HmacSHA256(data, secret);
    return hmac.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

export const useJwtStore = defineStore('jwt', {
    state: () => ({
        token: null,
        secretKey: 'WmlIYWkgSldUIFNlY3JldCBLZXkgNTA5MjIzMTAgMjAyMw==',
        timeDifference: 0,
    }),

    actions: {
        async initializeTime() {
            // // 檢查是否已初始化
            // if (this.isTimeInitialized) {
            //     return; // 已經初始化過，不再重複執行
            // }

            // try {
            //     const response = await fetch(
            //         "https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Taipei"
            //     );

            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     }

            //     const data = await response.json();

            //     if (data && data.dateTime) {
            //         const serverTime = new Date(data.dateTime).getTime();
            //         const localTime = Date.now();

            //         // 計算時間差
            //         this.timeDifference = serverTime - localTime;

            //         // 檢查時間差是否在可接受範圍內（±20秒）
            //         if (Math.abs(this.timeDifference) <= 20000) {
            //         } else {
            //             // 時間差超出範圍，顯示警告
            //             alert(
            //                 "本地時間與服務器時間差異過大，請調整您的系統時間！"
            //             );
            //         }
            //     } else {
            //         throw new Error("API 返回無效數據");
            //     }
            // } catch (e) {
            //     console.error("初始化時間同步失敗:", e);
            //     // 失敗時設置誤差為0
            //     this.timeDifference = 0;
            // } finally {
            //     // 無論成功或失敗，都標記為已初始化
            //     this.isTimeInitialized = true;
            // }
            this.timeDifference = 0;
            this.isTimeInitialized = true;
        },
        async generateToken(customPayload = {}) {
            try {
                const decodedSecretKey = atob(this.secretKey);
                const header = {
                    alg: 'HS256',
                    typ: 'JWT',
                };

                // 直接獲取校正時間，不再檢查初始化狀態
                const timeTicks = await this.getRightTime();
                return new Promise(resolve => {
                    const now = Math.floor(timeTicks / 1000);
                    const payload = {
                        unique_name: '',
                        iat: now,
                        nbf: now,
                        exp: now + 20,
                        ...customPayload,
                    };

                    const encodedHeader = base64UrlEncode(JSON.stringify(header));
                    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

                    const signature = hmacSHA256(`${encodedHeader}.${encodedPayload}`, decodedSecretKey);

                    this.token = `${encodedHeader}.${encodedPayload}.${signature}`;
                    resolve(this.token);
                });
            } catch (error) {
                console.error('生成 JWT token 失敗:', error);
                throw error;
            }
        },

        getToken() {
            return this.token;
        },

        clearToken() {
            this.token = null;
        },

        // 獲取當前校正時間
        async getRightTime() {

            const { $axios } = useNuxtApp();
            const response = await $axios.get("/api/v1/Tool/T", null);
            if (response.data.UnixTimestamp) {
                return response.data.UnixTimestamp * 1000 + this.timeDifference;
            } else {
                return Date.now() + this.timeDifference;
            }

        },
    },
});
