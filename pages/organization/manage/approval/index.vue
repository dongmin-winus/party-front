<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">결재서 작성</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div> 

    <div class="container">
      <div class="wrap">
        <div class="direction">
          <span class="number" :class="checked('checkOne')">{{checkOne ? '✓' : 1}}</span>
          <span class="dots">⋯</span>
          <span class="number" :class="checked('checkTwo')">{{checkTwo ? '✓' : 2}}</span>
          <span class="dots">⋯</span>
          <span class="number" :class="checked('checkThree')">{{checkThree ? '✓' : 3}}</span>
        </div>

        <div class="phase-one" v-if="phase == 1">
          <Phase
            @change="debouneSearch"
            :title1="`결재요청하실 내용을`"
            :title2="`선택해주세요`"
            :searchActivated="false"
          />
        </div>
        <div class="phase-two" v-if="phase == 2">
          <Phase
            @change="debouneSearch"
            :title1="`해임하실 대상을`"
            :title2="`선택해주세요`"
          />
        </div>
        <div class="phase-three" v-if="phase == 3">
          <Phase
            @change="debouneSearch"
            :title1="`해임하신 사유를`"
            :title2="`선택해주세요`"
            :searchActivated="false"
          />
        </div>
      </div>
      <List 
        :phase="phase"
        :list="computedList"
        @pick="pickItem"
      />
    </div>
    <div class="mt-12"></div>
    <div class="m-btns type01 stretch">
        <div class="m-btn-wrap">
            <a href="#" class="m-btn type03 light bg-revert-grey" @click.prevent="$router.go(-1)">취소</a>
        </div>
        <div class="m-btn-wrap">
            <a href="#" class="m-btn type03 light bg-primary" @click.prevent="nextPhase">다음</a>
        </div>
    </div>
    <navigation />
    <modal v-if="completeModal" @cancel="completeModal = false;">
      <template #inner>
        <div class="center">
          <Yea/>
          <div class="m-pop-title">
            <span class="yea">결재서 작성이</span><br/>
            <span class="yea">완료되었습니다.</span>
          </div>

          <p class="mt-12">나의 결재현황에서</p>
          <p>결재상태를 확인가능합니다.</p>
        </div>

        <div class="mt-20"></div>
        <nuxt-link to="/organization/manage/myApprovalList" style="font-weight:400;" class="m-btn type02 bg-revert-grey width-100">나의 결재현황 가기</nuxt-link>
        <div class="mt-8"></div>
        <nuxt-link to="/organization/manage" class="m-btn type02 bg-revert-primary width-100">조직관리 홈</nuxt-link>
      </template>
    </modal>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce';
import Phase from '@/components/organization/manage/Phase.vue';
import List from '@/components/organization/manage/approval/List.vue';
import Yea from '@/components/organization/Yea.vue';
export default {
  components: {
    Phase,
    List,
    Yea,
  },
  data() {
    return {
      checkOne: false,
      checkTwo: false,
      checkThree: false,
      picked: null,
      completeModal: false,
      approvalTypeList:[
        {
          id:1,
          type: "해임",
        },
        {
          id:2,
          type: "사임",
        },
      ],
      nameList: [
       {
        id:1,
        name: "김철수",
        phone: "01012345678",
       },
       {
        id:2,
        name: "김영희",
        phone: "01012345678",
        },
        {
          id:3,
          name: "홍길동",
          phone: "01012345678",
        },
        {
          id:4,
          name: "이순신",
          phone: "01012345678",
        },
        {
          id:5,
          name: "유관순",
          phone: "01012345678",
        },
        {
          id:6,
          name: "김유신",
          phone: "01012345678",
        },
        {
          id:7,
          name: "이성계",
          phone: "01012345678",
        },
        {
          id:8,
          name: "이순신",
          phone: "01012345678",
        },
        {
          id:9,
          name: "유관순",
          phone: "01012345678",
        },
        {
          id:10,
          name: "김유신",
          phone: "01012345678",
        },
        {
          id:11,
          name: "이성계",
          phone: "01012345678",
        },
        {
          id:12,
          name: "이순신",
          phone: "01012345678",
        },
        {
          id:13,
          name: "유관순",
          phone: "01012345678",
        },
        {
          id:14,
          name: "김유신",
          phone: "01012345678",
        },
        {
          id:15,
          name: "이성계",
          phone: "01012345678",
        }
      ],
      reasonList:[
        {
          id:1,
          reason: "본부 공적 행사 5회 이상 불참.",
        },
        {
          id:2,
          reason: "12명 통대표 유지 못함. (유예기간 : 2주 초과)",
        },
        {
          id:3,
          reason: "공동체에 불란을 일으킴. (싸움, 이간질)",
        },
        {
          id:4,
          reason: "조직을 사익에 이용.",
        },
        {
          id:5,
          reason: "애국활동 관련 본부의 목적과 반하는 언행을 함.",
        },
        {
          id:6,
          reason: "기타",
        },
      ],
      
    }
  },
  computed: {
    phase() {
      return this.checkOne && !this.checkTwo ? 2 : this.checkTwo ? 3 : 1;
    },
    computedList() {
      return this.phase == 1 ? this.approvalTypeList : this.phase == 2 ? this.nameList : this.reasonList;
    },
  },
  watch: {
    phase(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.picked = null;
      }
    }
  },
  methods: {
    checked(name) {
      return this[name] ? 'checked' : '';
      
    },
    search(searchText) {
      console.log(searchText, 'debounced');
    },
    pickItem(item) {
      this.picked = item;
    },
    nextPhase() {
      if(this.phase == 1 && this.picked === null) {
        alert('결재요청 유형을 선택해주세요');
        return;
      }
      if(this.phase == 2 && this.picked === null) {
        alert('대상을 선택해주세요');
        return;
      }
      if(this.phase == 3 && this.picked === null) {
        alert('사유를 선택해주세요');
        return;
      }
      console.log(this.phase, 'phase')
      if(this.phase == 1) {
        this.checkOne = true;
        window.scrollTo(0, 0);
      }else if(this.phase == 2) {
        this.checkTwo = true;
        window.scrollTo(0, 0);
      }else if(this.phase == 3) {
        this.checkThree = true;
        window.scrollTo(0, 0);
        this.completeModal = true;
      }
        
    },
  },
  created() {
    this.debouneSearch = debounce(search => this.search(search), 500);
  
  }
}
</script>

<style scoped>
  .container {
    min-height: calc(90vh - 100px);
  }
  .container .wrap {
    display: flex;
    flex-direction: column;
    height: 95%;
  }
  .direction {
    display: flex;
  }
  .number {
    display:flex;
    justify-content: center;

    width: 30px;
    height: 30px;
    background-color: #DE0000;
    border-radius: 50%;
    color: #fff;

    margin-top: 10px;
  }

  .number.checked {
    opacity: 0.4;
  }
  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #DE0000;
    margin: 10px 5px 10px 5px;
  }
  .center { 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .center p {
    font-size: 20px;
    margin: 0;
  }

  .yea {
    font-size: 24px !important;
    font-weight: 600;
    font-family: 'gmarketSans';
    color: #0baf00;
  }
</style>

