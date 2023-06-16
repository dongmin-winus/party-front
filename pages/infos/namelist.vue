<template>
  <div class="area-my-boards">
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
              <img src="/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">{{$store.state.district.city}} {{$store.state.district.district }} 마을 명단</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- content container -->
    <div class="container">
      <div class="utils">
        <button class="btn-util" style="width:100%">
          <div class="m-input-text-wrap">
            <div class="m-input-text type01">
              <input type="text" placeholder="검색어를 입력해주세요." v-model="word" @keyup.enter="search">

              <i class="xi-search m-input-text-deco" @click="search"></i>
            </div>
          </div>
        </button>
      </div>
      <div class="mt-24"></div>
      <div style="text-align:center">
        <h3>주민 전화 확인 현황 </h3>
      </div>
      <div class="mt-12"></div>
      <div class="m-input-checkboxes type04">
        <div class="m-input-checkbox">
          <input type="radio" id="waiting" value="waiting" v-model="toggleList">
          <label for="waiting">
            <p style="color:red">{{ total - items.meta.total_call_count }}</p>
            <p style="color:red">미확인</p>
          </label>
        </div>
        <div class="m-input-checkbox">
          <input type="radio" id="confirmed" value="confirmed" v-model="toggleList">
          <label for="confirmed">
            <p>{{ items.meta.total_call_count }}</p>
            <p>확인</p>
          </label>
        </div>
        <div class="m-input-checkbox" style="background-color:#E7F7E5">
          <input type="radio" id="total" value="total" v-model="toggleList">
          <label for="total">
            <p>{{ total }}</p>
            <p>총 인원</p>
          </label>
        </div>  
      </div>  
      <div class="mt-8" style="margin-left:1rem">
        <h5>전체 {{total}}명</h5>
      </div>
      <div class="mt-12"></div>
      <div class="wrap">
        <div class="m-boards type02">
            <name v-for="item in items.data" :key="item.id" :item="item" @click="openInfoModal(item)" @makeProxyPhoneCall="getProxyPhoneCall(item)"/>
        </div>
      </div>
      <scroll-loading @load="loadMore" v-if="items.links.next" />
    </div>

    <modal
      v-if="activeInfoModal"
      :noPaddingModal="true"
      :paddingModal="false"
      :cancelBtn="false"
      @cancel="activeInfoModal = false"
    >
      <template #outter>
          <div class="deca">
            <div class="m-pop-title" style="padding-top:40px;">
              회원 정보
            </div>
            <div class="inner-form">
              <div class="title">
                <span class="main">{{ selectedItem.name }}</span>
                <span class="sub-point">자유마을 회원</span>
              </div>
              <div class="mt-8"></div>
              <div class="date">
                <p>자유마을 가입일</p>
                <div class="mt-8"></div>

                <div class="m-input-dates type01">
                    <div class="m-input-text type01">
                        <input type="text" v-model="computeDate" >
                    </div>
                </div>
              </div>
              <div class="mt-8"></div>
              <div class="info">
                <p>정보 관리</p>
                <div class="mt-8"></div>
                <div class="m-input-checkboxes type01">
                  <div class="m-input-checkbox">
                      <input type="radio" id="12" value="delete" v-model="selectedItem.status">
                      <label for="12">삭제</label>
                  </div>
                  <div class="m-input-checkbox">
                      <input type="radio" id="13" value="store" v-model="selectedItem.status">
                      <label for="13">보관</label>
                  </div>
                </div>
              </div>
              <div class="mt-8"></div>
              <div class="reason" v-if="selectedItem.status == 'delete'">
                <p>삭제의견</p>
                <div class="mt-8"></div>
                <Dropdown
                  :menuTitle="'삭제의견'"
                  :activate="activeDropdown"
                  :items="reasons"
                  :selected="reasonSelected"
                  @toggle="toggleReason"
                  @change="changeReason"
                />
              </div>
              <div class="mt-8"></div>
              <div class="comment">
                <p>의견 메모</p>
                <div class="m-input-textarea type01 lightgrey">
                  <textarea placeholder="기타 의견을 입력해주세요" v-model="selectedItem.memo"></textarea>
                </div>
              </div>
            </div>

            <div class="buttons">
              <div class="m-btns type01">
                <div class="m-btn-wrap" >
                  <button class="m-btn type01 bg-revert-grey  width-100" @click="activeInfoModal = false">취소</button>
                </div>
                <div class="m-btn-wrap">
                  <button class="m-btn type01 bg-primary width-100" @click="confirm">완료</button>
                </div>
              </div>
            </div>
          </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Name from "@/components/mypage/name";
