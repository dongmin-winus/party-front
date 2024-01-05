<template>
  <div class=" f-height">
    <button class="btn-close" @click.prevent="clickEvent(2)">
      <img src="@/assets/images/x.png" alt="x" style="width:21px;">
    </button>
    <div class="wrap evenly">
      <div class="m-title type01 text-center">
        {{ $route.query.name }}님과 함께<br /> <span class="point text-center">자유마을</span>에서<br />활동하시겠습니까?
      </div>
      <div class="area-register">
        <!-- 내용 영역 -->
        <div class="">
          <div class="wrap">
            <div class="mt-12"></div>

            <div class="m-input-wrap">
              <h3 class="m-input-title type01">이름</h3>

              <div class="m-input-text type01">
                <input type="text" placeholder="이름 입력" v-model="form.nickname">
              </div>

              <p class="m-input-error" v-if="errors.nickname" v-text="errors.nickname[0]"></p>
            </div>
            <div class="m-input-wrap">
              <h3 class="m-input-title type01">연락처</h3>

              <div class="m-input-text type01">
                <input type="text" maxlength="11" placeholder="번호 입력(01077775555)" v-model="form.phone">
              </div>

              <p class="m-input-error" v-if="errors.phone" v-text="errors.phone[0]"></p>
              <p class="m-input-error" :class="computedPhoneValid" v-if="form.phone && !errors.phone"
                v-text="phoneValidText"></p>

            </div>

            <div class="m-input-wrap">
              <h3 class="m-input-title type01">생년월일</h3>

              <div class="m-input-text type01">
                <input type="text" maxlength="6" placeholder="6자리 숫자 입력 (660510)" v-model="form.birth">
              </div>

              <p class="m-input-error" v-if="errors.birth" v-text="errors.birth[0]"></p>
            </div>


            <div class="m-input-wrap">
              <h3 class="m-input-title type01">내 지역 선택</h3>
              <!-- <input-region @change="(data) => {form.district_id = data.district_id}"/> -->
              <input-region @change="changeDistrict" />
              <p class="m-input-error" v-if="errors.district_id" v-text="errors.district_id[0]"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 center m-board-btns">
        <div class="m-btns type01">
          <div class="m-btn-wrap">
            <a href="#" class="m-btn type01 bg-primary" @click.prevent="registerAndClickEvent(1)">동&nbsp;&nbsp;&nbsp;의</a>
          </div>
          <!-- <div class="m-btn-wrap">
              <a href="#" class="m-btn type01 bg-revert-red" @click.prevent="clickEvent(2)">아니오</a>
            </div> -->
        </div>
      </div>
      <div class="m-title type01  mt-12">
        <p class="sub custom">
          ※ 동의하시는 경우, 귀하의 전화번호를 SMS, 전화 수신 등 마케팅 활동을 위한 정보 수집 등에 활용합니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common';
export default {
  auth: false,
  mixins: [common],
  data() {
    return {
      form: {
        nickname: "",
        birth: "",
        phone: "",
        gender: "남",
        referrer: null,
        district_id: "",
        is_agree_privacy: true,
        is_agree_push: true,
      },
      errors: {},
      phoneValidated: false,
      phoneValidText: undefined,
    }
  },
  computed: {
    computedPhoneValid() {
      return this.phoneValidated ? 'primary' : ''
    }
  },
  watch: {
    'form.phone': {
      handler: function (val, oldVal) {
        if (this.validatePhone(val) || val === '') {
          if (val == '') this.phoneValidText = ''
          if (this.validatePhone(val)) this.getPhoneValidation(val)
        } else {
          this.phoneValidText = '11자리 휴대폰 번호를 입력해주세요.'
          this.phoneValidated = false
        }
      },
    },
  },
  async mounted() {
    const { data } = await this.$axios.get(`api/user-info/${this.$route.query.id}`);
    this.form = {
      ...this.form,
      nickname: data.name,
      phone: data.phone,
    }
  },
  methods: {
    async getPhoneValidation(phone) {
      const { result, message } = await this.$axios.$get(`/api/member-certify?phone=${phone}`)
      result == true ? this.phoneValidated = true : this.phoneValidated = false;
      message ? this.phoneValidText = message : this.phoneValidText = ''
    },
    // {{local_api_url}}/user-accept/{{id}}?allow=1, param: {allow 1인 경우 승인, allow 2인 경우 미승인} 
    async clickEvent(number) {
      const response = await this.$axios.post(`api/user-accept/${this.$route.query.id}?allow=${number}`);
      if (response) {
        alert('응답이 등록되었습니다.')
        this.$router.push('/');
      }
    },
    async registerAndClickEvent(number) {
      try {
        const response1 = await this.$axios.post("/api/auth/register", this.form)
        const response2 = await this.clickEvent(number);
      } catch (error) {
        alert('데이터 전송 중 오류가 발생하였습니다.')
      }

    },
    changeDistrict(data) {
      // this.form.district = data.district
      this.form.district_id = data.district_id
    },
  },
}
</script>

<style scoped>
.custom {
  font-family: 'GmarketSans' !important;
}

.f-height {
  padding-top: 20px;
  height: 100vh;

}

.f-height .btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #fff;
  border-radius: 5px;
  /* box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); */
}

.f-height .btn-close img {
  width: 6px;
}

.evenly {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

@media screen and (min-width: 501px) {
  .evenly {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
}

.text-center {
  text-align: center;
  font-size: 26px !important;
}
</style>