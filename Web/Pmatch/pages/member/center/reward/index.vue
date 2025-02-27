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
            <!-- 列表 -->
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
                                <img v-if="innerPage !== 4"
                                     class="left-img"
                                     :src="item.RewardType === 3 ? '/images/實體獎項-l.svg' : '/images/虛擬獎項-l.svg'"
                                     alt="" />
                                <img v-else
                                     class="left-img"
                                     :src="item.RewardType === 3 ? '/images/實體獎項-disabled-l.svg' : '/images/虛擬獎項-disabled-l.svg'"
                                     alt="">
                            </div>
                            <div class="relative w-fit h-fit cursor-pointer"
                                 @click="GetReward($event,item)">
                                <div v-if="item.RewardType === 1"
                                     class="absolute w-80px bg-[#3dadff] p-2 rounded-1 text-white text-center top-50% left-50% z-9 tips-shadow">複製成功</div>
                                <div class="absolute w-100% h-100% flex items-center justify-center"><span class="text-white text-14px md:text-20px font-600">{{item.RewardType === 1?"複製序號":item.RewardType === 2? '兌換':"領獎"}}</span></div>
                                <img v-if="innerPage !== 4"
                                     class="right-img"
                                     :src="item.RewardType ===3 ? '/images/實體獎項-r.svg' : '/images/虛擬獎項-r.svg'"
                                     alt="" />
                                <img v-else
                                     class="right-img"
                                     src="/images/獎項-disabled-r.svg"
                                     alt="">
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
            <!-- 領獎表單 -->
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
                <div class="mt-15px">
                    <div class="mb-5px">身分證件反面</div>
                    <div class="id-container">
                        <img v-if="croppedImage"
                             class="w-85% m-auto"
                             :src="croppedImage"
                             alt="">
                        <button v-else
                                class="camera-btn"
                                @click="dialogVisible=true">
                            <img src="/images/camera.svg"
                                 alt=""><br>拍照或上傳照片</button>
                    </div>
                </div>
                <el-dialog v-model="dialogVisible"
                           width="500"
                           align-center
                           :show-close="false"
                           :close-on-click-modal="false">
                    <div v-if="!image">
                        <div class="relative w-100% h-40px content-center text-center text-18px font-700 border-0 border-b-[2px] border-solid border-[#dee2e6]">
                            <span class="cursor-pointer flex  absolute right-10px top-50% transform-translate-y-[-50%]"
                                  @click="dialogVisible=false">
                                <img width="20"
                                     src="/images/close.png"
                                     alt="">
                            </span>
                            證件上傳須知
                        </div>
                        <div class="p-3">
                            1. 請上傳有效之身分證件正面個人資料。
                            <br>
                            <span class="p-x-5">1-1.本國人民：國民身分證。</span>
                            <br>
                            <span class="p-x-5">1-2.大陸地區人民及香港、澳門居民：入出境許可證或居留證。</span>
                            <br>
                            <span class="p-x-5">1-3.外國人民：外國護照或居留證。</span>
                            <br>
                            2. 請務必上傳本人證件，若上傳檔案無法確認為本人證件，或不符規定，將以e-mail和簡訊通知。
                            <br>
                            3. 在相片中，您的身分證件上的資料必須清晰可見，不可使用翻拍其他螢幕、影印、遮罩、掃描等方式，否則可能必須重新提交。
                            <br>
                            4. 檔案格式必須為jpg檔、gif檔或png檔。
                            <br>
                            5. 上傳或拍攝身分證件時，請將證件置於紅框內，並儘量貼緊框線邊緣。
                            <div class="id-sample-container">
                                <div class="id-sample-inner-container">
                                    <img class="w-90%"
                                         src="/images/id-sample.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                        <div class="w-100% flex justify-between items-center h-85px border-0 border-t-2px border-solid border-[#dee2e6]">
                            <div class="ml-70px"><button @click="StartCam"
                                        class="rounded-[20px] border-1px border-solid border-[#4361ee] bg-[#3dadff] w-150px h-50px text-white text-20px flex justify-center items-center cursor-pointer"><img src="/images/camera-btn.png"
                                         class="mr-5px"
                                         width="30"
                                         alt="">拍照</button></div>
                            <div class="mr-70px"><label for="uploadImg"
                                       class="rounded-[20px] border-1px border-solid border-[#4361ee] bg-[#3dadff] w-150px h-50px text-white text-20px flex justify-center items-center cursor-pointer"><img src="/images/upload-btn.png"
                                         class="mr-5px"
                                         width="30"
                                         alt="">上傳</label>
                                <input type="file"
                                       id="uploadImg"
                                       ref="fileInput"
                                       @change="handleFileUpload"
                                       accept="image/*"
                                       class="hidden" />
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="flex justify-center px-5 py-2">
                            <button @click="Rotate('left')"
                                    class="bg-[#3dadff] rounded-3px text-12px text-white w-80px h-fit border-0 flex justify-center items-center py-1 cursor-pointer mr-10px"><img src="/images/rotate-left.png"
                                     width="14"
                                     alt="">向左旋轉</button>
                            <button @click="Rotate('right')"
                                    class="bg-[#3dadff] rounded-3px text-12px text-white w-80px h-fit border-0 flex justify-center items-center py-1 cursor-pointer"><img src="/images/rotate-right.png"
                                     width="14"
                                     alt="">向右旋轉</button>

                        </div>
                        <Cropper class=" bg-white"
                                 :src="image"
                                 ref="cropperRef" />
                        <div class="flex flex-row-reverse px-5 py-2">
                            <button @click="saveCrop"
                                    class="border-1px border-solid border-[#4fb55f] bg-[#cdf4d3] w-80px h-32px rounded-3px cursor-pointer">確定上傳</button>
                            <button @click="cancelCrop"
                                    class="border-1px border-solid border-[#ff978e] bg-[#ffcdc2] w-80px h-32px rounded-3px mr-10px cursor-pointer">重新上傳</button>

                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
/**
 * 證件上船視窗開啟
 */
const dialogVisible = ref(false);
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
// alert
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
// alert

// file上傳
/**檔案 */
const fileInput = ref(null);
/**初始圖片預覽 */
const image = ref(null);
/**裁切物件 */
const cropperRef = ref(null);
/**裁切後的圖片 */
const croppedImage = ref(null);
// file上傳
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
const GetCode = async (tipsElement, code) => {
    if (code && innerPage.value == 2) {
        if (!tipsElement) return;
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
const GetReward = async (event, item) => {
    const parent = event.currentTarget;
    const tipsElement = parent.querySelector('.tips-shadow');
    switch (item.RewardType) {
        case 1:
            await GetCode(tipsElement, item.RedeemCode);
            break;
        case 2:
            TurnPage('form');
            break;
        case 3:
            TurnPage('form');
            break;
        default:
            await GetCode(tipsElement, item.RedeemCode);
            break;
    }
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
const StartCam = async () => {};
watch(dialogVisible, newVal => {
    var header = document.getElementsByClassName('headerBox');
    if (newVal) {
        if (header.length > 0) header[0].style.zIndex = 0;
    } else {
        if (header.length > 0) header[0].style.zIndex = 99;
    }
});
const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file) {
        loadImage(file);
    }
};
/**載入圖片 */
const loadImage = file => {
    const reader = new FileReader();
    reader.onload = e => {
        image.value = e.target.result;
    };
    reader.readAsDataURL(file);
};
/**儲存裁切圖片 */
const saveCrop = () => {
    if (!cropperRef.value) return;

    const { canvas } = cropperRef.value.getResult();

    // 轉換為 base64 用於預覽
    croppedImage.value = canvas.toDataURL('image/jpeg');

    // 轉換為 File 物件
    canvas.toBlob(
        blob => {
            const fileName = `cropped-image-${Date.now()}.jpg`;
            croppedFile.value = new File([blob], fileName, { type: 'image/jpeg' });
        },
        'image/jpeg',
        0.9
    );
    dialogVisible.value=false;
};
const Rotate = direction => {
    if (!cropperRef.value) return;
    if(direction=="right"){
      cropperRef.value.rotate(90); // 右轉90度
    }else{
      cropperRef.value.rotate(-90); // 左轉90度
    }

};
/**取消裁切 */
const cancelCrop = () => {
    image.value = null;
    croppedImage.value = null;
    croppedFile.value = null;
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
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}
:deep(.el-dialog) {
    padding: 0;
    border-radius: 5px;
}
:deep(.el-dialog__header) {
    padding: 0;
}
.id-sample-container {
    aspect-ratio: 460/279;
    width: 79%;
    border: 2px solid #e3e3e3;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 5px;
    align-content: center;
}
.id-sample-inner-container {
    width: 85%;
    aspect-ratio: 460/279;
    border: 2px dashed red;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    align-content: center;
}
:deep(.vue-advanced-cropper__background),
:deep(.vue-advanced-cropper__foreground) {
    background: white;
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
