<template>
  <!-- 活動內容 -->
  <div v-show="innerPage === 1" id="page1">
    <!-- 分頁一 -->
    <div id="innerPage1">
      <div class="w-90% h-2.5% absolute top-0 left-1px box-border">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19% the-btn active h-91% !text-[1.2vw] !font-500"
            :class="innerPage !== 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-27% the-btn h-80% !text-[1.2vw] !font-400"
            :class="innerPage !== 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-27% the-btn h-80% !text-[1.2vw] !font-400"
            :class="innerPage !== 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-27% the-btn h-80% !text-[1.2vw] !font-400"
            :class="innerPage !== 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
      <!-- 我要註冊 -->
      <div class="w-29% h-3.5% absolute top-38.87% left-30.6%">
        <button class="regist-btn !disabled:filter-none !disabled:cursor-default" @click="ToRegister"
          :disabled="token !== '' && token !== null && token !== undefined">{{ token !== "" && token !== null && token !== undefined ? '已登入' : '我要註冊' }}</button>
      </div>
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
      <div class="absolute w-20% h-2.2% bg-white top-56% left-43%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.TotalValue ? activityData['寶島娛樂城'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-56% left-63%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['寶島娛樂城']?.Reward ? activityData['寶島娛樂城'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-58% left-43%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['聚寶Online']?.TotalValue ? activityData['聚寶Online'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-58% left-63%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['聚寶Online']?.Reward ? activityData['聚寶Online'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-60% left-43%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['錢街Online']?.TotalValue ? activityData['錢街Online'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-60% left-63%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['錢街Online']?.Reward ? activityData['錢街Online'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-62% left-43%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['滿貫大亨']?.TotalValue ? activityData['滿貫大亨'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-62% left-63%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['滿貫大亨']?.Reward ? activityData['滿貫大亨'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-64% left-43%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.TotalValue ? activityData['金好運娛樂城'].TotalValue.toLocaleString() : '0' }}</div>
      </div>
      <div class="absolute w-20% h-2.2% bg-white top-64% left-63%">
        <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">
          {{ activityData['金好運娛樂城']?.Reward ? activityData['金好運娛樂城'].Reward.toLocaleString() : '0' }}</div>
      </div>
      <!-- 查看領獎中心 -->
      <div class="absolute w-37% h-3.5% top-[78.9%] left-[24.7%]">
        <button class="w-100% h-100% rounded-100px reward-btn" @click="ToReward">查看領獎中心</button>
      </div>
      <!-- 委買遊戲幣拿回饋 -->  
      <div class="absolute w-92% h-4% left-14.8% top-[92.1%] ">
        <NuxtLink to="/" target="_blank">
          <button class="game-btn"><img src="/activity/squareIcon.svg" alt=""
              class="md:mr-10px mr-5px md:w-20px w-10px">委買遊戲幣拿回饋<img src="/activity/squareIcon.svg" alt=""
              class="md:ml-10px ml-5px md:w-20px w-10px"></button>
        </NuxtLink>
      </div>
    </div>
  </div>
  
  <!-- 推薦碼運作說明 -->
  <div v-show="innerPage === 2" id="page2">
    <!-- 分頁二 -->
    <div id="innerPage2">
      <div class="w-81% h-2% absolute top-[-0.1%] left-0%">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-27% the-btn active !h-87% !text-[1.2vw] !font-500"
            :class="innerPage === 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>

    </div>
  </div>

  <!-- 推薦碼綁定流程 -->
  <div v-show="innerPage === 3" id="page3">
    <!-- 分頁三 -->
    <div id="innerPage3">
      <div class="w-81% h-2% absolute top-[-0.1%] left-0%">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-27% the-btn active !h-87% !text-[1.2vw] !font-500"
            :class="innerPage === 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>
      <button @click="() => innerPage = 4" class="w-30% h-2.4% absolute top-36.45% left-26% member-btn">查看活動媒合清單</button>
      <button @click="ToRegister" class="w-30% h-2.4% absolute top-68.45% left-26% member-btn">前往會員中心</button>
    </div>
  </div>

  <!-- 活動媒合商一覽 -->
  <div v-show="innerPage === 4" id="page4">
    <!-- 分頁四 -->
    <div id="innerPage4">
      <div class="w-81% h-2% absolute top-[-0.1%] left-0%">
        <div class="w-100% h-100% flex items-end">
          <button class="page1 w-19% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 1 ? 'non-active' : ''" @click="() => innerPage = 1">活動內容</button>
          <button class="page2 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 2 ? 'non-active' : ''" @click="() => innerPage = 2">推薦碼說明</button>
          <button class="page3 w-27% the-btn !h-76% !text-[1.2vw] !font-400"
            :class="innerPage === 3 ? 'non-active' : ''" @click="() => innerPage = 3">綁定流程</button>
          <button class="page4 w-27% the-btn active !h-87% !text-[1.2vw] !font-500"
            :class="innerPage === 4 ? 'non-active' : ''" @click="() => innerPage = 4">媒合商一覽</button>
        </div>
      </div>  
      <!-- 遊戲平台 -->
      <div
        class="absolute w-20% top-8% left-5% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=寶島娛樂城&keyword=" target="_blank">
          <img class='w-100%' src="/activity2/寶島娛樂城.png" alt="寶島娛樂城">
        </NuxtLink>
      </div>
      <div
        class="absolute w-20% top-13% left-5% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=聚寶Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity2/聚寶Online.png" alt="聚寶Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-20% top-18% left-5% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=錢街Online&keyword=" target="_blank">
          <img class='w-100%' src="/activity2/錢街Online.png" alt="錢街Online">
        </NuxtLink>
      </div>
      <div
        class="absolute w-20% top-23% left-5% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=滿貫大亨&keyword=" target="_blank">
          <img class='w-100%' src="/activity2/滿貫大亨.png" alt="滿貫大亨">
        </NuxtLink>
      </div>
      <div
        class="absolute w-20% top-28% left-5% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="/findmatch?platformName=金好運娛樂城&keyword=" target="_blank">
          <img class='w-100%' src="/activity2/金好運娛樂城.png" alt="金好運娛樂城">
        </NuxtLink>
      </div>
      <!-- 媒合商 -->
      <div
        class="absolute w-15% top-8% left-50% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/206" target="_blank">
          <img class='w-100%' src="/activity2/武財神.png" alt="武財神">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15% top-13% left-40% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/208" target="_blank">
          <img class='w-100%' src="/activity2/金站.png" alt="金站">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15% top-13% left-60% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/211" target="_blank">
          <img class='w-100%' src="/activity2/福娃金庫.png" alt="福娃金庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15% top-18% left-50% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/200" target="_blank">
          <img class='w-100%' src="/activity2/錢庫.png" alt="錢庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15% top-23% left-32% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/213" target="_blank">
          <img class='w-100%' src="/activity2/添好運央行.png" alt="添好運央行">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15% top-23% left-50% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/207" target="_blank">
          <img class='w-100%' src="/activity2/發大財金庫.png" alt="發大財金庫">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15%  top-23% left-68% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/201" target="_blank">
          <img class='w-100%' src="/activity2/寶可夢銀行.png" alt="寶可夢銀行">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15%  top-28% left-40% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/202" target="_blank">
          <img class='w-100%' src="/activity2/金好盈金流.png" alt="金好盈金流">
        </NuxtLink>
      </div>
      <div
        class="absolute w-15%  top-28% left-60% cursor-pointer hover:filter-brightness-[1.1]">
        <NuxtLink to="https://www.pmatch.com.tw/findmatch/204" target="_blank">
          <img class='w-100%' src="/activity2/米其林金流.png" alt="米其林金流">
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
.the-btn {
  border: none;
  position: relative;
  /* display: inline-block; */
  border-radius: .8vw .8vw 0 0;
  background: linear-gradient(180deg, #FFEABE 0%, #DD9600 100%);
  padding: .4vw;
  color: #FFEABC;
  font-size: 1vw;
  overflow: hidden;
  cursor: pointer;
}
.the-btn::before {  
  position: absolute;
  top: .3vw;
  left: .3vw;
  right: .3vw;
  bottom: 0;
  border-radius: .5vw .5vw 0 0;
  background: linear-gradient(180deg, #FF5F5F 0%, #C60000 50%, #600000 100%);
  /* 文字置中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.the-btn.active::before {
  position: absolute;
  top: .3vw;
  left: .3vw;
  right: .3vw;
  bottom: 0;
  border-radius: .5vw .5vw 0 0;
  background: linear-gradient(180deg, #FF8D8B 1.92%, #DD3131 50%, #A70000 100%);
}

.the-btn.page1::before {
  content: "活動內容";
}

.the-btn.page2::before {
  content: "推薦碼運作說明";
}

.the-btn.page3::before {
  content: "推薦碼綁定流程";
}

.the-btn.page4::before {
  content: "活動媒合商一覽";
}

#page1 {
  width: 100%;
  background-image: url('/activity/Slice_7.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  aspect-ratio: 3296/7094;
}

#innerPage1 {
  min-width: 42%;
  background-image: url('/activity/分頁一.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  /* aspect-ratio: 1513/4966; */
  aspect-ratio: 1513/5013;
  top: 14.5%;
  left: 52%;
  transform: translateX(-50%);
  z-index: 1;
}

.non-active {
  &:hover {
    filter: brightness(1.1);
  }
}

.regist-btn {
  width: 100%;
  height: 100%;
  border-radius: 5vw;
  border: .25vw solid rgba(183, 0, 150, 1);
  color: white;
  font-size: 1.8vw;
  background-color: rgba(247, 37, 133, 1);
  box-shadow: inset 0 -2vw 3vw 0 rgba(0, 0, 0, 0.1),
    inset 0 2vw 3vw 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
}

.reward-btn {
  border: .25vw solid rgba(183, 0, 150, 1);
  color: white;
  font-size: 1.5vw;
  background-color: rgba(247, 37, 133, 1);
  box-shadow: inset 0 -2vw 3vw 0 rgba(0, 0, 0, 0.1),
    inset 0 2vw 3vw 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
}

.game-btn {
  width: 65%;
  height: 100%;
  background-image: linear-gradient(to bottom, #7b2cbf, #2587ff);
  border: .25vw solid #541d84;
  border-radius: 5vw;
  color: white;
  font-size: 1.5vw;
  margin: 0;
  padding: 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
}

#page2 {
  aspect-ratio: 1920/5078;
  /* width: 1900px; */
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-image: url('/activity/Slice_8.png');
}

#innerPage2 {
  min-width: 46.5%;
  /* background: green; */
  background-image: url('/activity/分頁二.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  position: absolute;
  aspect-ratio: 1683/6539;
  top: 11.8%;
  left: 54.3%;
  transform: translateX(-50%);
  z-index: 1;
}

.member-btn {
  border: .25vw solid #b70096;
  border-radius: 5vw;
  background-color: #f72585;
  color: white;
  font-weight: bolder;
  font-size: 1.5vw;
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

.game-btn2 {
  color: white;
  border-radius: 5vw;
  border: .25vw solid #413fa6;
  background-image: linear-gradient(to bottom, #7b2cbf, #2587ff);
  font-size: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  box-shadow: inset 0 -2vw 3vw 0 rgba(0, 0, 0, 0.1),
    inset 0 2vw 3vw 0 rgba(255, 255, 255, 0.1);
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
}

#page3 {
  aspect-ratio: 1920/5078;
  /* width: 1900px; */
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-image: url('/activity/Slice_8.png');
}

#innerPage3 {
  min-width: 46.5%;
  /* background: green; */
  background-image: url('/activity/分頁二.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  position: absolute;
  aspect-ratio: 1683/6539;
  top: 11.8%;
  left: 54.3%;
  transform: translateX(-50%);
  z-index: 1;
}


#page4 {
  aspect-ratio: 1920/5078;
  /* width: 1900px; */
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-image: url('/activity/Slice_8.png');
}

#innerPage4 {
  min-width: 46.5%;
  /* background: green; */
  background-image: url('/activity/分頁二.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  aspect-ratio: 1683/6539;
  top: 11.8%;
  left: 54.3%;
  transform: translateX(-50%);
  z-index: 1;
}

@media screen and (max-width: 767px) {
  #page1 {
    width: 100%;
    background-image: url('/activity/分頁一背景.png');
    aspect-ratio: 1903/7070;
  }

  #innerPage1 {
    min-width: unset;
    width: 75%;
    top: 15%;
    left: 54%;
  }

  #page2 {
    width: 100%;
    background-image: url('/activity/分頁二背景.png');
    aspect-ratio: 1903/8610;
  }

  #innerPage2 {
    min-width: unset;
    width: 83%;
    top: 12.3%;
    left: 58.4%;
  }

  #page3 {
    width: 100%;
    background-image: url('/activity/分頁二背景.png');
    aspect-ratio: 1903/8610;
  }

  #innerPage3 {
    min-width: unset;
    width: 83%;
    top: 12.3%;
    left: 58.4%;
  }

  #page4 {
    width: 100%;
    background-image: url('/activity/分頁二背景.png');

    aspect-ratio: 1903/8610;
  }

  #innerPage4 {
    min-width: unset;
    width: 83%;
    top: 12.3%;
    left: 58.4%;
  }
}
</style>
