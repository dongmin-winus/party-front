<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <!-- <button class="btn-util">
            <img src="@/assets/images/back.png" alt="" style="width:10px;"  @click="$router.push('/')">
          </button> -->
        </div>

        <div class="center">
          <h3 class="title">30명 추천서</h3>
        </div>

        <div></div>
      </div>
    </div>
    <!-- //헤더영역 -->
    <div class="container">
      <div class="wrap mt-12">
        <div class="content">

          <label for="">본인 정보</label>
          <div class="vol-info">
            <template v-if="getVolunteer.vol_id">
              <span style="padding:2px;">{{ getVolunteer.name }} / <input type="number" name="" id="" class="phone"
                  v-model="vol_info.phone" placeholder="전화번호"></span>
              <span class="verified" @click="updateVolunteer">연락처수정</span>
            </template>
            <template v-else>
              <input type="text" name="" id="" class="name" v-model="vol_info.name" placeholder="이름">
              <input type="number" name="" id="" class="phone" v-model="vol_info.phone" placeholder="전화번호">
              <span class="verify" @click="checkVolunteer">본인등록</span>
            </template>
          </div>
          <p style="padding: 5px">자유대한민국을 지키기위해 30명 확보합시다!</p>
          <p style="padding: 5px">
            <span style="color: red">*</span>
            <span>
              본인 인증 진행 후 명단 등록이 가능합니다. 이름과 연락처 기재 후 본인등록 버튼을 클릭하세요.
            </span>
          </p>
        </div>
      </div>

      <Edit :editType="editMode" :maxLength="formLength" :disabled="!getVolunteer.vol_id" @updateList="updateList"
        @rerenderList="getList" />
      <div v-if="getVolunteer.vol_id" class="logout-btn">
        <span class="logout" @click="activeModal = true">로그아웃</span>

      </div>
      <!-- <Edit 
        v-else-if="editMode == 'modify'"
        :propList="list"
        :editType="editMode"
        @cancel="cancel"
      /> -->
      <!-- <List 
        v-else
        :list="list"
      /> -->
      <!-- <div v-if="!editMode" class="sticky-btns">
        <div class="m-btn-wrap w-500" @click="toEdit('create')">
            <a class="m-btn type01 bg-primary">추가/등록</a>
        </div>
        <div class="m-btn-wrap w-500" @click="toEdit('modify')">
            <a class="m-btn type01 bg-primary">수정</a>
        </div>
      </div> -->
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
import { mapGetters, mapActions } from 'vuex';
import common from '@/utils/common';
import Edit from '@/components/volunteer/Edit.vue';
import List from '@/components/volunteer/List.vue';
export default {
  auth: false,
  mixins: [common],
  components: {
    Edit,
    List
  },
  computed: {
    ...mapGetters(['getVolunteer', 'getVolunteerList']),

    isListFull() {
      return this.getVolunteerList.length == 30;
    },
    formLength() {
      return this.getVolunteerList.length < 30 ? 30 : Math.min((Math.floor(this.getVolunteerList.length / 30) + 1) * 30, 60);
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      form: {
        vol_id: this.$store.getters.getVolunteer.vol_id ?? null,
        name: '',
        phone: ''
      },
      vol_info: {
        vol_id: this.$store.getters.getVolunteer.vol_id ?? '',
        name: this.$store.getters.getVolunteer.name ?? '',
        phone: this.$store.getters.getVolunteer.phone ?? ''
      },
      list: [],
      editMode: 'create',
      activeModal: false

    }
  },
  async created() {
    await this.getList();
  },
  methods: {
    ...mapActions(['FETCH_VOLUNTEER', 'FETCH_VOLUNTEER_LIST', 'ADD_VOLUNTEER_LIST', 'MODIFY_VOLUNTEER_LIST']),
    async checkVolunteer() {
      const { name, phone } = this.vol_info;
      const response = await this.$axios.get('/api/volunteer-check', {
        params: { phone, name }
      });
      if (response.data.result) {
        this.vol_info = {
          ...this.vol_info,
          vol_id: response.data.data.id,
          name: this.vol_info.name,
          phone: this.vol_info.phone
        }
        this.storeVolunteer();
      } else {
        alert('회원인증에 실패하였습니다.');
      }

    },
    async updateVolunteer() {
      const { vol_id, name, phone } = this.vol_info;
      if (!name) return alert('이름을 입력해주세요.');
      if (!this.validatePhone(phone)) return alert('전화번호를 올바르게 입력해주세요.');
      const response = await this.$axios.put(`/api/volunteer-check/${vol_id}`, {
        name,
        phone
      });
      if (response.data.result) {
        this.storeVolunteer('연락처 수정이 완료되었습니다.');
      } else {
        alert('연락처 수정에 실패하였습니다.');
        this.vol_info = {
          ...this.vol_info,
          name: this.getVolunteer.name,
          phone: this.getVolunteer.phone
        }
      }
    },
    storeVolunteer(msg = null) {
      const { vol_id, name, phone } = this.vol_info;
      if (!name) return alert('이름을 입력해주세요.');
      if (!this.validatePhone(phone)) return alert('전화번호를 올바르게 입력해주세요.');
      this.FETCH_VOLUNTEER({
        vol_id,
        name,
        phone
      });
      alert(msg ?? '본인 인증이 완료되었습니다.');
      this.getList();
      // this.$router.push('/volunteer/listView');
    },
    updateList(listItem = null, index = null) {
      if (listItem !== null && listItem.id == null) {
        this.ADD_VOLUNTEER_LIST({ ...listItem });
      } else if (listItem == null) {
        //삭제
        this.MODIFY_VOLUNTEER_LIST({
          written: 2,
          id: '',
          name: '',
          phone: '',
          vol_id: this.$store.getters.getVolunteer.vol_id,
          index
        });
      } else {
        //수정
        this.MODIFY_VOLUNTEER_LIST({
          written: 2,
          id: listItem.id,
          name: listItem.name,
          phone: listItem.phone,
          vol_id: this.$store.getters.getVolunteer.vol_id,
          index
        });
      }
    },
    async getList() {
      const response = await this.$axios.get('/api/volunteer-list', {
        params: {
          vol_id: this.getVolunteer.vol_id
        }
      });
      if (response.data.result) {
        this.FETCH_VOLUNTEER_LIST([...response.data.data]);
      }
    },
    logout() {
      this.FETCH_VOLUNTEER({
        vol_id: null,
        name: null,
        phone: null
      });
      this.FETCH_VOLUNTEER_LIST([]);
      this.vol_info = {
        vol_id: '',
        name: '',
        phone: ''
      }
      this.activeModal = false;
      window.scrollTo(0, 0);
    }
  },
}
</script>

<style scoped>
.vol-info {
  /* border: 1px solid #eee; */
  height: 40px;
  padding: 4px;
  border-radius: 4px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.vol-info .name {
  width: 30%;
  border: 1px solid #eee;
  border-radius: 4px;
}

.vol-info .phone {
  width: 50%;
  border: 1px solid #eee;
  border-radius: 4px;
}

.verify {
  color: #0BAF00;
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid #0BAF00;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px;
  width: 60px;
  text-align: center;
}

.verified {
  color: #0BAF00;
  background-color: #E7F7E5;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #0BAF00;
  font-size: 12px;
  width: 75px;
  text-align: center;
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
