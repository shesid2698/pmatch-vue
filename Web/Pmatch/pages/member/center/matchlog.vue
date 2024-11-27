<template>
    <div class="ccontainer w-90% lg:w-70%">
        <div class="lg:min-w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <div>
                <el-table :data="tableData"
                          :default-sort="{ prop: 'date', order: 'descending' }"
                          style="width: 100%;"
                          :header-cell-style="{color:'white',background:'#3CAADC'}"
                          stripe
                          border>
                    <el-table-column prop="date"
                                     label="日期"
                                     sortable
                                     />
                    <el-table-column prop="platform"
                                     label="營運平台"
                                     sortable />
                    <el-table-column prop="matchMaker"
                                     label="媒合商"
                                     sortable />
                    <el-table-column prop="status"
                                     label="狀態"
                                     sortable />
                    <el-table-column prop="total"
                                     label="數量"
                                     sortable />
                    <el-table-column prop="unit"
                                     label="單位"
                                     sortable />
                    <el-table-column prop="entrustStatus"
                                     label="委託狀態"
                                     sortable />
                </el-table>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus';

interface User {
    date: String;
    platform: String;
    matchMaker: String;
    status: String;
    total: String;
    unit: String;
    entrustStatus: String;
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        platform: '滿貫大亨',
        matchMaker: 'et3',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        entrustStatus: '委託中'
    },
    {
        date: '2016-05-02',
        platform: '滿貫大亨',
        matchMaker: 'et2',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        entrustStatus: '委託中'
    },
    {
        date: '2016-05-04',
        platform: '滿貫大亨',
        matchMaker: 'et4',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        entrustStatus: '委託中'
    },
    {
        date: '2016-05-01',
        platform: '滿貫大亨',
        matchMaker: 'et1',
        status: '完成',
        total: '1,200',
        unit: '滿幣',
        entrustStatus: '委託中'
    }
];
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
colgroup{
  background: blue;
}
:deep(.el-table__cell .caret-wrapper .sort-caret){
  color:red;
}
</style>
