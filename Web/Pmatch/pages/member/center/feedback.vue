<template>
  <Head>
    <title>PMatch遊戲道具交易平台</title>
    <Meta property="og:title" content="PMatch遊戲道具交易平台" />
    <Meta name="keywords" content="pmatch,pmatch交易,博奕遊戲,幣商,媒合商,遊戲幣,虛擬幣,遊戲交易,媒合交易,買幣,賣幣,虛寶交易" />
    <Meta name="description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
    <Meta property="og:description" content="Pmatch遊戲道具交易平台 – 線上遊戲安心交易的第一選擇，Pmatch為你嚴選商家，用合約保障你的權益，杜絕詐騙，防護交易安全" />
  </Head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css?version='0.0.1.10'" />  
  <div>
    <div class="ccontainer pt-60px ps-5 pe-5 w-90% xl:w-70%">
      <div class="lg:w-160px">
        <MemberCenter></MemberCenter>
      </div>
      <!-- 主畫面 -->
      <div class="lg:pl-20px w-100%" v-if="!showExchangeView">
        <div class="flex flex-col lg:flex-row mb-10">
          <div class="w-100% lg:w-43% flex flex-col justify-between h-50px lg:h-250px">
            <div class="flex w-100% justify-between">
                <div class="whitespace-nowrap text-[20px] font-500 text-black line-height-50px">
                    {{
                  memberRewardList.Type === 2
                    ? "我的推薦碼"
                    : "綁定推薦碼"
                    }}
                    <el-tooltip v-if="memberRewardList.Type === 2" class="box-item" effect="dark" placement="top">
                        <template #content>
                            <div class="text-14px">
                                讓好朋友綁定你的推薦碼，好友消費時，就能共享回饋。
                                <div style="text-align: right;"><a href="https://www.pmatch.com.tw/helpcenter/1420" target="_blank" style="color: #FFD393;">點擊查看更多</a></div>
                            </div>
                        </template>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M8.5 7.65002V11.15" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.5 4.85702L8.5075 4.84924" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.5 15C12.6421 15 16 11.866 16 8C16 4.134 12.6421 1 8.5 1C4.35786 1 1 4.134 1 8C1 11.866 4.35786 15 8.5 15Z" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </el-tooltip>
                </div>
              <div>
                <div class="flex h-55px">
                  <div
                    class="w-100px lg:w-235px border-solid border-1 border-[#ced2db] text-end content-center p-x-10px text-[24px] text-black font-500">
                    {{
                      memberRewardList.Type === 2
                        ? memberRewardList.InviteCode
                        : memberRewardList.RefferCode
                    }}
                  </div>
                  <div class="w-75px lg:w-95px h-100% text-center bg-[#3caadc] content-center text-white font-500 text-[20px] font-500 text-[18px] text-[#757575]"
                       :class="timeValue > 0 ? 'bg-#3caadc' : 'bg-#959595'">
                      {{ timeValue > 0 ? "開啟中" : "關閉中" }}
                      <el-tooltip class="box-item" effect="dark" placement="top">
                          <template #content>
                              <div class="text-14px">
                                  只有在推薦碼開啟的有效期間內交易，才會享有回饋。
                              </div>
                          </template>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                              <path d="M8.5 7.65002V11.15" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M8.5 4.85702L8.5075 4.84924" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M8.5 15C12.6421 15 16 11.866 16 8C16 4.134 12.6421 1 8.5 1C4.35786 1 1 4.134 1 8C1 11.866 4.35786 15 8.5 15Z" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                      </el-tooltip>
                  </div>
                </div>
                <div class="text-end m-t-10px flex items-center justify-end" v-show="timeValue > 0">
                  <div class="me-5">剩餘時間</div>
                  <div>
                    <el-countdown :value="Date.now() + timeValue" v-on:change="GetTimes" format="DD [天] HH:mm:ss" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hidden min-w-100px lg:block"></div>
          <div class="w-100% lg:w-55% flex flex-wrap mt-150px lg:mt-0">
            <!-- 回饋%數 -->
             <div class="mt-30px lg:mt-0 flex h-30px items-center justify-between">
                <div class="whitespace-nowrap h-100% font-500 text-gray-900 text-[16px] content-center">
                  點擊選擇平台查當前回饋%數
                  <el-tooltip class="box-item" effect="dark" placement="top">
                    <template #content>
                        <div class="text-14px">
                            選擇平台，可查看下線在這個平台交易時，自身可享有的回饋數量。(推薦碼需開啟)
                        </div>
                    </template>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" class="translate-y-[1.5px]">
                        <path d="M8.5 7.65002V11.15" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 4.85702L8.5075 4.84924" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 15C12.6421 15 16 11.866 16 8C16 4.134 12.6421 1 8.5 1C4.35786 1 1 4.134 1 8C1 11.866 4.35786 15 8.5 15Z" stroke="#ACB4C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </el-tooltip>
                </div>
                <div class="h-100% flex"><div class="w-100px lg:w-180px relative"></div>
              </div>
            </div>
            <!-- 平台 -->
            <div class="grid grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-2" >
              <div v-for="(item, index) in memberRewardList.PlatformsReward" :key="index" class="col-span-1" >
                <!-- 判斷是否為選中項目，顯示委買&賣 -->
                <div v-if="selectedIndex === index" class="flex cursor-pointer h-45px bg-white" @click="selectPlatform(item.PlatformName, index)">
                  <div class="flex items-center w-50% h-45px border-1 border-solid border-[#ced2db] border-r-none">
                    <div class="w-40% text-start text-[16px] font-500 ps-3 text-black"><span class="flex items-center justify-center bg-[#FFE8A3] w-30px h-30px">買</span></div>
                    <div class="w-60% text-end text-[16px] font-500 pr-2">
                      {{ buyRewardValue }} %
                    </div>
                  </div>
                  <div class="flex items-center justify-between w-50% h-45px border-1 border-solid border-[#ced2db]">
                    <div class="w-40% text-start text-[16px] font-500 ps-3 text-black "><span class="flex items-center justify-center bg-[#E4CCFF] w-30px h-30px">賣</span></div>
                    <div class="w-60% text-end text-[16px] font-500 pr-2">
                      {{ sellRewardValue }} %
                    </div>
                  </div>
                </div>   
                <!-- 顯示原本區塊 -->
                <div v-else class="flex cursor-pointer" @click="selectPlatform(item.PlatformName, index)">
                  <div
                    class="font-500 text-[18px] w-165px h-45px bg-[#ff83ad] border-1 border-solid border-[#ff83ad] text-center flex items-center justify-center text-white">
                    {{ item.PlatformName }}
                  </div>
                  <div
                    class="font-500 text-[18px] w-135px h-45px text-gray-900 border-1 border-solid border-[#ced2db] bg-white text-end flex items-center justify-end pr-4">
                    {{ item.Value }}&emsp;幣
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
        <hr />
        <div id="detail" class="flex items-center mb-10px mt-30px">
          <div class="mr-15px text-black content-center font-500 text-[20px] border-none">
            明細
          </div>
          <div class="relative rounded-[10px] bg-[#14ae5c] w-117px h-25px">
            <select v-model="dataDate"
              class="text-[16px] rounded-[10px] z-1 absolute top-0 left-0 outline-none w-100% h-100% bg-transparent border-none text-white text-center content-center">
              <option value="0" class="bg-[#14ae5c]">
                近30日
              </option>
              <option value="1" class="bg-[#14ae5c]">
                近3個月
              </option>
              <option value="2" class="bg-[#14ae5c]">
                近半年
              </option>
              <option value="3" class="bg-[#14ae5c]">
                近1年
              </option>
              <option value="4" class="bg-[#14ae5c]">自訂</option>
            </select>
            <div class="absolute right-10% top-50% transform-translate-y-[-50%] z-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="15" height="15" fill="url(#pattern0_41_592)" />
                <defs>
                  <pattern id="pattern0_41_592" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_41_592" transform="scale(0.0078125)" />
                  </pattern>
                  <image id="image0_41_592" width="128" height="128"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABCRJREFUeJzt3M2rVXUUxvHvqrTUSku0gkKiUTSLoEEDzTIlMQpq0CAhcBA0MYIGDYIGDRpEBUEDIQgUDNGgrESzvGkmRWXSm0mERBSJvZA37eXep8E+xUWOh5v3t/fa5+zn8westfZvPXffe/fZHDAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzsxaJUoUkXQY8BFxSqqb1dRx4OiKOlShWMgD7gJtK1bOBxiJiWYlCJQNwCji/VD0baDwiLixR6JwSRXo2Fqxlg20qVajkHWAWsBVYU6qm9bUDuDMi/ihRrFgAACTNBrYBq0vWtf/sAu6IiFOlChYNAICkOcB2YHnp2h23D1gVEeMlixYPAICkucDrwNI66nfQfmBlRJwoXbiWAABIuhjYCdxYV4+OOADcFhG/1VG8tgAASJoPvAncUGefEXYQuCUifqqrQa0BAJC0ANgNXF93rxFzCFgeEcfrbFJ7AAAkLQLeBq5rot8IOAwsi4gf6m7USAAAJC0G9gDXNtVzSB0BlkbE9000aywAAJKupArBNU32HSJHqZZ/tKmGjQYAQNJVwBhwddO9W+5bquV/02TTxgMAIGkJVQiWZPRvoe+olv91041Lfhg0bb1b3Aqgkd9zLfcjsCJj+ZAUAICIOALcDNT+l26LHaP6V++LrAHSAgAQEYeBlVRvuXTNL1TP9j/LHCI1AAARcQi4Ffg5e5YG/Ur1ePej7EHSAwAQEQeB24Fanne3zDiwJiI+yB4EWhIAgIg4AKwCin/i1SK/A6sjYm/2IP9qTQAAImI/1Z2g6GfeLXGS6id/LHuQqVoVAIDeT8ddQLG3XlrgT+CeiHgre5DTtS4AABGxiyoERd57S/YXcHdEvJY9SD+tDABAROwA7gX+zp5lBiaA+yLi1exBzqS1AQCIiJcZ3hBMAGsj4qXsQYaepLWSJjQ8JiWtyz63kSLpfg1HCCYlPZB9XiNJ0rreAbfVpKQHs89ppElan73lAR7JPp9OkPRw9qb7eDT7XDpF0uPZG5/isezz6CRJT2RvXtJT2efQaZKeTFz+M9nX33mSQtJzCcvfICnlnUo7TS8Ezze4/Bcktfopauf0QrChgeW/6OW3lKRzJW2qcflbJJ2XfZ02QC8Em2tY/jYvf0hImiXplYLLf0OSvwFtmEiaLWl7geXvlHRB9vXYWZA0R9LuGSx/r6R52ddhMyBprqQ9Z7H8dyUV+TJGSyZpnqR3/sfy35N0UfbcVpCk+ZLen8byP5Z0afa8VgNJCyR9OGD5n0hamD2n1UjSIkmf9ln+l5Iuz57PGiBpsaTPpyz/K0lXZM+VobOfZvVu9esBAc/W/XVsZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm0/APBjFgz0mKqV4AAAAASUVORK5CYII=" />
                </defs>
              </svg>
            </div>
          </div>
          <div v-show="showDateChoose" class="ml-10px">
            <el-config-provider :locale="zhCn">
              <el-date-picker v-model="dateValue" type="daterange" range-separator="To" start-placeholder="起始日期"
                end-placeholder="結束日期" @change="Getdate" />
            </el-config-provider>
          </div>
        </div>
        <div ref="scrollbarContainer" v-infinite-scroll="load" class="infinite-table-container"
          style="overflow: auto; max-height: 400px">
          <el-table :data="tableData" style="width: 100%" :header-cell-style="{
            color: 'white',
            background: '#3CAADC',
          }" stripe border>
            <el-table-column prop="EndTime" label="日期" :formatter="formatDate2" />
            <el-table-column prop="Item" label="項目" />
            <el-table-column prop="Amount" label="數量" />
            <el-table-column prop="Remark" label="備註" />
          </el-table>
        </div>
        <!-- 切換頁面按鈕(僅在 showExchangeView 判斷通過時才顯示按鈕) -->
        <div v-if="canShowExchangeBtn && !showExchangeView" class="w-100% text-center mt-5" >
          <button class="exchangeBtn" @click="handleExchange">兌換回饋</button>
        </div>   
      </div>
      <!-- 兌換|線上下單畫面 -->
      <div class="lg:pl-20px w-100%" v-else>
        <div class="w-full relative md-mt-5rem z-1">
          <div class="md-mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3 relative z-2">            
            <!-- 表單內容 -->
             <div class="w-full relative md-mt-5rem z-1">     
              <div v-if="displayRadio != null" v-show="(displayRadio.isEnableWithdraw || displayRadio.IsEnabledSell)
                " class=" md-mt-7rem max-w-1110px m-auto lg-ps-0 ps-3 lg-pe-0 pe-3 relative z-2">
                <div class="w-100% block md-flex justify-center flex-wrap">
                  <div class="md-w-460px">                    
                  <!-- 自訂遊戲平台 dropdown -->
                  <div class="platformBox relative mb-5 ">
                    <div class="platformContent py-2" @click.stop="platformToggle">
                      <div class="font-size-18px pl-2">
                        {{ selectedPlatform || "選擇平台" }}
                      </div>
                      <div class="absolute top-13px right-20px">
                        <img class="w-25px" src="/images/arrowDownLine.png" alt="下拉icon" />
                      </div>
                    </div>
                    <div v-show="platformBox" class="platformgGameBox absolute top-0 w-100% z-2">
                      <div class="platformgGameContent">
                        <div class="py-2 pl-2">平台列表</div>
                        <div
                          v-for="(platform, index) in memberRewardList.PlatformsReward"
                          :key="index"
                          class="py-2 platformgGame pl-2"
                          @click.stop="selectPlatform(platform.PlatformName, index)"
                        >
                          {{ platform.PlatformName }}
                        </div>
                      </div>
                    </div>
                  </div>
                    <div class="entryBox w-100% mb-5">
                      <div class="entryContent w-100%">
                        <input class="entryDetail w-90% py-.5rem font-size-18px placeholder-[#f72585]" type="text" placeholder="遊戲暱稱(必填)"
                          v-model="accMemberName" />
                      </div>
                    </div>
                    <div v-if="displayRadio != null">
                      <!-- v-if="displayRadio != null"
                                    v-show="displayRadio.isEnableWithdraw" -->
                      <!-- radio 區塊 -->
                      <div v-if="rewardInfo != null" class="w-100% flex justify-center mb-5">
                        <!-- 提領 -->
                        <div class="flex items-center mx-10" :class="{ 'opacity-50 cursor-not-allowed': rewardInfo.IsEnableBuyReward !== true }">
                          <input
                            type="radio"
                            class="w-20px h-20px m-0 me-3 custom-radio"
                            v-model="isSell"
                            id="withdraw"
                            :value="false"
                            :disabled="rewardInfo.IsEnableBuyReward !== true"
                          />
                          <label for="withdraw" class="radio-label font-size-18px color-#f72585">
                            提領
                          </label>
                        </div>
                        <!-- 委賣 -->
                        <div class="flex items-center mx-10" :class="{ 'opacity-50 cursor-not-allowed': rewardInfo.IsEnableSellReward !== true }">
                          <input
                            type="radio"
                            class="w-20px h-20px m-0 me-3 custom-radio"
                            v-model="isSell"
                            id="sell"
                            :value="true"
                            :disabled="rewardInfo.IsEnableSellReward !== true"
                          />
                          <label for="sell" class="radio-label font-size-18px color-#4361ee">
                            委賣
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- 自訂兌換數量 dropdown -->
                    <div class="amountBox relative mb-5">
                      <div class="amountContent py-2" @click.stop="AmountToggle">
                        <div class="font-size-18px pl-2">
                          {{
                            selectedAmount || '選擇使用回饋數量(遊戲幣)'
                          }}
                        </div>
                        <div class="absolute top-13px right-20px">
                          <img class="w-25px" src="/images/arrowDownLine.png" alt="下拉icon" />
                        </div>
                      </div>
                      <div v-show="amountBox" class="exchangeAmountBox absolute top-0 w-100% z-2">
                        <div class="exchangeAmountContent">
                          <div class="py-2 pl-2">
                          {{
                            (isSell
                              ? '委賣回饋幣數量'
                              : '提領回饋幣數量'
                            )
                          }}</div>
                          <div
                            class="py-2 exchangeAmount pl-2"
                            v-for="(amount, index) in selectedAmounts"
                            :key="index"
                            @click.stop="selectAmount(amount)"
                          >
                            {{ amount.toLocaleString() }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 點委賣出現 -->
                    <div class="w-100% flex justify-center mb-5" v-if="displayRadio != null"
                      v-show="isSell && displayRadio.IsEnabledSell">
                      <div class="text-15px">
                        * 請參考最新委賣比值，實際兌換的筆直須依媒合商告知為準
                      </div>
                    </div>
                    <div class="contactBox relative mb-5">
                      <div class="contactContent py-2 " @click.stop="contactToggle">
                        <div class="font-size-18px pl-2">
                          {{ selectedContact || "聯絡資訊" }}
                        </div>
                        <div class="absolute top-13px right-20px">
                          <img class="w-25px" src="/images/arrowDown.png" alt="下拉icon" />
                        </div>
                      </div>
                      <div v-show="contactBox" class="contactPhoneBox absolute top-0 w-100% z-2">
                        <div class="contactPhoneContent">
                          <div class="py-2 pl-2">聯絡資訊</div>
                          <div class="py-2 contactPhone pl-2" v-show="memberPhone1Cookie" @click.stop="
                            selectedPhone(memberPhone1Cookie)
                            ">
                            {{ memberPhone1Cookie }}
                          </div>
                          <div class="py-2 contactPhone" v-show="memberPhone2Cookie" @click.stop="
                            selectedPhone(memberPhone2Cookie)
                            ">
                            {{ memberPhone2Cookie }}
                          </div>
                          <div class="py-2 contactPhone" v-show="memberPhone3Cookie" @click.stop="
                            selectedPhone(memberPhone3Cookie)
                            ">
                            {{ memberPhone3Cookie }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <div class="relative mb-5">
                    <div class="flex items-center font-size-18px">
                      <input type="radio" class="w-20px h-20px m-0 me-3 custom-radio" id="read" v-model="isContractRead"
                        :value="true" :disabled="radioDisabled"/>
                      <ElButton class="readBtn" plain @click="readContract">
                        我已詳細閱讀此服務條款(必填)
                      </ElButton>
                      <ElDialog v-model="dialogVisible" :close-on-click-modal="false">
                        <div class="dialogHeader absolute">
                          服務條款
                        </div>
                        <div class="dialogBody">
                          <div class="dialogContent">
                            <div v-if="displayRadio" v-html="rewardInfo.Contract?.Content"></div>
                          </div>
                          <div class="flex justify-end mt-5">
                            <ElButton class="agreeBtn" type="primary" @click="handleAgree">
                              同意
                            </ElButton>
                          </div>
                        </div>
                      </ElDialog>
                    </div>
                  </div>
                </div>
                <!-- 返回按鈕 -->
                <div class="flex justify-center gap-6">
                  <button class="backBtn" @click="handleBack">
                    回上一頁
                  </button>
                  <button class="submitBtn" @click="handleSubmit">
                    確認送出
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
// 引入中文語系與彈窗 modal 狀態管理
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useAlertModalStore } from '../stores/useAlertModal.js';
// 初始化彈窗 store 與 modal 方法
const alertModalStore = useAlertModalStore();
const openAlertModal = alertModalStore.alertShowModal;
// 抓取登入用戶 cookie、axios 實例
const MemberIdCookie = useCookie('_PmMemberId');
const tokenCookie = useCookie('_PmToken');
const { $axios } = useNuxtApp();
// 初始化滾動容器與 jwt store
const scrollbarContainer = ref(null);
const jwtStore = useJwtStore();
// 條件與畫面控制變數
const dataDate = ref('0');
const dateValue = ref('');
const memberRewardList = ref([]);
const tableData = ref([]);
let firstLoad = true;
const showExchangeView = ref(false); // true = 兌換回饋頁面 , false = 會員回饋頁面
const isSell = ref(null); // true = 委賣, false = 提領
// 自定義下拉式選單的開關狀態
const platformBox = ref(false);
const contactBox = ref(false);
const amountBox = ref(false);
// 條款開關與狀態
const isContractRead = ref(false); // 是否已閱讀服務條款
const dialogVisible = ref(false); // 是否打開服務條款
const radioDisabled = ref(true); // 初始禁用服務條款

// 使用者聯絡資訊
const memberPhone1Cookie = ref('0912345678');
const memberPhone2Cookie = ref('');
const memberPhone3Cookie = ref('');
// 表單欄位與選項
const accMemberName = ref('');
const selectedIndex = ref(null); // 查看切換 平台|委買&賣
const selectedPlatform = ref('');
const selectedAmount = ref('');
const displayAmount = ref(''); 
const selectedContact = ref('');
// 委買與委賣值
const buyRewardValue = ref('0');
const sellRewardValue = ref('0');
// 自訂時間範圍與狀態
const startTime = ref('');
const endTime = ref('');
const showDateChoose = ref(false);
const currentPage = ref(1);
const timeValue = ref(0);
// 當 dataDate 改變時，自動更新時間區間與重新撈資料
const updateTimeRange = async () => {
  if (dataDate.value === '4') {
    showDateChoose.value = true;
  } else {
    showDateChoose.value = false;
    const now = new Date();
    const offsetDays = {
      0: 30, // 近30日
      1: 90, // 近3個月
      2: 180, // 近半年
      3: 365 // 近1年
    };
    const selectedOffset = offsetDays[dataDate.value];
    if (selectedOffset) {
      // 自動計算時間範圍
      const start = new Date(now);
      start.setDate(now.getDate() - selectedOffset);

      startTime.value = formatDate(start, true);
      endTime.value = formatDate(now, true);
    }
    // 重置頁碼
    currentPage.value = 1;
    //
    await fetchOrderListData();
  }
};
// 將 JS 日期轉成 yyyy-MM-dd(T)HH:mm:ss 字串
const formatDate = (date, isIncludeT) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  var ret = '';

  if (isIncludeT == true) {
    ret = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  } else {
    ret = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return ret;
};
// 表格欄位格式化用（不含 T）
const formatDate2 = (row, column, cellValue) => {
  // Localtime to ISO
  var date = new Date(cellValue);
  var ret = formatDate(date, false);

  return ret;
};
// 變更委買委賣的值 (換遊戲平台時觸發)
const RewardPlatformChange = () => {
  const item = memberRewardList.value.PlatformsReward[selectedIndex.value];
  if (item) {
    selectedPlatform.value = item.PlatformName;
    buyRewardValue.value = item.BuyRewardValue;
    sellRewardValue.value = item.SellRewardValue;
  } else {
    buyRewardValue.value = '0';
    sellRewardValue.value = '0';
  }
};
// 判斷要不要顯示 兌換回饋按鈕
const canShowExchangeBtn = computed(() => {
  const r = rewardInfo.value;
  const hasBuy = r.IsEnableBuyReward === true;
  const hasSell = r.IsEnableSellReward === true;
  const hasContract =
    !!(r.Contract?.Content && r.Contract.Content.trim().replace(/<[^>]*>/g, '').length > 0);
  return (hasBuy || hasSell) && hasContract;
});
// 這支函式會從後端撈「會員是否可兌換回饋」的設定（是否開啟、是否有條款）
const rewardInfo = ref({});
const fetchRewardInfo = async () => {
  try {
    const res = await $axios.post('/api/v1/Pmatch/MemberGetRewardInfo', {
      MemberId: MemberIdCookie.value
    }, {
      headers: {
        Authorization: tokenCookie.value
      }
    });
    if (res.data.Status.Code === 0) {
      const data = res.data.Data;
      rewardInfo.value = data;

      const hasBuy = data.IsEnableBuyReward === true;
      const hasSell = data.IsEnableSellReward === true;

      const hasContract = !!(
        data.Contract?.Content &&
        data.Contract.Content.trim().replace(/<[^>]*>/g, '').length > 0
      );

      // 如果條件不符 => 不顯示兌換畫面
      if (!(hasBuy || hasSell) || !hasContract) {
        showExchangeView.value = false;
      }

    } else {
      showExchangeView.value = false;
    }
  } catch (error) {
    console.error('請求失敗:', error);
    showExchangeView.value = false;
  }
};
// 撈取回饋資訊(推薦碼與平台列表資料)
async function fetchRewardListData() {
  if (!tokenCookie.value && !MemberIdCookie.value) {
    await openAlertModal(' ', '請先登入會員');
  }
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetMemberReward',
      {
        MemberId: MemberIdCookie.value,
      },
      {
        headers: {
          Authorization: tokenCookie.value // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      const data = response.data.Data;
      memberRewardList.value = data;

      if (memberRewardList.value != null) {
        // 清除時間
        timeValue.value = 0;
        // EndTime = null 表示推薦碼已經停用
        if (memberRewardList.value.EndTime != null) {
          // 計算推薦碼狀態
          const startTimeString = memberRewardList.value.ActivityStartTime;
          const startTime = new Date(startTimeString).getTime();
          const endTimeString = memberRewardList.value.ActivityEndTime;
          const endTime = new Date(endTimeString).getTime();
          const now = Date.now();

          // 如果現在時間在活動時間內
          if (now > startTime && now < endTime) {
            // 計算差值
            const difference = endTime - now;
            // 確保不會有負值
            timeValue.value = Math.max(difference, 0);
          }
        }
      }
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}
// 撈取會員的回饋明細（分頁）
async function fetchOrderListData() {
  if (!tokenCookie.value && !MemberIdCookie.value) {
    await openAlertModal(' ', '請先登入會員');
  }
  try {
    const response = await $axios.post(
      '/api/v1/Pmatch/GetDownlineOrder',
      {
        PmatchMemberId: MemberIdCookie.value,
        StartTime: startTime.value,
        EndTime: endTime.value,
        PageSize: 10,
        PageNo: currentPage.value
      },
      {
        headers: {
          Authorization: tokenCookie.value // 帶上 Token
        }
      }
    );
    if (response.data.Status.Code === 0) {
      tableData.value = response.data.Data;
      if (tableData.value != null && tableData.value.length > 0) {
        currentPage.value = tableData.value[0].CurrentPage;
      }
    } else {
      await openAlertModal(' ', `${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('請求失敗:', error);
  }
}
// 滾動分頁載入更多資料
const load = async () => {
  if (tableData.value.length > 0 && currentPage.value) {
    currentPage.value++;
    if (tableData.value[0].TotalPages < currentPage.value) {
      currentPage.value = tableData.value[0].TotalPages;
      return;
    }
    try {
      const formattedStartTime = formatDate(new Date(startTime.value), true);
      const formattedEndTime = formatDate(new Date(endTime.value), true);
      // 調用 API 加載數據
      const response = await $axios.post(
        '/api/v1/Pmatch/GetDownlineOrder',
        {
          PmatchMemberId: MemberIdCookie.value,
          StartTime: formattedStartTime,
          EndTime: formattedEndTime,
          PageSize: 10,
          PageNo: currentPage.value
        },
        {
          headers: {
            Authorization: tokenCookie.value // 帶上 Token
          }
        }
      );
      const newData = response.data.Data;

      // 更新表格數據
      if (newData.length > 0) {
        tableData.value.push(...newData);
      } else {
        if (firstLoad === true) {
          return;
        } else {
          await openAlertModal(' ', '已經是最後一頁了');
        }
      }
    } catch (error) {
      console.error('加載數據失敗：', error);
    } finally {
    }
  }
};
// 使用者自訂日期時的處理方法
const Getdate = async () => {
  if (dataDate.value === '4' && dateValue.value.length === 2) {
    startTime.value = formatDate(dateValue.value[0], true);

    // 結束時間設定為當天的 23:59:59
    var ed = new Date(dateValue.value[1]).setHours(23, 59, 59, 0);
    var ed2 = new Date(ed);
    endTime.value = formatDate(ed2, true);
  }
  await fetchOrderListData();
};
// 將 JS 日期轉成 yyyy-MM-dd HH:mm:ss
const DateFormatt = date => {
  var t_Date =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0') +
    ' ' +
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0') +
    ':' +
    String(date.getSeconds()).padStart(2, '0');
  return t_Date;
};
// 儲存推薦碼剩餘時間
const GetTimes = time => {
  timeValue.value = time;
};
// 滾動容器觸底觸發載入更多
const LoadMoreData = async event => {
  if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
    await load();
  }
};
// 兌換回饋|選擇平台
const platformToggle = () => {
  platformBox.value = !platformBox.value;
    if (platformBox.value) {
    amountBox.value = false;
    contactBox.value = false;
  }
};
// 點選某遊戲平台時執行：更新平台與對應值
const selectPlatform = async (platformName, index) => {
  if (selectedIndex.value === index) {
    selectedIndex.value = null;
    platformBox.value = false;
    return;
  }
  selectedPlatform.value = platformName;
  selectedIndex.value = index;
  platformBox.value = false;  
  // 清掉已填項目(回饋數量、合約條款、提領or委賣)
  radioDisabled.value = true;
  isContractRead.value = false;
  isSell.value = null;
  selectedAmount.value = null;
};
// 可選擇兌換數量選項列表（由程式自動推算）
const selectedAmounts = ref([]);
// 兌換回饋|兌換數量
const AmountToggle = () => {
  if (!selectedPlatform.value) {
    openAlertModal(' ', '請先選擇遊戲平台');
    return;
  }
  if (isSell.value === null) {
    openAlertModal(' ', '請選擇提領或委賣');
    return;
  }
  amountBox.value = !amountBox.value;
  if (amountBox.value) {
    platformBox.value = false;
    contactBox.value = false;

    const selectedItem = memberRewardList.value.PlatformsReward[selectedIndex.value];
    // 根據 isSell 切換抓取 SellOptions 或 BuyOptions
    const options = isSell.value ? selectedItem?.SellOptions : selectedItem?.BuyOptions;

    // 改為只接後端設定
    if (Array.isArray(options) && options.length > 0) {
      selectedAmounts.value = options;
    } else {
      selectedAmounts.value = [];
    }
  }
};
// 點選某兌換數量時執行：更新顯示數量
const selectAmount = (val) => {
  selectedAmount.value = Number(val);
  amountBox.value = false;
    if (selectedAmount.value === 0) {
    openAlertModal(' ', '目前無可用的回饋幣，請稍後再試');
  }
    return selectedAmount.value;
};
// 兌換回饋|聯絡資訊
const contactToggle = () => {
  contactBox.value = !contactBox.value;
    if (contactBox.value) {
    platformBox.value = false;
    amountBox.value = false;
  }
};
// 選取聯絡電話
const selectedPhone = phone => {
  selectedContact.value = phone;
  contactBox.value = false;
};
// 兌換回饋|服務條款
const readContract = async () => {
  if (selectedIndex.value == null) {
    await openAlertModal(' ', '請先選擇遊戲平台');
    return;
  }
  const platform = memberRewardList.value.PlatformsReward[selectedIndex.value];
  if (!platform || !platform.PlatformName) {
    await openAlertModal(' ', '無法取得平台名稱，請重新選擇');
    return;
  }
    dialogVisible.value = true;
};
// 表單是否啟用提領 / 委賣
const displayRadio = ref({
  isEnableWithdraw: true,
  IsEnabledSell: true,
});
// 重製表單
const resetForm = () => {
  selectedPlatform.value = null;
  accMemberName.value = null;
  isSell.value = null;
  selectedAmount.value = null;
  selectedContact.value = null;
  selectedIndex.value = null;
};
// 前往兌換回饋
const handleExchange = () => {
  resetForm();
  showExchangeView.value = true;
  selectedPlatform.value = null;
};
// 服務條款啟用
const handleAgree = () => {
  dialogVisible.value = false;
  radioDisabled.value = false;
  isContractRead.value = true;
};
// 復原服務條款|返回
const handleBack = () => {
  resetForm();
  radioDisabled.value = true;
  isContractRead.value = false;
  showExchangeView.value = false;
};
// 復原服務條款|送出
const handleSubmit = () => {
  sendAccList();
  radioDisabled.value = true;
  isContractRead.value = false;
};
// 表單送出方法（CreateAccounting）
const sendAccList = async () => {
  // 取得選擇的平台物件 | 驗證：平台、暱稱、提領/委賣、聯絡方式、條款
  const selectedItem = memberRewardList.value.PlatformsReward[selectedIndex.value];  
  if (!selectedPlatform.value || !selectedItem) {
    await openAlertModal(' ', '請選擇遊戲平台');
    return;
  }
  if (!accMemberName.value.trim()) {
    await openAlertModal(' ', '請輸入遊戲暱稱');
    return;
  }
  if (isSell.value === null) {
    await openAlertModal(' ', '請選擇提領或委賣');
    return;
  }
  if (!selectedContact.value) {
    await openAlertModal(' ', '請選擇聯絡資訊');
    return;
  }
  if (!isContractRead.value) {
    await openAlertModal(' ', '請勾選「我已詳細閱讀此服務條款」');
    return;
  }
  // 驗證通過後送出 API
  try {
    const payload = {
      ContractId: rewardInfo.value?.Contract?.Id,
      GamePlatformName: selectedPlatform.value,
      MemberCharacterName: accMemberName.value,
      TransactionMode: isSell.value ? 20 : 10, // 20=委賣, 10=提領, 12=不用收費
      Value: selectedAmount.value,
      Phone: selectedContact.value,
      PmatchMemberId: MemberIdCookie.value,
      IsReward: true
    };
      resetForm();
    const response = await $axios.post('/api/v1/Pmatch/CreateAccounting', payload, {
      headers: { Authorization: tokenCookie.value }
    });
    if (response.data.Status.Code === 0) {
      await openAlertModal(' ', '回饋單據已成功送出！');
      showExchangeView.value = false;
    } else {
      await openAlertModal(' ', `錯誤：${response.data.Status.Message}`);
    }
  } catch (error) {
    console.error('送出失敗:', error);
    await openAlertModal(' ', '送出失敗，請稍後再試');
  }
};
// 點擊外部(空白處)時自動關閉選單 (有打開選單才會跑)
const handleOutsideClick = (e) => {
  const target = e.target;

  if (!platformBox.value && !amountBox.value && !contactBox.value) return;

  const isOutsidePlatform = platformBox.value && !target.closest('.platformBox');
  const isOutsideAmount = amountBox.value && !target.closest('.amountBox');
  const isOutsideContact = contactBox.value && !target.closest('.contactBox');

  if (isOutsidePlatform) platformBox.value = false;
  if (isOutsideAmount) amountBox.value = false;
  if (isOutsideContact) contactBox.value = false;
};
onMounted(async () => {
  try {
    await fetchRewardListData();
    await fetchRewardInfo();
    await updateTimeRange();
  } catch (error) {
    console.error('請求失敗:', error);
  }
  document.addEventListener('click', handleOutsideClick);
});
// 監聽 dataDate 變動 => 更新資料時間範圍
watch(dataDate, () => {
  updateTimeRange();
});
// 監聽平台選擇變化 => 更新回饋資訊
watch(selectedIndex, () => {
  RewardPlatformChange();
});
// 切換領取|委賣時清空選單value
watch(isSell, () => {
  selectedAmount.value = '';
  selectedAmounts.value = [];
  amountBox.value = false;
});
// 組件卸載時清除事件監聽
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.ccontainer {
  height: fit-content;
  display: flex;
  margin: 0 auto;
}

select {
  appearance: none;
}

:deep(.el-table .descending .sort-caret.descending) {
  border-top-color: white;
}

:deep(.el-table .ascending .sort-caret.ascending) {
  border-bottom-color: white;
}

:deep(.el-table .sort-caret.ascending) {
  border-bottom-color: #b1ddf177;
}

:deep(.el-table .sort-caret.descending) {
  border-top-color: #b1ddf177;
}

:deep(.el-table tr) {
  /* background: #e6e6e6; */
  background: #f2f2f2;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background: #ffffff;
}

:deep(.el-range-editor.el-input__wrapper) {
  width: 250px;
  height: 25px;
}
/* 兌換回饋 */
.exchangeBtn, .backBtn, .submitBtn {
    width: 136px;
    height: 56px;
    aspect-ratio: 136/65;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-radius: 50px;
    font-size: 18px;
    background-image: linear-gradient(transparent, transparent), linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    color: white;
    cursor: pointer;
}
.exchangeBtn:hover, .backBtn:hover, .submitBtn:hover {
    background-image: linear-gradient(white, white), linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
    color: rgba(247, 37, 133);
}
/* 輸入框 */
.entryBox {
  width: 100%;
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50px;
  border: none;
}
.entryContent {
  background: #fff;
  color: #f72585;
  border-radius: 50px;
  text-align: center;
  
}
.entryDetail {
  border: none;
  color: #4361ee;
  border-radius: 50px;
}
.entryDetail:focus-visible {
  outline: none;
}
/* 下拉式選單|遊戲平台&兌換數量 */
.platformBox, .amountBox {
  width: 100%;
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50px;
  border: none;
  cursor: pointer;
}
.platformContent, .amountContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  border-radius: 50px;  
  text-indent: 1rem;  
  color: #f72585;
}
.platformgGameBox, .exchangeAmountBox {
  position: absolute;
  left: 0;
  padding: 1px;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 21px;
  border: none;
}
.platformgGameContent, .exchangeAmountContent {
  position: relative;
  background: #fff;
  border-radius: 20px;
  border: none;
  text-indent: 1rem;
  width: 100%;
  color: #f72585;
  font-size: 18px;
}
.platformgGame, .exchangeAmount {
  border-radius: 25px;
}
.platformgGame:hover, .exchangeAmount:hover {
  background-color: #f72585;
  color: #fff;
}
/* 下拉式選單|連絡電話 */
.contactbox {
  width: 100%;
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50px;
  border: none;
  cursor: pointer;
}
.contactContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 50px;
  text-indent: 1rem;
  color: #fff;
}
.contactPhoneBox {
  position: absolute;
  left: 0;
  padding: 1px;
  background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
  border-radius: 21px;
  border: none;
}
.contactPhoneContent {
  position: relative;
  background: #fafafa;
  border-radius: 20px;
  border: none;
  text-indent: 1rem;
  width: 100%;
  color: #f72585;
  font-size: 18px;
}
.contactPhone {
  border-radius: 25px;
}
.contactPhone:hover {
  background-color: #f72585;
  color: #fff;
}
/* 閱讀條款按鈕 */
.readBtn {
  border: none;
  background: transparent;
  color: #f72585;
  font-size: 18px;
}
/* 閱讀條款 */
:deep(.el-dialog__header) {
  position: absolute;
}
:deep(.el-dialog) {
  position: relative;
  padding: 1px;
  background: linear-gradient(to right, #4361ee, #f72585);
  border-radius: 20px;
  border: none;
  --el-dialog-margin-top: 200px;
  --el-dialog-width: 80%;
  max-width: 990px;
}
:deep(.el-dialog__header) {
  position: absolute;
}
:deep(.el-dialog__close) {
  display: none;
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
.agreeBtn {
  background: linear-gradient(to right, #4361ee, #f72585);
  color: #fff;
  padding: 1.2rem 2rem;
  border-radius: 50px;
}
</style>