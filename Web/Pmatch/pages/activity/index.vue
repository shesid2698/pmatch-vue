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

  <div class="max-w-1113px m-auto mt-5rem ps-5 pe-5 relative z-2">      
    <div class="bg-white min-h-[688px] font-events">
      <!-- 分類選單 -->
      <div class="navGradient rounded-lg sm:px-7 px-6.5 py-1.5 sm:h-[43px] h-[31px] flex items-center">
        <div class="flex justify-start gap-2.5">
          <!-- 分類選單按鈕 -->
          <template v-for="(type, index) in [4, 5, 6]" :key="type">
            <button
              @click="activityCategory = type; currentPage = 1; selectedPlatform = ''"
              :class="[
                'border-none px-4 py-0.75 rounded transition-all sm:hover:text-24px hover:text-18px hover:bg-[#FF8800] hover:text-[#353535] hover:cursor-pointer',
                activityCategory === type ? 'bg-[#FFF0C7] text-[#8E856F] sm:text-24px text-18px' : 'bg-transparent text-[#7E7E7E] sm:text-20px text-15px',
                btnWidthMap[type]
              ]"
            >
              {{ categoryMap[type] }}
            </button>
            <div v-if="index !== 2" class="w-px sm:h-9 h-7 bg-white my-0.5"></div>
          </template>
        </div>
      </div>
      <!-- 下拉選單(媒合商活動) -->
      <div v-if="activityCategory === 5" ref="dropdownRef" class="relative inline-block w-36 my-2">
        <!-- 主按鈕 -->
        <div
          class="flex justify-between items-center border rounded-xl px-3 py-1.25 text-sm cursor-pointer transition-all border-solid border-[#FFBB00]"
          :class="[
            isDropdownOpen ? 'bg-[#505050] text-[#cfcfcf]' : 'bg-white text-black border-[#FFBB00] hover:bg-[#efefef] hover:text-[#666666]',
            isDropdownOpen ? 'shadow-[0_0_6px_rgba(255,136,0,0.7)]' : '',
          ]"
          @click="toggleDropdown"
        >
          <span>{{ selectedPlatformLabel }}</span>
          <svg v-if="!isDropdownOpen" class="h-3 ml-2 fill-[#FFBB00]" viewBox="0 0 14 12">
            <path d="M8.73205 11C7.96225 12.3333 6.03775 12.3333 5.26795 11L0.937819 3.5C0.168019 2.16666 1.13027 0.500001 2.66987 0.500001L11.3301 0.500001C12.8697 0.500002 13.832 2.16667 13.0622 3.5L8.73205 11Z" />
          </svg>
          <svg v-else class="h-3 ml-2 fill-[#FFBB00]" viewBox="0 0 14 12">
            <path d="M8.73205 0.999997C7.96225 -0.333336 6.03775 -0.333333 5.26795 1L0.937819 8.5C0.168018 9.83334 1.13027 11.5 2.66987 11.5L11.3301 11.5C12.8697 11.5 13.832 9.83333 13.0622 8.5L8.73205 0.999997Z" />
          </svg>
        </div>

        <!-- 下拉內容 -->
        <div
          v-if="isDropdownOpen"
          class="absolute z-10 w-full bg-white border border-[#F6C940] rounded-md shadow-lg text-sm overflow-hidden"
        >
          <div
            v-for="option in platformOptions"
            :key="option.value"
            @click="selectPlatform(option)"
            class="px-3 py-1.25 cursor-pointer transition-all relative before:content-[''] before:block before:h-px before:absolute before:left-2.5 before:right-2.5 before:bottom-0 before:bg-[linear-gradient(to_right,#FFBB00,transparent)] last:before:hidden"
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
      
      <template v-else>
        <div class="w-36 h-[32px] my-2"></div>
      </template>

      <!-- 活動卡片區塊 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-9 px-0.5">
        <NuxtLink
          v-for="item in paginatedActivities"
          :key="item.Id"
          :to="activityCategory === 5 ? `/activity/${item.Id}` : item.Url"
          :target="activityCategory !== 5 && item.IsOpenWindow ? '_blank' : '_self'"
          class="relative border rounded-md overflow-hidden bg-white transition-all block no-underline shadow-md hover:shadow-lg hover:cursor-pointer"
        >
          <!-- 置頂標籤 -->
          <img
            v-if="item.IsTop && !item.isEnded"
            src="/activity/is_top.svg"
            alt="置頂"
            class="absolute md:top-9px md:w-8 lg:top-12px lg:w-10 top-12px w-10 left-[-4px] z2"
          />
          <!-- 遮罩 -->
          <div v-if="item.isEnded"
              class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[24px] z-2">
            已結束
          </div>
          <!-- 主圖|自訂議 -->
          <div class="relative aspect-[25/7] overflow-hidden">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              alt="自訂主視覺"
              class="w-full h-full object-cover object-center"
            />
            <!-- 主圖|預設 -->
            <template v-else>
              <img :src="bannerTypeMap[item.bannerType]?.picture" alt="活動主視覺" class="w-full block" />
              <div :class="bannerTypeMap[item.bannerType]?.position">
                <div class="text-white text-shadow-sm text-24px lg:text-24px md:text-16px leading-none mb-[-3px] font-bold">{{ item.Title }}</div>
                <div class="text-white text-shadow-sm text-13.5px lg:text-13.5px md:text-9px leading-none">{{ item.Summary }}</div>
              </div> 
            </template>
          </div>
          <!-- 中線 -->
          <div class="bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white py-1.25"></div>
          <!-- 說明 -->
          <div class="font-bold px-3 leading-none h-[65px] flex flex-col items-start justify-center">
            <p class="text-gray-400 md:text-10px lg:text-11.5px text-11.5px my-1" v-if="item.Category === 5" >活動媒合商：{{ item.StoreName }}</p>
            <p class=" text-gray-700 md:text-13px lg:text-16px text-16px" :class="[activityCategory !== 5 ? 'my-1' : 'my-0.5']">活動名稱：{{ item.Title }}</p>
            <p class="text-gray-400 md:text-11px lg:text-13px text-13px" :class="[activityCategory !== 5 ? 'my-1.25' : 'my-1']">活動時間：{{ item.StartTime?.split?.('T')?.[0] ?? '未填寫' }} ~ {{ item.EndTime?.split?.('T')?.[0] ?? '未填寫' }}</p>
          </div>
        </NuxtLink>
      </div>        
    </div>
    <!-- 分頁按鈕 -->
    <div class="flex justify-center mt-[2rem]">
      <el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="itemsPerPage"
        :total="visibleActivities.length" @current-change="changePage"/>
    </div>
  </div>        
