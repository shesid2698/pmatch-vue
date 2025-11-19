<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { gsap } from 'gsap'

// 用 useState 儲存全域共享的 index
const index = useState('activeIndex', () => 0)

const buttons = ref([])
const indicator = ref(null)

const offsetX = ref(0)
const offsetY = ref(0)

// 點擊按鈕移動灰色區塊
const moveIndicator = async (i) => {
  index.value = i
  await nextTick()

  const target = buttons.value[i]
  if (!target || !indicator.value) return

  const { offsetLeft, offsetWidth } = target
  gsap.to(indicator.value, {
    x: offsetLeft,
    width: offsetWidth,
    duration: 0.8,
    ease: 'power2.out'
  })
}
/**
 * 滑鼠移入圖片區域事件
 * @returns {void}
 * @param {MouseEvent} e - 滑鼠事件物件
 */
const MouseMoveHandler = (e) => {
  const targetWidth = e.target.width;
  const targetHeight = e.target.height;
  offsetX.value = ((e.offsetX / targetWidth) * 100) - 5;
  offsetY.value = ((e.offsetY / targetHeight) * 100) - 5;
  console.log(offsetX.value, offsetY.value);
  if(offsetX.value < 10) offsetX.value = 10;  
  if(offsetX.value > 80) offsetX.value = 80;
  if(offsetY.value < 10) offsetY.value = 10;  
  if(offsetY.value > 80) offsetY.value = 80;
}

/**
 * 重置偏移量
 * @returns {void}
 */
const ResetOffset = () => {
  offsetX.value = 0;
  offsetY.value = 0;
}
onMounted(() => {
  const target = buttons.value[index.value]
  if (!target || !indicator.value) return

  const { offsetLeft, offsetWidth } = target
  // 直接設定位置，不做動畫
  gsap.set(indicator.value, {
    x: offsetLeft,
    width: offsetWidth
  })
})
</script>

<template>
  <div class="w-70% m-auto mt-3%">
    <div class="flex relative border-0 p-2 overflow-hidden">
      <div ref="indicator" class="absolute h-[100%] bg-gray-400 rounded-[5px] top-0 left-0"
        style="width: 48px;transform: translate(8px, 0px);"></div>

      <div v-for="(label, i) in ['文化', '健康與管理', '歷史人文', '資訊工程與網路安全', '有吧']" :key="i" ref="buttons"
        class="relative z-10 border border-black rounded-[5px] mr-[2px] cursor-pointer px-2 py-[2px] select-none duration-800"
        :class="{ 'text-white': i == index }" @click="moveIndicator(i)">
        {{ label }}
      </div>
    </div>
    <div class="bg-red flex box-border items-start" @drag.prevent>
      <div @mousemove="MouseMoveHandler" @mouseleave="ResetOffset" class="cursor-pointer relative">
        <img src="/public/images/advantages1.png" />
        <div class="absolute aspect-[100/74.364] w-270px bg-[rgba(255,255,255,0.3)] pointer-events-none"
          :style="`top:${offsetY-10}%; left:${offsetX-10}%`"
          v-if="offsetY!==0 && offsetX!==0">

        </div>
      </div>
      <div v-if="offsetX !== 0 && offsetY !== 0" class="bg-blue w-300px aspect-[100/74.364] sid"
        :style="`background-position: ${offsetX}% ${offsetY}%`">
      </div>
    </div>
  </div>
</template>

<style scoped>
.sid {
  background-image: url("/public/images/advantages1.png");
  background-size: 300%;
}
</style>
