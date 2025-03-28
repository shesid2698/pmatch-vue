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
    <el-dialog v-model="mobileTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <MobileVerify from="new"
                          index="1"
                          :phone="dialogMobile"
                          @isVerify="getMobileVerify"></MobileVerify>
        </keep-alive>
    </el-dialog>
    <el-dialog v-model="emailTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <EmailVerify from="new"
                         index="1"
                         :pEmail="email"
                         @isVerify="getEmailVerify"></EmailVerify>
        </keep-alive>
    </el-dialog>

    <div class="ccontainer">
        <div class="w-68.75% flex flex-col flex-items-center">
            <div class="w-370px">
                <div class="flex flex-items-center">
                    <div class="w-25px h-20px bg-#1a6db4 mr-8px mt-3px"></div>
                    <div class="text-20px">會員服務條款</div>
                </div>
                <!-- 進度條 -->
                <div class="mt-20px h-42px flex justify-between relative"
                     id="progress">
                    <div class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div class="h-100% sticky w-42px bg-[#e93470] border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-white font-bold">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div class="h-100% sticky w-42px bg-white border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold">
                        3
                    </div>
                </div>
                <!-- 進度條 -->
                <form action="#"
                      @submit="SubmitForm">
                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            電話號碼
                        </div>
                        <div class="flex">
                            <div class="w-68% relative">
                                <input type="text"
                                       required
                                       v-model="phone"
                                       :disabled="mobileVerify === true"
                                       @input="validMobilePattern"
                                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                                <div v-if="mobileVerify === true"
                                     class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                            </div>
                            <div class="w-2%"></div>
                            <div class="w-30%">
                                <button v-if="mobileVerify !== true"
                                        onclick="event.preventDefault();"
                                        @click="openMobileDialog"
                                        :disabled="mobilePattern !== true"
                                        class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                    手機驗證
                                </button>
                                <button v-else
                                        class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
                                    已完成驗證
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">密碼</div>
                        <div class="relative">
                            <input type="password"
                                   required
                                   autocomplete="off"
                                   ref="i_password"
                                   class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                                   pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}" />
                            <div @click="turnInputType"
                                 class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%">
                                <i ref="eyes"
                                   class="fa-solid fa-eye text-gray"></i>
                            </div>

                            <div class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-125% text-white p-10px rounded-1">
                                密碼長度必須為8~20位,
                                其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                                ! @ # $ % & *
                            </div>
                            <div class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"></div>
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px">再次確認密碼</div>
                        <div class="relative">
                            <input type="password"
                                   required
                                   autocomplete="off"
                                   ref="i_password2"
                                   class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                                   pattern="(?=.*\d)(?=.*[a-zA-Z])[A-Za-z0-9!@#$%&*]{8,20}" />
                            <div @click="turnInputType2"
                                 class="cursor-pointer absolute top-50% transform translate-y-[-45%] left-92%">
                                <i ref="eyes2"
                                   class="fa-solid fa-eye text-gray"></i>
                            </div>

                            <div class="tips absolute text-14px w-200px h-auto bg-dark left-25% bottom-125% text-white p-10px rounded-1">
                                密碼長度必須為8~20位,
                                其中必須包含至少一位數字、一位英文，若需有特殊符號僅限於
                                ! @ # $ % & *
                            </div>
                            <div class="tips absolute clip-path-custom w-15px h-15px bg-dark left-52% bottom-110%"></div>
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            姓名
                        </div>
                        <div>
                            <input type="text"
                                   v-model="theName"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            出生年月日
                        </div>
                        <div>
                            <input type="date"
                                   v-model="birthday"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            電子信箱
                        </div>
                        <div class="flex">
                            <div class="w-60% relative">
                                <input type="email"
                                       v-model="email"
                                       :disabled="emailVerify === true"
                                       @input="validEmailPattern"
                                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef] pr-35px" />
                                <div v-if="emailVerify === true"
                                     class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold">
                                    <i class="fa-solid fa-check"></i>
                                </div>
                            </div>
                            <div class="w-2%"></div>
                            <div class="w-38%">
                                <button v-if="emailVerify !== true"
                                        onclick="event.preventDefault();"
                                        @click="emailTableVisible = true"
                                        :disabled="emailPattern === false"
                                        class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                    電子信箱驗證
                                </button>
                                <button v-else
                                        class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
                                    已完成驗證
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="flex flex-items-center">
                            <div class="w-7% text-[#DC3545]">
                                <i class="fa-solid fa-circle-info"></i>
                            </div>
                            <div class="w-93% text-12px text-gray-6 font-400">
                                當您註冊成功後，系統將會寄送登入帳號到您登錄的電子信箱中，此電子信箱為您日後查詢帳號使用
                            </div>
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            通訊地址
                        </div>
                        <div class="flex">
                            <div class="w-49%">
                                <select @change="GetRegions"
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

                    <div class="mt-15px"
                         v-if="!route.query.IsPromoteCode">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            推薦碼(推薦人)
                        </div>
                        <div>
                            <input type="text"
                                   v-model="recommendCode"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px text-[#484646] font-400 text-15px">
                            綁定社群帳號
                        </div>
                        <div class="flex justify-center">
                            <ClientOnly>
                                <GoogleLogin :callback="GoogleCallback"
                                             popup-type="TOKEN">
                                    <button class="otherLoginBtn mx-3"
                                            type="button"
                                            :disabled="thirdPartyPlatform.some(x=>x.Category==1)">
                                        <a :title="googleBind"><img class="w-25px"
                                                 :class="{ 'filterLight': !!thirdPartyPlatform.some(x => x.Category === 1) }"
                                                 src="/images/iconGoogle.png"
                                                 alt="GOOGLE帳號登入" /></a>
                                    </button>
                                </GoogleLogin>

                            </ClientOnly>

                            <button class="otherLoginBtn mx-3"
                                    type="button"
                                    :disabled="thirdPartyPlatform.some(x=>x.Category==3)"
                                    @click="thirdPartyLogin.LineLogin">
                                <a :title="lineBind">
                                    <img class="w-25px"
                                         src="/images/iconLine.png"
                                         alt="LINE帳號登入"
                                         :class="{ 'filterLight': !!thirdPartyPlatform.some(x => x.Category === 3) }" />
                                </a>

                            </button>
                            <button class="otherLoginBtn mx-3"
                                    type="button"
                                    :disabled="thirdPartyPlatform.some(x=>x.Category==2)"
                                    @click="loginFb">
                                <a :title="fbBind">
                                    <img class="w-25px"
                                         src="/images/iconFB.png"
                                         alt="FB帳號登入"
                                         :class="{ 'filterLight': !!thirdPartyPlatform.some(x => x.Category === 2) }" />
                                </a>
                            </button>
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="flex">
                            <div>
                                <input type="checkbox"
                                       required
                                       checked />
                            </div>
                            <div>
                                <NuxtLink to="/company/privacy"
                                          target="_blank"
                                          class="text-[#0d6efd] text-12px underline hover:opacity-70">我同意隱私權與資訊安全政策</NuxtLink>
                            </div>
                        </div>
                        <div class="flex">
                            <div>
                                <input type="checkbox"
                                       required
                                       checked />
                            </div>
                            <div>
                                <NuxtLink to="/company/service"
                                          target="_blank"
                                          class="text-[#0d6efd] text-12px underline hover:opacity-70">我同意服務條款</NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5px">
                        <button class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#e93470 hover:bg-#bb2d3b transition duration-200 cursor-pointer">
                            提交
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
// loading page
import { GoogleLogin } from 'vue3-google-login';
import { useLoadStore } from '../stores/loading.js';
import { useConfigStore } from '../stores/config.js';
import { useAlertModalStore } from '../stores/useAlertModal.js';
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const configStore = useConfigStore();
const store = useLoadStore();
const contractStores = ref('');
const setPageLoading = store.setPageLoading;
const encrypt = useEncrypt();
const { md5 } = crypto();
const theCities = useGetCities();
const jwtStore = useJwtStore();
const router = useRouter();
const route = useRoute();
const { $axios } = useNuxtApp();
/**正在驗證的手機號碼 */
const verifyingMobile = useCookie('newMobile');
/**傳送給驗證視窗的手機號碼 */
const dialogMobile = ref('');
const phone = ref('');
const email = ref('');
const theName = ref('');
const birthday = ref('');
const address = ref('');
const mobilePattern = ref(false);
const mobileVerify = ref(false);
const emailPattern = ref(false);
const emailVerify = ref(false);
const mobileTableVisible = ref(false);
const emailTableVisible = ref(false);
const dialogWidth = ref('370px');
const i_password = ref(null);
const i_password2 = ref(null);
const eyes = ref(null);
const eyes2 = ref(null);
const token = ref('');
const cities = ref([]);
const districts = ref([]);
const selectedCity = ref('');
const selectedRegion = ref('');
const recommendCode = ref('');

//三方登入
const thirdPartyLogin = useThirdPartyLoginStore();
const { userInfo } = storeToRefs(thirdPartyLogin);
const thirdPartyPlatform = ref([]);
const googleBind = computed(() =>
    thirdPartyPlatform.value.some(x => x.Category === 1) ? '已綁定' : '未綁定'
);
const lineBind = computed(() =>
    thirdPartyPlatform.value.some(x => x.Category === 3) ? '已綁定' : '未綁定'
);
const fbBind = computed(() =>
    thirdPartyPlatform.value.some(x => x.Category === 2) ? '已綁定' : '未綁定'
);

const turnInputType = () => {
    if (i_password.value.type === 'password') {
        i_password.value.type = 'text';
        eyes.value.classList.remove('fa-eye');
        eyes.value.classList.add('fa-eye-slash');
    } else {
        i_password.value.type = 'password';
        eyes.value.classList.remove('fa-eye-slash');
        eyes.value.classList.add('fa-eye');
    }
};
const validMobilePattern = () => {
    const regex = /^\d{10}$/;
    if (regex.test(phone.value)) {
        mobilePattern.value = true;
    } else {
        mobilePattern.value = false;
    }
};
const validEmailPattern = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value)) {
        emailPattern.value = true;
    } else {
        emailPattern.value = false;
    }
};
const turnInputType2 = () => {
    if (i_password2.value.type === 'password') {
        i_password2.value.type = 'text';
        eyes2.value.classList.remove('fa-eye');
        eyes2.value.classList.add('fa-eye-slash');
    } else {
        i_password2.value.type = 'password';
        eyes2.value.classList.remove('fa-eye-slash');
        eyes2.value.classList.add('fa-eye');
    }
};
/**
 * 驗證手機號碼
 */
