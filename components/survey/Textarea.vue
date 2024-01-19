<template>
  <div>
    <!-- 단답식 -->
    <div class="item">
      <Label :dot="true" :label="item.label" :required="item.required == 1 ? true : false" />
      <p class="explaination" v-if="item.sub_text">
        {{item.sub_text}}
      </p>
      <div class="value">
        <textarea type="number" class="input-text" v-model="inputValue" ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/form/Label.vue'
export default {
  name: 'Textarea',
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