<template>
    <div class="menu-container hidden lg:block">
        <div class="p-x-8px text-20px text-black font-bold">會員中心</div>
        <NuxtLink v-for="page of curPage"
                  class="decoration-none"
                  :to="page.link">
            <div class="p-x-15px p-y-7px text-black font-bold cursor-pointer hover:opacity-50 hover:underline"
                 :class="page.show">
                {{ page.title }}
            </div>
        </NuxtLink>
    </div>

</template>

<script setup>
const route = useRoute();
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
        title: '成功委託紀錄',
        show: '',
        link: '/member/center/successmatch'
    },
    {
        title: '簽約媒合商',
        show: '',
        link: '/member/center/contract'
    }
]);
onMounted(() => {
    curPage.value.forEach(x => {
        x.show = '';
    });
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
