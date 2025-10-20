<template>
  <Head>
    <title>10月超值豪禮三重奏</title>
    <Meta property="og:title" content="10月超值豪禮三重奏" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="PMatch遊戲道具交易平台 - 線上遊戲安心交易的第一選擇，PMatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="PMatch遊戲道具交易平台 - 線上遊戲安心交易的第一選擇，PMatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
  </Head>
  <div class="flex flex-col items-center w-full bg-[#741B15]">
    <header class="-mb-[10vw] md:-mb-[17.5vw] lg:-mb-[24.5vw] w-full aspect-[1920/1200] bg-[url('/images/activity/3/event-banner.png')] bg-cover bg-center relative">
      <div class="absolute top-[24%] left-[13.1%] w-[52.4%] pointer-events-none">
        <img class="w-full" src="/images/activity/3/event-banner-text1.svg" alt="10月超值豪禮三重奏" />
      </div>  
      <div class="absolute md:top-[42.25%] md:left-[18.4%] md:w-[41.4%] top-[42.25%] left-[6%] w-[55%] pointer-events-none">
        <img class="w-full" src="/images/activity/3/event-banner-text2.svg" alt="註冊會員、媒合委買交易享優惠" />
      </div>
    </header>
    <main ref="topAnchor" class="mb-[80px] w-[80%] max-w-[1320px] bg-[#D9D9D9]/80 rounded-[10px] p-5 relative z-2 border-[5px] border-solid [border-image:linear-gradient(to_bottom,#7E0000,#E40000,#7E0000)_1]">
      <!-- 活動分頁 -->
      <nav class="flex justify-between gap-[2.25%] px-[1.25%] my-[18px] md:my-[28px]">
        <div v-for="tab in tabs" :key="tab.id" class="w-[30%] md:w-[33%] relative group">
          <TabDecorator :class="{ 'opacity-100': innerPage === tab.id }" class="md:w-full w-[110%] absolute bottom-full left-1/2 -translate-x-1/2 translate-y-0 md:-translate-y-1 opacity-0 group-hover:opacity-100 group-hover:fill-[#C1514A]" />
          <button @click="changeTabAndScroll(tab.id)" class="desktop w-full h-[128px] relative inline-flex items-center justify-center bg-[#741B15] text-[#FFF4B5] text-center border-[8px] border-solid border-[#741B15] cursor-pointer  group-hover:bg-[#C1514A] group-hover:border-[#C1514A]">
            <BorderFrame class="absolute top-0 left-0 w-full h-full z-0" />
            <span class="font-Inter relative z-10">
              <span class="block text-[36px] font-bold leading-[40px]">{{ tab.title }}</span>
              <span class="block text-[24px] font-light">{{ tab.subtitle }}</span>
            </span>
          </button>
          <NuxtLink @click="changeTabAndScroll(tab.id)" class="group md:hidden cursor-pointer">
            <img :src="tab.mobile" alt="分頁按鈕" class="w-full h-auto group-hover:hidden">
            <img :src="tab.mobileHover" alt="分頁按鈕" class="w-full h-auto hidden group-hover:block">
          </NuxtLink>
          <TabDecorator :class="{ 'opacity-100': innerPage === tab.id }" class="md:w-full w-[110%] absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 md:translate-y-1 opacity-0 group-hover:opacity-100 group-hover:fill-[#C1514A] transform rotate-180" />
        </div>
      </nav>
      <!-- 活動內容 -->
      <div class="text-white text-center">
        <div class="md:my-[60px] my-[30px]">
          <TitleBlock class="font-Noto" title="活動對象" />
          <p class="font-Inter text-[#741B15] font-semibold text-[24px] md:text-[32px] lg:text-[40px] my-[10px]">PMatch 新會員專屬優惠</p>
        </div>
        <div class="md:my-[60px] my-[30px]">
          <TitleBlock class="font-Noto" title="活動日期" />
          <p class="font-Inter text-[#741B15] font-semibold text-[24px] md:text-[32px] lg:text-[40px] my-[10px]">2025<br class="md:hidden"><span class="desktop">/</span><span class="text-[23px] md:text-[32px] lg:text-[40px]">10/20 12:00 ~ 11/02 23:59</span></p>
        </div>
        <div v-show="innerPage === 1">
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[20px] md:text-[28px] lg:text-[32px] text-start mx-[5%] md:mx-[10%] my-[12px] md:my-[20px] ">
              <p class="my-[8px]">1. 活動期間註冊PMatch新會員，可取得指定遊戲平台遊戲幣 (價值$400)</p>
              <p class="my-[8px]">2. 玩家完成註冊後，需於活動結束前至活動頁面選擇領取的遊戲平台，活動結束前未完成兌換的玩家，視同放棄領獎資格</p>
              <p class="my-[8px]">3. 註冊活動獎項由指定媒合商提供，玩家僅能選擇活動頁面中指定平台的遊戲幣</p>
              <p class="my-[8px]">4. 獎項預計前發送至領獎中心，獎項領取期限為30天，請玩家於領獎期限內完成領獎，獎項逾期後無法領取且不再補發</p>
            </div>
          </div>
          <div class="md:my-[80px] my-[40px] max-w-[979px] mx-auto">
            <div :class="registerBackground" class="aspect-[979/613] bg-cover bg-no-repeat bg-center relative [container-type:inline-size] [container-name:register-card]">
              <!-- 是否登入 -->
              <div v-if="!isLoggedIn">
                <NuxtLink class="absolute top-[27.25%] right-[30.75%] leading-0 text-[6.5cqi] cursor-pointer no-underline flex-inline justify-center items-center border-[0.1cqi] border-solid border-[#FFF4B5] rounded-[0.8cqi] aspect-[181/106] w-[18%] bg-gradient-to-b from-[#E24444] to-[#751313] [box-shadow:0px_0.8cqi_0.8cqi_#480909] hover:from-[#D91124] hover:to-[#D91124] active:from-[#741B15] active:to-[#741B15]" href="/member/login" target="_blank">
                  <SignUp class="font-Noto -translate-y-[0.25cqi]" content="登入" />
                </NuxtLink>
                <NuxtLink class="absolute top-[27.25%] right-[9.25%]  leading-0 text-[6.5cqi] cursor-pointer no-underline flex-inline justify-center items-center border-[0.1cqi] border-solid border-[#FFF4B5] rounded-[0.8cqi] aspect-[181/106] w-[18%] bg-gradient-to-b from-[#E24444] to-[#751313] [box-shadow:0px_0.8cqi_0.8cqi_#480909] hover:from-[#D91124] hover:to-[#D91124] active:from-[#741B15] active:to-[#741B15]" href="/register" target="_blank">
                  <SignUp class="font-Noto -translate-y-[0.25cqi]" content="註冊" />
                </NuxtLink>
              </div>
              <div v-else-if="isEventEnded">
                <SignUp class="font-Noto absolute top-[30%] right-[16.15%] leading-[6.5cqi] text-[6.5cqi]" content="活動結束" />
              </div>
              <div v-else>
                <SignUp class="font-Noto absolute top-[25.55%] right-[22.55%] leading-[6.5cqi] text-[6.5cqi]" content="註冊時間" />
                <Timing class="absolute top-[39.33%] right-[9.5%] leading-[4.75cqi] text-[4.75cqi]" :content="displayRegistrationDate"/>
              </div>
              <!-- 領獎資格 -->
               <div v-if="!isLoggedIn" class="absolute bottom-[31.5%] right-[3.85%] w-[16.46%]">
                <div class="font-Inter aspect-[173/68] w-full rounded-full text-[#FFF4B5] text-[3.75cqi] leading-[3.75cqi] flex items-center justify-center bg-[linear-gradient(to_bottom,#951111AB,#841111AB)]">
                  <span>未登入</span> 
                </div> 
              </div>
              <div v-else-if="isEventEnded" class="absolute bottom-[31.5%] right-[3.85%] w-[19.5%]">
                <div class="font-Inter aspect-[205/68] w-full rounded-full text-[#FFF4B5] text-[3.75cqi] leading-[3.75cqi] flex items-center justify-center bg-[linear-gradient(to_bottom,#951111AB,#841111AB)]">
                  <span>活動結束</span> 
                </div> 
              </div>
              <div v-else-if="!isEligible" class="absolute bottom-[31.5%] right-[3.85%] w-[35.155%]">
                <div class="font-Inter aspect-[341/68] w-full rounded-full text-[#FFF4B5] text-[3.75cqi] leading-[3.75cqi] flex items-center justify-center bg-[linear-gradient(to_bottom,#951111AB,#841111AB)]">
                  <svg width="3.33cqi" height="3.33cqi" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.7324 0.732422C33.7087 -0.243889 35.2913 -0.243889 36.2676 0.732422C37.2437 1.70875 37.2438 3.29133 36.2676 4.26758L22.0352 18.5L36.2676 32.7324C37.2435 33.7088 37.2438 35.2914 36.2676 36.2676C35.2914 37.2438 33.7088 37.2435 32.7324 36.2676L18.5 22.0352L4.26758 36.2676C3.29132 37.2436 1.70868 37.2436 0.732422 36.2676C-0.243826 35.2913 -0.243699 33.7087 0.732422 32.7324L14.9648 18.5L0.732422 4.26758C-0.243889 3.29127 -0.243889 1.70873 0.732422 0.732422C1.70873 -0.243889 3.29127 -0.243889 4.26758 0.732422L18.5 14.9648L32.7324 0.732422Z" fill="#FFF4B5"/>
                  </svg>
                  <span class="ms-[1.03cqi]">不符合領獎資格</span> 
                </div> 
              </div>
              <div v-else class="absolute bottom-[31.5%] right-[3.85%]" :class="!claimedReward ? 'w-[33.3%]' : 'w-[36.6%]'">
                <div class="font-Inter w-full rounded-full text-[#FFF4B5] text-[3.75cqi] leading-[3.75cqi] flex items-center justify-center bg-[linear-gradient(to_bottom,#951111AB,#841111AB)]" :class="isEligible && !claimedReward ? 'aspect-[323/68]' : 'aspect-[355/68]'">
                  <template v-if="!claimedReward">
                    <svg width="4.44cqi" height="4.44cqi" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M42.6667 23C42.6667 12.1384 33.8616 3.33333 23 3.33333C12.1384 3.33333 3.33333 12.1384 3.33333 23C3.33333 33.8616 12.1384 42.6667 23 42.6667V46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23C46 35.7025 35.7025 46 23 46V42.6667C33.8616 42.6667 42.6667 33.8616 42.6667 23Z" fill="#FFF4B5"/>
                      <path d="M34.7251 13.2596C35.318 12.5555 36.3693 12.4655 37.0734 13.0584C37.7774 13.6513 37.8675 14.7026 37.2746 15.4067L21.2746 34.4067C20.9772 34.7598 20.5468 34.974 20.0858 34.9978C19.6248 35.0216 19.1744 34.8529 18.8423 34.5323L9.1756 25.199C8.51346 24.5597 8.49474 23.5044 9.13393 22.8422C9.77324 22.1801 10.8285 22.1614 11.4907 22.8006L19.8742 30.895L34.7251 13.2596Z" fill="#FFF4B5"/>
                    </svg>
                    <span class="ms-[1.12cqi]">符合領獎資格</span> 
                  </template>  
                  <template v-else>
                    <span class="ms-[1.03cqi]">感謝參與本次活動！</span> 
                  </template>
                </div> 
              </div>
              <!-- 下拉式選單 -->
              <div v-if="isLoggedIn && !isEventEnded && isEligible && !claimedReward" class="absolute w-[55.8%] bottom-[6.25%] left-[4.5%] ">
                <button @click="toggleDropdown" :class="isDropdownOpen ? 'rounded-t-[4cqi] border-b-0' : 'rounded-full'"  class="w-full aspect-[544/79] bg-[#741B15] text-[#FFD900] text-[3.8cqi] leading-[4cqi] flex items-center justify-between ps-[2.9cqi] pe-[2.1cqi]  border-[0.8cqi] border-solid border-[#F0C63E] cursor-pointer  [box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5),inset_0px_2cqi_2cqi_rgba(0,0,0,0.2)]">
                  <span>{{ dropdownOption }}</span>
                  <span class="transform transition-transform" :class="{ 'rotate-180': isDropdownOpen }">
                    <svg width="4cqi" height="2.5cqi" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.268 24C14.0378 25.3333 15.9622 25.3333 16.732 24L28.8564 3C29.6262 1.66666 28.664 0 27.1244 0H2.87564C1.33604 0 0.373793 1.66667 1.14359 3L13.268 24Z" fill="#F0C63E"/>
                    </svg>
                  </span>
                </button>
                <ul v-if="isDropdownOpen" class="w-full absolute top-full left-0 px-0 mx-0 -mt-[0.4cqi] bg-[#741B15] border-[0.8cqi] border-solid border-[#F0C63E] rounded-b-[4cqi] z-10 overflow-hidden box-border border-t-0 [box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5)]">
                  <li 
                    v-for="platform in platforms" 
                    :key="platform"
                    @click="selectPlatform(platform)"
                    class="py-[2.25cqi] ps-[2.9cqi] mx-0 list-none cursor-pointer text-[#FFD900]  text-start text-[3.8cqi] leading-[3.8cqi] hover:bg-[#A8281F]"
                  >
                    {{ platform }}
                  </li>
                </ul>
              </div>
              <div v-if="isLoggedIn && !isEventEnded && isEligible && claimedReward" class="absolute w-[55.8%] bottom-[6.25%] left-[4.5%]">
                <button disabled class="w-full aspect-[544/79] bg-[#741B15] text-[#FFD900] text-[3.8cqi] leading-[4cqi] flex items-center justify-between ps-[2.9cqi] pe-[2.1cqi] border-[0.8cqi] border-solid border-[#F0C63E]  [box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5),inset_0px_2cqi_2cqi_rgba(0,0,0,0.2)] rounded-full">
                  <span>{{ claimedPlatform }}</span>
                  <span>
                    <svg width="4cqi" height="2.5cqi" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.268 24C14.0378 25.3333 15.9622 25.3333 16.732 24L28.8564 3C29.6262 1.66666 28.664 0 27.1244 0H2.87564C1.33604 0 0.373793 1.66667 1.14359 3L13.268 24Z" fill="#F0C63E"/>
                    </svg>
                  </span>
                </button>
              </div>
              <!-- 領獎按鈕 -->
              <div v-if="isLoggedIn && !isEventEnded && isEligible && !claimedReward" class="absolute w-[31.5%] bottom-[6.25%] right-[5.4%]">
                <button @click="claimReward" :disabled="!selectedPlatform" class="w-full aspect-[309/79] rounded-full text-[#FFD900] text-[4cqi] leading-[4cqi] border-[0.8cqi] border-solid border-[#F0C63E] cursor-pointer [box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5),inset_0px_2cqi_2cqi_rgba(238,171,147,0.6)] bg-[#741B15] hover:bg-[#BC4A43] active:bg-[#741B15] active:[box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5)] disabled:pointer-events-none disabled:[box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5)]">
                  領取註冊禮
                </button>
              </div>
              <div v-if="isLoggedIn && !isEventEnded && isEligible && claimedReward" class="absolute w-[31.5%] bottom-[6.25%] right-[5.4%]">
                <button disabled class="w-full aspect-[309/79] rounded-full text-[#FFD900] text-[4cqi] leading-[4cqi] border-[0.8cqi] border-solid border-[#F0C63E] cursor-pointer [box-shadow:0px_0.8cqi_0.5cqi_rgba(0,0,0,0.5),inset_0px_2cqi_2cqi_rgba(0,0,0,0.2)] bg-[#741B15] disabled:pointer-events-none">
                  您已領取
                </button>
              </div>
            </div>
          </div>

          <div class="md:my-[60px] my-[30px]">       
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="md:my-[60px] my-[30px] over object-cover">
              <img class="max-w-full max-w-full" src="/images/activity/3/tab1-step1.png" alt="官網領獎中心">
            </div>          
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full max-w-full" src="/images/activity/3/tab1-step2.png" alt="點選對應獎項">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full max-w-full" src="/images/activity/3/tab1-step3.png" alt="領取獎項">
            </div>
          </div>
        </div>
        <div v-show="innerPage === 2">
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[20px] md:text-[28px] lg:text-[32px] text-start mx-[5%] md:mx-[10%] my-[12px] md:my-[20px] ">
              <p class="my-[8px]">1. 活動期間指定商店委買不限金額98折，指定商店最高享8折優惠</p>
              <p class="my-[8px]">2. 委買優惠活動僅限列表中指定之遊戲平台及媒合商</p>    
            </div>            
          </div>
          <div class="md:my-[60px] my-[30px]" ref="merchantsTable">
            <p class="font-Inter text-[#741B15] font-semibold text-[24px] md:text-[32px] xl:text-[40px] my-[15px] md:my-[30px]">指定平台及媒合商</p>
              <div class="xl:w-[85%] w-[96%] max-w-[1200px] mx-auto grid grid-cols-[35fr_40fr_27fr] md:grid-cols-[28fr_46fr_35fr] border-[6px] md:border-[10px] border-solid border-[#741B15] overflow-hidden mb-60px md:mb-[120px]">    
                <div class="font-Noto bg-[#D8967E] text-[20px] md:text-[32px] xl:text-[40px] leading-[44px] h[48px] md:leading-[64px] md:h[69px]">遊戲平台</div>
                <div class="font-Noto bg-[#C97D38] text-[20px] md:text-[32px] xl:text-[40px] leading-[44px] h[48px] md:leading-[64px] md:h[69px]">活動內容</div>
                <div class="font-Noto bg-[#D8967E] text-[20px] md:text-[32px] xl:text-[40px] leading-[44px] h[48px] md:leading-[64px] md:h[69px]"><span class="md:hidden">媒合商</span><span class="hidden md:inline">指定媒合商</span></div>
                <template v-for="(row, index) in tableData" :key="row.platform.name">                  
                  <div class="flex items-center justify-center min-h[80px] md:min-h[164px]" :class="index % 2 === 0 ? 'bg-[#EEAB93]' : 'bg-[#F7CFC1]'">
                    <NuxtLink :to="row.platform.url" target="_blank" class="cursor-pointer ">
                      <img :src="row.platform.logo" :alt="row.platform.name" class="max-w-full object-contain">
                    </NuxtLink>
                  </div>
                  <div v-if="row.content" 
                    class="font-Inter flex items-center justify-center text-start text-[16px] md:text-[24px] lg:text-[px] xl:text-[36px] px-[3%] py-[20px] min-h[80px] md:min-h[164px]"
                    :class="index % 2 === 0 ? 'bg-[#FFD4AD] text-[#820600]' : 'bg-[#FFE9D4] text-[#A21010]'"
                    :style="{ gridRow: `span ${row.content.span || 1}` }"
                  >
                    {{ row.content.text }}
                  </div>
                  <div class="flex flex-col md:flex-row items-center justify-around pt-3px md:pt-0  min-h[80px] md:min-h[164px]" :class="index % 2 === 0 ? 'bg-[#EEAB93]' : 'bg-[#F7CFC1]'">
                    <div v-for="merchant in row.merchants" :key="merchant.name">
                      <NuxtLink :to="merchant.url" target="_blank" class="cursor-pointer">
                        <img :src="merchant.logo" :alt="merchant.name" class="object-contain max-w-[85%] md:max-w-full">
                      </NuxtLink>
                    </div>
                  </div>
                </template>
              </div>
          </div>
          <div class="md:my-[60px] my-[30px]">       
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="md:my-[60px] my-[30px]">
              <p class="font-Inter text-[#741B15] font-semibold text-[22px] md:text-[30px] lg:text-[36px] my-[15px] md:my-[30px]">如何透過PMatch下單</p>
              <div class="flex items-center justify-center gap-[10px] mb-[0px] xl:mb-[120px] overflow-hidden">
                <img class="max-w-full xl:hidden" src="/images/activity/3/tab2-step1.png" alt="如何透過PMatch下單-步驟2">
                <img class="max-w-full hidden xl:inline" src="/images/activity/3/tab2-step1and2.png" alt="如何透過PMatch下單">
              </div>
            </div>
              <Arrow class="max-h-[89px] h-auto xl:hidden"/>
            <div class="md:my-[60px] my-[30px] xl:hidden">          
              <img class="max-w-full" src="/images/activity/3/tab2-step2.png" alt="如何透過PMatch下單-步驟2">
            </div>
              <Arrow class="max-h-[89px] h-auto xl:hidden"/>
            <div class="md:my-[60px] my-[30px]">
              <p class="font-Inter text-[#741B15] font-semibold text-[22px] md:text-[30px] lg:text-[36px] my-[15px] md:my-[30px]">如何快速聯絡媒合商 </p>
              <img class="max-w-full" src="/images/activity/3/tab2-step3.png" alt="如何快速聯絡媒合商">
            </div>
          </div>
        </div>
        <div v-show="innerPage === 3">
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto w-[152px] md:w-[232px]" title="活動媒合商" />
            <JumpButton class="font-Inter my-[12px] md:my-[20px] desktop" content="查看本次活動指定媒合商列表" @click="goToMerchants"  />
            <JumpButton class="font-Inter my-[12px] md:my-[20px] md:hidden" content="查看本活動指定媒合商列表" @click="goToMerchants"  />            
          </div>
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[20px] md:text-[28px] lg:text-[32px] text-start mx-[5%] md:mx-[10%] my-[12px] md:my-[20px] ">
              <p class="my-[8px]">1. 同一筆交易僅限留言一次，重複留言或是使用不同FB帳號留言同一筆交易，則僅有第一篇留言者方可獲得抽獎資格</p>
              <p class="my-[8px]">2. 活動期間內透過PMatch官網媒合交易下單且完成交易</p>
              <p class="my-[8px]">3. 完成交易後，至粉絲團活動PO下方回覆以下指定內容，即獲得抽獎資格</p>
              <p class="my-[8px]">「媒合交易好方便，快上PMatch最優惠」並附上委託媒合紀錄完成交易截圖</p>              
              <div class="flex flex-col items-center justify-center">
                <img class="max-w-full" src="/images/activity/3/tab3-post1.png" alt="粉絲團活動貼文">
                <NuxtLink to="https://www.facebook.com/share/p/1BKpCqnH5W/" target="_blank" class="cursor-pointer">
                  <JumpButton class="font-Inter my-[12px] md:my-[20px] " content="前往貼文"  />
                </NuxtLink>
              </div>  
            </div>
          </div>
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="活動獎勵" />
            <div class="font-Inter text-[#741B15] text-[20px] md:text-[28px] lg:text-[32px] text-start mx-[5%] md:mx-[10%] my-[12px] md:my-[20px] ">
              <div class="flex flex-col items-center justify-center">
                <img class="max-w-full -m-[20px] select-none" src="/images/activity/3/tab3-award.png" alt="Apple iPad Wi-Fi機型128G (市價$11,900)">
                <p class="text-[#A21010] text-[14px] md:text-[20px] md:leading-0 text-center">Apple iPad Wi-Fi機型128G (市價$11,900)<span class="desktop">，</span><br class="md:hidden">共兩台</p>
              </div>
            </div>
          </div>
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="font-Inter text-[#741B15] text-[20px] md:text-[28px] lg:text-[32px] text-start mx-[5%] md:mx-[10%] my-[40px]">
              <p class="my-[8px]">1. 活動結束後，隨機抽取兩位符合抽獎資格玩家</p>
              <p class="my-[8px]">2. 小編透過臉書聯繫獲獎玩家，確認PMatch會員資訊後，送至PMatch官網領獎中心</p>
            </div>
          </div>
          <div class="md:my-[60px] my-[30px]">
            <TitleBlock class="font-Noto" title="貼文截圖" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-post2.png" alt="前往會員中心">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-post3.png" alt="前往委託媒合紀錄">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-post4.png" alt="截圖委託媒合紀錄">
            </div>
            <TitleBlock class="font-Noto" title="獎項領取" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-step1.png" alt="官網領獎中心">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-step2.png" alt="點選對應獎項">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-step3.png" alt="領取獎項">
            </div>
            <Arrow class="max-h-[89px] h-auto" />
            <div class="md:my-[60px] my-[30px]">
              <img class="max-w-full" src="/images/activity/3/tab3-step4.png" alt="實體贈品領取流程">
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="w-100% bg-[#8C592A] pt-0.8vw pb-1.8vw items-center justify-center flex ">
      <div class="text-white text-[2vw] md:text-[1.7vw] lg:text-[1.3vw] xl:text-[0.9vw] font-bold">
        <p class="text-[3vw] md:text-[2.3vw] lg:text-[1.8vw] xl:text-[1.4vw]">
          <span class="relative top-[0.08em] text-[4vw] md:text-[2.75vw] xl:text-[2vw] leading-[1.8vw] select-none">◆</span>
          注意事項
          <span class="relative top-[0.08em] text-[4vw] md:text-[2.75vw] xl:text-[2vw] leading-[1.8vw] select-none">◆</span>
        </p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>本次活動範圍僅包含活動頁面包含之媒合商及遊戲平台，詳細內容請參照上方活動各分頁說明。</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台保留更換等值贈品以及變更活動內容或終止活動的權利，以及最終活動解釋權。</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>註冊會員獲得的獎項，活動結束後系統直接發送，玩家至官網領獎中心領取</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>臉書粉絲團PO文抽獎獲獎玩家，活動結束後由小編主動透過臉書聯繫，確認相關資訊後透過官網</p>
        <p class="leading-[0] -translate-y-[0.5vw]"><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] select-none opacity-0">◆ </span>平台最低數量以上方符合領獎資格，低於設定領獎門檻視同放棄領獎資格。</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>本次活動獎項設有30天領取時間限制，獎項發送後請盡快至領獎中心領取，逾期視同放棄領獎資格</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台僅提供媒合交易服務，交易相關問題請洽詢交易之媒合商了解詳情。</p>
      </div>
    </footer>
  </div>  
