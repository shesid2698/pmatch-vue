import axios from "axios";
import { useConfigStore } from "../stores/config.js";

export default defineNuxtPlugin(async() => {
  const configStore = useConfigStore();
  
  if (!configStore.baseUrl) {
    await configStore.loadConfig();
  }
  const axiosInstance = axios.create({
    baseURL: configStore.baseUrl, // 使用從 Pinia 載入的 baseUrl
    timeout: 12000,
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
