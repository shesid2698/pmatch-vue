<script setup>
import { ElButton } from 'element-plus';

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
 * 載具綁定活動除外名單
 */
const exceptMemberList = [2060, 2077, 2382, 2389, 2401, 2414, 2453, 2462, 2509, 2512, 2528, 2535, 2536, 2537, 2553, 2556, 2606, 2618, 2624, 2626, 2628, 2644, 2733, 2735, 2759, 2804, 2814]
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
    if (memberDetail.Carrier !== "" && memberDetail.Carrier !== null) {
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
 * 檢查活動是否過期
 * @returns {boolean}
 */
const IsActExpired = computed(() => {
    // const startTime = new Date(activityInfo.StartTime);
    const startTime = new Date("2025-11-01");
    const endTime = new Date(activityInfo.EndTime);
    if (endTime >= Date.now() && Date.now() >= startTime) return false;
    else return true;
})
</script>
<template>
    <div class="px-2% py-3%">
        <h2 class="m-0">包你發金幣，滿額大放送</h2>
        <h4 class="m-0">註冊、綁定送金幣、抽AirPods 4</h4>
        <h4 class="m-0">單筆滿萬再送兩萬六</h4>
        <div class="flex">
            <div class="w-50%  border-1 border-black border-solid border-r-0" @click="currentPage = 1"
                :class="{ 'border-b-0': currentPage === 1 }">
                <div>第一重</div>
                <div>註冊綁定抽AirPods 4</div>
            </div>
            <div class="flex-1  border-1 border-black border-solid" @click="currentPage = 2"
                :class="{ 'border-b-0': currentPage === 2 }">
                <div>第二重</div>
                <div>單筆滿萬送兩萬六</div>
            </div>
        </div>
        <div class="w-100% border-1 border-black border-solid border-t-0 pt-3 box-border">
            <div v-if="currentPage === 1" class="mb-3">內文1
                <div v-if="token !== null && token !== undefined">
                    <div v-if="!IsActExpired">
                        <div class="flex justify-center">
                            <table class="w-60%">
                                <thead>
                                    <tr>
                                        <th>任務內容</th>
                                        <th>活動獎勵</th>
                                        <th>完成狀態</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>註冊PMatch會員</td>
                                        <td>26,000 包你發金幣(價值$200 元)</td>
                                        <td>{{ IsMatchActivity }}</td>
                                    </tr>
                                    <tr>
                                        <td>完成電子載具綁定</td>
                                        <td>26,000 包你發金幣(價值$200 元)</td>
                                        <td v-if="carrierStatus === '待綁定'">
                                            <ElButton>
                                                <NuxtLink to="/member/center" target="_blank">{{ carrierStatus }}
                                                </NuxtLink>
                                            </ElButton>
                                        </td>
                                        <td v-else>{{ carrierStatus }}</td>
                                    </tr>
                                    <tr>
                                        <td>完成電子載具綁定</td>
                                        <td>參加AirPods 4 抽獎，共六台</td>
                                        <td v-if="carrierStatus === '待綁定'">
                                            <ElButton>
                                                <NuxtLink to="/member/center" target="_blank">{{ carrierStatus }}
                                                </NuxtLink>
                                            </ElButton>
                                        </td>
                                        <td v-else>{{ carrierStatus }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            領取流程 :
                            <div class="text-center">
                                <ElButton>
                                    <NuxtLink to="/member/center/reward" target="_blank">前往領獎中心</NuxtLink>
                                </ElButton>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        活動已過期
                    </div>
                </div>
                <div v-else>
                    <div class="flex justify-center">
                        <ElButton class="mr-0">
                            <NuxtLink to="/member/login" target="_blank">登入</NuxtLink>
                        </ElButton>
                        <ElButton>
                            <NuxtLink to="/register" target="_blank">註冊</NuxtLink>
                        </ElButton>
                    </div>
                </div>
            </div>
            <div v-else class="mb-3">
                內文2
                <div>指定平台及媒合商</div>
                <div class="flex justify-center">
                    <table class="w-60%">
                        <thead>
                            <tr>
                                <th>遊戲平台</th>
                                <th>指定媒合商</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="2">包你發娛樂城</td>
                                <td>
                                    <NuxtLink
                                        to="https://www.pmatch.com.tw/findmatch/224?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E"
                                        target="_blank">
                                        <img src="http://192.168.10.206/images/2025/20251001112014607.png" alt=""
                                            width="150"></NuxtLink>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <NuxtLink
                                        to="https://www.pmatch.com.tw/findmatch/240?pn=%E5%8C%85%E4%BD%A0%E7%99%BC%E5%A8%9B%E6%A8%82%E5%9F%8E"
                                        target="_blank">
                                        <img src="http://192.168.10.206/images/2025/20250702165654639.png" alt=""
                                            width="150"></NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="border-solid border-0 border-black border-t-1">
                <div>i. 本次活動範圍僅包含包你發娛樂城及活動頁面指頂之媒合商，詳細內容請參照上</div>
                <div>ii. 活動一 獎項將於活動結束後三天內發送至PMtach官網領獎中心</div>
                <div>iii. 領獎中心活動獎項設有30天領取時間限制，獎項發送後請盡快至領獎中心領取，逾期視同放棄領獎資格</div>
                <div>iv. Pmatch平台保留更換等值贈品以及變更活動內容或終止活動的權利，以及最終活動解釋權</div>
                <div>v. Pmatch平台僅提供媒合交易服務，如有任何交易相關問題請直接洽詢委託媒合交易之媒合商</div>
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
</style>