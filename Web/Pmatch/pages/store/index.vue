<template>
    <ElDialog
        v-for="(dialog, index) in dialogVisible"
        :key="index"
        v-model="dialogVisible[index]"
        :close-on-click-modal="false"
    >
        <div class="dialogHeader absolute">遊戲幣走向{{ index }}</div>
        <div class="dialogBody">
            <div>
                <Line
                    :id="`my-chart-${index}`"
                    :options="chartOptions"
                    :data="chartDataComputed[index]"
                />
            </div>
            <div class="flex justify-end mt-5">
                <ElButton
                    class="agreeBtn"
                    type="primary"
                    @click="dialogVisible[index] = false"
                >
                    關閉
                </ElButton>
            </div>
        </div>
    </ElDialog>
    <div class="storeBac">
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
                <div class="mb-3">
                    <h1
                        class="m-0 mb-2 text-center font-size-33px md-font-size-44px slogan"
                    >
                        PMatch是你事業上的全能助手 !
                    </h1>
                    <h3
                        class="m-0 font-size-14px md-font-size-22px text-center subSlogan"
                    >
                        讓你的廣告被看見，讓對的人找到你，還能輕鬆的記帳與報稅
                    </h3>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex">
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue1" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        已經促成"百萬筆"
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        以上的媒合
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue2" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        已協助"130+"媒合商
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        完成報稅
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue3" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span
                                        class="m-0 md-block inline color-#fff text-center md-w-100%"
                                    >
                                        已成功協助"100+"
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center md-w-100%"
                                    >
                                        媒合商轉型成功
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex justify-center">
                    <div class="w-90%">
                        <div class="flex tableTh">
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲平台
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣數量
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣走向
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div
                                class="w-100% platformName font-size-1.5rem text-center color-#beffff"
                            >
                                滿貫大亨
                            </div>
                            <div
                                class="w-100% patchNumber font-size-1.5rem text-center color-#beffff"
                            >
                                1000
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                <ElButton plain @click="openDialog(0)">
                                    <!-- 簡化縮小版折線圖 -->
                                    <Line
                                        :data="simpleChartData"
                                        :options="simpleChartOptions"
                                        class="w-150px"
                                    />
                                </ElButton>
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div
                                class="w-100% platformName font-size-1.5rem text-center color-#beffff"
                            >
                                老子有錢
                            </div>
                            <div
                                class="w-100% patchNumber font-size-1.5rem text-center color-#beffff"
                            >
                                13000
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                <ElButton plain @click="openDialog(1)">
                                    <!-- 簡化縮小版折線圖 -->
                                    <Line
                                        :data="simpleChartData1"
                                        :options="simpleChartOptions"
                                        class="w-150px"
                                    />
                                </ElButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex">
                    <div class="w-50%">
                        <div class="flex items-center justify-center mb-8">
                            <div class="titleLeftBorder"></div>
                            <span class="hotTitle">熱門</span>
                            <span class="gameTitle">遊戲</span>
                            <div class="titleRightBorder"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 5</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >遊戲幣數量</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-50%">
                        <div class="flex items-center justify-center mb-8">
                            <div class="titleLeftBorder"></div>
                            <span class="hotTitle">新進</span>
                            <span class="gameTitle">遊戲</span>
                            <div class="titleRightBorder"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 3</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >上線日期</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你爽</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你書</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你哭</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// 註冊 Chart.js 所需的模組
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { useTransition } from "@vueuse/core";
import { useLoadStore } from "../stores/loading.js";
const store = useLoadStore();
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const setPageLoading = store.setPageLoading;
const userToken = useCookie("_PmToken");

const source1 = ref(0);
const source2 = ref(0);
const source3 = ref(0);
const dailyPatchList0 = ref([]);
const dailyPatchList1 = ref([]);
const dailyPatchLists = [dailyPatchList0, dailyPatchList1];
// 用來控制每個對話框的開關狀態
const dialogVisible = ref([false, false]);

// 開啟指定的對話框
function openDialog(index) {
    dialogVisible.value[index] = true;
}

const matchValue1 = useTransition(source1, {
    duration: 1500,
});
source1.value = 1000000;
const matchValue2 = useTransition(source2, {
    duration: 1500,
});
source2.value = 130;
const matchValue3 = useTransition(source3, {
    duration: 1500,
});
source3.value = 100;

