import { defineStore } from 'pinia';
export const useEmailTimer = defineStore('emailTimer', {
    state: () => ({
        count: 120,
        timer: null,
    }),
    actions: {
        decrement() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.count -= 1;
                if (this.count === 0) {
                    this.reset();
                }
            }, 1000);
        },
        reset() {
            clearInterval(this.timer);
            this.count = 120;
        },
    },
    persist: {
        key: 'emailTimer',
        storage: persistedState.localStorage,
    },
});
