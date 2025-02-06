import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        baseUrl: '',
        envUrl: '',
        googleClientId: '',
        lineClientId: '',
        lineSecret: '',
        lineReturnUrl:'',
    }),
    actions: {
        async loadConfig() {
            try {
                const response = await fetch('/config.json');
                const config = await response.json();
                this.baseUrl = config.baseUrl || '';
                this.envUrl = config.envUrl || '';
                this.googleClientId = config.googleClientId || '';
                this.lineClientId = config.lineClientId || '';
                this.lineSecret = config.lineSecret || '';
                this.lineReturnUrl = config.lineReturnUrl || '';
            } catch (error) {
                console.error('Failed to load config.json:', error);
                // 設定預設值以避免錯誤
                this.baseUrl = '';
                this.envUrl = '';
                this.googleClientId = '';
                this.lineClientId = '';
                this.lineSecret = '';
                this.lineReturnUrl = '';
            }
        },
    },
});
