<template>
    <div
        class="flex justify-center fixed w-100% headerBox top-0 left-0 h-110px"
    >
        <div
            class="flex justify-between items-center max-w-1110px w-100% ps-5 pe-5 position-relative"
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
                        class="m-0 ms-3 font-size-22px md-font-size-22px color-#fff"
                    >
                        遊戲道具媒合網
                    </h1>
                </div>
            </div>
            <div class="lg-w-100% w-20% flex justify-end">
                <!-- PC版導航連結 -->
                <div
                    class="navBox hidden lg-flex items-center"
                    v-for="item of headerLink"
                    :key="item.id"
                    :class="`${item.className}Box`"
                >
                    <div class="flex items-center">
                        <NuxtLink
                            v-show="!item.dropdown"
                            v-if="item.id !== 5"
                            :title="item.title"
                            :to="item.link"
                            :class="` decoration-none ps-1.2rem pe-1.2rem font-bold ${item.className}`"
                            :alt="item.title"
                        >
                            {{ item.title }}
                            <img
                                class="ms-2 w-20px"
                                v-if="item.icon !== ''"
                                :src="item.icon"
                                :alt="item.title"
                            />
                        </NuxtLink>
                    </div>
                </div>
                <!-- 手機板漢堡選單 -->
                <div class="lg-hidden block">
                    <button class="navBtn flex" @click="toggleNav">
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
                class="headerBoxMenu position-absolute w-100% top-98% left-0 flex flex-wrap items-center"
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
                            class="headerLink color-#fff decoration-none font-bold w-100%"
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
const isLoggedIn = computed(
    () => !!userToken?.value && userToken.value.trim() !== ""
);
const userNameCookie = useCookie("_PmUserName");
const MemberIdCookie = useCookie("_PmMemberId");
const user = reactive({});
const router = useRouter();
const userType = useCookie("_PmMemberType");
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
    userType.value = undefined;
    userType.maxAge = -1;
    userToken.value = undefined;
    userToken.maxAge = -1;
    const pmName = localStorage.getItem("_PmLocalName");
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
                className: "nav0",
            },
            {
                id: 1,
                title: "幫助中心",
                link: "/helpcenter",
                icon: "",
                className: "nav1",
            },
            {
                id: 2,
                title: "找媒合",
                link: "/findmatch",
                icon: "",
                className: "nav2",
            },
            {
                id: 3,
                title: `Hi , ${userNameCookie.value}`,
                link: "#",
                icon: "",
                className: "loginnav4",
            },
        ];
    } else {
        headerLink.value = [
            {
                id: 0,
                title: "返回首頁",
                link: "/",
                className: "nav0",
                icon: "",
            },
            {
                id: 1,
                title: "操作手冊",
                link: "/",
                className: "nav1",
                icon: "",
            },
            {
                id: 3,
                title: "登入",
                link: "/store/login",
                className: "nav3",
                icon: "/images/linkIcon.png",
            },
        ];
    }
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".headerBox");
        const headerMenu = document.querySelector(".headerBoxMenu");
        const headerMenuLink = document.querySelectorAll(".headerLink");
        const headerMenuNav0 = document.querySelector(".nav0");
        const headerMenuNav1 = document.querySelector(".nav1");
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
            headerMenu.classList.add("scrolledMenu");
            headerMenuLink.forEach((link) => {
                link.classList.add("scrolledMenuLink");
            });
            headerMenuNav0.classList.add('scrolledMenuNav0');
            headerMenuNav1.classList.add('scrolledMenuNav1');
        } else {
            header.classList.remove("scrolled");
            headerMenu.classList.remove("scrolledMenu");
            headerMenuLink.forEach((link) => {
                link.classList.remove("scrolledMenuLink");
            });
            headerMenuNav0.classList.remove('scrolledMenuNav0');
            headerMenuNav1.classList.remove('scrolledMenuNav1');
        }
    });
});

// 在組件卸載時移除點擊事件監聽器
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdownOutside);
});
</script>

<style scoped>
.headerBox {
    z-index: 99;
}
.scrolled {
    background: #fff;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
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
.nav3 {
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
}
.nav1 {
    margin-right: 1.2rem;
}
.nav0,
.nav1,
.nav2 {
    color: #fff;
    transition: all 0.3s;
}
.nav0:hover,
.nav1:hover,
.nav2:hover {
    color: #4361ee;
}
.nav0:focus,
.nav1:focus,
.nav2:focus {
    color: #4361ee;
    text-decoration: underline;
}
.nav3:hover {
    position: relative;
    background: #fff;
    border-radius: 50px;
    border: none;
    width: 100%;
    color: #f72585;
    height: 40px;
}
.nav3:hover img {
    content: url("/images/linkIconPink.png");
}
.nav3Box:hover {
    position: relative;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 50px;
    border: none;
}
.nav3Box {
    position: relative;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 50px;
    border: none;
    padding: 0 1px;
}
.nav3:focus {
    background: linear-gradient(to right, #f72585, #4361ee);
    border-radius: 50px;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
}
.nav3:focus img {
    content: url("/images/linkIcon.png");
}
.nav3Box:focus-within {
    position: relative;
    background: linear-gradient(
        to right,
        rgba(247, 37, 133),
        rgba(67, 97, 238)
    );
    border-radius: 50px;
    border: none;
    padding: 0 1px;
}
.nav4Box:focus-within {
    position: relative;
    padding: 1px;
    background: linear-gradient(
        to right,
        rgba(247, 37, 133),
        rgba(67, 97, 238)
    );
    border-radius: 50px;
    border: none;
    margin-left: 10px;
}
.nav4Box,
.loginnav4Box {
    position: relative;
    padding: 1px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238),
        rgba(247, 37, 133)
    );
    border-radius: 50px;
    border: none;
    margin-left: 10px;
}
.nav4:hover,
.loginnav4:hover,
.loginLink:hover {
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
}
.nav4,
.loginnav4 {
    position: relative;
    background: #fff;
    border-radius: 50px;
    height: 40px;
    border: none;
    width: 100%;
    color: #f72585;
    display: flex;
    align-items: center;
}
.loginLink {
    border-radius: 50px;
    color: #f72585;
    line-height: 40px;
    background: #fff;
}
.navBtn {
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border: none;
    border-radius: 10px;
    justify-content: center;
}
.headerBoxMenu {
    background: url(/images/bg-02.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.scrolledMenu {
    background: #fff !important;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}
.scrolledMenuLink {
    color: #555553 !important;
}
.scrolledMenuNav0,.scrolledMenuNav1{
    color: #555553 !important;
}
</style>
