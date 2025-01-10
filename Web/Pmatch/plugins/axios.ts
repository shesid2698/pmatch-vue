import axios from 'axios';

// 建立 Axios 實例
const axiosInstance = axios.create({
  //baseURL: 'http://192.168.10.206:3310', // 206 URL
  // baseURL: 'http://localhost:2310', // docker URL
    baseURL: 'https://gwtest.pmatch.com.tw', // 外部IP URL  // MASTER 留正式環境
  

  timeout: 12000, // 請求逾時時間
});

// 定義插件
export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: axiosInstance, // 將 Axios 實例注入 Nuxt
    },
  };
});
