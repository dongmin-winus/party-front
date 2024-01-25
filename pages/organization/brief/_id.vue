<template>
  <div>
    <!-- 헤더영역 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util" @click="$router.go(-1)">
            <img src="@/assets/images/back.png" alt="" style="width:10px;">
          </button>
        </div>
        <div class="center">
          <h3 class="title">{{ $auth.user.district.district }}</h3>
        </div>
        <div class="right" style="margin-left: 25px;"></div>
      </div>
    </div>
    <div class="conatiner">
      <div class="content">
        <div class="leader-organ" v-if="$auth.user">
          <div class="upper-container">
            <div class="team-logo" :style="`background-color:rgba(${setColorOrder},0.1);`">
              <span :style="`color:rgb(${setColorOrder});`">{{ $route.params.id }}</span>
            </div>
            <div class="name-container">
              <p class="name">{{ leader?.name }}</p>
              <p class="sub">{{ leader?.position }}</p>
            </div>
          </div>
          <div class="mt-8 btn-container">
            <!-- TODO jan 5th 2024 일단 가려 -->
            <!-- <btn :label="'조직 참여하기'" :btnColor="'bg-revert-primary'" @click="activeModal = true" /> -->
          </div>
        </div>
      </div>
      <div class="mt-24 member-container" v-for="(member, index) in  team " :key="index"
        @click="toSubTeam(member, index)">
        <div :class="setMemberClass(member)">
          <div class="title">
            <span class="thick" v-if="member.position == '동대표'">
              {{ $route.params.id }}팀
            </span>
            {{ member.name }}
            {{ member.position }}
          </div>
          <div v-if="member.position == '동대표'" class="title">
            ❯
          </div>
        </div>
      </div>
    </div>
    <navigation />
    <modal v-if="activeModal" @cancel="activeModal = false;">
      <template #inner>
        <div class="m-pop-title">
          <span class="point">조직 참여하기</span>
        </div>

        <div class="m-input-text type01">
          <p class="point">{{ leader?.name }} {{ leader?.position }}</p>
          <p class="sub">조직에 참여하시겠습니까?</p>
        </div>
        <div class="mt-20"></div>
        <div class="m-btns type01">
          <div class="m-btn-wrap">
            <a href="#" class="m-btn type01 bg-revert-grey" @click.prevent="">취소</a>
          </div>
          <div class="m-btn-wrap">
            <a href="#" class="m-btn type01 bg-primary" @click.prevent="">참여</a>
          </div>
        </div>
        <!-- <button type="button" class="m-btn type02 bg-revert-grey width-100" @click="">취소</button>

        <button type="button" class="m-btn type02 bg-primary width-100" @click="">참여</button> -->
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  async mounted() {
    //alert('조직활동 페이지 오픈 예정입니다.');
    //this.$router.push('/');
    const response = await this.$axios.get(`/api/supers/sub-list/${this.$route.query.team_id}`);
    this.teamData = response.data.data;
    console.log(this.$route.query, 'query')
    this.index = this.$route.query.index ?? 0;
  },
  computed: {
    team() {
      return this.teamData?.team;
    },
    leader() {
      return this.teamData?.me;
    },
    setColorOrder() {
      return this.colorMap[this.index % 10];
    }
  },
  data() {
    return {
      teamData: {},
      colorMap: {
        0: '11,175,0',
        1: '255, 111, 63',
        2: '0, 183, 241',
        3: '248, 193, 0',
        4: '165, 118, 255',
        5: '81, 129, 255',
        6: '244, 65, 65',
        7: '255, 118, 192',
        8: '18, 222, 210',
        9: '141, 6, 209',
      },
      index: 0,
      activeModal: false,
    }
  },
  methods: {
    setMemberClass(memberData) {
      console.log(memberData, 'memberData')
      const { position, members } = memberData;
      console.log(position, members, 'position, members')
      if (position == '동대표') {
        return 'member-item type01';
      }
      if (position == '반대표') {
        return 'member-item type02';
      }
      // if (position == '통장' && members) {
      //   return 'member-item type02';
      // }
      // if (position == '통장' && !members) {
      //   return 'member-item type03';
      // }
    },
    toSubTeam(memberData, index) {
      const { id } = memberData;
      this.$router.push({
        path: `/organization/brief/sub/${id}`,
        query: { team: this.leader.id, leader_name: this.leader?.name, index, team_name: this.$route.params.id }

      })
      // if (position == '동대표') {
      //   this.$router.push({
      //     path: `/organization/brief/sub/${sub_team_name}`,
      //     query: { index, team_name: this.team?.team_name } //자기 teamList 에서의 index
      //   });
      // }
      // if (position == '통장') {
      //   this.$router.push({
      //     path: `/organization/brief/sub/${this.team?.team_name}`,
      //     query: { index, team_name: this.team?.team_name }
      //   });
      // }
    }
  },
}
</script>

<style scoped>
.content {
  padding-top: 40px;
}

.leader-organ {
  margin-top: 20px;
  padding: 10px;
  height: 120px;
  border-radius: 5px;
  background: #FFF;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.leader-organ .upper-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.upper-container .team-logo {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #eee;
  margin-right: 10px;
  font-size: 28px;
  font-weight: 600;
  font-family: 'GmarketSans';
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-logo span {
  font-size: 28px;
  font-weight: 600;
  font-family: 'GmarketSans';
}

.upper-container .name-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.upper-container .name-container .name {
  font-family: 'GmarketSans';
  font-size: 20px;
  font-weight: 400;
}

.upper-container .name-container .sub {
  font-family: 'GmarketSans';
  font-size: 14px;
  font-weight: 400;
  color: #777;
}


.member-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 5px;

}

.member-container .member-item {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-container .member-item.type01 {
  background: rgba(11, 175, 0, 0.1);
}

.member-container .member-item.type01 .title,
span {
  color: #0A8803;

}

.member-container .member-item.type01 .thick {
  font-weight: 600;
}

.member-container .member-item.type02 {
  border: 1px solid #ddd;
}

.member-container .member-item.type03 {
  border: 1px solid #ddd;
}

.member-container .member-item.type03 .title {
  color: #ddd;
}
</style>