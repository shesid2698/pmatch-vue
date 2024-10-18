<template>
    <div>
        <el-button
                   @click="dialogTableVisible = true">
            Open a Table nested Dialog
        </el-button>

        <el-dialog v-model="dialogTableVisible"
                   title="手機驗證"
                   :width="dialogWidth">
            <keep-alive>
                <MobileVerify from="edit" index=1 @isVerify="getVerify" ></MobileVerify>
            </keep-alive>

        </el-dialog>
        <div>
    </div>
    </div>

</template>

<script lang="ts" setup>
const dialogTableVisible = ref(false);
const dialogWidth = ref('370px');
const getVerify=(result)=>{
  if(result === true){
    dialogTableVisible.value = false
  }
}
onMounted(() => {
    const updateDialogWidth = () => {
        if (window.innerWidth <= 768) {
            dialogWidth.value = '90%'; // MD 裝置或以下設置寬度為 370px
        } else {
            dialogWidth.value = '370px'; // 其他裝置設置寬度為 800px
        }
    };

    // 初次加載時設置
    updateDialogWidth();

    // 監聽視窗尺寸變化
    window.addEventListener('resize', updateDialogWidth);
});
</script>
<style scoped>
</style>
