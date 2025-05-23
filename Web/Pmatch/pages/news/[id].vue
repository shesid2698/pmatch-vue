<template>
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
    <!-- 成功獲取資料時 -->
    <div v-for="(item, index) in newsItem" :key="index">
      <h2 class="color-#666">{{ item.Title }}</h2>
      <h4>{{ item.Summary }}</h4>
      <div class="detail">
        <div v-html="item.Content"></div>
        <div class="w-100% text-center mt-50px sid">
          <button class="backBtn" @click="goBack">回上層</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入的東西
import { defineAsyncComponent } from "vue";

import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

// 用路由的名字 help1、help2
const route = useRoute();
const routeParamId = route.params.id;
const newsItem = ref(null);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 取得GetNewsDetail
async function fetchNewsDetailData(token) {
  try {
    const response = await $axios.post(
      "/api/v1/Pmatch/GetNewsDetail",
      {
        MessageId: routeParamId,
      },
      {
        headers: {
          Authorization: token, // 帶上 Token
        },
      }
    );
    if (response.data.Status.Code === 0) {
      newsItem.value = response.data.Data;
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
    data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
  }
}
onMounted(async () => {
  try {
    if (userToken.value != "" && userToken.value != undefined) {
      const token = userToken.value;
      if (token != "") {
        fetchNewsDetailData(token);
      }
    } else {
      // 生成新的 token
      const token = await jwtStore.generateToken();
      if (token != "") {
        fetchNewsDetailData(token);
      }
    }
  } catch (error) {
    console.error("頁面初始化失敗:", error);
  }
});
const router = useRouter();
const goBack = () => {
  if (window.history.length <= 1) {
    // 代表是直接開這頁，沒上一頁可以返回
    router.push({ path: '/', query: { scrollToNews: '1' } });
  } else {
    router.back();
  }
};
</script>

<style scoped>
.detail {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
}
.backBtn {
  width: 175px;
  aspect-ratio: 175/65;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 50px;
  font-size: 18px;
  background-image: linear-gradient(transparent, transparent),
    linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  color: white;
  cursor: pointer;
}
.backBtn:hover {
  background-image: linear-gradient(white, white),
    linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  color: rgba(247, 37, 133);
}
</style>
