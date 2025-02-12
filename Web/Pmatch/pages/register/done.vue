<template>
    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title" content="PMatch遊戲道具交易平台" />
        <Meta
            name="keywords"
            content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
        />
        <Meta
            name="description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="ccontainer md:pt-60px">
        <div class="w-68.75% flex flex-col flex-items-center">
            <div class="w-370px">
                <div class="flex flex-items-center">
                    <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                    <div class="text-20px">會員服務條款</div>
                </div>
                <div
                    class="mt-20px h-42px flex justify-between relative"
                    id="progress"
                >
                    <div
                        class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold"
                    >
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div
                        class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold"
                    >
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div
                        class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold"
                    >
                        <i class="fa-solid fa-check"></i>
                    </div>
                </div>
                <div class="flex justify-center mt-70px">
                    <div
                        class="rounded-full w-76px h-76px bg-[#a7cf4a] text-center content-center text-50px text-white"
                    >
                        <i class="fa-solid fa-check"></i>
                    </div>
                </div>
                <div class="flex flex-items-center mt-15px">
                    <div
                        class="w-15% leading-[25px] h-25px text-22px text-[#0d6efd]"
                    >
                        帳號
                    </div>
                    <div class="flex-1 text-22px h-25px leading-[23px]">
                        {{ account }}
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="text-15px text-gray-7">
                        您已完成註冊，煩請您重新登入
                    </div>
                    <div class="text-15px text-gray-7">
                        系統已將您登入帳號寄送至您的電子信箱，以利日後查閱。
                    </div>
                </div>
                <div class="mt-30px">
                    <NuxtLink to="/member/login"
                        ><button
                            class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#e93470 hover:bg-#bb2d3b transition duration-200 cursor-pointer"
                        >
                            確定
                        </button></NuxtLink
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const account = ref("");
const encrypt = useEncrypt();
onMounted(() => {
    account.value = encrypt.decrypt(route.query.account) || "";
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
    content: "";
    width: 100%;
    height: 1px;
    background: #e93470;
    position: absolute;
    top: 50%;
}
</style>
