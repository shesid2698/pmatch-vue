<template>
  <div class="w-100% flex justify-center items-center relative z-2 footerBox" :class="{ homeBackground: isHomePage }">
    <div class="max-w-1110px w-100% absolute bottom-100%">
      <div class="lg-flex ps-5 pe-5">
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
              版本號 : v6.4.5
            </p>
          </div>
        </div>
        <div class="flex w-100% mb-5">
          <div class="w-50%">
            <div class="m-2 text-center lg-text-start" v-for="(item, index) in footerLinkLeft" :key="index">
              <NuxtLink class="footerLink color-#fff decoration-none" :to="item.link">{{ item.title }}</NuxtLink>
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
    link: "/store",
  },
  {
    id: 1,
    title: "幫助中心",
    link: "/store/helpcenter",
  },
  // {
  //   id: 2,
  //   title: "",
  //   link: "/store/register",
  // },

]);
const footerLinkRight = ref([
  // {
  //     id: 0,
  //     title: "付費方案",
  //     link: "/store/program",
  // },
  // {
  //     id: 0,
  //     title: "付費方案",
  //     link: "/store/program",
  // },
]);
</script>

<style scoped>
.footerLink:hover {
  color: #ccc;
  text-decoration: underline;
  color: #ccc;
  text-decoration: underline;
}


.footer {
  flex-wrap: wrap;
  flex-wrap: wrap;
}


.homeBackground {
  background: rgba(0, 0, 0, 0);
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
  background-image: url("/images/waveTop.svg");
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;

}
</style>
