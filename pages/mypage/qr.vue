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
      <!-- <section class="section-ad">
        <swiper :options="middleBannerOptions">
            <swiper-slide v-for="(slide,index) in banners" :key="slide.id">
                <a :href="slide.link_url" target="_blank" class="link" @click="countClick('banner',slide.id)">
                    <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                </a>
            </swiper-slide>
        </swiper> 
      </section> -->
      <div class="qr-container" v-html="qrData"></div>
      <div class="qr-info">
        <p class="serial">{{ computedQrSerial }}</p>
        <p class="name">{{ qrInfo?.name }}</p>
        <p class="position">{{ qrInfo?.position }}</p>
      </div>
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
      qrInfo: {},
      banners:[],
    }
  },
  computed: {
    computedQrSerial() {
      return this.qrInfo?.serial ? `${this.qrInfo?.serial_number}` : '';
    }
  },
  methods: {
    async getBannerList() {
      const homeBanners = await this.$axios.get('/api/banners/home');
      this.banners = homeBanners.data.banners.filter(banner => banner.position === 'middle');
    },
    async getQr() {
      const response = await this.$axios.get(`/api/qrcode/${this.$auth.user.id}`)
      if(response.data) {
        this.qrData = response.data;
      }
    },
    async getQrInfo() {
      const response = await this.$axios.get(`/api/auth/qrinfo`);
      this.qrInfo = {...response.data};
    },
  },
  mounted () {
    this.getQr();
    this.getQrInfo();
    // this.getBannerList();
  },
}
</script>

<style>
  .qr-container {
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: top;
    padding-top: calc(40vh - 200px);
    background:url("@/assets/images/qr_back_img.png") no-repeat center center;
    background-size:cover;
  }
  .container {
    position: relative;
  }
  .container .qr-info {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -25%);
    margin-top: 10px;
    text-align:center;
  }

  .qr-info p {
    width: 100vw;
  }
  .qr-info .serial {
    font-size: 20px;
    font-weight: 500;
    font-family: gmarketSans;
    margin-bottom: 10px;
  }
  .qr-info .name {
    font-size: 50px;
    font-weight: bold;
    font-family: gmarketSans;
  }
  .qr-info .position {
    font-size: 35px;
    font-weight: 500;
    font-family: gmarketSans;
  }
</style>