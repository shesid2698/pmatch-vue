<template>
    <div class="bg-#fff matchingBox relative">
        <div class="matchingDetail">
            <div class="matchingTitle p-2 absolute flex items-center rounded-10px">
                <div class="flex items-center me-2">
                    <img class="w-20px" src="/images/ratioIcon.png" alt="最新比值">
                </div>
                <h3 class="m-0">最新比值</h3>
            </div>
            <div class="flex titleBox">
                <div
                    class="w-full font-size-15px text-center mt-1 mb-1"
                >
                    遊戲平台
                </div>
                <div
                    class="w-full font-size-15px text-center titleBorder mt-1 mb-1"
                >
                    委買比值
                </div>
                <div
                    class="w-full font-size-15px text-center titleBorder mt-1 mb-1"
                >
                    委賣比值
                </div>
            </div>
        <div v-for="(item, index) in matchingList" :key="index">
            <div class="w-full flex">
                <div class="w-full font-size-15px pt-1 pb-1 text-center">
                    {{ item.GamePlatform }}
                </div>
                <div class="w-full font-size-15px pt-1 pb-1 text-center">
                    {{ item.SendPatch }}
                </div>
                <div class="w-full font-size-15px pt-1 pb-1 text-center">
                    {{ item.CollectPatch }}
                </div>
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
.matchingBox {
    padding: 1px;
    background: linear-gradient(
        to right,
        rgba(67, 97, 238, 0.3),
        rgba(247, 37, 133, 0.3)
    );
    border-radius: 1rem;
}
.matchingDetail {
    background: #fff;
    border-radius: 1rem;
    padding-top: 2rem;
}
.matchingTitle{
    top: -1.2rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
}
.titleBox {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    padding: 0.2rem 0;
}
.titleBorder {
    border-left: 2px solid #fff;
}
</style>




