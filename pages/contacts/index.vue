<template>
    <div class="area-region-activity ">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 국회의원</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab">
                        <span class="text">임원진</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab active">
                        <span class="text">내마을 국회의원</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="section-content">
                <div class="wrap">
                    <div class="m-empty type01" v-if="!item">준비중입니다.</div>

                    <section class="section-content" v-if="item">
                        <div class="wrap">
                            <div class="img-wrap">
                                <img :src="item.img.url" alt="">
                            </div>
                            <button class="m-btn type02 width-100" @click="openEvaluateModal">의원 평가하기</button>
                            <div class="mt-12"></div>
                            <div class="box-name">
                                <p class="name">{{ item.korean_name }} ({{item.NAME_HAN}}) </p>
                               <!-- <p class="info-body"><span style="color: red">국회의원의 추가정보 업데이트 될 예정입니다.</span></p> -->
                            </div>

                            <div class="fragment">
                                <h3 class="title">국회의원 소개</h3>

                                <div class="infos">
                                    <div class="info">
                                        <h3 class="info-title">· 정당</h3>
                                        <!-- <p class="info-body">업데이트될 예정</p> -->
                                       <p class="info-body">{{computeDae}}</p>
                                    </div>
                                    <div class="info">
                                        <h3 class="info-title">· 홈페이지</h3>
                                        <p class="info-body">
                                            <a :href="homepage" target="_blank">{{item.congress_homepage}}</a>
                                        </p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 사무실 주소</h3>
                                        <p class="info-body">{{item.congress_office}}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 이메일</h3>
                                        <p class="info-body">{{ item.congress_email }}</p>
                                    </div>

                                    <div class="info">
                                        <h3 class="info-title">· 연락처</h3>
                                        <!-- <p class="info-body">{{ item.congress_phone }}</p> -->
                                        <a :href="`tel:${item.congress_phone}`" class="info-body">☎ {{ item.congress_phone }}</a>
                                    </div>
                                </div>
                            </div>

                            <div class="fragment" v-if="item.HAK">
                                <h3 class="title">주요 약력</h3>

                                <div class="histories" v-text="item.HAK"></div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">대표발의 의안</h3>

                                <div class="boards" v-if="proposals.length > 0">
                                    <template v-for="item in proposals">
                                        <a :href="item.DETAIL_LINK" target="blank"  :key="item.BILL_ID" class="board" >
                                            <h3 class="title">{{item.BILL_NAME}}</h3>
                                            <p class="sub">{{item.PROPOSE_DT}}</p>
                                        </a>
                                    </template>
                                </div>
                                <div class="boards" v-if="proposals.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            </div>

                            <div class="fragment fragment-board">
                                <h3 class="title">발언 영상</h3>

                                <div class="boards" v-if="speeches.length > 0">
                                    <template v-for="(item,index) in speeches">
                                        <a :href="item.LINK_URL" target="blank" :key="index" class="board">
                                            <h3 class="title">{{item.TITLE}}</h3>
                                            <p class="sub">{{item.TAKING_DATE}}</p>
                                        </a>
                                    </template>    
                                </div>
                                <div class="boards" v-if="speeches.length == 0">
                                    <div class="m-empty type01">
                                        데이터가 없습니다.
                                    </div>
                                </div>
                            </div>
                            <div class="fragment fragment-board" v-if="contactReviews">
                                <div class="title-container">
                                    <div class="left">의원 평가</div>
                                    <div class="right">
                                        <img src="/images/arrowRight-gray.png" alt="" style="width:14px;" @click="$router.push('/contacts/evaluateList')">
                                    </div>
                                </div>
                                <!-- <div class="title-contaiiner">
                                    <span class="title">의원 평가</span>
                                    <div class="evaluate-count">총 {{evaluateCount}}개의 평가</div>
                                </div> -->

                                <div class="evaluation-container">
                                    <div class="average-container">
                                        <div class="average">
                                            <div class="average-title">평균 만족도</div>
                                        </div>
                                        <div class="mt-12"></div>
                                        <div class="average">
                                            <!-- smile & evaluate percentage -->
                                            <div class="smile">
                                                <img :src="makeAvgImg" >
                                                <div class="smile-label">{{evaluateAvg}}% ({{totalCount}}명)</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="graph-container">
                                        <!-- one-to-five histogram & smiles here -->
                                        <div class="wrapper"
                                            v-for="(option,index) in options" :key="item.value"
                                        >
                                            <div class="evaluate-magnitude">{{aggregateReviews[index].value}}</div>
                                            <div class="mt-12"></div>
                                            <div class="barcontainer">
                                                <div class="bar" :style="`height:${barProgress(index)}%`"></div>
                                                
                                            </div>
                                            <div class="smile">
                                                <img :src="option.image" :alt="option.label">
                                                <div class="smile-label"><span :style="`color:${option.color}`">{{option.label}}</span></div>
                                            </div>
                                        </div>
         
                                    </div>

                                </div>
                            </div>
                            <div class="mt-40"></div>
                        </div>
                    </section>

                </div>
            </section>

            <section class="section-evaluation" v-if="contactReviews">
              <div class="wrap">
                <div class="m-input-checkboxes type01">
                    <div class="m-input-checkbox">
                        <input type="radio" id="1" value="good" v-model="toggleList">
                        <label for="1">긍정적 의견</label>
                    </div>
                    <div class="m-input-checkbox">
                        <input type="radio" id="2" value="bad" v-model="toggleList">
                        <label for="2">부정적 의견</label>
                    </div>
                </div>
              </div>
              <div class="mt-20"></div>
              <swiper v-show="toggleList == 'good'" :options="swiperOptions">
                <swiper-slide v-for="(slide,index) in goodList" :key="slide.id">
                  <div class="content">
                    <div><img src="/images/double-quote.png" style="width:27px; height:24px;" alt=""></div>
                    <div class="mt-8"></div>
                    <p>{{slide.comment}}</p>
                    <div class="mt-8"></div>
                    <div class="writer">
                      {{replaceWriter(slide.user.nickname,2,"**")}}님의 의견
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <swiper v-show="toggleList == 'bad'" :options="swiperOptions">
                <swiper-slide v-for="(slide,index) in badList" :key="slide.id">
                  <div class="content">
                    <div><img src="/images/double-quote.png" style="width:27px; height:24px;" alt=""></div>
                    <div class="mt-8"></div>
                    <p>{{slide.comment}}</p>
                    <div class="mt-8"></div>
                    <div class="writer">
                      {{replaceWriter(slide.user.nickname,2,"**")}}님의 의견
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="mt-20">
                <!-- 의원평가하기 버튼 -->
                <button class="m-btn type02 bg-revert-primary width-100 " @click="openEvaluateModal">의원 평가하기</button>
              </div>
            </section>
            <img src="/images/about-bg.png" alt="" class="deco-about">
            <!-- <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            /> -->
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
        <!-- 평가 모달 -->
        <evaluate-modal
            v-if="evaluatePop"
            @close="closeEvaluteModal"
            :item="item"
            :options="options"
        />
    </div>

