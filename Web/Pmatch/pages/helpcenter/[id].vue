<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div>
            <component :is="pageComponent" />
        </div>
    </div>
</template>

<script setup>
const helpCenter = {
    help111: {
        id: "0",
        title: "幫助中心問與答111",
        component: resolveComponent("HelpHelp111"),
    },
    help222: {
        id: "1",
        title: "幫助中心問與答222",
        component: resolveComponent("HelpHelp222"),
    },
    help333: {
        id: "2",
        title: "幫助中心問與答333",
        component: resolveComponent("HelpHelp333"),
    },
    help444: {
        id: "3",
        title: "幫助中心問與答444",
        component: resolveComponent("HelpHelp444"),
    },
};
const route = useRoute();
const pageName = helpCenter[route.params.id];
const pageTitle = pageName.title;
const pageComponent = pageName.component;
</script>

<style scoped>
</style>