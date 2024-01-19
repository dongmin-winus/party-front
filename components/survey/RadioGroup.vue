<template>
  <div>
    <!-- 라디오 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <div class="checkboxes" :class="setCustom">
          <div class="checkbox" v-for="(el, index) in item.values" :key="index">
            <input type="radio" style="display:inline !important;" :id="el" :value="index"
              v-model="inputValue" />
            <label :for="el">{{ el }}</label>
          </div>
        </div>
        <!-- <p class="explaination" style="font-size:10px;">
          (이번 주에 완료하신분만 체크)
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  name: 'CheckboxGroup',
  components: {
    Label,
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    isCustom: {
      type: Boolean,
      default: false
    }
  }, 
  watch: {
    inputValue(val) {
      const response = {
        id: this.item.id,
        value: val
      }
      this.$emit('inputValue', response)
    }
  },
  computed: {
    setCustom() {
      return this.isCustom ? 'custom' : ''
    }
  },
  data() {
    return {
      inputValue: '',
    }
  },
}
</script>

<style></style>