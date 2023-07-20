<template>
  <div class="area-index">
    <header-type01/>
    <!-- 내용 영역 -->
    <div style="padding-top:30px;">
      <section class="section-stuff">
        <div class="frame">
          <div class="m-title type01">
            <p class="sub02">모두가 한마음 한뜻으로</p>
            <span class="highlighter-point">대규모 집회</span>
          </div>
          <swiper v-if="boardLists.assembly?.length > 0" class="swiper2" :options="assemblySlideOption" >
            <swiper-slide v-for="(slide,index) in boardLists.assembly" :key="slide.id">
              <div class="mt-24">
                <div class="first-item" style="padding-bottom:32px;">
                  <div class="banner01" :style="`background-image:url(${slide.img ? slide.img.url : 'images/stuff_01.png'});`"></div>
                  <div class="mt-24 d-day">
                    <!-- TODO계상 필요함 -->
                    <span class="d-day-text">{{calculateDdays(slide.start_date,slide.end_date)}}</span>
                  </div>
                  <div class="info-container mt-12">
                    <b class="main-info">{{slide.title}}</b>
                    <span class="sub-info">{{slide.start_date}} {{`~ ${slide.end_date}`}}</span>
                    <span class="sub-info">{{slide.address}}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper> 
        </div>

        <!-- TODO 동네 모임 -->
        <!-- <div class="mt-24 meeting fragment frame">
          <div class="m-title type01">
            <p class="sub02">2배 더 유익한 시간 보내기</p>
            <span class="highlighter-point">동네모임</span>
          </div>
          <div class="mt-8 content-header">
            <div class="left">
              <b class="title"># 소소하지만 알찬 모임</b>
            </div>
            <div class="right">
              <button class="btn-util">
                <nuxt-link to="/">
                    <img src="@/assets/images/foword.png" alt="" style="width:10px;">
                </nuxt-link>
              </button>
            </div>
          </div>
          <div class="mt-12 ">
            <div class="meeting contents" v-for="(item,index) in meetings" :key="index">
              <b class="title">{{ item.title }}</b>
              <article class="content">{{ replaceText(item.content, 40) }}</article>
              <span ><img src="@/assets/images/marker-orange.png" class="icon" alt=""/>{{ item.district.name }}</span>
              <div class="tags">
                <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex">#{{ tag }} &nbsp;</span>

              </div>
              <span>{{ item.memberCount }}명 참여중</span>
            </div>
            <nuxt-link to="/" class="m-btn type02 bg-revert-primary">동네모임 더보기 +</nuxt-link>
          </div>
        </div> -->

        <div class="m-24 edu fragment frame">
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
  mixins: [common],
  components: {
    swiperCarusel
  },
  data() {
    return {
      assemblySlideOption: {
        slidesPerView: 'auto',
        centeredSlides: true, 
        spaceBetween: 15,
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
      educationSlideOption: {
        slidesPerView: 'auto',
        spaceBetween: 5,
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
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
      },
      meetings: [
        {
          title: '멤버님들과 담소',
          content: `커피도 마시고 친구같이 좋은 분들의 만남 서울에 계시는 분들과 둘레길 같이 가실분 구합니다.`,
          district: {
            name:'상월곡동',
            district_id:'33',
          },
          tags:[
            '맛집', '카페', '둘레길'
          ],
          img:{},
          memberCount: 7
        },
        {
          title: '세계 커피와 여행힐링',
          content: `커피도 마시고 친구같이 좋은 분들의 만남 서울에 계시는 분들과 북서울 꿈의 숲 같이 가실분 구합니다.`,
          district: {
            name:'월계동',
            district_id:'35',
          },
          tags:[
            '맛집', '카페', '꿈의 숲'
          ],
          img:{},
          memberCount: 8
        },
      ],
      boardLists:{},
    }
  },
  methods: {
    async getList(board) {
      const response = await this.$axios.get(`/api/events` ,{
        params: {
          board: board,
        }
      })
      if(board === 'education') {
        response.data.data.forEach((item) => {
          item.video_thumbnail = item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg');
        })
      }
      this.$set(this.boardLists,`${board}`, response.data.data);
    }
  },
  mounted () {
    this.getList('assembly');
    this.getList('education');
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