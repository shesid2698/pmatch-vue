<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-between">
            <!-- title -->
            <div class="flex items-center">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">委託媒合</span>
            </div>
            <!-- 麵包屑 (新版目前沒有 先不刪以防後續需要) -->
            <!-- <div>
                <ElBreadcrumb :separator-icon="ArrowRight">
                    <ElBreadcrumbItem :to="{ path: '/' }"
                        >首頁</ElBreadcrumbItem
                    >
                    <ElBreadcrumbItem> 找媒合 </ElBreadcrumbItem>
                </ElBreadcrumb>
            </div> -->
        </div>
        <!-- 搜尋列 -->
        <div class="mb-6 md-flex block items-center">
            <div class="flex items-center">
                <div class="flex items-center w-100%">
                    <div class="w-100%">
                        <select
                            class="platformName md-w-270px w-100% h-43px font-size-1rem b-#a9d8f8 rounded-5px p-5px"
                            v-model="selectedPlatform"
                        >
                            <option value="">選擇遊戲...</option>
                            <option value="滿貫大亨">滿貫大亨</option>
                            <option value="錢街Online">錢街Online</option>
                            <option value="包你發娛樂城">包你發娛樂城</option>
                        </select>
                    </div>
                </div>
                <div class="md-ms-3 md-mt-0 mt-3 flex w-100%">
                    <div class="flex items-center w-100%">
                        <div class="flex w-100%">
                            <div class="w-100%">
                                <input
                                    v-model="searchQuery"
                                    class="storeName md-ms-3 w-100% md-w-270px h-36px p-0 rounded-5px font-size-1rem p-3px"
                                    type="text"
                                    placeholder="輸入關鍵字..."
                                />
                            </div>
                            <div class="relative">
                                <button
                                    class="h-38px border-none searchBtn absolute top-4px right-0"
                                >
                                    <svg
                                        class="w-23px searchIcon"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 512 512"
                                        enable-background="new 0 0 512 512"
                                        xml:space="preserve"
                                        fill="#50B0FF"
                                    >
                                        <path
                                            d="M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
	c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
	 M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
	c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100% md-ms-3 flex items-center">
                    <input type="checkbox" class="w-20px h-20px" />
                    <span>查看已簽約媒合商</span>
                </div>
            </div>
        </div>
        <!-- 各媒合商 -->
        <div class="flex relative w-100%">
            <div class="w-75% overflow-y-auto">
                <div class="storeTitle flex bg-#D5ECFF pt-2 pb-2">
                    <div class="w-75% text-center mainContent">
                        <span>商家資訊</span>
                    </div>
                    <div class="w-25% text-center">
                        <span>簽約狀況</span>
                    </div>
                </div>

                <div
                    class="storeDetail flex border-b b-b-solid b-#D5ECFF"
                    v-for="(item, index) in filteredStores"
                    :key="index"
                >
                    <NuxtLink
                        :to="item.link"
                        class="decoration-none color-#000 w-75%"
                    >
                        <div class="">
                            <div class="md-flex block items-center p-3">
                                <div class="flex justify-start md-mb-0 mb-5">
                                    <img
                                        class="storeImg w-130px"
                                        :src="item.img"
                                        :alt="item.title"
                                    />
                                </div>
                                <div class="md-ms-2rem ms-0">
                                    <div class="mb-3">
                                        <span class="fw-600 color-#496BBB">{{
                                            item.title
                                        }}</span>
                                    </div>
                                    <div class="mb-2">
                                        <span>遊戲平台 : </span>
                                        <span>{{ item.platform }}</span>
                                    </div>
                                    <div class="mb-2">
                                        <span>商店簡介 : </span>
                                        <span>{{ item.description }}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span>聯絡方式 : </span>
                                        <div
                                            class="ms-2"
                                            v-for="(it, i) in item.contact"
                                            :key="i"
                                        >
                                            <img
                                                class="w-23px"
                                                :src="it.contactImg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                    <div class="w-25% flex justify-center items-center">
                        <el-button
                            class="border-none color-#aaa w-95px h-40px rounded-5px"
                            plain
                            @click="item.dialogVisible = true"
                        >
                            檢視合約
                        </el-button>
                        <el-dialog
                            v-model="item.dialogVisible"
                            title="合約服務條款"
                            width="500"
                            :close-on-click-modal="false"
                        >
                            <div v-html="item.contract"></div>
                            <template #footer>
                                <div class="dialog-footer">
                                    <el-button @click="item.dialogVisible = false"
                                        >取消</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        @click="item.dialogVisible = false"
                                    >
                                        同意
                                    </el-button>
                                </div>
                            </template>
                        </el-dialog>
                    </div>
                </div>
            </div>
            <div class="sideBar">
                <div class="mb-5">
                    <div
                        class="bg-#50b0ff flex justify-center pt-2 pb-2 totalMatchNumber"
                    >
                        <span class="color-#fff fw-600">累計委託媒合筆數</span>
                    </div>
                    <div
                        class="flex justify-center pt-2 pb-2 border-solid b-1px b-#50b0ff matchNumber"
                    >
                        <div>
                            <span>0</span>
                            <span>筆</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center mb-3">
                        <img
                            class="w-20px h-20px"
                            src="/images/weekRanking.png"
                            alt="週排行icon"
                        />
                        <span class="fw-600 ms-3">週媒合排行榜</span>
                    </div>
                    <div class="mb-5">
                        <div
                            class="bg-#d5ecff flex justify-center pt-2 pb-2 totalMatchNumber flex justify-around"
                        >
                            <div class="flex justify-center w-100%">
                                <span class="fw-600">遊戲平台</span>
                            </div>
                            <div class="flex justify-center w-100%">
                                <span class="fw-600">媒合活躍度</span>
                            </div>
                        </div>
                    </div>
                    <!-- 點卡先關 後面有要再開 -->
                    <!-- <div class="border-solid b-1px p-3 rounded-5px b-#ccc">
                        <div
                            class="flex items-center mb-3 border-b-solid b-1px b-#ccc pb-3"
                        >
                            <img
                                class="w-20px h-20px"
                                src="/images/sellHot.png"
                                alt="週排行icon"
                            />
                            <span class="fw-600 ms-3">週媒合排行榜</span>
                        </div>
                        <div class="flex overflow-x-auto">
                            <div
                                class="m-3"
                                v-for="item of mycard"
                                :key="item.key"
                            >
                                <div>
                                    <img
                                        class="w-110px"
                                        :src="item.img"
                                        alt=""
                                    />
                                </div>
                                <div class="mt-3 mb-3">
                                    <button class="joinCartBtn">
                                        加入購物車
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入的東西
import { ArrowRight } from "@element-plus/icons-vue";
import { ElBreadcrumb } from "element-plus";
import { ElBreadcrumbItem } from "element-plus";
import { ElMessageBox } from "element-plus";



