<template>
  <div class="storeBac pb-[25rem]">

    <div class="max-w-1110px m-auto pt-180px ps-5 pe-5 relative z-2">
      <div class="flex items-center justify-center mb-3rem">
        <div class="border-gradient-l"></div>
          <span class="text-gradient-t text-40px font-bold">幫助</span>
          <span class="text-gradient-b text-40px font-bold">中心</span>
        <div class="border-gradient-r"></div>
      </div>
      
      <div class="md:flex flex-none flex-row-reverse">
        <div class="w-100% text-center md:w-30% pl-0 md:pl-20px">
          <div class="relative w-300px h-55px">
            <input type="text" class="searchBox text-[#A69C9C] placeholder:text-[#A69C9C]" v-model="searchQuery" placeholder="請輸入關鍵字">
            <span class="absolute top-50% transform-translate-y-[-45%] right-20px cursor-pointer" @click="GetSearchQuery">
              <svg width="30" height="30" viewBox="0 0 15 15" fill="#A69C9C" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.09961 1.38672C4.11558 0.777149 5.44795 0.591182 6.62598 0.889648C7.44346 1.09687 8.13794 1.48696 8.75098 2.08203C9.03629 2.35902 9.21276 2.5713 9.42969 2.89941C10.441 4.42942 10.4443 6.49449 9.4375 8.02539L9.40723 8.07031L10.6689 9.33594C11.45 10.1193 11.8392 10.5058 12.0283 10.7324C12.1238 10.8469 12.1914 10.946 12.2246 11.0557C12.2565 11.1611 12.2498 11.2655 12.25 11.3184C12.2512 11.692 12.0513 12.0095 11.7119 12.165C11.6112 12.2112 11.4961 12.2377 11.3896 12.2471C11.2854 12.2562 11.1665 12.2506 11.0615 12.2158C11.0033 12.1965 10.9194 12.1617 10.8662 12.1348C10.8349 12.1189 10.8082 12.0967 10.8047 12.0938C10.7938 12.0848 10.7812 12.0739 10.7686 12.0625C10.7426 12.0393 10.7085 12.007 10.668 11.9688C10.5866 11.892 10.4747 11.7845 10.3408 11.6543C10.0728 11.3935 9.7132 11.0396 9.32812 10.6553L8.07422 9.40332L8.0293 9.43359C6.49571 10.4425 4.46087 10.4375 2.90625 9.42676C2.5012 9.16339 2.01607 8.72129 1.74219 8.3623C0.769191 7.08672 0.494061 5.46941 0.99707 3.96387C1.35379 2.89628 2.09636 1.9887 3.09961 1.38672ZM5.47266 2.63086C5.25972 2.63078 5.06185 2.64371 4.95508 2.66504C4.37157 2.78167 3.87898 3.04462 3.46387 3.45996C3.05698 3.86709 2.80044 4.33917 2.68066 4.89746C2.65382 5.02257 2.63601 5.22836 2.63379 5.44531C2.63158 5.66237 2.6451 5.8642 2.66895 5.9834C2.78381 6.55611 3.04828 7.05745 3.44238 7.4541C3.67693 7.69013 3.84726 7.82004 4.09766 7.95801C4.40545 8.12751 4.76722 8.2479 5.1084 8.29492C5.19165 8.30635 5.36368 8.30959 5.55273 8.30371C5.74151 8.29784 5.91601 8.28364 6.00293 8.2666C7.0223 8.06675 7.85683 7.32783 8.17969 6.33984C8.28114 6.02939 8.30762 5.86169 8.30762 5.46777C8.30761 5.07392 8.28113 4.90614 8.17969 4.5957C8.03564 4.15497 7.81454 3.79501 7.47949 3.45996C7.06172 3.0422 6.57468 2.78271 5.99023 2.66602C5.88279 2.64457 5.68537 2.63095 5.47266 2.63086Z" stroke="#A69C9C" stroke-width="0.5"/>
              </svg>
            </span>
          </div>
          <div class="mt-10 ms-5 text-left">
            <div class="text-7 font-bold mb-3 inline-block bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent leading-none">提問分類</div>
            <div class="text-5 leading-9">
              <div class="relative flex justify-between w-38 cursor-pointer group transition-all duration-300 before:content-[''] before:absolute before:top-50% before:translate-y-[-50%] before:w-full before:h-[22px] before:z-[-1] hover:before:bg-gradient-to-r hover:before:from-[#CECECE99] hover:before:to-[#CECECE00]"
              :class="category === 'all' ? 'before:bg-gradient-to-r before:from-[#CECECE99] before:to-[#CECECE00]' : ''" @click="filterCategory('all')">
                <span class="ps-2px group-hover:text-[#A2F7FF]" :class="[ category === 'all' ? 'relative before:content-[\'\'] before:absolute before:left-[-3px] before:top-50% before:translate-y-[-50%] before:h-[22px] before:w-[3px] before:bg-[#fff]' : 'text-[#fff]',
                'text-[#A2F7FF]']
                ">全部</span>
                <span class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold translate-x-[-8px]">{{ totalCount }}</span>
              </div>
              <div class="relative flex justify-between w-38 cursor-pointer group transition-all duration-300 before:content-[''] before:absolute before:top-50% before:translate-y-[-50%] before:w-full before:h-[22px] before:z-[-1] hover:before:bg-gradient-to-r hover:before:from-[#CECECE99] hover:before:to-[#CECECE00]"
              :class="category === 'system' ? 'before:bg-gradient-to-r before:from-[#CECECE99] before:to-[#CECECE00]' : ''" @click="filterCategory('system')">
                <span class="ps-2px group-hover:text-[#A2F7FF]" :class="[ category === 'system' ? 'relative before:content-[\'\'] before:absolute before:left-[-3px] before:top-50% before:translate-y-[-50%] before:h-[22px] before:w-[3px] before:bg-[#fff]' : 'text-[#fff]',
                'text-[#A2F7FF]']
                ">系統問題</span>
                <span class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold translate-x-[-8px]">{{ systemCount }}</span>
              </div>
              <div class="relative flex justify-between w-38 cursor-pointer group transition-all duration-300 before:content-[''] before:absolute before:top-50% before:translate-y-[-50%] before:w-full before:h-[22px] before:z-[-1] hover:before:bg-gradient-to-r hover:before:from-[#CECECE99] hover:before:to-[#CECECE00]"
              :class="category === 'match' ? 'before:bg-gradient-to-r before:from-[#CECECE99] before:to-[#CECECE00]' : ''" @click="filterCategory('match')">
                <span class="ps-2px group-hover:text-[#A2F7FF]" :class="[ category === 'match' ? 'relative before:content-[\'\'] before:absolute before:left-[-3px] before:top-50% before:translate-y-[-50%] before:h-[22px] before:w-[3px] before:bg-[#fff]' : 'text-[#fff]',
                'text-[#A2F7FF]']
                ">媒合問題</span>   
                <span class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold translate-x-[-8px]">{{ matchCount }}</span>
              </div>
              <div class="relative flex justify-between w-38 cursor-pointer group transition-all duration-300 before:content-[''] before:absolute before:top-50% before:translate-y-[-50%] before:w-full before:h-[22px] before:z-[-1] hover:before:bg-gradient-to-r hover:before:from-[#CECECE99] hover:before:to-[#CECECE00]"
              :class="category === 'tax' ? 'before:bg-gradient-to-r before:from-[#CECECE99] before:to-[#CECECE00]' : ''" @click="filterCategory('tax')">
                <span class="ps-2px group-hover:text-[#A2F7FF]" :class="[ category === 'tax' ? 'relative before:content-[\'\'] before:absolute before:left-[-3px] before:top-50% before:translate-y-[-50%] before:h-[22px] before:w-[3px] before:bg-[#fff]' : 'text-[#fff]',
                'text-[#A2F7FF]']
                ">稅務問題</span>
                <span class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold translate-x-[-8px]">{{ taxCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-100% md:w-70% mr-10px" v-if="!newsDetail">
          <div class="relative text-start content-center flex items-center px-[5px] py-8 box-border w-full cursor-pointer before:content-[''] before:absolute before:h-[1px] before:w-[100%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)]"
            @click="GetNewsDetail(news.Id)" v-for="news in showList" v-if="newsList.length">
            <div class="mr-30px"><img src="/images/icon-Q&A.png" width="100" alt=""></div>
            <div class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold text-24px">{{ news.Title }}</div>
          </div>
        </div>
        <div v-else class="w-100% md:w-70% mr-10px">
          <div class="relative text-start content-center flex items-center px-[5px] py-8 box-border w-full cursor-pointer before:content-[''] before:absolute before:h-[1px] before:w-[100%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)]">
            <div class="mr-30px"><img src="/images/icon-Q&A.png" width="100" alt=""></div>
            <div class="bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent font-bold text-24px">{{ newsDetail.Title }}</div>
          </div>
          <div class="relative text-[#A2F7FF] px-[5px] py-8 box-border w-full before:content-[''] before:absolute before:h-[1px] before:w-[100%] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-[linear-gradient(to_right,_#ffffff00,_#6FF1FE,_#ffffff00)]" v-html="content">
          </div>
          <div class="relative text-center mt-50px">
            <div class="relative inline-block group">
              <button class="backBtn" @click="GetSearchQuery"></button>
              <div class="absolute pointer-events-none inset-0 flex items-center justify-center w-[125px] mx-auto text-[18px] font-bold  before:content-[''] before:absolute before:inset-0 before:bg-[#6FF1FE33] before:rounded-full before:z-0 group-hover:before:bg-[linear-gradient(to_bottom,_#FFFFFF80,_#A2F7FF80)] group-active:before:bg-[#6FF1FEA6]">
                <span class="group-hover:hidden bg-gradient-to-b from-[#fff] to-[#43edff] bg-clip-text text-transparent z-1">回上一頁</span>
                <span class="group-hover:inline text-[#31129B] z-1 hidden">回上一頁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAlertModalStore } from '../stores/useAlertModal.js';
  const alertModalStore = useAlertModalStore();
  const openAlertModal = alertModalStore.alertShowModal;
  const newsList = ref([]);
  const showList = ref([]);
  const content = ref('');
  const newsDetail = ref(null);
  const { $axios } = useNuxtApp();
  const jwtStore = useJwtStore();
  const userToken = useCookie('_PmToken');

  // 取得GetNewsList
  async function fetchNewsListData(token) {
    try {
      const response = await $axios.post(
        '/api/v1/Pmatch/GetNewsList',
        {
          Categorys: [4]
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (response.data.Status.Code === 0) {
        newsList.value = response.data.Data;
        showList.value = newsList.value;
      } else {
        await openAlertModal(' ', `${response.data.Status.Message}`);
      }
    } catch (error) {
      console.error('請求失敗:', error);
      data.value = '無法取得資料。';
    }
  }
  const GetNewsDetail = id => {
    newsDetail.value = showList.value.find(x => x.Id == id);
    content.value = newsDetail.value.Content;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 分類按鈕
  const category = ref('all');

  const totalCount = computed(() => newsList.value.length);
  const systemCount = computed(() => newsList.value.filter(n => n.CategoryName === '系統問題').length);
  const matchCount = computed(() => newsList.value.filter(n => n.CategoryName === '媒合問題').length);
  const taxCount = computed(() => newsList.value.filter(n => n.CategoryName === '稅務問題').length);

  function filterCategory(type) {
    category.value = type;

    switch (type) {
      case 'all':
        showList.value = newsList.value.filter(n =>
          ['系統問題', '媒合問題', '稅務問題'].includes(n.CategoryName)
        );
        newsDetail.value = null;
        break;
      case 'system':
        showList.value = newsList.value.filter(n => n.CategoryName === '系統問題');
        newsDetail.value = null;
        break;
      case 'match':
        showList.value = newsList.value.filter(n => n.CategoryName === '媒合問題');
        newsDetail.value = null;
        break;
      case 'tax':
        showList.value = newsList.value.filter(n => n.CategoryName === '稅務問題');
        newsDetail.value = null;
        break;
    }
  }

  onMounted(async () => {
    try {
      if (userToken.value != '' && userToken.value != undefined) {
        const token = userToken.value;
        if (token != '') {
          fetchNewsListData(token);
        }
      } else {
        // 生成新的 token
        const token = await jwtStore.generateToken();
        if (token != '') {
          fetchNewsListData(token);
        }
      }
    } catch (error) {
      console.error('頁面初始化失敗:', error);
    }
  });

  // 搜尋關鍵字
  const searchQuery = ref('');
  const GetSearchQuery = () => {
    showList.value = newsList.value;
    if (searchQuery.value) {
      const Query = searchQuery.value.toLowerCase();
      showList.value = newsList.value.filter(help => help.Title.toLowerCase().includes(Query));
    }
    newsDetail.value = null;
  };
</script>

<style scoped>
  .storeBac {
    background: url(/images/bg-halo-01.png), url(/images/bg-Texture-01.png), url(/images/bg-02.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .text-gradient-t {
    background: linear-gradient(to bottom, #fff, #43edff);
    background: -webkit-linear-gradient(#fff, #43edff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    color: transparent;
  }
  .text-gradient-b {
    background: linear-gradient(to bottom, #43edff, #fff);
    background: -webkit-linear-gradient(#43edff, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px rgba(200, 200, 200, 0.1);
    color: transparent;
  }

  .border-gradient-l {
    width: 40px;
    border: 2px solid;
    border-right: none;
    height: 10px;
    border-image: linear-gradient(to right, #fff, #43edff) 1;
    margin-right: 1rem;
  }
  .border-gradient-r {
    width: 40px;
    border: 2px solid;
    border-left: none;
    height: 10px;
    border-image: linear-gradient(to left, #fff, #43edff) 1;
    margin-left: 1rem;
  }

  .searchBox {
    background-color: transparent;
    width: 100%;
    height: 100%;
    font-size: 25px;
    padding-left: 15px;
    padding-right: 55px;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-radius: 2rem;
    background-image: linear-gradient(white, white), linear-gradient(to right, #A69C9C80, #A69C9C, #A69C9C80);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
  }

  .backBtn {
    width: 125px;
    height: 65px;
    border-width: 2px;
    border-radius: 9999px;
    cursor: pointer;
    position: relative;
    border-style: solid;
    border-color: transparent; 
    background:
    linear-gradient(rgba(255, 255, 255, 0.01), #6FF1FE , rgba(255, 255, 255, 0.01)),
    linear-gradient(to right, rgba(255, 255, 255, 0.01), #6FF1FE , rgba(255, 255, 255, 0.01));
    background-origin: border-box;
    background-clip: padding-box, border-box;
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: exclude, add;
  }
</style>
