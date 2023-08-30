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
            <h3 class="title">일일보고 현황</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- content container -->
    <div class="container">
      <div class="mt-24"></div>
      <section class="section-promotion">
        <div class="wrap">
          <div class="m-title type01">
            <p class="sub" style="text-align: center; color: #626262; font-size: 19px; padding-bottom: 10px;">{{countyInfo.state }} {{countyInfo.city }}</p>
            <p class="point" style="text-align: center;"> {{rawValue?.election }} </p>
          </div>
        </div>
      </section>
      <div class="mt-12"></div>
      <div class="m-input-checkboxes type04">
        <div class="m-input-checkbox" style="border: 2px solid #d61a1a; box-shadow: 0 0 3px red">
          <input type="radio" id="waiting" value="waiting" v-model="toggleList">
          <label for="waiting">
            <p style="color:red">{{ rawValue?.bm.length - rawValue?.data.length }}</p>
            <p style="color:red">미보고</p>
          </label>
        </div>
        <div class="m-input-checkbox">
          <input type="radio" id="confirmed" value="confirmed" v-model="toggleList">
          <label for="confirmed">
            <p>{{ rawValue?.data.length }}</p>
            <p>보고완료</p>
          </label>
        </div>
        <div class="m-input-checkbox" style="background-color:#E7F7E5">
          <input type="radio" id="total" value="total" v-model="toggleList">
          <label for="total">
            <p>{{ rawValue?.bm.length }}</p>
            <p>마을 총원</p>
          </label>
        </div>  
      </div>  
      <div class="mt-12" style="display:flex; justify-content: space-around; ">
        <div class="m-input-text type01 clear-input-container">
          <input readonly v-model="computedDate" type="text" @click="toggleCalendar1 = !toggleCalendar1" placeholder="검색일">
          <button class="clear-input-btn" v-if="computedDate" @click="clearInput">
            <span class="btn-character">X</span>
          </button>
        </div>
        <div class="m-board-btns">
          <div class="m-btns type01">
            <div class="m-btn-wrap" @click="search">
              <button class="m-btn type02 bg-primary">검색</button>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <div style="position:relative">
          <v-date-picker 
            style="position:fixed; z-index:999;"
            v-if="toggleCalendar1"
            locale="ko"
            color="green"
            :max-date="new Date()"
            v-model="selectedDate"
            @input="toggleCalendar1 = false"
          />
        </div>

      </client-only>
      <div class="mt-12"></div>
      <div class="flex-w-full bg-lightGray">
        <div class="col-name">일자</div> 
        <div class="col-name">마을</div>
        <div class="col-name">대표</div>
        <div class="col-name">상세</div>
      </div>
      <!-- rawValue.data로 v-for 반복 구조 만들기 -->    
      <div class="flex-w-full" v-for="item in rawValue?.data">
        <div class="col-name" @click="openInfoModal(item)">{{ listDate }}</div>
        <div class="col-name" @click="openInfoModal(item)">{{ item.district }}</div>
        <div class="col-name" @click="openInfoModal(item)">{{ item.name }}</div>
      </div>

      <!-- TODO rawValue의 bm들 중 reporting : 1 인 위 데이터 빼고 빨갛게 만들어서 리스트 (상세버튼 생략 ) -->
      <div class="flex-w-full" v-for="item in unreportedList" :key="item.id">
        <div class="col-name red" @click="openInfoModal(item)">{{ listDate }}</div>
        <div class="col-name red" @click="openInfoModal(item)">{{ item.district }}</div>
        <div class="col-name red" @click="openInfoModal(item)">{{ item.name }}</div>
      </div>
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
              일일보고 상세 정보
            </div>
            <div class="inner-form">
              <div class="title">
                <span class="main">{{ formatDate(selectedItem.created_at,'-') }}</span>
              </div>
              <div class="title">
                <span class="sub-point">{{ selectedItem.election }} {{ selectedItem.district }}</span>
                <span class="main">{{ selectedItem.name }}</span><br/>
                <span class="main">{{ formatPhone(selectedItem.phone) }}</span>
              </div>
              <div class="mt-8"></div>

              <!-- 일일보고 데이터 -->
              <ul class="custom-ul">
                <li v-for="(item, index) in selectedData" :key="index">
                  <p>{{item.name}}</p>
                  <div class="m-input-dates type01">
                      <div class="m-input-text type01">
                          <input type="text" v-model="item.value" readonly>
                      </div>
                  </div>
                </li>
              </ul>

              <div class="mt-8"></div>
              <div class="comment">
                <p>비고</p>
                <div class="m-input-textarea type01 lightgrey">
                  <textarea readonly placeholder="기타 의견을 입력해주세요" v-model="selectedItem.memo"></textarea>
                </div>
              </div>
            </div>

            <div class="buttons">
              <div class="m-btns type01">
                <div class="m-btn-wrap">
                  <button class="m-btn type01 bg-primary width-100" style="color: #fff" @click="activeInfoModal = false">확인</button>
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
  name: "daily_report",
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
      selectedItem: {},
      toggleList: '',
      activeInfoModal: false,
      reasons: [
        '번호와 정보가 다름',
        '다른 지역 회원',
        '명단 삭제 요청',
        '회원 신청 이력 없음'
      ],
      countyInfo:{},



      rawValue:null,
      unreportedList: [],


      toggleCalendar1: false,
      selectedDate: null,
      listDate: '',
    }
  },
  computed: {
    computedDate() {
      if(!this.selectedDate) return;
      if(this.selectedDate instanceof Date) {
        return this.formatDate(this.selectedDate,'-');
      }
    },
    total() {
      return this.items.meta.total 
    },
    selectedData() {
      return this.selectedItem ? {
        village: {
          name: '자유마을',
          value: this.selectedItem.village,
        },
        mobile: {
          name:'퍼스트모바일',
          value: this.selectedItem.mobile,
        },
        card: {
          name: '선교카드',
          value: this.selectedItem.card,
        },
        news: {
          name: '자유일보',
          value: this.selectedItem.news,
        },
        ghmon: {
          name: '광화문온',
          value: this.selectedItem.ghmon,
        },
        yktv: {
          name:'너알아tv',
          value: this.selectedItem.yktv,
        },
        pension: {
          name: '국민연금',
          value: this.selectedItem.pension,
        },
        other: {
          name: '현장 참여자수',
          value: this.selectedItem.other,
        }
      } : {}
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
        }
    },
    clearInput() {
      this.selectedDate = null;
    },
    async search() {
      await this.getReportData();
    },

    openInfoModal(item) {
      this.selectedItem = item;
      this.activeInfoModal = true;
    },

     handleReportData({ bm, data }) {
      this.getListDate();
      //rawValue의 bm들 중 reporting : 1 인 위 데이터 빼고 빨갛게 만들어서 리스트 (상세버튼 생략 )
      const dataDistricts = data.map(item => item.district);
      const filteredBm = bm.filter(item => !dataDistricts.includes(item.district));
      this.unreportedList = filteredBm;
    },

    async getReportData() {
      try {
        const response = await this.$axios.get(`/api/reports/md-list?phone=${this.$auth.user.phone}`, {
          params: {
            startDate: this.selectedDate ? this.getDateString(this.selectedDate) : null,
          }
        });
        this.rawValue = response.data;
        this.handleReportData(response.data);
        if(this.rawValue.message) alert(this.rawValue.message)
      } catch (error) {
        if(error.response?.status == 500) {
          alert('서버에러')
        }
      }

    },
    getDateString(date) {
      if(!date) return null;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },

    getListDate() {
      this.listDate = this.selectedDate ? this.formatDate(this.selectedDate,'-') :this.formatDate(new Date(),'-')
    },
  },
  async created () {
    await this.checkManagerAuth({
        phone: this.$auth.user.phone,
    });
    await this.getReportData();
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
    padding: 0 20px;
  }
  .flex-w-full .col-name {
    width: 40%;
    display: flex;
    justify-content: center;
  }

  .deca {
    width:100%;
    height:650px;
    border-radius: 5px;
    background-color: #eee;

    position: relative;
  }
  .deca .inner-form {
    width: 90%;
    height: 75%;
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
    bottom: 2%;
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
    text-decration:underline;
}

.m-input-checkboxes.type04 {
    display:flex; width: 100%;   overflow:hidden;
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
    text-decration:underline;
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


.custom-ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    
}
.custom-ul li {
    /* list-style: none; */
    text-align: center;
    width: 48%;
    background: #fafafa;
}

.clear-input-container {
  position: relative;
}

.clear-input-container .clear-input-btn {
  position:absolute;
  right:10px;
  top: 50%;
  transform:translateY(-50%);
  
}
.clear-input-container .clear-input-btn .btn-character {
  font-size: 20px;
  font-weight:700;
  color: #777777;
}


</style>  