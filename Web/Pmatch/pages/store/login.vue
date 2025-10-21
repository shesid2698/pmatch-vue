<template>
  <div class="storeBac pb-[25rem] pt-130px">
    <div class="max-w-1110px w-100% md-w-50% m-auto ps-5 pe-5 relative z-2">
      <div class="w-100%">
        <!-- 登入Title -->
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-[32px] md:text-[40px]">媒合商</span>
          <span class="text-gradient-b font-bold text-[32px] md:text-[40px]">登入</span>
          <div class="border-gradient-r"></div>
        </div>
        <div class="mt-3rem loginBox p-2rem">
          <form action="" method="POST" @submit.prevent="login">
            <div class="mt-15px">
              <div class="mb-5px text-white">登入帳號</div>
              <input type="text" required v-model="accountId" ref="accountInput" autocomplete
                :disabled="loginStep !== 'credentials'"
                class="loginEntry box-border py-1.5 px-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-white">密碼</div>
              <div class="relative">
                <input type="password" ref="i_password" autocomplete="current-password" v-model="password"
                  :disabled="loginStep !== 'credentials'"
                  class="loginEntry password box-border py-1.5 px-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                <div @click="turnInputType"
                  class="cursor-pointer absolute top-50% transform translate-y-[-45%] right-20px">
                  <i ref="eyes" class="fa-solid fa-eye text-gray"></i>
                </div>
                <div
                  class="absolute text-14px w-200px h-auto bg-dark left-50% translate-x-[-50%] bottom-130% text-white p-10px rounded-1 tips">
                  密碼長度必須為8~20位,
                  其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                  ! @ # $ % & *
                </div>
                <div
                  class="absolute w-15px h-15px bg-dark left-50% translate-x-[-50%] bottom-110% translate-y-[-3.5px] [clip-path:polygon(50%_100%,_0_50%,_100%_50%)] tips">
                </div>
              </div>
            </div>
            <div v-if="!hasToken" class="w-100% mt-15px">
              <VueTurnstile :site-key="turnstilesitekey" size="normal" @update:model-value="onVerify"></VueTurnstile>
            </div>
            <!-- 登入 -->
            <div v-if="loginStep === 'credentials'" class="mt-15px">
              <div class="flex">
                <div class="w-100%">
                  <div class="loginBtnBox">
                    <button type="submit" :disabled="hasToken == false"
                      class="loginBtn disabled:opacity-70 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                      登入
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 2fa驗證 -->
            <div v-if="loginStep === '2fa-choice' || loginStep === '2fa-verify'" class="mt-15px">
              <div class="mb-10px flex items-center">
                <span class="text-white pe-[6px]">驗證方式 </span>
                <span class="text-[#FF5454] text-[14px]" v-if="timers.phone.countdown < timers.phone.duration">
                  如需再次傳送簡訊，請稍等 {{ timers.phone.countdown }} 秒</span>
              </div>
              <div class="flex justify-center gap-[10px]">
                <!-- 手機驗證 -->
                <div class="relative inline-block w-[50%] group"
                  :class="{ 'brightness-75 select-none pointer-events-none': isPhoneDisabled || !twoFactorOptions.phone }">
                  <button class="verifyBtn" @click.prevent="select2faMethod('phone')"
                    :disabled="isPhoneDisabled"></button>
                  <div
                    class="absolute pointer-events-none inset-0 flex items-center justify-center w-[100%] h-[36px] mx-auto text-[15px] font-bold before:content-[''] before:absolute before:inset-0 before:bg-[#6FF1FE33] before:rounded-[10px] before:z-0 group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF80,_#A2F7FF80)] group-active:before:bg-[#6FF1FEA6]">
                    <span
                      class="group-hover:hidden bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent z-1">電話驗證</span>
                    <span class="group-hover:inline text-[#31129B] z-1 hidden">電話驗證</span>
                  </div>
                </div>
                <!-- Email驗證 -->
                <div class="relative inline-block w-[50%] group"
                  :class="{ 'brightness-75 select-none pointer-events-none': isEmailDisabled || !twoFactorOptions.email }">
                  <button class="verifyBtn" @click.prevent="select2faMethod('email')"
                    :disabled="isEmailDisabled"></button>
                  <div
                    class="absolute pointer-events-none inset-0 flex items-center justify-center w-[100%] h-[36px] mx-auto text-[15px] font-bold before:content-[''] before:absolute before:inset-0 before:bg-[#6FF1FE33] before:rounded-[10px] before:z-0 group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF80,_#A2F7FF80)] group-active:before:bg-[#6FF1FEA6]">
                    <span
                      class="group-hover:hidden bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent z-1">Email驗證</span>
                    <span class="group-hover:inline text-[#31129B] z-1 hidden">Email驗證</span>
                  </div>
                </div>
              </div>
              <div v-if="loginStep === '2fa-verify'" class="mt-15px">
                <div class="mb-5px text-white">
                  {{ active2faMethod === 'phone' ? '簡訊驗證碼' : 'Email 驗證碼' }}
                </div>
                <div class="relative">
                  <span class="w-[52px] inline-block py-1.5 pe-[10px] mx-auto text-end text-[17px] text-white font-mono">{{
                    verificationPrefix }} -</span>
                  <input type="text" v-model="verificationSuffix" maxlength="6"
                    class="loginEntry verify box-border py-1.5 px-3 text-base w-[calc(100%-62px)] outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                  <div
                    class="absolute text-16px text-center w-160px h-auto bg-dark left-50% translate-x-[-50%] bottom-130% text-white p-10px rounded-1 tips">
                    請輸入 6 位數字碼
                  </div>
                  <div
                    class="absolute w-15px h-15px bg-dark left-50% translate-x-[-50%] bottom-110% translate-y-[-3.5px] [clip-path:polygon(50%_100%,_0_50%,_100%_50%)] tips">
                  </div>
                </div>
                <div class="mt-15px">
                  <div class="loginBtnBox">
                    <button @click.prevent="submit2faCode" type="button"
                      class="loginBtn disabled:opacity-70 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                      驗證並登入
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!-- <div class="mt-15px text-center">已經註冊?<NuxtLink to="#" class="text-[#0d6efd] hover:opacity-70 hover:underline text-15px no-underline">忘記密碼</NuxtLinkto=></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'PMatch遊戲道具交易平台'
})
useSeoMeta({
  ogTitle: 'PMatch遊戲道具交易平台',
  keywords: 'pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易',
  description: 'Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全',
  ogDescription: 'Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全'
})
// loading page
import { useLoadStore } from "../stores/loading.js";
import { useConfigStore } from "../stores/config.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
import VueTurnstile from "vue-turnstile";

