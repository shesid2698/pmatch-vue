<template>
  
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>

  <div class="mt-5rem max-w-1000px m-auto page font-events mb-[-6rem]">
      <!-- 成功獲取資料時 -->
      <div v-for="(item, index) in activityList" :key="index">

        <!-- 活動主視覺|自訂議圖片 -->
        <img
          v-if="item.bannerType === 9 && item.customizeUrl"
          :src="item.customizeUrl"
          alt="活動主視覺"
          class="w-full block"
        />
        <!-- 活動主視覺|預設圖片 -->
        <template v-else>
          <div class="relative">
            <img :src="bannerTypeMap[item.bannerType]?.picture" alt="活動主視覺" class="w-full block" />
            <div :class="bannerTypeMap[item.bannerType]?.position">
              <div class="text-white text-shadow-md text-md">活動時間：{{ item.startTime }}~{{ item.endTime }}</div>
              <div class="text-white text-shadow-md text-6xl mb-1 font-bold">{{ item.title }}</div>
              <div class="text-white text-shadow-md text-4xl">{{ item.subTitle }}</div>
            </div>
          </div>
        </template>

        <!-- 商店區塊 -->
        <div class="bg-gradient-to-r from-[#f2994a] to-[#f2c94c] text-white py-3 px-4">
          <NuxtLink
            :href="item.hyperlink ? item.hyperlink : '#'"
            class="inline-flex items-center gap-4 no-underline text-inherit hover:text-inherit focus:outline-none"
            :class="item.hyperlink ? '' : 'cursor-default '"
            :target="item.hyperlink ? '_blank' : ''"
          >
            <img :src="item.storeLogo" alt="商店圖示" class="w-16 h-16" />
            <div class="">
              <div class="text-5xl mb-1">{{ item.storeName }}</div>
              <div class="text-md">活動時間：{{ item.startTime }}~{{ item.endTime }}</div>
            </div>
          </NuxtLink>
        </div>

        <!-- 活動內容 -->
        <div class="p-4 min-h-xl" :class="backgroundMap[item.background]">
          <div class="text-[#3B5BC4] text-3xl px-2 mb-2">活動內容</div>
          <div class="text-[#3B5BC4] text-xl break-words leading-relaxed px-4">
            {{ item.content }}
          </div>
        </div>
        <div class="w-100% text-center mt-50px pointer-events-none">
            <button class="backBtn" @click="goToActivity">回上層</button>
        </div>
      </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();

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

  const activityList = ref([]);

  // 將 query string 還原成活動資料物件 
  const query = route.query;

  // 修正非法值
  function safeNumber(input, min, max, fallback) {
    const num = Number(input);
    if (Number.isNaN(num) || num < min || num > max) return fallback;
    return num;
  }

  const activityItem = {
    title: decodeURIComponent(query.title || '尚未設定活動名稱'),
    subTitle: decodeURIComponent(query.subTitle || '尚未設定活動摘要'),
    category: decodeURIComponent(query.category || '媒合商活動'),
    content: decodeURIComponent(query.content || ''),
    customizeUrl: decodeURIComponent(query.customizeUrl || ''),
    bannerType: safeNumber(query.bannerType, 0, 9, 4),
    background: safeNumber(query.background, 0, 7, 1),
    storeLogo: decodeURIComponent(query.storeLogo || '/images/iconUser.png'),
    storeName: decodeURIComponent(query.storeName || '尚未選擇商店'),
    hyperlink: decodeURIComponent(query.hyperlink || ''),
    startTime: decodeURIComponent(query.startTime || ''),
    endTime: decodeURIComponent(query.endTime || '')
  };

  activityList.value = [activityItem];

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