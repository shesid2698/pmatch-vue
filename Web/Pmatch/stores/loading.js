import { defineStore } from "pinia";

export const useLoadStore = defineStore("main", () => {
    const pageLoading = ref(true);
    function setPageLoading(show) {
        pageLoading.value = show;
    }
    return {
        pageLoading,
        setPageLoading,
    };
});
