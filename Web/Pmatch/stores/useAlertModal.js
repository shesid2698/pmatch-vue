import { defineStore } from "pinia";

export const useAlertModalStore = defineStore("alertModal", () => {
    const alertModalStatus = ref(false);
    const alertTitle = ref("");
    const alertMessage = ref("");
    let resolvePromise = null; // 添加這個來存儲 Promise 的 resolve 函數

    // 修改為返回 Promise 的版本
    const alertShowModal = (modalTitle, modalMessage) => {
        alertTitle.value = modalTitle;
        alertMessage.value = modalMessage;
        alertModalStatus.value = true;
        
        // 返回一個新的 Promise
        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };

    // 點擊確定時，調用 resolve
    const alertConfirmModal = () => {
        alertModalStatus.value = false;
        if (resolvePromise) {
            resolvePromise();
            resolvePromise = null;
        }
    };

    return {
        alertModalStatus,
        alertTitle,
        alertMessage,
        alertShowModal,
        alertConfirmModal,
    };
});
