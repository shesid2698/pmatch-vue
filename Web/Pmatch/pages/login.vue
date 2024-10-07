<template>
    <div class="mt-7rem max-w-1300px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            <!-- title -->
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">登入</span>
            </div>
            <!-- 麵包屑 -->
            <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem> 會員登入 </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
:deep(.el-icon) {
    z-index: -1;
}
</style>