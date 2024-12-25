<template>
    <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-7 flex items-center justify-between">
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">關於商店</span>
            </div>
            <!-- 麵包屑 (新版目前沒有 先不刪以防後續需要) -->
            <!-- <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem :to="{ path: '/findmatch' }">
                        找媒合
                    </ElBreadcrumbItem>
                    <ElBreadcrumbItem> {{ pageTitle }} </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div> -->
        </div>
        <div>
            <div class="flex items-center mb-2rem pb-2rem">
                <div class="flex justify-start md-mb-0 mb-5">
                    <img class="w-200px" />
                </div>
                <div class="ms-2rem">
                    <div class="mb-3">
                        <span class="font-size-1.2rem fw-600">商店名稱 : </span>
                        <span class="font-size-1.2rem fw-600" v-if="storesItem">
                            {{ storesItem.Name }}
                        </span>
                    </div>
                    <div class="mb-2">
                        <span class="fw-600">遊戲平台 : </span>
                        <span>{{ filteredPlatform }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="fw-600">商店簡介 : </span>
                        <span v-if="storesItem">{{ storesItem.About }}</span>
                    </div>
                    <div class="flex items-center">
                        <span class="fw-600">聯絡方式 : </span>
                        <div class="ms-2 flex">
                            <NuxtLink
                                class="flex items-center ms-1 me-1"
                                v-if="storesItem"
                                :to="storesItem.FB"
                            >
                                <img
                                    class="w-20px h-20px"
                                    src="/images/facebook.png"
                                    alt=""
                                />
                            </NuxtLink>
                            <NuxtLink
                                class="flex items-center ms-1 me-1"
                                v-if="storesItem"
                                :to="storesItem.LineId"
                            >
                                <img
                                    class="w-20px h-20px"
                                    src="/images/line.png"
                                    alt=""
                                />
                            </NuxtLink>
                            <NuxtLink
                                class="flex items-center ms-1 me-1"
                                v-if="storesItem"
                                :to="storesItem.IGId"
                            >
                                <img
                                    class="w-20px h-20px"
                                    src="/images/instagram.png"
                                    alt=""
                                />
                            </NuxtLink>
                            <NuxtLink
                                class="flex items-center ms-1 me-1"
                                v-if="storesItem"
                                :to="storesItem.TwitterId"
                            >
                                <div
                                    class="bg-#000 w-20px h-20px rounded-50% color-#fff text-center"
                                >
                                    x
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 先不刪 設計圖出來之後可能會改 -->
            <!-- <div>
                <div v-for="(item, index) in filteredPlatformArray" :key="index">
                    <button>{{item}}</button>
                </div>
            </div> -->
            <div>
                <el-tabs
                    v-model="activeName"
                    type="card"
                    class="demo-tabs"
                    @tab-click="handleClick"
                >
                    <el-tab-pane label="開單" name="first">
                        <div class="b-solid border-1 p-5 b-#212529">
                            <form action="#" @submit="sendAccList">
                                <div>
                                    <p>遊戲平台 :</p>
                                    <select v-model="accPlatformName" required>
                                        <option
                                            v-for="(
                                                item, index
                                            ) in filteredPlatformArray"
                                            :key="index"
                                            :value="item"
                                        >
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <p>遊戲暱稱 :</p>
                                    <input
                                        required
                                        v-model="accMemberName"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <p>交易種類 :</p>
                                    <select v-model="accTransaction" required>
                                        <option value="10">委買</option>
                                        <option value="12">委賣</option>
                                    </select>
                                </div>
                                <div>
                                    <p>委託金額 :</p>
                                    <input
                                        required
                                        v-model="accPatch"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <p>希望付款方式 :</p>
                                    <select v-model="accPayMode" required>
                                        <option value="1">超商代收</option>
                                        <option value="2">銀行轉帳</option>
                                    </select>
                                </div>
                                <div>
                                    <p>聯絡資料 :</p>
                                    <input
                                        v-model="accPhone"
                                        type="text"
                                        required
                                    />
                                </div>
                                <ElButton
                                    class="border-none color-#aaa w-95px h-40px rounded-5px"
                                    plain
                                    @click="dialogVisible = true"
                                >
                                    檢視合約
                                </ElButton>
                                <ElDialog
                                    v-model="dialogVisible"
                                    title="合約服務條款"
                                    width="500"
                                    :close-on-click-modal="false"
                                >
                                    <div
                                        v-if="storesItem"
                                        v-html="storesItem.ContractConetnt"
                                    ></div>
                                    <template #footer>
                                        <div class="dialog-footer">
                                            <ElButton
                                                type="primary"
                                                @click="dialogVisible = false"
                                            >
                                                同意
                                            </ElButton>
                                        </div>
                                    </template>
                                </ElDialog>
                                <button class="mt-5">送出</button>
                            </form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="問與答" name="second">
                        <div class="b-solid border-1 b-#212529">
                            <div class="p-5" v-if="storesItem != null">
                                <div
                                    v-if="storesItem.StoreQAs.length > 0"
                                    v-for="(item, index) in storesItem.StoreQAs"
                                    :key="index"
                                >
                                    <p>問 : {{ item.Question }}</p>
                                    <p>答 : {{ item.Answer }}</p>
                                </div>
                                <div v-else>
                                    <p>尚未有提問資料...</p>
                                </div>
                            </div>
                            <div class="p-5 bg-#ccc">
                                <p class="m-0 mb-1rem">我要提問</p>
                                <textarea
                                    class="w-100% h-5rem p-0 mb-1rem"
                                    v-model="question"
                                ></textarea>
                                <div class="w-100% flex justify-end">
                                    <button
                                        class="w-200px h-38px bg-#1A6DB4 color-#fff border-none fw-bold font-size-1rem"
                                        @click="sendQAList"
                                    >
                                        送出
                                    </button>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";
