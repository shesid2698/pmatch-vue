<template>
    <div>
        <div class="headerLeft absolute top-0">
            <img
                class="w-85% max-w-1630px min-w-980px"
                src="/images/headerLeft.svg"
                alt="header左邊底圖"
            />
        </div>
        <div class="absolute right-0 top-0">
            <img
                class="w-100%"
                src="/images/bgDot01.png"
                alt="header右邊點點圖"
            />
        </div>
        <div class="relative">
            <div class="absolute left-0 bottom-0">
                <img
                    class="w-100%"
                    src="/images/bgDot02.png"
                    alt="熱門左邊點點圖"
                />
            </div>
            <div class="max-w-1110px m-auto pt-60px ps-5 pe-5 relative z-2">
                <div class="mb-3">
                    <h1
                        class="m-0 mb-2 text-center font-size-33px md-font-size-44px slogan"
                    >
                        安心交易的第一選項PMatch
                    </h1>
                    <h3
                        class="m-0 font-size-14px md-font-size-22px text-center subSlogan"
                    >
                        為你嚴選商家、用合約保障你的權益、繁瑣的事情都再見
                    </h3>
                </div>
                <div
                    class="mt-2rem md-mt-0 md-flex block items-center justify-center"
                >
                    <div class="block md-flex items-center w-100%">
                        <div
                            class="relative m-0 md-m-4 pt-4 pb-4 w-100% md-w-50% font-size-1.2rem gameSelect color-#fff"
                            @click.stop="togglePlatformBox"
                        >
                            <span class="fw-600">{{
                                selectedGame || "遊戲選擇 ..."
                            }}</span>
                            <div class="absolute top-17px right-20px">
                                <img
                                    class="w-25px"
                                    src="/images/arrowDown.png"
                                    alt="選擇遊戲下拉箭頭"
                                />
                            </div>
                            <div class="absolute top-0 w-100% z-99">
                                <div
                                    class="platformBox"
                                    v-show="showPlatformBox"
                                >
                                    <div class="platformBoxContent">
                                        <div
                                            class="relative pt-2 pb-2 w-100% fw-600"
                                        >
                                            遊戲選擇 ...
                                        </div>
                                        <div
                                            class="platformItem pt-2 pb-2 w-100% fw-600"
                                            v-for="(item, index) in gameList"
                                            :key="index"
                                            @click.stop="selectGame(item)"
                                        >
                                            {{ item.PlatformName }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-1rem m-0 md-m-4 flex w-100% md-w-50%">
                            <div class="flex items-center w-100%">
                                <div class="flex w-100%">
                                    <div class="w-100% storeNameBox">
                                        <div class="storeName pt-4px pb-4px">
                                            <input
                                                class="storeEntry max-w-702px md-max-w-517px pt-12px pb-12px w-80% md-w-80% font-size-1.2rem fw-600"
                                                type="text"
                                                placeholder="輸入關鍵字..."
                                                v-model="keywordToSearch"
                                            />
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <button
                                            class="h-38px border-none searchBtn absolute top-10px right-10px"
                                            @click="searchToFindMatch"
                                        >
                                            <img
                                                class="w-25px"
                                                src="/images/searchIcon.png"
                                                alt="搜尋按鈕"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="w-100% md-ms-3 flex items-center">
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
                    </div> -->
                    </div>
                </div>
                <div
                    class="mt-4 md-mt-0 md-ms-2rem fw-600 color-#F72585 flex items-center"
                >
                    <div class="flex items-center">
                        <img
                            class="w-25px"
                            src="/images/gameSearchIcon.png"
                            alt="遊戲搜尋icon"
                        />
                    </div>
                    <div class="ms-3 flex flex-wrap">
                        <div
                            v-if="!plaformLog.value"
                            v-for="(item, index) in plaformLog"
                            :key="index"
                        >
                            <button
                                @click="searchLog(item)"
                                class="searchLogBtn"
                            >
                                <span>{{ item }}</span>
                                <span
                                    class="m-2"
                                    v-if="index !== plaformLog.length - 1"
                                    >/</span
                                >
                            </button>
                        </div>
                    </div>

                    <span class=""> </span>
                </div>
                <div class="pt-2rem">
                    <div class="bannerBox">
                        <ElCarousel
                            v-if="bannerList.length > 0"
                            class="h-420px bannerDetail"
                            :interval="2000"
                            arrow="always"
                        >
                            <ElCarouselItem
                                class="h-420px"
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
                <div class="mb-3 pt-5rem pb-15rem">
                    <div class="mb-5rem">
                        <h1 class="color-#fff m-0 text-center font-size-50px">
                            熱門媒合商
                        </h1>
                        <!-- <button @click="testAlert">點擊開啟alert彈窗</button>
                    <button @click="testConfirm">點擊開啟confirm彈窗</button> -->
                        <div class="flex justify-center">
                            <img
                                class="w-250px"
                                src="/images/hotMatch.png"
                                alt="熱門媒合商"
                            />
                        </div>
                    </div>
                    <div class="block md-flex flex-wrap gameOutside w-100%">
                        <div
                            class="gameBox flex"
                            v-for="(item, index) in gameList.slice(0, 4)"
                            :key="index"
                            :class="`gameBox${index}`"
                        >
                            <div class="p-2rem w-100% relative">
                                <div class="gameLogo">
                                    <img
                                        class="w-200px"
                                        src="/images/gameLogo.png"
                                        alt="熱門媒合logo"
                                    />
                                </div>
                                <div class="flex">
                                    <div class="gameImg w-100% me-3">
                                        <NuxtLink
                                            :to="{
                                                path: '/findmatch',
                                                query: {
                                                    platformName:
                                                        item.PlatformName,
                                                },
                                            }"
                                            class="w-100% m-1"
                                        >
                                            <div class="w-100% flex">
                                                <img
                                                    :src="`${assetsUrl}${item.ImgFile}`"
                                                    :alt="item.PlatformName"
                                                    class="w-100% rounded-10px"
                                                />
                                            </div>
                                        </NuxtLink>
                                    </div>
                                    <div class="w-100% ms-3 gameContent">
                                        <div
                                            v-for="(
                                                character, index2
                                            ) in item.Characters.slice(0, 3)"
                                            :key="index2"
                                            :class="`w-100% gameItemBox${index2}`"
                                        >
                                            <NuxtLink
                                                class="decoration-none"
                                                :to="`/findmatch/${character.Id}`"
                                            >
                                                <div
                                                    class="gameItem pt-3 pb-3 w-100%"
                                                >
                                                    {{ character.Name }}
                                                </div>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-end mt-7">
                                    <div>
                                        <NuxtLink
                                            :to="{
                                                path: '/findmatch',
                                                query: {
                                                    platformName:
                                                        item.PlatformName,
                                                },
                                            }"
                                            class="decoration-none font-size-18px color-#f72585 fw-600"
                                        >
                                            >> 更多媒合商
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pt-3 pb-3 mt-10">
                        <div class="moreGameBtnBox">
                            <NuxtLink
                                class="moreGameBtn color-#fff font-size-22px decoration-none"
                                to="/gamelist"
                                >更多遊戲</NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full bg-#fff relative mt-5rem">
            <div class="waveTop absolute"></div>
            <div class="arrowRight absolute">
                <img src="/images/corner.png" alt="右邊箭頭" />
            </div>
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="mb-5rem">
                    <h1 class="newsTitle m-0 text-center font-size-50px">
                        最新消息
                    </h1>
                    <!-- <button @click="testAlert">點擊開啟alert彈窗</button>
                    <button @click="testConfirm">點擊開啟confirm彈窗</button> -->
                    <div class="flex justify-center">
                        <img
                            class="w-250px"
                            src="/images/news.png"
                            alt="最新消息"
                        />
                    </div>
                </div>
                <div class="lg-flex">
                    <div class="w-100% lg-w-50% me-0 lg-me-1rem">
                        <div
                            class="mb-3rem lg-block flex lg-justify-start justify-center"
                        >
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
                                class="newsLink color-#555553 decoration-none"
                            >
                                <div class="w-full mt-1.8rem">
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
                                            <div
                                                class="flex font-size-12px items-center p-2"
                                            >
                                                <span
                                                    :class="{
                                                        'color-#4361EE':
                                                            item.Category === 1,
                                                        'color-#f72585':
                                                            item.Category === 2,
                                                    }"
                                                    >{{
                                                        item.StartTime.slice(
                                                            0,
                                                            10
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full pt-3 pb-3 newsItemLink">
                                        <div>
                                            <h2
                                                class="m-0 font-size-30px"
                                                :class="{
                                                    newsItem1:
                                                        item.Category === 1,
                                                    newsItem2:
                                                        item.Category === 2,
                                                }"
                                            >
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
                    <div
                        class="mt-4rem w-100% lg-w-50% ms-0 lg-ms-1rem lg-mt-1.5rem newsBoard"
                    >
                        <NewRatio />
                        <Matching class="mt-3rem" param="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-#fff pt-5rem pb-5 relative">
            <div class="waveBottom absolute"></div>
            <div class="arrowLeft absolute">
                <img src="/images/corner.png" alt="左邊箭頭" />
            </div>
            <div class="arrowRight absolute bottom-0">
                <img src="/images/corner.png" alt="右邊箭頭" />
            </div>
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="mb-5rem relative">
                    <h1 class="newsTitle m-0 text-center font-size-50px">
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
                <div
                    class="md-flex"
                    v-for="(item, index) in serviceList"
                    :key="index"
                    :class="{ serviceEven: index % 2 === 0 }"
                >
                    <div class="w-100% lg-w-50%">
                        <img class="w-100%" :src="item.img" :alt="item.title" />
                    </div>
                    <div
                        class="mt-4rem w-100% lg-w-50% lg-mt-1rem flex items-center"
                    >
                        <div
                            class="lg-ms-5 lg-me-5 ps-5 pe-5 lg-w-auto w-100% pb-20 serviceItemsContent"
                        >
                            <h2
                                class="serviceItemsTitle font-size-30px m-0 mb-5"
                            >
                                {{ item.title }}
                            </h2>
                            <h4 class="m-0 font-size-15px">
                                {{ item.detail }}
                            </h4>
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
import { useModalStore } from "../stores/useModal.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const store = useLoadStore();
const modalStore = useModalStore();
const alertModalStore = useAlertModalStore();
const openModal = modalStore.showModal;
const openAlertModal = alertModalStore.alertShowModal;
const setPageLoading = store.setPageLoading;
const route = useRoute();
const router = useRouter();

const newsList = ref([]);
const gameList = ref([]);
const bannerList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const assetsUrl = useCookie("_PmAssetsUrl");
const serchPlatformLogCookies = useCookie("_PmSearchLog");
const plaformLog = ref([]);
const showPlatformBox = ref(false);
const selectedGame = ref("");
let isBackNavigation = false;

// alert & confirm function
async function testConfirm() {
    await openModal(
        "標題",
        "內容",
        () => console.log("確定按鈕被點擊"), // 確定的回調
        () => console.log("取消按鈕被點擊")
    );
}
async function testAlert() {
    console.log(alertModalStore.alertShowModal);
    await openAlertModal("標題", "內容", () => console.log("確定按鈕被點擊")); // 確定的回調
}

// 切換下拉選單的顯示/隱藏
const togglePlatformBox = () => {
    showPlatformBox.value = !showPlatformBox.value;
    // 選單開啟時添加全域點擊監聽
    if (showPlatformBox.value) {
        document.addEventListener("click", handleClickOutside);
    } else {
        document.removeEventListener("click", handleClickOutside);
    }
};

// 選擇遊戲並關閉選單
const selectGame = (item) => {
    selectedGame.value = item.PlatformName; // 或 item.value 根據需要
    showPlatformBox.value = false; // 隱藏選單
};

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
];
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
// 找媒合搜尋
const searchToFindMatch = () => {
    if (selectedGame.value.trim() !== "") {
        updateNameArray(selectedGame.value.trim());
        selectedGame.value = ""; // 清空搜索框
    } else {
        return;
    }
    router.push({
        path: "/findmatch",
        query: {
            platformName: selectedGame.value || "", // 平台名稱
            keyword: keywordToSearch.value || "", // 關鍵字
        },
    });
};
// 搜尋紀錄
const searchLog = (item) => {
    router.push({
        path: "/findmatch",
        query: {
            platformName: item || "", // 平台名稱
        },
    });
};
const handleClickOutside = (event) => {
    const dropdown = document.querySelector(".platformBox");
    if (dropdown && !dropdown.contains(event.target)) {
        showPlatformBox.value = false;
    }
};

// 搜尋紀錄更新陣列並保存到 Cookie
const updateNameArray = (searchValue) => {
    const index = plaformLog.value.indexOf(searchValue);
    if (index !== -1) {
        // 如果搜索值已存在，移到陣列開頭
        console.log(plaformLog.value);
        plaformLog.value.splice(index, 1);
    }
    // 添加到陣列開頭
    plaformLog.value.unshift(searchValue);

    // 限制陣列長度（例如限制為 3）
    if (plaformLog.value.length > 6) {
        plaformLog.value.pop();
    }

    // 更新 Cookie
    serchPlatformLogCookies.value = JSON.stringify(plaformLog.value);
};

// 儲存滾動位置
const saveScrollPosition = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    sessionStorage.setItem(
        `scroll-position-${route.fullPath}`,
        scrollTop.toString()
    );
};

