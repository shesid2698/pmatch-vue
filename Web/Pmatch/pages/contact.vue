<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-center">
            <!-- title -->
            <div class="flex items-center w-410px">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">聯絡我們</span>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-100%">
                <p class="m-0 mb-3">
                    會員帳號： <span class="color-red">*</span>
                </p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text"
                    v-model="accountId"
                />
                <p class="m-0 mb-3">
                    遊戲平台： <span class="color-red">*</span>
                </p>
                <select v-model="platform" class="selectCol w-100% rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
                    <option value="" hidden>請選擇..</option>
                    <option value="">老子有錢</option>
                </select>
                <p class="m-0 mb-3">
                    遊戲暱稱： <span class="color-red">*</span>
                </p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text" v-model="nickName"
                />
                <p class="m-0 mb-3">
                    聯絡人姓名： <span class="color-red">*</span>
                </p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text" v-model="name"
                />
                <p class="m-0 mb-3">
                    聯絡人信箱： <span class="color-red">*</span>
                </p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text" placeholder="ex: johnny.doe@mail.com"
                    v-model="mail"
                />
                <p class="m-0 mb-3">聯絡人電話：</p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text" placeholder="ex: xxx-xxxxxxxx#ext"
                    v-model="telephone"
                />
                <p class="m-0 mb-3">
                    問題類別： <span class="color-red">*</span>
                </p>
                <select v-model="questionType" class="selectCol w-100% rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
                    <option value="">商務洽談</option>
                    <option value="">會員帳號</option>
                    <option value="">其他</option>
                </select>
                <p class="m-0 mb-3">
                    問題主題： <span class="color-red">*</span>
                </p>
                <input
                    class="entryCol w-100% lg-w-380px rounded-5px h-25px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    type="text"
                    v-model="questionTheme"
                />
                <p class="m-0 mb-3">問題描述：</p>
                <textarea
                    class="entryCol w-100% lg-w-380px rounded-5px h-150px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3"
                    v-model="questionDescription"
                />
                <div>
                    <button class="border-none bg-#e93470 color-#fff w-100% rounded-5px h-35px font-size-1rem" @click="submitForm">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
let accountId = ref("");
let platform = ref("");
let nickName = ref("");
let name = ref("");
let mail = ref("");
let telephone = ref("");
let questionType = ref("");
let questionTheme = ref("");
let questionDescription = ref("");

const submitForm = function(){
    console.log(typeof(accountId.value));
    console.log(accountId.value);
    console.log(platform.value);
}

</script>

<style scoped>
.entryCol,.selectCol {
    border: 1px solid #ccc;
}
.entryCol:focus, .selectCol:focus {
    border-color: #a9d8f8;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
.selectCol{
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}
.selectCol::-ms-expand{
    display: none;
}
</style>