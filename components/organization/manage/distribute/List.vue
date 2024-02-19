<template>
  <div>
    <div class="mt-16 list-container">
      <div class="mt-12"></div>
      <div v-if="type == 'checkbox'" class="item-all">
        <div class="m-input-checkbox type01">
          <input type="checkbox" id="stw" @click="selectTwelve">
          <label for="stw">
            <span class="quote">12명 일괄선택</span>
          </label>
        </div>
      </div>

      <div v-if="type=='checkbox'" class="item" :class="checkedClass(item.id)" v-for="(item,index) in list" :key="item.id" >
        <div class="m-input-checkbox type01">
          <input type="checkbox"
            :id="item.id" 
            :value="item.id"
            :checked="isChecked(item.id)"
            @click="selectItem(item.id)"
          >

          <label class="label" :for="item.id">
              <span>{{item.name}}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{{item.phone}}</span>
          </label>
        </div>
      </div>

      <div v-if="type=='radio'" class="item" :class="pickedClass(item.id)" v-for="(item,index) in selected" :key="item.id" >
        <div class="m-input-radio type01">
          <input type="radio"
            :id="item.id" 
            :value="item.id"
            v-model="radioPicked"
            @click="pickItem(item.id)"
          >

          <label class="label" :for="item.id">
              <span>{{item.name}}</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{{item.phone}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'DistributeList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'checkbox'
    }
  },
  data() {
    return {

      selected: [],
      radioPicked: null,
    }
  },
  watch: {
    selected(val) {
      this.$emit('select', val);
    },
    // list(val) {
    //   this.selected = [];
    // }
  },
  methods: {
    isChecked(id) {
      return this.selected.find(item => item.id == id);
    },
    checkedClass(id) {
      return this.isChecked(id) ? 'checked' : '';
    },
    selectItem(id) {
      console.log(id)
      console.log(this.list.find(item => item.id == id))
      if (this.isChecked(id)) {
        this.selected = this.selected.filter((item) => item.id !== id);
      } else {
        this.selected.push(this.list.find(item => item.id == id));
      }
    },
    selectTwelve() {
      if (this.selected.length === 12) {
        this.selected = [];
      } else {
        //this.selected의 길이가 12가 될떄까지 this.list의 id를 this.selected에 넣어준다.
        this.selected = this.list.map((item) => item).slice(0, 12);
      }
    },
    pickedClass(id) {
      return this.radioPicked == id ? 'picked' : '';
    },
    pickItem(id) {
      this.radioPicked = id;
      this.$emit('select', [this.selected.find(item => item.id == id)]);
    },
  },
  vmouonted() {
    this.selected = [];
  }
}
</script>

<style scoped>

  .list-container {
    background-color: #f5f5f5;
    padding-top: 5px;
    padding-bottom: 10px;

  }
  .item-all {
    width: 90%;
    padding: 0 10px 0 10px;
    margin: 0 15px 0 15px;
  }
  .item {
    width: 90%;
    padding: 10px;
    margin: 15px;
    background: #fff;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
  }
  .item.checked {
    border: 1px solid #0BAF00;
  }
  .item.picked {
    border: 1px solid #0BAF00;
    background: #F2FFF0;
  }
  .m-input-checkbox {
    display: flex;
    align-items: center;
  }
  .label {
    flex-grow: 1;
    justify-content: space-evenly !important;

  }
  .label span {
    color: #0BAF00;
    font-size: 20px;
  }

  .quote {
    color: #000;
    font-size: 20px;
    
  }
</style>