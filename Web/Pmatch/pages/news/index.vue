<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            <!-- title -->
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">幫助中心</span>
            </div>
            <!-- 麵包屑 (新版目前沒有 先不刪以防後續需要) -->
            <!-- <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem> 幫助中心 </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div> -->
        </div>
        <!-- 搜尋列 -->
        <div class="mb-6 lg-flex block">
            <div class="lg-mt-0 mt-3 flex w-100%">
                <div class="flex items-center w-100%">
                    <div class="flex w-100% relative">
                        <div class="w-100% relative">
                            <input
                                v-model="searchQuery"
                                class="storeName w-100% h-36px p-0 border-none bg-#eee font-size-1rem rounded-10px"
                                type="text"
                                placeholder="搜尋關鍵字..."
                            />
                        </div>
                        <div class="absolute">
                            <button class="h-38px searchBtn">
                                <svg
                                    class="w-25px"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 512 512"
                                    enable-background="new 0 0 512 512"
                                    xml:space="preserve"
                                    fill="#6c757d"
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
        </div>
        <!-- 幫助中心問&答 -->
        <div>
            <div class="flex flex-wrap">
                <NuxtLink
                    v-for="(item, index) in filteredHelpItems"
                    :key="item.Id"
                    :class="index % 2 === 0 ? 'bg-#FF83AD' : 'bg-#7DC4FF'"
                    class="helpBtn decoration-none color-#fff"
                    :to="`/news/${item.Id}`"
                >
                    <h3 class="decoration-none">{{ item.Title }}</h3>
                    <p class="m-0 decoration-none">{{ item.Summary }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入的東西
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";
const newsList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 取得GetNewsList
async function fetchNewsListData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetNewsList",
            {
                Categorys: [1,2],
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

onMounted(async () => {
    try {
        if (userToken.value != "" && userToken.value != undefined) {

            const token = userToken.value;
            if (token != "") {
                fetchNewsListData(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            console.log("token",token);
            if (token != "") {
                fetchNewsListData(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

// 搜尋關鍵字
const searchQuery = ref("");
const filteredHelpItems = computed(() => {
    let filtered = newsList.value;
    if (searchQuery.value) {
        const Query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((help) =>
            help.Title.toLowerCase().includes(Query)
        );
    }
    return filtered;
});
</script>

<style scoped>
.storeName {
    padding-left: 40px;
    box-sizing: border-box;
}
.storeName:focus {
    border-color: #3092fa;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.searchBtn {
    border: none;
    background-color: rgba(0, 0, 0, 0);
}
:deep(.el-icon) {
    z-index: -1;
}
.helpBtn {
    width: calc(100% / 4 - 2rem);
    height: 250px;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 50px 50px 0 50px;
}
@media screen and (max-width: 1024px) {
    .helpBtn {
        width: calc(100% / 3 - 2rem);
    }
}
@media screen and (max-width: 768px) {
    .helpBtn {
        width: calc(100% / 2 - 2rem);
    }
}
@media screen and (max-width: 480px) {
    .helpBtn {
        width: calc(100% / 1);
        margin: 0.5rem 0;
    }
}
</style>
