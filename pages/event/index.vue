<template>
  <div class="area-index">
    <!-- 헤더영역 -->
    <div class="m-header type02">
        <div class="wrap">
            <div class="left">
                <button class="btn-util">
                    <img src="@/assets/images/back.png" alt="" style="width:10px;" @click="$router.push('/')">
                </button>
            </div>

            <div class="center">
                <h3 class="title">이벤트 페이지</h3>
            </div>

            <nuxt-link to="/contents/settings" class="btn-util">
                <img src="@/assets/images/setting.png" alt="" style="width:20px;">
            </nuxt-link>
        </div>
    </div>
    <div class="container">
        <div style="width:100%;">
          <img src="@/assets/images/event/baekiljang.jpeg" style="width:inherit;" alt="">
        </div>
        <div class="mt-12"></div>
        <div class="comments-wrap">
          <div class="rounded">
            <!-- <attendance-comments :commentable_id="1" :commentable_type="`attendance`"/> -->
            <!-- <attendance-comments :commentable_id="3" :commentable_type="`calendar`"/> -->
            <comments :hide_order="true" :commentable_id="3" commentable_type="calendar"/>
          </div>
        </div>
    </div>
    <navigation />
  </div>
</template>

<script>
export default {
  auth: false,
  components: {
  },
}
</script>

<style scoped>
.pt-40 {
  padding-top: 40px;
}
.container {
  background: #f6f6f6;
  min-height: 100vh;
  overflow: scroll;
}

.comments-wrap {
  padding: 5px;
}
.comments-wrap .rounded {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 5px;
}
.btn-container {
    display: flex;
    width:100%;
    justify-content: center;
    align-content: center;
}
.btn-container .btn {
    flex:1;
    height:60px;
    font-size:20px;
    border: 1px solid #e6e6e6;

}
</style>