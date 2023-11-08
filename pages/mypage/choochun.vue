<template>
  <div>
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">추천인 받은 횟수</h3>
        </div>

        <div class="right"></div>
      </div>
    </div>
    <div class="container">
      <section class="section-ad">
        <swiper :options="middleBannerOptions">
            <swiper-slide v-for="(slide,index) in banners" :key="slide.id">
                <a :href="slide.link_url" target="_blank" class="link" @click="countClick('banner',slide.id)">
                    <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                </a>
            </swiper-slide>
        </swiper> 
      </section>
      <div class="referrer-container" v-if="referralCode.referrer_count >= 0">
        <p class="title primary">추천인 받은 횟수</p>
        <p class="score"> {{referralCode.referrer_count}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  name: 'referrer',
  data() {
    return {
      referralCode: {},
      banners:[],
      middleBannerOptions: {
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
      },
    }
  },
  methods: {
    async getReferrerInfo() {
      const response = await this.$axios.get('/api/referrers');  
      console.log(response.data,3232)
      if(response.data.success) {
        this.referralCode = response.data.data;
      }
    },
    async getBannerList() {
      const homeBanners = await this.$axios.get('/api/banners/home');
      this.banners = homeBanners.data.banners.filter(banner => banner.position === 'middle');
    },
  },
   mounted() {
     this.getReferrerInfo();
     this.getBannerList();
  }
}
</script>

<style>
  .referrer-container {
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .referrer-container .title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: GmarketSans;
  }
  .referrer-container .score {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: GmarketSans;
  }
</style>