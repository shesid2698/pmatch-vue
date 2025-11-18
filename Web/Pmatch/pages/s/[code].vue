<template>
  <div>
  </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const token = ref("");
const jwtStore = useJwtStore();
const encrypt = useEncrypt();
const routeParamCode = route.params.code;
onMounted(async () => {
  try {
    if (routeParamCode !== "" && routeParamCode !== undefined) {
      token.value = await jwtStore.generateToken();
      const response = await $axios.post(
        "/api/v1/ShortUrl/PmatchGetData",
        {
          Data: {
            Code: routeParamCode,
          },
        },
        {
          headers: {
            Authorization: token.value,
          },
        }
      );
      if (response.data.Status.Code === 0 && response.data.Data != null) {
        var t_Phone = encrypt.encrypt(response.data.Data.Data.Phone);
        var t_IsPromoteCode = encrypt.encrypt(
          response.data.Data.Data.IsPromoteCode
        );
        var t_Id = encrypt.encrypt(response.data.Data.Id);
        router.push({
          path: "/register",
          query: {
            Phone: t_Phone,
            D: t_Id,
            IsPromoteCode: t_IsPromoteCode,
          },
        });
      } else {
        await openAlertModal(" ", `${response.data.Status.Message}`);
        router.push("/");
      }
    } else {
    }
  } catch (error) {
    console.error("請求失敗:", error);
  }
});
</script>
<style scoped></style>
