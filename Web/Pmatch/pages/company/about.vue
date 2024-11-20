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
const token = ref("");
// 獲得jwt token
async function fetchToken() {
    const { data, error } = await useFetch("/api/guestToken", {
        params: {
            strUserName: "",
            iExpireMinutes: 10,
        },
    });

    if (error.value) {
        console.error("Token 生成失敗:", error.value);
    } else {
        token.value = data.value.token;
    }
}

// 取得GetCompayIformationDetail
async function fetchData() {
    await fetchToken();
    
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetCompayIformationDetail",
            {
                Category: 1,
            },
            {
                headers: {
                    Authorization: token.value, // 帶上 Token
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
fetchData();

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
