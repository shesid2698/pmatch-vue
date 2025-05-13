<template>

  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <div>
    <div class="absolute right-0 top-0">
      <div class="flex justify-end">
        <img class="w-60%" src="/images/bgDot03.png" alt="header右邊點點圖" />
      </div>
    </div>
    <div class="w-full relative mt-5rem z-3">
      <div class="max-w-1110px m-auto pt-60px ps-5 pe-5 relative z-2">
        <!-- 搜尋列 -->
        <div class="block md-flex items-center w-100% pb-3rem searchCol justify-between">
          <div class="relative m-0 md-m-4 pt-4 pb-4 w-100% md-w-50% font-size-1.2rem gameSelect color-#fff"
            @click.stop="togglePlatformBox">
            <span class="fw-600">{{
              selectedGame || "遊戲選擇 ..."
            }}</span>
            <div class="absolute top-17px right-20px">
              <img class="w-25px" src="/images/arrowDown.png" alt="選擇遊戲下拉箭頭" />
            </div>
            <div class="absolute top-0 w-100% z-99">
              <div class="platformBox" v-show="showPlatformBox">
                <div class="platformBoxContent">
                  <div class="relative pt-2 pb-2 w-100% fw-600">
                    遊戲選擇 ...
                  </div>
                  <div class="platformItem pt-2 pb-2 w-100% fw-600" v-for="(item, index) in gameList" :key="index"
                    @click.stop="selectGame(item)">
                    {{ item.PlatformName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-1rem m-0 md-m-4 flex w-100% md-w-50%">
            <div class="flex items-center w-100%">
              <div class="flex w-100%">
                <div class="w-100% storeNameBox">
                  <div class="storeName pt-4px pb-4px">
                    <input
                      class="storeEntry max-w-702px md-max-w-517px pt-12px pb-12px w-80% md-w-80% font-size-1.2rem fw-600"
                      type="text" placeholder="輸入關鍵字..." v-model="selectedKeyword" />
                  </div>
                </div>
                <div class="relative">
                  <button class="h-38px border-none searchBtn absolute top-10px right-10px" @click="handleSearch">
                    <img class="w-25px" src="/images/searchIcon.png" alt="搜尋按鈕" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-240px mt-1rem md-mt-0 md-ms-3 flex items-center">
            <input type="checkbox" class="w-20px h-20px" v-model="contractToSearch" />
            <span class="ms-3 font-size-18px color-#8d8d8d fw-600">查看已簽約媒合商</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full relative mt-3rem md-mt-5rem">
      <div class="absolute left-0 top-0">
        <div class="flex justify-start">
          <img class="w-60%" src="/images/bgDot04.png" alt="header左邊點點圖" />
        </div>
      </div>
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="mb-6 flex flex-wrap md-flex-nowrap item-center justify-center">
          <div class="flex flex-wrap md-flex-nowrap w-100% md-w-95%">
            <div class="w-100% md-w-40% mb-6rem md-mb-0 flex flex-wrap item-center justify-center md-me-1rem">
              <div class="w-100% flex justify-center mb-2rem md-mb-0">
                <span class="platformTitle">{{
                  selectedSearchGame
                }}</span>
              </div>
              <div class="w-100% flex justify-center">
                <div class="w-100% h-100%">
                  <div class="platformImgBox">
                    <img v-show="currentImg" :src="`${assetsUrl}${currentImg}`" :alt="`${selectedSearchGame}`"
                      class="platformImg" />
                    <div class="flex justify-center items-center" v-show="!currentImg">
                      <p class="text-center">
                        {{ selectedSearchGame }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Matching :param="matchingPlatform !== undefined
              ? matchingPlatform
              : ''
              " class="md-ms-1rem w-100% md-w-60%" />
            <!-- <NewRatio class="w-33%" /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="w-full relative mt-10rem md-mt-5rem">
      <div class="max-w-1110px m-auto md:p-x-5 p-x-2 relative z-2">
        <div class="flex flex-wrap justify-center">
          <div v-for="(item, index) in filteredStores.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
          )" :key="index" class="w-90%">
            <NuxtLink :to="`/findmatch/${item.Id}?pn=${selectedGame}`" class="decoration-none w-90% color-#fff">
              <div class="storeBox flex-wrap justify-center" :class="[
                index % 2 == 0 ? 'md:mr-0 mr-20px' : 'mr-0',
                index == 1 ? 'md-mb-300px-important' : '',
              ]">
                <div class="storeContent" :class="`game-${item.Name}`">
                  <div class="flex md:flex-row flex-col justify-between">
                    <div class="w-100% md:w-22% storeImgCol">
                      <div class="w-100% storeImgBox">
                        <div class="flex items-center" v-show="item.IMGFiles">
                          <img :src="`${assetsUrl}${item.IMGFiles}`" :alt="item.Name" class="w-100% storeImg" />
                        </div>

                        <div class="flex items-center" v-show="!item.IMGFiles">
                          <span>{{ item.Name }}</span>
                        </div>
                      </div>
                      <div class="flex justify-center mt-3">
                        <div class="flex">
                          <!-- 顯示完整星星 -->
                          <img v-for="n in Math.floor(
                            item.Score
                          )" :key="`filled-${index}-${n}`" class="m-1" width="20" src="/images/icon-star.png"
                            alt="評分整顆星星" />
                          <!-- 顯示半顆星星 -->
                          <img v-if="
                            item.Score % 1 !== 0
                          " :key="`half-${index}`" class="m-1" width="20" src="/images/icon-star03.png" alt="評分半顆星星" />
                        </div>
                      </div>
                    </div>
                    <div class="storeDetailCol">
                      <div class="md:mb-5 mb-1 w-100%">
                        <h2 class="m-0 mb-3 color-#4361ee text-22px md:text-32px md:text-start text-center">
                          {{ item.Name }}
                        </h2>
                        <a :title="item.About">
                            <p class="m-0 text-15px md:text-22px text-gray-5 aboutContent pl-10px md:pl-0">
                                <!-- 顯示 About 的完整 HTML 格式 -->
                                <span v-if="item.About.length > 0" v-html="item.About"></span>
                            </p>
                        </a>
                      </div>
                      <div class="w-100%">
                        <div class="flex md:pl-5px pl-0 justify-center md:justify-start" v-if="item">
                          <NuxtLink class="flex items-center ms-1 me-1" v-show="item.FB !== ''" :to="item.FB">
                            <img class="w-30px h-30px" src="/images/iconFB.png" alt="fbIcon" />
                          </NuxtLink>
                          <NuxtLink class="flex items-center ms-1 me-1" v-show="item.LineId !== ''
                            " :to="item.LineId">
                            <img class="w-30px h-30px" src="/images/iconLine.png" alt="lineIcon" />
                          </NuxtLink>
                          <NuxtLink class="flex items-center ms-1 me-1" v-show="item.IGId !== ''
                            " :to="item.IGId">
                            <img class="w-30px h-30px" src="/images/iconIG.png" alt="igIcon" />
                          </NuxtLink>
                          <NuxtLink class="flex items-center ms-1 me-1" v-show="item.TwitterId !==
                            ''
                            " :to="item.TwitterId">
                            <img class="w-30px h-30px" src="/images/iconX.png" alt="推特icon" />
                          </NuxtLink>
                        </div>
                      </div>
                    </div>

                    <div class="w-100% md-w-200px flex justify-center">
                      <div class="w-200px flex justify-center items-center">
                        <NuxtLink :to="`/findmatch/${item.Id}?pn=${selectedGame}`" class="decoration-none">
                          <div class="orderBox">
                            <button class="orderBtn">
                              我要下單
                            </button>
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <!-- 在第一筆資料後插入輪播 -->
            <div v-if="index === 1 && bannerTopList.length > 0" class="w-100% mb-7rem md-mb-2rem carouselContainer">
              <ElCarousel class="h-auto" :interval="3000" arrow="always">
                <ElCarouselItem class="h-auto" v-for="(
