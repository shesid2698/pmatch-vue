<template>

  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>

  <div class="dot1 select-none pointer-events-none">
    <img src="/images/bg-dot03.png" width="100%" alt="">
  </div>
  <div class="dot2 select-none pointer-events-none">
    <img src="/images/bg-dot04.png" width="100%" alt="">
  </div>

  <div class="max-w-1000px m-auto mt-5rem ps-5 pe-5 relative z-2">      
      <div class="bg-white min-h-2xl font-events">
        <!-- 分類選單 -->
        <div class="navGradient rounded-lg px-7 py-1.5">
          <div class="flex justify-start gap-2.5">
            <!-- <template v-for="(type, index) in ['熱門活動', '媒合商活動', '遊戲平台活動資訊']" :key="type">
              <button
                @click="activityCategory = type; currentPage = 1"      
                :class="[
                  'border-none px-4 py-1 rounded transition-all hover:text-16.5px hover:bg-[#FF8800] hover:text-[#353535] hover:cursor-pointer',
                  activityCategory === type ? 'bg-[#FFF0C7] text-[#8E856F] text-16.5px' : 'bg-transparent text-[#7E7E7E] text-15px',
                  btnWidthMap[type]
                ]"
              >
                {{ type }}
              </button>
              <div v-if="index !== 2" class="w-px h-7 bg-white my-0.5"></div>
            </template>          -->
            <template v-for="(type, index) in [4, 5, 6]" :key="type">
              <button
                @click="activityCategory = type; currentPage = 1"
                :class="[
                  'border-none px-4 py-1 rounded transition-all hover:text-16.5px hover:bg-[#FF8800] hover:text-[#353535] hover:cursor-pointer',
                  activityCategory === type ? 'bg-[#FFF0C7] text-[#8E856F] text-16.5px' : 'bg-transparent text-[#7E7E7E] text-15px',
                  btnWidthMap[type]
                ]"
              >
                {{ categoryMap[type] }}  <!-- 顯示中文 -->
              </button>
              <div v-if="index !== 2" class="w-px h-7 bg-white my-0.5"></div>
            </template>
          </div>
        </div>
        <!-- 下拉選單 -->
        <div ref="dropdownRef" class="relative inline-block w-48 my-2">
          <!-- 主按鈕 -->
          <div
            class="flex justify-between items-center border rounded-xl px-4 py-2 text-sm cursor-pointer transition-all border-solid border-[#FFBB00]"
            :class="[
              isDropdownOpen ? 'bg-[#505050] text-[#cfcfcf]' : 'bg-white text-black border-[#FFBB00] hover:bg-[#efefef] hover:text-[#666666]',
              isDropdownOpen ? 'shadow-[0_0_6px_rgba(255,136,0,0.7)]' : '',
            ]"
            @click="toggleDropdown"
          >
            <span>{{ selectedPlatformLabel }}</span>
            <svg class="w-4 h-4 ml-2 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293L10 12l4.707-4.707-1.414-1.414L10 9.172 6.707 5.879z" />
            </svg>
          </div>

          <!-- 下拉內容 -->
          <div
            v-if="isDropdownOpen"
            class="absolute z-10 mt-2 w-full bg-white border border-[#F6C940] rounded-md shadow-lg text-sm overflow-hidden"
          >
            <div
              v-for="option in platformOptions"
              :key="option.value"
              @click="selectPlatform(option)"
              class="px-4 py-2 cursor-pointer transition-all relative before:content-[''] before:block before:h-px before:absolute before:left-4 before:right-4 before:bottom-0 before:bg-[linear-gradient(to_right,#FFBB00,transparent)] last:before:hidden"
              :class="[
                selectedPlatform === option.value
                  ? 'bg-[radial-gradient(circle,#FFBB00,transparent)] text-[#553CE5]'
                  : 'hover:bg-[radial-gradient(circle,#FFE9AC,transparent)] hover:text-[#4B4B4B]'
              ]"
            >
              {{ option.label }}
            </div>
          </div>
        </div>

        <!-- 活動卡片區塊 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="item in paginatedActivities "
            :key="item.Id"
            :to="`/activity/${item.Id}`" 
            class="relative border rounded-md overflow-hidden bg-white transition-all block no-underline shadow-md hover:shadow-lg hover:cursor-pointer"
          >
            <!-- 遮罩 -->
            <div v-if="item.isEnded"
                class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl z-2">
              已結束
            </div>
            <!-- 主圖|自訂議 -->
            <div class="relative">
              <img
                v-if="parseImgFile(item.ImgFile).bannerType && parseImgFile(item.ImgFile).imageUrl"
                :src="parseImgFile(item.ImgFile).imageUrl"
                alt="自訂主視覺"
                class="w-full block"
              />
              <!-- 主圖|預設 -->
              <template v-else>
                <img :src="bannerTypeMap[item.bannerType]?.picture" alt="活動主視覺" class="w-full block" />
                <div :class="bannerTypeMap[item.bannerType]?.position">
                  <div class="text-white text-shadow-sm text-lg leading-none font-bold">{{ item.Title }}</div>
                  <div class="text-white text-shadow-sm text-0.6rem leading-none">{{ item.Summary }}</div>
                </div> 
              </template>
            </div>
            <!-- 中線 -->
            <div class="bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white py-1"></div>
            <!-- 說明 -->
            <div class="font-bold px-3 leading-none">
              <!-- <p class="text-gray-400 text-11.5px my-1.5">活動媒合商：{{ item.storeName }}</p> -->
              <p class=" text-gray-700 text-14.5px my-1.5">活動名稱：{{ item.Title }}</p>
              <p class="text-gray-400 text-13px my-2">活動時間：{{ item.StartTime?.split?.('T')?.[0] ?? '未提供' }} ~ {{ item.EndTime?.split?.('T')?.[0] ?? '未提供' }}</p>
            </div>
          </NuxtLink>
        </div>        
      </div>
     
    <!-- 分頁按鈕 -->
    <div class="flex justify-center mt-[2rem]">
      <el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="itemsPerPage"
        :total="activityList.length" @current-change="changePage" />
    </div>
  </div>        
