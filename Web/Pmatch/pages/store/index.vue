<template>

  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <ElDialog v-for="(dialog, index) in dialogVisible" :key="index" v-model="dialogVisible[index]"
    :close-on-click-modal="false">
    <!--<div class="dialogHeader absolute">遊戲幣走向</div>-->
    <div class="dialogBody">
      <div>
        <Line :id="`my-chart-${index}`" :options="chartOptions" :data="chartDataComputed[index]" />
      </div>
      <div class="flex justify-end mt-5">
        <ElButton class="agreeBtn" type="primary" @click="dialogVisible[index] = false">
          關閉
        </ElButton>
      </div>
    </div>
  </ElDialog>
  <div class="storeBac">
    <div class="pb-5rem">
      <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
        <div class="mb-3">
          <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-48px slogan">
            PMatch是你事業上的全能助手 !
          </h1>
          <h3 class="m-0 font-size-20px md-font-size-26px text-center subSlogan">
            輕鬆完成帳務整合與合法報稅、一站管理會員資料&交易數據、同時讓你的廣告被看見，<br>讓對的人找到你
          </h3>
        </div>
      </div>
    </div>
    <div class="pb-7rem">
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="md-flex">
          <div class="w-100%">
            <div class="matchBox">
              <div class="matchContent">
                <div class="flex justify-center pb-3">
                  <el-statistic :value="matchValue1" />
                  <span class="plus">+</span>
                </div>
                <div class="matchDetail">
                  <span class="m-0 md-block inline color-#fff text-center w-100%">
                    已經促成"百萬筆"
                  </span>
                  <span class="m-0 md-block inline color-#fff text-center w-100%">
                    以上的媒合
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-100%">
            <div class="matchBox">
              <div class="matchContent">
                <div class="flex justify-center pb-3">
                  <el-statistic :value="matchValue3" />
                  <span class="plus">+</span>
                </div>
                <div class="matchDetail">
                  <span class="m-0 md-block inline color-#fff text-center md-w-100%">
                    已幫助"三萬+"
                  </span>
                  <span class="m-0 md-block inline color-#fff text-center md-w-100%">
                    位玩家完成媒合
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 富豪榜 -->
    <div class="pb-7rem">
          <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
            <div class="flex justify-center">
              <div class="w-90%">
                <div class="flex tableTh">
                  <div class="w-100% font-size-1.2rem text-center color-#beffff">
                    遊戲平台
                  </div>
                  <div class="w-100% font-size-1.2rem text-center color-#beffff">
                    富豪榜財產
                  </div>
                  <div class="w-100% font-size-1.2rem text-center color-#beffff">
                    遊戲幣走向
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    滿貫大亨
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList0.length ? dailyPatchList0[dailyPatchList0.length - 1].Total.toLocaleString() : "0" }}
                  </div>
                  <div class="w-100% font-size-1.2rem text-center color-#beffff">
                    <ElButton plain @click="openDialog(0)">
                      
                      <Line :data="simpleChartData" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    老子有錢
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList1.length ? dailyPatchList1[dailyPatchList1.length - 1].Total.toLocaleString() : "0" }}
                  </div>
                  <div class="w-100% font-size-1.2rem text-center color-#beffff">
                    <ElButton plain @click="openDialog(1)">
                    
                      <Line :data="simpleChartData1" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    錢街Online
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList2.length ? dailyPatchList2[dailyPatchList2.length - 1].Total.toLocaleString() : '0' }}
                  </div>
                  <div class="w-100% text-center">
                    <ElButton plain @click="openDialog(2)">
                      
                      <Line :data="simpleChartData2" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    聚寶Online
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList3.length ? dailyPatchList3[dailyPatchList3.length - 1].Total.toLocaleString() : '0' }}
                  </div>
                  <div class="w-100% text-center">
                    <ElButton plain @click="openDialog(3)">
                      
                      <Line :data="simpleChartData3" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    金爸爸娛樂城
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList4.length ? dailyPatchList4[dailyPatchList4.length - 1].Total.toLocaleString() : '0' }}
                  </div>
                  <div class="w-100% text-center">
                    <ElButton plain @click="openDialog(4)">
                      
                      <Line :data="simpleChartData4" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
                <div class="flex tableTd">
                  <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                    寶島娛樂城
                  </div>
                  <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                    {{ dailyPatchList5.length ? dailyPatchList5[dailyPatchList5.length - 1].Total.toLocaleString() : '0' }}
                  </div>
                  <div class="w-100% text-center">
                    <ElButton plain @click="openDialog(5)">
                      
                      <Line :data="simpleChartData5" :options="simpleChartOptions" class="md-w-150px w-80px" />
                    </ElButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    <!-- 先不開(遊戲榜) -->
    <!-- <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="md-flex">
                    <div class="w-100% md-w-50% md-mb-0 mb-3rem">
                        <div class="flex items-center justify-center mb-8">
                            <div class="border-gradient-l"></div>
                            <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">熱門</span>
                            <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">遊戲</span>
                            <div class="border-gradient-r"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 5</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >遊戲幣數量</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100% md-w-50%">
                        <div class="flex items-center justify-center mb-8">
                            <div class="border-gradient-l"></div>
                            <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">新進</span>
                            <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">遊戲</span>
                            <div class="border-gradient-r"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 3</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >上線日期</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你爽</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你書</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你哭</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

    <!-- 最新消息 -->
     <div ref="newsRef" class="max-w-1110px h-[920px] m-auto ps-5 pe-5 relative z-2 pb-7rem">
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">最新</span>
          <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">消息</span>
          <div class="border-gradient-r"></div>
        </div>
        <div class="flex justify-center">
          <div class="w-100%">
            <div class="flex lg:justify-start justify-center">
              <!-- ALL -->
              <div class="relative inline-block w-[60px] h-[48px] group">
                <button class="hollow-btn-all cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([5, 6], '', 'ALL')" :aria-pressed="activeNewsType === 'ALL'"></button>
                <div
                  class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
                  :class="[activeNewsType === 'ALL'
                      ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#6DF0FE)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#6DF0FE33,_transparent)]'
                      : 'before:bg-[linear-gradient(to_bottom,_transparent,_#6DF0FE33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#6DF0FE)]']">
                  <span
                    class="z-1 transition-colors" :class="[activeNewsType === 'ALL'
                        ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#6DF0FE] group-hover:bg-clip-text group-hover:text-transparent'
                        : 'bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent group-hover:text-[#31129B]']">ALL
                  </span>
                </div>
              </div>
              <!-- SYSTEM -->
              <div class="relative inline-block ms-2.5 w-[90px] h-[48px] group">
                <button class="hollow-btn-system cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([5], '', 'SYSTEM')" :aria-pressed="activeNewsType === 'SYSTEM'"></button>
                <div
                  class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
                  :class="[ activeNewsType === 'SYSTEM'
                      ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#FE6FDA33,_transparent)]'
                      : 'before:bg-[linear-gradient(to_bottom,_transparent,_#FE6FDA33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)]']">
                  <span
                    class="z-1 transition-colors" :class="[ activeNewsType === 'SYSTEM'
                        ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#FE6FDA] group-hover:bg-clip-text group-hover:text-transparent'
                        : 'bg-gradient-to-b from-[#fff] to-[#FE6FDA] bg-clip-text text-transparent group-hover:text-[#31129B]']">系統公告
                  </span>
                </div>
              </div>
              <!-- POLICY -->
              <div class="relative inline-block ms-2.5 w-[90px] h-[48px] group">
                <button class="hollow-btn-policy cursor-pointer w-full h-full rounded-full" @click="fetchNewsListData([6], '', 'POLICY')" :aria-pressed="activeNewsType === 'POLICY'"></button>
                <div
                  class="absolute pointer-events-none inset-0 flex items-center justify-center mx-auto font-bold before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0"
                  :class="[ activeNewsType === 'POLICY'
                      ? 'before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)] group-hover:before:bg-[linear-gradient(to_bottom,_transparent,_#B698FF33,_transparent)]'
                      : 'before:bg-[linear-gradient(to_bottom,_transparent,_#B698FF33,_transparent)] group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)]']">
                  <span
                    class="z-1 transition-colors" :class="[activeNewsType === 'POLICY'
                        ? 'text-[#31129B] group-hover:bg-gradient-to-b group-hover:from-[#fff] group-hover:to-[#B698FF] group-hover:bg-clip-text group-hover:text-transparent'
                        : 'bg-gradient-to-b from-[#fff] to-[#B698FF] bg-clip-text text-transparent group-hover:text-[#31129B]']">政策公告
                  </span>
                </div>
              </div>
            </div>
            <div v-if="newsList.length > 0">
              <NuxtLink :to="`/store/news?id=${item.Id}`" v-for="(item, index) in newsList .filter((item) => item.Category !== 3) .reverse() .slice(0, 6)":key="index" class="newsLink color-#555553 decoration-none">
                <div class="w-full mt-1.8rem">
                  <div class="w-80 font-size-.8rem">
                    <div class="flex items-center">
                      <div :class="{ 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#FE6FDA)]': item.Category === 5, 'bg-[linear-gradient(to_bottom,_#FFFFFF,_#B698FF)]': item.Category === 6 }"
                        class="flex items-center justify-center w-70px text-[#31129B]  p-1 font-size-12px rounded-50px">
                        {{ item.Category === 5 ? "系統公告" : item.Category === 6 ? "政策公告" : "" }}
                      </div>
                      <div class="flex font-size-12px items-center p-2">
                        <span class="bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                          {{ item.StartTime.slice(0, 10) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="w-full pt-3 pb-4 relative before:content-[''] before:absolute before:h-[1px] before:w-[105%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)] flex items-end justify-between">
                    <div class="ms-2.5">
                      <h2 class="my-0  font-size-30px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent hover:bg-gradient-to-t">
                        {{ item.Title }}
                      </h2>
                      <h4 class="my-0 font-size-15px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                        {{ item.Summary }}
                      </h4>
                    </div>
                    <div class="me-2.5">
                      <p class="my-0 font-size-15px bg-gradient-to-b from-[#fff] to-[#6DF0FE] bg-clip-text text-transparent">
                        詳細資訊...
                      </p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

     <!-- 方案費用 -->
    <div class="pb-7rem">
        <div class="max-w-1372px m-auto ps-5 pe-5 relative z-2">
            <div class="flex items-center justify-center mb-3rem">
                <div class="border-gradient-l"></div>
                <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">方案</span>
                <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">費用</span>
                <div class="border-gradient-r"></div>
            </div>

          <div class="lg:pt-[40px] flex flex-wrap lg:flex-nowrap justify-center gap-6">
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
                    <NuxtLink to="/store/register" class="flex-inline no-underline">
                      <div class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none bg-gradient-to-r from-[#48A7A8] to-[#84E093] hover:opacity-90 cursor-pointer ">
                        {{ plans[0].cta }}                      
                      </div>
                    </NuxtLink>
                  </div>
                  <ul class="mt-6 space-y-[30px] ps-[16px]">
                    <li v-for="detail in plans[0].details" :key="detail" class="flex items-start">
                      <img :src="plans[0].icon" class="w-[30px] me-3 mt-0.5 select-none pointer-events-none" alt="check" />
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
                      <img src="/images/confetti.svg" class="w-[30px] mt-0.5 select-none pointer-events-none" alt="check" />
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
                          <div class="relative pt-[30px] px-[28px] rounded-lg h-[960px]" :class="plan.contentClass">
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
                              <button @click="selectAndScrollToForm" class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none cursor-pointer" :class="plan.buttonClass">{{ plan.cta }}</button>
                            </div>
                            <ul class="mt-6 space-y-[30px] ps-[16px]">
                              <li v-for="detail in plan.details" :key="detail" class="flex items-start">
                                <img :src="plan.icon" class="w-[30px] me-3 mt-0.5 select-none pointer-events-none" alt="check" />
                                <span class="text-[22px] " v-html="detail"></span>
                              </li>
                            </ul>
                            <p v-if="plan.note" class="text-[18px] text-[#D31E00] mt-[20px] text-center">{{ plan.note }}</p>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="relative pt-[30px] px-[28px] rounded-lg h-[960px]" :class="plan.contentClass">
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
                              <button @click="selectAndScrollToForm" class="w-[200px] h-[60px] leading-[60px] rounded-full text-[28px] text-white border-none cursor-pointer " :class="plan.buttonClass">{{ plan.cta }}</button>
                            </div>
                            <ul class="mt-6 space-y-[30px] ps-[16px]">
                              <li v-for="detail in plan.details" :key="detail" class="flex items-start">
                                <img :src="plan.icon" class="w-[30px] me-3 mt-0.5 select-none pointer-events-none" alt="check" />
                                <span class="text-[22px] " v-html="detail"></span>
                              </li>
                            </ul>
                            <p v-if="plan.note" class="text-[18px] text-[#D31E00] mt-[20px] text-center">{{ plan.note }}</p>
                          </div>
                      </template>
                    </div>
                </div>
                <div class="my-[36px] text-center">
                  <NuxtLink href="/store/program" class="w-[367px] h-[75px] inline-flex justify-center items-center rounded-full border-solid border-0px bg-gradient-to-r from-[#7C2CBE] to-[#F12588] no-underline text-white text-[26px] hover:border-3px hover:w-[361px] hover:h-[69px] hover:from-white hover:to-white hover:text-[#EE2589] active:border-0px active:w-[367px] active:h-[75px] active:from-[#F12588] active:to-[#F12588] active:text-white">
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

    
    <!-- 我們的優勢 -->
    <div class="pb-7rem">
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div>
          <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-48px pushSlogan color-#fff">
            我們將成為您
          </h1>
          <h1 class="m-0 mb-8 text-center font-size-33px md-font-size-48px slogan">
            『業務成長的助推器』
          </h1>
          <h3 class="m-0 font-size-14px md-font-size-26px text-center subSlogan">
            以專注於解決商家在市場中遇到的曝光和客戶開發問題
          </h3>
          <h3 class="m-0 font-size-14px md-font-size-26px text-center subSlogan">
            並結合行業創新的C2B2C模式、記帳以及實名制系統，為您提供全面支持
          </h3>
        </div>
      </div>
    </div>
    <div class="pb-7rem">
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">我們</span>
          <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">的優勢</span>
          <div class="border-gradient-r"></div>
        </div>
        <div v-for="(item, index) in advantagesList" :key="index" class="md-flex adBox"
          :class="{ advantagesEven: index % 2 !== 0 }">
          <div class="w-100% lg-w-50% md-mb-0rem mb-2rem">
            <div class="ps-5 pe-5 flex items-center select-none pointer-events-none">      
              <img
                class="w-100%"
                :class="item.imagesOffsetClass"
                :src="item.img"
                :alt="item.title"
              />
              <img
                class="w-74.5%"
                :class="item.animeOffsetClass"
                :src="item.anime"
                :alt="item.title"
              />
            </div>
          </div>
          <div class="adContentBox w-100% lg-w-50% flex items-center">
            <div class="lg-ms-5 lg-me-5">
              <div class="mb-2rem md-block flex justify-center select-none pointer-events-none">
                <img :class="item.iconClass" :src="item.icon" :alt="item.detail" />
              </div>
              <div class="mb-1rem md-mb-1.5rem md-block flex justify-center">
                <span class="adTitle">{{ item.title }}</span>
              </div>
              <div class="mb-2rem md-mb-1rem md-block flex justify-center">
                <span class="adContent">{{ item.detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   
    <!-- 聯絡我們 -->
    <div ref="formRef" class="pb-25rem">
      <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">聯絡</span>
          <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">我們</span>
          <div class="border-gradient-r"></div>
        </div>
        <div class="flex justify-center">
          <div class="contactBox py-2rem px-1rem md-px-3rem">
            <div class="mb-1rem">
              <input class="contactEntry" placeholder="公司名稱/姓名" type="text" v-model="contactName" />
            </div>
            <div class="relative mb-1rem">
              <input class="contactEntry" placeholder="手機號碼" :class="{ 'error-input': isPhoneError }" type="text"
                v-model="contactPhone" />
              <div v-show="isPhoneError" class="absolute right-5px top-12px">
                <img class="w-30px" src="/images/icon-alert.png" alt="警示的圖" />
              </div>
              <div v-show="isPhoneError">
                <p class="m-0 fw-600 color-#ff2400">
                  請輸入正確手機格式，共10碼
                </p>
              </div>
            </div>
            <div class="mb-1rem">
              <input class="contactEntry" placeholder="Email" type="text" v-model="contactMail" />
            </div>
            <div class="mb-1rem">
              <div class="contactEntry purposeSelect relative" :class="{ 'pointer-events-none opacity-70 bg-gray-200': isLocked }" @click.stop="togglePurposeBox">
                <span>{{ selectedPurpose || "主旨 ..." }}</span>
                <div class="purposeBox" v-show="showPurposeBox">                  
                  <div class="purposeBoxContent">
                    <div class="relative w-100% purposeOption" v-for="(option, index) in purposeOptions" :key="option" @click.stop="selectPurpose(option)">
                      {{ option }}
                      <div v-show="index === 0" class="absolute top-15px right-15px">
                        <img class="w-15px" src="/images/icon-arrow-down-03.png" alt="下拉選單箭頭" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="absolute top-15px right-15px">
                  <img class="w-15px" src="/images/icon-arrow-down-02.png" alt="下拉選單箭頭" />
                </div>
              </div>
            </div>
            <transition name="fade">
              <div class="mb-1rem" v-if="selectedPurpose === '商務洽談'">
                <input class="contactEntry" placeholder="遊戲平台/經營角色" maxlength="20" type="text" v-model="contactPlatform" />
              </div>
            </transition>
            <div class="mb-1rem">
              <textarea class="contactEntryArea" placeholder="留言 (請輸入100字以內的訊息)" cols="30" rows="10" maxlength="100"
                v-model="contactComment"></textarea>
            </div>
            <div class="flex items-center justify-between">
              <div class="w-60% me-1rem relative">
                <input class="contactCap" :class="{ 'error-input': isCapError }" placeholder="輸入驗證碼" type="text"
                  v-model="contactCap" />
                <div v-show="isCapError" class="absolute right-5px top-12px">
                  <img class="w-30px" src="/images/icon-alert.png" alt="警示的圖" />
                </div>
              </div>
              <div class="w-200px flex">
                <div id="captchaContainer" class="w-100% h-51px me-.5rem"></div>
                <div @click="refreshCaptcha" class="refreshBtn flex items-center">
                  <img class="w-35px" src="/images/icon-refresh.png" alt="重整的圖" />
                </div>
              </div>
            </div>
            <div class="mb-1rem" v-show="isCapError">
              <p class="m-0 fw-600 color-#ff2400">
                請輸入正確的驗證碼
              </p>
            </div>
            <div class="flex justify-center pt-3 mt-4">
              <div class="moreBtnBox">
                <button class="moreBtn color-#fff font-size-22px decoration-none" to="/gamelist" @click="sendForm">
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Bar } from 'vue-chartjs';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// 註冊 Chart.js 所需的模組
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { useTransition } from '@vueuse/core';
import { useLoadStore } from '../stores/loading.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
import useCaptcha from '~/composables/captcha';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const { GVerify } = useCaptcha();
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const setPageLoading = store.setPageLoading;
const userToken = useCookie('_PmToken');
let captcha = null;

const route = useRoute();
const router = useRouter();
const newsRef = ref(null);
const formRef = ref(null); 
const newsList = ref([]); // 儲存 API 獲取的最新消息
const activeNewsType = ref('ALL'); // 追蹤當前點選的消息分類頁籤

const source1 = ref(0);
const source2 = ref(0);
const source3 = ref(0);
const dailyPatchList0 = ref([]);
const dailyPatchList1 = ref([]);
const dailyPatchList2 = ref([]);
const dailyPatchList3 = ref([]);
const dailyPatchList4 = ref([]);
const dailyPatchList5 = ref([]);
const dailyPatchLists = [dailyPatchList0, dailyPatchList1, dailyPatchList2, dailyPatchList3, dailyPatchList4, dailyPatchList5];
// 用來控制每個對話框的開關狀態
const dialogVisible = ref([false, false, false, false, false, false]);

const contactName = ref('');
const contactPhone = ref('');
const contactPlatform = ref('');
const contactMail = ref('');
const contactComment = ref('');
const contactCap = ref('');
const showPurposeBox = ref(false);
const isLocked = ref(false); 
const selectedPurpose = ref('');
const purposeOptions = ref(['主旨 ...', '商務洽談', '合作邀請', '網站使用問題', '其他']);
const isCapError = ref(false);
const isPhoneError = ref(false);
// 開啟指定的對話框
function openDialog(index) {
  dialogVisible.value[index] = true;
}

// 取得GetNewsList(最新消息)
async function fetchNewsListData(num, token = '', type = 'ALL') {
  activeNewsType.value = type;
  if (token === '') {
    token = await jwtStore.generateToken();
  }

  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetNewsList',
      {
        Categorys: num
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
     if (response.data.Status.Code === 0) {
      const sortedData = response.data.Data.sort((a, b) => {
        const topSort = a.IsTop - b.IsTop;
        if (topSort !== 0) {
        return topSort;
        }
        return new Date(a.StartTime) - new Date(b.StartTime);
      });
      newsList.value = sortedData;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
    data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
  }
}

const matchValue1 = useTransition(source1, {
  duration: 1500
});
source1.value = 1000000;
const matchValue2 = useTransition(source2, {
  duration: 1500
});
source2.value = 130;
const matchValue3 = useTransition(source3, {
  duration: 1500
});
source3.value = 30000;

// 優勢列表
const advantagesList = [
  {
    title: '輕鬆搞定申報問題',
    detail: '整合式帳務管理模組，簡化交易數據記帳流程同時管理交易資料，透過PMatch獨家自動組建媒合帳務系統，輕鬆完成稅務計算，無須影響原本交易流程',
    img: '/images/adBackground.png',
    anime: '/images/animes/advantages-1.gif',
    animeOffsetClass: 'translate-x-[-115.4%] translate-y-[1.4%]',
    icon: '/images/adIcon-1.png',
    iconClass: 'w-[68px] px-[1px] py-[3px]'
  },
  {
    title: '專業的實名驗證系統',
    detail: 'PMatch與各大銀行以及電信商合作，提供安全驗證功能，可依客戶提供的帳戶資料及電話，快速知道是否為高風險警示帳戶與身份資料是否吻合，保障交易安全，加強風險控管機制',
    img: '/images/adBackground.png',
    anime: '/images/animes/advantages-2.gif',
    animeOffsetClass: 'translate-x-[-115.4%] translate-y-[1.4%]',
    icon: '/images/adIcon-2.png',
    iconClass: 'w-[66px] px-[2px]'
  },
  {
    title: '客戶資料整合管理',
    detail: '獨特專業的客戶管理模組，輕鬆查詢過往交易狀況及繳費所在地，節省交易時間，經營客戶關係更有效率，推廣活動更便利；系統嚴格監控即時通報，輕鬆掌握高風險客戶',
    img: '/images/adBackground.png',
    anime: '/images/animes/advantages-3.gif',
    animeOffsetClass: 'translate-x-[-115.4%] translate-y-[1.4%]',
    icon: '/images/adIcon-3.png',
    iconClass: 'w-[68px] px-[1px] py-[9px]'
  },
  {
    title: '媒合交易數據後台',
    detail: '每一筆委買委賣交易均完整記錄，PMatch同時提供數據分析後台及趨勢圖表，經營成效一目了然，為業績拓展提供強力支援，您的客戶在PMatch網站上可自行查詢每一筆交易記錄',
    img: '/images/adBackground.png',
    anime: '/images/animes/advantages-4.gif',
    animeOffsetClass: 'translate-x-[-115.4%] translate-y-[1.4%]',
    icon: '/images/adIcon-4.png',
    iconClass: 'w-[70px] py-[5px]'
  },
  {
    title: '助您擴大品牌聲量與提升顧客黏著度',
    detail: '商店曝光與品牌宣傳，幫助擴大目標客戶觸及範圍，提高流量及互動度。客戶可主動搜尋商店並下單，與PMatch帳務系統直接連動，簡化訂單流程。支援網站即時聊天室功能，促進商家與客戶之間的即時溝通與互動',
    img: '/images/adBackground.png',
    anime: '/images/animes/advantages-5.gif',
    animeOffsetClass: 'translate-x-[-115.4%] translate-y-[1.4%]',
    icon: '/images/adIcon-5.png',
    iconClass: 'w-[60px] px-[5px]'
  }
];
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
    // classNames are not needed here as it's directly styled
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
    contentClass: 'bg-gradient-to-b from-[#FFFFFF] to-[#FEE4CC] text-gray-800',
    buttonClass: 'text-white bg-gradient-to-r from-[#FFC90E] to-[#FFB774] hover:opacity-90',
    textClass: 'bg-gradient-to-r from-[#FFC911] to-[#FFB871] bg-clip-text text-transparent'
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
    wrapperClass: 'rounded-[10px] p-[3px] bg-gradient-to-b from-[#AB6CEB] to-[#613D85]',
    contentClass: 'bg-gradient-to-b from-[#FFFFFF] to-[#FED9BA] text-gray-800',
    buttonClass: 'text-white bg-gradient-to-r from-[#EB6739] to-[#FFB171] hover:opacity-90',
    textClass: 'bg-gradient-to-r from-[#EC6A3B] to-[#FFB070] bg-clip-text text-transparent'
  }
]);
// 為完整版圖表準備數據
const chartDataComputed = computed(() => {
  return dialogVisible.value.map((_, index) => getChartData(index));
});
// 為簡化版圖表準備數據
const simpleChartData = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList0.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList0.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList0.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData1 = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList1.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList1.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList1.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData2 = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList2.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList2.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList2.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData3 = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList3.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList3.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList3.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData4 = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList4.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList4.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList4.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData5 = computed(() => {
  // 假設這裡使用 endDate 的數據
  const { EndTime } = calculateWeekRange();
  let endDateData = dailyPatchList5.value.filter(item => item.Time.split('T')[0] === EndTime);
  // 如果沒有找到數據，則取最後最多5筆數據
  if (endDateData.length === 0) {
    const totalRecords = dailyPatchList5.value.length;
    const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
    endDateData = dailyPatchList5.value.slice(-recordsToTake);
  }
  return getSimpleChartData(endDateData);
});
// 修改 getChartData 函數
const getChartData = index => {
  // 先確保 dailyPatchLists[index] 存在
  if (!dailyPatchLists[index]) {
    console.log(`索引 ${index} 的資料清單不存在`);
    return getEmptyChartData();
  }

  // 確保 .value 有值且是陣列
  const dataList = dailyPatchLists[index].value;
  console.log('當前資料:', dataList);

  if (!Array.isArray(dataList) || dataList.length === 0) {
    console.log(`資料清單為空或無效：Index ${index}`);
    return getEmptyChartData();
  }

  // 確保每個項目都有需要的屬性
  if (!dataList.every(item => item && item.Time !== undefined && item.Total !== undefined)) {
    console.log('資料結構不完整');
    return getEmptyChartData();
  }

  // 正常生成圖表資料
  return {
    labels: dataList.map(item => formatDate(item.Time)),
    datasets: [
      {
        label: '',
        data: dataList.map(item => item.Total),
        backgroundColor: 'rgb(90,155,213)',
        borderColor: '#36A2EB',
        tension: 0.4,
        fill: false,
        borderWidth: 2
      }
    ]
  };
};
// 輔助函數：格式化日期
function formatDate(timeString) {
  const date = new Date(timeString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
}
// 輔助函數：取得空的圖表資料
function getEmptyChartData() {
  return {
    labels: ['沒有資料'],
    datasets: [
      {
        label: '',
        data: [0],
        backgroundColor: 'rgb(90,155,213)',
        borderColor: '#36A2EB',
        tension: 0.4,
        fill: false,
        borderWidth: 2
      }
    ]
  };
}
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top'
    },
    tooltip: {
      enabled: false // 禁用提示框
    },
    title: {
      display: true,
      text: context => {
        // 獲取當前圖表的索引
        const chartId = context.chart.canvas.id;
        const index = parseInt(chartId.split('-')[2]); // 從 'my-chart-0' 取得索引
        const platformNames = ['滿貫大亨', '老子有錢', '錢街Online', '聚寶Online', '金爸爸娛樂城', '寶島娛樂城'];
        return `${platformNames[index]} - 近五日富豪榜財產走勢`;
      },
      font: {
        size: 24 // 設置字體大小為 24px
      },
      padding: {
        bottom: 10 // 設置下方間距為 10px
      }
    }
  },
  scales: {
    y: {
      display: true,
      stacked: false,
      position: 'left',
      ticks: {
        display: false
      }
    },
    x: {
      display: false,
      ticks: {
        maxRotation: 45,
        minRotation: 45
      },
      grid: {
        display: true
      }
    }
  }
};
// 計算日期
const calculateWeekRange = () => {
  const today = new Date(); // 取得今天的日期
  const dayOfWeek = today.getDay(); // 取得今天是星期幾 (0:週日, 1:週一, ..., 6:週六)

  // 初始化範圍日期
  let startDate = new Date(today);
  let endDate = new Date(today);

  if (dayOfWeek === 0) {
    // 如果今天是禮拜日，抓上上週的禮拜日到上週的禮拜六
    startDate.setDate(today.getDate() - 13); // 上上週禮拜一
    endDate.setDate(today.getDate() - 7); // 上週禮拜日
  } else {
    // 其他情況，抓上週的禮拜一到禮拜日
    startDate.setDate(today.getDate() - dayOfWeek - 6); // 上週禮拜一
    endDate.setDate(today.getDate() - dayOfWeek); // 上週禮拜日
  }

  // 格式化日期為 "YYYY-MM-DD"
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    StartTime: formatDate(startDate),
    EndTime: formatDate(endDate)
  };
};
// 簡化版折線圖的數據生成函數
const getSimpleChartData = data => {
  if (!Array.isArray(data) || data.length === 0) {
    return getEmptySimpleChartData();
  }

  return {
    labels: data.map(item => formatDate(item.Time)),
    datasets: [
      {
        data: data.map(item => item.Total),
        borderColor: '#36A2EB',
        tension: 0.4,
        fill: false,
        type: 'line',
        pointRadius: 3, // 外圈大小
        pointBackgroundColor: '#36A2EB', // 點的背景色（白色）
        pointBorderColor: '#fff', // 點的邊框色（藍色）
        pointBorderWidth: 2 // 點的邊框寬度
      }
    ]
  };
};

