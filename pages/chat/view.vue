<template>
  <div class="chat-full">
    <!-- header-->
    <header class="header-box">
      <div class="msger-header">
        <div class="msger-header-flex">
          <div class="" @click="$router.push('/chat')">
            <img src="/images/chevron-left.png" style="width:10px;">
          </div>
          <div>
            <img class="msger-header-circle" :src="userProfile" />
          </div>
          <div class="msger-hedaer-title">
            <div class="msger-header-name">
              {{ userName }}
            </div>
            <div v-if="userOnline" class="msger-header-flex2">
              <div class="msger-header-online-circle"></div>
              <div class="msger-header-online-text">온라인</div>
            </div>
            <div v-else class="msger-header-flex2">
              <div class="msger-header-off-circle"></div>
              <div class="msger-header-online-text">오프라인</div>
            </div>
          </div>
        </div>
        <div class="msger-header-icon">
          <button class="msger-header-searchicon" @click="searchBtn">
            <img src="https://dotmzh1fysixs.cloudfront.net/1033/search.png" style="width:25px;">
          </button>
          <div class="dropdown" ref="dropdown">
            <button @click="toggleDropdown">
              <img src="/images/ㅇ.svg" alt="" style='width:25px;'>
            </button>
            <Transition name="fade">
              <ul v-show="isDropdownOpen" class="dropdown-menu">
                <!-- <li>알림끄기</li> -->
                <li @click="$router.back()">채팅 채널 이동</li>
                <li @click="modalShow = true">채팅방 나가기</li>
              </ul>
            </Transition>
          </div>
        </div>

      </div>

      <Transition name="fade">
        <div v-if="searchOpen" class="searchbox">
          <input v-model="search" @keydown.enter.prevent="searchFocus" @input="changeSearch" class="search-input"
            placeholder="대화내용 검색" />
          <div class="search-img"><img src="/images/search-gray.png" style="width: 20px;" alt=""></div>
          <button @click="searchBtn" class="search-button">취소</button>
        </div>
      </Transition>
    </header>

    <!-- section-->
    <div :class="searchOpen == true ? 'sizebox2T' : 'sizebox2F'">&nbsp;</div>
    <div ref="chatSection" :class="[{ 'sectionTT': searchOpen, 'sectionT': $store.state.option }, 'sectionF']">

      <div class="chatbox">
        <!-- 자신이 보낸 채팅 -->
        <TransitionGroup name="fade">
          <div v-for="(chat, index) in chatList" :key="index" :ref="`searchRef${chat.id}`">
            <div v-if="chat.user_id == $auth.user.id" class="chatbox-flex2">
              <div class="chatbox-date2">{{ ChatRoomsTime(chats[index].created_at) }}</div>
              <div class="box1">
                <img @click="modalOpen(chat.image)" v-if="chat.image != null" class="img-size" :src="chat.image" />
                <p v-if="chat.message != null" class="chatbox-text2" v-html="chat.message"></p>

              </div>

            </div>
            <!-- 남이 보낸 채팅 -->
            <div v-else class="chatbox-flex">
              <div v-if="chat.first" class="chat-avarta">
                <img class="chat-avarta" :src="userProfile" />
              </div>
              <div v-else class="chat-avarta2"></div>
              <div class="box2">
                <img @click="modalOpen(chat.image)" v-if="chat.image != null" class="img-size" :src="chat.image" />
                <p v-if="chat.message != null" class="chatbox-text" v-html="chat.message"></p>
              </div>
              <div class="chatbox-date">{{ ChatRoomsTime(chats[index].created_at) }}</div>
            </div>

          </div>
        </TransitionGroup>
      </div>
    </div>
    <Transition name="fade">
      <imageModal v-if="imageShow" :imageUrl="imageUrl" @closeModal="closeModal" />
    </Transition>
    <Transition name="fade">
      <chatDelete v-if="modalShow" :groupId="groupId" @cancelModal="cancelModal" />
    </Transition>
    <!-- footer-->
    <footerTpye02 class="footer" @messageSubmit="messageSubmit" />
  </div>
