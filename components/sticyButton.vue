<template>
  <div class="m-quicks type01 width-90 center" style="max-width:450px;">
    <button class="m-btn type02 width-100" @click="$emit('click')">
      {{ btnName }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: 'Excecute'
    },
  },
}
</script>

<style scoped>
  .center {
    right:50%;
    transform:translateX(50%);

  }
</style>