export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@unocss/nuxt",
        "@element-plus/nuxt",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    css: ["element-plus/dist/index.css"],
    imports: {
        dirs: ["stores"],
    },
    experimental: {
        appManifest: false,
    },
    app: {
        head: {
            script: [
                {
                    hid: "gtm",
                    children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TBHCXFCD');
`,
                    type: "text/javascript",
                },
            ],
        },
    },
});
