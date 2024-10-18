import { defineStore } from 'pinia';
export const useMobileTimer = defineStore('mobileTimer', {
    state: () => ({
        secCount: 120,
        timer: null,
    }),
    actions: {
        decrement() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.secCount -= 1;
                if (this.secCount === 0) {
                    this.reset();
                }
            }, 1000);
        },
        reset() {
            clearInterval(this.timer);
            this.secCount = 120;
        },
    },
    persist: {
        key: 'mobileTimer',
        storage: persistedState.localStorage,
    },
});
