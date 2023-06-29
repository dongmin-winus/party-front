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
            <h3 class="title">{{ countyInfo.district}} 임원신청현황</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>
    <!-- content container -->
    <div class="container">
      <div class="m-input-checkboxes type03">
        <div class="mt-8"></div>
        <div class="m-input-checkbox">
            <input type="radio" id="all" value="all" v-model="toggleList">
            <label for="all">전&nbsp;&nbsp;&nbsp;체</label>
        </div>
        <div class="m-input-checkbox">
            <input type="radio" id="waiting" value="waiting" v-model="toggleList">
            <label for="waiting">결재대기</label>
        </div>
        <div class="m-input-checkbox">
            <input type="radio" id="approved" value="approved" v-model="toggleList">
            <label for="approved">결재승인</label>
        </div>
        <div class="m-input-checkbox">
            <input type="radio" id="declined" value="declined" v-model="toggleList">
            <label for="declined">결재반려</label>
        </div>
      </div>
        <div class="mt-12"></div>
        <div class="box-table">
          <table class="m-table type02 noborder">
            <thead>
              <tr bgcolor="#e5e5e5">
                <th class="m-input-checkbox type03">
                  <input type="checkbox" value="allChecked" id="allChecked" v-model="allChecked">
                  <label for="allChecked"></label>
                </th>
                <th>신청일 / 결재일</th>
                <th>이름</th>
                <th>내용</th>
                <th>상태</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(item, index) in toggledItems" :key="index" class="border-bottom">
                <td class="m-input-checkbox type03">
                  <input type="checkbox" :value="item" :id="item.id" v-model="selectedItems">
                  <label label :for="item.id"></label>
                </td>
                <td style="width:80px;">{{`${formatDate(item.created_at)} / ${formatDate(item.updated_at)}`}}</td>
                <td>{{ item.user?.name }}</td>
                <td>{{ `${item.before ? item.before : '회원'} > ${item.after}`}}</td>
                <!-- TODO status case 별로 css 필요,  -->
                <td>
                  <div :class="getStatusClass(item.status)" @click="openApprovalModal(item)">
                    {{ item.status }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <modal
        v-if="activeModal"
        @cancel="activeModal = false;"
      >
        <template #inner>
          <div class="m-pop-title" style="margin-top:-40px; text-align:left;">
              결재처리
          </div>
          <div class="summary">
            결재내용:
            {{ activatedItem.district.district }}
            {{ activatedItem.user.name }}
            {{ `${activatedItem.before ? activatedItem.before : '회원'} > ${activatedItem.after}`}}
          </div>
          <div class="m-input-checkboxes type01">
              <div class="m-input-checkbox">
                  <input type="radio" id="11" value="대기" v-model="activatedItem.status">
                  <label for="11">대기</label>
              </div>
              <div class="m-input-checkbox">
                  <input type="radio" id="12" value="승인" v-model="activatedItem.status">
                  <label for="12">승인</label>
              </div>
              <div class="m-input-checkbox">
                  <input type="radio" id="13" value="반려" v-model="activatedItem.status">
                  <label for="13">반려</label>
              </div>
          </div>
          <div class="m-pop-title" style="margin: 12px 0; text-align: left;">
              결재의견
          </div>
          <div class="m-input-textarea type01 lightgrey">
              <textarea style="background:#eee" maxlength="136" v-model="activatedItem.memo" placeholder="결재의견을 입력해주세요" cols="30" rows="10"></textarea>
          </div>
          <div class="mt-20"></div>

        <div class="m-btns type01">
            <div class="m-btn-wrap" @click="activeModal = false;">
                <a class="m-btn type01" style="background-color:white; color:black; border:1px solid #eee; font-weight:300;">취소</a>
            </div>
            <div class="m-btn-wrap" @click="deleteActivated">
                <a class="m-btn type01" style="background-color:white; color:red; border:1px solid red; font-weight:300;">삭제</a>
            </div> 
            <div class="m-btn-wrap" @click="settle">
                <a class="m-btn type01 bg-lightGray" style="color:black; font-weight:300;">완료</a>
            </div>
        </div>
        </template>
      </modal>
      <scroll-loading @load="loadMore" v-if="links.next" />
      <div class="m-navigation type01" style="opacity:0.9" v-show="selectedItems.length > 0">
        <div class="navs">
          <div class="nav-wrap" style="padding:0 20px;">
            <div class="m-btns type01">
              <div class="m-btn-wrap" @click="selectedItems = []">
                  <a class="m-btn type01"  style="background-color:#eee; color:black; border:1px solid #eee; font-weight:300;">선택 취소</a>
              </div>
              <div class="m-btn-wrap" @click="allChecked = true">
                <a class="m-btn type01"  style="background-color:#eee; color:black; border:1px solid #eee; font-weight:300;">전체 선택</a>
              </div>
            </div>
            <div class="m-btns type01">
              <div class="m-btn-wrap" @click="settleSelected(false)">
                  <a class="m-btn type01"  style="background-color:#eee; color:black; border:1px solid #eee; font-weight:300;">선택 반려</a>
              </div>
              <div class="m-btn-wrap" @click="settleSelected(true)">
                  <a class="m-btn type01 bg-primary" style="font-weight:300;">선택 승인</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import common from '@/utils/common.js'
export default {
  mixins: [common],
  // middleware({store, redirect}) {
  //     if(!store.$auth.hasScope('manager')) {
  //       redirect('/')
  //     }
  // },
  data() {
    return {
      page: 1,
      links: {},
      meta: {},

      toggledItems:[],
      selectedItems:[],
      originalItems:[],
      allChecked: false,
      
      toggleList: '',

      activeModal: false,
      activatedItem: null,
      toggleModalApprovalState:'',
      countyInfo:{},
    }
  },
  watch: {
    allChecked: function (val) {
      if (val) {
        this.selectedItems = [...this.toggledItems];
      } else {
        this.selectedItems = [];
      }
    },
    toggleList: function (val) {
      this.allChecked = false;
      switch(val) {
        case 'all':
          this.toggledItems = [...this.originalItems];
          break;
        case 'waiting':
          this.toggledItems = [...this.originalItems.filter(item => item.status === '대기')];
          break;
        case 'approved':
          this.toggledItems = [...this.originalItems.filter(item => item.status === '승인')];
          break;
        case 'declined':
          this.toggledItems = [...this.originalItems.filter(item => item.status === '반려')];
          break;
      }
    }
  },
  computed: {

  },
  methods: {
    async checkManagerAuth(item) {
        const response = await this.$axios.get(`/api/districts/1/members/check-manager`, {
            params: {
                phone: item.phone,
            }
        });
        if(response.data === false) {
          this.$router.push("/");
        }else {
          this.countyInfo = Object.assign({}, {
            state: response.data.state,
            city: response.data.city,
            district: response.data.district,
            district_id: response.data.district_id,
          });
          await this.getApprovalList()
        }
    },
    loadMore(state) {
        if(this.meta.current_page <= this.meta.last_page){
            this.page += 1;

            this.$axios.get(`/api/districts/${this.countyInfo.district_id}/approval`, {
                params: {
                    page: this.page,
                    meta: this.meta,
                    links: this.links
                }
            }).then(response => {
                this.originalItems = [ ...this.originalItems,...response.data.data];
                this.toggledItems = [...this.originalItems];
                this.toggleList = 'all';
                this.links = response.data.links;
                this.meta = response.data.meta;
                state.loaded();
            });
        }
    },
    getItems(){
        this.form.page = 1;

        this.$axios.get(`/api/districts/${this.countyInfo.district_id}/members`)
            .then(response => {
                this.items = response.data;
            });
    },

    async getApprovalList() {
      const response = await this.$axios.get(`/api/districts/${this.countyInfo.district_id}/approval`)
        if(response.status === 200) {
          this.originalItems = [...response.data.data];
          this.toggledItems = [...this.originalItems];
          this.toggleList = 'all';
          this.links = response.data.links;
          this.meta = response.data.meta;
        };
    },
    getStatusClass(status) {
      switch(status) {
        case '승인':
          return 'status approve';
        case '반려':
          return 'status reject';
        case '대기':
          return 'status wait';
        default:
          return '';
      }

    },
    openApprovalModal(item) {
      this.activatedItem = {...item};
      this.activeModal = true;
    },

    async deleteActivated() {
      const targetId = this.activatedItem.id;
      if(confirm('삭제하시겠습니까?')) {
        const response = await this.$axios.delete(`/api/districts/${this.countyInfo.district_id}/approval`, {
          data: 
            {
              id: targetId, 
            }
          
        });
        if(response.status === 200) {
          this.originalItems = [...this.originalItems.filter(item => item.id !== targetId)];
          this.toggledItems = [...this.toggledItems.filter(item => item.id !== targetId)];
          this.activeModal = false;
        }
      }
    },

    async settle() {
      const targetId = this.activatedItem.id;
      const targetItem = this.toggledItems.find(item => item.id === targetId);
      const candidates = this.toggledItems.filter(item => (item.after === targetItem.after && item.id !== targetId));
      if(this.areObjectsEqual(this.activatedItem,targetItem)) {
        alert('변경된 내용이 없습니다. 창을 닫습니다.');
        this.activeModal = false;
        return;
      }
      if(this.activatedItem.memo !== targetItem.memo && this.activatedItem.status === targetItem.status) {
        //결재의견만 업데이트하고 단독저장
        const response = await this.$axios.post(`/api/districts/${this.countyInfo.district_id}/approval/update`, {
          data: [
            {
              id: targetId, 
              status: this.activatedItem.status, 
              memo: this.activatedItem.memo,
              user_id: this.activatedItem.user.id,
              before: this.activatedItem.before,
              after: this.activatedItem.after,
            }
          ]
        });
        if(response.status === 200) {
          alert('결재의견이 저장되었습니다.');
          this.activeModal = false;
          await this.getApprovalList();
        };
      }

      //반려,대기인 경우 단독저장
      if(this.activatedItem.status == '반려' || this.activatedItem.status == '대기') {
        const response = await this.$axios.post(`/api/districts/${this.countyInfo.district_id}/approval/update`, {
          data: [
            {
              id: targetId, 
              status: this.activatedItem.status, 
              memo: this.activatedItem.memo
            }
          ]
        });
        if(response.status === 200) {
          alert(`${this.activatedItem.status} 처리되었습니다.`)
          this.activeModal = false;
          await this.getApprovalList();
        };
      }

      //승인인 경우 after가 같은 나머지 케이스(candidates) 한꺼번에 반려처리하여 array 저장
      if(this.activatedItem.status == '승인') {
        const data = [
          ...candidates.map(item => {
            return {
              id: item.id, 
              status: '반려', 
              memo: item.memo
            }
          }),
          {
            id: targetId, 
            status: this.activatedItem.status, 
            memo: this.activatedItem.memo
          }
        ]
        const response = await this.$axios.post(`/api/districts/${this.countyInfo.district_id}/approval/update`, {data});
        if(response.status === 200) {
          alert('승인 처리되었습니다.')
          this.activeModal = false;
          await this.getApprovalList();
        };
      }

    },

    async settleSelected(statusFlag) {
      const status = statusFlag ? '승인' : '반려';
      if(statusFlag) {
        const result = this.findDuplicatedValuesForProp(this.selectedItems, 'after');
        if(result.length > 0) return alert('같은 직책에 두 명 이상 인원을 승인할 수 없습니다.');
      }
      if(confirm(`${this.selectedItems.length}건을 ${status} 처리하시겠습니까?`)) {
        const response = await this.$axios.post(`/api/districts/${this.countyInfo.district_id}/approval/update`, {
          data: [
            ...this.selectedItems.map(item => {
              return {
                id: item.id, 
                status, 
                memo: item.memo,
                user_id: item.user.id,
                before: item.before,
                after: item.after,
              }
            })
          ]
        });
        if(response.status === 200) {
          alert(`${status} 처리되었습니다.`);
          this.activeModal = false;
          await this.getApprovalList();
        };
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

<style>

  .border-bottom td {
    height: inherit;
    border-bottom:1px solid #d4d4d4;
  }
  .h-55 {
    height: 55px;
  }
  .status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40px;
    height: 30px;
    border-radius: 5px;
    align-content:center;
    font-size: 12px;
  }
  .status.approve {
    background-color: #ffca10;
  }
  .status.reject {
    background-color: #ff0000;
    color: white;
  }
  .status.wait {
    background-color: #DDD;
  }

  .summary {
    width: 100%;
    height: fit-content;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #d4d4d4;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin-bottom: 10px;
  }
</style>