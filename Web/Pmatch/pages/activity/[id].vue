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

  <div class="mt-5rem max-w-1000px m-auto page font-events">
      <!-- 成功獲取資料時 -->
      <div v-if="activityItem">

        <!-- 活動主視覺|自訂議圖片 -->
        <img
          v-if="activityItem.bannerType === 9 && activityItem.customizeUrl"
          :src="activityItem.customizeUrl"
          alt="活動主視覺"
          class="w-full block"
        />
        <!-- 活動主視覺|預設圖片 -->
        <template v-else>
          <div class="relative">
            <img :src="bannerTypeMap[activityItem.bannerType]?.picture" alt="活動主視覺" class="w-full block" />
            <div :class="bannerTypeMap[activityItem.bannerType]?.position">
              <div class="text-white text-shadow-md text-md">活動時間：{{ activityItem.startTime }}~{{ activityItem.endTime }}</div>
              <div class="text-white text-shadow-md text-6xl mb-1 font-bold">{{ activityItem.title }}</div>
              <div class="text-white text-shadow-md text-4xl">{{ activityItem.subTitle }}</div>
            </div>
          </div>
        </template>

        <!-- 商店區塊 -->
        <div class="flex items-center gap-4 bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white py-3 px-4">
          <img :src="activityItem.storeLogo" alt="商店圖示" class="w-16 h-16" />
          <div>
            <div class="text-5xl mb-1">{{ activityItem.storeName }}</div>
            <div class="text-md">活動時間：{{ activityItem.startTime }}~{{ activityItem.endTime }}</div>
          </div>
        </div>

        <!-- 活動內容 -->
        <div class="p-4 min-h-xl" :class="backgroundMap[activityItem.background]">
          <div class="text-[#3B5BC4] text-3xl px-2 mb-2">活動內容</div>
          <div class="text-[#3B5BC4] text-xl break-words leading-relaxed px-4">
            {{ activityItem.content }}
          </div>
        </div>

          <div class="text-start content-center flex items-center cursor-pointer">
            
          </div>
          <div class="w-100% text-center mt-50px sid">
              <button class="backBtn" @click="goToActivity">回上層</button>
          </div>

      </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';  
  const route = useRoute();
  const currentId = route.params.id;

  const bannerTypeMap = {
    0: {
      picture: '/activity/banner_0.png',
      position: 'absolute top-5.2% right-4% flex flex-col items-end gap-2'
    },
    1: {
      picture: '/activity/banner_1.png',
      position: 'absolute bottom-9.25% left-3% flex flex-col items-start gap-2'
    },
    2: {
      picture: '/activity/banner_2.png',
      position: 'absolute bottom-9.5% right-2.5% flex flex-col items-end gap-2'
    },
    3: {
      picture: '/activity/banner_3.png',
      position: 'absolute bottom-4.2% right-3% flex flex-col items-end gap-2'
    },
    4: {
      picture: '/activity/banner_4.png',
      position: 'absolute bottom-8.5% right-3% flex flex-col items-end gap-2'
    },
    5: {
      picture: '/activity/banner_5.png',
      position: 'absolute bottom-7% left-3% flex flex-col items-start gap-2'
    },
    6: {
      picture: '/activity/banner_6.png',
      position: 'absolute bottom-4.5% right-3% flex flex-col items-end gap-2'
    },
    7: {
      picture: '/activity/banner_7.png',
      position: 'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-2 w-[90%] '
    },
    8: {
      picture: '/activity/banner_8.png',
      position: 'absolute top-50% left-50% translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-2 w-[90%] '
    }
  };
  const backgroundMap = {
    0: 'bg-gradient-to-b from-[#FEFEFE] to-[#e6ecfc]',
    1: 'bg-gradient-to-b from-[#FFFBF0] to-[#FFF0C7]',
    2: 'bg-[#FAFAFA]',
    3: 'bg-gradient-to-b from-[#E3FFFA] to-[#B1FFF1]',
    4: 'bg-gradient-to-b from-[#FFF0F6] to-[#FFD6E5]',
    5: 'bg-gradient-to-b from-[#FFEEE6] to-[#FFD2BF]',
    6: 'bg-gradient-to-b from-[#FDFFEB] to-[#F5FF9F]',
    7: 'bg-gradient-to-b from-[#FAF0FF] to-[#D8BFE6]'
  };
  const activityList = ref([
    {
      id: '0',
      category: '媒合商活動',
      title: "不要吵==我是第一張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 0,
      background: 0,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '1',
      category: '媒合商活動',
      title: "不要吵==我是第二張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 1,
      background: 1,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '2',
      category: '媒合商活動',
      title: "不要吵==我是第三張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 2,
      background: 2,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '3',
      category: '媒合商活動',
      title: "不要吵==我是第四張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 3,
      background: 3,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '4',
      category: '媒合商活動',
      title: "不要吵==我是第五張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 4,
      background: 4,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/06/31",
    },
    {
      id: '5',
      category: '媒合商活動',
      title: "不要吵==我是第六張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 5,
      background: 5,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '6',
      category: '媒合商活動',
      title: "不要吵==我是第七張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 6,
      background: 6,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '7',
      category: '媒合商活動',
      title: "不要吵==我是第八張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 7,
      background: 7,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '8',
      category: '媒合商活動',
      title: "不要吵==我是第九張圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "",
      bannerType: 8,
      background: 0,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    },
    {
      id: '9',
      category: '媒合商活動',
      title: "不要吵==我是自訂議圖",
      subTitle: "副標題或一些有的沒的共十五個字",
      customizeUrl: "/activity/preview-thumbnail.png",
      bannerType: 9,
      background: 1,
      storeLogo: "/activity/preview-headshot.png",
      storeName: "B商店",
      content: "asdasdqweqwqweasdasdasdasdasdzxczxcxzczsdasd",
      hyperlink: "https://www.pmatch.com.tw/",
      startTime: "2025/06/01",
      endTime: "2025/08/31",
    }
  ]);


  // 根據 id 找到對應的活動
  const activityItem = computed(() =>
    activityList.value.find((item) => item.id === currentId)
  );

  // 跳轉到 /activity
  const goToActivity = () => {
      window.location.href = '/activity';
  };
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
      .dot1,
      .dot2,
      .dot3 {
          width: 70%;
      }
  }
</style>