</template>

<script setup>
  const { $axios } = useNuxtApp();
  const userToken = useCookie('_PmToken')
  const jwtStore = useJwtStore()

  // 活動類型
  const activityCategory = useState('activityCategory', () => 4)  // 熱門活動
  const paginatedCategory = computed(() => {
    return activityList.value.filter(item => item.Category === activityCategory.value)
  })

  // 可顯示項目(加入時間判斷)
  function visibleItems(Item) {
    const now = new Date()
    return Item.map(item => {
      const startDate = new Date(item.StartTime.replaceAll('/', '-'))
      const endDate = new Date(item.EndTime.replaceAll('/', '-'))

      const notStarted = startDate > now
      const isEnded = endDate < now

      return {
        ...item,
        isEnded,
        notStarted,
        _endDate: endDate
      }
    })
  }
  // 當前畫面顯示列表
  const visibleActivities= computed(() => {
    const items = visibleItems(paginatedCategory.value).filter(item => {
      if (item.notStarted) return false
      // 只顯示進行中的活動 (熱門活動除外)
      if (item.Category !== 4 && item.isEnded) return false
      // 媒合商活動 根據下拉式選單顯示媒合商活動）
      if (activityCategory.value === 5 && selectedPlatform.value) {
        const selected = platformList.value.find(p => p.PlatformId === selectedPlatform.value)
        if (!selected) return false
        const charIds = selected?.Characters.map(c => c.Id) || []
        return charIds.includes(item.StoreId)
      }
      return true
    })
    // 熱門活動 排序「進行中 > 已結束」
    return items.slice().sort((a, b) => {
      if (a.Category === 4 && b.Category === 4) {
        if (a.isEnded !== b.isEnded) return a.isEnded ? 1 : -1
      }
      return 0
    })
  })

  // 下拉式選單
  const isDropdownOpen = ref(false)
  const dropdownRef = ref(null)  

  const platformList = ref([])
  const platformOptions = computed(() => {
    // 只在媒合商活動時套用篩選
    if (activityCategory.value !== 5) {
      return [{ label: '全部平台', value: '' }]
    }
    // 收集目前活動中出現過的 StoreId
    const usedPlatformIds = new Set(
      visibleItems(paginatedCategory.value)
        .filter(item => !item.notStarted && !item.isEnded && item.Category === 5)
        .map(item => item.StoreId)
    )
    // 從 platformList 中找出有包含 StoreId 的 Platform
    const visiblePlatforms = platformList.value.filter(platform =>
      platform.Characters.some(char => usedPlatformIds.has(char.Id))
    )
    return [
      { label: '全部平台', value: '' },
      ...visiblePlatforms.map(p => ({
        label: p.PlatformName,
        value: p.PlatformId
      }))
    ]
  })

  const selectedPlatform = ref('')
  const selectedPlatformLabel = computed(() => {
    const found = platformOptions.value.find(opt => opt.value === selectedPlatform.value)
    return found?.label || '全部平台'
  })

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }
  function selectPlatform(option) {
    selectedPlatform.value = option.value
    currentPage.value = 1
    isDropdownOpen.value = false
  }
  // 點擊外部關閉選單
  function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isDropdownOpen.value = false
    }
  } 
  // 分類對應
   const categoryMap = {
    4: '熱門活動',
    5: '媒合商活動',
    6: '遊戲平台活動資訊',
  }
  // 按鈕寬度
  const btnWidthMap = {
    4: 'sm:min-w-[130px] min-w-[104px]',
    5: 'sm:min-w-[155px] min-w-[122px]',
    6: 'sm:min-w-[225px] min-w-[176px]',
  }

   // 分頁計算
  const currentPage = ref(1);
  const itemsPerPage = 9;

  const paginatedActivities = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return visibleActivities.value.slice(start, end)
  })

  // 切換頁面
  function changePage(page) {
    currentPage.value = page
  };

  // 取得遊戲平台資訊
  const token = userToken.value

  async function fetchGameList() {
    if (!token || token === '') {
      token = await jwtStore.generateToken()
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

      platformList.value = data

    } catch (error) {
      console.error('請求失敗:', error);
      data.value = '無法取得資料。';
    }
  }

  // 配對平台ID
  function getCharacterById(id) {
    for (const platform of platformList.value) {
      const match = platform.Characters.find(c => c.Id === id)
      if (match) return match.Name
    }
    return '' // 找不到商店回傳空字串
  }

  // 取得活動資料
  const activityList = ref([]);

  async function fetchAdvertisementList() {
    try {      
      if (!token || token === '') {
        token = await jwtStore.generateToken()
      }
      const response = await $axios.post(
        '/api/v1/Pmatch/GetAdvertisementList',
        {
            "Category": [4, 5, 6] // 4: 熱門活動； 5：媒合商活動； 6：遊戲平台活動資訊；
        },
        {
          headers: {
            Authorization: token,
          }
        }
      )
      const data = response.data?.Data ?? []

      const newData = data.map(item => {
        const { imageUrl, bannerType, background } = parseImgFile(item.ImgFile)

        return {
          ...item,
          category: categoryMap[item.Category],
          imageUrl,
          bannerType,
          background,
          StoreName: getCharacterById(item.StoreId)
        }
      })
      
      // 先將 isTop 為 true 的放前面，並各自按 StartTime 新 → 舊排序
      const topItems = newData
        .filter(item => item.IsTop)
        .sort((a, b) => new Date(b.StartTime) - new Date(a.StartTime))

      const normalItems = newData
        .filter(item => !item.IsTop)
        .sort((a, b) => new Date(b.StartTime) - new Date(a.StartTime))

      // 合併為最後列表
      activityList.value = [...topItems, ...normalItems]

    } catch (error) {
      console.error('請求失敗：', error);
      data.value = '無法取得資料。';
    }
  }

  // 解析圖片 url 字串
  function parseImgFile(imgFile) {
    const preset = {
      imageUrl: '',
      bannerType: 0,
      background: 0
    }
    if (!imgFile || typeof imgFile !== 'string') return preset
    const assetsUrl = useCookie('_PmAssetsUrl').value || ''

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

  // 主題樣式
  const bannerTypeMap = {
    1: {
      picture: '/activity/banner_1.png',
      position: 'absolute top-17.5% right-4% flex flex-col items-end gap-2'
    },
    2: {
      picture: '/activity/banner_2.png',
      position: 'absolute top-50% left-3.5% flex flex-col items-start gap-2'
    },
    3: {
      picture: '/activity/banner_3.png',
      position: 'absolute top-50% right-3.5% flex flex-col items-end gap-2'
    },
    4: {
      picture: '/activity/banner_4.png',
      position: 'absolute top-53% right-3% flex flex-col items-end gap-2'
    },
    5: {
      picture: '/activity/banner_5.png',
      position: 'absolute top-50% right-3% flex flex-col items-end gap-2'
    },
    6: {
      picture: '/activity/banner_6.png',
      position: 'absolute top-50% left-3% flex flex-col items-start gap-2'
    },
    7: {
      picture: '/activity/banner_7.png',
      position: 'absolute top-53% right-3% flex flex-col items-end gap-2'
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

  onMounted(async () => {
    await fetchGameList(token)
    await fetchAdvertisementList(token)
    document.addEventListener('click', handleClickOutside)    

  });
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  });
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