<template>
    <div
        class="flex items-center mb-2rem pb-2rem"
        v-for="(item, index) in matchStore"
        :key="index"
    >
        <div class="flex justify-start md-mb-0 mb-5">
            <img class="w-200px" :src="item.img" :alt="item.title" />
        </div>
        <div class="ms-2rem">
            <div class="mb-3">
                <span class="font-size-1.2rem fw-600">商店名稱 : </span>
                <span class="font-size-1.2rem fw-600">{{ item.title }}</span>
            </div>
            <div class="mb-2">
                <span class="fw-600">遊戲平台 : </span>
                <span>{{ item.platform }}</span>
            </div>
            <div class="mb-2">
                <span class="fw-600">商店簡介 : </span>
                <span>{{ item.description }}</span>
            </div>
            <div class="flex items-center">
                <span class="fw-600">聯絡方式 : </span>
                <div class="ms-2" v-for="(it, i) in item.contact" :key="i">
                    <img class="w-30px" :src="it.contactImg" alt="" />
                </div>
            </div>
        </div>
    </div>
    <div>
        <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-click="handleClick"
        >
            <el-tab-pane
                :label="it.platform"
                name="first"
                v-for="it in matchStore"
                :key="it.key"
            >
                <div class="b-solid border-1 p-5 b-#212529">
                    <p
                        class="m-0 mb-4 mt-4"
                        v-for="i in it.introduce"
                        :key="i.key"
                    >
                        {{ i }}
                    </p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="問與答" name="second">
                <div
                    class="b-solid border-1 b-#212529"
                    v-for="it in matchStore"
                    :key="it.key"
                >
                    <div class="p-5">
                        <p>尚未有提問資料...</p>
                    </div>
                    <div class="p-5 bg-#ccc">
                        <p class="m-0 mb-1rem">我要提問</p>
                        <textarea class="w-100% h-5rem p-0 mb-1rem"></textarea>
                        <div class="w-100% flex justify-end">
                            <button
                                class="w-200px h-38px bg-#1A6DB4 color-#fff border-none fw-bold font-size-1rem"
                            >
                                送出
                            </button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref } from "vue";

const activeName = ref("first");

const handleClick = (tab, event) => {
    console.log(tab, event);
};

const matchStore = {
    pokemonBank: {
        id: "0",
        title: "寶可夢銀行",
        img: "../images/pokemonBank.jpg",
        platform: "滿貫大亨",
        description:
            "信用第一☆老字號品牌☆24H服務☆絕無分身☆轉帳超商皆可☎電話：0979-880-818 ☆LINE ID：gobank168",
        contact: [
            {
                contactImg: "../images/facebook.png",
                contactLink: "",
            },
            {
                contactImg: "../images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "../images/line.png",
                contactLink: "",
            },
        ],
        introduce: [
            "四大超商✓轉帳✓皆可☞全年無休 ☞24H在線服務",
            "ღ 委賣 1:1.5 ღ 委買 1:1.35 ღ",
            "詢問交流+LINE ID：gobank168",
        ],
        qrcode: "",
    },
};
</script>

<style scoped>
</style>