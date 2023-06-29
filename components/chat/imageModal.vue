<template>
  <Transition name="fade">
    <div class="modal">
      <div class="modal-body">
          <img class="modal-img" :src="imageUrl">
      </div>
      <div class="modal-bottom">
        <button @click="closeBtn"  class="modal-btn">닫기</button>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  props: {
    imageUrl: {
      type: String,
    }
  },
  data() {
    return {
      modalClose: false
    }
  },
  methods: {
    closeBtn() {
      this.$emit('closeModal', this.modalClose)
    }
  }
}
</script>
<style scoped>
.modal {
  z-index: 999;
  position: fixed;
  max-width: 500px;
  top: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color:#000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-body {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #000;
  display: flex;
  justify-content: center;
  
}

.modal-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;

}

.modal-bottom {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
 
}

.modal-btn {
  font-size: 18px;
  font-weight: 500;
  height: 50px;
  width: 100%;
   background-color: rgb(255, 255, 255);
}

.modal-btn:hover  {
  font-size: 18px;
  font-weight: 500;
  width: 100%;
   background-color: #000;
}

.fade-enter-active,.fade-leave-active {
  transition: opacity .4s ease;
}

.fade-enter,.fade-leave-to {
  opacity: 0;
}
</style>