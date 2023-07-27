<template>
  <div class="area-stuff">
    <headerTypeStuff :title="''" :current="null" />
    <div style="padding-top: 59px !important; min-height:100vh; padding-bottom:60px;">
      <div class="section-title">
        <span class="m-title type01">미션 정보 / 인증</span>
      </div>
      <div class="section-image">
        <div v-if="missionData.img" :style="`background:url(${missionData.img.url}) no-repeat;`" class="image-container"></div>
        <div v-else class="image-container">
          <img src="@/assets/images/bg_taegeuk.png" style="" alt="">
        </div>
      </div>

      <!-- 미션 정보 -->
      <div class="section-main-info">
        <div class="mission-info flex-col">
          <div class="flex-start p-15">
            <div v-if="missionData.img" class="image-container preview mr-5" :style="`background:url(${missionData.img.url}) no-repeat;`" ></div>
            <div v-else class="preview-container preview mr-5">
              <img src="@/assets/images/bg_taegeuk.png" style="" alt="">
            </div>
            <div class="content-title">{{ missionData.title }}</div>
          </div>
          <div class="btns p-15 w-100p flex-center">
            <div class="flex-center mr-5 content left primary">{{ missionData.participant_count }} 명 참여</div>
            <div class="flex-center mr-5 content right grey">리더 {{ replaceText(missionData.user,6) }}</div>
          </div>
          <div class="mt-12"></div>
        </div>
      </div>
      <div class="section-content flex-col">
        <div><b style="font-weight:500;">{{ missionData.user }}</b>님이 만든 미션</div>
        <div class="mt-8"><b style="font-size:24px; font-weight:500;">{{ missionData.title }}</b></div>
        <div class="mt-8 btns w-100p">
          <div class="flex-center content grey info" :class="`${missionData.end_date?'':'no-end-date'}`">
            <span>진행</span>&nbsp;<span style="color:#0baf00"> {{ missionData.stamp_count }} {{ cycle }}째</span>,&nbsp;
            <span>{{ missionData.duration }}</span>
            <span v-if="missionData.end_date">,&nbsp;{{ dateDiffInDays(missionData.end_date, missionData.start_date) }}일간 {{ `(${missionData.end_date } 까지)` }}</span>
          </div>
        </div>
        <template v-if="missionData.content">
          <hr />
          {{ missionData.content }}
        </template>
      </div>

      <!-- 미션인증 리스트 -->
      <div class="section-content flex-col" v-for="(item, index) in participateList">
        <div class="flex-start">
          <img class="favicon-size mr-5" v-if="item.user.img?.url" :src="item.user.img.url" alt="">
          <img class="favicon-size mr-5" v-else src="@/assets/images/taegeuk.png" alt="">
          <span>{{ item.user.nickname }}</span>&nbsp;|&nbsp;<span>{{ item.diff_at }}</span>
        </div>
        <div>
          <span class="primary">
            <img src="@/assets/images/mission_complete.png" alt="">
            미션 인증: {{ missionData.title }}
          </span>
        </div>
        <div>
          <span>
            #{{ item.participant_count }}{{cycle}}차 인증
          </span>
        </div>
        <div v-if="item.content">
          <p>{{ replaceContent(item.content) }}</p>
        </div>
        <div v-if="item.thumbnail?.url" class="thumbnail-container">
          <img :src="item.thumbnail.url" alt="">
        </div>
      </div>

      <!-- 스크롤로딩 -->
      <scroll-loading @load="loadMore" v-if="links.next" />
      <div class="mt-40"></div>
      <stictyButton v-if="missionData.stamp_count > 0" :btnName="'미션 인증하기'" @click="participateMission"/>

    </div>
    <navigation />
  </div>
</template>

