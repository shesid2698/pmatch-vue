import vue3GoogleLogin from 'vue3-google-login';
import { useConfigStore } from '../stores/config.js';
export default defineNuxtPlugin(nuxtApp => {
  const config = useConfigStore();
    if (process.client) {
        nuxtApp.vueApp.use(vue3GoogleLogin, {
            clientId: config.googleClientId,
        });
    }
});
