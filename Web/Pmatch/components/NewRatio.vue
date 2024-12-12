<template>
    <div class="bg-#fff p-5 rounded-1rem">
        <h3 class="m-0">最新比值</h3>
        <div class="flex">
            <div class="w-full font-size-15px ps-1 pe-1">遊戲平台</div>
            <div class="w-full font-size-15px ps-1 pe-1">委買比值</div>
            <div class="w-full font-size-15px ps-1 pe-1">委賣比值</div>
        </div>
        <div v-for="(item, index) in matchingList" :key="index">
            <div class="w-full flex">
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.GamePlatform }}
                </div>
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.SendPatch }}
                </div>
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.CollectPatch }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const data = ref("");
const token = ref("");
const matchingList = [
    {
        GamePlatform:"包你發娛樂城",
        SendPatch: "134",
        CollectPatch: "144"
    },
    {
        GamePlatform:"聚寶Online",
        SendPatch: "130",
        CollectPatch: "140"
    },
    {
        GamePlatform:"老子有錢Online",
        SendPatch: "130",
        CollectPatch: "144"
    },
    {
        GamePlatform:"寶島娛樂城",
        SendPatch: "130",
        CollectPatch: "144"
    },
    {
        GamePlatform:"錢街Online",
        SendPatch: "130",
        CollectPatch: "144"
    },
    {
        GamePlatform:"金好運娛樂城",
        SendPatch: "130",
        CollectPatch: "140"
    },
    {
        GamePlatform:"滿貫大亨",
        SendPatch: "1.35",
        CollectPatch: "1.5"
    },
    {
        GamePlatform:"豪神娛樂城",
        SendPatch: "1300",
        CollectPatch: "1440"
    },
    {
        GamePlatform:"錢多多娛樂城",
        SendPatch: "134",
        CollectPatch: "150"
    },
    {
        GamePlatform:"金豹娛樂城",
        SendPatch: "130",
        CollectPatch: "144"
    }
];
const { $axios } = useNuxtApp();


</script>

<style scoped>
</style>




