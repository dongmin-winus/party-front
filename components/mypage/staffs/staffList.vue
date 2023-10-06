<template>
  <div>
    <div class="m-visual type01">
        <h3 class="title">{{rep_district['name'] ? rep_district['name'] : this.$store.state.district.district}} 섬기는 사람들</h3>
    </div>

    <div class="mt-32"></div>
    <section class="area-staff">
        <div class="m-empty type01" v-if="positions.length === 0">준비중입니다.</div>

        <div style="padding:0 5px;">
            <div v-show="registerInfo.length > 0">
                <div class="mt-8"></div>
                <ul class="items custom-ul">
                    
                    <li v-for="(item, index) in registerInfo" :key="index" style="padding:10px 10px;">
                        <div class="item-container">
                            <div class="left">
                                <div>
                                    {{ $store.state.district.district }}{{ transGroup(item.group) }}&nbsp;{{ item.after }}{{ `(${formatDate(item.created_at)})` }}
                                </div>
                            </div>
                            <div class="right">
                                <div class="m-board-btns">
                                    <div class="m-btns type01" >
                                        <div class="m-btn-wrap ">
                                            <button type="button" style="height:30px;" class="m-btn type01 bg-grey" @click.prevent="debounceCancelRegister(item.id)">
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mt-12 m-tabs type01" v-if="computedCountySections.length > 1">
                <div  class="m-tab-wrap" v-for="(item) in computedCountySections">
                    <div class="m-tab" :class="`${activeCounty === item ? 'active' : ''}`" @click="getCounty(item)">
                        <span class="text">{{ $store.state.district.district }}&nbsp; {{ transGroup(item) }}</span>
                    </div>
                </div>
            </div>
            <ul class="items custom-ul">

                <li v-for="item in county" :key="item.id">
                    <div class="wrapper">
                        <div class="mt-20"></div>
                        <div class="mt-8"></div>
                        <div class="item-container">
                            <div class="left">
                                <div class="image-container">
                                    <img src="@/assets/images/taegeuk.png" alt="">
                                </div>
                                <div class="text-container" >
                                    <p class="title">{{item.name == '' ? '담당자 미정' : item.name}}</p>
                                    <p class="content">{{item.position}}</p>
                                </div>
                            </div>
                            <div class="right" v-if="item.catecode !== 'A0001'">
                                <div class="m-board-btns">
                                    <div class="m-btns type01" >
                                        <div class="m-btn-wrap">
                                            <button v-show="!item.id" type="button" class="m-btn type01 height-full bg-revert-primary" @click="setForm(item)">
                                                등록 
                                            </button>
                                            <button v-show="item.id" type="button" class="m-btn type01 height-full bg-revert-orange" @click="setForm(item)">
                                                수정 
                                            </button>
                                        </div>
                                        <div class="m-btn-wrap">
                                            <button type="button" class="m-btn type01 height-full bg-revert-red" @click="openReminder(item,'삭제','취소')">
                                            <!-- <button type="button" class="m-btn type01 height-full bg-revert-red" @click="handleDeleteDemo(item)"> -->
                                                삭제 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <img src="@/assets/images/about-bg.png" alt="" class="deco-about">
    </section>
    <modal
        v-if="activeModal"
        :noPaddingModal="true"
        :paddingModal="false"
        :cancelBtn="false"
    >
        <template #outter>
          <div class="area-write area-staff">
            <div class="wrap">
              <div class="m-input-wrap">
                <h3 class="m-input-title">직분</h3>
                <Dropdown
                    :menuTitle="'직분'"
                    :activate="activeDropdown"
                    :items="computedPositions"
                    :selected="positionSelected"
                    @toggle="togglePosition"
                    @change="changePosition"
                    :value="selectedItem?.position"
                />
                <!-- <div class="m-input-text type01">
                    <input type="text" placeholder="직분명" v-model="form.position">
                </div>
                <div class="m-input-error" v-if="errors.position">{{errors.position[0]}}</div> -->
                <h3 class="m-input-title">그룹(수정불가)</h3>
                <div class="m-input-text type01">
                    <input type="text" placeholder="그룹" v-model="form.groupName"  readonly>
                </div>
                <div class="m-input-error" v-if="errors.group">{{errors.group[0]}}</div>
                <h3 class="m-input-title">이름</h3>
                <div class="m-input-text type01">
                    <input type="text" placeholder="이름" v-model="form.name">
                </div>
                <div class="m-input-error" v-if="errors.name">{{errors.name[0]}}</div>
                <h3 class="m-input-title">연락처</h3>
                <div class="m-input-text type01">
                    <input type="text" placeholder="연락처" v-model="form.phone">
                </div>
                <div class="m-input-error" v-if="errors.phone">{{errors.phone[0]}}</div>
              </div>
              <div class="mt-12" ></div> 
              <div class="m-board-btns" style="width:100%; display:flex; justify-content:space-around;">
                <div class="m-btns type01" >
                  <div class="m-btn-wrap">
                    <button v-if="!form.id" type="button" class="m-btn type01 height-full bg-revert-primary" @click="store()">
                    <!-- <button v-if="!form.id" type="button" class="m-btn type01 height-full bg-revert-primary" @click="storeDemo()"> -->
                        등록 
                    </button>
                    <button v-else type="button" class="m-btn type01 height-full bg-revert-orange" @click="updateItem()">
                    <!-- <button v-else type="button" class="m-btn type01 height-full bg-revert-orange" @click="updateDemo()"> -->
                        수정 
                    </button>
                  </div>
                  <div class="m-btn-wrap">
                    <button type="button" class="m-btn type01 height-full bg-revert-red" @click="closeModal()">
                      취소
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-12" ></div> 
            </div>

          </div>
        </template>
    </modal>
    <!-- 삭제 리마인더 -->   
    <Reminder 
        v-if="activeReminder"
        :title="'삭제 하시겠습니까?'"
        :excecute="excecuteName"
        :cancel="cancelName"
        :item="item"
        @excecute="remove"
        @cancel="closeReminder"
    />
  </div>
