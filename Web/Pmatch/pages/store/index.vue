<template>

    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title"
              content="PMatch遊戲道具交易平台" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <ElDialog v-for="(dialog, index) in dialogVisible"
              :key="index"
              v-model="dialogVisible[index]"
              :close-on-click-modal="false">
        <!--<div class="dialogHeader absolute">遊戲幣走向</div>-->
        <div class="dialogBody">
            <div>
                <Line :id="`my-chart-${index}`"
                      :options="chartOptions"
                      :data="chartDataComputed[index]" />
            </div>
            <div class="flex justify-end mt-5">
                <ElButton class="agreeBtn"
                          type="primary"
                          @click="dialogVisible[index] = false">
                    關閉
                </ElButton>
            </div>
        </div>
    </ElDialog>
    <div class="storeBac">
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
                <div class="mb-3">
                    <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-48px slogan">
                        PMatch是你事業上的全能助手 !
                    </h1>
                    <h3 class="m-0 font-size-20px md-font-size-26px text-center subSlogan">
                        讓你的廣告被看見，讓對的人找到你，還能輕鬆完成記帳與實名制全方位服務
                    </h3>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="md-flex">
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue1" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span class="m-0 md-block inline color-#fff text-center w-100%">
                                        已經促成"百萬筆"
                                    </span>
                                    <span class="m-0 md-block inline color-#fff text-center w-100%">
                                        以上的媒合
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue3" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span class="m-0 md-block inline color-#fff text-center md-w-100%">
                                        已幫助"三萬+"
                                    </span>
                                    <span class="m-0 md-block inline color-#fff text-center md-w-100%">
                                        位玩家完成媒合
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex justify-center">
                    <div class="w-90%">
                        <div class="flex tableTh">
                            <div class="w-100% font-size-1.2rem text-center color-#beffff">
                                遊戲平台
                            </div>
                            <div class="w-100% font-size-1.2rem text-center color-#beffff">
                                富豪榜財產
                            </div>
                            <div class="w-100% font-size-1.2rem text-center color-#beffff">
                                遊戲幣走向
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                                滿貫大亨
                            </div>
                            <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                                {{
                                    dailyPatchList0.length
                                        ? dailyPatchList0[
                                              dailyPatchList0.length - 1
                                          ].Total.toLocaleString()
                                        : "0"
                                }}
                            </div>
                            <div class="w-100% font-size-1.2rem text-center color-#beffff">
                                <ElButton plain
                                          @click="openDialog(0)">
                                    <!-- 簡化縮小版折線圖 -->
                                    <Line :data="simpleChartData"
                                          :options="simpleChartOptions"
                                          class="md-w-150px w-80px" />
                                </ElButton>
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div class="w-100% platformName font-size-1.5rem text-center color-#beffff">
                                老子有錢
                            </div>
                            <div class="w-100% patchNumber font-size-1.5rem text-center color-#beffff">
                                {{
                                    dailyPatchList1.length
                                        ? dailyPatchList1[
                                              dailyPatchList1.length - 1
                                          ].Total.toLocaleString()
                                        : "0"
                                }}
                            </div>
                            <div class="w-100% font-size-1.2rem text-center color-#beffff">
                                <ElButton plain
                                          @click="openDialog(1)">
                                    <!-- 簡化縮小版折線圖 -->
                                    <Line :data="simpleChartData1"
                                          :options="simpleChartOptions"
                                          class="md-w-150px w-80px" />
                                </ElButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 先不開 -->
        <!-- <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="md-flex">
                    <div class="w-100% md-w-50% md-mb-0 mb-3rem">
                        <div class="flex items-center justify-center mb-8">
                            <div class="titleLeftBorder"></div>
                            <span class="hotTitle">熱門</span>
                            <span class="gameTitle">遊戲</span>
                            <div class="titleRightBorder"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 5</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >遊戲幣數量</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">包你發</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="topPatch px-3">10000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-100% md-w-50%">
                        <div class="flex items-center justify-center mb-8">
                            <div class="titleLeftBorder"></div>
                            <span class="hotTitle">新進</span>
                            <span class="gameTitle">遊戲</span>
                            <div class="titleRightBorder"></div>
                        </div>
                        <div>
                            <div class="topTableBorder">
                                <div class="flex justify-center">
                                    <span class="topTitle p-3">TOP 3</span>
                                </div>
                                <div class="topTableTh flex">
                                    <div class="p-3 w-50%">
                                        <span class="px-3">遊戲平台</span>
                                    </div>
                                    <div class="p-3 w-50%">
                                        <span class="px-3 topTableThRight"
                                            >上線日期</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你爽</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你書</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                                <div class="topTableTd flex">
                                    <div class="px-3 py-29px w-50%">
                                        <span class="px-3">包你哭</span>
                                    </div>
                                    <div class="px-3 py-29px w-50%">
                                        <span class="topPatch px-3"
                                            >2025-01-21</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div>
                    <h1 class="m-0 mb-2 text-center font-size-33px md-font-size-48px pushSlogan color-#fff">
                        我們將成為您
                    </h1>
                    <h1 class="m-0 mb-8 text-center font-size-33px md-font-size-48px slogan">
                        『業務成長的助推器』
                    </h1>
                    <h3 class="m-0 font-size-14px md-font-size-26px text-center subSlogan">
                        以專注於解決商家在市場中遇到的曝光和客戶開發問題
                    </h3>
                    <h3 class="m-0 font-size-14px md-font-size-26px text-center subSlogan">
                        並結合行業創新的C2B2C模式、記帳以及實名制系統，為您提供全面支持
                    </h3>
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
                <div v-for="(item, index) in advantagesList"
                     :key="index"
                     class="md-flex adBox"
                     :class="{ advantagesEven: index % 2 !== 0 }">
                    <div class="w-100% lg-w-50% md-mb-0rem mb-2rem">
                        <div class="ps-5 pe-5 flex items-center">
                            <img class="w-100%"
                                 :src="item.img"
                                 :alt="item.title" />
                        </div>
                    </div>
                    <div class="adContentBox w-100% lg-w-50% flex items-center">
                        <div class="lg-ms-5 lg-me-5">
                            <div class="mb-2rem md-block flex justify-center">
                                <img class="w-70px"
                                     :src="item.icon"
                                     :alt="item.detail" />
                            </div>
                            <div class="mb-1rem md-mb-1.5rem md-block flex justify-center">
                                <span class="adTitle">{{ item.title }}</span>
                            </div>
                            <div class="mb-2rem md-mb-1rem md-block flex justify-center">
                                <span class="adContent">{{ item.detail }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="pb-7rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex items-center justify-center mb-3rem">
                    <div class="titleLeftBorder"></div>
                    <span class="hotTitle">方案</span>
                    <span class="gameTitle">費用</span>
                    <div class="titleRightBorder"></div>
                </div>
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
                <div class="flex justify-center pt-3 pb-3 mt-10">
                    <div class="moreBtnBox">
                        <NuxtLink
                            class="moreBtn color-#fff font-size-22px decoration-none"
                            to="/store/program"
                            >了解更多</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </div> -->
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
                            <input class="contactEntry"
                                   placeholder="姓名"
                                   type="text"
                                   v-model="contactName" />
                        </div>
                        <div class="relative mb-1rem">
                            <input class="contactEntry"
                                   placeholder="手機號碼"
                                   :class="{ 'error-input': isPhoneError }"
                                   type="text"
                                   v-model="contactPhone" />
                            <div v-show="isPhoneError"
                                 class="absolute right-5px top-12px">
                                <img class="w-30px"
                                     src="/images/icon-alert.png"
                                     alt="警示的圖" />
                            </div>
                            <div v-show="isPhoneError">
                                <p class="m-0 fw-600 color-#ff2400">
                                    請輸入正確手機格式，共10碼
                                </p>
                            </div>
                        </div>

                        <div class="mb-1rem">
                            <input class="contactEntry"
                                   placeholder="Email"
                                   type="text"
                                   v-model="contactMail" />
                        </div>
                        <div class="mb-1rem">
                            <div class="contactEntry purposeSelect relative"
                                 @click.stop="togglePurposeBox">
                                <span>{{ selectedPurpose || "主旨 ..." }}</span>
                                <div class="purposeBox"
                                     v-show="showPurposeBox">
                                    <div class="purposeBoxContent">
                                        <div class="relative w-100% purposeOption"
                                             v-for="(
                                                option, index
                                            ) in purposeOptions"
                                             :key="option"
                                             @click.stop="selectPurpose(option)">
                                            {{ option }}
                                            <div v-show="index === 0"
                                                 class="absolute top-15px right-15px">
                                                <img class="w-15px"
                                                     src="/images/icon-arrow-down-03.png"
                                                     alt="下拉選單箭頭" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute top-15px right-15px">
                                    <img class="w-15px"
                                         src="/images/icon-arrow-down-02.png"
                                         alt="下拉選單箭頭" />
                                </div>
                            </div>
                        </div>
                        <div class="mb-1rem">
                            <textarea class="contactEntryArea"
                                      placeholder="留言 (請輸入100字以內的訊息)"
                                      cols="30"
                                      rows="10"
                                      maxlength="100"
                                      v-model="contactContent"></textarea>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="w-60% me-1rem relative">
                                <input class="contactCap"
                                       :class="{ 'error-input': isCapError }"
                                       placeholder="輸入驗證碼"
                                       type="text"
                                       v-model="contactCap" />
                                <div v-show="isCapError"
                                     class="absolute right-5px top-12px">
                                    <img class="w-30px"
                                         src="/images/icon-alert.png"
                                         alt="警示的圖" />
                                </div>
                            </div>
                            <div class="w-200px flex">
                                <div id="captchaContainer"
                                     class="w-100% h-51px me-.5rem"></div>
                                <div @click="refreshCaptcha"
                                     class="refreshBtn flex items-center">
                                    <img class="w-35px"
                                         src="/images/icon-refresh.png"
                                         alt="重整的圖" />
                                </div>
                            </div>
                        </div>
                        <div class="mb-1rem"
                             v-show="isCapError">
                            <p class="m-0 fw-600 color-#ff2400">
                                請輸入正確的驗證碼
                            </p>
                        </div>
                        <div class="flex justify-center pt-3 mt-4">
                            <div class="moreBtnBox">
                                <button class="moreBtn color-#fff font-size-22px decoration-none"
                                        to="/gamelist"
                                        @click="sendForm">
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
import { Bar } from 'vue-chartjs';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// 註冊 Chart.js 所需的模組
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { useTransition } from '@vueuse/core';
import { useLoadStore } from '../stores/loading.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
import useCaptcha from '~/composables/captcha';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const store = useLoadStore();
const { GVerify } = useCaptcha();
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const setPageLoading = store.setPageLoading;
const userToken = useCookie('_PmToken');
let captcha = null;

