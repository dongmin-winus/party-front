<template>
  <div>
    <swiper v-if="swiperList.length > 0" :options="swiperOption">
      <swiper-slide v-for="slide in swiperList" :key="slide.id">
        <div class="content" :style="`background-image:url(${slide.video_thumbnail});`"></div>

      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  props: {
    swiperOption: {
      type: Object,
      default: () => {}
    },
    swiperList: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>
    .swiper-container {
        width: 100%;
        /* padding-left: 50px; */
    }

    .swiper-slide {
      width:45%;
      opacity: 0.4;
      transition: opacity 0.3s;
    }

    .swiper-slide-active {
        opacity: 1;
        border-radius: 10px;
        border: 3px solid #0baf00;
    }

    .swiper-slide .content {
      border-radius: 10px;
      padding: 10px;
      height:80px; 
      /* width:120px; */
      overflow:hidden;

    }
</style>