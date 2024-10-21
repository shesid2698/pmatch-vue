<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            <!-- title -->
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">聯絡我們</span>
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
        <div>
            <p class="m-0 mb-3">會員帳號： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">遊戲平台： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">遊戲暱稱： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">會員帳號： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">聯絡人姓名： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">聯絡人信箱： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">聯絡人電話：</p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">問題類別： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">問題主題： <span class="color-red">*</span></p>
            <input class="entryCol w-300px rounded-5px h-25px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem mb-3" type="text">
            <p class="m-0 mb-3">問題描述：</p>
            <textarea class="entryCol w-300px rounded-5px h-150px ps-1rem pe-1rem pt-.2rem pb-.2rem font-size-1rem"/>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.entryCol {
    border: 1px solid #ccc;
}
.entryCol:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
</style>