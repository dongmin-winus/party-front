<template>
  <div class="modal">
    <div class="modal-body">
      {{ imageUrl }}
    </div>
  </div>
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

    }
  },
}
</script>
<style scoped>
.modal {
  position: absolute;
  z-index: 999;
  top:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body {

  width: 100%;
  height: 80%;
   background-color: rgb(255, 255, 255);
}
</style>