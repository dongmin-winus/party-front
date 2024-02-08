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
          <h3 class="title">결재 상세내역</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div> 

    <div class="container">
      <div class="wrap">
        <div class="mt-24 m-input-wrap">
          <h3 class="m-input-title type01">상태</h3>
          <div style="font-weight:400;" :class="getStatusClass(item.status)">{{item.status}}</div>
        </div>
        <div class="mt-24 m-input-wrap">
            <h3 class="m-input-title type01">신청인</h3>
            <div class="m-input-text type03">
                <input type="text" readonly v-model="assignor">
            </div>
        </div>
        <div class="mt-24 m-input-wrap">
            <h3 class="m-input-title type01">해임사유</h3>
            <div class="m-input-text type03">
                <input type="text" readonly v-model="item.reason.main">
            </div>
        </div>
        <div class="mt-24 m-input-textarea type01 lightgrey">
          <h3 class="m-input-title type01">추가사유 </h3>
          <textarea readonly style="background:#fff; font-size:18px;" maxlength="136" v-model="item.reason.sub" cols="30" rows="10"></textarea>
        </div>
        <div class="mt-24 m-input-wrap">
            <h3 class="m-input-title type01">해임대상</h3>
            <div class="m-input-text type03">
                <input type="text" readonly v-model="item.target.name">
            </div>
        </div>
      </div>
    </div>
    <navigation />


  </div>
</template>

<script>
import Yea from '@/components/organization/Yea.vue';
import Nay from '@/components/organization/Nay.vue';
export default {
  components: {
    Yea,
    Nay
  },
  computed: {
    assignor() {
      return `${this.item.assignor.name} ${this.item.assignor.position}`;
    },
  },
  data() {
    return {
      submitModal: false,
      submitStatus: '', 
      item: {
        id:1,
        created_at: '2021-08-01',
        assignor: {
          name: '홍길동',
          position: '실행위원'
        },
        target: {
          name: '김철수1',
          position: '동대표'
        },
        approval_type: '해임',
        reason: {
          main: '본부 공적 행사 5회 이상 불참',
          sub: '임명 된 이후로 행사에 참석한 적이 없음.'
        },
        status: '대기',
      },
    }
  },
  methods: {
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
    submit(type) {
      this.submitModal = true;
      type === 'yea' ? this.submitStatus = 'yea' : this.submitStatus = 'nay';
    }
  }
}
</script>

<style scoped>
  .container {
    height: calc(100vh - 100px);
    overflow: scroll;
  }
  .container .wrap {
    display: flex;
    flex-direction: column;
    height: 95%;
  }
  .status {
    display: flex;
    width:100%;
    height: 50px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    font-size: 22px;
  }
  .status.approve {
    background-color: #ffca10;
  }
  .status.reject {
    background-color: #ff0000;
    color: white;
  }
  .status.wait {
    border: 1px solid #BDC3C7;
    background-color:#BDC3C7;  

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
    font-size: 22px !important;
    font-weight: 600;
    font-family: 'gmarketSans';
    color: #0baf00;
  }
  .nay {
    font-size: 22px !important;
    font-weight: 600;
    font-family:'gmarketSans';
    color: #ff0000;
  }
</style>