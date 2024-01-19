<template>
  <div>
    <!-- 체크박스 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <div class="checkboxes">
          <div class="checkbox" v-for="(el, index) in item.values" :key="index">
            <input type="checkbox" style="display:inline !important;" :id="el" :value="index"
              @change="check(el)" />
            <label :for="el">{{ el }}</label>
          </div>
        </div>
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
  },
  
  data() {
    return {
      checked: [],
    }
  },
  mounted () {
    this.checked = this.item.values.map((_, index) => {
      return {
        value: index,
        checked: 0,
      }
    })
  },
  methods: {
    check(el) {
      this.checked = this.item.values.map((innerEl, index) => {
        const target = el === innerEl;
          return {
            value: index,
            checked: target ?
             this.checked[index] === 1 ? 0 : 1 :
              this.checked[index].checked,
          }
      });
      const response = {
        id: this.item.id,
        value: this.checked
      }
      this.$emit('inputValue', response)
    }
  },
}
</script>

<style></style>