// 媒合商資料
const matchStore = {
    pokemonBank: {
        id: "0",
        title: "【寶可夢銀行】",
        img: "./images/pokemonBank.jpg",
        link: "/findmatch/pokemonBank",
        platform: "滿貫大亨",
        description:
            "信用第一☆老字號品牌☆24H服務☆絕無分身☆轉帳超商皆可☎電話：0979-880-818 ☆LINE ID：gobank168",
        contract: "寶可夢銀行合約內容",
        contact: [
            {
                contactImg: "./images/facebook.png",
                contactLink: "",
            },
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
    asaliGoldFlow: {
        id: "1",
        title: "阿莎力金流#8500",
        img: "./images/asaliGoldFlow.jpg",
        link: "/findmatch/asaliGoldFlow",
        platform: "錢街Online",
        description: "阿莎力金流#8500 LINE：jiau777 百大富豪,信用滿分",
        contract: "阿莎力金流#8500合約內容",
        contact: [
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
        ],
    },
    goodMongKokBank: {
        id: "2",
        title: "好旺角銀行",
        img: "./images/goodMongKokBank.png",
        link: "/findmatch/goodMongKokBank",
        platform: "包你發娛樂城",
        description:
            "☄包你發娛樂城最優質商家☄好旺角銀行小姐姐等你☄LINE:0901288196",
        contract: "好旺角銀行合約內容",
        contact: [
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
    grandSlamMoney: {
        id: "3",
        title: "滿貫金流",
        img: "./images/grandSlamMoney.jpg",
        link: "/findmatch/grandSlamMoney",
        platform: "滿貫大亨",
        description: "☆信用第一，交流首選☆請認明滿貫金流~♥",
        contract: "滿貫金流合約內容",
        contact: [
            {
                contactImg: "./images/instagram.png",
                contactLink: "",
            },
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
    grandSlamMqqoney: {
        id: "4",
        title: "滿貫金流",
        img: "./images/grandSlamMoney.jpg",
        link: "/findmatch/grandSlamMoney",
        platform: "滿貫大亨",
        description: "☆信用第一，交流首選☆請認明滿貫金流~♥",
        contract: "滿貫金流合約",
        contact: [
            {
                contactImg: "./images/instagram.png",
                contactLink: "",
            },
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
    grandSlamModdney: {
        id: "5",
        title: "滿貫金流",
        img: "./images/grandSlamMoney.jpg",
        link: "/findmatch/grandSlamMoney",
        platform: "滿貫大亨",
        description: "☆信用第一，交流首選☆請認明滿貫金流~♥",
        contract: "",
        contact: [
            {
                contactImg: "./images/instagram.png",
                contactLink: "",
            },
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
    grandSlasmMoney: {
        id: "6",
        title: "滿貫金流",
        img: "./images/grandSlamMoney.jpg",
        link: "/findmatch/grandSlamMoney",
        platform: "滿貫大亨",
        description: "☆信用第一，交流首選☆請認明滿貫金流~♥",
        contract:
            "合約締約方：<br/>本合約由以下雙方締結：<br/>甲方：[你的姓名/公司名稱]，以下簡稱「甲方」。<br/>乙方：[對方姓名/公司名稱]，以下簡稱「乙方」。合約內容：0503改版<br/>身份信息：<br/>甲方身份信息：<br/>姓名/公司名稱：<br/>地址：<br/>電話：<br/>電子郵件：<br/>乙方身份信息：<br/>姓名/公司名稱：<br/>地址：<br/>電話：<br/>電子郵件：<br/>網站公約：甲方在購買產品/服務時，應遵守網站的相關公約和規定。乙方作為賣方，有權根據網站公約執行和管理交易。<br/>其他條款：本合約經雙方同意後生效，自簽署之日起生效。合約一經簽署，雙方應按照合約規定履行各自的義務。<br/>簽署：",
        contact: [
            {
                contactImg: "./images/instagram.png",
                contactLink: "",
            },
            {
                contactImg: "./images/phonecall.png",
                contactLink: "",
            },
            {
                contactImg: "./images/line.png",
                contactLink: "",
            },
        ],
    },
};

const dialogVisible = ref(false);
// 搜尋及下拉選單篩選
const stores = ref(Object.values(matchStore).map(store => ({
    ...store,
    dialogVisible: false,  // 初始化每個商店的彈窗狀態
})));
const searchQuery = ref("");
const selectedPlatform = ref("");

const filteredStores = computed(() => {
    let filtered = stores.value;;
    if (searchQuery.value) {
        const Query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((stores) =>
            stores.title.toLowerCase().includes(Query)
        );
    }
    if (selectedPlatform.value) {
        filtered = filtered.filter(
            (stores) => stores.platform === selectedPlatform.value
        );
    }
    return filtered;
});

// mycard資料
const mycard = [
    {
        img: "./images/mycard50.jpg",
    },
    {
        img: "./images/mycard500.jpg",
    },
    {
        img: "./images/mycard1000.jpg",
    },
    {
        img: "./images/mycard5000.png",
    },
    {
        img: "./images/mycard10000.jpg",
    },
];
</script>

<style scoped>
/* 搜尋欄位樣式 */
.platformName:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.storeName {
    border: 1px solid #a9d8f8;
}
.storeName:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.searchBtn {
    background-color: rgba(0, 0, 0, 0);
}
.searchBtn:hover .searchIcon {
    opacity: 0.8;
}
:deep(.el-icon) {
    z-index: -1;
}
/* 商家資訊 */
.storeTitle {
    border-radius: 10px 10px 0 0;
}
.storeDetail:hover {
    background-color: #f2f9fd;
}
.storeImg {
    border: 2px solid #f2f9fd;
    border-radius: 1rem;
}
/* 側邊欄 */
.sideBar {
    width: 23%;
    position: fixed;
    top: 0;
    right: 8px;
    margin-top: 14.5rem;
}
.totalMatchNumber {
    border-radius: 5px 5px 0 0;
}
.matchNumber {
    border-radius: 0 0 5px 5px;
}
.joinCartBtn {
    color: #e93470;
    border: 1px solid #e93470;
    border-radius: 5px;
    padding: 0.3rem;
    width: 110px;
    background-color: rgba(0, 0, 0, 0);
}
.joinCartBtn:hover {
    color: #fff;
    background-color: #e93470;
}
:deep(.el-overlay) {
    background-color: rgba(0, 0, 0, 0.1);
}
:deep(.el-dialog) {
    box-shadow: none;
    border-radius: 10px;
}
@media screen and (min-width: 1300px) {
    .sideBar {
        position: absolute;
        margin-top: 0rem;
        top: 0;
        right: 0;
        height: 300px;
    }
}
</style>