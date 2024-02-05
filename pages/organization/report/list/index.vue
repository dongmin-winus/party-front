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
              <div v-if="surveys?.length == 0" class="empty-list">내용이 없습니다.</div>

              <div class="inner-content" v-for="(item,index) in surveys" :key="index">
                <div class="right">
                  <nuxt-link v-if="item.user_check == 0" :to="`/organization/report/list/${item.id}`" class="writings">
                    <b class="title">{{ replaceText(item.title,10) }}</b>
                    <p style="color:#777">{{ formatDate(item.created_at,'.') }}</p>
                    <!-- <p><span style="color:#0BAF00">{{ item.participant_count }}</span>명 참여중</p> -->
                  </nuxt-link>
                  <div v-else @click="block" class="writings">
                    <b class="title">{{ replaceText(item.title,10) }}</b>
                    <p style="color:#777">{{ formatDate(item.created_at,'.') }}</p>
                  </div>
                  <div class="btns">
                    <button v-if="item.user_check == 0" class="m-btn type01 primary" style="width: 80px; background-color:rgb(228,245,226);"
                      @click.stop="$router.push(`/organization/report/list/${item.id}`)"
                    >
                      참여
                    </button>
                    <button v-if="item.user_check != 0" class="m-btn type01 bg-revert-primary primary" style="width: 80px; background-color:rgb(228,245,226);"
                      @click.stop="block" 
                    >
                      참여 완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- <nuxt-link to="" class="m-btn type02 bg-revert-primary"> 더보기 +</nuxt-link> -->
            <div @click="loadMore" v-if="surveys?.length > 0 && links?.next" class="m-btn type02 bg-revert-primary"> 더보기 +</div>

          </div>

          <!-- <div class="mt-40"></div> -->
        </div>
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
      links:null,
      meta:null,
    }
  },
  methods: {
    async loadMore(state) {
        let page;
        if (this.meta?.current_page < this.meta?.last_page) {
            page = this.meta?.current_page + 1;
        }
        if (page) {
            await this.getList(page);
        }
    },
    async getList(page = 1) {
      // const response = await this.$axios.get(`/api/forms?page=${page}`)
      // const filteredData = response.data.data.filter(item => item.opening == 1);
      // if(filteredData.length > 0) {
      //   this.surveys = filteredData;
      // }else {
      //   await this.getList(page+1);
      // }
      const response = await this.$axios.get(`/api/forms?page=${page}`)
      this.surveys = response.data.data.filter(item => item.opening == 1);
      this.links = response.data.links;
      this.meta = response.data.meta;
    },
    block() {
      alert('이미 참여하셨습니다.');
    }
  },
  mounted () {
    this.getList();
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
  .empty-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    font-family: gmarketSans;
    color: #777;
  }
</style>