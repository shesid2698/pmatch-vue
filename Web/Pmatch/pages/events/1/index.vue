<template>
    <div v-if="innerPage===1"
         id="page1">
        <div id="innerPage1">
            <div class="w-43% h-2.5% absolute top-0 left-2px box-border">
                <div class="w-100% h-100% flex items-end">
                    <button class="w-45% the-btn2 h-100% !bg-[#4361ee] text-white !text-1.7vw !font-400"
                            :class="innerPage!==1?'non-active':''"
                            @click="()=>innerPage=1">活動內容</button>
                    <button class="flex-1 the-btn2 h-85% !bg-[#43d1ee] text-white !font-300 !text-[1.7vw]"
                            :class="innerPage!==2?'non-active':''"
                            @click="()=>innerPage=2">推薦碼說明</button>
                </div>
            </div>
            <div class="w-29% h-3.5% absolute top-38.87% left-30.6%">
                <button class="regist-btn !disabled:filter-none !disabled:cursor-default"
                        @click="ToRegister"
                        :disabled="token!==''&&token!==null&&token!==undefined">{{token!==""&&token!==null&&token!==undefined?'已登入':'我要註冊'}}</button>
            </div>
            <div class="absolute top-[52%]  left-[47%] text-[1.5vw] font-bold ">
                <div v-if="token===''||token===null||token===undefined"
                     class="flex justify-center items-center line-height-100% text-[#FF3F2E]">
                    <div>? 未登入</div>
                </div>
                <div v-else-if="memberDetail.RefferCode!==''"
                     class="flex justify-center items-center line-height-100% text-[#66D575]">
                    <div>
                        <Icon name="heroicons:check-20-solid" />
                    </div>
                    <div>已綁定</div>
                </div>
                <div v-else
                     class="flex justify-center items-center line-height-100% text-[#5451E0]">
                    <div>
                        <Icon name="heroicons:x-mark-20-solid" />
                    </div>
                    <div>未綁定</div>
                </div>
            </div>
            <div class="absolute w-35% h-2.8% bg-white top-59.6% left-[48.5%]">
                <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">{{activityData.TotalValue? activityData.TotalValue.toLocaleString():'0' }}</div>
            </div>
            <div class="absolute w-35% h-2.8% bg-white top-62.7% left-[48.5%]">
                <div class="absolute w-100% h-100% text-center content-center text-1.5vw font-bold text-black">{{ activityData.Reward? activityData.Reward.toLocaleString() :'0'}}</div>
            </div>
            <div class="absolute w-37% h-3.5% top-[78.9%] left-[24.7%]">
                <button class="w-100% h-100% rounded-100px reward-btn"
                        @click="ToReward">查看領獎中心</button>
            </div>
            <div class="absolute w-92% h-4% left-14.8% top-[92.1%] ">
                <NuxtLink to="/findmatch?platformName=寶島娛樂城&keyword="
                          target="_blank">
                    <button class="game-btn"><img src="/eventimgs/1/squareIcon.svg"
                             alt=""
                             class="md:mr-10px mr-5px md:w-20px w-10px">委買寶島娛樂城遊戲幣<img src="/eventimgs/1/squareIcon.svg"
                             alt=""
                             class="md:ml-10px ml-5px md:w-20px w-10px"></button>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div id="page2"
         v-else>
        <div id="innerPage2">
            <div class="w-39% h-2% absolute top-[-0.1%] left-0%">
                <div class="w-100% h-100% flex items-end">
                    <button class="w-43% the-btn2 !h-85% !bg-[#43d1ee] text-white !text-[1.7vw] !font-300"
                            :class="innerPage===2?'non-active':''"
                            @click="()=>innerPage=1">活動內容</button>
                    <button class="flex-1 the-btn2 !h-100% !bg-[#4361ee] text-white !text-[1.7vw] !font-400"
                            :class="innerPage===1?'non-active':''"
                            @click="()=>innerPage=2">推薦碼說明</button>
                </div>
            </div>
            <button @click="ToRegister"
                    class="w-30% h-2.4% absolute top-68.45% left-26% member-btn">前往會員中心</button>
            <NuxtLink to="/findmatch?platformName=寶島娛樂城&keyword="
                      target="_blank">
                <button class="w-55% h-3% absolute top-94.9% left-13% game-btn2"><img src="/eventimgs/1/squareIcon.svg"
                         alt=""
                         class="md:mr-10px mr-5px md:w-20px w-10px">委買寶島娛樂城遊戲幣<img src="/eventimgs/1/squareIcon.svg"
                         alt=""
                         class="md:ml-10px ml-5px md:w-20px w-10px"></button>
            </NuxtLink>
            <!-- 武財神 -->
            <div class="absolute w-20% aspect-ratio-[1/1]  top-28.43% left-15.3% cursor-pointer hover:filter-brightness-[1.1]">
                <NuxtLink to="/findmatch/206?pn=%E5%AF%B6%E5%B3%B6%E5%A8%9B%E6%A8%82%E5%9F%8E"
                          target="_blank">
                    <img class='w-100%'
                         src="/eventimgs/1/武財神.png"
                         alt="">
                </NuxtLink>
            </div>
            <div class="absolute w-20% aspect-ratio-[1/1]  top-28.43% left-41.3% cursor-pointer hover:filter-brightness-[1.1]">
                <NuxtLink to="/findmatch/203?pn=%E5%AF%B6%E5%B3%B6%E5%A8%9B%E6%A8%82%E5%9F%8E"
                          target="_blank">
                    <img class='w-100%'
                         src="/eventimgs/1/夫人.png"
                         alt="">
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const innerPage = ref(1);
const activityData = reactive({});
const token = useCookie('_PmToken');
const memberId = useCookie('_PmMemberId');
const { $axios } = useNuxtApp();
const memberDetail = reactive({});
const route = useRoute();
const router = useRouter();

