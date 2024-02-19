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
          <h3 class="title">후임 동대표 임명</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div> 

    <div class="container">
      <div class="wrap">
        <Phase
          @change="debouneSearch"
          :title1="`후임동대표를`"
          :title2="`선택해주세요`"
          :searchActivated="true"
        />
      </div>
      <List 
        :phase="2"
        :list="nameList"
        @pick="pickItem"
      />
    </div>
    <div class="mt-12"></div>
    <div class="m-btns type01 stretch">
        <div class="m-btn-wrap">
            <a href="#" class="m-btn type03 light bg-revert-grey" @click.prevent="$router.go(-1)">취소</a>
        </div>
        <div class="m-btn-wrap">
            <a href="#" class="m-btn type03 light bg-primary" @click.prevent="onComplete">완료</a>
        </div>
    </div>
    <navigation />
    <modal v-if="completeModal" @cancel="completeModal = false;">
      <template #inner>
        <div class="center">
          <Yea/>
          <div class="m-pop-title">
            <span class="yea">후임 동대표 임명이</span><br/>
            <span class="yea">완료되었습니다.</span>
          </div>

          <p class="mt-12">조직활동-조직도에서</p>
          <p>확인하실 수 있습니다.</p>
        </div>

        <div class="mt-20"></div>
        <nuxt-link to="/organization/brief" style="font-weight:400;" class="m-btn type02 bg-revert-grey width-100">조직도 가기</nuxt-link>
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
    Yea
  },
  data() {
    return {
      picked: null,
      completeModal: false,
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
    }
  },
  methods: {
    search(searchText) {
      console.log(searchText, 'debounced');
    },
    pickItem(item) {
      this.picked = item;
    },
    onComplete() {
      if(!this.picked) return alert('후임동대표를 선택해주세요');
      this.completeModal = true;
    }
  },
  created() {
    this.debouneSearch = debounce(search => this.search(search), 500);
  
  }
}
</script>

<style scoped>
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