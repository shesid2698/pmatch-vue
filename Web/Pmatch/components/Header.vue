<template>
  <!-- 整體 Header 容器 -->
  <div class="flex justify-center fixed w-100% headerBox top-0 left-0 h-110px">
    <div class="flex justify-between items-center max-w-1110px w-100% ps-5 pe-5 position-relative">      
      <!-- Logo -->
      <div class="lg-w-80% w-100% flex items-center">
        <div @click="navigateIndex" class="cursor-pointer">
          <NuxtLink to="/"><img class="md-w-240px w-160px" src="/images/logo.png" alt="pmatch的logo" /></NuxtLink>
        </div>
        <div><h1 class="m-0 ms-3 font-size-22px md-font-size-22px color-#7B2CBF">遊戲道具交易平台</h1></div>
      </div>
      
      <!-- PC版導航連結 -->
      <div class="lg-w-100% w-20% flex justify-end">
        <div v-for="item of headerLink" :key="item.id" :class="`navBox hidden lg-flex items-center ${item.className}Box`">
          <!-- 下拉版 -->
          <div :class="`relative login${item.className}`" @click.stop="handleDropdown(item)" :ref="setDropdownRef(item.id)">
            <span v-show="item.dropdown" class="loginLink decoration-none font-bold w-100% cursor-pointer ps-1.2rem pe-1.2rem" :alt="item.title">{{ item.title }}</span>
            <!-- 已登入 -->
            <button v-if="item.items && userNameCookie != null && userNameCookie.value !== ''" class="logoutBtn ms-1 bg-#fff border-none">
              <span v-for="subItem in item.items" :key="subItem.id" @click="subItem.action">{{ subItem.title }}</span>
            </button>
            <!-- 未登入 -->
            <div v-show="dropdownStates[item.id]" class="loginDropdown bg-white mt-1">
              <NuxtLink to="/member/login" class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">會員登入</NuxtLink>
              <NuxtLink to="/register" class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">註冊會員</NuxtLink>
              <NuxtLink to="/member/forgetpwd" class="loginItem block p-1 ps-2 pe-2 mt-1 mb-1 decoration-none">忘記密碼</NuxtLink>
            </div>
          </div>
          <!-- 一版般 -->
          <div class="flex items-center">
            <NuxtLink v-show="!item.dropdown" v-if="item.id !== 5 && item.link !== ''" :title="item.title" :to="item.link" :class="`decoration-none ps-1.2rem pe-1.2rem font-bold ${item.className}`" :alt="item.title">
              {{ item.title }}
              <img class="ms-2 w-20px" v-if="item.icon !== ''" :src="item.icon" :alt="item.title" />
            </NuxtLink>
          </div>
        </div>

        <!-- 登出按鈕 -->
        <NuxtLink v-if="isLoggedIn" @click="logout" class="color-#0d6efd flex items-center hover:opacity-70 hover:underline cursor-pointer decoration-none ms-1.5rem font-bold">登出</NuxtLink>

        <!-- 手機板漢堡選單 -->
        <div class="lg-hidden block">
          <button class="navBtn flex" @click="toggleNav">
            <img class="w-30px px-1 py-2" src="/images/navigation.svg" alt="導航漢堡選單icon" />
          </button>
        </div>
      </div>

      <!-- 手機版下拉選單 -->
      <div class="headerBoxMenu position-absolute w-100% bg-white top-98% left-0 flex flex-wrap items-center" v-show="navOpen">
        <div class="w-100% flex justify-center mt-3 mb-3" v-for="item of headerLink" :key="item.id">          
          <!-- 會員中心 -->
          <div v-if="item.title === '會員中心'" class="text-center">
            <div class="headerLink color-#555553 decoration-none font-bold w-100% cursor-pointer" @click="show = !show">
              {{ item.title }}
              <el-collapse-transition>
                <div v-show="show" class="member-center-container">
                  <div class="transition-box" v-for="memberItem of memberCenterLink">
                    <NuxtLink :to="memberItem.link" :title="memberItem.title" class="decoration-none">{{ memberItem.title }}</NuxtLink>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <!-- 一般連結 -->
          <div v-else>
            <NuxtLink :title="item.title" :to="item.link" @click="toggleNav" class="headerLink color-#555553 decoration-none font-bold w-100%" :alt="item.title">{{ item.title }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- 浮動按鈕 -->
    <NuxtLink
      to="/store" @mouseenter="isHovered = true" @mouseleave="isHovered = false"
      class="decoration-none fixed flex justify-end items-center z-999 top-[27%] lg:top-252px right-[0] transition-transform duration-300 w-[109px] h-[45px] rounded-l-[22.5px] bg-gradient-to-r from-[#0194FF] to-[#C4F2FF] shadow-[0_0_6px_0_#ffffff] before:content-[''] before:w-[106px] before:h-[39px] before:rounded-l-[19.5px] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#FFFFFF] before:to-[#C4F2FF] before:-z-1 before:translate-[3px] hover:before:w-[187px] hover:w-[190px] hover:before:bg-none hover:before:bg-[#0095FF] active:before:bg-none active:before:bg-[#007BD3]"
      title="前往媒合商頁面"
    ><span class="text-[20px] font-bold pe-1.5 font-Inter translate-y-[-1px]" :class="[isHovered ? 'text-white' : 'text-[#0095FF]']">{{ isHovered ? '前往媒合商頁面' : '媒合商' }}</span>
      <div class="flex me-12px" >
        <svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg" :class="isHovered ? 'fill-white' : 'fill-[#0095FF]'">
          <path d="M0.88587 0.5C0.650931 0.500026 0.425621 0.593366 0.259494 0.759494C0.0933663 0.925621 2.56749e-05 1.15093 0 1.38587V15.6141C2.58393e-05 15.849 0.0933666 16.0743 0.259494 16.2405C0.425621 16.4066 0.650931 16.4999 0.88587 16.5H15.1141C15.349 16.4999 15.5744 16.4066 15.7405 16.2405C15.9066 16.0744 16 15.849 16 15.6141V9.82405C16 9.70771 15.9771 9.59251 15.9326 9.48503C15.888 9.37755 15.8228 9.27989 15.7405 9.19763C15.6583 9.11537 15.5606 9.05011 15.4531 9.0056C15.3456 8.96108 15.2304 8.93817 15.1141 8.93818C14.8791 8.93818 14.6538 9.03151 14.4877 9.19764C14.3216 9.36378 14.2282 9.5891 14.2282 9.82405V14.7282H1.77179V2.27174H6.00268C6.11902 2.27175 6.23422 2.24883 6.3417 2.20432C6.44919 2.1598 6.54685 2.09455 6.62912 2.01229C6.71138 1.93003 6.77664 1.83237 6.82116 1.72489C6.86568 1.61741 6.8886 1.50221 6.8886 1.38587C6.8886 1.26953 6.86568 1.15433 6.82116 1.04685C6.77664 0.939372 6.71138 0.841713 6.62912 0.759452C6.54685 0.677191 6.44919 0.611939 6.3417 0.567422C6.23422 0.522905 6.11902 0.499995 6.00268 0.5H0.88587ZM9.59345 0.5C9.35851 0.500002 9.13318 0.593336 8.96705 0.759468C8.80092 0.925601 8.70759 1.15092 8.70758 1.38587C8.70759 1.62082 8.80092 1.84614 8.96705 2.01227C9.13318 2.1784 9.35851 2.27174 9.59345 2.27174H12.9756L5.44368 9.80363C5.36141 9.88589 5.29614 9.98355 5.25162 10.091C5.2071 10.1985 5.18418 10.3137 5.18418 10.4301C5.18418 10.5464 5.2071 10.6616 5.25162 10.7691C5.29614 10.8766 5.36141 10.9742 5.44368 11.0565C5.52594 11.1388 5.6236 11.204 5.73108 11.2485C5.83856 11.2931 5.95376 11.316 6.07009 11.316C6.18643 11.316 6.30163 11.2931 6.40911 11.2485C6.51659 11.204 6.61425 11.1388 6.69651 11.0565L14.2282 3.5248V6.54769C14.2282 6.78263 14.3216 7.00796 14.4877 7.17409C14.6538 7.34022 14.8791 7.43355 15.1141 7.43356C15.2304 7.43356 15.3456 7.41065 15.4531 7.36613C15.5606 7.32162 15.6583 7.25637 15.7405 7.1741C15.8228 7.09184 15.888 6.99418 15.9326 6.8867C15.9771 6.77922 16 6.66402 16 6.54769V1.38587C16 1.15092 15.9066 0.925606 15.7405 0.759477C15.5744 0.593349 15.349 0.500013 15.1141 0.5H9.59345Z"/>
        </svg>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
  import GetMemberDetail from '~/composables/getMemberDetail.js';
  const userToken = useCookie('_PmToken');
  const isLoggedIn = computed(() => !!userToken?.value && userToken.value.trim() !== '');
  const userNameCookie = useCookie('_PmUserName');
  const MemberIdCookie = useCookie('_PmMemberId');
  const userType = useCookie('_PmMemberType');
  const isHovered = ref(false)
  const navOpen = ref(false);
  const toggleNav = () => {
    navOpen.value = !navOpen.value;
  };
  const headerLink = ref([]);
  const theMember = useState('theMember', () => reactive({}));
  const memberCenterLink = ref([
    {
      title: '會員維護資訊',
      link: '/member/center/'
    },
    {
      title: '更改密碼',
      link: '/member/center/changepwd'
    },
    {
      title: '我的訂單',
      link: '/member/center/myorder'
    },
    {
      title: '委託媒合紀錄',
      link: '/member/center/matchlog'
    },
    {
      title: '成功媒合紀錄',
      link: '/member/center/successmatch'
    },
    {
      title: '簽約媒合商',
      link: '/member/center/contract'
    }, {
      title: "領獎中心",
      link: '/member/center/reward'
    }, {
      title: "會員回饋累積",
      link: '/member/center/feedback'
    }, {
      title: "推薦管理",
      link: '/member/center/recommend'
    }
  ]);
  const show = ref(false);
  // 保存下拉選單的參考
  const dropdownRefs = ref([]);

  const dropdownStates = ref({
    2: false // 僅對 id 為 2 的項目有下拉選單
  });
  // 設置下拉選單的 ref
  const setDropdownRef = id => el => {
    dropdownRefs.value[id] = el;
  };

  // 處理下拉選單的顯示或隱藏
  const handleDropdown = item => {
    const currentState = dropdownStates.value[item.id];
    dropdownStates.value[item.id] = !currentState;
  };
  // 點擊外部關閉下拉選單
  const closeDropdownOutside = event => {
    Object.keys(dropdownStates.value).forEach(id => {
      const dropdownElement = dropdownRefs.value[id];
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        dropdownStates.value[id] = false; // 關閉該選單
      }
    });
  };
  const logout = () => {
    userType.value = undefined;
    userType.maxAge = -1;
    userToken.value = undefined;
    userToken.maxAge = -1;
    const pmName = localStorage.getItem('_PmLocalName');
    userNameCookie.value = undefined;
    userNameCookie.maxAge = -1;
    MemberIdCookie.value = undefined;
    MemberIdCookie.maxAge = -1;
    window.location.href = '/';
  };
  // 在組件掛載時添加全局點擊事件監聽器
  onMounted(async () => {
    document.addEventListener('click', closeDropdownOutside);
    if (userToken.value !== '' && userToken.value !== null && userToken.value !== undefined) {
      Object.assign(theMember.value, await GetMemberDetail(MemberIdCookie.value, userToken.value));
      if (theMember.value.Type == 1) {
        // 下線經營者 2個
        memberCenterLink.value = memberCenterLink.value.filter(x => {
          return x.title !== "會員回饋累積" && x.title !== "推薦管理";
        })
      } else if (theMember.value.Type == 3) {
        // 下線 1個
        memberCenterLink.value = memberCenterLink.value.filter(x => {
          return x.title !== "推薦管理";
        })
      }
    }
    if (userNameCookie.value !== '' && userNameCookie.value != undefined) {
      headerLink.value = [
        {
          id: 0,
          title: '會員中心',
          link: '/member/center',
          icon: '',
          className: 'nav0'
        },
        {
          id: 1,
          title: '幫助中心',
          link: '/helpcenter',
          className: 'nav0',
          icon: ''
        },
        {
          id: 2,
          title: '活動專區',
          link: '/activity',
          className: 'nav2',
          icon: ''
        },
        // {
        //     id: 3,
        //     title: '找媒合',
        //     link: '/findmatch',
        //     icon: '',
        //     className: 'nav2'
        // },
        {
          id: 4,
          title: `Hi , ${userNameCookie.value}`,
          link: '#',
          icon: '',
          className: 'loginnav4'
        }
      ];
    } else {
      headerLink.value = [
        // {
        //   id: 0,
        //   title: '首頁',
        //   link: '/',
        //   className: 'nav0',
        //   icon: ''
        // },
        {
          id: 1,
          title: '幫助中心',
          link: '/helpcenter',
          className: 'nav0',
          icon: ''
        },
        {
          id: 2,
          title: '活動專區',
          link: '/activity',
          className: 'nav2',
          icon: ''
        },
        {
          id: 4,
          title: userToken.value ? `HI,${userNameCookie.value}` : '登入',
          link: '/member/login',
          className: 'nav4',
          icon: '',
          dropdown: true,
          showDropdown: false
        }
      ];
    }
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.headerBox');

      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  });

  // 在組件卸載時移除點擊事件監聽器
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdownOutside);
  });
