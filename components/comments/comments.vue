<template>
  <div class="area-comments">
    <div class="create-comment">
      <div class="up">
        <div class="left">
          <input type="text" placeholder="작성자" />
          <input type="text" placeholder="비밀번호" />
        </div>
        <div class="light">
          <div class="m-btn type01 bg-red">등록</div>
        </div>
      </div>
      <div class="down">
        <textarea class="text-area" name="" id="" cols="30" rows="3" placeholder="내용"></textarea>
      </div>
    </div>
    <div class="mt-20 order-btns">
      <div class="left">
        <input type="radio" id="latest" value="latest" v-model="orderType">
        <label for="latest" :class="isSelected('latest')">최신순</label>
        <input type="radio" id="recommend" value="recommend" v-model="orderType">
        <label for="recommend" :class="isSelected('recommend')">추천순</label>
        <input type="radio" id="replies" value="replies" v-model="orderType">
        <label for="replies" :class="isSelected('replies')">댓글순</label>
      </div>
      <div class="right">
        BEST 댓글
      </div>
    </div>
    <comment-item v-for="comment in bestComments"  :comment="comment" :isBest="true" />
    <comment-item v-for="comment in comments" :comment="comment" />
  </div>
</template>

<script>
import CommentItem from './comment.vue'
export default {
  name: 'Comments',
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      default: () => {}
    },
  },
  computed: {
    bestComments() {
      //comments 에서 recommend 와 replies.length 의 합이 가장 높은 상위 3개의 댓글을 반환
      return this.comments.sort((a, b) => {
        return (b.recommend + b.replies.length) - (a.recommend + a.replies.length)
      }).slice(0, 3)
    }
  },
  data() {
    return {
      orderType: 'latest',
      tooltipVisible: false,

    }
  },
  methods: {
    isSelected(type) {
      return this.orderType === type ? 'active' : '';
    },
    showTooltip() {
      this.tooltipVisible = !this.tooltipVisible;
    }
  }
}
</script>

<style scoped>

  .create-comment {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    border: 1px solid #e5e5e5;
  }
  .create-comment .up {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .create-comment .up .left {
    display: flex;
    justify-content: space-between;
    width: 75%;
  }
  .create-comment .up .left input {
    border: 1px solid #e5e5e5 !important;
    margin-right: 5px;
    padding: 5px;
    width: 100%;
  }
  .create-comment .up .light {
    width: 17%;
  }
  .create-comment .down {
    margin-top: 10px;
  }
  .create-comment .down .text-area {
    border: 1px solid #e5e5e5 !important;
    padding: 5px;
    width: 100%;
    resize: none;
  }
  .order-btns {
    display: flex;
    justify-content: space-between;
  }
  .order-btns .left {
    display: flex;
    justify-content: flex-start;
    gap: 5px;
  }
  .order-btns .left label {
    border-radius: 50px;
    min-width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #e5e5e5;
  }
  .order-btns .left label.active {
    background-color: #000;
    color: #fff;
  }
  .order-btns .right {
    border-radius: 50px;
    min-width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: red;
  }


</style>