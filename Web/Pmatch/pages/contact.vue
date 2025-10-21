<template>
  <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
    <div class="mb-5 flex items-center justify-center">
      <!-- title -->
      <div class="flex items-center w-100% lg-w-410px">
        <div class="w-25px h-20px bg-#1a6db4"></div>
        <span class="font-size-1.4rem ms-3 fw-600">聯絡我們</span>
      </div>
    </div>
    <div class="flex justify-center">
      <form action="#" @submit="submitForm">
          <div class="w-100% lg-w-auto">
              <!--<p class="m-0 mb-3">
      會員帳號： <span class="color-red">*</span>
    </p>
    <input required
      class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
      type="text" v-model="accountId" disabled />
    <p class="m-0 mb-3">
      遊戲平台： <span class="color-red">*</span>
    </p>
    <select required v-model="platform"
      class="selectCol w-100% lg-w-414px rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
      <option value="" hidden>請選擇..</option>
      <option v-for="(item, index) in gameList" :key="index" :value="item.PlatformId">
        {{ item.PlatformName }}
      </option>
    </select>
    <p class="m-0 mb-3">
      遊戲暱稱： <span class="color-red">*</span>
    </p>
    <input required
      class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
      type="text" v-model="nickName" />-->
              <p class="m-0 mb-3">
                  聯絡人姓名： <span class="color-red">*</span>
              </p>
              <input required
                     class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                     type="text" v-model="name" />
              <p class="m-0 mb-3">
                  聯絡人信箱： <span class="color-red">*</span>
              </p>
              <input required
                     class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                     type="email" placeholder="ex: johnny.doe@mail.com" v-model="mail" />
              <p class="m-0 mb-3">聯絡人電話： <span class="color-red">*</span></p>
              <input required
                     class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                     type="text" placeholder="ex: xxx-xxxxxxxx#ext" v-model="telephone" />
              <p class="m-0 mb-3">
                  問題類別： <span class="color-red">*</span>
              </p>
              <select required v-model="questionType"
                      class="selectCol w-100% lg-w-414px rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
                  <option value="1">商務洽談</option>
                  <option value="2">會員帳號</option>
                  <option value="3">其他</option>
              </select>
              <p class="m-0 mb-3">
                  問題主題： <span class="color-red">*</span>
              </p>
              <input required
                     class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                     type="text" v-model="questionTheme" />
              <p class="m-0 mb-3">問題描述：</p>
              <textarea class="entryCol w-100% lg-w-380px rounded-5px h-150px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                        v-model="questionDescription" />
              <div>
                  <button class="border-none bg-#e93470 color-#fff w-100% lg-w-414px rounded-5px h-35px font-size-1rem">
                      提交
                  </button>
              </div>
          </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// loading page
import { useLoadStore } from "../stores/loading.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const userNameCookie = useCookie("_PmUserName");
const MemberIdCookie = useCookie("_PmMemberId");
const router = useRouter();
//const gameList = ref([]);

let accountId = ref("");
let platform = ref("");
let nickName = ref("");
let name = ref("");
let mail = ref("");
let telephone = ref("");
let questionType = ref("");
let questionTheme = ref("");
let questionDescription = ref("");

async function contactList(token) {
  try {
    const response = await $axios.post(
      "/api/v1/Pmatch/CreateOrUpdateFeedBack",
      {
        Data: [
          {
            Id: 0,
            Category: Number(questionType.value),
            MemberId: accountId.value,
            GameplatformId: 0, //Number(platform.value),
            Name: name.value,
            NickName: nickName.value,
            Email: mail.value,
            phonenumber: telephone.value,
            Title: questionTheme.value,
            Content: questionDescription.value,
          },
        ],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.data.Status.Code === 0) {
      await openAlertModal(" ", "已成功傳送訊息!將有專員為您服務!");
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
  }
}
async function submitForm(event) {
  event.preventDefault();
  await contactList(userToken.value);
  window.location.reload();
}

// 取得GetPlatformAndCharacterList
//async function fetchGameList(token) {
//  try {
//    const response = await $axios.post(
//      "/api/v1/Pmatch/GetPlatformAndCharacterList",
//      {},
//      {
//        headers: {
//          Authorization: token, // 帶上 Token
//        },
//      }
//    );
//    if (response.data.Status.Code === 0) {
//      gameList.value = response.data.Data;
//    } else {
//      await openAlertModal(" ", `${response.data.Status.Message}`);
//    }
//  } catch (error) {
//    console.error("請求失敗:", error);
//    data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
//  }
//}

    // 取得會員資料
    async function fetchMemberData(token) {
        try {
            const response = await $axios.post(
                "/api/v1/Pmatch/GetMemberDetail",
                {
                    PmatchMemberId: MemberIdCookie.value
                },
                {
                    headers: {
                        Authorization: token, // 帶上 Token
                    },
                }
            );
            if (response.data.Status.Code === 0) {
                telephone.value = response.data.Data[0].Mobile1;
                mail.value = response.data.Data[0].Email;
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error("請求失敗:", error);
            data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
        }
    }

//
onMounted(async () => {
  await setPageLoading(true);
  try {
    if (userToken.value != "" && userToken.value != undefined) {
      name.value = userNameCookie.value;
      accountId.value = MemberIdCookie.value;
      //await fetchGameList(userToken.value);
      await fetchMemberData(userToken.value);
      await setPageLoading(false);
      return;
    } else {
      router.push("/member/login");
    }
  } catch (error) {
    console.error("頁面初始化失敗:", error);
  } finally {
    await setPageLoading(false);
  }
});
</script>

<style scoped>
.entryCol,
.selectCol {
  border: 1px solid #ccc;
}

.entryCol:focus,
.selectCol:focus {
  border-color: #a9d8f8;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.selectCol {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.selectCol::-ms-expand {
  display: none;
}
</style>
