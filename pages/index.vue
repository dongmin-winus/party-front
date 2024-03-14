<template>
  <div class="area-test">
    <div class="container bg" style="padding-top: 0px !important;">
      <div class="number-container">
        <span class="total">total.</span>
        <template v-for="(msg, idx) in splitedNumber">
          <Flip v-if="numberTest(msg)" :key="idx" :msg="msg">
            <template v-slot:default >
              {{msg}}
            </template>
          </Flip>
          <div v-else class="dot">
            {{msg}}
          </div>
        </template>
      </div>
      <div class="bg-image">
          <div class="slide-container">
            <button class="prev" @click="prevImage">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.41 16.58L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.58Z" fill="#E7E7E7"/>
              </svg>
            </button>
            <button class="next" @click="nextImage">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z" fill="#E7E7E7"/>
              </svg>
            </button>
            <transition name="fade" mode="out-in">
                <img v-if="images.length > 0" :src="images[currentIndex]?.banner_image?.preview_url" :key="currentIndex" class="img" alt="bg-image" @click="handleImageClick"/>
            </transition>
          </div>
        <div class="mt-12"></div>
        <img :src="require(`@/assets/images/party/five-per.png`)" class="img" alt="bg-image" />

        <div class="total-comments-container">
          <div class="comment-info">
            전체 댓글 {{ countDots(totalComments) }}
          </div>
        </div>
      </div>

    </div>
    <div class="mt-20 wrap">
      <comments
        @loadMore="getCommentList"
        @alignComments="getCommentList"
        :comments="comments" 
        :bestComments="bestComments"
        :links="links" 
        :meta="meta" 
      />

    </div>
  </div>
</template>

<script>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import common from '@/utils/common';
import Flip from '@/components/flip.vue';
import Comments from '@/components/comments/comments.vue';
export default {
  components: {
    Flip,
    Comments
  },
  auth:false,
  mixins: [common],
  computed: {
    splitedNumber() {
      const formattedNumber = new Intl.NumberFormat('en-US').format(this.number);
      return formattedNumber.toString().split('')
    },

  },
  data() {
    return {
      echo: null,
      number: 0,
      totalComments: 0,
      old_comments: [
        {
          id: 1,
          name: '자유사랑',
          password: '1234',
          content: '유옹유 호앋이 이새졍 찌어눠',
          createdAt: '2024-02-22',
          like_count: 15,
          comments: []
        },
        {
          id: 2,
          name: '김철수',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          like_count: 14,
          comments: [
            {
              id: 1,
              name: '홍길동',
              password: '1234',
              content: '안녕하세요',
              createdAt: '2024-02-01',
              like_count: 10,
              comments: [
                {
                  id: 5,
                  name: '이영희',
                  password: '1234',
                  content: '안녕하세요',
                  createdAt: '2024-02-01',
                  like_count: 13,
                  comments: []
                },
                {
                  id: 6,
                  name: '박철수',
                  password: '1234',
                  content: '안녕하세요',
                  createdAt: '2024-02-01',
                  like_count: 10,
                  comments: []
                }
              ]
            },
            {
              id: 2,
              name: '김철수',
              password: '1234',
              content: '안녕하세요',
              createdAt: '2024-02-01',
              like_count: 10,
              comments: []
            }
          ]
        },
        {
          id: 3,
          name: '이영희',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          like_count: 13,
          comments: []
        },
        {
          id: 4,
          name: '박철수',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          like_count: 10,
          comments: []
        }
      ],
      bestComments: [],
      comments: [],
      links: {},
      meta: {},

      currentIndex: 0,
      images:[],
    }
  },
  methods: {
    connect() {
      if(!window.Pusher)
        window.Pusher = Pusher;
      if(!this.echo) {
        this.echo = new Echo({
          broadcaster: "pusher",
          key: "668bac10cc6db3a1338c",
          cluster: "ap3",
          authEndpoint: '/api/broadcasting/auth',
        })
      }
      this.echo.channel('CommentCountChannel')
        .listen("CommentCount", (payload) => { this.totalComments = payload.count });
      this.echo.channel(`VisitorCountChannel`)
        .listen("VisitorCount", (payload) => { this.number = payload.count});
    },
    disconnect() {
      this.echo.leaveChannel("CommentCountChannel");
      this.echo.leaveChannel("BisitorCountChannel");
    },
    numberTest(msg) {
      const regex = /^[0-9]*$/
      return regex.test(msg);
    },
    async getCommentList(page = 1, align = '') {
      const res = await this.$axios.$get('/api/comments?commentable_type=post&commentable_id=1',{
        params: {
          page,
          align
        }
      })
      if(res.data) {
        if(page === 1) {
          this.comments = res.data;
       }else {
        this.comments = [...this.comments,...res.data];
       }
        this.links = res.links;
        this.meta = res.meta;
      }
    },
    async getBestComments() {
      const res = await this.$axios.$get('/api/best');
      if(res.data) {
        this.bestComments = res.data;
      }
    },
    async logout() {
      const res = await this.$axios.$get('/api/auth/logout')
      if(res.data) {
        this.$auth.logout()
      }
    },
    async visitorCount() {
      const res = await this.$axios.$post('/api/visitor/count')
    },
    async getCountInfo() {
      const res = await this.$axios.$get('/api/visitor/home')
      if(res) {
        this.number = res.view_count ?? 0;
        this.totalComments = res.comment_count ?? 0;
      }
    },
    async getSlides() {
      const res = await this.$axios.$get('/api/party-admin/banners')
      this.images = res.data;
      if(this.images.length > 2) {
        setInterval(() => {
          this.nextImage();
        }, 3000);
      }
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
    },
    handleImageClick(event) {
      const width = event.currentTarget.offsetWidth;
      const clickX = event.clientX - event.currentTarget.getBoundingClientRect().left;
      if (clickX < width / 2) {
        // 이미지의 왼쪽 절반 클릭
        this.prevImage();
      } else {
        // 이미지의 오른쪽 절반 클릭
        this.nextImage();
      }
    }
  },
  async mounted() {
    await this.getSlides();

    await this.getCountInfo();
    if (this.echo) this.disconnect();
    this.connect();
    await this.visitorCount();
    await this.getBestComments();
    await this.getCommentList();
  }
}
</script>

<style scopped>
  .slide-container {
    overflow: hidden;
    position: relative;
    min-height: 400px;
  }

  .slide-container button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
  }
  .slide-container button.prev {
    left: 0;
  }
  .slide-container button.next {
    right: 0;
  }
  .slide-container img {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  .container.bg {
    /* background-color: #000; */
    background-image: url('@/assets/images/party/back.jpeg');
    background-size: contain;
    background-position: center;

  }
  .number-container {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  .number-container .total {
    font-size: 28px;
    font-weight: 700;
    padding: 0 5px;
    padding-top: 2px;
    color:#fff;
  }
  .dot {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color:#fff;
    padding: 0 3px;
  }
  .bg-image {
    /* background-color: rgb(255, 85, 0, 0.5); */
    background: transparent;
    width: 100%;
    max-width: 100vw;
  }
  .bg-image img {
    width: 100%;
  }
  .total-comments-container {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 20px; 
    /* background-image: linear-gradient(rgba(255, 85, 0, 0) 10%, rgba(0, 0, 0, 0.8) 100%); */
    /* padding: 10px 0; */
  }
  .comment-info {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    text-shadow: 1px 0 10px rgb(255, 166, 0);
    text-align: center;
  }
</style>