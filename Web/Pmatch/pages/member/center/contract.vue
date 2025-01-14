<template>

    <Head>
        <title>PMatch遊戲道具媒合網</title>
        <Meta property="og:title"
              content="PMatch遊戲道具媒合網" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
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
            <!-- <h2 v-for="store in stores">已簽約媒合商</h2> -->
            <div class="flex">
                <div v-for="store in stores"
                     :key="store.Id">
                    <div class="relative w-fit h-fit">
                        <div class="imgContainer">
                            <img :src="getImgSrc(store.IMGFiles)"
                                 alt="null pic"
                                 width="150"
                                 height="150">

                        </div>
                        <div class="GameName">{{ store.Name }}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const { $axios } = useNuxtApp();
const userToken = useCookie('_PmToken');
const stores = ref([]);
const getImgSrc = src => {
    let realSrc = '';
    realSrc = `/images/${src}`;
    return realSrc;
};
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
                console.log(response.data.Data);
                stores.value = response.data.Data;
            } else {
                await openAlertModal(' ', `${response.data.Status.Message}`);
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
.imgContainer {
    position: relative;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white), linear-gradient(to right, #4361ee, #f72585);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    overflow: hidden;
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    margin-right: 15px;
}
.GameName {
    position: absolute;
    bottom: 2px;
    left: 2px;
    background: rgba(255, 255, 255, 0.5);
    width: 146px;
    height: 0;
    text-align: center;
    border-radius: 0 0 15px 15px;
    align-content: center;
    font-weight: 600;
    font-size: 20px;
    transition: 0.5s;
    overflow: hidden;
}
.GameName:hover,
.imgContainer:hover ~ .GameName {
    height: 40px;
}
</style>
