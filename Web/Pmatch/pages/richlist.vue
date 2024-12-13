<template>
    <div>
        <div class="max-w-1320px m-auto ps-5 pe-5">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
    </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// 註冊 Chart.js 所需的模組
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);
const dailyPatchList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

// 定義圖表的數據與選項
const chartData = {
    labels: ["January", "February", "March"],
    datasets: [{ data: [40, 20, 12] }],
};

const chartOptions = {
    responsive: true,
};

// 取得富豪榜
async function fetchRichList(token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Statist/GetDailyPatchList",
            {
                GmaeNickIds: [],
                GamePlatformType: 1,
                StartTime: "2024-12-01",
                EndTime: "2024-12-01",
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            dailyPatchList.value = response.data.Data;
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
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;

            if (token != "") {
                fetchRichList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchRichList(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});
</script>