const store = useLoadStore();
const configStore = useConfigStore();
const alertModalStore = useAlertModalStore();
const userToken = useCookie('_PmToken')
const jwtStore = useJwtStore()
const { $axios } = useNuxtApp();
const { md5 } = crypto();
const openAlertModal = alertModalStore.alertShowModal;
const setPageLoading = store.setPageLoading;

const accountId = ref("");
const password = ref("");
const accountInput = ref(null);
const i_password = ref(null);
const eyes = ref(null);

// 登入流程
const loginStep = ref('credentials');  // 'credentials' (輸入帳密), '2fa-choice' (選擇驗證方式), '2fa-verify' (輸入驗證碼)
const tempPassword = ref(''); // 暫存未加密密碼
const active2faMethod = ref(''); // 驗證方式 ('phone' 或 'email')
const isSendingCode = ref(false);

// 2FA
const twoFactorOptions = ref({ phone: null, email: null });
const verificationPrefix = ref('---');
const verificationSuffix = ref('');

// Timers
const timers = reactive({
  phone: { duration: 60, countdown: 60, instance: null, storageKey: 'phoneCountdownEndTime' },
  email: { duration: 2, countdown: 2, instance: null, storageKey: 'emailCountdownEndTime' }
});

// const iData = ref([]);
const loginToken = useCookie("tstToken");
const hasToken = ref("");
let turnstilesitekey = '1x00000000000000000000AA'; // 預設測試用KEY

