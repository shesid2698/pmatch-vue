export default defineNuxtConfig({
    // 確保 SSR 啟用
    ssr: true,
    devtools: { enabled: true },
    modules: ['@unocss/nuxt', '@element-plus/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/icon', 'v-gsap-nuxt'],
    nitro: {
        prerender: {
            crawlLinks: true,
        },
    },
    css: ['element-plus/dist/index.css'],
    imports: {
        dirs: ['stores'],
    },
    experimental: {
        payloadExtraction: false,
    },
    app: {
        head: {
            script: [
                {
                    key: 'gtm',
                    innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TBHCXFCD');
`,
                    type: 'text/javascript',
                },
            ],
        },
    },
    compatibilityDate: '2025-01-20',
    experimental: {
        appManifest: false
    }
});