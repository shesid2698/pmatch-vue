import { defineStore } from 'pinia';
import jwt from 'jwt-simple';
import { Buffer } from 'buffer';

export const useGuestTokenStore = defineStore("guestToken", {
    state: () => ({
        token: null, // 儲存 JWT Token
    }),
    actions: {
        async fetchToken(strUserName = "", iExpireMinutes = 10) {
            try {
                const m_strSecret = "WmlIYWkgSldUIFNlY3JldCBLZXkgNTA5MjIzMTAgMjAyMw==";
                const symmetricKey = Buffer.from(m_strSecret, "base64");

                const payload = { unique_name: strUserName };
                const options = {
                    algorithm: "HS256",
                    expiresIn: `${iExpireMinutes}s`,
                    notBefore: "0s",
                };

                const token = jwt.encode(payload, symmetricKey, options);

                this.token = token; // 儲存在 Store 狀態中
                return token; // 返回 Token 給調用者
            } catch (error) {
                console.error("獲取 Token 失敗：", error);
                throw error; // 傳遞錯誤
            }
        },
    },
});

