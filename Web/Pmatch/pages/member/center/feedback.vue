
<template>
    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title" content="PMatch遊戲道具交易平台" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css?version='0.0.1.10'" />
    <div>
        <div class="ccontainer pt-60px ps-5 pe-5 w-90% xl:w-70%">
            <div class="lg:w-160px">
                <MemberCenter></MemberCenter>
            </div>
            <!-- <div class="flex lg:pl-20px w-100% flex-col lg:flex-row"> -->
            <div class="lg:pl-20px w-100%">
                <div class="flex flex-col lg:flex-row mb-10">
                    <div class="w-100% lg:w-43% flex flex-col justify-between h-50px lg:h-250px">
                        <div class="flex w-100% justify-between">
                            <div class="whitespace-nowrap text-[20px] font-500 text-black line-height-50px">
                                {{
                                    memberRewardList.Type === 2
                                        ? "我的推薦碼"
                                        : "綁定推薦碼"
                                }}
                            </div>
                            <div>
                                <div class="flex h-55px">
                                    <div class="w-100px lg:w-235px border-solid border-1 border-[#ced2db] text-end content-center p-x-10px text-[24px] text-black font-500">
                                        {{
                                            memberRewardList.Type === 2
                                                ? memberRewardList.InviteCode
                                                : memberRewardList.RefferCode
                                        }}
                                    </div>
                                    <div class="w-75px lg:w-95px h-100% text-center bg-[#3caadc] content-center text-white font-500 text-[20px] font-500 text-[18px] text-[#757575]"
                                         :class="timeValue > 0 ? 'bg-#3caadc' : 'bg-#959595'">
                                        {{ timeValue > 0 ? "開啟中" : "關閉中" }}
                                    </div>
                                </div>
                                <div class="text-end m-t-10px flex items-center justify-end"
                                     v-show="timeValue > 0">
                                    <div class="me-5">剩餘時間</div>
                                    <div>
                                        <el-countdown :value="Date.now() + timeValue"
                                                      v-on:change="GetTimes"
                                                      format="DD [天] HH:mm:ss" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-30px lg:mt-0 flex h-30px items-center justify-between">
                            <div class="whitespace-nowrap h-100% font-500 text-black text-[20px] content-center">
                                當前回饋%數
                            </div>
                            <div class="h-100% flex">
                                <div class="w-100px lg:w-180px relative">
                                    <select v-model="selectedPlatform"
                                            @change="RewardPlatformChange"
                                            class="text-[16px] bg-transparent absolute left-0 top-0 z-1 outline-none p-e-25px border-1 border-solid border-[#ced2db] font-500 text-black text-center w-100% h-100%">
                                        <option value="">-選擇平台-</option>
                                        <option v-for="(
                                                item, index
                                            ) in memberRewardList.PlatformsReward"
                                                :key="index"
                                                :value="item.PlatformName">
                                            {{ item.PlatformName }}
                                        </option>
                                    </select>
                                    <div class="z-0 inline-block absolute right-10px top-50% transform-translate-y-[-50%]">
                                        <svg width="26"
                                             height="10"
                                             viewBox="0 0 26 10"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L13 9L25 1"
                                                  stroke="#CED2DB"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ms-5">
                                    <div class="flex">
                                        <span class="me-3">委買</span>
                                        <div class="bg-[#f5f6f8] font-500 text-black mb-3 text-end content-center w-84px border-solid border-1 border-[#ced2db] text-[16px]">
                                            {{ buyRewardValue }} %
                                        </div>
                                    </div>

                                    <div class="flex">
                                        <span class="me-3">委賣</span>
                                        <div class="bg-[#f5f6f8] font-500 text-black text-end content-center w-84px border-solid border-1 border-[#ced2db] text-[16px]">
                                            {{ sellRewardValue }} %
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden min-w-100px lg:block"></div>
                    <div class="w-100% lg:w-55% flex flex-wrap mt-150px lg:mt-0">
                        <div v-for="(
                                item, index
                            ) in memberRewardList.PlatformsReward"
                             :key="index"
                             class="max-w-41% lg:max-w-33% p-e-30px mb-30px">
                            <div class="font-500 text-[20px] w-165px h-55px bg-[#ff83ad] border-1 border-solid border-[#ff83ad] text-center content-center text-white">
                                {{ item.PlatformName }}
                            </div>
                            <div class="font-500 text-[20px] text-black w-155px h-55px border-1 border-solid border-[#ced2db] bg-white text-end content-center pr-10px">
                                {{ item.Value }}&emsp;幣
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div id="detail" class="flex items-center mb-10px mt-30px">
                    <div class="mr-15px text-black content-center font-500 text-[20px] border-none">
                        明細
                    </div>
                    <div class="relative rounded-[10px] bg-[#14ae5c] w-117px h-25px">
                        <select v-model="dataDate"
                                class="text-[16px] rounded-[10px] z-1 absolute top-0 left-0 outline-none w-100% h-100% bg-transparent border-none text-white text-center content-center">
                            <option value="0" class="bg-[#14ae5c]">
                                近30日
                            </option>
                            <option value="1" class="bg-[#14ae5c]">
                                近3個月
                            </option>
                            <option value="2" class="bg-[#14ae5c]">
                                近半年
                            </option>
                            <option value="3" class="bg-[#14ae5c]">
                                近1年
                            </option>
                            <option value="4" class="bg-[#14ae5c]">自訂</option>
                        </select>
                        <div class="absolute right-10% top-50% transform-translate-y-[-50%] z-0">
                            <svg width="15"
                                 height="15"
                                 viewBox="0 0 15 15"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect width="15"
                                      height="15"
                                      fill="url(#pattern0_41_592)" />
                                <defs>
                                    <pattern id="pattern0_41_592"
                                             patternContentUnits="objectBoundingBox"
                                             width="1"
                                             height="1">
                                        <use xlink:href="#image0_41_592"
                                             transform="scale(0.0078125)" />
                                    </pattern>
                                    <image id="image0_41_592"
                                           width="128"
                                           height="128"
                                           xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABCRJREFUeJzt3M2rVXUUxvHvqrTUSku0gkKiUTSLoEEDzTIlMQpq0CAhcBA0MYIGDYIGDRpEBUEDIQgUDNGgrESzvGkmRWXSm0mERBSJvZA37eXep8E+xUWOh5v3t/fa5+zn8westfZvPXffe/fZHDAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzsxaJUoUkXQY8BFxSqqb1dRx4OiKOlShWMgD7gJtK1bOBxiJiWYlCJQNwCji/VD0baDwiLixR6JwSRXo2Fqxlg20qVajkHWAWsBVYU6qm9bUDuDMi/ihRrFgAACTNBrYBq0vWtf/sAu6IiFOlChYNAICkOcB2YHnp2h23D1gVEeMlixYPAICkucDrwNI66nfQfmBlRJwoXbiWAABIuhjYCdxYV4+OOADcFhG/1VG8tgAASJoPvAncUGefEXYQuCUifqqrQa0BAJC0ANgNXF93rxFzCFgeEcfrbFJ7AAAkLQLeBq5rot8IOAwsi4gf6m7USAAAJC0G9gDXNtVzSB0BlkbE9000aywAAJKupArBNU32HSJHqZZ/tKmGjQYAQNJVwBhwddO9W+5bquV/02TTxgMAIGkJVQiWZPRvoe+olv91041Lfhg0bb1b3Aqgkd9zLfcjsCJj+ZAUAICIOALcDNT+l26LHaP6V++LrAHSAgAQEYeBlVRvuXTNL1TP9j/LHCI1AAARcQi4Ffg5e5YG/Ur1ePej7EHSAwAQEQeB24Fanne3zDiwJiI+yB4EWhIAgIg4AKwCin/i1SK/A6sjYm/2IP9qTQAAImI/1Z2g6GfeLXGS6id/LHuQqVoVAIDeT8ddQLG3XlrgT+CeiHgre5DTtS4AABGxiyoERd57S/YXcHdEvJY9SD+tDABAROwA7gX+zp5lBiaA+yLi1exBzqS1AQCIiJcZ3hBMAGsj4qXsQYaepLWSJjQ8JiWtyz63kSLpfg1HCCYlPZB9XiNJ0rreAbfVpKQHs89ppElan73lAR7JPp9OkPRw9qb7eDT7XDpF0uPZG5/isezz6CRJT2RvXtJT2efQaZKeTFz+M9nX33mSQtJzCcvfICnlnUo7TS8Ezze4/Bcktfopauf0QrChgeW/6OW3lKRzJW2qcflbJJ2XfZ02QC8Em2tY/jYvf0hImiXplYLLf0OSvwFtmEiaLWl7geXvlHRB9vXYWZA0R9LuGSx/r6R52ddhMyBprqQ9Z7H8dyUV+TJGSyZpnqR3/sfy35N0UfbcVpCk+ZLen8byP5Z0afa8VgNJCyR9OGD5n0hamD2n1UjSIkmf9ln+l5Iuz57PGiBpsaTPpyz/K0lXZM+VobOfZvVu9esBAc/W/XVsZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm0/APBjFgz0mKqV4AAAAASUVORK5CYII=" />
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div v-show="showDateChoose" class="ml-10px">
                        <el-config-provider :locale="zhCn">
                            <el-date-picker v-model="dateValue"
                                            type="daterange"
                                            range-separator="To"
                                            start-placeholder="起始日期"
                                            end-placeholder="結束日期"
                                            @change="Getdate" />
                        </el-config-provider>
                    </div>
                </div>
                <div v-infinite-scroll="load"
                     class="infinite-table-container"
                     style="overflow: auto; height: 400px">
                    <el-table :data="tableData"
                              style="width: 100%"
                              :header-cell-style="{
                            color: 'white',
                            background: '#3CAADC',
                        }"
                              stripe
                              border>
                        <el-table-column prop="EndTime"
                                         label="日期"
                                         :formatter="formatDate2" />
                        <el-table-column prop="Item"
                                         label="項目" />
                        <el-table-column prop="Amount"
                                         label="數量" />
                        <el-table-column prop="Remark"
                                         label="備註" />
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import zhCn from "element-plus/es/locale/lang/zh-cn";
    import { useAlertModalStore } from "../stores/useAlertModal.js";
    const alertModalStore = useAlertModalStore();
    const openAlertModal = alertModalStore.alertShowModal;
    const MemberIdCookie = useCookie("_PmMemberId");
    const tokenCookie = useCookie("_PmToken");
    const { $axios } = useNuxtApp();

    const jwtStore = useJwtStore();
    const dataDate = ref("0");
    const dateValue = ref("");
    const memberRewardList = ref([]);
    const tableData = ref([]);
    let firstLoad = true;

    // 當前選中的平台
    const selectedPlatform = ref("");
    // 委買與委賣值
    const buyRewardValue = ref("0");
    const sellRewardValue = ref("0");
    // 動態計算的開始和結束時間
    const startTime = ref("");
    const endTime = ref("");
    const showDateChoose = ref(false);
    const currentPage = ref(1);
    const timeValue = ref(0);
    // 更新時間範圍的方法
    const updateTimeRange = async () => {
        if (dataDate.value === "4") {
            showDateChoose.value = true;
        } else {
            showDateChoose.value = false;
            const now = new Date();
            const offsetDays = {
                0: 30, // 近30日
                1: 90, // 近3個月
                2: 180, // 近半年
                3: 365, // 近1年
            };
            const selectedOffset = offsetDays[dataDate.value];
            if (selectedOffset) {
                // 自動計算時間範圍
                const start = new Date(now);
                start.setDate(now.getDate() - selectedOffset);

                startTime.value = formatDate(start, true);
                endTime.value = formatDate(now, true);
            }
            await fetchOrderListData();
        }
    };

    // 轉換日期格式為 yyyy-MM-dd(T)HH:mm:ss
    const formatDate=(date, isIncludeT)=>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        var ret = '';

        if (isIncludeT == true) { ret = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; }
        else { ret = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; }

        return ret;
    };

    //
    const formatDate2=(row, column, cellValue)=> {
        // Localtime to ISO
        var date = new Date(cellValue);
        var ret = formatDate(date, false);

        return ret;
    };

    // 變更委買委賣的值
    const RewardPlatformChange = () => {
        const platform = memberRewardList.value.PlatformsReward.find(
            (item) => item.PlatformName === selectedPlatform.value
        );
        if (platform) {
            buyRewardValue.value = platform.BuyRewardValue;
            sellRewardValue.value = platform.SellRewardValue;
        } else {
            // 如果未選擇平台，回退到預設值
            buyRewardValue.value = "0";
            sellRewardValue.value = "0";
        }
    };
    // 取得回饋資訊
    async function fetchRewardListData() {
        if (!tokenCookie.value && !MemberIdCookie.value) {
            await openAlertModal(" ", "請先登入會員");
        }

        try {
            const response = await $axios.post(
                "/api/v1/Pmatch/GetMemberReward",
                {
                    MemberId: MemberIdCookie.value,
                },
                {
                    headers: {
                        Authorization: tokenCookie.value, // 帶上 Token
                    },
                }
            );
            if (response.data.Status.Code === 0) {
                memberRewardList.value = response.data.Data;
                if (memberRewardList.value != null)
                {
                    // 清除時間
                    timeValue.value = 0;
                    // EndTime = null 表示推薦碼已經停用
                    if (memberRewardList.value.EndTime != null) {

                        // 計算推薦碼狀態
                        const endTimeString = memberRewardList.value.ActivityEndTime;
                        const endTime = new Date(endTimeString).getTime();
                        const now = Date.now();

                        // 計算差值
                        const difference = endTime - now;

                        // 確保不會有負值
                        timeValue.value = Math.max(difference, 0);
                    }
                }
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error("請求失敗:", error);
        }
    }
    // 取得回饋明細
    async function fetchOrderListData() {
        if (!tokenCookie.value && !MemberIdCookie.value) {
            await openAlertModal(" ", "請先登入會員");
        }
        try {
            const response = await $axios.post(
                "/api/v1/Pmatch/GetDownlineOrder",
                {
                    PmatchMemberId: MemberIdCookie.value,
                    StartTime: startTime.value,
                    EndTime: endTime.value,
                    PageSize: 10,
                    PageNo: currentPage.value,
                },
                {
                    headers: {
                        Authorization: tokenCookie.value, // 帶上 Token
                    },
                }
            );
            if (response.data.Status.Code === 0) {
                tableData.value = response.data.Data;
                if (tableData.value != null && tableData.value.length > 0) {
                    currentPage.value = tableData.value.CurrentPage;
                }
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error("請求失敗:", error);
        }
    }

    const load = async () => {
        if (tableData.value.length > 0 && currentPage.value) {
            try {
                const formattedStartTime = new Date(startTime.value).toISOString();
                const formattedEndTime = new Date(endTime.value).toISOString();
                // 調用 API 加載數據
                const response = await $axios.post(
                    "/api/v1/Pmatch/GetDownlineOrder",
                    {
                        PmatchMemberId: MemberIdCookie.value,
                        StartTime: formattedStartTime,
                        EndTime: formattedEndTime,
                        PageSize: 10,
                        PageNo: currentPage.value,
                    },
                    {
                        headers: {
                            Authorization: tokenCookie.value, // 帶上 Token
                        },
                    }
                );
                const newData = response.data.Data;

                // 更新表格數據
                if (newData.length > 0) {
                    tableData.value.push(...newData);
                    currentPage.value++;
                } else {
                    if (firstLoad === true) {
                        return;
                    } else {
                        await openAlertModal(" ", "已經是最後一頁了"); // 無更多數據
                    }
                }
            } catch (error) {
                console.error("加載數據失敗：", error);
            } finally {
            }
        }
    };

    const Getdate = async () => {
        if (dataDate.value === "4" && dateValue.value.length === 2) {
            startTime.value = formatDate(dateValue.value[0], true);

            // 結束時間設定為當天的 23:59:59
            var ed = new Date(dateValue.value[1]).setHours(23, 59, 59, 0);
            var ed2 = new Date(ed);
            endTime.value = formatDate(ed2, true);
        }
        await fetchOrderListData();
    };
    const DateFormatt = (date) => {
        var t_Date =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0") +
            " " +
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0") +
            ":" +
            String(date.getSeconds()).padStart(2, "0");
        return t_Date;
    };
    const GetTimes = time => {
        timeValue.value = time;
    }
    onMounted(async () => {
        try {
            await fetchRewardListData();
            await updateTimeRange();
        } catch (error) {
            console.error("請求失敗:", error);
        }
    });
    // 監聽 dataDate 的變化
    watch(dataDate, () => {
        updateTimeRange();
    });
</script>
<style scoped>
    .ccontainer {
        height: fit-content;
        display: flex;
        margin: 0 auto;
    }

    select {
        appearance: none;
    }

    :deep(.el-table .descending .sort-caret.descending) {
        border-top-color: white;
    }

    :deep(.el-table .ascending .sort-caret.ascending) {
        border-bottom-color: white;
    }

    :deep(.el-table .sort-caret.ascending) {
        border-bottom-color: #b1ddf177;
    }

    :deep(.el-table .sort-caret.descending) {
        border-top-color: #b1ddf177;
    }

    :deep(.el-table tr) {
        /* background: #e6e6e6; */
        background: #f2f2f2;
    }

    :deep( .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell ) {
        background: #ffffff;
    }

    :deep(.el-range-editor.el-input__wrapper) {
        width: 250px;
        height: 25px;
    }
</style>
