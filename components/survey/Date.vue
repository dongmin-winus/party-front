<template>
  <div>
    <!-- 단답식 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <input type="date" class="input-date" v-model="inputValue" />
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  name: 'Date',
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
      inputValue: '',
    }
  },
}
</script>

<style></style>