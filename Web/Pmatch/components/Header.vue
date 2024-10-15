<template>
    <div class="flex justify-center fixed w-100% bg-white headerBox top-0 left-0 h-80px">
        <div class="flex justify-between items-center max-w-1320px w-100% ps-3 pe-3 position-relative">
            <!-- Logo -->
            <div class="w-100% flex items-center">
                <div @click="navigateIndex"
                     class="cursor-pointer">
                    <img class="lg-w-240px w-140px"
                         src="/images/logo.png"
                         alt="pmatch的logo" />
                </div>
                <div>
                    <h1 class="m-0 ms-3 ps-3 lg-font-size-1.5rem font-size-1.2rem color-#888 b-l-solid">
                        遊戲道具媒合網
                    </h1>
                </div>
            </div>
            <div class="lg-none lg-w-100% flex justify-end">
                <!-- PC版導航連結 -->
                <div class="hidden lg-block"
                     v-for="item of headerLink"
                     :key="item.id">
                    <div class="relative"
                         @click="handleDropdown(item)">
                        <NuxtLink v-show="!item.dropdown"
                                  :title="item.title"
                                  :to="item.link"
                                  class="color-black decoration-none ms-1.5rem font-bold"
                                  :alt="item.title">
                            {{ item.title }}
                        </NuxtLink>
                        <span v-show="item.dropdown"
                              class="color-black decoration-none ms-1.5rem font-bold w-100% cursor-pointer"
                              :alt="item.title">
                            {{ item.title }}
                        </span>
                        <div v-if="item.showDropdown===true"
                             class="loginDropdown bg-white p-2 mt-1">
                            <NuxtLink to="/member/login"
                                      class="block p-2">登入</NuxtLink>
                            <NuxtLink to="/register"
                                      class="block p-2">註冊</NuxtLink>
                        </div>
                        <!-- <div v-show="item.showDropdown"
                             class="loginDropdown bg-white p-2 mt-1">
                            <NuxtLink to="/login"
                                      class="block p-2">登入</NuxtLink>
                            <NuxtLink to="/register"
                                      class="block p-2">註冊</NuxtLink>
                        </div> -->
                    </div>
                </div>
                <!-- 手機板漢堡選單 -->
                <div class="lg-hidden block">
                    <button class="flex bg-white b-rd-5px b-1px b-gray radius-5px"
                            @click="toggleNav">
                        <img class="w-30px p-1"
                             src="/images/navigation.svg"
                             alt="導航漢堡選單icon" />
                    </button>
                </div>
            </div>
            <!-- 手機板下拉選單 -->
            <div class="headerBox position-absolute w-100% bg-white top-100% left-0 flex flex-wrap items-center"
                 v-show="navOpen">
                <div class="w-100% flex justify-center mt-3 mb-3"
                     v-for="item of headerLink"
                     :key="item.id">
                    <div>
                        <NuxtLink :title="item.title"
                                  :to="item.link"
                                  class="color-black decoration-none font-bold w-100%"
                                  :alt="item.title">
                            {{ item.title }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
const navOpen = ref(false);
const toggleNav = () => {
    navOpen.value = !navOpen.value;
};
const headerLink = ref([
    {
        id: 0,
        title: '幫助中心',
        link: '/helpcenter'
    },
    {
        id: 1,
        title: '找媒合',
        link: '/findmatch'
    },
    {
        id: 2,
        title: '會員登入/註冊',
        link: '/member/login',
        dropdown: true,
        showDropdown: false
    }
]);
const handleDropdown = item => {
    if (item.id == 2) {
        item.showDropdown = !item.showDropdown;
    } else {
        item.showDropdown = false;
    }
};
const navigateIndex = () => {
    router.push('/');
};
</script>

<style scoped>
.headerBox {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
    z-index: 3;
}
.loginDropdown {
    border: 1px solid #ccc;
    position: absolute;
    top: 30px;
    width: 150px;
}
.cursor-pointer:hover {
    opacity: 0.8;
}
</style>
