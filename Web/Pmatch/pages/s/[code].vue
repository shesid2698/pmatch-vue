<template>
  <h1>123</h1>
</template>
<script setup>
const {$axios} = useNuxtApp();
const code = ref('');
const route = useRoute();
onMounted(async()=>{
  // try {
  //       if (
  //           userToken.value !== undefined &&
  //           userToken.value !== '' &&
  //           startTime.value !== '' &&
  //           endTime.value !== ''
  //       ) {
  //           const response = await $axios.post(
  //               'http://localhost:2450/api/v1/Pmatch/GetAccountingList',
  //               {
  //                   PmatchMemberId: memberId.value,
  //                   StartTime: startTime.value,
  //                   EndTime: endTime.value,
  //                   PageNo: curPage.value,
  //                   PageSize: pageCount.value
  //               },
  //               {
  //                   headers: {
  //                       Authorization: userToken.value
  //                   }
  //               }
  //           );

  //           if (response.data.Status.Code === 0) {
  //               OriTableData = response.data.Data;
  //               OriTableData.forEach(x => {
  //                   x.Createtime = formatDateTimeIntl(x.Createtime);
  //                   totalPage.value = x.TotalPage;
  //                   switch (x.Status) {
  //                       case 0:
  //                           x.Status = '處理中';
  //                           break;
  //                       case 1:
  //                           x.Status = '已完成';
  //                           break;
  //                       case 2:
  //                           x.Status = '已取消';
  //                           break;
  //                       case 2:
  //                           x.Status = '異常';
  //                           break;
  //                   }
  //               });
  //               tableData.value = [...OriTableData.slice(0, pageCount.value)];
  //           } else {
  //               alert(`${response.data.Status.Message}`);
  //           }
  //       }
  //   } catch (error) {
  //       console.error('請求失敗:', error);
  //   }
});
</script>
<style scoped></style>
