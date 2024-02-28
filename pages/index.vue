<template>
  <div class="area-test">
    <!-- <headerType01 /> -->
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
      <!-- <div class="m-btns type01">
        <div class="m-btn-wrap">
          <button class="m-btn type02 bg-revert-red width-100" @click.prevent="numberPlus">숫자 증가</button>
        </div>
      </div> -->
      <div class="bg-image">
        <!-- TODO 슬라이더 자리 -->
        <img :src="require(`@/assets/images/party/slide_1.png`)" class="img" alt="bg-image" />
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
      <!-- 아직 안되는것:  댓글 삭제, 대댓글 작성, 대댓글 좋아요? 토글, 대댓글 삭제 -->
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
      // return this.number.toString().split('')
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
      meta: {}
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
        this.number = res.view_count;
        this.totalComments = res.comment_count;
      }
    }
  },
  async mounted() {
    await this.getCountInfo();
    if (this.echo) this.disconnect();
    this.connect();
    await this.visitorCount();
    // 0~9의 숫자를 1000~5000ms 사이의 랜덤한 시간마다 숫자 증가
    // setInterval(() => {
    //   this.numberPlus();
    //   this.commentPlus();
    // }, Math.floor(Math.random() * 4000) + 1000)
    await this.getBestComments();
    await this.getCommentList()
  }
}
</script>

<style scopped>
  .container.bg {
    /* background-color: #000; */
    background-image: url('@/assets/images/party/back.jpeg');
    background-size: cover;
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
  }
  .bg-image img {
    width: 100%;
    height: fit-content;
    object-fit: cover;
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