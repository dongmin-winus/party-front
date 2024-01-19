<template>
  <div>
    <!-- 체크박스 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <div class="checkboxes" style="grid-template-columns:3fr !important;">
          <Dropdown
            :menu-title="'선택'"
            :items="item.values"
            :value="'0'"
            :selected="selected"
            :activate="activeDropdown"
            @toggle="toggleDropdown"
            @change="changeSelected"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  name: 'SelectOption',
    components: {
    Label,
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
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
  data() {
    return {
      selected: false,
      activeDropdown: false,
      inputValue: '',
    }
  },
  methods: {
    toggleDropdown() {
      this.activeDropdown = !this.activeDropdown;
    },
    changeSelected(item) {
      // console.log(item,3333)
      this.inputValue = item;
      this.selected = true;
    },
  },
}
</script>

<style></style>