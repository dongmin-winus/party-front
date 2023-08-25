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
            <h3 class="title">회원 명단</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- content container -->
    <div class="container">
      <section class="section-promotion mt-24">
        <div class="wrap">
          <div class="m-title type01">
             <p class="point" style="text-align: center;"> {{ election }}</p> 
          </div>
        </div>
      </section>

      <div class="wrap mt-24">
        <Dropdown
          :menuTitle="'마을'"
          :activate="activeDropdown"
          :items="computedDistricts"
          :selected="districtSelected"
          @toggle="toggleDistrict"
          @change="changeDistrict"
          v-model="selectedItem.district"
        />
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
      </div>
      


      <div class="mt-12"></div>
      <div class="flex-w-full bg-lightGray"><div class="col-name">서명일</div> <div class="col-name">회원정보</div></div>
      <div class="wrap">
        <div class="m-boards type02">
            <name v-for="item in items.data" :key="item.id" :item="item" @makeProxyPhoneCall="getProxyPhoneCall(item)"/>
        </div>
      </div>
      <scroll-loading @load="loadMore" v-if="items.links.next" />
    </div>
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
      word:"",
      election: undefined,
      districts: [],

      activeDropdown: false,
      districtSelected: false,
      selectedItem: {},

      formerVn: undefined,
    }
  },
  computed: {
    computedDistricts() {
      return this.districts.map(district => {
        return district.district;
      })
    },

  },
  watch: {
    'selectedItem.district': function(val) {
      if(val) {
        this.districtSelected = true;
        this.getItems();
      }
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
        }else if(response.data.position === "위원장") {
            await this.getDistricts();
            //TODO : 위원장일떄 
            this.election = response.data.election;
        }
    },
    loadMore(state) {
      const district = this.districts.find(item => item.district === this.selectedItem.district);
        if(this.items.meta.current_page <= this.items.meta.last_page){
            this.form.page += 1;

            this.$axios.get(`/api/districts/${district.id}/members`, {
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
      const district = this.districts.find(item => item.district === this.selectedItem.district);
      this.$axios.get(`/api/districts/${district.id}/members`, {
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
        const district = this.districts.find(item => item.district === this.selectedItem.district);

        this.$axios.get(`/api/districts/${district.id}/members`)
            .then(response => {
                this.items = response.data;
            });
    },
    async getDistricts() {
      const response = await this.$axios.get(`/api/districts/1/executive/h-certify`,{
        params: {
          phone: this.$auth.user.phone,
        }
      });
      this.districts = response.data.map(item => {
        return {
          id: item.id,
          district: item.district,
        }
      });
      this.selectedItem = {
        ...this.districts[0]
      };
    },

    toggleDistrict() {
        this.activeDropdown = !this.activeDropdown;
    },
    changeDistrict(district) {
        const targetDistrict = this.districts.find(item => item.district === district);
        this.selectedItem = targetDistrict;
        this.districtSelected = true;
    },
    async getProxyPhoneCall(item) {
      const district = this.districts.find(item => item.district === this.selectedItem.district);
      const { data } = await this.$axios.post(`/api/districts/${district.id}/members/proxy-number`, 
        {
          id: item.id,
          pvn: this.formerVn,
        }
      )
      if(data.rs == 'SUCCESS') {
        window.location.href = `tel:${data.vn}`
        this.items = {
          ...this.items,
          data: this.items.data.map((mapItem) => {
            if(mapItem.id == item.id) {
              mapItem.call_count = item.call_count + 1;
            }
            return mapItem;
          })
        }
        this.formerVn = data.vn;
      }
    },
  },
  async created () {
    await this.checkManagerAuth({
        phone: this.$auth.user.phone,
    });
    await this.getDistricts();

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
    padding: 0 40px;
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

</style>  