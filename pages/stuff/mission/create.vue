<template>
  <div class="area-stuff">
    <headerTypeStuff :title="'미션 만들기'" :current="null" />
    <div style="padding-top:120px; padding-left: 10px; padding-right:10px;">
      <!-- 상단 이미지 및 문구 -->
      <div class="flex-col-center">
        <img src="@/assets/images/mission_background.png" alt="" class="src">
        <div class="mt-24 m-title type01 flex-col-center">
          <div class="sub02" style="font-size:18px !important;">즐거움이 2배, 함께하는 자유마을!</div>
          <div style="font-size:30px; font-weight:bold; font-family: 'GmarketSans';">
            <span class="point">미션</span>을 개설해보세요!
          </div>
        </div>
        
        <div class="mt-32 flex-col-center contents">
          <span>자유마을 잘 활용하고 계신가요?</span>
          <span>나와 비슷한 사람들을 모임이나 미션으로</span>
          <span>다양한 분들을 만나보세요!</span>
        </div>
      </div>

      <!-- 하단 폼 -->
      <div class="form">
        <div class="mt-16 m-input-wrawp">
          <h3 class="m-input-title type01">미션 카테고리</h3>
          <Dropdown 
            :themeColor="'#eee'"
            :themeBorder="`#e1e1e1`"
            :themeFontColor="`rgb(197,197,197)`"
            :noBorder="true"
            :menuTitle="'미션 카테고리'"
            :activate="activeDropdown"
            :items="computedMissionCategories"
            :selected="categorySelected"
            @toggle="toggleDropdown"
            @change="changeCategory"
            :value="form?.category"
          />
        </div>

        <div class="mt-16 m-input-wrap">
          <h3 class="m-input-title type01">미션명</h3>
          <div class="m-input-text type01">
            <input type="text" placeholder="미션명 입력" v-model="form.title">
          </div>
        </div>
        <div class="mt-16 m-input-wrap">
          <h3 class="m-input-title type01">미션 시작일</h3>
            <div class="m-input-text type01">
              <input readonly v-model="computedDate" type="text" @click="toggleCalendar = !toggleCalendar" placeholder="미션 시작일">
            </div>
            <client-only>
              <v-date-picker 
                v-if="toggleCalendar"
                is-expanded
                locale="ko"
                :min-date="new Date()"
                v-model="selectedDate"
              />
            </client-only>
        </div>
        <div class="mt-16 m-input-wrap">
          <h3 class="m-input-title type01">미션주기</h3>
          <div class="mission-select" style="background-color:white !important;">
            <ul class="noscroll">
              <li v-for="(item,index) in durations" :key="index" @click="selectCycle(item.id)">
                <div class="cycle" :class="item.id === selectedCycle ? 'active' : ''">
                  <span :style="item.id === selectedCycle ? 'color:#fff;':'color:#666;'">{{ item.name }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-16 m-input-wrap">
          <h3 class="m-input-title type01">미션 내용을 알려주세요</h3>
          <div class="m-input-textarea type01" >
            <textarea v-model="form.content" style="background-color:#eee;" rows="5" placeholder="미션 이해가 쉽도록 상세히 설명해주세요"></textarea>
          </div>
        </div>

        <div class="mt-16 flex-start">
          <input-img id="img" :title="''" @change="getImgInfo"/>
          <div>
          <span>{{ computedFileName }}</span>

          </div>
        </div>
      </div>
      <div class="mt-24 m-btns type01">
          <div class="m-btn-wrap">
              <a href="#" class="m-btn type01 bg-revert-grey" @click.prevent="$router.back()">취소</a>
          </div>
          <div class="m-btn-wrap">
              <a href="#" class="m-btn type01 bg-primary" @click.prevent="create">미션 만들기</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerTypeStuff from '@/components/headerTypeStuff.vue';
import Dropdown from "@/components/dropdown";
import InputImg from "@/components/form/posts/inputImg2";
export default {
  name:"create",
  components: {
    headerTypeStuff, Dropdown, InputImg
  },
  data() {
    return {
      missionCategories: [],
      toggleCalendar: false,
      selectedDate:{},

      durations:[
        {
          id: 0,
          name: '매일'
        },
        {
          id: 1,
          name: '매주'
        },
        {
          id: 2,
          name: '매월'
        },
      ],
      selectedCycle: 0,

      activeDropdown: false,
      categorySelected: false,

      imgs: {
          repImg: {},
          contentImgs: [],
      },
      form:{
        title: '',
        board:'mission',
        district_id: this.$auth.user.district_id,
        participant_available_count:99999,
        agree:1,
        category_id: null,
        duration: '',
        start_date: '',
        content: '',
        thumbnail: '',
      }
    }
  },
  computed: {
    computedMissionCategories() {
      return this.missionCategories.map(item => {
        return item.name;
      })
    },
    computedDate() {
      if(!this.selectedDate) return;
      if(typeof this.selectedDate === 'string') return this.selectedDate;
      if(typeof this.selectedDate === 'object' && this.selectedDate instanceof Date) {
        const year = this.selectedDate.getFullYear();
        const month = this.selectedDate.getMonth() + 1;
        const date = this.selectedDate.getDate();
        return `${year}-${month}-${date}`;
      }

    },
    computedFileName() {
      if(!this.imgs.contentImgs.length) return;
      return this.imgs.contentImgs[0].name;
    }
  },
  watch: {
    selectedDate(val) {
      if(val) {
        this.toggleCalendar = false;
      }
    }
  },
  methods: {
    async getMissionCategories() {
      const response = await this.$axios.get(`/api/mission-category`)
      this.missionCategories = response.data;
    },

    selectCycle(id) {
      this.selectedCycle = id;
    },
    toggleDropdown() {
      this.activeDropdown = !this.activeDropdown;
    },
    changeCategory(category) {
      const id = this.missionCategories.find(item => item.name === category).id;
      this.form.category_id = id;
      this.categorySelected = true;
    },

    getImgInfo(data) {
        this.imgs.contentImgs.push(data);
    },

    async create() {
      this.form = {
        ...this.form,
        duration: this.durations.find(item => item.id === this.selectedCycle).name,
        start_date: this.computedDate,
        thumbnail: this.imgs.contentImgs[0].file,
      }
      let formData = new FormData();
      for(let key in this.form) {
        formData.append(key, this.form[key]);
      }

      const response = await this.$axios.post(`/api/missions`, formData);
      if(response.status === 200) {
        alert('성공적으로 등록되었습니다')
        this.$router.push('/stuff/mission');
      }else {
        alert('등록 중 오류가 발생했습니다.')
      }
    }
  },
  mounted () {
    this.getMissionCategories();
  },
}
</script>

<style>
  flex-start {
    display: flex;
    justify-content: space-around;
    margin: 0 5px;
  }
  .flex-col-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-col-center.contents span {
    font-size: 17px;
    font-weight: 500;
  }
</style>