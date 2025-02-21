<template>

    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title"
              content="PMatch遊戲道具交易平台" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <div class="ccontainer md:pt-60px">
        <div class="login-card w-100% md:w-378px">
            <form action=""
                  method="post">
                <!-- 登入Title -->
                <div class="flex flex-items-center">
                    <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                    <div class="text-20px">會員登入</div>
                </div>

                <!-- 頁面切換鈕 -->
                <!-- <div class="flex flex-items-center mt-24px">
                    <div class="flex-1">
                        <button
                            class="font-sans w-100% bg-#e93470 outline-none border border-solid border-[#e93470] border-1 hover:bg-#bb2d3b transition duration-200 p-y-1.5 p-x-3 text-16px text-white rounded-1 cursor-pointer"
                        >
                            會員登入
                        </button>
                    </div>
                    <div class="w-10px"></div>
                    <div class="flex-1">
                        <NuxtLink to="/store/login">
                            <button
                                class="w-100% outline-none bg-white border-1 p-y-1.5 p-x-3 text-16px rounded-1 cursor-pointer text-[#212529] font-sans"
                            >
                                媒合商登入
                            </button>
                        </NuxtLink>
                    </div>
                </div> -->

                <div class="mt-3rem">
                    <div class="mb-5px">登入帳號</div>
                    <input v-model="accountId"
                           type="text"
                           required
                           autofocus
                           class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                </div>

                <div class="mt-15px">
                    <div class="mb-5px">密碼</div>
                    <div class="relative">
                        <input v-model="password"
                               type="password"
                               required
                               ref="i_password"
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
                    <VueTurnstile :site-key="turnstilesitekey"
                                  size="normal"
                                  @update:model-value="onVerify"></VueTurnstile>
                </div>
                <!-- 登入/註冊 -->
                <div class="mt-15px">
                    <div class="flex">
                        <div class="flex-1">
                            <NuxtLink to="/register"><button type="button"
                                        class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:opacity-70 transition duration-200 cursor-pointer">
                                    註冊
                                </button></NuxtLink>
                        </div>
                        <div class="w-10px"></div>
                        <div class="flex-1">
                            <button @click="login"
                                    type="button"
                                    :disabled="hasToken == false"
                                    class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">登入
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div class="mt-15px text-center">
                已經註冊?<NuxtLink to="/member/forgetpwd"
                          class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline">忘記密碼</NuxtLink>
            </div>
            <!-- <div>
                <div class="otherLogin mt-2rem mb-1rem">以其他方式登入</div>
            </div>
            <div class="flex justify-center">
                <ClientOnly>
                    <GoogleLogin :callback="GoogleCallback"
                                 popup-type="TOKEN">
                        <button class="otherLoginBtn mx-3">
                            <img class="w-30px"
                                 src="/images/iconGoogle.png"
                                 alt="GOOGLE帳號登入" />
                        </button>
                    </GoogleLogin>
                </ClientOnly>
                <button class="otherLoginBtn mx-3"
                        @click="thirdPartyLogin.LineLogin">
                    <img class="w-30px"
                         src="/images/iconLine.png"
                         alt="LINE帳號登入" />
                </button>
                <button @click="loginFb"
                        class="otherLoginBtn mx-3">
                    <img class="w-30px"
                         src="/images/iconFB.png"
                         alt="FB帳號登入" />
                </button>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import VueTurnstile from 'vue-turnstile';
import useCryptTo from '~/composables/crypto.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
import { useConfigStore } from '../stores/config.js';
const CrypTo = useCryptTo();
const alertModalStore = useAlertModalStore();
const configStore = useConfigStore();
const openAlertModal = alertModalStore.alertShowModal;
const { md5 } = crypto();
const eyes = ref(null);
const i_password = ref(null);
let turnstilesitekey = '1x00000000000000000000AA'; // 預設測試用KEY
const loginToken = useCookie('loginToken');
const hasToken = ref(loginToken.value !== undefined);
// 登入用
let accountId = ref('');
let password = ref('');
const memberList = ref({});
const { $axios } = useNuxtApp();
// cookies
let userNameCookie = useCookie('_PmUserName');
let tokenCookie = useCookie('_PmToken');
let MemberIdCookie = useCookie('_PmMemberId');
let MemberTypeCookie = useCookie('_PmMemberType');

