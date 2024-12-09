<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            <!-- title -->
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">委託媒合</span>
            </div>
            <!-- 麵包屑 (新版目前沒有 先不刪以防後續需要) -->
            <!-- <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem> 找媒合 </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div> -->
        </div>
        <!-- 搜尋列 -->
        <div class="mb-6 md-flex block items-center justify-center">
            <div class="flex items-center">
                <div class="flex items-center w-100%">
                    <div class="w-100%">
                        <select
                            class="platformName md-w-270px w-100% h-43px font-size-1rem b-#a9d8f8 rounded-5px p-5px"
                            v-model="selectedPlatform"
                        >
                            <option value="">選擇遊戲...</option>
                            <option value="滿貫大亨">滿貫大亨</option>
                            <option value="錢街Online">錢街Online</option>
                            <option value="包你發娛樂城">包你發娛樂城</option>
                        </select>
                    </div>
                </div>
                <div class="md-ms-3 md-mt-0 mt-3 flex w-100%">
                    <div class="flex items-center w-100%">
                        <div class="flex w-100%">
                            <div class="w-100%">
                                <input
                                    v-model="searchQuery"
                                    class="storeName md-ms-3 w-100% md-w-270px h-36px p-0 rounded-5px font-size-1rem p-3px"
                                    type="text"
                                    placeholder="輸入關鍵字..."
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
                    <input type="checkbox" class="w-20px h-20px" />
                    <span>查看已簽約媒合商</span>
                </div>
                <div>
                    <button class="ms-3 w-100px">搜尋</button>
                </div>
            </div>
        </div>
        <div class="mb-6 flex justify-center">
            <div class="p-5 w-33%">滿貫大亨圖</div>
            <Matching class="w-33%" />
            <NewRatio class="w-33%" />
        </div>
        <!-- 各媒合商 -->
        <div class="flex relative w-100%">
            <div class="w-75% overflow-y-auto">
                <div class="flex">
                    <div class="storeTitle w-full flex bg-#D5ECFF pt-2 pb-2">
                        <div class="w-75% text-center mainContent">
                            <span>商家資訊</span>
                        </div>
                        <div class="w-25% text-center">
                            <span>簽約狀況</span>
                        </div>
                    </div>
                    <div
                        class="storeTitle w-150px flex bg-#D5ECFF ms-3 pt-2 pb-2"
                    >
                        <div class="w-full text-center mainContent">
                            <span>評分</span>
                        </div>
                    </div>
                </div>
                <div class="flex" v-for="(item, index) in filteredStores"
                            :key="index">
                    <div class="w-full">
                        <div
                            class="storeDetail flex border-b b-b-solid b-#D5ECFF"
                            
                        >
                            <NuxtLink
                                :to="`/findmatch/${item.Id}`"
                                class="decoration-none color-#000 w-75%"
                            >
                                <div class="">
                                    <div class="md-flex block items-center p-3">
                                        <div
                                            class="flex justify-start md-mb-0 mb-5"
                                        >
                                            <img
                                                class="storeImg w-130px"
                                                :src="item.img"
                                                :alt="item.Name"
                                            />
                                        </div>
                                        <div class="md-ms-2rem ms-0">
                                            <div class="mb-3">
                                                <span
                                                    class="fw-600 color-#496BBB"
                                                    >{{ item.Name }}</span
                                                >
                                            </div>
                                            <div class="mb-2">
                                                <span>遊戲平台 : </span>
                                                <span v-if="item.GamePlatforms.length > 0">{{ filteredProcessedGamePlatforms[index]}}</span>
                                            </div>
                                            <div class="mb-2">
                                                <span>商店簡介 : </span>
                                                <span>{{
                                                    item.About
                                                }}</span>
                                            </div>
                                            <div class="flex items-center">
                                                <span>聯絡方式 : </span>

                                                <div
                                                    class="ms-2 flex"
                                                >
                                                    <NuxtLink class="flex items-center ms-1 me-1" v-if="item.FB" :to="item.FB">
                                                        <img class="w-20px h-20px" src="/images/facebook.png" alt="">
                                                    </NuxtLink>
                                                    <NuxtLink class="flex items-center ms-1 me-1" v-if="item.LineId" :to="item.LineId">
                                                        <img class="w-20px h-20px" src="/images/line.png" alt="">
                                                    </NuxtLink>
                                                    <NuxtLink class="flex items-center ms-1 me-1" v-if="item.IGId" :to="item.IGId">
                                                        <img class="w-20px h-20px" src="/images/instagram.png" alt="">
                                                    </NuxtLink>
                                                    <NuxtLink class="flex items-center ms-1 me-1" v-if="item.TwitterId" :to="item.TwitterId">
                                                        <div class="bg-#000 w-20px h-20px rounded-50% color-#fff text-center">x</div>
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                            <div class="w-25% flex justify-center items-center">
                                <el-button
                                    class="border-none color-#aaa w-95px h-40px rounded-5px"
                                    plain
                                    @click="item.dialogVisible = true"
                                >
                                    檢視合約
                                </el-button>
                                <el-dialog
                                    v-model="item.dialogVisible"
                                    title="合約服務條款"
                                    width="500"
                                    :close-on-click-modal="false"
                                >
                                    <div v-html="item.ContractConetnt"></div>
                                    <template #footer>
                                        <div class="dialog-footer">
                                            <el-button
                                                @click="
                                                    item.dialogVisible = false
                                                "
                                                >取消</el-button
                                            >
                                            <el-button
                                                type="primary"
                                                @click="
                                                    item.dialogVisible = false
                                                "
                                            >
                                                同意
                                            </el-button>
                                        </div>
                                    </template>
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                    <div class="w-150px ms-3">0 0 0 0 0</div>
                </div>
            </div>
            <div class="sideBar">
                <div class="mb-5">
                    <div
                        class="bg-#50b0ff flex justify-center pt-2 pb-2 totalMatchNumber"
                    >
                        <span class="color-#fff fw-600">累計委託媒合筆數</span>
                    </div>
                    <div
                        class="flex justify-center pt-2 pb-2 border-solid b-1px b-#50b0ff matchNumber"
                    >
                        <div>
                            <span>0</span>
                            <span>筆</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center mb-3">
                        <img
                            class="w-20px h-20px"
                            src="/images/weekRanking.png"
                            alt="週排行icon"
                        />
                        <span class="fw-600 ms-3">週媒合排行榜</span>
                    </div>
                    <div class="mb-5">
                        <div
                            class="bg-#d5ecff flex justify-center pt-2 pb-2 totalMatchNumber flex justify-around"
                        >
                            <div class="flex justify-center w-100%">
                                <span class="fw-600">遊戲平台</span>
                            </div>
                            <div class="flex justify-center w-100%">
                                <span class="fw-600">媒合活躍度</span>
                            </div>
                        </div>
                    </div>
                    <!-- 點卡先關 後面有要再開 -->
                    <!-- <div class="border-solid b-1px p-3 rounded-5px b-#ccc">
                        <div
                            class="flex items-center mb-3 border-b-solid b-1px b-#ccc pb-3"
                        >
                            <img
                                class="w-20px h-20px"
                                src="/images/sellHot.png"
                                alt="週排行icon"
                            />
                            <span class="fw-600 ms-3">週媒合排行榜</span>
                        </div>
                        <div class="flex overflow-x-auto">
                            <div
                                class="m-3"
                                v-for="item of mycard"
                                :key="item.key"
                            >
                                <div>
                                    <img
                                        class="w-110px"
                                        :src="item.img"
                                        alt=""
                                    />
                                </div>
                                <div class="mt-3 mb-3">
                                    <button class="joinCartBtn">
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入的東西
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";
import { ElMessageBox } from "element-plus";

