<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div>
            <h2 class="color-#666">{{ pageTitle }}</h2>
            <h4>{{ pageSubTitle }}</h4>
            <div class="detail">
                <div v-html="pageDetail"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入的東西
import { defineAsyncComponent } from "vue";

// 用路由的名字 help1、help2
const route = useRoute();
const routeParamId = route.params.id;

// 幫助中心資料
const helpCenter = {
    help1: {
        title: "● 我是媒合商，我該如何申請合作提案呢？",
        subtitle: "",
        detail: "若想進一步與PMatch業務上合作，歡迎您聯繫客服中心或寄送信件至客服信箱。<br/>客服官方LINE：@471ixkfc<br/>客服信箱：service@pmatch.com.tw<br/>客服中心服務時間：周一至周五 09:00-18:00。",
    },
    help2: {
        title: "● 我是玩家，我該如何尋找媒合商協助做遊戲貨幣的媒合呢？",
        subtitle: "",
        detail: "點選網頁最上方的「找媒合」，尋找你想媒合的商店<br/>步驟說明① 點選網頁最上方的【找媒合】，可以看到所有媒合商家。</br></br><img src='/images/help222_1.png'></br></br>步驟說明② 選擇想要找媒合的遊戲，或直接以關鍵字搜尋媒合商商店名稱。</br></br><img src='/images/help222_2.png'></br></br>",
    },
    help3: {
        title: "● PMatch可以提供什麼？",
        subtitle:
            "讓玩家能透過委託媒合商的媒合服務，使有意交流的玩家雙方取得或讓出遊戲道具/幣",
        detail: "網路遊戲當中以虛擬寶物與遊戲幣的媒合行之有年，玩家透過委託媒合商的媒合服務，讓有意交流的玩家雙方取得或讓出遊戲道具/幣。</br>PMatch致力於打造一個更透明安全的遊戲道具媒合平台，讓線上玩家能快速、輕鬆的找到有口碑又安全的媒合商。",
    },
    help4: {
        title: "● 什麼是委託媒合？",
        subtitle: "",
        detail: "遊戲玩家透過PMatch網站委託媒合商家，來媒合遊戲幣的買／賣家。",
    },
    help5: {
        title: "● 什麼是成功媒合紀錄？",
        subtitle: "",
        detail: "委託媒合商協助遊戲貨幣媒合後的成功媒合紀錄。",
    },
};

// 動態component產生(差異大的時候再用好了)
// const formattedId = routeParamId.charAt(0).toUpperCase() + routeParamId.slice(1);
// Object.keys(helpCenter).forEach((key) => {
//   const formattedKey = key.charAt(0) + key.slice(1);
//   helpCenter[key].component = defineAsyncComponent(() =>
//     import(`@/components/help/${formattedKey}.vue`)
//       .catch((error) => {
//         console.error(`Error loading component Help${formattedKey}:`, error);
//         return {}; // 返回空物件以避免未處理的承諾拒絕
//       })
//   );
// });
// const pageComponent = pageName.component;

const pageName = helpCenter[routeParamId];
const pageTitle = pageName.title;
const pageSubTitle = pageName.subtitle;
const pageDetail = pageName.detail;
</script>

<style scoped>
.detail {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
}
</style>