//社群登入
const thirdPartyLogin = useThirdPartyLoginStore();
const { userInfo } = storeToRefs(thirdPartyLogin);
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

// 登入傳送帳密
const login = async () => {
    // 加密密碼
    // const encryptedPassword = md5(password.value);
    const encryptedPassword = CrypTo.loginEncrypt(password.value);
    // 等待登入結果
    await Login(encryptedPassword);
};

const GetMemberDetail = async (memberId, token) => {
    const response = await $axios.post(
        '/api/v1/Pmatch/GetMemberDetail',
        {
            PmatchMemberId: memberId
        },
        {
            headers: {
                Authorization: token
            }
        }
    );
    if (response.data.Status.Code === 0) {
        MemberTypeCookie.value = response.data.Data[0].Type;
    }
};
// login
async function Login(encryptedPassword) {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/Logon',
            {
                Account: accountId.value,
                Password: encryptedPassword, // 使用加密後的密碼
                IsNormalUser: true
            },
            {
                headers: {}
            }
        );

        if (response.data.Status.Code === 0) {
            memberList.value = response.data.Data;
            userNameCookie.value = response.data.Data.Name;
            tokenCookie.value = response.data.Data.Token;
            MemberIdCookie.value = response.data.Data.PmatchMemberId;
            await GetMemberDetail(MemberIdCookie.value, tokenCookie.value);
            window.location.href = '/';
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
/**
 * 監聽line身分驗證
 * @param event
 */
const syncStorage = async event => {
    if (event.key === 'lineUserSub') {
        if (event.newValue != null && event.newValue != undefined && event.newValue != '') {
            await ThirdPartyLogin(3, event.newValue);
            localStorage.removeItem('lineUserSub');
        }
    }
};
const ThirdPartyLogin = async (category, clientId) => {
    const response = await $axios.post('/api/v1/User/ThirdPartyVerify', {
        Category: category,
        ClientId: clientId
    });
    if (response.data.Status.Code === 0) {
        memberList.value = response.data.Data;
        userNameCookie.value = response.data.Data.Name;
        tokenCookie.value = response.data.Data.Token;
        MemberIdCookie.value = response.data.Data.PmatchMemberId;
        await GetMemberDetail(MemberIdCookie.value, tokenCookie.value);
        window.location.href = '/';
    } else {
        await openAlertModal(' ', `${response.data.Status.Message}`);
    }
};

function EnterLogin(e) {
    // e.preventDefault();
    if (e.key == 'Enter') {
        login();
    }
}
const loginFb = async () => {
    try {
        const userData = await thirdPartyLogin.loginWithFacebook();
        if (userData && userData.id) {
            await ThirdPartyLogin(2, userData.id);
        }
    } catch (error) {
        console.error('Facebook 登入失敗:', error);
    }
};
const GoogleCallback = async(response)=>{
  const data = await thirdPartyLogin.googleCallback(response);
  if(data!="" && data!=null && data!=undefined)ThirdPartyLogin(1, data);
}
onMounted(async() => {

    // 取得turnstileKey
    turnstilesitekey = configStore.turnstilesitekey;
    //console.log('configStore.turnstilesitekey1', turnstilesitekey);

    //
    window.addEventListener('keydown', EnterLogin);

    //監聽line登入後身分驗證
    window.addEventListener('storage', syncStorage);
    await configStore.initFacebook();
});
onBeforeUnmount(() => {
    window.removeEventListener('keydown', EnterLogin);
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
.otherLogin {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
}
.otherLogin::before,
.otherLogin::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #ccc; /* 這是線的顏色 */
    margin: 0 10px;
}
.otherLoginBtn {
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}
</style>