</template>
<script setup>
  // DI & Global
  const { $axios } = useNuxtApp();
  const token = useCookie('_PmToken');
  const memberId = useCookie('_PmMemberId');
  const router = useRouter();
  const route = useRoute();
  const modal = useModalStore();
  const alertModal = useAlertModalStore();

  // 靜態資料
  const tabs = ref([
    { id: 1, title: '第一重', subtitle: '註冊會員送$400', mobile: '/images/activity/3/button1.svg', mobileHover: '/images/activity/3/button1-hover.svg' },
    { id: 2, title: '第二重', subtitle: '委買交易享優惠', mobile: '/images/activity/3/button2.svg', mobileHover: '/images/activity/3/button2-hover.svg' },
    { id: 3, title: '第三重', subtitle: '臉書PO文留言互動抽iPad', mobile: '/images/activity/3/button3.svg', mobileHover: '/images/activity/3/button3-hover.svg' }
  ]);
  const platforms = ref([
      '金好運娛樂城 - 金好盈金流',
      '金好運娛樂城 - 米其林金流',
      '辣財神娛樂城 - 金好盈金流',
      '包你發娛樂城 - 金好贏金流',
      '包你發娛樂城 - 好旺角銀行',
      '包你發娛樂城 - 寶雅銀行',
      '金好爺娛樂城 - 金好運小舖',
      '滿貫大亨 - 寶可夢銀行',
      '錢街Online - 錢庫',
      '寶島娛樂城 - 武財神'
  ]);
  const tableData = ref([
    {
      platform: { name: '聚寶Online', logo: '/images/activity/3/tab2-platform1.png', url:'https://www.pmatch.com.tw/findmatch/?platformName=%E8%81%9A%E5%AF%B6Online' },
      content: { text: '單筆委買交易每滿$1000，額外加贈價值$250遊戲幣滿$2000，額外加贈價值$500遊戲幣，以此類推，買越多贈越多' },
      merchants: [
        { name: '福娃金庫', logo: '/images/activity/3/tab2-merchants1.png', url:'https://www.pmatch.com.tw/findmatch/211?pn=%E8%81%9A%E5%AF%B6Online' }
      ]
    },
    {
      platform: { name: '金好運娛樂城', logo: '/images/activity/3/tab2-platform2.png', url:'https://www.pmatch.com.tw/findmatch?platformName=%E9%87%91%E5%A5%BD%E9%81%8B%E5%A8%9B%E6%A8%82%E5%9F%8E' },      
      content: { text: '單筆委買交易不限金額均享有98折優惠', span: 6 }, // span 代表占用欄數 
      merchants: [
        { name: '金好盈金流', logo: '/images/activity/3/tab2-merchants2.png', url:'https://www.pmatch.com.tw/findmatch/202?pn=%E9%87%91%E5%A5%BD%E9%81%8B%E5%A8%9B%E6%A8%82%E5%9F%8E' },
        { name: '米其林金流', logo: '/images/activity/3/tab2-merchants3.png', url:'https://www.pmatch.com.tw/findmatch/204?pn=%E9%87%91%E5%A5%BD%E9%81%8B%E5%A8%9B%E6%A8%82%E5%9F%8E' }
      ]
    },
    {
      platform: { name: '包你發娛樂城', logo: '/images/activity/3/tab2-platform3.png', url:'https://www.pmatch.com.tw/findmatch?platformName=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E' },
      merchants: [
        { name: '金好贏金流', logo: '/images/activity/3/tab2-merchants4.png', url:'https://www.pmatch.com.tw/findmatch/210?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E' },
        { name: '好旺角銀行', logo: '/images/activity/3/tab2-merchants5.png', url:'https://www.pmatch.com.tw/findmatch/205?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E' },
        { name: '寶雅銀行', logo: '/images/activity/3/tab2-merchants6.png', url:'https://www.pmatch.com.tw/findmatch/366?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E' }
      ]
    },
    {
      platform: { name: '辣財神娛樂城', logo: '/images/activity/3/tab2-platform4.png', url:'https://www.pmatch.com.tw/findmatch?platformName=%E8%BE%A3%E8%B2%A1%E7%A5%9E%E5%A8%9B%E6%A8%82%E5%9F%8E' },
      merchants: [
        { name: '金好盈金流', logo: '/images/activity/3/tab2-merchants2.png', url:'https://www.pmatch.com.tw/findmatch/202?pn=%E8%BE%A3%E8%B2%A1%E7%A5%9E%E5%A8%9B%E6%A8%82%E5%9F%8E' }
      ]
    },
    {
      platform: { name: '滿貫大亨', logo: '/images/activity/3/tab2-platform5.png', url:'https://www.pmatch.com.tw/findmatch?platformName=%E6%BB%BF%E8%B2%AB%E5%A4%A7%E4%BA%A8' },
      merchants: [
        { name: '寶可夢銀行', logo: '/images/activity/3/tab2-merchants7.png', url:'https://www.pmatch.com.tw/findmatch/201?pn=%E6%BB%BF%E8%B2%AB%E5%A4%A7%E4%BA%A8' }
      ]
    },
    {
      platform: { name: '錢街Online', logo: '/images/activity/3/tab2-platform6.png', url:'https://www.pmatch.com.tw/findmatch/?platformName=%E9%8C%A2%E8%A1%97Online' },
      merchants: [
        { name: '錢庫', logo: '/images/activity/3/tab2-merchants8.png', url:'https://www.pmatch.com.tw/findmatch/200?pn=%E9%8C%A2%E8%A1%97Online' }
      ]
    },
    {
      platform: { name: '金好爺', logo: '/images/activity/3/tab2-platform7.png', url:'https://www.pmatch.com.tw/findmatch?platformName=%E9%87%91%E5%A5%BD%E7%88%BA%E5%A8%9B%E6%A8%82%E5%9F%8E' },
      merchants: [
        { name: '金好運小舖', logo: '/images/activity/3/tab2-merchants9.png', url:'https://www.pmatch.com.tw/findmatch/352?pn=%E9%87%91%E5%A5%BD%E7%88%BA%E5%A8%9B%E6%A8%82%E5%9F%8E' }
      ]
    },
  ]);

  // 活動日期
  const eventStartTime = ref(null);
  const eventEndTime = ref(null);

  // State
  const innerPage = ref(1);
  const activityId = ref(null);
  const registrationDate = ref(null);
  const isLoggedIn = ref(false);      // 登入狀態
  const claimedReward = ref(false);   // 已經領取獎勵
  const claimedPlatform = ref(null);  // 已領取的平台名稱
  const isDropdownOpen = ref(false);
  const selectedPlatform = ref(null);

  // 視窗滾動
  const topAnchor = ref(null);
  const merchantsTable = ref(null);

  // 計算活動時間
  const isEventEnded = computed(() => {
    if (!eventStartTime.value || !eventEndTime.value) {
      return true; 
    }
    const now = new Date();
    return now < eventStartTime.value || now > eventEndTime.value;
  });
  
  // 計算註冊日期(領取資格)
  const isEligible = computed(() => {
    if (!registrationDate.value || !eventStartTime.value || !eventEndTime.value) {
      return false;
    }
    const regDate = new Date(registrationDate.value);
    return regDate >= eventStartTime.value && regDate <= eventEndTime.value;
  });

  const displayRegistrationDate = computed(() => {
    if (registrationDate.value) {
      // 這裡才.split('T')[0]"
      return registrationDate.value.split('T')[0];
    }
    return '20XX-XX-XX';
  });

  const dropdownOption = computed(() => {
    return selectedPlatform.value || '遊戲平台選擇';
  });

  // 註冊禮背景圖
  const registerBackground = computed(() => {
    if (!isLoggedIn.value) {
      return "bg-[url('/images/activity/3/tab1-register1.png')]";
    }
    if (isEventEnded.value) {
      return "bg-[url('/images/activity/3/tab1-register2.png')]";
    }
    return !isEligible.value
      ? "bg-[url('/images/activity/3/tab1-register2.png')]"
      : "bg-[url('/images/activity/3/tab1-register3.png')]";
  });

  // API & Logic
  function checkLoginStatus() {
    if (token.value) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  }

  // 取得使用者資料 (CreateTime)
  async function fetchMemberDetail() {
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
              const userData = response.data.Data[0];              
              // 儲存 "CreateTime"
              if (userData && userData.CreateTime) {
                  registrationDate.value = userData.CreateTime;
              } else {
                console.warn('GetMemberDetail API 未取得 CreateTime');
              }
          } else {
            console.error('GetMemberDetail API 回應錯誤:', response.data.Status.Message);
          }
      } catch (error) {
        console.error('呼叫 GetMemberDetail API 時發生錯誤:', error);
      }
  }

  // 取得活動資訊 (ActivityId)
  async function fetchActivityInfo() {
    try {
      const response = await $axios.post(
        '/api/v1/Pmatch/GetActivityInfo',
        {
            Data:"10月超值豪禮三重奏"
        },
        {
          headers: {
            Authorization: token.value
          }
        }
      );
      if (response.data.Status.Code === 0 && response.data.Data) {
        const activityData = response.data.Data;
        
        // 儲存活動 ID 
        activityId.value = response.data.Data.Id; 

        // 儲存活動時間
        if (activityData.StartTime && activityData.EndTime) {
          eventStartTime.value = new Date(activityData.StartTime);
          eventEndTime.value = new Date(activityData.EndTime);
        }
      } else {
        console.error('GetActivityInfo API 回應錯誤:', response.data.Status.Message);
      }
    } catch (error) {
      console.error('呼叫 GetActivityInfo API 時發生錯誤:', error);
    }
  }

  // 檢查是否已領取過獎勵
  async function fetchActivityData() {
    try {
      const response = await $axios.post(
        '/api/v1/Pmatch/GetActivityData',
        {
          ActivityId: activityId.value
        },
        {
          headers: {
            Authorization: token.value
          }
        }
      );
    const status = response.data.Status;
      const data = response.data.Data;

      if (status.Code === 0 && data && data.Data) {
        // API 回傳成功，代表「已領取」
        claimedReward.value = true;
        claimedPlatform.value = data.Data; 
      } else if (status.Code === 1 && status.Message === "查無資料") {
        // 「查無資料」，代表「尚未領取」
        claimedReward.value = false;
      } else {
        // 非預期錯誤
        console.error('GetActivityData API 回應錯誤:', status.Message);
      }
    } catch (error) {
      // 捕獲網路錯誤或後端直接拋出 Exception (例如查無資料時)
      // 您的後端在查無資料時是 throw Exception，所以會進到這裡
      if (error.response && error.response.data.Status.Message === "查無資料") {
          claimedReward.value = false;
      } else {
          console.error('呼叫 GetActivityData API 時發生錯誤:', error);
      }
    }
  }

  // 領取註冊禮
  async function claimReward() {
    if (!selectedPlatform.value) {
      return;
    }
    // 確認對話框
    const isConfirmed = await modal.showModal(
      '確定選擇',
      `「${selectedPlatform.value}」<br><small style="color: #FFD900; padding-left:30px;">選擇後將無法更改</small>`
    );
    // 點擊 "取消"
    if (!isConfirmed) {
      return;
    }
    try {
      const response = await $axios.post(
        '/api/v1/Pmatch/CreateOrUpdateActivityData',
        {
          Id: 0, // 新增
          ActivityId: activityId.value,
          Data: selectedPlatform.value
        },
        {
          headers: {
            'Authorization': token.value
          }
        }
      );
      if (response.data.Status.Code === 0) {
        // 領取成功後更新前端狀態
        await alertModal.alertShowModal('領取成功！', '註冊禮會在活動結束後<br>統一發送到領獎中心');
        claimedReward.value = true; // 更新為「已領取」
        claimedPlatform.value = selectedPlatform.value;
      } else {
        await alertModal.alertShowModal('領取失敗', response.data.Status.Message);
        console.error('CreateOrUpdateActivityData API 回應錯誤:', response.data.Status.Message);
      }
    } catch (error) {
      await alertModal.alertShowModal('操作失敗', '領取時發生預期外的錯誤，請稍後再試。');
      console.error('呼叫 CreateOrUpdateActivityData API 時發生錯誤:', error);
    }
  }

  // UI Functions
  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
  
  function selectPlatform(platform) {
    selectedPlatform.value = platform;
    isDropdownOpen.value = false; // 選擇後自動關閉選單
  }

  const changeTabAndScroll = (tabId) => {
    // 1. 切換頁面
    innerPage.value = tabId;
    // 2. 執行滾動
    if (topAnchor.value) {
      topAnchor.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const goToMerchants = () => {
    innerPage.value = 2;
    nextTick(() => {
      if (merchantsTable.value) {
        merchantsTable.value.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  };

  // UI components
  const BorderFrame = (_, { attrs }) => 
  h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 390 116", preserveAspectRatio: "none", fill: "#FFF4B5", ...attrs }, 
    [
      h('path', { 
        d: "M0.92572 0.92572V23.4609H9.1782V31.2466H0.92572V84.8804H9.1782V92.666H0.92572V115.2H23.4689V107.159H31.2573V115.2H359.589V107.159H367.382V115.2H389.92V92.666H381.672V84.8804H389.92V31.2466H381.672V23.4609H389.92V0.92572H367.382V8.96828H359.589V0.92572H31.2573V8.96828H23.4689V0.92572H0.92572ZM5.53025 5.52862H18.8643V8.96828H9.1782V18.858H5.53025V5.52862ZM35.8619 5.52862H354.984V8.96828H35.8619V5.52862ZM371.986 5.52862H385.314V18.858H381.672V8.96828H371.986V5.52862ZM13.7827 13.5712H18.8643V18.858H13.7827V13.5712ZM23.4689 13.5712H31.2573V18.858H23.4689V13.5712ZM35.8619 13.5712H354.984V23.4609H367.382V35.8494H377.068V80.2763H367.382V92.666H354.984V102.556H35.8619V92.666H23.4689V80.2763H13.7827V35.8494H23.4689V23.4609H35.8619V13.5712ZM359.589 13.5712H367.382V18.858H359.589V13.5712ZM371.986 13.5712H377.068V18.858H371.986V13.5712ZM13.7827 23.4609H18.8643V31.2466H13.7827V23.4609ZM371.986 23.4609H377.068V31.2466H371.986V23.4609ZM5.53025 35.8494H9.1782V80.2763H5.53025V35.8494ZM381.672 35.8494H385.314V80.2763H381.672V35.8494ZM13.7827 84.8804H18.8643V92.666H13.7827V84.8804ZM371.986 84.8804H377.068V92.666H371.986V84.8804ZM5.53025 97.2689H9.1782V107.159H18.8643V110.597H5.53025V97.2689ZM13.7827 97.2689H18.8643V102.556H13.7827V97.2689ZM23.4689 97.2689H31.2573V102.556H23.4689V97.2689ZM359.589 97.2689H367.382V102.556H359.589V97.2689ZM371.986 97.2689H377.068V102.556H371.986V97.2689ZM381.672 97.2689H385.314V110.597H371.986V107.159H381.672V97.2689ZM35.8619 107.159H354.984V110.597H35.8619V107.159Z" 
      })
    ]
  );
  const TabDecorator = (_, { attrs }) => 
  h('svg', { width: "100%", height: "29", viewBox: "0 0 240 29", fill: "#741B15", xmlns: "http://www.w3.org/2000/svg", ...attrs }, 
    [
      h('path', { 
        d: "M120 0L108.419 11.3733L112.659 15.5374L108.657 19.4663L104.418 15.3031L95.5526 24.0099H2.09104H0V28.1171H2.09104H91.3705H96.1015L100.284 24.0099L104.418 19.9494L106.292 21.7899L104.032 24.0099L99.8496 28.1171H104.58L108.657 24.1126L112.735 28.1171L113.634 29L114.533 28.1171L118.715 24.0099L120 22.7475L121.285 24.0099L125.467 28.1171L126.366 29L127.265 28.1171L131.447 24.0099L131.449 24.0083L131.451 24.0099L135.633 28.1171H140.364L136.182 24.0099L133.815 21.6855L135.582 19.9494L139.716 24.0099L143.898 28.1171H148.629H237.909H240V24.0099H237.909H144.447L135.582 15.3031L131.449 19.3619L127.448 15.433L131.581 11.3733L120 0ZM120 4.64628L126.851 11.3733L125.083 13.1094L120.106 8.22288L115.024 13.2138L113.15 11.3733L120 4.64628ZM125.083 17.7557L129.084 21.6855L126.717 24.0099L126.366 24.3537L126.016 24.0099L122.366 20.4239L125.083 17.7557ZM115.024 17.8602L117.635 20.424L113.984 24.01L113.634 24.3538L113.283 24.01L111.023 21.79L115.024 17.8602Z"
      })
    ]
  );
  const TitleBlock = (props) => 
  h('div', 
    { class: 'relative left-1/2 -translate-x-1/2 bg-[#741B15]/50 rounded-[7px] w-[124px] h-[40px] leading-[38px] text-[24px] md:rounded-[10px] md:w-[195px] md:h-[57px] md:leading-[55px] md:text-[40px]' }, 
    [
      h('span', 
        { class: `absolute left-1/2 -translate-x-1/2 w-100% text-transparent [text-shadow:1px_0px_0_#4A3F00,0px_1px_0_#4A3F00,-1px_0px_0_#4A3F00,0px_-1px_0_#4A3F00,-1px_1px_0_#4A3F00,1px_-1px_0_#4A3F00,-1px_-1px_0_#4A3F00,1px_1px_0_#4A3F00] select-none pointer-events-none` },
        props.title
      ),
      h('span', 
        { class: 'relative bg-[linear-gradient(to_bottom,#FFDA0D,#FFF4B5,#CCAE0A,#7A6800)] bg-clip-text text-transparent' }, 
        props.title
      )
    ]
  );
  const SignUp = (props) => 
  h('div', 
    { class: '' }, 
    [
      h('span', 
        { class: `absolute left-1/2 -translate-x-1/2 w-100% text-transparent [text-shadow:0cqi_0.75cqi_0.2cqi_#480909,-0.33cqi_0.75cqi_0.2cqi_#480909,0.33cqi_0.75cqi_0.2cqi_#480909] select-none pointer-events-none` },
        props.content
      ),
      h('span', 
        { class: `absolute left-1/2 -translate-x-1/2 w-100% text-transparent [text-shadow:0.33cqi_0_0_#5B4600,0cqi_0.33cqi_0_#5B4600,-0.33cqi_0cqi_0_#5B4600,0cqi_-0.33cqi_0_#5B4600,-0.33cqi_0.33cqi_0_#5B4600,0.33cqi_-0.33cqi_0_#5B4600,-0.33cqi_-0.33cqi_0_#5B4600,0.33cqi_0.33cqi_0_#5B4600] select-none pointer-events-none` },
        props.content
      ),
      h('span', 
        { class: 'relative bg-[linear-gradient(to_bottom,#FFDA99,#FFF4B5,#EFCC09,#AF9606,#978001)] bg-clip-text text-transparent' }, 
        props.content
      )
    ]
  );
  const Timing = (props) => 
  h('div', 
    { class: '' }, 
    [
      h('span', 
        { class: `absolute left-1/2 -translate-x-1/2 w-100% text-transparent [text-shadow:0cqi_0.2cqi_0.2cqi_#480909,-0.2cqi_0.4cqi_0.2cqi_#480909,0.2cqi_0.4cqi_0.2cqi_#480909] select-none pointer-events-none` },
        props.content
      ),
      h('span', 
        { class: `absolute left-1/2 -translate-x-1/2 w-100% text-transparent [text-shadow:0.2cqi_0_0_#5B4600,0cqi_0.2cqi_0_#5B4600,-0.2cqi_0cqi_0_#5B4600,0cqi_-0.2cqi_0_#5B4600,-0.2cqi_0.2cqi_0_#5B4600,0.2cqi_-0.2cqi_0_#5B4600,-0.2cqi_-0.2cqi_0_#5B4600,0.2cqi_0.2cqi_0_#5B4600] select-none pointer-events-none` },
        props.content
      ),
      h('span', 
        { class: 'relative bg-[linear-gradient(to_bottom,#978418,#FFFFFF,#FFE657,#EFCC09,#AF9606,#978001)] bg-clip-text text-transparent' }, 
        props.content
      )
    ]
  );
  const Arrow = (_, { attrs }) => 
  h('svg', { width: "12.5%", height: "89", viewBox: "0 0 106 89", fill: "#E40000", xmlns: "http://www.w3.org/2000/svg", ...attrs }, 
    [
      h('path', { 
        d: "M2.18467 37.6693C-2.66132 32.3934 1.08121 23.8742 8.24499 23.8742L21.6556 23.8742C23.9594 23.8742 26.1576 24.8399 27.716 26.5365L46.6528 47.1539C49.9133 50.7037 55.5131 50.7037 58.7736 47.1539L77.7104 26.5365C79.2688 24.8399 81.467 23.8742 83.7708 23.8742L97.1811 23.8742C104.345 23.8742 108.087 32.3933 103.241 37.6693L58.7735 86.0832C55.513 89.633 49.9133 89.6331 46.6528 86.0833L2.18467 37.6693Z"
      }),
      h('path', { 
        d: "M52.8755 26.8517C45.4606 26.8517 39.4496 20.8408 39.4496 13.4259C39.4496 6.01097 45.4606 -9.10979e-07 52.8755 -5.86864e-07C60.2904 -2.62748e-07 66.3014 6.01097 66.3014 13.4259C66.3014 20.8408 60.2904 26.8517 52.8755 26.8517Z"
      }),
    ]
  );
  const JumpButton = (props, { attrs }) => 
  h('button', 
    { 
      ...attrs, 
      class: [
        "group relative inline-block pt-[0.3rem] pb-[0.5rem] px-[1.4rem] rounded-[46px] border-none bg-[linear-gradient(to_bottom,#FFD900,#FFF5BC,#998200)] cursor-pointer", 
        "before:content-[''] before:absolute before:inset-[5px] before:rounded-[40px] before:z-0 before:bg-[linear-gradient(to_bottom,#A8281F,#DA3327,#741B15)]", 
        "hover:before:bg-[linear-gradient(to_bottom,#FF5246,#FF5246)] active:before:bg-[linear-gradient(to_bottom,#91231C,#AE241A,#440E0A)]",
        "md:pt-[0.5rem] md:pb-[0.75rem] md:px-[2.25rem] md:rounded-[50px] md:before:inset-[6px] md:before:rounded-[45px]",
        attrs.class || ''
      ] 
    }, 
    [ h('span', 
        { class: 'relative text-[21px] md:text-[32px] text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#FFD900,#FFF5BC,#998200)]  group-hover:bg-[linear-gradient(to_bottom,#FFF099,#FFF099)] group-active:bg-[linear-gradient(to_bottom,#AB9100,#AB9100)]' }, 
        props.content
      ) ]          
  );

  onMounted(async () => {
    if (!route.query.openExternalBrowser) {
      await router.replace({
        query: {
          ...route.query,
          openExternalBrowser: 1,
        },
      });
    }
    checkLoginStatus();
    document.body.classList.add('on-events3-page');
    // 登入才呼叫 API
    if (isLoggedIn.value) {
      await fetchMemberDetail();
      await fetchActivityInfo();
      await fetchActivityData();
    }
  });
  onUnmounted(() => {
    document.body.classList.remove('on-events3-page');
  });

</script>

<style scoped>
  .font-Inter {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .font-Noto {
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 900;
    font-style: normal;
  }

  @media (max-width: 767px) { 
    img.mobile{
      width: 100%;
      height: auto;
    }
    .desktop {
      display: none;
    }
  }
</style>
<style>
  /* 活動頁 Modal 全域樣式覆蓋 */
  body.on-events3-page .modalContent {
    background: #741B15;
    max-width: 480px;
    color: #FFF4B5;
    border: 3px solid #F0C63E;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  }
  body.on-events3-page .modalContent h2 {
    color: #FFD900;
    margin-left: 4px;
    margin-top: 28px;
    margin-bottom: -8px;
  }
  body.on-events3-page .checkBtnBox {
    background: #F0C63E;
    padding: 2px;
  }
  body.on-events3-page .checkBtn {
    background: linear-gradient(180deg, #E40000, #7E0000);
    color: #FFF4B5;
    padding: 0.5rem 1.5rem;
  }
  body.on-events3-page .checkBtn:hover {
    background: #FFF4B5;
    color: #741B15;
  }
  @media (min-width: 767px) { 
    body.on-events3-page .modalContent {
      font-size: 28px;
    }
    body.on-events3-page .modalContent h2 {
      font-size: 36px;
    }
    body.on-events3-page .checkBtn {
      font-size: 20px;
    }
  }
</style>