<template>
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
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <div class="md:flex flex-items-center mb-5">
                <div
                    class="pb-2 md:pb-0 w-100% md:w-45% flex flex-items-center pr-3"
                >
                    <div>起始時間:&nbsp;</div>
                    <div class="flex-1">
                        <input
                            type="date"
                            v-model="startTime"
                            class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%"
                        />
                    </div>
                </div>
                <div
                    class="pb-2 md:pb-0 w-100% md:w-45% flex flex-items-center pr-3"
                >
                    <div>結束時間:&nbsp;</div>
                    <div class="flex-1">
                        <input
                            type="date"
                            v-model="endTime"
                            class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%"
                        />
                    </div>
                </div>
                <div class="flex-1">
                    <button
                        @click="GetData"
                        class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#1A6DB4 hover:bg-#0b5ed7 transition duration-200 cursor-pointer"
                    >
                        提交
                    </button>
                </div>
            </div>
            <div>
                <div class="mb-3 flex justify-between flex-items-center">
                    <div>
                        顯示
                        <select
                            name=""
                            v-model="pageCount"
                            class="box-border p-y-1.5 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        項結果
                    </div>
                </div>

                <el-table
                    :data="tableData"
                    :default-sort="{ prop: 'Createtime', order: 'descending' }"
                    style="width: 100%"
                    :header-cell-style="{
                        color: 'white',
                        background: '#3CAADC',
                    }"
                    stripe
                    border
                >
                    <el-table-column
                        prop="Createtime"
                        label="日期"
                    />
                    <el-table-column
                        prop="GameplatformName"
                        label="營運平台"
                    />
                    <el-table-column
                        prop="NickName"
                        label="媒合商"
                    />
                    <el-table-column
                        prop="Patch"
                        label="數量"
                    />
                    <el-table-column
                        prop="GamecurrencyName"
                        label="單位"
                    />
                    <el-table-column
                        prop="Status"
                        label="狀態"
                    />
                </el-table>
                <div class="flex justify-between">
                    <div>頁次:{{ curPage }}/{{ totalPage }}</div>
                    <div>
                        <button
                            v-if="curPage !== 1"
                            @click="PrevPage"
                            class="bg-primary border-none text-[15px] rounded-[5px] bg-#1A6DB4 hover:bg-#0b5ed7 p-x-10px p-y-5px text-white cursor-pointer"
                        >
                            上一頁
                        </button>
                        <button
                            @click="NextPage"
                            v-if="curPage !== totalPage"
                            class="bg-primary border-none text-[15px] rounded-[5px] bg-#1A6DB4 hover:bg-#0b5ed7 p-x-10px p-y-5px text-white cursor-pointer"
                        >
                            下一頁
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const userToken = useCookie("_PmToken");
const memberId = useCookie("_PmMemberId");
const pageCount = ref(10);
const curPage = ref(1);
const totalPage = ref(1);
const startTime = ref("");
const endTime = ref("");
let OriTableData = [];
const tableData = ref([]);

/**
 * 切換分頁事件
 */
const NextPage = async () => {
    curPage.value += 1;
    await GetData();
};
const PrevPage = async () => {
    curPage.value -= 1;
    await GetData();
};
const formatDateTimeIntl = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份從 0 開始
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
onMounted(async () => {});
const GetData = async () => {
    try {
        if (
            userToken.value !== undefined &&
            userToken.value !== "" &&
            startTime.value !== "" &&
            endTime.value !== ""
        ) {
            const response = await $axios.post(
                "/api/v1/Pmatch/GetAccountingList",
                {
                    PmatchMemberId: memberId.value,
                    StartTime: startTime.value + "T00:00:00",
                    EndTime: endTime.value + "T23:59:59",
                    PageNo: curPage.value,
                    PageSize: pageCount.value,
                },
                {
                    headers: {
                        Authorization: userToken.value,
                    },
                }
            );

            if (response.data.Status.Code === 0) {
                if (response.data.Data.length === 0) {
                    await openAlertModal(" ", "查無資料");
                    return;
                }
                OriTableData = response.data.Data;
                OriTableData.forEach((x) => {
                    x.Createtime = formatDateTimeIntl(x.Createtime);
                    totalPage.value = x.TotalPage;
                    switch (x.Status) {
                        case 0:
                            x.Status = "處理中";
                            break;
                        case 1:
                            x.Status = "已完成";
                            break;
                        case 2:
                            x.Status = "已取消";
                            break;
                        case 2:
                            x.Status = "異常";
                            break;
                    }
                });
                tableData.value = [...OriTableData.slice(0, pageCount.value)];
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
};
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
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
    background: #e6e6e6;
}
:deep(
        .el-table--striped
            .el-table__body
            tr.el-table__row--striped
            td.el-table__cell
    ) {
    background: white;
}
</style>
