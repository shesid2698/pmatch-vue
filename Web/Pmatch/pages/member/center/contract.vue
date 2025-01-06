<template>
    <div class="pt-60px ps-5 pe-5 ccontainer w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <!-- <div class="flex justify-between">
                <label for="isMember"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='isMember'}">已簽約
                    <input type="radio"
                           id="isMember"
                           value="isMember"
                           v-model="Type"
                           hidden></label>
                <label for="IsConfirming"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='IsConfirming'}">簽約中
                    <input type="radio"
                           id="IsConfirming"
                           value="IsConfirming"
                           v-model="Type"
                           hidden></label>
                <label for="Canceled"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='Canceled'}">已取消
                    <input type="radio"
                           id="Canceled"
                           value="Canceled"
                           v-model="Type"
                           hidden></label>
            </div> -->
            <h2 v-for="store in stores">已簽約媒合商</h2>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const userToken = useCookie('_PmToken');
const stores = ref([]);
onMounted(async () => {
    if (userToken.value != undefined && userToken.value != '') {
        try {
            const response = await $axios.post(
                '/api/v1/Pmatch/GetContractedStoreList',
                {
                    category: 1
                },
                {
                    headers: {
                        Authorization: userToken.value
                    }
                }
            );

            if (response.data.Status.Code === 0) {
                stores.value = response.data.Data;
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
            }
        } catch (error) {
            console.error('請求失敗:', error);
        }
    }
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
.show {
    color: #3d8dcc;
    border-bottom: 3px solid #3d8dcc;
}
</style>
