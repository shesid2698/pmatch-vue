<template>
  <div class="ccontainer md:pt-60px">
    <div class="login-card w-100% md:w-378px">
      <div class="flex flex-items-center">
        <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
        <div class="text-20px">更改密碼</div>
      </div>

      <form action="" @submit="ChangePwd">
        <div class="mt-15px">
          <div class="mb-5px">簡訊驗證碼</div>
          <input type="text" required v-model="verifyCode"
            class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
        </div>

        <div class="mt-15px">
          <div class="mb-5px">密碼</div>
          <div class="relative">
            <input type="password" required v-model="newPassword" ref="i_password"
              class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
              pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}" />
            <div @click="turnInputType" class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%">
              <i ref="eyes" class="fa-solid fa-eye text-gray"></i>
            </div>

            <div
              class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-130% text-white p-10px rounded-1">
              密碼長度必須為8~20位,
              其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
              ! @ # $ % & *
            </div>
            <div class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"></div>
          </div>
        </div>

        <div class="mt-15px">
          <div class="mb-5px">再次確認密碼</div>
          <input type="password" required v-model="confirmPassword"
            pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}"
            class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
        </div>

        <div class="mt-15px">
          <div class="flex">
            <div class="flex-1">
              <button type="button" @click="ResendVerifyCode"
                class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:opacity-70 transition duration-200 cursor-pointer">
                重新取得驗證碼
              </button>
            </div>
            <div class="w-10px"></div>
            <div class="flex-1">
              <button type="submit"
                class="disabled:opacity-70 p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#e93470] hover:bg-[#bb2d3b] transition duration-200 cursor-pointer">
                更改密碼
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const { md5 } = crypto();
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const route = useRoute();
const router = useRouter();
const phone = ref("");
const token = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const verifyCode = ref("");
const jwtStore = useJwtStore();
const encrypt = useEncrypt();
const { $axios } = useNuxtApp();
const ResendVerifyCode = async () => {
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
      await openAlertModal(" ", "簡訊驗證碼已發送");
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
  }
};
/**
 * 更換密碼(提交表單)
 * @param event
 */
const ChangePwd = async (event) => {
  event.preventDefault();
  if (newPassword.value == confirmPassword.value) {
    try {
      token.value = await jwtStore.generateToken();
      const password = md5(newPassword.value);
      const response = await $axios.post(
        "/api/v1/Pmatch/ChangedPassword",
        {
          NewPassword: password,
          VerifyCode: verifyCode.value,
        },
        {
          headers: {
            Authorization: token.value,
          },
        }
      );

      if (response.data.Status.Code === 0) {
        await openAlertModal(" ", "密碼更改成功!!");
        router.push("/member/login");
      } else {
        await openAlertModal(" ", `${response.data.Status.Message}`);
      }
    } catch (error) {
      console.error("請求失敗:", error);
    }
  } else {
    await openAlertModal(" ", "密碼與確認密碼不一致!!");
  }
};
onMounted(() => {
  phone.value = encrypt.decrypt(route.query.data);
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
</style>