<script>
import common from '@/utils/common';
import headerTypeStuff from '../../../components/headerTypeStuff.vue';
import stictyButton from '../../../components/sticyButton.vue';
export default {
  components: {
    headerTypeStuff,
    stictyButton,
  },
  mixins: [common],
  data() {
    return {
      missionData: {
        id: null,
        title: '',
        board: 'mission',
        formatBoard: '',
        // img: {
        //   'name': '',
        //   'url': '',
        //   'preview_url': '',
        // },
        content: '',
        view_count: 0,
        can_participate: 0,
        is_participate: 0,
        participant_available_count: 99999,
        participant_count: 0,
        start_date: '',
      },
      participateList: [],
      links: {},
      meta: {},
    }
  },
  computed: {
    cycle() {
      let cycle = '';
      switch(this.missionData.duration) {
        case '매일': cycle = '일'; break;
        case '매주': cycle = '주'; break;
        case '매월': cycle = '개월'; break;
      }
      return cycle;
    }
  },
  methods: {
    loadMore() {
        if(this.meta.current_page <= this.meta.last_page){

            this.$axios.get(`/api/missions/list/${this.$route.params.id}`, {
              params: {
                page: this.meta.current_page + 1,
              }
            })
            .then(response => {
              this.participateList = [...this.participateList,...response.data.data];
              this.links = {...response.data.links};
              this.meta = {...response.data.meta};

            });
        }
    },
    async getMissionInfo(id = null) {
      const response = await this.$axios.get(`/api/missions/${id}`);
      this.missionData = {...this.missionData, ...response.data.data};
    },
    async getParticipateList(id = null) {
      const response = await this.$axios.get(`/api/missions/list/${id}`);
      this.participateList = response.data.data;
      this.links = response.data.links;
      this.meta = response.data.meta;
    },
    participateMission() {
      console.log('participateMission')
      this.$router.push({path:`/stuff/mission/createChild`,query: {id: this.$route.params.id, duration:this.missionData.duration}} );
    },
  },
  async mounted () {
    await this.getMissionInfo(this.$route.params.id);
    await this.getParticipateList(this.$route.params.id);
  },
}
</script>

<style scoped>
hr {
  border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color:#e1e1e1;
  height: 1px;
}
  .section-title {
    background-color: #f5f5f5;
    min-height:120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section-image {
    height:150px;
    width: 100%;
  }
  .image-container {
    height: inherit;
    width: inherit;
    background-size: cover !important;  background-position: center !important;
  }
  
  .image-container.preview {
    border-radius:5px;
  }
  .image-container img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  .preview-container img {
    width: inherit;
    height: inherit;
    background-size: cover;
    background-position: left;
    border-radius: 5px;
  }
  .section-main-info {
    padding: 0 22px;
    height: 130px;
    position: relative;
  }
  .section-main-info .mission-info {
    position:absolute;
    top:-20%; left:5%;
    /* transform:translate(0%,50%); */
    width: 90%;
    min-height: 100px;
    border-radius: 5px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    background-color: white;
    padding-bottom: 5px;
  }

  .section-content {
    min-height: 100px;
    margin: 0 19px;
    border-radius: 5px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    background-color: white;
    /* padding-bottom: 5px; */
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .content-title {
    font-size: 20px;
    font-weight: bold;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  .flex-start {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  
  .p-15 {
    padding: 15px;
  }
  .mr-5 {
    margin-right: 5px;
  }
  
  .mt-150p {
    margin-top: 150px;
  }

  .w-100p {
    width: 100%;
  }

  .preview {
    width:80px;
    height:70px;
  }
  .content {
    width: 80%;
    height: inherit;
    border-radius: 5px;
  }
  .content.left {
    width:35%;
  }
  .content.right {
    width:60%;
  }
  .content.info {
    min-width: 270px;
  }
  .content.info.no-end-date{
    max-width:40%;
    min-width: 130px;
  }
  .content.info * {
    font-size: 13px;
  }

  .btns {
    height: 25px;
  }

  .btns .primary {
    color: #0BAF00;
    background:rgb(228,245,226);
  }
  .btns .grey {
    color: #777;
    background:rgb(235,235,235);
  }

  .favicon-size {
    width:16px;
    height:16px;
    object-fit: cover;
    background-position: center;
  }

  .thumbnail-container {
    width:auto;

  }

  .thumbnail-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>