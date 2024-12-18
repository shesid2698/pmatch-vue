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
            <div class="text-20px">手機驗證</div>
        </div>
        <div class="mt-15px">
            <div class="flex flex-items-center">
                <div class="w-7% text-[#DC3545]">
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="w-93% text-12px text-gray-6 font-400">
                    「登入帳號」為系統自動配發，註冊成功後無法修改，煩請記下您的登入用帳號，以利日後登入網站使用。
                </div>
            </div>
        </div>
        <div>
            <div class="mb-5px text-[#484646] font-400 text-15px">
                手機號碼
            </div>
            <div>
                <input type="text"
                       v-model="mobile"
                       @input="validMobilePattern"
                       :disabled="countdown!==120 && countdown!==0"
                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div>
                <button :disabled="openSendBtn()"
                        @click="SendCode"
                        class="w-50% bg-[#198754] h-38px text-white outline-none border-none rounded-1 hover:bg-[#157347] cursor-pointer disabled:bg-gray disabled:cursor-default">發送驗證碼</button><span v-show="countdown!==120 && countdown!==0">{{countdown}} 秒後重置...</span>
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
        <div class="mt-5px"><button @click="verifyCode"
                    class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                驗證手機號碼
            </button></div>
    </div>
</template>
<script setup>
const COUNTDOWN_DURATION = 120; // 倒計時總長度 (秒)
const countdown = ref(COUNTDOWN_DURATION); // 剩餘時間 (秒)
const timer = ref(null); // 計時器
const startCountdown = () => {
    const now = Date.now();
    const endTime = localStorage.getItem('countdownEndTime');

    // 如果已存在倒計時結束時間，計算剩餘時間
    if (endTime) {
        countdown.value = Math.max(0, Math.floor((+endTime - now) / 1000));
    } else {
        // 初始化倒計時結束時間
        localStorage.setItem('countdownEndTime', now + COUNTDOWN_DURATION * 1000);
    }

    // 啟動計時器
    timer.value = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value <= 0) {
            clearInterval(timer.value);
            localStorage.removeItem('countdownEndTime'); // 清理存儲
            countdown.value = COUNTDOWN_DURATION;
        }
    }, 1000);
};
//------
const jwtStore = useJwtStore();
const emit = defineEmits(['isVerify']);
const mobile = ref('');
const token = ref('');

const isValid = ref(false);
const ansCode = ref('');
const { $axios } = useNuxtApp();
const { encrypt, decrypt } = crypto();
const props = defineProps({
    from: String,
    index: String,
    phone: String
});
const mobileCook = useCookie(`${props.from}Mobile`, {
    maxAge: 120
});
const validMobilePattern = () => {
    const regex = /^\d{10}$/;
    if (regex.test(mobile.value)) {
        isValid.value = true;
    } else {
        isValid.value = false;
    }
};
const SendCode = async () => {
    try {
        token.value = await jwtStore.generateToken();
        const response = await $axios.post(
            '/api/v1/Pmatch/SendVerifyCode',
            {
                MobileNumber: mobile.value
            },
            {
                headers: {
                    Authorization: token.value
                }
            }
        );
        if (response.data.Status.Code === 0) {
            alert('驗證碼已發送，請至手機收取驗證碼!');
            startCountdown();
            mobileCook.value = mobile.value;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
};
const verifyCode = async () => {
    resetAll();
    // try {
    //     token.value = await jwtStore.generateToken();
    //     const response = await $axios.post(
    //         '/api/v1/Pmatch/Verify',
    //         {
    //             MobileNumber: mobile.value,
    //             VerifyCode: ansCode.value
    //         },
    //         {
    //             headers: {
    //                 Authorization: token.value
    //             }
    //         }
    //     );
    //     if (response.data.Status.Code === 0) {
    //         resetAll();
    //     } else {
    //         alert(`${response.data.Status.Message}`);
    //     }
    // } catch (error) {
    //     console.error('請求失敗:', error);
    // }
};
const resetAll = () => {
    emit('isVerify', true, mobile.value);
    mobileCook.value = undefined;
    ansCode.value = '';
    mobile.value = '';
    isValid.value = false;
    clearInterval(timer.value);
    countdown.value = COUNTDOWN_DURATION;
};
const openSendBtn = () => {
    let open = true;
    if (isValid.value === true) {
        open = false;
    }
    if (countdown.value !== 120 && countdown.value !== 0) {
        open = true;
    }

    return open;
};
onMounted(async () => {
    var plusTime = localStorage.getItem('countdownEndTime');
    if (plusTime !== null) {
        startCountdown();
    }
    mobile.value = props.phone;
    validMobilePattern();
});
onBeforeUnmount(() => {
    clearInterval(timer.value); // 清理計時器
    countdown.value = COUNTDOWN_DURATION;
});
watch(
    () => props,
    newProps => {
        mobile.value = newProps.phone;
        validMobilePattern();
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
