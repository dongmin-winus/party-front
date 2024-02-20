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
            <h3 class="title">신규카드 등록</h3>
        </div>

        <div class="right" style="padding:10px;"></div>
      </div>
    </div>
    <div class="container grey">
      <div class="wrap" style="padding-top: 20px; padding-bottom:20px;">
        <div class="card-img-container">
          <img src="@/assets/images/card/card-default.png" alt="신규카드">
        </div>
        <div class="card-info-container">
          <div class="m-input-wrap">
              <h3 class="m-input-title type01">카드 번호 입력
                <span @click="openModal('barcode')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clip-path="url(#clip0_4128_189)">
                    <path d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" fill="#0BAF00"/>
                    <path d="M7.05023 7.8509C7.45549 7.11932 8.23444 6.68774 8.68707 6.04037C9.16602 5.36142 8.89759 4.093 7.5397 4.093C6.65023 4.093 6.21338 4.76669 6.02917 5.32458L4.66602 4.7509C5.0397 3.62984 6.05549 2.66669 7.53444 2.66669C8.77128 2.66669 9.61865 3.22984 10.0502 3.93511C10.4186 4.54037 10.6344 5.67195 10.066 6.51406C9.43444 7.44563 8.82917 7.72985 8.50286 8.32985C8.37128 8.57195 8.31865 8.72985 8.31865 9.50879H6.79759C6.79233 9.09827 6.72917 8.42985 7.05023 7.8509ZM8.59233 11.6141C8.59233 12.193 8.11865 12.6667 7.5397 12.6667C6.96075 12.6667 6.48707 12.193 6.48707 11.6141C6.48707 11.0351 6.96075 10.5614 7.5397 10.5614C8.11865 10.5614 8.59233 11.0351 8.59233 11.6141Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4128_189">
                    <rect width="15" height="15" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </span>
              </h3>

              <div class="m-input-text type01 bg-white">
                  <input style="width:25%;" type="text"  :value="'N'" readonly>
                  &nbsp;-&nbsp; 
                  <input type="text" maxlength="4" placeholder="4자리 숫자" v-model="card_number1">
                  &nbsp;-&nbsp; 
                  <input type="text" maxlength="4" placeholder="4자리 숫자" v-model="card_number2">
              </div>
          </div>
          <div class="mt-12 m-input-wrap">
              <h3 class="m-input-title type01">
                cvc 번호 입력
                <span @click="openModal('cvc')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clip-path="url(#clip0_4128_189)">
                    <path d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" fill="#0BAF00"/>
                    <path d="M7.05023 7.8509C7.45549 7.11932 8.23444 6.68774 8.68707 6.04037C9.16602 5.36142 8.89759 4.093 7.5397 4.093C6.65023 4.093 6.21338 4.76669 6.02917 5.32458L4.66602 4.7509C5.0397 3.62984 6.05549 2.66669 7.53444 2.66669C8.77128 2.66669 9.61865 3.22984 10.0502 3.93511C10.4186 4.54037 10.6344 5.67195 10.066 6.51406C9.43444 7.44563 8.82917 7.72985 8.50286 8.32985C8.37128 8.57195 8.31865 8.72985 8.31865 9.50879H6.79759C6.79233 9.09827 6.72917 8.42985 7.05023 7.8509ZM8.59233 11.6141C8.59233 12.193 8.11865 12.6667 7.5397 12.6667C6.96075 12.6667 6.48707 12.193 6.48707 11.6141C6.48707 11.0351 6.96075 10.5614 7.5397 10.5614C8.11865 10.5614 8.59233 11.0351 8.59233 11.6141Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4128_189">
                    <rect width="15" height="15" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </span>
              </h3>
              <div class="m-input-text type01 bg-white">
                  <input type="number" maxlength="3" placeholder="3자리 숫자 입력" v-model="card_cvc">
              </div>
          </div>
          <div class="mt-16 m-input-checkbox type01">
              <input type="checkbox" id="agree_card" v-model="agree_card">
              <label for="agree_card">
                  (필수) 카드 이용약관 동의
                  <!-- <a href="#" class="link">약관보기</a> -->
              </label>
          </div>
          <div class="mt-16"></div>
          <div class="m-btns type01">
            <div class="m-btn-wrap">
              <button type="button" class="m-btn type02 width-100" @click="debounceRegister">등록</button>
            </div>
          </div>
        </div>

      </div>

    </div>
    <navigation />
    <modal
        v-if="questionModal"
        @cancel="questionModal = false"
    >
      <template #inner>
        <div class="m-pop-title">
            <span class="point">{{modal_title}} 찾기</span>
        </div>


        <div class="mt-20 modal-img">
          <img v-if="modal_img_type == 'barcode'" :src="require('@/assets/images/card/barcode-check.png')" alt="">
          <img v-else-if="modal_img_type == 'cvc'" :src="require(`@/assets/images/card/cvc-check.png`)" alt="">
          <img v-else :src="require(`@/assets/images/card/card-default.png`)" alt="">
        </div>

        <button type="button" class="m-btn type03 width-100" @click="questionModal = false">닫기</button>
      </template>
    </modal>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce';
import common from '@/utils/common';
export default {
  auth:true,
  name: 'newCard',
  mixins: [common],
  data() {
    return {
      card_number1: '',
      card_number2: '',
      card_cvc: '',
      agree_card: false,
      questionModal: false,
      modal_img_type: 'barcode',
      modal_title: '카드 번호',
    }
  },
  computed: {
    computedCard1() {
      //앞의 0 자르고 남은 숫자 리턴
      return this.card_number1.replace(/^0+/, '');
    },
    computedCardSerial() {
      return this.computedCard1 + this.card_number2 + 'A';
    }
  },
  methods: {
    openModal(type) {
      if (type === 'barcode') {
        this.modal_img_type = 'barcode';
        this.modal_title = '카드 번호';
      } else if (type === 'cvc') {
        this.modal_img_type = 'cvc';
        this.modal_title = 'CVC 번호';
      }
      this.questionModal = true;
    },
    isNumeric(str) {
      return /^\d+$/.test(str);
    },
    validateForm() {
      if(!this.isNumeric(this.card_number1)) {
        alert('카드번호 앞자리는 숫자만 입력 가능합니다.');
        return;
      }
      if(!this.isNumeric(this.card_number2)) {
        alert('카드번호 뒷자리는 숫자만 입력 가능합니다.');
        return;
      }
      if(!this.isNumeric(this.card_cvc)) {
        alert('CVC번호는 숫자만 입력 가능합니다.');
        return;
      }
      if(!agree_card) {
        alert('카드 이용약관에 동의해주세요.');
        return;
      }
      return true;
    },

    async register() {
      if(!this.validateForm()) return;
      const data = {
        qrcode: this.computedCardSerial,
        cvs: this.card_cvc,
      };
      try {
        const res = await this.$axios.post('/api/certificates', {
          
            ...data
          
        });
        if(res.data.success) {
          alert('카드 등록이 완료되었습니다.');
          this.$router.push('/mypage/card');
        }
        if(res.data.success === false) {
          alert(res.data.message);
        }
      } catch (error) {
        if(error.response.data.message) {
          alert(error.response.data.message);
        }else {
          alert('카드 등록에 실패했습니다.');
        }
      }


    },
  },
  mounted () {
    if(this.$auth.user.serial_number) {
      alert('이미 등록된 카드가 있습니다.')
      this.$router.push('/mypage/card');
    }
  },
  created() {
      this.debounceRegister = debounce((item) => {
          this.register(item)
      }, 500);
  }
}
</script>

<style scoped>
  .container.grey {
    background-color: #F7F7F7;
  }
  .card-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-bottom: 30px;
    background-color: #F7F7F7;
  }
  .card-img-container img {
    width: 60%;
  }
  .card-info-container {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .m-input-text.type01 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg-white input {
    border: 1px solid #CCC;
    background-color: #fff;
  }
  .bg-white input::placeholder {
    color: #000;
  }

  .modal-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
</style>