<template>

  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <div class="dot1">
    <img src="/images/bg-dot03.png" width="100%" alt="">
  </div>
  <div class="dot2">
    <img src="/images/bg-dot04.png" width="100%" alt="">
  </div>
  <div class="dot3">
    <img src="/images/corner.png" width="100%" alt="">
  </div>

  <div class="max-w-1110px m-auto pt-80px ps-5 pe-5 relative z-2">
    <div class="text-60px text-center helpTitle">幫助中心</div>
    <div class="m-y-0 m-x-auto w-fit"><img src="/images/img-Q&A.png" width="110" alt=""></div>
    <div class="md:flex flex-none flex-row-reverse">
      <div class="w-100% text-center md:w-30% pl-0 md:pl-20px">
        <div class="relative searchBoxContainer">
          <input type="text" class="searchBox" v-model="searchQuery" placeholder="請輸入關鍵字">
          <span class="absolute top-50% transform-translate-y-[-45%] right-20px cursor-pointer"
            @click="GetSearchQuery"><img src="/images/searchIcon.png" width="30" alt=""></span>
        </div>
      </div>
      <div class="w-100% md:w-70% mr-10px" v-if="!newsDetail">
        <!-- <NuxtLink :to="`/helpcenter/${news.Id}`"
                          class="decoration-none"
                          v-for="news in showList"
                          v-if="newsList!=null && newsList.length>0">
                    <div class="text-start content-center flex items-center newsContanier">
                        <div class="mr-30px"><img src="/images/icon-Q&A.png"
                                 width="100"
                                 alt=""></div>
                        <div class="text-[#4361EE] text-24px">{{news.Title}}</div>
                    </div>
                </NuxtLink> -->

        <div class="text-start content-center flex items-center newsContanier cursor-pointer"
          @click="GetNewsDetail(news.Id)" v-for="news in showList" v-if="newsList != null && newsList.length > 0">
          <div class="mr-30px"><img src="/images/icon-Q&A.png" width="100" alt=""></div>
          <div class="text-[#4361EE] text-24px">{{ news.Title }}</div>
        </div>

      </div>
      <div v-else class="w-100% md:w-70% mr-10px">
        <div class="text-start content-center flex items-center newsContanier cursor-pointer">
          <div class="mr-30px"><img src="/images/icon-Q&A.png" width="100" alt=""></div>
          <div class="text-[#4361EE] text-24px">{{ newsDetail.Title }}</div>
        </div>
        <div class="newsContanier" v-html="content">
        </div>
        <div class="w-100% text-center mt-50px sid">
          <button class="backBtn" @click="GetSearchQuery">回上層</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入的東西
import { ArrowRight } from '@element-plus/icons-vue';
import { ElBreadcrumb } from 'element-plus';
import { ElBreadcrumbItem } from 'element-plus';

import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const newsList = ref([]);
const showList = ref([]);
const content = ref('');
const newsDetail = ref(null);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie('_PmToken');

// 取得GetNewsList
async function fetchNewsListData(token) {
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetNewsList',
      {
        Categorys: [3]
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      newsList.value = response.data.Data;
      showList.value = newsList.value;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
const GetNewsDetail = id => {
  newsDetail.value = showList.value.find(x => x.Id == id);
  content.value = newsDetail.value.Content;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
onMounted(async () => {
  try {
    if (userToken.value != '' && userToken.value != undefined) {
      const token = userToken.value;
      if (token != '') {
        fetchNewsListData(token);
      }
    } else {
      // 生成新的 token
      const token = await jwtStore.generateToken();
      if (token != '') {
        fetchNewsListData(token);
      }
    }
  } catch (error) {
    console.error('頁面初始化失敗:', error);
  }
});

// 搜尋關鍵字
const searchQuery = ref('');
const GetSearchQuery = () => {
  showList.value = newsList.value;
  if (searchQuery.value) {
    const Query = searchQuery.value.toLowerCase();
    showList.value = newsList.value.filter(help => help.Title.toLowerCase().includes(Query));
  }
  newsDetail.value = null;
};
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

  &::before {
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
  background-image: linear-gradient(white, white),
    linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
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
