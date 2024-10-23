<template>
    <div class="flex justify-center fixed w-100% bg-white headerBox top-0 left-0 h-80px">
        <div class="flex justify-between items-center max-w-1320px w-100% ps-5 pe-5 position-relative">
            <!-- Logo -->
            <div class="w-100% flex items-center">
                <div @click="navigateIndex"
                     class="cursor-pointer">
                    <NuxtLink to="/"><img class="lg-w-240px w-140px"
                             src="/images/logo.png"
                             alt="pmatch的logo" /></NuxtLink>
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
                         @click="handleDropdown(item)"
                         :ref="setDropdownRef(item.id)">
                        <span v-show="item.dropdown"
                              class="loginLink color-#555553 decoration-none ms-1.5rem font-bold w-100% cursor-pointer"
                              :alt="item.title">
                            {{ item.title }}
                        </span>
                        <div v-show="item.showDropdown"
                             class="loginDropdown bg-white mt-1">
                            <NuxtLink to="/member/login"
                                      class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">會員登入</NuxtLink>
                            <NuxtLink to="/store/login"
                                      class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">媒合商登入</NuxtLink>
                            <NuxtLink to="/register"
                                      class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">註冊會員</NuxtLink>
                            <NuxtLink to="/member/forgetpwd"
                                      class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">忘記密碼</NuxtLink>
                        </div>
                    </div>
                    <NuxtLink v-show="!item.dropdown"
                              v-if="item.id!==4"
                              :title="item.title"
                              :to="item.link"
                              class="headerLink color-#555553 decoration-none ms-1.5rem font-bold"
                              :alt="item.title">
                        {{ item.title }}
                    </NuxtLink>
                    <NuxtLink v-else
                              @click="logout"
                              class=" color-#0d6efd hover:opacity-70 hover:underline cursor-pointer decoration-none ms-1.5rem font-bold">登出</NuxtLink>
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
            <div class="headerBoxMenu position-absolute w-100% bg-white top-98% left-0 flex flex-wrap items-center"
                 v-show="navOpen">
                <div class="w-100% flex justify-center mt-3 mb-3"
                     v-for="item of headerLink"
                     :key="item.id">
                    <div>
                        <NuxtLink :title="item.title"
                                  :to="item.link"
                                  class="headerLink color-#555553 decoration-none font-bold w-100%"
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
const { data: userInfo, error } = await useFetch('/api/getuser', {
    headers: useRequestHeaders(['cookie'])
});
const uToken = useCookie('u_token');
const user = reactive({});
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
// 保存下拉選單的參考
const dropdownRefs = ref([]);

// 設置下拉選單的 ref
const setDropdownRef = id => el => {
    dropdownRefs.value[id] = el;
};

// 處理下拉選單的顯示或隱藏
const handleDropdown = item => {
    item.showDropdown = !item.showDropdown;
};
// 點擊外部關閉下拉選單
const closeDropdownOutside = event => {
    headerLink.value.forEach(item => {
        if (item.dropdown && item.showDropdown) {
            const dropdownElement = dropdownRefs.value[item.id];
            if (dropdownElement && !dropdownElement.contains(event.target)) {
                item.showDropdown = false;
            }
        }
    });
};
const logout = () => {
    uToken.value = '';
    uToken.value = undefined;
    uToken.maxAge = -1;
    window.location.href="/";
};
// 在組件掛載時添加全局點擊事件監聽器
onMounted(() => {
    document.addEventListener('click', closeDropdownOutside);
    if (userInfo && userInfo.value != null) {
        Object.assign(user, userInfo.value.user.user);
        if (user.Name !== undefined) {
            headerLink.value = [
                {
                    id: 0,
                    title: '會員中心',
                    link: '/member/center'
                },
                {
                    id: 1,
                    title: '幫助中心',
                    link: '/helpcenter'
                },
                {
                    id: 2,
                    title: '找媒合',
                    link: '/findmatch'
                },
                {
                    id: 3,
                    title: `${user.Name} 您好`,
                    link: '#'
                },
                {
                    id: 4,
                    title: '登出',
                    link: '#'
                }
            ];
        }
    }
});

// 在組件卸載時移除點擊事件監聽器
onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdownOutside);
});
</script>

<style scoped>
.headerBox {
    box-shadow: 0 2px 4px rgb(0 0 0 / 0.5);
    z-index: 3;
}
.headerBoxMenu {
    box-shadow: 0 2px 2px rgb(0 0 0 / 0.5);
}
.loginDropdown {
    border: 1px solid #ccc;
    position: absolute;
    top: 32px;
    left: 12px;
    width: 120px;
    border-radius: 5px;
}
.loginItem {
    color: #555553;
}
.loginItem:hover {
    color: #999;
    background-color: #e9ecef;
}
.headerLink:hover,
.loginLink:hover {
    color: #999;
}
</style>