const getMobileVerify = (result, mobile) => {
    if (result === true) {
        mobileVerify.value = result;
        phone.value = mobile;
        mobileTableVisible.value = false;
    }
};
const getEmailVerify = (result, resEmail) => {
    if (result === true) {
        emailVerify.value = result;
        emailTableVisible.value = false;
        email.value = resEmail;
    }
};
const openMobileDialog = () => {
    mobileTableVisible.value = true;
    if (verifyingMobile.value != undefined && verifyingMobile.value != '') {
        dialogMobile.value = verifyingMobile.value;
    } else {
        dialogMobile.value = phone.value;
    }
};
/**
 * 取得行政區域
 */
const GetRegions = async () => {
    if (selectedCity.value != '請選擇') {
        districts.value = theCities.cities[selectedCity.value];
    } else {
        districts.value = [];
    }
};
/**
 * 提交表單
 *  */
const SubmitForm = async e => {
    e.preventDefault();
    if (mobileVerify.value === false) {
        await openAlertModal(' ', '手機號碼尚未驗證');
        return;
    }
    var password1 = md5(i_password.value.value);
    var password2 = md5(i_password2.value.value);
    token.value = await jwtStore.generateToken();
    if (password1 !== password2) {
        await openAlertModal(' ', '密碼與確認密碼不一致');
        return;
    }
    try {
        if (route.query.D) {
            const shortUrlResponse = await $axios.post(
                '/api/v1/ShortUrl/RegisterNotify',
                {
                    Data: {
                        Id: encrypt.decrypt(route.query.D)
                    }
                },
                {
                    headers: {
                        Authorization: token.value
                    }
                }
            );
            if (shortUrlResponse.data.Status.Code === 0) {
                await RegisterMember(password1);
            } else {
                await openAlertModal(' ', `${shortUrlResponse.data.Status.Message}`);
                return;
            }
        } else {
            await RegisterMember(password1);
        }
    } catch (error) {
        console.error('請求失敗:', error);
    }
};
/**
 * 註冊會員
 * @param password1
 */
