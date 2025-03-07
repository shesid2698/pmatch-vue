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
    <div v-if="isCameraOn && !image"
         class="w-100% h-100vh fixed bg-blue">
        <video ref="video"
               autoplay
               playsinline></video>
        <button @click="takePhoto"
                class="rounded-100% absolute left-50% bottom-20% transform-translate-x-[-50%] w-20px h-20px bg-red-6 outline-solid outline-red-6 border-none outline-offset-2"></button>
    </div>
    <div v-else
         class="ccontainer pt-60px ps-5 pe-5 w-90% lg:w-70%">
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
                                <div v-if="innerPage !== 4">
                                    <div v-if="innerPage===1">
                                        <img class="left-img"
                                             :src="item.RewardType === 3 ? '/images/實體獎項-l.svg' : '/images/虛擬獎項-l.svg'"
                                             alt="" />
                                    </div>
                                    <div v-else>
                                        <img class="left-img"
                                             :src="item.RewardType === 3 ? '/images/實體獎項-l.svg' : '/images/虛擬獎項-disabled-l.svg'"
                                             alt="" />
                                    </div>
                                </div>
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
                                <div v-if="innerPage !== 4">
                                    <div v-if="innerPage===1">
                                        <img class="right-img"
                                             :src="item.RewardType ===3 ? '/images/實體獎項-r.svg' : '/images/虛擬獎項-r.svg'"
                                             alt="" />
                                    </div>
                                    <div v-else>
                                        <img class="right-img"
                                             :src="item.RewardType ===3 ? '/images/實體獎項-r.svg' : '/images/獎項-disabled-r.svg'"
                                             alt="" />
                                    </div>
                                </div>
                                <img v-else
                                     class="right-img"
                                     src="/images/獎項-disabled-r.svg"
                                     alt="">
                            </div>
                        </div>
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
                <form @submit="SendRewardForm">
                    <div class="mt-20px h-42px flex justify-between relative"
                         id="progress">
                        <div class="relative h-100% sticky w-42px  border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center font-bold bg-[#e93470] text-white">
                            1
                            <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%]">填寫領獎資料</div>
                        </div>
                        <div class="relative  h-100% sticky w-42px border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold"
                             :class="{'!bg-[#e93470] !text-white':RewardDetail.ProcessStatus.CurrentStep>=2,'bg-white':RewardDetail.ProcessStatus.CurrentStep<2}">
                            2
                            <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">審核中</div>
                        </div>
                        <div class="relative h-100% sticky w-42px border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold"
                             :class="{'!bg-[#e93470] !text-white':RewardDetail.ProcessStatus.CurrentStep>=3,'bg-white':RewardDetail.ProcessStatus.CurrentStep<3}">
                            3
                            <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">通過審核</div>
                        </div>
                        <div class="relative h-100% sticky w-42px border border-[#e93470] border-solid border-[1px] rounded-full text-center content-center text-[#e93470] font-bold"
                             :class="{'!bg-[#e93470] !text-white':RewardDetail.ProcessStatus.CurrentStep>=4,'bg-white':RewardDetail.ProcessStatus.CurrentStep<4}">
                            4
                            <div class="absolute text-black w-fit whitespace-nowrap top-120% left-50% transform-translate-x-[-50%] font-500">寄送獎項</div>
                        </div>
                    </div>
                    <div class="mt-55px">
                        <div class="mb-5px">活動名稱</div>
                        <div class="relative">
                            <input type="text"
                                   v-model="RewardItem.ActivityName"
                                   readonly
                                   class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">得獎獎品</div>
                        <div class="relative">
                            <input type="text"
                                   :value="RewardItem.RewardName"
                                   readonly
                                   class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">中獎人姓名</div>
                        <div class="relative">
                            <input type="text"
                                   required
                                   :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                   v-model="RewardRequest.RecipientName"
                                   class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>

                    <div class="mt-15px">
                        <div class="mb-5px">身分證號碼</div>
                        <div class="relative">
                            <input type="text"
                                   required
                                   :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                   v-model="RewardRequest.IdNumber"
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
                                <select v-model="selectedCity"
                                        :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                    <option value="">請選擇</option>
                                    <option v-for="(item, index) in cities"
                                            :key="index"
                                            :value="index">
                                        {{ index }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-2%"></div>
                            <div class="w-49%">
                                <select v-model="selectedRegion"
                                        :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                    <option value="">請選擇</option>
                                    <option v-for="region in cities[
                                                selectedCity
                                            ]"
                                            :key="region">
                                        {{ region }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-5px">
                            <input type="text"
                                   :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
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
                                <select v-model="selectedCity2"
                                        :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                    <option value="">請選擇</option>
                                    <option v-for="(item, index) in cities2"
                                            :key="index"
                                            :value="index">
                                        {{ index }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-2%"></div>
                            <div class="w-49%">
                                <select v-model="selectedRegion2"
                                        :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                        class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200">
                                    <option value="">請選擇</option>
                                    <option v-for="region in cities2[
                                                selectedCity2
                                            ]"
                                            :key="region">
                                        {{ region }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-5px">
                            <input type="text"
                                   :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                   v-model="address2"
                                   class="box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200" />
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">連絡電話</div>
                        <input type="text"
                               required
                               :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                               v-model="RewardRequest.RecipientPhone"
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                               pattern="\d{10}"
                               title="請輸入10碼數字" />
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">電子信箱</div>
                        <input type="text"
                               required
                               v-model="RewardRequest.Email"
                               :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                               class="password box-border p-y-1.5 p-x-3 text-base w-100% outline-none rounded-1 border-solid border-1 border-[#ced4da] focus:outline-5 focus:outline-[#c2d9fe] focus:outline-offset-0 focus:border-[#A1C0E3] transition duration-200"
                               pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                               title="請輸入有效的電子信箱" />
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">身分證件正面</div>
                        <div class="id-container">
                            <div v-if="croppedImage"
                                 class="relative w-fit h-fit">
                                <div @click="cancelCrop(true)"
                                     class="absolute w-fit h-fit right-20px top-[-10px] cursor-pointer"><img src="/images/remove-btn.png"
                                         width="20"
                                         alt=""></div>
                                <img class="w-85% m-auto"
                                     :src="croppedImage"
                                     alt="">
                            </div>
                            <button v-else
                                    type="button"
                                    class="camera-btn"
                                    :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                    @click="OpenDialog(true)">
                                <img src="/images/camera.svg"
                                     alt=""><br>拍照或上傳照片</button>
                        </div>
                    </div>
                    <div class="mt-15px">
                        <div class="mb-5px">身分證件反面</div>
                        <div class="id-container">
                            <div v-if="croppedImage2"
                                 class="relative w-fit h-fit">
                                <div @click="cancelCrop(false)"
                                     class="absolute w-fit h-fit right-20px top-[-10px] cursor-pointer"><img src="/images/remove-btn.png"
                                         width="20"
                                         alt=""></div>
                                <img class="w-85% m-auto"
                                     :src="croppedImage2"
                                     alt="">
                            </div>
                            <button v-else
                                    type="button"
                                    class="camera-btn"
                                    :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                    @click="OpenDialog(false)">
                                <img src="/images/camera.svg"
                                     alt=""><br>拍照或上傳照片</button>
                        </div>
                    </div>
                    <div class="text-15px text-[#f72585] cursor-pointer"
                         @click="OpenDialog(true,false)"><input type="radio"
                               value="yes"
                               v-model="agreeIdRule"
                               class="pointer-events-none">本人已詳閱並同意 貴公司「蒐集個人資料告知事項」</div>
                    <div class="text-15px text-[#f72585] cursor-pointer"
                         @click="OpenDialog(true,true)"><input type="radio"
                               value="yes"
                               v-model="agreeRewardRule"
                               class="pointer-events-none">本人已詳閱並同意 貴公司「領獎規則」</div>
                    <div class="text-center mt-20px">
                        <button class="colorful-btn"
                                @click="ReturnList"
                                type="button">回上一頁</button>
                        <button class="colorful-btn"
                                :disabled="RewardDetail.ProcessStatus.CurrentStep!==1"
                                type="submit">確認送出</button>
                    </div>
                    <div class="w-100% fixed h-100vh"></div>
                    <el-dialog v-model="dialogVisible"
                               width="500"
                               align-center
                               :show-close="false"
                               :close-on-click-modal="false">
                        <div v-if="!image">
                            <div v-if="IsOpenRewardRule === false && IsOpenIdRule === false">
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
                                    <div class="ml-70px">
                                        <button @click="StartCam"
                                                type="button"
                                                class="rounded-[20px] border-1px border-solid border-[#4361ee] bg-[#3dadff] w-150px h-50px text-white text-20px flex justify-center items-center cursor-pointer"><img src="/images/camera-btn.png"
                                                 class="mr-5px"
                                                 width="30"
                                                 alt="">拍照</button>
                                    </div>
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
                            <div v-else-if="IsOpenRewardRule===true">
                                <div class="relative w-100% h-40px content-center text-center text-18px font-700">
                                    <span class="cursor-pointer flex  absolute right-10px top-50% transform-translate-y-[-50%]"
                                          @click="AgreeRewardRule">
                                        <img width="20"
                                             src="/images/close.png"
                                             alt="">
                                    </span>
                                </div>
                                <div class="px-5 pb-2">
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
                            <div v-else-if="IsOpenIdRule===true">
                                <div class="relative w-100% h-40px content-center text-center text-18px font-700">
                                    <span class="cursor-pointer flex  absolute right-10px top-50% transform-translate-y-[-50%]"
                                          @click="AgreeIdRule">
                                        <img width="20"
                                             src="/images/close.png"
                                             alt="">
                                    </span>
                                </div>
                                <div class="px-5 pb-2">
                                    【蒐集個人資料告知事項】
                                    <br>
                                    <br>
                                    紫海數位科技有限公司(以下簡稱本公司)為遵守個人資料保護法規定，在您提供個人資料予本公司前，依法告知下列事項：
                                    <br>
                                    <br>
                                    一、本公司因辦理抽獎活動而獲取您的姓名、國民身分證統一編號、戶籍地址、通訊地址、帳戶銀行代號及帳號所載個人資料；蒐集之個人資料類別為：「Ｃ○○一 辨識個人者」、「Ｃ○○三 政府資料中之辨識者」。
                                    <br>
                                    <br>
                                    二、本公司依據個人資料保護法及相關法令之規定下，與本公司隱私權保護政策，為蒐集、處理及利用您的個人資料。
                                    <br>
                                    <br>
                                    三、本公司將於蒐集目的之存續期間內合理利用您的個人資料。
                                    <br>
                                    <br>
                                    四、本公司僅於中華民國領域內利用您的個人資料。
                                    <br>
                                    <br>
                                    五、您可依個人資料保護法第 3 條規定，就您的個人資料以書面或電子郵件向本公司請求以下權利：
                                    <br>
                                    (一)查詢或請求閱覽。
                                    <br>
                                    (二)請求製給複製本。
                                    <br>
                                    (三)請求補充或更正。
                                    <br>
                                    (四)請求停止蒐集、處理及利用。
                                    <br>
                                    (五)請求刪除。
                                    您因行使上述權利而導致對您的權益產生減損時，本公司不負相關賠償責任。另依個人資料保護法第 14 條規定，本公司得酌收行政作業費用。
                                    <br>
                                    <br>
                                    六、您瞭解此一同意書符合個人資料保護法及相關法規之要求，且同意本公司留存此同意書，供日後取出查驗。
                                    <br>
                                    <br>
                                    個人資料之同意提供
                                    <br>
                                    一、 本人已充分知悉上述告知事項。
                                    <br>
                                    二、 本人同意紫海數位科技有限公司活動之蒐集目的範圍內，得蒐集、處理及利用本人提供之個人資料。
                                </div>
                            </div>

                        </div>
                        <div v-else>
                            <div class="flex justify-center px-5 py-2">
                                <button @click="Rotate('left')"
                                        type="button"
                                        class="bg-[#3dadff] rounded-3px text-12px text-white w-80px h-fit border-0 flex justify-center items-center py-1 cursor-pointer mr-10px"><img src="/images/rotate-left.png"
                                         width="14"
                                         alt="">向左旋轉</button>
                                <button @click="Rotate('right')"
                                        type="button"
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
                </form>
            </div>
            <div v-else>
                <div class="md:w-460px w-100% m-auto">
                    <form @submit="CreateAcc">
                        <h1 class="platformTitle font-size-30px fw-600"> {{ RewardItem.GamePlatformName }}</h1>
                        <input type="text"
                               name="GamePlatformName"
                               hidden
                               :value="RewardItem.GamePlatformName">
                        <div><span class="text-[#E93470] mr-10px">兌換序號</span><span>{{ RewardItem.RedeemCode }}</span>
                            <input type="text"
                                   name="RedeemCode"
                                   hidden
                                   :value="RewardItem.RedeemCode">
                        </div>
                        <div class="mt-2">
                            <input type="text"
                                   placeholder="遊戲暱稱(必填)"
                                   required
                                   name="MemberCharacterName"
                                   class="colorful-input">
                        </div>
                        <div class="my-3"><span><input type="radio"
                                       class="mr-2"
                                       checked></span><span class="text-[#E93470]">兌換遊戲幣</span></div>
                        <div><input type="text"
                                   readonly
                                   :value="RewardItem.Patch"
                                   name="Value"
                                   class="colorful-input"></div>
                        <div class="mb-3">
                            <select class="colorful-input2"
                                    name="Phone"
                                    required>
                                <option :value="PmMemberPhones[0]"
                                        selected>{{PmMemberPhones[0]}}</option>
                                <option :value="PmMemberPhones[1]">{{PmMemberPhones[1]}}</option>
                                <option :value="PmMemberPhones[2]">{{PmMemberPhones[2]}}</option>
                            </select>
                        </div>
                        <div class="w-fit m-auto mb-3"
                             @click='dialogVisible2=true'><input type="radio"
                                   id="pmatchOrder"
                                   name="pmatchOrder"
                                   class="mr-2"
                                   title="請詳閱領獎規則"
                                   required><label for="pmatchOrder"
                                   class="text-[#E93470]">本人已詳閱並同意貴公司「領獎規則」</label></div>
                        <div class="flex justify-center m-0"><button type="button"
                                    class="colorful-btn"
                                    @click="ReturnList">回上一頁</button><button class="colorful-btn">確認送出</button></div>
                    </form>
                </div>
                <ElDialog v-model="dialogVisible2"
                          :show-close="false"
                          :close-on-click-modal="false">
                    <div class="dialogHeader absolute">
                        服務條款
                    </div>
                    <div class="dialogBody">
                        <div class="dialogContent">
                            <div>
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
                        <div class="flex justify-end mt-0">
                            <ElButton class="colorful-btn"
                                      type="primary"
                                      @click="dialogVisible2 = false">
                                同意
                            </ElButton>
                        </div>
                    </div>
                </ElDialog>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

/**
 * 0=可使用;1=處理中;2=已使用;3=已過期
 */
const innerPage = ref(1);
const pageName = ref('');
const pageNo = ref(1);
const ticketList = ref([]);
let isGetNewPage = true;
const memberToken = useCookie('_PmToken');
const PmMemberPhones = ref([]);

const memberId = useCookie('_PmMemberId');
const { $axios } = useNuxtApp();
const theCities = useGetCities();
const address = ref('');
const cities = ref([]);
const selectedCity = ref('');
const selectedRegion = ref('');
const address2 = ref('');
const cities2 = ref([]);
const selectedCity2 = ref('');
const selectedRegion2 = ref('');
// alert
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
const modalStore = useModalStore();
const openModal = modalStore.showModal;
// alert

// file上傳
/**檔案 */
const fileInput = ref(null);
/**初始圖片預覽 */
const image = ref(null);
/**裁切物件 */
const cropperRef = ref(null);
/**裁切後的正面圖片 */
const croppedImage = ref(null);
/**裁切後的反面圖片 */
const croppedImage2 = ref(null);
/**證件上傳視窗開啟 */
const dialogVisible = ref(false);
/**是否上傳正面照片 */
const IsFrontPic = ref(true);
/**最終正面圖片檔 */
const croppedFile = ref(null);
/**最終反面圖片檔 */
const croppedFile2 = ref(null);
// file上傳

// 拍照
const video = ref(null);
const isCameraOn = ref(false);
const takePhoto = () => {
    isCameraOn.value = false;
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    canvas.getContext('2d').drawImage(video.value, 0, 0);
    image.value = canvas.toDataURL();
};
// 拍照

//領獎規則、告知事項
const IsOpenRewardRule = ref(false);
const agreeRewardRule = ref('');
const IsOpenIdRule = ref(false);
const agreeIdRule = ref('');
//領獎規則、告知事項

// pmatch下單
const dialogVisible2 = ref(false);
// pmatch下單
const RewardItem = ref(null);
const RewardRequest = reactive({
    ActivityId: 0,
    RecipientName: '',
    RecipientPhone: '',
    Email: '',
    ShippingAddress: '',
    ResidentialAddress: '',
    IdNumber: '',
    IdCardFront: '',
    IdCardBack: ''
});
const RewardDetail = ref(null);
/**清除領獎資料 */
const ResetData = () => {
    croppedFile.value = null;
    croppedFile2.value = null;
    selectedRegion.value = '';
    selectedCity.value = '';
    address.value = '';
    selectedRegion2.value = '';
    selectedCity2.value = '';
    address2.value = '';
    pageName.value = '';
    RewardRequest.ActivityId = 0;
    RewardRequest.IdCardBack = '';
    RewardRequest.IdCardFront = '';
    RewardRequest.IdNumber = '';
    RewardRequest.RecipientName = '';
    RewardRequest.RecipientPhone = '';
    RewardRequest.ResidentialAddress = '';
    RewardRequest.ShippingAddress = '';
    agreeRewardRule.value = '';
    agreeIdRule.value = '';
};
/**
 * 取得票閘列表
 */
const GetList = async (status, page) => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberRewardList',
            {
                MemberId: memberId.value,
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
const GetCode = (tipsElement, code) => {
    if (code && innerPage.value == 1) {
        if (!tipsElement) return;
        tipsElement.classList.add('active');
        setTimeout(() => {
            tipsElement.classList.remove('active');
        }, 2000);
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        // await navigator.clipboard.writeText(code);
    }
};
/**取得會員詳細資料 */
const GetMemberDetail = async () => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberDetail',
            {
                PmatchMemberId: memberId.value
            },
            {
                headers: {
                    Authorization: memberToken.value // 帶上 Token
                }
            }
        );
        if (response.status === 200 && response.data.Status.Code === 0) {
            PmMemberPhones.value = [];
            PmMemberPhones.value.push(response.data.Data[0].Mobile1);
            PmMemberPhones.value.push(response.data.Data[0].Mobile2);
            PmMemberPhones.value.push(response.data.Data[0].Mobile3);
            RewardRequest.RecipientPhone = response.data.Data[0].Mobile1;
            RewardRequest.RecipientName = response.data.Data[0].Name;
            RewardRequest.IdNumber = response.data.Data[0].NationalId;
            RewardRequest.ShippingAddress = response.data.Data[0].Address;
            RewardRequest.Email = response.data.Data[0].Email;
        }
    } catch (ex) {
        console.error(`請求失敗: ${ex}`);
    }
};
const TurnPage = async (page, actId) => {
    if (page === 'form') {
        await GetMemberPhysicalRewardInfo(actId);
        cities.value = theCities.getCities();
        cities2.value = cities.value;
        if (cities.value != null && cities.value != undefined) {
            for (const [key, value] of Object.entries(cities.value)) {
                if (RewardRequest.ShippingAddress.indexOf(key) !== -1) {
                    selectedCity.value = key;
                }
            }
            for (const [key, value] of Object.entries(cities2.value)) {
                if (RewardRequest.ResidentialAddress.indexOf(key) !== -1) {
                    selectedCity2.value = key;
                }
            }
            if (selectedCity.value != '' && selectedCity.value != undefined) {
                for (const [key, value] of Object.entries(cities.value[selectedCity.value])) {
                    if (RewardRequest.ShippingAddress.indexOf(value) !== -1) {
                        selectedRegion.value = value;
                    }
                }
            }
            if (selectedCity2.value != '' && selectedCity2.value != undefined) {
                for (const [key, value] of Object.entries(cities2.value[selectedCity2.value])) {
                    if (RewardRequest.ShippingAddress.indexOf(value) !== -1) {
                        selectedRegion2.value = value;
                    }
                }
            }
            if (selectedCity.value !== '' && selectedRegion.value != '') {
                address.value = RewardRequest.ShippingAddress.replace(selectedCity.value, '');
                address.value = address.value.replace(selectedRegion.value, '');
            }
            if (selectedCity2.value !== '' && selectedRegion2.value != '') {
                address2.value = RewardRequest.ResidentialAddress.replace(selectedCity2.value, '');
                address2.value = address2.value.replace(selectedRegion2.value, '');
            }
        }
    } else {
        await GetMemberDetail();
    }
    pageName.value = page;
};
/**取得領獎表單明細 */
const GetMemberPhysicalRewardInfo = async actId => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/GetMemberPhysicalRewardInfo',
            {
                ActivityId: actId
            },
            {
                headers: {
                    Authorization: memberToken.value // 帶上 Token
                }
            }
        );
        if (response.status === 200 && response.data.Status.Code === 0) {
            RewardDetail.value = response.data.Data;
            if (response.data.Data.ProcessStatus.CurrentStep === 1) {
                await GetMemberDetail();
            } else {
                RewardRequest.RecipientName = response.data.Data.RewardInfo.RecipientName;
                RewardRequest.IdNumber = response.data.Data.RewardInfo.IdNumber;
                RewardRequest.ShippingAddress = response.data.Data.RewardInfo.ShippingAddress;
                RewardRequest.ResidentialAddress = response.data.Data.RewardInfo.ResidentialAddress;
                RewardRequest.RecipientPhone = response.data.Data.RewardInfo.RecipientPhone;
                RewardRequest.IdCardFront = response.data.Data.RewardInfo.IdCardInfo.FrontImage;
                RewardRequest.IdCardBack = response.data.Data.RewardInfo.IdCardInfo.BackImage;
                RewardRequest.Email = response.data.Data.RewardInfo.Email;
            }
        }
    } catch (ex) {
        console.error(`GetMemberPhysicalRewardInfo failed..${ex}`);
    }
};
const GetReward = (event, item) => {
    RewardItem.value = item;
    RewardRequest.ActivityId = item.ActivityId;
    const parent = event.currentTarget;
    const tipsElement = parent.querySelector('.tips-shadow');
    if (innerPage.value != 4) {
        switch (item.RewardType) {
            case 1: //遊戲商虛擬
                if (innerPage.value == 1) GetCode(tipsElement, item.RedeemCode);
                break;
            case 2: //媒合商虛擬(Pmatch下單)
                if (innerPage.value == 1) TurnPage('order', item.ActivityId);
                break;
            case 3: //實體兌獎
                TurnPage('form', item.ActivityId);
                break;
            default:
                GetCode(tipsElement, item.RedeemCode);
                break;
        }
    }
};
const OpenDialog = (isFrontPic, isRewardRule) => {
    dialogVisible.value = true;
    if (isRewardRule === undefined) {
        IsFrontPic.value = isFrontPic;
    } else {
        if (isRewardRule === true) {
            IsOpenRewardRule.value = isRewardRule;
            IsOpenIdRule.value = false;
        }
        if (isRewardRule === false) {
            IsOpenIdRule.value = true;
            IsOpenRewardRule.value = false;
        }
    }
};
/**關閉領獎規則 */
const AgreeRewardRule = () => {
    dialogVisible.value = false;
    agreeRewardRule.value = 'yes';
    IsOpenRewardRule.value = false;
};
const AgreeIdRule = () => {
    dialogVisible.value = false;
    agreeIdRule.value = 'yes';
    IsOpenIdRule.value = false;
};
const StartCam = async () => {
    try {
        isCameraOn.value = true;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.value.srcObject = stream;
    } catch (err) {
        await openAlertModal('', '相機存取錯誤');
    }
};
const ReturnList = async () => {
    if (
        RewardRequest.RecipientName != '' ||
        RewardRequest.IdNumber != '' ||
        RewardRequest.ShippingAddress != '' ||
        RewardRequest.ResidentialAddress != '' ||
        RewardRequest.RecipientPhone != '' ||
        RewardRequest.IdCardBack != '' ||
        RewardRequest.IdCardFront != ''
    ) {
        const result = await openModal('資料未送出', '確認是否離開此頁面?', false, false);
        if (result) {
            ResetData();
        }
    } else {
        ResetData();
    }
};
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
    if (IsFrontPic.value === true) {
        croppedImage.value = canvas.toDataURL('image/jpeg');
    } else {
        croppedImage2.value = canvas.toDataURL('image/jpeg');
    }

    // 轉換為 File 物件
    canvas.toBlob(
        blob => {
            const fileName = `cropped-image-${Date.now()}.jpg`;
            if (IsFrontPic.value === true) {
                croppedFile.value = new File([blob], fileName, { type: 'image/jpeg' });
            } else {
                croppedFile2.value = new File([blob], fileName, { type: 'image/jpeg' });
            }
        },
        'image/jpeg',
        0.9
    );
    dialogVisible.value = false;
    cropperRef.value = null;
    image.value = null;
};
const Rotate = direction => {
    if (!cropperRef.value) return;
    if (direction == 'right') {
        cropperRef.value.rotate(90); // 右轉90度
    } else {
        cropperRef.value.rotate(-90); // 左轉90度
    }
};
/**取消裁切 */
const cancelCrop = t_isFrontPic => {
    image.value = null;
    if (t_isFrontPic) {
        if (t_isFrontPic === true) {
            croppedImage.value = null;
            croppedFile.value = null;
        } else {
            croppedImage2.value = null;
            croppedFile2.value = null;
        }
    } else {
        if (IsFrontPic.value === true) {
            croppedImage.value = null;
            croppedFile.value = null;
        } else {
            croppedImage2.value = null;
            croppedFile2.value = null;
        }
    }
};
const SendRewardForm = async event => {
    event.preventDefault();
    if (croppedFile.value == null) {
        await openAlertModal('', '身分證件正面未上傳');
        return;
    }
    if (croppedFile2.value == null) {
        await openAlertModal('', '身分證件反面未上傳');
        return;
    }
    if (agreeRewardRule.value == '') {
        await openAlertModal('', '請詳閱領獎規則');
        return;
    }
    if (agreeIdRule.value == '') {
        await openAlertModal('', '請詳閱蒐集個人資料告知事項');
        return;
    }
    RewardRequest.ShippingAddress = `${selectedCity.value}${selectedRegion.value}${address.value}`;
    RewardRequest.ResidentialAddress = `${selectedCity2.value}${selectedRegion2.value}${address2.value}`;
    //先上傳證件正反面再提交表單
    await UploadPhysicalRewardIdCard(1);
    await UploadPhysicalRewardIdCard(2);
    await SubmitMemberPhysicalReward();
};
/**上傳身分證 */
const UploadPhysicalRewardIdCard = async type => {
    try {
        const formData = new FormData();
        formData.append('ActivityId', RewardRequest.ActivityId);
        formData.append('MemberId', memberId.value);
        formData.append('IdCardType', type);
        if (type === 1) {
            formData.append('File', croppedFile.value);
        } else {
            formData.append('File', croppedFile2.value);
        }
        const response = await $axios.post('/api/v1/Pmatch/UploadPhysicalRewardIdCard', formData, {
            headers: {
                Authorization: memberToken.value // 帶上 Token
            }
        });
        if (response.status === 200 && response.data.Status.Code === 0) {
            if (type === 1) {
                RewardRequest.IdCardFront = response.data.Data;
            } else {
                RewardRequest.IdCardBack = response.data.Data;
            }
        }
    } catch (ex) {
        console.error(`UploadPhysicalRewardIdCard 請求失敗..${ex}`);
    }
};
/**提交領獎資訊 */
const SubmitMemberPhysicalReward = async () => {
    try {
        const response = await $axios.post(
            '/api/v1/Pmatch/SubmitMemberPhysicalReward',
            RewardRequest,
            {
                headers: {
                    Authorization: memberToken.value // 帶上 Token
                }
            }
        );
        if (response.status === 200 && response.data.Status.Code === 0) {
            await openAlertModal('', '申請成功!');
        }
    } catch (ex) {
        console.error(`SubmitMemberPhysicalReward 請求失敗..${ex}`);
    }
};
/**pmatch下單 */
const CreateAcc = async event => {
    try {
        event.preventDefault();
        const form = new FormData(event.target);
        console.log(form.get('pmatchOrder'));
        const response = await $axios.post(
            '/api/v1/Pmatch/CreateAccounting',
            {
                GamePlatformName: form.get('GamePlatformName'),
                MemberCharacterName: form.get('MemberCharacterName'),
                Value: Number(form.get('Value')),
                Phone: form.get('Phone'),
                PmatchMemberId: memberId.value,
                RedeemCode: form.get('RedeemCode')
            },
            {
                headers: {
                    Authorization: memberToken.value // 帶上 Token
                }
            }
        );
        if (response.status === 200 && response.data.Status.Code === 0) {
            await openAlertModal('', '單據已送出，處理中');
            ResetData();
        } else {
            await openAlertModal('', response.data.Status.Message);
        }
    } catch (ex) {
        console.error(`CreateAcc failed..${ex}`);
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
.colorful-btn {
    border: none;
    border-radius: 50px;
    background-image: linear-gradient(to right, #4361ee, #f72585);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    aspect-ratio: 136/56;
    width: 80px;
    overflow: hidden;
    box-sizing: border-box;
    margin-right: 20px;
    color: white;
    cursor: pointer;
    &:hover {
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        background-image: linear-gradient(white, white), linear-gradient(to right, #4361ee, #f72585);
        color: #f72585;
    }
}
.colorful-input2 {
    border: none;
    border-radius: 50px;
    background-image: linear-gradient(to right, #4361ee, #f72585);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    width: 100%;
    height: 30px;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 20px;
    color: white;
    cursor: pointer;
    padding: 0 10px;
    outline: none;
    option {
        background: white;
        color: #f72585;
    }
}
.colorful-input {
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 50px;
    background-image: linear-gradient(white, white), linear-gradient(to right, #4361ee, #f72585);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    width: 100%;
    height: 30px;
    overflow: hidden;
    box-sizing: border-box;
    margin-right: 20px;
    font-size: 16px;
    padding: 0 10px;
}

.platformTitle {
    background: linear-gradient(to top, #4361ee, #f72585);
    background: -webkit-linear-gradient(to top, #4361ee, #f72585);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
}
.dialogHeader {
    background: linear-gradient(to right, #4361ee, #f72585);
    color: #fff;
    padding: 0.75rem;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
}
.dialogBody {
    background: #fff;
    color: #8d8d8d;
    border-radius: 20px;
    padding: 3rem 2rem 2rem 2rem;
}
.dialogContent {
    height: 50vh;
    overflow: auto;
}
.dialogContent::-webkit-scrollbar {
    width: 10px;
}
.dialogContent::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #666;
}
.scrollbar {
    overflow-y: auto;
}
.scrollbar::-webkit-scrollbar {
    width: 5px;
}
.scrollbar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #afafaf;
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