</template>

<script setup>
  const jwtStore = useJwtStore()
  const userToken = useCookie('_PmToken')
  const { $axios } = useNuxtApp();
  const assetsUrl = useCookie('_PmAssetsUrl').value;


  // 下拉式選單
  const selectedPlatform = ref('')
  const isDropdownOpen = ref(false)
  const dropdownRef = ref(null)
  const platformOptions = [
    { label: '全部平台', value: '' },
    { label: '滿漢大亨', value: '滿漢大亨' },
    { label: '包你發娛樂城', value: '包你發娛樂城' },
    { label: '錢街Online', value: '錢街Online' },
  ]
  const selectedPlatformLabel = computed(() => {
    const found = platformOptions.find(opt => opt.value === selectedPlatform.value)
    return found?.label || '全部平台'
  })
  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }
  function selectPlatform(option) {
    selectedPlatform.value = option.value
    isDropdownOpen.value = false
  }

  // 分類對應
   const categoryMap = {
    4: '熱門活動',
    5: '媒合商活動',
    6: '遊戲平台活動資訊',
  }
  // 按鈕寬度
  const btnWidthMap = {
    4: 'sm:min-w-[98px]',
    5: 'sm:min-w-[115px]',
    6: 'sm:min-w-[162px]',
  }
  // 活動類型
  const activityCategory = ref(4) // 熱門活動

 
  const paginatedCategory = computed(() => {
    return activityList.value.filter(item => item.Category === activityCategory.value)
  })

  const bannerTypeMap = {
    1: {
      picture: '/activity/banner_1.png',
      position: 'absolute top-20% right-4% flex flex-col items-end gap-2'
    },
    2: {
      picture: '/activity/banner_2.png',
      position: 'absolute bottom-5% left-3% flex flex-col items-start gap-2'
    },
    3: {
      picture: '/activity/banner_3.png',
      position: 'absolute bottom-6% right-2.5% flex flex-col items-end gap-2'
    },
    4: {
      picture: '/activity/banner_4.png',
      position: 'absolute bottom-2% right-3% flex flex-col items-end gap-2'
    },
    5: {
      picture: '/activity/banner_5.png',
      position: 'absolute bottom-6% right-3% flex flex-col items-end gap-2'
    },
    6: {
      picture: '/activity/banner_6.png',
      position: 'absolute bottom-5% left-3% flex flex-col items-start gap-2'
    },
    7: {
      picture: '/activity/banner_7.png',
      position: 'absolute bottom-3% right-3% flex flex-col items-end gap-2'
    },
    8: {
      picture: '/activity/banner_8.png',
      position: 'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-2 w-[90%] '
    },
    9: {
      picture: '/activity/banner_9.png',
      position: 'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-2 w-[90%] '
    }
  };

    const activityList = ref([
    {
      Id: 0,
      Category: 5,
      Title: "不要吵==我是第一張圖",
      Summary: "副標題或一些有的沒的共十五個字",
      Url: "https://www.pmatch.com.tw/",
      ImgFile: "preview-headshot",
      StoreId: 0,
      StoreName: "B商店",
      Content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      StartTime: "2025-06-01T00:00:00",
      EndTime: "2025-08-31T00:00:00",
      CreateTime: "2025-06-01T00:00:00",
      ModifyTime: "2025-06-01T00:00:00",
      CreateUser: "",
      ModifyUser: "",
      Hits: 0,
      IsDeleted: false,
      IsHot: false,
      IsTop: false,
      IsOpenWindow: false,
      SortingId: 0,
    },
  ]);
  

  // 分頁計算
  const currentPage = ref(1);
  const itemsPerPage = 9;

  const paginatedActivities = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage

    const now = new Date();


    return paginatedCategory.value.slice(start, end).map(item => {
    const endDate = new Date(item.EndTime.replaceAll('/', '-'));
      return {
        ...item,
        isEnded: endDate < now
      };
    });
  });

  // 切換頁面
  function changePage(page) {
    currentPage.value = page
  };

  // 點擊外部關閉選單
  function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  }
  let token = userToken.value

  // 取得GetPlatformAndCharacterList(遊戲平台資訊)
  async function fetchGameList() {

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

      const data = response.data?.Data ?? []
      console.log('API 回傳筆數：', data.length)
      console.table(data)

    } catch (error) {
      console.error('請求失敗:', error);
      data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
    }
  }



  async function fetchAdvertisementList() {
    try {
      
      // 若 cookie 裡沒有 token，則向 jwtStore 要求生成並補上
      if (!token || token === '') {
        token = await jwtStore.generateToken()
      }

      console.log('最終使用的 token：', token)

      const response = await $axios.post(
        // 'http://localhost:2310/api/v1/Pmatch/GetAdvertisementList',
        'http://192.168.10.206:3310/api/v1/Pmatch/GetAdvertisementList',
        {
            "Category": [4, 5, 6] // 4: 熱門活動； 5：媒合商活動； 6：遊戲平台活動資訊；
        },
        {
          headers: {
            Authorization: token,
            // 'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          }
        }
      )
      const data = response.data?.Data ?? []
      console.log('API 回傳筆數：', data.length)
      console.table(data)


      activityList.value = data.map(item => {
        const { imageUrl, bannerType, background } = parseImgFile(item.ImgFile)


        // ✅ 單獨顯示有 imageUrl 的圖片資訊
        if (imageUrl) {
          console.log('🖼️ 自訂圖片網址：', imageUrl)
          console.log('對應活動標題：', item.Title)
          console.log('原始 ImgFile：', item.ImgFile)
        }

        return {
          ...item,
          category: categoryMap[item.Category],
          imageUrl,
          bannerType,
          background
        }
      })


      console.table(data.map(i => ({
        原始分類: i.Category,
        轉換後: categoryMap[i.Category],
      })))
    } catch (error) {
      console.error('請求失敗：', error);
      data.value = '無法取得資料。';
    }
  }

  // 解析 ImgFile
  function parseImgFile(imgFile) {
    const preset = {
      imageUrl: '',
      bannerType: 5,
      background: 0
    }

    if (!imgFile || typeof imgFile !== 'string') return preset

    // case 1: 主題編號_背景編號
    const defaultImage = imgFile.match(/^pmatch(\d)_(\d)$/)
    if (defaultImage) {
      const x = parseInt(defaultImage[1], 10)
      const y = parseInt(defaultImage[2], 10)
      return {
        imageUrl: '',
        bannerType: x >= 1 && x <= 9 ? x : preset.bannerType,
        background: y >= 0 && y <= 8 ? y : preset.background
      }
    }
    // case 2: 圖片路徑_背景編號 (從最後的底線判斷)
    const customImage = imgFile.lastIndexOf('_')
    if (customImage  > -1) {
      const url = imgFile.slice(0, customImage )
      const bg = parseInt(imgFile.slice(customImage  + 1), 10)

      if (!isNaN(bg)) {
        return {
          imageUrl: `${assetsUrl}${url}`,
          bannerType: 0,
          background: bg >= 0 && bg <= 8 ? bg : preset.background
        }
      }
    }
    return preset
  }

watchEffect(() => {
  console.log('目前分類：', activityCategory.value)
  console.log('篩選筆數：', paginatedCategory.value.length)
  console.log('🧾 當前活動列表：', activityList.value.map(a => a.category))

})
  onMounted(() => {
    fetchAdvertisementList()
    fetchGameList()
    document.addEventListener('click', handleClickOutside)    
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped>
  .font-events {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  .navGradient {
    background: linear-gradient(to right, #FFBB00 75%, #FFE9AC 100%);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.5);
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
</style>