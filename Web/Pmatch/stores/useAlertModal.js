import { defineStore } from "pinia";

export const useAlertModalStore = defineStore("alertModal", () => {
    const alertModalStatus = ref(false); // 彈窗的顯示狀態
    const alertTitle = ref(""); // 彈窗的標題
    const alertMessage = ref(""); // 彈窗的內容
    let alertConfirmCallback = null; // 確定按鈕的動作

    // 顯示彈窗
    const alertShowModal = (modalTitle, modalMessage, onConfirm) => {
        alertTitle.value = modalTitle;
        alertMessage.value = modalMessage;
        alertModalStatus.value = true;
        alertConfirmCallback = onConfirm || null;
    };

    // 點擊確定
    const alertConfirmModal = () => {
        alertModalStatus.value = false;
        if (alertConfirmCallback) alertConfirmCallback();
    };

    return {
        alertModalStatus,
        alertTitle,
        alertMessage,
        alertShowModal,
        alertConfirmModal,
    };
});
