<template>
    <div>

        <Head>
            <title>PMatch遊戲道具媒合網</title>
            <Meta property="og:title"
                  content="PMatch遊戲道具媒合網" />
            <Meta name="keywords"
                  content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
            <Meta name="description"
                  content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
            <Meta property="og:description"
                  content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        </Head>
        <div class="max-w-1110px m-auto ps-5 pe-5 m-t-100px">
            <div class="flex flex-wrap">
                <div class="block md-flex flex-wrap gameOutside w-100%">
                    <div class="w-80% m-x-auto rounded-10px overflow-hidden m-b-30px">
                        <ElCarousel v-if="bannerDownList.length > 0"
                                    class="h-200px"
                                    :interval="2000"
                                    arrow="always">
                            <ElCarouselItem class="h-200px"
                                            v-for="(item, index) in bannerDownList"
                                            :key="index">
                                            <span></span>
                                <img class="w-100% h-200px"
                                     :src="`${assetsUrl}${item.ImgFile}`"
                                     :alt="item.PlatformName" />
                            </ElCarouselItem>
                        </ElCarousel>
                    </div>
                    <div class="gameBox flex"
                         v-for="(item, index) in gameList"
                         :key="index"
                         :class="index%2===1?`gameBoxEven`:`gameBoxOdd`">
                        <div class="p-2rem w-100% relative">
                            <div class="gameLogo">
                                <img class="w-200px"
                                     src="/images/gameLogo.png"
                                     alt="熱門媒合logo" />
                            </div>
                            <div class="flex">
                                <div class="gameImg w-100% me-3">
                                    <NuxtLink :to="{
                                                path: '/findmatch',
                                                query: {
                                                    platformName:
                                                        item.PlatformName,
                                                },
                                            }"
                                              class="w-100% m-1">
                                        <div class="w-100% flex">
                                            <img :src="`${assetsUrl}${item.ImgFile}`"
                                                 :alt="item.PlatformName"
                                                 class="w-100% rounded-10px" />
                                        </div>
                                    </NuxtLink>
                                </div>
                                <div class="w-100% ms-3 gameContent">
                                    <div v-for="(
                                                character, index2
                                            ) in item.Characters.slice(0, 3)"
                                         :key="index2"
                                         :class="`w-100% gameItemBox${index2}`">
                                        <NuxtLink class="decoration-none"
                                                  :to="`/findmatch/${character.Id}`">
                                            <div class="gameItem pt-3 pb-3 w-100%">
                                                {{ character.Name }}
                                            </div>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end mt-7">
                                <div>
                                    <NuxtLink :to="{
                                                path: '/findmatch',
                                                query: {
                                                    platformName:
                                                        item.PlatformName,
                                                },
                                            }"
                                              class="decoration-none font-size-18px color-#f72585 fw-600">
                                        >> 更多媒合商
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-x-auto pt-3 pb-3 mt-10">
                        <div class="moreGameBtnBox"
                             :class="gameList.length === allGameList.length?`moreGameBtnBoxDisabled`:``">
                            <span @click="AddGames"
                                  class="moreGameBtn color-#fff font-size-22px decoration-none"
                                  :class="gameList.length === allGameList.length?`moreGameDisabled`:``">更多遊戲</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// loading page
import { useLoadStore } from '../stores/loading.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const gameList = ref([]);
const allGameList = ref([]);
const gameGroup = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie('_PmToken');
const assetsUrl = useCookie('_PmAssetsUrl');

async function fetchGameList(token) {
    if (token === '') {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetPlatformAndCharacterList',
            {},
            {
                headers: {
                    Authorization: token // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            allGameList.value = response.data.Data;
            for (let i = 0; i < allGameList.value.length; i += 6) {
                gameGroup.value.push(allGameList.value.slice(i, i + 6));
            }
            gameList.value.push(...gameGroup.value[0]);
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
const AddGames = () => {
    gameGroup.value.some(group => {
        if (!gameList.value.includes(...group)) {
            gameList.value.push(...group);
            return true;
        }
    });
};
const bannerDownList = ref([]);
// 找媒合GetAdvertisementList(下banner)
async function fetchADDownList(token) {
    if (token === '') {
        token = await jwtStore.generateToken();
    }
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetAdvertisementList',
            {
                Category: [3]
            },
            {
                headers: {
                    Authorization: token // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            bannerDownList.value = response.data.Data;
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
        data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
    }
}
onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != '' && userToken.value != undefined) {
            const token = userToken.value;
            if (token != '') {
                await fetchGameList(token);
                await fetchADDownList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != '') {
                await fetchGameList(token);
                await fetchADDownList(token);
            }
        }
    } catch (error) {
        console.error('頁面初始化失敗:', error);
    } finally {
        await setPageLoading(false);
    }
});
</script>

<style scoped>
.gameBox {
    background: linear-gradient(to bottom, #fff, #f6a2ff);
    border-radius: 10px;
    box-shadow: 0px 0px 6px 1px rgb(168, 168, 168);
}
.gameBoxOdd {
    width: calc(50% - 1rem);
    margin-right: 1rem;
    margin-bottom: 3rem;
}
.gameBoxEven {
    width: calc(50% - 1rem);
    margin-left: 1rem;
    margin-bottom: 3rem;
}
.gameLogo {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.gameImg {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.gameImg:hover {
    background: linear-gradient(to right, #f72585, #4361ee);
    color: #fff;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.gameContent {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.gameItemBox0,
.gameItemBox1,
.gameItemBox2 {
    position: relative;
    padding: 1px;
    background: linear-gradient(to bottom, rgba(247, 37, 133), #7b2cbf);
    border-radius: 10px;
    border: none;
}
.gameItem {
    position: relative;
    width: 100%;
    background: linear-gradient(to bottom, #f72585, #7b2cbf);
    color: #fff;
    border-radius: 10px;
    text-align: center;
}
.gameItem:hover {
    width: 100%;
    background: #fff;
    color: #f72585;
    border-radius: 10px;
    text-align: center;
}
.moreGameBtnBox {
    position: relative;
    padding: 17px 1px;
    background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
}
.moreGameBtnBoxDisabled {
    background: gray;
}
.moreGameBtn {
    padding: 1rem 2rem;
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
}
.moreGameBtn:hover {
    background: #fff;
    color: #f72585;
}
.moreGameDisabled {
    background: gray;
    color: lightgray;
}
.moreGameDisabled:hover {
    background: gray;
    color: lightgray;
}
@media screen and (max-width: 768px) {
    .gameBoxOdd {
        width: 100%;
        margin-right: 0rem;
        margin-bottom: 2rem;
    }
    .gameBoxEven {
        width: 100%;
        margin-left: 0rem;
        margin-bottom: 2rem;
    }
}
</style>