import Dropdown from "@/components/dropdown";
import common from "@/utils/common.js";
export default {
  components: {
    Name, Dropdown
  },
  mixins: [common],
  middleware({store, redirect}) {
      if(!store.$auth.hasScope('manager')) {
        redirect('/')
      }
  },
  data() {
    return {
      form: {
          page: 1,
      },
      items: {
          data: [],
          meta: {
              totalCommentCount: 0,
              totalLikeCount: 0,
              totalPostCount: 0,
          },
          links: { 

          }
      },
      selectedItem: {},
      toggleList: '',
      formerVn: null,
      word:"",
      activeInfoModal: false,
      activeDropdown: false,
      reasonSelected: false,
      reasons: [
        '번호와 정보가 다름',
        '다른 지역 회원',
        '명단 삭제 요청',
        '회원 신청 이력 없음'
      ]
    }
  },
  computed: {
    total() {
      return this.items.meta.total 
    },
    computedWaiting() {
      return this.items.data.filter(item => item.call_count == null).length;
    },
    computedConfirmed() {
      return this.items.data.filter(item => item.call_count >= 1).length;
    },
    computeDate() {
      return this.formatDate(this.selectedItem?.created_at, '/')
    },
  },
  watch: {
    'selectedItem.status': function(val) {
      this.reasonSelected = false;
      this.selectedItem.reason = undefined;
    }
  },
  methods: {
    loadMore(state) {
        if(this.items.meta.current_page <= this.items.meta.last_page){
            this.form.page += 1;

            this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`, {
                params: this.form
            }).then(response => {
                this.items = {
                    ...response.data,
                    data: [...this.items.data, ...response.data.data]
                };

                state.loaded();
            });
        }
    },
    search() {
      this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`, {
        params: {
          search: {
            keyword: this.word
          }
          
        }
      }).then(response => {
        this.items = response.data;
      })
    },
    getItems(){
        this.form.page = 1;

        this.$axios.get(`/api/districts/${this.$auth.user.district.id}/members`)
            .then(response => {
                this.items = response.data;
            });
    },
    async getProxyPhoneCall(item) {
      const { data } = await this.$axios.post(`/api/districts/${this.$auth.user.district.id}/members/proxy-number`, 
        {
          id: item.id,
          pvn: this.formerVn,
        }
      )
      if(data.rs == 'SUCCESS') {
        window.location.href = `tel:${data.vn}`
        this.formerVn = data.vn;
      }
    },

    openInfoModal(item) {
      this.selectedItem = item;
      this.activeInfoModal = true;
    },
    getStateClass(state) {
      return {
        'bg-revert-primary': state == 'store',
        'bg-revert-red': state == 'delete',
      }
    },
    toggleReason() {
      this.activeDropdown = !this.activeDropdown;
    },
    changeReason(reason) {
      this.selectedItem.reason = reason;
      this.reasonSelected = true;
    },

    async confirm() {
      const response = await this.$axios.post(`/api/districts/${this.selectedItem.district_id}/members`, {
        district_id: this.selectedItem.district_id,
        id: this.selectedItem.id,
        name: this.selectedItem.name,
        status: this.selectedItem.status,
        reason: this.selectedItem.reason,
        memo: this.selectedItem.memo,
      })
      if(response.status == 200 ) {
        this.activeInfoModal = false;
        this.getItems();
      }
    }
  },
  mounted () {
    this.getItems();
  },
}
</script>

<style>
  .deca {
    width:100%;
    height:600px;
    border-radius: 5px;
    background-color: #eee;

    position: relative;
  }
  .deca .inner-form {
    width: 90%;
    height: 70%;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #BDC3C7;

    position: absolute;
    top: 15%;
    left: 5%;
  }
  .deca .buttons {
    position:absolute;
    width: 95%;
    bottom: 5%;
    margin: 0 10px;
  }
  .deca .inner-form {
    padding: 20px;
  }
  .inner-form .title {
    height: fit-content;
  }
  .inner-form .title .main {
    font-size: 20px;
    font-weight: 400;
    color:black;
  }
  .inner-form .title .sub-point {
    width: fit-content;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #0BAF00;
    color: #fff;
  }
  .info-radio {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info-radio .m-input-radio label {
   
    width: 200px;
    height: 40px;
    padding-top: 8px;
    margin: 0 5px;
    border: 1px solid #BDC3C7;
    border-radius: 5px;
    color: black;
    text-align:center;
    
  }
</style>  