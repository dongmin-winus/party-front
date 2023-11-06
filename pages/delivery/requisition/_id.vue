<template>
  <div class="area-delivery-requisition-detail">
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
      <div class="mt-32 relative-wrapper">
        <div class="content">
          <section class="item-section">
            <client-only>
              <carousel
                :adjustableHeight="true"
                :loop="true" 
                :per-page="1"
                :autoplay="true"
                :autoplay-timeout="5000"
                :mouse-drag="false"
                :pagination-enabled="false"
              >
                <slide class="swiper-slide" v-for="item in inventory.detail_image">
                  <div class="image-container">
                    <img :src="require(`@/assets/images/${item}`)" alt="" class="img">
                  </div>
                </slide>
              </carousel>
            </client-only>
          </section>
          
          <section class="mt-20 info-section">
            <div class="title-container">
              <p class="title" style="font-weight:bold; font-size:xx-large">{{ inventory.name }}</p>
              <p class="description" style="color:#777">{{ inventory.definition }}</p>
            </div>
            <div class="info">
              <span class="title">재고 현황</span>
              <span class="value">{{ inventory.stock }}개 남음</span>
            </div>
            <div class="info no-border">
              <span class="title">배송비</span>
              <span class="value">{{ inventory.shipping_fee }}</span>
            </div>
          </section>

          <div class="mt-28" style="min-height:20px; width:100%; background-color: #F5F5F5; box-shadow:inset 0px 3px 3px rgba(0,0,0,0.1);">
            
          </div>

          <section class="guide-section">
            <div class="title">
              이용안내
            </div>
            <div class="guide-content">
              <pre>
    ・ 물품 신청은 평일 오전 9시 전까지 완료 될 
        경우 당일 배송되며, 이후 신청 되는 물품은 
        익일 배송 진행되는 점 참고바랍니다.
              </pre>
              <pre>
    ・ 물품 픽업은 신청 후 바로 수령 가능하며, 
        신청 취소는 고객센터에 문의 주시기 바랍니다.
              </pre>
              <pre>
    ・ 날씨 상태(우천, 강풍, 태풍, 강설 등)와 교통 
        상황에 따라 배송이 지연 될 수 있습니다.
              </pre>
              <pre>
    ・ 택배 지연 시, 고객센터로 문의해주세요.
              </pre>
            </div>
          </section>

          <section class="btn-section">
            <div class="m-btn type02 bg-primary" @click="openSlide()">
              신청하기
            </div>
          </section>
        </div>
      </div>
      <SelectOrderSlide 
        :inventory="inventory" 
        :propActive="activeSlide" 
        @cancel="activeSlide = false"
      />
    </div>

    <navigation />
  </div>
</template>
<script>
  import SelectOrderSlide from '@/components/delivery/SelectOrderSlide.vue';
  export default {
    name: 'delivery-requisition-detail',
    components: {
      SelectOrderSlide,
    },
    data() {
      return {
        inventory: {},
        activeSlide: false,
      }
    },

    methods: {
      async getInventoryData() {
        const data = await this.$axios.$get('/data/test.json');
        this.inventory = {...data.inventory_list.find(item => item.type == this.$route.params.id)};
      },
      openSlide() {
        this.activeSlide = true;
      }
    },
    async mounted () {
      await this.getInventoryData();
    },
  }
</script>
<style>
  .relative-wrapper {
    position: relative;
    height: 80vh;
    width:inherit;
  }
  .relative-wrapper .content {
    position: auto;
    width:100%;
    height: 100%;
  }
  .btn-section {
    position: sticky;
    bottom: 10px;
    width: 90%;
  }
</style>