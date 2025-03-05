<template>
  <div class="mt-100px">
    <button @click="dialogVisible=true">出現吧</button>
    <el-dialog v-model="dialogVisible"
               width="500"
               align-center
               :show-close="false"
               :close-on-click-modal="false">
        <div class="relative w-100% h-40px content-center text-center text-18px font-700">
            <span class="cursor-pointer flex  absolute right-10px top-50% transform-translate-y-[-50%]"
            @click="dialogVisible=false">
                <img width="20"
                     src="/images/close.png"
                     alt="">
            </span>
        </div>
        <div class="px-5 pb-2 max-h-400px scrollbar" @scroll="e=>dialogVisible =e.target.scrollHeight -e.target.scrollTop === e.target.clientHeight?false:true">
            【蒐集個人資料告知事項】
            <br>
            <br>
            紫海數位科技有限公司(以下簡稱本公司)為遵守個人資料保護法規定，在您提供個人資料予本公司前，依法告知下列事項：
            <br>
            <br>
            一、本公司因辦理抽獎活動而獲取您的姓名、國民身分證統一編號、戶籍地址、通訊地址、帳戶銀行代號及帳號所載個人資料；蒐集之個人資料類別為：「Ｃ○○一 辨識個人者」、「Ｃ○○三 政府資料中之辨識者」。
            <br>
            <br>
            二、本公司依據個人資料保護法及相關法令之規定下，與本公司隱私權保護政策，為蒐集、處理及利用您的個人資料。
            <br>
            <br>
            三、本公司將於蒐集目的之存續期間內合理利用您的個人資料。
            <br>
            <br>
            四、本公司僅於中華民國領域內利用您的個人資料。
            <br>
            <br>
            五、您可依個人資料保護法第 3 條規定，就您的個人資料以書面或電子郵件向本公司請求以下權利：
            <br>
            (一)查詢或請求閱覽。
            <br>
            (二)請求製給複製本。
            <br>
            (三)請求補充或更正。
            <br>
            (四)請求停止蒐集、處理及利用。
            <br>
            (五)請求刪除。
            您因行使上述權利而導致對您的權益產生減損時，本公司不負相關賠償責任。另依個人資料保護法第 14 條規定，本公司得酌收行政作業費用。
            <br>
            <br>
            六、您瞭解此一同意書符合個人資料保護法及相關法規之要求，且同意本公司留存此同意書，供日後取出查驗。
            <br>
            <br>
            個人資料之同意提供
            <br>
            一、 本人已充分知悉上述告知事項。
            <br>
            二、 本人同意紫海數位科技有限公司活動之蒐集目的範圍內，得蒐集、處理及利用本人提供之個人資料。
        </div>
    </el-dialog>
  </div>


</template>

<script setup>
const dialogVisible = ref(false);
</script>
<style scoped>

</style>
