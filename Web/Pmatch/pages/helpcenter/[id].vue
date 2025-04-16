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
          <div class="w-100% md:w-70% mr-10px">
              <div class="text-start content-center flex items-center newsContanier cursor-pointer">
                  <div class="mr-30px"><img src="/images/icon-Q&A.png" width="100" alt=""></div>
                  <div class="text-[#4361EE] text-24px">{{ item.Title }}</div>
              </div>
              <div class="newsContanier text-center" v-html="item.Content">
              </div>
              <div class="w-100% text-center mt-50px sid">
                  <button class="backBtn" @click="goToHelpCenter">回上層</button>
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

// 跳轉到 /helpcenter
const goToHelpCenter = () => {
    window.location.href = '/helpcenter';
};

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
</script>
<style scoped>
    .helpTitle {
        background: linear-gradient(to right, rgba(67, 97, 238), rgb(247, 37, 142));
        background: -webkit-linear-gradient(to right, rgba(67, 97, 238), rgb(247, 37, 142));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        width: fit-content;
        margin: 0 auto;
        margin-bottom: 15px;
        font-weight: 600;
    }

    .newsContanier {
        padding: 2rem 5px;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        &::before
        {
            content: '';
            position: absolute;
            inset: 0;
            border-width: 0;
            border-bottom-width: 3px;
            border-style: solid;
            border-color: transparent;
            background-image: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
            background-origin: border-box;
            mask-image: linear-gradient(white, white), linear-gradient(white, white);
            mask-clip: padding-box, border-box;
            mask-composite: exclude, add;
        }
    }

    .dot1 {
        position: absolute;
        width: 25%;
        right: 0;
        top: 0;
    }

    .dot2 {
        position: absolute;
        width: 25%;
        left: 0;
        top: 20%;
    }

    .dot3 {
        position: absolute;
        width: 25%;
        right: 0;
        top: 60%;
        transform: rotate(180deg);
    }

    .searchBoxContainer {
        width: 300px;
        height: 55px;
        background-color: transparent;
    }

    .searchBox {
        background-color: transparent;
        width: 100%;
        height: 100%;
        font-size: 25px;
        padding-left: 15px;
        padding-right: 55px;
        box-sizing: border-box;
        outline: none;
        border: none;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-radius: 2rem;
        background-image: linear-gradient(white, white), linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
    }

    .backBtn {
        width: 175px;
        aspect-ratio: 175/65;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-radius: 50px;
        font-size: 18px;
        background-image: linear-gradient(transparent, transparent), linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        color: white;
        cursor: pointer;
    }

        .backBtn:hover {
            background-image: linear-gradient(white, white), linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
            color: rgba(247, 37, 133);
        }

    @media screen and (max-width: 768px) {
        .searchBoxContainer {
            margin-top: 20px;
            width: 100%;
        }

        .dot1,
        .dot2,
        .dot3 {
            width: 70%;
        }
    }
</style>