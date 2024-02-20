<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap" style="padding:0 !important;">
        <div class="left" style="padding-left: 20px;">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center" style="padding-left: 20px;">
          <h3 class="title">{{ $auth.user.district.district }}</h3>
        </div>

        <div class="right" style="margin-left: 25px; padding-left:25px;">
          <button v-if="$auth.user.role != 10" class="btn-util" @click="$router.push(`/mypage/${$auth.user.serial_number ? '' : 'new'}card`)">
              <!-- <img src="@/assets/images/card-icon.png" style="width:36px;" alt="" @click=""> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 83 83" fill="none">
              <rect width="83" height="83" fill="#0BAF00"/>
              <circle cx="43" cy="42" r="32.25" fill="#0BAF00" stroke="white" stroke-width="1.5"/>
              <path d="M57 24H25C22.78 24 21.02 25.78 21.02 28L21 52C21 54.22 22.78 56 25 56H45V52H25V40H61V28C61 25.78 59.22 24 57 24ZM57 32H25V28H57V32ZM65 50V54H59V60H55V54H49V50H55V44H59V50H65Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="m-title type01">
          <p class="sub">일천만 조직을 위한</p>
          {{ $auth.user.district.district }} <span class="point">조직활동</span>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="m-temp type01" v-if="$auth.user">
        <div :class="`gage-wrap organ ${activityClass}`">
          <div class="upper-gage">
            <div>
              <div class="goal" style="font-weight:350">조직활동 목표 수: <span class="count">{{ goal_count }}명</span></div>
              <div class="register" style="font-weight:350">가입자수: <span>{{ count }}명</span></div>
            </div>
            <div class="smile" :style="getSmile"></div>
          </div>
          <div class="gage">
            <div class="active" :style="`width:${count / goal_count > 1 ? 100 : count / goal_count * 100}%;`"></div>
          </div>
          <!-- <progress style="width:100%;" :value="count / goal_count > 1 ? 100 : count / goal_count * 100" max="100">{{
            count / goal_count > 1 ?
            100 : count / goal_count * 100 }}%</progress> -->
        </div>
      </div>
      <div class="mt-24 menus-container">
        <nuxt-link v-if="$auth.user.role != 10" :to="`/mypage/${$auth.user.serial_number ? '' : 'new'}card`" class="menus orange">
          <div class="left">
            <p class="sub white">회원카드 {{`${$auth.user.serial_number ? '확인' : '등록'}`}} & 출석체크</p>
            <p class="title white">내 카드</p>
          </div>
          <div class="right" style="padding-right: 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="10 5 83 83" fill="none">
              <rect width="83" height="83" fill="#F88600"/>
              <circle cx="43" cy="42" r="32.25" fill="#F88600" stroke="white" stroke-width="1.5"/>
              <path d="M57 24H25C22.78 24 21.02 25.78 21.02 28L21 52C21 54.22 22.78 56 25 56H45V52H25V40H61V28C61 25.78 59.22 24 57 24ZM57 32H25V28H57V32ZM65 50V54H59V60H55V54H49V50H55V44H59V50H65Z" fill="white"/>
            </svg>
          </div>
        </nuxt-link>
        <nuxt-link to="/organization/list" class="menus first">
          <div class="left">
            <p class="sub primary">누구나 우리마을 동대표!</p>
            <p class="title primary">12명 조직하기</p>
          </div>
          <div class="right" :style="getRightIcon(1)"></div>
        </nuxt-link>
        <nuxt-link to="/organization/manage" class="menus second">
          <div class="left">
            <p class="sub white">다양한 조직업무를 한번에</p>
            <p class="title white">조직관리</p>
          </div>
          <div class="right" :style="getRightIcon(2)"></div>
        </nuxt-link>
        <nuxt-link to="/organization/report" class="menus third">
          <div class="left">
            <p class="sub white">다양한 조직업무를 한번에</p>
            <p class="title white">조직보고</p>
          </div>
          <div class="right" :style="getRightIcon(3)"></div>
        </nuxt-link>
        <nuxt-link to="/organization/brief" class="menus fourth">
          <div class="left">
            <p class="sub primary">우리 조직도을 한눈에</p>
            <p class="title primary">조직도</p>
          </div>
          <div class="right" :style="getRightIcon(4)"></div>
        </nuxt-link>
      </div>
    </div>
    <navigation />
  </div>
</template>

<script>
export default {
  auth: true,
  computed: {
    activityClass() {
      let level = Math.ceil(this.count / this.goal_count * 10); // Calculate level based on index, max out at 10
      return `level${level}`;
    },
    getSmile() {
      // let level = isNaN(Math.ceil(this.count / this.goal_count * 10)) ? 10 : Math.ceil(this.count / this.goal_count * 10); // Calculate level based on index, max out at 10
      const level = Math.ceil(this.count / this.goal_count * 10);
      const fileName = level > 9 ? 'f_10.png' : `f_0${level}.png`;
      return !isNaN(level) ? `background-image: url(${require(`@/assets/images/${fileName}`)}); background-size:cover;` : '';
      // assets/images/f_01.png
    }
  },
  mounted() {
    //alert('조직활동 페이지 오픈 예정입니다.');
    //this.$router.push('/');
    this.getRegisterCount();
  },
  data() {
    return {
      count: 0,
      goal_count: 0,
    }
  },
  methods: {
    block() {
      alert('오픈 예정입니다.');
    },
    async getRegisterCount() {
      const { data } = await this.$axios.get(`api/goal/${this.$store.state.district.id}`);
      this.count = data.count;
      this.goal_count = data.goal_count;
    },
    getRightIcon(index) {
      return `background-image: url(${require(`@/assets/images/organization/organ${index}.png`)}); background-size:cover;`;
    }
  },
}
</script>

<style scoped>
.content {
  background: #eee;
  text-align: center;
  padding: 40px 0;
}

.m-temp.type01 .gage-wrap.organ {
  margin-top: 20px;
}

.m-temp.type01 .gage-wrap.organ .upper-gage {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.m-temp.type01 .gage-wrap.organ .upper-gage span {

  font-weight: 600;
}

.m-temp.type01 .gage-wrap.organ .upper-gage .count {
  color: #0baf00;
}

.m-temp.type01 .gage-wrap.organ .upper-gage .smile {
  width: 48px;

}

.wrap .menus {
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 10px;
  background-color: #999;
  margin-bottom: 10px;
  align-items: center;
}

.menus .left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.menus .left .sub {
  font-size: 11px;
  font-weight: 350;
}

.menus .left .title {
  font-size: 18px;
  font-weight: 700;
}

.menus .left .title.primary {
  color: #0baf00 !important;
}

.menus .left .sub.primary {
  color: #777 !important;
}

.menus .left .white {
  color: #fff;
}

.menus.first .right {
  width: 39px;
  height: 34px;
}

.menus.second .right {
  width: 31px;
  height: 34px;
  margin-right: 5px;
}

.menus.third .right {
  width: 33px;
  height: 35px;
  margin-right: 3px;
}

.menus.fourth .right {
  width: 33px;
  height: 34px;
  margin-right: 3px;
}

.menus.orange .right {
    width: 33px;
  height: 34px;
  margin-right: 3px;
}


.menus.first {
  background: #E7F7E5;
}

.menus.second {
  background: #0baf00;
}

.menus.third {
  background: #087900;
}

.menus.fourth {
  background: white;
  border: 1px solid #0baf00;
}

.menus.orange {
  background: #F88600;
}

@media screen and (min-width: 501px) {
  .smile {
    width: 44px;
    height: 48px;
  }
}
</style>
