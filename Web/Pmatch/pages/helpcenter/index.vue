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
            <div class="flex">
                <NuxtLink
                    v-for="(item, index) in helpItems"
                    :key="item.id"
                    :class=" index % 2 === 0 ? 'bg-blue' : 'bg-red' "
                    class="helpBtn border-none bg-blue p-5 m-2 color-#fff"
                    :to="item.link"
                >
                    <h6>{{ item.title }}</h6>
                    <p class="m-0">{{ item.detail }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";

const helpItems = [
    {
        id: "0",
        title: "help111",
        link: "/helpcenter/help111",
    },
    {
        id: "1",
        title: "help222",
        link: "/helpcenter/help222",
    },
    {
        id: "2",
        title: "help333",
        link: "/helpcenter/help333",
    },
    {
        id: "3",
        title: "help444",
        link: "/helpcenter/help444",
    },
];

// const stores = Object.values(matchStore);

const searchQuery = ref("");
const selectedPlatform = ref("");

const filteredStores = computed(() => {
    let filtered = stores;
    if (searchQuery.value) {
        const Query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((stores) =>
            stores.title.toLowerCase().includes(Query)
        );
    }
    if (selectedPlatform.value) {
        filtered = filtered.filter(
            (stores) => stores.platform === selectedPlatform.value
        );
    }
    return filtered;
});
</script>

<style scoped>
.storeName{
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
    width: calc(100% / 4);
    height: 250px;
    border-radius: 50px 50px 0 50px;
}
</style>