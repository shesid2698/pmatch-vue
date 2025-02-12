<template>
    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title" content="PMatch遊戲道具交易平台" />
        <Meta
            name="keywords"
            content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
        />
        <Meta
            name="description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="ccontainer md:pt-60px">
        <div class="login-card w-100% md:w-378px">
            <div class="flex flex-items-center">
                <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                <div class="text-20px">忘記密碼</div>
            </div>
            <form action="" @submit="checkCaptcha">
                <div class="mt-15px">
                    <div class="mb-5px">手機號碼</div>
                    <input
                        type="text"
                        required
                        v-model="phone"
                        pattern="\d{10}"
                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                    />
                </div>

                <div class="mt-15px relative">
                    <div class="mb-5px">圖形驗證碼</div>
                    <input
                        type="text"
                        v-model="inputCode"
                        placeholder="輸入驗證碼"
                        required
                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                    />
                    <div
                        id="captchaContainer"
                        class="absolute w-30% h-38px bottom-0 right-0"
                    ></div>
                </div>
                <div class="mt-15px">
                    <div class="flex">
                        <div class="flex-1">
                            <NuxtLink to="/member/login">
                                <button
                                    type="button"
                                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:opacity-70 transition duration-200 cursor-pointer"
                                >
                                    返回登入頁
                                </button>
                            </NuxtLink>
                        </div>
                        <div class="w-10px"></div>
                        <div class="flex-1">
                            <button
                                type="submit"
                                class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer"
                                @click="checkCaptcha"
                            >
                                取得手機驗證碼
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const routes = useRouter();
const encrypt = useEncrypt();
import useCaptcha from "~/composables/captcha";

import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const phone = ref("");
const inputCode = ref("");
const { GVerify } = useCaptcha();
const { $axios } = useNuxtApp();
let captcha;
const token = ref("");
const jwtStore = useJwtStore();
onMounted(() => {
    captcha = new GVerify({ id: "captchaContainer" }); // 初始化畫布驗證碼
});

const checkCaptcha = async (event) => {
    event.preventDefault();
    if (captcha.validate(inputCode.value)) {
        try {
            token.value = await jwtStore.generateToken();
            const response = await $axios.post(
                "/api/v1/Pmatch/ForgotPassword",
                {
                    MobileNumber: phone.value,
                },
                {
                    headers: {
                        Authorization: token.value,
                    },
                }
            );

            if (response.data.Status.Code === 0) {
                routes.push({
                    path: "/member/resetpassword",
                    query: { data: encrypt.encrypt(phone.value) },
                });
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error("請求失敗:", error);
        }
    }
};
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
