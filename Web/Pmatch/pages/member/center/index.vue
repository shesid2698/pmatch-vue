<template>
    <el-dialog v-model="mobileTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <MobileVerify from="edit"
                          index=1
                          :phone="dialogMobile"
                          @isVerify="getMobileVerify"></MobileVerify>
        </keep-alive>

    </el-dialog>
    <el-dialog v-model="emailTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <EmailVerify from="edit"
                         index=1
                         :pEmail="email"
                         @isVerify="getEmailVerify"></EmailVerify>
        </keep-alive>
    </el-dialog>
    <div class="ccontainer w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <!-- container -->
            <div class="text-20px flex justify-center">
                <div>
                    <div class="flex flex-items-center mb-20px">
                        <span class="w-25px h-20px inline-block bg-#1a6db4 mr-8px mt-3px"></span>會員登入
                    </div>
                    <form action=""
                          @submit="checkForm">
                        <div class="flex flex-items-center justify-start">
                            <div class="text-15px mr-8px">登入帳號 </div>
                            <div><input type="text"
                                       name="account"
                                       value="123456"
                                       class="border-none text-15px"
                                       disabled></div>
                        </div>
                        <div class="mt-15px">
                            <div class="mb-5px text-16px">姓名</div>
                            <input type="text"
                                   required
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                        <div class="mt-15px">
                            <div class="mb-5px text-16px">出生年月日</div>
                            <input type="date"
                                   required
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                        <div class="mt-15px">
                            <div class="mb-5px text-[#484646] font-400 text-15px">
                                通訊地址
                            </div>
                            <div class="flex">
                                <div class="w-49%">
                                    <select class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                        <option value="請選擇">請選擇</option>
                                    </select>
                                </div>
                                <div class="w-2%"></div>
                                <div class="w-49%">
                                    <select class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                        <option value="請選擇">請選擇</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mt-5px">
                                <input type="text"
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
                                    <div v-if="emailVerify===true"
                                         class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"><i class="fa-solid fa-check"></i></div>
                                </div>
                                <div class="w-2%"></div>
                                <div class="w-38%">
                                    <button v-if="emailVerify!==true"
                                            @click="emailTableVisible = true;$event.preventDefault();"
                                            :disabled="emailPattern===false"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                        電子信箱驗證
                                    </button>
                                    <button v-else
                                            @click="$event.preventDefault()"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
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
                                <label for="phone"
                                       class="text-15px">
                                    <input type="radio"
                                           v-model="invoice"
                                           value="1"
                                           id="phone">手機條碼
                                </label>
                                <label for="natural"
                                       class="text-15px">
                                    <input type="radio"
                                           v-model="invoice"
                                           value="2"
                                           id="natural">自然人憑證
                                </label>
                                <label for="donate"
                                       class="text-15px">
                                    <input type="radio"
                                           v-model="invoice"
                                           value="3"
                                           id="donate">捐贈碼
                                </label>
                            </div>
                            <div v-if="invoice === '1'"
                                 class="relative">
                                <span class="absolute top-50% transform transform translate-y--1/2 left-10px text-black">/</span>
                                <input type="text"
                                       value=""
                                       pattern="(?=.*[0-9])(?=.*[A-Z])[0-9A-Z.+\-]{7}"
                                       class="box-border p-y-1.5 p-x-3 pl-17px text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                            </div>

                            <div v-else-if="invoice === '2'"><input type="text"
                                       value=""
                                       pattern="[A-Z]{2}[0-9]{14}"
                                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" /></div>
                            <div v-else-if="invoice === '3'">
                                <input type="text"
                                       value=""
                                       pattern="[0-9]{3,7}"
                                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                            </div>
                            <div v-else>
                                <input type="text"
                                       value=""
                                       disabled
                                       class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                            </div>
                        </div>

                        <div class="mt-15px">
                            <div class="mb-5px text-16px">統一編號</div>
                            <input type="text"
                                   pattern="[0-9]{8}"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>

                        <div class="mt-15px">
                            <div class="mb-5px text-16px">Line ID</div>
                            <input type="text"
                                   pattern="[0-9]{8}"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>

                        <div class="mt-15px">
                            <div class="mb-5px text-[#484646] font-400 text-15px">
                                行動電話1
                            </div>
                            <div class="flex">
                                <div class="w-68% relative">
                                    <input type="text"
                                           required
                                           v-model="phone"
                                           :disabled="mobileTimer.secCount != 120 || mobileVerify === true "
                                           @input="validMobilePattern(1)"
                                           class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                                    <div v-if="mobileVerify===true"
                                         class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"><i class="fa-solid fa-check"></i></div>
                                </div>
                                <div class="w-2%"></div>
                                <div class="w-30%">
                                    <button v-if="mobileVerify!==true"
                                            @click="openMobileDialog($event,1)"
                                            :disabled="mobilePattern !== true"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                        <span v-if="mobileTimer.secCount===120">手機驗證</span>
                                        <span v-else>驗證中</span>
                                    </button>
                                    <button v-else
                                            @click="$event.preventDefault()"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
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
                                    <input type="text"
                                           required
                                           v-model="phone2"
                                           :disabled="mobileTimer.secCount != 120 || mobileVerify2 === true"
                                           @input="validMobilePattern(2)"
                                           class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                                    <div v-if="mobileVerify2===true"
                                         class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"><i class="fa-solid fa-check"></i></div>
                                </div>
                                <div class="w-2%"></div>
                                <div class="w-30%">
                                    <button v-if="mobileVerify2!==true"
                                            @click="openMobileDialog($event,2)"
                                            :disabled="mobilePattern2 !== true"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                        <span v-if="mobileTimer.secCount===120">手機驗證</span>
                                        <span v-else>驗證中</span>
                                    </button>
                                    <button v-else
                                            @click="$event.preventDefault()"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
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
                                    <input type="text"
                                           required
                                           v-model="phone3"
                                           :disabled="mobileTimer.secCount != 120 || mobileVerify3 === true "
                                           @input="validMobilePattern(3)"
                                           class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200 disabled:bg-[#e9ecef]" />
                                    <div v-if="mobileVerify3===true"
                                         class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"><i class="fa-solid fa-check"></i></div>
                                </div>
                                <div class="w-2%"></div>
                                <div class="w-30%">
                                    <button v-if="mobileVerify3!==true"
                                            @click="openMobileDialog($event,3)"
                                            :disabled="mobilePattern3 !== true"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#2696F3] hover:bg-[#228de6] transition duration-200 cursor-pointer disabled:bg-gray disabled:hover:bg-gray">
                                        <span v-if="mobileTimer.secCount===120">手機驗證</span>
                                        <span v-else>驗證中</span>
                                    </button>
                                    <button v-else
                                            @click="$event.preventDefault()"
                                            class="p-y-1.5 p-x-3 w-100% border-none outline-none text-16px text-white rounded-1 bg-[#58CB6E] hover:bg-[#52bd65] transition duration-200 cursor-default disabled:bg-gray disabled:hover:bg-gray">
                                        已完成驗證
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-15px">
                            <button class="bg-[#e93470] cursor-pointer text-white text-16px h-38px w-100% rounded-[5px] outline-none border-none hover:bg-[#bb2d3b] transition duration-300">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**正在驗證的手機號碼 */
const verifyingMobile = useCookie('editMobile');
/**可再次發送驗證碼的計時器 */
const mobileTimer = useMobileTimer();
/**手機/信箱驗證視窗寬度 */
const dialogWidth = ref('370px');
/**電子信箱 */
const email = ref('');
/**電子信箱是否通過驗證 */
const emailVerify = ref(false);
/**電子信箱格式驗證 */
const emailPattern = ref(false);
/**是否開啟電子驗證視窗 */
const emailTableVisible = ref(false);
/**行動電話1 */
const phone = ref('');
/**行動電話2 */
const phone2 = ref('');
/**行動電話3 */
const phone3 = ref('');
const dialogMobile = ref('');
/**行動電話1是否驗證 */
const mobileVerify = ref(false);
/**行動電話2是否驗證 */
const mobileVerify2 = ref(false);
/**行動電話3是否驗證 */
const mobileVerify3 = ref(false);
/**行動電話1格式是否正確 */
const mobilePattern = ref(false);
/**行動電話2格式是否正確 */
const mobilePattern2 = ref(false);
/**行動電話3格式是否正確 */
const mobilePattern3 = ref(false);
/**是否開啟手機驗證視窗 */
const mobileTableVisible = ref(false);
/**正在驗證哪個行動電話 */
const isVerifyingNum = ref(0);
/**電子載具類型 */
const invoice = ref('');
/**驗證電子信箱格式是否正確 */
const validEmailPattern = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value)) {
        emailPattern.value = true;
    } else {
        emailPattern.value = false;
    }
};
/**電子信箱通過驗證*/
const getEmailVerify = (result, resEmail) => {
    if (result === true) {
        emailVerify.value = result;
        emailTableVisible.value = false;
        email.value = resEmail;
    }
};
/**驗證行動電話格式*/
const validMobilePattern = index => {
    const regex = /^\d{10}$/;
    switch (index) {
        case 1:
            if (regex.test(phone.value)) {
                mobilePattern.value = true;
            } else {
                mobilePattern.value = false;
            }
            break;
        case 2:
            if (regex.test(phone2.value)) {
                mobilePattern2.value = true;
            } else {
                mobilePattern2.value = false;
            }
            break;
        case 3:
            if (regex.test(phone3.value)) {
                mobilePattern3.value = true;
            } else {
                mobilePattern3.value = false;
            }
            break;
    }
};
const openMobileDialog = (event, index) => {
    event.preventDefault();
    mobileTableVisible.value = true;
    isVerifyingNum.value = index;
    if (verifyingMobile.value != undefined && verifyingMobile.value != '') {
        dialogMobile.value = verifyingMobile.value;
    } else {
        switch (index) {
            case 1:
                dialogMobile.value = phone.value;
                break;
            case 2:
                dialogMobile.value = phone2.value;
                break;
            case 3:
                dialogMobile.value = phone3.value;
                break;
        }
    }
};
const getMobileVerify = (result, mobile) => {
    if (result === true) {
        switch (isVerifyingNum.value) {
            case 1:
                mobileVerify.value = result;
                phone.value = mobile;
                mobileTableVisible.value = false;
                break;
            case 2:
                mobileVerify2.value = result;
                phone2.value = mobile;
                mobileTableVisible.value = false;
                break;
            case 3:
                mobileVerify3.value = result;
                phone3.value = mobile;
                mobileTableVisible.value = false;
                break;
        }
        isVerifyingNum.value = 0;
    }
};
const checkForm = event => {
    event.preventDefault();
    console.log('成功');
};
onMounted(() => {
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

    if (mobileTimer.secCount !== 120) {
        mobileTimer.decrement();
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
