<template>
  <div class="area-test">
    <!-- <headerType01 /> -->
    <div class="container bg" style="padding-top: 20px !important;">
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
        <img :src="require(`@/assets/images/dkvsjm.png`)" class="img" alt="bg-image" />
        <div class="total-comments-container">
          <div class="comment-info">
            전체 댓글 {{ countDots(totalComments) }}
          </div>
        </div>
      </div>

    </div>
    <div class="mt-20 wrap">
      <!-- 아직 안되는것: [totalView, totalComments] echo 연결, 
      좋아요 토글, 댓글 삭제, 대댓글 작성, 대댓글 좋아요? 토글, 대댓글 삭제 -->
      <div v-if="$auth.user" class="m-btn type01 bg-revert-red" @click="logout">로그아웃</div>
      <comments :comments="comments" />

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
      number:999980,
      totalComments: 980,
      comments: [
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
              comments: []
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
      ]
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
      this.echo.channel('totalComments')
        .listen("TotalCommentChanged", (payload) => { this.onTotalCommentChanged(payload) });
      this.echo.channel(`totalView`)
        .listen("TotalViewChanged", (payload) => { this.onTotalViewChanged(payload) });
    },
    disconnect() {
      this.echo.leaveChannel("totalComments");
      this.echo.leaveChannel("totalView");
    },
    async onTotalCommentChanged(payload) {
      console.log('TotalCommentChanged 진입', 1111)
      console.log(payload, 'payload', 2222)
    },
    commentPlus() {
      let random = Math.floor(Math.random() * 10)
      this.totalComments = this.totalComments + random;
    },
    numberPlus() {
      let random = Math.floor(Math.random() * 10)
      this.number = this.number + random;
    },
    numberTest(msg) {
      const regex = /^[0-9]*$/
      return regex.test(msg);
    },
    async getCommentList() {
      const res = await this.$axios.$get('/api/comments?commentable_type=post&commentable_id=1')
      if(res.data) {
        console.log(res.data, 'comment list',67676767)
        this.comments = res.data
      }
    },
    async logout() {
      const res = await this.$axios.$get('/api/auth/logout')
      if(res.data) {
        this.$auth.logout()
      }
    }
  },
  mounted() {
    // if (this.echo) this.disconnect();
    // this.connect();
    // 0~9의 숫자를 1000~5000ms 사이의 랜덤한 시간마다 숫자 증가
    setInterval(() => {
      this.numberPlus();
      this.commentPlus();
    }, Math.floor(Math.random() * 4000) + 1000)

    // this.getCommentList()
  }
}
</script>

<style scopped>
  .container.bg {
    background-color: #000;
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
    background-color: rgb(255, 85, 0, 0.5);
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
    background-image: linear-gradient(rgba(255, 85, 0, 0) 10%, rgba(0, 0, 0, 0.8) 100%);
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