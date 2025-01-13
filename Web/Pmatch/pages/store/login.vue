<template>

    <Head>
        <title>PMatch遊戲道具媒合網</title>
        <Meta property="og:title"
              content="PMatch遊戲道具媒合網" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <div class="ccontainer md:pt-60px">
        <div class="login-card md:w-378px w-100%">
            <!-- 登入Title -->
            <div class="flex flex-items-center">
                <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                <div class="text-20px">媒合商登入</div>
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
                  @submit.prevent="login"
                  class="mt-3rem">
                <div class="mt-15px">
                    <div class="mb-5px">登入帳號</div>
                    <input type="text"
                           required
                           v-model="accountId"
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
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
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
                                    v-if="iData !== null"
                                    :disabled="iData.length === 0"
                                    class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                                登入
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <!-- <div class="mt-15px text-center">
                已經註冊?<NuxtLink
                    to="#"
                    class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline"
                    >忘記密碼</NuxtLink
                >
            </div> -->
        </div>
    </div>
</template>

<script setup>
// loading page
import { useLoadStore } from '../stores/loading.js';
import VueTurnstile from 'vue-turnstile';

import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const config = useRuntimeConfig();
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const { $axios } = useNuxtApp();
const encrypt = useEncrypt();

const matchMemberList = ref([]);

const iData = ref([]);
const password = ref('');
const eyes = ref(null);
const data = reactive({});
const s = reactive({});
const i_password = ref(null);
const { md5 } = crypto();

const loginToken = useCookie('tstToken');
const hasToken = ref(loginToken.value !== undefined);

let accountId = ref('');
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

// login
async function login(event, encryptedPassword) {
    event.preventDefault();
    try {
        const response = await $axios.post(
            '/api/v1/User/Logon',
            {
                Account: accountId.value,
                Password: md5(password.value), // 使用加密後的密碼
                MacAddress: iData.value.m,
                SerialNumber: iData.value.s
            },
            {
                headers: {}
            }
        );

        if (response.data.Status.Code === 0) {
            matchMemberList.value = response.data.Data;

            if (matchMemberList.value.Token) {
                // 編碼為 Base64 URL 格式
                const token = matchMemberList.value.Token;
                const base64UrlToken = btoa(token).replace(/\+/g, '-').replace(/\//g, '_');

                // 跳轉到目標網站
                const targetUrl = `${config.public.envUrl}${base64UrlToken}`;
                window.location.href = targetUrl;
            } else {
                console.error('跳轉失敗');
            }
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
// 檢查工具安裝
const getSerialNumber = async () => {
    try {
        const response = await fetch('http://localhost:23100/EIS/I', {
            method: 'POST',
            body: null
        });

        // 檢查 HTTP 狀態碼
        if (!response.ok) {
            await openAlertModal(' ', '請依文件調整瀏覽器設定值,安裝工具再行登入');
        }

        const result = await response.json(); // 解析 JSON 資料
        return result;
    } catch (error) {
        console.error('Fetching serial number failed:', error);
    }
};
onMounted(async () => {
    await setPageLoading(true);
    const res = await getSerialNumber(); // 等待回應
    console.log(res);
    // 驗證 status.code
    if (res && res.status && res.status.code === 0) {
        iData.value = res.data;
    } else if (res && res.status && res.status.code !== 0) {
        await openAlertModal(' ', '安裝工具過程中請記得輸入序號');
    } else {
        await openAlertModal(' ', '請依文件調整瀏覽器設定值,安裝工具再行登入');
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
