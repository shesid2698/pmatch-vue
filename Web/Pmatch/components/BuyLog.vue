<template>
  <div
    v-show="userToken && memberId"
    class="fixed flex z-999 justify-end top-[27%] lg:top-252px bg-[#FFBBDA] w-[374px] h-[84px] text-white text-24px rounded-r-50 transition-all duration-300 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] before:content-[''] before:h-[80px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#E70763] before:to-[#C90E5B] before:rounded-r-50 before:-z-1 before:translate-y-1"
    :class="[ buyLogOpen ? 'left-0' : 'left-[-281.5px]' ]"
    title="查看購買紀錄"
    @click="toggleBuyLog"
  >
    <div class="flex items-center">
      <!-- 標題文字 -->
      <div class="flex items-center me-1.5rem" :class="[ buyLogOpen ? 'me-1.5rem' : 'me-2rem' ]">
        <span> 購買紀錄 </span>
      </div>
      <!-- 圓形圖示塊 -->
      <div class="flex items-center me-1.5rem" :class="[ buyLogOpen ? 'me-1.5rem' : 'me-1.1rem' ]">
        <img class="w-39px select-none pointer-events-none" src="/images/buyLogIcon.svg" alt="購買紀錄icon" />
      </div>
    </div>
    <div
      v-show="buyLogOpen"
      class="absolute w-[300px] h-100vh top-full left-0  bg-white text-[#8D8D8D] text-20px cursor-pointer  shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]"
    >
      <div class="w-full text-end">
        <NuxtLink
          v-for="(item, index) in buyLog"
          :key="index"
          :to="`/findmatch/${item.Id}`"
          class="decoration-none text-inherit"
        >
          <div class="relative px-2rem flex items-center justify-end h-[70px] rounded-[35px_5px_5px_0]  bg-gradient-to-r from-[rgba(255,255,255,0)] to-[rgba(255,255,255,1)] transition-colors duration-400 hover:text-white hover:text-[24px] hover:font-bold before:content-[''] before:absolute before:h-[1px] before:w-[95%] before:bottom-0 before:left-0  before:bg-gradient-to-r before:from-[#D1D1D1] before:to-[#6B6B6B] after:content-[''] after:absolute after:inset-0 after:rounded-[35px_5px_5px_0] after:bg-gradient-to-r after:from-[#D20C5E] after:to-[#7B2CBF] after:-z-1 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-400 z-0">
            {{ item.Name }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
const userToken = useCookie("_PmToken");
const memberId = useCookie("_PmMemberId");

const buyLogOpen = ref(false);
const toggleBuyLog = () => {
  buyLogOpen.value = !buyLogOpen.value;
};
const buyLog = ref(null);

onMounted(async () => {
  if (userToken.value && memberId.value) {
    const buyLogData = localStorage.getItem("buyLog");
    if (buyLogData) {
      // 將字串解析為物件並賦值
      try {
        buyLog.value = JSON.parse(buyLogData);
      } catch (error) {
        console.error("無法解析 buyLog 的 JSON 數據", error);
      }
    } else {
      console.error("localStorage 中未找到 buyLog");
    }
  }
});
</script>