banner, bannerIndex
                                    ) in bannerTopList" :key="bannerIndex">
                  <div v-if="banner.Url !== ''">
                    <a :href="banner.Url" target="_blank">
                      <img class="w-100% h-auto" :src="`${assetsUrl}${banner.ImgFile}`" :alt="banner.PlatformName" />
                    </a>
                  </div>
                  <div v-if="banner.Url === ''">
                    <img class="w-100% h-auto" :src="`${assetsUrl}${banner.ImgFile}`" :alt="banner.PlatformName" />
                  </div>
                </ElCarouselItem>
              </ElCarousel>
            </div>
            <!-- <div v-else-if="filteredStores.slice(
                            (currentPage - 1) * itemsPerPage,
                            (currentPage - 1) * itemsPerPage + itemsPerPage
                        ).length ==1"
                             class="w-100% mb-7rem md-mb-2rem carouselContainer">
                            <ElCarousel class="h-auto"
                                        :interval="3000"
                                        arrow="always">
                                <ElCarouselItem class="h-auto"
                                                v-for="(
                                        banner, bannerIndex
                                    ) in bannerTopList"
                                                :key="bannerIndex">
                                    <img class="w-100% h-auto"
                                         :src="`${assetsUrl}${banner.ImgFile}`"
                                         :alt="banner.PlatformName" />
                                </ElCarouselItem>
                            </ElCarousel>
                        </div> -->
          </div>
        </div>
        <div class="">
          <el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="itemsPerPage"
            :total="filteredStores.length" class="w-fit m-y-0 m-x-auto" @current-change="changePage" />
        </div>
        <!-- 各媒合商 -->
        <!-- <div class="flex relative w-100%">
                    <div class="sideBar">
                        <div class="mb-5">
                            <ElCarousel
                                v-if="bannerTopList.length > 0"
                                class="h-200px"
                                :interval="2000"
                                arrow="always"
                            >
                                <ElCarouselItem
                                    class="h-200px"
                                    v-for="(item, index) in bannerTopList"
                                    :key="index"
                                >
                                    <img
                                        class="w-100% h-200px"
                                        :src="`${assetsUrl}${item.ImgFile}`"
                                        :alt="item.PlatformName"
                                    />
                                </ElCarouselItem>
                            </ElCarousel>
                        </div>
                        <div>
                            <ElCarousel
                                v-if="bannerDownList.length > 0"
                                class="h-200px"
                                :interval="2000"
                                arrow="always"
                            >
                                <ElCarouselItem
                                    class="h-200px"
                                    v-for="(item, index) in bannerDownList"
                                    :key="index"
                                >
                                    <img
                                        class="w-100% h-200px"
                                        :src="`${assetsUrl}${item.ImgFile}`"
                                        :alt="item.PlatformName"
                                    />
                                </ElCarouselItem>
                            </ElCarousel>
                        </div>
                    </div>
                </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入的東西
