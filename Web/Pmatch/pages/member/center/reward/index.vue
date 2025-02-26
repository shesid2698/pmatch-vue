<template>

    <Head>
        <title>PMatch遊戲道具交易平台</title>
        <Meta property="og:title"
              content="PMatch遊戲道具交易平台" />
        <Meta name="keywords"
              content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
        <Meta name="description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
        <Meta property="og:description"
              content="Pmatch遊戲道具交易平台 – 博奕遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    </Head>
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <!-- 內容 -->
        <div class="flex-1 md:pl-20px">
            <div v-if="pageName===''">
                <div>
                    <button class="non-button"
                            @click="SetInnerPage(1)"
                            :class="{'active-button':innerPage==1}">可使用</button>
                    <button class="non-button"
                            @click="SetInnerPage(2)"
                            :class="{'active-button':innerPage==2}">處理中</button>
                    <button class="non-button"
                            @click="SetInnerPage(3)"
                            :class="{'active-button':innerPage==3}">已使用</button>
                    <button class="non-button"
                            @click="SetInnerPage(4)"
                            :class="{'active-button':innerPage==4}">已過期</button>
                </div>
                <div class="ticket-list max-h-624px overflow-auto"
                     @scroll="GetMoreData">
                    <div v-for="item in ticketList"
                         :key="item.ActivityId">
                        <div class="flex ticket-shadow mb-2">
                            <div class="relative w-fit mr-[-2px] h-fit">
                                <div class="absolute w-67%  right-0 top-50% transform-translate-y-[-50%]">
                                    <div class="text-14px md:text-20px text-black mb-1 md:mb-2">{{item.RewardName}}</div>
                                    <div class="text-10px md:text-16px text-black">效期至 {{new Date(item.EndTime).toLocaleString("zh-TW",{
                              year:"numeric",
                              month:"2-digit",
                              day:"2-digit",
                              hour:"2-digit",
                              minute:"2-digit",
                              hour12:false
                            })}}</div>
                                </div>
                                <div class="absolute w-67% bottom-10px right-0 text-end pr-10px text-10px md:text-16px text-black">{{ item.ActivityName }}</div>
                                <img class="left-img"
                                     :src="innerPage !== 4 ? '/images/虛擬獎項-l.svg' : '/images/虛擬獎項-disabled-l.svg'"
                                     alt="" />
                            </div>
                            <!-- <div class="relative w-fit h-fit cursor-pointer"
                             @click="GetCode($event,item.RedeemCode)"></div> -->
                            <div class="relative w-fit h-fit cursor-pointer"
                                 @click="TurnPage('form')">
                                <div class="absolute w-80px bg-[#3dadff] p-2 rounded-1 text-white text-center top-50% left-50% z-9 tips-shadow">複製成功</div>
                                <div class="absolute w-100% h-100% flex items-center justify-center"><span class="text-white text-14px md:text-20px font-600">{{item.RedeemCode.length>0?"複製序號":"兌換"}}</span></div>
                                <img class="right-img"
                                     :src="innerPage !== 4 ? '/images/虛擬獎項-r.svg' : '/images/獎項-disabled-r.svg'"
                                     alt="" />
                            </div>
                        </div>
                        <!-- <div class="flex ticket-shadow mb-2">
                        <div class="relative w-fit mr-[-2px] h-fit">
                            <div class="absolute w-67%  right-0 top-50% transform-translate-y-[-50%]">
                                <div class="text-20px text-black mb-2">發財小金豆 1顆</div>
                                <div class="text-16px text-black">效期至 2025-04-01 11:59</div>
                            </div>
                            <div class="absolute w-67% bottom-10px right-0 text-end pr-10px text-16px text-black">消費抽大獎</div>
                            <img src="/images/實體獎項-l.svg"
                                 alt="">
                        </div>
                        <div class="relative w-fit h-fit">
                            <div class="absolute w-100% h-100% flex items-center justify-center"><span class="text-white text-20px font-600">領獎</span></div>
                            <img src="/images/實體獎項-r.svg"
                                 alt="">
                        </div>
                    </div> -->
                    </div>
                </div>
                <div class="max-h-296px md:w-712px w-352px overflow-auto rule-container">
                    【贈品】規則
                    <br>
                    <br>
                    1. 【贈品兌換】獎項寄送地址以中獎人會員中心之個人資料(姓名、聯絡電話、
                    聯絡地址)為準，因資料不齊全，以致無法寄送獎項，視為自動放棄。
                    <br>
                    <br>
                    2. 【贈品寄送】主辦單位將所有得獎者資料彙整無誤後，以掛號方式預計於7~10
                    寄送獎項(若有異動將另行通知)。
                    <br>
                    <br>
                    3. 【贈品說明】活動網站之贈品圖片為示意圖，僅供參考，贈品則以實品為主，
                    恕不指定顏色及款式、轉讓或要求折換現金或其它商品。
                    <br>
                    <br>
                    4. 主辦單位保留修改活動及獎品等細節之權利。領獎後獎品之使用與維護，主
                    辦單位概不負責。 贈品運送過程中，因非可歸責於主辦單位之事由造成損壞、
                    延遲、錯遞或遺失，主辦單位概不負責。
                    <br>
                    <br>
                    5.申報各類所得，依中華民國稅法規定，獎項金額若超過新台幣1,000元，獎項
                    所得將列入個人年度綜合所得稅申報，故得獎人需提供身份證影本且依規定填寫
                    並繳交相關收據方可領獎。
                    <br>
                    <br>
                    6.本活動網站係為成年人而設，若您同意未成年子女參加本活動，您需陪伴輔導
                    未成年子女閱讀、瞭解抽獎活動辦法及注意事項、抽獎活動個資告知事項等相關
                    規定，您及未成年子女並同意接受本活動相關規定內容及其後修改變更。
                    <br>
                    <br>
                    7.中獎者若為未成年人，須獲得法定代理人(或監護人)同意及代為領取，且應檢
                    附身分證正反面影本(無國民身分證者，須提供戶籍謄本影本(須為3個月內核發
                    之版本)與另附法定代理人(或監護人)之身分證正反面影本，及提出法定代理人
                    (或監護人)同意之證明文件(需簽名或蓋印)。
                    <br>
                    <br>
                    8.本活動未盡事宜，係依中華民國相關法令補充之。
                </div>
            </div>
            <div v-else-if="pageName==='form'"
                 class="w-370px mx-auto">
                <div class="mt-20px h-42px flex justify-between relative"
                     id="progress">
                    <div class="relative h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold">
                        1
                        <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%]">填寫領獎資料</div>
                    </div>
                    <div class="relative h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        2
                        <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">審核中</div>
                    </div>
                    <div class="relative h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        3
                        <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">通過審核</div>
                    </div>
                    <div class="relative h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        4
                        <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">寄送獎項</div>
                    </div>
                </div>
                <div class="mt-55px">
                    <div class="mb-5px">活動名稱</div>
                    <div class="relative">
                        <input type="text"
                               required
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="mb-5px">得獎獎品</div>
                    <div class="relative">
                        <input type="text"
                               required
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="mb-5px">中獎人姓名</div>
                    <div class="relative">
                        <input type="text"
                               required
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>

                <div class="mt-15px">
                    <div class="mb-5px">身分證號碼</div>
                    <div class="relative">
                        <input type="text"
                               required
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                               pattern="[A-Za-z][12]\d{8}"
                               title="請輸入有效的台灣身分證字號" />
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="mb-5px text-[#484646] font-400 text-15px">
                        通訊地址
                    </div>
                    <div class="flex">
                        <div class="w-49%">
                            <select @change="GetRegions(1)"
                                    v-model="selectedCity"
                                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                <option value="">請選擇</option>
                                <option v-for="(item, index) in cities"
                                        :key="index"
                                        :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                        <div class="w-2%"></div>
                        <div class="w-49%">
                            <select v-model="selectedRegion"
                                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                <option value="">請選擇</option>
                                <option v-for="(district, index) in districts"
                                        :key="index"
                                        :value="district">
                                    {{ district }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-5px">
                        <input type="text"
                               v-model="address"
                               class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="mb-5px text-[#484646] font-400 text-15px">
                        戶籍地址
                    </div>
                    <div class="flex">
                        <div class="w-49%">
                            <select @change="GetRegions(2)"
                                    v-model="selectedCity2"
                                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                <option value="">請選擇</option>
                                <option v-for="(item, index) in cities2"
                                        :key="index"
                                        :value="item">
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                        <div class="w-2%"></div>
                        <div class="w-49%">
                            <select v-model="selectedRegion2"
                                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                <option value="">請選擇</option>
                                <option v-for="(district, index) in districts2"
                                        :key="index"
                                        :value="district">
                                    {{ district }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-5px">
                        <input type="text"
                               v-model="address2"
                               class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>
                <div class="mt-15px">
                    <div class="mb-5px">連絡電話</div>
                    <input type="text"
                           required
                           class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                           pattern="\d{10}"
                           title="請輸入10碼數字" />
                </div>
                <div class="mt-15px">
                    <div class="mb-5px">電子信箱</div>
                    <input type="text"
                           required
                           class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                           pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                           title="請輸入有效的電子信箱" />
                </div>
                <div class="mt-15px">
                    <div class="mb-5px">身分證件正面</div>
                    <div class="id-container">
                        <button class="camera-btn">
                            <img src="/images/camera.svg"
                                 alt=""><br>拍照或上傳照片</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 * 0=可使用;1=處理中;2=已使用;3=已過期
 */
const innerPage = ref(1);
const pageName = ref('');
const pageNo = ref(1);
const ticketList = ref([]);
let isGetNewPage = true;
const memberToken = useCookie('_PmToken');
const memberId = useCookie('_PmMemberId');
const { $axios } = useNuxtApp();
const theCities = useGetCities();
const address = ref('');
const cities = ref([]);
const districts = ref([]);
const selectedCity = ref('');
const selectedRegion = ref('');
const address2 = ref('');
const cities2 = ref([]);
const districts2 = ref([]);
const selectedCity2 = ref('');
const selectedRegion2 = ref('');
/**
 * 取得列表
 */
const GetList = async (status, page) => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberRewardList',
            {
                // PmatchMemberId: memberId.value,
                MemberId: 1212,
                // Status:status,
                Status: status,
                PageNo: page,
                PageSize: 20
            },
            {
                headers: {
                    Authorization: memberToken.value // 帶上 Token
                }
            }
        );
        if (response.data.Status.Code === 0) {
            if (page == 1) {
                ticketList.value = [...response.data.Data];
            } else {
                if (
                    !ticketList.value.includes([...response.data.Data]) &&
                    [...response.data.Data].length > 0
                )
                    ticketList.value.push([...response.data.Data]);
            }
            if (response.data.Data.length < 20) isGetNewPage = false;
        } else {
            throw new Error(response.data.Status.Message);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
};
/**
 * 切換狀態
 */
const SetInnerPage = async status => {
    pageNo.value = 1;
    innerPage.value = status;
    await GetList(innerPage.value, pageNo.value);
};
/**
 * 無限滾動分頁
 */
const GetMoreData = async event => {
    const scrollTop = event.target.scrollTop;
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight && isGetNewPage) {
        pageNo.value++;
        await GetList(innerPage.value, pageNo.value);
    }
};
/**
 * 複製序號
 * @param code 序號
 */
