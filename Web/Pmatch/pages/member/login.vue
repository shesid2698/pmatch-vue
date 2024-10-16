<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossorigin="anonymous"
    />

    <!-- <div class="mt-7rem max-w-1300px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            title
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">登入</span>
            </div>
            麵包屑
            <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem> 會員登入 </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div>
        </div>
    </div> -->
    <div class="ccontainer">
        <div class="login-card md:w-378px">
            <!-- 登入Title -->
            <div class="flex flex-items-center">
                <div class="w-25px h-20px bg-#1a6db4 mr-8px"></div>
                <div class="text-20px">登入</div>
            </div>

            <!-- 頁面切換鈕 -->
            <div class="flex flex-items-center mt-24px">
                <div class="flex-1">
                    <button
                        class="font-sans w-100% bg-#e93470 outline-none border border-solid border-[#e93470] border-1 hover:bg-#bb2d3b transition duration-200 p-y-1.5 p-x-3 text-16px text-white rounded-1 cursor-pointer"
                    >
                        會員登入
                    </button>
                </div>
                <div class="w-10px"></div>
                <div class="flex-1">
                    <button
                        class="w-100% outline-none bg-white border-1 p-y-1.5 p-x-3 text-16px rounded-1 cursor-pointer text-[#212529] font-sans"
                    >
                        媒合商登入
                    </button>
                </div>
            </div>

            <div class="mt-15px">
                <div class="mb-5px">登入帳號</div>
                <input
                    type="text"
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                />
            </div>

            <div class="mt-15px">
                <div class="mb-5px">密碼</div>
                <div class="relative">
                    <input
                        type="password"
                        ref="i_password"
                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                    />
                    <div
                        @click="turnInputType"
                        class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%"
                    >
                        <i ref="eyes" class="fa-solid fa-eye text-gray"></i>
                    </div>
                </div>
            </div>
            <div v-if="!hasToken" class="w-100% mt-15px">
                <!-- <VueTurnstile site-key="1x00000000000000000000AA" size="normal" @update:model-value="onVerify"></VueTurnstile> -->
            </div>
            <!-- 登入/註冊 -->
            <div class="mt-15px">
                <div class="flex">
                    <div class="flex-1">
                        <button
                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:opacity-70 transition duration-200 cursor-pointer"
                        >
                            註冊
                        </button>
                    </div>
                    <div class="w-10px"></div>
                    <div class="flex-1">
                        <button
                            :disabled="!loginToken"
                            class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer"
                        >
                            登入
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-15px text-center">
                已經註冊?<NuxtLink
                    to="#"
                    class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline"
                    >忘記密碼</NuxtLink
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import VueTurnstile from 'vue-turnstile';
const eyes = ref(null);
const i_password = ref(null);
const loginToken = useCookie("loginToken");
const hasToken = ref(loginToken.value !== undefined);
const turnInputType = () => {
    if (i_password.value.type === "password") {
        i_password.value.type = "text";
        eyes.value.classList.remove("fa-eye");
        eyes.value.classList.add("fa-eye-slash");
    } else {
        i_password.value.type = "password";
        eyes.value.classList.remove("fa-eye-slash");
        eyes.value.classList.add("fa-eye");
    }
};
const onVerify = (tokenValue) => {
    loginToken.value = tokenValue;
    setTimeout(() => {
        hasToken.value = true;
    }, 1000);
};
</script>

<style scoped>
.ccontainer {
    height: calc(100vh - 110px);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.font-sans {
    font-family: Arial, "Noto Sans TC", sans-serif;
}
</style>
