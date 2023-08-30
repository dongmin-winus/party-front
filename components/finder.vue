<template>
  <div class="m-pop type01" @click.stop="handleBackdropClick($event, 'm-pop type01')">
    <div class="m-pop-inner">
      <button class="btn-close" @click.prevent="emitEvent('cancel')">
        <img src="@/assets/images/x.png" alt="" style="width:21px;">
      </button>
      <div class="m-pop-title">{{title}}</div>
      <div class="mt-8"></div>
      <div class="m-board-btns mt-20">
        <div class="m-input m-input-text type01 clear-input-container">
          <input  v-model="keyword" type="text" placeholder="주소를 입력해주세요">
          <button class="clear-input-btn" v-if="searchComplete" @click="clearInput">
            <span class="btn-character">X</span>
          </button>
        </div>
        <div class="mt-16"></div>
        <Dropdown
          v-if="searchComplete"
          :menu-title="'검색 결과'"
          :items="results"
          :value="'0'"
          :selected="selected"
          :activate="activeDropdown"
          @toggle="toggleDropdown"
          @change="changeSelected"
        />
        <div class="m-btns type01">
          <div class="m-btn-wrap" v-if="!searchComplete">
            <button class="m-btn type02 bg-revert-red width-100" @click.prevent="trans">검색하기</button>
          </div>
          <div class="m-btn-wrap" v-if="searchComplete">
            <button class="m-btn type02 bg-revert-primary width-100" @click.prevent="search">선택하기</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Dropdown from './dropdown.vue'
import common from '../utils/common'
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    excecute: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    },
    item:{
      type: Object,
      default: () => {}
    }
  },
  mixins: [common],
  components: {
    Dropdown,
  },
  data() {
    return {
      keyword: "",
      sqlKeywords : ["OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
             		 "UNION",  "FETCH", "DECLARE", "TRUNCATE" ],
      stateDictionary: {
        "서울특별시": "서울",
        "경기도": "경기",
        "인천광역시": "인천",
        "부산광역시": "부산",
        "대구광역시": "대구",
        "광주광역시": "광주",
        "대전광역시": "대전",
        "울산광역시": "울산",
        "세종특별자치시": "세종",
        "강원특별자치도": "강원",
        "충청북도": "충북",
        "충청남도": "충남",
        "전라북도": "전북",
        "전라남도": "전남",
        "경상북도": "경북",
        "경상남도": "경남",
        "제주특별자치도": "제주"
      },
      searchComplete : false,
      activeDropdown: false,
      results: [],
      selected:false,
    }
  },
  watch: {
    keyword(newValue, oldValue) {
      let expText = /[%><]/;
      if(expText.test(newValue)) {
        alert(`'>','<'와 같은 특수문자는 입력할 수 없습니다.`);
        this.keyword = oldValue;
      }
      this.sqlKeywords.forEach(sqlword => {
        let regex = new RegExp(sqlword,"gi");
        if(regex.test(newValue)) {
          alert('사용불가능한 단어가 포함되어있습니다.')
          this.keyword = oldValue;
        }
      })
    }
  },

  methods: {
    emitEvent(eventName, payload = undefined) {
      this.$emit(eventName, payload);
    },
    clearInput() {
      this.keyword = null;
      this.searchComplete = false;
      this.selected = false;
      this.results = [];
    },
    toggleDropdown() {
      this.activeDropdown = !this.activeDropdown;
    },
    changeSelected(item) {
      this.keyword = item;
      this.selected = true;
    },
    async trans() {
        if(this.keyword == '')
          return;
        this.$axios.get("/addrlink/addrLinkApi.do", {
            params: {
                confmKey: 'U01TX0FVVEgyMDIxMTIxNjE0MTM1OTExMjAzNzk=',
                resultType: 'json',
                addInfoYn: 'Y',
                keyword: this.keyword
            },
        }).then(({data}) => {
          const array = data.results.juso.map(item => {
            return `${this.handleAddr(item.hemdNm)}`
            
          });
          this.results = [...new Set(array)];
          this.toggleDropdown();

          // const hemdNm = data.results.juso[0].hemdNm;
          // this.keyword = hemdNm;
          this.searchComplete = true;
        })
    },
    handleAddr(addr) {
      const arr = addr.split(" ");
      if(arr.length == 4)
        return `${arr[0]} ${arr[1]}${arr[2]} ${arr[3]}`;
      else if(arr.length == 3)
        return `${arr[0]} ${arr[1]} ${arr[2]}`;
    },
    search() {
      const keys = ['state','city','district'];
      const values = this.keyword.split(" ");
      values[0] = this.stateDictionary[values[0]];
      const container = {};
      keys.forEach((el,idx) => {
        container[el] = values[idx]
      })
      this.$emit('setContainer',container);
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
input:disabled {
  -webkit-text-fill-color: #000;
  opacity: 1; /* required on iOS */
}

.clear-input-container {
  position: relative;
}

.clear-input-container .clear-input-btn {
  position:absolute;
  right:10px;
  top: 50%;
  transform:translateY(-50%);
  
}
.clear-input-container .clear-input-btn .btn-character {
  font-size: 20px;
  font-weight:700;
  color: #777777;
}
</style>