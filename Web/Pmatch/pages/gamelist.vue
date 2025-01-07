<template>
    <div>
        <Head>
            <title>PMatch遊戲道具媒合網</title>
            <Meta
                property="og:title"
                content="PMatch遊戲道具媒合網"
            />
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
        <div class="max-w-1110px m-auto ps-5 pe-5">
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
// loading page
import { useLoadStore } from "../stores/loading.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

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
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}

onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                await fetchGameList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchGameList(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally{
        await setPageLoading(false);
    }
});
</script>

<style scoped>
.gameBox {
    width: calc(100% / 4);
    padding-bottom: 1rem;
}
</style>
