<template>
  <div>
    <modal
        @cancel="closeEvaluteModal"
    >
        <template #inner>
            <div class="m-pop-title" style="margin-top:-40px">
                의원 평가하기
            </div>
            <div class="pop-container">
            <section class="head-wrapper">
                <div class="img-container">
                    <div class="crop-image" :style="`background-image:url('${item.img.url}')`"></div>
                    <div class="mt-8"></div>
                    <div class="m-pop-title bold">
                        {{item.korean_name}} 의원
                    </div>
                </div>
            </section>
            <section class="body-wrapper">
                <div class="m-pop-title left">
                    <span class="point">Q1</span>
                    <span class="question">{{item.korean_name}} 의원의 활동에 만족하시나요?</span>
                    
                </div>
                <div class="mt-8"></div>
                <div class="smile-container">
                  <div :class="`smile ${grade === option.value ? `active` : ''}`"
                        v-for="(option,index) in options" :key="option.value"
                  >
                      <label>
                          <input type="radio" :value="option.value" v-model="grade">
                          <img :src="option.image" :alt="option.label">
                      </label>
                      <div class="m-pop-title">
                          {{option.label}}
                      </div>
                  </div>
                </div>
                <div class="mt-8"></div>
                <div class="m-pop-title left">
                    <span class="point">Q2</span>
                    <span class="question">의원에 대한 의견을 남겨주세요.</span>
                </div>
                <div class="m-input-textarea type01 lightgrey">
                    <textarea maxlength="136" v-model="comment" placeholder="의원 평가를 입력해주세요" cols="30" rows="10"></textarea>
                </div>
            </section>
            <div class="mt-8"></div>

            </div>
            <div class="m-pop-title sticky">
                <button class="m-btn type02 width-100" @click="store">의원 평가 제출하기</button>
            </div>
        </template>
    </modal>
    
  </div>
</template>

<script>
import common from '../../utils/common.js'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    userId: {
        type: Number,
        default: 0,
    }
  },
  mixins: [common],
  computed: {
    district_id() {
        return this.$store.getters.getDistrict.id
    },
  },
  watch: {
    comment(newValue, oldValue) {
      if(newValue.length > 130) {
        alert('의견은 135자 이상 작성할 수 없습니다.')
        this.content = oldValue;
      }
    }
  },
  data() {
    return {
      grade: undefined,
      comment:undefined,

      review: undefined,
    }
  },
  methods: {
    async getReview() {
      if(this.userId !== 0) {
        const response = await this.$axios.get(`/api/reviews/${this.district_id}`)
        this.review = response.data[0]
        this.grade = response.data[0].grade,
        this.comment = response.data[0].comment
      }
    },
    closeEvaluteModal() {
      this.$emit('close')
    },
    async store() {
      if(this.userId !== 0) {
        this.update();
        return;
      }
      if (!this.grade) {
        alert('평가를 선택해주세요.')
        return;
      }
      if (!this.comment) {
        alert('의견을 입력해주세요.')
        return
      }
      if(this.comment.length < 10) {
        alert('의견은 10자 이상 작성해주세요.')
        return
      }
      try {
        const response = await this.$axios.post('/api/reviews', {
          district_id: this.district_id,
          // user_id: this.$auth.user.id,
          // user_name: this.$auth.user.name,
          comment: this.replaceContent(this.comment),
          grade: this.grade,
        })
        console.log(response.data)
        if(response.status === 200) {
            alert("성공적으로 처리되었습니다.");
            this.$emit('stored')
        }
      } catch (error) {
        if (error.response && error.response.data)
            this.errors = error.response.data.errors;
      }
    },
    async update() {
      try {
        const response = await this.$axios.post(`/api/reviews/update/${this.review.id}`, {
          ...this.review,
          comment: this.replaceContent(this.comment),
          grade: this.grade,
        })
        if(response.status === 200) {
            alert("성공적으로 처리되었습니다.");
            this.$emit('stored')
        }
      } catch (error) {
        if (error.response && error.response.data)
            this.errors = error.response.data.errors;
      }
    }
  },
  async mounted() {
    await this.getReview();
  }
}
</script>

<style scoped>
    .pop-container {
        overflow:scroll;
        height: 500px;
    }
    .pop-container::-webkit-scrollbar {
        display:none;
    }
    .head-wrapper {
        background: #f8f8f8;
    }
    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px 20px 0px;
    }
    .title-container .left {
        font-size:24px;
        font-weight: 500;
    }
    .evaluation-container {
        padding-top:10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        /* height:200px; */
    }
    .evaluation-container .average-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width:30%;
    }
    .average-container .average .average-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 147px;
        height: 35px;
        border-radius: 5px;
        font-size: 18px;
        background-color: #f0f0f0;
    }
    
    .average-container .average .smile {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .average-container .average .smile img {
        width:65px;
        height:65px;
    }
    .average-container .average .smile .smile-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:22px;
    }
    .evaluation-container .graph-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width:50%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .graph-container .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .graph-container .wrapper .barcontainer{
        background-color: #f5f5f5;
        position: relative;
        transform: translateY(-50%);
        top: 50%;
        width: 12px;
        height: 73px;
        border-radius: 5px;
        /* float: left; */
    }

    .wrapper .evaluate-magnitude {
        margin-bottom:30px;
        font-size: 15px;
    }

    .wrapper .smile {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: -30px;
    }

    .wrapper .smile img {
        width: 20px;
        height: 20px;
    }

    .bar{
        background-color: #d2d2d2;
        position: absolute;
        bottom: 0;
        width: 100%;
        border-radius: 5px;
        /* height: 80%; */
        box-sizing: border-box;
        animation: grow 1.5s ease-out forwards;
        transform-origin: bottom;
    }

    .wrapper:first-child .bar {
        background-color: red;
    }
    @keyframes grow{
        from{
            transform: scaleY(0);
        }
    }
    .img-container {
        width: 100%;
        height: 100%;
        padding-top:10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f8f8f8;
        
    }
    
    .img-container .crop-image {
        width: 100px;
        height: 100px;
        background-size: cover; 
        border-radius:5px;
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.25);
    }

    .smile-container {
        /* max-width: 400px; */
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
       
    }
    .smile-container .smile {
         opacity: 0.3;
    }
    .smile-container .smile.active {
        opacity: 1;
    }
    .smile img {
        width: 45px;
        height: 45px;
        
    }
    
    .m-pop-title.bold {
        font-weight: 700;
    }
    .m-pop-title.left {
        text-align: left;
    }
    .m-pop-title.left .question {
        font-size: 19px;
        font-weight: 400;
    }

    .m-input-textarea.type01 textarea {
        border: 1px solid #e5e5e5;
        background: #f8f8f8;
    }

    .m-pop-title.sticky {
        position: sticky;
        z-index: 1;
    }
</style>