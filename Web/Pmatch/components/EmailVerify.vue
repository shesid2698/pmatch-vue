<template>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" />
    <div class="ccontainer">
        <!-- <div>來自{{from}}</div>
        <div>編號:{{index}}</div> -->
        <div class="flex flex-items-center">
            <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
            <div class="text-20px">信箱驗證</div>
        </div>
        <div class="mt-15px">
            <div class="flex flex-items-center">
                <div class="w-7% text-[#DC3545]">
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="w-93% text-12px text-gray-6 font-400">
                    若發生沒有收到驗證信的情況，請至垃圾信件中搜尋看看。 另外hotmail與outlook會有收不到信的情形發生，請使用者多加注意
                </div>
            </div>
        </div>
        <div>
            <div class="mb-5px text-[#484646] font-400 text-15px">
                電子郵件
            </div>
            <div>
                <input type="text"
                       v-model="email"
                       @input="validEmailPattern"
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div>
                <button :disabled="openSendBtn()"
                        @click="SendCode"
                        class="w-50% bg-[#198754] h-38px text-white outline-none border-none rounded-1 hover:bg-[#157347] cursor-pointer disabled:bg-gray disabled:cursor-default">發送驗證碼</button><span v-show="emailTimer.count!=undefined&&emailTimer.count!==120">{{emailTimer.count}} 秒後重置...</span>
            </div>
        </div>
        <div class="mt-15px">
            <div class="mb-5px text-[#484646] font-400 text-15px">
                驗證碼
            </div>
            <div>
                <input type="text"
                       v-model="ansCode"
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div class="mt-15px">
                <div class="text-11px text-red-8">注意:驗證碼有效時間為10分鐘</div>
            </div>
        </div>
        <div class="mt-5px"><button
                    @click="verifyCode"
                    class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                驗證電子信箱
            </button></div>
    </div>
</template>
<script setup>
const emit = defineEmits(['isVerify']);
const emailTimer = useEmailTimer();
const email = ref('');
const jwtStore = useJwtStore();
const isValid = ref(false);
const ansCode = ref('');
let num = '';
const { $axios } = useNuxtApp();
const { encrypt, decrypt } = crypto();
const props = defineProps({
    from: String,
    index: String,
    pEmail: 'shshsh@gamil.com'
});
const token = ref("");
const emailCook = useCookie(`${props.from}Email`, {
    maxAge: 600
});
const validEmailPattern = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value)) {
        isValid.value = true;
    } else {
        isValid.value = false;
    }
};
const SendCode = async() => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/SendVerifyCode',
            {
                Email: email.value
            },
            {
                headers: {
                    Authorization:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN5c3RlbSIsIm5iZiI6MTcwNjU4Mzc2MywiZXhwIjoxNzkyOTgzNzYzLCJpYXQiOjE3MDY1ODM3NjN9.wxFnZD-cJjL3ehDzgxhmhFg4KDtULB-ptleQEcBNnfg'
                }
            }
        );
        if (response.data.Status.Code === 0) {
            alert('驗證碼已發送，請至信箱收取驗證碼!');
            emailTimer.decrement();
            emailCook.value = email.value;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
};
const verifyCode = async() => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/Verify',
            {
                Email: email.value,
                VerifyCode: ansCode.value
            },
            {
                headers: {
                    Authorization:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN5c3RlbSIsIm5iZiI6MTcwNjU4Mzc2MywiZXhwIjoxNzkyOTgzNzYzLCJpYXQiOjE3MDY1ODM3NjN9.wxFnZD-cJjL3ehDzgxhmhFg4KDtULB-ptleQEcBNnfg'
                }
            }
        );
        if (response.data.Status.Code === 0) {
            resetAll();
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
};
const resetAll = () => {
    emit('isVerify', true, email.value);
    emailCook.value = undefined;
    ansCode.value = '';
    email.value = '';
    isValid.value = false;
    emailTimer.reset();
};
const openSendBtn = () => {
    let open = true;
    if (isValid.value === true) {
        open = false;
    }
    if (emailTimer.count!=undefined && emailTimer.count !== 120) {
        open = true;
    }
    return open;
};
onMounted(async() => {
    if (emailTimer.count !== 120) {
        emailTimer.decrement();
    }
    email.value = props.pEmail;
    validEmailPattern();
});
watch(
    () => props,
    newProps => {
        email.value = props.pEmail;
        validEmailPattern();
    },
    { deep: true, immediate: false }
);
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    width: 100%;
}
</style>
