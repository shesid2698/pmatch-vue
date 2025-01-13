<template>
    <div class="menu-container hidden lg:block">
        <div class="p-x-8px text-20px text-black font-bold whitespace-nowrap">會員中心</div>
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
const route = useRoute();
const encrypt = useEncrypt();
const MemberTypeCookie = useCookie('_PmMemberType');
const curPage = ref([
    {
        title: '會員資訊維護',
        show: 'showTitle',
        link: '/member/center'
    },
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
    }
    // {
    //     title: '會員回饋累積',
    //     show: '',
    //     link: '/member/center/feedback'
    // },
    // {
    //     title: '推薦管理',
    //     show: '',
    //     link: '/member/center/recommend'
    // }
]);
const recommendManages = [
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
onMounted(async () => {
    curPage.value.forEach(x => {
        x.show = '';
    });
    if (
        MemberTypeCookie.value != null &&
        MemberTypeCookie.value != '' &&
        MemberTypeCookie.value != undefined
    ) {
        let typeNum = encrypt.decrypt(MemberTypeCookie.value);
        if (typeNum == '2' || typeNum == '3') {
            curPage.value.push(...recommendManages);
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
        case '/member/center/feedback':
            curPage.value[5].show = 'showTitle';
            break;
        case '/member/center/recommend':
            curPage.value[6].show = 'showTitle';
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
