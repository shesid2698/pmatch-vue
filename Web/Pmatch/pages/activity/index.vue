<template>
  <!-- 活動內容 -->
  <div v-show="innerPage === 1" id="page1">
    <!-- 分頁一 -->
    <div id="innerPage1">
      <div class="w-95.5% h-2.6% absolute top-[-0.2%] left-1px box-border">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn active h-103% !font-500"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn h-93% !font-400"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-26.3% tab-btn h-93% !font-400"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-26.3% tab-btn h-93% !font-400"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
      <!-- 我要註冊 -->        
        <button class="w-25.5% h-2.68% absolute top-32.41% left-36% main-btn !disabled:filter-none !disabled:cursor-default" @click="ToRegister"
          :disabled="token !== '' && token !== null && token !== undefined">{{ token !== "" && token !== null && token !== undefined ? '已登入' : '我要註冊' }}</button>

      <!-- 推薦碼綁定說明 -->
      <div class="absolute top-[52%]  left-[47%] text-[1.5vw] font-bold ">
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
      <!-- 各遊戲平台累積回饋數量 -->
      <div class="absolute w-20% h-2.2% top-58.1% left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.TotalValue ? activityData['寶島娛樂城'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-58.1% left-70.8%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.Reward ? activityData['寶島娛樂城'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-60.13%  left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['聚寶Online']?.TotalValue ? activityData['聚寶Online'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-60.13% left-70.8%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['聚寶Online']?.Reward ? activityData['聚寶Online'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-62.16%  left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['錢街Online']?.TotalValue ? activityData['錢街Online'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-62.16% left-70.8%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['錢街Online']?.Reward ? activityData['錢街Online'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-64.19%  left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['滿貫大亨']?.TotalValue ? activityData['滿貫大亨'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-64.19% left-70.8%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['滿貫大亨']?.Reward ? activityData['滿貫大亨'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-66.21%  left-50.15%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.TotalValue ? activityData['金好運娛樂城'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% top-66.21% left-70.8%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.Reward ? activityData['金好運娛樂城'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <!-- 查看領獎中心 -->
      <button class="w-33.3% h-2.68% absolute top-83.69% left-32.9% main-btn !disabled:filter-none !disabled:cursor-default" @click="ToReward">查看領獎中心</button>
      <!-- 推薦碼綁定說明 -->
      <button @click="() => { innerPage = 2; scrollToTop(); }" 
        class="w-37.1% h-2.68% absolute top-47.02% left-30.2% main-btn !disabled:filter-none !disabled:cursor-default
      ">推薦碼綁定說明</button>
      <!-- 委買遊戲幣拿回饋 -->  
      <NuxtLink to="/" target="_blank">
        <button class="w-45.6% h-3.57% absolute top-90.66% left-26.9% game-btn !disabled:filter-none !disabled:cursor-default"><img src="/activity/squareIcon.svg" alt=""
            class="md:mr-10px mr-5px md:w-20px w-10px">委買遊戲幣拿回饋<img src="/activity/squareIcon.svg" alt=""
            class="md:ml-10px ml-5px md:w-20px w-10px"></button>
      </NuxtLink>
    </div>
  </div>
  
  <!-- 推薦碼運作說明 -->
  <div v-show="innerPage === 2" id="page2">
    <!-- 分頁二 -->
    <div id="innerPage2">
      <div class="w-95.5% h-1.7% absolute top-[-0.05%] left-1px box-border">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19.6% tab-btn h-86% !font-400"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-26.3% tab-btn active h-97% !font-500"
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
      <div class="w-95.5% h-2.5% absolute top-[-0.14%] left-1px">
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
      <div class="w-95.5% h-6.8% absolute top-[-0.49%] left-1px">
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
        <NuxtLink to="/findmatch?platformName=寶島娛樂城&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-寶島娛樂城.png" alt="寶島娛樂城">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-42.5% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=聚寶Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-聚寶Online.png" alt="聚寶Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-56.2% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=錢街Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-錢街Online.png" alt="錢街Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-69.8% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=滿貫大亨&keyword=" target="_blank">
          <img class='w-100%' src="/activity/g-滿貫大亨.png" alt="滿貫大亨">
        </NuxtLink>
      </div>
      <div
        class="absolute w-25.4% top-83.4% left-7.3% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=金好運娛樂城&keyword=" target="_blank">
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
    // navigateTo('/member/login');
  } else {
    window.open('/member/center', '_blank');
    // navigateTo('/member/center');
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
      Object.assign(activityData, response.data.Data[0]);
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
  /* display: inline-block; */
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
  border: .25vw solid #b70096;
  border-radius: 5vw;
  background-color: #f72585;
  color: white;
  font-weight: 500;
  font-size: 1.9vw;
  box-shadow: inset 0 -2vw 3vw 0 rgba(0, 0, 0, 0.1),
    inset 0 2vw 3vw 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;

  &:hover {
    filter: brightness(1.1);
  }
}

#page1 {
  background-image: url('/activity/桌面版背景1.png');
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
  top: 14.72%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
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
  justify-content: center;
  align-items: center;
  line-height: 100%;

  &:hover {
    filter: brightness(1.1);
  }
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
    filter: brightness(1.1);
  }
}

#page2 {
  background-image: url('/activity/桌面版背景2.png');
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
  top: 9.843%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

#page3 {
  background-image: url('/activity/桌面版背景3.png');
  aspect-ratio: 4143/9703;
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
  top: 13.3%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}


#page4 {
  background-image: url('/activity/桌面版背景4.png');
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
  top: 24.45%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

@media screen and (max-width: 767px) {
  .tab-btn {
  font-size: 2.2vw;
  }
  .main-btn,.game-btn {
  font-size: 3.3vw;
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