</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import EvaluateModal from "../../components/contacts/EvaluateModal.vue"
import common from "../../utils/common";
export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera, EvaluateModal},
    auth: false,
    mixins: [common],
    data() {
      return {
        item: null,
        temp: null,
        proposals:[],
        speeches:[],
        errors: {},
        evaluatePop: false,
        selectedOption: undefined,
        toggleList: 'good',
        swiperOptions: {
          slidesPerView: 'auto',
          centeredSlides: false,
          spaceBetween: 20,
        },
        contactReviews: null,
      }
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
        aggregateReviews() {
            let reviews = this.contactReviews.data;
            const countBy = this.countBy(reviews, 'grade', [1,2,3,4,5]);
            const result = this.convertObjByKeyDesc(countBy);
            return result;
        },
        options() {
            return this.$store.getters.getOptions
        },
        totalCount() {
            return this.aggregateReviews.reduce((acc, cur) => {
                return acc + cur.value;
            }, 0);
        },
        evaluateAvg() {
            const totalCount = this.totalCount;
            const sum = this.options.reduce((acc, cur, index) => {
                return acc + cur.value * this.aggregateReviews[index].value;
            }, 0);
            return Math.floor((sum / (totalCount * 5)) * 100);
        },
        makeAvgImg(){
            let img = '/images/contacts/f_1.png';
            if(this.evaluateAvg >= 80) {
                img = '/images/contacts/f_5.png';
            }else if(this.evaluateAvg >= 60) {
                img = '/images/contacts/f_4.png';
            }else if(this.evaluateAvg >= 40) {
                img = '/images/contacts/f_3.png';
            }else if(this.evaluateAvg >= 20) {
                img = '/images/contacts/f_2.png';
            }
            return img;
        },
        computeDae() {
            let str = ['데이터가 없습니다'];
            if(this.item.DAE) {
                str = this.item.DAE.split(" ");
                let partyName = str[str.length-1].trim();
                if(partyName === '미래통합당') {
                    partyName = '국민의힘';
                }
                return partyName;
            }else {
                return str[0];
            }
            
        },

        goodList() {
          if(!this.contactReviews) return [];
          let goodList = this.contactReviews.data.filter(item => item.grade > 2);
          goodList.push({
            id: this.maxVal(this.contactReviews.data, 'id') + 1,
            created_at: '',
            user: {
                nickname: ''
            },
            grade:5,
            content: ''
          });
          return goodList;
        },
        badList() {
          if(!this.contactReviews.data) return [];
          let badList = this.contactReviews.data.filter(item => item.grade < 3);
          badList.push({
            id: this.maxVal(this.contactReviews.data, 'id') + 2,
            created_at: '',
            user: {
                nickname: ''
            },
            grade:1,
            content: ''
          });
          return badList;
        },

        district(){
            return this.$store.state.district;
        },

        homepage(){
            if(this.item && this.item.congress_homepage)
                return this.item.congress_homepage.includes("http") ? this.item.congress_homepage : "http://" + this.item.congress_homepage;
        }
        
    },
    methods: {
        async init(){
            try {
                const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/contacts`)
                if(response) {
                    this.temp = response.data.data;
                    await this.nprlapfmaufmqytet(this.temp.korean_name); //의원 약력 등 정보
                    await this.nzmimeepazxkubdpn(this.temp.korean_name); //의원 대표발의 법안
                    await this.npeslxqbanwkimebr(this.temp.korean_name); //의원 발언 영상
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
                    // console.log(data.nprlapfmaufmqytet[1].row[0])
                    this.item = {
                        ...this.temp,
                        ...data.nprlapfmaufmqytet[1].row[0],
                    },
                    this.contactItem = this.item;
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 대표발의 법안
         */
        async nzmimeepazxkubdpn(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/nzmimeepazxkubdpn`, {
                    params: {
                        age: '21',
                        proposer: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    // console.log(data.nzmimeepazxkubdpn[1].row)
                    this.proposals = data.nzmimeepazxkubdpn[1].row;
                }
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 발언 영상
         */
        async npeslxqbanwkimebr(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/npeslxqbanwkimebr`, {
                    params: {
                        CT1: '21',
                        ESSENTIAL_PERSON: name,
                        TAKING_DATE: '2023',
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a',
                        pSize: 3,
                    }
                })
                if(data) {
                    this.speeches =  data.npeslxqbanwkimebr[1].row;

                }
            } catch (error) {
                console.error(error);
            }
        },


        getColor(evaluate) {
            console.log(evaluate, this.options)
            return this.options.find(item => item.value === evaluate).color;
        },
        barProgress(index) {
            const totalCount = this.totalCount;
            let value = this.aggregateReviews[index].value;
            return Math.floor((value / totalCount) * 100);
        },

        openEvaluateModal() {
          if(!this.$auth.user) {
            this.$router.push('/auth/login');
            return;
          }
            this.evaluatePop = true;
        },
        async closeEvaluteModal() {
            this.evaluatePop = false;
            await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district_id);
            this.contactReviews = {...this.$store.state.contactReviews}; 
        },
    },
    /*watch: {
        district (newData, oldData) {
            location.reload();
        }
    },*/

    async mounted() {
        await this.init();
        await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district_id);
        this.contactReviews = this.$store.state.contactReviews;
    },
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
        font-size:18px;
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

    .section-evaluation {
        padding: 20px;
        background-color:#F7F7F7;
    }
    
    .swiper-container {
        width: 100%;
        /* padding-left: 50px; */
    }

    .swiper-slide {
      width: 70%;
      opacity: 0.4;
      transition: opacity 0.3s;
    }

    .swiper-slide-active {
        opacity: 1;
    }

    .swiper-slide .content {
      background-color: white;
      border-radius: 10px;
      border: 1px solid #eeeeee;
      padding: 10px;
      height: 270px;
      overflow:hidden;

    }
    .swiper-slide .content .writer {
        position: absolute;
        right:0;
        bottom: 0;
        margin-bottom: 15px;
        margin-right: 15px;
        color:#bdbdbd;
    }
</style>
