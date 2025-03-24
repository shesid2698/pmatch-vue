<template>
    <div id="page1">
      <div id="innerPage1"></div>
      <div class="w-fit">
        <button>456</button>
      </div>
    </div>
</template>
<script setup></script>
<style scoped>
#page1{
  width: 100%;
  background-image: url('/activity/Slice\ 7.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  aspect-ratio: 1921/4096;
}
#innerPage1{
  width: 45%;
  background-image: url('/activity/分頁一全圖.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position:absolute;
  aspect-ratio: 1513/4966;
  top: 15%;
  left: 52%;
  transform: translateX(-50%);
  z-index: 99;
}
</style>
