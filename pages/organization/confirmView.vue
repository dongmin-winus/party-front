<template>
  <div class="container f-height">
    <div class="wrap evenly">
      <div class="m-title type01 text-center">
        자유마을 조직에<br/>참여하시겠습니까?
      </div>
        <div>
          <div class="center m-board-btns">
            <div class="m-btns type01">
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type01 bg-primary" @click.prevent="clickEvent(1)">예</a>
                </div>
                <div class="m-btn-wrap">
                    <a href="#" class="m-btn type01 bg-revert-red" @click.prevent="clickEvent(2)">아니오</a>
                </div>
            </div>
        </div>
        <div class="m-title type01  mt-12">
          <p class="sub">
            ※ 참여에 동의하시는 경우, 귀하의 전화번호가 통해 SMS, 전화 수신 등 마케팅 활동을 위한 정보 수집에 활용됩니다.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  auth:false,
  methods: {
    // {{local_api_url}}/user-accept/{{id}}?allow=1, param: {allow 1인 경우 승인, allow 2인 경우 미승인} 
    async clickEvent(number) {
      const response = await this.$axios.post(`api/user-accept/${this.$route.query.id}?allow=${number}`);
      if(response) {
        alert('응답이 등록되었습니다.')
        this.$router.push('/');
      }
    }
  },
}
</script>

<style scoped>
  .f-height {
    height: 83vh;
  
  }
  .evenly {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
  .text-center {
    text-align: center;
  }
</style>