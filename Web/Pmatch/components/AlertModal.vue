<template>
    <div v-show="$store.alertModalStatus" class="modalBox">
        <div class="modalContent">
            <h2>{{ $store.alertTitle }}</h2>
            <p>{{ $store.alertMessage }}</p>
            <div class="modalBtn">
                <button @click="$store.alertConfirmModal">確定</button>
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
    z-index: 999;
}

.modalContent {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
}

.modalBtn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>