<script setup>
// hover事件
const loginBtnHover = ref(false);
const registBtnHover = ref(false);
const bindBtnHover = ref(false);

const router = useRouter();
const route = useRoute();
/** 目前頁籤，1=第一重;2=第二重*/
const currentPage = ref(1);
const { $axios } = useNuxtApp();
/** 會員token */
const token = useCookie('_PmToken');
/** 會員ID */
const memberId = useCookie('_PmMemberId');
/** 活動資訊 */
const activityInfo = reactive({
    Id: 0,
    SqlIndex: 0,
    Teamid: 0,
    Name: "",
    Duration: 0,
    BuyMinMoney: 0,
    SellMinMoney: 0,
    IsDeleted: true,
    CreateTime: "",
    CreateUser: "",
    ModifyTime: "",
    ModifyUser: "",
    StartTime: "",
    EndTime: ""
})
/** 會員詳細資料 */
const memberDetail = reactive({
    ThirdPartyPlatform: [],
    Id: 0,
    StaffId: 0,
    StaffName: "",
    Name: "",
    Mobile1: "",
    Mobile2: "",
    Mobile3: "",
    Birthday: "",
    NationalId: "",
    Email: "",
    Address: "",
    LoginCount: "",
    ContractStores: "",
    PendingContractStores: "",
    CancelContractStores: "",
    CarrierType: 0,
    Carrier: "",
    TaxId: "",
    SendReceiptType: 0,
    ServiceId: 0,
    IsAgreeagent: false,
    IsEnabled: false,
    Email_Verified: false,
    Mobile1_Verified: false,
    Mobile2_Verified: false,
    Mobile3_Verified: false,
    Type: 0,
    InviteCode: "",
    RefferCode: "",
    EndTime: "",
    IsUseReward: false,
    IsDeleted: false,
    CreateTime: "",
    CreateUser: "",
    ModifyTime: "",
    ModifyUser: ""
})
/**
 * 載具綁定活動除外名單 1285、1431
 */
const exceptMemberList = [1285, 1431, 2060, 2077, 2382, 2389, 2401, 2414, 2453, 2462, 2509, 2512, 2528, 2535, 2536, 2537, 2550, 2553, 2556, 2606, 2618, 2624, 2626, 2628, 2644, 2733, 2735, 2759, 2804, 2814]
onMounted(async () => {
    if (!route.query.openExternalBrowser) {
        await router.replace({
            query: {
                ...route.query,
                openExternalBrowser: 1,
            },
        });
    }
    // 如果是登入狀態，取得活動及會員詳細資料
    if (token.value !== null && token.value !== undefined) {
        await GetActivityInfo();
        await GetMemberDetail();
    }
})

/**
 * 取得活動資訊
 */
const GetActivityInfo = async () => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetActivityInfo',
            {
                Data: "包你發金幣，滿額大放送"
            },
            {
                headers: {
                    Authorization: token.value
                }
            }
        );
        if (response.data.Status.Code === 0 && response.data.Data) {
            Object.assign(activityInfo, response.data.Data);
        } else {
            console.error('GetActivityInfo API 回應錯誤:', response.data.Status.Message);
        }
    } catch (error) {
        console.error(`GetActivityInfo failed.. : ${error}`)
    }
}
/**
 * 取得會員詳細資料
 */
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
        } else {
            throw new Error(response.data.Status.Message);
        }
    } catch (error) {
        console.error(`GetMemberDetail failed.. : ${error}`)
    }
}
/**
 * 確認是否符合活動
 * @returns {string} 狀態
 */
const IsMatchActivity = computed(() => {
    const registTime = new Date(memberDetail.CreateTime);
    const startTime = new Date(activityInfo.StartTime);
    const endTime = new Date(activityInfo.EndTime);
    if (endTime >= registTime && registTime >= startTime) {
        return "已完成"
    }
    return "不符合領獎資格"
})

/**
 * 檢查載具綁定狀態
 * @returns {string} 狀態
 */
const carrierStatus = computed(() => {
    let status = "不符合領獎資格";
    if (memberDetail.CarrierType !== 0 && memberDetail.Carrier !== "" && memberDetail.Carrier !== null) {
        if (!exceptMemberList.find(x => x === memberDetail.Id)) {
            status = "已完成";
        }
    }
    else {
        status = "待綁定";
    }
    return status;
})
/**
 * 載具狀態class定位(top)
 * @returns {string}
 */
const carrierStatusClass = computed(() => {
    let _carrierStatusClass = "";
    switch (carrierStatus.value) {
        case "已完成":
        case "不符合領獎資格":
            _carrierStatusClass = "top-54.5% lg:top-48.3%";
            break;
        case "待綁定":
            _carrierStatusClass = "top-53.5% lg:top-46.8%"
            break;
    }
    return _carrierStatusClass;
})
/**
 * 檢查活動是否過期
 * @returns {boolean}
 */
