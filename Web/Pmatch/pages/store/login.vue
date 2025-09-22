<template>
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <div class="ccontainer pt-130px pb-25rem">
    <div class="max-w-1110px w-100% md-w-50% m-auto ps-5 pe-5 relative z-2">
      <div class="w-100%">
        <!-- 登入Title -->
        <div class="flex items-center justify-center mb-3rem">
          <div class="titleLeftBorder"></div>
          <span class="hotTitle">媒合商</span>
          <span class="gameTitle">登入</span>
          <div class="titleRightBorder"></div>
        </div>
        <div class="mt-3rem loginBox p-2rem">
          <form action="" method="POST" @submit.prevent="login">
            <div class="mt-15px">
              <div class="mb-5px color-#fff">登入帳號</div>
              <input type="text" required v-model="accountId" ref="accountInput" autocomplete
                class="loginEntry box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>

            <div class="mt-15px">
              <div class="mb-5px color-#fff">密碼</div>
              <div class="relative">
                <input type="password" ref="i_password" autocomplete="current-password" v-model="password"
                  class="loginEntry password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                <div @click="turnInputType"
                  class="cursor-pointer absolute top-50% transform translate-y-[-45%] right-20px">
                  <i ref="eyes" class="fa-solid fa-eye text-gray"></i>
                </div>

                <div
                  class="tips absolute text-14px w-200px h-auto bg-dark left-50% translate-x-[-50%] bottom-130% text-white p-10px rounded-1">
                  密碼長度必須為8~20位,
                  其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                  ! @ # $ % & *
                </div>
                <div class="tips absolute clip-path-custom w-15px h-15px bg-dark left-50% translate-x-[-50%] bottom-110% translate-y-[-3.5px]"></div>
              </div>
            </div>
            <div v-if="!hasToken" class="w-100% mt-15px">
              <VueTurnstile :site-key="turnstilesitekey" size="normal" @update:model-value="onVerify"></VueTurnstile>
            </div>
            <!-- 登入/註冊 -->
            <div class="mt-15px">
              <div class="flex">
                <div class="w-100%">
                  <div class="loginBtnBox">
                    <button type="submit" v-if="iData !== null" :disabled="iData.length === 0 ||
                      hasToken == false
                      "
                      class="loginBtn disabled:opacity-70 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                      登入
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="flex justify-end items-center mt-20px">
            <NuxtLink to="/store/register" class="flex-inline no-underline text-18px text-white fill-white hover:text-[#00F3FF] hover:fill-[#00F3FF] active:text-[#004DC1] active:fill-[#004DC1]">
              <svg width="20" height="23" viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg">
                <rect x="12.0545" y="3.84515" width="5.67273" height="16.0727" transform="rotate(32.4113 12.0545 3.84515)"/>
                <path d="M13.263 1.94182C13.855 1.00932 15.0909 0.733317 16.0234 1.32536L17.4356 2.22193C18.3681 2.81397 18.6441 4.04986 18.052 4.98236L17.097 6.48661L12.3079 3.44607L13.263 1.94182Z"/>
                <path d="M2.79361 23.7234L8.06345 20.7697L3.22478 17.6977L2.79361 23.7234Z"/>
              </svg>
              申請試用 >
            </NuxtLink>
          </div>          
        </div>

        <!-- <div class="mt-15px text-center">
                已經註冊?<NuxtLink
                    to="#"
                    class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline"
                    >忘記密碼</NuxtLink
                >
            </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// loading page
import { useLoadStore } from "../stores/loading.js";
import { useConfigStore } from "../stores/config.js";
import VueTurnstile from "vue-turnstile";

import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;
const configStore = useConfigStore();

const { $axios } = useNuxtApp();
const encrypt = useEncrypt();

const matchMemberList = ref([]);

const iData = ref([]);
const password = ref("");
const eyes = ref(null);
const data = reactive({});
const s = reactive({});
const i_password = ref(null);
const { md5 } = crypto();
const accountInput = ref(null);

