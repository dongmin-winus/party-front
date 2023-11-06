<template>
  <div class="area-delivery-requisition">
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
      <div class="mt-32 wrap">
        <section class="title-section">
          <div class="left">
            <div class="main">
              <p>애국 시민 <span class="primary">PICK</span></p>
              <p style="font-weight: 500;">물품신청 더 편리하게!</p>
            </div>
            <div class="mt-12 sub">
              <p>우리의 애국운동은</p>
              <p>꾸준히 계속!</p>
            </div>
          </div>
          <div class="right">
            <img src="@/assets/images/delivery_requisition_img.png" alt="">
          </div>
        </section>    

        <section class="mt-24 item-section">
          <p class="title" style="font-weight:500; font-size:18px;">물품 무료 지급 리스트</p>
          <div class="mt-12 grid-container">
            <div class="item-container" v-for="item in inventories" @click="goRequisitionDetail(item.type)">
              <div class="item">
                <div class="img">
                  <img :src="require(`@/assets/images/requisition_${item.type}.png`)" alt="">
                </div>
                <div class="title">{{ item.name }}</div>
              </div>
            </div>
          </div>

        </section> 
      </div>
    </div>
    <navigation />
  </div>
</template>
<script>
  export default {
    name: 'delivery-requisition-index',
    data() {
      return {
        inventories:[]
      }
    },
    methods: {
      goRequisitionDetail(type) {
        this.$router.push({name:'delivery-requisition-id' , params:{id:`${type}`}})
      },
      async getInventoryData() {
        const data = await this.$axios.$get('/data/test.json');
        this.inventories = data.inventory_list;
      }
    },
    async mounted () {
      await this.getInventoryData();
    },
  }
</script>