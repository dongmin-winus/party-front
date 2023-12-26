<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util">
            <img src="@/assets/images/back.png" alt="" style="width:10px;"  @click="$router.push('/')">
          </button>
        </div>

        <div class="center">
          <h3 class="title">조직활동 입력</h3>
        </div>
        
        <div></div>
      </div>
    </div>
    <!-- //헤더영역 -->
    <div class="container">
      <div class="wrap mt-12">
        <div class="content">
          <label for="">회원 정보</label>
          <div class="vol-info">
            <span>{{ volunteer.name }} / {{ volunteer.phone }}</span>
            <span class="verified">회원인증</span>
          </div>
        </div>
      </div>

      <Edit 
        v-if="editMode == 'create'"
        :propList="listLeft"
        :editType="editMode"
        @cancel="cancel"
      />
      <Edit 
        v-else-if="editMode == 'modify'"
        :propList="list"
        :editType="editMode"
        @cancel="cancel"
      />
      <List 
        v-else
        :list="list"
      />
      <div v-if="!editMode" class="sticky-btns">
        <div class="m-btn-wrap w-500" @click="toEdit('create')">
            <a class="m-btn type01 bg-primary">추가/등록</a>
        </div>
        <!-- <div class="m-btn-wrap w-500" @click="toEdit('modify')">
            <a class="m-btn type01 bg-primary">수정</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Edit from '@/components/volunteer/Edit.vue';
import List from '@/components/volunteer/List.vue';
export default {
  auth:false,
  components: {
    Edit,
    List
  },
  computed: {
    volunteer: {
      get () {
        return this.$store.getters.getVolunteer;
      },
      set (value) {
        this.$store.commit('setVolunteer', value);
      }
    },
    isListFull() {
      return this.list.length == 30;
    },
    listLeft() {
      const leftLength = 30 - this.list.length;
      console.log(leftLength, 'leftLength')
      const container = [];
      for(let i = 0; i < leftLength; i++) {
        container.push({
          name: '',
          phone: '',
          vol_id: this.$store.getters.getVolunteer.vol_id
        })
      }
      return container;
    }
  },
  data() {
    return {
      name: '',
      phone: '',
      form: {
        vol_id: this.$store.getters.getVolunteer.vol_id,
        name: '',
        phone: ''
      },
      list: [],
      editMode: null

    }
  },
  async created () {
    if(!this.$store.getters.getVolunteer?.vol_id) {
      this.$router.push('/volunteer/register');
    }
    await this.getList();
  },
  methods: {
    async getList() {
      const response = await this.$axios.get('/api/user-list', {
        params: {
          vol_id: this.volunteer.vol_id
        }
      });
      if(response.data.result) {
        this.list = [...response.data.data];
      }
      
    },
    toEdit(mode) {
      mode == 'create' ? this.editMode = 'create' : this.editMode = 'modify';
      
    },
    cancel() {
      this.editMode = null;
      this.getList();
    }
  },
}
</script>

<style scoped>
  .vol-info {
    border: 1px solid #eee;
    padding: 12px;
    border-radius: 4px;
    margin-top: 8px;
    display:flex;
    justify-content: space-between;
  }
  .verified {
    color: #0BAF00;
    background-color: #E7F7E5;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #0BAF00;
    font-size: 12px;
  }

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
    border-top: 1px solid #eee;
  }
  .sticky-btns .w-500 {
    width: 100%;
  }
</style>
