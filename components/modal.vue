<template>
  <div class="area-modal">
    <div class="m-pop type01" @click.stop="handleBackdropClick($event, 'm-pop type01')">
      <div v-if="noPaddingModal" class="m-pop-outter" :class="btnTransparent ? 'transparent' : ''">
        <slot name="outter" />
      </div>
      <div v-if="paddingModal" class="m-pop-inner">
        <button v-if="cancelBtn" class="btn-close" @click.prevent="emitEvent('cancel')">
          <img src="@/assets/images/x.png" alt="x" style="width:21px;">
        </button>
        <div class="mt-8">
          <slot name="inner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../utils/common'
export default {
  props: {
    btnTransparent: {
      type: Boolean,
      default: false
    },
    noPaddingModal: {
      type: Boolean,
      default: false
    },
    paddingModal: {
      type: Boolean,
      default: true
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    cancel: {
      type: String,
      default: ''
    },
  },
  mixins: [common],
  methods: {
    emitEvent(eventName, payload = undefined) {
      this.$emit(eventName, payload);
    }
  },

}
</script>

<style></style>