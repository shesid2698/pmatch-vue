<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
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
            <div>
                <el-tabs
                    v-model="activeName"
                    type="card"
                    class="demo-tabs"
                    @tab-click="handleClick"
                >
                    <el-tab-pane label="開單" name="first">
                        <div class="b-solid border-1 p-5 b-#212529">
                            <p class="m-0 mb-4 mt-4"></p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="問與答" name="second">
                        <div class="b-solid border-1 b-#212529">
                            <div class="p-5">
                                <p>尚未有提問資料...</p>
                            </div>
                            <div class="p-5 bg-#ccc">
                                <p class="m-0 mb-1rem">我要提問</p>
                                <textarea
                                    class="w-100% h-5rem p-0 mb-1rem"
                                ></textarea>
                                <div class="w-100% flex justify-end">
                                    <button
                                        class="w-200px h-38px bg-#1A6DB4 color-#fff border-none fw-bold font-size-1rem"
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

const route = useRoute();
const routeParamId = route.params.id;
const storesItem = ref(null);
const isLoading = ref(true); // 加載狀態
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

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
    } finally {
        isLoading.value = false; // 完成後無論成功或失敗，都結束加載
    }
}

onMounted(async () => {
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            
            const token = userToken.value;
            if (token != "") {
                fetchStoresDetailData(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchStoresDetailData(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

const activeName = ref("first");

const handleClick = (tab, event) => {
    console.log(tab, event);
};

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
</script>

<style scoped>
:deep(.el-icon) {
    z-index: -1;
}
</style>