<template>
  <div class="area-stuff">
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">{{ $auth.user.district.district }}</h3>
        </div>

        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div>
    <!-- 내용 영역 -->
    <div style="padding-top:30px;">
      <section class="section-stuff">
        <!-- 동네 미션 -->
        <div class="frame">
          <div class="mt-12 meeting fragment">
            <div class="m-title type01">
              <p class="sub02">설문조사에 참여해주세요!</p>
              <span class="highlighter-point">설문조사 목록</span>
            </div>
          </div>
          <div class="mt-12 contents-shadow">
            <div class="mission">
              <div class="inner-content" v-for="(item,index) in surveys"  :key="index">
                <div class="right">
                  <nuxt-link :to="`/survey/list/${item.id}`" class="writings">
                    <b class="title">{{ replaceText(item.title,10) }}</b>
                    <p style="color:#777">{{ formatDate(item.created_at,'.') }}</p>
                    <!-- <p><span style="color:#0BAF00">{{ item.participant_count }}</span>명 참여중</p> -->
                  </nuxt-link>
                  <div class="btns">
                    <button v-if="item.is_participate == 0" class="m-btn type01 primary" style="width: 80px; background-color:rgb(228,245,226);"
                      @click.stop="toggleParticipate(item.id)"
                    >
                      참여
                    </button>
                    <button v-if="item.is_participate != 0" class="m-btn type01 bg-revert-primary primary" style="width: 80px; background-color:rgb(228,245,226);"
                      @click.stop="toggleParticipate(item.id)" 
                    >
                      참여 완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <nuxt-link to="" class="m-btn type02 bg-revert-primary"> 더보기 +</nuxt-link>
          </div>
        </div>

        <!-- TODO 마을교육  -->
        <!-- <div class="m-24 edu fragment frame">
          <div class="m-title type01">
            <p class="sub02">우리는 이겼습니다!</p>
            <span class="highlighter-point">나라살리는 마을교육</span>
          </div>
          <swiperCarusel 
            :swiperOption="educationSlideOption"
            :swiperList="boardLists.education"
          />
          <div v-if="boardLists.education?.length>0" class="mt-24 latest-container">
            <div class="banner01" :style="`position:relative; background-image:url(${boardLists.education[0]?.video_thumbnail})`">
              <div class="new">NEW</div>
            </div>
            <div class="mt-12 title">
              <div class="badge">마을교육</div>
              <p class="sub02">{{ boardLists.education[0].title }}</p>
            </div>
          </div>
          <nuxt-link to="/" class="mt-12 m-btn type02 bg-revert-primary">마을교육 더보기 +</nuxt-link>
        </div> -->
      </section>
    </div>
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import common from '@/utils/common'
import swiperCarusel from '@/components/swiperCarusel.vue'
export default {
  auth: false,
  mixins: [common],
  components: {
    swiperCarusel
  },
  data() {
    return {
      missions: [],
      boardLists:{},
      surveys: [],
    }
  },
  methods: {
    async getList() {
      const response = await this.$axios.get(`/api/forms`)
      this.surveys = response.data.data.filter(item => item.opening == 1);
    },
    async getMissions(categoryId = null) {
      const response = await this.$axios.get(`/api/missions`, {
        params: {
          board: 'mission',
          category_id: categoryId
        }
      })
      this.missions = response.data.data;
    },
    async toggleParticipate(id) {
      // if(!this.$auth.user) {
      //   alert('로그인 후 이용해주세요.');
      //   this.$router.push('/auth/login');
      //   return;
      // } 
      const response = await this.$axios.post(`/api/enroll`, {
        event_id: id,
      });
      if (response) {
        alert(response.data.message);
        this.getMissions(this.selectedCategory);
      }
    }
  },
  mounted () {
    this.getList();
    this.getMissions();
  },
}
</script>

<style scoped>
  .highlight-primary {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    background: linear-gradient(to top, #0baf00 50%, transparent 50%);
  }
  .latest-container .banner01 .new {
    position: absolute;
    width: 60px;
    height: 25px;
    right: 5%;
    top: 10%;
    background: #FF7C2E;
    border-radius: 15px;
    color: white;
    text-align: center;
  }
  
  .latest-container .title .badge {
    font-size: 12px;
    width: 60px;
    height: 20px;
    color: #0baf00;
    border: 1px solid white;
    background: white;
    border-radius: 10px;
    text-align: center;
  }

</style>