import axios from 'axios';

// 建立 Axios 實例
const axiosInstance = axios.create({
  baseURL: 'http://192.168.10.206:2310', // 替換為你的 API 基本 URL
  timeout: 5000, // 請求逾時時間
});

// 定義插件
export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: axiosInstance, // 將 Axios 實例注入 Nuxt
    },
  };
});