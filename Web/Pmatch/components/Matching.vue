<template>
    <div class="bg-#fff p-5 rounded-1rem">
        <h3 class="m-0">即時媒合狀況</h3>
        <div class="flex">
            <div class="w-150px font-size-15px ps-1 pe-1">時間</div>
            <div class="w-full font-size-15px ps-1 pe-1">遊戲平台</div>
            <div class="w-full font-size-15px ps-1 pe-1">遊戲幣數量</div>
            <div class="w-full font-size-15px ps-1 pe-1">委託對象</div>
        </div>
        <div v-for="(item, index) in matchingList" :key="index">
            <div class="w-full flex">
                <div class="w-150px font-size-15px ps-1 pe-1">
                    {{ item.EndTime.split("T")[0].slice(5) }}
                </div>
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.GamePlatform }}
                </div>
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.Patch }}
                </div>
                <div class="w-full font-size-15px ps-1 pe-1">
                    {{ item.MobileNumber }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const matchingList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();

// 取得MatchingList
async function fetchMatchingListData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/InstantMatching",
            {

            },
            {
                headers: {
                    Authorization: token // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            matchingList.value = response.data.Datas;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}

onMounted(async () => {
    try {
        // 生成新的 token
        const token = await jwtStore.generateToken();

        if(token != ""){
            fetchMatchingListData(token);
        }else{
            console.error("token獲取失敗");
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});
</script>

<style scoped>
</style>
