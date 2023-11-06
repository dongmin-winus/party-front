<template>
  <div class="area-delivery-detail">
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
          <h3 class="title">신청 상세정보</h3>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="container">
      <section class="title-section">
        <div class="m-title type01">
          [아이디]님!
          <p class="sub02">주문상태에 따른 문구가 표시됩니다</p>
        </div>
      </section>

      <section class="mt-12 item-section">
        <div class="order-date">{{order.order_date}} 신청</div>
          <div class="order-state">
            <div class="state">
              {{order.order_state}}
              <template v-if="order.order_state === '배송중'">
                <div style="color:#0BAF00; font-weight:500">({{order.delivery_date}} 배송예정)</div>
              </template>  
            </div>
            <div class="img" style="padding-top:5px;">
              <img :src="require(`@/assets/images/${setOrderImage(order.order_type)}`)" alt="">
            </div>
          </div>
          <div class="order-item" v-for="item in order.items">
            <div class="item-type">
              {{setItemType(item.type)}}
              <template v-if="item.type === 'newspaper'">
                {{ item.news_date }}
              </template>
            </div>
            <div class="item-amount">{{item.amount}}개</div>
          </div>
      </section>
      <section class="mt-12 address-section">
        <p style="font-weight:500; font-size:18px;">배송지 정보</p>
        <div class="mt-12 address">
          <div class="item address-order-date">
            <b class="key">{{order.order_type === 'delivery' ? '배송' : '픽업'}}(예정)일시</b>
            {{order.delivery_date ? order.delivery_date : order.pickup_date ? order.pickup_date : ''}}
          </div>
          <div class="item address-client">
            <b class="key">받는사람</b>
            {{order.client}}
          </div>
          <div class="item address-phone">
            <b class="key">연락처</b>
            {{ order.phone }}
          </div>
          <template v-if="order.order_type === 'delivery'">
            <div class="item address-address">
              <b class="key">주소</b>
              {{ order.address }}
            </div>
            <div class="item address-request">
              <b class="key">배송요청사항</b>
              {{ order.delivery_request }}
            </div>
            <div class="item address-password">
              <b class="key">공동현관 출입방법</b>
              {{ order.enterence_password }}
            </div>
          </template>

        </div>
      </section>
    </div>
    <navigation />
  </div>
</template>

<script>
  export default  {
    name: 'order-detail-page',
    data() {
      return {
        order:{} ,
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
      async getData() {
        const data = await this.$axios.$get('/data/test.json')
        this.$route.query.searchType === 'past' 
          ? this.order = data.past_orders.find(order => order.order_id === this.$route.params.id) 
          : this.order = data.current_order;
      },
    },
    async mounted () {
      await this.getData();
    },
  }
  

</script>