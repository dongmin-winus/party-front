<template>
  <div class="area-test">
    <!-- <headerType01 /> -->
    <div class="container bg">
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
      <comments :comments="comments" />

    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
import Flip from '@/components/flip.vue';
import Comments from '@/components/comments/comments.vue';
export default {
  components: {
    Flip,
    Comments
  },
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
      number:1,
      totalComments: 999,
      comments: [
        {
          id: 1,
          name: '자유사랑',
          password: '1234',
          content: '유옹유 호앋이 이새졍 찌어눠',
          createdAt: '2024-02-22',
          recommend: 15,
          replies: []
        },
        {
          id: 2,
          name: '김철수',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          recommend: 14,
          replies: [
            {
              id: 1,
              name: '홍길동',
              password: '1234',
              content: '안녕하세요',
              createdAt: '2024-02-01',
              recommend: 10,
              replies: []
            },
            {
              id: 2,
              name: '김철수',
              password: '1234',
              content: '안녕하세요',
              createdAt: '2024-02-01',
              recommend: 10,
              replies: []
            }
          ]
        },
        {
          id: 3,
          name: '이영희',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          recommend: 13,
          replies: []
        },
        {
          id: 4,
          name: '박철수',
          password: '1234',
          content: '안녕하세요',
          createdAt: '2024-02-01',
          recommend: 10,
          replies: []
        }
      ]
    }
  },
  methods: {
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
    }
  },
  mounted() {
    // 0~9의 숫자를 1000~5000ms 사이의 랜덤한 시간마다 숫자 증가
    setInterval(() => {
      this.numberPlus();
      this.commentPlus();
    }, Math.floor(Math.random() * 4000) + 1000)
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

  .bg-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .total-comments-container {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
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