// 簡化版空數據
function getEmptySimpleChartData() {
  return {
    labels: ['沒有資料'],
    datasets: [
      {
        data: [0],
        borderColor: '#36A2EB',
        tension: 0.4,
        fill: false,
        type: 'line',
        // pointRadius: 0, // 隱藏數據點
        pointRadius: 3, // 外圈大小
        pointBackgroundColor: '#36A2EB', // 點的背景色（白色）
        pointBorderColor: '#fff', // 點的邊框色（藍色）
        pointBorderWidth: 2 // 點的邊框寬度
      }
    ]
  };
}

// 簡化版圖表配置
const simpleChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false // 隱藏圖例
    },
    title: {
      display: false // 隱藏標題
    },
    tooltip: {
      enabled: false // 禁用提示框
    }
  },
  scales: {
    y: {
      display: false // 隱藏Y軸
    },
    x: {
      display: false // 隱藏X軸
    }
  },
  elements: {
    point: {
      radius: 0 // 隱藏數據點
    }
  }
};
// 取得富豪榜
async function fetchRichList(token, type) {
  if (token === '') {
    token = await jwtStore.generateToken();
  }
  const { StartTime, EndTime } = calculateWeekRange();
  const useStartTime = StartTime;
  const useEndTime = EndTime;
  try {
    const response = await $axios.post(
      '/api/v1/Statist/GetDailyPatchList',
      {
        GamePlatformType: type, // 1錢街, 2滿貫, 3包你發, 4老子有錢, 5聚寶, 6金爸爸,
        StartTime: useStartTime,
        EndTime: useEndTime
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      if (type === 2) {
        dailyPatchList0.value = response.data.Data;
      } else if (type === 4) {
        dailyPatchList1.value = response.data.Data;
      } else if (type === 1) {
        dailyPatchList2.value = response.data.Data;
      } else if (type === 5) {
        dailyPatchList3.value = response.data.Data;
      } else if (type === 6) {
        dailyPatchList4.value = response.data.Data;
      } else if (type === 7) {
        dailyPatchList5.value = response.data.Data;
      }
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}
// 切換下拉選單的顯示/隱藏
const togglePurposeBox = () => {
  if (isLocked.value) return; 
  showPurposeBox.value = !showPurposeBox.value;
  // 選單開啟時添加全域點擊監聽
  if (showPurposeBox.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};
const handleClickOutside = event => {
  const dropdown = document.querySelector('.purposeBox');
  if (dropdown && !dropdown.contains(event.target)) {
    showPurposeBox.value = false;
  }
};
const selectPurpose = item => {
  if (isLocked.value) return;
  selectedPurpose.value = item;
  showPurposeBox.value = false;
  if (item !== '商務洽談') {
    contactPlatform.value = '';
  }
};
// 檢查電話
const validatePhone = () => {
  const phoneRegex = /^09\d{8}$/; // 09 開頭，後接 8 位數字
  const result = phoneRegex.test(contactPhone.value);
  isPhoneError.value = !result;
  return result;
};
// 刷新驗證碼
const refreshCaptcha = () => {
  captcha.refresh();
};
// 驗證用戶輸入
const validateCaptcha = () => {
  const result = captcha.validate(contactCap.value);
  isCapError.value = !result;
  return result; // 會返回 true 或 false
};
// 送出信件
async function sendForm() {
  if (!contactName.value) {
    await openAlertModal(' ', '請輸入公司名稱或姓名', 'ContactUsNullOfName');
    return;
  }
  if (!validatePhone() && !validateCaptcha()) {
    await openAlertModal(' ', '請輸入正確的手機號碼及驗證碼', 'ContactUsErrorOfPhone');
    return;
  }
  if (!validatePhone()) {
    await openAlertModal(' ', '手機號碼必須是 09 開頭且為 10 碼');
    return;
  }
  if (!contactMail.value) {
    await openAlertModal(' ', '請輸入Email', 'ContactUsNullOfEmail');
    return;
  }
  if (selectedPurpose.value === '主旨 ...' || !selectedPurpose.value) {
    await openAlertModal(' ', '請先選擇主旨內容', 'ContactUsNullOfTitle');
    return;
  }
  if (selectedPurpose.value === '商務洽談' && !contactPlatform.value) {
    await openAlertModal(' ', '請輸入遊戲平台或經營角色', 'ContactUsNullOfPlatform');
    return;
  }
  if (!contactComment.value) {
    await openAlertModal(' ', '請輸入留言內容', 'ContactUsNullOfComment');
    return;
  }
  if (!validateCaptcha()) {
    await openAlertModal(' ', '請輸入正確的驗證碼');
    return;
  }
  await sendMail();
}
// 聯絡我們
async function sendMail() {
  const token = await jwtStore.generateToken();
  // platform 跟 content 共用 contactComment ，先用 trim() 清理資料 並組合出最終要送出的內容
  const platform = (contactPlatform.value || '').trim();
  const comment = (contactComment.value || '').trim();
  let finalContent = '';
  if (platform && comment) {
    finalContent = `Platform: ${platform}\nComment:\n${comment}`;
  } else {
    finalContent = comment;
  }
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/SendEmail',
      {
        Name: contactName.value,
        MobileNumber: contactPhone.value,
        Email: contactMail.value,
        Subject: selectedPurpose.value,
        Content: finalContent
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      await openAlertModal(' ', '已成功寄信完成，將有專員回覆您 !', 'sendContact');
      window.location.reload();
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}
function selectAndScrollToForm() {
  // 1. 設定下拉選單的值
  selectedPurpose.value = '商務洽談';

  // 2. 將狀態設為鎖定
  isLocked.value = true;

  // 3. 滾動到表單位置
  if (formRef.value) {
    formRef.value.scrollIntoView({ behavior: 'smooth' });
  }
}
onMounted(async () => {
  await setPageLoading(true);
  try {
    captcha = new GVerify({ id: 'captchaContainer' }); // 初始化畫布驗證碼
    if (userToken.value != '' && userToken.value != undefined) {
      const token = userToken.value;

      if (token != '') {
        await fetchNewsListData([5, 6], token); // 最新消息

        await fetchRichList(token, 2);
        await fetchRichList(token, 4);
        await fetchRichList(token, 1); // 錢街
        await fetchRichList(token, 5); // 聚寶
        await fetchRichList(token, 6); // 金爸爸
        await fetchRichList(token, 7); // 寶島
      }
    } else {
      // 生成新的 token
      const token = await jwtStore.generateToken();
      if (token != '') {
        await fetchNewsListData([5, 6], token); // 最新消息

        await fetchRichList(token, 2);
        await fetchRichList(token, 4);
        await fetchRichList(token, 1); // 錢街
        await fetchRichList(token, 5); // 聚寶
        await fetchRichList(token, 6); // 金爸爸
        await fetchRichList(token, 7); // 寶島
      }
    }
  } catch (error) {
    console.error('頁面初始化失敗:', error);
  } finally {
  await setPageLoading(false);

  // --- 整合所有 URL Query 參數的處理邏輯 ---

  // 1. 一次性讀取所有可能用到的參數
  const { scrollToNews, purpose, scrollToForm } = route.query;
  let queryParamsWereHandled = false; // 旗標，記錄是否處理過任何參數

  // 2. 處理 purpose 參數
  if (purpose && purposeOptions.value.includes(purpose)) {
    selectedPurpose.value = purpose;
    isLocked.value = true;
    queryParamsWereHandled = true;
  }

  // 3. 處理滾動到 news 區域
  if (scrollToNews === '1') {
    await nextTick();
    if (newsRef.value) {
      setTimeout(() => {
        newsRef.value.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    queryParamsWereHandled = true;
  }
  
  // 4. 處理滾動到 form 區域
  if (scrollToForm === '1') {
    await nextTick();
    if (formRef.value) {
      setTimeout(() => {
        formRef.value.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    queryParamsWereHandled = true;
  }

  // 5. 如果有任何參數被處理過，最後統一清除 URL
  if (queryParamsWereHandled) {
    router.replace({ path: route.path });
  }
  }
});
</script>

<style scoped>
.storeBac {
  background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.slogan {
  background: linear-gradient(to bottom, #fff, #43a5ee);
  background: -webkit-linear-gradient(#fff, #43a5ee);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.subSlogan {
  color: #fff;
}

.pushSlogan {
  background: linear-gradient(to bottom, #fff, #fff);
  background: -webkit-linear-gradient(#fff, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

:deep(.el-statistic__number) {
  background: linear-gradient(to bottom, #fff, #7b2cbf);
  background: -webkit-linear-gradient(#fff, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  font-size: 36px;
}

.plus {
  background: linear-gradient(to bottom, #fff, #7b2cbf);
  background: -webkit-linear-gradient(#fff, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  font-size: 36px;
}

.matchBox {
  position: relative;
  border-radius: 25px;
  background: transparent;
  margin: 1rem;
  background: linear-gradient(to bottom,
      rgba(123, 44, 191, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 100%);
}

.matchBox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 25px;
  padding: 2px;
  background: linear-gradient(to bottom, #fff, #7b2cbf);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.matchContent {
  border-radius: 25px;
  border: none;
  background: transparent;
  padding: 2rem 1rem;
  text-align: center;
}

.tableTh {
  padding-bottom: 1rem;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%) 1;
}

.tableTd {
  padding: 1rem 0;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%) 1;
}

.platformName {
  background: linear-gradient(to bottom, #fff, #43a5ee);
  background: -webkit-linear-gradient(#fff, #43a5ee);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
}

.patchNumber {
  background: linear-gradient(to bottom, #43a5ee, #fff);
  background: -webkit-linear-gradient(#43a5ee, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
}

.text-gradient-t {
  background: linear-gradient(to bottom, #fff, #43edff);
  background: -webkit-linear-gradient(#fff, #43edff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  color: transparent;
}

.text-gradient-b {
  background: linear-gradient(to bottom, #43edff, #fff);
  background: -webkit-linear-gradient(#43edff, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  color: transparent;
}

.border-gradient-l {
  width: 40px;
  border: 2px solid;
  border-right: none;
  height: 10px;
  border-image: linear-gradient(to right, #fff, #43edff) 1;
  margin-right: 1rem;
}

.border-gradient-r {
  width: 40px;
  border: 2px solid;
  border-left: none;
  height: 10px;
  border-image: linear-gradient(to left, #fff, #43edff) 1;
  margin-left: 1rem;
}

.topTitle {
  background: linear-gradient(to bottom, #43edff, #fff);
  background: -webkit-linear-gradient(#43edff, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 26px;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.topTableTh {
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  font-weight: 600;
}

.topTableBorder {
  position: relative;
}

.topTableBorder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(to right, #43edff, #fff);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.topTableThRight {
  border-left: 2px solid #fff;
}

.topTableTd {
  color: #fff;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #43edff, #fff) 1;
}

.topTableTd:last-child {
  border-bottom: none;
  /* 移除邊框 */
}

.topPatch {
  background: linear-gradient(to bottom, #fff, #43edff);
  background: -webkit-linear-gradient(#fff, #43edff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 20px;
}

:deep(.el-button.is-plain) {
  --el-button-hover-bg-color: rgba(0, 0, 0, 0);
  --el-button-hover-border-color: rgba(0, 0, 0, 0);
  --el-button-bg-color: rgba(0, 0, 0, 0);
  --el-button-border-color: rgba(0, 0, 0, 0);
}

/* 最新消息 */
.hollow-btn-all {
  border-width: 2px;
  border-radius: 9999px;
  position: relative;
  border-style: solid;
  border-color: transparent; 
  background:
  linear-gradient(rgba(255, 255, 255, 0.01), #6DF0FE , rgba(255, 255, 255, 0.01)),
  linear-gradient(to right, rgba(255, 255, 255, 0.01), #6DF0FE , rgba(255, 255, 255, 0.01));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  mask-image: linear-gradient(white, white), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: exclude, add;
}
.hollow-btn-system {
  border-width: 2px;
  border-radius: 9999px;
  position: relative;
  border-style: solid;
  border-color: transparent; 
  background:
  linear-gradient(rgba(255, 255, 255, 0.01), #FE6FDA , rgba(255, 255, 255, 0.01)),
  linear-gradient(to right, rgba(255, 255, 255, 0.01), #FE6FDA , rgba(255, 255, 255, 0.01));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  mask-image: linear-gradient(white, white), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: exclude, add;
}
.hollow-btn-policy {
  border-width: 2px;
  border-radius: 9999px;
  position: relative;
  border-style: solid;
  border-color: transparent;
  background:
  linear-gradient(rgba(255, 255, 255, 0.01), #B698FF , rgba(255, 255, 255, 0.01)),
  linear-gradient(to right, rgba(255, 255, 255, 0.01), #B698FF , rgba(255, 255, 255, 0.01));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  mask-image: linear-gradient(white, white), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: exclude, add;
}

.adBox {
  margin-bottom: 3rem;
}

.adBox:last-child {
  margin-bottom: 0rem;
}

.adTitle {
  background: linear-gradient(to bottom, #fff, #43a5ee);
  background: -webkit-linear-gradient(#fff, #43a5ee);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 30px;
}

.adContentBox {
  position: relative;
}

.adContentBox::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #43a5ee, #fff);
  mask-image: linear-gradient(to right, black 10px, transparent 10px, transparent 20px);
  mask-size: 20px 100%;
  mask-repeat: repeat-x;
}

.adContent {
  color: #fff;
  font-size: 20px;
}

.advantagesEven {
  flex-direction: row-reverse;
}

/* 方案&定價 */
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

.moreBtnBox {
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
}

.moreBtn {
  padding: 1rem 2rem;
  background: linear-gradient(to right, #7b2cbf, #f72585);
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.moreBtn:hover {
  background: #fff;
  color: #f72585;
}

.contactBox {
  position: relative;
  width: 50%;
  background: linear-gradient(to bottom,
      rgba(123, 44, 191, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 100%);
}

.contactBox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(to right, #43edff, #fff);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.contactEntry {
  color: #fff;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
  width: 100%;
  border: none;
  text-indent: 1rem;
  padding: 1rem 0;
  border-radius: 10px;
  position: relative;
  font-size: 1rem;
}

.contactEntry:focus-visible {
  outline: none;
}

.contactEntry::placeholder {
  color: #fff;
  /* 設定 placeholder 的顏色 */
}

.contactEntryArea {
  color: #fff;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
  width: calc(100% - 2rem);
  border: none;
  padding: 1rem;
  border-radius: 10px;
  position: relative;
  font-size: 1rem;
}

.contactEntryArea:focus-visible {
  outline: none;
}

.contactEntryArea::placeholder {
  color: #fff;
  /* 設定 placeholder 的顏色 */
}

.contactCap {
  color: #fff;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
  width: 100%;
  border: none;
  text-indent: 1rem;
  padding: 1rem 0;
  border-radius: 10px;
  position: relative;
  font-size: 1rem;
}

.contactCap:focus-visible {
  outline: none;
}

.contactCap::placeholder {
  color: #fff;
  /* 設定 placeholder 的顏色 */
}

#captchaContainer {
  border-radius: 10px;
  overflow: hidden;
}

.refreshBtn {
  cursor: pointer;
}

.error-input {
  border: 1px solid red !important;
}

.purposeSelect {
  cursor: pointer;
}

.purposeBox {
  position: absolute;
  top: 0;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  z-index: 2;
}

.purposeOption {
  padding: 1rem 0;
  color: #4361ee;
  border-radius: 10px;
  cursor: pointer;
}

.purposeOption:hover:not(:first-child) {
  padding: 1rem 0;
  background-color: #4361ee;
  color: #fff;
}

@media screen and (max-width: 1024px) {
  .programContent {
    width: 85%;
  }
}

@media screen and (max-width: 768px) {
  .contactBox {
    position: relative;
    width: 100%;
  }

  .border-gradient-l {
    width: 20px;
  }

  .border-gradient-r {
    width: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.33s ease, transform 0.33s ease;
  transform-origin: top;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