// 恢復滾動位置
const restoreScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem(
        `scroll-position-${route.fullPath}`
    );
    if (scrollPosition) {
        // 延遲滾動確保 DOM 已渲染
        setTimeout(() => {
            window.scrollTo({ top: Number(scrollPosition), behavior: "auto" });
        }, 50);
    }
};

// 監聽路由變化
watch(
    () => route.fullPath,
    (newPath, oldPath) => {
        if (oldPath) {
            // 儲存上一頁的滾動位置
            saveScrollPosition();
        }
        restoreScrollPosition();
    }
);

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

        if (!serchPlatformLogCookies.value) {
            plaformLog.value = [
                "包你發娛樂城",
                "滿貫大亨",
                "聚寶Online",
                "金好運娛樂城",
                "寶島娛樂城",
                "老子有錢",
            ];
            serchPlatformLogCookies.value = JSON.stringify(plaformLog.value);
        } else {
            plaformLog.value = serchPlatformLogCookies.value;
        }
        // 監聽「上一頁」按鈕
        window.addEventListener("popstate", () => {
            isBackNavigation = true; // 標記為「上一頁」返回
        });
        restoreScrollPosition();
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});
onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    saveScrollPosition();
});
</script>

<style scoped>
.headerLeft {
    width: 100%; /* 限制区域宽度 */
    height: auto;
    overflow: hidden; /* 隐藏超出部分 */
    clip-path: inset(0 0 0 0); /* 裁剪区域 */
}

