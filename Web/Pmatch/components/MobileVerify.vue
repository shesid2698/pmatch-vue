<template>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" />
    <div class="ccontainer">
      <div>來自{{from}}</div>
        <div class="flex flex-items-center">
            <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
            <div class="text-20px">會員登入</div>
        </div>
        <div class="mt-15px">
            <div class="flex flex-items-center">
                <div class="w-7% text-[#DC3545]">
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="w-93% text-12px text-gray-6 font-400">
                    當您註冊成功後，系統將會寄送登入帳號到您登錄的電子信箱中，此電子信箱為您日後查詢帳號使用
                </div>
            </div>
        </div>
        <div>
            <div class="mb-5px text-[#484646] font-400 text-15px">
                手機號碼
            </div>
            <div>
                <input type="text"
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div><button  @click="SendCode" class="w-50% bg-[#198754] h-38px text-white outline-none border-none rounded-1 hover:bg-[#157347] cursor-pointer disabled:bg-gray">發送驗證碼</button></div>
        </div>
        <div class="mt-15px">
            <div class="mb-5px text-[#484646] font-400 text-15px">
                驗證碼
            </div>
            <div>
                <input type="text"
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div class="mt-15px">
              <div class="text-11px text-red-8">注意:驗證碼有效時間為10分鐘</div>
            </div>
        </div>
        <div class="mt-5px"><button :disabled="!hasToken"
                        class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray"
                    >
                        驗證手機號碼
                    </button></div>
                    <p>{{ exp }}</p>
    </div>
</template>
<script setup lang="ts">
let num = "";
const { encrypt,decrypt } = crypto()
const exp = ref(60)
const props = defineProps({
  from: String,
});
const hasToken = ref(false)
const Token = useCookie(`${props.from}Token`);
const SendCode=()=>{
  for (let i = 0; i < 6; i++) {
    num+=Math.floor(Math.random() * 10).toString();
  }
  setInterval(function(){
    exp.value--
  },1000)
  Token.value=encrypt(num)
}
onMounted(()=>{

});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    width: 100%;
}
</style>
