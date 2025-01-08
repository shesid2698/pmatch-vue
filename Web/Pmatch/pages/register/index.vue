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
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" />
    <div class="ccontainer">
        <div class="w-68.75% flex flex-col flex-items-center">
            <div class="w-370px">
                <div class="flex flex-items-center">
                    <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                    <div class="text-20px">會員服務條款</div>
                </div>
                <div class="mt-20px h-42px flex justify-between relative"
                     id="progress">
                    <div class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div class="h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        2
                    </div>
                    <div class="h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        3
                    </div>
                </div>
            </div>

            <!-- 服務條款內容 -->
            <div v-html="data"
                 @scroll="handleScroll($event, 1)"
                 id="service1"
                 class="p-x-10px rounded-1 overflow-y-auto w-100% md:w-864px h-500px mt-20px border border-solid border-1px border-[#dee2e6]"></div>

            <div v-if="route.query.PmatchStoreIds"
                 v-html="data2"
                 id="service2"
                 @scroll="handleScroll($event, 2)"
                 class="p-x-10px rounded-1 overflow-y-auto w-100% md:w-864px h-500px mt-20px border border-solid border-1px border-[#dee2e6]"></div>

            <div class="mt-15px">
                <button :disabled="!isBottom || !isBottom2"
                        @click="ToFormPage"
                        class="w-200px p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    同意
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
// loading page
import { useLoadStore } from '../stores/loading.js';

import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const store = useLoadStore();
const setPageLoading = store.setPageLoading;
const route = useRoute();
const router = useRouter();
const jwtStore = useJwtStore();
const data = ref('');
const data2 = ref('');
const token = ref('');
const encrypt = useEncrypt();
const contractStores = ref('');
const { $axios } = useNuxtApp();
async function GetService(token, num) {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetCompayIformationDetail',
            {
                Category: num
            },
            {
                headers: {
                    Authorization: token // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            data.value = response.data.Content;
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
const GetStoreService = async storeIds => {
    try {
        token.value = await jwtStore.generateToken();
        const response = await $axios.post(
            '/api/v1/Pmatch/GetStoreDetail',
            {
                IsFront: true,
                StoreId: storeIds[0]
            },
            {
                headers: {
                    Authorization: token.value // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            data2.value = response.data.Data.ContractConetnt;
            if (response.data.Data.ContractId) {
                storeIds.forEach(x => {
                    contractStores.value += `${x}^${response.data.Data.ContractId},`;
                });
                contractStores.value = contractStores.value.slice(0, -1);
            }
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
        data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
    }
};
const isBottom = ref(false);
/**
 * 商店合約書是否閱覽完畢，一開始不能設為true，會影響一般註冊過程的條件
 */
const isBottom2 = ref(true);
const handleScroll = (event, index) => {
    const target = event.target;
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (isAtBottom) {
        switch (index) {
            case 1:
                isBottom.value = true;
                break;
            case 2:
                isBottom2.value = true;
                break;
        }
    }
};
/**
 * 提交表單
 */
const ToFormPage = () => {
    if (route.query.PmatchStoreIds) {
        router.push({
            path: '/register/form',
            query: {
                Phone: route.query.Phone,
                ContractStores: encrypt.encrypt(contractStores.value),
                D: route.query.D,
                IsPromoteCode: route.query.IsPromoteCode
            }
        });
    } else {
        router.push('/register/form');
    }
};
onMounted(async () => {
    const targetNode = document.querySelector('#service1');
    const targetNode2 = document.querySelector('#service2');
    const observer = new MutationObserver(async () => {
        //短網址註冊
        if (route.query.PmatchStoreIds) {
            isBottom2.value = false;
            let storeIds = encrypt.decrypt(route.query.PmatchStoreIds);
            storeIds = storeIds.split(',');
            await GetStoreService(storeIds);
        }
        //
        if (targetNode != null && targetNode != undefined) {
            if (targetNode.scrollHeight == targetNode.clientHeight) isBottom.value = true;
        }
        if (targetNode2 != null && targetNode2 != undefined) {
            if (targetNode2.scrollHeight == targetNode2.clientHeight) isBottom2.value = true;
        }
    });

    observer.observe(targetNode, { childList: true, subtree: true });
    if(targetNode2!=null && targetNode2!=undefined)
    observer.observe(targetNode2, { childList: true, subtree: true });

    await setPageLoading(true);
    token.value = await jwtStore.generateToken();
    await GetService(token.value, 4);
    await setPageLoading(false);
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
#progress::before {
    content: '';
    width: 100%;
    height: 1px;
    background: #e93470;
    position: absolute;
    top: 50%;
}
</style>
