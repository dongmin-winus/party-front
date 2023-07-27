<template>
  <div class="area-write">
      <!-- 헤더영역 -->
      <div class="m-header type02">
          <div class="wrap">
              <div class="left">
                  <a href="#" class="btn-text" @click.prevent="$router.back()">취소</a>
              </div>
              <div class="right">
                  <a href="#" class="btn-text primary" @click.prevent="debounceStore">등록</a>
              </div>
          </div>
      </div>
      <!-- 내용 영역 -->
      <div class="container">
          <div class="wrap">
              <div class="mt-20"></div>

              <div class="m-input-text type02">
                  <input type="text" placeholder="제목" v-model="form.title" />
              </div>

              <div class="m-input-error" v-if="errors.title">{{errors.title[0]}}</div>


              <div v-on="listeners" contenteditable="true" placeholder="글을 입력해주세요
(첫번째 올린 사진만 기재됩니다.)" class="m-editor type01" ref="content"></div>


              <div class="m-input-error" v-if="errors.content">{{errors.content[0]}}</div>


              <div class="mt-40"></div>
          </div>
      </div>

      <!-- 하단 네비게이션바 -->
      <div class="m-navigation type01">
          <div class="navs">
              <div class="nav-wrap">
                  <input-camera id="camera" @change="getImgInfo"/>
              </div>

              <div class="nav-wrap">
                  <input-link id="link" @change="(data) => {this.$refs.content.innerHTML += data.html}"/>
              </div>

              <div class="nav-wrap">
                  <input-img id="img" @change="getImgInfo"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import InputCamera from '@/components/form/posts/inputCamera';
import InputLink from "@/components/form/posts/inputLink";
import InputImg from "@/components/form/posts/inputImg";
import Form from "@/utils/Form";
import {debounce} from "@/utils/debounce";
export default {
  components: {InputImg, InputLink, InputCamera},
  auth: true,
  data() {
      return {
          imgs: {
              repImg: {},
              contentImgs: [],
          },
          item: "",

          form: {
              title: "",
              board: "mission",
              parent_id: this.$route.query.id,
              content: "",
              district_id: 0,
              thumbnail: "",
              start_date: new Date().toISOString().slice(0, 10),
              user_id: this.$auth.user.id,
              duration: this.$route.query.duration,
          },
          parasole:false,
          errors: {},

          activeLinkPop: false,
          contentTags: "",
      }
  },
  computed: {
    listeners() {
      console.log('listeners', this.$listeners)
      return { ...this.$listeners,input: this.onInput, change: this.onChange };
    },
    date() {
      return this.form.start_date;
    }
  },
  watch: {
    contentTags: function (val) {
      const editor = document.querySelector('.m-editor');
      const pics = editor.querySelectorAll(":scope > img");
    }
  },
  methods: {
      onInput(event) {
        this.contentTags = event.target.innerHTML;
        // console.log('onInput', event.target.innerHTML,33232)
        //   // this.$emit("input", event.target.innerHTML);
      },
      onChange(event) {
        this.contentTags = event.target.innerHTML;
        // console.log('onInput', event.target.innerHTML,33232)
        //   // this.$emit("input", event.target.innerHTML);
      },
      async store() {
          //대표이미지 코드
          const editor = document.querySelector('.m-editor');
          const firstPic = editor.querySelectorAll(":scope > img")[0];
          if(!this.form.thumbnail && firstPic) { //대표이미지가 없을 경우: 에디터 내에 사진이 있을 경우 첫번째 사진정보를 this.form.thumbnail에 추가
              const firstPicFileInfo = this.imgs.contentImgs.find(img => img.url === firstPic.src).file;
              this.form.thumbnail = firstPicFileInfo;
          }
          //대표이미지 코드 끝

          //유튜브 코드
          if(this.form.video_url) {
              let youtubeInformation = this.getYoutubeInformation(this.form.video_url);

              this.form.video_url = youtubeInformation.embedUrl;
              this.form.video_id = youtubeInformation.id;
              this.form.video_thumbnail = youtubeInformation.thumbnail;
          }
          //유튜브 코드 끝

          //콘텐츠 폼에 담기
          this.form.content = this.$refs.content ? this.$refs.content.innerHTML : "";
          //콘텐츠 폼에 담기 끝


          let form = (new Form(this.form)).data();

          // update
          // if(this.item)
          //     return this.$axios.post("/api/posts/update/" + this.item.id, form)
          //         .then((response) => {
          //             alert("성공적으로 처리되었습니다.");

          //             this.$router.back();
          //         })
          //         .catch((error) => {
          //             if (error.response && error.response.data)
          //                 this.errors = error.response.data.errors;
          //         });

          // store
          this.$axios.post("/api/missions", form)
              .then((response) => {
                if(response.data.result == true) {
                    alert("성공적으로 처리되었습니다.");

                }else if(response.data.result == false) {
                    alert(response.data.message);
                }
                this.$router.back();

              })
              .catch((error) => {
                  if (error.response && error.response.data)
                      this.errors = error.response.data.errors;
              });
      },
      setContentImg(data) {
          this.$refs.content.innerHTML += data.html;
          this.contentTags = this.$refs.content.innerHTML;
      },
      getImgInfo(data) {
        if(this.imgs.length>1) return alert('이미지는 1개만 등록 가능합니다.');
          this.setContentImg(data);
          this.imgs.contentImgs.push(data);
      },
      getThumbnailInfo(data) {
          this.setThumbnail(data);
          this.imgs.repImg = {
              ...data,
          }
      },

      reset(){
          this.$refs.content.innerHTML = "";

          this.form = {
              ...this.form,
              title: "",
              content: "",
              thumbnail: "",

              // 마을 영상 관련
              video_url:"",

              // 마을 모임 관련
              participant_type: "",
              start_date: "",
              end_date: "",
              x: "",
              y: "",
              participant_available_count: "",
              price: "",
              address: "",
              address_detail: "",
          }
      }
  },

  mounted() {

  },
  created () {
      /**
       * SEE : https://dmitripavlutin.com/vue-debounce-throttle/
       * 3.A word of aution...
       */
      this.debounceStore = debounce(() => {
          this.store()
      },500);
  },
}
</script>

<style scoped>

</style>
