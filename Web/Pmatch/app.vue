<template>
    <div>
        <Header />
        <div class="mt-140px mb-60px page">
            <NuxtPage />
        </div>
        <Footer />
    </div>
</template>

<style>
body {
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
}
</style>

<script setup>
const settingList = ref("");
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
// cookies
let assetsUrl = useCookie("_PmAssetsUrl");
const userToken = useCookie("_PmToken");

onMounted(async () => {
    try {
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
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
</script>

