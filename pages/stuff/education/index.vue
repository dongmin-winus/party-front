<template>
  <div class="area-stuff">
    <headerTypeStuff :current="currentMenu" />
      <div class="container add">
        <div class="frame">
          <div class="m-title type01">
            <p class="sub02">우리는 이겼습니다!</p>
            <span class="highlighter-point">나라살리는 마을교육</span>
          </div>
          <swiper v-if="educationList.length > 0" :options="educationSlideOption">
            <swiper-slide v-for="slide in educationList" :key="slide.id">
              <div class="mt-8">
                <div class="content" style="padding-bottom:32px;" >
                  <div class="image" :style="`background-image:url(${slide.video_thumbnail});`">
                    <span class="play-icon"></span>
                  </div>
                  
                </div>
              </div>
              
            </swiper-slide>
            <div class="mt-12 swiper-pagination"  slot="pagination"></div>
          </swiper>

          <button class="mt-8 btn-util" style="width:100%">
            <div class="m-input-text-wrap">
              <div class="m-input-text type01">
                <input type="text" placeholder="검색어를 입력해주세요." v-model="word" @keyup.enter="search">
                <i class="xi-search m-input-text-deco" @click="search"></i>
              </div>
            </div>
          </button>
          <div class="mt-24">
            <span class="counter">총 <span class="point">{{ educationList.length }}</span>개의 게시물이 있습니다</span>
          </div>
        </div>
      </div>
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import headerTypeStuff from '@/components/headerTypeStuff.vue'
export default {
  components: {
    headerTypeStuff,
  },
  data() {
    return {
      currentMenu: {
        code: 'education',
        value: '마을교육',
      },
      educationList: [],
      word: '',
      educationSlideOption: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        centeredSlides: false, 
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
    }
  },
  methods: {
    async getList(board, keyword ='') {
      const response = await this.$axios.get(`/api/events` ,{
        params: {
          board: board,
          word: keyword,
        }
      })
      if(board === 'education') {
        response.data.data.forEach((item) => {
          item.video_thumbnail = item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg');
        })
      }
      this.educationList = [...response.data.data];
      // this.$set(this.asse,`${board}`, response.data.data);
    },
    async search() {
      console.log(this.word)
      await this.getList('education', this.word)
    },
  },
  mounted() {
    this.getList('education')
  },
}
</script>

<style scoped>
    .swiper-container {
        width: 100%;
        /* padding-left: 50px; */
    }

    .swiper-slide {
      width:80%;
      opacity: 0.4;
      transition: opacity 0.3s;
    }

    .swiper-slide-active {
        opacity: 1;
    }

    .swiper-slide .content {
      border-radius: 10px;
      /* padding: 10px; */
      height:220px; 
      /* width:120px; */
      overflow:hidden;
      
    }

    .swiper-slide .content .image {
      width:100%;
      height:95%;
      border-radius: 10px;
      position:relative;
      background-size:cover;
      background-position:center center;
      background-repeat:no-repeat;
    }
    .swiper-slide .content .image .play-icon {
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:50px;
      height:50px;
      background:url('/images/mv_play.png') no-repeat center center;
      background-size:cover;
    }
  .add {
    padding-top: 120px !important;
  }
  .counter .point {
    color: #01ab01;
  }
</style>