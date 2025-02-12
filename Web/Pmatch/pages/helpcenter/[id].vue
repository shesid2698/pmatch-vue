<template>
    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title" content="PMatch遊戲道具交易平台" />
        <Meta
            name="keywords"
            content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
        />
        <Meta
            name="description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <!-- 成功獲取資料時 -->
        <div v-for="(item, index) in newsItem" :key="index">
            <h2 class="color-#666">{{ item.Title }}</h2>
            <h4>{{ item.Summary }}</h4>
            <div class="detail">
                <div v-html="item.Content"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入的東西
import { defineAsyncComponent } from "vue";

import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

// 用路由的名字 help1、help2
const route = useRoute();
const routeParamId = route.params.id;
const newsItem = ref(null);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 取得GetNewsDetail
async function fetchNewsDetailData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetNewsDetail",
            {
                MessageId: routeParamId,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            newsItem.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
onMounted(async () => {
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                fetchNewsDetailData(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchNewsDetailData(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});
</script>

<style scoped>
.detail {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
}
</style>