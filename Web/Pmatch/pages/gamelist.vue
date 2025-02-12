<template>
    <div>

        <Head>
            <title>PMatch遊戲道具交易平台</title>
            <Meta property="og:title"
                  content="PMatch遊戲道具交易平台" />
            <Meta name="keywords"
                  content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
            <Meta name="description"
                  content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
            <Meta property="og:description"
                  content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        </Head>
        <div class="max-w-1110px m-auto ps-5 pe-5 m-t-100px">
            <div class="flex flex-wrap">
                <div class="block md-flex flex-wrap gameOutside w-100%">
                    <div class="w-auto md:w-900px m-x-auto rounded-10px overflow-hidden m-b-30px">
                        <ElCarousel class="h-auto"
                                    :interval="3000"
                                    arrow="always">
                            <ElCarouselItem class="h-auto"
                                            v-for="(item, index) in bannerDownList"
                                            :key="index">
                                <img class="w-100% h-auto"
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

                </div>
                <div class="m-x-auto pt-3 pb-3">
                    <div class="moreGameBtnBox"
                         :class="gameList.length === allGameList.length?`moreGameBtnBoxDisabled`:``">
                        <span @click="AddGames"
                              class="moreGameBtn color-#fff font-size-22px decoration-none"
                              :class="gameList.length === allGameList.length?`moreGameDisabled`:``">更多遊戲</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="text-center companyInfoContainer">
                <div class="companyInfoTitle">廠商資訊</div>
            </div>
            <div class="relative"
                 id="cardContainer">
                <div class="tips"
                     :class="thePosition<=20?'tipsMove':''"
                     v-show="userToken === null || userToken==='' ||userToken===undefined">若要看到完整資訊請完成註冊與實名認證</div>
                <div class="max-w-1110px m-auto ps-5 pe-5 p-t-100px"
                     :class="userToken === null || userToken==='' ||userToken===undefined?'cardInfoContainer':''">
                    <div class="flex flex-wrap w-100%">
                        <div v-for="(item) in companies"
                             :key="item.Id"
                             class="w-100% md:w-1/3 pr-0 md:pr-15px box-border">
                            <div class="companyCard w-100%">
                                <div class="companyName">{{ item.Name }}</div>
                                <div class="companyId">統編</div>
                                <div class="companyIdNum">{{ item.IdNum }}</div>
                            </div>
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
const thePosition = ref(0.0);
const companies = ref([
    {
        Id: 1,
        Name: '聖吉科技有限公司',
        IdNum: '67379896'
    },
    {
        Id: 2,
        Name: '聖印數位有限公司',
        IdNum: '90376983'
    },
    {
        Id: 3,
        Name: '宸運網路有限公司',
        IdNum: '83791731'
    },
    {
        Id: 4,
        Name: '宇郅國際有限公司',
        IdNum: '82868789'
    },
    {
        Id: 5,
        Name: '向鴻有限公司',
        IdNum: '50996109'
    },
    {
        Id: 6,
        Name: '正毓有限公司',
        IdNum: '50855754'
    },
    {
        Id: 7,
        Name: '笠榮興業有限公司',
        IdNum: '55865653'
    },
    {
        Id: 8,
        Name: '馥楹實業有限公司',
        IdNum: '55865675'
    },
    {
        Id: 9,
        Name: '富聿甲有限公司',
        IdNum: '50896951'
    },
    {
        Id: 10,
        Name: '訊邑科技有限公司',
        IdNum: '83633065'
    }
]);
/**
 * 遊戲列表
 */
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
/**更多遊戲 */
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
/**banner輪播 */
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
    const filters = document.querySelector('#cardContainer'); // 替換成你的元素選擇器
    const initRect = filters.getBoundingClientRect();
    thePosition.value = initRect.top;
    window.addEventListener('scroll', e => {
        if (filters) {
            const rect = filters.getBoundingClientRect();
            thePosition.value = rect.top;
        }
    });
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
.companyInfoContainer {
    background-image: url('/images/bg-dot05.png'), linear-gradient(45deg, #7b2cbf, #f72585);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    color: white;
    width: 100%;
    aspect-ratio: 1512/308.2;
    align-content: center;
    font-size: 66px;
    margin-top: 50px;
}
.companyCard {
    position: relative;
    width: 100%;
    aspect-ratio: 3/2;
    background-image: url('/images/bg-wave03.png');
    background-size: contain;
    background-repeat: no-repeat;
    color: white;
    margin-bottom: 30px;
}
.companyName {
    position: absolute;
    text-align: center;
    width: 80%;
    left: 50%;
    transform: translateX(-52%);
    top: 20%;
    font-size: 26px;
    font-weight: 600;
}
.companyId {
    position: absolute;
    width: 80%;
    left: 50%;
    top: 55%;
    font-weight: 600;
    transform: translateX(-52%);
    text-align: center;
}
.companyId::after {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
    width: 30%;
    height: 1px;
    border-top: 1px solid white;
}
.companyId::before {
    position: absolute;
    content: '';
    top: 50%;
    transform: translateY(-50%);
    left: 10%;
    width: 30%;
    height: 1px;
    border-top: 1px solid white;
}
.companyIdNum {
    position: absolute;
    left: 50%;
    width: 80%;
    text-align: center;
    transform: translateX(-52%);
    top: 73%;
    font-size: 25px;
    font-weight: 600;
}
.cardInfoContainer {
    filter: blur(5px);
}
.tips {
    position: absolute;

    width: 100%;
    height: 100%;
    text-shadow: 0px 0px 10px white;
    font-size: 50px;
    text-align: center;
    align-content: center;
    z-index: 99;
}
.tipsMove {
    position: fixed;
    top: 7%;
}
:deep(.el-carousel__container) {
    height: auto;
    aspect-ratio: 900/250;
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
    .companyInfoContainer {
        aspect-ratio: 765.838/308.154;
        font-size: 50px;
    }
}
</style>
