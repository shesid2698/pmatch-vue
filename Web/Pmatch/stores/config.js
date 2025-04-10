import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        baseUrl: '',
        envUrl: '',
        turnstilesitekey: '',
        googleClientId: '',
        lineClientId: '',
        lineSecret: '',
        lineReturnUrl: '',
    }),
    actions: {
        async loadConfig() {
            try {
                const response = await fetch('/config.json');
                const config = await response.json();
                this.baseUrl = config.baseUrl || '';
                this.envUrl = config.envUrl || '';
                this.turnstilesitekey = config.turnstilesitekey || '';
                this.googleClientId = config.googleClientId || '';
                this.lineClientId = config.lineClientId || '';
                this.lineSecret = config.lineSecret || '';
                this.lineReturnUrl = config.lineReturnUrl || '';
            } catch (error) {
                console.error('Failed to load config.json:', error);
                // 設定預設值以避免錯誤
                this.baseUrl = '';
                this.envUrl = '';
                this.turnstilesitekey = '';
                this.googleClientId = '';
                this.lineClientId = '';
                this.lineSecret = '';
                this.lineReturnUrl = '';
            }
        },
        initFacebook() {
            return new Promise(resolve => {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: '1152746759857296',
                        cookie: true,
                        xfbml: true,
                        version: 'v22.0',
                    });
                    resolve();
                };

                const script = document.createElement('script');
                script.src = 'https://connect.facebook.net/zh_TW/sdk.js';
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            });
        },
    },
});
