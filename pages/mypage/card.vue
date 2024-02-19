<template>
  <div class="area-my-boards">
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.back()">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
            <h3 class="title">내 카드</h3>
        </div>

        <div class="right" style="padding:10px;"></div>
      </div>
    </div>
    <div class="container bg">
      <div class="qr-container">
        <div class="inner-wrap">
          <div class="qr" v-html="qrData"></div>
          <div class="qr-info">
            <p class="name">{{ qrInfo?.name }}</p>
            <p class="position">{{ qrInfo?.position }}</p>
          </div>
        </div>

      </div>

      <div class="wrap">
        <div class="qr-agreement">
          <ul>
            <li v-for="(item, index) in argreements" :key="index">
              <span class="item">{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="mt-16 qr-inquiries">
          <div class="left">
            <span class="item">고객센터</span>
            <span class="item">주소</span>
          </div>
          <div class="right">
            <span class="item">1544-7166</span>
            <span class="item">서울특별시 성북구 돌곶이로27가길 21</span>
          </div>
        </div>
      </div>

    </div>
    <!-- 광고배너 -->
    
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  auth:true,
  name: 'qr',
  data() {
    return {
      qrData: null,
      qrInfo: {},
      banners:[],
      argreements: [
        '·타인에게 양도, 담보 또는 대여할 수 없습니다.',
        '·카드의 재발급에는 별도의 비용이 추가됩니다.(장당 5000원)',
        '·QR코드에는 자유마을회원 ID와 회원일련번호 외에 별도의 다른 정보가 입력되어 있지 않습니다.'
      ]
    }
  },
  methods: {
    async getQr() {
      const response = await this.$axios.get(`/api/qrcode/${this.$auth.user.id}`)
      if(response.data) {
        this.qrData = response.data;
      }
    },
    async getQrInfo() {
      const response = await this.$axios.get(`/api/auth/qrinfo`);
      this.qrInfo = {...response.data};
    },
    async updateUserInfo() {
      const res = await this.$axios.$get('/api/auth/user');
      this.$auth.setUser(res);
    },
  
  },
  mounted () {
    if(this.$nuxt.context.from?.path === '/card/newcard') {
      this.updateUserInfo();
    }
    this.getQr();
    this.getQrInfo();
  },



}
</script>

<style scoped>
  .container {
    padding-bottom: 45px;
  }
  .container.bg {
    background-image: url('@/assets/images/card/card-bg.png');
    background-size: cover;
    background-position: top 60px right 50%;
    background-repeat: no-repeat;
    
    position: relative;
    isolation: isolate;

  }
  .container.bg::after {
    content: '';
    position: absolute;
    background: white;
    z-index: -1;
    inset: 0;
    opacity: 0.4;
  }
  .qr-container {
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    padding-top: calc(40vh - 200px);

  }
  .qr-container .inner-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    height: fit-content;
    background-color: #fff;
    padding: 15px 0 0 0;
    border-radius: 10px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.20);
    /* drop-shadow:(0px 1px 5px rgba(0, 0, 0, 0.20)); */
    gap: 20px;
  }
  .inner-wrap .qr {
    width: 150px;
    height: 155px;
    background-color: white;
  }
  .inner-wrap .qr-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .container {
    position: relative;
  }
  /* .container .qr-info {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -25%);
    margin-top: 10px;
    text-align:center;
  } */

  .qr-info p {
    width: 100vw;
    text-align: center;
  }
  .qr-info .name {
    font-size: 40px;
    font-weight: bold;
    font-family: gmarketSans;
  }
  .qr-info .position {
    font-size: 35px;
    font-weight: 500;
    font-family: gmarketSans;
  }

  .qr-agreement .item {
    font-size: 20px;
    font-weight: 500;
    font-family: gmarketSans;
    margin-bottom: 10px;
  }
  .qr-inquiries {
    background-color: #fff;
    padding: 15px 10px 5px 10px;
    border-radius: 10px;
    
    display: flex;
    justify-content: flex-start;
  }
  .qr-inquiries .left {
    display: flex;
    flex-direction: column;
    width: 35%;
    
  }
  .qr-inquiries .right {
    display: flex;
    flex-direction: column;
    ;
  }
  .qr-inquiries .left .item {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .qr-inquiries .item {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
</style>