<template>
    <div>
        <div class="max-w-1320px m-auto ps-5 pe-5 relative z-2">
            <div class="mb-3">
                <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-48px slogan">
                    安心交易的第一選項Pmatch
                </h1>
                <h3 class="m-0 font-size-14px md-font-size-26px text-center subSlogan">
                    為你嚴選商家、用合約保障你的權益、繁瑣的事情都再見
                </h3>
            </div>
            <div class="mb-6 md-flex block items-center justify-center">
                <div class="flex items-center">
                    <div class="flex items-center w-100%">
                        <div class="w-100%">
                            <select
                                class="platformName md-w-270px w-100% h-43px font-size-1rem b-#a9d8f8 rounded-5px p-5px"
                                v-model="platformNameToSearch"
                            >
                                <option value="">選擇遊戲...</option>
                                <option
                                    v-for="(item, index) in gameList"
                                    :key="index"
                                    :value="item.PlatformName"
                                >
                                    {{ item.PlatformName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="md-ms-3 md-mt-0 mt-3 flex w-100%">
                        <div class="flex items-center w-100%">
                            <div class="flex w-100%">
                                <div class="w-100%">
                                    <input
                                        class="storeName md-ms-3 w-100% md-w-270px h-36px p-0 rounded-5px font-size-1rem p-3px"
                                        type="text"
                                        placeholder="輸入關鍵字..."
                                        v-model="keywordToSearch"
                                    />
                                </div>
                                <div class="relative">
                                    <button
                                        class="h-38px border-none searchBtn absolute top-4px right-0"
                                    >
                                        <svg
                                            class="w-23px searchIcon"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 512 512"
                                            enable-background="new 0 0 512 512"
                                            xml:space="preserve"
                                            fill="#50B0FF"
                                        >
                                            <path
                                                d="M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
	c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
	 M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
	c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100% md-ms-3 flex items-center">
                        <input
                            type="checkbox"
                            class="w-20px h-20px"
                            v-model="contractToSearch"
                        />
                        <span>查看已簽約媒合商</span>
                    </div>
                    <div>
                        <button class="ms-3 w-100px" @click="searchToFindMatch">
                            搜尋
                        </button>
                    </div>
                </div>
            </div>
            <div class="pt-5rem pb-5rem">
                <div class="bannerBox">
                    <ElCarousel
                    v-if="bannerList.length > 0"
                    class="h-200px bannerDetail"
                    :interval="2000"
                    arrow="always"
                >
                    <ElCarouselItem
                        class="h-200px"
                        v-for="(item, index) in bannerList"
                        :key="index"
                    >
                        <img
                            class="w-100%"
                            :src="`${assetsUrl}${item.ImgFile}`"
                            :alt="item.PlatformName"
                        />
                    </ElCarouselItem>
                </ElCarousel>
                </div>
            </div>
            <div class="mb-3 pt-5rem pb-8rem">
                <div class="flex flex-wrap">
                    <div
                        class="gameBox"
                        v-for="(item, index) in gameList.slice(0, 4)"
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
                                    class="w-100%"
                                />
                            </NuxtLink>
                        </div>
                        <div>
                            <div
                                v-for="(
                                    character, index2
                                ) in item.Characters.slice(0, 3)"
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
                <div class="flex justify-center pt-3 pb-3">
                    <div>
                        <NuxtLink
                            class="moreGameBtn color-#fff font-size-22px decoration-none"
                            to="/gamelist"
                            >更多遊戲</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </div>
        
        <div class="w-full bg-#fff relative mt-5rem">
            <div class="waveTop absolute"></div>
            <div class="arrowRight absolute">
                <img src="/images/corner.png" alt="右邊箭頭">
            </div>
            <div class="max-w-1320px m-auto ps-5 pe-5 relative z-2">
                <div class="mb-5rem">
                    <h1 class="newsTitle m-0 text-center font-size-45px">
                        最新消息
                    </h1>
                    <div class="flex justify-center">
                        <img
                            class="w-250px"
                            src="/images/news.png"
                            alt="最新消息"
                        />
                    </div>
                </div>
                <div class="lg-flex">
                    <div class="w-100% lg-w-50% me-0 lg-me-2">
                        <div class="mb-3rem">
                            <button
                                class="newsAllBtn font-size-15px border-none p-3 bg-#4361ee color-#fff rounded-50px"
                                @click="fetchNewsListData([], '')"
                            >
                                ALL
                            </button>
                            <button
                                class="newsSystemBtn font-size-15px bg-#fff border-1px-solid-7B2CBF p-3 ms-3 color-#7B2CBF rounded-50px"
                                @click="fetchNewsListData([1], '')"
                            >
                                系統公告
                            </button>
                            <button
                                class="newsActivityBtn font-size-15px bg-#fff border-none p-3 ms-3 color-#F72585 rounded-50px"
                                @click="fetchNewsListData([2], '')"
                            >
                                活動資訊
                            </button>
                        </div>
                        <div v-if="newsList.length > 0">
                            <NuxtLink
                                :to="`/news/${item.Id}`"
                                v-for="(item, index) in newsList.slice(0, 5)"
                                :key="index"
                                class="color-#555553 decoration-none"
                            >
                                <div class="w-full">
                                    <div class="w-80 font-size-.8rem">
                                        <div class="flex items-center">
                                            <div
                                                :class="{
                                                    'bg-#7b2cbf':
                                                        item.Category === 1,
                                                    'bg-#f72585':
                                                        item.Category === 2,
                                                }"
                                                class="color-#fff p-1 font-size-12px rounded-50px"
                                            >
                                                {{
                                                    item.Category === 1
                                                        ? "網站公告"
                                                        : item.Category === 2
                                                        ? "活動資訊"
                                                        : ""
                                                }}
                                            </div>
                                            <div class="flex font-size-12px items-center p-2">
                                                <span :class="{
                                                    'color-#4361EE':
                                                        item.Category === 1,
                                                    'color-#f72585':
                                                        item.Category === 2,
                                                }">{{
                                                    item.StartTime.slice(0, 10)
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full pt-3 pb-3 mt-3 mb-3 newsItemLink">
                                        <div>
                                            <h2 class="m-0 font-size-30px" :class="{
                                                    'newsItem1':
                                                        item.Category === 1,
                                                    'newsItem2':
                                                        item.Category === 2,
                                                }">
                                                {{ item.Title }}
                                            </h2>
                                            <h3 class="m-0 font-size-12px">
                                                {{ item.Summary }}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="mt-4rem w-100% lg-w-50% ms-0 lg-ms-2 lg-mt-1rem">
                        <NewRatio />
                        <Matching class="mt-3rem" param="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-#fff pt-5rem pb-5 relative">
            <div class="waveBottom absolute"></div>
            <div class="arrowLeft absolute">
                <img src="/images/corner.png" alt="左邊箭頭">
            </div>
            <div class="arrowRight absolute bottom-0">
                <img src="/images/corner.png" alt="右邊箭頭">
            </div>
            <div class="max-w-1320px m-auto ps-5 pe-5 relative z-2">
                <div class="mb-5rem relative">
                    <h1 class="newsTitle m-0 text-center font-size-45px">
                        我們的服務
                    </h1>
                    <div class="flex justify-center">
                        <img
                            class="w-250px"
                            src="/images/ourService.png"
                            alt="我們的服務"
                        />
                    </div>
                    
                </div>
                <div class="md-flex" v-for="(item, index) in serviceList" :key="index" :class="{'serviceEven': index % 2 === 0}">
                    <div class="w-100% lg-w-50%">
                        <img class="w-100%" :src="item.img" :alt="item.title">
                    </div>
                    <div class="mt-4rem w-100% lg-w-50% lg-mt-1rem flex items-center">
                        <div class="lg-ms-5 lg-me-5 ps-5 pe-5 lg-w-auto w-100% pb-20 serviceItemsContent">
                            <h2 class="serviceItemsTitle font-size-30px m-0 mb-5">{{item.title}}</h2>
                            <h4 class="m-0 font-size-15px">{{item.detail}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElButton } from "element-plus";
