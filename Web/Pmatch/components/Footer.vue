<template>
    <div
        class="w-100% flex justify-center items-center relative z-2 mt-15rem lg-mt-35rem pb-5rem footerBox"
    >
        <div class="max-w-1110px w-100% ps-5 pe-5">
            <div class="lg-flex">
                <div class="w-100% flex lg-justify-start justify-center mb-5">
                    <div>
                        <img
                        class="w-200px mb-2"
                        src="/images/logoWhite.png"
                        alt="pmatch頁尾Logo"
                    />
                    <p class="color-#fff m-0 text-center">© 2020~2024 版權所有</p>
                    <p class="color-#fff m-0 mb-2 text-center">PMatch 遊戲道具媒合網</p>
                    <div class="flex lg-justify-start justify-center">
                        <img src="/images/rapidSSL.gif" alt="ssl憑證" />
                    </div>
                    
                    </div>
                </div>
                <div class="flex w-100% mb-5">
                    <div class="w-50%">
                        <div
                            class="m-2 text-center"
                            v-for="(item, index) in footerLinkLeft"
                            :key="index"
                        >
                            <NuxtLink
                                class="color-#fff decoration-none"
                                :to="item.link"
                                >{{ item.title }}</NuxtLink
                            >
                        </div>
                    </div>
                    <div class="w-50%">
                        <div
                            class="m-2 text-center"
                            v-for="(item, index) in footerLinkRight"
                            :key="index"
                        >
                            <NuxtLink
                                class="color-#fff decoration-none"
                                :to="item.link"
                                >{{ item.title }}</NuxtLink
                            >
                        </div>
                    </div>
                </div>
                <div class="w-100% flex lg-justify-end justify-center">
                    <div class="m-2">
                        <p class="color-#fff mb-2 m-0 justify-center text-center">
                            客服信箱 : service@zihai.com.tw
                        </p>
                        <p class="color-#fff m-0 text-center">
                            客服時間 : 週一至週五0900〜1800
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const footerLinkLeft = ref([
    {
        id: 0,
        title: "首頁",
        link: "/",
    },
    {
        id: 1,
        title: "會員中心",
        link: "/member/center",
    },
    {
        id: 2,
        title: "幫助中心",
        link: "/helpcenter",
    },
    {
        id: 3,
        title: "找媒合",
        link: "/findmatch",
    },
    {
        id: 4,
        title: "登入/註冊",
        link: "/member/login",
    },
]);
const footerLinkRight = ref([
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
.footerBox {
    background-image: url("/images/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
}
</style>
