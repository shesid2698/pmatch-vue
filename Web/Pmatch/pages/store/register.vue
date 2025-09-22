<template>
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />  
  </Head>
  <div class="storeBac pt-[130px] min-h[100vh] pb-[15rem]">
    <div class="max-w-1110px w-full md-w-50% m-auto ps-5 pe-5 relative z-2">
      <div class="w-full">
        <!-- 登入Title -->
        <div class="flex items-center justify-center mb-3rem">
          <div class="border-gradient-l"></div>
          <span class="text-gradient-t font-bold text-32px md:text-40px ">申請試</span>
          <span class="text-gradient-b font-bold text-32px md:text-40px">用帳號</span>
          <div class="border-gradient-r"></div>
        </div>
        <div class="mt-3rem content-box bg-gradient-to-b from-[#FFFFFF00] to-[#FFFFFF33] p-2rem">
          <form action="" method="POST" @submit.prevent="register">
            <div class="mt-15px flex items-center justify-end">
              <div class="mb-5px me-4 min-w-12 color-#fff font-sans font-light text-18px">帳號*</div>
              <div class="relative w-[91%]">
              <input type="text" required v-model="accountId" ref="accountInput" autocomplete
                class="bg-white/15 w-full indent-4 rounded-[10px] box-border my-2 py-4 text-base text-white border-none outline-none rounded-1 focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>
            </div>
            <div class="mt-15px flex items-center justify-end">
              <div class="mb-5px me-4 min-w-12 color-#fff font-sans font-light text-18px">密碼*</div>
              <div class="relative w-[91%]">
                <input type="password" ref="i_password" autocomplete="current-password" v-model="password"
                  class="password bg-white/15 w-full indent-4 rounded-[10px] box-border my-2 py-4 text-base text-white border-none outline-none rounded-1 focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                <div @click="turnInputType"
                  class="cursor-pointer absolute top-50% transform translate-y-[-45%] right-20px">
                  <i ref="eyes" class="fa-solid fa-eye text-gray"></i>
                </div>
                <div class="absolute w-200px h-auto bg-dark left-50% translate-x-[-50%] translate-y-[8px] bottom-130% text-14px text-white p-10px rounded-1 tips">
                  密碼長度必須為8~20位,
                  其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                  ! @ # $ % & *
                </div>
                <div class="absolute w-15px h-15px bg-dark left-50% translate-x-[-50%] bottom-110% [clip-path:polygon(50%_100%,_0_50%,_100%_50%)] tips"></div>
              </div>
            </div>
            <div class="hidden-field absolute left-[-999px] top-[-999px]">
                <label for="website">Hobby</label>
                <input type="text" id="website" name="website" v-model="honeypot" autocomplete="off" tabindex="-1">
            </div>            
            <!-- 取消/註冊 -->
            <div class="mt-20px mb-8px flex justify-between">
              <div v-if="!hasToken" class="absolute">
                <VueTurnstile :site-key="turnstilesitekey" size="normal" @update:model-value="onVerify"></VueTurnstile>
              </div>
              <div class="flex w-[50%] ms-auto gap-10">
                <div class="w-full">
                  <div class="relative p-[1px] bg-gradient-to-r from-[#7b2cbf] to-[#f72585] text-16px rounded-full border-none">
                    <button type="button" @click="router.push('/store/login')"
                      class="w-full border-none outline-none text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer py-[10px] bg-gradient-to-r from-[#7b2cbf] to-[#f72585] rounded-full text-[1.2rem] font-semibold hover:from-[white] hover:to-[white] hover:text-[#f72585]">
                      取消
                    </button>
                  </div>
                </div>
                <div class="w-full">
                  <div class="relative p-[1px] bg-gradient-to-r from-[#7b2cbf] to-[#f72585] text-16px rounded-full border-none">
                    <button type="submit" :disabled="hasToken == false"
                      class="disabled:opacity-70 disabled:pointer-events-none w-full border-none outline-none text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer py-[10px] bg-gradient-to-r from-[#7b2cbf] to-[#f72585] rounded-full text-[1.2rem] font-semibold hover:from-[white] hover:to-[white] hover:text-[#f72585]">
                      註冊
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="flex justify-center w-[70%] mx-auto gap-[15%]">
          <div class="mt-3rem content-box bg-gradient-to-b from-[#FFFFFF33] to-[#FFFFFF00] p-2rem w-full flex flex-col justify-center items-center">
            <p class="text-20px text-white">客服技術部門</p>
            <img src="/images/qr-code-serve.svg" alt="客服技術部門QRcode">
            <p class="text-20px text-white">ID：@471ixkfc</p>
          </div>
          <div class="mt-3rem content-box bg-gradient-to-b from-[#FFFFFF33] to-[#FFFFFF00] p-2rem w-full flex flex-col justify-center items-center">
            <p class="text-20px text-white">商業資訊部門</p>
            <img src="/images/qr-code-info.svg" alt="商業資訊部門QRcode"></img>
            <p class="text-20px text-white">ID：@806aqrbw</p>
          </div>
        </div>
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
const router = useRouter();
const routes = useRouter();
const encrypt = useEncrypt();
const token = ref("");
const jwtStore = useJwtStore();

const { $axios } = useNuxtApp();

const password = ref("");
const eyes = ref(null);
const i_password = ref(null);
const { md5 } = crypto();
const accountInput = ref(null);
const honeypot = ref('');

const userToken = useCookie("_PmToken");
const hasToken = ref(userToken.value !== undefined);


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
  token.value = tokenValue;
  setTimeout(() => {
    hasToken.value = true;
  }, 1500);
};

// register
async function register(event) {
  event.preventDefault();
  try {
    token.value = await jwtStore.generateToken();
    const response = await $axios.post(
      "/api/v1/User/PmStfReg",
      {
        Account: accountId.value,
        Password: md5(password.value),
        Token: honeypot.value,
      },
      {
        headers: {Authorization: token.value},
      },
    );
    if (response.data.Status.Code === 0) {
      await openAlertModal(" ", "註冊成功！");
      routes.push({
        path: "/store/login",
      });
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
  }
}

onMounted(async () => {
  await setPageLoading(true);

  // 取得turnstileKey
  turnstilesitekey = configStore.turnstilesitekey;
  // console.log('configStore.turnstilesitekey1', turnstilesitekey);
  
  if (accountInput.value) {
    accountInput.value.focus();
  }
  await setPageLoading(false);
});
</script>

<style scoped>
.storeBac {
  background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  @media screen and (max-width: 768px) {
    width: 20px;
  }
}
.border-gradient-r {
  width: 40px;
  border: 2px solid;
  border-left: none;
  height: 10px;
  border-image: linear-gradient(to left, #fff, #43edff) 1;
  margin-left: 1rem;
  @media screen and (max-width: 768px) {
    width: 20px;
  }
}
.font-sans {
  font-family: Arial, "Noto Sans TC", sans-serif;
}
.content-box {
  position: relative;
  border-radius: 20px;
}
.content-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(to right, #43edff, #fff);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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

.tips {
  opacity: 0;
  transition: 0.2s;
  z-index: -1;
}
.password:hover~.tips {
  opacity: 1;
  z-index: 1;
}
</style>
