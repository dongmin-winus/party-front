<template>
  <div class="area-index">
    <!-- <header-type01/>-->
    <!-- 헤더영역 -->
    <div class="m-header type02">
        <div class="wrap">
            <div class="left">
                <button class="btn-util">
                    <img src="/images/back.png" alt="" style="width:10px;" @click="$router.push('/mypage')">
                </button>
            </div>

            <div class="center">
                <h3 class="title">출석 체크</h3>
            </div>

            <nuxt-link to="/contents/settings" class="btn-util">
                <img src="/images/setting.png" alt="" style="width:20px;">
            </nuxt-link>
        </div>
    </div>
    <div class="container">
        <section class="section-attendance-back">
          <div class="wrap">
            <div class="content pt-40">
              <div class="inner">
                <div class="btn-wrap">
                  <p class="btn-title">DAILY EVENT</p>
                </div>
                <div class="mt-8"></div>
                <div class="m-title type01">
                  이달의 <span class="point">출석 체크</span>
                </div>
              </div>

            </div>
          </div>
        </section>
        <section class="section-attendance">
          <div class="button-container title-center-stamped" @click.once="stamp" :disabled="hasStamped" v-if="hasStamped">
            <div class="title-wrapper">
              <!-- <p class="title">출석도장찍기</p> -->
              <button class="title">출석도장찍기 완료 </button>
              <smile-gray/>
            </div>
          </div>
          <div class="button-container title-center" @click.once="stamp" :disabled="hasStamped" v-else>
            <div class="title-wrapper">
              <!-- <p class="title">출석도장찍기</p> -->
              <button class="title">출석도장찍기 </button>
              <smile-green/>
            </div>
          </div>
          <div class="pt-40">
            <div class="wrap">
              <h3 class="title">출석 체크 미션을 완료해 보세요!</h3>
              <div class="mt-8"></div>
              <div class="flex-col">
                <div :class="getStampClass(item)" v-for="(item, index) in stampInfo" :disabled="stampDisabled(item)" @click.once="stamp(item)">
                  
                  <img
                    v-if="item.type === 'stamped' && !isGiftDay(item)"
                    src="/images/attendance-success.png" 
                    class="stamp" alt="" srcset="">

                  <img
                    v-else-if="item.type === 'gift' && isUnderStamped(item)"
                    src="/images/attendance-gift.png" 
                    class="stamp" alt="" srcset="">

                  <div v-else-if="item.type === 'gift' && !isUnderStamped(item)">
                    <div class="mt-12">
                      <img src="/images/gift.png" class="stamp-gift" alt="" srcset="">  
                    </div> 
                  </div>

                  <div v-else class="rotate">{{item.day}}</div> 
                </div>
              </div>
              <div class="mt-12"></div>
              <div class="m-title type03">
                <span class="point">출석 체크</span> 또는<br> 응원의 <span class="point">댓글</span>적어주세요💚
              </div>
            </div>
          </div>
        </section>
        <div class="mt-12"></div>
        <div class="comments-wrap">
          <div class="rounded">
            <attendance-comments :commentable_id="1" :commentable_type="`attendance`"/>
          </div>
        </div>
    </div>
    <navigation />
    <transition name="bounce">
      <modal
        v-if="activateModal"
        :noPaddingModal="true"
        :paddingModal="false"
        :cancelBtn="false"
        @cancel="activateModal = false"
      >
        <template #outter>
          <div class="attendance-modal">
            <img src="/images/attendance_congrats.jpeg" alt="" class="modal-content">
          </div>
          <div class="btn-container">
            <button class="btn" @click="activateModal = false">닫기</button>
          </div>
        </template>
      </modal>
    </transition>
    
  </div>
</template>

