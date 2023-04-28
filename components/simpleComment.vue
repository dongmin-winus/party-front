<template>
  <div class="m-comment">

      <div class="m-comment-inner">
          <!-- <div class="thumbnail" :style="`background-image:url(${item.user.img.url})`" v-if="item.user.img"></div> -->

          <div class="content">
              <h3 class="title">{{ item.user.nickname }}</h3>
              <p class="sub">{{ item.user.district.district }} · {{ item.diff_at }}</p>
              <p class="body">{{ item.content }}</p>


              <form action="" @submit.prevent="store" v-if="active">
                  <div class="m-input-withBtn type01">
                      <div class="m-input m-input-text type01">
                          <input type="text" placeholder="댓글을 입력해주세요." v-model="form.content">
                      </div>

                      <button class="m-input-btn m-btn type02">저장</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      item: {
          required: true,
      },

      commentable_id: {

      },

      commentable_type: {
          default : "post"
      }
  },
  data() {
      return {
          form: {
              commentable_type: "comment",
              commentable_id: this.item.id,
              content: "",
          },
          active: false,
          activeReplies: false,
          activeSpamPop: false,
          activeBtns: false,
      }
  },
  methods: {
      store() {
          if(!this.$auth.user)
              return this.$router.push("/auth/login");

          this.$axios.post("/api/comments", this.form)
              .then(response => {
                  this.active = false;

                  this.form.content = "";

                  this.item.comments.push(response.data.data);
              });
      },
 
  },

  mounted() {


  }
}
</script>

<style scoped>

</style>
