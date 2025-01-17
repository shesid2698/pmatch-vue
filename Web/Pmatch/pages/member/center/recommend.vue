<template>
    <Head>
        <title>PMatch遊戲道具媒合網</title>
        <Meta property="og:title" content="PMatch遊戲道具媒合網" />
        <Meta
            name="keywords"
            content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易"
        />
        <Meta
            name="description"
            content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具媒合網 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% xl:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="lg:p-50px w-100%">
            <div class="flex flex-col lg:flex-row">
                <div class="mr-30px">
                    <div
                        class="w-300px h-55px bg-[#3caadc] border-1 border-solid border-[#3caadc] text-white text-[20px] font-500 text-center content-center"
                    >
                        回饋總遊戲幣
                    </div>
                    <div class="w-300px border-1 border-solid border-[#ced2db]">
                        <el-scrollbar max-height="200px">
                            <div
                                class="flex border-b-1px border-b-solid border-[#ced2db] last:border-none"
                                v-for="(
                                    item, index
                                ) in memberRewardList.PlatformsReward"
                                :key="index"
                            >
                                <div
                                    class="w-50% text-16px text-black font-500 p-2 border-r-1px border-r-solid border-[#ced2db]"
                                >
                                    {{ item.PlatformName }}
                                </div>
                                <div
                                    class="flex-1 p-2 text-16px text-black font-500 text-end"
                                >
                                    {{ item.Value }}
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>

                <div
                    class="mt-30px lg:mt-0 w-auto lg:w-400px rounded-5px border-2px border-solid border-gray-300 p-20px h-fit"
                >
                    <div class="flex">
                        <div
                            class="flex items-center w-50% m-t-3px text-black text-20px font-500 h-fit"
                        >
                            <div class="me-5px">回饋分潤設定</div>

                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                            >
                                <template #content>
                                    <div class="text-14px">
                                        此設定為媒合商所提供回饋的分配比例，總和為100%。<br />
                                        例如媒合商提供回饋比例為1%，<br />
                                        設定為70%-30%，則實際計算分配比例為0.7%-0.3%。
                                    </div>
                                </template>
                                <div
                                    class="inline-block w-15px h-15px rounded-50% border-2px border-solid border-#acb4c2 text-10px font-1000 text-#acb4c2 text-center content-center"
                                >
                                    i
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center mb-5">
                                <div class="text-black text-20px font-500">
                                    本會員
                                </div>
                                <div
                                    v-show="timeValue === 0"
                                    class="flex items-center w-80px h-30px relative border-1px border-solid border-#ced2db"
                                >
                                    <input
                                        type="number"
                                        v-model="mainPercent"
                                        @input="SettingPercent"
                                        @change="settingMemberPercent"
                                        class="flex items-center p-0 text-16px text-black left-0 text-end bg-transparent absolute outline-none w-70% border-none top-50% transform-translate-y-[-50%]"
                                    />
                                    <div
                                        class="text-black absolute right-5px top-48% transform-translate-y-[-50%]"
                                    >
                                        %
                                    </div>
                                </div>
                                <div
                                    v-show="timeValue !== 0"
                                    class="flex items-center w-80px h-30px relative border-1px border-solid border-#ced2db"
                                >
                                    <div
                                        @click="CannotSettingMemberPercent"
                                        class="fw-600 text-15px text-black left-0 text-end bg-transparent absolute outline-none w-70% border-none top-50% transform-translate-y-[-50%]"
                                    >
                                    {{mainPercent}}
                                    </div>
                                    <div
                                        class="text-black absolute right-5px top-50% transform-translate-y-[-50%]"
                                    >
                                        %
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="text-black text-20px font-500">
                                    被推薦人
                                </div>
                                <div
                                    class="w-80px bg-gray-100 h-30px relative border-1px border-solid border-#ced2db"
                                >
                                    <input
                                        type="number"
                                        disabled
                                        v-model="secondPercent"
                                        class="text-16px text-black left-0 text-end bg-transparent absolute outline-none w-70% border-none top-50% transform-translate-y-[-50%]"
                                    />
                                    <div
                                        class="text-black absolute right-5px top-43% transform-translate-y-[-50%]"
                                    >
                                        %
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-50px border-t-1 border-gray-50" />
            <el-table
                :data="tableData"
                :default-sort="{ prop: 'Createtime', order: 'descending' }"
                style="width: 100%"
                :header-cell-style="{
                    color: 'white',
                    background: '#3CAADC',
                    fontSize: '14px',
                    fontWeight: '600',
                }"
                stripe
                border
            >
                <el-table-column label="" width="50">
                    <template #default="scope">
                        <div class="text-center">
                            {{ scope.$index + 1 }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Account"
                    label="被推薦人帳號"
                />
                <el-table-column
                    prop="CreateTime"
                    label="綁定時間"
                >
                    <template #default="scope">
                        {{ formatDate(scope.row.CreateTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="RewardPatch"
                    label="已回饋遊戲幣"
                >
                    <template #default="scope">
                        <div
                            v-html="formatRewardPatch(scope.row.RewardPatch)"
                        ></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="LastRewardTime"
                    label="最後回饋日"
                >
                    <template #default="scope">
                        {{ formatDate(scope.row.LastRewardTime) }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup>
import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const MemberIdCookie = useCookie("_PmMemberId");
const tokenCookie = useCookie("_PmToken");
const { $axios } = useNuxtApp();

const mainPercent = ref(0);
const secondPercent = ref(0);
const tableData = ref([]);
const memberRewardList = ref([]);
const timeValue = ref(0);

const formatRewardPatch = (rewardPatch) => {
  if (!rewardPatch) return "";
  return rewardPatch.replace(/;/g, "<br>");
};

const formatDate = (dateTime) => {
        if (!dateTime) return "";
    return dateTime.split("T")[0];
};

// 取得回饋資訊
async function fetchRewardListData() {
    if (!tokenCookie.value && !MemberIdCookie.value) {
        await openAlertModal(" ", "請先登入會員");
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetMemberReward",
            {
                MemberId: MemberIdCookie.value,
            },
            {
                headers: {
                    Authorization: tokenCookie.value, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            memberRewardList.value = response.data.Data;
            if (memberRewardList.value != null) {
                mainPercent.value = memberRewardList.value.MRewardValue;
                secondPercent.value = 100 - mainPercent.value;
                const endTimeString = memberRewardList.value.EndTime;
                const endTime = new Date(endTimeString).getTime();
                const now = Date.now();

                // 計算差值
                const difference = endTime - now;

                // 確保不會有負值
                timeValue.value = Math.max(difference, 0);
            }
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 取得回饋資訊
async function fetchDetailListData() {
    if (!tokenCookie.value && !MemberIdCookie.value) {
        await openAlertModal(" ", "請先登入會員");
    }
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetDownlineDetail",
            {
                MemberId: MemberIdCookie.value,
            },
            {
                headers: {
                    Authorization: tokenCookie.value, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            tableData.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 分潤設定
const settingMemberPercent = async () => {
    if (mainPercent.value !== 0) await settingPercent();
};
const CannotSettingMemberPercent = async () =>{
    await openAlertModal(" ", "目前推薦碼為開啟中，無法修改設定");
}
// 取得回饋資訊
async function settingPercent() {
    if (!tokenCookie.value && !MemberIdCookie.value) {
        await openAlertModal(" ", "請先登入會員");
    }
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/UpdateMemberReward",
            {
                PMatchMemberId: MemberIdCookie.value,
                RewardValue: mainPercent.value,
            },
            {
                headers: {
                    Authorization: tokenCookie.value, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            secondPercent.value = 100 - mainPercent.value;
            await openAlertModal(" ", "已更新分潤設定");
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
onMounted(async () => {
    try {
        await fetchRewardListData();
        await fetchDetailListData();
    } catch (error) {
        console.error(error);
    }
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}

:deep(.el-table .descending .sort-caret.descending) {
    border-top-color: white;
}
:deep(.el-table .ascending .sort-caret.ascending) {
    border-bottom-color: white;
}
:deep(.el-table .sort-caret.ascending) {
    border-bottom-color: #b1ddf177;
}
:deep(.el-table .sort-caret.descending) {
    border-top-color: #b1ddf177;
}
:deep(.el-table tr) {
    background: #f2f2f2;
}
:deep(
        .el-table--striped
            .el-table__body
            tr.el-table__row--striped
            td.el-table__cell
    ) {
    background: #ffffff;
}
:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    align-content: start;
}
</style>
