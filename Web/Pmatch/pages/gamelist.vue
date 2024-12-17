<template>
    <div>
        <div class="max-w-1320px m-auto ps-5 pe-5">
            <div class="flex flex-wrap">
                <div
                    class="gameBox"
                    v-for="(item, index) in gameList"
                    :key="index"
                >
                    <div class="p-3">
                        <NuxtLink
                            :to="{
                                path: '/findmatch',
                                query: { platformName: item.PlatformName },
                            }"
                        >
                            <img
                                :src="`${assetsUrl}${item.ImgFile}`"
                                :alt="item.PlatformName"
                            />
                        </NuxtLink>
                    </div>
                    <div>
                        <div
                            v-for="(character, index2) in item.Characters.slice(
                                0,
                                3
                            )"
                            :key="index2"
                        >
                            <NuxtLink
                                class="color-#555553 decoration-none"
                                :to="`/findmatch/${character.Id}`"
                                >* {{ character.Name }}</NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const gameList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const assetsUrl = useCookie("_PmAssetsUrl");

async function fetchGameList(token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetPlatformAndCharacterList",
            {},
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            gameList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}

onMounted(async () => {
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                fetchGameList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchGameList(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});
</script>

<style scoped>
.gameBox {
    width: calc(100% / 4);
    padding-bottom: 1rem;
}
</style>
