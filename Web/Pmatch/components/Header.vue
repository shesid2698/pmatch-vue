<template>
    <div
        class="flex justify-center fixed w-100% headerBox top-0 left-0 h-110px"
    >
        <div
            class="flex justify-between items-center max-w-1320px w-100% ps-5 pe-5 position-relative"
        >
            <!-- Logo -->
            <div class="lg-w-80% w-100% flex items-center">
                <div @click="navigateIndex" class="cursor-pointer">
                    <NuxtLink to="/"
                        ><img
                            class="md-w-240px w-160px"
                            src="/images/logo.png"
                            alt="pmatch的logo"
                    /></NuxtLink>
                </div>
                <div>
                    <h1
                        class="m-0 ms-3 font-size-22px md-font-size-22px color-#7B2CBF"
                    >
                        遊戲道具媒合網
                    </h1>
                </div>
            </div>
            <div class="lg-w-100% w-20% flex justify-end">
                <!-- PC版導航連結 -->
                <div
                    class="hidden lg-flex items-center"
                    v-for="item of headerLink"
                    :key="item.id"
                >
                    <div
                        class="relative"
                        @click.stop="handleDropdown(item)"
                        :ref="setDropdownRef(item.id)"
                    >
                        <span
                            v-show="item.dropdown"
                            class="loginLink color-#555553 decoration-none font-bold w-100% cursor-pointer"
                            :alt="item.title"
                        >
                            {{ item.title }}
                        </span>
                        <button
                            v-if="item.items && userNameCookie != null && userNameCookie.value !== ''"
                            class="logoutBtn ms-1 bg-#fff border-none"
                        >
                            <span
                                v-for="subItem in item.items"
                                :key="subItem.id"
                                @click="subItem.action"
                                >{{ subItem.title }}</span
                            >
                        </button>
                        <div
                            v-show="dropdownStates[item.id]"
                            class="loginDropdown bg-white mt-1"
                        >
                            <NuxtLink
                                to="/member/login"
                                class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none"
                                >會員登入</NuxtLink
                            >
                            <NuxtLink
                                to="/register"
                                class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none"
                                >註冊會員</NuxtLink
                            >
                            <NuxtLink
                                to="/member/forgetpwd"
                                class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none"
                                >忘記密碼</NuxtLink
                            >
                        </div>
                    </div>
                    <NuxtLink
                        v-show="!item.dropdown"
                        v-if="item.id !== 5"
                        :title="item.title"
                        :to="item.link"
                        :class="`headerLink flex items-center color-#555553 decoration-none pt-.2rem pb-.2rem ps-1.2rem pe-1.2rem font-bold ${item.className}`"
                        :alt="item.title"
                    >
                        {{ item.title }}
                        <img class="ms-2 w-20px" v-if="item.icon !== ''" :src="item.icon" :alt="item.title">
                    </NuxtLink>
                    
                </div>
                <NuxtLink
                        v-if="isLoggedIn"
                        @click="logout"
                        class="color-#0d6efd flex items-center hover:opacity-70 hover:underline cursor-pointer decoration-none ms-1.5rem font-bold"
                        >登出</NuxtLink
                    >
                <!-- 手機板漢堡選單 -->
                <div class="lg-hidden block">
                    <button
                        class="navBtn flex"
                        @click="toggleNav"
                    >
                        <img
                            class="w-30px px-1 py-2"
                            src="/images/navigation.svg"
                            alt="導航漢堡選單icon"
                        />
                    </button>
                </div>
            </div>
            <!-- 手機板下拉選單 -->
            <div
                class="headerBoxMenu position-absolute w-100% bg-white top-98% left-0 flex flex-wrap items-center"
                v-show="navOpen"
            >
                <div
                    class="w-100% flex justify-center mt-3 mb-3"
                    v-for="item of headerLink"
                    :key="item.id"
                >
                    <div v-if="item.title === '會員中心'" class="text-center">
                        <div
                            class="headerLink color-#555553 decoration-none font-bold w-100% cursor-pointer"
                            @click="show = !show"
                        >
                            {{ item.title }}
                            <el-collapse-transition>
                                <div
                                    v-show="show"
                                    class="member-center-container"
                                >
                                    <div
                                        class="transition-box"
                                        v-for="memberItem of memberCenterLink"
                                    >
                                        <NuxtLink
                                            :to="memberItem.link"
                                            :title="memberItem.title"
                                            class="decoration-none"
                                            >{{ memberItem.title }}</NuxtLink
                                        >
                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                    <div v-else>
                        <NuxtLink
                            :title="item.title"
                            :to="item.link"
                            class="headerLink color-#555553 decoration-none font-bold w-100%"
                            :alt="item.title"
                        >
                            {{ item.title }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const userToken = useCookie("_PmToken");
const isLoggedIn = computed(() => !!userToken?.value && userToken.value.trim() !== "");
const userNameCookie = useCookie("_PmUserName");
const MemberIdCookie = useCookie("_PmMemberId");
const user = reactive({});
const router = useRouter();
const navOpen = ref(false);
const toggleNav = () => {
    navOpen.value = !navOpen.value;
};
const headerLink = ref([]);
const memberCenterLink = ref([
    {
        title: "會員維護資訊",
        link: "/member/center/",
    },
    {
        title: "更改密碼",
        link: "/member/center/changepwd",
    },
    {
        title: "我的訂單",
        link: "/member/center/myorder",
    },
    {
        title: "委託媒合紀錄",
        link: "/member/center/matchlog",
    },
    {
        title: "成功媒合紀錄",
        link: "/member/center/successmatch",
    },
    {
        title: "簽約媒合商",
        link: "/member/center/contract",
    },
]);
const show = ref(false);
// 保存下拉選單的參考
const dropdownRefs = ref([]);

const dropdownStates = ref({
    2: false, // 僅對 id 為 2 的項目有下拉選單
});
// 設置下拉選單的 ref
const setDropdownRef = (id) => (el) => {
    dropdownRefs.value[id] = el;
};

// 處理下拉選單的顯示或隱藏
const handleDropdown = (item) => {
    const currentState = dropdownStates.value[item.id];
    dropdownStates.value[item.id] = !currentState;
    console.log(item.showDropdown);
};
// 點擊外部關閉下拉選單
const closeDropdownOutside = (event) => {
    Object.keys(dropdownStates.value).forEach((id) => {
        const dropdownElement = dropdownRefs.value[id];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
            dropdownStates.value[id] = false; // 關閉該選單
        }
    });
};
const logout = () => {
    userToken.value = undefined;
    userToken.maxAge = -1;
    userNameCookie.value = undefined;
    userNameCookie.maxAge = -1;
    MemberIdCookie.value = undefined;
    MemberIdCookie.maxAge = -1;
    window.location.href = "/";
};
// 在組件掛載時添加全局點擊事件監聽器
onMounted(() => {
    document.addEventListener("click", closeDropdownOutside);
    if (userNameCookie.value !== "" && userNameCookie.value != undefined) {
        headerLink.value = [
            {
                id: 0,
                title: "會員中心",
                link: "/member/center",
                icon: "",
            },
            {
                id: 1,
                title: "幫助中心",
                link: "/helpcenter",
                icon: "",
            },
            {
                id: 2,
                title: "找媒合",
                link: "/findmatch",
                icon: "",
            },
            {
                id: 3,
                title: `${userNameCookie.value} 您好`,
                link: "#",
                icon: "",
            },
        ];
    } else {
        headerLink.value = [
            {
                id: 0,
                title: "首頁",
                link: "/",
                className: "nav0",
                icon: "",
            },
            {
                id: 1,
                title: "會員中心",
                link: "/member/center",
                className: "nav1",
                icon: "",
            },
            {
                id: 2,
                title: "幫助中心",
                link: "/helpcenter",
                className: "nav2",
                icon: "",
            },
            {
                id: 3,
                title: "媒合商",
                link: "/store/login",
                className: "nav3",
                icon: "/images/linkIcon.png",
            },
            {
                id: 4,
                title: userToken.value
                    ? `HI,${userNameCookie.value}`
                    : "登入/註冊",
                link: "/member/login",
                className: "nav4",
                icon: "",
                dropdown: true,
                showDropdown: false,
                items: userToken.value
                    ? [
                          {
                              id: "logout",
                              title: "登出",
                              action: () => {
                                  // 清除登入狀態
                                  userToken.value = null;
                                  userNameCookie.value = "";
                                  MemberIdCookie.value = "";
                                  router.push("/");
                              },
                          },
                      ]
                    : [],
            },
        ];
    }
});

// 在組件卸載時移除點擊事件監聽器
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdownOutside);
});
</script>

<style scoped>
.headerBox{
    z-index: 99;
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
.headerLink:hover .member-center-container {
    color: #555553;
}
.member-center-container {
    border: 1px solid darkgrey;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 5px;
}
.transition-box {
    padding: 5px 10px;
}
.transition-box:hover {
    background: #ebecf0;
    color: grey;
}
.logoutBtn {
    font-size: 1rem;
    cursor: pointer;
}
.logoutBtn:hover {
    color: #999;
}
.nav1{
    border-right: 2px solid #ccc;
    border-left: 2px solid #ccc;
}
.nav3{
    background:linear-gradient(to right, #4361EE, #F72585);
    border-radius: 50px;
    color: #fff;
    padding: .5rem 1.5rem;
}
.loginLink{
    border-radius: 50px;
    color: #F72585;
    padding: .5rem 1.5rem;
    background:#fff;
    margin-left: .3rem;
}
.navBtn{
    background:linear-gradient(to right, #7b2cbf, #F72585);
    border: none;
    border-radius: 10px;
    justify-content: center;
}
</style>