const source1 = ref(0);
const source2 = ref(0);
const source3 = ref(0);
const dailyPatchList0 = ref([]);
const dailyPatchList1 = ref([]);
const dailyPatchLists = [dailyPatchList0, dailyPatchList1];
// 用來控制每個對話框的開關狀態
const dialogVisible = ref([false, false]);

const contactName = ref('');
const contactPhone = ref('');
const contactMail = ref('');
const contactContent = ref('');
const contactCap = ref('');
const showPurposeBox = ref(false);
const selectedPurpose = ref('');
const purposeOptions = ref(['主旨 ...', '商務洽談', '合作邀請', '網站使用問題', '其他']);
const isCapError = ref(false);
const isPhoneError = ref(false);
// 開啟指定的對話框
function openDialog(index) {
    dialogVisible.value[index] = true;
}

const matchValue1 = useTransition(source1, {
    duration: 1500
});
source1.value = 1000000;
const matchValue2 = useTransition(source2, {
    duration: 1500
});
source2.value = 130;
const matchValue3 = useTransition(source3, {
    duration: 1500
});
source3.value = 30000;

// 優勢列表
const advantagesList = [
    {
        title: '記帳、媒合、實名驗證一步到位',
        detail: '一站式財務處理系統，幫助媒合商簡化記錄和計算的流程，利用我們的系統來自動組建媒合的狀況，讓媒合結果一目了然',
        img: '/images/advantages3.png',
        icon: '/images/adIcon-03.png'
    },
    {
        title: '專業的實名制認證',
        detail: '我們與各大銀行以及電信商合作，能夠用客戶提供的資料來驗證此人的電話或者銀行帳戶是否正確，大大降低媒合商的交易風險',
        img: '/images/advantages2.png',
        icon: '/images/adIcon-02.png'
    },
    {
        title: '整合您的客戶資料',
        detail: '還在煩惱客戶的資料太多太雜嗎?我們提供了專業的整合服務，將您的客戶資料整理到一起，讓您在查詢後夠快速地了解客戶的狀況，節省你交易的時間。',
        img: '/images/advantages1.png',
        icon: '/images/adIcon-01.png'
    },
    {
        title: '交易的守護者',
        detail: '提供時時監控的服務，當此客戶的身分有疑慮時，將立即提出警告，保障交易您的安全，防範欺詐風險，讓交易更安心。',
        img: '/images/advantages4.png',
        icon: '/images/adIcon-04.png'
    }
];
const programList = [
    {
        title: '入門版',
        price: '1,299',
        detail: [
            '無成交手續費',
            '可開通3個銷售管道',
            '推薦分潤行銷',
            '會員分級',
            '訊息管理中心',
            '3管理員帳號',
            '5應用擴充'
        ],
        className: 'programStart'
    },
    {
        title: '專業版',
        price: '2,899',
        detail: [
            '無成交手續費',
            '可開通10個銷售管道',
            '推薦分潤行銷',
            '會員分級',
            '訊息管理中心',
            '進階促銷優惠工具',
            '群發行銷訊息',
            '行銷預測功能',
            '10管理員帳號',
            '25應用擴充'
        ],
        className: 'programPro'
    },
    {
        title: '企業版',
        price: '6,999',
        detail: [
            '無成交手續費',
            '可開通30個銷售管道',
            '推薦分潤行銷',
            '會員分級',
            '訊息管理中心',
            '進階促銷優惠工具',
            '群發行銷訊息',
            '行銷預測功能',
            '20管理員帳號',
            '35應用擴充'
        ],
        className: 'programEnterprise'
    }
];
// 為完整版圖表準備數據
const chartDataComputed = computed(() => {
    return dialogVisible.value.map((_, index) => getChartData(index));
});
// 為簡化版圖表準備數據
const simpleChartData = computed(() => {
    // 假設這裡使用 endDate 的數據
    const { EndTime } = calculateWeekRange();
    let endDateData = dailyPatchList0.value.filter(item => item.Time.split('T')[0] === EndTime);
    // 如果沒有找到數據，則取最後最多5筆數據
    if (endDateData.length === 0) {
        const totalRecords = dailyPatchList0.value.length;
        const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
        endDateData = dailyPatchList0.value.slice(-recordsToTake);
    }
    return getSimpleChartData(endDateData);
});
// 為簡化版圖表準備數據
const simpleChartData1 = computed(() => {
    // 假設這裡使用 endDate 的數據
    const { EndTime } = calculateWeekRange();
    let endDateData = dailyPatchList1.value.filter(item => item.Time.split('T')[0] === EndTime);
    // 如果沒有找到數據，則取最後最多5筆數據
    if (endDateData.length === 0) {
        const totalRecords = dailyPatchList1.value.length;
        const recordsToTake = Math.min(5, totalRecords); // 如果總數據少於5筆，就取全部
        endDateData = dailyPatchList1.value.slice(-recordsToTake);
    }
    return getSimpleChartData(endDateData);
});
// 修改 getChartData 函數
const getChartData = index => {
    // 先確保 dailyPatchLists[index] 存在
    if (!dailyPatchLists[index]) {
        console.log(`索引 ${index} 的資料清單不存在`);
        return getEmptyChartData();
    }

    // 確保 .value 有值且是陣列
    const dataList = dailyPatchLists[index].value;
    console.log('當前資料:', dataList);

    if (!Array.isArray(dataList) || dataList.length === 0) {
        console.log(`資料清單為空或無效：Index ${index}`);
        return getEmptyChartData();
    }

    // 確保每個項目都有需要的屬性
    if (!dataList.every(item => item && item.Time !== undefined && item.Total !== undefined)) {
        console.log('資料結構不完整');
        return getEmptyChartData();
    }

    // 正常生成圖表資料
    return {
        labels: dataList.map(item => formatDate(item.Time)),
        datasets: [
            {
                label: '',
                data: dataList.map(item => item.Total),
                backgroundColor: 'rgb(90,155,213)',
                borderColor: '#36A2EB',
                tension: 0.4,
                fill: false,
                borderWidth: 2
            }
        ]
    };
};
// 輔助函數：格式化日期
function formatDate(timeString) {
    const date = new Date(timeString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
}
// 輔助函數：取得空的圖表資料
function getEmptyChartData() {
    return {
        labels: ['沒有資料'],
        datasets: [
            {
                label: '',
                data: [0],
                backgroundColor: 'rgb(90,155,213)',
                borderColor: '#36A2EB',
                tension: 0.4,
                fill: false,
                borderWidth: 2
            }
        ]
    };
}
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top'
        },
        tooltip: {
            enabled: false // 禁用提示框
        },
        title: {
            display: true,
            text: context => {
                // 獲取當前圖表的索引
                const chartId = context.chart.canvas.id;
                const index = parseInt(chartId.split('-')[2]); // 從 'my-chart-0' 取得索引
                return index === 0
                    ? '滿貫大亨 - 近五日富豪榜財產走勢'
                    : '老子有錢 - 近五日富豪榜財產走勢';
            },
            font: {
                size: 24 // 設置字體大小為 24px
            },
            padding: {
                bottom: 10 // 設置下方間距為 10px
            }
        }
    },
    scales: {
        y: {
            display: true,
            stacked: false,
            position: 'left',
            ticks: {
                display: false
            }
        },
        x: {
            display: false,
            ticks: {
                maxRotation: 45,
                minRotation: 45
            },
            grid: {
                display: true
            }
        }
    }
};
// 計算日期
const calculateWeekRange = () => {
    const today = new Date(); // 取得今天的日期
    const dayOfWeek = today.getDay(); // 取得今天是星期幾 (0:週日, 1:週一, ..., 6:週六)

    // 初始化範圍日期
    let startDate = new Date(today);
    let endDate = new Date(today);

    if (dayOfWeek === 0) {
        // 如果今天是禮拜日，抓上上週的禮拜日到上週的禮拜六
        startDate.setDate(today.getDate() - 13); // 上上週禮拜一
        endDate.setDate(today.getDate() - 7); // 上週禮拜日
    } else {
        // 其他情況，抓上週的禮拜一到禮拜日
        startDate.setDate(today.getDate() - dayOfWeek - 6); // 上週禮拜一
        endDate.setDate(today.getDate() - dayOfWeek); // 上週禮拜日
    }

    // 格式化日期為 "YYYY-MM-DD"
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return {
        StartTime: formatDate(startDate),
        EndTime: formatDate(endDate)
    };
};
// 簡化版折線圖的數據生成函數
const getSimpleChartData = data => {
    if (!Array.isArray(data) || data.length === 0) {
        return getEmptySimpleChartData();
    }

    return {
        labels: data.map(item => formatDate(item.Time)),
        datasets: [
            {
                data: data.map(item => item.Total),
                borderColor: '#36A2EB',
                tension: 0.4,
                fill: false,
                type: 'line',
                pointRadius: 3, // 外圈大小
                pointBackgroundColor: '#36A2EB', // 點的背景色（白色）
                pointBorderColor: '#fff', // 點的邊框色（藍色）
                pointBorderWidth: 2 // 點的邊框寬度
            }
        ]
    };
};

