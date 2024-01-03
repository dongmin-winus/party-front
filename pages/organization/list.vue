<template>
  <div>
    <!-- <header-type01 /> -->
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">{{ $auth.user.district.district }} 조직구성</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div>

    <div class="container">
      <div class="content">
        <div class="m-title type01">
          <span class="point">임원구성</span>
        </div>
      </div>
      <p class="info-quote">등록 완료 시 입력 된 회원에게 확인 문자가 발송됩니다. 12명 이상 승인 시 자동 승급됩니다.</p>
      <div class="mt-12 counter-container">
        <div class="counter first" @click="filterList('waiting')">
          <p class="number">{{ waiting }}</p>
          <p class="status">대기중</p>
        </div>
        <div class="counter second" @click="filterList('denied')">
          <p class="number">{{ denied }}</p>
          <p class="status">거절</p>
        </div>
        <div class="counter third" @click="filterList('granted')">
          <p class="number">{{ granted }}</p>
          <p class="status">승인</p>
        </div>
        <div class="counter total" @click="filterList('all')">
          <p class="number">{{ waiting + denied + granted }}</p>
          <p class="status">총합</p>
        </div>
      </div>
      <Edit :maxLength="formLength" :listType="listType" :list="list" :disabled="!$auth.user.id" @updateList="updateList"
        @rerenderList="getList" />
      <navigation />
    </div>
    <modal v-if="activeModal" @cancel="activeModal = false;">
      <template #inner>
        <div class="m-pop-title">
          <span class="point">30명 추천서</span>
        </div>

        <div class="m-input-text type01">
          <span>로그아웃 하시겠습니까?</span>
        </div>
        <div class="mt-20"></div>

        <button type="button" class="m-btn type02 bg-revert-red width-100" @click="logout">로그아웃</button>
      </template>
    </modal>
  </div>
</template>

<script>
import common from '@/utils/common';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Edit from '@/components/organization/Edit.vue';
export default {
  auth: true,
  mixins: [common],
  components: {
    Edit,
  },

  computed: {
    waiting() {
      return this.counterList.filter((item) => item.allow == 0).length;
    },
    denied() {
      return this.counterList.filter((item) => item.allow == 2).length;
    },
    granted() {
      return this.counterList.filter((item) => item.allow == 1).length;
    },
    formLength() {
      return this.counterList.length < 12 ? 12 : Math.min((Math.floor(this.list.length / 12) + 1) * 12, 144);
    },
    listFull() {
      return this.formLength == this.list.length;
    }
  },
  data() {
    return {
      name: '',
      phone: '',
      form: {
        vol_id: this.$auth.user.id,
        name: '',
        phone: ''
      },
      vol_info: {
        vol_id: this.$auth.user.id,
        name: this.$auth.user.name,
        phone: this.$auth.user.phone,
      },
      list: [],
      listType: 'all',
      counterList: [], // 숫자세기용
      activeModal: false

    }
  },
  mounted() {
    this.$axios.get('/api/user-list', {
      params: {
        vol_id: this.$auth.user.id
      }
    }).then((response) => {
      if (response.data.result) {
        this.list = [...response.data.data];
        this.counterList = [...response.data.data];
      }
    }).then(() => {
      if (this.echo) this.disconnect();
      this.connect(this.$auth.user.id)
    })
  },
  // async mounted () {
  //   await this.getList();
  // },
  methods: {
    updateList() {
      this.getList();
    },
    async getList() {
      const response = await this.$axios.get('/api/user-list', {
        params: {
          vol_id: this.$auth.user.id
        }
      });
      if (response.data.result) {
        this.list = [...response.data.data];
        this.counterList = [...response.data.data];
        if (this.listType !== 'all') {
          this.filterList(this.listType);
        }
      }
    },
    filterList(listType) {
      this.listType = listType;
      const filterNumber = this.listType == 'waiting' ? 0 : this.listType == 'denied' ? 2 : this.listType == 'granted' ? 1 : -1;
      if (filterNumber == -1) {
        this.list = [...this.counterList];
      } else {
        this.list = [...this.counterList.filter(item => item.allow == filterNumber)];
      }
    },
    /**
     * socket 통신(pusher-js)
     */
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
      this.echo.channel(`supervisors` + id)
        .listen("SupervisorUpdated", (e) => {
          this.onSupervisorUpdated(e);
        });
    },
    disconnect() {
      this.echo.leaveChannel("supervisors");
    },
    onSupervisorUpdated(payload) {
      console.log(payload, 'onSupervisorUpdated')
      this.getList();
    },
  },
}
</script>

<style scoped>
.content {
  background: #eee;
  text-align: center;
  padding: 15px 0;
}

.info-quote {
  font-size: 14px;
  font-weight: 350;
  margin: 10px;
  padding: 10px;
  background-color: #E7F7E5;
}

.counter-container {
  display: flex;
  justify-content: space-around;
  margin: 0 10px;
}

.counter-container .counter {
  width: 24%;
  height: 90px;
  border-radius: 15px;
  padding: 8px;
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.counter .number {
  font-size: 24px;
  font-weight: 500;
}

.counter.first {
  border: 2px solid #DE0000;
  background: #FFF;
  box-shadow: 0px 0px 10px 0px rgba(222, 0, 0, 0.20);
}

.counter.first .status {
  color: #DE0000;
  width: 100%;
  font-size: 14px;
}

.counter.first .number {
  color: #DE0000;
}

.counter.second {
  border: 2px solid #777;
  background: #FFF;
}

.counter.second .status {
  color: #777;
  width: 100%;
  font-size: 14px;
}

.counter.second .number {
  color: #777;
}

.counter.third {
  background: #E7F7E5;
}

.counter.third .status {
  color: black;
  width: 100%;
  font-size: 14px;
}

.counter.total {
  background: #EEE;
}

.counter.total .status {
  color: black;
  width: 100%;
  font-size: 14px;
}

.counter.total .number {
  color: black;
}

.list-container {
  margin: 24px 5px 0 5px;
}

.list-container>div {
  display: flex;
  justify-content: space-between;
}

.list-container>div>input {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
}

.list-container .name {
  width: 25%;
}

.list-container .phone {
  width: 60%;
}

.list-container>div>span {
  width: 10%;
  padding: 10px 2px;
  margin-top: 8px;
}

.sticky-btns {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.1);
}

@media screen and (min-width: 501px) {
  .sticky-btns {
    position: fixed;
    bottom: 0;
    left: 36%;
    width: 28%;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.sticky-btns .w-500 {
  width: 100%;
}

.logout-btn {
  margin-top: 12px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.logout {
  color: red;
  background-color: white;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid red;
  font-size: 12px;
  width: 75px;
  text-align: center;
}
</style>
