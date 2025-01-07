<template>
    <div class="buyLogBox relative" @click="toggleBuyLog" v-show="userToken && memberId">
        <div class="flex items-center">
            <div class="flex items-center">
                <img
                    class="w-25px"
                    src="/images/buyLogIcon.png"
                    alt="購買紀錄icon"
                />
            </div>
            <div class="flex items-center ms-3">
                <span> 購買紀錄 </span>
            </div>
        </div>
        <div
            v-show="buyLogOpen"
            class="buyLogDetailBox absolute top-100% right-0 color-#f72585"
        >
            <div class="buyLogDetail">
                <NuxtLink
                    class="decoration-none color-#f72585"
                    v-for="(item, index) in buyLog"
                    :key="index"
                    :to="`findmatch/${item.Id}`"
                >
                    <div class="buyItem px-2rem py-.8rem">
                        {{ item.Name }}
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
const userToken = useCookie("_PmToken");
const memberId = useCookie("_PmMemberId");

const buyLogOpen = ref(false);
const toggleBuyLog = () => {
    buyLogOpen.value = !buyLogOpen.value;
};
const buyLog = ref(null);

onMounted(async () => {
    const buyLogData = localStorage.getItem("buyLog");
    if (buyLogData) {
        // 將字串解析為物件並賦值
        try {
            buyLog.value = JSON.parse(buyLogData);
        } catch (error) {
            console.error("無法解析 buyLog 的 JSON 數據", error);
        }
    } else {
        console.error("localStorage 中未找到 buyLog");
    }
});
</script>

<style scoped>
.buyLogBox {
    position: fixed;
    right: -110px;
    top: 20%;
    background: linear-gradient(to right, #f72585, #7b2cbf);
    color: #fff;
    padding: 1rem 2rem;
    font-size: 18px;
    border-radius: 50px 0 0 50px;
    font-weight: 600;
    z-index: 99;
    transition: all 0.3s;
    
}
.buyLogBox:hover {
    right: -2px;
}
.buyLogDetailBox {
    padding: 0 1px 1px 1px;
    border:none;
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0 0 0 10px;
}
.buyLogDetail{
    width: 100%;
    background: #fff;
    color: #f72585;
    text-align: center;
    border-radius: 0 0 0 10px;
}
/* .buyItem {
    border-bottom: 1px solid #f72585;
    border-radius: 0 0 0 10px;
} */
</style>