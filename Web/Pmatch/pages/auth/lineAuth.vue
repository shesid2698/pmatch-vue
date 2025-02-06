<template>
    <div>Line user verifying. Please wait...</div>
</template>
<script setup>
import { useConfigStore } from '../stores/config.js';
const route = useRoute();
const realCode = useState('realCode', () => route.query.code || '');
const config = useConfigStore();
const realUser = useState('realUser', () => null);
const verifiedUser = useState('verifiedUser', () => null);
(async () => {
    try {
        await config.loadConfig();
        // line登入後取得token
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: realCode.value,
            redirect_uri: config.lineReturnUrl,
            client_id: config.lineClientId,
            client_secret: config.lineSecret
        });
        const { data, error } = await useFetch('https://api.line.me/oauth2/v2.1/token', {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        if (error.value) {
            console.error('取得 Token 失敗:', error.value);
        } else {
            realUser.value = data.value;
        }
        // line登入後取得token

        // 驗證line使用者身分
        const params2 = new URLSearchParams({
            id_token: realUser.value.id_token,
            client_id: config.lineClientId
        });
        await useFetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            body: params2,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + realUser.value.access_token
            }
        })
            .then(data => {
                verifiedUser.value = data.data;
                localStorage.setItem('lineUserSub', verifiedUser.value.sub);
                window.close();
            })
            .catch(error => {
                console.error('驗證身分 失敗:', error.value);
            });
        // 驗證line使用者身分
    } catch (error) {
        console.log(error);
    }
})();
</script>
<style scoped></style>
