<template>
  <div class="area-region-activity">
      <!-- 헤더영역 -->
      <header-type01 />

      <!-- 내용 영역 -->
      <div class="container">
          <div class="categories">
            <ul class="horizontal-scroll">
              <li v-for="(item,index) in categories" :key="index" @click="selectCategory(item.id)">
                <div class="category" :class="item.id === selectedCategory ? 'active' : ''">
                  <span :style="item.id === selectedCategory ? 'color:#fff;':'color:#666;'">{{ item.name }}</span>
                </div>
              </li>
            </ul>
          </div>


          <StaffList 
            v-if="selectedCategory === 1"
            :rep_district_id="$route.query.rep_district_id"
            :rep_district_name="$route.query.rep_district_name"
          />
          <Approvals 
            v-if="selectedCategory !== 1"
            :propToggleList="selectedCategory"
          />
          
      </div>

      <!-- 하단 네비게이션바 -->
      <navigation />
  </div>

</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import Form from "@/utils/Form";

import StaffList from "@/components/mypage/staffs/staffList";
import Approvals from "@/components/mypage/staffs/approvals";

import common from "@/utils/common"
import {debounce} from "@/utils/debounce";
export default {
  components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera, StaffList, Approvals},
  mixins: [common],
  auth: false,
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
            {
              id:5,
              name: '결제승인'
            },
          ],
          selectedCategory: 1,

      }
  },

  computed: {
      computedCountySections() {
          const set = [...new Set(this.rawValues.map(item => item.group))];
          // set.splice(set.indexOf(null), 1);
          return set;
      },
  },

  watch: {
      '$store.state.district.id'() {
          this.setCountyLists()
      }
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
          this.county = [...this.countyLists[0]];
          this.activeCounty = 1;
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
      getRegisterClass() {
          const colorClass = this.registerStatus ? 'm-btn type01 height-full bg-revert-primary' : 'm-btn type01 height-full bg-grey'
          return colorClass;
      },
      async getRegisterInfo() {
          const {data} = await this.$axios.get(`/api/staff/1/show-register`);
          if(data) {
              this.registerInfo = [...data];
              this.registerInfo.length === 0 ? this.registerStatus = true : this.registerStatus = false;
          }
      },
      async register(item) {
          if(this.$auth.user?.district.id !== this.$store.state.district.id) return alert('회원가입하신 지역만 신청 가능합니다.');
          if(!this.registerStatus) return alert('1개의 직분만 신청 가능합니다.');
          const response = await this.$axios.post(`/api/staff/${this.$store.state.district.id}/register`, {
              after: item.position,
              group: item.group,
          });
          if(response) {
              alert('신청이 완료되었습니다.');
              await this.getRegisterInfo();
          }
      },
      async cancelRegister(id) {
          if(confirm('신청을 취소하시겠습니까?')) {
              try {
                  const response = await this.$axios.delete(`/api/staff/1/delete-register/${id}`);
                  if(response) {
                      alert('신청이 취소되었습니다.');
                      await this.getRegisterInfo();
                  }
              } catch (error) {
                  console.error(error.response.data.message)
              }
              
          }
          
      },
  },

  mounted() {
      this.rep_district = {
          id:this.$route.query.rep_district_id,
          name:this.$route.query.rep_district_name,
      }

      if(this.rep_district.id ) {
          this.getPositions(this.rep_district.id)
      }else {
          this.getPositions();
          this.getRegisterInfo();
      }
      
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
      border: 1px solid #eaeaea;
      border-radius: 10px;
      padding: 10px 20px 25px 20px;
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
