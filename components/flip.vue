<template>
  <div>
    <!-- 트랜지션 컴포넌트로 감싸고 key를 동적으로 변경 -->
    <transition name="flip" mode="out-in">
      <div :key="currentKey" class="box">
        <div class="horizontal-line"></div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    },
  },
  watch: {
    msg() {
      this.currentKey++;
    }
  },
  data() {
    return {

      currentKey: 0,

    };
  },
};
</script>

<style scoped>
.box {
  width: fit-content;
  height: fit-content;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 20px; */
  font-size: 28px;
  font-weight: 700;
  padding-left:2px;
  padding-right:2px;
  margin: 1px;

  border-bottom: 2px solid #E5E5E5;
  border-right: 2px solid #E5E5E5;
  border-radius: 3px;
  box-shadow: 0 0 10px rgb(232, 151, 0.9);

  position: relative;
}
.box .horizontal-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #E5E5E5; /* 직선의 두께와 색상 */

}
/* CSS 애니메이션 정의 */
.flip-enter-active, .flip-leave-active {
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.flip-enter, .flip-leave-to {
  transform: rotateX(720deg);
}

</style>
