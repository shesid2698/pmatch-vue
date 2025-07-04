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
      
    </div>
</template>

<script setup>
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
