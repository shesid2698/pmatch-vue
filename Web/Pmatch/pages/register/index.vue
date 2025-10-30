<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
    crossorigin="anonymous" />
  <div class="ccontainer">
    <div class="w-68.75% flex flex-col flex-items-center">
      <div class="w-370px">
        <div class="flex flex-items-center">
          <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
          <div class="text-20px">會員服務條款</div>
        </div>
        <div class="mt-20px h-42px flex justify-between relative" id="progress">
          <div
            class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold">
            <i class="fa-solid fa-check"></i>
          </div>
          <div
            class="h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
            2
          </div>
          <div
            class="h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
            3
          </div>
        </div>
      </div>

      <!-- 服務條款內容 -->
      <div v-html="data" @scroll="handleScroll($event, 1)" id="service1"
        class="p-x-10px rounded-1 overflow-y-auto w-100% md:w-864px h-500px mt-20px border border-solid border-1px border-[#dee2e6]">
      </div>

      <pre v-if="data2 !== ''" id="service2" @scroll="handleScroll($event, 2)"
        class="p-x-10px rounded-1 overflow-y-auto w-100% md:w-864px h-500px mt-20px border border-solid border-1px border-[#dee2e6] text-16px font-light"
        style="white-space: pre-line;">
        {{ data2 }}
      </pre>

      <div class="mt-15px">
        <button :disabled="!isBottom || !isBottom2" @click="ToFormPage"
          class="w-200px p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
          同意
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
// loading page
import { useLoadStore } from '../stores/loading.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';

const encrypt = useEncrypt();
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const setPageLoading = store.setPageLoading;
const route = useRoute();
const router = useRouter();
const jwtStore = useJwtStore();
const data = ref('');
const data2 = ref('');
const token = ref('');
const isBottom = ref(false);
const { $axios } = useNuxtApp();

/**登入會員 */
const memberList = ref({});

/**會員類型(短網址註冊)*/
let MemberTypeCookie = useCookie('_PmMemberType');
let MemberStaffIdCookie = useCookie('_PmStaffId');
/**使用者名稱 */
let userNameCookie = useCookie('_PmUserName');
let tokenCookie = useCookie('_PmToken');
let MemberIdCookie = useCookie('_PmMemberId');

async function GetService(token, num) {
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetCompayIformationDetail',
      {
        Category: num
      },
      {
        headers: {
          Authorization: token // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      data.value = response.data.Content;
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}

/**
 * 商店合約書是否閱覽完畢，一開始不能設為true，會影響一般註冊過程的條件
 */
const isBottom2 = ref(false);
const handleScroll = (event, index) => {
  const target = event.target;
  const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
  if (isAtBottom) {
    switch (index) {
      case 1:
        isBottom.value = true;
        break;
      case 2:
        isBottom2.value = true;
        break;
    }
  }
};
/**
 * 提交表單
 */
const ToFormPage = async () => {
  if (route.query.Phone) {
    const shortUrlResponse = await $axios.post(
      '/api/v1/ShortUrl/RegisterNotify',
      {
        Data: {
          Id: encrypt.decrypt(route.query.D)
        }
      },
      {
        headers: {
          Authorization: token.value
        }
      }
    );
    if (shortUrlResponse.data.Status.Code === 0) {
      // 完成註冊並登入
      const registerRes = await $axios.post(
        'http://localhost:2450/api/v1/Pmatch/Register',
        {
          MobileNumber: route.query.Phone,
          IsPromoteCode: false,
          IsFromShortUrl: true
        }, {
        headers: {
          Authorization: token.value
        }
      }
      );
      if (registerRes.data.Status.Code === 0) {
        memberList.value = response.data.Data2;
        userNameCookie.value = response.data.Data2.Name;
        tokenCookie.value = response.data.Data2.Token;
        MemberIdCookie.value = response.data.Data2.PmatchMemberId;
        await GetMemberDetail(MemberIdCookie.value, tokenCookie.value);
        window.location.href = '/';
      } else {
        await openAlertModal(' ', `短網址註冊錯誤`, 'loginFailed');
      }
    } else {
      await openAlertModal(' ', `${shortUrlResponse.data.Status.Message}`);
      return;
    }
  } else {
    router.push('/register/form');
  }
};
/**
 * 取得登入的會員資料
 * @param memberId 
 * @param token 
 */
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
    MemberStaffIdCookie.value = response.data.Data[0].StaffId;
  }
};
onMounted(async () => {
  const targetNode = document.querySelector('#service1');
  const targetNode2 = document.querySelector('#service2');
  const observer = new MutationObserver(async () => {
    //短網址註冊
    if (route.query.Phone) {
      const { data: textContent } = await useFetch('/授權書.txt')
      data2.value = textContent.value;
    }

    //
    if (targetNode != null && targetNode != undefined) {
      if (targetNode.scrollHeight == targetNode.clientHeight) isBottom.value = true;
    }
    if (targetNode2 != null && targetNode2 != undefined) {
      if (targetNode2.scrollHeight == targetNode2.clientHeight) isBottom2.value = true;
    }
  });

  observer.observe(targetNode, { childList: true, subtree: true });
  if (targetNode2 != null && targetNode2 != undefined)
    observer.observe(targetNode2, { childList: true, subtree: true });

  await setPageLoading(true);
  token.value = await jwtStore.generateToken();
  await GetService(token.value, 4);
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

#progress::before {
  content: '';
  width: 100%;
  height: 1px;
  background: #e93470;
  position: absolute;
  top: 50%;
}
</style>
