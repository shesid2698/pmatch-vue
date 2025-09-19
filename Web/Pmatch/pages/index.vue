<template>
  <div>

    <Head>
      <title>PMatch遊戲道具交易平台</title>
      <Meta property="og:title" content="PMatch遊戲道具交易平台" />
      <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
      <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
      <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <div class="headerLeft absolute top-0">
      <img class="w-85% max-w-1630px min-w-980px" src="/images/headerLeft.svg" alt="header左邊底圖" />
    </div>
    <div class="absolute right-0 top-0">
      <img class="w-100%" src="/images/bgDot01.png" alt="header右邊點點圖" />
    </div>
    <div class="relative">
      <div class="absolute left-0 bottom-0">
        <img class="w-100%" src="/images/bgDot02.png" alt="熱門左邊點點圖" />
      </div>
      <div class="max-w-1110px m-auto pt-60px ps-5 pe-5 relative z-2">
        <div class="mb-3">
          <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-44px slogan">
            PMatch 整合媒合市場的領頭羊
          </h1>
          <h3 class="m-0 font-size-14px md-font-size-22px text-center subSlogan">
            嚴選合法媒合商、用合約保障交易權益、有效防堵詐騙、媒合交易更安全
          </h3>
        </div>

        <div class="w-full max-w-[1078px] bg-[#F2E3FF] rounded-[10px] px-4 pt-3.5 pb-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div class="flex flex-col md:flex-row items-center justify-between gap-3">

            <!-- 遊戲選擇 -->
            <div class="relative bg-white flex items-center px-4 w-[330px] h-[58px] cursor-pointer text-20px font-bold color-[#8D8D8D]"
                @click.stop="togglePlatformBox">{{ selectedGame || "遊戲選擇" }}
              <div class="absolute right-6 top-1/2 -translate-y-1/2">
                <svg v-if="!showPlatformBox" width="24" height="16" viewBox="0 0 24 16" fill="#8A4CBF" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5006 0.677802C2.77036 -0.150943 1.50655 -0.230794 0.677802 0.499449C-0.150943 1.22969 -0.230794 2.4935 0.499449 3.32225L10.4161 14.5766C10.8211 15.0362 11.3903 15.2655 11.9583 15.254C12.5264 15.2655 13.0955 15.0362 13.5006 14.5766L23.4172 3.32225C24.1475 2.4935 24.0676 1.22969 23.2389 0.499449C22.4101 -0.230794 21.1463 -0.150943 20.4161 0.677802L11.9583 10.2764L3.5006 0.677802Z"/>
                </svg>
                <svg v-else width="24" height="16" viewBox="0 0 24 16" fill="#8A4CBF" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.4153 14.5744C21.1454 15.4029 22.4088 15.483 23.2375 14.7531C24.0663 14.0229 24.1465 12.7586 23.4163 11.9299L13.4993 0.675982C13.1028 0.226037 12.5494 -0.00114441 11.9934 0.000201225C11.9814 -0.000260353 11.9693 0.000445366 11.9573 0.000201225C11.9449 0.000452995 11.9325 -0.00028038 11.9202 0.000201225C11.3646 -0.000810623 10.8115 0.226363 10.4153 0.675982L0.498283 11.9299C-0.231898 12.7586 -0.151729 14.0229 0.676994 14.7531C1.50568 15.4831 2.76907 15.4029 3.49926 14.5744L11.9573 4.97676L20.4153 14.5744Z"/>
                </svg>
              </div>
              <!-- 下拉選單 -->
              <div class="absolute top-full left-0 w-full z-50" v-show="showPlatformBox">
                <div class="platformBox bg-white shadow-md overflow-y-auto max-h-[580px] text-[#A566DB]">
                  <!-- 選項 -->
                  <div
                    v-for="(item, index) in gameList" :key="index"
                    class="flex items-center px-4 text-[20px] h-[58px] font-bold hover:bg-[#8A4CBF] hover:text-white border-none cursor-pointer"
                    @click.stop="selectGame(item)">
                    {{ item.PlatformName }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 搜尋框 -->
            <div class="flex items-center h-[58px] overflow-hidden gap-1.6">
              <!-- 輸入框 -->
              <input type="text" v-model="keywordToSearch"
                    placeholder="請輸入關鍵字..."
                    class="flex-1 px-4 h-full font-size-1.2rem w-[594px] border-none outline-none text-20px font-500 text-[#8D8D8D] placeholder:text-[#8D8D8D]" />
              <!-- 按鈕 -->
              <button @click="searchToFindMatch"
                class="w-[119px] h-full flex items-center justify-center cursor-pointer bg-[#8A4CBF] hover:bg-[#840FE9] active:bg-[#31005A] text-white border-none text-20px">搜尋
                <img class="w-[17px] ps-0.75 pt-0.75 select-none pointer-events-none" src="/images/searchIcon-white.svg" alt="搜尋" />  
              </button>
            </div>
          </div>

          <!-- 平台捷徑 -->
          <div class="mt-4 ms-1rem fw-bold text-[#8A4CBF] flex items-center">
            <div class="flex items-center">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="#8A4CBF" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.81138 0.106445C3.1551 0.106445 0.175777 3.08705 0.175777 6.74333V8.43134L0.173218 10.0042H0.175777V19.2902C0.175777 22.9465 3.1551 25.9271 6.81138 25.9271H12.9863C13.1412 25.9271 13.2947 25.8967 13.4379 25.8374C13.5811 25.7781 13.7112 25.6912 13.8208 25.5816C13.9303 25.472 14.0173 25.3419 14.0765 25.1987C14.1358 25.0556 14.1663 24.9021 14.1662 24.7471C14.166 24.4344 14.0416 24.1345 13.8203 23.9135C13.599 23.6924 13.299 23.5683 12.9863 23.5685H6.81138C4.42111 23.5685 2.53439 21.6805 2.53439 19.2902V10.0067L23.5661 10.0362V13.2842C23.5663 13.597 23.6907 13.8969 23.912 14.1179C24.1333 14.3389 24.4333 14.463 24.7461 14.4629C25.0586 14.4627 25.3583 14.3384 25.5793 14.1174C25.8003 13.8964 25.9245 13.5968 25.9247 13.2842V6.74333C25.9247 3.08705 22.9454 0.106445 19.2891 0.106445H6.81138ZM6.81138 2.46634H19.2891C21.6794 2.46634 23.5661 4.35306 23.5661 6.74333V7.67756L2.53439 7.64813V6.74333C2.53439 4.35306 4.42111 2.46634 6.81138 2.46634Z"/>
                <path d="M17.9735 11.8381C14.634 11.8381 11.901 14.571 11.901 17.9106C11.901 21.2501 14.634 23.9831 17.9735 23.9831C21.3131 23.9831 24.046 21.2501 24.046 17.9106C24.046 14.571 21.3131 11.8381 17.9735 11.8381ZM17.9735 14.1967C20.0382 14.1967 21.6861 15.8459 21.6861 17.9106C21.6861 19.9753 20.0382 21.6232 17.9735 21.6232C15.9088 21.6232 14.2596 19.9753 14.2596 17.9106C14.2596 15.8459 15.9088 14.1967 17.9735 14.1967Z"/>
                <path d="M5.60703 6.80634C6.27454 6.80634 6.81568 6.26521 6.81568 5.59769C6.81568 4.93017 6.27454 4.38904 5.60703 4.38904C4.93951 4.38904 4.39838 4.93017 4.39838 5.59769C4.39838 6.26521 4.93951 6.80634 5.60703 6.80634Z"/>
                <path d="M8.85434 6.80634C9.52186 6.80634 10.063 6.26521 10.063 5.59769C10.063 4.93017 9.52186 4.38904 8.85434 4.38904C8.18682 4.38904 7.64569 4.93017 7.64569 5.59769C7.64569 6.26521 8.18682 6.80634 8.85434 6.80634Z"/>
                <path d="M12.1016 6.80634C12.7691 6.80634 13.3102 6.26521 13.3102 5.59769C13.3102 4.93017 12.7691 4.38904 12.1016 4.38904C11.4341 4.38904 10.8929 4.93017 10.8929 5.59769C10.8929 6.26521 11.4341 6.80634 12.1016 6.80634Z"/>
                <path d="M21.4558 20.3101C21.3009 20.3111 21.1477 20.3426 21.005 20.4027C20.8622 20.4629 20.7327 20.5506 20.6239 20.6608C20.515 20.7711 20.4289 20.9018 20.3706 21.0454C20.3122 21.1889 20.2827 21.3426 20.2838 21.4976C20.2849 21.6526 20.3165 21.8058 20.3768 21.9486C20.4371 22.0914 20.525 22.2208 20.6354 22.3296L23.918 25.5674C24.1407 25.787 24.4415 25.9091 24.7542 25.9069C25.0669 25.9048 25.3659 25.7785 25.5856 25.5559C25.6945 25.4456 25.7806 25.315 25.8389 25.1714C25.8973 25.0278 25.9268 24.8741 25.9257 24.7191C25.9246 24.5641 25.893 24.4109 25.8327 24.2681C25.7723 24.1254 25.6845 23.9959 25.5741 23.8871L22.2914 20.6493C22.0688 20.43 21.7682 20.308 21.4558 20.3101Z"/>
              </svg>
            </div>

            <!-- 平台文字列表 -->
            <div class="ms-3 flex flex-wrap items-center">
              <template v-for="(item, index) in plaformLog" :key="index">
                <button @click="searchLog(item)"
                        class="bg-transparent border-none text-[16px] leading-none cursor-pointer text-[#8A4CBF] hover:text-[#8900FF] active:text-[#6000B3]">
                  <span>{{ item }}</span>
                </button>
                <span class="mx-1.8 translate-y-[-2px]" v-if="index !== plaformLog.length - 1">/</span>
              </template>
            </div>
          </div>
        </div>
        <div class="pt-2rem">
          <div class="bannerBox h-auto">
            <ElCarousel class="h-auto" :interval="3000" arrow="always">
              <ElCarouselItem class="h-auto" v-for="(item, index) in bannerList" :key="index">
                <a :href="item.Url ? item.Url : '#'" :class="item.Url ? '' : 'cursor-default'" :target="item.Url ? '_blank' : ''">
                  <img class="w-100% h-auto" :src="`${assetsUrl}${item.ImgFile}`" :alt="item.PlatformName" />
                </a>
              </ElCarouselItem>
            </ElCarousel>
          </div>
        </div>
        <div class="mb-3 pt-5rem pb-15rem">
          <div class="mb-5rem">
            <h1 class="color-#fff m-0 text-center font-size-50px">
              熱門媒合商
            </h1>
            <div class="flex justify-center">
              <img class="w-250px" src="/images/hotMatch.png" alt="熱門媒合商" />
            </div>
          </div>
          <div class="block md-flex flex-wrap gameOutside w-100%">
            <div class="gameBox flex" v-for="(item, index) in gameList.slice(0, 4)" :key="index"
              :class="`gameBox${index}`">
              <div class="p-2rem w-100% relative">
                <div class="gameLogo">
                  <img class="w-200px" src="/images/gameLogo.png" alt="熱門媒合logo" />
                </div>
                <div class="flex">
                  <div class="gameImg w-100% me-3" :class="`game-logo-${item.PlatformName}`">
                    <NuxtLink :to="{
                      path: '/findmatch',
                      query: {
                        platformName:
                          item.PlatformName,
                      },
                    }" class="w-100% m-1 decoration-none ">
                      <div class="w-100% flex justify-center">
                        <div class="relative aspect-[300/187] overflow-hidden inline-flex justify-center items-center rounded-5px bg-white">
                          <img v-show="item.ImgFile" :src="`${assetsUrl}${item.ImgFile}`" :alt="item.PlatformName"
                            class="w-full h-auto object-contain" />
                        </div>
                        <p v-show="!item.ImgFile">
                          {{ item.PlatformName }}
                        </p>
                      </div>
                    </NuxtLink>
                  </div>
                  <div class="w-100% ms-3 gameContent">
                    <div v-for="(store, index2) in filteredStores(item)" :key="index2"
                      :class="`w-100% gameItemBox${index2}`">
                      <NuxtLink class="decoration-none" :to="`/findmatch/${store.Id}?pn=${item.PlatformName}`">
                        <div class="gameItem pt-3 pb-3 w-100%"
                          :class="`gameItem-${item.PlatformName}-${store.Name}`">
                          {{ store.Name }}
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end mt-7">
                  <div>
                    <NuxtLink :to="{
                      path: '/findmatch',
                      query: {
                        platformName:
                          item.PlatformName,
                      },
                    }" class="decoration-none font-size-18px color-#f72585 fw-600">
                      >> 更多媒合商
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center pt-3 pb-3 mt-10">
            <div class="moreGameBtnBox">
              <NuxtLink class="moreGameBtn color-#fff font-size-22px decoration-none" to="/gamelist">更多遊戲</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-#fff relative mt-5rem">
      <div class="waveTop absolute"></div>
      <div class="arrowRight absolute">
        <img src="/images/corner.png" alt="右邊箭頭" />
      </div>
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="mb-5rem">
          <h1 ref="newsRef" class="newsTitle m-0 text-center font-size-50px">
            最新消息
          </h1>
          <!-- <button @click="testAlert">點擊開啟alert彈窗</button>
                    <button @click="testConfirm">點擊開啟confirm彈窗</button> -->
          <div class="flex justify-center">
            <img class="w-250px" src="/images/news.png" alt="最新消息" />
          </div>
        </div>
        <div class="lg-flex">
          <div class="w-100% lg-w-50% me-0 lg-me-1rem">
            <div class="mb-3rem lg-block flex lg-justify-start justify-center">
              <button class="border-solid border-1px cursor-pointer font-size-15px rounded-50px p-3 leading-[20px]"
                style="--btn-color: #4361ee"
                :class="activeNewsType === 'ALL' ? 'solid-btn' : 'hollow-btn'"
                @click="fetchNewsListData([1,2], '', 'ALL')">
                ALL
              </button>
              <button class="border-solid border-1px cursor-pointer font-size-15px rounded-50px p-3 ms-3"
                style="--btn-color: #8A4CBF"
                :class="activeNewsType === 'SYSTEM' ? 'solid-btn' : 'hollow-btn'"
                @click="fetchNewsListData([1], '', 'SYSTEM')">
                系統公告
              </button>
              <button class="border-solid border-1px cursor-pointer font-size-15px rounded-50px p-3 ms-3"
                style="--btn-color: #F72585"
                :class="activeNewsType === 'ACTIVITY' ? 'solid-btn' : 'hollow-btn'"
                @click="fetchNewsListData([2], '', 'ACTIVITY')">
                活動資訊
              </button>
            </div>
            <div v-if="newsList.length > 0">
              <NuxtLink :to="`/news/${item.Id}`" v-for="(item, index) in newsList
                .filter((item) => item.Category !== 3)
                .reverse()
                .slice(0, 5)" :key="index" class="newsLink color-#555553 decoration-none">
                <div class="w-full mt-1.8rem">
                  <div class="w-80 font-size-.8rem">
                    <div class="flex items-center">
                      <div :class="{'bg-#7b2cbf': item.Category === 1, 'bg-#f72585': item.Category === 2,}" class="color-#fff p-1 font-size-12px rounded-50px">
                        {{item.Category === 1 ? "網站公告" : item.Category === 2 ? "活動資訊" : ""}}
                      </div>
                      <div class="flex font-size-12px items-center p-2">
                        <span :class="{'color-#4361EE': item.Category === 1, 'color-#f72585': item.Category === 2,}">{{item.StartTime.slice(0, 10)}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-full pt-3 pb-3 newsItemLink">
                    <div>
                      <h2 class="m-0 font-size-30px" :class="{newsItem1: item.Category === 1, newsItem2: item.Category === 2,}">
                        {{ item.Title }}
                      </h2>
                      <h3 class="m-0 font-size-12px">
                        {{ item.Summary }}
                      </h3>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="mt-4rem w-100% lg-w-50% ms-0 lg-ms-1rem lg-mt-1.5rem newsBoard">
            <NewRatio />
            <Matching class="mt-3rem" param="" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-#fff pt-5rem pb-5 relative">
      <div class="arrowLeft absolute">
        <img src="/images/corner.png" alt="左邊箭頭" />
      </div>
      <div class="arrowRight absolute bottom-0">
        <img src="/images/corner.png" alt="右邊箭頭" />
      </div>
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="mb-5rem relative">
          <h1 class="newsTitle m-0 text-center font-size-50px">
            我們的服務
          </h1>
          <div class="flex justify-center">
            <img class="w-250px" src="/images/ourService.png" alt="我們的服務" />
          </div>
        </div>
        <div class="md-flex" v-for="(item, index) in serviceList" :key="index"
          :class="{ serviceEven: index % 2 === 0 }">
          <div class="flex w-100% lg-w-50% select-none pointer-events-none">
            <img
              class="w-100%"
              :class="item.imagesOffsetClass"
              :src="item.img"
              :alt="item.title"
            />
            <img
              class="w-67.5% object-contain "
              :class="item.animeOffsetClass"
              :src="item.anime"
              :alt="item.title"
            />
          </div>
          <div class="mt-4rem w-100% lg-w-50% lg-mt-1rem flex items-center">
            <div class="lg-ms-5 lg-me-5 ps-5 pe-5 lg-w-auto w-100% pb-20 serviceItemsContent">
              <div class="mb-2rem md-block flex justify-center select-none pointer-events-none">
                <img class="w-70px" :src="item.icon" :alt="item.detail" />
              </div>
              <h2 class="serviceItemsTitle font-size-30px m-0 mb-5">
                {{ item.title }}
              </h2>
              <h4 class="m-0 font-size-20px">
                {{ item.detail }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus';
import { ElCarousel } from 'element-plus';
import { ElCarouselItem } from 'element-plus';
// loading page
import { useLoadStore } from '../stores/loading.js';
import { useModalStore } from '../stores/useModal.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
import { nextTick } from 'vue'
const store = useLoadStore();
const modalStore = useModalStore();
const alertModalStore = useAlertModalStore();
const openModal = modalStore.showModal;
const openAlertModal = alertModalStore.alertShowModal;
const setPageLoading = store.setPageLoading;
const route = useRoute();
const router = useRouter();

const newsRef = ref(null);
const newsList = ref([]);
const gameList = ref([]);
const storesList = ref([]); 
const bannerList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie('_PmToken');
const assetsUrl = useCookie('_PmAssetsUrl');
const serchPlatformLogCookies = useCookie('_PmSearchLog');
const plaformLog = ref([]);
const showPlatformBox = ref(false);
const activeNewsType = ref('ALL');
const selectedGame = ref('');
let isBackNavigation = false;

// 切換下拉選單的顯示/隱藏
const togglePlatformBox = () => {
  showPlatformBox.value = !showPlatformBox.value;
  // 選單開啟時添加全域點擊監聽
  if (showPlatformBox.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};

// 選擇遊戲並關閉選單
const selectGame = item => {
  selectedGame.value = item.PlatformName; // 或 item.value 根據需要
  showPlatformBox.value = false; // 隱藏選單
};

const serviceList = [
  {
    title: '簽約有保障，交易更安全',
    detail: '交易前與媒合商簽訂正式合約，避免交易糾紛，玩家交易權益更有保障',
    img: '/images/seBackground-1.png',
    anime: '/images/animes/service-1.gif',
    animeOffsetClass: 'translate-x-[-118.9%] translate-y-[2.3%]',
    icon: '/images/seIcon-1.png'
  },
  {
    title: '精選優質媒合商，詐騙走開',
    detail: '平台上的媒合商均經過PMatch平台嚴格篩選，交易信用有保障，告別詐騙交易',
    img: '/images/seBackground-2.png',
    anime: '/images/animes/service-2.gif',
    animeOffsetClass: 'translate-x-[-125.1%] translate-y-[2.7%]',
    icon: '/images/seIcon-2.png'
  },
  {
    title: '即時查詢，交易資訊100%透明',
    detail: '平台提供即時交易查詢服務，不論是遊戲幣流向還是交易進度，資訊完整透明',
    img: '/images/seBackground-1.png',
    anime: '/images/animes/service-3.gif',
    animeOffsetClass: 'translate-x-[-118.9%] translate-y-[2.6%]',
    icon: '/images/seIcon-3.png'
  }
];
let platformNameToSearch = ref('');
let keywordToSearch = ref('');
let contractToSearch = ref(false);

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
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      const sortedData = response.data.Data.sort((a, b) => {
        const topSort = a.IsTop - b.IsTop;
        if (topSort !== 0) {
        return topSort;
        }
        return new Date(a.StartTime) - new Date(b.StartTime);
      });
      newsList.value = sortedData;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// 取得GetStoreList
async function fetchStoresListData(token) {
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetStoreList',
      {
        IsFront: true
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      storesList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// 取得GetPlatformAndCharacterList(遊戲平台資訊)
async function fetchGameList(token) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetPlatformAndCharacterList',
      {},
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      gameList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// GetAdvertisementList(banner)
async function fetchADList(token) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetAdvertisementList',
      {
        Category: [1]
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      bannerList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// 找媒合搜尋
const searchToFindMatch = () => {
  if (selectedGame.value.trim() !== '') {
    updateNameArray(selectedGame.value.trim());
    //selectedGame.value = ''; // 清空搜索框
  } else {
    return;
  }
  router.push({
    path: '/findmatch',
    query: {
      platformName: selectedGame.value || '', // 平台名稱
      keyword: keywordToSearch.value || '' // 關鍵字
    }
  });
};
// 搜尋紀錄
const searchLog = item => {
  router.push({
    path: '/findmatch',
    query: {
      platformName: item || '' // 平台名稱
    }
  });
};
const handleClickOutside = event => {
  const dropdown = document.querySelector('.platformBox');
  if (dropdown && !dropdown.contains(event.target)) {
    showPlatformBox.value = false;
  }
};

// 搜尋紀錄更新陣列並保存到 Cookie
const updateNameArray = searchValue => {
  const index = plaformLog.value.indexOf(searchValue);
  if (index !== -1) {
    // 如果搜索值已存在，移到陣列開頭
    plaformLog.value.splice(index, 1);
  }
  // 添加到陣列開頭
  plaformLog.value.unshift(searchValue);

  // 限制陣列長度（例如限制為 3）
  if (plaformLog.value.length > 6) {
    plaformLog.value.pop();
  }

  // 更新 Cookie
  serchPlatformLogCookies.value = JSON.stringify(plaformLog.value);
};

// 儲存滾動位置
const saveScrollPosition = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  sessionStorage.setItem(`scroll-position-${route.fullPath}`, scrollTop.toString());
};

// 恢復滾動位置
const restoreScrollPosition = () => {
  const scrollPosition = sessionStorage.getItem(`scroll-position-${route.fullPath}`);
  if (scrollPosition) {
    // 延遲滾動確保 DOM 已渲染
    setTimeout(() => {
      window.scrollTo({ top: Number(scrollPosition), behavior: 'auto' });
    }, 50);
  }
};

// 監聽路由變化
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (oldPath) {
      // 儲存上一頁的滾動位置
      saveScrollPosition();
    }
    restoreScrollPosition();
  }
);

onMounted(async () => {
  setPageLoading(true);
  try {
    if (userToken.value != '' && userToken.value != undefined) {
      const token = userToken.value;

      if (token != '') {
        await fetchNewsListData([1, 2], token);
        await fetchGameList(token);
        await fetchStoresListData(token);
        await fetchADList(token);
      }
    } else {
      // 生成新的 token
      const token = await jwtStore.generateToken();
      if (token != '') {
        await fetchNewsListData([1, 2], token);
        await fetchGameList(token);
        await fetchStoresListData(token);
        await fetchADList(token);
      }
    }

    if (!serchPlatformLogCookies.value) {
      plaformLog.value = [
        '包你發娛樂城',
        '滿貫大亨',
        '聚寶Online',
        '金好運娛樂城',
        '寶島娛樂城',
        '老子有錢Online'
      ];
      serchPlatformLogCookies.value = JSON.stringify(plaformLog.value);
    } else {
      plaformLog.value = serchPlatformLogCookies.value;
    }
    // 監聽「上一頁」按鈕
    window.addEventListener('popstate', () => {
      isBackNavigation = true; // 標記為「上一頁」返回
    });
    restoreScrollPosition();
  } catch (error) {
    console.error('頁面初始化失敗:', error);
  } finally {
    setPageLoading(false);

    // 滾動到 news 區域 ( 回傳 scrollToNews 時 )
    const scrollToNews = route.query.scrollToNews;
    if (scrollToNews === '1') {
      await nextTick();
      if (newsRef.value) {
        setTimeout(() => {
          newsRef.value.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      router.replace({ path: route.path, query: {} });
    }
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  saveScrollPosition();
});

const filteredStores = (game) => {
  if (!storesList.value || storesList.value.length === 0) {
    return [];
  }
  
  const filtered = storesList.value.filter(store => 
    store.GamePlatforms.some(platform => platform.GamePlatform === game.PlatformName)
  );

  const sorted = filtered.sort((a, b) => {
    const hotSort = b.IsHot - a.IsHot
    if (hotSort !== 0) return hotSort;
    return b.SortingId - a.SortingId; 
  });
    

  return sorted.slice(0, 3);
};
</script>

<style scoped>
.headerLeft {
  width: 100%;
  height: auto;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.headerLeft img {
  width: 85%;
  max-width: 1630px;
  min-width: 980px;
}

/* 搜尋欄位樣式 */
.platformName:focus {
  border-color: #a9d8f8;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

:deep(.el-icon) {
  z-index: -1;
}

.bannerBox {
  position: relative;
  /* padding: 3px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 1rem; */
}

.bannerDetail {
  border-radius: 1rem;
}

.slogan {
  background: linear-gradient(to bottom, #f72585, #7b2cbf);
  background: -webkit-linear-gradient(#f72585, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.subSlogan {
  color: #f72585;
}

.newsTitle {
  background: linear-gradient(to right, #4361ee, #7b2cbf);
  background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.waveTop {
  background-image: url('/images/waveBottom.svg');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100%;
  top: -295px;
  left: 0;
  width: 100%;
  min-height: 300px;
}

/* 主色樣式(實心) */
.solid-btn {
  color: #fff;
  background-color: var(--btn-color);
  border-color: var(--btn-color);
}
.solid-btn:hover {
  background-color: #fff;
  color: var(--btn-color);
}

/* 副色樣式(空心) */
.hollow-btn {
  color: var(--btn-color);
  background-color: #fff;
  border-color: var(--btn-color);
}
.hollow-btn:hover {
  background-color: var(--btn-color);
  color: #fff;
}

.newsLink:hover .newsItem1 {
  background: linear-gradient(to right, #7b2cbf, #4361ee);
  background: -webkit-linear-gradient(to right, #7b2cbf, #4361ee);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.newsLink:hover .newsItem2 {
  background: linear-gradient(to right, #7b2cbf, #f72585);
  background: -webkit-linear-gradient(to right, #7b2cbf, #f72585);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.newsItem1 {
  background: linear-gradient(to right, #4361ee, #7b2cbf);
  background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.newsItem2 {
  background: linear-gradient(to right, #f72585, #7b2cbf);
  background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.newsItemLink {
  border-bottom: 1px solid rgba(67, 97, 238, 0.3);
}

.newsBoard {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.serviceEven {
  flex-direction: row-reverse;
  margin: 2rem 0;
}

.serviceItemsTitle {
  background: linear-gradient(to right, #f72585, #7b2cbf);
  background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.serviceItemsContent {
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #f72585, #7b2cbf) 1;
}

.arrowLeft {
  top: -150px;
}

.arrowRight {
  transform: rotate(180deg);
  right: 0;
  top: -180px;
}

:deep(.el-carousel__container) {
  aspect-ratio: 1110/418;
  height: fit-content !important;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

:deep(.el-carousel__item) {
  display: flex;
  align-content: center;
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

:deep(.el-carousel__arrow--left),
:deep(.el-carousel__arrow--right) {
  background: rgba(0, 0, 0, 0);
}

:deep(.el-carousel__arrow--left > .el-icon),
:deep(.el-carousel__arrow--right > .el-icon) {
  font-size: 2.5rem;
}

.moreGameBtn {
  padding: 1rem 2rem;
  background: linear-gradient(to right, #7b2cbf, #f72585);
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
}





.gameBox {
  background: linear-gradient(to bottom, #fff, #f6a2ff);
  border-radius: 10px;
}

.gameItemBox0,
.gameItemBox1,
.gameItemBox2 {
  position: relative;
  padding: 1px;
  background: linear-gradient(to bottom, rgba(247, 37, 133), #7b2cbf);
  border-radius: 10px;
  border: none;
}

.gameItem {
  position: relative;
  width: 100%;
  background: linear-gradient(to bottom, #f72585, #7b2cbf);
  color: #fff;
  border-radius: 10px;
  text-align: center;
}

.gameItem:hover {
  width: 100%;
  background: #fff;
  color: #f72585;
  border-radius: 10px;
  text-align: center;
}

.gameContent {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.gameBox0,
.gameBox2 {
  width: calc(50% - 1rem);
  margin-right: 1rem;
  margin-bottom: 2rem;
}

.gameBox1,
.gameBox3 {
  width: calc(50% - 1rem);
  margin-left: 1rem;
  margin-bottom: 2rem;
}

.gameImg {
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gameImg:hover {
  background: linear-gradient(to right, #f72585, #4361ee);
  color: #fff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gameLogo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.moreGameBtnBox {
  position: relative;
  padding: 17px 1px;
  background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
}

.moreGameBtn:hover {
  background: #fff;
  color: #f72585;
}

@media screen and (max-width: 1024px) {
  .arrowRight {
    transform: rotate(180deg);
    right: 0;
    top: 0;
  }
}

@media screen and (max-width: 768px) {

  .gameBox0,
  .gameBox2 {
    width: 100%;
    margin-right: 0rem;
    margin-bottom: 2rem;
  }

  .gameBox1,
  .gameBox3 {
    width: 100%;
    margin-left: 0rem;
    margin-bottom: 2rem;
  }
}
</style>
