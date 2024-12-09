<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">

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

// 用路由的名字 help1、help2
const route = useRoute();
const routeParamId = route.params.id;

const data = ref("");
const token = ref("");
const newsItem = ref(null);
const isLoading = ref(true); // 加載狀態
const { $axios } = useNuxtApp();

// 獲得jwt token
async function fetchToken() {
    const { data, error } = await useFetch("/api/guestToken", {
        params: {
            strUserName: "",
            iExpireMinutes: 10,
        },
    });

    if (error.value) {
        console.error("Token 生成失敗:", error.value);
    } else {
        token.value = data.value.token;
    }
}
// 取得GetNewsDetail
async function fetchNewsDetailData() {
    await fetchToken();

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetNewsDetail",
            {
                MessageId: routeParamId,
            },
            {
                headers: {
                    Authorization: token.value, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            newsItem.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }finally {
        isLoading.value = false; // 完成後無論成功或失敗，都結束加載
    }
}
fetchNewsDetailData();

</script>

<style scoped>
.detail {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
}
</style>