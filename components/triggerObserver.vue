<template>
  <div ref="triggerDiv">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
      option: {
        root: null,
        threshold: 0.3,
      },
    };
  },
  methods: {
    handleIntersect(target) {
      if (target.isIntersecting) this.$emit(`transparent`);
      else this.$emit(`transparent`);
    },
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      this.handleIntersect(entries[0]);
    }, this.option);
    this.observer.observe(this.$refs.triggerDiv);
  },
};
</script>

<style scoped>
div {
  opacity: 1;
}
</style>