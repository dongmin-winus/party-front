<template>
  <div>

    <createHeader @searchData="searchData" />
    <div v-if="result == 1">
    <Loding v-if="loding" />
    <div v-else class="chat-b">
      <template v-if="foundItem != ''">
      <div class="chat-list" v-for="(data, index) in  memberList" :key="index">
        <div class="chat-margin">
          <div class="chat-circle">
            <img class="chat-circle" :src="data.gender == '남' ? '/images/남성.png': '/images/여성.png'" />
          </div>
          <div class="chat-body">
            <div class="chat-body-1">
              <span class="chat-name">{{ data.name }} </span>
            </div>
            <div class="chat-body-1">
              <div class="chat-content">{{ data.nickname }} {{ data.group ? data.group + '조직 대표' : '' }}</div>
            </div>
          </div>
          <div class="chat-body-img" @click="chatCreate(data.id,data.name)">
            <img src="/images/chat-alt-2.svg">
          </div>
        </div>
      </div>
      </template>
      <template v-else>
        <div class="chat-empty">
          <span class="chat-name">검색하신 이름이 없습니다.</span>
        </div>
      </template>
    </div>
    </div>
    <div v-else-if="result == 2">
      <div class="chat-b">
         <div class="chat-empty" style="padding: 0px 15px;">
            <p class="chat-name">대표가 없거나, 회원이 아닙니다.<br>
              고객센터로 문의 바랍니다.
              1544-7166
            </p>

          </div>
          </div>
    </div>
    <navigation />
  </div>
</template>
<script>
import createHeader from '../../components/chat/createHeader.vue';
import Loding from '../../components/chat/loding.vue';
export default {
  components: { createHeader, Loding },
  data() {
    return {
      list: [],
      search: "",
      foundItem: [],
      loding: false,
      roomId: null,
      result: null,
    };
  },
  methods: {
    searchData(value) {
      this.foundItem = this.list.filter(item => item.name && item.name.includes(value));
    },
    chatCreate(id,name) {
      this.$axios.post(`/api/chat/build-channel`, {
        receiver_id: id
      })
      .then((response) => {
        this.roomId = response.data
      })
      .then(()=>{
        this.$router.push({
          path: '/chat/view',
          query: {
            groupId: this.roomId,
            userName: name,
            userProfile: '/images/profile.svg',
            online: true
          },
        })
      })
    },
  },
  computed: {
    memberList() {
      return this.foundItem
    },
  },

  created() {
    this.loding = true;
    this.$axios.get(`api/districts/${this.$auth.user.district.id}/members/chat-list`)
      .then((response) => {
        console.log(response)
        this.result = response.data.result
        this.list = response.data.data
        this.foundItem = response.data.data
      })
      .then(()=>{
        this.loding = false;
      })
  }
}

</script>
<style scoped>
.chat-b {
  margin-top: 104px;
}
.chat-empty {
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
}
.bell-off {
  border-bottom: 1px solid #EEEEEE;
  height: 180px;

}

.bell-margin {
  margin-left: 30px;
  margin-right: 30px;
  color: #0BAF00;
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