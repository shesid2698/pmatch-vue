<template>
    <div>
        <Head>
            <title>PMatch遊戲道具交易平台</title>
            <Meta property="og:title" content="PMatch遊戲道具交易平台" />
            <Meta
                name="keywords"
                content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
            />
            <Meta
                name="description"
                content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
            />
            <Meta
                property="og:description"
                content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
            />
        </Head>
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
                var t_PmatchStoreIds = encrypt.encrypt(
                    response.data.Data.Data.PmatchStoreIds
                );
                var t_IsPromoteCode = encrypt.encrypt(
                    response.data.Data.Data.IsPromoteCode
                );
                var t_Id = encrypt.encrypt(response.data.Data.Id);
                router.push({
                    path: "/register",
                    query: {
                        Phone: t_Phone,
                        PmatchStoreIds: t_PmatchStoreIds,
                        D: t_Id,
                        IsPromoteCode: t_IsPromoteCode,
                    },
                });
            } else {
                await openAlertModal(" ", `${response.data.Status.Message}`);
                router.push("/");
            }
        }else{
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
});
</script>
<style scoped></style>
