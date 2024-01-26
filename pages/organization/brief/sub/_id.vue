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
    <div class="container">
      <div class="content">
        <div class="m-title type01">
          <span class="leader-title point">{{ $route.query.team_name }}팀</span>
          <span class="leader-title">{{ $route.query.leader_name }} 소속</span>
        </div>
      </div>
      <div class="wrap">
        <div class="mt-12 leader-container">
          <div class="title">
            <!-- <span class="thick">
              {{ $route.params.id }}팀
              A-1 팀
            </span> -->
            {{ leader?.name }}
            {{ leader?.position }}
          </div>
        </div>
        <div class="mt-8 btn-container">
          <!-- TODO jan 5th 2024 일단 가려 -->
          <!-- <btn :label="'조직 참여하기'" :btnColor="'bg-revert-primary'" @click="activeModal = true" /> -->
        </div>
        <div class="mt-16 member-container">
          <div :class="setMemberClass(member)" v-for="(member, index) in team" :key="index">
            <div class="title">
              <span class="thick" v-if="member.position == '동대표'">
                {{ $route.query.team_name }}팀
              </span>
              {{ member.name }}
              {{ member.position }}
            </div>
            <div class="title" v-if="member.position == '동대표'">
              ❯
            </div>
          </div>
          <div v-if="team?.length == 0" class="empty-list">내용이 없습니다.</div>
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
          <!-- <p class="point">{{ leader?.name }} {{ leader?.position }}</p> -->
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
    const response = await this.$axios.get(`api/supers/sub-list/${this.$route.query.team}?team=${this.$route.params.id}`);
    this.teamData = response.data.data;
  },
  computed: {
    team() {
      return this.teamData?.team;
    },
    leader() {
      return this.teamData?.me;
    },
  },
  data() {
    return {
      activeModal: false,
      teamData: null,

    }
  },
  methods: {
    setMemberClass(memberData) {
      const { position } = memberData;
      if (position == '동대표') {
        return 'member-item type01';
      }
      if (position == '반대표') {
        return 'member-item type02';
      }
    }
  }
}
</script>

<style scoped>
.leader-title {
  font-weight: 500;
  font-size: 22px;
  font-family: 'GmarketSans';
  color: black;
}

.leader-title.point {
  color: #0BAF00;
  font-size: 22px !important;
}

.content {
  background: #eee;
  text-align: center;
  padding: 20px 0;
}

.leader-container {
  border-radius: 5px;
  background: #0BAF00;
  padding: 10px;
  height: 55px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leader-container .thick {
  color: #FFF;
  font-weight: 600;
  font-family: 'GmarketSans';
}

.leader-container .title {
  color: #FFF;
  font-family: 'GmarketSans';
}

.member-container {
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0px 2px 10px 0px rgba(11, 175, 0, 0.30);
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.member-container .member-item {
  width: 95%;
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(11, 175, 0, 0.30);
}

.member-container .member-item.type01 .title,
span {
  color: #0A8803;

}

.member-container .member-item.type01 .thick {
  font-weight: 600;
}

.member-container .member-item.type03 .title {
  color: #777;
}


.empty-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  font-family: gmarketSans;
  color: #777;
}
</style>