import { ArrowRight } from '@element-plus/icons-vue';
import { ElBreadcrumb } from 'element-plus';
import { ElBreadcrumbItem } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { ElCarousel } from 'element-plus';
import { ElCarouselItem } from 'element-plus';

// loading page
import { useLoadStore } from '../stores/loading.js';
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const storesList = ref([]);
const gameList = ref([]);
const bannerTopList = ref([]);
const bannerDownList = ref([]);
const contractedStoreList = ref([]);

const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie('_PmToken');
const assetsUrl = useCookie('_PmAssetsUrl');

const router = useRouter();
const route = useRoute();
const platformName = route.query.platformName;
const keyword = route.query.keyword;
const contract = route.query.contract;

const searchQuery = ref('');
const selectedPlatform = ref('');
const currentPage = ref(1); // 當前頁碼
const itemsPerPage = 6; // 每頁筆數
// 用於暫存搜尋條件的變數
const tempSearchQuery = ref('');
const tempSelectedPlatform = ref('');
const tempShowSignedOnly = ref(false);

// 實際用於篩選的變數
const activeSearchQuery = ref('');
const activeSelectedPlatform = ref('');
const activeShowSignedOnly = ref(false);

// 即時媒合用
const matchingPlatform = ref('');

// 遊戲選擇器用
let contractToSearch = ref(false);
const activeContractSearch = ref(false);
const selectedGame = ref('');
const selectedKeyword = ref('');
const selectedSearchGame = ref('');
const showPlatformBox = ref(false);

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

const handleClickOutside = event => {
  const dropdown = document.querySelector('.platformBox');
  if (dropdown && !dropdown.contains(event.target)) {
    showPlatformBox.value = false;
  }
};

const currentImg = computed(() => {
  const platform = gameList.value.find(item => item.PlatformName === selectedSearchGame.value);
  return platform ? platform.ImgFile : '';
});
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
// 取得GetPlatformAndCharacterList
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
// 找媒合GetAdvertisementList(上banner)
async function fetchADTopList(token) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetAdvertisementList',
      {
        Category: [2]
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      bannerTopList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// 找媒合GetAdvertisementList(下banner)
async function fetchADDownList(token) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetAdvertisementList',
      {
        Category: [3]
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      bannerDownList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// GetContractedStoreList(已簽約媒合)
async function fetchContractedList(token) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetContractedStoreList',
      {
        category: 1
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      contractedStoreList.value = response.data.Data;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}
// 計算總頁數
const totalPages = computed(() => Math.ceil(filteredStores.value.length / itemsPerPage));

// 計算當前頁需要顯示的資料
const paginatedQAs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredStores.value.slice(start, end);
});
const changePage = page => {
  currentPage.value = page;
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const arr = filteredStores.value.slice(start, end);
  filteredStores.value = arr;
};
onMounted(async () => {
  await setPageLoading(true);
  try {
    if (userToken.value != '' && userToken.value != undefined) {
      const token = userToken.value;
      if (token != '') {
        await fetchStoresListData(token);
        await fetchGameList(token);
        await fetchADTopList(token);
        // await fetchADDownList(token);
        await fetchContractedList(token);
      }
    } else {
      // 生成新的 token
      const token = await jwtStore.generateToken();
      if (token != '') {
        await fetchStoresListData(token);
        await fetchGameList(token);
        await fetchADTopList(token);
        // await fetchADDownList(token);
      }
    }

    if (platformName !== undefined && keyword !== undefined && contract !== undefined) {
      selectedGame.value = platformName;
      selectedKeyword.value = keyword;
      if (contract === '1') {
        tempShowSignedOnly.value = true;
      } else {
        tempShowSignedOnly.value = false;
      }
      handleSearch();
    }

    if (platformName !== undefined) {
      selectedGame.value = platformName;
      handleSearch();
    }

    await setPageLoading(false);
  } catch (error) {
    console.error('頁面初始化失敗:', error);
  }
});

