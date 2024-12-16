<template>
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
                 @scroll="handleScroll"
                 class="p-x-10px rounded-1 overflow-y-auto w-100% md:w-864px h-500px mt-20px border border-solid border-1px border-[#dee2e6]"></div>

            <div class="mt-15px">
                <NuxtLink to="/register/form">
                    <button :disabled="!isBottom"
                            class="w-200px p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-[#1a6db4] hover:bg-[#0b5ed7] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                        同意
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const jwtStore = useJwtStore();
const data =ref("");
const token = ref("");
const { $axios } = useNuxtApp();
async function GetService(token,num) {
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
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
        data.value = '無法取得資料。'; // 畫面顯示錯誤訊息
    }
}


const isBottom = ref(false);
const handleScroll = event => {
    const target = event.target;
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (isAtBottom) {
        isBottom.value = true;
    }
};

onMounted(async()=>{
  token.value = await jwtStore.generateToken();
  console.log("token",token.value);
  await GetService(token.value,4);

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
