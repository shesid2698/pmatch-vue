const runtime = useRuntimeConfig();
import { GoogleLogin } from 'vue3-google-login';
import { defineStore } from 'pinia';
export const useThirdPartyLoginStore = defineStore('thirdPartyLogin', {
    state: () => ({
        userInfo: '',
        category: 0,
    }),
    actions: {
        async loadConfig() {
            try {
                const response = await fetch('/config.json');
                const config = await response.json();
                this.baseUrl = config.baseUrl || '';
                this.envUrl = config.envUrl || '';
            } catch (error) {
                console.error('Failed to load config.json:', error);
                // 設定預設值以避免錯誤
                this.baseUrl = '';
                this.envUrl = '';
            }
        },
        async googleCallback(response) {
            try {
                const accessToken = response.access_token;
                await useFetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(async response => {
                        this.userInfo = response.data.value.sub;
                        this.category = 1;
                    })
                    .catch(error => {
                        console.error('Error fetching user info:', error);
                    });
            } catch (error) {
                console.error('google callback error..', error);
            }
        },
        async LineLogin() {
            let link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${runtime.public.lineClientId}&redirect_uri=${runtime.public.lineReturnUrl}&state=login&scope=openid%20profile`;
            window.open(
                link, // 網址
                '_blank', // 在新視窗開啟
                `width=500,height=550,left=${(screen.width - 500) / 2},top=${(screen.height - 550) / 2},resizable=yes`
            );
        },
    },
});
