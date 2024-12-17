<template>
    <div class="flex flex-col items-center justify-center px-4 py-6">
        <div class="w-full max-w-md">
            <div class="flex flex-col items-center">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">我是誰</h2>
            </div>
        </div>

        <div class="mt-8 flex w-full max-w-xs flex-col">
            <div v-if="error"
                 class="text-center text-rose-500">{{ error }}</div>
            <template v-if="userInfo">
                <div v-if="user">{{ user.Name}}</div>
            </template>
        </div>
    </div>
</template>

<script setup>
const user = reactive({});
onMounted(() => {
    if (userInfo && userInfo.value!=null) {
        Object.assign(user, userInfo.value.user.user);
    }
});
</script>
<style scoped>
</style>