</script>

<style scoped>
  .headerBox {
    z-index: 99;
  }

  .scrolled {
    background: #fff;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }

  .loginDropdown {
    border: 1px solid #ccc;
    position: absolute;
    top: 38px;
    left: 12px;
    width: 120px;
    border-radius: 5px;
  }

  .loginItem {
    color: #555553;
  }

  .loginItem:hover {
    color: #999;
    background-color: #e9ecef;
  }

  .member-center-container {
    border: 1px solid darkgrey;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 5px;
  }

  .transition-box {
    padding: 5px 10px;
  }

  .transition-box:hover {
    background: #ebecf0;
    color: grey;
  }

  .logoutBtn {
    font-size: 1rem;
    cursor: pointer;
  }

  .logoutBtn:hover {
    color: #999;
  }

  .nav0 {
    position: relative;
  }

  .nav0::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, #4660EC, #283786);
  }
 
  .nav0,
  .nav1,
  .nav2 {
    background: linear-gradient(to bottom, #4660EC, #283786);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    transition: all 0.3s;
  }

  .nav0:hover,
  .nav1:hover,
  .nav2:hover {
    background: linear-gradient(to bottom, #0194FF, #0024E4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    text-decoration: underline;
  }

  .nav0:active,
  .nav1:active,
  .nav2:active{
    background: linear-gradient(to bottom, #9747FF, #400078);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    text-decoration: underline;
  }

  .nav3Box:hover {
    position: relative;
    background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
  }

  .nav3Box {
    position: relative;
    background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
    padding: 0 1px;
    margin-left: 10px;
  }

  .nav3Box:focus-within {
    position: relative;
    background: linear-gradient(to right, rgba(247, 37, 133), rgba(67, 97, 238));
    border-radius: 50px;
    border: none;
    padding: 0 1px;
  }

  .nav4Box:focus-within {
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, rgba(247, 37, 133), rgba(67, 97, 238));
    border-radius: 50px;
    border: none;
  }

  .nav4Box,
  .loginnav4Box {
    position: relative;
    padding: 1px;
    background: linear-gradient(to right, rgba(67, 97, 238), rgba(247, 37, 133));
    border-radius: 50px;
    border: none;
  }

  .nav4:hover,
  .loginnav4:hover,
  .loginLink:hover {
    background: linear-gradient(to right, #4361ee, #f72585);
    border-radius: 50px;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .nav4,
  .loginnav4 {
    position: relative;
    background: #fff;
    border-radius: 50px;
    height: 40px;
    border: none;
    width: 100%;
    color: #f72585;
    display: flex;
    align-items: center;
  }

  .loginLink {
    border-radius: 50px;
    color: #f72585;
    line-height: 40px;
    background: #fff;
  }

  .navBtn {
    background: linear-gradient(to right, #7b2cbf, #f72585);
    border: none;
    border-radius: 10px;
    justify-content: center;
  }

  .font-Inter {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
</style>
