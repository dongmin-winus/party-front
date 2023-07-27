<template>
  <div class="area-stuff">
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
            <button class="btn-util">
                <img src="@/assets/images/back.png" alt="" style="width:10px;" @click="$router.back()">
            </button>
        </div>

        <div class="center">
            <h3 class="title">{{title}}</h3>
        </div>

        <div></div>
      </div>
    </div>
    <div class="m-header type02 add" v-if="current">
      <div class="menu-container">
        <div class="left">
          <nuxt-link to="/">
            <img style="padding-top:7px;" src="@/assets/images/home_stuffed.png" alt="홈버튼 자리">
          </nuxt-link>
          <span style="color:#999">|</span>
          <nuxt-link to="/stuff" style="color:#0A8803; font-size:20px;">행사교육</nuxt-link>
        </div>

        <div class="right"  @click="toggleActiveBox">
          <button>
            <span class="current">{{current.value}}</span>
            <div class="box-links" v-if="activeBox">
              <nuxt-link :class="`link ${current.code == 'assembly' ? 'active' : ''}`" to="/stuff/assembly">대규모집회</nuxt-link>
              <!-- <nuxt-link :class="`link ${current.code == 'meeting' ? 'active' : ''}`"  to="/stuff/meeting">동네모임</nuxt-link> -->
              <nuxt-link :class="`link ${current.code == 'mission' ? 'active' : ''}`"  to="/stuff/mission">다양한 미션</nuxt-link>
              <!-- <nuxt-link :class="`link ${current.code == 'education' ? 'active' : ''}`"  to="/stuff/education">마을교육</nuxt-link> -->
            </div>
          </button>
          <div class="chevron" style=""></div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    current: {
      type: Object,
      default: () => ({
        value: '대규모집회',
        code: 'assembly',
      })
    },
  },
  data() {
    return {
      activeBox: false,
    }
  },
  methods: {
    toggleActiveBox() {
      this.activeBox = !this.activeBox;
    }
  },
}
</script>

<style scoped>
.box-links {
  width:100%;
  position:absolute; top:calc(100%); left:0;
  border-radius:5px;
  background-color:#fff; box-shadow:0px 3px 6px rgba(0,0,0,0.16);
} 
.box-links .link {
  display:flex; 
  width:100%;
  height: 60px;
  white-space: nowrap; text-align: center;
  justify-content:center; align-items:center;
  font-size: 20px;
  border-top: 1px solid #eee;
  color:black;
}
.box-links .link.active {
  background-color:#0A8803;
  color:white;
}
.chevron {
  background-image:url('@/assets/images/chevron-down-outline.png');
}
</style>