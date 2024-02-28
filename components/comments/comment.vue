<template>
  <div class="comment-item">
    <div class="comment-item__header">
      <div class="comment-item__header__content">
        <div class="comment-item__header__name">
          {{ replaceText(comment.user.name,2,'O','back') }}
        </div>
        <div class="comment-item__header__date">
          {{ comment.created_at }}
        </div>
      </div>
      <!-- <div class="comment-item__header__delete" @click="deleteModal = true"> -->
      <div v-if="isAuthor && !comment.deleted_at" class="comment-item__header__delete" @click="deleteComment">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M14.2852 16.5714C14.2852 18.2314 12.9452 19.5714 11.2852 19.5714H4.28516C2.62516 19.5714 1.28516 18.2314 1.28516 16.5714V4.57141H0.285156V1.57141H4.78516L5.78516 0.571411H9.78516L10.7852 1.57141H15.2852V4.57141H14.2852V16.5714ZM2.28516 4.57141V16.5714C2.28516 17.6714 3.18516 18.5714 4.28516 18.5714H11.2852C12.3852 18.5714 13.2852 17.6714 13.2852 16.5714V4.57141H2.28516ZM14.2852 3.57141V2.57141H10.2852L9.28516 1.57141H6.28516L5.28516 2.57141H1.28516V3.57141H14.2852ZM4.28516 6.57141H5.28516V16.5714H4.28516V6.57141ZM10.2852 6.57141H11.2852V16.5714H10.2852V6.57141Z" fill="black"/>
        </svg>
      </div>
    </div>
    <div class="comment-item__content">
      <span v-if="isBest" class="best-comment">BEST</span>{{ comment.deleted_at ? '댓글이 삭제되었습니다.' : comment.content }}
    </div>
    <div class="comment-item__footer">
      <div v-if="!comment.is_reply && !comment.deleted_at" class="comment-item__footer__create" @click="toggleReplyCreate">
        답글 {{replyCreate ? '취소' : '작성'}}
      </div>
      <div v-if="!comment.deleted_at" class="comment-item__footer__recommend" @click="toggleLike">
        <!-- empty thumb-up -->
        <svg v-show="!this.is_like" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
          <path d="M11.11 3.72L10.54 6.61C10.42 7.2 10.58 7.81 10.96 8.27C11.34 8.73 11.9 9 12.5 9H18V10.08L15.43 16H7.34C7.16 16 7 15.84 7 15.66V7.82L11.11 3.72ZM12 0L5.59 6.41C5.21 6.79 5 7.3 5 7.83V15.66C5 16.95 6.05 18 7.34 18H15.44C16.15 18 16.8 17.63 17.16 17.03L19.83 10.88C19.94 10.63 20 10.36 20 10.08V9C20 7.9 19.1 7 18 7H12.5L13.42 2.35C13.47 2.13 13.44 1.89 13.34 1.69C13.11 1.24 12.82 0.83 12.46 0.47L12 0ZM2 7H0V18H2C2.55 18 3 17.55 3 17V8C3 7.45 2.55 7 2 7Z" fill="black"/>
        </svg>
        <!-- filled thumb-up -->
        <svg v-show="this.is_like" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 22 18" fill="none">
          <path d="M23 10C23 8.89 22.1 8 21 8H14.68L15.64 3.43C15.66 3.33 15.67 3.22 15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9V19C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10ZM1 21H5V9H1V21Z" fill="black"/>
        </svg>
        {{ comment.like_count }}
      </div>
      <div v-if="comment.comments && !comment.is_reply && !comment.deleted_at" @click="toggleReplies" class="comment-item__footer__reply">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M17.991 1.8C17.991 0.81 17.19 0 16.2 0H1.8C0.81 0 0 0.81 0 1.8V12.6C0 13.59 0.81 14.4 1.8 14.4H14.4L18 18L17.991 1.8ZM14.4 10.8H3.6V9H14.4V10.8ZM14.4 8.1H3.6V6.3H14.4V8.1ZM14.4 5.4H3.6V3.6H14.4V5.4Z" fill="black"/>
        </svg> 
        {{ comment.comments?.length }}
      </div>
    </div>
    <div v-if="replyCreate">
      <div class="create-comment">
        <div class="up">
          <div class="left">
            <template v-if="!$auth.user">
              <input type="text" placeholder="작성자" v-model="name"/>
              <input type="text" placeholder="비밀번호" v-model="password"/>
            </template>
            <template v-else>
              <span class="name">{{$auth.user.name}} 님</span>
            </template>
          </div>
          <div class="light">
            <div class="m-btn type01 bg-red" @click="action">등록</div>
          </div>
        </div>
        <div class="down">
          <textarea class="text-area" v-model="content" cols="30" rows="3" placeholder="내용"></textarea>
        </div>
      </div>
    </div>
    <div v-if="showReplies">
      <transition-group name="slide" tag="div" class="comment-item__replies">
        <comment-item t-item v-for="reply in comment.comments" :key="reply.id" :comment="reply">
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
        created_at: '2024-02-22',
        recommend: 10,
        comments: [
          {
            id: 1,
            name: '홍길동',
            password: '1234',
            content: '안녕하세요',
            created_at: '2024-02-22',
            recommend: 10,
            comments: []
          },
        ]
      }
    },
    isBest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isAuthor() {
      if(!this.$auth.user) return false;
      return this.comment.user.id === this.$auth.user?.id
    },
  },
  data() {
    return {
      showReplies: false,
      replyCreate: false,
      name: null,
      password: null,
      content: null,
      is_like: null,
      like_count: null,
      deleteModal: false,

      commentCreateUrl: `/api/comments?commentable_type=comment`
    }
  },
  methods: {
    toggleReplyCreate() {
      this.replyCreate = !this.replyCreate
    },
    toggleReplies() {
      if(this.comment.comments.length === 0) return;
      this.showReplies = !this.showReplies
    },
    async toggleLike() {
      if(!this.$auth.user) {
        alert('댓글 등록 후 추천이 가능합니다')
        return;
      }
      const res = await this.$axios.put(`/api/likes/comments/${this.comment.id}`)
      if(res.status === 200) {
        if(this.is_like == 0) {
          this.comment.like_count++;
          this.is_like = 1;
        } else {
          this.comment.like_count--;
          this.is_like = 0;
        }
      }

    },
    async deleteComment() {
      if(!this.$auth.user) {
        alert('댓글 삭제는 작성자만 가능합니다')
        return;
      }
      const res = await this.$axios.delete(`/api/comments/${this.comment.id}`);
      if(res.status === 200) {
        alert(res.data.message);
        this.comment.deleted_at = 1;
      }
    
    },
    validateUserInput() {
      if(!this.name) {
        alert('작성자를 입력해주세요')
        return false
      }
      if(!this.password) {
        alert('비밀번호를 입력해주세요')
        return false
      }
      return true
    },
    async createCommentReply() {
      try {
        const res = await this.$axios.$post(this.commentCreateUrl, {
          commentable_id: this.comment.id,
          content: this.content
        })
        if(res.data) {
          alert(res.message);
          this.comment.comments.push(res.data)
          this.toggleReplyCreate();
        }
      } catch (error) {
        if(error.response?.data) {
          alert(error.response.data.message)
        }else {
          alert('서버에러 발생')
          console.error(error)
        }
      }
    },
    async login() {
      const res = await this.$auth.loginWith('laravelSanctum', {data: {
        name: this.name,
        password: this.password
      }})
      return res;
    },
    async action() {
      if(!this.$auth.user) {
        if(this.validateUserInput()) {
          try {
            const res = await this.login();   
            if(res.data.name) {
              await this.$auth.setUser(res)
              await this.createCommentReply();
            }else if(res.status == false) {
              return alert('비밀번호가 틀렸습니다')
            }
          } catch (error) {
            if(error.response?.data) {
              alert(error.response.data.message)
            }else {
              alert('서버에러 발생')
              console.error(error)
            }
          }
        }
      }else {
        await this.createCommentReply();
      
      }
    }
  },
  mounted() {
    this.is_like = this.comment.is_like;
    this.like_count = this.comment.like_count;
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
  .create-comment .up .left .name {
    font-size: 20px;
    font-weight: 700;
    padding-top: 5px;
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