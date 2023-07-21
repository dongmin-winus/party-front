<template>
  <div class="area-stuff">
    <headerTypeStuff :current="currentMenu" />
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
                        <a :href="slide.link_url" target="_blank" class="link">
                            <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                        </a>
                    </swiper-slide>
                </swiper> 
            </client-only>
        </section>
        <div class="frame">
          <b style="font-size:20px;">새로운 미션 챌린지 도전!</b>
          <button class="m-btns type01 bg-revert-primary">+</button>
        </div>
        <!-- 카레고리 스크롤 -->
        <div class="mission-categories">
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
            <div class="inner-content" v-for="(item,index) in missions"  :key="index">
              <div v-if="item.img" class="left" :style="`background:url(${item.img.preview_url}) no-repeat; background-size:cover; border-radius:5px;`"></div>
              <div class="right">
                <div class="writings">
                  <b class="title">{{ replaceText(item.title,10) }}</b>
                  <p style="color:#777">{{ item.duration }}</p>
                  <p><span style="color:#0BAF00">{{ item.participant_count }}</span>명 참여중</p>
                </div>
                <div class="btns">
                  <button class="m-btn type01 primary" style="width: 50px; background-color:rgb(228,245,226);">
                    참여
                  </button>
                </div>
              </div>
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
      this.missions = response.data.data;
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
      // this.getMissions(id);
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
</style>