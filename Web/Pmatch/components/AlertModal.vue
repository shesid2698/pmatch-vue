<template>
  <div v-show="$store.alertModalStatus" class="modalBox">
    <div class="modalContent">
      <h2>{{ $store.alertTitle }}</h2>
      <p v-html="$store.alertMessage"></p>
      <div class="modalBtn">
        <div class="checkBtnBox">
          <button class="checkBtn" @click="$store.alertConfirmModal" :class="`${$store.confirmClass}`">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const $store = useAlertModalStore();
</script>

<style scoped>
.modalBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000; /**因為掛在app.vue;套件dialog官方變化範圍:999-2000 */
}

.modalContent {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 1px 1px 1px 1px #bbb;
}

.modalBtn {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.checkBtnBox {
  padding: 1px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}

.checkBtn {
  padding: .5rem 1.5rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}

.checkBtn:hover {
  width: 100%;
  background: #fff;
  color: #f72585;
  border-radius: 50px;
  text-align: center;
}
</style>