</template>
<script>
import chatDelete from '../../components/chat/chatDelete.vue';
import footerTpye02 from '../../components/chat/footerTpye02.vue';
import imageModal from '../../components/chat/imageModal.vue';
export default {
  components: { footerTpye02, imageModal, chatDelete },

  data() {
    return {
      token: "",
      chats: [],
      isDropdownOpen: false, // 채팅 드랍버튼
      search: "",
      isFocused: false,
      count: 0,
      searchData: "",
      imageShow: false,
      imageUrl: null, // 이미지 클릭시 url값
      userName: "",
      userProfile: null,
      userOnline: true,
      groupId: "",
      modalShow: false,
    };
  },
  methods: {
    //메시지 보냈을때 값
    messageSubmit(value) {
      this.chats.push(value[0])
      this.timeProfile();
    },
    // 이미지 클륵시 모달 오픈
    modalOpen(url) {
      this.imageShow = true
      this.imageUrl = url
    },
    // 이미지 모달 끄기
    closeModal(value) {
      this.imageShow = value
    },

    // 채팅방 나가기 모달 취소
    cancelModal(value) {
      this.modalShow = value
    },
    // 드랍버튼
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.$nextTick(() => {
        this.$refs.dropdown.focus();
      })
    },
    // 드랍버튼 닫기
    closeDropdown() {
      this.isDropdownOpen = false;
    },

      // 드랍버튼 외 다른곳 눌렀을때 닫기
    documentClick(e) {
      let el = this.$refs.dropdown
      let target = e.target
      if ((el !== target) && !el.contains(target)) {
        this.isDropdownOpen = false
      }
    },

    searchBtn() {
      if (this.searchOpen == false) {
        this.$store.commit('setOption', false)
      }
      this.$store.commit('setSearchOption', !(this.$store.state.chatSearch))

    },
    changeSearch(e) {
      this.search = e.target.value;
    },

    searchFocus(event) {
      if (event.key === 'Enter') {
        // let foundItem = '';
        // const foundItem = this.chats.find(item => item.message === this.search);
        let foundItem = this.chats.filter(item => item.message && item.message.includes(this.search));
        if (this.search == '') {
          alert("대화내용을 입력해주세요.");
          return;
        }
        if (foundItem != '') { //찾는 값이 존재할때
          if (this.search != this.searchData) {
            this.count = 0;

            try {
              let searchRef = `searchRef${foundItem[this.count].id}`
              let messageDisplay = this.$refs[searchRef][0]
              this.$nextTick(() => {

                messageDisplay.scrollIntoView('center');
              })
            }
            catch (e) {
              console.log(e)
            }
            finally {
              this.searchData = this.search; //카운트 늘린다.
            }
            return;
          } else if (this.search == this.searchData) {
            if (this.count >= foundItem.length) {
              alert('대화내용이 끝입니다.')
              this.count = 0;
              return;
            } else {
              this.count++;
              try {
                let searchRef = `searchRef${foundItem[this.count].id}`
                let messageDisplay = this.$refs[searchRef][0]
                this.$nextTick(() => {
                  messageDisplay.scrollIntoView('center');
                })
              }
              catch (e) {
                console.log(e)
              }
              finally {
                this.search = this.searchData;

              }
            }
          }
        } else {
          alert('해당 검색 내용이 없습니다.');
          return;
        }
      }
    },

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
    option() {
      return this.$store.state.option;
    },
    searchOpen() {
      return this.$store.state.chatSearch;
    }
  },
  watch: {
    chats() {
      this.$nextTick(() => {
        let messageDisplay = this.$refs.chatSection
        messageDisplay.scrollTo({ top: messageDisplay.scrollHeight, behavior: 'instant' });
      })

    },
    option() {
      this.$nextTick(() => {
        let messageDisplay = this.$refs.chatSection
        messageDisplay.scrollTo({ top: messageDisplay.scrollHeight, behavior: 'instant' });
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
  created() {
    this.userName = this.$route.query.userName;
    this.userProfile = this.$route.query.userProfile;
    this.groupId = this.$route.query.groupId;
    this.userOnline = this.$route.query.online;
    this.$axios.get(`/api/chat/${this.groupId}`)
      .then(response => {
        this.chats = response.data
        this.timeProfile();
      })
      .catch(e => {
        console.log(e)
      })
  },
};
</script>
<style scoped >
.chat-full {
  /* background-color: #bacee0; */
}
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
  align-items: center;
  text-align: center;
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

  border-radius: 50%;
  width: 45px;
  height: 45px;
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

.msger-header-off-circle {
  width: 10px;
  height: 10px;
  background-color: #CCCCCC;
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


.header-box {
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
  justify-content: flex-end;
  align-items: center;
}

.box1 {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.box2 {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  width: auto;
}

.chat-avarta {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  margin-bottom: auto;
}

.chat-avarta2 {
  width: 40px;
  height: 40px;
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
  /* background-color: #bacee0; */

}

/* 밑에채팅옵션 */
.sectionT {
  overflow: auto;
  /* height: calc(100vh - 160px); */
  height: calc(100vh - 320px);

}

/* 서치바  */
.sectionTT {
  overflow: auto;
  height: calc(100vh - 196px);
}

/* 12px */
.sizebox2T {
  margin-bottom: 73px;
}

.sizebox2F {
  margin-bottom: 37px;
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

.fade-enter,
.fade-leave-to {
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
}

.img-size {
  max-width: 150px;
  max-height: 150px;
  display: flex;
  object-fit: scale-down;
  justify-content: center;
  margin-bottom: 10px;
  
}
</style>