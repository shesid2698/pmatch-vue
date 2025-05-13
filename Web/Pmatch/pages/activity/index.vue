<template>
  <!-- 活動內容 -->
  <div v-show="innerPage === 1" id="page1">
    <!-- 分頁一 -->
    <div id="innerPage1">
      <div class="w-95.5% h-2.6% absolute top-[-0.092%] left-1px box-border">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn active h-108% !font-500"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn h-95% !font-400"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-26.3% tab-btn h-95% !font-400"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-26.3% tab-btn h-95% !font-400"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
      <!-- 我要註冊 -->        
        <button class="w-25.5% h-2.68% absolute top-32.41% left-36% main-btn !disabled:filter-none !disabled:cursor-default" @click="ToRegister"
          :disabled="token !== '' && token !== null && token !== undefined">{{ token !== "" && token !== null && token !== undefined ? '已登入' : '我要註冊' }}</button>
      <!-- 推薦碼綁定說明 -->
      <div class="absolute top-44.22% left-59% text-[2.8vw] md:top-44.12%  md:text-[1.7vw] font-bold ">
        <div v-if="token === '' || token === null || token === undefined"
          class="flex justify-center items-center line-height-100% text-[#FF3F2E]">
          <div>? 未登入</div>
        </div>
        <div v-else-if="memberDetail.RefferCode !== ''"
          class="flex justify-center items-center line-height-100% text-[#66D575]">
          <div>
            <Icon name="heroicons:check-20-solid" />
          </div>
          <div>已綁定</div>
        </div>
        <div v-else class="flex justify-center items-center line-height-100% text-[#5451E0]">
          <div>
            <Icon name="heroicons:x-mark-20-solid" />
          </div>
          <div>未綁定</div>
        </div>
      </div>
      <!-- 遮罩 -->
      <div v-if="token === '' || token === null || token === undefined" class="mask w-60.76% h-10.22% absolute top-58.15% left-29.72% text-[4.1vw] md:text-[2.4vw]"></div>
      <!-- 各遊戲平台累積回饋數量 -->       
      <div class="absolute w-20% h-2.2% top-58.1% left-30%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.RewardPercentage !== undefined ? activityData['寶島娛樂城'].RewardPercentage + '%' : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-58.1% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.TotalValue !== undefined ? activityData['寶島娛樂城'].TotalValue.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-58.1% left-70.5%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.Reward !== undefined ? activityData['寶島娛樂城'].Reward.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-60.13% left-30%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['聚寶Online']?.RewardPercentage !== undefined ? activityData['聚寶Online'].RewardPercentage + '%' : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-60.13% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['聚寶Online']?.TotalValue !== undefined ? activityData['聚寶Online'].TotalValue.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-60.13% left-70.5%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['聚寶Online']?.Reward !== undefined ? activityData['聚寶Online'].Reward.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-62.16% left-30%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['錢街Online']?.RewardPercentage !== undefined ? activityData['錢街Online'].RewardPercentage + '%' : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-62.16% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['錢街Online']?.TotalValue !== undefined ? activityData['錢街Online'].TotalValue.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-62.16% left-70.5%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['錢街Online']?.Reward !== undefined ? activityData['錢街Online'].Reward.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-64.19% left-30%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['滿貫大亨']?.RewardPercentage !== undefined ? activityData['滿貫大亨'].RewardPercentage + '%' : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-64.19% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['滿貫大亨']?.TotalValue !== undefined ? activityData['滿貫大亨'].TotalValue.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-64.19% left-70.5%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['滿貫大亨']?.Reward !== undefined ? activityData['滿貫大亨'].Reward.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-66.21% left-30%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.RewardPercentage !== undefined ? activityData['金好運娛樂城'].RewardPercentage + '%' : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-66.21% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.TotalValue !== undefined ? activityData['金好運娛樂城'].TotalValue.toLocaleString() : '' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-66.21% left-70.5%">
        <div class="absolute w-100% h-100% text-center content-center md:text-1.5vw text-3vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.Reward !== undefined ? activityData['金好運娛樂城'].Reward.toLocaleString() : '' }}</div>
      </div>
      <!-- 查看領獎中心 -->
      <button class="w-33.3% h-2.68% absolute top-83.69% left-32.9% main-btn !disabled:filter-none !disabled:cursor-default" @click="ToReward">查看領獎中心</button>
      <!-- 推薦碼綁定說明 -->
      <button @click="() => { innerPage = 2; scrollToTop(); }" 
        class="w-37.1% h-2.68% absolute top-47.02% left-30.2% main-btn !disabled:filter-none !disabled:cursor-default">推薦碼綁定說明</button>
      <!-- 委買遊戲幣拿回饋 -->  
      <button @click="() => { innerPage = 4; scrollToTop(); }" class="md:w-45.6% w-46.72% h-3.57% absolute top-90.66% left-26.9% game-btn !disabled:filter-none !disabled:cursor-default"><img src="/activity/squareIcon.svg" alt=""
          class="md:mr-.4vw mr-.7vw md:w-1.4vw w-2.3vw">委買遊戲幣拿回饋<img src="/activity/squareIcon.svg" alt=""
          class="md:ml-.4vw ml-.7vw md:w-1.4vw w-2.3vw"></button>
    </div>
  </div>  
  <!-- 推薦碼運作說明 -->
  <div v-show="innerPage === 2" id="page2">
    <!-- 分頁二 -->
    <div id="innerPage2">
      <div class="w-95.5% h-1.7% absolute top-[-0.037%] left-1px box-border">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn h-86% !font-400"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn active h-98% !font-500"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-26.3% tab-btn h-86% !font-400"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-26.3% tab-btn h-86% !font-400"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 推薦碼綁定流程 -->
  <div v-show="innerPage === 3" id="page3">
    <!-- 分頁三 -->
    <div id="innerPage3">
      <div class="w-95.5% h-2.5% absolute top-[-0.085%] left-1px">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn !h-86% !font-400"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn !h-86% !font-400"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-26.3% tab-btn active !h-99% !font-500"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-26.3% tab-btn !h-86% !font-400"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
      <button @click="() => { innerPage = 4; scrollToTop(); }" 
        class="w-41.6% h-2.42% absolute top-43.26% left-30.2% main-btn !disabled:filter-none !disabled:cursor-default
      ">查看活動媒合清單</button>
      <button @click="ToRegister" 
      class="w-30.7% h-2.42% absolute top-69.24% left-35.8% main-btn !disabled:filter-none !disabled:cursor-default
      ">前往會員中心</button>
    </div>
  </div>
  <!-- 活動媒合商一覽 -->
  <div v-show="innerPage === 4" id="page4">
    <!-- 分頁四 -->
    <div id="innerPage4">
      <div class="w-95.5% h-6.8% absolute top-[-0.415%] left-1px">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn !h-83% !font-400"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn !h-83% !font-400"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-26.3% tab-btn !h-83% !font-400"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-26.3% tab-btn active !h-95% !font-500"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>  
      <!-- 遊戲平台 -->
      <div
        class="absolute w-25.4% top-29% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch?platformName=寶島娛樂城&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-寶島娛樂城.png" alt="寶島娛樂城">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-42.5% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch?platformName=聚寶Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-聚寶Online.png" alt="聚寶Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-56.2% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch?platformName=錢街Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-錢街Online.png" alt="錢街Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-69.8% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch?platformName=滿貫大亨&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-滿貫大亨.png" alt="滿貫大亨">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-83.4% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch?platformName=金好運娛樂城&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-金好運娛樂城.png" alt="金好運娛樂城">
        </NuxtLink>
      </div>
      <!-- 媒合商 -->
      <div
        class="absolute w-16.4% top-28.5% left-55.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/206" target="_blank">
          <img class='w-100%' src="/activity/t-武財神.png" alt="武財神">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5% top-41.7% left-44.1% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/208" target="_blank">
          <img class='w-100%' src="/activity/t-金站.png" alt="金站">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5% top-41.7% left-66.4% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/211" target="_blank">
          <img class='w-100%' src="/activity/t-福娃金庫.png" alt="福娃金庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5% top-55.5% left-55.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/200" target="_blank">
          <img class='w-100%' src="/activity/t-錢庫.png" alt="錢庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5% top-68.9% left-36.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/213" target="_blank">
          <img class='w-100%' src="/activity/t-添好運央行.png" alt="添好運央行">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5% top-68.9% left-55.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/207" target="_blank">
          <img class='w-100%' src="/activity/t-發大財金庫.png" alt="發大財金庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5%  top-68.9% left-74.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/201" target="_blank">
          <img class='w-100%' src="/activity/t-寶可夢銀行.png" alt="寶可夢銀行">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5%  top-82.6% left-44.1% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/202" target="_blank">
          <img class='w-100%' src="/activity/t-金好盈金流.png" alt="金好盈金流">
        </NuxtLink>
      </div>
      <div
        class="absolute w-16.5%  top-82.6% left-66.4% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/204" target="_blank">
          <img class='w-100%' src="/activity/t-米其林金流.png" alt="米其林金流">
        </NuxtLink>
      </div>
    </div>
  </div>
  <footer class="w-100% bg-#797979 absolute pt-1.8vw pb-3.6vw bottom-0 items-center justify-center md:flex hidden">
    <div class="text-white space-y-1vw text-[2vw] md:text-[0.88vw] font-bold">
      <p class="text-[3vw] md:text-[1.5vw]"><span class="relative top-[0.04em] text-[3.6vw] md:text-[1.8vw] select-none">◆ </span>注意事項</p>
      <p><span class="relative top-[0.1em] text-[2.6vw] md:text-[1.2vw] select-none">◆ </span>本次活動範圍僅包含部分媒合商及遊戲平台，詳細內容請參照活動頁面說明。</p>
      <p><span class="relative top-[0.1em] text-[2.6vw] md:text-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台保留更換等值贈品以及變更活動內容或終止活動的權利，以及最終解釋權。</p>
      <p><span class="relative top-[0.1em] text-[2.6vw] md:text-[1.2vw] select-none">◆ </span>參加活動所獲得獎勵，請於活動結束後直接發送至官網領獎中心。</p>
      <p><span class="relative top-[0.1em] text-[2.6vw] md:text-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台僅提供媒合交易服務，交易相關問題請洽詢交易之媒合商了解詳情。</p>
      <p><span class="relative top-[0.1em] text-[2.6vw] md:text-[1.2vw] select-none">◆ </span>因應各遊戲平台設定之最低贈禮門檻，本次活動所獲得之回饋幣，至少須累積達各遊戲<br>
      <span class="ps-1.01vw">平台最低數量以上方符合領獎資格，低於設定領獎門檻視同放棄領獎資格。</span></p>
    </div>
  </footer>
