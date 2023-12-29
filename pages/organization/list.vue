<template>
  <div>
    <header-type01/>

    <div class="container">
        <div class="content">
          <div class="m-title type01">
              <p class="sub">마을소개</p>
              {{ $auth.user.district.district }} 조직활동
          </div>
        </div>

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
  async mounted () {
    console.log(this.$auth.user,3333)
    await this.getList();
  },
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
