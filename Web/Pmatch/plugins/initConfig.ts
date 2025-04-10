import { useConfigStore } from '../stores/config.js';

export default defineNuxtPlugin(async () => {
    const configStore = useConfigStore();

    // 確保配置在應用啟動時載入
    if (!configStore.baseUrl) {
        await configStore.loadConfig();
    }
});
