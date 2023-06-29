<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          채널 채팅방 나가기
        </div>
        <div class="modal-body">
          나가기를 하면 대화내용이 모두 삭제되고 <br>
          채팅목록에서도 삭제됩니다.
        </div>
        <div class="modal-bottom">
          <button class="delete">나가기</button>
          <button class="cancel">취소</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>

export default {
  data() {
    return {
    }
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 85%;
  height: 200px;
  background-color: #fff;
  margin: 0px auto;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px
}

.modal-header {
  font-size: 20px;
  font-weight: 500;
}

.modal-body {
  font-weight: 350;
}

.modal-bottom {
  display: flex;
  justify-content: space-around;
}

.delete {
  padding: 10px 20px;
}

.cancel {
  padding: 10px 20px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>