import { ElCarousel } from "element-plus";
import { ElCarouselItem } from "element-plus";
// loading page
import { useLoadStore } from "../stores/loading.js";
const store = useLoadStore();
const setPageLoading = store.setPageLoading;
const router = useRouter();

const newsList = ref([]);
const gameList = ref([]);
const bannerList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const assetsUrl = useCookie("_PmAssetsUrl");

const serviceList = [
    {
        title: "簽約有保障，交易更安全",
        detail: "交易前與媒合商簽訂正式合約，避免交易糾紛，玩家交易權益更有保障",
        img: "/images/service1.png",
    },
    {
        title: "精選優質媒合商，詐騙走開",
        detail: "平台上的媒合商均經過Pmatch平台嚴格篩選，交易信用有保障，告別詐騙交易",
        img: "/images/service2.png",
    },
    {
        title: "即時查詢，交易資訊100%透明",
        detail: "平台提供即時交易查詢服務，不論是遊戲幣流向還是交易進度，資訊完整透明",
        img: "/images/service3.png",
    },
]
let platformNameToSearch = ref("");
let keywordToSearch = ref("");
let contractToSearch = ref(false);

// 取得GetNewsList(最新消息)
async function fetchNewsListData(num, token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetNewsList",
            {
                Categorys: num,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            newsList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
// 取得GetPlatformAndCharacterList(遊戲平台資訊)
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
// GetAdvertisementList(banner)
async function fetchADList(token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetAdvertisementList",
            {
                Category: [1],
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            bannerList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}

const searchToFindMatch = () => {
    router.push({
        path: "/findmatch",
        query: {
            platformName: platformNameToSearch.value || "", // 平台名稱
            keyword: keywordToSearch.value || "", // 關鍵字
            contract: contractToSearch.value ? 1 : 0, // 是否查看已簽約媒合商
        },
    });
};
onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;

            if (token != "") {
                await fetchNewsListData([], token);
                await fetchGameList(token);
                await fetchADList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchNewsListData([], token);
                await fetchGameList(token);
                await fetchADList(token);
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
/* 搜尋欄位樣式 */
.platformName:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.storeName {
    border: 1px solid #a9d8f8;
}
.storeName:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.searchBtn {
    background-color: rgba(0, 0, 0, 0);
}
.searchBtn:hover .searchIcon {
    opacity: 0.8;
}
:deep(.el-icon) {
    z-index: -1;
}
/* 遊戲 */
.gameBox {
    width: calc(100% / 4);
    padding-bottom: 1rem;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.bannerBox {
    padding: 3px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 1rem;
}
.bannerDetail {
    background: #fff;
    border-radius: 1rem;
}
.slogan {
    background: linear-gradient(to bottom, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to bottom, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.subSlogan {
    color: #f72585;
}
.newsTitle {
    background: linear-gradient(to right, #4361ee, #7b2cbf);
    background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.waveTop {
    background-image: url("/images/waveBottom.svg");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100%;
    top: -300px;
    left: 0;
    width: 100%;
    min-height: 300px;
}
.newsAllBtn {
    border: 1px solid #4361ee;
    cursor: pointer;
}
.newsSystemBtn {
    border: 1px solid #7b2cbf;
    cursor: pointer;
}
.newsActivityBtn {
    border: 1px solid #f72585;
    cursor: pointer;
}
.newsItem1{
    background: linear-gradient(to right, #4361ee, #7b2cbf);
    background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsItem2{
    background: linear-gradient(to right, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsItemLink{
    border-bottom: 1px solid rgba(67, 97, 238, .3);
}
.serviceEven{
    flex-direction: row-reverse;
    margin: 2rem 0;
}
.serviceItemsTitle{
    background: linear-gradient(to right, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.serviceItemsContent{
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #f72585, #7b2cbf) 1;
}
.waveBottom {
    background-image: url("/images/waveTop.svg");
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100%;
    bottom: -480px;
    left: 0;
    width: 100%;
    height: 480px;
}
.arrowLeft{
    top: -150px;
}
.arrowRight{
    transform: rotate(180deg);
    right: 0;
    top: -180px;
}
:deep(.el-carousel__arrow--left), :deep(.el-carousel__arrow--right) {
    background: rgba(0, 0, 0, 0);
}
:deep(.el-carousel__arrow--left > .el-icon), :deep(.el-carousel__arrow--right > .el-icon){
    font-size: 3rem;
}
:deep(.el-carousel__button){
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
:deep(.el-carousel__indicators--horizontal){
    bottom: -10px;
}
.moreGameBtn{
    padding: 1rem 2rem;
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
}
</style>
