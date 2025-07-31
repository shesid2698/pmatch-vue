<!-- components/ChatLauncher.vue -->
<template>
  <button
    v-show="userToken && memberId"
    class="fixed absolute bottom-[5%] right-[4%] z-50 w-[120px] h-[120px] chat-launcher  bg-[#F7EEFF] border-none  text-white rounded-full p-3 backdrop-blur-[4px] bg-[#F7EEFF] shadow-[0_0_6px_5px_#FFFFFF] hover:shadow-[0_0_10px_10px_#FFFFFF] hover:cursor-pointer active:bg-[#E0CFEF] "
    title="開啟聊天室"
    @click="OpenChat" 
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <svg v-if="!isHover" width="84" height="70" viewBox="0 0 84 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M65.5886 0H30.5664C21.0185 0 13.1405 7.48438 12.2403 17.0274C5.22552 18.7811 0.000488281 25.2727 0.000488281 32.988V44.7767C0.000488281 52.6245 5.40479 59.2047 12.6037 60.8249L11.0361 66.276C10.8854 66.8002 10.8982 67.358 11.0729 67.8747C11.2476 68.3914 11.5759 68.8425 12.0139 69.1676C12.4518 69.4928 12.9786 69.6765 13.5238 69.6943C14.0689 69.712 14.6065 69.563 15.0647 69.267L27.5413 61.2059H45.8216C50.731 61.2059 55.1327 58.9387 58.0799 55.3729L67.0072 61.1396C67.4654 61.4356 68.003 61.5846 68.5481 61.5669C69.0933 61.5491 69.6201 61.3654 70.058 61.0402C70.496 60.7151 70.8243 60.264 70.999 59.7473C71.1737 59.2306 71.1866 58.6728 71.0358 58.1486L69.0512 51.2468C77.5547 49.5828 84.0005 41.9104 84.0005 32.7249V18.8561C84.0005 8.45865 75.7406 0 65.5886 0ZM78.6439 32.723C78.6439 40.1654 72.7885 46.2206 65.5886 46.2206C65.1736 46.2205 64.7641 46.317 64.3927 46.5022C64.0212 46.6875 63.6979 46.9566 63.4482 47.2882C63.1985 47.6198 63.0293 48.0048 62.9539 48.413C62.8785 48.8212 62.8989 49.2413 63.0136 49.6403L63.91 52.7579L60.7806 50.7363L58.4725 49.2447L56.1275 47.7307L54.4546 46.6492C54.0215 46.3693 53.5167 46.2205 53.001 46.2206H30.5664C23.3685 46.2206 17.5111 40.1654 17.5111 32.723V18.8561C17.5109 18.0864 17.5744 17.318 17.7011 16.5588C18.7582 10.2065 24.1245 5.35461 30.5615 5.35461H65.5886C72.7866 5.35461 78.6439 11.4097 78.6439 18.8522V32.723Z" fill="url(#paint0_linear_1051_1038)"/>
      <path d="M35.9237 25.2934C35.9237 23.2135 34.2376 21.5273 32.1577 21.5273C30.0777 21.5273 28.3916 23.2135 28.3916 25.2934C28.3916 27.3733 30.0777 29.0595 32.1577 29.0595C34.2376 29.0595 35.9237 27.3733 35.9237 25.2934Z" fill="url(#paint1_linear_1051_1038)"/>
      <path d="M51.8114 25.2934C51.8114 23.2135 50.1253 21.5273 48.0454 21.5273C45.9654 21.5273 44.2793 23.2135 44.2793 25.2934C44.2793 27.3733 45.9654 29.0595 48.0454 29.0595C50.1253 29.0595 51.8114 27.3733 51.8114 25.2934Z" fill="url(#paint2_linear_1051_1038)"/>
      <path d="M67.704 25.2934C67.704 23.2135 66.0179 21.5273 63.9379 21.5273C61.858 21.5273 60.1719 23.2135 60.1719 25.2934C60.1719 27.3733 61.858 29.0595 63.9379 29.0595C66.0179 29.0595 67.704 27.3733 67.704 25.2934Z" fill="url(#paint3_linear_1051_1038)"/>
      <defs>
      <linearGradient id="paint0_linear_1051_1038" x1="42.0005" y1="0" x2="42.0005" y2="69.6957" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7B2CBF"/>
      <stop offset="1" stop-color="#400078"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1051_1038" x1="32.1577" y1="21.5273" x2="32.1577" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7B2CBF"/>
      <stop offset="1" stop-color="#400078"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1051_1038" x1="48.0454" y1="21.5273" x2="48.0454" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7B2CBF"/>
      <stop offset="1" stop-color="#400078"/>
      </linearGradient>
      <linearGradient id="paint3_linear_1051_1038" x1="63.9379" y1="21.5273" x2="63.9379" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7B2CBF"/>
      <stop offset="1" stop-color="#400078"/>
      </linearGradient>
      </defs>
    </svg>
    <svg v-else width="84" height="70" viewBox="0 0 84 70" xmlns="http://www.w3.org/2000/svg"> 
      <path d="M65.5886 0H30.5664C21.0185 0 13.1405 7.48438 12.2403 17.0274C5.22552 18.7811 0.000488281 25.2727 0.000488281 32.988V44.7767C0.000488281 52.6245 5.40479 59.2047 12.6037 60.8249L11.0361 66.276C10.8854 66.8002 10.8982 67.358 11.0729 67.8747C11.2476 68.3914 11.5759 68.8425 12.0139 69.1676C12.4518 69.4928 12.9786 69.6765 13.5238 69.6943C14.0689 69.712 14.6065 69.563 15.0647 69.267L27.5413 61.2059H45.8216C50.731 61.2059 55.1327 58.9387 58.0799 55.3729L67.0072 61.1396C67.4654 61.4356 68.003 61.5846 68.5481 61.5669C69.0933 61.5491 69.6201 61.3654 70.058 61.0402C70.496 60.7151 70.8243 60.264 70.999 59.7473C71.1737 59.2306 71.1866 58.6728 71.0358 58.1486L69.0512 51.2468C77.5547 49.5828 84.0005 41.9104 84.0005 32.7249V18.8561C84.0005 8.45865 75.7406 0 65.5886 0ZM78.6439 32.723C78.6439 40.1654 72.7885 46.2206 65.5886 46.2206C65.1736 46.2205 64.7641 46.317 64.3927 46.5022C64.0212 46.6875 63.6979 46.9566 63.4482 47.2882C63.1985 47.6198 63.0293 48.0048 62.9539 48.413C62.8785 48.8212 62.8989 49.2413 63.0136 49.6403L63.91 52.7579L60.7806 50.7363L58.4725 49.2447L56.1275 47.7307L54.4546 46.6492C54.0215 46.3693 53.5167 46.2205 53.001 46.2206H30.5664C23.3685 46.2206 17.5111 40.1654 17.5111 32.723V18.8561C17.5109 18.0864 17.5744 17.318 17.7011 16.5588C18.7582 10.2065 24.1245 5.35461 30.5615 5.35461H65.5886C72.7866 5.35461 78.6439 11.4097 78.6439 18.8522V32.723Z" fill="url(#paint0_linear_1051_1045)"/>
      <path d="M35.9237 25.2934C35.9237 23.2135 34.2376 21.5273 32.1577 21.5273C30.0777 21.5273 28.3916 23.2135 28.3916 25.2934C28.3916 27.3733 30.0777 29.0595 32.1577 29.0595C34.2376 29.0595 35.9237 27.3733 35.9237 25.2934Z" fill="url(#paint1_linear_1051_1045)"/>
      <path d="M51.8114 25.2934C51.8114 23.2135 50.1253 21.5273 48.0454 21.5273C45.9654 21.5273 44.2793 23.2135 44.2793 25.2934C44.2793 27.3733 45.9654 29.0595 48.0454 29.0595C50.1253 29.0595 51.8114 27.3733 51.8114 25.2934Z" fill="url(#paint2_linear_1051_1045)"/>
      <path d="M67.704 25.2934C67.704 23.2135 66.0179 21.5273 63.9379 21.5273C61.858 21.5273 60.1719 23.2135 60.1719 25.2934C60.1719 27.3733 61.858 29.0595 63.9379 29.0595C66.0179 29.0595 67.704 27.3733 67.704 25.2934Z" fill="url(#paint3_linear_1051_1045)"/>
      <defs>
      <linearGradient id="paint0_linear_1051_1045" x1="42.0005" y1="0" x2="42.0005" y2="69.6957" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C27BFF"/>
      <stop offset="1" stop-color="#8829DA"/>
      </linearGradient>
      <linearGradient id="paint1_linear_1051_1045" x1="32.1577" y1="21.5273" x2="32.1577" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C27BFF"/>
      <stop offset="1" stop-color="#8829DA"/>
      </linearGradient>
      <linearGradient id="paint2_linear_1051_1045" x1="48.0454" y1="21.5273" x2="48.0454" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C27BFF"/>
      <stop offset="1" stop-color="#8829DA"/>
      </linearGradient>
      <linearGradient id="paint3_linear_1051_1045" x1="63.9379" y1="21.5273" x2="63.9379" y2="29.0595" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C27BFF"/>
      <stop offset="1" stop-color="#8829DA"/>
      </linearGradient>
      </defs>
    </svg>
    <div
      v-if="isFlashing.size > 0"
      class="absolute top-[3%] right-[3%] w-[17.5px] h-[17.5px] rounded-full border-none flashing">
    </div>
  </button>
