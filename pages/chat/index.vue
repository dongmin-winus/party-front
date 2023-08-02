<template>
  <div>
    <headerType02 @headerSearch="headerSearch" @searchData="searchData"  />
     <Loding v-if="loding" />
    <div v-else :class="searchOption == false ? 'chat-b' : 'chat-c'">
      <!-- <div class="bell-off" v-if="false">
        <div class="sizebox"></div>
        <div class="bell-margin" >
          <p class="bell-text">메세지 알림이 꺼져있어요</p>
          <p class="bell-text2">알림이 꺼져 있으면 중요한 메세지를 놓칠 수 있어요.</p>
          <p class="bell-text2">메시지 알림을 켜주세요.</p>
          <button class="bell-button">알림설정</button>
        </div> -->
        <div class="bell-off" v-if="true">
          <div class="sizebox"></div>
          <div class="bell-margin" >
            <p class="bell-text">자유마을 채팅방이 새롭게 개설되었습니다! </p>
            <p class="bell-text2">동대표와의 원활한 소통을 위해 채팅방이 마련되었습니다. 채팅을 원하시면 +버튼을 눌러주세요.</p>
            <p class="bell-text2">채팅방이 있을시 클릭하시면 방으로 이동합니다.</p>
            <p class="bell-text2"> 앞으로 더 많은 기능과 업데이트가 예정되니 많은 기대 부탁드립니다.</p>
          </div>
      </div>
       <template v-if="foundItem != ''">
      <div class="chat-list" v-for="(data,index) in memberList" :key="index" @click="listClick(data.message_group_id, data.user.name, data.user.img.url, data.online)">
        <div class="chat-margin">
          <div class="chat-circle">
            <div class="chat-online-container">
              <img class="profile-img" v-if="data.user.img" :src="data.user.img.url" />
              <img class="profile-img" v-else src="@/assets/images/profile.svg" />
              <div v-if="data.online" class="chat-online-sub">
                <div class="chat-online"></div>
              </div>
               <div v-else class="chat-online-sub">
                  <div class="chat-off"></div>
                </div>
            </div>
          </div>
          <div class="chat-body">
            <div class="chat-body-1">
              <span class="chat-name">{{ data.user ? data.user.name : '이름이 null' }} </span>
              <span class="chat-date">{{  ChatRoomsTime(data.created_at) }}</span>
            </div>
            <div class="chat-body-1">
              <div v-if="data.message == null " class="chat-content">{{'...' }}</div>
              <div v-else class="chat-content">{{ data.message.length > 20 ? data.message.substring(0,20) + '...' : data.message }}</div>
              <!-- <div v-if="data.count !=0 " class="chat-green-circle">{{ data.count }}</div> -->
            </div>
          </div>
        </div>
      </div>
      </template>
      <template v-else>
          <div class="chat-empty">
            <span class="chat-name">채팅방이 없습니다.</span>
          </div>
        </template>
    </div>
    <navigation />
  </div>
</template>
<script>
import headerType02 from '../../components/chat/headerType02.vue';
import Loding from '../../components/chat/loding.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
export default {
  components:{headerType02, Loding},
  data() {
    return {
      list: [],
      searchOption: false,
      foundItem: [],
       loding: false,
        echo: null,
    };
  },
  methods:{
    listClick(id, name, profile, online){
      if(profile == null){
        profile = require("@/assets/images/profile.svg")
      }
      this.$router.push({
        // name: 'chat-view',
        path: '/chat/view',
        query: { 
          groupId: id, 
          userName: name,
          userProfile: profile,
          online: online
        },
      })
    },
    headerSearch(value) {
      this.searchOption = value;
    },
    searchData(value) {
      this.foundItem = this.list.filter(item => item.user.name && item.user.name.includes(value));
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

    connect(id) {
      if (!window.Pusher)
        window.Pusher = Pusher;
      if (!this.echo) {
        this.echo = new Echo({
          broadcaster: "pusher",
          key: "668bac10cc6db3a1338c",
          cluster: "ap3",
          authEndpoint: '/api/broadcasting/auth',
          encrypted: true,

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
      this.echo.channel(`chats`+ id)
        .listen("MessageSent", (e) => {
          for(let i = 0; i < this.list.length; i++){
            if(this.list[i].message_group_id == e.message_group_id){
              this.list[i].message = e.message;
              this.list[i].created_at = e.created_at
            }
          }
        });
    },
  },
  computed: {
    memberList() {
      return this.foundItem
    },
  },
  created() {
    this.loding = true;
    this.$axios.get('/api/chat/list')
      .then((response)=> {
        this.list = response.data.data;
        this.foundItem = response.data.data;
        this.$store.commit('setSearchOption', false)
        this.$store.commit('setOption', false)
        this.$store.commit('setEmoticonOption', false)
      })
      .then(()=>{
        this.loding = false;
        for (let i = 0; i < this.list.length; i++) {
          this.connect(this.list[i].message_group_id);
          
        }
      })
  },
}
</script>
<style scoped>


.chat-b {
  margin-top: 59px;
}
.chat-c {
  margin-top: 104px;
}

.bell-off{
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 25px;


}

.bell-margin { 
  margin-left: 30px;
  margin-right: 30px;
}

.sizebox{
  height: 25px;
}

.bell-text{
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 20px;
}

.bell-button {
  margin-top:10px;
  width: 100px;
  height: 35px;
  background-color: #0BAF00;
  color:#ffffff;
  font-size: 18px;
  font-weight: 500;
  border-radius: 5px;
}

.bell-text2{
  font-size: 14.5px;
  font-weight: 350;
  color:#555555;
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
}
.chat-online-container{
  display: flex;
  height: 100%;
}

.chat-online-sub{
  display: flex;
  position:absolute;
  margin-top: 35px;
  margin-left: 37px;
  width:20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;

} 
.chat-online{
  display: flex;
  width:16px;
  height: 16px;
  margin: auto;
  background-color: #0Baf00;
  border-radius: 50%;

}

.chat-off{
  display: flex;
  width:16px;
  height: 16px;
  margin: auto;
  background-color: #CCCCCC;
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

.profile-img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.chat-empty {
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
}

.chat-name {
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
}

</style>