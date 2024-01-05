<template>
  <div class="m-board-btns">
    <div class="m-btns type01">
      <div class="m-btn-wrap">
        <a href="#" :class="btnColor" class="m-btn type01" @click.prevent="$emit('click')">{{ label }}</a>
      </div>
      <div class="m-btn-wrap" v-if="viceBtn">
        <a href="#" :class="viceBtnColor" class="m-btn type01" @click.prevent="$emit('clickVice')">{{ viceLabel }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '버튼'
    },
    btnColor: {
      type: String,
      default: 'bg-primary'
    },
    viceBtn: {
      type: Boolean,
      default: false
    },
    viceBtnColor: {
      type: String,
      default: 'bg-red'
    },
    viceLabel: {
      type: String,
      default: '버튼'
    }
  }
}
</script>

<style></style>