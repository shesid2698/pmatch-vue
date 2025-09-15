<template>
  <Head>
    <title>PMatch遊戲道具交易平台 - 選擇方案</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台 - 選擇方案" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>

  <div class="storeBac text-white">
    <div class="min-h-screen pb-15rem">
      <div class="max-w-1372px m-auto pt-10rem  px-5 relative z-2">

        <h1 class="text-3xl text-center font-bold mb-4">選擇方案</h1> 
        <div class="flex flex-wrap lg:flex-nowrap justify-center gap-6">
          <div class="w-full lg:w-1/3">
            <div class="h-[1280px] px-15 rounded-[25px] bg-gradient-to-b from-[#C3E2EB77] to-[#C3E2EB22] gradient-border">
              <div class="h-[140px]"></div>
              <div class="relative pt-[30px] px-[28px] rounded-lg bg-gradient-to-b from-[#FFFFFF] to-[#EFFFF2] text-gray-800 h-[960px] w-[calc(100%-56px)] lg:w-[calc(100%-56px)] md:w-[calc(50%-56px)] md:mx-auto">
                <div class="text-center">
                  <h2 class="text-[40px] font-normal m-0 bg-gradient-to-r from-[#4BAAA7] to-[#82DE94] bg-clip-text text-transparent">{{ plans[0].title }}</h2>
                  <div class="h-[100px] my-4 flex justify-center items-center translate-x-[-12px]">
                    <span class="text-[24px] translate-[24px,-36px]">NT$</span>
                    <span class="text-[96px] font-medium mx-1 my-0 w-[100px] italic bg-gradient-to-r from-[#82DE94] to-[#4BAAA7] bg-clip-text text-transparent">0</span>
                  </div>
                  <button class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none bg-gradient-to-r from-[#48A7A8] to-[#84E093] hover:opacity-90 cursor-pointer ">{{ plans[0].cta }}</button>
                </div>
                <ul class="mt-6 space-y-[30px] ps-[16px]">
                  <li v-for="detail in plans[0].details" :key="detail" class="flex items-start">
                    <img :src="plans[0].icon" class="w-[30px] me-3 mt-0.5" alt="check" />
                    <span class="text-[22px]" v-html="detail"></span>
                  </li>
                </ul>
                <p v-if="plans[0].note" class="text-[18px] text-[#D31E00] mt-[20px]">{{ plans[0].note }}</p>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-2/3">
            <div class="md:h-[1280px] h-[2360px] px-15 rounded-[25px] bg-gradient-to-b from-[#C3E2EB77] to-[#C3E2EB22] gradient-border gradient-box">
              <div class="h-[140px]">
                <div class="flex justify-end pt-[20px] -me-[36px] gap-[20px] text-[#383838]">
                  <div class="w-[182px] h-[53px] leading-[53px] flex items-center justify-center text-[18px] rounded-full bg-gradient-to-r from-[#FFFFFF] to-[#73FBFD] gradient-border !before:bg-gradient-to-r !before:from-[#73FBFD] !before:to-white !before:rounded-[99px]">
                    年繳省更多
                    <img src="/images/confetti.svg" class="w-[30px] mt-0.5" alt="check" />
                  </div>
                  <div class="relative flex items-center w-[103px] h-[26px] rounded-[5px] bg-gradient-to-r transition-all duration-400 button-shadow"
                      :class="isYearly ? 'from-[#FFFFFF] to-[#73FBFD]' : 'from-[#73FBFD] to-[#FFFFFF]'">
                    <div class="absolute h-full w-1/2 top-0 transition-all duration-400 rounded-[5px] bg-gradient-to-r button-shadow"
                      :class="isYearly ? 'left-0 from-[#73FBFD] to-[#00CDCF]' : 'left-1/2 from-[#00CDCF] to-[#73FBFD]'">
                    </div>
                    <button @click="isYearly = true" class="relative z-1 w-[50%] text-[14px] border-none bg-transparent text-start ps-10px text-[#383838] cursor-pointer ">年繳</button>
                    <button @click="isYearly = false" class="relative z-1 w-[50%] text-[14px] border-none bg-transparent text-end pe-10px text-[#383838] cursor-pointer ">月繳</button>
                  </div>
                </div>
               
              </div>
               <div class="flex flex-col md:flex-row gap-20">
                  <div v-for="plan in plans.slice(1)" :key="plan.title" class="w-full md:w-1/2">
                    <template v-if="plan.wrapperClass">
                      <div :class="plan.wrapperClass">
                        <div class="relative pt-[30px] px-[28px] rounded-lg h-[960px]" :class="plan.className">
                          <div v-if="plan.badge" class="absolute -top-4 left-1/2 -translate-x-1/2 w-[150px] h-[25px] leading-[25px] text-[14px] text-center text-white bg-[#AB6CEB] rounded-full shadow-lg">
                            {{ plan.badge }}
                          </div>
                          <div class="text-center">
                            <h2 class="text-[40px] font-normal m-0" :class="plan.textClass">{{ plan.title }}</h2>
                            <div class="h-[100px] my-4 flex justify-center items-center translate-x-[-12px]">
                              <span class="text-[24px] translate-[24px,-36px]">NT$</span>
                              <span class="text-[36px] mx-1" :class="plan.textClass">{{ isYearly ? plan.price.yearly : plan.price.monthly }}</span>
                              <span class="text-[36px]"> / {{ isYearly ? '年' : '月' }}</span>
                            </div>
                            <button class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none cursor-pointer" :class="plan.buttonClass">{{ plan.cta }}</button>
                          </div>
                          <ul class="mt-6 space-y-[30px] ps-[16px]">
                            <li v-for="detail in plan.details" :key="detail" class="flex items-start">
                              <img :src="plan.icon" class="w-[30px] me-3 mt-0.5" alt="check" />
                              <span class="text-[22px] " v-html="detail"></span>
                            </li>
                          </ul>
                          <p v-if="plan.note" class="text-[18px] text-[#D31E00] mt-[20px] text-center">{{ plan.note }}</p>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="relative pt-[30px] px-[28px] rounded-lg h-[960px]" :class="plan.className">
                          <div v-if="plan.badge" class="absolute -top-4 left-1/2 -translate-x-1/2 w-[150px] h-[25px] leading-[25px] text-[14px] text-center text-white bg-[#AB6CEB] rounded-full shadow-lg">
                            {{ plan.badge }}
                          </div>
                          <div class="text-center">
                            <h2 class="text-[40px] font-normal m-0" :class="plan.textClass">{{ plan.title }}</h2>
                            <div class="h-[100px] my-4 flex justify-center items-center translate-x-[-12px]">
                              <span class="text-[24px] translate-[24px,-36px]">NT$</span>
                              <span class="text-[36px] mx-1" :class="plan.textClass">{{ isYearly ? plan.price.yearly : plan.price.monthly }}</span>
                              <span class="text-[36px]"> / {{ isYearly ? '年' : '月' }}</span>
                            </div>
                            <button class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none cursor-pointer " :class="plan.buttonClass">{{ plan.cta }}</button>
                          </div>
                          <ul class="mt-6 space-y-[30px] ps-[16px]">
                            <li v-for="detail in plan.details" :key="detail" class="flex items-start">
                              <img :src="plan.icon" class="w-[30px] me-3 mt-0.5" alt="check" />
                              <span class="text-[22px] " v-html="detail"></span>
                            </li>
                          </ul>
                          <p v-if="plan.note" class="text-[18px] text-[#D31E00] mt-[20px] text-center">{{ plan.note }}</p>
                        </div>
                    </template>
                  </div>
               </div>
              <div class="my-[36px] text-center">
                <NuxtLink href="#" class="w-[367px] h-[75px] inline-flex justify-center items-center rounded-full border-solid border-0px bg-gradient-to-r from-[#7C2CBE] to-[#F12588] no-underline text-white text-[26px] hover:border-3px hover:w-[361px] hover:h-[69px] hover:from-white hover:to-white hover:text-[#EE2589] active:border-0px active:w-[367px] active:h-[75px] active:from-[#F12588] active:to-[#F12588] active:text-white">
                  更多進階服務與功能
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ms-2 mt-0.8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isYearly = ref(false);
const plans = ref([
  {
    title: '試用版',
    price: { monthly: '0', yearly: '0' },
    cta: '申請試用',
    details: [
      '開單記帳',
      '建立客戶資料',
      '交接班功能',
      '交易數據統計分析',
      '金流核對'
    ],
    note: '※試用版僅提供操作體驗，帳單、客戶等資料每日會自動清除，不保留紀錄',
    icon: '/images/check-mark-green.svg'
    // className and buttonClass are not needed here as it's directly styled
  },
  {
    title: '基礎版',
    price: { monthly: '15,000', yearly: '172,100' },
    cta: '開始使用',
    details: [
      '1個老闆帳號',
      '2個值機帳號',
      '開單不限筆數',
      '建立管理客戶資料',
      '交接班功能',
      '交易數據統計分析',
      '自動計算媒合服務費',
      '建立PMatch網站商店',
      '交易紀錄查詢',
      '<span class="text-[#D31E00]">電子發票開立系統</span>'
    ],
    note: '※需另外加收100元費用',
    icon: '/images/check-mark-yellow.svg',
    className: 'bg-gradient-to-b from-[#FFFFFF] to-[#FEE4CC] text-gray-800',
    textClass: 'bg-gradient-to-r from-[#FFC911] to-[#FFB871] bg-clip-text text-transparent',
    buttonClass: 'text-white bg-gradient-to-r from-[#FFC90E] to-[#FFB774] hover:opacity-90'
  },
  {
    title: '專業版',
    badge: '最受歡迎',
    price: { monthly: '25,000', yearly: '285,000' },
    cta: '立即加入',
    details: [
      '<strong>包含所有基礎版功能</strong>',
      '1個老闆帳號',
      '5個值機帳號',
      '媒合結果查詢',
      'PMatch網站張貼廣告',
      '客戶消費特性分析',
      '金流核對',
      '電子發票開立系統'
    ],
    note: null,
    icon: '/images/check-mark-orange.svg',
    className: 'bg-gradient-to-b from-[#FFFFFF] to-[#FED9BA] text-gray-800',
    textClass: 'bg-gradient-to-r from-[#EC6A3B] to-[#FFB070] bg-clip-text text-transparent',
    buttonClass: 'text-white bg-gradient-to-r from-[#EB6739] to-[#FFB171] hover:opacity-90',
    wrapperClass: 'rounded-[10px] p-[3px] bg-gradient-to-b from-[#AB6CEB] to-[#613D85]'
  }
]);
</script>

<style scoped>
.storeBac {
  background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.gradient-border {
  position: relative;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 25px;
  background: linear-gradient(to right, white, #73FBFD);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.button-shadow {
  box-shadow: inset 0 2px 0 #fff8;
}
</style>