const ToRegister = () => {
    if (token.value === '' || token.value === null || token.value === undefined) {
        window.open('/member/login', '_blank');
        // navigateTo('/member/login');
    } else {
        window.open('/member/center', '_blank');
        // navigateTo('/member/center');
    }
};
const ToReward = () => {
    if (token.value === '' || token.value === null || token.value === undefined) {
        // navigateTo('/member/login');
        window.open('/member/login', '_blank');
    } else {
        // navigateTo('/member/center/reward');
        window.open('/member/center/reward', '_blank');
    }
};
const GetMemberDetail = async () => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberDetail',
            {
                PmatchMemberId: memberId.value
            },
            {
                headers: {
                    Authorization: token.value
                }
            }
        );
        if (response.data.Status.Code === 0) {
            Object.assign(memberDetail, response.data.Data[0]);
        }
    } catch (error) {
        console.log(`GetMemberDetail error:${error}`);
    }
};
const GetMemberActivityData = async () => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberActivityData',
            {
                PlatformNames: ['寶島娛樂城']
            },
            {
                headers: {
                    Authorization: token.value
                }
            }
        );
        if (response.data.Status.Code === 0) {
            Object.assign(activityData, response.data.Data[0]);
        }
    } catch (error) {
        console.log(`GetMemberDetail error:${error}`);
    }
};

onMounted(async () => {
    if (
        memberId.value !== '' &&
        memberId.value !== null &&
        memberId.value !== undefined &&
        token.value !== '' &&
        token.value !== null &&
        token.value !== undefined
    ) {
        await GetMemberActivityData();
        await GetMemberDetail();
    }
    router.replace({
        query: {
            openExternalBrowser: 1
        }
    });
});
</script>
<style scoped>
#page1 {
    width: 100%;
    background-image: url('/eventimgs/1/Slice_7.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    aspect-ratio: 3296/7094;
}
#innerPage1 {
    min-width: 42%;
    background-image: url('/eventimgs/1/分頁一.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    /* aspect-ratio: 1513/4966; */
    aspect-ratio: 1513/5013;
    top: 14.5%;
    left: 52%;
    transform: translateX(-50%);
    z-index: 1;
}

.the-btn {
    border: none;
    font-size: 1.2vw;
    font-weight: 400;
    height: 100%;
    margin: 0;
    padding: 0;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    background-color: #f6f4e5;
}
.non-active {
    &:hover {
        filter: brightness(1.1);
    }
}
.regist-btn {
    width: 100%;
    height: 100%;
    border-radius: 100px;
    border: 3px solid rgba(183, 0, 150, 1);
    color: white;
    font-size: 1.8vw;
    background-color: rgba(247, 37, 133, 1);
    box-shadow: inset 0px -4px 6px 0px rgba(0, 0, 0, 0.1),
        inset 0px 4px 6px 0px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:hover {
        filter: brightness(1.1);
    }
}
.reward-btn {
    border: 3px solid rgba(183, 0, 150, 1);
    color: white;
    font-size: 1.5vw;
    background-color: rgba(247, 37, 133, 1);
    box-shadow: inset 0px -4px 6px 0px rgba(0, 0, 0, 0.1),
        inset 0px 4px 6px 0px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:hover {
        filter: brightness(1.1);
    }
}
.game-btn {
    width: 65%;
    height: 100%;
    background-image: linear-gradient(to bottom, #7b2cbf, #2587ff);
    border: 3px solid #541d84;
    border-radius: 100px;
    color: white;
    font-size: 1.5vw;
    margin: 0;
    padding: 0;
    text-align: center;
    cursor: pointer;
    &:hover {
        filter: brightness(1.1);
    }
}

#page2 {
    aspect-ratio: 1920/5078;
    /* width: 1900px; */
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    background-image: url('/eventimgs/1/Slice_8.png');
}
#innerPage2 {
    min-width: 46.5%;
    /* background: green; */
    background-image: url('/eventimgs/1/分頁二.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    position: absolute;
    aspect-ratio: 1683/6539;
    top: 11.8%;
    left: 54.3%;
    transform: translateX(-50%);
    z-index: 1;
}
.the-btn2 {
    border: none;
    /* background-color: #f6f4e5; */
    font-size: 1vw;
    text-align: center;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
}
.member-btn {
    border: 3px solid #b70096;
    border-radius: 100px;
    background-color: #f72585;
    color: white;
    font-weight: bolder;
    font-size: 1.5vw;
    box-shadow: inset 0px -4px 6px 0px rgba(0, 0, 0, 0.1),
        inset 0px 4px 6px 0px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    &:hover {
        filter: brightness(1.1);
    }
}
.game-btn2 {
    color: white;
    border-radius: 100px;
    border: 3px solid #413fa6;
    background-image: linear-gradient(to bottom, #7b2cbf, #2587ff);
    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    box-shadow: inset 0px -4px 6px 0px rgba(0, 0, 0, 0.1),
        inset 0px 4px 6px 0px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:hover {
        filter: brightness(1.1);
    }
}
@media screen and (max-width: 767px) {
    #page1 {
        width: 100%;
        background-image: url('/eventimgs/1/分頁一背景.png');
        aspect-ratio: 1903/7070;
    }
    #innerPage1 {
        min-width: unset;
        width: 75%;
        top: 15%;
        left: 54%;
    }
    #page2 {
        width: 100%;
        background-image: url('/eventimgs/1/分頁二背景.png');
        aspect-ratio: 1903/8610;
    }
    #innerPage2 {
        min-width: unset;
        width: 83%;
        top: 12.3%;
        left: 58.4%;
    }
}
</style>
