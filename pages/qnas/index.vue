<template>
  <div class="area-my-boards">
      <!-- 헤더영역 -->
      <div class="m-header type02">
          <div class="wrap">
              <div class="left">
                  <button class="btn-util" @click="$router.back()">
                      <img src="/images/back.png" alt="" style="width:10px;">
                  </button>
              </div>

              <div class="center">
                  <h3 class="title">고객센터</h3>
              </div>

              <div class="right">
                <button class="btn-util" id="kakao" @click="share">
                      <img src="/images/qua_share.png" alt="" style="width:20px;">
                  </button>
              </div>
          </div>
      </div>

      <!-- 내용 영역 -->
      <div class="container">
          <!-- <div class="notice-container" v-if="mockNoticeItem.data"> -->
          <nuxt-link :to="`/notices/${noticeItems.data[0].id}`" class="notice-container" v-if="noticeItems.data.length > 0">
            <div class="left">
              <span class="point">공지</span> &nbsp;
              <!-- <span> {{ mockNoticeItem.data[0].title }}</span> -->
              <span> {{ noticeItems.data[0].title }}</span>
            </div>
            <div class="right">
              <img src="/images/arrowRight-gray.png" alt="">
            </div>
          </nuxt-link>

          <div class="mt-32"></div>
          <div class="wrap">
            <div class="title-container">
              <div class="left">
                <p style="font-size:26px" v-if="$auth.user">{{ $auth.user.name }}님,</p>
                <p style="font-size:20px; font-weight:300; color:rgba(110, 108, 108, 0.752)">
                  궁금한 점이 있으시다면
                  <br/>언제든지 문의주세요
                </p>
              </div>
              <div class="right">
                <nuxt-link to="/qnas/list" class="my-list">내 문의</nuxt-link>
              </div>
            </div>


            <div class="mt-32"></div>
            <div class="gray-container">
              <div>
                <p>자유마을 고객센터</p>
                <div v-if="$auth.user?.role === 6">
                  <div class="mt-8"></div>
                  <button type="button" class="m-btn type01" @click="activeStaff = true">임원진 검색하기</button>
                </div>
              </div>
              <div>
                <p style="font-size:26px;">1544-7166</p>
                <p style="font-weight:300; color:rgba(110, 108, 108, 0.752)">평일 09:00 ~ 18:00</p>
              </div>
            </div>

            <div class="mt-8"></div>
            <div class="img-button-container">
              <nuxt-link to="/qnas/create" class="border-rounded">
                <img src="/images/qna_post.png" alt="">
                <div class="mt-8"></div>
                <p style="font-size:20px;">온라인 문의</p>
                <p style="font-weight:300; color:rgba(110, 108, 108, 0.752)">1:1 문의하기</p>
              </nuxt-link>
              <a class="border-rounded" href="tel:1544-7166">
                  <img src="/images/qna_tell.png" alt="">
                  <div class="mt-8"></div>
                  <p style="font-size:20px;">고객센터</p>
                  <p style="font-weight:300; color:rgba(110, 108, 108, 0.752)">상담원 전화 상담</p>
              </a>
            </div>

            <div class="mt-32"></div>
            <p style="font-size:22px; padding-bottom:5px; border-bottom:1px solid black">자주 묻는 질문</p>
            <accordion>
              <accordion-item v-for="(item,index) in faqs">
                <template slot="accordion-trigger">
                  <div class="inner">
                    <div style="margin-right:10px;">
                      <span style="color:#0BAF00">Q</span>
                    </div>
                    <div>
                      <p>{{ item.title }}</p>
                    </div>
                  </div>

                </template>
                <template slot="accordion-content">
                  <div class="inner">
                    <div style="margin-right:10px;">
                      <span style="color:#0BAF00">A</span>
                    </div>
                    <div>
                      <p :id="`content_${index}`"></p>
                    </div>
                  </div>
                </template>
              </accordion-item>
            </accordion>
          </div>
      </div>
      <!-- 하단 네비게이션바 -->
      <navigation />
      <modal
            v-if="activeStaff"
            @cancel="activeStaff = false; staffInfo = undefined; staffNumber = undefined"
        >
            <template #inner>
                <div class="m-pop-title">
                    <p class="subtitle">입력하신 번호로 임원진인지 확인합니다.</p>
                    <span class="point">임원진 검색</span>
                </div>

                <div class="m-input-text type01">
                    <input type="text" placeholder="휴대폰 번호 11자리를 - 없이 입력" v-model="staffNumber"/>
                    <div class="mt-8"></div>
                    <span v-show="staffInfo">검색결과: {{ staffInfo }}</span>
                </div>
                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100" @click="staffCheck">검색하기</button>
            </template>
        </modal>
  </div>
