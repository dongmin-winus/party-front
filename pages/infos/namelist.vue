<template>
  <div class="area-my-boards">
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
              <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">마을 명단</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
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
      <section class="section-promotion">
        <div class="wrap">
          <div class="m-title type01">
            <p class="sub" style="text-align: center; font-size: 17px; color: #9b9999;">서명 명단</p>
              <p class="point" style="text-align: center;"> {{countyInfo.district }} 마을</p>
            <p class="sub" style="text-align: center; color: #626262; font-size: 19px; padding-bottom: 10px;">{{countyInfo.state }} {{countyInfo.city }}</p>
          </div>
        </div>
      </section>
      <div class="mt-12"></div>
      <div class="m-input-checkboxes type04">
        <div class="m-input-checkbox" :class="toggleList == 'waiting' ? 'activated' : ''">
          <input type="radio" id="waiting" value="waiting" v-model="toggleList">
          <label for="waiting" style="height:100%;">
            <p style="color:red">{{ totalCount - items.meta.total_call_count }}</p>
            <p style="color:red">대기중</p>
          </label>
        </div>
        <div class="m-input-checkbox" :class="toggleList == 'confirmed' ? 'activated' : ''">
          <input type="radio" id="confirmed" value="confirmed" v-model="toggleList">
          <label for="confirmed">
            <p>{{ items.meta.total_call_count }}</p>
            <p>확인완료</p>
          </label>
        </div>
        <!-- <div class="m-input-checkbox" :class="toggleList == 'total' ? 'activated' : ''" style="background-color:#E7F7E5">
          <input type="radio" id="total" value="total" v-model="toggleList">
          <label for="total">
            <p>{{ total }}</p>
            <p>총 인원</p>
          </label>
        </div>   -->
      </div>  

      <div class="mt-12"></div>
      <div class="flex-w-full bg-lightGray">
        <div class="col-name">서명일</div> 
        <div class="col-name">회원정보</div>
        <div class="col-name" v-if="toggleList == 'confirmed'">발신인원</div>
        <div class="col-name" v-else-if="toggleList"></div>
        <div class="col-name" ></div>
      </div>
      <div class="wrap">
        <div class="m-boards type02">
            <name v-for="(item,index) in items.data" :key="index" :item="item" 
              @clickName="openInfoModal(item)"
              @clickNumber="openDispatchList(item)"
              @makeProxyPhoneCall="getProxyPhoneCall(item)"
            />
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
            <!-- <div class="m-pop-title" style="padding-top:40px;">
              회원 정보
            </div> -->
            <div class="inner-form">
              <div class="m-input-checkboxes type01">
                <div class="m-input-checkbox">
                    <input type="radio" id="info" value="info" v-model="modalTitle">
                    <label for="info">회원 정보</label>
                </div>
                <div class="m-input-checkbox">
                    <input type="radio" id="dispatchList" value="dispatchList" v-model="modalTitle">
                    <label for="dispatchList" 
                    >발신 목록</label>
                </div>
              </div>
              <template v-if="modalTitle == 'info'">
                <div class="mt-8"></div>
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
                          <input type="text" v-model="computeDate" readonly>
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
                        <label for="12">강성</label>
                    </div>
                    <div class="m-input-checkbox">
                        <input type="radio" id="13" value="store" v-model="selectedItem.status">
                        <label for="13" 
                        :style="selectedItem.status ? '' : 'background-color: #0BAF00; color: #fff'"
                      >활동</label>
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
              </template>
              <template v-else-if="modalTitle == 'dispatchList'">
                <div v-for="name in selectedItem.manager_name?.split(',')">
                  <span class="dispatch-name">{{ name }}</span>
                </div>
              </template>
            </div>

            <div class="buttons">
              <div class="m-btns type01">
                <div class="m-btn-wrap" >
                  <button class="m-btn type01 bg-revert-grey  width-100" @click="activeInfoModal = false">닫기</button>
                </div>
                <div class="m-btn-wrap">
                  <button class="m-btn type01 bg-primary width-100" style="color: #fff" @click="confirm">완료</button>
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
  // middleware({store, redirect}) {
  //     if(!store.$auth.hasScope('manager')) {
  //       redirect('/')
  //     }
  // },
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
      selectedItem: {
      },
      toggleList: 'waiting',
      
      modalTitle: 'info',
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
      ],
      countyInfo:{},
    }
  },
  computed: {
    totalCount() {
      return this.items.meta.total_count;
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
    },
    toggleList(val) {
      this.form.page = 1;
      this.getItems();
    }
  },
  methods: {
    async checkManagerAuth(item) {
        const response = await this.$axios.get(`/api/districts/1/members/check-manager`, {
            params: {
                phone: item.phone,
            }
        });
        if(response.data === false) {
            this.$router.push("/")
        }else {
            this.countyInfo = Object.assign({}, {
              state: response.data.state,
              city: response.data.city,
              district: response.data.district,
              district_id: response.data.district_id,
            });
            await this.getItems()
        }
    },
    loadMore(state) {
        if(this.items.meta.current_page <= this.items.meta.last_page){
            this.form.page += 1;

            this.$axios.get(`/api/districts/${this.countyInfo.district_id}/members`, {
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
      this.$axios.get(`/api/districts/${this.countyInfo.district_id}/members`, {
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

        this.$axios.get(`/api/districts/${this.countyInfo.district_id}/members`,{
            params: {
              call_count: this.toggleList == 'waiting' ? null : 1,
            }
        })
            .then(response => {
                this.items = response.data;
            });
    },
    async getProxyPhoneCall(item) {
      const { data } = await this.$axios.post(`/api/districts/${this.countyInfo.district_id}/members/proxy-number`, 
        {
          id: item.id,
          pvn: this.formerVn,
        }
      )
      if(data.rs == 'SUCCESS') {
        window.location.href = `tel:${data.vn}`
        await this.getItems();
        // this.items = {
        //   ...this.items,
        //   data: this.items.data.map((mapItem) => {
        //     if(mapItem.id == item.id) {
        //       mapItem.call_count = item.call_count + 1;
        //     }
        //     return mapItem;
        //   })
        // }
        this.formerVn = data.vn;
      }
    },

    openInfoModal(item) {
      this.modalTitle = 'info';
      this.selectedItem = item;
      this.activeInfoModal = true;
    },
    openDispatchList(item) {
      this.modalTitle = 'dispatchList';
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
  async created () {
    await this.checkManagerAuth({
        phone: this.$auth.user.phone,
    });

  },
}
</script>

<style scoped>
  .flex-w-full {
    width:100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left:40px;
  }
  .flex-w-full .col-name {
    width: 40%;

  }
  .deca {
    width:100%;
    height:600px;
    border-radius: 5px;
    background-color: #eee;

    position: relative;
  }
  .deca .inner-form {
    width: 90%;
    height: 80%;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #BDC3C7;

    position: absolute;
    top: 5%;
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

  .m-input-checkboxes.type01 {
    display:flex; width: 100%;
    border-radius:5px; overflow:hidden;
}
.m-input-checkboxes.type01 .m-input-checkbox {
    flex:1;
}
.m-input-checkboxes.type01 label {
    display: flex; align-items: center; justify-content: center;
    height:45px;
    font-size:18px;
    background-color:#EEEEEE; color:#777777;
}
.m-input-checkboxes.type01 input:checked + label {
    background-color:#0BAF00; color:#fff;
}

.m-input-checkboxes.type02 {
    display:flex; flex-wrap:wrap;
    margin:-4px;
}

.m-input-checkboxes.type02 .m-input-checkbox-wrap {
    width:50%; padding:4px;
}
.m-input-checkboxes.type02 .m-input-checkbox {
    display:flex; align-items: center; justify-content: space-between;
    height:56px; padding:0 24px;
    font-size:18px; font-weight:500;
    background-color:#0BAF00; color:#fff; border-radius:5px; border:1px solid transparent;
}
.m-input-checkboxes.type02 .m-input-checkbox i {
    font-size:20px;
    color:#fff;
}
.m-input-checkboxes.type02 .m-input-checkbox.create {
    display:flex; align-items: center; justify-content: center;
    background-color:#fff; border-color:#DDDDDD;
}
.m-input-checkboxes.type02 .m-input-checkbox.create i {
    font-size:24px;
    color:black;
}

.m-input-checkboxes.type03 {
    display:flex; width: 100%; overflow:hidden;
}
.m-input-checkboxes.type03 .m-input-checkbox {
    flex:1;
}
.m-input-checkboxes.type03 label {
    display: flex; align-items: center; justify-content: center;
    height:45px;
    font-size:18px;
    color:#777777;
}
.m-input-checkboxes.type03 input:checked + label {
    color:#0BAF00;
}

.m-input-checkboxes.type04 {
    display:flex; width: 100%;   overflow:hidden;
    padding-top: 10px;
}
.m-input-checkboxes.type04 .m-input-checkbox {
    flex:1;
    height: 80px; border:1px solid #eee; border-radius:15px;
    margin: 0 6px 24px 6px;
}
.m-input-checkboxes.type04 label {
    display: flex; 
    flex-direction: column;
    align-items: center; justify-content: center;
    height:inherit;
    font-size:18px;
    color:#777777;
}
.m-input-checkboxes.type04 input:checked + label {
    color:#0BAF00;
}

.m-btns.type01 {
    display:flex; flex-wrap:wrap;
    margin:-6px;
    position:relative; z-index:1;
    text-align: center;
}
.m-btns.type01 .m-btn-wrap {
    flex:1;
    padding:6px;
}
.m-btn.type01 {
    display:flex; align-items: center; justify-content: center;
    height:40px; padding:0 4px;
    font-weight:bold; font-size:16px;
    background-color: #fff; color:black; border-radius:5px;
    border:1px solid #0BAF00;
    white-space: nowrap;
}
.m-btn.type02 {
    display:flex; align-items: center; justify-content: center;
    height:45px; padding:0 16px;
    font-weight:500; font-size:20px;
    background-color:#0BAF00; color:#fff; border-radius:5px;
    border:1px solid transparent;
}
.primary {
    color:#0BAF00 !important;
}

.activated {
  border: 2px solid ; 
  box-shadow: 0 0 10px #0BAF00;
}

.dispatch-name {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background-color: #0BAF00;
  color: #fff;
  font-size: 22px;
  margin: 5px 5px;
}

</style>  