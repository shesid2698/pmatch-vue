<template>
    <div>
        <Head>
            <title>PMatch遊戲道具交易平台</title>
            <Meta property="og:title" content="PMatch遊戲道具交易平台" />
            <Meta
                name="keywords"
                content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
            />
            <Meta
                name="description"
                content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
            />
            <Meta
                property="og:description"
                content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
            />
        </Head>
        <div class="max-w-1110px m-auto ps-5 pe-5">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                @change="changePlatform"
                v-model="selectedPlatform"
            />
            <div>
                <select mt-5 @change="changePlatform">
                    <option value="2">滿貫大亨</option>
                    <option value="4">老子有錢</option>
                </select>
            </div>
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

// loading page
import { useLoadStore } from "../stores/loading.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const dailyPatchList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const selectedPlatform = ref("2");

// 使用 computed 來轉換資料格式
const chartData = computed(() => {
    return {
        // 將時間格式自訂
        labels: dailyPatchList.value.map((item) => {
            const date = new Date(item.Time);
            return `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:00`;
        }),
        datasets: [
            {
                label: "總計",
                data: dailyPatchList.value.map((item) => item.Total),
                backgroundColor: "rgb(90,155,213)",
                borderColor: "#36A2EB",
                tension: 0.4,
                fill: false,
            },
        ],
    };
});

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "富豪榜數據圖",
        },
    },
    scales: {
        y: {
            display: true,
            stacked: false,
            position: "left",
        },
        x: {
            ticks: {
                maxRotation: 45,
                minRotation: 45,
            },
            grid: {
                display: false,
            },
        },
    },
};
// 處理平台變更
const changePlatform = async (event) => {
    const platformId = event.target.value;
    selectedPlatform.value = platformId;
    if (userToken.value != "" && userToken.value != undefined) {
        const token = userToken.value;

        if (token != "") {
            await fetchRichList(token, platformId);
        }
    } else {
        // 生成新的 token
        const token = await jwtStore.generateToken();
        if (token != "") {
            await fetchRichList(token, platformId);
        }
    }
};
// 計算日期
const calculateWeekRange = () => {
    const today = new Date(); // 取得今天的日期
    const dayOfWeek = today.getDay(); // 取得今天是星期幾 (0:週日, 1:週一, ..., 6:週六)

    // 初始化範圍日期
    let startDate = new Date(today);
    let endDate = new Date(today);

    if (dayOfWeek === 0) {
        // 如果今天是禮拜日，抓上上週的禮拜日到上週的禮拜六
        startDate.setDate(today.getDate() - 13); // 上上週禮拜一
        endDate.setDate(today.getDate() - 7); // 上週禮拜日
    } else {
        // 其他情況，抓上週的禮拜一到禮拜日
        startDate.setDate(today.getDate() - dayOfWeek - 6); // 上週禮拜一
        endDate.setDate(today.getDate() - dayOfWeek); // 上週禮拜日
    }

    // 格式化日期為 "YYYY-MM-DD"
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份從 0 開始
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return {
        StartTime: formatDate(startDate),
        EndTime: formatDate(endDate),
    };
};

// 取得富豪榜
async function fetchRichList(token, type) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }
    const { StartTime, EndTime } = calculateWeekRange();
    const useStartTime = StartTime;
    const useEndTime = EndTime;
    try {
        const response = await $axios.post(
            "/api/v1/Statist/GetDailyPatchList",
            {
                GamePlatformType: type, // 1錢街, 2滿貫, 3包你發, 4老子有錢, 5聚寶, 6金爸爸,
                StartTime: useStartTime,
                EndTime: useEndTime,
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
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}

onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;

            if (token != "") {
                fetchRichList(token, 2);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                fetchRichList(token, 2);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});
</script>
