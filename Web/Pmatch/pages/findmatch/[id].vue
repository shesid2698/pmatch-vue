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
            <component :is="pageComponent" />
        </div>
    </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";

const matchStore = {
    pokemonBank: {
        id: "0",
        title: "寶可夢銀行",
        component: resolveComponent("MatchPokemonBank"),
    },
    asaliGoldFlow: {
        id: "1",
        title: "阿莎力金流#8500",
        component: resolveComponent("MatchAsaliGoldFlow"),
    },
    goodMongKokBank: {
        id: "2",
        title: "好旺角銀行",
        component: resolveComponent("MatchGoodMongKokBank"),
    },
    grandSlamMoney: {
        id: "3",
        title: "滿貫金流",
        component: resolveComponent("MatchGrandSlamMoney"),
    },
};

const route = useRoute();
const pageName = matchStore[route.params.id];
const pageTitle = pageName.title;
const pageComponent = pageName.component;
</script>

<style scoped>
:deep(.el-icon) {
    z-index: -1;
}
</style>