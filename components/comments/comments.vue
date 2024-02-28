<template>
  <div class="area-comments">
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
    <no-ssr>
        <!-- <infinite-loading @infinite="loadMore" v-if="links.next" /> -->
        <scroll-loading @load="loadMore" v-if="links.next" />
    </no-ssr>
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
    links: {
      type: Object,
      default: () => {}
    },
    meta: {
      type: Object,
      default: () => {}
    },
    page: {
      type: Number,
      default: 1
    }
  },
  computed: {
    bestComments() {
      //comments 에서 like_count 와 comments.length 의 합이 가장 높은 상위 3개의 댓글을 반환
      return this.comments.sort((a, b) => {
        return (b.like_count + b.comments?.length) - (a.like_count + a.comments?.length)
      }).slice(0, 3)
    }, 
    orderedComments() {
     let orderedComments;
      // if(type === 'latest') {
      //   return this.comments.sort((a, b) => {
      //     return new Date(b.created_at) - new Date(a.created_at)
      //   })
      // }else if(type === 'recommend') {
      //   return this.comments.sort((a, b) => {
      //     return b.like_count - a.like_count
      //   })
      // }else if(type === 'replies') {
      //   return this.comments.sort((a, b) => {
      //     return b.comments.length - a.comments.length
      //   })
      // }
      switch(this.orderType) {
        case 'latest':
          orderedComments = this.comments.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
          })
          break;
        case 'recommend':
          orderedComments = this.comments.sort((a, b) => {
            return b.like_count - a.like_count
          })
          break;
        case 'replies':
          orderedComments = this.comments.sort((a, b) => {
            return b.comments.length - a.comments.length
          })
          break;
      }
      console.log(orderedComments,'orderedComments', 1111)
      return orderedComments
    }
  },
  data() {
    return {
      orderType: 'latest',
      tooltipVisible: false,

      name: null,
      password: null,
      content: null,
      postCreateUrl: '/api/comments?commentable_type=post&commentable_id=1'
    }
  },
  methods: {
    loadMore(state) {
        if(this.meta.current_page <= this.meta.last_page){  
            this.$emit('loadMore', this.meta.current_page + 1)
            // this.$axios.get("/api/comments", {
            //     params: this.form
            // }).then(response => {
            //     this.items = {
            //         ...response.data,
            //         data: [...this.items.data, ...response.data.data]
            //     };

            //     state.loaded();
            // });
        }
    },
    isSelected(type) {
      return this.orderType === type ? 'active' : '';
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
    async createComment() {
      try {
        const res = await this.$axios.$post(this.postCreateUrl, {
          content: this.content
        })
        console.log(res,'comment create response',565656)
        if(res.data) {
          alert(res.message)
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
    async action () {
      if(!this.$auth.user) {
        if(this.validateUserInput()) {
          try {
            const res = await this.$axios.$post('/api/auth/login', {
              name: this.name,
              password: this.password
            })
            if(res.name) {
              await this.$auth.setUser(res)
              console.log(this.$auth.user,'this.$auth.user',454545)
              await this.createComment();
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
        await this.createComment();
      }
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
  .create-comment .up .left .name {
    font-size: 20px;
    font-weight: 700;
    padding-top: 5px;
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