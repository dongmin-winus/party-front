<template>
  <div>
    <headerType02 @headerSearch="headerSearch" />
    <div :class="searchOption == false ? 'chat-b' : 'chat-c'">
      <div class="bell-off" v-if="false">
        <div class="sizebox"></div>
        <div class="bell-margin" >
          <p class="bell-text">메세지 알림이 꺼져있어요</p>
          <p class="bell-text2">알림이 꺼져 있으면 중요한 메세지를 놓칠 수 있어요.</p>
          <p class="bell-text2">메시지 알림을 켜주세요.</p>
          <button class="bell-button">알림설정</button>
        </div>
      </div>
      <div class="chat-list" v-for="(data,index) in list" :key="index" @click="listClick(data.message_group_id, data.user.name, data.user.img.url, data.online)">
        <div class="chat-margin">
          <div class="chat-circle">
            <div class="chat-online-container">
              <img class="profile-img" v-if="data.user.img" :src="data.user.img.url" />
              <img class="profile-img" v-else src="/images/profile.svg" />
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
              <span class="chat-date">{{data.created_at}}</span>
            </div>
            <div class="chat-body-1">
              <!-- <div class="chat-content">{{ data.content.length > 15 ? data.content.substring(0,15) + '...' : data.content  }}</div> -->
              <div class="chat-content">{{ data.message }}</div>
              <div v-if="data.count !=0 " class="chat-green-circle">{{ data.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <navigation />
  </div>
</template>
<script>
import headerType02 from '../../components/chat/headerType02.vue';
export default {
  components:{headerType02},
  data() {
    return {
      list: [],
      searchOption: false,
    };
  },
  methods:{
    listClick(id, name, profile, online){
      if(profile == null){
        profile = "/images/profile.svg"
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
    
    }
  },
  created() {
    this.$axios.get('/api/chat/list')
      .then((response)=> {
        console.log(response.data.data)
        this.list = response.data.data;
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
  height: 180px;

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

</style>