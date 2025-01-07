<template>
    <div>
        <div class="w-full bg-#fff relative mt-5rem">
            <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
                <div class="flex">
                    <div class="w-50% lg-me-1rem">
                        <div class="flex mb-3">
                            <div v-if="storesItem != null">
                                <img
                                    :src="`${assetsUrl}${storesItem.IMGFiles}`"
                                    :alt="storesItem.Name"
                                />
                            </div>
                            <h2
                                class="storeTitle font-size-36px"
                                v-if="storesItem"
                            >
                                {{ storesItem.Name }}
                            </h2>
                        </div>
                        <div class="mb-3 storeAboutBox">
                            <div class="storeAboutContent">
                                <span v-if="storesItem">{{
                                    storesItem.About
                                }}</span>
                            </div>
                        </div>
                        <div>
                            <div class="ms-2 flex">
                                <NuxtLink
                                    class="flex items-center ms-1 me-1"
                                    v-if="storesItem"
                                    :to="storesItem.FB"
                                >
                                    <img
                                        class="w-30px h-30px"
                                        src="/images/facebook.png"
                                        alt=""
                                    />
                                </NuxtLink>
                                <NuxtLink
                                    class="flex items-center ms-1 me-1"
                                    v-if="storesItem"
                                    :to="storesItem.LineId"
                                >
                                    <img
                                        class="w-30px h-30px"
                                        src="/images/line.png"
                                        alt=""
                                    />
                                </NuxtLink>
                                <NuxtLink
                                    class="flex items-center ms-1 me-1"
                                    v-if="storesItem"
                                    :to="storesItem.IGId"
                                >
                                    <img
                                        class="w-30px h-30px"
                                        src="/images/instagram.png"
                                        alt=""
                                    />
                                </NuxtLink>
                                <NuxtLink
                                    class="flex items-center ms-1 me-1"
                                    v-if="storesItem"
                                    :to="storesItem.TwitterId"
                                >
                                    <div
                                        class="bg-#000 w-30px h-30px rounded-50% color-#fff text-center"
                                    >
                                        x
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-50% flex items-center justify-center lg-ms-1rem"
                    >
                        <ElCarousel
                            type="card"
                            height="200px"
                            class="w-100%"
                            arrow="always"
                            :autoplay="false"
                            @change="handleChange"
                        >
                            <ElCarouselItem
                                v-for="(item, index) in filteredPlatformArray"
                                :key="index"
                            >
                                <div class="platformBox">
                                    <div class="platformContent">
                                        <img
                                            class="platformImg w-100%"
                                            :src="`${assetsUrl}${getImgFile(item)}`"
                                            :alt="item"
                                        />
                                    </div>
                                </div>
                                
                            </ElCarouselItem>
                        </ElCarousel>
                        
                    </div>
                    <p>{{currentImg}}</p>
                </div>
            </div>
        </div>
        <div class="w-full bg-#fff relative mt-5rem">
            <div class="mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
                <div>
                    <div class="w-100% flex justify-center flex-wrap">
                        <div class="entryBox mb-5">
                            <div class="entryContent">
                                <input
                                    class="entryDetail w-90% py-.5rem font-size-18px"
                                    type="text"
                                    placeholder="遊戲暱稱(必填)"
                                    v-model="accMemberName"
                                />
                            </div>
                        </div>
                        <div class="w-100% flex justify-center mb-5">
                            <div class="flex items-center mx-10">
                                <input
                                    type="radio"
                                    class="w-20px h-20px m-0 me-3 custom-radio"
                                    v-model="buyOrSell"
                                    id="buy"
                                    :value="true"
                                />
                                <label
                                    for="buy"
                                    class="radio-label font-size-18px color-#f72585"
                                    >委買遊戲幣</label
                                >
                            </div>
                            <div class="flex items-center mx-10">
                                <input
                                    type="radio"
                                    class="w-20px h-20px m-0 me-3 custom-radio"
                                    id="sell"
                                    v-model="buyOrSell"
                                    :value="false"
                                />
                                <label
                                    for="sell"
                                    class="radio-label font-size-18px color-#4361ee"
                                    >委賣遊戲幣</label
                                >
                            </div>
                        </div>
                        <div class="entryBox mb-5">
                            <div class="entryContent">
                                <input
                                    class="entryDetail w-90% py-.5rem font-size-18px"
                                    type="text"
                                    placeholder="委託金額(必填)"
                                    v-model="accPatch"
                                />
                            </div>
                        </div>
                        <div
                            class="w-100% flex justify-center mb-5"
                            v-show="buyOrSell"
                        >
                            <div class="flex items-center ms-13 me-9">
                                <input
                                    type="radio"
                                    id="shop"
                                    class="w-20px h-20px m-0 me-3 custom-radio"
                                    v-model="paymentMethod"
                                    :value="'convenienceStore'"
                                />
                                <label
                                    for="shop"
                                    class="radio-label font-size-18px color-#f72585"
                                    >超商代收</label
                                >
                            </div>
                            <div class="flex items-center mx-16">
                                <input
                                    type="radio"
                                    id="atm"
                                    class="w-20px h-20px m-0 me-3 custom-radio"
                                    v-model="paymentMethod"
                                    :value="'atm'"
                                />
                                <label
                                    for="atm"
                                    class="radio-label font-size-18px color-#f72585"
                                    >ATM轉帳</label
                                >
                            </div>
                        </div>
                        <div class="contactBox relative mb-5">
                            <div
                                class="contactContent py-2"
                                @click.stop="contactToggle"
                            >
                                <div class="font-size-18px">
                                    {{ selectedContact || "聯絡資訊" }}
                                </div>
                                <div class="absolute top-13px right-20px">
                                    <img
                                        class="w-25px"
                                        src="/images/arrowDown.png"
                                        alt="下拉icon"
                                    />
                                </div>
                            </div>
                            <div
                                v-show="contactBox"
                                class="contactPhoneBox absolute bg-#fff top-0 w-100% z-2"
                            >
                                <div
                                    class="bg-#fff py-2"
                                    v-if="!memberPhone1Cookie"
                                    @click.stop="
                                        selectedPhone(memberPhone1Cookie)
                                    "
                                >
                                    {{ memberPhone1Cookie }}
                                </div>
                                <div
                                    class="bg-#fff py-2"
                                    v-if="!memberPhone2Cookie"
                                    @click.stop="
                                        selectedPhone(memberPhone2Cookie)
                                    "
                                >
                                    {{ memberPhone2Cookie }}
                                </div>
                                <div
                                    class="bg-#fff py-2"
                                    v-if="!memberPhone3Cookie"
                                    @click.stop="
                                        selectedPhone(memberPhone3Cookie)
                                    "
                                >
                                    {{ memberPhone3Cookie }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="relative mb-5">
                            <div class="flex items-center font-size-18px">
                                <input
                                    type="radio"
                                    class="w-20px h-20px m-0 me-3 custom-radio"
                                    id="read"
                                    v-model="readContract"
                                    :value="true"
                                />
                                <ElButton plain @click="readContact">
                                    我已詳細閱讀此服務條款(必填)
                                </ElButton>
                                <ElDialog
                                    v-model="dialogVisible"
                                    :close-on-click-modal="false"
                                >
                                    <div class="dialogHeader absolute">
                                        服務條款
                                    </div>
                                    <div class="dialogBody">
                                        <div
                                            v-if="storesItem"
                                            v-html="storesItem.ContractConetnt"
                                        ></div>
                                        <div class="flex justify-end mt-5">
                                            <ElButton
                                                class="agreeBtn"
                                                type="primary"
                                                @click="dialogVisible = false"
                                            >
                                                同意
                                            </ElButton>
                                        </div>
                                    </div>
                                </ElDialog>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="submitBox relative mb-5">
                            <div
                                class="submitBtn font-size-18px px-2rem py-1rem"
                                @click="sendAccList"
                            >
                                確認送出
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-#fff relative mt-5rem">
            <div class="arrowRight absolute">
                <img src="/images/corner.png" alt="右邊箭頭" />
            </div>
            <div class="arrowLeft absolute">
                <img src="/images/corner.png" alt="左邊箭頭" />
            </div>
            <div class="mt-5rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
                <div class="flex justify-center">
                    <div class="w-80% pt-5rem qaTitle">
                        <div class="mb-5rem relative">
                            <h1 class="buyTitle m-0 text-center font-size-50px">
                                問與答
                            </h1>
                            <div class="flex justify-center">
                                <img
                                    class="w-250px"
                                    src="/images/ourService.png"
                                    alt="問與答"
                                />
                            </div>
                        </div>
                        <div>
                            <textarea
                                class="questionEntry w-100% h-5rem p-0 mb-1rem font-size-18px b-none bg-#f8f8f8"
                                placeholder="我的提問..."
                                v-model="question"
                            ></textarea>
                        </div>
                        <div class="flex justify-center">
                            <div class="submitBox relative mb-5">
                                <div
                                    class="submitBtn font-size-18px px-2rem py-1rem"
                                    @click="sendQAList"
                                >
                                    確認送出
                                </div>
                            </div>
                        </div>
                        <div v-if="storesItem != null">
                            <div
                                class="qaBox"
                                v-if="storesItem.StoreQAs.length > 0"
                                v-for="(item, index) in storesItem.StoreQAs"
                                :key="index"
                            >
                                <div class="qaContent">
                                    <div
                                        class="flex justify-between p-1rem"
                                        @click="answerBoxToggle(index)"
                                    >
                                        <div class="flex">
                                            <div>圖</div>
                                            <div class="ms-5">
                                                <h4 class="m-0">
                                                    {{ item.Mobile }}
                                                </h4>
                                                <p
                                                    class="m-0 font-size-12px color-#6a6a6a"
                                                >
                                                    {{ item.CreateTime }}
                                                </p>
                                                <h3 class="m-0 mt-3">
                                                    {{ item.Question }}
                                                </h3>
                                            </div>
                                        </div>
                                        <div>箭頭</div>
                                    </div>
                                    <div
                                        v-show="
                                            answerShow === index &&
                                            item.Answer !== ''
                                        "
                                        class="qaAnswer flex p-1rem"
                                    >
                                        <div>
                                            <img
                                                :src="`${assetsUrl}${storesItem.IMGFiles}`"
                                                :alt="storesItem.Name"
                                            />
                                        </div>
                                        <div class="ms-5">
                                            <h3 class="m-0">
                                                {{ item.Answer }}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import { ElDialog } from "element-plus";
import { ElMessageBox } from "element-plus";
import { ElCarousel } from "element-plus";
import { ElCarouselItem } from "element-plus";

// loading page
import { useLoadStore } from "../stores/loading.js";

import { useAlertModalStore } from "../stores/useAlertModal.js";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;

const store = useLoadStore();
const setPageLoading = store.setPageLoading;

const route = useRoute();
const routeParamId = route.params.id;
const storesItem = ref(null);
const storeQAList = ref([]);
const isLoading = ref(true); // 加載狀態
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const memberIdCookie = useCookie("_PmMemberId");
const memberPhone1Cookie = useCookie("_PmMemberPhone1");
const memberPhone2Cookie = useCookie("_PmMemberPhone2");
const memberPhone3Cookie = useCookie("_PmMemberPhone3");
const assetsUrl = useCookie("_PmAssetsUrl");
const dialogVisible = ref(false);
const memberDetailList = ref([]);
const gameList = ref([]);
const imgCurrent = ref([]);

let question = ref("");

const buyOrSell = ref(true); // true 表示委買, false 表示委賣
const paymentMethod = ref(true); // 選擇的付款方式
const readContract = ref(false); // 是否閱讀並同意合約
const contactBox = ref(false); // 聯絡資訊開關
const selectedContact = ref("");
const answerShow = ref(null);

let accPlatformName = ref("");
let accMemberName = ref("");
let accPatch = ref("");
let accPayMode = ref("1");
let accPhone = ref("");

// 設定目前顯示的項目索引
const currentIndex = ref(0);
// 計算目前的值
const currentPlatform = computed(
    () => filteredPlatformArray.value[currentIndex.value]
);
const getImgFile = (platformName) => {
    const platform = gameList.value.find(
        (game) => game.PlatformName === platformName
    );
    return platform ? platform.ImgFile : ""; // 如果沒找到，返回預設圖片
};
// 切換下拉選單的顯示/隱藏
const contactToggle = () => {
    contactBox.value = !contactBox.value;
    // 選單開啟時添加全域點擊監聽
    if (contactBox.value) {
        document.addEventListener("click", handleClickOutside);
    } else {
        document.removeEventListener("click", handleClickOutside);
    }
};
// 點擊超過範圍
const handleClickOutside = (event) => {
    const dropdown = document.querySelector(".contactPhoneBox");
    if (dropdown && !dropdown.contains(event.target)) {
        contactBox.value = false;
    }
};
// 問答開關
const answerBoxToggle = (index) => {
    answerShow.value = answerShow.value === index ? null : index;
};
// 取得GetNewsDetail
async function fetchStoresDetailData(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetStoreDetail",
            {
                IsFront: true,
                StoreId: routeParamId,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storesItem.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
const readContact = () => {
    dialogVisible.value = true;
    readContract.value = true;
};
onMounted(async () => {
    await setPageLoading(true);
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;
            if (token != "") {
                await fetchStoresDetailData(token);
                await getMemberDetail(token);
                await fetchGameList(token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchStoresDetailData(token);
                await fetchGameList(token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});

const activeName = ref("first");

const handleClick = (tab, event) => {};

// 處理輪播切換的方法
const handleChange = (index) => {
    currentIndex.value = index;
};
// 篩選後的載台字串
const filteredPlatform = computed(() => {
    if (!storesItem.value || !storesItem.value.StoreProducts) {
        return; // 如果資料尚未加載，返回空陣列
    }
    const platformsSet = new Set(
        storesItem.value.StoreProducts.map((product) => product.GamePlatform)
    );
    return Array.from(platformsSet).join(", ");
});

// 篩選後的載台陣列
const filteredPlatformArray = computed(() => {
    if (!filteredPlatform.value) {
        return [];
    }
    // 使用 split 將逗號分隔的字串轉換為陣列，並移除多餘空白
    return filteredPlatform.value.split(",").map((item) => item.trim());
});

async function sendQAList() {
    if (userToken.value === "" || userToken.value === undefined) {
        await openAlertModal(" ", "請先登入會員");
    } else {
        await sendQAApi(userToken.value);
    }
}
async function sendAccList() {
    if (userToken.value === "" || userToken.value === undefined) {
        await openAlertModal(" ", "請先登入會員");
    } else {
        if (!accMemberName.value) {
            await openAlertModal(" ", "請填寫遊戲暱稱");
            return;
        }
        if (!accPatch.value) {
            await openAlertModal(" ", "請填寫委託金額");
            return;
        }
        if (readContract.value !== true) {
            await openAlertModal(" ", "請選擇是否已詳細閱讀服務條款");
            return;
        }
        await createAccApi(userToken.value);
    }
}
// 選擇遊戲並關閉選單
const selectedPhone = (item) => {
    selectedContact.value = item;
    contactBox.value = false; // 隱藏選單
};
// 送出問與答列表
async function sendQAApi(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/CreateOrUpdateStoreQAData",
            {
                Data: [
                    {
                        Id: 0,
                        StoreId: routeParamId,
                        MemberId: memberIdCookie.value,
                        Question: question.value,
                    },
                ],
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storeQAList.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 開單
async function createAccApi(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/CreateAccounting",
            {
                SqlIndex: storesItem.value.DB,
                TeamId: storesItem.value.Teamid,
                GamePlatformName: currentPlatform.value,
                MemberCharacterName: accMemberName.value,
                TransactionMode: buyOrSell.value ? 10 : 20,
                Patch: Number(accPatch.value),
                PayMode: paymentMethod.value ? 1 : 2,
                Phone: selectedContact.value,
                PmatchMemberId: memberIdCookie.value,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            storeQAList.value = response.data.Data;

            const newItem = {
                Name: storesItem.value.Name,
                Id: storesItem.value.Id,
            };

            const buyLogKey = "buyLog";
            let buyLog = JSON.parse(localStorage.getItem(buyLogKey)) || [];
            const existingIndex = buyLog.findIndex(
                (item) => item.Id === newItem.Id
            );
            if (existingIndex !== -1) {
                // 如果已存在，移除原有位置的元素
                buyLog.splice(existingIndex, 1);
            }

            buyLog.unshift(newItem);

            // 如果陣列超過 5 筆，移除最後一筆
            if (buyLog.length > 5) {
                buyLog.pop();
            }

            // 將更新後的 buyLog 存入 localStorage
            localStorage.setItem(buyLogKey, JSON.stringify(buyLog));
            await openAlertModal(" ", "單據已送出");
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        await openAlertModal(" ", `請求失敗: ${error}`);
    }
}
// 取得會員資料
async function getMemberDetail(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetMemberDetail",
            {
                PmatchMemberId: memberIdCookie.value,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            memberDetailList.value = response.data.Data;
            memberPhone1Cookie.value = memberDetailList.value[0].Mobile1;
            memberPhone2Cookie.value = memberDetailList.value[0].Mobile2;
            memberPhone3Cookie.value = memberDetailList.value[0].Mobile3;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 取得GetPlatformAndCharacterList(遊戲平台資訊)
async function fetchGameList(token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetPlatformAndCharacterList",
            {},
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            gameList.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
watch(
    [filteredPlatform, filteredPlatformArray, gameList],
    ([newFilteredPlatform, newFilteredPlatformArray]) => {
        // 更新 accPlatformName
        if (newFilteredPlatform) {
            accPlatformName.value = newFilteredPlatform;
        }

        // 更新 currentIndex
        if (newFilteredPlatformArray.length > 0 && !currentPlatform.value) {
            currentIndex.value = 0;
        }
    },
    { immediate: true } // 立刻執行一次，將初始值設置進去
);
</script>

<style scoped>
:deep(.el-icon) {
    z-index: -1;
}
.storeTitle {
    background: linear-gradient(to bottom, #f72585, #7b2cbf);
    background: -webkit-linear-gradient(to bottom, #f72585, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.storeAboutBox {
    position: relative;
    padding: 1px 0;
    background: linear-gradient(to right, #4361ee, #f72585);
    border: none;
}
.storeAboutContent {
    background: #fff;
    color: #6b6b6b;
    padding: 2rem;
}

:deep(.el-carousel__item) {
    box-shadow: 0px 20px 20px -13px #bbb;
    border-radius: 10px;
}
/* :deep(.el-carousel__item:nth-child(2n):not(.is-active)){
    transform: translateX(-22.9075px) scale(0.83) rotateY(-55deg) !important;
}

:deep(.el-carousel__item:nth-child(2n+1):not(.is-active)){
    transform: translateX(292.407px) scale(0.83) rotateY(55deg) !important;
} */

:deep(.el-carousel__arrow) {
    background-color: rgba(0, 0, 0, 0);
}
:deep(.el-carousel__arrow--left > .el-icon),
:deep(.el-carousel__arrow--right > .el-icon) {
    font-size: 2.5rem;
    font-weight: 800;
}
:deep(.el-carousel__button) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

:deep(.el-carousel__indicators) {
    display: none;
}
/* 彈窗控制 */
:deep(.el-button) {
    border: none;
    color: #f72585;
    font-size: 18px;
}
:deep(.el-dialog__header) {
    position: absolute;
}
:deep(.el-dialog) {
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 20px;
    border: none;
}
:deep(.el-dialog__header) {
    position: absolute;
}
:deep(.el-button:focus-visible) {
    outline: none;
}
.dialogHeader {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    padding: 0.75rem;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
}
.dialogBody {
    background: #fff;
    color: #8d8d8d;
    border-radius: 20px;
    padding: 2rem;
}
.agreeBtn {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    padding: 1.2rem 2rem;
    border-radius: 50px;
}
.buyTitle {
    background: linear-gradient(to right, #4361ee, #7b2cbf);
    background: -webkit-linear-gradient(to right, #4361ee, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.entryBox {
    width: 50%;
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    border: none;
}
.entryContent {
    background: #fff;
    color: #f72585;
    border-radius: 50px;
    text-align: center;
}
.entryDetail {
    border: none;
    color: #8d8d8d;
    border-radius: 50px;
}
.entryDetail:focus-visible {
    outline: none;
}
.contactBox {
    width: 50%;
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    border: none;
    cursor: pointer;
}
.contactContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    text-indent: 2rem;
    color: #fff;
}
.contractBox {
    width: 100%;
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 20px;
    border: none;
}
.contractContent {
    background: #fff;
    color: #8d8d8d;
    border-radius: 20px;
    padding: 2rem;
}
.contractDetail {
    padding: 1rem;
    max-height: 600px;
    overflow-y: scroll;
}
.contractDetail::-webkit-scrollbar {
    width: 10px;
}
.contractDetail::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #666;
}
.matchingTitle {
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
}
.submitBox {
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    border: none;
    color: #fff;
}
.submitBtn {
    text-align: center;
    cursor: pointer;
}
.submitBtn:hover {
    background: #fff;
    color: #8d8d8d;
    border-radius: 50px;
    text-align: center;
}
.custom-radio {
    appearance: none; /* 移除預設樣式 */
    width: 20px;
    height: 20px;
    border: 2px solid #6a6a6a; /* 外圈的灰色邊框 */
    border-radius: 50%;
    background-color: #fff; /* 中間的白色底 */
    display: inline-block;
    position: relative;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
}
/* 當選中時 */
.custom-radio:checked {
    border-color: #6a6a6a; /* 選中時外圈變為灰色 */
    background-color: #fff; /* 保持白色底 */
}

.custom-radio:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px; /* 中間灰色圓的大小 */
    height: 10px;
    background-color: #6a6a6a; /* 灰色圓 */
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
.contactPhoneBox {
    border: 1px solid #ccc;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.qaTitle {
    border-top: 2px solid transparent;
    border-image: linear-gradient(to right, #f72585 0%, #7b2cbf 100%);
    border-image-slice: 1;
}
.questionEntry {
    text-indent: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f72585;
    font-weight: 600;
    height: 120px;
}
.questionEntry:focus-visible {
    outline: none;
}
.qaBox {
    width: 100%;
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 10px;
    border: none;
    margin: 1.5rem 0;
}
.qaContent {
    background: #fff;
    color: #f72585;
    border-radius: 10px;
    padding: 1rem;
}
.qaAnswer {
    border-top: 1px dashed #ccc;
}
.platformBox {
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 10px;
    padding: 4px;
    border: none;
}
.platformContent {
    color: #f72585;
    border-radius: 10px;
}
.platformImg {
    border-radius: 10px;
}
.arrowLeft {
    top: 200px;
}
.arrowRight {
    transform: rotate(180deg);
    right: 0;
    top: -250px;
}
</style>