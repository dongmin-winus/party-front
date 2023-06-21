<template>
  <div class="chat-footer">
    <div class="chat-bottom">
      <div style=" margin-left: 20px; margin-right: 20px;  display: flex; align-items: center; width: 100%;">
        <div v-if="option == false">
          <img src="/images/Vector.png" alt="" style='width:25px;  margin-right: 20px' @click="optionShow">
        </div>
        <div v-else>
          <img src="/images/Xbtn.png" alt="" style='width:25px;  margin-right: 20px' @click="optionShow">
        </div>
        <div class="chat-input-div">
          <input v-model="message" class="chat-input" placeholder="메시지 보내기" @keydown.enter="send" @focus="focusOn = true"
            @blur="handleBlur" />
          <div v-if="focusOn">
            <button class="button1"><img class="img" src="/images/emojiOn.png" alt=""></button>
            <button @click="send" class="button2"><img class="img" src="/images/sendOn.png" alt=""></button>
          </div>
          <div v-else>
            <button class="button1"><img class="img" src="/images/emoji.png" alt=""></button>
            <button @click="send" class="button2"><img class="img" src="/images/send.png" alt=""></button>
          </div>
        </div>
      </div>

    </div>
    <div v-if="option == true" class="chat-option">
      <div>
        <label for="file-input">
          <input id="file-input" type="file" accept="image/*" />
          <div class="gallery">
            <img src="/images/gallery.png" alt="">
          </div>
        </label>
        <div class="option-name2">
          사진
        </div>
      </div>
      <div>
        <label for="file-input">
          <input id="file-input" type="file" accept="image/*" capture="camera" />
          <div class="camera">
            <img src="/images/chatCamera.png" alt="">
          </div>
        </label>
        <div class="option-name2">
          카메라
        </div>
      </div>
      <div>
        <label for="file-input">
          <input id="file-input" type="file" />
          <div class="location">
            <img src="/images/location.png" alt="">
          </div>
        </label>
        <div class="option-name2">
          위치
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
export default {
  data() {
    return {
      token: "",
      chats: [],
      echo: null,
      sending: false,
      username: "123",
      message: "",
      focusOn: false,
      option: false
    }
  },
  methods: {
    handleBlur() {
      this.focusOn = false;
    },
    optionShow() {
      this.option = !this.option;
      this.$emit("optionSubmit", this.option)
    },

    async send() {
      if (!this.sending) {
        const data = {
          username: this.username,
          message: this.message,
        };
        if (!this.validate(data)) {
          alert("입력을 확인해주세요!");
          return;
        }
        this.sending = true;
        this.message = "";
        await this.$axios.post("/api/chat/broadcast", data);
        this.sending = false;
      }
    },
    validate(data) {
      if (data.username === "")
        return false;
      if (data.message === "")
        return false;
      return true;
    },
    onChatSent(event) {
      this.chats.push(event);
      this.$emit("messageSubmit", this.chats)
    },
    connect() {
      if (!window.Pusher)
        window.Pusher = Pusher;
      if (!this.echo) {
        this.echo = new Echo({
          broadcaster: "pusher",
          key: "668bac10cc6db3a1338c",
          cluster: "ap3",
        });
      }
      this.echo.channel("chat").listen("MessageSent", (e) => {
        this.onChatSent(e);

      });
    },
    disconnect() {
      this.echo.leaveChannel("chat");
    },
  },

  mounted() {
    this.connect();

    //window.addEventListener('beforeunload', this.disconnect)
  },
}
</script>

<style scoped>
.chat-footer {
  width: 100%;
  background-color: #fff;
}

.chat-option {
  height: 150px;
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  align-items: start;

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
}

.chat-input {
  background-color: #F7F7F7;
  height: 50px;
  padding: 15px;
  border: 1px solid #EEEEEE;
  border-radius: 15px;
  width: 100%;

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
</style>