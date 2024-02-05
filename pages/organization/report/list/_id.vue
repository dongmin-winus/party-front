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
        <!-- title -->
        <div class="title-container">
          <div class="mt-32 m-title type01">
            {{ formBuildArr.find(e => e.element == 'header')?.label }}
          </div>
          <div class="mt-16 m-title type021">
            {{ formBuildArr.find(e => e.element == 'header')?.sub_text }}
          </div>
        </div>
        <div class="form-container">
          <SurveyItem v-for="(item, index) in buildArrWoHeader" :key="index" :item="item" :form_id="$route.params.id" @valueChange="valueChange" />
          <!-- 커스텀-라디오: matrix-table -->
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
import SurveyItem from '@/components/survey/SurveyItem.vue'
export default {
  auth: true,
  components: {
    SurveyItem,
    Label,
  },
  watch: {
    // daysCheck1(newVal, oldVal) {
    //   console.log(newVal, oldVal,33333)
    //   this.daysCheck1 = this.transDays(newVal)
    // }
  },
  async mounted() {
    // this.formBuildArr = await this.$axios.$get('/data/survey_example.json')
    const response = await this.$axios.$get(`/api/forms/option/${this.$route.params.id}`)
    this.form_id = this.$route.params.id
    this.formBuildArr = response.data
  },
  computed: {
    buildArrWoHeader() {
      return this.formBuildArr.filter(e => e.element !== 'header')
    }
  },
  data() {
    return {
      datas: [],
      formBuildArr: [],


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
      values: [],
      form_id: null,
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
    valueChange(item) {
      console.log(item)
      //this.values 에 item을 추가하되, item.id가 이미 존재하면 기존값을 대체한다.
      const index = this.values.findIndex(e => e.id === item.id)
      if (index === -1) {
        this.values.push(item)
      } else {
        if(item.value === '') {
          this.values.splice(index, 1)
          return;
        }
        this.values[index] = item
      }
    },
    async submit() {
      //validation
      const requiredArr = this.buildArrWoHeader.filter(e => e.required === 1);
      const requiredIds = requiredArr.map(e => e.id);
      const valuesIds = this.values.map(e => e.id);
      const diff = requiredIds.filter(x => !valuesIds.includes(x));
      if (diff.length > 0) {
        alert('필수항목을 입력해주세요.');
        return;
      }

      try {
        const data = {
          form_id: this.$route.params.id,
          values: this.values,
        }
        const response = await this.$axios.post('/api/forms/form-answer', {
          ...data
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
<style></style>