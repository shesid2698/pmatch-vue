<template>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" />
    <div class="ccontainer md:pt-60px">
        <div class="login-card md:w-378px w-100%">
            <!-- 登入Title -->
            <div class="flex flex-items-center">
                <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                <div class="text-20px">會員登入</div>
            </div>

            <!-- 頁面切換鈕 -->
            <!-- <div class="flex flex-items-center mt-24px">
                <div class="flex-1">
                    <NuxtLink to="/member/login">
                        <button class="w-100% outline-none bg-white border-1 p-y-1.5 p-x-3 text-16px rounded-1 cursor-pointer text-[#212529] font-sans">
                            會員登入
                        </button>
                    </NuxtLink>
                </div>
                <div class="w-10px"></div>
                <div class="flex-1">
                    <button class="font-sans w-100% bg-#e93470 outline-none border border-solid border-[#e93470] border-1 hover:bg-#bb2d3b transition duration-200 p-y-1.5 p-x-3 text-16px text-white rounded-1 cursor-pointer">
                        媒合商登入
                    </button>
                </div>
            </div> -->
            <form action=""
                  method="POST"
                  @submit.prevent="validateForm"
                   class="mt-3rem">
                <div class="mt-15px">
                    <div class="mb-5px">登入帳號</div>
                    <input type="text"
                           required
                           v-model="account"
                           autocomplete
                           class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                </div>

                <div class="mt-15px">
                    <div class="mb-5px">密碼</div>
                    <div class="relative">
                        <input type="password"
                               ref="i_password"
                               autocomplete="current-password"
                               v-model="password"
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                               pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}" />
                        <div @click="turnInputType"
                             class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%">
                            <i ref="eyes"
                               class="fa-solid fa-eye text-gray"></i>
                        </div>

                        <div class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-130% text-white p-10px rounded-1">
                            密碼長度必須為8~20位,
                            其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                            ! @ # $ % & *
                        </div>
                        <div class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"></div>
                    </div>
                </div>
                <div v-if="!hasToken"
                     class="w-100% mt-15px">
                    <VueTurnstile site-key="1x00000000000000000000AA"
                                  size="normal"
                                  @update:model-value="onVerify"></VueTurnstile>
                </div>
                <!-- 登入/註冊 -->
                <div class="mt-15px">
                    <div class="flex">
                        <div class="flex-1">
                            <button type="submit"
                                    :disabled="!loginToken || Object.keys(data).length === 0"
                                    class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                                登入
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div class="mt-15px text-center">
                已經註冊?<NuxtLink to="#"
                          class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline">忘記密碼</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
// loading page
import { useLoadStore } from "../stores/loading.js";
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

import VueTurnstile from 'vue-turnstile';
const account = ref('');
const password = ref('');
const eyes = ref(null);
const data = reactive({});
const s = reactive({});
const i_password = ref(null);
const { md5 } = crypto();
const loginToken = useCookie('tstToken');
const hasToken = ref(loginToken.value !== undefined);
const turnInputType = () => {
    if (i_password.value.type === 'password') {
        i_password.value.type = 'text';
        eyes.value.classList.remove('fa-eye');
        eyes.value.classList.add('fa-eye-slash');
    } else {
        i_password.value.type = 'password';
        eyes.value.classList.remove('fa-eye-slash');
        eyes.value.classList.add('fa-eye');
    }
};
const onVerify = tokenValue => {
    loginToken.value = tokenValue;
    setTimeout(() => {
        hasToken.value = true;
    }, 1500);
};
const getSerialNumber = async () => {
    try {
        const response = await $fetch('http://localhost:23100/EIS/I', {
            method: 'POST',
            body: null
        });
        return response;
    } catch (error) {
        console.error('fetching serial number failed..:', error);
        return { error: error };
    }
};
const validateForm = async () => {
    if (
        account.value !== null &&
        account.value !== '' &&
        password.value !== null &&
        password.value !== ''
    ) {
        let isValid = validatePassword(password.value);
        if (isValid) {
            let body = reactive({
                Account: account.value,
                Password: md5(password.value),
                MacAddress: data.m,
                SerialNumber: data.s
            });
            let response = await $fetch('http://192.168.10.206:2310/api/v1/User/Logon', {
                method: 'POST',
                body: { ...body }
            });

            if (response !== null && response.Status.Code === 0) {
                const userData = reactive(response.Data);
                let res2 =  await $fetch('/api/login', {
                    method: 'POST',
                    body: {
                        user:{...userData}
                    }
                });
                console.log(res2);
                if(res2==="登入成功"){
                  window.location.href="/test";
                }
            }
        }
    } else {
        return;
    }
};
const validatePassword = text => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}$/;
    if (regex.test(text)) {
        return true;
    } else {
        return false;
    }
};
onMounted(async () => {
    await setPageLoading(true);
    const res = await getSerialNumber();
    if (res != null && res.data.s != '') {
        Object.assign(data, res.data);
    } else {
        alert('安裝工具過程中請記得輸入序號');
    }
    await setPageLoading(false);
});
</script>

<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.font-sans {
    font-family: Arial, 'Noto Sans TC', sans-serif;
}
.clip-path-custom {
    clip-path: polygon(50% 100%, 0 50%, 100% 50%);
}
.tips {
    opacity: 0;
    transition: 0.2s;
    z-index: -1;
}
.password:hover ~ .tips {
    opacity: 1;
    z-index: 1;
}
</style>
