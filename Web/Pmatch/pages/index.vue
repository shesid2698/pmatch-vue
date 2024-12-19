<template>
    <div>
        <div class="max-w-1320px m-auto ps-5 pe-5">
            <div class="mb-3">
                <h1 class="m-0 text-center">最安全的遊戲交易平台</h1>
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
                        <input type="checkbox" class="w-20px h-20px" v-model="contractToSearch"/>
                        <span>查看已簽約媒合商</span>
                    </div>
                    <div>
                        <button class="ms-3 w-100px" @click="searchToFindMatch" >搜尋</button>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <ElCarousel
                    v-if="bannerList.length > 0"
                    class="h-200px"
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
            <div class="mb-3">
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
                <div class="flex justify-end pt-3 pb-3">
                    <div class="">
                        <NuxtLink
                            class="color-#555553 decoration-none"
                            to="/gamelist"
                            >more ..</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-#eee pt-5 pb-5">
            <div class="max-w-1320px m-auto ps-5 pe-5">
                <div>
                    <h2 class="m-0 text-center">NEWS</h2>
                    <h1 class="m-0 text-center">最新消息</h1>
                </div>
                <div class="flex">
                    <div class="w-70%">
                        <div v-if="newsList.length > 0">
                            <NuxtLink
                                to="/"
                                v-for="(item, index) in newsList.slice(0, 3)"
                                :key="index"
                                class="color-#555553 decoration-none"
                            >
                                <div
                                    class="w-full flex mb-3 bg-#fff rounded-1rem"
                                >
                                    <div class="w-80 p-5">
                                        <div>
                                            <span>{{ item.StartTime }}</span>
                                        </div>
                                        <div class="">
                                            {{
                                                item.Category === 1
                                                    ? "網站公告"
                                                    : item.Category === 2
                                                    ? "活動資訊"
                                                    : item.Category === 3
                                                    ? "新手幫助"
                                                    : ""
                                            }}
                                        </div>
                                    </div>
                                    <div class="w-full p-5">
                                        <div>
                                            <h2 class="m-0">
                                                {{ item.Title }}
                                            </h2>
                                            <h3 class="m-0">
                                                {{ item.Summary }}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                        <div>
                            <button @click="fetchNewsListData([], '')">
                                所有資訊
                            </button>
                            <button @click="fetchNewsListData([1], '')">
                                網站公告
                            </button>
                            <button @click="fetchNewsListData([2], '')">
                                活動資訊
                            </button>
                            <button @click="fetchNewsListData([3], '')">
                                新手幫助
                            </button>
                        </div>
                    </div>
                    <div class="w-400px">
                        <NewRatio />
                        <Matching />
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

const searchToFindMatch = () =>{
    router.push({
        path: '/findmatch',
        query: {
            platformName: platformNameToSearch.value || '', // 平台名稱
            keyword: keywordToSearch.value || '',         // 關鍵字
            contract: contractToSearch.value ? 1 : 0 // 是否查看已簽約媒合商
        }
    });
}
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
        await setPageLoading(false);
    } catch (error) {
        console.error("頁面初始化失敗:", error);
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
</style>
