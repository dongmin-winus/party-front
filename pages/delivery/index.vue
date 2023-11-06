<template>
  <div class="area-delivery">
    <!-- 헤더 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util">
            <div @click="$router.go(-1)">
                <img src="@/assets/images/back.png" alt="" style="width:10px;">
            </div>
          </button>
        </div>

        <div class="center">
          <h3 class="title">물품 신청</h3>
        </div>
        <div class="right"></div>
      </div>
    </div>

    <!-- 본문 -->
    <div class="container">

      <div class="mt-32"></div>
      <div class="wrap">
        <div class="m-title type01 primary">
            <p class="sub03">애국자분들을 위한</p>
            물품 무료 지급 서비스
        </div>
        <div class="mt-12"></div>
      </div>

      <section class="menu-section">
        <nuxt-link to="/delivery/requisition" class="menu application">
          <div class="title">
            <p class="sub">애국운동?!전폭지원!</p>
            <p class="main">물품 신청하기</p>
          </div>
          <div class="img">
            <img src="@/assets/images/parasole02.png" alt="">
          </div>
        </nuxt-link>
        <div class="menu address">
          <div class="title">
            <p class="sub">물품받을 기본배송지</p>
            <p class="main">배송지 관리</p>
          </div>
          <div class="img">
            <img src="@/assets/images/teakbae.png" alt="">
          </div>
        </div>
      </section>

      <section v-if="current_order" class="current-order-section">
        <div class="title">
          <div class="main">물품조회</div>
          <nuxt-link :to="{name:'delivery-id', params:{id:`${current_order.order_id}`}, query:{searchType:'current'}}" class="sub">신청 상세보기 ⟩</nuxt-link>
        </div>
        <div class="mt-12 item-container">
          <div class="order-date">{{current_order.order_date}} 신청</div>
          <div class="order-state">
            <div class="state">
              {{current_order.order_state}}
              <template v-if="current_order.order_state === '배송중'">
                <div style="color:#0BAF00; font-weight:500">({{current_order.delivery_date}} 배송예정)</div>
              </template>  
            </div>
            <div class="img" style="padding-top:5px;">
              <img :src="require(`@/assets/images/${setOrderImage(current_order.order_type)}`)" alt="">
            </div>
          </div>
          <div class="order-item" v-for="item in current_order.items">
            <div class="item-type">
              {{setItemType(item.type)}}
              <template v-if="item.type === 'newspaper'">
                {{ item.news_date }}
              </template>
            </div>
            <div class="item-amount">{{item.amount}}개</div>
          </div>
        </div>
      </section>
      <section class="mt-12 past-orders-section">
        <div class="title">
          <div class="main">물품 신청 목록</div>

          <div class="mt-12 m-input-checkboxes type01">
            <div class="mt-8"></div>
            <div class="m-input-checkbox">
                <input type="radio" id="1" value="total" v-model="toggleType">
                <label for="1">전체</label>
            </div>
            <div class="m-input-checkbox">
                <input type="radio" id="2" value="delivery" v-model="toggleType">
                <label for="2">택배</label>
            </div>
            <div class="m-input-checkbox">
                <input type="radio" id="3" value="pickup" v-model="toggleType">
                <label for="3">픽업</label>
            </div>
          </div>
        </div>
        <div class="mt-12 item-container" v-for="past_item in setPastOrderList(toggleType)">
          <div class="order-date">
            <p class="main">{{past_item.order_date}} 신청</p>
            <nuxt-link :to="{name:'delivery-id', params:{id:`${past_item.order_id}`},query:{searchType:'past'}}" class="sub">신청 상세보기 ⟩</nuxt-link>
          </div>
          <div class="order-state">
            <div class="state">
              {{past_item.order_state}}
              <template v-if="past_item.order_state === '배송중'">
                <div style="color:#0BAF00; font-weight:500">({{past_item.delivery_date}} 배송예정)</div>
              </template>  
            </div>
            <div class="img" style="padding-top:5px;">
              <img :src="require(`@/assets/images/${setOrderImage(past_item.order_type)}`)" alt="">
            </div>
          </div>
          <div class="order-item" v-for="item in past_item.items">
            <div class="item-type">
              {{setItemType(item.type)}}
              <template v-if="item.type === 'newspaper'">
                {{ item.news_date }}
              </template>
            </div>
            <div class="item-amount">{{item.amount}}개</div>
          </div>
        </div>
        
      </section>
    </div>
    <navigation />
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import common from '@/utils/common.js'
export default {
  name: 'delivery-main-page',
  auth: false,
  mixins: [common],
  data() {
    return {
      toggleType:'total',
      //for test from test.json
      current_order:{
        // order_type:'delivery',
        // order_state:'배송중', //배송 준비중, 배송중, 배송완료, 배송취소
        // order_date:'2023.11.20',
        // delivery_date:'2023.11.21',
        // items:[
        //   {
        //     type:'newspaper', //parasole, shoulder_belt, leaflet, banner
        //     news_date:'2023.11.15',
        //     amount:10
        //   },
        //   {
        //     type:'parasole',
        //     amount:1
        //   }
        // ],
        // client: '홍길동',
        // phone: '010-1234-5678',
        // address: '서울시 강남구 테헤란로 427',
        // delivery_request: '직접받고 부재시 문앞에 놓아주세요',
        // enterence_password: '자유출입가능',

      },
      //for test from test.json
      past_orders: [
        // {
        //   order_type:'pickup',
        //   order_state:'픽업 완료', //물품 준비중, 픽업 대기중, 픽업 완료, 픽업 취소
        //   order_date:'2023.11.10',
        //   pickup_date:'2023.11.11',
        //   items:[
        //     {
        //       type:'shoulder_belt', //parasole, shoulder_belt, leaflet, banner, newspaper
        //       amount:5
        //     },
        //     {
        //       type:'banner',
        //       amount:1
        //     }
        //   ],
        //   client: '홍길동',
        //   phone: '010-1234-5678',
        // },
        // {
        //   order_type:'delivery',
        //   order_state:'배송 완료',
        //   order_date:'2023.11.15',
        //   delivery_date:'2023.11.16',
        //   items:[
        //     {
        //       type:'newspaper', 
        //       news_date:'2023.11.15',
        //       amount:50
        //     },
        //     {
        //       type:'newspaper', 
        //       news_date:'2023.11.10',
        //       amount:50
        //     },
        //     {
        //       type:'leaflet',
        //       amount:100
        //     }
        //   ],
        //   client: '홍길동',
        //   phone: '010-1234-5678',
        //   address: '서울시 강남구 테헤란로 427',
        //   delivery_request: '직접받고 부재시 문앞에 놓아주세요',
        //   enterence_password: '자유출입가능',

        // },
      ]
    }
  },
  methods: {
    setOrderImage(orderType) {
      return orderType === 'delivery' ? 'delivery_truck.png' : 'pickup.png';
    },
    setItemType(type) {
      switch(type){
        case 'newspaper':
          return '신문'
        case 'parasole':
          return '파라솔'
        case 'shoulder_belt':
          return '어깨끈'
        case 'leaflet':
          return '전단지'
        case 'banner':
          return '현수막'
      }
    },
    setPastOrderList(toggleType) {
      if(toggleType === 'total') {
        return this.past_orders;
      } else {
        return this.past_orders.filter(order => order.order_type === toggleType);
      }
    },
    async getData() {
        const data = await this.$axios.$get('/data/test.json')
        this.past_orders = data.past_orders;
        this.current_order = data.current_order;
    },
  },
  async mounted () {
    await this.getData();
  },
}
</script>

<style>
  
</style>