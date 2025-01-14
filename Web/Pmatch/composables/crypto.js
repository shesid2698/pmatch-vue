import CryptoJS from 'crypto-js';
export default function useCryptTo() {
    const encrypt = txt => {
        let str = CryptoJS.AES.encrypt(txt, 'dwdsao6d5w67wojdihjvvc87xz6dw87678').toString();
        return str;
    };

    const decrypt = txt => {
        let str = CryptoJS.AES.decrypt(txt, 'dwdsao6d5w67wojdihjvvc87xz6dw87678').toString(CryptoJS.enc.Utf8);
        return str;
    };
    const md5 = txt => {
        let str = CryptoJS.MD5(txt).toString();
        return str;
    };
    const loginEncrypt = strText => {
        // Step 1: 將字串轉換成 UTF-8 編碼的 byte array
        const utf8Bytes = new TextEncoder().encode(strText);

        // Step 2: 將 byte array 轉換成 Base64 字串
        const base64String = btoa(String.fromCharCode(...utf8Bytes));

        // Step 3: 反轉 Base64 字串
        const reversedBase64 = base64String.split('').reverse().join('');

        // Step 4: 在字串前後加上 'e' 和 'is'
        return `e${reversedBase64}is`;
    };
    return {
        encrypt,
        decrypt,
        md5,
        loginEncrypt,
    };
}