.headerLeft img {
    width: 85%; /* 设置图片宽度 */
    max-width: 1630px;
    min-width: 980px;
}

/* 搜尋欄位樣式 */
.platformName:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.storeNameBox {
    position: relative;
    padding: 1px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 50px;
    border: none;
}
.storeName {
    position: relative;
    background: #fff;
    border-radius: 50px;
    border: none;
    text-indent: 1rem;
}
.storeEntry:focus-visible {
    outline: none;
}
.storeEntry {
    border: none;
    color: #8d8d8d;
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

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.bannerBox {
    position: relative;
    /* padding: 3px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 1rem; */
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
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
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
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.waveTop {
    background-image: url("/images/waveBottom.svg");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100%;
    top: -295px;
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
.newsAllBtn:hover {
    border: 1px solid #4361ee;
    background: #fff;
    color: #4361ee;
}
.newsSystemBtn:hover {
    border: 1px solid #7b2cbf;
    background: #7b2cbf;
    color: #fff;
}
.newsActivityBtn:hover {
    border: 1px solid #f72585;
    background: #f72585;
    color: #fff;
}
.newsLink:hover .newsItem1 {
    background: linear-gradient(to right, #7b2cbf, #4361ee);
    background: -webkit-linear-gradient(to right, #7b2cbf, #4361ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsLink:hover .newsItem2 {
    background: linear-gradient(to right, #7b2cbf, #f72585);
    background: -webkit-linear-gradient(to right, #7b2cbf, #f72585);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsItem1 {
    background: linear-gradient(to right, #4361ee, #7b2cbf);
    background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsItem2 {
    background: linear-gradient(to right, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.newsItemLink {
    border-bottom: 1px solid rgba(67, 97, 238, 0.3);
}
.newsBoard {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.serviceEven {
    flex-direction: row-reverse;
    margin: 2rem 0;
}
.serviceItemsTitle {
    background: linear-gradient(to right, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to right, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
.serviceItemsContent {
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
.arrowLeft {
    top: -150px;
}
.arrowRight {
    transform: rotate(180deg);
    right: 0;
    top: -180px;
}
:deep(.el-carousel) {
    position: static;
}
:deep(.el-carousel__arrow--left),
:deep(.el-carousel__arrow--right) {
    background: rgba(0, 0, 0, 0);
}
:deep(.el-carousel__arrow--left > .el-icon),
:deep(.el-carousel__arrow--right > .el-icon) {
    font-size: 2.5rem;
}
:deep(.el-carousel__button) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
:deep(.el-carousel__indicators--horizontal) {
    bottom: -45px;
}
.moreGameBtn {
    padding: 1rem 2rem;
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
}
.gameSelect {
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    text-indent: 1rem;
}
.platformBox {
    position: relative;
    padding: 1px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 25px;
    border: none;
}
.platformBoxContent {
    position: relative;
    background: #fafafa;
    border-radius: 25px;
    border: none;
    text-indent: 1rem;
    width: 100%;
    color: #f72585;
}
.platformItem {
    border-radius: 25px;
}
.platformItem:hover {
    background-color: #f72585;
    color: #fff;
}
.gameBox {
    background: linear-gradient(to bottom, #fff, #f6a2ff);
    border-radius: 10px;
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
.gameContent {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.gameBox0,
.gameBox2 {
    width: calc(50% - 1rem);
    margin-right: 1rem;
    margin-bottom: 2rem;
}
.gameBox1,
.gameBox3 {
    width: calc(50% - 1rem);
    margin-left: 1rem;
    margin-bottom: 2rem;
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
.gameLogo {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.moreGameBtnBox {
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
}
.moreGameBtn:hover {
    background: #fff;
    color: #f72585;
}
.searchLogBtn {
    background: rgba(0, 0, 0, 0);
    color: #f72585;
    border: none;
    padding: 0;
    cursor: pointer;
    margin: 0.2rem;
    font-size: 15px;
    font-weight: 600;
}
@media screen and (max-width: 1024px) {
    .arrowRight {
        transform: rotate(180deg);
        right: 0;
        top: 0;
    }
}
@media screen and (max-width: 768px) {
    .gameBox0,
    .gameBox2 {
        width: 100%;
        margin-right: 0rem;
        margin-bottom: 2rem;
    }
    .gameBox1,
    .gameBox3 {
        width: 100%;
        margin-left: 0rem;
        margin-bottom: 2rem;
    }
}
</style>