// 為完整版圖表準備數據
const chartDataComputed = computed(() => {
    return dialogVisible.value.map((_, index) => getChartData(index));
});
// 為簡化版圖表準備數據
const simpleChartData = computed(() => {
    // 假設這裡使用 endDate 的數據
    const { EndTime } = calculateWeekRange();
    const endDateData = dailyPatchList0.value; // 或其他數據來源
    
    return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData1 = computed(() => {
    // 假設這裡使用 endDate 的數據
    const { EndTime } = calculateWeekRange();
    const endDateData = dailyPatchList1.value; // 或其他數據來源
    
    return getSimpleChartData(endDateData);
});
// 修改 getChartData 函數
const getChartData = (index) => {
    // 先確保 dailyPatchLists[index] 存在
    if (!dailyPatchLists[index]) {
        console.log(`索引 ${index} 的資料清單不存在`);
        return getEmptyChartData();
    }

    // 確保 .value 有值且是陣列
    const dataList = dailyPatchLists[index].value;
    console.log("當前資料:", dataList);

    if (!Array.isArray(dataList) || dataList.length === 0) {
        console.log(`資料清單為空或無效：Index ${index}`);
        return getEmptyChartData();
    }

    // 確保每個項目都有需要的屬性
    if (
        !dataList.every(
            (item) =>
                item && item.Time !== undefined && item.Total !== undefined
        )
    ) {
        console.log("資料結構不完整");
        return getEmptyChartData();
    }

    // 正常生成圖表資料
    return {
        labels: dataList.map((item) => formatDate(item.Time)),
        datasets: [
            {
                label: "總計",
                data: dataList.map((item) => item.Total),
                backgroundColor: "rgb(90,155,213)",
                borderColor: "#36A2EB",
                tension: 0.4,
                fill: false,
                borderWidth: 2,
            },
        ],
    };
};
// 輔助函數：格式化日期
function formatDate(timeString) {
    const date = new Date(timeString);
    return `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:00`;
}
// 輔助函數：取得空的圖表資料
function getEmptyChartData() {
    return {
        labels: ["No data"],
        datasets: [
            {
                label: "總計",
                data: [0],
                backgroundColor: "rgb(90,155,213)",
                borderColor: "#36A2EB",
                tension: 0.4,
                fill: false,
                borderWidth: 2,
            },
        ],
    };
}
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
// 簡化版折線圖的數據生成函數
const getSimpleChartData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return getEmptySimpleChartData();
    }

    return {
        labels: data.map((item) => formatDate(item.Time)),
        datasets: [
            {
                data: data.map((item) => item.Total),
                borderColor: "#36A2EB",
                tension: 0.4,
                fill: false,
                type: "line",
                pointRadius: 0, // 隱藏數據點
                pointRadius: 3, // 外圈大小
                pointBackgroundColor: "#36A2EB", // 點的背景色（白色）
                pointBorderColor: "#fff", // 點的邊框色（藍色）
                pointBorderWidth: 2, // 點的邊框寬度
            },
        ],
    };
};

// 簡化版空數據
function getEmptySimpleChartData() {
    return {
        labels: ["No data"],
        datasets: [
            {
                data: [0],
                borderColor: "#36A2EB",
                tension: 0.4,
                fill: false,
                type: "line",
                pointRadius: 0, // 隱藏數據點
                pointRadius: 3, // 外圈大小
                pointBackgroundColor: "#36A2EB", // 點的背景色（白色）
                pointBorderColor: "#fff", // 點的邊框色（藍色）
                pointBorderWidth: 2, // 點的邊框寬度
            },
        ],
    };
}

// 簡化版圖表配置
const simpleChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // 隱藏圖例
        },
        title: {
            display: false, // 隱藏標題
        },
        tooltip: {
            enabled: false, // 禁用提示框
        },
    },
    scales: {
        y: {
            display: false, // 隱藏Y軸
        },
        x: {
            display: false, // 隱藏X軸
        },
    },
    elements: {
        point: {
            radius: 0, // 隱藏數據點
        },
    },
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
                // StartTime: useStartTime,
                // EndTime: useEndTime,
                StartTime: "2024-12-01",
                EndTime: "2024-12-05",
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            if (type === 2) {
                dailyPatchList0.value = response.data.Data;
            } else if (type === 4) {
                dailyPatchList1.value = response.data.Data;
            }
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
                await fetchRichList(token, 2);
                await fetchRichList(token, 4);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchRichList(token, 2);
                await fetchRichList(token, 4);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});
</script>

<style scoped>
.storeBac {
    background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png),
        url(/images/bg-02.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.slogan {
    background: linear-gradient(to bottom, #fff, #43a5ee);
    background: -webkit-linear-gradient(#fff, #43a5ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.subSlogan {
    color: #fff;
}
:deep(.el-statistic__number) {
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    background: -webkit-linear-gradient(#fff, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    font-size: 36px;
}
.plus {
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    background: -webkit-linear-gradient(#fff, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    font-size: 36px;
}
.matchBox {
    position: relative;
    border-radius: 25px;
    background: transparent;
    margin: 1rem;
}

.matchBox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    padding: 2px;
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.matchContent {
    border-radius: 25px;
    border: none;
    background: transparent;
    padding: 2rem 1rem;
    text-align: center;
}
.tableTh {
    padding-bottom: 1rem;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%)
        1;
}
.tableTd {
    padding: 1rem 0;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%)
        1;
}
.platformName {
    background: linear-gradient(to bottom, #fff, #43a5ee);
    background: -webkit-linear-gradient(#fff, #43a5ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 700;
}
.patchNumber {
    background: linear-gradient(to bottom, #43a5ee, #fff);
    background: -webkit-linear-gradient(#43a5ee, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 700;
}
.hotTitle {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 36px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.gameTitle {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 36px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.titleLeftBorder {
    width: 40px;
    border: 2px solid;
    border-right: none;
    height: 10px;
    border-image: linear-gradient(to right, #fff, #43edff) 1;
    margin-right: 1rem;
}
.titleRightBorder {
    width: 40px;
    border: 2px solid;
    border-left: none;
    height: 10px;
    border-image: linear-gradient(to left, #fff, #43edff) 1;
    margin-left: 1rem;
}
.topTitle {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 26px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.topTableTh {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    font-weight: 600;
}
.topTableBorder {
    position: relative;
}
.topTableBorder::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.topTableThRight {
    border-left: 2px solid #fff;
}
.topTableTd {
    color: #fff;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #43edff, #fff) 1;
}
.topTableTd:last-child {
    border-bottom: none; /* 移除邊框 */
}
.topPatch {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 20px;
}
:deep(.el-button.is-plain){
    --el-button-hover-bg-color: rgba(0,0,0,0);
    --el-button-hover-border-color: rgba(0,0,0,0);
    --el-button-bg-color: rgba(0,0,0,0);
    --el-button-border-color: rgba(0,0,0,0);
}
</style>