<script>
import AttendanceComments from '../../components/attendanceComments/AttendanceComments.vue';
export default {
  components: {
    AttendanceComments,
  },
  data() {
    return {
      // giftDays: [3, 7, 12, 19, 24, 28,], // 선물이 있는 날 (서버에서 받아옴)
      giftDays: [], // 선물이 있는 날 (서버에서 받아옴)
      stampedDays: null, // 출석도장을 찍은 날짜들의 개수   (서버에서 받아옴)
      stampInfo: [],  // 출석도장 정보
      currentMonthLastDay: null,  // 현재 달의 마지막 날
      hasStamped: false, // 출석도장을 찍었는지 여부
      stampReward: 0, // 출석도장 선물대상인지 여부 (1이면 대상)
      activateModal: false,
    }
  },
  async asyncData({ $axios }) {
    // ### 도장확인
    // GET /api/stamps
    try {
      const response = await $axios.get('/api/stamps');
      if(response.data) {
        return {
          stampedDays: response.data.stampedDays,
          hasStamped: response.data.hasStamped,
          giftDays: response.data.giftDays.map(item => Number(item)),
          stampReward: response.data.stampReward,
        }
      }
    } catch (error) {
      console.log(error);
      //로드 중 문제가 발생했다 알리며 마이페이지로 라우팅
      alert('로드 중 문제가 발생했습니다.');
      this.$router.push('/mypage');
    }
  },
  methods: {
    // async getStamp() {
    //   // ### 도장확인
    //   // GET /api/stamps
    //   try {
    //     const response = await this.$axios.get('/api/stamps');
    //     console.log(response.data);
    //     if(response.data) {
    //       this.stampedDays = response.data.stampedDays;
    //       this.hasStamped = response.data.hasStamped;
    //       this.giftDays = response.data.giftDays.map(item => Number(item));
    //       this.makeStampInfo();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     //로드 중 문제가 발생했다 알리며 마이페이지로 라우팅
    //     alert('로드 중 문제가 발생했습니다.');
    //     this.$router.push('/mypage');
    //   }
    // },

    /**
     * 출석도장을 찍는다.
     * @param {Object} item 출석도장 정보
     * 
     */
    async stamp(item) {
      if(this.stampDisabled(item)) {
        return;
      }
      if(this.hasStamped) {
        alert('이미 출석도장을 찍으셨습니다.')
        return;
      }
      this.hasStamped = true;
      this.stampedDays++;
      //axios 요청
      try {
        const response = await this.$axios.post('/api/stamps',{
          stampedDays: this.stampedDays,
          hasStamped: this.hasStamped,

        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      this.makeStampInfo();
      if(this.stampReward) {
        this.activateModal = true;
      }else {
        alert('출석도장을 찍었습니다.')
      }
    },
    /**
     * 출석도장을 찍을 수 있는지 여부를 반환한다.
     * @param {Object} item 출석도장 정보
     * @returns {Boolean} 출석도장을 찍을 수 있는지 여부
     */
    stampDisabled(item) {
      if(item.day <= this.stampedDays) {
        return true;
      }
      return false;
    },

    /**
     * 현재 달의 마지막 날을 구한다.
     * @returns {Number} 현재 달의 마지막 날
     */
    getCurrentMonthLastDay() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate();
      this.currentMonthLastDay = lastDay;
    },

    /**
     * 출석도장 정보를 구한다.
     * @returns {Array} 출석도장 정보
     */
    makeStampInfo() {
      let i = 1;
      const stampInfo = [];
      while(i <= this.currentMonthLastDay) {
        if(this.giftDays.includes(i)) {
          stampInfo.push({
            type: 'gift',
            day: i,
          });
        } else if(i <= this.stampedDays) {
          stampInfo.push({
            type: 'stamped',
            day: i,
          });
        } else {
          stampInfo.push({
            type: 'unstamped',
            day: i,
          });
        }
        i++;
      }
      this.stampInfo = stampInfo;
    },

    /**
     * 출석도장을 찍은 날짜들의 수보다 작거나 같은지 여부를 반환한다.
     * @param {Object} item 출석도장 정보
     * @returns {Boolean} 출석도장을 찍은 날짜들의 수보다 작거나 같은지 여부
     */
    isUnderStamped(item) {
      return item.day <= this.stampedDays;
    },

    /**
     * 선물이 있는 날인지 여부를 반환한다.
     * @param {Object} item 출석도장 정보
     * @returns {Boolean} 선물이 있는 날인지 여부
     */
    isGiftDay(item) {
      return this.giftDays.includes(item.day);
    },


    /**
     * 출석도장의 클래스를 반환한다.
     * @param {Object} item 출석도장 정보
     * @returns {String} 출석도장의 클래스
     */
    getStampClass(item) {
      if(item.type === 'unstamped' || (item.type === 'gift' && !this.isUnderStamped(item)))
        return 'relative-group';
      else {
        return 'relative-group-temp';
      }
    }

  },
  mounted () {
    // await this.getStamp();
    this.getCurrentMonthLastDay();
    this.makeStampInfo();
    //TODO remove after showing
    this.activateModal = true;
  },
}
</script>

<style scoped>
.pt-40 {
  padding-top: 40px;
}
.container {
  background: #f6f6f6;
  min-height: 100vh;
  overflow: scroll;
}
.area-index .section-attendance-back .content {
    /* padding:40px 20px 30px 20px; */
    background:url("/images/attendance.png") no-repeat; background-size:cover; border-radius:5px;
    text-align: center;
    height: 150px;
    max-width: 100%;
}
.content .inner .btn-wrap {
  /* div center */
  position: relative;
  display: inline-block;
  padding-top: 5px;
  width: 100px;
  height: 24px;

  background: #ddf1e0;
  border-radius: 20px;

}
.btn-wrap .btn-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 400;
  
  color: #0BAF00;
}

.title-center {
  position: absolute;
  min-width: 300px;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0BAF00;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

}
.title-center-stamped {
  position: absolute;
  min-width: 300px;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  background:#828282;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.button-container .title-wrapper {
    display:flex; align-items: center; justify-content: center;
    height:45px; padding:0 16px;
    border-radius:5px;
    border:1px solid transparent;
}
.button-container .title-wrapper .title {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
}

.area-index .section-attendance {
    margin:0px 15px 30px 15px;
    background:#fff; border-radius:5px;
    text-align: center;
    min-height: 91vh;
    box-shadow: 12px 25px 50px -12px rgba(0, 0, 0, 0.25);

}

.section-attendance .flex-col {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.relative-group {
  flex: 1 0 21%; /* explanation below */
  flex:none;
  margin: 5px;
  background:url("/images/attendance-base.png") no-repeat; background-size:cover;
  width:65px;
  height:65px;
}
.relative-group-temp {
  flex: 1 0 21%; /* explanation below */
  flex:none;
  margin: 5px;
  width:65px;
  height:65px;
}

.stamp {
  position: relative;
  width: 65px;
  height: 65px;
}

.stamp-gift {
  position: relative;
  width: 40px;
  height: 45px;
  margin: -3px 0px 12px 0px;
}
.rotate {
  position:absolute;
  margin: 2rem;
  transform: translate(-50%, -50%) rotate(-20deg);
  font-size: 20px;
  font-weight: bold;
  opacity: 0.3;

}
.comments-wrap {
  padding: 5px;
}
.comments-wrap .rounded {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 5px;
}
.btn-container {
    display: flex;
    width:100%;
    justify-content: center;
    align-content: center;
}
.btn-container .btn {
    flex:1;
    height:60px;
    font-size:20px;
    border: 1px solid #e6e6e6;
}
.attendance-modal {
        height:300px;
    }
.attendance-modal .modal-content {
    width:100%;
    height:100%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>