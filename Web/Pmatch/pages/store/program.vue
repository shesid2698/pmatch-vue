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
            content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
        <Meta
            property="og:description"
            content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全"
        />
    </Head>
    <div class="storeBac">
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
                <div class="mb-3">
                    <h1
                        class="m-0 mb-2 text-center font-size-33px md-font-size-48px slogan"
                    >
                        PMatch付費方案
                    </h1>
                    <h3
                        class="m-0 font-size-20px md-font-size-26px text-center subSlogan"
                    >
                        PMatch擁有超過 3 億筆跨國資料，即時收集
                        Facebook、YouTube、Instagram、X、TikTok
                        上龐大的社群資料，並結合人工智慧技術做到最佳的網紅推薦。加入
                        PMatch
                        專業版，享有豐富的專業版功能與進階應用。透過大數據與AI運算，達到精準行銷。
                    </h3>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex md-flex-nowrap flex-wrap justify-center">
                    <div
                        v-for="(item, index) in programList"
                        :key="index"
                        :class="`${item.className}`"
                        class="p-1rem md-p-2rem md-m-1rem my-1rem"
                    >
                        <div>
                            <div class="flex justify-center pb-1rem">
                                <span class="programTitle">
                                    {{ item.title }}
                                </span>
                            </div>
                            <div
                                class="flex justify-center pb-2rem mb-2rem programPriceBox"
                            >
                                <div>
                                    <span>NT</span>
                                    <span class="programPrice">{{
                                        item.price
                                    }}</span>
                                    <span> / 月</span>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <div>
                                    <div
                                        class="flex mb-1rem lg-px-1.5rem"
                                        v-for="it in item.detail"
                                    >
                                        <div class="me-1.5rem">
                                            <img
                                                class="w-20px"
                                                src="/images/icon-check-01.png"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <span>{{ it }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex items-center justify-center mb-3rem">
                    <div class="titleLeftBorder"></div>
                    <span class="hotTitle">選擇</span>
                    <span class="gameTitle">最適合的方案</span>
                    <div class="titleRightBorder"></div>
                </div>
                <div class="planTable">
                    <div class="color-#fff flex justify-end min-w-600px">
                        <div class="flex py-3">
                            <div class="px-1rem w-80px text-center">入門版</div>
                            <div
                                class="px-1rem w-80px text-center color-#43edff"
                            >
                                專業版
                            </div>
                            <div class="px-1rem w-80px text-center">企業版</div>
                        </div>
                    </div>
                    <div class="color-#fff planBox">
                        <div
                            v-for="(row, rowIndex) in planList"
                            :key="rowIndex"
                            class="flex justify-between py-4 planCol"
                        >
                            <!-- 左側描述文字 -->
                            <div class="flex items-center px-1rem">
                                <span>{{ row.label }}</span>
                            </div>
                            <!-- 右側內容 -->
                            <div class="flex">
                                <div
                                    v-for="(item, itemIndex) in row.values"
                                    :key="itemIndex"
                                    class="flex justify-center items-center px-1rem w-80px"
                                    :class="item.colorClass"
                                >
                                    <template v-if="item.type === 'image'">
                                        <img
                                            :src="item.src"
                                            :alt="item.alt"
                                            class="w-20px"
                                        />
                                    </template>
                                    <template v-else>
                                        <span class="fw-600">{{
                                            item.value
                                        }}</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex items-center justify-center mb-3rem">
                    <div class="titleLeftBorder"></div>
                    <span class="hotTitle">我們</span>
                    <span class="gameTitle">的優勢</span>
                    <div class="titleRightBorder"></div>
                </div>
                <div
                    v-for="(item, index) in advantagesList"
                    :key="index"
                    class="md-flex adBox"
                    :class="{ advantagesEven: index % 2 !== 0 }"
                >
                    <div class="w-100% lg-w-50% md-mb-0rem mb-2rem">
                        <div class="ps-5 pe-5 flex items-center">
                            <img
                                class="w-100%"
                                :src="item.img"
                                :alt="item.title"
                            />
                        </div>
                    </div>
                    <div class="adContentBox w-100% lg-w-50% flex items-center">
                        <div class="lg-ms-5 lg-me-5">
                            <div class="mb-2rem md-block flex justify-center">
                                <img
                                    class="w-70px"
                                    :src="item.icon"
                                    :alt="item.detail"
                                />
                            </div>
                            <div
                                class="mb-1rem md-mb-1.5rem md-block flex justify-center"
                            >
                                <span class="adTitle">{{ item.title }}</span>
                            </div>
                            <div
                                class="mb-2rem md-mb-1rem md-block flex justify-center"
                            >
                                <span class="adContent">{{ item.detail }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex items-center justify-center mb-3rem">
                    <div class="titleLeftBorder"></div>
                    <span class="hotTitle">常見問題</span>
                    <span class="gameTitle">FAQ</span>
                    <div class="titleRightBorder"></div>
                </div>
                <div
                    class="qaBox mb-3"
                    v-for="(item, index) in qaList"
                    :key="index"
                    @click="answerBoxToggle(index)"
                >
                    <div class="w-100% p-1rem md-p-1.5rem">
                        <div class="w-100% flex justify-between items-center">
                            <div
                                class="font-size-20px color-#43edff flex items-center"
                            >
                                <span>{{ item.Title }}</span>
                            </div>
                            <div class="flex items-center">
                                <img
                                    :class="
                                        answerShow === index
                                            ? 'w-20px'
                                            : 'w-13px'
                                    "
                                    :src="
                                        answerShow === index
                                            ? '/images/icon-arrow-down-02.png'
                                            : '/images/icon-arrow-left-02.png'
                                    "
                                    alt="箭頭向右"
                                />
                            </div>
                        </div>
                        <div
                            v-show="answerShow === index && item.Answer !== ''"
                            v-html="item.Content"
                            class="answerBox font-size-20px color-#fff"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-25rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex items-center justify-center mb-3rem">
                    <div class="titleLeftBorder"></div>
                    <span class="hotTitle">聯絡</span>
                    <span class="gameTitle">我們</span>
                    <div class="titleRightBorder"></div>
                </div>
                <div class="flex justify-center">
                    <div class="contactBox py-2rem px-1rem md-px-3rem">
                        <div class="mb-1rem">
                            <input
                                class="contactEntry"
                                placeholder="姓名"
                                type="text"
                                v-model="contactName"
                            />
                        </div>
                        <div class="relative mb-1rem">
                            <input
                                class="contactEntry"
                                placeholder="手機號碼"
                                :class="{ 'error-input': isPhoneError }"
                                type="text"
                                v-model="contactPhone"
                            />
                            <div
                                v-show="isPhoneError"
                                class="absolute right-5px top-12px"
                            >
                                <img
                                    class="w-30px"
                                    src="/images/icon-alert.png"
                                    alt="警示的圖"
                                />
                            </div>
                            <div v-show="isPhoneError">
                                <p class="m-0 fw-600 color-#ff2400">
                                    請輸入正確手機格式，共10碼
                                </p>
                            </div>
                        </div>

                        <div class="mb-1rem">
                            <input
                                class="contactEntry"
                                placeholder="Email"
                                type="text"
                                v-model="contactMail"
                            />
                        </div>
                        <div class="mb-1rem">
                            <div
                                class="contactEntry purposeSelect relative"
                                @click.stop="togglePurposeBox"
                            >
                                <span>{{ selectedPurpose || "主旨 ..." }}</span>
                                <div class="purposeBox" v-show="showPurposeBox">
                                    <div class="purposeBoxContent">
                                        <div
                                            class="relative w-100% purposeOption"
                                            v-for="(
                                                option, index
                                            ) in purposeOptions"
                                            :key="option"
                                            @click.stop="selectPurpose(option)"
                                        >
                                            {{ option }}
                                            <div
                                                v-show="index === 0"
                                                class="absolute top-15px right-15px"
                                            >
                                                <img
                                                    class="w-15px"
                                                    src="/images/icon-arrow-down-03.png"
                                                    alt="下拉選單箭頭"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute top-15px right-15px">
                                    <img
                                        class="w-15px"
                                        src="/images/icon-arrow-down-02.png"
                                        alt="下拉選單箭頭"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="mb-1rem">
                            <textarea
                                class="contactEntryArea"
                                placeholder="留言 (請輸入100字以內的訊息)"
                                cols="30"
                                rows="10"
                                maxlength="100"
                                v-model="contactContent"
                            ></textarea>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="w-60% me-1rem relative">
                                <input
                                    class="contactCap"
                                    :class="{ 'error-input': isCapError }"
                                    placeholder="輸入驗證碼"
                                    type="text"
                                    v-model="contactCap"
                                />
                                <div
                                    v-show="isCapError"
                                    class="absolute right-5px top-12px"
                                >
                                    <img
                                        class="w-30px"
                                        src="/images/icon-alert.png"
                                        alt="警示的圖"
                                    />
                                </div>
                            </div>
                            <div class="w-200px flex">
                                <div
                                    id="captchaContainer"
                                    class="w-100% h-51px me-.5rem"
                                ></div>
                                <div
                                    @click="refreshCaptcha"
                                    class="refreshBtn flex items-center"
                                >
                                    <img
                                        class="w-35px"
                                        src="/images/icon-refresh.png"
                                        alt="重整的圖"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="mb-1rem" v-show="isCapError">
                            <p class="m-0 fw-600 color-#ff2400">
                                請輸入正確的驗證碼
                            </p>
                        </div>
                        <div class="flex justify-center pt-3 mt-4">
                            <div class="moreBtnBox">
                                <button
                                    class="moreBtn color-#fff font-size-22px decoration-none"
                                    to="/gamelist"
                                    @click="sendForm"
                                >
                                    送出
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// 註冊 Chart.js 所需的模組
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { useTransition } from "@vueuse/core";
import { useLoadStore } from "../stores/loading.js";
import { useAlertModalStore } from "../stores/useAlertModal.js";
import useCaptcha from "~/composables/captcha";
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const { GVerify } = useCaptcha();
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const setPageLoading = store.setPageLoading;
const userToken = useCookie("_PmToken");
const contactName = ref("");
const contactPhone = ref("");
const contactMail = ref("");
const contactContent = ref("");
const contactCap = ref("");
const answerShow = ref(null);
const isCapError = ref(false);
const isPhoneError = ref(false);
let captcha = null;
const showPurposeBox = ref(false);
const selectedPurpose = ref("");
const purposeOptions = ref([
    "主旨 ...",
    "商務洽談",
    "合作邀請",
    "網站使用問題",
    "其他",
]);
// 優勢列表
const advantagesList = [
    {
        title: "記帳、媒合、實名驗證一步到位",
        detail: "一站式財務處理系統，幫助媒合商簡化記錄和計算的流程，利用我們的系統來自動組建媒合的狀況，讓媒合結果一目了然",
        img: "/images/advantages3.png",
        icon: "/images/adIcon-03.png",
    },
    {
        title: "專業的實名制認證",
        detail: "我們與各大銀行以及電信商合作，能夠用客戶提供的資料來驗證此人的電話或者銀行帳戶是否正確，大大降低媒合商的交易風險",
        img: "/images/advantages2.png",
        icon: "/images/adIcon-02.png",
    },
    {
        title: "整合您的客戶資料",
        detail: "還在煩惱客戶的資料太多太雜嗎?我們提供了專業的整合服務，將您的客戶資料整理到一起，讓您在查詢後夠快速地了解客戶的狀況，節省你交易的時間。",
        img: "/images/advantages1.png",
        icon: "/images/adIcon-01.png",
    },
    {
        title: "交易的守護者",
        detail: "提供時時監控的服務，當此客戶的身分有疑慮時，將立即提出警告，保障交易您的安全，防範欺詐風險，讓交易更安心。",
        img: "/images/advantages4.png",
        icon: "/images/adIcon-04.png",
    },
];
const programList = [
    {
        title: "入門版",
        price: "1,299",
        detail: [
            "無成交手續費",
            "可開通3個銷售管道",
            "推薦分潤行銷",
            "會員分級",
            "訊息管理中心",
            "3管理員帳號",
            "5應用擴充",
        ],
        className: "programStart",
    },
    {
        title: "專業版",
        price: "2,899",
        detail: [
            "無成交手續費",
            "可開通10個銷售管道",
            "推薦分潤行銷",
            "會員分級",
            "訊息管理中心",
            "進階促銷優惠工具",
            "群發行銷訊息",
            "行銷預測功能",
            "10管理員帳號",
            "25應用擴充",
        ],
        className: "programPro",
    },
    {
        title: "企業版",
        price: "6,999",
        detail: [
            "無成交手續費",
            "可開通30個銷售管道",
            "推薦分潤行銷",
            "會員分級",
            "訊息管理中心",
            "進階促銷優惠工具",
            "群發行銷訊息",
            "行銷預測功能",
            "20管理員帳號",
            "35應用擴充",
        ],
        className: "programEnterprise",
    },
];
const planList = [
    {
        label: "無成交手續費",
        values: [
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "可開通個銷售管道",
        values: [
            { type: "text", value: "3" },
            { type: "text", value: "10", colorClass: "color-#43edff" },
            { type: "text", value: "30" },
        ],
    },
    {
        label: "推薦分潤行銷",
        values: [
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "會員分級",
        values: [
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "訊息管理中心",
        values: [
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "進階促銷優惠工具",
        values: [
            {
                type: "image",
                src: "/images/icon-endash-white.png",
                alt: "白色dash",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "群發行銷訊息",
        values: [
            {
                type: "image",
                src: "/images/icon-endash-white.png",
                alt: "白色dash",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "行銷預測功能",
        values: [
            {
                type: "image",
                src: "/images/icon-endash-white.png",
                alt: "白色dash",
            },
            {
                type: "image",
                src: "/images/icon-check-02.png",
                alt: "藍色勾勾",
            },
            {
                type: "image",
                src: "/images/icon-check-01.png",
                alt: "白色勾勾",
            },
        ],
    },
    {
        label: "管理員帳號",
        values: [
            {
                type: "image",
                src: "/images/icon-endash-white.png",
                alt: "白色dash",
            },
            { type: "text", value: "10", colorClass: "color-#43edff" },
            { type: "text", value: "20" },
        ],
    },
    {
        label: "應用擴充",
        values: [
            {
                type: "image",
                src: "/images/icon-endash-white.png",
                alt: "白色dash",
            },
            { type: "text", value: "25", colorClass: "color-#43edff" },
            { type: "text", value: "35" },
        ],
    },
];
const qaList = ref([]);

// 問答開關
const answerBoxToggle = (index) => {
    answerShow.value = answerShow.value === index ? null : index;
};
// 切換下拉選單的顯示/隱藏
const togglePurposeBox = () => {
    showPurposeBox.value = !showPurposeBox.value;
    // 選單開啟時添加全域點擊監聽
    if (showPurposeBox.value) {
        document.addEventListener("click", handleClickOutside);
    } else {
        document.removeEventListener("click", handleClickOutside);
    }
};
const handleClickOutside = (event) => {
    const dropdown = document.querySelector(".purposeBox");
    if (dropdown && !dropdown.contains(event.target)) {
        showPurposeBox.value = false;
    }
};
const selectPurpose = (item) => {
    selectedPurpose.value = item;
    showPurposeBox.value = false;
};
// 檢查電話
const validatePhone = () => {
    const phoneRegex = /^09\d{8}$/; // 09 開頭，後接 8 位數字
    const result = phoneRegex.test(contactPhone.value);
    isPhoneError.value = !result;
    return result;
};
// 刷新驗證碼
const refreshCaptcha = () => {
    captcha.refresh();
};
// 驗證用戶輸入
const validateCaptcha = () => {
    const result = captcha.validate(contactCap.value);
    isCapError.value = !result;
    return result; // 會返回 true 或 false
};
// 送出信件
async function sendForm() {
    if (!contactName.value) {
        await openAlertModal(" ", "請輸入姓名");
        return;
    }
    if (!validatePhone() && !validateCaptcha()) {
        await openAlertModal(" ", "請輸入正確的手機號碼及驗證碼");
        return;
    }
    if (!validatePhone()) {
        await openAlertModal(" ", "手機號碼必須是 09 開頭且為 10 碼");
        return;
    }
    if (!contactMail.value) {
        await openAlertModal(" ", "請輸入Email");
        return;
    }
    if (selectedPurpose.value === "主旨 ..." || !selectedPurpose.value) {
        await openAlertModal(" ", "請先選擇主旨內容");
        return;
    }
    if (!contactContent.value) {
        await openAlertModal(" ", "請輸入留言內容");
        return;
    }
    if (!validateCaptcha()) {
        await openAlertModal(" ", "請輸入正確的驗證碼");
        return;
    }
    await sendMail();
}
// 聯絡我們
async function sendMail() {
    const token = await jwtStore.generateToken();
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/SendEmail",
            {
                Name: contactName.value,
                MobileNumber: contactPhone.value,
                Email: contactMail.value,
                Subject: selectedPurpose.value,
                Content: contactContent.value,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            await openAlertModal(" ", "已成功寄信完成，將有專員回覆您 !");
            window.location.reload();
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
// 取得GetNewsList(最新消息)
async function fetchNewsListData(num, token) {
    if (token === "") {
        token = await jwtStore.generateToken();
    }

    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetNewsList",
            {
                Categorys: num,
            },
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            qaList.value = response.data.Data;
        } else {
            await openAlertModal(" ", `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
onMounted(async () => {
    await setPageLoading(true);
    try {
        captcha = new GVerify({ id: "captchaContainer" }); // 初始化畫布驗證碼
        if (userToken.value != "" && userToken.value != undefined) {
            const token = userToken.value;

            if (token != "") {
                await fetchNewsListData([4], token);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != "") {
                await fetchNewsListData([4], token);
            }
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    } finally {
        await setPageLoading(false);
    }
});
</script>

<style scoped>
.storeBac {
    background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png),
        url(/images/bg-02.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.slogan {
    background: linear-gradient(to bottom, #fff, #43a5ee);
    background: -webkit-linear-gradient(#fff, #43a5ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.subSlogan {
    color: #fff;
}
.pushSlogan {
    background: linear-gradient(to bottom, #fff, #fff);
    background: -webkit-linear-gradient(#fff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
:deep(.el-statistic__number) {
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    background: -webkit-linear-gradient(#fff, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    font-size: 36px;
}
.plus {
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    background: -webkit-linear-gradient(#fff, #7b2cbf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    font-size: 36px;
}
.matchBox {
    position: relative;
    border-radius: 25px;
    background: transparent;
    margin: 1rem;
    background: linear-gradient(
        to bottom,
        rgba(123, 44, 191, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 100%
    );
}

.matchBox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    padding: 2px;
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.matchContent {
    border-radius: 25px;
    border: none;
    background: transparent;
    padding: 2rem 1rem;
    text-align: center;
}
.tableTh {
    padding-bottom: 1rem;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%)
        1;
}
.tableTd {
    padding: 1rem 0;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%)
        1;
}
.platformName {
    background: linear-gradient(to bottom, #fff, #43a5ee);
    background: -webkit-linear-gradient(#fff, #43a5ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 700;
}
.patchNumber {
    background: linear-gradient(to bottom, #43a5ee, #fff);
    background: -webkit-linear-gradient(#43a5ee, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 700;
}
.hotTitle {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 40px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.gameTitle {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 40px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.titleLeftBorder {
    width: 40px;
    border: 2px solid;
    border-right: none;
    height: 10px;
    border-image: linear-gradient(to right, #fff, #43edff) 1;
    margin-right: 1rem;
}
.titleRightBorder {
    width: 40px;
    border: 2px solid;
    border-left: none;
    height: 10px;
    border-image: linear-gradient(to left, #fff, #43edff) 1;
    margin-left: 1rem;
}
.topTitle {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 26px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.topTableTh {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    font-weight: 600;
}
.topTableBorder {
    position: relative;
}
.topTableBorder::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.topTableThRight {
    border-left: 2px solid #fff;
}
.topTableTd {
    color: #fff;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #43edff, #fff) 1;
}
.topTableTd:last-child {
    border-bottom: none; /* 移除邊框 */
}
.topPatch {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 20px;
}
:deep(.el-button.is-plain) {
    --el-button-hover-bg-color: rgba(0, 0, 0, 0);
    --el-button-hover-border-color: rgba(0, 0, 0, 0);
    --el-button-bg-color: rgba(0, 0, 0, 0);
    --el-button-border-color: rgba(0, 0, 0, 0);
}
.adBox {
    margin-bottom: 3rem;
}
.adBox:last-child {
    margin-bottom: 0rem;
}
.adTitle {
    background: linear-gradient(to bottom, #fff, #43a5ee);
    background: -webkit-linear-gradient(#fff, #43a5ee);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 30px;
}
.adContentBox {
    position: relative;
}
.adContentBox::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #43a5ee, #fff);
    mask-image: linear-gradient(
        to right,
        black 10px,
        transparent 10px,
        transparent 20px
    );
    mask-size: 20px 100%;
    mask-repeat: repeat-x;
}
.adContent {
    color: #fff;
    font-size: 20px;
}
.advantagesEven {
    flex-direction: row-reverse;
}
.programStart,
.programEnterprise {
    position: relative;
    color: #fff;
    width: calc(100% / 3);
    background: linear-gradient(
        to bottom,
        rgba(123, 44, 191, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 100%
    );
}
.programStart::before,
.programEnterprise::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.programPro {
    color: #fff;
    width: calc(100% / 3);
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 10px;
    position: relative;
}
.programPro::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -3px;
    right: -3px;
    bottom: -20px;
    border-radius: 10px;
    background: linear-gradient(to right, #4361ee, #f72585);
    z-index: -1;
}
.programTitle {
    background: linear-gradient(to bottom, #fff, #fff);
    background: -webkit-linear-gradient(#fff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 26px;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.programPriceBox {
    border-bottom: 1px solid #fff;
}
.programPrice {
    background: linear-gradient(to bottom, #fff, #7b2cbf 175%);
    background: -webkit-linear-gradient(#fff, #7b2cbf 175%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 900;
    font-size: 36px;
    padding: 0 1rem;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.moreBtnBox {
    position: relative;
    padding: 1px 1px;
    background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
}
.moreBtn {
    padding: 1rem 2rem;
    border: none;
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
}
.moreBtn:hover {
    background: #fff;
    color: #f72585;
}
.contactBox {
    position: relative;
    width: 50%;
    background: linear-gradient(
        to bottom,
        rgba(123, 44, 191, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 100%
    );
}
.contactBox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.contactEntry {
    color: #fff;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.15)
    );
    width: 100%;
    border: none;
    text-indent: 1rem;
    padding: 1rem 0;
    border-radius: 10px;
    position: relative;
    font-size: 1rem;
}
.contactEntry:focus-visible {
    outline: none;
}
.contactEntry::placeholder {
    color: #fff; /* 設定 placeholder 的顏色 */
}
.contactEntryArea {
    color: #fff;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.15)
    );
    width: calc(100% - 2rem);
    border: none;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
    font-size: 1rem;
}
.contactEntryArea:focus-visible {
    outline: none;
}
.contactEntryArea::placeholder {
    color: #fff; /* 設定 placeholder 的顏色 */
}
.contactCap {
    color: #fff;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.15)
    );
    width: 100%;
    border: none;
    text-indent: 1rem;
    padding: 1rem 0;
    border-radius: 10px;
    position: relative;
    font-size: 1rem;
}
.contactCap:focus-visible {
    outline: none;
}
.contactCap::placeholder {
    color: #fff; /* 設定 placeholder 的顏色 */
}
#captchaContainer {
    border-radius: 10px;
    overflow: hidden;
}
.refreshBtn {
    cursor: pointer;
}
.error-input {
    border: 1px solid red !important;
}
.planTable {
    overflow-x: auto;
    width: 100%;
}
.planTable::-webkit-scrollbar {
    width: 3px;
}
.planTable::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
}
.planBox {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    min-width: 600px;
}
.planCol:nth-child(2n) {
    background: rgba(255, 255, 255, 0.15);
}
.qaBox {
    position: relative;
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    background: linear-gradient(
        to bottom,
        rgba(123, 44, 191, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 100%
    );
}
.qaBox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.answerBox {
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid #fff;
}
.purposeSelect {
    cursor: pointer;
}
.purposeBox {
    position: absolute;
    top: 0;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    z-index: 2;
}
.purposeOption {
    padding: 1rem 0;
    color: #4361ee;
    border-radius: 10px;
    cursor: pointer;
}
.purposeOption:hover:not(:first-child) {
    padding: 1rem 0;
    background-color: #4361ee;
    color: #fff;
}
@media screen and (max-width: 1024px) {
    .programPro {
        width: 85%;
    }
    .programStart,
    .programEnterprise {
        width: 85%;
    }
}
@media screen and (max-width: 768px) {
    .contactBox {
        position: relative;
        width: 100%;
    }
    .hotTitle {
        font-size: 32px;
    }
    .gameTitle {
        font-size: 32px;
    }
    .titleLeftBorder {
        width: 20px;
    }
    .titleRightBorder {
        width: 20px;
    }
}
</style>