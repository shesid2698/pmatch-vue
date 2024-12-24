<template>
    <div class="bg-#fff matchingBox relative">
        <div class="matchingDetail">
            <div class="matchingTitle p-2 absolute flex items-center rounded-10px">
                <div class="flex items-center me-2">
                    <img class="w-20px" src="/images/matchingIcon.png" alt="即時媒合狀況">
                </div>
                <h3 class="m-0">即時媒合狀況</h3>
            </div>
            
            <div class="flex titleBox">
                <div class="w-200px font-size-15px text-center mt-1 mb-1">
                    時間
                </div>
                <div
                    class="w-full font-size-15px text-center titleBorder mt-1 mb-1"
                >
                    遊戲平台
                </div>
                <div
                    class="w-full font-size-15px text-center titleBorder mt-1 mb-1"
                >
                    遊戲幣數量
                </div>
                <div
                    class="w-full font-size-15px text-center titleBorder mt-1 mb-1"
                >
                    委託對象
                </div>
            </div>
            <div v-for="(item, index) in matchingList.slice(0,5)" :key="index">
                <div class="w-full flex">
                    <div class="w-200px font-size-15px pt-2 pb-2 text-center">
                        {{ item.EndTime.split("T")[0].slice(5) }}
                    </div>
                    <div class="w-full font-size-15px pt-2 pb-2 text-center">
                        {{ item.GamePlatform }}
                    </div>
                    <div class="patchDetail w-full font-size-15px pt-2 pb-2 text-center">
                        {{ item.Patch }}
                    </div>
                    <div class="w-full font-size-15px pt-2 pb-2 text-center">
                        {{ item.MobileNumber }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const matchingList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 接收父元件傳遞的參數
const props = defineProps({
    param: {
        type: String,
        required: true,
    },
});

// 取得MatchingList
async function fetchMatchingListData(token, platformName) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }
    if (platformName === undefined) {
        platformName = "";
    }
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/InstantMatching",
            {
                GamePlatform: platformName,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
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

// 監聽傳遞即時媒合值的變化去call api
watch(
    () => props.param,
    (newParam) => {
        fetchMatchingListData("", newParam);
    },
    { immediate: true } // 頁面初始化時立即執行一次
);
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
    padding-top: 2.5rem;
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
.patchDetail{
    background: linear-gradient(to right, #4361ee, #7b2cbf);
    background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
}
</style>