const IsActExpired = computed(() => {
    const startTime = new Date(activityInfo.StartTime);
    const endTime = new Date(activityInfo.EndTime);
    if (endTime >= Date.now() && Date.now() >= startTime) return false;
    else return true;
})
/**
 * 登入鈕hover
 */
const LoginHoverHandler = computed(() => {
    return loginBtnHover.value === true ? "/images/activity/4/page_1_login_btn_hover.svg" : "/images/activity/4/page_1_login_btn.svg";
})
/**
 * 註冊鈕hover
 */
const RegistHoverHamndler = computed(() => {
    return registBtnHover.value === true ? "/images/activity/4/page_1_regist_btn_hover.svg" : "/images/activity/4/page_1_regist_btn.svg";
})
/**
 * 綁定鈕hover
 */
const BindHoverHamndler = computed(() => {
    return bindBtnHover.value === true ? "/images/activity/4/page_1_bind_btn_hover.svg" : "/images/activity/4/page_1_bind_btn.svg";
})
</script>
<template>
    <!-- 上方大圖 -->
    <div class="w-auto mb-[-5px]">
        <img src="/public/images/activity/4/top.png" alt="" width="100%">
    </div>
    <div id="main">
        <!-- 頁籤按鈕 -->
        <div class="flex cursor-pointer">
            <div class="w-50%" @click="currentPage = 1">
                <img v-if="currentPage === 1" src="/public/images/activity/4/page_1_btn_active.svg" alt="" width="100%">
                <img v-else src="/public/images/activity/4/page_1_btn.svg" alt="" width="100%">
            </div>
            <div class="flex-1" @click="currentPage = 2">
                <img v-if="currentPage === 2" src="/public/images/activity/4/page_2_btn_active.svg" alt="" width="100%">
                <img v-else src="/public/images/activity/4/page_2_btn.svg" alt="" width="100%">
            </div>
        </div>
        <div class="w-100% border-1 box-border">
            <!-- 頁籤1 -->
            <div v-if="currentPage === 1" class="overflow-hidden mb-5 lg:px-10% box-border">
                <div class="pc-border">
                    <div class="px-10% py-5%">
                        <img src="/public/images/activity/4/page_1_content.svg" alt="" width="100%" class="mb-3">
                    </div>

                    <!-- 如果有登入 -->
                    <div v-if="token !== null && token !== undefined">
                        <!-- 如果活動未到期 -->
                        <div v-if="!IsActExpired">
                            <div class="relative flex justify-center">
                                <!-- 會員註冊時間 -->
                                <div
                                    class="w-fit absolute lg:top-19.7% top-22.5% left-50% transform-translate-x-[-50%] lg:text-[2.1vw] text-[3.5vw] text-[#0E0F0E] font-400 z-1000">
                                    {{ memberDetail.CreateTime.split("T")[0] }}
                                </div>

                                <!-- 註冊PMatch會員狀態 -->
                                <div
                                    class="w-25vw absolute lg:top-38% top-42.9% lg:left-75% left-85% transform-translate-x-[-50%] lg:text-[1.4vw] text-[2.5vw] font-400 text-center z-1000">
                                    <span v-if="IsMatchActivity !== '已完成'" class="text-[#D6D6D6]">{{ IsMatchActivity
                                        }}</span>
                                    <span v-else class="text-linear-gold">{{ IsMatchActivity }}</span>
                                </div>

                                <!-- 完成電子載具綁定狀態 -->
                                <div class="w-25vw absolute lg:left-75% left-85% transform-translate-x-[-50%] lg:text-[1.4vw] text-[2.5vw] font-400 text-center z-1000"
                                    :class="carrierStatusClass">
                                    <div v-if="carrierStatus === '已完成'" class="text-linear-gold">{{ carrierStatus }}
                                    </div>
                                    <div v-else-if="carrierStatus === '不符合領獎資格'" class="text-[#D6D6D6]">{{ carrierStatus
                                        }}
                                    </div>
                                    <div v-else class="gold-bind-btn">
                                        <NuxtLink to="/member/center" target="_blank">
                                            <img :src="BindHoverHamndler" alt="" width="100%"
                                                @mouseenter="bindBtnHover = true" @mouseleave="bindBtnHover = false">
                                        </NuxtLink>
                                    </div>
                                </div>


                                <img src="/public/images/activity/4/page_1_table_logined.svg" alt="" width="100%"
                                    class="sm-table ">
                                <img src="/public/images/activity/4/page_1_table_logined_lg.svg" alt=""
                                    class="lg-table mb-3">
                            </div>

                        </div>

                        <!-- 活動過期 -->
                        <div v-else class="flex justify-center mt-5">
                            <img src="/public/images/activity/4/page_1_table_expired.svg" alt="" class="sm-table"
                                width="100%">
                            <img src="/public/images/activity/4/page_1_table_expired_lg.svg" alt="" class="lg-table">
                        </div>
                    </div>
                    <!-- 未登入 -->
                    <div v-else class="relative flex justify-center">
                        <div class="absolute lg:top-18% top-20% left-50% transform-translate-x-[-50%] flex z-1000">
                            <!-- 註冊鈕 -->
                            <div class="gold-btn flex items-center justify-center mr-5vw">
                                <NuxtLink to="/register" target="_blank">
                                    <img :src="RegistHoverHamndler" alt="" class="cursor-pointer w-100% block"
                                        @mouseenter="registBtnHover = true" @mouseleave="registBtnHover = false">
                                </NuxtLink>
                            </div>
                            <!-- 登入鈕 -->
                            <div class="gold-btn flex items-center justify-center">
                                <NuxtLink to="/member/login" target="_blank">
                                    <img :src="LoginHoverHandler" alt="" class="cursor-pointer w-100% block"
                                        @mouseenter="loginBtnHover = true" @mouseleave="loginBtnHover = false">
                                </NuxtLink>
                            </div>
                        </div>
                        <img src="/public/images/activity/4/page_1_table.svg" class="sm-table" alt="" width="100%">
                        <img src="/public/images/activity/4/page_1_lg_table.svg" class="lg-table" alt="">
                    </div>
                    <div class="text-center mt-7 mb-5 lg:mb-0 lg:px-7% lg:pb-5%">
                        <img src="/public/images/activity/4/page_1_process.svg" alt="" class="w-80% lg:w-100%">
                    </div>
                </div>
            </div>
            <!-- 頁籤2 -->
            <div v-else class="mb-3 text-center overflow-hidden lg:px-10% box-border">
                <div class="pc-border !pt-0">
                    <div class="mb-5 lg:mb-20">
                        <img src="/public/images/activity/4/page_2_content.svg" alt="" width="70%"
                            class="md:mt-10vh mt-2vh mr-[0.3rem] lg:mr-0">
                    </div>
                    <div class="relative flex justify-center">
                        <img src="/public/images/activity/4/page_2_table.svg" alt="" class="sm-table" width="100%">
                        <img src="/public/images/activity/4/page_2_table_lg.svg" alt="" class="lg-table">

                        <!-- 遊戲平台 -->
                        <!-- <div
                            class="absolute 2xl:w-25% w-30% aspect-[300/169] md:top-63% top-61% 2xl:left-10% left-2% z-1000">
                            <NuxtLink
                                to="https://www.pmatch.com.tw/findmatch?platformName=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E"
                                target="_blank"><img src="/public/images/activity/4/page_2_gameplat.svg" alt=""
                                    width="100%"></NuxtLink>
                        </div> -->

                        <!-- 小幸運銀行、好好銀行-->
                        <div
                            class="absolute lg:w-75% w-90% aspect-[611/211] lg:top-43% top-43.5% left-50% transform-translate-x-[-50%] flex justify-around items-center z-1000">
                            <div class="w-50% px-10% box-border">
                                <NuxtLink
                                    to="https://www.pmatch.com.tw/findmatch/224?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E"
                                    target="_blank"><img src="/public/images/activity/4/page_2_game_1.svg" alt=""
                                        width="100%"></NuxtLink>
                            </div>
                            <div class="w-50% px-10% box-border">
                                <NuxtLink
                                    to="https://www.pmatch.com.tw/findmatch/240?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E"
                                    target="_blank"><img src="/public/images/activity/4/page_2_game_2.svg" alt=""
                                        width="100%"></NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="w-100% p-5% box-border">
                        <img src="/public/images/activity/4/page_2_process.svg" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="w-100%">
                <img src="/public/images/activity/4/footer.svg" alt="" width="100%" class="block">
            </div>
        </div>
    </div>
