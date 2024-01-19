<template>
  <div>
    <CheckboxGroup v-if="item.tag === 'checkbox'" :item="item" @inputValue="inputValueChanged" />
    <RadioGroup v-if="item.tag === 'radio'" :item="item" @inputValue="inputValueChanged" />
    <File v-if="item.tag === 'file'" :item="item" :form_id="form_id" @inputValue="inputValueChanged" />
    <Textarea v-if="item.tag === 'textarea'" :item="item" @inputValue="inputValueChanged"/>
    <InputText v-if="item.tag === 'text'" :item="item" @inputValue="inputValueChanged"/>
    <SelectOption v-if="item.tag === 'select'" :item="item" @inputValue="inputValueChanged"/>
    <Date v-if="item.tag === 'date'" :item="item" @inputValue="inputValueChanged"/>

  </div>
</template>

<script>
import CheckboxGroup from './CheckboxGroup.vue'
import RadioGroup from './RadioGroup.vue'
import File from './File.vue'
import Textarea from './Textarea.vue'
import InputText from './InputText.vue'
import SelectOption from './SelectOption.vue'
import Date from './Date.vue'
export default {
  name: 'SurveyItem',
  components: {
    CheckboxGroup,
    RadioGroup,
    File,
    Textarea,
    InputText,
    SelectOption,
    Date
  },
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    form_id: {
      type: String,
      default: null
    },
  },
  methods: {
    inputValueChanged(item) {
      // console.log({item},'inputValueChanged')
      this.$emit('valueChange', item)
    }
  },
}
</script>

<style></style>