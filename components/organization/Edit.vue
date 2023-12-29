<template>
  <div>
    <div class="list-container">
      <div v-for="(item,index) in dataCase" :key="index">
        <span style="text-align: center;">{{ index + 1 }}</span>
        <input class="name" type="text" :disabled="disabled" v-model="item.name"  placeholder="이릅입력">
        <input class="phone" :class="setPhoneWidth" type="number" :disabled="disabled" v-model="item.phone"  placeholder="휴대폰입력">
        <button v-if="!disabled" class="action" :class="setActionBtnColor(item)" @click.prevnet="action(item,index)">{{ setActionBtnName(item) }}</button>
      </div>
    </div>
    <!-- <div class="sticky-btns">
      <div class="m-btn-wrap w-500" @click="$emit('cancel')">
          <a class="m-btn type01 bg-revert-red">뒤로</a>
      </div>
      <div class="m-btn-wrap w-500" @click="submit">
          <a class="m-btn type01 bg-revert-primary">{{ btnEditType }}</a>
      </div>
    </div> -->
  </div>
  
</template>

<script>
import common from '@/utils/common';
export default {
  mixins: [common],
  props: {
    disabled: {
      default(){
        return true;
      }
    },
    maxLength: {
      required: true,
      type: Number,
      default: 30
    },
    list: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  computed: {
    setPhoneWidth(){
      return this.disabled ? 'inactive' : 'active';
    },
    listForm() {
      const container = [];
      for(let i = 0; i < this.maxLength; i++) {
        container.push({
          name: '',
          phone: '',
          vol_id: this.$auth.user.id
        })
      }
      return container;
    }
  },
  watch: {
    list:{
      handler(newVal) {
        console.log(newVal,'list watched')
        const mappingList =  this.listForm.map((item, index) => {
          return {
            ...item,
            ...newVal[index]
          }
        });
        this.dataCase = [...mappingList];
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      //props not to be mutated
      dataCase: [],
      case2: [],
    }
  },
  created () {

  },
  methods: {

    async action(listItem, index){
      console.log(listItem,index, 'action:listItem')
      try {
        const { name, phone, id, vol_id } = listItem;
        const type = id ? 'update' : 'create';
        if (type === 'create') {
          if (!name) {
            return alert(`${index + 1} 번 이름을 입력해주세요.`);
          }
          if (!this.validatePhone(phone)) {
            return alert(`${index + 1} 번 전화번호를 올바르게 입력해주세요.`);
          }
        } else if (type === 'update') {
          if (name !== '' && !phone) {
            return alert(`${index + 1} 번 이름을 입력해주세요.`);
          }
          if (phone !== '' && !this.validatePhone(phone)) {
            return alert(`${index + 1} 번 전화번호를 올바르게 입력해주세요.`);
          }
        }

        const api = type == 'create' ? '/api/user-register' : `/api/user-list/${id}`;
        const params = type == 'create' ? {vol_id,name, phone, written:0} : { name, phone, written:2};
        const method = type == 'create' ? 'post' : 'put';
        const response = await this.$axios[method]( api, { ...params });
        if(response.data.result) {
          alert('회원정보 등록/수정에 성공하였습니다.');
          this.$emit('updateList', response.data.data, index);
        } else {
          //TODO 여기가 문제
          alert('회원정보 등록/수정에 실패하였습니다.');
          this.$emit('rerenderList');
        }
      } catch (error) {
        //list 새로 조회
        console.log(error, 'action:error')
        alert('회원정보 등록/수정 중 오류가 발생하였습니다.');
        //TODO 여기도 테스트 필요
        this.$emit('rerenderList');
      }

    },
    setActionBtnName(listItem){
      return listItem.id ? '수정' : '등록';
    },
    setActionBtnColor(listItem){
      return listItem.id ? 'bg-revert-red' : 'bg-revert-primary';
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
  .list-container .phone.inactive {
    width: 60%;
    margin-right:10px;
  }
  .list-container .phone.active {
    width: 40%;
  }
  .list-container .action {
    width: 20%;
    margin-top: 8px;
    margin-right: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    
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