const loginToken = useCookie("tstToken");
const hasToken = ref(loginToken.value !== undefined);
let turnstilesitekey = '1x00000000000000000000AA'; // 預設測試用KEY
let accountId = ref("");
const turnInputType = () => {
  if (i_password.value.type === "password") {
    i_password.value.type = "text";
    eyes.value.classList.remove("fa-eye");
    eyes.value.classList.add("fa-eye-slash");
  } else {
    i_password.value.type = "password";
    eyes.value.classList.remove("fa-eye-slash");
    eyes.value.classList.add("fa-eye");
  }
};
const onVerify = (tokenValue) => {
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
      "/api/v1/User/Logon",
      {
        Account: accountId.value,
        Password: md5(password.value), // 使用加密後的密碼
        MacAddress: iData.value.m,
        SerialNumber: iData.value.s,
      },
      {
        headers: {},
      }
    );

    if (response.data.Status.Code === 0) {
      matchMemberList.value = response.data.Data;

      if (matchMemberList.value.Token) {
        // 編碼為 Base64 URL 格式
        let token = matchMemberList.value.Token;
        const base64UrlToken = btoa(token)
          .replace(/\+/g, "-")
          .replace(/\//g, "_");

        // 跳轉到目標網站
        if (!configStore.envUrl) {
          await configStore.loadConfig();
        }
        const targetUrl = `${configStore.envUrl}${base64UrlToken}`;
        window.location.href = targetUrl;
      } else {
        console.error("跳轉失敗");
      }
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
  }
}
// 檢查工具安裝
const getSerialNumber = async () => {
  try {
    const response = await fetch("http://localhost:23100/EIS/I", {
      method: "POST",
      body: null,
    });

    // 檢查 HTTP 狀態碼
    if (!response.ok) {
      await openAlertModal(
        " ",
        "請依文件調整瀏覽器設定值,安裝工具再行登入"
      );
    }

    const result = await response.json(); // 解析 JSON 資料
    return result;
  } catch (error) {
    console.error("Fetching serial number failed:", error);
  }
};
onMounted(async () => {
  await setPageLoading(true);
  const res = await getSerialNumber(); // 等待回應
  console.log(res);

  // 取得turnstileKey
  turnstilesitekey = configStore.turnstilesitekey;
  //console.log('configStore.turnstilesitekey1', turnstilesitekey);

  // 驗證 status.code
  if (res && res.status && res.status.code === 0) {
    iData.value = res.data;
  } else if (res && res.status && res.status.code !== 0) {
    await openAlertModal(" ", "安裝工具過程中請記得輸入序號");
  } else {
    await openAlertModal(" ", "請依文件調整瀏覽器設定值,安裝工具再行登入");
  }
  if (accountInput.value) {
    accountInput.value.focus();
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
  background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png),
    url(/images/bg-02.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.font-sans {
  font-family: Arial, "Noto Sans TC", sans-serif;
}

.clip-path-custom {
  clip-path: polygon(50% 100%, 0 50%, 100% 50%);
}

.tips {
  opacity: 0;
  transition: 0.2s;
  z-index: -1;
}

.password:hover~.tips {
  opacity: 1;
  z-index: 1;
}

.hotTitle {
  background: linear-gradient(to bottom, #fff, #43edff);
  background: -webkit-linear-gradient(#fff, #43edff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 40px;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.gameTitle {
  background: linear-gradient(to bottom, #43edff, #fff);
  background: -webkit-linear-gradient(#43edff, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 40px;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}

.titleLeftBorder {
  width: 40px;
  border: 2px solid;
  border-right: none;
  height: 10px;
  border-image: linear-gradient(to right, #fff, #43edff) 1;
  margin-right: 1rem;
}

.titleRightBorder {
  width: 40px;
  border: 2px solid;
  border-left: none;
  height: 10px;
  border-image: linear-gradient(to left, #fff, #43edff) 1;
  margin-left: 1rem;
}

.loginBox {
  position: relative;
}

.loginBox::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(to right, #43edff, #fff);
  mask: linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.loginEntry {
  color: #fff;
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.15));
  width: 100%;
  border: none;
  text-indent: 1rem;
  border-radius: 10px;
  margin: 0.5rem 0;
  position: relative;
}

.loginBtnBox {
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
  border-radius: 50px;
  border: none;
}

.loginBtn {
  padding: 10px 0;
  background: linear-gradient(to right, #7b2cbf, #f72585);
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
}

.loginBtn:hover {
  background: #fff;
  color: #f72585;
}

@media screen and (max-width: 768px) {
  .hotTitle {
    font-size: 32px;
  }

  .gameTitle {
    font-size: 32px;
  }

  .titleLeftBorder {
    width: 20px;
  }

  .titleRightBorder {
    width: 20px;
  }
}
</style>
