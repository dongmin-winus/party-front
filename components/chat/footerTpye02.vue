<template>
  <div class="chat-footer" ref="chatRef">
    <div v-if="$store.state.option && imageFiles" class="img-box-border">
      <div class="img-box">
        <Loding v-if="imageLoding == true" class="loding" />
        <div v-else style="display: flex;">
          <img v-if="imageUrl" class="postImg" :src="imageUrl" />
          <div class="imgCancel">
            <button :disabled="imageLoding" @click="imageCancel"><img src='@/assets/images/Xbtn.svg'
                style="width: 15px;" /></button>
          </div>
        </div>

      </div>
    </div>
    <div v-if="$store.state.emoticonOption&& imageFiles" class="img-box-border">
        <div class="img-box">
          <Loding v-if="imageLoding == true" class="loding" />
          <div v-else style="display: flex;">
            <img v-if="imageUrl" class="postImg" :src="imageUrl" />
            <div class="imgCancel">
              <button :disabled="imageLoding" @click="imageCancel"><img src='@/assets/images/Xbtn.svg'
                  style="width: 15px;" /></button>
            </div>
          </div>

        </div>
      </div>
    <div class="chat-bottom">
      <div style=" margin-left: 20px; margin-right: 20px;  display: flex; align-items: center; width: 100%;">
        <div v-if="$store.state.option == false">
          <img src="@/assets/images/Vector.svg" alt="" style='width:25px;  margin-right: 20px' @click="optionShow">
        </div>
        <div v-else>
          <img src="@/assets/images/Xbtn.svg" alt="" style='width:25px;  margin-right: 20px' @click="optionShow">
        </div>
        <div class="chat-input-div">
          <textarea placeholder="메세지 보내기" v-model="message" class="chat-input" @keydown.enter.prevent="handleKeyDown"
            @input="change" @focus="focusOn = true" @blur="handleBlur" />

          <div>
            <button @click="emoticonClick" v-if="$store.state.emoticonOption == false" class="button1"><img class="img"
                src="@/assets/images/emoji.svg" alt=""></button>
            <button @click="emoticonClick" v-else class="button1"><img class="img" src="@/assets/images/emojiOn.svg"
                alt=""></button>
            <button v-if="focusOn" :disabled="imageLoding" @click="send" class="button2"><img class="img"
                src="@/assets/images/sendOn.svg"></button>
            <button v-else :disabled="imageLoding" @click="send" class="button2"><img class="img"
                src="@/assets/images/send.svg"></button>
          </div>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="$store.state.option == true" class="chat-option">
        <div>
          <label for="file-input">
            <!-- user -->
            <input id="file-input" type="file" @change="handleImageChange" accept="image/*">
            <div class="gallery">
              <img src="@/assets/images/gallery.svg" alt="">
            </div>
          </label>
          <div class="option-name2">
            사진
          </div>
        </div>
        <div>
          <label for="file-input2">
            <!-- environment -->
            <input id="file-input2" type="file" @change="handleImageChange" accept="image/*" capture="camera">
            <div class="camera">
              <img src="@/assets/images/chatCamera.svg" alt="">
            </div>
          </label>
          <div class="option-name2">
            카메라
          </div>
        </div>
        <div class="option-btn">
          <button @click="locationClick()" id="file-input3">
            <div class="location">
              <img src="@/assets/images/location.svg" alt="">
            </div>
          </button>
          <div class="option-name2">
            위치
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="$store.state.emoticonOption" class="emoticon-option">

        <!-- 한슬라이드 묶음 6개  -->
        <swiper class="swiper-container" :options="swiperOptions" :spaceBetween="50" >
         <div class="swiper-pagination" slot="pagination"></div>
          <swiper-slide  class="swiper-slide" v-for="(slide, index) in emoticonList" :key="index">
            <img v-for="(img, index) in slide" :key="index" @click="emoticonSelect(img)" class="emoticon" :src="img" alt="">
          </swiper-slide>
        </swiper>

      </div>
    </Transition>
  </div>
</template>
<script>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Loding from './loding.vue';