</template>

<script setup lang="ts">
import { useCookie } from '#app'
import { useAlertModalStore } from "../stores/useAlertModal.js";
import { useConfigStore } from '@/stores/config';

const { $initSignalR, $setSignalROnMessage } = useNuxtApp();
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const config = useConfigStore()
const configStore = useConfigStore();
const userToken = useCookie('_PmToken')
const memberId = useCookie("_PmMemberId");
const staffId = useCookie('_PmStaffId')
const isHover = ref(false);

const isFlashing = ref<Set<number>>(new Set()); // 聊天室閃爍

onMounted(async () => {
  const token = userToken.value;
  const signalRUrl = configStore.baseConfig.signalRUrl;
if (token && signalRUrl) {
    $setSignalROnMessage((data) => {
      try {        
        const actionType = data?.actionType;
        const payload = data?.payload ?? null;
        const chatRoomId = payload?.ChatRoomId ?? payload?.chatRoomId;

        if (!payload || !chatRoomId) return;
          const isFromMe = typeof payload.StaffName === 'string' && payload.StaffName.trim() === '';
          const isReadNotice = actionType === 353;
          // 收到他人訊息 開始閃爍
          if (!isReadNotice && !payload.staffName && !isFromMe) {
            if (!isFlashing.value.has(chatRoomId)) {
              isFlashing.value.add(chatRoomId);
            }
          }
          // 收到已讀訊息 停止閃爍
          if (isReadNotice && isFlashing.value.has(chatRoomId)) {
            isFlashing.value.delete(chatRoomId);
          }
        } catch (error) {
          console.error("[SignalR] 錯誤訊息：", error);
        }
      });
      await $initSignalR({ url: signalRUrl, token, groupParam: `_pmatch_${staffId.value}` });
    }
});

// 打開聊天室
const OpenChat = async () => {
  if (!userToken.value || userToken.value.trim() === '') {
    await openAlertModal(' ', '請先登入會員!')
    return
  }
  const obj = {
    RequestBase: {
      SqlIndex: 0,
      TeamIDs: '',
    },
    Token: userToken.value,
    StoreId: 0,
    StaffId: staffId.value,
    IsPmatch: true,
  }
  const str = JSON.stringify(obj)
  const chatToken = btoa(str).replace(/\+/g, '-').replace(/\//g, '_')

  if (config.webChatUrl !== '') {
    window.open(
      `${config.webChatUrl}?token=${chatToken}`,
      '_blank',
      'toolbar=no,location=no,status=no,resizable=no,width=870,height=720'
    )
  }
}
</script>

<style scoped>
.chat-launcher {
  transition: all 0.2s;
}
.flashing {
  animation: flashing-color 4s infinite;
}

@keyframes flashing-color {
  0%, 100% {
    background-color: #FF4A4D;
    box-shadow: 0 0 6px 3px #C90E5B;
  }
  50% {
    background-color: #FFDADB;
    box-shadow: 0 0 6px 3px #FFE3EE;
  }
}
</style>
