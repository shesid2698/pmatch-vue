<template>
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <div class="storeBac pb-[25rem]">
    <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
      <!-- title -->
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">最新</span>
          <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">消息</span>
          <div class="border-gradient-r"></div>
        </div>
      <!-- 最新消息-列表 -->
      <div v-if="!newsDetail">
        <div class="flex lg:justify-start justify-center">
          <!-- ALL -->
          <div class="relative inline-block w-[60px] h-[48px] group">
            <button class="hollow-btn-all cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([5, 6], '', 'ALL')" :aria-pressed="activeNewsType === 'ALL'"></button>
            <div
              class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
              :class="[activeNewsType === 'ALL'
                  ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#6DF0FE)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#6DF0FE33,_transparent)]'
                  : 'before:bg-[linear-gradient(to_bottom,_transparent,_#6DF0FE33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#6DF0FE)]']">
              <span
                class="z-1 transition-colors" :class="[activeNewsType === 'ALL'
                    ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#6DF0FE] group-hover:bg-clip-text group-hover:text-transparent'
                    : 'bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent group-hover:text-[#31129B]']">ALL
              </span>
            </div>
          </div>
          <!-- SYSTEM -->
          <div class="relative inline-block ms-2.5 w-[90px] h-[48px] group">
            <button class="hollow-btn-system cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([5], '', 'SYSTEM')" :aria-pressed="activeNewsType === 'SYSTEM'"></button>
            <div
              class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
              :class="[ activeNewsType === 'SYSTEM'
                  ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#FE6FDA33,_transparent)]'
                  : 'before:bg-[linear-gradient(to_bottom,_transparent,_#FE6FDA33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)]']">
              <span
                class="z-1 transition-colors" :class="[ activeNewsType === 'SYSTEM'
                    ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#FE6FDA] group-hover:bg-clip-text group-hover:text-transparent'
                    : 'bg-gradient-to-b from-[#fff] to-[#FE6FDA] bg-clip-text text-transparent group-hover:text-[#31129B]']">系統公告
              </span>
            </div>
          </div>
          <!-- POLICY -->
          <div class="relative inline-block ms-2.5 w-[90px] h-[48px] group">
            <button class="hollow-btn-policy cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([6], '', 'POLICY')" :aria-pressed="activeNewsType === 'POLICY'"></button>
            <div
              class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
              :class="[ activeNewsType === 'POLICY'
                  ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#B698FF33,_transparent)]'
                  : 'before:bg-[linear-gradient(to_bottom,_transparent,_#B698FF33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)]']">
              <span
                class="z-1 transition-colors" :class="[activeNewsType === 'POLICY'
                    ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#B698FF] group-hover:bg-clip-text group-hover:text-transparent'
                    : 'bg-gradient-to-b from-[#fff] to-[#B698FF] bg-clip-text text-transparent group-hover:text-[#31129B]']">政策公告
              </span>
            </div>
          </div>
        </div>
        <div v-if="newsList.length > 0">
          <div
            v-for="(item) in newsList .filter((item) => item.Category !== 3) .reverse() .slice(0, 6)"
            :key="item.Id"
            class="decoration-none color-#fff cursor-pointer"
            @click="GetNewsDetail(item.Id)"
          >
            <div class="w-full mt-1.8rem">
              <div class="w-80 font-size-.8rem">
                <div class="flex items-center">
                  <div :class="{ 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)]': item.Category === 5, 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)]': item.Category === 6 }"
                    class="flex items-center justify-center w-70px text-[#31129B]  p-1 font-size-12px rounded-50px">
                    {{ item.Category === 5 ? "系統公告" : item.Category === 6 ? "政策公告" : "" }}
                  </div>
                  <div class="flex font-size-12px items-center p-2">
                    <span class="bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                      {{ item.StartTime.slice(0, 10) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-full pt-3 pb-4 relative before:content-[''] before:absolute before:h-[1px] before:w-[105%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)] flex items-end justify-between">
                <div class="ms-2.5">
                  <h2 class="my-0  font-size-30px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent hover:bg-gradient-to-t">
                    {{ item.Title }}
                  </h2>
                  <h4 class="my-0 font-size-15px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                    {{ item.Summary }}
                  </h4>
                </div>
                <div class="me-2.5">
                  <p class="my-0 font-size-15px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                    詳細資訊...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新消息-明細 -->
      <div v-else>
        <div class="w-full pt-3 pb-4 relative before:content-[''] before:absolute before:h-[1px] before:w-[105%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)]">
          <h2 class="my-0 ms-2.5 font-size-30px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent hover:bg-gradient-to-t">
            {{ newsDetail.Title }}
          </h2>
          <h4 class="my-0 ms-2.5 font-size-12px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
            {{ newsDetail.Summary }}
          </h4>
        </div>
        <div class="w-full pt-3 pb-4 relative before:content-[''] before:absolute before:h-[1px] before:w-[105%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)]">
          <div class="my-0 ms-2.5 text-[#A2F7FF]" v-html="newsDetail.Content"></div>
        </div>
        <div class="relative text-center mt-50px">
          <div class="relative inline-block group">
            <button class="backBtn" @click="goBack"></button>
            <div class="absolute pointer-events-none inset-0 flex items-center justify-center w-[125px] mx-auto text-[18px] font-bold  before:content-[''] before:absolute before:inset-0 before:bg-[#6FF1FE33] before:rounded-full before:z-0 group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF80,_#A2F7FF80)] group-active:before:bg-[#6FF1FEA6]">
              <span class="group-hover:hidden bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent z-1">回上一頁</span>
              <span class="group-hover:inline text-[#31129B] z-1 hidden">回上一頁</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAlertModalStore } from "../stores/useAlertModal.js";

  const { $axios } = useNuxtApp();
  const jwtStore = useJwtStore();
  const userToken = useCookie("_PmToken");

  const route = useRoute();
  const router = useRouter()
  const newsList = ref([]);
  const newsDetail = ref(null);
  const activeNewsType = ref('ALL');
  const alertModalStore = useAlertModalStore();
  const openAlertModal = alertModalStore.alertShowModal;

  // 取得GetNewsList
  async function fetchNewsListData(num, token = '', type = 'ALL') {
    activeNewsType.value = type;
    if (token === '') {
      token = await jwtStore.generateToken();
    }

    try {
      const response = await $axios.post(
        '/api/v1/Pmatch/GetNewsList',
        {
          Categorys: num
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (response.data.Status.Code === 0) {
        newsList.value = response.data.Data;
      } else {
        await openAlertModal(' ', `${response.data.Status.Message}`);
      }
    } catch (error) {
      console.error('請求失敗:', error);
      data.value = '無法取得資料。';
    }
  }

  const GetNewsDetail = id => {
    newsDetail.value = newsList.value.find(x => x.Id == id);
    content.value = newsDetail.value.Content;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goBack = () => {  
    router.push({ path: '/store', query: { scrollToNews: '1' } });
  };

  onMounted(async () => {
    try {
      if (userToken.value != "" && userToken.value != undefined) {
        const token = userToken.value;
        if (token != "") {
          await fetchNewsListData([5, 6], token);
        }
      } else {
        const token = await jwtStore.generateToken();
        if (token != "") {
          await fetchNewsListData([5, 6], token);
        }
      }
    } catch (error) {
      console.error("頁面初始化失敗:", error);    
    } finally {
      if (route.query.id) {
        const target = newsList.value.find(x => x.Id == route.query.id);
        if (target) {
          newsDetail.value = target;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  });
</script>

<style scoped>
  .storeBac {
    background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .text-gradient-t {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    color: transparent;
  }
  .text-gradient-b {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    color: transparent;
  }

  .border-gradient-l {
    width: 40px;
    border: 2px solid;
    border-right: none;
    height: 10px;
    border-image: linear-gradient(to right, #fff, #43edff) 1;
    margin-right: 1rem;
  }
  .border-gradient-r {
    width: 40px;
    border: 2px solid;
    border-left: none;
    height: 10px;
    border-image: linear-gradient(to left, #fff, #43edff) 1;
    margin-left: 1rem;
  } 

  .backBtn {
    width: 125px;
    height: 65px;
    border-width: 2px;
    border-radius: 9999px;
    cursor: pointer;
    position: relative;
    border-style: solid;
    border-color: transparent; 
    background:
    linear-gradient(rgba(255, 255, 255, 0.01), #6FF1FE , rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #6FF1FE , rgba(255, 255, 255, 0.01));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: exclude, add;
  }

  /* 空心漸層按鈕樣式 */
  .hollow-btn-all {
    border-width: 2px;
    border-radius: 9999px;
    position: relative;
    border-style: solid;
    border-color: transparent; 
    background:
    linear-gradient(rgba(255, 255, 255, 0.01), #6DF0FE , rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #6DF0FE , rgba(255, 255, 255, 0.01));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: exclude, add;
  }
  .hollow-btn-system {
    border-width: 2px;
    border-radius: 9999px;
    position: relative;
    border-style: solid;
    border-color: transparent; 
    background:
    linear-gradient(rgba(255, 255, 255, 0.01), #FE6FDA , rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #FE6FDA , rgba(255, 255, 255, 0.01));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: exclude, add;
  }
  .hollow-btn-policy {
    border-width: 2px;
    border-radius: 9999px;
    position: relative;
    border-style: solid;
    border-color: transparent;
    background:
    linear-gradient(rgba(255, 255, 255, 0.01), #B698FF , rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #B698FF , rgba(255, 255, 255, 0.01));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: exclude, add;
  }

  @media screen and (max-width: 768px) {
    .border-gradient-l {
      width: 20px;
    }
    .border-gradient-r {
      width: 20px;
    }
  }
</style>
