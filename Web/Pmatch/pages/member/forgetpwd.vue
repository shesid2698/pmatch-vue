<template>
    <div class="ccontainer">
        <div class="login-card w-100% md:w-378px ">
            <div class="flex flex-items-center">
                <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                <div class="text-20px">忘記密碼</div>
            </div>

            <div class="mt-15px">
                <div class="mb-5px">手機號碼</div>
                <input type="text"
                       required
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>

            <div class="mt-15px relative">
                <div class="mb-5px">圖形驗證碼</div>
                <input type="text"
                       v-model="inputCode"
                       placeholder="輸入驗證碼"
                       required
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                <div id="captchaContainer"
                     class="absolute w-30% h-38px bottom-0 right-0"></div>
            </div>
            <div class="mt-15px">
                <div class="flex">
                    <div class="flex-1">
                        <button class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:opacity-70 transition duration-200 cursor-pointer">返回登入頁</button>
                    </div>
                    <div class="w-10px"></div>
                    <div class="flex-1">
                        <button type="submit"
                                class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer"
                                @click="checkCaptcha">登入</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import useCaptcha from '~/composables/captcha';

const inputCode = ref('');
const { GVerify } = useCaptcha();
let captcha;

onMounted(() => {
    captcha = new GVerify({ id: 'captchaContainer' }); // 初始化畫布驗證碼
});

const checkCaptcha = () => {
    if (captcha.validate(inputCode.value)) {
        alert('驗證成功');
    }
};
</script>
<style scoped>
.ccontainer {
    height:calc(100vh - 110px);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}


</style>
