<template>
    <div v-show="$store.modalStatus" class="modalBox">
        <div class="modalContent">
            <h2>{{ $store.title }}</h2>
            <p>{{ $store.message }}</p>
            <div class="modalBtn">
                <button @click="$store.closeModal">取消</button>
                <button @click="$store.confirmModal">確定</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from "../stores/useModal.js";
const $store = useModalStore();
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