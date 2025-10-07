<template>
    <Head>
    <title>10月超值豪禮三重奏</title>
    <Meta property="og:title" content="10月超值豪禮三重奏" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap" rel="stylesheet">
  </Head>
  <div class="flex flex-col items-center w-full bg-[#741B15]">
    <header class="-mb-[22.5vw] w-full aspect-[1920/1200]  bg-[url('/images/activity/3/event-banner.png')] bg-cover bg-center flex items-end justify-center text-white text-2rem"></header>

    <main class="mb-[80px] w-[90%] max-w-[1320px] bg-[#D9D9D9]/80 rounded-[10px] p-5 relative z-2 border-[5px] border-solid [border-image:linear-gradient(to_bottom,#7E0000,#E40000,#7E0000)_1]">
      <!-- 活動分頁 -->
      <nav class="flex justify-center gap-[2.25%] px-[1.25%] my-[28px]">
        <div v-for="tab in tabs" :key="tab.id" class="w-[33%] relative group" >
          <TabDecorator :class="{ 'opacity-100': innerPage === tab.id }" class="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:fill-[#C1514A]" />
          <button @click="innerPage = tab.id" class="w-full h-[128px] relative inline-flex items-center justify-center bg-[#741B15] text-[#FFF4B5] text-center border-[8px] border-solid border-[#741B15] cursor-pointer  group-hover:bg-[#C1514A] group-hover:border-[#C1514A]">
            <BorderFrame class="absolute top-0 left-0 w-full h-full z-0" />
            <span class="font-Inter relative z-10">
              <span class="block text-[36px] font-bold leading-[40px]">{{ tab.title }}</span>
              <span class="block text-[24px] font-light">{{ tab.subtitle }}</span>
            </span>
          </button>
          <TabDecorator :class="{ 'opacity-100': innerPage === tab.id }" class="absolute top-full left-1/2 -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:fill-[#C1514A] transform rotate-180" />
        </div>
      </nav>
      <!-- 活動內容 -->
      <div class="text-white text-center">
        <div class="my-[60px]">
          <TitleBlock class="font-Noto" title="活動對象" />
          <p class="font-Inter text-[#741B15] font-semibold text-[40px] my-[10px]">PMatch 新會員專屬優惠</p>
        </div>
        <div class="my-[60px]">
          <TitleBlock class="font-Noto mt-[60px]" title="活動日期" />
          <p class="font-Inter text-[#741B15] font-semibold text-[40px] my-[10px]">2025/10/20 12:00 ~ 11/02 23:59</p>
        </div>
        <div v-show="innerPage === 1">
          <div class="my-[60px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[32px] text-start mx-[10%] my-[20px]">
              <p class="my-[8px]">＊ 活動期間註冊PMatch新會員，可取得指定遊戲平台遊戲幣 (價值$200)</p>
              <p class="my-[8px]">＊ 玩家完成註冊後，需於活動結束前至活動頁面選擇領取的遊戲平台，活
              <br>動結束前未完成兌換的玩家，視同放棄領獎資格</p>
              <p class="my-[8px]">＊ 註冊活動獎項由指定媒合商提供，玩家僅能選擇活動頁面中指定平台的遊戲幣</p>
              <p class="my-[8px]">＊ 獎項預計前發送至領獎中心，獎項領取期限為30天，請玩家於領獎期限
              <br>內完成領獎，獎項逾期後無法領取且不再補發</p>
            </div>
          </div>
          <div class="my-[80px] max-w-[979px]  mx-auto">
            <div class="w-full aspect-[979/613] bg-[url('/images/activity/3/tab1-register.png')] bg-cover bg-no-repeat bg-center relative [container-type:inline-size] [container-name:register-card]">
              <!-- 下拉式選單 -->
              <div class="absolute w-[55.8%] bottom-[6.25%] left-[4.5%] ">
                <button @click="toggleDropdown" :class="{'rounded-full': !isDropdownOpen, 'rounded-t-[4cqi] border-b-0': isDropdownOpen}" class="w-full aspect-[544/79] bg-[#741B15] text-[#FFD900] text-[4cqi] leading-[4cqi] flex items-center justify-between px-[3cqi] border-[0.8cqi] border-solid border-[#F0C63E] [box-shadow:0px_8px_5.5px_rgba(0,0,0,0.25),inset_0px_15px_15px_rgba(0,0,0,0.2)]">
                  <span>{{ dropdownTriggerText }}</span>
                  <span class="transform transition-transform" :class="{ 'rotate-180': isDropdownOpen }">
                    <svg width="4cqi" height="2.5cqi" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.268 24C14.0378 25.3333 15.9622 25.3333 16.732 24L28.8564 3C29.6262 1.66666 28.664 0 27.1244 0H2.87564C1.33604 0 0.373793 1.66667 1.14359 3L13.268 24Z" fill="#F0C63E"/>
                    </svg>
                  </span>
                </button>
                <ul v-if="isDropdownOpen" class="w-full absolute top-full left-0 px-0 mx-0 -mt-[0.4cqi] bg-[#741B15] border-[0.8cqi] border-solid border-[#F0C63E] rounded-b-[4cqi] z-10 overflow-hidden box-border border-t-0 [box-shadow:0px_8px_5.5px_rgba(0,0,0,0.25)]">
                  <li 
                    v-for="platform in platforms" 
                    :key="platform"
                    @click="selectPlatform(platform)"
                    class="py-[2.25cqi] ps-[4cqi] mx-0 list-none cursor-pointer text-[#FFD900]  text-start text-[4cqi] leading-[4cqi] hover:bg-[#A8281F]"
                  >
                    {{ platform }}
                  </li>
                </ul>
              </div>
              <div class="absolute w-[31.5%] bottom-[6.25%] right-[5.4%]">
                <button @click="claimReward" :disabled="!canClaim"
                  class="w-full aspect-[309/79] rounded-full text-[#FFD900] text-[4cqi] leading-[4cqi]
                    border-[0.8cqi] border-solid border-[#F0C63E] 
                    cursor-pointer transition-all duration-200 ease-in-out

                    bg-[#741B15]
                    [box-shadow:0px_8px_5.5px_rgba(0,0,0,0.25),inset_0px_2cqi_2cqi_rgba(238,171,147,0.6)]

                    hover:bg-[#BC4A43]
                    active:bg-[#741B15]
                    active:[box-shadow:none]

                  "
                >
                  {{ rewardClaimed ? '已領取' : '領取註冊禮' }}
                </button>
              </div>
            </div>
          </div>
                            <!-- disabled:bg-gray-500 disabled:border-gray-400 disabled:opacity-70 disabled:cursor-not-allowed -->

          <div class="my-[60px]">       
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab1-step1.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">官網領獎中心</p>
            </div>          
            <Arrow />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab1-step2.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">點選對應獎項</p>
            </div>
            <Arrow />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab1-step3.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">領取獎項</p>
            </div>
          </div>
        </div>
        <div v-show="innerPage === 2">
          <div class="my-[60px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[32px] text-start mx-[10%] my-[20px]">
              <p class="my-[8px]">＊ 活動期間指定平台委買不限金額98折，指定平台最高享8折優惠</p>
              <p class="my-[8px]">＊ 委買優惠活動僅限列表中指定之遊戲平台及媒合商</p>    
            </div>            
          </div>
          <div class="my-[60px]">
            <p class="font-Inter text-[#741B15] font-semibold text-[40px] my-[40px]">指定平台及媒合商</p>
              <div class="w-[85%] max-w-[1200px] mx-auto grid grid-cols-[28fr_46fr_35fr] border-[10px] border-solid border-[#741B15] overflow-hidden mb-[120px]">    
                <div class="font-Noto bg-[#D8967E] text-[40px] h[69px]">遊戲平台</div>
                <div class="font-Noto bg-[#C97D38] text-[40px] h[69px]">活動內容</div>
                <div class="font-Noto bg-[#D8967E] text-[40px] h[69px]">指定媒合商</div>
                <template v-for="(row, index) in tableData" :key="row.platform.name">                  
                  <div class="flex items-center justify-center min-h[164px]" :class="index % 2 === 0 ? 'bg-[#EEAB93]' : 'bg-[#F7CFC1]'">
                    <img :src="row.platform.logo" :alt="row.platform.name" class="object-contain">
                  </div>
                  <div v-if="row.content" 
                    class="font-Inter flex items-center justify-center text-start text-[36px] px-[3%] py-[20px] min-h[164px]"
                    :class="index % 2 === 0 ? 'bg-[#FFD4AD] text-[#820600]' : 'bg-[#FFE9D4] text-[#A21010]'"
                    :style="{ gridRow: `span ${row.content.span || 1}` }"
                  >
                    {{ row.content.text }}
                  </div>
                  <div class="flex items-center justify-center gap-[60px] min-h[164px]" :class="index % 2 === 0 ? 'bg-[#EEAB93]' : 'bg-[#F7CFC1]'">
                    <div v-for="merchant in row.merchants" :key="merchant.name">
                      <img :src="merchant.logo" :alt="merchant.name" class="object-contain">
                    </div>
                  </div>
                </template>
              </div>
          </div>
          <div class="my-[60px]">       
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="my-[60px]">
              <p class="font-Inter text-[#741B15] font-semibold text-[36px] my-[40px]">如何透過PMatch下單</p>
              <div class="flex items-center justify-center gap-[10px] mb-[120px]">
                <img src="/images/activity/3/tab2-step1.png" alt="">
                <Arrow class="transform rotate-270"/>
                <img src="/images/activity/3/tab2-step2.png" alt="">
              </div>
            </div>
            <div class="my-[60px]">
              <p class="font-Inter text-[#741B15] font-semibold text-[36px] my-[40px]">如何快速聯絡媒合商 </p>
              <img src="/images/activity/3/tab2-step3.png" alt="">
            </div>
          </div>
        </div>
        <div v-show="innerPage === 3">
          <div class="my-[60px]">
            <TitleBlock class="font-Noto w-[228px]" title="活動媒合商" />
            <p class="font-Inter text-[#741B15] font-semibold text-[40px] my-[60px]">查看本次活動指定媒合商列表</p>
          </div>
          <div class="my-[60px]">
            <TitleBlock class="font-Noto" title="活動內容" />
            <div class="font-Inter text-[#741B15] text-[32px] text-start mx-[10%] my-[20px]">
              <p class="my-[8px]">1.活動期間內透過PMatch官網媒合交易下單且完成交易</p>
              <p class="my-[8px]">2.完成交易後，至粉絲團活動PO下方回覆以下指定內容，即可獲得抽獎資格</p>
              <p class="my-[8px] ps-3">「媒合交易好方便，快上PMatch最優惠」 並附上委託媒合紀錄完成交易截圖</p>
              <div class="flex flex-col items-center justify-center ">
                <img class="-m-[20px] select-none" src="/images/activity/3/tab3-award.png" alt="">
                <p class="text-[#A21010] text-[20px] leading-0">Apple iPad Wi-Fi機型128G (市價$11,900)，共兩台</p>
              </div>
            </div>
          </div>
          <div class="my-[60px]">
            <TitleBlock class="font-Noto" title="領取流程" />
            <div class="font-Inter text-[#741B15] text-[32px] text-start mx-[10%] my-[40px]">
              <p class="my-[8px]">1. 活動結束後，隨機抽取兩位符合抽獎資格玩家</p>
              <p class="my-[8px]">2. 小編透過臉書聯繫獲獎玩家，確認PMatch會員資訊後，送至Pmatch官網領獎中心</p>
            </div>
          </div>
          <div class="my-[60px]">
            <TitleBlock class="font-Noto" title="活動貼文" />
            <div class="font-Inter text-[#741B15] text-[32px] text-start mx-[10%] my-[40px]">
              <p class="my-[20px]">PO文範例 : 請玩家於指定粉絲團活動貼文下方回復以下內容，即可獲得抽獎資格</p>
              <p class="my-[20px]">媒合交易好方便，快上PMatch最優惠 + 活動期間委託媒合紀錄完成交易截圖</p>
            </div>
          </div>
          <div class="my-[60px]">
            <div class="my-[60px]">
              <img src="/images/activity/3/tab3-post.png" alt="">
            </div>
            <TitleBlock class="font-Noto" title="獎項領取" />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab3-step1.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">官網領獎中心</p>
            </div>
            <Arrow />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab3-step2.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">點選對應獎項</p>
            </div>
            <Arrow />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab3-step3.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">領取獎項</p>
            </div>
            <Arrow />
            <div class="my-[60px]">
              <img src="/images/activity/3/tab3-step4.png" alt="">
              <p class="font-Inter text-[#741B15] text-[32px] my-[10px]">實體贈品領取流程</p>
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
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>臉書粉絲團PO文抽獎獲獎玩家，活動結束後由小編主動透過臉書聯繫，確認相關資訊後透過官網<br>
          <span class="ps-1.25vw">平台最低數量以上方符合領獎資格，低於設定領獎門檻視同放棄領獎資格。</span></p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>本次活動獎項設有30天領取時間限制，獎項發送後請盡快至領獎中心領取，逾期視同放棄領獎資格</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[2.2vw] xl:text-[1.5vw] leading-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台僅提供媒合交易服務，交易相關問題請洽詢交易之媒合商了解詳情。</p>
      </div>
    </footer>
  </div>
</template>
<script setup>
  const innerPage = ref(1);
  const tabs = ref([
    { id: 1, title: '第一重', subtitle: '註冊會員送$200' },
    { id: 2, title: '第二重', subtitle: '委買交易享優惠' },
    { id: 3, title: '第三重', subtitle: '臉書PO文留言互動抽iPad' }
  ]);
  const isDropdownOpen = ref(true);
  const selectedPlatform = ref(null); // null 代表尚未選擇
  const platforms = ref([
    '聚寶Online', '金好運娛樂城', '包你發娛樂城', '辣財神娛樂城', 
    '滿貫大亨', '錢街Online', '金好爺娛樂城', '寶島娛樂城'
  ]);
  const tableData = ref([
    {
      platform: { name: '聚寶Online', logo: '/images/activity/3/tab2-platform1.png' },
      content: { text: '單筆委買交易每滿$1000，額外加贈價值$250遊戲幣滿$2000，額外加贈價值$500遊戲幣，以此類推，買越多贈越多' },
      merchants: [
        { name: '福娃金庫', logo: '/images/activity/3/tab2-merchants1.png' }
      ]
    },
    {
      platform: { name: '金好運', logo: '/images/activity/3/tab2-platform2.png' },      
      content: { text: '單筆委買交易不限金額均享有98折優惠', span: 6 }, // span 代表占用欄數 
      merchants: [
        { name: '金好盈金流', logo: '/images/activity/3/tab2-merchants2.png' },
        { name: '米其林金流', logo: '/images/activity/3/tab2-merchants3.png' }
      ]
    },
    {
      platform: { name: '包你發', logo: '/images/activity/3/tab2-platform3.png' },
      merchants: [
        { name: '好旺角銀行', logo: '/images/activity/3/tab2-merchants4.png' },
        { name: '寶雅銀行', logo: '/images/activity/3/tab2-merchants5.png' }
      ]
    },
    {
      platform: { name: '辣財神', logo: '/images/activity/3/tab2-platform4.png' },
      merchants: [
        { name: '金好盈金流', logo: '/images/activity/3/tab2-merchants2.png' }
      ]
    },
    {
      platform: { name: '滿貫大亨', logo: '/images/activity/3/tab2-platform5.png' },
      merchants: [
        { name: '寶可夢銀行', logo: '/images/activity/3/tab2-merchants6.png' }
      ]
    },
    {
      platform: { name: '錢街Online', logo: '/images/activity/3/tab2-platform6.png' },
      merchants: [
        { name: '錢庫', logo: '/images/activity/3/tab2-merchants7.png' }
      ]
    },
    {
      platform: { name: '金好爺', logo: '/images/activity/3/tab2-platform7.png' },
      merchants: [
        { name: '金好運小舖', logo: '/images/activity/3/tab2-merchants8.png' }
      ]
    },
  ]);


  const dropdownTriggerText = computed(() => {
    return selectedPlatform.value || '遊戲平台選擇';
  });


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
  h('svg', { width: "240", height: "29", viewBox: "0 0 240 29", fill: "#741B15", xmlns: "http://www.w3.org/2000/svg", ...attrs }, 
    [
      h('path', { 
        d: "M120 0L108.419 11.3733L112.659 15.5374L108.657 19.4663L104.418 15.3031L95.5526 24.0099H2.09104H0V28.1171H2.09104H91.3705H96.1015L100.284 24.0099L104.418 19.9494L106.292 21.7899L104.032 24.0099L99.8496 28.1171H104.58L108.657 24.1126L112.735 28.1171L113.634 29L114.533 28.1171L118.715 24.0099L120 22.7475L121.285 24.0099L125.467 28.1171L126.366 29L127.265 28.1171L131.447 24.0099L131.449 24.0083L131.451 24.0099L135.633 28.1171H140.364L136.182 24.0099L133.815 21.6855L135.582 19.9494L139.716 24.0099L143.898 28.1171H148.629H237.909H240V24.0099H237.909H144.447L135.582 15.3031L131.449 19.3619L127.448 15.433L131.581 11.3733L120 0ZM120 4.64628L126.851 11.3733L125.083 13.1094L120.106 8.22288L115.024 13.2138L113.15 11.3733L120 4.64628ZM125.083 17.7557L129.084 21.6855L126.717 24.0099L126.366 24.3537L126.016 24.0099L122.366 20.4239L125.083 17.7557ZM115.024 17.8602L117.635 20.424L113.984 24.01L113.634 24.3538L113.283 24.01L111.023 21.79L115.024 17.8602Z"
      })
    ]
  );
const TitleBlock = (props) => 
      h('div', 
        { class: 'relative left-1/2 -translate-x-1/2 bg-[#741B15]/50 rounded-[10px] w-[195px] h-[57px] leading-[55px] text-[40px]' }, 
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
  const Arrow = (_, { attrs }) => 
  h('svg', { width: "106", height: "89", viewBox: "0 0 106 89", fill: "#E40000", xmlns: "http://www.w3.org/2000/svg", ...attrs }, 
    [
      h('path', { 
        d: "M2.18467 37.6693C-2.66132 32.3934 1.08121 23.8742 8.24499 23.8742L21.6556 23.8742C23.9594 23.8742 26.1576 24.8399 27.716 26.5365L46.6528 47.1539C49.9133 50.7037 55.5131 50.7037 58.7736 47.1539L77.7104 26.5365C79.2688 24.8399 81.467 23.8742 83.7708 23.8742L97.1811 23.8742C104.345 23.8742 108.087 32.3933 103.241 37.6693L58.7735 86.0832C55.513 89.633 49.9133 89.6331 46.6528 86.0833L2.18467 37.6693Z"
      }),
      h('path', { 
        d: "M52.8755 26.8517C45.4606 26.8517 39.4496 20.8408 39.4496 13.4259C39.4496 6.01097 45.4606 -9.10979e-07 52.8755 -5.86864e-07C60.2904 -2.62748e-07 66.3014 6.01097 66.3014 13.4259C66.3014 20.8408 60.2904 26.8517 52.8755 26.8517Z"
      }),
    ]
  );

  // program
  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }

  function selectPlatform(platform) {
    selectedPlatform.value = platform;
    isDropdownOpen.value = false; // 選擇後自動關閉選單
  }

</script>

<style scoped>
  .font-Inter {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .font-Noto {
    font-family:  "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 900;
    font-style: normal;
  }
</style>
