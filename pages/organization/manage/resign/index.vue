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
          <h3 class="title">사임서 작성</h3>
        </div>

        <!-- <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link> -->
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div> 
    <div class="container">
      <div class="wrap">
        <div class="mt-16 m-input-wrap">
          <h3 class="m-input-title type01">사임날짜</h3>
            <div class="m-input-text type03 relative">
              <input readonly v-model="computedResignDate" type="text" @click="toggleCalendar" placeholder="날짜를 선택해주세요">
              <span class="close-btn" v-if="selectedDate" @click="resetDate">X</span>
            </div>
            <client-only>
              <v-date-picker 
                v-if="showCalendar"
                locale="ko"
                is-expanded
                color="green"
                :min-date="new Date()"
                v-model="selectedDate"
              />
            </client-only>
        </div>
        <div class="mt-24 m-input-wrap">
          <h3 class="m-input-title type01">사유</h3>
          <div class="m-input-textarea type01" >
            <textarea v-model="reason" class="reason-conatiner" style="background-color:#eee;" rows="5" placeholder="사임 사유를 작성해 주세요"></textarea>
          </div>
          <div class="mt-24 quote">
            <p>위 본인은 상기와 같은 사유로</p>
            <p>자유마을 임원직을 사임하고자</p>
            <p>이에 사임서를 제출합니다.</p>
          </div>
        </div>
        <div class="mt-24 m-btns type01 stretch">
            <div class="m-btn-wrap">
                <a href="#" class="m-btn type01 bg-revert-grey" @click.prevent="$router.back()">취소</a>
            </div>
            <div class="m-btn-wrap">
                <a href="#" class="m-btn type01 bg-primary" @click.prevent="">완료</a>
            </div>
        </div>
      </div>
    </div>
    <navigation />
  </div>
</template>

<script>
export default {
  computed: {
    computedResignDate() {
      if(!this.selectedDate) return;
      if(this.selectedDate instanceof Date) {
        return this.getDateString(this.selectedDate);
      }
    },
  },
  watch: {
    selectedDate() {
      this.showCalendar = false;
    }
  },
  data() {
    return {
      showCalendar: false,
      selectedDate: null,
      reason: '',
    }
  },
  methods: {
    getDateString(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    resetDate() {
      this.selectedDate = null;
    },
    closeCalendar() {
      if(this.showCalendar) this.showCalendar = false;
    },
    calcBodyHeight() {
      const header = document.querySelector('.m-header');
      const container = document.querySelector('.container');
      const height = window.innerHeight - header.clientHeight;
      container.style.height = `${height}px`;
    }
  },
  mounted () {
    this.calcBodyHeight();
  },
}
</script>

<style scoped>
  .container .wrap {
    display: flex;
    flex-direction: column;
    height: 95%;
  }
  .container .wrap .stretch {
    flex-grow: 1;
    align-content: flex-end;
  }
  input::placeholder, textarea::placeholder {
    color: black;
  }
  .relative {
    position: relative;
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .reason-conatiner {
    font-size: 18px !important;
  }
  .quote p {
    font-size: 22px;
    text-align: center;
  }


</style>