const GetCode = async (event, code) => {
    if (code && innerPage.value == 2) {
        const parent = event.currentTarget;
        const tipsElement = parent.querySelector('.tips-shadow');
        tipsElement.classList.add('active');
        setTimeout(() => {
            tipsElement.classList.remove('active');
        }, 2000);
        await navigator.clipboard.writeText(code);
    }
};
const TurnPage = page => {
    if (page === 'form') {
        cities.value = Object.keys(theCities.getCities());
        cities2.value = Object.keys(theCities.getCities());
    }
    pageName.value = page;
};
const GetRegions = async index => {
    if (index === 1) {
        if (selectedCity.value != '請選擇') {
            districts.value = theCities.cities[selectedCity.value];
        } else {
            districts.value = [];
        }
    } else {
        if (selectedCity2.value != '請選擇') {
            districts2.value = theCities.cities[selectedCity2.value];
        } else {
            districts2.value = [];
        }
    }
};
onMounted(async () => {
    if (memberToken.value && memberId.value) {
        await GetList(innerPage.value, pageNo.value);
    }
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
.non-button {
    box-shadow: 0px 3px 2px 0px #00000040 inset;
    background: #d0d0d0;
    border: 2px solid #797979;
    border-radius: 10px;
    width: 96px;
    aspect-ratio: 96/32;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
}
.active-button {
    box-shadow: 0px 3px 2px 0px #f7eeff inset;
    background: #daafff;
    border-radius: 10px;
    width: 96px;
    aspect-ratio: 96/32;
    border: 2px solid #7b2cbf;
    color: white;
    font-size: 16px;
    margin-right: 10px;
}
.ticket-list {
    padding: 15px;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    width: 712px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar {
        width: 10px;
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        width: 10px;
        background: #b3b3b3;
        border-radius: 5px;
    }
}
.ticket-shadow {
    box-sizing: border-box;
    width: fit-content;
    height: 138px;
    box-shadow: 0px 4px 4px 0px #00000040;
}
.left-img {
    aspect-ratio: 558/138;
    width: 558px;
}
.right-img {
    width: 138px;
    aspect-ratio: 1/1;
}
.rule-container {
    padding: 15px;
    margin-top: 15px;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
        width: 10px;
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        width: 10px;
        background: #b3b3b3;
        border-radius: 5px;
    }
}
.tips-shadow {
    box-shadow: 0px 4px 4px 0px #00000040;
    opacity: 0;
    transform: translateY(10px) translateX(-50%);
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.tips-shadow.active {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
}
#progress::before {
    content: '';
    width: 100%;
    height: 1px;
    background: #e93470;
    position: absolute;
    top: 50%;
}
.id-container {
    border: 1px solid #ced4da;
    border-radius: 5px;
    text-align: center;
    aspect-ratio: 441/256;
    align-content: center;
}
.camera-btn {
    box-shadow: 0px 4px 4px 0px #e3e3e3 inset, 0px -4px 4px 0px #00000040 inset;
    background: #b3b3b3;
    aspect-ratio: 173/83;
    width: 120px;
    border: none;
    border-radius: 5px;
    padding:10px;
    font-size:14px;
    font-weight: 400;
    color:rgba(0, 0, 0, 0.8);
    cursor:pointer;
}

@media screen and (max-width: 768px) {
    .ticket-list {
        width: 352px;
    }
    .non-button,
    .active-button {
        width: 56px;
        aspect-ratio: 56/25;
        font-size: 12px;
        align-content: center;
        padding: 0;
    }
    .left-img {
        width: 280px;
    }
    .right-img {
        width: 69px;
    }
    .ticket-shadow {
        height: 69px;
    }
}
</style>
