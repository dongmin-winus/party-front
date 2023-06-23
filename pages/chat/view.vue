<template>
  <div>
    <!-- header-->
    <header class="header-box">
      <div class="msger-header">
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
          <button class="msger-header-searchicon" @click="searchOpen = !searchOpen">
            <img src="https://dotmzh1fysixs.cloudfront.net/1033/search.png" style="width:25px;">
          </button>
          <div class="dropdown" ref="dropdown">
            <button @click="toggleDropdown">
              <img src="/images/ㅇ.png" alt="" style='width:25px;'>
            </button>
            <Transition name="fade">
              <ul v-show="isDropdownOpen" class="dropdown-menu">
                <li>알림끄기</li>
                <li>나가기</li>
                <li>채팅방 나가기</li>
              </ul>
            </Transition>
          </div>
        </div>

      </div>

          <Transition name="fade">
            <div v-if="searchOpen" class="searchbox">
              <input v-model="search" @keydown.enter.prevent="searchFocus" @input="changeSearch" class="search-input" placeholder="대화내용 검색" />
              <div class="search-img"><img src="/images/search-gray.png" style="width: 20px;" alt=""></div>
              <button @click="searchOpen = false" class="search-button">취소</button>
            </div>
          </Transition>
    </header>

    <!-- section-->

    <div :class="searchOpen == true ? 'sizebox2T' : 'sizebox2F'" >&nbsp;</div>
    <section ref="chatSection" :class="option == true ? 'sectionT' : 'sectionF'">
      <div class="chatbox">
        <!-- 자신이 보낸 채팅 -->
        <TransitionGroup name="fade">
          <div v-for="(chat, index) in chatList" :key="index" :ref="`searchRef${index}`" >
            <div v-if="chat.user_id == $auth.user.id" class="chatbox-flex2">
              <!-- <div v-if="isDifferentDate(index)" class="date-divider">{{ chat.sentAt }}</div> -->
              <div class="chatbox-date2">{{ ChatRoomsTime(chats[index].created_at) }}</div>
              <div class="box" >
                <p class="chatbox-text2" v-html="chat.message"></p>
              </div>
  
            </div>
            <!-- 남이 보낸 채팅 -->
            <div v-else class="chatbox-flex">
              <div v-if="chat.first" class="chat-avarta"></div>
              <div v-else class="chat-avarta2"></div>
              <div class="box" >
                <p class="chatbox-text" v-html="chat.message"></p>
              </div>
              <div class="chatbox-date">{{ ChatRoomsTime(chats[index].created_at) }}</div>
            </div>
    
          </div>
        </TransitionGroup>
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
      searchOpen: false, // 채팅 검색 버튼
      search: "",
    };
  },
  methods: {
    //메시지 보냈을때 값
    messageSubmit(value) {
      console.log(value)
      this.chats.push(value[0])
      this.timeProfile();
    },
    // 채팅 플러스버튼 눌렀을때
    optionSubmit(value) {
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
      this.isDropdownOpen = false;
    },

    documentClick(e) {
      let el = this.$refs.dropdown
      let target = e.target
      if ((el !== target) && !el.contains(target)) {
        this.isDropdownOpen = false
      }
    },

    changeSearch(e) {
      this.search = e.target.value;
    },

    searchFocus(event){
      if(event.key === 'Enter') {
        const foundItem = this.chats.find(item => item.message === this.search);
        console.log(foundItem)
        if(foundItem){
          console.log(foundItem)
          let searchRef = `searchRef3`
          this.$nextTick(() => {
              let messageDisplay = this.$refs[searchRef][0]
              // messageDisplay.focus();
              messageDisplay.scrollIntoView({ behavior: 'smooth' });
            })
        }
      }
    },
    
    // // 시간 변환
    // dateFormate(i) {
    //   const date = new Date(this.chatList[i].sentAt);
    //   const hours = date.getHours();
    //   const isPM = hours >= 1;
    //   const hour = isPM ? hours - 12 : hours;
    //   const formattedHours = hour < 10 ? "0" + hour : hour;
    //   const minutes = date.getMinutes();
    //   const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    //   return `${isPM ? '오후' : '오전'} ${isPM == true && hour == 0 ? "12" : formattedHours }:${formattedMinutes}`;
    // },


    // 시간 변환
    ChatRoomsTime(time) {
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      if (time == null) {
        return;
      }
      // 오늘 날짜
      const date = new Date();
      const today = new Date(date.getTime() + KR_TIME_DIFF).toISOString().slice(0, 10);

      // 채팅 시간
      const date2 = new Date(time);
      const times = new Date(date2.getTime() + KR_TIME_DIFF).toISOString()
      // 채팅 내용 날짜
      const todayFromCreatedAt = new Date(date2.getTime() + KR_TIME_DIFF).toISOString().slice(0, 10);

      let hour = Number(times.slice(11, 13))
      let minuate = times.slice(14, 16)


      if (hour == 0) {
        hour = '오전 12'
      } else if (hour == 12) {
        hour = '오후 12'
      } else if (hour > 12) {
        hour = `오후 ${hour - 12}`
      } else {
        hour = `오전 ${hour}`
      }
      let year = todayFromCreatedAt.slice(0, 4)
      let month = todayFromCreatedAt.slice(5, 7);
      if (month[0] == '0') {
        month = month[1]
      }
      const day = todayFromCreatedAt.slice(8, 10);
      if (today != todayFromCreatedAt) {
        return `${year}년 ${month}월 ${day}일`
      }
      return `${hour}:${minuate}`

    },
    // 첫번째 프로필 마지막 시간 보이게
    timeProfile() {
      for (var j = 0; j < this.chats.length; j++) {
        this.chats[j].first = false;
        if (
          j > 0 &&
          this.chats[j].user_id == this.$auth.user.id &&
          this.chats[j - 1] &&
          this.ChatRoomsTime(this.chats[j - 1].created_at) == this.ChatRoomsTime(this.chats[j].created_at) &&
          this.chats[j - 1].user_id == this.$auth.user.id
        ) {
          this.chats[j - 1].created_at = null
        } else if (
          j > 0 &&
          this.chats[j].user_id != this.$auth.user.id &&
          this.chats[j - 1] &&
          this.ChatRoomsTime(this.chats[j - 1].created_at) == this.ChatRoomsTime(this.chats[j].created_at) &&
          this.chats[j - 1].user_id != this.$auth.user.id
        ) {
          this.chats[j - 1].created_at = null
        }

        if (
          // 첫번째 글이거나,
          this.chats[j].user_id != this.$auth.user.id && (
            j == 0 ||
            // 전 글의 작성시간이 빈 값이 아니라면
            this.chats[j - 1].created_at != null)
        ) {
          // 프로필사진, 이름 보여주기 위함
          this.chats[j].first = true
        }
      }
      return this.chats;
    },

    isDifferentDate(index) {
      if (index === 0) {
        return true; // 첫 번째 메시지는 항상 다른 날짜로 분류
      }
      const prevMessage = this.chats[index - 1];
      const currMessage = this.chats[index];
      return prevMessage.created_at !== currMessage.created_at;
    },


  },
  computed: {
    chatList() {
      return this.chats
    },
    optionValue() {
      return this.option
    }
  },
  watch: {
    chats() {
      this.$nextTick(() => {
        let messageDisplay = this.$refs.chatSection
        messageDisplay.scrollTo({ top: messageDisplay.scrollHeight, behavior: 'smooth' });
      })

    },
    option() {
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
  },
  created(){
    this.$axios.get("/api/chat")
      .then(response => {
        console.log(response.data)
        this.chats = response.data
        this.timeProfile();
      })
      .catch(e => {
        console.log(e)
      })
  }
};
</script>
<style scoped>
.msger-header {
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

.msger-header-box {
  display: flex;
  flex-direction: column;
}
.header-box{
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  position: fixed;
  background-color: #fff;
}

.chatbox {
  margin-left: 15px;
  margin-right: 15px;
}

.chatbox-flex {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.chatbox-flex2 {
  display: flex;
  margin-bottom: 10px;
  justify-content: end;
  align-items: center;
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

.chat-avarta2 {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
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
  height: calc(100vh - 190px);
}

.sectionT {
  overflow: auto;
  /* height: calc(100vh - 160px); */
  height: calc(100vh - 350px);

}

.sizebox2F {
  margin-bottom: 37px;
}

.sizebox2T {
  margin-bottom: 72px;
}

/* 드랍다운 메뉴 */

.dropdown-menu {
  position: absolute;
  z-index: 99999;
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


.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.searchbox {
  display: flex;
  margin-left: 20px;

}

.search-input {
  background-color: #F7F7F7;
  border: 1px solid #EEEEEE;
  border-radius: 5px;
  height: 35px;
  width: 100%;
  font-size: 18px;
  font-weight: 350;
  padding: 5px;
  padding-left: 40px;
  position: relative;
}

.search-button {
  width: 20%;
  padding: 5px;
  font-weight: 350;
  font-size: 16px;
}

.search-img {
  display: flex;
  align-items: center;
  position: absolute;
  top: 69px;
  left: 30px;
}</style>