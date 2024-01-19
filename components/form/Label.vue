<template>
  <div class="label">
    <!-- <template v-if="dot">
      <span class="orange">·</span>
    </template> -->
    <span class="highlight">{{ highlight }}</span>
    {{ label }}<span v-if="required" style="color:red;">*</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    highlight: {
      type: String,
      default: ''
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