const processedGamePlatforms = computed(() => {
  if (!storesList.value.length) return []; // 如果資料是空的，回傳空陣列

  return storesList.value.map(store => {
    // 如果 `GamePlatforms` 不存在或是空的，回傳空字串
    if (!store.GamePlatforms || !store.GamePlatforms.length) return '';

    // 提取 `GamePlatform`，過濾重複並以逗號分隔
    const platformsSet = new Set(store.GamePlatforms.map(platform => platform.GamePlatform));
    return Array.from(platformsSet).join(', '); // 轉換為陣列後用逗號分隔
  });
});

const dialogVisible = ref(false);
// 搜尋及下拉選單篩選
const stores = ref(
  Object.values(storesList.value).map(store => ({
    ...store,
    dialogVisible: false // 初始化每個商店的彈窗狀態
  }))
);

const handleSearch = async () => {
  await setPageLoading(true);
  // 更新實際用於篩選的值
  activeSearchQuery.value = selectedKeyword.value;
  activeSelectedPlatform.value = selectedGame.value;
  matchingPlatform.value = selectedGame.value;
  activeContractSearch.value = contractToSearch.value;
  selectedSearchGame.value = selectedGame.value;
  await router.replace({
    query: {
      platformName: selectedGame.value,
      keyword: selectedKeyword.value
    }
  });
  await setPageLoading(false);
};

// 篩選邏輯
const filteredStores = computed(() => {
  return storesList.value.filter(store => {
    const matchesSearchQuery = activeSearchQuery.value
      ? store.Name.toLowerCase().includes(activeSearchQuery.value.toLowerCase())
      : true;

    const matchesSelectedPlatform = activeSelectedPlatform.value
      ? store.GamePlatforms.some(
        platform => platform.GamePlatform === activeSelectedPlatform.value
      )
      : true;

    // 新增：檢查是否需要比對已簽約商店列表
    const matchesContractedStore = activeContractSearch.value
      ? contractedStoreList.value.some(
        contractedStore =>
          contractedStore.Id === store.Id && contractedStore.Name === store.Name
      )
      : true;

    return matchesSearchQuery && matchesSelectedPlatform && matchesContractedStore;
  });
});

const filteredProcessedGamePlatforms = computed(() => {
  return filteredStores.value.map(store => {
    if (!store.GamePlatforms || !store.GamePlatforms.length) return '';

    const platformsSet = new Set(store.GamePlatforms.map(platform => platform.GamePlatform));
    return Array.from(platformsSet).join(', ');
  });
});
</script>

<style scoped>
.gameSelect {
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50px;
  text-indent: 1rem;
}

.platformBox {
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 25px;
  border: none;
}

.platformBoxContent {
  position: relative;
  background: #fafafa;
  border-radius: 25px;
  border: none;
  text-indent: 1rem;
  width: 100%;
  color: #f72585;
}

.platformItem {
  border-radius: 25px;
}

.platformItem:hover {
  background-color: #f72585;
  color: #fff;
}

.storeNameBox {
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
}

.storeName {
  position: relative;
  background: #fff;
  border-radius: 50px;
  border: none;
  text-indent: 1rem;
}

.storeEntry:focus-visible {
  outline: none;
}

.storeEntry {
  border: none;
  color: #8d8d8d;
}

.searchBtn {
  background-color: rgba(0, 0, 0, 0);
}

.searchBtn:hover .searchIcon {
  opacity: 0.8;
}

:deep(.el-icon) {
  z-index: -1;
}

