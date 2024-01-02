<template>
  <div>
    <header-type01/>

    <div class="container">
        <div class="content">
          <div class="m-title type01">
              {{ $auth.user.district.district }} 조직활동 신청
          </div>
        </div>
        <p style="padding: 20px 20px 0px 20px">대기중:미표시, 승인:✅, 거절:❌<br/>등록 시 등록 확인 문자가 발송됩니다. </p>

      <Edit 
        :maxLength="20"
        :list="list"
        :disabled="!$auth.user.id"
        @updateList="updateList"
        @rerenderList="getList"
      />
      <navigation/>
    </div>
    <modal
        v-if="activeModal"
        @cancel="activeModal = false; "
    >
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
  auth:true,
  mixins: [common],
  components: {
    Edit,
  },

  computed: {

    isListFull() {
      return this.getVolunteerList.length == 30;
    },
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
      activeModal: false

    }
  },
  mounted() {
    this.$axios.get('/api/user-list', {
      params: {
        vol_id: this.$auth.user.id
      }
    }).then((response) => {
      if(response.data.result) {
        this.list = [...response.data.data];
      }
    }).then(() => {
      if(this.echo) this.disconnect();
      this.connect(this.list[0].vol_id)
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
      if(response.data.result) {
        this.list = [...response.data.data];
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
    padding: 40px 0;
  }



  .list-container {
    margin: 24px 5px 0 5px;
  }
  .list-container > div {
    display: flex;
    justify-content: space-between;
  }
  .list-container > div > input {
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
  .list-container > div > span {
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
    background-color: rgba( 255, 255, 255, 0.1 );
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
      background-color: rgba( 255, 255, 255, 0.1 );
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
