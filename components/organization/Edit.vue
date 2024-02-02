<template>
  <div>
    <div class="list-container">
      <div v-for="(item, index) in dataCase" :key="index" v-if="listTypeFilter === true || item.allow == listTypeFilter">
        <span style="text-align: center;">{{ index + 1 }}</span>
        <input class="name" type="text" :disabled="item.allow == 1" @focus="onFocus(index)" @blur="onBlur"
          v-model="item.name" placeholder="이름입력">
        <input class="phone" :class="setPhoneWidth" type="number" @focus="onFocus(index)" @blur="onBlur"
          :disabled="item.allow == 1" v-model="item.phone" placeholder="휴대폰입력">
        <button v-if="!disabled" class="action" :disabled="item.allow == 1" :class="setActionButton(item, 'color')"
          @click.prevent="action(item, index)">{{ setActionButton(item, 'name') }}</button>
      </div>
      <modal v-show="active" @cancel="active = false;">
        <template #inner>
          <div class="m-pop-title">
            <span class="point">조직활동 등록</span>
          </div>

          <div class="m-input-text type01">
            <span>{{ targetName }}님에게 동의 요청 하시겠습니까?<br />요청 시 등록 확인 문자가 발송됩니다.</span>
          </div>
          <div class="mt-20"></div>

          <button type="button" class="m-btn type02 bg-revert-primary width-100"
            @click="action(registerItem, registerIndex)">등록</button>
        </template>
      </modal>
    </div>

  </div>
</template>

<script>
import common from '@/utils/common';
export default {
  mixins: [common],
  props: {
    disabled: {
      default() {
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
    },
    listType: {
      required: true,
      type: String,
      default: 'all'
    }
  },
  computed: {
    listTypeFilter() {
      const statusMap = {
        'all': true,
        'waiting': 0,
        'granted': 1,
        'denied': 2
      };
      return statusMap[this.listType];
    },
    setPhoneWidth() {
      return this.disabled ? 'inactive' : 'active';
    },
    listForm() {
      const container = [];
      for (let i = 0; i < this.maxLength; i++) {
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
    list: {
      handler(newVal) {
        console.log(newVal, 'list watched')
        const mappingList = this.listForm.map((item, index) => {
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

      registerItem: {},
      registerIndex: 0,

      focused: false,
      focusedIdx: -1,
      targetName: '',
    }
  },
  methods: {
    //not used
    getAllowIcon(allow) {
      if (allow == 0) {
        return '';
      } else if (allow == 1) {
        return '✅';
      } else if (allow == 2) {
        return '❌';
      }
    },

    async action(listItem, index) {
      try {
        const { name, phone, id, vol_id } = listItem;
        this.targetName = name;
        const type = id ? this.focused && listItem.id == this.dataCase[this.focusedIdx].id ? 'update' : 'resend' : 'create';
        if (type === 'create') {
          if (!name) {
            alert(`${index + 1} 번 이름을 입력해주세요.`);
            this.$emit('rerenderList');
            return;
          }
          if (!this.validatePhone(phone)) {
            alert(`${index + 1} 번 전화번호를 올바르게 입력해주세요.`);
            this.$emit('rerenderList');
            return;
          }
          if (phone === this.$auth.user.phone) {
            alert('본인의 전화번호는 등록할 수 없습니다.');
            this.$emit('rerenderList');
            return;
          }
          if (!this.active) {
            this.registerItem = listItem;
            this.registerIndex = index;
            this.active = true;
            return;
          }
        } else if (type === 'update' || type === 'resend') {
          if (name == '' && phone) {
            alert(`${index + 1} 번 이름을 입력해주세요.`);
            this.$emit('rerenderList');
            return;
          }
          if (phone !== '' && !this.validatePhone(phone)) {
            alert(`${index + 1} 번 전화번호를 올바르게 입력해주세요.`);
            this.$emit('rerenderList');
            return;
          }
        }
        const preset = [
          {
            type: 'create',
            api: '/api/user-register',
            method: 'post',
            params: { vol_id, name, phone, written: 0 },
            success: '활동요청문자가 발송되었습니다.',
            fail: '회원정보 등록에 실패하였습니다.'
          },
          {
            type: 'update',
            api: `/api/user-list/${id}`,
            method: 'put',
            params: { name, phone, written: 2 },
            success: '회원정보가 수정되었습니다.',
            fail: '회원정보 수정에 실패하였습니다.'
          },
          {
            type: 'resend',
            api: `/api/user-resend/${id}`,
            method: 'post',
            params: { phone },
            success: '활동요청문자가 발송되었습니다.',
            fail: '활동요청문자 발송에 실패하였습니다.'
          }
        ]
        // const api = type == 'create' ? '/api/user-register' : `/api/user-list/${id}`;
        // const params = type == 'create' ? { vol_id, name, phone, written: 0 } : { name, phone, written: 2 };
        // const method = type == 'create' ? 'post' : 'put';
        const { api, params, method, success, fail } = preset.find((item) => item.type === type);
        const response = await this.$axios[method](api, { ...params });
        if (response.data.result) {
          this.active = false;
          alert(response.data.message ?? success)
          this.$emit('updateList');
        } else {
          this.active = false;
          alert(response.data.message ?? fail);
          this.$emit('rerenderList');
        }
      } catch (error) {
        this.active = false;
        alert('데이터 전송 중 오류가 발생하였습니다.');
        this.$emit('rerenderList');
      }

    },
    onFocus(index) {
      setTimeout(() => {
        this.focused = true;
        this.focusedIdx = index;
      }, 100);

    },
    onBlur() {
      setTimeout(() => {
        this.focused = false;
        this.focusedIdx = -1;
      }, 100);
    },
    setActionButton(listItem, returnType = 'name') {
      let name, color;

      if (listItem.allow === 1) {
        name = '완료';
        color = 'bg-lightGray';
      } else if (listItem.allow === 2) {
        if (this.focused && listItem.id === this.dataCase[this.focusedIdx].id) {
          name = '수정';
          color = 'bg-revert-red';
        } else {
          name = '거절';
          color = 'bg-revert-grey';
        }
      } else if (listItem.id) {
        if (this.focused && listItem.id === this.dataCase[this.focusedIdx].id) {
          name = '수정';
        } else {
          name = '재전송';
        }
        color = 'bg-revert-red';
      } else {
        name = '등록';
        color = 'bg-revert-primary';
      }

      return returnType === 'name' ? name : color;

    }
  }
}
</script>

<style scoped>
.list-container {
  margin: 24px 5px 15px 5px;
}

.list-container>div {
  display: flex;
  justify-content: space-between;
}

.list-container>div>input {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
}

.list-container .name {
  width: 25%;
}

.list-container .phone.inactive {
  width: 58%;
  margin-right: 10px;
}

.list-container .phone.active {
  width: 38%;
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

.list-container>div>span {
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
  background-color: rgba(255, 255, 255, 0.1);
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
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.sticky-btns .w-500 {
  width: 48%;
}
</style>