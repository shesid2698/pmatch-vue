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
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <div class="text-20px flex justify-center">
                <div class="w-335px md:w-370px">
                    <div class="flex flex-items-center mb-20px">
                        <span
                            class="w-25px h-20px inline-block bg-#1a6db4 mr-8px mt-3px"
                        ></span
                        >更改密碼
                    </div>
                    <form action="" @submit="CheckPassword">
                        <div class="mt-15px">
                            <div class="mb-5px text-16px">原密碼</div>
                            <input
                                type="password"
                                required
                                autocomplete="off"
                                v-model="oldPassword"
                                pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}"
                                class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                            />
                        </div>
                        <div class="mt-15px">
                            <div class="mb-5px text-16px">新密碼</div>
                            <div class="relative">
                                <input
                                    type="password"
                                    required
                                    autocomplete="off"
                                    ref="i_password2"
                                    v-model="newPassword"
                                    class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                                    pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}"
                                />
                                <div
                                    @click="turnInputType2"
                                    class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%"
                                >
                                    <i
                                        ref="eyes2"
                                        class="fa-solid fa-eye text-gray"
                                    ></i>
                                </div>

                                <div
                                    class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-125% text-white p-10px rounded-1"
                                >
                                    密碼長度必須為8~20位,
                                    其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                                    ! @ # $ % & *
                                </div>
                                <div
                                    class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"
                                ></div>
                            </div>
                        </div>
                        <div class="mt-15px">
                            <div class="mb-5px text-16px">確認密碼</div>
                            <div class="relative">
                                <input
                                    type="password"
                                    required
                                    autocomplete="off"
                                    v-model="confirmPassword"
                                    ref="i_password2"
                                    class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                                    pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}"
                                />
                                <div
                                    @click="turnInputType2"
                                    class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%"
                                >
                                    <i
                                        ref="eyes2"
                                        class="fa-solid fa-eye text-gray"
                                    ></i>
                                </div>

                                <div
                                    class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-125% text-white p-10px rounded-1"
                                >
                                    密碼長度必須為8~20位,
                                    其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                                    ! @ # $ % & *
                                </div>
                                <div
                                    class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"
                                ></div>
                            </div>
                        </div>
                        <div class="mt-15px">
                            <button
                                class="bg-[#e93470] cursor-pointer text-white text-16px h-38px w-100% rounded-[5px] outline-none border-none hover:bg-[#bb2d3b] transition duration-300"
                            >
                                更改密碼
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const { md5 } = crypto();
const userToken = useCookie("_PmToken");
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const CheckPassword = async (e) => {
    e.preventDefault();
    if (newPassword.value !== confirmPassword.value) {
        await openAlertModal(" ", "新密碼與確認密碼不一致!!");
        return;
    } else {
        newPassword.value = md5(newPassword.value);
        oldPassword.value = md5(oldPassword.value);
        try {
            const response = await $axios.post(
                "/api/v1/Pmatch/ChangedPassword",
                {
                    OldPassword: oldPassword.value,
                    NewPassword: newPassword.value,
                },
                {
                    headers: {
                        Authorization: userToken.value,
                    },
                }
            );
            if (response.data.Status.Code === 0) {
                await openAlertModal(" ", "密碼修改成功");
                window.location.href = "/member/center";
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error("請求失敗:", error);
        }
    }
};

onMounted(() => {});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
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
.clip-path-custom {
    clip-path: polygon(50% 100%, 0 50%, 100% 50%);
}
</style>
