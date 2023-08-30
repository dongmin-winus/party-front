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
            <h3 class="title">일일보고</h3>
        </div>

        <nuxt-link to="/contents/settings" class="btn-util">
            <img src="@/assets/images/setting.png" alt="" style="width:20px;">
        </nuxt-link>
      </div>
    </div>

    <div class="container">
      <div class="mt-24"></div>
      <section class="section-promotion">
        <div class="wrap">
          <div class="m-title type01">
            <p class="point" style="text-align: center;"> {{ user.district.district }} 일일보고</p>
            <p class="sub" style="text-align: center; color: #626262; font-size: 19px; padding-bottom: 10px;">대표 {{ user.name }}</p>
          </div>
        </div>
      </section>

      <div style="padding: 0 30px;">
        <div class="mt-8" v-for="(item,index) in labelData" :key="index">
          <p>{{ item.label }}</p>
          <div class="mt-8"></div>
          <div class="m-input-dates type01">
              <div class="m-input-text type01">
                  <input @focus.once="form[item.name] = null" type="number" v-model="form[item.name]" >
              </div>
          </div>
        </div>

        <div class="mt-8 comment">
          <p>비고</p>
          <div class="m-input-textarea type01 lightgrey">
            <textarea placeholder="" v-model="form.memo"></textarea>
          </div>
        </div>

        <div class="mt-8"></div>
        <div class="m-btns type01">
          <div class="m-btn-wrap">
            <button class="m-btn type01 bg-primary width-100" style="color: #fff" @click="submit">보고하기</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    labelData() {
      return {
        village: {
          label: '자유마을',
          name: 'village',
        },
        mobile: {
          label:'퍼스트모바일',
          name: 'mobile',
        },
        card: {
          label: '선교카드',
          name: 'card',
        },
        news: {
          label: '자유일보',
          name: 'news',
        },
        ghmon: {
          label: '광화문온',
          name: 'ghmon',
        },
        yktv: {
          label:'너알아tv',
          name: 'yktv',
        },
        pension: {
          label: '국민연금',
          name: 'pension',
        },
        other: {
          label: '현장 참여자수',
          name: 'other',
        }
      }
    }
  },
  data() {
    return {
      user: this.$auth.user,
      form: {
        village: 0,
        mobile: 0,
        card: 0,
        news: 0,
        ghmon: 0,
        yktv: 0,
        pension: 0,
        other: 0,
        memo: '',
        reporting: 0,
        phone: this.$auth.user.phone,
      }
    }
  },
  methods: {
     async submit() {
      const requiredValues = Object.keys(this.form).filter(item => this.labelData.hasOwnProperty(item))
      if(Object.entries(this.form).filter(item => requiredValues.includes(item[0]) && (item[1] === null || item[1] === '')).length > 0) return alert('입력되지 않은 항목이 있습니다.')
      this.form.reporting = 1
      const response = await this.$axios.post('/api/reports', this.form);
      
      if(response.data.result) {
        alert('일일보고가 등록되었습니다.')
        this.$router.back()
      } else {
        alert('일일보고 등록에 실패하였습니다.')
      }
    }
  },
}
</script>

<style>

</style>