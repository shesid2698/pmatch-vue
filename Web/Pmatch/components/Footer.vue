<template>
  <div class="w-100% flex justify-center items-center relative z-2  pt-17rem lg-pt-32rem pb-5rem footerBox"
    :class="{ homeBackground: isHomePage }">
    <div class="waveBottom absolute"></div>
    <div class="max-w-1110px w-100% ps-5 pe-5">
      <div class="lg-flex">
        <div class="w-100% flex lg-justify-start justify-center mb-5">
          <div>
            <img class="w-200px mb-2" src="/images/logoWhite.png" alt="pmatch頁尾Logo" />
            <p class="color-#fff m-0 text-center">
              © 2020~2025 版權所有
            </p>
            <p class="color-#fff m-0 mb-2 text-center">
              PMatch 遊戲道具交易平台
            </p>
            <p class="color-#fff m-0 text-center">
              版本號 : v6.3.2
            </p>
          </div>
        </div>
        <div class="flex w-100% mb-5">
          <div class="w-50%">
            <div class="m-2 text-center lg-text-start" v-for="(item, index) in footerLinkLeft" :key="index">
              <NuxtLink class="footerLink color-#fff decoration-none" :to="item.link" @click.prevent="scrollToTop(item.link)">{{ item.title }}</NuxtLink>
            </div>
          </div>
          <div class="w-50%">
            <div class="m-2 text-center lg-text-start" v-for="(item, index) in footerLinkRight" :key="index">
              <NuxtLink class="footerLink color-#fff decoration-none" :to="item.link">{{ item.title }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="w-100%">
          <div class=" flex lg-justify-start justify-center">
            <div class="mt-2">
              <p class="color-#fff mb-2 m-0 justify-center text-center lg-text-start">
                客服信箱 : service@zihai.com.tw
              </p>
              <p class="color-#fff m-0 text-center lg-text-start">
                客服時間 : 週一至週五09:00〜18:00
              </p>
            </div>
          </div>
          <div class="mt-2 flex lg-justify-start justify-center">
            <img class="w-100px" src="/images/positivessl_trust_seal_md_167x42.png" alt="ssl憑證" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const isHomePage = computed(() => route.path === "/");
const footerLinkLeft = ref([
  {
    id: 0,
    title: "首頁",
    link: "/",
  },
  {
    id: 2,
    title: "幫助中心",
    link: "/helpcenter",
  },
  {
    id: 3,
    title: "找媒合",
    link: "/gamelist",
  },
//  {
//    id: 4,
//    title: "登入/註冊",
//    link: "/member/login",
//  },
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

// 同router會滾到最上面
function scrollToTop(link) {
  if (link === route.path) {    
    window.scrollTo({ top: 0 }); // 有需要動畫可加 behavior:'smooth'
  }
}

</script>

<style scoped>
.footerLink:hover {
  color: #ccc;
  text-decoration: underline;
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
  z-index: 0;
}

.homeBackground {
  background: rgba(0, 0, 0, 0);
}

.waveBottom {
  background-image: url("/images/waveTop.svg");
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  pointer-events: none;
}
</style>
