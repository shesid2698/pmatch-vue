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
  <div class="dot3 select-none pointer-events-none">
    <img src="/images/corner.png" width="100%" alt="">
  </div>

  <div class="max-w-1110px m-auto pt-80px ps-5 pe-5 relative z-2">
    <ElCarousel class="h-auto" :interval="3000" arrow="always">
      <ElCarouselItem
        v-for="(item, index) in bannerList"
        :key="index"
        class="h-auto"
      >
        <a
          :href="item.linkUrl ? item.linkUrl : '#'"
          :class="item.linkUrl ? '' : 'cursor-default'"
          :target="item.linkUrl ? '_blank' : ''"
        >
          <div
            class="relative w-full h-[260px] text-white overflow-hidden"
            :style="{ background: bgColorMap[item.background] || '#000' }"
          >
            <img
              class="absolute w-full h-full object-cover opacity-20"
              :src="item.imageUrl"
              :alt="item.title"
            />
            <div class="relative w-full h-full">
              <h3 class="absolute text-xl font-bold" :class="styleMap[item.style]?.titleStyle">
                {{ item.title }}
              </h3>
              <p class="absolute text-sm" :class="styleMap[item.style]?.textAStyle">
                {{ item.textA }}
              </p>
            </div>
          </div>
        </a>
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>

<script setup>
const styleMap = {
  0: {
    titleStyle: 'top-[10px] left-[20px]',
    textAStyle: 'top-[50px] left-[20px]'
  },
  1: {
    titleStyle: 'bottom-[40px] right-[20px]',
    textAStyle: 'bottom-[10px] right-[20px]'
  },
  2: {
    titleStyle: 'top-1/2 left-[30px] -translate-y-1/2',
    textAStyle: 'top-[60%] left-[30px]'
  }
};
const bgColorMap = {
  0: '#FFB703',
  1: '#219EBC',
  2: 'linear-gradient(to right, #ff9a9e, #fad0c4)' 
};
const bannerList = ref([
  {
    type: 'A',
    title: '夏日轉轉樂',
    imageUrl: 'https://picsum.photos/id/1011/800/400',
    textA: '登入就能轉！',
    bgColor: '#FFB703',
    linkUrl: '',
    style: 0,
    background: 1 
  },
  {
    type: 'B',
    title: '新會員限時禮',
    imageUrl: 'https://picsum.photos/id/1015/800/400',
    textA: '註冊拿紅利',
    bgColor: '#219EBC',
    linkUrl: 'https://example.com',
    style: 1,
    background: 2
  },
  {
    type: 'C',
    title: '好友邀請賺獎金',
    imageUrl: 'https://picsum.photos/id/1025/800/400',
    textA: '每邀1人賺$100',
    bgColor: '#8ECAE6',
    linkUrl: '',
    style: 2,
    background: 0
  }
]);


  const jwtStore = useJwtStore();
  const userToken = useCookie('_PmToken');

  // onMounted(async () => {
  //   try {
  //     if (userToken.value != '' && userToken.value != undefined) {
  //       const token = userToken.value;
  //       if (token != '') {
  //       }
  //     } else {
  //       // 生成新的 token
  //       const token = await jwtStore.generateToken();
  //       if (token != '') {
  //       }
  //     }
  //   } catch (error) {
  //     console.error('頁面初始化失敗:', error);
  //   }
  // });
</script>

<style scoped>
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

</style>