export default {
  components: { Loding },
  data() {
    return {
      token: "",
      chats: [],
      echo: null,
      sending: false,
      username: "123",
      message: "",
      focusOn: false,
      imageUrl: null,
      imageFiles: null,
      imageLoding: false,
      user: [],
      emoticon: [],
      emoticonList: [],
      swiperOptions: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
        }

      },
    }
  },
  methods: {
    handleBlur() {
      this.focusOn = false;
    },
    optionShow() {
      this.$store.commit('setEmoticonOption', false)
      this.imageUrl = null;
      this.imageFiles = null;
      setTimeout(() => {
        if (this.$store.state.option == false) {
          this.$store.commit('setSearchOption', false)
        }
        this.$store.commit('setOption', !(this.$store.state.option))
      }, 200)

    },

    // 한글 칠때 한글자씩 빠는거
    change(e) {
      this.message = e.target.value
    },

    // 이미지 취소 버튼
    imageCancel() {
      this.imageUrl = null
      this.imageFiles = null
    },
    // 이모티콘 클릭하기
    emoticonClick() {
      this.$store.commit('setSearchOption', false)
      this.$store.commit('setOption', false)
      this.imageUrl = null;
      this.imageFiles = null;
      setTimeout(() => {
        this.$store.commit('setEmoticonOption', !(this.$store.state.emoticonOption))
      }, 200)
    },

    // 이모티콘  6개씩 재배열
    splitArray(array, size) {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    },

    // 이모티콘 선택
      emoticonSelect(url){
        this.imageUrl = url
        this.imageFiles = url
      },



    locationClick() {
      alert('업데이트 예정입니다.');
      // this.$router.push('/chat/location')
      return;
    },

    // 쉬프트 엔터누르면 한줄 밑으로 가기
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          // Shift+Enter 조합일 경우
          this.message += '\n';
          return;
        } else {
          this.send();
          this.message = '';
        }
      }
    },

    async send() {
      if (!this.sending) {
        const data = {
          username: this.$auth.user.name,
          message: this.content,
          user_id: this.$auth.user.id,
          image: this.imageFiles,
          message_group_id: this.$route.query.groupId
        };
        if (!this.validate(data)) {
          alert("입력을 확인해주세요!");
          return;
        }
        this.sending = true;
        this.message = "";
        this.imageUrl = null;
        this.imageFiles = null;
        this.$store.commit('setOption', false)
        this.$store.commit('setEmoticonOption', false)
        await this.$axios.post("/api/chat/broadcast", data);
        this.sending = false;
      }
    },
    validate(data) {
      if (data.username === "")
        return false;
      if (data.message === "" && data.image === null)
        return false;
      return true;
    },
    onChatSent(event) {
      this.chats.push(event);
      this.$emit("messageSubmit", this.chats)
      this.chats = []
    },
    connect() {
      if (!window.Pusher)
        window.Pusher = Pusher;
      if (!this.echo) {
        this.echo = new Echo({
          broadcaster: "pusher",
          key: "668bac10cc6db3a1338c",
          cluster: "ap3",
          authEndpoint: '/api/broadcasting/auth',


        });
      }
      // this.echo.join(`chats` + this.$route.query.groupId)
      // .here((users) => {
      //    console.log("asd",users)
      //  })
      //  .joining((user) => {
      //    console.log(user);
      //  })
      //  .listen("MessageSent", (e) => {
      //    this.onChatSent(e);
      // });
      this.echo.channel(`chats` + this.$route.query.groupId)
        .listen("MessageSent", (e) => {
          this.onChatSent(e);
        });
    },
    disconnect() {
      this.echo.leaveChannel("chats");
    },
    handleImageChange(event) {
      this.imageFiles = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFiles);
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      }
      this.uploadImage();

    },
    uploadImage() {
      this.imageLoding = true
      let form = new FormData();
      form.append("image", this.imageFiles);
      this.$axios.post('/api/posts/images', form)
        .then((response) => {
          this.imageFiles = response.data.data.original_url;
        })
        .then(() => {
          this.imageLoding = false
        });
    },
      documentOption(e) {
      let el2 = this.$refs.chatRef
      let target = e.target
      if (!el2.contains(target)) {
        this.$store.commit('setOption', false)
        this.$store.commit('setEmoticonOption', false)
      }
    },
    oneClick(){
      console.log("클릭함")
    },
  },
  computed: {
    content() {
      this.message = this.message.replace(/(?:\r\n|\r|\n)/g, '<br>')
      // this.message = this.message.replace(/(http[s]?:\/\/[^\s]+)/g, '<a href="$&" style="color:#10FF00; text-decoration: underline;">$&</a>')
      const urls = this.message.match(/(http[s]?:\/\/[\s\S]+)/g)
      if (urls) {
        const cleanedUrls = urls.map(url => url.replace(/<br>/g, ' <br>'));
        this.message = cleanedUrls[0].replace(/(http[s]?:\/\/[^\s]+)/g, '<a href="$&" style="color:#10FF00; text-decoration: underline;">$&</a>')
      }
      return this.message;
    },
  },
  mounted() {
    this.connect();
    
    document.addEventListener('click', this.documentOption)
    // 이모티콘 이미지 불러오기
    for (let i = 1; i < 33; i++) {
      // 10보다 작으면 앞에숫자에 0붙이기
      if (i < 10) {
        this.emoticon.push(`@/assets/images/emoticon/애고미_이모티콘-0${i}.png`)
      } else {
        this.emoticon.push(`@/assets/images/emoticon/애고미_이모티콘-${i}.png`)
      }
    };
    this.emoticonList = this.splitArray(this.emoticon, 9);

  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentOption)
  },
}
</script>

<style scoped>
.chat-footer {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #EEEEEE;
}

.chat-option {
  height: 37vh;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  align-items: flex-start;

}

.emoticon-option {
  height: 37vh;
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  align-items: flex-start;
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr); 
}


.img-box {
  display: flex;
  height: 100px;
  align-items: center;
  margin: 0px 20px;
}

.emoticon {
  width: 60px;
  height: 60px;
}

.postImg {
  width: 80px;
  height: 80px;
}

.chat-bottom {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  border-top: 1px solid #EEEEEE;

}

.chat-input-div {
  width: 100%;
  display: flex;
  position: relative;
  text-align: center;
}

.chat-input {
  background-color: #F7F7F7;
  height: 60px;
  /* overflow: auto; */
  padding: 15px;
  padding-right: 35%;
  border: 1px solid #EEEEEE;
  border-radius: 15px;
  width: 100%;
  resize: none;

}

.button1 {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 45%;
  right: 60px;
  transform: translateY(-50%);
}

.button2 {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 48%;
  right: 17px;
  transform: translateY(-50%);
}

.gallery {
  border-radius: 50%;
  background-color: #777777;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera {
  border-radius: 50%;
  background-color: #6DB7ED;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location {
  border-radius: 50%;
  background-color: #EB787A;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-name2 {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  font-size: 18px;
  font-weight: 350;
  color: #000000;
}

.fade-enter-active {
  transition: opacity 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.imgCancel {
  display: flex;
  margin-bottom: auto;
  margin-top: 7px;
  margin-left: 5px;
}

.loding {
  display: flex;
  width: 100%;
  align-items: center;
}

.option-btn {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
</style>