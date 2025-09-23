<template>

  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <el-dialog v-model="mobileTableVisible" :width="dialogWidth" append-to-body z-index="999">
    <keep-alive>
      <MobileVerify from="edit" index="1" :phone="dialogMobile" @isVerify="getMobileVerify"></MobileVerify>
    </keep-alive>
  </el-dialog>
  <el-dialog v-model="emailTableVisible" :width="dialogWidth" append-to-body z-index="999">
    <keep-alive>
      <EmailVerify from="edit" index="1" :pEmail="email" @isVerify="getEmailVerify"></EmailVerify>
    </keep-alive>
  </el-dialog>
  <div class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
    <div class="lg:w-160px">
      <MemberCenter :type="memberType"></MemberCenter>
    </div>
    <div class="flex-1 md:pl-20px" v-if="theUser[0] != null && theUser[0] != undefined">
      <!-- container -->
      <div class="text-20px flex justify-center">
        <div>
          <div class="flex flex-items-center mb-20px">
            <span class="w-25px h-20px inline-block bg-#1a6db4 mr-8px mt-3px"></span>會員登入
          </div>
          <form action="" @submit="checkForm">
            <div class="flex flex-items-center justify-start">
              <div class="text-15px mr-8px">登入帳號</div>
              <div>
                <input type="text" name="account" v-model="theUser[0].Mobile1" class="border-none text-15px" disabled />
              </div>
            </div>
            <div class="mt-15px">
              <div class="mb-5px text-16px">姓名</div>
              <input type="text" required v-model="theUser[0].Name"
                class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div class="mt-15px">
              <div class="mb-5px text-16px">出生年月日</div>
              <input type="date" required v-model="Birthday" @change="theUser[0].Birthday = Birthday"
                class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>
            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                通訊地址
              </div>
              <div class="flex">
                <div class="w-49%">
                  <select v-model="selectedCity"
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                    <option value="">請選擇</option>
                    <option v-for="(item, index) in cities" :key="index" :value="index">
                      {{ index }}
                    </option>
                  </select>
                </div>
                <div class="w-2%"></div>
                <div class="w-49%">
                  <select v-model="selectedRegion"
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                    <option value="">請選擇</option>
                    <option v-for="region in cities[
                      selectedCity
                    ]" :key="region">
                      {{ region }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mt-5px">
                <input type="text" v-model="addressDetail"
                  class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                電子信箱
              </div>
              <div class="flex">
                <div class="w-60% relative">
                  <input type="email" v-model="theUser[0].Email" disabled
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef] pr-35px" />
                  <div v-if="emailVerify === true"
                    class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                <div class="w-2%"></div>
                <div class="w-38%">
                  <button v-if="emailVerify !== true" @click="
                    emailTableVisible = true;
                  $event.preventDefault();
                  " type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    電子信箱驗證
                  </button>
                  <button v-else type="button" @click="
                    emailTableVisible = true;
                  $event.preventDefault();
                  "
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    已完成驗證
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                電子載具
              </div>
              <div class="mb-5px">
                <label for="phone" class="text-15px">
                  <input type="radio" v-model="theUser[0].CarrierType" value="1" id="phone" />手機條碼
                </label>
                <label for="natural" class="text-15px">
                  <input type="radio" v-model="theUser[0].CarrierType" value="2" id="natural" />自然人憑證
                </label>
                <label for="donate" class="text-15px">
                  <input type="radio" v-model="theUser[0].CarrierType" value="3" id="donate" />捐贈碼
                </label>
              </div>
              <div v-if="
                theUser[0].CarrierType === '1' ||
                theUser[0].CarrierType === 1
              " class="relative">
                <span class="absolute top-50% transform transform translate-y--1/2 left-10px text-black">/</span>
                <input type="text" v-model="theUser[0].Carrier" @change="
                  theUser[0].Carrier =
                  theUser[0].Carrier.toUpperCase()" 
                  @blur="verifyAlert"
                  maxlength="7"
                  pattern="[0-9A-Z\+\-\.]{7}"
                  class="box-border p-y-1.5 p-x-3 pl-17px text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>

              <div v-else-if="
                theUser[0].CarrierType === '2' ||
                theUser[0].CarrierType === 2
              ">
                <input type="text" v-model="theUser[0].Carrier" @change="
                  theUser[0].Carrier =
                  theUser[0].Carrier.toUpperCase()" 
                  @blur="verifyAlert"
                  maxlength="16"
                  pattern="TP[0-9]{14}"
                  class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>
              <div v-else-if="
                theUser[0].CarrierType === '3' ||
                theUser[0].CarrierType === 3
              ">
                <input type="text" v-model="theUser[0].Carrier" @change="" pattern="[0-9]{3,7}"
                  class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>
              <div v-else>
                <input type="text" value="" disabled
                  class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-16px">統一編號</div>
              <input type="text" pattern="[0-9]{8}" v-model="theUser[0].TaxId"
                class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                發票寄送方式
              </div>
              <div class="mb-5px">
                <label for="carrierType" class="text-15px">
                  <input type="radio" v-model="theUser[0].SendReceiptType" value="1" :disabled="theUser[0].CarrierType === 0 ||
                    theUser[0].CarrierType === '0' ||
                    theUser[0].Carrier === ''
                    " id="carrierType" />電子載具
                </label>
                <label for="email" class="text-15px">
                  <input type="radio" :disabled="theUser[0].Email === ''" v-model="theUser[0].SendReceiptType" value="2"
                    id="email" />電子信箱
                </label>
                <label for="address" class="text-15px">
                  <input type="radio" v-model="theUser[0].SendReceiptType" :disabled="addressDetail === ''" value="3"
                    id="address" />紙本寄送
                </label>
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                行動電話1
              </div>
              <div class="flex">
                <div class="w-68% relative">
                  <input type="text" required v-model="theUser[0].Mobile1" disabled
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                  <div v-if="mobileVerify === true"
                    class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                <div class="w-2%"></div>
                <div class="w-30%">
                  <button v-if="mobileVerify !== true" type="button" @click="openMobileDialog($event, 1)"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    手機驗證
                  </button>
                  <button v-else type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 disabled:bg-gray disabled:hover:bg-gray">
                    已完成驗證
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                行動電話2
              </div>
              <div class="flex">
                <div class="w-68% relative">
                  <input type="text" required v-model="theUser[0].Mobile2" disabled
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                  <div v-if="mobileVerify2 === true"
                    class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                <div class="w-2%"></div>
                <div class="w-30%">
                  <button v-if="mobileVerify2 !== true" @click="openMobileDialog($event, 2)" type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray cursor-pointer">
                    手機驗證
                  </button>
                  <button v-else @click="openMobileDialog($event, 2)" type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    已完成驗證
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-15px">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                行動電話3
              </div>
              <div class="flex">
                <div class="w-68% relative">
                  <input type="text" required v-model="theUser[0].Mobile3" disabled
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                  <div v-if="mobileVerify3 === true"
                    class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                <div class="w-2%"></div>
                <div class="w-30%">
                  <button v-if="mobileVerify3 !== true" @click="openMobileDialog($event, 3)" type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    手機驗證
                  </button>
                  <button v-else @click="openMobileDialog($event, 3)" type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                    已完成驗證
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-15px" v-show="theUser[0].Type !== 2">
              <div class="mb-5px text-[#484646] font-400 text-15px">
                推薦碼（推薦人）
              </div>
              <div class="flex">
                <div class="w-68% relative">
                  <input
                    type="text"
                    v-model="recommendStr"
                    :disabled="theUser[0].Type === 3"
                    class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] disabled:bg-[#e9ecef] transition duration-200"
                  />
                  <div
                    v-if="theUser[0].Type === 3"
                    class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"
                  >
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                <div class="w-2%"></div>
                <div class="w-30%">
                  <button
                    v-if="theUser[0].Type !== 3"
                    type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer"
                    @click.prevent="bindReferralCode"
                  >
                    綁定推薦碼
                  </button>
                  <button
                    v-else
                    disabled
                    type="button"
                    class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-not-allowed"
                  >
                    已完成綁定
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-15px">
              <button
                class="bg-[#e93470] cursor-pointer text-white text-16px h-38px w-100% rounded-[5px] outline-none border-none hover:bg-[#bb2d3b] transition duration-300">
                提交
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const modalStore = useModalStore();
const alertModal = useAlertModalStore();
const recommendDisabled = ref(false);
const { $axios } = useNuxtApp();
const userToken = useCookie('_PmToken');
const memberId = useCookie('_PmMemberId');
const userNameCookie = useCookie('_PmUserName');
const router = useRouter();
const theUser = reactive({});
const Birthday = ref('');
const getCities = useGetCities();
const cities = ref([]);
const selectedCity = ref('');
const selectedRegion = ref('');
const addressDetail = ref('');
const recommendStr = ref('');
const usedRecommendStr = ref(false);
const memberType = useCookie('_PmMemberType');
/**正在驗證的手機號碼 */
const verifyingMobile = useCookie('editMobile');
/**手機/信箱驗證視窗寬度 */
const dialogWidth = ref('370px');
/**電子信箱 */
const email = ref('');
/**電子信箱是否通過驗證 */
const emailVerify = ref(false);
/**是否開啟電子驗證視窗 */
const emailTableVisible = ref(false);
/**行動電話3 */
const phone3 = ref('');
const dialogMobile = ref('');
/**行動電話1是否驗證 */
const mobileVerify = ref(false);
/**行動電話2是否驗證 */
const mobileVerify2 = ref(false);
/**行動電話3是否驗證 */
const mobileVerify3 = ref(false);
/**是否開啟手機驗證視窗 */
const mobileTableVisible = ref(false);
/**正在驗證哪個行動電話 */
const isVerifyingNum = ref(0);
/**電子載具類型 */
const invoice = ref('');
/**電子信箱通過驗證*/
const getEmailVerify = async (result, resEmail) => {
  if (result === true) {
    emailVerify.value = result;
    emailTableVisible.value = false;
    email.value = resEmail;
    theUser[0].Email = resEmail;
    theUser[0].Email_Verified = result;
    await checkForm(null);
  }
};
/**電子載具驗證*/
const barcodeVerify = async () => {
  if (!theUser[0].Carrier || theUser[0].Carrier.trim() === '') {
    return true; 
  }
  const carrierType = String(theUser[0].CarrierType);
  const carrierValue = theUser[0].Carrier.toUpperCase();
  // 1. 手機條碼載具驗證
  if (carrierType === '1') {
    const fullCarrier = '/' + carrierValue;
    const mobileRegex = /^\/[0-9A-Z\+\-\.]{7}$/;
    if (!mobileRegex.test(fullCarrier)) {
      await alertModal.alertShowModal(' ', '手機條碼格式錯誤，應為7碼，<br>可包含數字、大寫英文及符號 "+ - ."');
      return false;
    }
  }
  // 2. 自然人憑證條碼載具驗證
  if (carrierType === '2') {
    const certRegex = /^TP[0-9]{14}$/;
    if (!certRegex.test(carrierValue)) {
      await alertModal.alertShowModal(' ', '自然人憑證格式錯誤，<br>應為 "TP" 開頭後接14位數字');
      return false;
    }
  }
  return true;
};
const verifyAlert = async () => {
  await barcodeVerify();
};
const textTruncate = (maxLen) => {
  if (theUser[0].Carrier && theUser[0].Carrier.length > maxLen) {
    theUser[0].Carrier = theUser[0].Carrier.slice(0, maxLen);
  }
}
watch(() => theUser[0]?.CarrierType, (newType) => {
  if (!theUser[0]?.Carrier) {
    return;
  }
  const type = String(newType);
  if (type === '1') {
    textTruncate(7);
  }
  else if (type === '2') {
    textTruncate(16);
  }
});

const openMobileDialog = (event, index) => {
  event.preventDefault();
  mobileTableVisible.value = true;
  isVerifyingNum.value = index;
  if (verifyingMobile.value != undefined && verifyingMobile.value != '') {
    dialogMobile.value = verifyingMobile.value;
  }
};
const getMobileVerify = async (result, mobile) => {
  if (result === true) {
    switch (isVerifyingNum.value) {
      case 1:
        mobileVerify.value = result;
        theUser[0].Mobile1 = mobile;
        theUser[0].Mobile1_Verified = true;
        mobileTableVisible.value = false;
        break;
      case 2:
        mobileVerify2.value = result;
        theUser[0].Mobile2 = mobile;
        theUser[0].Mobile2_Verified = true;
        mobileTableVisible.value = false;
        break;
      case 3:
        mobileVerify3.value = result;
        theUser[0].Mobile3 = mobile;
        theUser[0].Mobile3_Verified = true;
        mobileTableVisible.value = false;
        break;
    }
    isVerifyingNum.value = 0;
    await checkForm(null);
  }
};
/**
 * 提交表單
 */

const checkForm = async event => {
  if (event) event.preventDefault();

  // 載具驗證
  const isValidCorrect = await barcodeVerify();
  if (!isValidCorrect) {
    return; // 如果驗證失敗，就中斷提交
  }

  // 打推薦碼
  if (recommendStr.value !== '' && usedRecommendStr.value === false) {
    theUser[0].RefferCode = recommendStr.value;
  }

  // 型別轉換
  theUser[0].CarrierType = parseInt(theUser[0].CarrierType);
  theUser[0].SendReceiptType = parseInt(theUser[0].SendReceiptType);
  if (theUser[0].CarrierType === 1 && theUser[0].Carrier !== '') {
    theUser[0].Carrier = '/' + theUser[0].Carrier;
  }
  if (theUser[0].Carrier === '') theUser[0].CarrierType = 0;

  // 地址組合
  let allAddress = '';
  if (selectedRegion.value !== '' && selectedCity.value !== '' && addressDetail.value !== '') {
    allAddress = selectedCity.value + selectedRegion.value + addressDetail.value;
  }
  theUser[0].Address = allAddress;

  // 發送更新會員資料 API
  try {
    const response = await $axios.post('/api/v1/Pmatch/UpdatedMemberData', theUser[0], {
      headers: {
        Authorization: userToken.value
      }
    });

    if (response.data.Status.Code === 0) {
      await alertModal.alertShowModal(' ', '更新成功');
      window.location.reload();
    } else {
      alertModal.alertShowModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('更新會員資料失敗:', error);
  }
};


// 處理推薦碼（改用 BindReferralCode API）
const bindReferralCode = async () => {
  if (recommendStr.value === '' || usedRecommendStr.value === true) return;

  try {
    const confirm = await modalStore.showModal(
      ' ',
      '綁定推薦碼後，不可再進行變更，<br>確定要綁定此組推薦碼嗎？'
    );
    if (!confirm) {
      recommendStr.value = '';
      theUser[0].RefferCode = '';
      return;
    }

    const bindResponse = await $axios.post(
      '/api/v1/Pmatch/BindReferralCode',
      {
        PmatchMemberId: memberId.value,
        ReferralCode: recommendStr.value
      },
      {
        headers: {
          Authorization: userToken.value
        }
      }
    );

    if (bindResponse.data.Status.Code !== 0) {
      await alertModal.alertShowModal(' ', `推薦碼綁定失敗：${bindResponse.data.Status.Message}`);
      return;
    }

    // 成功提示，按下確認後刷新畫面
    await alertModal.alertShowModal(' ', '推薦碼綁定成功');
    window.location.reload();

  } catch (err) {
    console.error('推薦碼綁定錯誤:', err);
    await alertModal.alertShowModal(' ', '推薦碼綁定過程發生錯誤');
  }
};


/**
 * 日期轉換函數
 */
function formatToDateInput(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // return YYYY-MM-DD 格式
}
onMounted(async () => {
  // modalStore.showModal("提示測試","這是談窗測試",confirmOK,confirmCancel);
  try {
    if (userToken.value != '' && userToken.value != undefined) {
      const response = await $axios.post(
        '/api/v1/Pmatch/GetMemberDetail',
        {
          PmatchMemberId: memberId.value
        },
        {
          headers: {
            Authorization: userToken.value
          }
        }
      );

      if (response.data.Status.Code === 0) {
        Object.assign(theUser, response.data.Data);
        Birthday.value = formatToDateInput(theUser[0].Birthday);
        if (theUser[0].Email_Verified === true) emailVerify.value = true;
        if (theUser[0].Mobile1_Verified === true) mobileVerify.value = true;
        if (theUser[0].Mobile2_Verified === true) mobileVerify2.value = true;
        if (theUser[0].Mobile3_Verified === true) mobileVerify3.value = true;
        if (theUser[0].CarrierType === 1 && theUser[0].Carrier !== '') {
          theUser[0].Carrier = theUser[0].Carrier.replace('/', '');
        }
        if (theUser[0].RefferCode !== '') {
          recommendStr.value = theUser[0].RefferCode;
          usedRecommendStr.value = true;
        }
        memberType.value = theUser[0].Type;
      } else {
        alert(`${response.data.Status.Message}`);
      }
    } else {
      router.push('/member/login');
      return;
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
  const updateDialogWidth = () => {
    if (window.innerWidth <= 768) {
      dialogWidth.value = '90%'; // MD 裝置或以下設置寬度為 370px
    } else {
      dialogWidth.value = '370px'; // 其他裝置設置寬度為 800px
    }
  };

  // 初次加載時設置
  updateDialogWidth();

  // 監聽視窗尺寸變化
  window.addEventListener('resize', updateDialogWidth);
  cities.value = getCities.getCities();
  if (cities.value != null && cities.value != undefined) {
    for (const [key, value] of Object.entries(cities.value)) {
      if (theUser[0].Address.indexOf(key) !== -1) {
        selectedCity.value = key;
      }
    }
    if (selectedCity.value != '' && selectedCity.value != undefined) {
      for (const [key, value] of Object.entries(cities.value[selectedCity.value])) {
        if (theUser[0].Address.indexOf(value) !== -1) {
          selectedRegion.value = value;
        }
      }
    }
    if (selectedCity.value !== '' && selectedRegion.value != '') {
      theUser[0].Address = theUser[0].Address.replace(selectedCity.value, '');
      theUser[0].Address = theUser[0].Address.replace(selectedRegion.value, '');
      addressDetail.value = theUser[0].Address;
    }
  }
});
</script>
<style scoped>
.ccontainer {
  height: fit-content;
  display: flex;
  margin: 0 auto;
}
</style>