</template>

<script>
import InputCamera from '~/components/form/posts/inputCamera';
import InputLink from "~/components/form/posts/inputLink";
import InputImg from "~/components/form/posts/inputImg";
import InputThumbnail from "~/components/form/posts/inputThumbnail";
import InputAddress from "~/components/form/inputAddress";
import {mapGetters} from "vuex";

import Reminder from "@/components/reminder.vue";
import Dropdown from "@/components/dropdown";
import Form from "@/utils/Form";
import common from "@/utils/common"
import {debounce} from "@/utils/debounce";
export default {
  name: 'StaffList',
  components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera,Reminder, Dropdown },
  mixins: [common],
  auth: false,
  props: {
    rep_district_id: {
      type: String,
      default: ''
    },
    rep_district_name: {
      type: String,
      default: ''
    }
  },
  async asyncData({$axios}) {
      const {data} = await $axios.get('/api/districts/1/position');
      return {modalPositions: data}
  },
  data() {
      return {
          rawValues: [],
          positions: [],
          countyLists: [],
          county: [],
          registerStatus: undefined,
          registerInfo:[],
          activeCounty: undefined,
          errors: {},
          rep_district: {},
          rawGroup: null,


          categories: [
            {
              id:1,
              name: '섬기는 사람들'
            },
            {
              id:2,
              name: '임원신청현황 전체'
            },
            {
              id:3,
              name: '결제대기'
            },
            {
              id:4,
              name: '결제반려'
            },
          ],
          selectedCategory: 1,

          activeModal: false,
          modalPositions:[],

          activeReminder: false,
          activeDropdown: false,
          positionSelected: false,
          selectedItem: {},

          // 추가 수정 모달의 폼
          form: {
                district_id:'',
                phone: "",
                name: "",
                position: "",
                photo: "",
                img: {
                    name:"",
                    url:""
                }
            },
      }
  },

  computed: {
    computedCountySections() {
        const set = [...new Set(this.rawValues.map(item => item.group))];
        // set.splice(set.indexOf(null), 1);
        return set;
    },
    computedPositions() {
        return this.positions.filter(item => !(item.position == '대표')).map((item) => {
            return item.position
        })
    },
    ...mapGetters({
        group:'getGroup'
    }),
  },

  watch: {
      '$store.state.district.id'() {
          this.setCountyLists()
      },
  },
  methods: {
    selectCategory(id) {
      this.selectedCategory = id;
      // this.getMissions(id);
    },
      phoneReplace(phone) {
          if(phone) {
              let num =  phone.replaceAll("[\\s\\-()]", "");
              return num.slice(0,7).padEnd(11,"*");
           }else {
              return;
           }

      },
      async setCountyLists(rep_district_id = undefined) {
          this.rawValues = [];
          this.countyLists = [];

          const response = await this.$axios.get(`/api/districts/${rep_district_id ? rep_district_id : this.$store.state.district.id}/staff`);
          this.rawValues = response.data.data;
          this.rawGroup = response.data.group;

          this.computedCountySections.forEach(group => {
              const county = this.rawValues.filter(rawValue => rawValue.group === group);
              this.countyLists.push(
                  this.positions.map(position => {
                      const positionData = county.find(value => value.position === position.position);
                      return {
                          ...position,
                          group: group, //computedCountySections 의 각 원소는 그룹명(1,2,3, ...)이다.
                          district_id: this.$store.state.district.id,
                          id: positionData ? positionData.id : null,
                          available: positionData ? false : true,
                          name: positionData ? positionData.name : "",
                          phone: positionData ? positionData.phone : "",
                          created_at: positionData ? positionData.created_at : "",
                          updated_at: positionData ? positionData.updated_at : "",
                      }
                  })
              )
          })
          this.county = [...this.countyLists[this.group ? this.group - 1 : 0]];
          this.activeCounty = this.group ? this.group : 1;
          this.registerStatus = response.data.register;
      },
      async getPositions(rep_district_id = undefined) {
          const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/position`);
          this.positions = [
              ...response.data.map(item => {
                  return {
                      ...item,
                      available: true,
                      img: "",
                      name: "",
                      phone: "",
                  }
              })
          ];
          await this.setCountyLists(rep_district_id);
      },
      getCounty(item) {
        this.activeCounty = item;
        this.county = [
            ...this.countyLists[item-1]
        ]
      },
      togglePosition() {
          this.activeDropdown = !this.activeDropdown;
      },
      changePosition(position) {
          this.selectedItem.position = position;
          this.positionSelected = true;
      },

      openReminder(item = {}, excecuteName, cancelName) {
          this.activeReminder = true;
          this.item = item;
          this.excecuteName = excecuteName;
          this.cancelName = cancelName;
      },
      closeReminder() {
          this.activeReminder = false;
          this.excecuteName = "";
          this.cancelName = "";
          this.item = {};
      },
      closeModal() {
        this.activeModal = false;
        this.reset();
      },
      setForm(item, isDelete = false) {
          this.form = Object.assign({},{
              ...item,
              groupName: this.transGroup(item.group),
          })
          if(!isDelete) {
            this.changePosition(item.position);
            this.imgUrl = item.img.url;
            this.isEditMode = true;
            this.activeModal = true;
          }

      },

      reset(){
        this.form = {
            ...this.form,
            phone: "",
            name: "",
            position: "",
            photo: "",
            group: "",
        };
        this.selectedItem = {};
        this.positionSelected = false;
        this.imgUrl = "";
        this.isEditMode = false;
      },
      storeDemo() {
        if(!this.selectedItem.position) return alert("직책을 선택해주세요.");
          this.form.position = this.selectedItem.position;
          this.form.district_id = this.rep_district_id;
          this.form.id = Math.max(...this.county.filter(item => item.id !== null).map(item => item.id))+1;
          this.county = [
            ...this.county.map(item => {
                if(item.position === this.form.position) {
                    return {
                        ...item,
                        id: this.form.id,
                        name: this.form.name,
                        phone: this.form.phone,
                    }
                }else {
                    return item;
                }
            })
          ];
          alert("성공적으로 등록되었습니다.")
          this.closeModal();
      },
      updateDemo() {
        this.form.position = this.selectedItem.position;
        this.form.district_id = this.rep_district_id;
        this.county = [
            ...this.county.map(item => {
                if(item.position === this.form.position) {
                    return {
                        ...item,
                        name: this.form.name,
                        phone: this.form.phone,
                    }
                }else {
                    return item;
                }
            })
        ];
        alert("성공적으로 수정되었습니다.");
        this.closeModal();
      },
      handleDeleteDemo(item) {
        this.setForm(item, true);
        this.openReminder(item,'삭제','취소');
      },
      removeDemo() {
        this.form.position = this.selectedItem.position;
        this.form.district_id = this.rep_district_id;
        this.county = [
            ...this.county.map(item => {
                if(item.id === this.form.id) {
                    return {
                        ...item,
                        id: null,
                        name: "",
                        phone: "",
                    }
                }else {
                    return item;
                }
            })
          ];
          alert("삭제되었습니다 데모.")
          this.closeReminder();
      },
      async store() {
            if(!this.selectedItem.position) return alert("직책을 선택해주세요.");
            this.form.position = this.selectedItem.position;
            this.form.district_id = this.rep_district_id;
            this.form.group = this.form.group;
            if(!this.validatePhone(this.form.phone)) return alert("올바른 전화번호를 입력해주세요.");
            let form = (new Form(this.form)).data();
            try {
                const response = await this.$axios.post("/api/districts/" + this.form.district_id + "/staff", form);
                (response.status === 201) ? alert("성공적으로 등록되었습니다.") : alert(response.data.message);
                this.closeModal();
            } catch (error) {
                if(error.response.status === 500) return alert("등록 중 오류가 발생했습니다. 입력된 정보를 확인해주세요.");
            }
            this.reset();
            await this.init();
      },
      async updateItem() {
        try {
            this.form.position = this.selectedItem.position;
            this.form.district_id = this.rep_district_id;
            this.form.group = this.form.group;
            if(!this.validatePhone(this.form.phone)) return alert("올바른 전화번호를 입력해주세요.");
            let form = (new Form(this.form).data());
            const {data} = await this.$axios.post(`/api/districts/${this.form.district_id}/staff/update/${this.form.id}`, form);
            data.result ? alert("성공적으로 수정되었습니다.") : alert(data.message);
            this.closeModal();
        } catch (error) {
            console.error(error);
        }
        this.reset();
        await this.init();
      },

      remove(item){
        if(Object.keys(item).length !== 0) {
            this.$axios.delete("/api/districts/" + this.rep_district_id + "/staff/" + item.id)
        }
        alert("삭제되었습니다.")
        this.closeReminder();
        this.init();
      },
      

      init() {
        if(this.rep_district.id ) {
            this.getPositions(this.rep_district.id)
        }else {
            this.getPositions();
            this.getRegisterInfo();
        }
      }
  },

  mounted() {
      this.rep_district = {
          id:this.rep_district_id,
          name:this.rep_district_name,
      }
      this.init();
      
  },
  created() {
      this.debounceRegister = debounce((item) => {
          this.register(item)
      },500);
      this.debounceCancelRegister = debounce((id) => {
          this.cancelRegister(id)
      },500);
  }
}
</script>

<style scoped>
  .custom-ul {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0;
      
  }
  .custom-ul li {
      /* list-style: none; */
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 130px;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      padding: 10px 5px 25px 20px;
      margin-bottom: 5px;
      background: #fafafa;
  }

  .custom-ul li .wrapper {
      height: 85px;
  }

  .custom-ul .item-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }

  .item-container .left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content:center;
      width: 300px;
  }
  
  .item-container .right {
      display: flex;
      flex-direction: column;
      min-width: 125px;
  }

  .text-container {
      margin-left : 10px;
  }
  .text-container p {
      line-height: 1.5;
  }
  .text-container .title {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
  }
  .text-container .content {
      font-size: 16px;
      font-weight: 500;
      color: #0BAF00;
      margin: 0;
  }
  .height-full {
      height:100%;
  }
  .m-btns .type01 {
      padding: 10px 10px;
      font-weight: normal;
      font-size: 18px;
  }

  .w-100 {
      width: 115px;
      padding: 0 10px;
  }
  .bg-orange {
      background-color: rgb(254, 124, 30);
      border-radius: 5px;
      padding: 5px 11px 5px 11px;
      font-size: 14px;
  }

</style>