// 按鈕禁用
const isPhoneDisabled = computed(() => {
  return isSendingCode.value || timers.phone.countdown < timers.phone.duration;
});
const isEmailDisabled = computed(() => {
  return isSendingCode.value || timers.email.countdown < timers.email.duration;
});

async function getToken() {
  let token = userToken.value;
  if (!token) {
    token = await jwtStore.generateToken();
  }
  return token;
}

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

// 登入
async function login(event) {
  event.preventDefault();
  const token = await getToken();
  try {
    const response = await $axios.post("/api/v1/User/Logon", {
      Account: accountId.value,
      Password: md5(password.value),
      // MacAddress: iData.value.m,
      // SerialNumber: iData.value.s,
    },
      {
        headers: {
          Authorization: token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      const responseData = response.data.Data;

      if (responseData.Token) {
        // 如果沒有設定驗證方式，直接拿 Token 登入
        let token = responseData.Token;
        const base64UrlToken = btoa(token).replace(/\+/g, "-").replace(/\//g, "_");
        if (!configStore.envUrl) {
          await configStore.loadConfig();
        }
        const targetUrl = `${configStore.envUrl}${base64UrlToken}`;
        window.location.href = targetUrl;
      } else if (responseData.Phone || responseData.Email) {
        tempPassword.value = password.value; // 暫存未加密密碼
        twoFactorOptions.value = { phone: responseData.Phone, email: responseData.Email };
        // 選驗證方式
        loginStep.value = '2fa-choice';
      } else {
        await openAlertModal(" ", "登入失敗：伺服器沒有回應。");
      }
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
    await openAlertModal(" ", "登入時發生錯誤，請檢查網路再試。");
  }
}

async function select2faMethod(method) {
  if (isSendingCode.value || timers[method].countdown < timers[method].duration) {
    return;
  }
  isSendingCode.value = true;
  await nextTick();
  active2faMethod.value = method;
  verificationSuffix.value = ''; // 切換驗證方式時，清空輸入欄位
  const token = await getToken();
  try {
    const response = await $axios.post("/api/v1/User/SendVerifyCode", {
      Account: accountId.value,
      Password: md5(tempPassword.value),
      Phone: method === 'phone' ? twoFactorOptions.value.phone : '',
      Email: method === 'email' ? twoFactorOptions.value.email : '',
      // MacAddress: iData.value.m,
      // SerialNumber: iData.value.s,
    },
      {
        headers: {
          Authorization: token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      verificationPrefix.value = response.data.Code;
      loginStep.value = '2fa-verify';
      startCountdown(method);
    } else {
      await openAlertModal(" ", `發送驗證碼失敗: ${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("發送驗證碼失敗:", error);
    await openAlertModal(" ", "發送驗證碼失敗，請檢查網路再試。");
  } finally {
    isSendingCode.value = false;
  }
}

async function submit2faCode() {
  const verificationCode = `${verificationPrefix.value}-${verificationSuffix.value}`;
  const token = await getToken();
  console.log('拿2到的 Token 是:', token);

  try {
    const response = await $axios.post("/api/v1/User/Logon", {
      Account: accountId.value,
      Password: md5(tempPassword.value),
      VerifyCode: verificationCode,
      // 根據 active2faMethod 決定要送 Phone 還是 Email 欄位
      Phone: active2faMethod.value === 'phone' ? twoFactorOptions.value.phone : '',
      Email: active2faMethod.value === 'email' ? twoFactorOptions.value.email : '',
      // MacAddress: iData.value.m,
      // SerialNumber: iData.value.s,
    },
      {
        headers: {
          Authorization: token
        }
      });

    if (response.data.Status.Code === 0 && response.data.Data.Token) {
      let token = response.data.Data.Token;
      const base64UrlToken = btoa(token).replace(/\+/g, "-").replace(/\//g, "_");
      if (!configStore.envUrl) {
        await configStore.loadConfig();
      }
      const targetUrl = `${configStore.envUrl}${base64UrlToken}`;
      window.location.href = targetUrl;
    } else {
      await openAlertModal(" ", `驗證失敗: ${response.data.Status.Message || '驗證碼錯誤'}`);
    }
  } catch (error) {
    console.error("驗證失敗:", error);
    await openAlertModal(" ", "驗證時發生錯誤，請檢查網路再試。");
  }
}

// 計時器
const startCountdown = (method) => {
  if (!timers[method]) return;
  const timerState = timers[method];
  const now = Date.now();
  const endTime = localStorage.getItem(timerState.storageKey);  // localStorage key
  if (endTime) {
    timerState.countdown = Math.max(0, Math.floor((+endTime - now) / 1000));
  } else {
    localStorage.setItem(timerState.storageKey, now + timerState.duration * 1000);
    timerState.countdown = timerState.duration - 1;
  }
  if (timerState.countdown > 0 && !timerState.instance) {
    timerState.instance = setInterval(() => {
      timerState.countdown -= 1;
      if (timerState.countdown <= 0) {
        clearInterval(timerState.instance);
        timerState.instance = null;
        localStorage.removeItem(timerState.storageKey);
        timerState.countdown = timerState.duration;
      }
    }, 1000);
  } else if (timerState.countdown <= 0) {
    localStorage.removeItem(timerState.storageKey);
    timerState.countdown = timerState.duration;
  }
};

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
  // 計時器狀態
  Object.keys(timers).forEach(method => {
    const endTime = localStorage.getItem(timers[method].storageKey);
    if (endTime && +endTime > Date.now()) {
      startCountdown(method);
    }
  });
  await setPageLoading(true);
  //const res = await getSerialNumber(); // 等待回應
  //console.log(res);

  // 取得turnstileKey
  turnstilesitekey = configStore.turnstilesitekey;
  //console.log('configStore.turnstilesitekey1', turnstilesitekey);

  // 驗證 status.code
  // if (res && res.status && res.status.code === 0) {
  //   iData.value = res.data;
  // } else if (res && res.status && res.status.code !== 0) {
  //   await openAlertModal(" ", "安裝工具過程中請記得輸入序號");
  // } else {
  //   await openAlertModal(" ", "請依文件調整瀏覽器設定值,安裝工具再行登入");
  // }
  if (accountInput.value) {
    accountInput.value.focus();
  }
  await setPageLoading(false);
});

onBeforeUnmount(() => {
  // 清理計時器
  Object.keys(timers).forEach(method => {
    if (timers[method].instance) {
      clearInterval(timers[method].instance);
    }
  });
});
</script>

<style scoped>
.storeBac {
  background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.font-sans {
  font-family: Arial, "Noto Sans TC", sans-serif;
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

.verify:hover~.tips {
  opacity: 1;
  z-index: 1;
}

.text-gradient-t {
  background: linear-gradient(to bottom, #fff, #43edff);
  background: -webkit-linear-gradient(#fff, #43edff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  color: transparent;
}

.text-gradient-b {
  background: linear-gradient(to bottom, #43edff, #fff);
  background: -webkit-linear-gradient(#43edff, #fff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
  color: transparent;
}

.border-gradient-l {
  width: 40px;
  border: 2px solid;
  border-right: none;
  height: 10px;
  border-image: linear-gradient(to right, #fff, #43edff) 1;
  margin-right: 1rem;
}

.border-gradient-r {
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
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.loginEntry {
  color: #fff;
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.15));
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

.verifyBtn {
  width: 100%;
  height: 36px;
  border-width: 1px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  border-style: solid;
  border-color: transparent;
  background:
    linear-gradient(rgba(255, 255, 255, 0.01), #6FF1FE, rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #6FF1FE, rgba(255, 255, 255, 0.01));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  mask-image: linear-gradient(white, white), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: exclude, add;
}

@media screen and (max-width: 768px) {
  .border-gradient-l {
    width: 20px;
  }

  .border-gradient-r {
    width: 20px;
  }
}
</style>
