
import { GoogleLogin } from 'vue3-google-login';
import { defineStore } from 'pinia';
import { useConfigStore } from '../stores/config.js';
export const useThirdPartyLoginStore = defineStore('thirdPartyLogin', {
    state: () => ({
        userInfo: '',
        category: 0,
    }),
    actions: {
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
            const config = useConfigStore();
            await config.loadConfig();
            let link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.lineClientId}&redirect_uri=${config.lineReturnUrl}&state=login&scope=openid%20profile`;
            window.open(
                link, // 網址
                '_blank', // 在新視窗開啟
                `width=500,height=550,left=${(screen.width - 500) / 2},top=${(screen.height - 550) / 2},resizable=yes`
            );
        },
    },
});
