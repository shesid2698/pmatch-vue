<template>
    <div class="storeBac">
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
                <div class="mb-3">
                    <h1
                        class="m-0 mb-2 text-center font-size-33px md-font-size-44px slogan"
                    >
                        PMatch是你事業上的全能助手 !
                    </h1>
                    <h3
                        class="m-0 font-size-14px md-font-size-22px text-center subSlogan"
                    >
                        讓你的廣告被看見，讓對的人找到你，還能輕鬆的記帳與報稅
                    </h3>
                </div>
            </div>
        </div>
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex">
                    <div class="w-100%">
                        <div class="matchBox">
                            <div class="matchContent">
                                <div class="flex justify-center pb-3">
                                    <el-statistic :value="matchValue1" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        已經促成"百萬筆"
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
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
                                    <el-statistic :value="matchValue2" />
                                    <span class="plus">+</span>
                                </div>
                                <div class="matchDetail">
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        已協助"130+"媒合商
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center w-100%"
                                    >
                                        完成報稅
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
                                    <span
                                        class="m-0 md-block inline color-#fff text-center md-w-100%"
                                    >
                                        已成功協助"100+"
                                    </span>
                                    <span
                                        class="m-0 md-block inline color-#fff text-center md-w-100%"
                                    >
                                        媒合商轉型成功
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div class="flex justify-center">
                    <div class="w-90%">
                        <div class="flex tableTh">
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲平台
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣數量
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣走向
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div
                                class="w-100% platformName font-size-1.5rem text-center color-#beffff"
                            >
                                老子有錢
                            </div>
                            <div
                                class="w-100% patchNumber font-size-1.5rem text-center color-#beffff"
                            >
                                13000
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣走向
                            </div>
                        </div>
                        <div class="flex tableTd">
                            <div
                                class="w-100% platformName font-size-1.5rem text-center color-#beffff"
                            >
                                滿貫大亨
                            </div>
                            <div
                                class="w-100% patchNumber font-size-1.5rem text-center color-#beffff"
                            >
                                13000
                            </div>
                            <div
                                class="w-100% font-size-1.2rem text-center color-#beffff"
                            >
                                遊戲幣走向
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-5rem">
            <div class="max-w-1110px m-auto ps-5 pe-5 relative z-2">
                <div>
                    <div>
                        <div><span class="hotTitle">熱門</span><span class="gameTitle">遊戲</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useTransition } from "@vueuse/core";
const source1 = ref(0);
const source2 = ref(0);
const source3 = ref(0);
const matchValue1 = useTransition(source1, {
    duration: 1500,
});
source1.value = 1000000;
const matchValue2 = useTransition(source2, {
    duration: 1500,
});
source2.value = 130;
const matchValue3 = useTransition(source3, {
    duration: 1500,
});
source3.value = 100;
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
}

.matchBox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    padding: 2px; /* 控制邊框寬度 */
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
</style>