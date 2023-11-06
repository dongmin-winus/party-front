<template>
  <div class="area-order-slide">
    <div class="background" v-if="active" @click.stop="handleBackdropClick($event, 'background')">
      <div class="slide-container" v-if="active">
        <section class="mt-20 info-section">
          <div class="title-container">
            <p class="title" style="font-weight:bold; font-size:xx-large">{{ inventory.name }}</p>
            <p class="description" style="color:#777">{{ inventory.definition }}</p>
          </div>
          <div class="info">
            <span class="title">재고 현황</span>
            <span class="value">{{ inventory.stock }}개 남음</span>
          </div>
          <div class="info">
            <span class="title">배송비</span>
            <span class="value">{{ inventory.shipping_fee }}</span>
          </div>
          <div class="info" v-if="inventory?.type === 'newspaper'" @click="toggleCalendar = !toggleCalendar">
            <div class="solid-btn" v-if="!toggleCalendar">
              <div class="left no-border">
                <span class="sub">날짜 선택</span>
                <span class="cal-title primary">{{ selectedDate ? selectedDate : computedCurrentDate }}</span>
              </div>
              <div class="right no-border">
                ❯
              </div>
            </div>
            <div class="calendar-container no-border" v-if="toggleCalendar">
              <client-only>
                <v-date-picker
                  v-if="toggleCalendar"
                  locale="ko"
                  is-expanded
                  color="green"
                  :max-date="new Date()"
                  v-model="selectedDate"
                  @input="toggleCalendar = false"
                />
              </client-only>
            </div>
          </div>
          <div class="info no-border">
            <div class="title">수량 선택</div>
            <Counter 
              :propStock="inventory?.stock"
              :width="'70%'"
              :height="'40px'"
            />
          </div>
        </section>
        <section class="mt-12 btn-section">
            <div class="m-btn type02 bg-revert-primary">
              픽업신청
            </div>
            <div class="m-btn type02 bg-primary">
              배송신청
            </div>
          </section>
      </div>
    </div>

  </div>
  
</template>

<script>
import Counter from '@/components/Counter.vue';
import common from '@/utils/common';
export default {
  name: 'SelectOrderSlide',
  components: { Counter },
  mixins: [common],
  props: {
    inventory: {
      type: Object,
      default: () => {},
    },
    propActive: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    transitionName() {
      return this.active ? 'slide-down' : 'slide-up'; 
    },
    computedCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일`;
    },
  },
  watch: {
    propActive: {
      handler: function (val) {
        this.active = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      active: undefined,
      selectedDate : null,
      toggleCalendar: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
  .background {
    display:flex; align-items: end; justify-content: center;
    width:100%; height:100%; 
    position:fixed; top:0; left:0;
    background-color:rgba(0,0,0,0.5);
    z-index:100;
  }
  .slide-container {
    width:100%; max-width:500px;
    max-height:100vh;
    padding:0 30px; 
    position:relative;
    background-color:#fff; border-radius:5px;
  }
  .slide-container .info-section {

    display:flex; flex-direction:column;
    justify-content: start;
  }
  .slide-container .info-section div {
    border-bottom:1px solid #e1e1e1;
    padding:20px 0;
  }
  .slide-container .info-section .info {
    display:flex;
    align-content: start;
  }

  .slide-container .info-section .solid-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #777;
    border-radius: 5px;
    width: 100%;
    height: 100px;
  } 
  .slide-container .info-section .solid-btn .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 40vw;
    margin-left: 15px;
  }
  .slide-container .info-section .solid-btn .left .sub {
    font-size: 16px;
    color: #777;
  }
  .slide-container .info-section .solid-btn .left .cal-title {
    font-size: 20px;
    font-weight:500;
  }
  .slide-container .info-section .solid-btn .right {
    margin-right: 15px;
    font-size: x-large;
    color: #777;
  }
  .slide-container .info-section .info {
    position:relative;
  }

  .slide-container .info-section .info.no-border {
      border-bottom:none;
  }
  .slide-container .info-section .info .no-border {
      border-bottom:none;
  }
  .slide-container .info-section .info .title {
      width: 20vw;
  }
  .slide-container .info-section .info .value {
    color:#777;
  }
  .slide-container .info-section .info span {
      flex: 0 0 auto;
      margin-right: 10px;
  }

  .slide-container .info-section .info .calendar-container {

    width:100%; height:100%;
    background-color:#fff;
    z-index:100;

  }

  .slide-container .btn-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top:12px;
  }
  .slide-container .btn-section div {
    width: 48%;
    height: 50px;
  }
</style>
