<template>
  <div class="flex flex-col items-center w-full bg-[#741B15]">
    <header class="w-full h-[880px] bg-[url('/images/activity/3/event-banner.png')] bg-cover bg-center flex items-end justify-center text-white text-2rem"></header>

    <main class="mb-[80px] w-[90%] max-w-[1320px] bg-[#D9D9D9]/80 rounded-[10px] p-5 relative z-2 border-[5px] border-solid [border-image:linear-gradient(to_bottom,#7E0000,#E40000,#7E0000)_1]">
      <!-- 活動分頁 -->
      <nav class="flex justify-center gap-[2.25%] px-[1.25%] py-[28px]">
        <div v-for="tab in tabs" :key="tab.id" class="w-[33%] relative" >
          <TabDecorator v-if="innerPage === tab.id" class="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1" />
          <button @click="innerPage = tab.id" class="w-full h-[128px] relative inline-flex items-center justify-center bg-[#741B15] text-[#FFF4B5] text-center border-[8px] border-solid border-[#741B15] cursor-pointer transition duration-300">
            <BorderFrame class="absolute top-0 left-0 w-full h-full z-0" />
            <span class="relative z-10 font-Inter">
              <span class="block text-[36px] font-bold leading-[40px]">{{ tab.title }}</span>
              <span class="block text-[24px] font-light">{{ tab.subtitle }}</span>
            </span>
          </button>
          <TabDecorator v-if="innerPage === tab.id" class="absolute top-full left-1/2 -translate-x-1/2 translate-y-1 transform rotate-180" />
        </div>
      </nav>
      <!-- 活動內容 -->
      <div class="text-white text-center">
        <div v-show="innerPage === 1" class="h-[1000px]">
          <h2>頁籤一：PMatch 新會員專屬優惠</h2>
          <p>這裡放置註冊送禮的相關內容...</p>
        </div>
        <div v-show="innerPage === 2" class="h-[1000px]">
          <h2>頁籤二：委買交易享優惠</h2>
          <p>這裡放置遊戲平台與媒合商 Logo 牆...</p>
        </div>
        <div v-show="innerPage === 3" class="h-[1000px]">
          <h2>頁籤三：臉書PO文留言互動抽iPad</h2>
          <p>這裡放置 Facebook 活動說明...</p>
        </div>
      </div>
    </main>

    <footer class="w-100% bg-[#8C592A] pt-1.8vw pb-3.6vw items-center justify-center md:flex hidden">
      <div class="text-white text-[2vw] md:text-[0.88vw] font-bold">
        <p class="text-[3vw] md:text-[1.5vw]">
          <span class="relative top-[0.08em] text-[4vw] md:text-[2.2vw] leading-[1.8vw] select-none">◆</span>
          注意事項
          <span class="relative top-[0.08em] text-[4vw] md:text-[2.2vw] leading-[1.8vw] select-none">◆</span>
        </p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>本次活動範圍僅包含活動頁面包含之媒合商及遊戲平台，詳細內容請參照上方活動各分頁說明。</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台保留更換等值贈品以及變更活動內容或終止活動的權利，以及最終活動解釋權。</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>註冊會員獲得的獎項，活動結束後系統直接發送，玩家至官網領獎中心領取</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>臉書粉絲團PO文抽獎獲獎玩家，活動結束後由小編主動透過臉書聯繫，確認相關資訊後透過官網<br>
          <span class="ps-1.25vw">平台最低數量以上方符合領獎資格，低於設定領獎門檻視同放棄領獎資格。</span></p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span>本次活動獎項設有30天領取時間限制，獎項發送後請盡快至領獎中心領取，逾期視同放棄領獎資格</p>
        <p><span class="relative top-[0.15em] text-[3vw] md:text-[1.5vw] leading-[1.2vw] select-none">◆ </span><strong>PMatch</strong>平台僅提供媒合交易服務，交易相關問題請洽詢交易之媒合商了解詳情。</p>
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
  const BorderFrame = (_, { attrs }) => 
  h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 390 116", preserveAspectRatio: "none", fill: "#FFF4B5", ...attrs }, 
    [
      h('path', { 
        d: "M0.92572 0.92572V23.4609H9.1782V31.2466H0.92572V84.8804H9.1782V92.666H0.92572V115.2H23.4689V107.159H31.2573V115.2H359.589V107.159H367.382V115.2H389.92V92.666H381.672V84.8804H389.92V31.2466H381.672V23.4609H389.92V0.92572H367.382V8.96828H359.589V0.92572H31.2573V8.96828H23.4689V0.92572H0.92572ZM5.53025 5.52862H18.8643V8.96828H9.1782V18.858H5.53025V5.52862ZM35.8619 5.52862H354.984V8.96828H35.8619V5.52862ZM371.986 5.52862H385.314V18.858H381.672V8.96828H371.986V5.52862ZM13.7827 13.5712H18.8643V18.858H13.7827V13.5712ZM23.4689 13.5712H31.2573V18.858H23.4689V13.5712ZM35.8619 13.5712H354.984V23.4609H367.382V35.8494H377.068V80.2763H367.382V92.666H354.984V102.556H35.8619V92.666H23.4689V80.2763H13.7827V35.8494H23.4689V23.4609H35.8619V13.5712ZM359.589 13.5712H367.382V18.858H359.589V13.5712ZM371.986 13.5712H377.068V18.858H371.986V13.5712ZM13.7827 23.4609H18.8643V31.2466H13.7827V23.4609ZM371.986 23.4609H377.068V31.2466H371.986V23.4609ZM5.53025 35.8494H9.1782V80.2763H5.53025V35.8494ZM381.672 35.8494H385.314V80.2763H381.672V35.8494ZM13.7827 84.8804H18.8643V92.666H13.7827V84.8804ZM371.986 84.8804H377.068V92.666H371.986V84.8804ZM5.53025 97.2689H9.1782V107.159H18.8643V110.597H5.53025V97.2689ZM13.7827 97.2689H18.8643V102.556H13.7827V97.2689ZM23.4689 97.2689H31.2573V102.556H23.4689V97.2689ZM359.589 97.2689H367.382V102.556H359.589V97.2689ZM371.986 97.2689H377.068V102.556H371.986V97.2689ZM381.672 97.2689H385.314V110.597H371.986V107.159H381.672V97.2689ZM35.8619 107.159H354.984V110.597H35.8619V107.159Z" 
      })
    ]
  );
  const TabDecorator = (_, { attrs }) => 
  h('svg', { width: "240", height: "29", viewBox: "0 0 240 29", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...attrs }, 
    [
      h('path', { 
        d: "M120 0L108.419 11.3733L112.659 15.5374L108.657 19.4663L104.418 15.3031L95.5526 24.0099H2.09104H0V28.1171H2.09104H91.3705H96.1015L100.284 24.0099L104.418 19.9494L106.292 21.7899L104.032 24.0099L99.8496 28.1171H104.58L108.657 24.1126L112.735 28.1171L113.634 29L114.533 28.1171L118.715 24.0099L120 22.7475L121.285 24.0099L125.467 28.1171L126.366 29L127.265 28.1171L131.447 24.0099L131.449 24.0083L131.451 24.0099L135.633 28.1171H140.364L136.182 24.0099L133.815 21.6855L135.582 19.9494L139.716 24.0099L143.898 28.1171H148.629H237.909H240V24.0099H237.909H144.447L135.582 15.3031L131.449 19.3619L127.448 15.433L131.581 11.3733L120 0ZM120 4.64628L126.851 11.3733L125.083 13.1094L120.106 8.22288L115.024 13.2138L113.15 11.3733L120 4.64628ZM125.083 17.7557L129.084 21.6855L126.717 24.0099L126.366 24.3537L126.016 24.0099L122.366 20.4239L125.083 17.7557ZM115.024 17.8602L117.635 20.424L113.984 24.01L113.634 24.3538L113.283 24.01L111.023 21.79L115.024 17.8602Z", 
        fill: "#730913" 
      })
    ]
  );
</script>

<style scoped>
  .font-Inter {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
</style>
