<template>
    <noscript>
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TBHCXFCD"
            height="0"
            width="0"
            style="display: none; visibility: hidden"
        ></iframe>
    </noscript>
    <div :class="{ pageSetting: isHomePage }">
        <Head>
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
        <BuyLog />
        <AlertModal />
        <ConfirmModal />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
            integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
            crossorigin="anonymous"
        />
        <LoadingPage />
        <Header />
        <div class="pt-70px page">
            <NuxtPage />
        </div>
        <Footer />
    </div>
</template>

<style>
body {
    font-family: Microsoft JhengHei;
    margin: 0;
    color: #555553;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
    background-color: #fff;
    color: #212529;
    border-bottom: none;
    border-radius: 5px;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    background-color: #000;
    border-bottom: none;
    border-radius: 5px;
    color: #fff;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #212529;
    border-bottom: none;
    border-radius: 5px;
    color: #fff;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header {
    border-bottom: none !important;
    margin: 0 0 10px 0;
}
.page {
    min-height: calc(100vh - 120px - 80px - 280px);
    z-index: 2;
    position: relative;
}
.pageSetting {
    background-image: url("/images/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
}
</style>

<script setup>
// loading page
import { useLoadStore } from "./stores/loading.js";
import { useModalStore } from "./stores/useModal.js";
import { useAlertModalStore } from "./stores/useAlertModal.js";
import { useConfigStore } from "./stores/config.js";

const store = useLoadStore();
const modal = useModalStore();
const alertModal = useAlertModalStore();
const configStore = useConfigStore();
const setPageLoading = store.setPageLoading;

const settingList = ref("");
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
// cookies
let assetsUrl = useCookie("_PmAssetsUrl");
const userToken = useCookie("_PmToken");
const route = useRoute();
const isHomePage = computed(() => route.path === "/");
const router = useRouter();

onMounted(async () => {
    await setPageLoading(true);
    try {
        if (!configStore.baseUrl) {
            await configStore.loadConfig();
        }
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;

            if (token != "") {
                fetchSetting(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchSetting(token);
            }
        }
        await setPageLoading(false);
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

// 取得GetSetting
async function fetchSetting(token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetSetting",
            {},
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            settingList.value = response.data.Data;
            try {
                // 移除外層轉義字符
                const parsedSettingList = JSON.parse(settingList.value);
                // 取出 AssetsUrl 的值
                assetsUrl.value = parsedSettingList.AssetsUrl;
            } catch (error) {
                console.error("無法解析 JSON 字符串:", error);
            }
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
</script>

