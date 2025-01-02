<template>
  <div></div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const code = ref('');
const route = useRoute();
const router = useRouter();
const token = ref('');
const jwtStore = useJwtStore();
const encrypt = useEncrypt();
onMounted(async () => {
    try {
        if (route.params.code !== '' && route.params.code !== undefined) {
            token.value = await jwtStore.generateToken();
            code.value = route.params.code;

            const response = await $axios.post(
                '/api/v1/ShortUrl/PmatchGetData',
                {
                    Data: {
                        Code: code.value
                    }
                },
                {
                    headers: {
                        Authorization: token.value
                    }
                }
            );

            if (response.data.Status.Code === 0 && response.data.Data!=null) {
                console.log(response);
                var t_Phone = encrypt.encrypt(response.data.Data.Data.Phone);
                var t_PmatchStoreIds= encrypt.encrypt(response.data.Data.Data.PmatchStoreIds);
                var t_Id= encrypt.encrypt(response.data.Data.Id);
                router.push({
                  path:'/register',
                  query:{Phone:t_Phone,PmatchStoreIds:t_PmatchStoreIds,D:t_Id}
                });
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
                router.push("/");
            }
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
});
</script>
<style scoped></style>
