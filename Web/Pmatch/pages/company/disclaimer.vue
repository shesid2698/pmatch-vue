<template>
    <Head>
        <title>PMatch遊戲道具媒合網</title>
        <Meta property="og:title" content="PMatch遊戲道具媒合網" />
        <Meta
            name="keywords"
            content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
        />
        <Meta
            name="description"
            content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="max-w-1110px m-auto pt-60px ps-5 pe-5 relative z-2">
        <div class="w-100%">
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">免責聲明</span>
            </div>
            <div v-html="data" class="mt-15px"></div>
        </div>
    </div>
</template>
<script setup>
// loading page
import { useLoadStore } from "../stores/loading.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const { $axios } = useNuxtApp();
const data = ref("");
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 取得GetCompayIformationDetail
async function fetchData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetCompayIformationDetail",
            {
                Category: 2,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0 && response.data != null) {
            data.value = response.data.Content;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                await fetchData(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchData(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
