import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';

// 輔助函數
const base64UrlEncode = (str) => {
    return btoa(str)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

const hmacSHA256 = (data, secret) => {
    const hmac = CryptoJS.HmacSHA256(data, secret);
    return hmac
        .toString(CryptoJS.enc.Base64)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

export const useJwtStore = defineStore('jwt', {
    state: () => ({
        token: null,
        secretKey: "WmlIYWkgSldUIFNlY3JldCBLZXkgNTA5MjIzMTAgMjAyMw==",
    }),

    actions: {
        async generateToken(customPayload = {}) {
            try {
                const decodedSecretKey = atob(this.secretKey);
                const header = {
                    alg: "HS256",
                    typ: "JWT",
                };

                const now = Math.floor(Date.now() / 1000);
                const payload = {
                    unique_name: "",
                    iat: now,
                    nbf: now,
                    exp: now + 10,
                    ...customPayload
                };

                const encodedHeader = base64UrlEncode(JSON.stringify(header));
                const encodedPayload = base64UrlEncode(JSON.stringify(payload));

                const signature = hmacSHA256(
                    `${encodedHeader}.${encodedPayload}`,
                    decodedSecretKey
                );

                this.token = `${encodedHeader}.${encodedPayload}.${signature}`;
                return this.token;
            } catch (error) {
                console.error("生成 JWT token 失敗:", error);
                throw error;
            }
        },

        getToken() {
            return this.token;
        },

        clearToken() {
            this.token = null;
        }
    }
});
