// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@unocss/nuxt', '@element-plus/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
    css: ['element-plus/dist/index.css'],
    imports: {
        dirs: ['stores'],
    },
});
