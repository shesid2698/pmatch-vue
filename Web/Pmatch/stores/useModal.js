import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
    const modalStatus = ref(false); // 彈窗的顯示狀態
    const title = ref(''); // 彈窗的標題
    const message = ref(''); // 彈窗的內容
    let confirmCallback = null; // 確定按鈕的動作
    let cancelCallback = null; // 取消按鈕的動作

    // 顯示彈窗
    const showModal = (modalTitle, modalMessage) => {
        return new Promise((resolve, reject) => {
            title.value = modalTitle;
            message.value = modalMessage;
            modalStatus.value = true;
            confirmCallback = () => {
                resolve(true); // 當點擊確定時，解析 Promise
            };
            cancelCallback = () => {
                resolve(false); // 當點擊取消時，拒絕 Promise
            };
        });
    };

    // 關閉彈窗
    const closeModal = () => {
        modalStatus.value = false;
        if (cancelCallback) cancelCallback();
    };

    // 點擊確定
    const confirmModal = () => {
        modalStatus.value = false;
        if (confirmCallback) confirmCallback();
    };

    return {
        modalStatus,
        title,
        message,
        showModal,
        closeModal,
        confirmModal,
    };
});
