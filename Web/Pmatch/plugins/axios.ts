import axios from "axios";
// 建立 Axios 實例
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const axiosInstance = axios.create({
    baseURL: config.public.baseUrl,
    timeout: 12000,
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
})
