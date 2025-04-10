<template>
  <div class="bg-#fff matchingBox relative w-100%">
    <div class="matchingDetail">
      <div class="matchingTitle p-3 absolute flex items-center rounded-10px">
        <div class="flex items-center me-2">
          <img class="w-20px" src="/images/matchingIcon.png" alt="即時媒合狀況" />
        </div>
        <h3 class="m-0 font-size-20px">即時媒合狀況</h3>
      </div>

      <div class="flex titleBox">
        <div class="w-200px font-size-15px text-center mt-1 mb-1">
          時間
        </div>
        <div class="w-full font-size-15px text-center titleBorder mt-1 mb-1">
          遊戲平台
        </div>
        <div class="w-full font-size-15px text-center titleBorder mt-1 mb-1">
          遊戲幣數量
        </div>
        <div class="w-full font-size-15px text-center titleBorder mt-1 mb-1">
          委託對象
        </div>
      </div>

      <div class="">
        <div class="w-full flex rotatingBox infinite-rotation" v-if="visibleList.length > 0"
          v-for="(item, index) in visibleList" :key="index">
          <div class="w-200px font-size-15px pt-3 pb-3 text-center">
            {{
              item.EndTime
                ? item.EndTime.split("T")[0].slice(5)
                : "　"
            }}
          </div>
          <div class="w-full font-size-15px pt-3 pb-3 text-center">
            {{ item.GamePlatform || "　" }}
          </div>
          <div class="patchDetail w-full font-size-18px pt-3 pb-3 text-center">
            {{ formatNumber(item.Patch) || "　" }}
          </div>
          <div class="w-full font-size-15px pt-3 pb-3 text-center">
            {{ item.MobileNumber || "　" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const matchingList = ref([]);
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");

const visibleList = ref([]); // 當前顯示的列表
const currentIndex = ref(0); // 當前的起始索引
let intervalId = null; // 計時器 ID

const updateVisibleList = () => {
  const itemsPerPage = 5; // 每頁顯示的項目數量
  const maxPages = 5; // 最多顯示的頁數
  const totalItems = matchingList.value.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 總頁數

  // 限制最多顯示的頁數
  const maxItems = Math.min(maxPages * itemsPerPage, totalItems);
  const start = currentIndex.value;
  const end = Math.min(start + itemsPerPage, maxItems); // 確保不超過最大數量

  const slice = matchingList.value.slice(start, end);

  // 如果不足 itemsPerPage 個，補空白項
  while (slice.length < itemsPerPage) {
    slice.push({
      EndTime: null,
      GamePlatform: null,
      Patch: null,
      MobileNumber: null,
    });
  }

  visibleList.value = slice;

  // 更新索引
  if (end >= maxItems) {
    // 如果到達末尾，回到起點
    currentIndex.value = 0;
  } else {
    currentIndex.value += itemsPerPage;
  }
};
const startInterval = () => {
  stopInterval(); // 確保先停止現有的 interval
  currentIndex.value = 0; // 重置索引
  updateVisibleList(); // 立即更新一次
  intervalId = setInterval(updateVisibleList, 5000);
};

const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// 接收父元件傳遞的參數
const props = defineProps({
  param: {
    type: String,
    required: true,
  },
});

// 取得MatchingList
async function fetchMatchingListData(token, platformName) {
  if (!process.client) return; // 確保只在客戶端執行
  if (token === "") {
    token = await jwtStore.generateToken();
  }
  if (platformName === undefined) {
    platformName = "";
  }
  try {
    const response = await $axios.post(
      "/api/v1/Pmatch/InstantMatching",
      {
        GamePlatform: platformName,
      },
      {
        headers: {
          Authorization: token, // 帶上 Token
        },
      }
    );
    if (response.data.Status.Code === 0) {
      matchingList.value = response.data.Datas;
      // 獲取新數據後立即重新開始輪播
      startInterval();
    } else {
      await openAlertModal(" ", `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error("請求失敗:", error);
    data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
  }
}
// 千分位
const formatNumber = (value) => {
  if (value === undefined || value === null || value === "") {
    return "　"; // 如果值不存在，返回空白字符
  }
  const number = Number(value);
  if (isNaN(number)) {
    return value; // 如果不是數字，直接返回原始值
  }
  return number.toLocaleString(); // 將數字轉換為千分位格式
};
// 監聽傳遞即時媒合值的變化去call api
watch(
  () => props.param,
  async (newParam) => {
    stopInterval(); // 先停止現有的輪播
    await fetchMatchingListData("", newParam);
  },
  { immediate: true }
);
// 在組件載入時啟動計時器
onMounted(async () => {
  if (!props.param) {
    await fetchMatchingListData("", "");
  }
});
onBeforeUnmount(() => {
  stopInterval();
});
</script>

<style scoped>
.matchingBox {
  padding: 1px;
  background: linear-gradient(to right,
      rgba(67, 97, 238, 0.3),
      rgba(247, 37, 133, 0.3));
  border-radius: 1rem;
}

.matchingDetail {
  background: #fff;
  border-radius: 1rem;
  padding-top: 3rem;
}

.matchingTitle {
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
}

.titleBox {
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  padding: 0.2rem 0;
}

.titleBorder {
  border-left: 2px solid #fff;
}

.patchDetail {
  background: linear-gradient(to right, #4361ee, #7b2cbf);
  background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

@keyframes rotate-with-pause {
  0% {
    transform: rotateX(0deg);
    /* 初始狀態 */
  }

  25% {
    transform: rotateX(720deg);
    /* 旋轉 1 圈 */
  }

  75% {
    transform: rotateX(720deg);
    /* 保持 1 圈旋轉，這是第二秒，暫停 */
  }

  100% {
    transform: rotateX(720deg);
    /* 旋轉 2 圈 */
  }
}

/* 動畫樣式 */
.rotatingBox {
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  animation: rotate-with-pause 5s ease-out infinite;
  /* 每 5 秒一個循環 */
}
</style>
