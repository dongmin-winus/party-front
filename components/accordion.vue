<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    initialActive: {
      type: Number,
      default: null
    },
    isQuestion: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      Accordion: {
        count: 0,
        active: this.initialActive || this.initialActive == 0 ? this.initialActive : null,
        isQuestion: this.isQuestion
      }
    };
  },
  provide() {
    return { Accordion: this.Accordion };
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item:last-child {
    border-bottom: none;
  }
}
</style>
