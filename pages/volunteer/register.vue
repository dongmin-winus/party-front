<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util">
            <img src="@/assets/images/back.png" alt="" style="width:10px;" @click="$router.push('/')">
          </button>
        </div>

        <div class="center">
          <h3 class="title">회원 인증</h3>
        </div>
        
        <div></div>
      </div>
    </div>
    <!-- //헤더영역 -->
    <div class="container">
      <div class="wrap mt-32">
        <div class="content">
          <div class="m-title type01" style="text-align: center;">
            회원 인증
            <p class="sub">자유마을 회원 회원확인을 진행합니다.</p>
          </div>
          <div class="m-input-text-wrap mt-32">
            <div class="m-input-text type01">
              <label for="">회원 이름</label>
              <input type="text" class="mt-8" placeholder="이름을 입력해주세요." v-model="name">
            </div>
            <div class="m-input-withBtn mt-24">
              <div class="m-input m-input-text type01">
                <label for="">전화번호</label>
                <input type="number" class="mt-8" placeholder="번호를 입력해주세요." v-model="phone">
              </div>
              <button class="check-btn" @click="checkVolunteer">회원인증</button>
            </div>
            <span v-if="isValidVolunteer" class="checked">회원인증 완료되었습니다!</span>
          </div>
          <!-- 바닥에 버튼 두개 -->
          <div class="sticky-btns">
            <div class="m-btns type01" style="width:100vw !important">
              <div class="m-btn-wrap" @click="$router.back()">
                  <a class="m-btn type01" style="background-color:white; color:black; border:1px solid #eee; font-weight:300;">취소</a>
              </div>
              <div class="m-btn-wrap" @click="storeVolunteer" :disabled="isValidVolunteer">
                  <a class="m-btn type01" :disabled="isValidVolunteer" :class="isValidVolunteer ? 'bg-primary':'bg-lightGray'" style="color:white; font-weight:300;">완료</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  auth: false,
  computed: {
    volunteerInfo() {
      return this.$store.getters.getVolunteer; 
    }
  },
  watch: {
    volunteerInfo:{
      handler(val) {
        console.log(val, 'volunteerInfo')
        if(val?.phone) {
          this.$router.push('/volunteer/listView');
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      vol_id: null,
      name: null,
      phone: null, 
      isValidVolunteer: false
    }
  },
  methods: {
    ...mapActions(['FETCH_VOLUNTEER']),
    async checkVolunteer() {
      const response = await this.$axios.get('/api/user-check', {
        params: {
          phone: this.phone
        }
      });
      if(response.data.result) {
        this.vol_id = response.data.data.vol_id;
        this.isValidVolunteer = true;
      } else {
        this.isValidVolunteer = false;
        alert(response.data.message);
      }
      
    },
    storeVolunteer() {
      if(!this.name) return alert('이름을 입력해주세요.');
      if(!this.phone) return alert('전화번호를 입력해주세요.');
      if(!this.isValidVolunteer) return alert('회원인증을 진행해주세요.');
      this.FETCH_VOLUNTEER({
        ...this.volunteerInfo,
        vol_id: this.vol_id,
        name: this.name,
        phone: this.phone
      });
      alert('회원 인증이 완료되었습니다.');
      this.$router.push('/volunteer/listView');
    }
  },

}
</script>

<style>
  .m-input-withBtn {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .check-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    padding: 0 12px;
    min-width: 80px;
    margin-left:10px;
    font-weight: 500;
    font-size: 14px;
    background-color: #0BAF00;
    color: #fff;
    border-radius: 5px;
    border: 1px solid transparent;
  }
  .checked {
    color: #0BAF00;
  }
  .sticky-btns {
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    padding: 0 16px;
    background-color: #fff;
    
    display: flex;
    z-index: 1;
    text-align: center;
  }
  @media screen and (min-width: 501px) {
    .sticky-btns {
      position: fixed;
      bottom: 40px;
      left: 36%;
      width: 28%;
      padding: 0 16px;
      background-color: #fff;
      
      display: flex;
      z-index: 1;
      text-align: center;
    }
  }
</style>