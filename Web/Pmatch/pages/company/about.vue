<template>
    <div class="ccontainer">
        <div class="w-68.75%">
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">關於我們</span>
            </div>
            <div v-html="data" class="mt-15px"></div>
        </div>
    </div>
</template>

<script setup>
const { $axios } = useNuxtApp();
const data = ref("");
const jwtStore = useJwtStore();

// 取得GetCompayIformationDetail
async function fetchData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetCompayIformationDetail",
            {
                Category: 1,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if(response.data.Status.Code === 0){
            data.value = response.data.Content;
        }else{
            alert(`${response.data.Status.Message}`)
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
            fetchData(token);
        }else{
            console.error("token獲取失敗");
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

</script>

<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
