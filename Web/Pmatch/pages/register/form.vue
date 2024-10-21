<template>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous" />
    <el-dialog v-model="mobileTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <MobileVerify from="new"
                          index=1
                          :phone="phone"
                          @isVerify="getMobileVerify"></MobileVerify>
        </keep-alive>

    </el-dialog>
    <el-dialog v-model="emailTableVisible"
               :width="dialogWidth">
        <keep-alive>
            <EmailVerify from="new"
                         index=1
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
                            <div v-if="mobileVerify===true"
                                 class="absolute w-20px h-20px top-50% transform translate-y-[-50%] right-5px border border-3px border-solid rounded-full border-[#24b75d] text-center content-center text-[#24b75d] text-15px font-bold"><i class="fa-solid fa-check"></i></div>
                        </div>
                        <div class="w-2%"></div>
                        <div class="w-30%">
                            <button v-if="mobileVerify!==true"
                                    @click="mobileTableVisible = true"
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
                               class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                    </div>
                </div>

                <div class="mt-15px">
                    <div class="mb-5px text-[#484646] font-400 text-15px">
                        出生年月日
                    </div>
                    <div>
                        <input type="date"
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
                            @click="emailTableVisible = true"
                            :disabled="emailPattern===false"
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
                    <div class="flex">
                        <div><input type="checkbox"
                                   checked /></div>
                        <div>
                            <NuxtLink to="/member/privacy"
                                      target="_blank"
                                      class="text-[#0d6efd] text-12px underline hover:opacity-70">我同意隱私權與資訊安全政策</NuxtLink>
                        </div>
                    </div>
                    <div class="flex">
                        <div><input type="checkbox"
                                   checked /></div>
                        <div>
                            <NuxtLink to="/member/service"
                                      target="_blank"
                                      class="text-[#0d6efd] text-12px underline hover:opacity-70">我同意服務條款</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="mt-5px">
                    <NuxtLink to="/register/done"><button class="w-100% p-y-1.5 p-x-3 border-none outline-none text-16px text-white rounded-1 bg-#e93470 hover:bg-#bb2d3b transition duration-200 cursor-pointer">
                            提交
                        </button></NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const phone = ref('');
const email = ref('');
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
</style>
