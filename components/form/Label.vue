<template>
  <div class="label">
    <template v-if="dot">
      <span class="orange">·</span>
      &nbsp;
    </template>
    <span class="highlight">{{ highlight }}</span>&nbsp;{{ label }}&nbsp;<span v-if="required" style="color:red;">*</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '하이라이트'
    },
    highlight: {
      type: String,
      default: '라벨'
    },
    dot: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    
    }
  }
}
</script>

<style>
  .label {
    display: flex;
    font-size: 24px;
    font-family: GmarketSans;
    font-weight:400;
  }
  .label .orange {
    color:  #ff7400;
    font-size:20px;
  }
  .label .highlight {
    font-weight: 600;
    font-size: 24px;
    font-family: GmarketSans;
  }

</style>