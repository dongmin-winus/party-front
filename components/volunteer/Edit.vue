<template>
  <div>
    <div class="list-container">
      <div v-for="(item,index) in dataCase" :key="index">
        <span>{{ index + 1 }}</span>
        <input class="name" type="text" :disabled="disabled" v-model="item.name"  placeholder="이릅입력">
        <input class="phone" :class="setPhoneWidth" type="number" :disabled="disabled" v-model="item.phone"  placeholder="휴대폰입력">
        <button v-if="!disabled" class="action" :class="setActionBtnColor(item)" @click.prevnet="action(item)">{{ setActionBtnName(item) }}</button>
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
    //진짜 데이터
    propList: {
      default(){
        return [];
      }
    },
    //30개 강제로 돌린거
    listForm: {
      default(){
        return {
          name: '',
          phone: ''
        }
      }
    },
    disabled: {
      default(){
        return true;
      }
    },
    //not used
    editType: {
      default(){
        return 'create';
      }
    }
  },
  computed: {
    // btnEditType(){
    //   return this.editType == 'create' ? '등록' : '수정';
    // },
    setPhoneWidth(){
      return this.disabled ? 'inactive' : 'active';
    },
  },
  watch: {
    propList:{
      handler(newValue) {
        const mappingList =  this.listForm.map((item, index) => {
          return {
            ...item,
            ...this.propList[index]
          }
        });
        this.dataCase = [...mappingList];
      },
      immediate: true
    }
  },
  data() {
    return {
      //props not to be mutated
      dataCase: [],
      case2: []
    }
  },
  created () {
    //listForm 의 상위에 propList 를 덮어씌움

  },
  methods: {
    // async submit(){
    //   this.list = this.list.filter(item => item.name && item.phone);
    //   if(!this.list.length) {
    //     alert('회원 정보를 입력해주세요.');
    //     return;
    //   }
    //   // 전화번호 validatePhone 통과 못하면 return
    //   for(let i = 0; i < this.list.length; i++) {
    //     if(!this.validatePhone(this.list[i].phone)) {
    //       alert('전화번호를 올바르게 입력해주세요.');
    //       return;
    //     }
    //   }
    //   const response = await this.$axios.post('/api/user-register', {
    //     data: this.list
    //   });
    //   if(response.data.result) {
    //     alert(response.data.message);
    //     this.$emit('cancel');
    //   }
    // },
    updateItem($event,idx, itemKey){
      this.case2.push({
        ...this.dataCase[idx],
        [itemKey]: $event.target.value
      })
    },
    async action(listItem){
      console.log(listItem, 'listItem')
      try {
        const { name, phone, id, vol_id } = listItem;
        const type = listItem.id ? 'update' : 'create';
        // if(!listItem.name) {
        //   alert('이름을 입력해주세요.');
        //   return;
        // }
        // if(!listItem.phone) {
        //   alert('전화번호를 입력해주세요.');
        //   return;
        // }
        // if(!this.validatePhone(listItem.phone)) {
        //   alert('전화번호를 올바르게 입력해주세요.');
        //   return;
        // }
        const api = type == 'create' ? '/api/volunteer-register' : `/api/volunteer-list/${id}`;
        const params = type == 'create' ? {vol_id,name, phone, written:0} : { name, phone, written:2};
        const method = type == 'create' ? 'post' : 'put';
        const response = await this.$axios[method]( api, { 
          
            ...params
        
          
        });
        console.log(response.data, 'response.data',1111111)
        if(response.data.result) {
          alert('회원정보 입력/적용에 성공하였습니다.');
          this.$emit('updateList', response.data.data);
        } else {
          //TODO 여기가 문제
          alert('회원정보 입력/적용에 실패하였습니다.');
        }
      } catch (error) {
        //list 새로 조회
        alert('회원정보 입력/적용 중 오류가 발생하였습니다.');
        //TODO 여기도 테스트 필요
        this.$emit('updateList');
      }

    },
    setActionBtnName(listItem){
      
      return listItem.id ? '적용' : '등록';
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
  }
  .list-container .phone.active {
    width: 40%;
  }
  .list-container .action {
    width: 20%;
    margin-top: 8px;
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