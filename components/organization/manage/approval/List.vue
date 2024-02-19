<template>
  <div class="mt-16 list-container">
    <div class="item" :class="pickedClass(item.id)" v-for="(item,index) in list" :key="item.id" >
      <div class="m-input-radio type02">
        <input type="radio"
          :id="item.id" 
          :value="item.id"
          v-model="radioPicked"
          @click="pickItem(item.id)"
        >

        <label class="label" :for="item.id">
          <template v-if="phase == 1">
            <span>{{item.type}}</span>
          </template>
          <template v-if="phase == 2">
            <span>{{item.name}}</span>
            <span>&nbsp;/&nbsp;</span>
            <span>{{item.phone}}</span>
          </template>
          <template v-if="phase == 3">
            <span>{{item.reason}}</span>
          </template>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApprovalList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    phase: {
      type: Number,
      default: 1
    }
  },
  watch: {
    phase(newValue, oldValue) {
      if(newValue != oldValue) {
        this.radioPicked = null;
      }
    }
  },
  data() {
    return {
      radioPicked: null,

    }
  },
  methods: {
    pickedClass(id) {
      return this.radioPicked == id ? 'picked' : '';
    },
    pickItem(id) {
      this.radioPicked = id;
      this.$emit('pick', [this.list.find(item => item.id == id)]);
    },
  },
}
</script>

<style scoped>
  .list-container {
    background-color: #f5f5f5;
    padding-top: 5px;
    padding-bottom: 10px;
  }
  .item {
    width: 90%;
    padding: 10px;
    margin: 15px;
    background: #fff;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
  }
  .item.picked {
    border: 1px solid #DE0000;
    background: #FCE5E5;
  }
  .label {
    flex-grow: 1;
    justify-content: flex-start !important;

  }
  .label span {
    color: #DE0000;
    font-size: 20px;
  }
</style>