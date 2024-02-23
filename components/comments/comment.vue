<template>
  <div class="comment-item">
    <div class="comment-item__header">
      <div class="comment-item__header__content">
        <div class="comment-item__header__name">
          {{ replaceText(comment.name,2,'O','back') }}
        </div>
        <div class="comment-item__header__date">
          {{ comment.createdAt }}
        </div>
      </div>
      <div class="comment-item__header__delete">
        <!-- {{ comment.createdAt }} -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M14.2852 16.5714C14.2852 18.2314 12.9452 19.5714 11.2852 19.5714H4.28516C2.62516 19.5714 1.28516 18.2314 1.28516 16.5714V4.57141H0.285156V1.57141H4.78516L5.78516 0.571411H9.78516L10.7852 1.57141H15.2852V4.57141H14.2852V16.5714ZM2.28516 4.57141V16.5714C2.28516 17.6714 3.18516 18.5714 4.28516 18.5714H11.2852C12.3852 18.5714 13.2852 17.6714 13.2852 16.5714V4.57141H2.28516ZM14.2852 3.57141V2.57141H10.2852L9.28516 1.57141H6.28516L5.28516 2.57141H1.28516V3.57141H14.2852ZM4.28516 6.57141H5.28516V16.5714H4.28516V6.57141ZM10.2852 6.57141H11.2852V16.5714H10.2852V6.57141Z" fill="black"/>
        </svg>
      </div>
    </div>
    <div class="comment-item__content">
      <span v-if="isBest" class="best-comment">BEST</span>{{ comment.content }}
    </div>
    <div class="comment-item__footer">
      <div class="comment-item__footer__create" @click="replyCreate = !replyCreate">
        답글 {{replyCreate ? '취소' : '작성'}}
      </div>
      <div class="comment-item__footer__recommend">
      <!-- empty thumb-up -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
        <path d="M11.11 3.72L10.54 6.61C10.42 7.2 10.58 7.81 10.96 8.27C11.34 8.73 11.9 9 12.5 9H18V10.08L15.43 16H7.34C7.16 16 7 15.84 7 15.66V7.82L11.11 3.72ZM12 0L5.59 6.41C5.21 6.79 5 7.3 5 7.83V15.66C5 16.95 6.05 18 7.34 18H15.44C16.15 18 16.8 17.63 17.16 17.03L19.83 10.88C19.94 10.63 20 10.36 20 10.08V9C20 7.9 19.1 7 18 7H12.5L13.42 2.35C13.47 2.13 13.44 1.89 13.34 1.69C13.11 1.24 12.82 0.83 12.46 0.47L12 0ZM2 7H0V18H2C2.55 18 3 17.55 3 17V8C3 7.45 2.55 7 2 7Z" fill="black"/>
      </svg> 
      {{ comment.recommend }}
      </div>
      <div @click="toggleReplies" class="comment-item__footer__reply">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.991 1.8C17.991 0.81 17.19 0 16.2 0H1.8C0.81 0 0 0.81 0 1.8V12.6C0 13.59 0.81 14.4 1.8 14.4H14.4L18 18L17.991 1.8ZM14.4 10.8H3.6V9H14.4V10.8ZM14.4 8.1H3.6V6.3H14.4V8.1ZM14.4 5.4H3.6V3.6H14.4V5.4Z" fill="black"/>
      </svg> 
      {{ comment.replies.length }}
      </div>
    </div>
    <div v-if="replyCreate">
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
    </div>
    <div v-if="showReplies">
      <transition-group name="slide" tag="div" class="comment-item__replies">
        <comment-item t-item v-for="reply in comment.replies" :key="reply.id" :comment="reply">
        </comment-item>
      </transition-group>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
export default {
  name: 'CommentItem',
  mixins: [common],
  props: {
    comment: {
      type: Object,
      default: {
        id: 0,
        name: '자유사랑',
        password: '1234',
        content: '유옹유 호앋이 이새졍 찌어눠',
        createdAt: '2024-02-22',
        recommend: 10,
        replies: [
          {
            id: 1,
            name: '홍길동',
            password: '1234',
            content: '안녕하세요',
            createdAt: '2024-02-22',
            recommend: 10,
            replies: []
          },
        ]
      }
    },
    isBest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showReplies: false,
      replyCreate: false
    }
  },
  methods: {
    toggleReplies() {
      if(this.comment.replies.length === 0) return;
      this.showReplies = !this.showReplies
    }
  }
}
</script>

<style scoped>
  .comment-item {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #e5e5e5;
  }
  .comment-item__header {
    display: flex;
    justify-content: space-between;
  }
  .comment-item__header__content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .comment-item__header__name {
    font-weight: 700;
  }
  .comment-item__header__date {
    color: #666;
  }
  .comment-item__content {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }
  .comment-item__content .best-comment {
    color: white;
    background-color: red;
    padding: 0 5px;
    border-radius: 5px;
  }
  .comment-item__footer {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 10px;
  }
  .comment-item__footer__create {
    color: #666;
    cursor: pointer;
  }
  .comment-item__footer__recommend {
    color: #666;
  }
  .comment-item__footer__reply {
    color: #666;
    cursor: pointer;
  }
  .comment-item__replies {
    margin-top: 10px;
    padding-left: 20px;
    /* border-left: 1px solid #e5e5e5; */
  }

  .create-comment {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    border: 1px solid #e5e5e5;
    margin-top: 5px;
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

</style>