:deep(.el-carousel__container) {
  height: 100%;
  padding-top: 28%;
}

.searchCol {
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right, #4361ee 0%, #f72585 100%);
  border-image-slice: 1;
}

.platformTitle {
  background: linear-gradient(to bottom, #f72585, #7b2cbf);
  background: -webkit-linear-gradient(#f72585, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  font-size: 44px;
}

.platformImgBox {
  display: flex;
  justify-content: center;
  align-content: center;
  box-shadow: 0px 10px 10px 2px #ccc;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 10px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.platformImg {
  width: 100%;
}

.storeBox {
  position: relative;
  border-radius: 15px;
  border: none;
  margin-bottom: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  overflow: hidden;
}

.storeContent {
  position: relative;
  background: #fff;
  border-radius: 10px;
  border: none;
  padding: 2rem;
  width: 100%;
  aspect-ratio: 1876/584;
  background-image: url('/images/bg-wave01.png');
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
}

/* 商家資訊 */
.storeImg {
  border-radius: 10px;
}

.storeImgBox {
  position: relative;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 10px;
  border: none;
  display: flex;
  align-content: center;
  aspect-ratio: 1/1;
  padding: 2px;
  justify-content: center;
  align-content: center;
}

.storeImgCol {
  height: 210px;
  padding-right: 2rem;
  border-right: 3px #ccc dashed;
}

.storeDetailCol {
  width: calc(100% - 400px);
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  overflow: hidden;
}

.orderBox {
  position: relative;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
  display: flex;
  align-content: center;
  padding: 1px;
}

.orderBtn {
  position: relative;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
  display: flex;
  align-content: center;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  /* padding: 0.5rem 1.2rem; */
  width: 195px;
  height: 75px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.orderBtn:hover {
  background: #fff;
  color: #f72585;
}

/* 側邊欄 */
.sideBar {
  width: 23%;
  position: fixed;
  top: 0;
  right: 8px;
  margin-top: 14.5rem;
}

:deep(.el-overlay) {
  background-color: rgba(0, 0, 0, 0.1);
}

:deep(.el-dialog) {
  box-shadow: none;
  border-radius: 10px;
}

    .aboutContent {
        height: 130px;
        overflow: hidden;
        line-height: 35px;
        display: block; /* Remove flexbox-related properties */
        position: relative;
    }

        .aboutContent::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 35px; /* Match line-height or adjust for fade effect */
            background: linear-gradient(transparent, white); /* Optional: fade to background color */
        }

:deep(.el-pager > .number) {
  color: #f72585;
  margin: 0 5px;
  font-size: 20px;
}

:deep(.el-pagination > .btn-prev > .el-icon) {
  color: #f72585;
  font-size: 20px;
  margin: 0 5px;
}

:deep(.el-pagination > .btn-next > .el-icon) {
  color: #f72585;
  font-size: 20px;
  margin: 0 5px;
}

:deep(.el-pagination) {
  --el-pagination-bg-color: rgba(0, 0, 0, 0);
  --el-pagination-button-disabled-bg-color: rgba(0, 0, 0, 0);
}

:deep(.el-pager > .is-active) {
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50%;
  color: #fff;
}

:deep(.el-carousel__item) {
  border-radius: 10px;
  display: flex;
  align-content: center;
}

@media screen and (max-width: 768px) {
  .storeBox {
    max-height: unset;
    width: 100%;
    aspect-ratio: unset;
    border-radius: 13px;
    margin-bottom: 80px;
    overflow: visible;
  }

  .storeDetailCol {
    width: 100%;
    padding: 0;
    padding-top: 6rem;
    margin-bottom: 1rem;
  }

  .storeImgBox {
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
  }

  .storeImgCol {
    padding-right: 0;
    border-right: none;
    position: absolute;
    top: -55px;
    left: 0;
  }

  .storeContent {
    position: relative;
    border-radius: 12px;
    border: none;
    width: 100%;
    max-height: 343px;
    padding: 0;
    background-image: url('/images/bg-wave02.png');
  }

  .orderBox {
    border-radius: 20px;
    margin-bottom: 10px;
  }

  .orderBtn {
    border-radius: 20px;
    border: none;
    display: flex;
    align-content: center;
    color: #fff;
    font-weight: 600;
    /* padding: 1rem 1.8rem; */
    width: 120px;
    height: 40px;
    font-size: 16px;
  }

  /* .carouselContainer {
        position: relative;
        width:100%;
        display: flex;
        justify-content: center;
    } */
  .mb-300px-important {
    margin-bottom: 220px !important;
  }
}
</style>
