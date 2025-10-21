<template>
  <div v-show="$store.pageLoading" class="loadingBac flex items-center justify-center w-100% h-100%">
    <div class="">
      <img src="/images/pmLoading.gif" alt="pmatchLoadingGif" />
    </div>
  </div>
</template>
<script setup>
import { useLoadStore } from "../stores/loading.js";
const $store = useLoadStore();
</script>
<style scoped>
.loadingBac {
  z-index: 9999; /**因為掛在app.vue;套件dialog官方變化範圍:999-2000 */
  position: fixed;
  top: 0;
}
</style>