</template>
<script setup>
const innerPage = ref(1);
const activityData = reactive({});
const token = useCookie('_PmToken');
const memberId = useCookie('_PmMemberId');
const { $axios } = useNuxtApp();
const memberDetail = reactive({});
const route = useRoute();
const router = useRouter();
const ToRegister = () => {
  if (token.value === '' || token.value === null || token.value === undefined) {
    window.open('/member/login', '_blank');
  } else {
    window.open('/member/center', '_blank');
  }
};
const ToReward = () => {
  if (token.value === '' || token.value === null || token.value === undefined) {
    // navigateTo('/member/login');
    window.open('/member/login', '_blank');
  } else {
    // navigateTo('/member/center/reward');
    window.open('/member/center/reward', '_blank');
  }
};
const scrollToTop = () => {
  const isMobile = window.innerWidth <= 767;
  const topValue = isMobile 
    ? window.innerHeight * 0.1  // 手機版捲到視窗高度的 10%
    : window.innerHeight * 0.4;  // 桌面版捲到視窗高度的 40%

  window.scrollTo({
    top: topValue,
    behavior: 'smooth'
  });
};
const GetMemberDetail = async () => {
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetMemberDetail',
      {
        PmatchMemberId: memberId.value
      },
      {
        headers: {
          Authorization: token.value
        }
      }
    );
    if (response.data.Status.Code === 0) {
      Object.assign(memberDetail, response.data.Data[0]);
    }
  } catch (error) {
    console.log(`GetMemberDetail error:${error}`);
  }
};
const GetMemberActivityData = async () => {
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetMemberActivityData',
      {
        PlatformNames: [
          '寶島娛樂城',
          '聚寶Online',
          '錢街Online',
          '滿貫大亨',
          '金好運娛樂城'
        ]
      },
      {
        headers: {
          Authorization: token.value
        }
      }
    );
    if (response.data.Status.Code === 0) {
      // Object.assign(activityData, response.data.Data[0]);
      response.data.Data.forEach(item => {
        activityData[item.PlatformName] = item;
      });
      console.log('✅ 活動資料抓到：', activityData);
    }
  } catch (error) {
    console.log(`GetMemberDetail error:${error}`);
  }
};
onMounted(async () => {
  if (
    memberId.value !== '' &&
    memberId.value !== null &&
    memberId.value !== undefined &&
    token.value !== '' &&
    token.value !== null &&
    token.value !== undefined
  ) {
    await GetMemberActivityData();
    await GetMemberDetail();
  }
  router.replace({
    query: {
      openExternalBrowser: 1
    }
  });
});
</script>
<style scoped>
.tab-btn {
  border: none;
  position: relative;
  border-radius: .8vw .8vw 0 0;
  background: linear-gradient(180deg, #FFEABE 0%, #DD9600 100%);
  padding: .4vw;
  color: #FFEABC;
  font-size: 1.47vw;
  overflow: hidden;
  cursor: pointer;
}
.tab-btn::before {  
  position: absolute;
  top: .45vw;
  left: .45vw;
  right: .45vw;
  bottom: 0;
  border-radius: .5vw .5vw 0 0;
  background: linear-gradient(180deg, #FF5F5F 0%, #C60000 50%, #600000 100%);
  /* 文字置中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-btn.active::before {
  position: absolute;
  top: .45vw;
  left: .45w;
  right: .45vw;
  bottom: 0;
  border-radius: .5vw .5vw 0 0;
  background: linear-gradient(180deg, #FF8D8B 1.92%, #DD3131 50%, #A70000 100%);
}
.tab-btn.page1::before {
  content: "活動內容";
}
.tab-btn.page2::before {
  content: "推薦碼運作說明";
}
.tab-btn.page3::before {
  content: "推薦碼綁定流程";
}
.tab-btn.page4::before {
  content: "活動媒合商一覽";
}
.non-active {
  &:hover {
    filter: brightness(1.1);
  }
}
.main-btn {
  background-color: #f72585;
  border: .25vw solid #b70096;
  border-radius: 5vw;
  color: white;
  font-weight: 500;
  font-size: 1.9vw;
  box-shadow: inset 0 -2vw 3vw 0 rgba(0, 0, 0, 0.1),
    inset 0 2vw 3vw 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(.9);
  }
}
#page1 {
  background-image: 
    url('/activity/天降好禮.png'),
    linear-gradient(180deg, #0003A9 0%, #006FE6 74.95%);
  aspect-ratio: 4143/8872;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  width: 100%;
}
#innerPage1 {
  background-image: url('/activity/分頁1.png');
  aspect-ratio: 1579/5083;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  min-width: 47.9%;
  top: 14.703%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.mask::before {  
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0 0 .4vw 0;
  font-weight: 550;
  background: linear-gradient(180deg, #FF8D8B 1.92%, #DD3131 50%, #A70000 100%);
  opacity: 0.5;
  color: #fff;
  content: "請登入後查看";
  /* 文字置中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-btn {
  background-image: linear-gradient(to bottom, #7b2cbf, #2587ff);
  border: .25vw solid #541d84;
  border-radius: 5vw;
  color: white;
  font-weight: 500;
  font-size: 1.9vw;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(to bottom, #2587ff, #7b2cbf);
    filter: brightness(1.1);
  }
  &:active {
    background-image: linear-gradient(to bottom, #2587ff, #7b2cbf);
    filter: brightness(.9);
  }
}
#page2 {
  background-image: 
    url('/activity/天降好禮.png'),
    linear-gradient(180deg, #0003A9 0%, #006FE6 74.95%);
  aspect-ratio: 4143/13091;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  width: 100%;
}
#innerPage2 {
  min-width: 47.9%;
  background-image: url('/activity/分頁2.png'); 
  aspect-ratio: 1579/8459;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;    
  position: absolute;
  top: 9.827%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
#page3 {
  background-image: 
    url('/activity/天降好禮.png'),
    linear-gradient(180deg, #0003A9 0%, #006FE6 74.95%);
  aspect-ratio: 4143/9768;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  width: 100%;
}
#innerPage3 {
  min-width: 47.9%;
  background-image: url('/activity/分頁3.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  aspect-ratio: 1579/5805;
  top: 13.191%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
#page4 {
  background-image: 
    url('/activity/天降好禮.png'),
    linear-gradient(180deg, #0003A9 0%, #006FE6 74.95%);
  aspect-ratio: 4143/5270;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  width: 100%;
}
#innerPage4 {
  background-image: url('/activity/分頁4.png');
  aspect-ratio: 1579/2222;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: centrer;
  position: absolute;
  min-width: 47.9%;
  top: 24.41%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
@media screen and (max-width: 767px) {
  .tab-btn {
  font-size: 2.2vw;
  white-space: nowrap;
  }
  .tab-btn::before {  
    top: .75vw;
    left: .75vw;
    right: .75vw;
  }
  .tab-btn.active::before {
    top: .75vw;
    left: .75w;
    right: .75vw;
  }
  .main-btn,.game-btn {
  font-size: 3.2vw;
  white-space: nowrap;
  border-width: .45vw;
  }  
  #page1 {
    width: 100%;
    background-image: url('/activity/行動版背景1.png');
    aspect-ratio: 1904/7207;
  }
  #innerPage1 {
    min-width: unset;
    width: 83%;
    top: 13.4%;
    left: 50%;
  }
  .mask::before {  
    border-radius: 0 0 .6vw 0;
  }
  #page2 {
    width: 100%;
    background-image: url('/activity/行動版背景2.png');
    aspect-ratio: 1904/10609;
  }
  #innerPage2 {
    min-width: unset;
    width: 83%;
    top: 8.95%;
    left: 50%;
  }
  #page3 {
    width: 100%;
    background-image: url('/activity/行動版背景3.png');
    aspect-ratio: 1904/7914;
  }
  #innerPage3 {
    min-width: unset;
    background-image: url('/activity/分頁3-m.png');
    width: 83%;
    top: 12.04%;
    left: 50%;
  }
  #page4 {
    width: 100%;
    background-image: url('/activity/行動版背景4.png');
    aspect-ratio: 1904/4328;
  }
  #innerPage4 {
    min-width: unset;
    width: 83%;
    top: 21.95%;
    left: 50%;
  }
}
</style>
