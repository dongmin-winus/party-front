<template>
  <div>
    <!-- header-->
    <header class="msger-header">
      <div class="msger-header-flex msger-header-center">
        <div class="">
          <img src="/images/chevron-left.png" style="width:10px;">
        </div>
        <div>
          <div class="msger-header-circle"></div>
        </div>
        <div class="msger-hedaer-title">
          <div class="msger-header-name">
            나라사랑
          </div>
          <div class="msger-header-flex2">
            <div class="msger-header-online-circle"></div>
            <div class="msger-header-online-text">온라인</div>
          </div>
        </div>
      </div>
      <div class="msger-header-icon">
        <button class="msger-header-searchicon">
          <img src="https://dotmzh1fysixs.cloudfront.net/1033/search.png" style="width:25px;">
        </button>
        <div class="dropdown" ref="dropdown">
          <button  @click="toggleDropdown"  >
            <img src="/images/ㅇ.png" alt="" style='width:25px;'>
          </button>
          <ul v-show="isDropdownOpen" class="dropdown-menu"  >
            <li>알림끄기</li>
            <li>나가기</li>
            <li>채팅방 나가기</li>
          </ul>
        </div>
      </div>
    </header>




    <!-- section-->
    <div class="sizebox2">&nbsp;</div>
    <section ref="chatSection" :class="option == true ? 'sectionT' : 'sectionF'" >
      <div class="chatbox">
        <div class="chatbox-flex" style="align-items:center;">
          <div class="chat-avarta"></div>
          <div class="box">
            <p class="chatbox-text">안녕하세요.우리는dasdasddasdasdsasdasdasdsa
              sd
              asdasdasdasdassds.</p>
          </div>
          <div class="chatbox-date">오후 03:15</div>
        </div>
        <div class="chatbox-flex" style="align-items:center;">
          <div class="chat-avarta"></div>
          <div class="box">
            <p class="chatbox-text">안녕하세요.</p>
          </div>
          <div class="chatbox-date">오후 03:15</div>
        </div>

        <div v-for="(chat, index) in chatList" class="chatbox-flex2" style="align-items:center;" >
          <div class="chatbox-date2" >{{ dateFormate(index) }}</div>
          <div  class="box" >
            <p class="chatbox-text2">{{ chat.message }}</p>
          </div>
        </div>
      </div>
      
    </section>
    
    <!-- footer-->
    <FooterTpye02 class="footer" @messageSubmit="messageSubmit" @optionSubmit="optionSubmit" />
  </div>
</template>
<script>

import footerTpye02 from '../../components/footerTpye02.vue';
export default {
  components: { footerTpye02 },
  data() {
    return {
      token: "",
      chats: [],
      option: false,
      isDropdownOpen: false, // 채팅 드랍버튼
    };
  },
  methods: {
    //메시지 보냈을때 값
    messageSubmit(value) {
      this.chats = value
    },
    // 채팅 플러스버튼 눌렀을때
    optionSubmit(value){
      console.log(value)
      this.option = value
    },
    // 드랍버튼
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.$nextTick(() => {
        this.$refs.dropdown.focus();
      })
    },
    closeDropdown() {
      console.log('sdsd')
      this.isDropdownOpen = false;
    },

    documentClick(e) {
      let el = this.$refs.dropdown
      let target = e.target
      if ((el !== target) && !el.contains(target)) {
        this.isDropdownOpen = false
      }
    },

    // 시간 변환
    dateFormate(i) {
      const date = new Date(this.chatList[i].sentAt);
      const hours = date.getHours();
      const isPM = hours >= 12;
      const hour = isPM ? hours - 12 : hours;
      const formattedHours = hour < 10 ? "0" + hour : hour;
      const minutes = date.getMinutes();
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      return `${isPM ? '오후' : '오전'} ${formattedHours}:${formattedMinutes}`;
    },

    
 
  },
  computed: {
    chatList() {
      return this.chats
    },
    optionValue() {
      console.log(this.option)
      return this.option
    }
  },
  watch: {
    chats(){
      this.$nextTick(() => {
        let messageDisplay = this.$refs.chatSection
        messageDisplay.scrollTo({top: messageDisplay.scrollHeight, behavior: 'smooth'});
      })
            
    },
    option(){
      this.$nextTick(() => {
        let messageDisplay = this.$refs.chatSection
        messageDisplay.scrollTo({ top: messageDisplay.scrollHeight, behavior: 'smooth' });
      })
    }
  },
  
  mounted() {
    // 외부 클릭시 닫기
    document.addEventListener('click', this.documentClick)
  },

  beforeDestroy() {
    // 외부 클릭시 닫기 삭제
    document.removeEventListener('click', this.documentClick)
  }
};
</script>
<style scoped>
.msger-header {
  position: fixed;
  width: 100%;
  max-width: 500px;
  display: flex;
  height: 60px;
  justify-content: space-between;
  border-bottom: 1px solid #DDDDDD;
  background-color: #ffffff;
}


.msger-header-flex {
  display: flex;
  margin-left: 25px;
}

.msger-hedaer-title {
  margin-left: 10px;
}

.msger-header-flex2 {
  display: flex;
  align-items: center;
}

.msger-header-circle {
  margin-left: 20px;
  background-color: blue;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.msger-header-center {
  display: flex;
  align-items: center;
  text-align: center;
}

.msger-header-name {
  font-size: 18px;
  font-weight: 500;
}

.msger-header-online-circle {
  width: 10px;
  height: 10px;
  background-color: #10FF00;
  border-radius: 50%;
}

.msger-header-online-text {
  font-size: 12px;
  font-weight: 400;
  color: #777777;
  margin-left: 5px;
}

.msger-header-icon {
  margin-right: 25px;
  display: flex;
  align-items: center;
}

.msger-header-searchicon {
  margin-right: 15px;
}

.chatbox {
  margin-left: 15px;
  margin-right: 15px;
}

.chatbox-flex {
  display: flex;
  margin-bottom: 10px;
}

.chatbox-flex2 {
  display: flex;
  margin-bottom: 10px;
  justify-content: end;
}

.box {
  max-width: 60%;
}

.chatbox-text {
  align-items: center;
  font-size: 18px;
  font-weight: 350;
  color: #000000;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #EEEEEE;
  border-radius: 15px;
  white-space: normal;

}

.chatbox-text2 {
  align-items: center;
  font-size: 18px;
  font-weight: 350;
  color: #ffffff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #065b00;
  border-radius: 15px;
  white-space: normal;
}

.chat-avarta {
  width: 40px;
  height: 40px;
  background-color: blue;
  border-radius: 50%;
  margin-right: 15px;
}

.chatbox-date {
  display: flex;
  margin-top: auto;
  margin-left: 7px;
  font-size: 12px;
  font-weight: 350;
  color: #777777;
}

.chatbox-date2 {
  display: flex;
  margin-top: auto;
  margin-right: 7px;
  font-size: 12px;
  font-weight: 350;
  color: #777777;
}

.footer {
  position: fixed;
  bottom: 0;
  max-width: 500px;
}

.sectionF {
  overflow: auto;
  height: calc(100vh - 160px);
}

.sectionT {
  overflow: auto;
  /* height: calc(100vh - 160px); */
  height: calc(100vh - 320px);

}

.sizebox2 {
  margin-bottom: 37px;
}

/* 드랍다운 메뉴 */
.dropdown {

} 
.dropdown-menu {
  position: absolute;
  width: 30%;
  top: 10;
  right: 0;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;


}
.dropdown-menu li {
  width: 100%;
  padding: 5px 0;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

</style>