const RegisterMember = async password1 => {
    token.value = await jwtStore.generateToken();
    var allAddress = '';
    var phoneValue = mobileVerify.value === true ? phone.value : '';
    var emailValue = emailVerify.value === true ? email.value : '';
    var birthDayValue = birthday.value === '' ? null : birthday.value;
    if (address.value != '' && selectedRegion.value != '' && selectedCity.value != '')
        allAddress = selectedCity.value + selectedRegion.value + address.value;

    const response = await $axios.post(
        '/api/v1/Pmatch/Register',
        {
            MobileNumber: phoneValue,
            Password: password1, // 使用加密後的密碼
            Email: emailValue,
            Name: theName.value,
            BirthDay: birthDayValue,
            Address: allAddress,
            ContractStores: contractStores.value,
            RefferCode: recommendCode.value,
            IsPromoteCode: encrypt.decrypt(route.query.IsPromoteCode) === 'true' ? true : false, // 是否為下線經營者
            ThirdPartyPlatform: thirdPartyPlatform.value,
            PmatchStoreIds: encrypt.decrypt(route.query.PmatchStoreIds) // 商家ID
        },
        {
            headers: {
                Authorization: token.value
            }
        }
    );
    if (response.data.Status.Code === 0) {
        router.push(`/register/done?account=${encrypt.encrypt(phoneValue)}`);
    } else {
        await openAlertModal(' ', `${response.data.Status.Message}`);
    }
};
/**
 * 三方登入驗證
 */