// 簡化版空數據
function getEmptySimpleChartData() {
    return {
        labels: ['沒有資料'],
        datasets: [
            {
                data: [0],
                borderColor: '#36A2EB',
                tension: 0.4,
                fill: false,
                type: 'line',
                pointRadius: 0, // 隱藏數據點
                pointRadius: 3, // 外圈大小
                pointBackgroundColor: '#36A2EB', // 點的背景色（白色）
                pointBorderColor: '#fff', // 點的邊框色（藍色）
                pointBorderWidth: 2 // 點的邊框寬度
            }
        ]
    };
}

// 簡化版圖表配置
const simpleChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false // 隱藏圖例
        },
        title: {
            display: false // 隱藏標題
        },
        tooltip: {
            enabled: false // 禁用提示框
        }
    },
    scales: {
        y: {
            display: false // 隱藏Y軸
        },
        x: {
            display: false // 隱藏X軸
        }
    },
    elements: {
        point: {
            radius: 0 // 隱藏數據點
        }
    }
};
// 取得富豪榜
async function fetchRichList(token, type) {
    if (token === '') {
        token = await jwtStore.generateToken();
    }
    const { StartTime, EndTime } = calculateWeekRange();
    const useStartTime = StartTime;
    const useEndTime = EndTime;
    try {
        const response = await $axios.post(
            '/api/v1/Statist/GetDailyPatchList',
            {
                GamePlatformType: type, // 1錢街, 2滿貫, 3包你發, 4老子有錢, 5聚寶, 6金爸爸,
                StartTime: useStartTime,
                EndTime: useEndTime
            },
            {
                headers: {
                    Authorization: token // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            if (type === 2) {
                dailyPatchList0.value = response.data.Data;
            } else if (type === 4) {
                dailyPatchList1.value = response.data.Data;
            }
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
// 切換下拉選單的顯示/隱藏
const togglePurposeBox = () => {
    showPurposeBox.value = !showPurposeBox.value;
    // 選單開啟時添加全域點擊監聽
    if (showPurposeBox.value) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
};
const handleClickOutside = event => {
    const dropdown = document.querySelector('.purposeBox');
    if (dropdown && !dropdown.contains(event.target)) {
        showPurposeBox.value = false;
    }
};
const selectPurpose = item => {
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
        await openAlertModal(' ', '請輸入姓名', 'ContactUsNullOfName');
        return;
    }
    if (!validatePhone() && !validateCaptcha()) {
        await openAlertModal(' ', '請輸入正確的手機號碼及驗證碼', 'ContactUsErrorOfPhone');
        return;
    }
    if (!validatePhone()) {
        await openAlertModal(' ', '手機號碼必須是 09 開頭且為 10 碼');
        return;
    }
    if (!contactMail.value) {
        await openAlertModal(' ', '請輸入Email', 'ContactUsNullOfEmail');
        return;
    }
    if (selectedPurpose.value === '主旨 ...' || !selectedPurpose.value) {
        await openAlertModal(' ', '請先選擇主旨內容', 'ContactUsNullOfTitle');
        return;
    }
    if (!contactContent.value) {
        await openAlertModal(' ', '請輸入留言內容', 'ContactUsNullOfContent');
        return;
    }
    if (!validateCaptcha()) {
        await openAlertModal(' ', '請輸入正確的驗證碼');
        return;
    }
    await sendMail();
}
// 聯絡我們
async function sendMail() {
    const token = await jwtStore.generateToken();
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/SendEmail',
            {
                Name: contactName.value,
                MobileNumber: contactPhone.value,
                Email: contactMail.value,
                Subject: selectedPurpose.value,
                Content: contactContent.value
            },
            {
                headers: {
                    Authorization: token // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            await openAlertModal(' ', '已成功寄信完成，將有專員回覆您 !', 'sendContact');
            window.location.reload();
        } else {
            await openAlertModal(' ', `${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
}
onMounted(async () => {
    await setPageLoading(true);
    try {
        captcha = new GVerify({ id: 'captchaContainer' }); // 初始化畫布驗證碼
        if (userToken.value != '' && userToken.value != undefined) {
            const token = userToken.value;

            if (token != '') {
                await fetchRichList(token, 2);
                await fetchRichList(token, 4);
            }
        } else {
            // 生成新的 token
            const token = await jwtStore.generateToken();
            if (token != '') {
                await fetchRichList(token, 2);
                await fetchRichList(token, 4);
            }
        }
    } catch (error) {
        console.error('頁面初始化失敗:', error);
    } finally {
        await setPageLoading(false);
    }
});
</script>

<style scoped>
.storeBac {
    background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    padding: 2px;
    background: linear-gradient(to bottom, #fff, #7b2cbf);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%) 1;
}
.tableTd {
    padding: 1rem 0;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #4361ee 0%, #fff 50%, #4361ee 100%) 1;
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #43a5ee, #fff);
    mask-image: linear-gradient(to right, black 10px, transparent 10px, transparent 20px);
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
    content: '';
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
    padding: 1px;
    background: linear-gradient(to right, #7b2cbf, rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
}
.moreBtn {
    padding: 1rem 2rem;
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #43edff, #fff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}
.contactEntry {
    color: #fff;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
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
    background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
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
    background: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
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
