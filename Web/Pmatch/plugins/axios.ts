import axios from "axios";
// 建立 Axios 實例
export default defineNuxtPlugin(async() => {
  let runtimeConfig = { baseUrl: "", envUrl: "" };

  // 確保只在瀏覽器環境執行
  if (typeof window !== "undefined") {
    try {
      const response = await fetch("/config.json");
      runtimeConfig = await response.json();
    } catch (error) {
      console.error("Failed to load config.json:", error);
    }
  }
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.baseUrl,
    timeout: 12000,
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
})
