<template>
  <div class="area-survey">
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">{{ $auth.user.district.district }}</h3>
        </div>

        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div>
    <!-- 내용 -->
    <div class="container">
      <div class="content">
        <div class="title-container">
          <div class="mt-32 m-title type01">
            <span class="point">자유마을</span> 설문조사
          </div>
          <div class="mt-16 m-title type02">
            <span class="point">제 3차</span> &nbsp;2023.11.20 (월) ~
          </div>
        </div>
        <div class="form-container">
          <div class="item">
            <Label :dot="true" highlight="현수막" label="설치" />
            <div class="value">
              설치 수량 
              <input type="number" class="input-text" v-model="bannerCount" /> 
              
            </div>
          </div>
          <div class="item">
            <Label :dot="true" highlight="아침방송" label="시청" />
            <div class="value">
              <div class="checkboxes">
                <div class="checkbox" v-for="(item, index) in days1" :key="index">
                  <input type="checkbox" style="display:inline !important;" :id="item.label" :value="item.value"
                    @change="check('daysCheck1', item.label)" />
                  <label :for="item.label">{{ item.label }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <Label :dot="true" :required="true" highlight="6대 결의사항" label="가입" />
            <p class="explaination">
              ①자유마을 가입 ②자유일보 구독 ③퍼스트모바일 가입 ④선교카드 가입(농협중앙회) ⑤광화문온앱 가입 ⑥너알아TV/일천만방송TV/FNL NEWS 시청 및 구독
            </p>
            <div class="value">
              <div class="checkboxes custom">
                <div class="checkbox" v-for="(item, index) in items3" :key="index">
                  <input type="radio" style="display:inline !important;" :id="item.label" :value="item.value"
                    v-model="sevenCheck" />
                  <label :for="item.label">{{ item.label }}</label>
                </div>
              </div>
              <p class="explaination" style="font-size:10px;">
                (이번 주에 완료하신분만 체크)
              </p>
            </div>
          </div>
          <div class="item">
            <Label :dot="true" highlight="파라솔" label="설치" />
            <div class="value">
              <div class="checkboxes">
                <div class="checkbox" v-for="(item, index) in days2" :key="index">
                  <input type="checkbox" style="display:inline !important;" :id="item.label" :value="item.value"
                    @change="check('daysCheck2', item.label)" />
                  <label :for="item.label">{{ item.label }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <Label :dot="true" :required="true" highlight="집회" label="참석" />
            <div class="value">
              <div class="checkboxes custom">
                <div class="checkbox" v-for="(item, index) in items5" :key="index">
                  <input type="radio" style="display:inline !important;" :id="item.label" :value="item.value"
                    v-model="assemblyCheck" />
                  <label :for="item.label">{{ item.label }}</label>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="item">
            <Label :dot="true" :required="true" highlight="정당지지율" label="조사" />
            <p class="explaination">
              해당지역에 500명이상 설문조사한 값을 순위 별로 체크해주세요
            </p>
            <table>
              <tr>
                <th></th>
                <th v-for="colIndex in cols" :key="index">{{ colIndex }}위</th>
              </tr>
              <tr v-for="(party, index) in partyList" :key="index">
                <td class="party-label">
                  {{ party.label }}
                </td>
                <td v-for="colIndex in cols" :key="index">
                  <input type="radio" style="display:inline !important;" :name="`row-${index + 1}`"
                    :ref="`row-${index + 1}-col-${colIndex}`" :data-label="party.label" :data-col="`${colIndex}`"
                    @click="handleRadioMatrix">
                </td>
              </tr>
            </table>
          </div> -->
        </div>
        <button class="m-btn type01 bg-primary" style="width:90%;" @click="submit">설문 제출하기</button>

        <div class="btn-container">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  auth: true,
  components: {
    Label,
  },
  watch: {
    // daysCheck1(newVal, oldVal) {
    //   console.log(newVal, oldVal,33333)
    //   this.daysCheck1 = this.transDays(newVal)
    // }
  },
  data() {
    return {
      days1: [
        { label: '월요일', value: 'mon' },
        { label: '화요일', value: 'tue' },
        { label: '수요일', value: 'wed' },
        { label: '목요일', value: 'thu' },
        { label: '금요일', value: 'fri' },
        { label: '토요일', value: 'sat' },
      ],
      days2: [
        { label: '월요일', value: 'mon2' },
        { label: '화요일', value: 'tue2' },
        { label: '수요일', value: 'wed2' },
        { label: '목요일', value: 'thu2' },
        { label: '금요일', value: 'fri2' },
        { label: '토요일', value: 'sat2' },
      ],
      items3: [
        { label: '모두 가입완료', value: '1' },
        { label: '기존 가입완료/미가입', value: '0' },
      ],
      items5: [
        { label: '한번이라도 참석', value: '1' },
        { label: '불참', value: '0' },
      ],

      partyList: [
        { label: '자유통일당' },
        { label: '국민의힘' },
        { label: '더불어민주당' },
        { label: '정의당' },
        { label: '진보당' },
        { label: '이준석신당' },
        { label: '기타정당' },
      ],
      cols: 3,

      //results
      bannerCount: '',
      daysCheck1: [],
      daysCheck2: [],
      sevenCheck: [],
      assemblyCheck: [],
      partyCheck: [],
    }
  },
  methods: {
    check(containerKey, value) {
      const container = this[containerKey];
      if (container.includes(value)) {
        this[containerKey] = container.filter(item => item !== value);
      } else {
        this[containerKey] = [...container, value];
      }
    },
    choose(containerKey, value) {
      this[containerKey] = [...value];
    },
    handleRadioMatrix(e) {
      const col = e.target.dataset.col;
      const label = e.target.dataset.label;
      Object.keys(this.$refs).forEach(key => {
        if (key.includes(`col-${col}`)) {
          this.$refs[key].forEach(item => {
            item.checked = false;
          })
        }
      });
      e.target.checked = true;
      this.partyCheck = [...this.partyCheck?.filter(item => item.label !== label).filter(item => item.value !== col), { label, value: col }];
    },
    async submit() {
      const json_data = {
        quantity: this.bannerCount == '' ? 0 : this.bannerCount,
        broadcast: this.daysCheck1.join(', '),
        parasol: this.daysCheck2.join(', '),
        seven: this.sevenCheck,
        event: this.assemblyCheck,
      }
      console.log(json_data)
      //seven이나 event가 비었으면 alert
      if (this.sevenCheck == '' || this.assemblyCheck == '') {
        alert('설문조사를 완료해주세요.')
        return;
      }
      try {
        const response = await this.$axios.post('/api/forms/form-answer', {
          json_data,
          form_id: 1,
        })
        console.log(response.data)
        if (response.status === 200) {
          alert("성공적으로 처리되었습니다.");
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error, 333)
        // if (error.response && error.response.data)
        //     this.errors = error.response.data.errors;
      }
    }
  },
}
</script>

<style scoped>
* {
  font-family: 'GmarketSans';
}

.custom {
  grid-template-columns: 130px 170px !important;
  grid-template-rows: 1fr !important;
}

th,
td {
  padding: 10px;
}

td {
  text-align: center;

}

th {
  font-weight: 600;
  font-size: 20px;
  font-family: GmarketSans;

}

.party-label {
  font-weight: 600;
  font-size: 20px;
  font-family: GmarketSans;
}
</style>