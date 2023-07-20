<template>
  <div class="area-login">
      <!-- 헤더영역 -->
      <div class="m-header type02">
          <div class="wrap">
              <div class="left">
                  <img src="@/assets/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.go(-1)">
              </div>
              <div class="center">
                  <h3 class="title"></h3>
              </div>
              <div class="right"></div>
          </div>
      </div>

      <!-- 내용 영역 -->
      <div class="container">
          <div class="m-center type01">
              <div class="wrap">
                      <img src="@/assets/images/logo-big.png" alt="" class="logo" style="width:150px;">

                      <h3 class="title">
                          연락처를 입력하세요
                      </h3>

                      <div class="m-input-wrap">
                          <div class="m-input-text type01">
                              <input type="text" placeholder="연락처 11자리(-없이 숫자만 입력)" v-model="form.phone" :disabled="time != 180">
                          </div>
                      </div>

                      <button class="m-btn type02 width-100" @click.prevent="debounceCertificate">인증번호 보내기</button>
                      <div class="mt-32"></div>

                      <h3 class="title">
                          문자 인증번호 입력 
                      </h3>
                      <div class="m-input-wrap">
                          <div class="button-wrap">
                            <div class="m-input-text type04">
                                <input type="text" placeholder="6자리 인증번호" v-model="form.certify">
                            </div>
                            <button class="m-btn type02" @click="cirtificateWithNumber">확인</button>
                          <span :class="computedTimerClass" v-if="isCertifyCalled && !numberCertificated">{{ leftTimes }}</span>
                          <span class="success" v-if="numberCertificated">인증완료</span>
                          </div>

                      </div>

                      <button class="m-btn type02 width-100" @click="changePassword">임시 비밀번호 보내기</button>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import {debounce} from "@/utils/debounce";
export default {
  name: "password",
  auth: 'guest',
  data() {
      return {
          form: {
              phone: "",
              certify: "",
          },
          timer: null,
          isCertifyCalled: false,
          numberCertificated: false,
          time: 180,
          leftTimes: '03:00',
          count: 0,
          maxCount: 0,
      }
  },
  watch: {
    time(value) {
      let min = parseInt(value / 60, 10);
      let sec = parseInt(value % 60 ,10);
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      this.leftTimes = min + ':' + sec;
    }
  },
  computed: {
    computedTimerClass() {
      return `timer ${this.time <= 0 ? 'expired' : ''}`;
      
    }
  },  
  methods: {
    async certificate() {
        if(this.time !== 180) {
          return alert('인증번호 보내기는 3분에 한번만 가능합니다.')
        }
        if(!this.form.phone) {
          return alert('연락처를 입력해주세요.');
        }
        try {
            if(!this.isCertifyCalled) {
              this.form.certify = '';
            }
            const { data } = await this.$axios.get('/api/user-certify', {
                params: {
                    ...this.form
                }
            });
            if (data.result) {
                this.isCertifyCalled = true;
                this.count++;
                this.startTimer();
            } else if(data.message == 'max limit') {
              this.maxCount = data.count - 1;
              alert(`인증번호 만료횟수가 ${this.maxCount}번 초과하였습니다. 고객센터(1544-7166)으로 연락바랍니다.`);
            }
        } catch (e) {
          console.log(e);
        }
    },
    async cirtificateWithNumber() {
      if(!this.form.phone) {
        return alert('연락처를 입력해주세요.');
      }
      if(!this.form.certify) {
        return alert('인증번호를 입력해주세요.');
      }
      try {
            const { data } = await this.$axios.get('/api/user-certify', {
                params: {
                    ...this.form
                }
            });
            if (data.result) {
                this.numberCertificated = true;
            }
        } catch (e) {
            if(e.response.data.message) {
              alert(e.response.data.message);
            }
        }
    },

    async changePassword() {
      if(this.isCertifyCalled && !this.numberCertificated) {
        return alert('인증번호를 입력후 확인을 눌러주세요.');
      }
      if(this.numberCertificated && !this.isCertifyCalled) {
        return alert('인증번호가 만료되었습니다. 인증번호를 다시 받아주세요.');
      }
      if(this.maxCount !== 0 && this.count > this.maxCount) {
        return alert(`인증번호를 만료횟수가 ${this.maxCount}번 초과하였습니다. 고객센터(1544-7166)으로 연락바랍니다.`);
      }
      try {
        const { data } = await this.$axios.post('/api/password-reset', {
          phone: this.form.phone,
        });
        if (data.result) {
            alert('임시 비밀번호가 발송되었습니다. 문자메세지를 확인해주세요.');
            this.$router.push('/auth/login');
        } else if (data.result == false && data.message == 'max limit') {
          alert(`인증번호 만료횟수가 ${this.maxCount}번 초과하였습니다. 고객센터(1544-7166)으로 연락바랍니다.`);
        } else if (data.result == false) {
          alert('인증번호가 잘못 입력되었습니다. 다시 입력해주세요.');
        }
      } catch (e) {
        console.log(e);
      }
    },
    startTimer() {
        this.timer = setInterval(() => {
            if (this.time > 0) {
                this.time--;
            } else {
                clearInterval(this.timer);
                this.time = 180;
                this.isCertifyCalled = false;
            }
        }, 1000);
    },
  },
  created () {
        this.debounceCertificate = debounce(() => {
            this.certificate()
        },500);
    },
}
</script>

<style scoped>
  .timer {
    position: absolute;
    top:5%;
    right: 28%;
    font-size: 24px;
    color: #1539ed;
  }
  .timer.expired {
    color: #ff0000;
  }

  .success {
    position: absolute;
    top:15%;
    right: 30%;
    font-size: 18px;
    color: #1539ed;
  }
</style>
