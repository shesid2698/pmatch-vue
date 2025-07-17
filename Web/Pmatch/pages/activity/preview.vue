<template>
  
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>

  <div class="mt-2.5rem max-w-1000px m-auto page font-events mb-[-6rem]">
      <!-- 成功獲取資料時 -->
      <div v-if="activityItem">
        <div class="relative aspect-[25/7] overflow-hidden">
          <!-- 自訂圖片 -->
          <img
            v-if="activityItem.imageUrl"
            :src="activityItem.imageUrl"
            alt="自訂主視覺"
            class="w-full h-full object-cover object-center"
          /> 
          <!-- 預設圖片 -->
          <template v-else>
            <div class="relative">
              <img :src="bannerTypeMap[activityItem.bannerType]?.picture" alt="活動主視覺" class="w-full block" />
              <div :class="bannerTypeMap[activityItem.bannerType]?.position">
                <div class="text-white text-shadow-md md:text-[16px] text-[12px] leading-none">活動時間：{{ activityItem.StartTime?.split?.('T')?.[0] ?? '未填寫' }} ~ {{ activityItem.EndTime?.split?.('T')?.[0] ?? '未填寫' }}</div>
                <div class="text-white text-shadow-md md:text-[64px] text-[48px] leading-none mb-0.5 font-bold">{{ activityItem.Title }}</div>
                <div class="text-white text-shadow-md md:text-[36px] text-[27px] leading-none">{{ activityItem.Summary }}</div>
              </div>
            </div>
          </template>
        </div>

        <!-- 商店區塊 -->
        <div class="bg-gradient-to-r from-[#E4AF47] to-[#E68600] text-white py-3 px-4 md:py-4 ">
          <NuxtLink
            :href="activityItem.Url ? activityItem.Url : '#'"
            class="inline-flex items-center gap-4 no-underline text-inherit hover:text-inherit focus:outline-none"
            :class="activityItem.Url ? '' : 'cursor-default '"
            :target="activityItem.Url ? '_blank' : ''"
          >
            <img v-if="activityItem.storeImage" :src="activityItem.storeImage" alt="商店圖示" class="md:w-[95px] md:h-[95px] w-[78px] h-[78px]" />
            <div class="">
              <div class="md:text-[64px] text-[48px] leading-none mb-2">{{ activityItem.storeName }}</div>
              <div class="md:text-[24px] text-[18px] leading-none">活動時間：{{ activityItem.StartTime?.split?.('T')?.[0] ?? '未填寫' }} ~ {{ activityItem.EndTime?.split?.('T')?.[0] ?? '未填寫' }}</div>
            </div>
          </NuxtLink>
        </div>

        <!-- 活動內容 -->
        <div class="p-4 min-h-xl" :class="backgroundMap[activityItem.background]">
          <div class="text-[#3B5BC4] text-3xl px-2 mb-2">活動內容</div>
          <div class="text-[#3B5BC4] text-xl break-words leading-relaxed px-4" v-html="activityItem.Content"></div>
        </div>
        <div class="w-100% text-center mt-50px pointer-events-none">
            <button class="backBtn">回上層</button>
        </div>
      </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const assetsUrl = useCookie('_PmAssetsUrl').value || ''
  const activityList = ref([]);

 // 解析圖片 url 字串
  function parseImgFile(imgFile) {
    const preset = {
      imageUrl: '',
      bannerType: 0,
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

  // 主題樣式
  const bannerTypeMap = {
    1: {
      picture: '/activity/banner_1.png',
      position: 'absolute top-8.5% right-4% flex flex-col items-end gap-2'
    },
    2: {
      picture: '/activity/banner_2.png',
      position: 'absolute bottom-10% left-3% flex flex-col items-start gap-2'
    },
    3: {
      picture: '/activity/banner_3.png',
      position: 'absolute bottom-10.75% right-2.5% flex flex-col items-end gap-2'
    },
    4: {
      picture: '/activity/banner_4.png',
      position: 'absolute bottom-5.25% right-2% flex flex-col items-end gap-2'
    },
    5: {
      picture: '/activity/banner_5.png',
      position: 'absolute bottom-9.5% right-2% flex flex-col items-end gap-2'
    },
    6: {
      picture: '/activity/banner_6.png',
      position: 'absolute bottom-8.5% left-3% flex flex-col items-start gap-2'
    },
    7: {
      picture: '/activity/banner_7.png',
      position: 'absolute bottom-5.5% right-2.25% flex flex-col items-end gap-2'
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
  const backgroundMap = {
    0: 'shadow-[inset_0_-4px_6px_rgba(0,0,0,0.07)] bg-white',
    1: 'shadow-[inset_0_-4px_6px_rgba(59,91,196,0.08)] bg-gradient-to-b from-[#FEFEFE] to-[#e6ecfc]',
    2: 'shadow-[inset_0_-4px_6px_rgba(255,197,0,0.15)] bg-gradient-to-b from-[#FFFBF0] to-[#FFF0C7]',
    3: 'shadow-[inset_0_-4px_6px_rgba(0,0,0,0.06)] bg-[#FAFAFA]',
    4: 'shadow-[inset_0_-4px_6px_rgba(0,180,150,0.12)] bg-gradient-to-b from-[#E3FFFA] to-[#B1FFF1]',
    5: 'shadow-[inset_0_-4px_6px_rgba(255,105,135,0.12)] bg-gradient-to-b from-[#FFF0F6] to-[#FFD6E5]',
    6: 'shadow-[inset_0_-4px_6px_rgba(255,120,80,0.12)] bg-gradient-to-b from-[#FFEEE6] to-[#FFD2BF]',
    7: 'shadow-[inset_0_-4px_6px_rgba(180,180,0,0.1)] bg-gradient-to-b from-[#FDFFEB] to-[#F5FF9F]',
    8: 'shadow-[inset_0_-4px_6px_rgba(160,120,200,0.2)] bg-gradient-to-b from-[#FAF0FF] to-[#D8BFE6]'
  };

  // 初始化活動頁
  const activityItem = ref(null)

  onMounted(() => {
    // 將 query string 還原成活動資料物件 
    const query = route.query;

    const Item = {
      Title: decodeURIComponent(query.Title || ''),
      Summary: decodeURIComponent(query.Summary || ''),
      Content: decodeURIComponent(query.Content || ''),
      ImgFile: decodeURIComponent(query.ImgFile || ''),
      storeImage: `${assetsUrl}${decodeURIComponent(query.StoreImage || '')}`,
      storeName: decodeURIComponent(query.StoreName || ''),
      Url: decodeURIComponent(query.Url || ''),
      StartTime: decodeURIComponent(query.StartTime || ''),
      EndTime: decodeURIComponent(query.EndTime || '')
    }

    const { imageUrl, bannerType, background } = parseImgFile(Item.ImgFile)
    Item.imageUrl = imageUrl
    Item.bannerType = bannerType
    Item.background = background

    activityItem.value = Item
})

watch(activityItem, (value) => {
  if (value) {
    activityList.value = [{ ...value }]
  }
});

</script>

<style scoped>
  .font-events {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  }
</style>