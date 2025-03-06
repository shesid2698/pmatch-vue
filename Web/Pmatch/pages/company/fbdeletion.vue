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
    <div class="max-w-1110px m-auto pt-60px ps-5 pe-5 relative z-2">
        <div class="w-100%">
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">Facebook資料刪除指示</span>
            </div>
            <div>
                <div>
                    <br />
                    我們不會在我們的伺服器裡保存您的個人資料，但是根據Facebook的政策，我們必須提供 “Facebook資料刪除指示的網址”。<br /><br />

                    如果您想刪除與『PMatch』有關的Facebook登入應用數據，您可以按照以下步驟進行：<br /><br />

                    1. 進入您的Facebook帳號的 “設定和隱私 “選單。點擊 “設定”<br /><br />

                    2. 向下滾動並點擊 “應用程式和網站”<br /><br />

                    3. 找到並點擊 『PMatch』<br /><br />

                    4. 點擊 “移除 “按鈕<br /><br />

                    恭喜您，您已經成功地刪除了您的『PMatch』應用程式活動。<br /><br />
                </div>
            </div>
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
//async function fetchData(token) {
//    try {
//        const response = await $axios.post(
//            "/api/v1/Pmatch/GetCompayIformationDetail",
//            {
//                Category: 3,
//            },
//            {
//                headers: {
//                    Authorization: token, // 帶上 Token
//                },
//            }
//        );
//        if (response.data.Status.Code === 0 && response.data != null) {
//            data.value = response.data.Content;
//        } else {
//            await openAlertModal(" ", `${response.data.Status.Message}`);
//        }
//    } catch (error) {
//        console.error("請求失敗:", error);
//        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
//    }
//}

onMounted(async () => {
    await setPageLoading(true);
    try {
        //if (userToken.value != "" && userToken.value != undefined) {
        //    const token = userToken.value;
        //    if (token != "") {
        //        await fetchData(token);
        //    }
        //} else {
        //    // 生成新的 token
        //    const token = await jwtStore.generateToken();
        //    if (token != "") {
        //        await fetchData(token);
        //    }
        //}
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