</template>
<style scoped>
th,
td {
    border: 1px solid black;
}

td {
    text-align: center;
}

table {
    border-collapse: collapse;
}

#main {
    background-color: #0E0F0E;
}

.page-active {
    background: linear-gradient(90deg, #181B20 0%, #21242C 42.79%, #181B20 79.81%);
}

.gold-btn {
    width: 18vw;
    aspect-ratio: 197/75;
}

.gold-bind-btn {
    margin: 0 auto;
    width: 12vw;
    aspect-ratio: 138/75;
}

.text-linear-gold {
    background-image: linear-gradient(to bottom, #E2CD99 27.17%, #AF8312 71.74%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
}

.lg-table {
    display: none;
}

@media screen and (min-width: 1024px) {
    .pc-border {
        position: relative;
    }

    .pc-border::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom,
                #D7B700,
                #FFFADE,
                #FFD900,
                #726100,
                #807B00);
    }

    .pc-border::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom,
                #D7B700,
                #FFFADE,
                #FFD900,
                #726100,
                #807B00);
    }

    .sm-table {
        display: none;
    }

    .lg-table {
        display: block;
        width: 126%;
        z-index: 999;
    }

    .gold-btn {
        width: 12vw;
    }

    .gold-bind-btn {
        width: 10vw;
    }
}
</style>