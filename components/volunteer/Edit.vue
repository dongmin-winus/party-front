<template>
  <div>
    <div class="list-container">
      <div v-for="(item,index) in list" :key="index">
        <span>{{ index + 1 }}</span>
        <input class="name" type="text" v-model="item.name" placeholder="이릅입력">
        <input class="phone" type="number" v-model="item.phone"  placeholder="휴대폰입력">
      </div>
    </div>
    <div class="sticky-btns">
      <div class="m-btn-wrap w-500" @click="$emit('cancel')">
          <a class="m-btn type01 bg-revert-red">뒤로</a>
      </div>
      <div class="m-btn-wrap w-500" @click="submit">
          <a class="m-btn type01 bg-revert-primary">{{ btnEditType }}</a>
      </div>
    </div>
  </div>
  
</template>

<script>
import common from '@/utils/common';
export default {
  mixins: [common],
  props: {
    propList: {
      default(){
        return [];
      }
    },
    editType: {
      default(){
        return 'create';
      }
    }
  },
  computed: {
    btnEditType(){
      return this.editType == 'create' ? '등록' : '수정';
    }
  },
  data() {
    return {
      list: [...this.propList]
    }
  },
  mounted () {
    ;
  },
  methods: {
    async submit(){
      this.list = this.list.filter(item => item.name && item.phone);
      if(!this.list.length) {
        alert('회원 정보를 입력해주세요.');
        return;
      }
      // 전화번호 validatePhone 통과 못하면 return
      for(let i = 0; i < this.list.length; i++) {
        if(!this.validatePhone(this.list[i].phone)) {
          alert('전화번호를 올바르게 입력해주세요.');
          return;
        }
      }
      const response = await this.$axios.post('/api/user-register', {
        data: this.list
      });
      if(response.data.result) {
        alert(response.data.message);
        this.$emit('cancel');
      }
    }
  }
}
</script>

<style scoped>
  .list-container {
    margin: 24px 5px 0 5px;
  }
  .list-container > div {
    display: flex;
    justify-content: space-between;
  }
  .list-container > div > input {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
  }
  .list-container .name {
    width: 25%;
  }
  .list-container .phone {
    width: 60%;
  }
  .list-container > div > span {
    width: 10%;
    padding: 10px 2px;
    margin-top: 8px;
  }
  .sticky-btns {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background-color: rgba( 255, 255, 255, 0.1 );
  }
  @media screen and (min-width: 501px) {
    .sticky-btns {
      position: fixed;
      bottom: 0;
      left: 36%;
      width: 28%;
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background-color: rgba( 255, 255, 255, 0.1 );
    }
  }
  .sticky-btns .w-500 {
    width: 48%;
  }
</style>