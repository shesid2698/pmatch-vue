
export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute();
    nuxtApp.vueApp.config.warnHandler = (msg, instance, info) => {
        console.warn('🟡 Vue 警告:', msg,instance,info)
        console.warn('🟡 警告位置',route.fullPath)
    }
    // 捕獲真正的運行時錯誤
    nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
        console.error('🔴 運行時錯誤:', err,instance, info)
        console.error('🔴 錯誤位置',route.fullPath)
    }
})