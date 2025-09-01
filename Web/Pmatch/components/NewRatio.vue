<template>
  <div class="bg-#fff matchingBox relative w-100%">
    <div class="matchingDetail">
      <div class="matchingTitle p-3 absolute flex items-center rounded-10px">
        <div class="flex items-center me-2">
          <img class="w-20px" src="/images/ratioIcon.png" alt="最新比值" />
        </div>
        <h3 class="m-0">最新比值</h3>
      </div>
      <div class="flex titleBox">
        <div class="w-full font-size-15px text-center mt-1 mb-1">
          遊戲平台
        </div>
        <div class="w-full font-size-15px text-center titleBorder mt-1 mb-1">
          委買比值
        </div>
        <div class="w-full font-size-15px text-center titleBorder mt-1 mb-1">
          委賣比值
        </div>
      </div>
      <div v-for="(item, index) in visibleList" :key="index">
        <div class="w-full flex rotatingBox">
          <div class="w-full font-size-15px pt-3 pb-3 text-center">
            {{ item.GamePlatform || "　" }}
          </div>
          <div class="patchDetail w-full font-size-18px pt-3 pb-3 text-center">
            {{ formatNumber(item.SendPatch) || "　" }}
          </div>
          <div class="patchDetail w-full font-size-18px pt-3 pb-3 text-center">
            {{ formatNumber(item.CollectPatch) || "　" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = ref("");
const token = ref("");
const matchingList = [
  {
    GamePlatform: "包你發娛樂城",
    SendPatch: "130",
    CollectPatch: "144",
  },
  {
    GamePlatform: "聚寶Online",
    SendPatch: "130",
    CollectPatch: "140",
  },
  {
    GamePlatform: "老子有錢Online",
    SendPatch: "130",
    CollectPatch: "144",
  },
  {
    GamePlatform: "寶島娛樂城",
    SendPatch: "130",
    CollectPatch: "144",
  },
  {
    GamePlatform: "錢街Online",
    SendPatch: "130",
    CollectPatch: "140",
  },
  {
    GamePlatform: "金好運娛樂城",
    SendPatch: "130",
    CollectPatch: "140",
  },
  {
    GamePlatform: "滿貫大亨",
    SendPatch: "1.35",
    CollectPatch: "1.5",
  },
  {
    GamePlatform: "豪神娛樂城",
    SendPatch: "1300",
    CollectPatch: "1440",
  },
  {
    GamePlatform: "錢多多娛樂城",
    SendPatch: "134",
    CollectPatch: "150",
  },
  {
    GamePlatform: "辣財神娛樂城",
    SendPatch: "130",
    CollectPatch: "144",
  },
  {
    GamePlatform: "金好爺娛樂城",
    SendPatch: "130",
    CollectPatch: "140",
  },
];

const visibleList = ref([]); // 當前顯示的列表
const currentIndex = ref(0); // 當前的起始索引
let intervalId = null; // 計時器 ID

const updateVisibleList = () => {
  const start = currentIndex.value;
  const end = Math.min(start + 5, matchingList.length); // 確保不超過數據長度
  const slice = matchingList.slice(start, end);

  // 如果不足 5 個，補空白項
  while (slice.length < 5) {
    slice.push({ GamePlatform: null, SendPatch: null, CollectPatch: null });
  }

  visibleList.value = slice;

  // 更新索引
  if (end >= matchingList.length) {
    // 如果到達末尾，回到起點
    currentIndex.value = 0;
  } else {
    currentIndex.value += 5;
  }
};
const startInterval = () => {
  updateVisibleList(); // 初始化顯示
  intervalId = setInterval(updateVisibleList, 5000); // 每 5 秒更新
};

const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};
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

onMounted(() => {
  startInterval();
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
    /* 旋轉 2 圈 */
  }

  75% {
    transform: rotateX(720deg);
    /* 保持 2 圈 */
  }

  100% {
    transform: rotateX(720deg);
    /* 保持 2 圈 */
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
