<template>
    <div class="mt-7rem max-w-1320px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3">
        <div class="mb-5 flex items-center justify-center">
            <!-- title -->
            <div class="flex items-center w-100% lg-w-410px">
                <div class="w-25px h-20px bg-#1a6db4"></div>
                <span class="font-size-1.4rem ms-3 fw-600">聯絡我們</span>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-100% lg-w-auto">
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
                <select v-model="platform" class="selectCol w-100% lg-w-414px rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
                    <option value="" hidden>請選擇..</option>
                    <option v-for="(item, index) in gameList" :key="index" :value="item.PlatformId">{{item.PlatformName}}</option>
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
                <select v-model="questionType" class="selectCol w-100% lg-w-414px rounded-5px h-32px lg-ps-1rem lg-pe-1rem ps-0 pe-0 pt-.2rem pb-.2rem font-size-1rem mb-3">
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
                    <button class="border-none bg-#e93470 color-#fff w-100% lg-w-414px rounded-5px h-35px font-size-1rem" @click="submitForm">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { $axios } = useNuxtApp();
const jwtStore = useJwtStore();
const userToken = useCookie("_PmToken");
const userNameCookie = useCookie("_PmUserName");
const MemberIdCookie = useCookie("_PmMemberId");
const router = useRouter();
const gameList = ref([]);

let accountId = ref("");
let platform = ref("");
let nickName = ref("");
let name = ref("");
let mail = ref("");
let telephone = ref("");
let questionType = ref("");
let questionTheme = ref("");
let questionDescription = ref("");

async function contactList(encryptedPassword) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/Logon",
            {
                Id: 0,
                Category: questionType.value,
                MemberId: accountId.value,
                GameplatformId: platform.value,
                Name:,
                NickName:,
                Email:,
                phonenumber:,
                Title:,
                Content:,
            },
            {
                headers: {},
            }
        );

        if (response.data.Status.Code === 0) {
            memberList.value = response.data.Data;
            userNameCookie.value = response.data.Data.Name;
            tokenCookie.value = response.data.Data.Token;
            router.push("/");
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
    }
}
async function submitForm(){
    console.log(platform.value);
}
// 取得GetPlatformAndCharacterList
async function fetchGameList(token) {
    try {
        const response = await $axios.post(
            "/api/v1/Pmatch/GetPlatformAndCharacterList",
            {},
            {
                headers: {
                    Authorization: token, // 帶上 Token
                },
            }
        );
        if (response.data.Status.Code === 0) {
            gameList.value = response.data.Data;
        } else {
            alert(`${response.data.Status.Message}`);
        }
    } catch (error) {
        console.error("請求失敗:", error);
        data.value = "無法取得資料。"; // 畫面顯示錯誤訊息
    }
}
onMounted(async () => {
    try {
        if (userToken.value != "" && userToken.value != undefined) {
            name.value = userNameCookie.value;
            accountId.value = MemberIdCookie.value;
            fetchGameList(userToken.value)
            return;
        }else{
            router.push("/member/login");
        }
    } catch (error) {
        console.error("頁面初始化失敗:", error);
    }
});

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