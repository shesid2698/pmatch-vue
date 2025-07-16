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
            <!-- 分類選單按鈕 -->
            <template v-for="(type, index) in [4, 5, 6]" :key="type">
              <button
                @click="activityCategory = type; currentPage = 1; selectedPlatform = ''"
                :class="[
                  'border-none px-4 py-1 rounded transition-all hover:text-16.5px hover:bg-[#FF8800] hover:text-[#353535] hover:cursor-pointer',
                  activityCategory === type ? 'bg-[#FFF0C7] text-[#8E856F] text-16.5px' : 'bg-transparent text-[#7E7E7E] text-15px',
                  btnWidthMap[type]
                ]"
              >
                {{ categoryMap[type] }}
              </button>
              <div v-if="index !== 2" class="w-px h-7 bg-white my-0.5"></div>
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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
          <NuxtLink
            v-for="item in paginatedActivities"
            :key="item.Id"
            :to="`/activity/${item.Id}`" 
            class="relative border rounded-md overflow-hidden bg-white transition-all block no-underline shadow-md hover:shadow-lg hover:cursor-pointer"
          >
            <!-- 置頂標籤 -->
            <img
              v-if="item.IsTop"
              src="/activity/is_top.svg"
              alt="置頂"
              class="absolute top-10px left-[-4px] w-10 z2"
            />
            <!-- 遮罩 -->
            <div v-if="item.isEnded"
                class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl z-2">
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
                  <div class="text-white text-shadow-sm text-lg leading-none font-bold">{{ item.Title }}</div>
                  <div class="text-white text-shadow-sm text-0.6rem leading-none">{{ item.Summary }}</div>
                </div> 
              </template>
            </div>
            <!-- 中線 -->
            <div class="bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white py-1"></div>
            <!-- 說明 -->
            <div class="font-bold px-3 leading-none">
              <p class="text-gray-400 text-11.5px my-1.5" v-if="item.Category === 5" >活動媒合商：{{ item.StoreName }}</p>
              <p class=" text-gray-700 text-14.5px my-1.5">活動名稱：{{ item.Title }}</p>
              <p class="text-gray-400 text-13px my-2">活動時間：{{ item.StartTime?.split?.('T')?.[0] ?? '未填寫' }} ~ {{ item.EndTime?.split?.('T')?.[0] ?? '未填寫' }}</p>
            </div>
          </NuxtLink>
        </div>        
      </div>
     
    <!-- 分頁按鈕 -->
    <div class="flex justify-center mt-[2rem]">
      <el-pagination layout="prev, pager, next" :current-page="currentPage" :page-size="itemsPerPage"
        :total="filteredActivities.length" @current-change="changePage"/>
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

  // 下拉式選單
  const isDropdownOpen = ref(false)
  const dropdownRef = ref(null)
  
  const platformList = ref([])
  const platformOptions = computed(() => {
    return [
      { label: '全部平台', value: '' },
      ...platformList.value.map(p => ({
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

  // 根據媒合商 ID 篩選平台
  const filteredActivities = computed(() => {
    return paginatedCategory.value.filter(item => {
      if (!selectedPlatform.value) return true

      // 只有「媒合商活動」(Category 5)，才會篩選平台
      if (activityCategory.value === 5) {
        const selected = platformList.value.find(p => p.PlatformId === selectedPlatform.value)
        const characterIds = selected?.Characters.map(c => c.Id) || []
        return characterIds.includes(item.StoreId)
      }

      return true
    })
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
    4: 'sm:min-w-[98px]',
    5: 'sm:min-w-[115px]',
    6: 'sm:min-w-[162px]',
  }

   // 分頁計算
  const currentPage = ref(1);
  const itemsPerPage = 9;

  const paginatedActivities = computed(() => {
    const now = new Date()

    // 篩掉已結束的非熱門活動
    const visibleItems = filteredActivities.value
      .map(item => {
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
      .filter(item => {
        // 所有活動若尚未開始都不顯示
        if (item.notStarted) return false
        // 非熱門活動，且已結束也不顯示
        if (item.Category !== 4 && item.isEnded) return false

        return true
    })
 
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return visibleItems.slice(start, end)
  })

  // 切換頁面
  function changePage(page) {
    currentPage.value = page
  };

  // 取得遊戲平台資訊
  let token = userToken.value

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
      
      // 先將 isTop 為 true 的放前面，並各自按 CreateTime 新 → 舊排序
      const topItems = newData
        .filter(item => item.IsTop)
        .sort((a, b) => new Date(b.CreateTime) - new Date(a.CreateTime))

      const normalItems = newData
        .filter(item => !item.IsTop)
        .sort((a, b) => new Date(b.CreateTime) - new Date(a.CreateTime))

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

  onMounted(async () => {
    await fetchGameList(token)
    await nextTick()
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