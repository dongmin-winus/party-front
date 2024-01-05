<template>
  <div>
    <header-type01 />
    <div class="container">
      <div class="content">
        <div class="m-title type01">
          {{ $store.state.district.district }} 조직도
        </div>
      </div>
    </div>
    <div class="wrap">
      <!-- <div class="my-organ" v-if="$auth.user">
        <div class="name-container">
          <p class="name">{{ $auth.user.name }}</p>
          <p class="sub">회원/동대표/실행위원장</p>
        </div>
        <div class="mt-8 btn-container">
          <btn :label="'내 조직'" :btnColor="'bg-revert-primary'" @click="test" />
        </div>
      </div> -->
      <div class="mt-24" :class="setGridSize">
        <div v-for="(team, index) in teamList" :key="index">
          <team :team="team" :index="index" :direction="setDirection" />
        </div>
      </div>
      <div v-if="!teamList?.length">
        <div class="center">
          <span style="color:#777">내용이 없습니다</span>
        </div>
      </div>


    </div>
    <navigation />
  </div>
</template>

<script>
import Team from '@/components/organization/brief/Team.vue';
export default {
  auth: false,
  components: {
    Team,
  },
  computed: {
    teamList() {
      return this.teamData?.team;
    },
    setGridSize() {
      const length = this.teamList?.length;
      const size = length < 4 ? 1 : length < 9 ? 2 : 3;
      return `grid-${size}`;
    },
    setDirection() {
      const length = this.teamList?.length;
      const size = length < 4 ? 1 : length < 9 ? 2 : 3;
      return size === 1 ? `row` : `col`;
    }
  },
  async mounted() {
    //alert('조직활동 페이지 오픈 예정입니다.');
    //this.$router.push('/');
    const response = await this.$axios.get('/api/supers/district-list', {
      params: {
        district_id: this.$store.state.district.id
      }
    });
    this.teamData = response.data.data;
  },
  data() {
    return {
      teamData: {}
    }
  },
  methods: {
    test() {
      alert('test 예정입니다.');
    },

  },
}
</script>

<style scoped>
.content {
  background: #eee;
  text-align: center;
  padding: 40px 0;
}

.center {
  text-align: center;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-organ {
  margin-top: 20px;
  padding: 10px;
  height: 120px;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0px 2px 7px 0px rgba(11, 175, 0, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-organ .name-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-organ .name-container .name {
  font-family: 'GmarketSans';
  font-size: 20px;
  font-weight: 400;
}

.my-organ .name-container .sub {
  font-family: 'GmarketSans';
  font-size: 14px;
  font-weight: 400;
  color: #777;
}

.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
