<template>
  <div class="area-my-boards">
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">내 큐알코드</h3>
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
      <div class="qr-container" v-html="qrData"></div>
    </div>
    <!-- 광고배너 -->
    
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  auth:true,
  name: 'qr',
  data() {
    return {
      middleBannerOptions: {
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
      },
      qrData: null,
      banners:[],
    }
  },
  methods: {
    async getBannerList() {
      const homeBanners = await this.$axios.get('/api/banners/home');
      this.banners = homeBanners.data.banners.filter(banner => banner.position === 'middle');
    },
    async getQr() {
      const response = await this.$axios.get(`/api/qrcode/${this.$auth.user.id}`)
      console.log(response)
      if(response.data) {
        this.qrData = response.data;
      }
    }
  },
  mounted () {
    this.getQr();
    this.getBannerList();
  },
}
</script>

<style>
  .qr-container {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>