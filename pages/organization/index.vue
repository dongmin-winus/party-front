<template>
  <div>
    <header-type01/>
    <div class="container">
        <div class="content">
          <div class="m-title type01">
              조직관리
          </div>
        </div>
    </div>
      <div class="wrap">
        <div class="m-temp type01" v-if="$auth.user">
          <div :class="`gage-wrap ${activityClass}`">
              <div class="gage">
                <div class="active" :style="`width:${count/goal_count > 1 ? 100 : count/goal_count*100}%;`"></div>

                <!-- <div class="comment">
                    자유마을 가입수
                    <img src="@/assets/images/polygon.png" alt="" class="deco">
                </div> -->

                <span class="count">
                    가입자수:{{ count }} / 목표수:{{goal_count}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="area-mypage">
          <div class="menus-wrap">
              <h3 class="title">활동신청</h3>
              <div class="menus">
                  <div class="wrap">
                      <nuxt-link to="/organization/list" class="menu">
                          <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                          <p class="text">신청하러 가기</p>
                      </nuxt-link>
                  </div>
              </div>
          </div>

          <div class="menus-wrap">
              <h3 class="title">조직관리</h3>
              <div class="menus">
                  <div class="wrap">
                      <nuxt-link to="#" class="menu">
                          <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                          <p class="text">업데이트 예정</p>
                      </nuxt-link>
                  </div>
              </div>
          </div>

          <div class="menus-wrap">
              <h3 class="title">조직도</h3>
              <div class="menus">
                  <div class="wrap">
                      <nuxt-link to="#" class="menu">
                          <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                          <p class="text">업데이트 예정</p>
                      </nuxt-link>
                  </div>
              </div>
          </div>
    </div>
    <navigation/>
  </div>
</template>

<script>
export default {
  auth:false,
  computed: {
    activityClass() {
      let level = Math.ceil(this.count / this.goal_count * 10); // Calculate level based on index, max out at 10
      return `level${level}`;
    },
  },
  mounted () {
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
    async getRegisterCount() {
      const {data} = await this.$axios.get(`api/goal/${this.$auth.user.district_id}`);
      this.count = data.count;
      this.goal_count = data.goal_count;
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

.m-thumbnail.type03 {
    content:"";
    width:75px; height:75px;
    position:relative;
    background-size:cover; background-position:center; border-radius:100%;
    overflow:hidden;

}
.area-mypage .box-info .back {
    padding: 20px 20px 30px 20px;
    background:url("@/assets/images/profile-back.jpg") no-repeat; background-size:cover;
    display:flex; align-items: center; justify-content: center;
    flex-direction: column;
}
.btn-wrap {
  /* div center */
  position: relative;
  display: inline-block;
}
.btn-wrap .inner {
  min-width: 10%;
  padding-left: 15px;
  padding-right: 15px;
  height: 24px;
  background: #ffde00;
  border-radius: 20px;
}
.btn-wrap .edit-button {
  min-width: 20%;
  padding-left: 20px;
  padding-right: 20px;
  height: 45px;
  background: #88a0a3;
  border-radius: 5px;
}
.btn-wrap .btn-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: #000;
}
.btn-wrap .edit-btn-title {
  padding-top: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}
.nick-wrap .nick {
    font-size: 25px;
    font-weight: 500;
    color: #000;
}
.nick-wrap .edit {
    width: 20px;
    height: 20px;
}
</style>
