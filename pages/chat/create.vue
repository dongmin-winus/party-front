<template>
  <div>
    <createHeader />
    <div class="chat-b">
      <div class="chat-list" v-for="(data, index) in list" :key="index">
        <div class="chat-margin">
          <div class="chat-circle">
            <div class="chat-online-container">
              <div class="chat-online-sub">
                <div class="chat-online"></div>
              </div>
            </div>
          </div>
          <div class="chat-body">
            <div class="chat-body-1">
              <span class="chat-name">{{ data.name }} </span>
            </div>
            <div class="chat-body-1">
              <div class="chat-content">{{ data.nickname}}</div>
            </div>
          </div>
          <div class="chat-body-img">
            <img src="/images/chat-alt-2.svg">
          </div>
        </div>
      </div>
    </div>
    <navigation />
  </div>
</template>
<script>
import createHeader from '../../components/chat/createHeader.vue';
export default {
  components: { createHeader },
  data() {
    return {
      list: [
        { name: "나라사랑",nickname: "메시지 입니다.", date: "오후 15:10", push: true, online: true },
        { name: "마을사랑",nickname: "메시지12 입니다.", date: "오후 15:10", push: false, online: false },
        { name: "자유사랑",nickname: "안녕", date: "오후 15:10", push: true, online: false },
        { name: "jayu사랑",nickname: "닉네임4630s.", date: "오후 15:10", push: false, online: true },

      ],

    };
  },
}

</script>
<style scoped>
.chat-b {
  margin-top: 104px;
}

.bell-off {
  border-bottom: 1px solid #EEEEEE;
  height: 180px;

}

.bell-margin {
  margin-left: 30px;
  margin-right: 30px;
}

.sizebox {
  height: 25px;
}

.bell-text {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 20px;
}

.bell-button {
  margin-top: 10px;
  width: 100px;
  height: 35px;
  background-color: #0BAF00;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
}

.bell-text2 {
  font-size: 14.5px;
  font-weight: 350;
  color: #555555;
}

.chat-list {
  display: flex;
  height: 96px;
  align-items: center;
  border-bottom: 1px solid #EEEEEE;
}

.chat-margin {
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  width: 100%;
}

.chat-circle {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: gray;
}

.chat-online-container {
  display: flex;
  height: 100%;
}

.chat-online-sub {
  display: flex;
  margin: auto 0 0 auto;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;

}

.chat-online {
  display: flex;
  width: 16px;
  height: 16px;
  margin: auto;
  background-color: #0Baf00;
  border-radius: 50%;

}


.chat-body {
  margin-left: 15px;
  flex: 1 0 auto;

}

.chat-body-1 {
  display: flex;
  justify-content: space-between;

}

.chat-name {
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
}

.chat-date {
  font-size: 14px;
  font-weight: 350;
  color: #AAAA;
}

.chat-content {
  font-size: 18px;
  font-weight: 350;
}


.chat-green-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #0BAF00;

  text-align: center;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
}

.chat-body-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>