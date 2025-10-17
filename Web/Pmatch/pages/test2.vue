<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { gsap } from 'gsap'

// 用 useState 儲存全域共享的 index
const index = useState('activeIndex', () => 0)

const buttons = ref([])
const indicator = ref(null)

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
      <div
        ref="indicator"
        class="absolute h-[100%] bg-gray-400 rounded-[5px] top-0 left-0"
        style="width: 0;"
      ></div>

      <div
        v-for="(label, i) in ['文化', '健康與管理', '歷史人文', '資訊工程與網路安全','有']"
        :key="i"
        ref="buttons"
        class="relative z-10 border border-black rounded-[5px] mr-[2px] cursor-pointer px-2 py-[2px] select-none duration-800"
        :class="{'text-white':i == index}"
        @click="moveIndicator(i)"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>
