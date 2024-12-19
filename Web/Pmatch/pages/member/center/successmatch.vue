<template>
    <div class="ccontainer w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <div class="md:flex flex-items-center mb-5">
                <div class="pb-2 md:pb-0 w-100% md:w-45% flex flex-items-center pr-3">
                    <div>起始時間:&nbsp;</div>
                    <div class="flex-1">
                        <input type="date"
                               v-model="startTime"
                               class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%">
                    </div>
                </div>
                <div class="pb-2 md:pb-0 w-100% md:w-45% flex flex-items-center pr-3">
                    <div>結束時間:&nbsp;</div>
                    <div class="flex-1">
                        <input type="date"
                               v-model="endTime"
                               class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%">
                    </div>
                </div>
                <div class="flex-1">
                    <button @click="GetData"
                            class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#1A6DB4 hover:bg-#0b5ed7 transition duration-200 cursor-pointer">提交</button>
                </div>
            </div>
            <div>
                <div class="mb-3 flex justify-between flex-items-center">
                    <div>顯示
                        <select name=""
                                v-model="pageCount"
                                class="box-border p-y-1.5 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        項結果
                    </div>
                </div>

                <el-table :data="tableData"
                          :default-sort="{ prop: 'Time', order: 'descending' }"
                          style="width: 100%;"
                          :header-cell-style="{color:'white',background:'#3CAADC'}"
                          stripe
                          border>
                    <el-table-column prop="Time"
                                     label="時間"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="GamePlat"
                                     label="營運平台"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="GameRole"
                                     label="媒合商"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="Status"
                                     label="媒合商"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="Amount"
                                     label="數量"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="Gamecurrency"
                                     label="單位"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="Phone"
                                     label="電話"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                </el-table>
                <div class="flex justify-between">
                    <div>頁次:{{curPage}}/{{totalPage}}</div>
                    <div>
                        <button v-if="curPage!==1"
                                @click="PrevPage"
                                class="bg-primary border-none text-[15px] rounded-[5px] bg-#1A6DB4 hover:bg-#0b5ed7 p-x-10px p-y-5px text-white cursor-pointer">上一頁</button>
                        <button @click="NextPage"
                                v-if="curPage!==totalPage"
                                class="bg-primary border-none text-[15px] rounded-[5px] bg-#1A6DB4 hover:bg-#0b5ed7 p-x-10px p-y-5px text-white cursor-pointer">下一頁</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $axios } = useNuxtApp();
const userToken = useCookie('_PmToken');
const memberId = useCookie('_PmMemberId');
const pageCount = ref(10);
const curPage = ref(1);
const totalPage = ref(1);
const mobileArr = ref([]);
const startTime = ref('');
const endTime = ref('');
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
const formatDateTimeIntl = dateTimeString => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const maskPhoneNumber = phoneNumber => {
    const prefix = phoneNumber.slice(0, 4);
    const suffix = phoneNumber.slice(-2);
    return `${prefix}****${suffix}`;
};
onMounted(async () => {
    try {
        if (
            userToken.value !== undefined &&
            userToken.value !== '' &&
            memberId.value !== undefined &&
            memberId.value !== ''
        ) {
            const response = await $axios.post(
                '/api/v1/Pmatch/GetMemberDetail',
                {
                    PmatchMemberId: memberId.value
                },
                {
                    headers: {
                        Authorization: userToken.value
                    }
                }
            );

            if (response.data.Status.Code === 0) {
                let mobileArr = [];
                if (response.data.Data[0].Mobile1 !== '')
                    mobileArr.push(response.data.Data[0].Mobile1);
                if (response.data.Data[0].Mobile2 !== '')
                    mobileArr.push(response.data.Data[0].Mobile2);
                if (response.data.Data[0].Mobile3 !== '')
                    mobileArr.push(response.data.Data[0].Mobile3);
            } else {
                alert(`${response.data.Status.Message}`);
            }
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
});
const GetData = async () => {
    try {
        if (
            userToken.value !== undefined &&
            userToken.value !== '' &&
            startTime.value !== '' &&
            endTime.value !== ''
        ) {
            const response = await $axios.post(
                '/api/v1/Pmatch/GetMatchDealList',
                {
                    Phones: mobileArr,
                    StartTime: startTime.value,
                    EndTime: endTime.value,
                    PageNo: curPage.value,
                    PageSize: pageCount.value
                },
                {
                    headers: {
                        Authorization: userToken.value
                    }
                }
            );

            if (response.data.Status.Code === 0) {
                OriTableData = response.data.Data;
                OriTableData.forEach(x => {
                    x.Time = formatDateTimeIntl(x.Time);
                    x.Phone = maskPhoneNumber(x.Phone);
                    totalPage.value = x.TotalPage;
                });
                tableData.value = [...OriTableData.slice(0, pageCount.value)];
            } else {
                alert(`${response.data.Status.Message}`);
            }
        }
    } catch (error) {
        console.error('請求失敗:', error);
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
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: white;
}
</style>
