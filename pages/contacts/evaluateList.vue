<template>
  <div class="area-news">
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util">
            <img src="/images/back.png" alt="" style="width:10px;" @click="$router.back()">
          </button>
        </div>

        <div class="center">
          <h3 class="title">의원펑가 의견</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
          <img src="/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- <div class="mt-40"></div> -->
    <div class="mt-40 container">
      <div class="section section-ranking">
        <div class="wrap">
          <!-- <button type='button' class="m-btn type02 width-100" @click="toggle()">다른 의견 보기</button> -->
          <div class="m-input-checkboxes type01">
              <div class="m-input-checkbox">
                  <input type="radio" id="1" value="good" v-model="toggleList">
                  <label for="1">긍정적 의견 {{positiveList.meta.total}}</label>
              </div>
              <div class="m-input-checkbox">
                  <input type="radio" id="2" value="bad" v-model="toggleList">
                  <label for="2">부정적 의견 {{negativeList.meta.total}}</label>
              </div>
          </div>
          <div class="mt-40"></div>
          <div class="m-boards type01" >
            <div class="m-loading type02" v-show="!hasLoaded">
                <div class="m-loading-inner"></div>
            </div>
            <div v-show="toggleList == 'good'">
              <div class="m-board gray" v-for="item in positiveList.data" :key="item.id">
                  <div class="m-board-top">
                      <div class="left">
                        <p class="writer">{{ replaceWriter(item.user.nickname, 2, '**') }}님의 의견</p>
                      </div>
                      <div class="right">
                        <p class="date">{{ item.created_at }}</p>
                      </div>
                  </div>

                  <div class="m-board-content">
                      <div class="evaluate-container">
                          <span>의원활동 만족도</span> <img :src="getSmile(item.grade)" alt=""> <span :style="`color:${getColor(item.grade)}`">{{getLabel(item.grade)}}</span>
                      </div>
                      <div class="mt-12"></div>
                      <p class="content-body" v-if="item.comment">{{replaceContent(item.comment)}}</p>

                  </div>
              </div>
              <scroll-loading @load="positiveLoadMore" v-if="positiveList.links.next" />
            </div>
            <div v-show="toggleList == 'bad'">
              <div class="m-board gray" v-for="item in negativeList.data" :key="item.id">
                <div class="m-board-top">
                    <div class="left">
                      <p class="writer">{{ replaceWriter(item.user.nickname, 2, '**') }}님의 의견</p>
                    </div>
                    <div class="right">
                      <p class="date">{{ item.created_at }}</p>
                    </div>
                </div>

                <div class="m-board-content">
                    <div class="evaluate-container">
                        <span>의원활동 만족도</span> <img :src="getSmile(item.grade)" alt=""> <span :style="`color:${getColor(item.grade)}`">{{getLabel(item.grade)}}</span>
                    </div>
                    <div class="mt-12"></div>
                    <p class="content-body" v-if="item.comment">{{replaceContent(item.comment)}}</p>

                </div>
              </div>
              <scroll-loading @load="negativeLoadMore" v-if="negativeList.links.next" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 의원평가하기 버튼 -->
    <button v-if="!review_check" class="m-btn type02 bg-revert-primary width-80 sticky" @click="openEvaluateModal">의원 평가하기</button>
    <!-- <button v-else="contactItem.review_check" class="m-btn type02 bg-grey width-100" >평가 완료</button> -->

    <!-- 평가 모달 -->
    <evaluate-modal
        v-if="evaluatePop"
        @close="closeEvaluteModal"
        @stored="handleStored"
        :item="item"
        :options="options"
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import EvaluateModal from '~/components/contacts/EvaluateModal.vue'
import common from '../../utils/common'
export default {
  components: {
    EvaluateModal
  },
  computed: {
    district_id() {
        return this.$store.getters.getDistrict.id
    },
    contactItem: {
        get() {
            return this.$store.getters.getContactItem
        },
        set(value) {
            this.$store.dispatch('FETCH_CONTACT_ITEM', value)
        }
    },
    goodList() {
      if(!this.contactReviews) return [];
      let goodList = this.contactReviews.data.filter(item => item.grade > 2);
      return goodList;
    },
    badList() {
      if(!this.contactReviews) return [];
      let badList = this.contactReviews.data.filter(item => item.grade < 3);
      return badList;
    },
    item() {
      return this.$store.getters.getContactItem;
    },
    options() {
      return this.$store.getters.getOptions
    }
  },
  mixins: [common],
  data() {
    return {
      evaluatePop: false,
      toggleList: 'good',
      temp:null,
      contactReviews:null,
      positiveList: {},
      negativeList: {},
      review_check:false,
      hasLoaded: false,
    }
  },
  methods: {
      toggle() {
        this.toggleList ? this.toggleList = false : this.toggleList = true;
      },
      getSmile(evaluate) {
        return this.options.find(item => item.value === evaluate).image;
      },
      getLabel(evaluate) {
        return this.options.find(item => item.value === evaluate).label;
      },
      getColor(evaluate) {
        return this.options.find(item => item.value === evaluate).color;
      },



      openEvaluateModal() {
          if(!this.$auth.user) {
            this.$router.push('/auth/login');
            return;
          }
          this.evaluatePop = true;
      },
      async handleStored() {
        this.closeEvaluteModal();
        this.review_check = true;
        await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district_id);
        this.contactReviews = {...this.$store.state.contactReviews}; 
      },
      closeEvaluteModal() {
          this.evaluatePop = false;
      },

      async init(){
          try {
              const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/contacts`)
              if(response) {
                  this.temp = response.data.data;
                  await this.nprlapfmaufmqytet(response.data.data.korean_name); //의원 약력 등 정보
              }
                  
          } catch (error) {
              console.error(error);
          }
      },
      /**
       * 의원 약력 등 추가 정보
       */
      async nprlapfmaufmqytet(name) {
          try {
              const {data} = await this.$axios.get(`/portal/openapi/nprlapfmaufmqytet`, {
                  params: {
                      DAESU: '21',
                      NAME: name,
                      type: 'json',
                      key: 'e2e2ddc84af3448a85e4205a03b1bf3a'
                  }
              })

              if(data) {
                  this.contactItem = {
                      ...this.temp,
                      ...data.nprlapfmaufmqytet[1].row[0],
                  }
              }
          } catch (error) {
              console.error(error);
          }
      },

      positiveLoadMore(state) {
        console.log({state},32323)
        if(this.positiveList.meta.current_page <= this.positiveList.meta.last_page){
          // this.form.page = this.meta.current_page + 1;

          this.$axios.get("/api/reviews/", {
            params: {
              district_id: this.district_id,
              category: 'positive',
              page: this.positiveList.meta.current_page + 1
            }
          }).then(response => {
              const data = response.data;
              this.positiveList.data = [...this.positiveList.data, ...data.data];
              this.positiveList.links = {...data.links};
              this.positiveList.meta = {...data.meta};
              state.loaded();
          });
        }
      },
      negativeLoadMore(state) {
        if(this.negativeList.meta.current_page <= this.negativeList.meta.last_page){
          // this.form.page = this.meta.current_page + 1;

          this.$axios.get("/api/reviews/", {
            params: {
              district_id: this.district_id,
              category: 'negative',
              page: this.negativeList.meta.current_page + 1
            }
          }).then(response => {
              const data = response.data;
              this.negativeList.data = [...this.negativeList.data, ...data.data];
              this.negativeList.links = {...data.links};
              this.negativeList.meta = {...data.meta};
              state.loaded();
          });
        }
      }
  },
  async mounted() {
    if(isEmpty(this.contactItem)) {
        await this.init();
    }
    await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district_id);
    this.contactReviews = this.$store.state.contactReviews;

  },
  async asyncData({ store, $axios }) {
    const resPositive = await $axios.get(`/api/reviews/`,{
      params: {
        district_id: store.getters.getDistrict.id,
        category: 'positive',
        page:1
      }
    })
    const resNegative = await $axios.get(`/api/reviews/`,{
      params: {
        district_id: store.getters.getDistrict.id,
        category: 'negative',
        page:1
      }
    })
    return {
      positiveList : resPositive.data,
      negativeList : resNegative.data,
      hasLoaded: true,
    }
  },
}
</script>

<style scoped>
  .evaluate-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 55px;
    border-radius: 5px;
    font-size: 18px;
    background-color: #f0f0f0;


  }
  .evaluate-container img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  .evaluate-container span {
    margin-right: 10px;
    font-size: 20px;
  }

  .m-board.gray {
    border: 1px solid #e7e7e7;
  }

  .m-board .conent-body {
    font-size:18px; line-height:26px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .width-80 {
    width: 80%;
  }
  .sticky {
    position:fixed;
    bottom:30px;
    right:10%;
    left: 10%;
    z-index:10;
  }
</style>