const data = ref("");
const token = ref("");
const storesList = ref([]);
const { $axios } = useNuxtApp();

// 獲得jwt token
async function fetchToken() {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) {
        token.value = savedToken;
        return; // 如果 LocalStorage 有 token，直接使用
    }

    // 若 LocalStorage 沒有 token，調用 API 獲取
    const { data, error } = await useFetch("/api/guestToken", {
        params: {
            strUserName: "",
            iExpireMinutes: 10,
        },
    });

    if (error.value) {
        console.error("Token 生成失敗:", error.value);
    } else {
        token.value = data.value.token;
        localStorage.setItem("jwtToken", token.value); // 儲存到 LocalStorage
    }
}

// 取得GetStoreList
async function fetchStoresListData(num) {
    await fetchToken();

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetStoreList",
            {
                IsFront: true,
            },
            {
                headers: {
                    Authorization: token.value, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storesList.value = response.data.Data;
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
        await fetchToken(); // 確保 token 存在
        await fetchStoresListData([]); // 再獲取資料
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

const processedGamePlatforms = computed(() => {
    if (!storesList.value.length) return []; // 如果資料是空的，回傳空陣列

    return storesList.value.map((store) => {
        // 如果 `GamePlatforms` 不存在或是空的，回傳空字串
        if (!store.GamePlatforms || !store.GamePlatforms.length) return "";

        // 提取 `GamePlatform`，過濾重複並以逗號分隔
        const platformsSet = new Set(store.GamePlatforms.map((platform) => platform.GamePlatform));
        console.log(platformsSet);
        return Array.from(platformsSet).join(", "); // 轉換為陣列後用逗號分隔
    });
});



const dialogVisible = ref(false);
// 搜尋及下拉選單篩選
const stores = ref(
    Object.values(storesList.value).map((store) => ({
        ...store,
        dialogVisible: false, // 初始化每個商店的彈窗狀態
    }))
);
const searchQuery = ref("");
const selectedPlatform = ref("");

const filteredStores = computed(() => {
    let filtered = storesList.value;
    if (searchQuery.value) {
        const Query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((stores) =>
            stores.Name.toLowerCase().includes(Query)
        );
    }
    if (selectedPlatform.value) {
        filtered = filtered.filter((store) => {
            const platformsSet = new Set(
                store.GamePlatforms.map((platform) => platform.GamePlatform)
            );
            const platforms = Array.from(platformsSet).join(", ");
            return platforms === selectedPlatform.value;
        });
    }

    return filtered;
});

const filteredProcessedGamePlatforms = computed(() => {
    return filteredStores.value.map((store) => {
        if (!store.GamePlatforms || !store.GamePlatforms.length) return "";

        const platformsSet = new Set(
            store.GamePlatforms.map((platform) => platform.GamePlatform)
        );

        return Array.from(platformsSet).join(", "); // 轉換為陣列後用逗號分隔
    });
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
/* 商家資訊 */
.storeTitle {
    border-radius: 10px 10px 0 0;
}
.storeDetail:hover {
    background-color: #f2f9fd;
}
.storeImg {
    border: 2px solid #f2f9fd;
    border-radius: 1rem;
}
/* 側邊欄 */
.sideBar {
    width: 23%;
    position: fixed;
    top: 0;
    right: 8px;
    margin-top: 14.5rem;
}
.totalMatchNumber {
    border-radius: 5px 5px 0 0;
}
.matchNumber {
    border-radius: 0 0 5px 5px;
}
.joinCartBtn {
    color: #e93470;
    border: 1px solid #e93470;
    border-radius: 5px;
    padding: 0.3rem;
    width: 110px;
    background-color: rgba(0, 0, 0, 0);
}
.joinCartBtn:hover {
    color: #fff;
    background-color: #e93470;
}
:deep(.el-overlay) {
    background-color: rgba(0, 0, 0, 0.1);
}
:deep(.el-dialog) {
    box-shadow: none;
    border-radius: 10px;
}
@media screen and (min-width: 1300px) {
    .sideBar {
        position: absolute;
        margin-top: 0rem;
        top: 0;
        right: 0;
        height: 300px;
    }
}
</style>