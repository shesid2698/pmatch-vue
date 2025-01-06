<template>
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% xl:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="lg:p-50px w-100%">
            <div class="flex flex-col lg:flex-row">
                <div class="mr-30px">
                    <div class="w-300px h-55px bg-[#3caadc] border-1 border-solid border-[#3caadc] text-white text-[20px] font-500 text-center content-center">回饋總遊戲幣</div>
                    <div class="w-300px border-1 border-solid border-[#ced2db]">
                        <el-scrollbar max-height="200px">
                            <div class="flex border-b-1px border-b-solid border-[#ced2db] last:border-none"
                                 v-for="i in 100">
                                <div class="w-50% text-16px text-black font-500 p-2 border-r-1px border-r-solid border-[#ced2db]">錢街online</div>
                                <div class="flex-1 p-2 text-16px text-black font-500 text-end">952</div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>

                <div class="mt-30px lg:mt-0 w-auto lg:w-400px rounded-5px border-2px border-solid border-gray-300 p-20px h-fit">
                    <div class="flex">
                        <div class="flex items-center w-50% m-t-3px text-black text-20px font-500  h-fit">
                            <div class="me-5px">回饋分潤設定</div>

                            <el-tooltip class="box-item"
                                        effect="dark"
                                        placement="top">
                                <template #content>
                                    <div class="text-14px">
                                        此設定為媒合商所提供回饋的分配比例，總和為100%。<br />
                                        例如媒合商提供回饋比例為1%，<br />
                                        設定為70%-30%，則實際計算分配比例為0.7%-0.3%。
                                    </div>
                                </template>
                                <div class="inline-block w-15px h-15px rounded-50% border-2px border-solid border-#acb4c2 text-10px font-1000 text-#acb4c2 text-center content-center">i</div>
                            </el-tooltip>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center mb-5">
                                <div class="text-black text-20px font-500">本會員</div>
                                <div class="w-80px h-30px relative border-1px border-solid border-#ced2db">
                                    <input type="number"
                                           v-model="mainPercent"
                                           @input="SettingPercent"
                                           class="text-16px text-black left-0 text-end bg-transparent absolute outline-none w-70% border-none top-50% transform-translate-y-[-50%]">
                                    <div class="text-black absolute right-5px top-43% transform-translate-y-[-50%]">%</div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center ">
                                <div class="text-black text-20px font-500">被推薦人</div>
                                <div class="w-80px bg-gray-100 h-30px relative border-1px border-solid border-#ced2db">
                                    <input type="number"
                                           disabled
                                           v-model="secondPercent"
                                           class="text-16px text-black left-0 text-end bg-transparent absolute outline-none w-70% border-none top-50% transform-translate-y-[-50%]">
                                    <div class="text-black absolute right-5px top-43% transform-translate-y-[-50%]">%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-50px border-t-1 border-gray-50">
            <el-table :data="tableData"
                      :default-sort="{ prop: 'Createtime', order: 'descending' }"
                      style="width: 100%;"
                      :header-cell-style="{ color: 'white', background: '#3CAADC', fontSize: '20px', fontWeight: '500' }"
                      stripe
                      border>
                <el-table-column prop="Num"
                                 label="序號"
                                 sortable
                                 :sort-orders="['ascending', 'descending']" />
                <el-table-column prop="Account"
                                 label="被推薦人帳號"
                                 sortable
                                 :sort-orders="['ascending', 'descending']" />
                <el-table-column prop="BindingTime"
                                 label="綁定時間"
                                 sortable
                                 :sort-orders="['ascending', 'descending']" />
                <el-table-column prop="Patch"
                                 label="已回饋遊戲幣"
                                 sortable
                                 :sort-orders="['ascending', 'descending']">
                    <template #default="scope">
                        <div v-html="formatPatch(scope.row.Patch)"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="FeedbackTime"
                                 label="最後回饋日"
                                 sortable
                                 :sort-orders="['ascending', 'descending']" />
            </el-table>
        </div>
    </div>
</template>
<script setup>
const mainPercent = ref(0);
const secondPercent = ref(0);
const tableData = ref([]);
const formatPatch = patch => {
    if (Array.isArray(patch)) {
        return patch.map(item => `${item}`).join('<br/>');
    }
    return patch;
};
const SettingPercent = () => {
    if (mainPercent.value > 100) {
        mainPercent.value = 100;
    }
    secondPercent.value = 100 - mainPercent.value;
};
onMounted(() => {
    tableData.value = [
        {
            Num: 1,
            Account: '09*****165',
            BindingTime: '2024-11-02 08:46:58',
            Patch: ['(包)1,200', '(包)1,100', '(包)3,200'],
            FeedbackTime: '2024-06-21'
        },
        {
            Num: 2,
            Account: '09*****165',
            BindingTime: '2024-11-02 08:46:58',
            Patch: '(包)1,200',
            FeedbackTime: '2024-06-21'
        },
        {
            Num: 3,
            Account: '09*****165',
            BindingTime: '2024-11-02 08:46:58',
            Patch: '(包)1,200',
            FeedbackTime: '2024-06-21'
        },
        {
            Num: 4,
            Account: '09*****165',
            BindingTime: '2024-11-02 08:46:58',
            Patch: '(包)1,200',
            FeedbackTime: '2024-06-21'
        },
        {
            Num: 5,
            Account: '09*****165',
            BindingTime: '2024-11-02 08:46:58',
            Patch: '(包)1,200',
            FeedbackTime: '2024-06-21'
        }
    ];
});
</script>
<style>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
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
    background: #f2f2f2;
}
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: #ffffff;
}
:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    align-content: start;
}
</style>