const ThirdPartyLogin = async (category, clientId) => {
    const response = await $axios.post('/api/v1/User/ThirdPartyVerify', {
        Category: category,
        ClientId: clientId
    });
    if (response.data.Status.Code === 0) {
        return true;
    } else {
        //未綁定過
        return false;
    }
};
/**
 * 臉書登入
 */
const loginFb = async () => {
    try {
        const userData = await thirdPartyLogin.loginWithFacebook();
        if (userData && userData.id) {
            const IsRegistered = await ThirdPartyLogin(2, userData.id);
            if (IsRegistered === false) {
                //未綁定
                const thirdPlat = {
                    Category: 2,
                    ClientId: userData.id
                };
                if (!thirdPartyPlatform.value.includes(thirdPlat)) {
                    thirdPartyPlatform.value.push(thirdPlat);
                }
            } else {
                await openAlertModal(' ', '綁定失敗，此社群帳號已被其他會員綁定。');
            }
        }
    } catch (error) {
        console.error('Facebook 登入失敗:', error);
    }
};
/**
 * 監聽line登入後身分驗證
 */
const syncStorage = async event => {
    if (event.key === 'lineUserSub') {
        if (event.newValue != null && event.newValue != undefined && event.newValue != '') {
            var IsRegistered = await ThirdPartyLogin(3, event.newValue);
            if (IsRegistered === false) {
                const thirdPlat = {
                    Category: 3,
                    ClientId: event.newValue
                };
                if (!thirdPartyPlatform.value.includes(thirdPlat)) {
                    thirdPartyPlatform.value.push(thirdPlat);
                }
            } else {
                await openAlertModal(' ', '綁定失敗，此社群帳號已被其他會員綁定。');
            }
            localStorage.removeItem('lineUserSub');
        }
    }
};
/**
 * google登入事件
 * @param response
 */
const GoogleCallback = async response => {
    const data = await thirdPartyLogin.googleCallback(response);
    if (data != '' && data != null && data != undefined) {
        var IsRegistered = await ThirdPartyLogin(1, data);
        if (IsRegistered === false) {
            const thirdPlat = {
                Category: thirdPartyLogin.category,
                ClientId: newVal
            };
            if (!thirdPartyPlatform.value.includes(thirdPlat)) {
                thirdPartyPlatform.value.push(thirdPlat);
            }
        } else {
            await openAlertModal(' ', '綁定失敗，此社群帳號已被其他會員綁定。');
        }
    }
};
onMounted(async () => {
    //監聽line登入後身分驗證
    window.addEventListener('storage', syncStorage);
    await setPageLoading(true);
    if (route.query.Phone?.length > 0) {
        phone.value = encrypt.decrypt(route.query.Phone);
        mobileVerify.value = true;
    }
    if (route.query.ContractStores?.length > 0) {
        contractStores.value = encrypt.decrypt(route.query.ContractStores);
    }

    var is_promotecode = encrypt.decrypt(route.query.IsPromoteCode);

    const updateDialogWidth = () => {
        if (window.innerWidth <= 768) {
            dialogWidth.value = '90%'; // MD 裝置或以下設置寬度為 370px
        } else {
            dialogWidth.value = '370px'; // 其他裝置設置寬度為 800px
        }
    };

    cities.value = Object.keys(theCities.getCities());
    // 初次加載時設置
    updateDialogWidth();

    // 監聽視窗尺寸變化
    window.addEventListener('resize', updateDialogWidth);
    await setPageLoading(false);
    await configStore.initFacebook();
});
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.clip-path-custom {
    clip-path: polygon(50% 100%, 0 50%, 100% 50%);
}
.tips {
    opacity: 0;
    transition: 0.2s;
    z-index: -1;
}
.password:hover ~ .tips {
    opacity: 1;
    z-index: 1;
}
#progress::before {
    content: '';
    width: 100%;
    height: 1px;
    background: #e93470;
    position: absolute;
    top: 50%;
}
.otherLoginBtn {
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}
.filterLight {
    opacity: 0.5;
}
</style>
