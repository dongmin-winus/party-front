<template>
  <div class="area-stuff">
    <headerTypeStuff :title="'행사교육'" :current="currentMenu" />
      <div class="container add">
        <div class="frame">
          <div class="m-title type01">
            <p class="sub02">승부욕 활활 타오르는</p>
            <span class="highlighter-point">다양한 미션</span>
          </div>

        </div>
        <!-- 광고배너 -->
        <section class="section-ad">
            <client-only>
                <swiper :options="middleBannerOptions">
                    <swiper-slide v-for="(slide,index) in banners" :key="slide.id">
                        <a :href="slide.link_url" target="_blank" class="link" @click="countClick('banner',slide.id)">
                            <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                        </a>
                    </swiper-slide>
                </swiper> 
            </client-only>
        </section>
        <div class="title-container" style="padding:5px 5px;">
          <b style="font-size:20px; font-weight:600;">새로운 미션 챌린지 도전!</b>
          <nuxt-link to="/stuff/mission/create" class="m-btn-wrap">
            <button class="m-btn type01 bg-primary">미션 등록</button>

          </nuxt-link>
        </div>
        <!-- 카레고리 스크롤 -->
        <div class="mission-select">
          <ul class="horizontal-scroll">
            <li v-for="(item,index) in missionCategories" :key="index" @click="selectCategory(item.id)">
              <div class="category" :class="item.id === selectedCategory ? 'active' : ''">
                <span :style="item.id === selectedCategory ? 'color:#fff;':'color:#666;'">{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 리스트 -->
        <div class="frame">
          <div class="mission">
            <div v-if="missions.length > 0" class="inner-content" v-for="(item,index) in missions"  :key="index">
              <nuxt-link :to="`/stuff/mission/${item.id}`" v-if="item.img" class="left" :style="`background:url(${item.img.preview_url}) no-repeat; background-size:cover; border-radius:5px;`"></nuxt-link>
              <div class="right">
                <nuxt-link :to="`/stuff/mission/${item.id}`" class="writings">
                  <b class="title">{{ replaceText(item.title,10) }}</b>
                  <p style="color:#777">{{ item.duration }}</p>
                  <p><span style="color:#0BAF00">{{ item.participant_count }}</span>명 참여중</p>
                </nuxt-link>
                <div class="btns">
                  <button v-if="item.is_participate == 0" class="m-btn type01 primary" style="width: 80px; background-color:rgb(228,245,226);"
                    @click="toggleParticipate(item.id)"
                  >
                    참여
                  </button>
                  <button v-if="item.is_participate != 0" class="m-btn type01 bg-revert-primary primary" style="width: 80px; background-color:rgb(228,245,226);"
                    @click="toggleParticipate(item.id)" 
                  >
                    참여 완료
                  </button>
                </div>
              </div>
            </div>
            <div v-show="missions.length == 0" class="inner-content relative">
              <b class="absolute">미션이 없습니다.</b>
            </div>
          </div>
        </div>
      </div>
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import common from '~/utils/common';
import headerTypeStuff from '@/components/headerTypeStuff.vue'
export default {
  auth:false,
  components: {
    headerTypeStuff,
  },
  mixins: [common],
  data() {
    return {
      currentMenu: {
        code: 'mission',
        value: '다양한 미션',
      },
      missions: [],
      missionCategories: [],
      selectedCategory: 0,
      middleBannerOptions: {
          slidesPerView: 'auto',
          centeredSlides: false,
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
      },
      banners:[],

    }
  },
  methods: {
    async countClick(click_type, click_id) {
      // console.log(click_type, click_id, 333)
      const res = await this.$axios.post('/api/click-count', { click_type, click_id });
    },
    handleBackdropClick(e, className) {
      // console.log(e.srcElement._prevClass,33223)
      if (e.srcElement._prevClass === className) {
        this.activeSidebar = false;
        this.active = false;
        this.$emit('cancel');
      }
    },
    async getBannerList() {
      const homeBanners = await this.$axios.get('/api/banners/home');
      this.banners = homeBanners.data.banners.filter(banner => banner.position === 'middle');
    },
    async getMissions(categoryId = null) {
      const response = await this.$axios.get(`/api/missions`, {
        params: {
          board: 'mission',
          category_id: categoryId
        }
      })
      this.missions = [...response.data.data];
    },
    async getMissionCategories() {
      const response = await this.$axios.get(`/api/mission-category`)
      this.missionCategories = [
        {
          id: 0,
          name: '전체'
        },
        ...response.data
      ]
    },
    selectCategory(id) {
      this.selectedCategory = id;
      this.getMissions(id);
    },

    async toggleParticipate(id) {
      const response = await this.$axios.post(`/api/enroll`, {
        event_id: id,
      });
      if (response) {
        alert(response.data.message);
        this.getMissions(this.selectedCategory);
      }
    }
  },
  mounted() {
    this.getBannerList();
    this.getMissions();
    this.getMissionCategories();
  },
}
</script>

<style scoped>
  .add {
    padding-top: 120px !important;
  }
  .title-container {
    display:flex; 
    justify-content:space-between;
    align-items:center;
    
  }
  .inner-content.relative {
    position:relative;
  }
  .inner-content.relative .absolute {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size:20px;
    color:#777;
  }
</style>