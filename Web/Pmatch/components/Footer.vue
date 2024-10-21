<template>
    <div class="bg-#423a52 w-100% h-280px flex items-center">
        <div class="max-w-1320px m-auto">
            <div class="footer flex justify-center">
                <div
                    class="footerItem"
                    v-for="item in footerLink"
                    :key="item.id"
                >
                    <NuxtLink
                        class="footerLink color-#fff decoration-none"
                        :to="item.link"
                        :title="item.title"
                        :alt="item.title"
                        >{{ item.title }}</NuxtLink
                    >
                    <span
                        class="m-2 color-#fff"
                        v-if="item.id !== footerLink.length - 1"
                    >
                        |
                    </span>
                </div>
            </div>
            <div
                class="color-#fff flex items-center justify-around max-w-700px m-auto mt-5"
            >
                <div>
                    <img src="/images/rapidSSL.gif" alt="ssl憑證小圖" />
                </div>
                <div>
                    <p class="m-0">
                        客服信箱 :
                        <a
                            class="color-#fff decoration-none"
                            href="mailto:service@zihai.com.tw"
                            >service@zihai.com.tw</a
                        >
                    </p>
                    <p class="m-0">客服時間 : 週一至週五0900〜18:00</p>
                </div>
            </div>
            <div class="color-#fff mt-5">
                <p class="m-0 text-center">
                    Copyright &copy; 2020~2024 版權所有 PMatch遊戲道具媒合網
                </p>
                <p class="m-0 text-center">
                    本網站支援Edge Firefox及Chrome,最佳瀏覧解析度為1024x768
                </p>
                <p class="m-0 text-center">版號 v5.1.1</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const footerLink = ref([
    {
        id: 0,
        title: "關於我們",
        link: "/company/about",
    },
    {
        id: 1,
        title: "服務條款",
        link: "/company/service",
    },
    {
        id: 2,
        title: "免責聲明",
        link: "/company/disclaimer",
    },
    {
        id: 3,
        title: "隱私權聲明",
        link: "/company/privacy",
    },
    {
        id: 4,
        title: "幫助中心",
        link: "/helpcenter",
    },
    {
        id: 5,
        title: "聯絡我們",
        link: "/contact",
    },
]);
</script>

<style scoped>
.footerLink:hover {
    color: #ddd;
}
.footer {
    flex-wrap: wrap;
}
</style>
