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
      <div class="lost-box" @click="lostModal = true">
        분실신고
      </div>
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
    <modal
        v-if="lostModal"
        @cancel="lostModal = false"
    >
      <template #inner>
        <div class="m-pop-title">
            <span class="point">분실 신고</span>
        </div>
        <div class="lost-announcement">
          <div align="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
              <ellipse cx="27.5" cy="27.0339" rx="27.5" ry="27.0339" fill="#E01500"/>
              <path d="M25.1211 31.2806V13.258H29.1952V31.2806H25.1211ZM25.1211 41.2932V37.2881H29.1952V41.2932H25.1211Z" fill="white"/>
            </svg>
          </div>

          분실신고 하시겠습니까?<br/>
          분실신고 하시면 해당 카드는 사용이 불가능합니다.
        </div>
        <div class="mt-20"></div>
        <div class="m-btns type01">
            <div class="m-btn-wrap">
                <a href="#" class="m-btn type01 bg-red" @click.prevent="lostCard">신고하기</a>
            </div>
            <div class="m-btn-wrap">
                <a href="#" class="m-btn type01 bg-primary" @click.prevent="lostModal = false">취 소</a>
                
            </div>
        </div>
        <!-- <button type="button" class="m-btn type03 width-100" @click="lostModal = false">신고하기</button>

        <button type="button" class="m-btn type03 width-100" @click="lostModal = false">닫기</button> -->
      </template>
    </modal>
    
    <navigation />
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
export default {
  auth:true,
  name: 'card',
  data() {
    return {
      qrData: null,
      qrInfo: {},
      banners:[],
      argreements: [
        '·타인에게 양도, 담보 또는 대여할 수 없습니다.',
        '·카드의 재발급에는 별도의 비용이 추가됩니다.(장당 5000원)',
        '·QR코드에는 자유마을회원 ID와 회원일련번호 외에 별도의 다른 정보가 입력되어 있지 않습니다.'
      ],
      lostModal: false,
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
    async lostCard() {
      try {
        const res = await this.$axios.$post('/api/certificates/lost-card', {
          qrcode: this.qrInfo.serial_number
        })
        if(res.success) {
          alert(res.message);
          this.lostModal = false;
          this.$router.push('/mypage');
        }
      } catch (error) {
        if(error.response) {
          alert(error.response.data.message);
          this.lostModal = false;
        }
      }

    }
  
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
    background-image: url("@/assets/images/card/card-bg.png");
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
  .container.bg .lost-box {
    position: absolute;
    top: 70px;
    right: 10px;
    padding: 5px 10px;
    background-color: rgb(255, 0, 0, 0.7);
    color: white;
    font-size: 20px;
    font-weight: 600;
    border-radius: 10px;
    z-index: 1;
  }
  .qr-container {
    width: 100%;
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

  .lost-announcement {
    font-size: 20px;
    font-weight: 500;
    font-family: gmarketSans;
    min-height: 200px;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>