import { ElButton } from "element-plus";
import { ElDialog } from "element-plus";
import { ElMessageBox } from "element-plus";

// loading page
import { useLoadStore } from "../stores/loading.js";
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const route = useRoute();
const routeParamId = route.params.id;
const storesItem = ref(null);
const storeQAList = ref([]);
const isLoading = ref(true); // 加載狀態
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const MemberIdCookie = useCookie("_PmMemberId");
const dialogVisible = ref(false);

let question = ref("");

let accPlatformName = ref("");
let accMemberName = ref("");
let accTransaction = ref("10");
let accPatch = ref("");
let accPayMode = ref("1");
let accPhone = ref("");

// 取得GetNewsDetail
async function fetchStoresDetailData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetStoreDetail",
            {
                IsFront: true,
                StoreId: routeParamId,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storesItem.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}

onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                await fetchStoresDetailData(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchStoresDetailData(token);
            }
        }
        await setPageLoading(false);
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

const activeName = ref("first");

const handleClick = (tab, event) => {};

// 篩選後的載台字串
const filteredPlatform = computed(() => {
    if (!storesItem.value || !storesItem.value.StoreProducts) {
        return; // 如果資料尚未加載，返回空陣列
    }

    // 對 StoreProducts 進行過濾並提取平台資訊
    const platformsSet = new Set(
        storesItem.value.StoreProducts.map((product) => product.GamePlatform)
    );

    // 返回格式化後的平臺列表
    return Array.from(platformsSet).join(", ");
});

// 篩選後的載台陣列
const filteredPlatformArray = computed(() => {
    if (!filteredPlatform.value) {
        return [];
    }

    // 使用 split 將逗號分隔的字串轉換為陣列，並移除多餘空白
    return filteredPlatform.value.split(",").map((item) => item.trim());
});
async function sendQAList() {
    if (userToken.value === "" || userToken.value === undefined) {
        alert("請先登入會員");
    } else {
        await sendQAApi(userToken.value);
    }
}
async function sendAccList(event) {
    event.preventDefault();
    if (userToken.value === "" || userToken.value === undefined) {
        alert("請先登入會員");
    } else {
        await createAccApi(userToken.value);
    }
}
// 送出問與答列表
async function sendQAApi(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/CreateOrUpdateStoreQAData",
            {
                Data: [
                    {
                        Id: 0,
                        StoreId: routeParamId,
                        MemberId: MemberIdCookie.value,
                        Question: question.value,
                    },
                ],
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storeQAList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 開單
async function createAccApi(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/CreateAccounting",
            {
                SqlIndex: storesItem.value.DB,
                TeamId: storesItem.value.Teamid,
                GamePlatformName: accPlatformName.value,
                MemberCharacterName: accMemberName.value,
                TransactionMode: Number(accTransaction.value),
                Patch: Number(accPatch.value),
                PayMode: Number(accPayMode.value),
                Phone: accPhone.value,
                PmatchMemberId: MemberIdCookie.value,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storeQAList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
watch(
    filteredPlatform,
    (newValue) => {
        if (newValue) {
            accPlatformName.value = newValue;
        }
    },
    { immediate: true } // 立刻執行一次，將初始值設置進去
);
</script>

<style scoped>
:deep(.el-icon) {
    z-index: -1;
}
</style>