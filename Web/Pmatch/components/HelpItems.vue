<template>
    <div>
        <div class="max-w-1320px m-auto">
            <button class="helpBox" v-for="item in helpItems">
                {{ item.title }}
            </button>
        </div>
    </div>
</template>

<script setup>
const helpItems = ref([
    {
        id: 0,
        title: "關於我們",
        link: "/about",
    },
    {
        id: 1,
        title: "服務條款",
        link: "/serviceterms",
    },
    {
        id: 2,
        title: "免責聲明",
        link: "/disclaimer",
    },
    {
        id: 3,
        title: "隱私權聲明",
        link: "/privacy",
    },
    {
        id: 4,
        title: "幫助中心",
        link: "/helpcenter",
    },
    {
        id: 5,
        title: "聯絡我們",
        link: "/contact",
    },
]);
</script>

<style scoped>
</style>
