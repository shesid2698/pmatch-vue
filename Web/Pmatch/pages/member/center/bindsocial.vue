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
                        >綁定社群帳號
                    </div>
                    <div>
                        <p class="m-0 font-size-14px">
                            社群帳號綁定後，PMatch會員可以透過該社群帳號登入平台，每一種社群平台僅能綁定一個帳號。
                        </p>
                    </div>
                    <div>
                        <div class="socialBox flex justify-between w-100%">
                            <div class="flex items-center">
                                <div class="flex items-center me-1rem">
                                    <img
                                        class="w-40px"
                                        src="/images/iconGoogle.png"
                                        alt="google綁定"
                                    />
                                </div>
                                <div><span>Google</span></div>
                            </div>
                            <div class="flex items-center">
                                <ClientOnly>
                                    <GoogleLogin
                                        :callback="bindGoogle"
                                        popup-type="TOKEN"
                                    >
                                        <button
                                            class="bindBtn"
                                            :class="{
                                                'bg-#e93470 color-#fff cursor-pointer':
                                                    isPlatformBound(1),
                                            }"
                                            :disabled="!isPlatformBound(1)"
                                        >
                                            {{
                                                isPlatformBound(1)
                                                    ? "進行綁定"
                                                    : "已綁定"
                                            }}
                                        </button>
                                    </GoogleLogin>
                                </ClientOnly>
                            </div>
                        </div>
                        <!-- <div class="socialBox flex justify-between w-100%">
                            <div class="flex items-center">
                                <div class="flex items-center me-1rem">
                                    <img
                                        class="w-40px"
                                        src="/images/iconFB.png"
                                        alt="FB綁定"
                                    />
                                </div>
                                <div><span>Facebook</span></div>
                            </div>
                            <div class="flex items-center">
                                <button
                                    class="bindBtn"
                                    :class="{
                                        'bg-#e93470 color-#fff cursor-pointer':
                                            isPlatformBound(2),
                                    }"
                                    :disabled="!isPlatformBound(2)"
                                    @click="bindFb"
                                >
                                    {{
                                        isPlatformBound(2)
                                            ? "進行綁定"
                                            : "已綁定"
                                    }}
                                </button>
                            </div>
                        </div> -->
                        <div class="socialBox flex justify-between w-100%">
                            <div class="flex items-center">
                                <div class="flex items-center me-1rem">
                                    <img
                                        class="w-40px"
                                        src="/images/iconLine.png"
                                        alt="LINE綁定"
                                    />
                                </div>
                                <div><span>Line</span></div>
                            </div>
                            <div class="flex items-center">
                                <button
                                    class="bindBtn"
                                    :class="{
                                        'bg-#e93470 color-#fff cursor-pointer':
                                            isPlatformBound(3),
                                    }"
                                    :disabled="!isPlatformBound(3)"
                                    @click="bindLine"
                                >
                                    {{
                                        isPlatformBound(3)
                                            ? "進行綁定"
                                            : "已綁定"
                                    }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
import { useConfigStore } from "../stores/config.js";
import { useThirdPartyLoginStore } from "../stores/thirdPartyLogin.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const configStore = useConfigStore();
const thirdPartyLogin = useThirdPartyLoginStore();

const { $axios } = useNuxtApp();
const userToken = useCookie("_PmToken");
const memberId = useCookie("_PmMemberId");
const userDetail = ref([]);

// 檢查指定平台是否已綁定
const isPlatformBound = (platformNum) => {
    if (!userDetail.value?.[0]?.ThirdPartyPlatform) return false;

    const platform = userDetail.value[0].ThirdPartyPlatform.find(
        (platform) => platform.Category === platformNum
    );

    return platform?.ClientId !== "";
};

const bindGoogle = async (res) => {
    const userData = await thirdPartyLogin.googleCallback(res);
    await bindThird(1, userData);
};

const bindFb = async () => {
    const userData = await thirdPartyLogin.loginWithFacebook();
    await bindThird(2, userData.id);
};

const bindLine = async () => {
    await thirdPartyLogin.LineLogin();
};
/**
 * 監聽line身分驗證
 * @param event
 */
const syncStorage = async event => {
    if (event.key === 'lineUserSub') {
        if (event.newValue != null && event.newValue != undefined && event.newValue != '') {
            await bindThird(3, event.newValue);
            localStorage.removeItem('lineUserSub');
        }
    }
};
const bindThird = async (category, id) => {
    const response = await $axios.post(
        "/api/v1/User/ThirdPartyVerify",
        {
            Category: category,
            ClientId: id,
        },
        {
            headers: {
                Authorization: userToken.value,
            },
        }
    );
    if (response.data.Status.Code === 0) {
        await getMember();
        await openAlertModal(" ", "已綁定成功");
    } else {
        await openAlertModal(" ", `${response.data.Status.Message}`);
    }
};
const getMember = async () => {
    const response = await $axios.post(
        "/api/v1/Pmatch/GetMemberDetail",
        {
            PmatchMemberId: memberId.value,
        },
        {
            headers: {
                Authorization: userToken.value,
            },
        }
    );

    if (response.data.Status.Code === 0) {
        userDetail.value = response.data.Data;
    } else {
        alert(`${response.data.Status.Message}`);
    }
};
onMounted(async () => {
    if (userToken.value != "" && userToken.value != undefined) {
        await getMember();
    } else {
        router.push("/member/login");
        return;
    }
    //監聽line登入後身分驗證
    window.addEventListener('storage', syncStorage);
    await configStore.initFacebook();
});
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
.socialBox {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
}
.bindBtn {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 2px 3px 1px #ccc;
}
</style>