</template>

<script>
import Post from "@/components/mypage/post";
import ScrollLoading from "../../components/scrollLoading";
import Navigation from "../../components/navigation";
import Qna from "../../components/qna";


import KakaoHelper from '../../utils/KakaoHelper';

import accordion from '@/components/accordion.vue';
import accordionItem from '@/components/accordionItem.vue'


export default {
  components: {Qna, Navigation, ScrollLoading, Post ,accordion, accordionItem},
  auth: false,
  data() {
      return {
          form: {
              page: 1,
              started_at: "",
              finished_at: "",
              orderBy: "created_at",
              district_id: this.$store.state.district ? this.$store.state.district.id : "",
          },

          mockNoticeItem: {
            data: [
              {title: '자유마을 서비스 점검 일정 안내드려요. (4월 27일 목요일 새벽 3시~4시)'}
            ]
          },

          noticeItems: {
              data: [],
              links: {

              }
          },
          // example data
          faqs: [
            {
              title:'우리동네가 자유마을 사이트에 없어요. ( __동이 없어요. 추가해주세요.)',
              content:'현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
            {
              title: '한참 전에 서명지를 냈는데 사 이트에는 반영되지 않았어요.',
              content: '현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
            {
              title: '홈페이지에 마을임원이 다른 사람/다른 번호가 올라가 있어요.',
              content: '현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
            {
              title:'우리동네가 자유마을 사이트에 없어요. ( __동이 없어요. 추가해주세요.)',
              content:'현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
            {
              title: '한참 전에 서명지를 냈는데 사 이트에는 반영되지 않았어요.',
              content: '현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
            {
              title: '홈페이지에 마을임원이 다른 사람/다른 번호가 올라가 있어요.',
              content: '현재 자유마을은 2022년 12월 기준 으로 행정복지센터가 있는 읍면동만 반영이 된 상태입니다. 읍면동 추가 건은 논의 중에 있어서 추후에 확정되면 공지드리겠습니다. 감사합니다.'
            },
          ],
          activeStaff: false,
          staffNumber: undefined,
          staffInfo: undefined,
      }
  },
  methods: {
    async staffCheck() {
        this.staffInfo = undefined;
          if(!this.staffNumber || this.staffNumber.length !== 11) {
              alert('휴대폰 번호를 정확히 입력해주세요.');
              return;
          }
          try {
              const { data } = await this.$axios.get(`/api/staff-check?phone=${this.staffNumber}`);
              
              if(data.position) {
                  this.staffInfo = `${data.district.state} ${data.district.city} ${data.district.district} ${data.group} ${data.position} ${data.name}`;
              } else {
                  alert(`${data}`);
              }
          } catch (error) {
              alert(error.response.data.message);
          }
          
      },
      getNoticeItems(){
          this.form.page = 1;

          this.$axios.get("/api/notices", {
              params: this.form
          }).then(response => {
              this.noticeItems = response.data;
          });
      },
      getFaqs() {
        this.$axios.get("/api/manager_qnas").then((response) => {
          this.faqs = response.data.data;
          this.faqs.forEach((faq, index) => {
            const content = this.handleContent(faq.content);
            document.getElementById(`content_${index}`).innerHTML = content;
          });
        });
      },
      handleContent(content) {
        //개행문자 <br> 태그로 변환
        return content.replace(/(?:\r\n|\r|\n)/g, '<br />');
      },


      share() {
        let kakaoHelper = new KakaoHelper(Kakao);

        const item = {
          title: '자유마을 고객센터'
        }

        kakaoHelper.shareQna(item);
      }
  },

  async mounted() {
      this.staffInfo = undefined;
      this.getNoticeItems();
      this.getFaqs();
  },
}
</script>

<style scoped>
  .notice-container {
    background-color: rgb(255, 239, 239);
    padding: 15px;

    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  .notice-container .right img {
    width: 10px;
    height: 20px;
  }
  .notice-container .point {
    color: red;
  }
  .title-container {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-container .my-list {
    background-color: #0BAF00;
    color: white;
    border-radius: 5px;
    font-size: 22px;
    padding: 10px 20px;
  }
  .gray-container {
    border-radius: 5px;
    background-color: #F5F5F5;
    padding: 20px;
    display:flex;
    justify-content: space-between;
    align-items: center;

  }

  .img-button-container {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  .border-rounded {
    border-radius: 5px;
    border: 1px solid rgba(212, 207, 207, 0.985);
    width: 49%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .inner {
    display: flex;
    justify-content: space-between;
  }
</style>
