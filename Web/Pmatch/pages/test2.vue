<template>
  <div>
    <h1 :class="isTableDevice === true ? 'bg-red' : 'bg-green'">cxz;wdwdl;w'jfdskla</h1>
  </div>
</template>
<script setup>
const isTableDevice = ref(true);
onMounted(() => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    isTableDevice.value = false;
  }
});
</script>
