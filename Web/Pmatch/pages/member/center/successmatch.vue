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
                               class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%">
                    </div>
                </div>
                <div class="pb-2 md:pb-0 w-100% md:w-45% flex flex-items-center pr-3">
                    <div>結束時間:&nbsp;</div>
                    <div class="flex-1">
                        <input type="date"
                               class="box-border p-y-1 p-x-3 text-base flex-1 outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 w-100%">
                    </div>
                </div>
                <div class="flex-1"><button class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#1A6DB4 hover:bg-#0b5ed7 transition duration-200 cursor-pointer">提交</button></div>
            </div>
            <div>
                <div class="mb-3 flex justify-between flex-items-center">
                    <div>顯示
                        <select name=""
                                v-model="pageCount"
                                @change="ChangePageCount"
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
                          :default-sort="{ prop: 'date', order: 'descending' }"
                          style="width: 100%;"
                          :header-cell-style="{color:'white',background:'#3CAADC'}"
                          stripe
                          border>
                    <el-table-column prop="date"
                                     label="時間"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="platform"
                                     label="營運平台"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="matchMaker"
                                     label="媒合商"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="status"
                                     label="狀態"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="total"
                                     label="數量"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="unit"
                                     label="單位"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                    <el-table-column prop="phone"
                                     label="電話"
                                     sortable
                                     :sort-orders="['ascending','descending']" />
                </el-table>
                <el-pagination background
                               layout="prev, pager, next"
                               :total="OriTableData.length"
                               :page-size="pageCount"
                               @change="ChangePage" />
            </div>
        </div>
    </div>
</template>
<script setup>
const searchStr = ref('');
const pageCount = ref(10);
const curPage = ref(1);

const OriTableData = [
    {
        date: '2016-05-03',
        platform: '滿貫大亨',
        matchMaker: 'et3',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-02',
        platform: '滿貫大亨',
        matchMaker: 'et2',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-04',
        platform: '滿貫大亨',
        matchMaker: 'et4',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,462',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,666',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,444',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,777',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,785',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,586',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,125',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,687',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,215',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,735',
        unit: '滿幣',
        phone: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,456',
        unit: '滿幣',
        phone: '委託中'
    }
];
const tableData = ref(null);
tableData.value = [...OriTableData.slice(0, pageCount.value)];
/**
 * 切換分頁事件
 */
const ChangePage = page => {
    curPage.value = page;
    let startSlice = (page - 1) * pageCount.value;
    let endSlice = page * pageCount.value;
    tableData.value = [...OriTableData.slice(startSlice, endSlice)];
};
const ChangePageCount = () => {
    ChangePage(curPage.value);
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
