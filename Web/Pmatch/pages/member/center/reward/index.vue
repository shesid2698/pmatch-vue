<template>

    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title"
              content="PMatch遊戲道具交易平台" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <!-- 內容 -->
        <div class="flex-1 md:pl-20px">
            <div>
                <button class="non-button"
                        @click="innerPage=0"
                        :class="{'active-button':innerPage==0}">可使用</button>
                <button class="non-button"
                        @click="innerPage=1"
                        :class="{'active-button':innerPage==1}">處理中</button>
                <button class="non-button"
                        @click="innerPage=2"
                        :class="{'active-button':innerPage==2}">已使用</button>
                <button class="non-button"
                        @click="innerPage=3"
                        :class="{'active-button':innerPage==3}">已過期</button>
            </div>
            <div class="ticket-list max-h-624px overflow-auto">
                <div class="flex ticket-shadow mb-2">
                    <div class="relative w-fit mr-[-2px] h-fit">
                        <div class="absolute w-67%  right-0 top-50% transform-translate-y-[-50%]">
                            <div class="text-20px text-black mb-2">錢街Online 遊戲幣 1000</div>
                            <div class="text-16px text-black">效期至 2025-04-01 11:59</div>
                        </div>
                        <div class="absolute w-67% bottom-10px right-0 text-end pr-10px text-16px text-black">新春好禮</div>
                        <img src="/images/虛擬獎項-l.svg"
                             alt="">
                    </div>
                    <div class="relative w-fit h-fit">
                        <div class="absolute w-100% h-100% flex items-center justify-center"><span class="text-white text-20px font-600">兌換</span></div>
                        <img src="/images/虛擬獎項-r.svg"
                             alt="">
                    </div>
                </div>
                <div  class="flex ticket-shadow mb-2">
                    <div class="relative w-fit mr-[-2px] h-fit">
                        <div class="absolute w-67%  right-0 top-50% transform-translate-y-[-50%]">
                            <div class="text-20px text-black mb-2">發財小金豆 1顆</div>
                            <div class="text-16px text-black">效期至 2025-04-01 11:59</div>
                        </div>
                        <div class="absolute w-67% bottom-10px right-0 text-end pr-10px text-16px text-black">消費抽大獎</div>
                        <img src="/images/實體獎項-l.svg"
                             alt="">
                    </div>
                    <div class="relative w-fit h-fit">
                        <div class="absolute w-100% h-100% flex items-center justify-center"><span class="text-white text-20px font-600">領獎</span></div>
                        <img src="/images/實體獎項-r.svg"
                             alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 * 0=可使用;1=處理中;2=已使用;3=已過期
 */
const innerPage = ref(0);
const ticketList = ref([]);
const memberToken = useCookie("");
const {$axios} = useNuxtApp();
onMounted(()=>{

});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
.non-button {
    box-shadow: 0px 3px 2px 0px #00000040 inset;
    background: #d0d0d0;
    border: 2px solid #797979;
    border-radius: 10px;
    width: 96px;
    height: 32px;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
}
.active-button {
    box-shadow: 0px 3px 2px 0px #f7eeff inset;
    background: #daafff;
    border-radius: 10px;
    width: 96px;
    height: 32px;
    border: 2px solid #7b2cbf;
    color: white;
    font-size: 16px;
    margin-right: 10px;
}
.ticket-list {
    padding: 15px;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    width: 712px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar{
      width: 10px;
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb{
      width: 10px;
      background: #b3b3b3;
      border-radius: 5px;
    }
}
.ticket-shadow {
    box-sizing: border-box;
    width: fit-content;
    height: 139px;
    box-shadow: 0px 4px 4px 0px #00000040;
}
</style>
