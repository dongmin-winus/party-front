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
          <h3 class="title">인원 분배</h3>
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
        </div>

        <div class="phase-one" v-if="phase == 1">
          <Phase
            @change="debouneSearch"
            :title1="`팀 생성을 위해`"
            :title2="`팀원들을 선택해주세요`"
          />
        </div>
        <div class="phase-two" v-if="phase == 2">
          <Phase
            @change="debouneSearch"
            :title1="`팀 생성을 위해`"
            :title2="`동대표를 선택해주세요`"
          />
        </div>
      </div>
      <List
        v-if="phase == 1"
        @select="selectItem"
        :list="list"
        type="checkbox"
      />
      <List
        v-if="phase == 2"
        @select="selectItem"
        :list="selected"
        type="radio"
      />

    </div>
    <div class="mt-12"></div>
    <div class="m-btns type01">
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
            <span class="yea">A+ 홍길동 동대표</span><br/>
            <span class="yea">조직 생성되었습니다!</span>
          </div>

          <p class="mt-12">생성된 조직은 조직도에서</p>
          <p>확인가능합니다.</p>
        </div>

        <div class="mt-20"></div>
        <nuxt-link to="/organization/manage" style="font-weight:400;" class="m-btn type02 bg-revert-grey width-100">나중에하기</nuxt-link>
        <div class="mt-8"></div>
        <div @click="reload" class="m-btn type02 bg-revert-primary width-100">계속해서 인원 분배</div>
      </template>
    </modal>
  </div>
</template>

<script>
import Phase from '~/components/organization/manage/Phase.vue';
import List from '~/components/organization/manage/distribute/List.vue';
import Yea from '@/components/organization/Yea.vue';
import { debounce } from '@/utils/debounce';
export default {
  components: {
    Phase, List, Yea
  },
  computed: {
    phase() {
      if (this.checkOne) {
        return 2;
      }
      return 1;
    },
    computedList() {
      return this.phase == 1 ? this.list : this.selected;
    },
    computedType() {
      return this.phase == 1 ? 'checkbox' : 'radio';
    }
  },
  data() {
    return {
      checkOne: false,
      checkTwo: false,
      list: [
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
      selected: [],
      completeModal: false,
    }
  },
  methods: {
    checked(name) {
      return this[name] ? 'checked' : '';
      
    },
    search(searchText) {
      console.log(searchText, 'debounced');
    },
    selectItem(item) {
      this.selected = item;
    },
    nextPhase() {
      if(this.phase == 1 && this.selected.length !== 12) {
        alert('12명을 선택해주세요');
        return;
      }
      if(this.phase == 2 && this.selected.length !== 1) {
        alert('동대표를 선택해주세요');
        return;
      }
      if(this.phase == 1) {
        this.checkOne = true;
        //window scroll to top
        window.scrollTo(0, 0);
      }else if(this.phase == 2) {
        this.checkTwo = true;
        //window scroll to top
        window.scrollTo(0, 0);
        console.log(this.selected, '동대표 selected')
        this.completeModal = true;
      }
        
    },
    reload() {
      location.reload();
    }
  },
  created() {
    this.debouneSearch = debounce(search => this.search(search), 500);
  
  }
}
</script>

<style scoped>
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
    background-color: #0baf0b;
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
    color: #0baf0b;
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