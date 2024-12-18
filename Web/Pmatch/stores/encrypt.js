import { defineStore } from 'pinia';
export const useEncrypt = defineStore('encrypt', {
    state: () => ({}),
    actions: {
        encrypt(input) {
            // 1. 轉為UTF-8
            const utf8Bytes = new TextEncoder().encode(input);
            // 2. Base64編碼
            const base64String = btoa(String.fromCharCode(...utf8Bytes));
            // 3. 反轉Base64編碼後的字串
            const reversedBase64 = base64String.split('').reverse().join('');
            // 4. 結果
            return `e${reversedBase64}is`;
        },
        decrypt(input) {
            // 1. 去掉前綴 'e' 和後綴 'is'
            const trimmed = input.slice(1, -2);

            // 2. 反轉回原本的 Base64 字串
            const reversedBase64 = trimmed.split('').reverse().join('');

            // 3. 解碼 Base64 字串為 UTF-8 位元組
            const utf8Bytes = Uint8Array.from(atob(reversedBase64), char => char.charCodeAt(0));

            // 4. 將 UTF-8 位元組轉回原始字串
            const originalString = new TextDecoder().decode(utf8Bytes);

            return originalString;
        },
    },
});
