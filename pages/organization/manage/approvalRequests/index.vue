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
          <h3 class="title">결재 리스트</h3>
        </div>
        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div> 

    <div class="container">
      <div class="wrap">
        <div class="mt-12 m-board-btns">
            <div class="m-btns type01">
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type03 light" :class="activeBtn1" @click.prevent="toggleBtn = !toggleBtn">대기</a>
                </div>
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type03 light" :class="activeBtn2" @click.prevent="toggleBtn = !toggleBtn">처리완료</a>
                </div>
            </div>
        </div>
      </div>

      <div class="mt-12 box-table">
        <table class="m-table type02 noborder">
          <thead>
            <tr bgcolor="#e5e5e5">
              <th>날짜</th>
              <th>이름</th>
              <th>내용</th>
              <th>상태</th>
            </tr>
            <tr v-for="(item, index) in toggleList" :key="index" class="border-bottom">
              <td style="width:80px;">{{`${formatDate(item.created_at)}`}}</td>
              <td>{{ item.target?.name }}</td>
              <td>{{ item.approval_type}}</td>
              <td class="btn-center">
                <nuxt-link :class="getStatusClass(item.status)" :to="`${dir}/${item.id}`">
                  {{ item.status }}
                </nuxt-link>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <navigation />
  </div>
</template>

<script>
import common from '@/utils/common.js';
export default {
  mixins: [common],
  computed: {
    activeBtn1() {
      return this.toggleBtn ? 'bg-red' : 'bg-revert-grey';
    },
    activeBtn2() {
      return this.toggleBtn ? 'bg-revert-grey' : 'bg-primary';
    },
    toggleList() {
      return this.toggleBtn ? this.waitList : this.completeList;
    },
    waitList() {
      return this.list.filter(item => item.status === '대기');
    },
    completeList() {
      return this.list.filter(item => item.status !== '대기');
    }
  },
  data() {
    return {
      dir: '/organization/manage/approvalRequests',
      toggleBtn : true,
      list:[
        {
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
          status: '대기'
        },
        {
          id:2,
          created_at: '2021-08-02',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김영희2',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '승인'
        },
        {
          id:3,
          created_at: '2021-08-03',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김철수3',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '대기'
        },
        {
          id:4,
          created_at: '2021-08-04',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김영희4',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '반려'
        },
        {
          id:5,
          created_at: '2021-08-05',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김철수5',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '대기'
        },
        {
          id:6,
          created_at: '2021-08-06',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김영희6',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '승인'
        },
        {
          id:7,
          created_at: '2021-08-07',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김철수7',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '대기'
        },
        {
          id:8,
          created_at: '2021-08-08',
          assignor: {
            name: '홍길동',
            position: '실행위원'
          },
          target: {
            name: '김영희8',
            position: '동대표'
          },
          approval_type: '해임',
          reason: {
            main: '본부 공적 행사 5회 이상 불참',
            sub: '임명 된 이후로 행사에 참석한 적이 없음.'
          },
          status: '승인'
        },
      ]
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
  },
}
</script>

<style scoped>
  .border-bottom td {
    height: inherit;
    border-bottom:1px solid #d4d4d4;
    font-size: 18px;
    font-weight: 400;
  }
  .status {
    display: flex;
    justify-content: center;
    width: 60px;
    height: 50px;
    border-radius: 5px;
    font-size: 16px;
    margin-left: calc(50% - 30px);
    margin-right: calc(50% - 30px);
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
    background-color:#fff;  

  }
</style>