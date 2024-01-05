<template>
  <div class="teams">
    <div class="upper-container" :class="direction">
      <div class="team-logo" :style="`background-color:rgba(${setColorOrder},0.1);`">
        <span :style="`color:rgb(${setColorOrder});`">{{ setTeamName }}</span>
      </div>
      <div class="name-container">
        <p class="name">{{ team.name }}</p>
        <p class="sub">{{ team.position }}</p>
      </div>
    </div>

    <div class="mt-8 btn-container">
      <btn :label="'보기'" :btnColor="'bg-revert-primary'" @click="selectTeam" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: {
      required: true,
      type: Object,
      default: () => { }
    },
    index: {
      required: true,
      type: Number,
      default: 0
    },
    direction: {
      required: true,
      type: String,
      default: 'row'
    }
  },
  data() {
    return {
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
      }
    }
  },
  computed: {
    setColorOrder() {
      return this.colorMap[this.index % 10];
    },
    setTeamName() {
      return String.fromCharCode(65 + this.index);
    }
  },
  methods: {
    selectTeam() {
      this.$router.push({
        path: `/organization/brief/${this.setTeamName}`,
        query: { team_id: this.team.id, index: this.index }
      });
    }
  },
}
</script>

<style scoped>
.teams {
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0px 2px 7px 0px rgba(11, 175, 0, 0.25);
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.teams .upper-container {
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  padding: 0 2px;
}

.teams .upper-container.row {
  flex-direction: row;
  justify-content: flex-start;
}

.teams .upper-container.col {
  flex-direction: column;
  justify-content: center;
}

.teams .upper-container> :first-child {
  margin-bottom: 5px;
}


.teams .upper-container.row .team-logo {
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

.teams .upper-container.col .team-logo {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background: #eee;

  display: flex;
  justify-content: center;
  align-items: center;
}

.team-logo span {
  font-size: 28px;
  font-weight: 600;
  font-family: 'GmarketSans';
}

.teams .upper-container.row .name-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.teams .upper-container.col .name-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.teams .upper-container .name-container .name {
  font-family: 'GmarketSans';
  font-size: 20px;
  font-weight: 400;
}

.teams .upper-container .name-container .sub {
  font-family: 'GmarketSans';
  font-size: 14px;
  font-weight: 400;
  color: #777;
}
</style>