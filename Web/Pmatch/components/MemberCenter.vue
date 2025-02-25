<template>
    <div class="menu-container hidden lg:block">
        <div class="p-x-8px text-20px text-black font-bold whitespace-nowrap">
            會員中心
        </div>
        <NuxtLink v-for="page of curPage"
                  class="decoration-none"
                  :to="page.link">
            <div class="p-x-15px p-y-7px text-black font-bold cursor-pointer hover:opacity-50 hover:underline whitespace-nowrap"
                 :class="page.show">
                {{ page.title }}
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps({
    type: Number
});
const route = useRoute();
const MemberTypeCookie = useCookie('_PmMemberType');
const curPage = ref([
    {
        title: '會員資訊維護',
        show: 'showTitle',
        link: '/member/center'
    },
    // {
    //     title: "綁定社群帳號",
    //     show: "",
    //     link: "/member/center/bindsocial",
    // },
    {
        title: '更改密碼',
        show: '',
        link: '/member/center/changepwd'
    },
    {
        title: '委託媒合紀錄',
        show: '',
        link: '/member/center/matchlog'
    },
    {
        title: '成功媒合紀錄',
        show: '',
        link: '/member/center/successmatch'
    },
    {
        title: '簽約媒合商',
        show: '',
        link: '/member/center/contract'
    },
    {
        title: '領獎中心',
        show: '',
        link: '/member/center/reward'
    }
]);
const recommendManages2 = [
    {
        title: '會員回饋累積',
        show: '',
        link: '/member/center/feedback'
    },
    {
        title: '推薦管理',
        show: '',
        link: '/member/center/recommend'
    }
];
const recommendManages3 = [
    {
        title: '會員回饋累積',
        show: '',
        link: '/member/center/feedback'
    }
];

watch(
    () => props.type,
    (newValue, oldValue) => {
        console.log(`Message changed from "${oldValue}" to "${newValue}"`);
        if (newValue == 2) {
            // 下線經營者
            if (!curPage.value.includes(...recommendManages2))
                curPage.value.push(...recommendManages2);
        } else if (newValue == 3) {
            // 下線
            if (!curPage.value.includes(...recommendManages3))
                curPage.value.push(...recommendManages3);
        }
    }
);
onMounted(async () => {
    curPage.value.forEach(x => {
        x.show = '';
    });
    if (
        MemberTypeCookie.value != null &&
        MemberTypeCookie.value != '' &&
        MemberTypeCookie.value != undefined
    ) {
        let typeNum = MemberTypeCookie.value;
        if (typeNum == 2) {
            curPage.value.push(...recommendManages2);
        } else if (typeNum == 3) {
            curPage.value.push(...recommendManages3);
        }
    }

    // curPage.value=curPage.value.filter(item=>item.title!=="會員回饋累積");
    switch (route.path) {
        case '/member/center':
            curPage.value[0].show = 'showTitle';
            break;
        case '/member/center/changepwd':
            curPage.value[1].show = 'showTitle';
            break;
        case '/member/center/matchlog':
            curPage.value[2].show = 'showTitle';
            break;
        case '/member/center/successmatch':
            curPage.value[3].show = 'showTitle';
            break;
        case '/member/center/contract':
            curPage.value[4].show = 'showTitle';
            break;
        case '/member/center/reward':
            curPage.value[5].show = 'showTitle';
            break;
        case '/member/center/feedback':
            curPage.value[6].show = 'showTitle';
            break;
        case '/member/center/recommend':
            curPage.value[7].show = 'showTitle';
            break;
    }
});
</script>
<style scoped>
.menu-container {
    border-right: 1px solid rgba(128, 128, 128, 0.5);
    border-left: 1px solid rgba(128, 128, 128, 0.5);
    margin-right: 0px;
    height: 100%;
}
.showTitle {
    color: white;
    background: #3d8dcc;
}
.showTitle:hover {
    color: white;
    background: #3d8dcc;
    opacity: 1;
    text-decoration: none;
}
</style>
