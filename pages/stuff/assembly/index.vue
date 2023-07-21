<template>
  <div class="area-stuff">
    <headerTypeStuff :current="currentMenu" />
      <div class="container add">
        <div class="frame">
          <div class="m-title type01">
            <p class="sub02">모두가 한마음 한뜻으로</p>
            <span class="highlighter-point">대규모 집회</span>
          </div>
          <button class="mt-8 btn-util" style="width:100%">
            <div class="m-input-text-wrap">
              <div class="m-input-text type01">
                <input type="text" placeholder="검색어를 입력해주세요." v-model="word" @keyup.enter="search">
                <i class="xi-search m-input-text-deco" @click="search"></i>
              </div>
            </div>
          </button>
        </div>
        <!-- 아코디언 리스트 -->
        <accordion
          :initialActive="0"
          :isQuestion="false"
        >
          <accordion-item v-for="(item,index) in assemblyList">
            <template slot="accordion-trigger">
              <div class="wrapper">
                <div class="inner">
                  <div :class="calculateDdays(item.start_date,item.end_date) !== '종료' ? 'd-day': 'd-day after'">
                    <span class="d-day-text">{{calculateDdays(item.start_date,item.end_date)}}</span>
                  </div>
                  <div class="col">
                    <p>{{ item.title }}</p>
                    <p class="item-content">{{ item.start_date }} {{ item.end_date ? ` ~ ${item.end_date}` : '' }}</p>
                  </div>
                </div>
                <div class="sign">+</div>
              </div>

            </template>
            <template slot="accordion-content">
              <div class="inner-active">
                <div class="sep">
                  <div class="wrapper">
                    <div class="title">{{ item.title }}</div>
                    <div class="sign" style="margin-bottom:10px;">–</div>
                  </div>
                </div>
                <div class="sep image" vi-f="item.img" :style="`height: 150px; background-image:url('${item.img ? item.img.url : ''}')`"></div>
                <div :class="calculateDdays(item.start_date,item.end_date) !== '종료' ? 'sep d-day': 'sep d-day after'">
                    <span class="d-day-text">{{calculateDdays(item.start_date,item.end_date)}}</span>
                </div>
                <div class="sep">
                  <span class="gap">일시</span><span class="item-content">{{ item.start_date }} {{ item.end_date ? ` ~ ${item.end_date}` : '' }}</span>
                </div>
                <div class="sep">
                  <span class="gap">장소</span><span class="item-content">{{ item.address }}</span>
                </div>
                <div class="sep">
                  {{ item.content }}  
                </div> 
                <button v-if="item.can_participate == 1"  @click.stop="participate(item.id)" :class="`mt-12 m-btn type02 ${item.is_participate == 0 ? 'bg-primary' : 'bg-red'}`">{{item.is_participate == 0 ? '행사 참여신청' : '참가 취소'}}</button>
              </div>
            </template>
          </accordion-item>
        </accordion>
      </div>

    <navigation />
  </div>
</template>

<script>
import headerTypeStuff from '@/components/headerTypeStuff.vue';
import accordion from '@/components/accordion.vue';
import accordionItem from '@/components/accordionItem.vue';

import common from '@/utils/common.js'
export default {
  components: {
    headerTypeStuff, accordion, accordionItem
  },
  mixins: [common],
  data() {
    return {
      currentMenu: {
        code: 'assembly',
        value: '대규모집회',
      },
      assemblyList: [],
      word: '',
    }
  },
  methods: {
    async getList(board, keyword ='') {
      const response = await this.$axios.get(`/api/events` ,{
        params: {
          board: board,
          word: keyword,
        }
      })
      this.assemblyList = [...response.data.data];
      // this.$set(this.asse,`${board}`, response.data.data);
    },
    async search() {
      await this.getList('assembly', this.word)
    },
    async participate(id) {
      const response = await this.$axios.post(`/api/enroll`, {
        event_id: id,
      });
      alert(response.data.message);
      this.assemblyList = [...this.assemblyList.map(item => {
        if(item.id === id) {
          item.is_participate = item.is_participate == 0 ? 1 : 0;
        }
        return item;
      })];
    },
  },
  mounted () {
    this.getList('assembly');;
  },
}
</script>

<style scoped>
  .add {
    padding-top: 120px !important;
  }

  .wrapper {
    width:100%;
    display:flex;
    justify-content: space-between;
  }
  .wrapper .sign {
    color:#0baf00;
    font-size: 42px;
  }

  .inner {
    display: flex;
    justify-content: space-between;
  }
  .inner .d-day {
    min-width: 60px;
    height: 50px;
    margin-left: -10px !important;
    margin-right: 10px;
    margin-top: 10px;
    background: white;
    border-radius: 15px;
    border: 1px solid #f50000;
    display:flex; align-items: center; justify-content: center;
  }
  .inner .d-day .d-day-text {
      color: #f50000;
      font-weight:500;
  }

  .inner .d-day.after {
    border: 1px solid #AAA;
  }
  .inner .d-day.after .d-day-text {
      color: #AAA;
      font-weight:500;
  }
  .inner .col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .inner .col .item-content {
    margin-top: 5px;

    font-size: 14px;
    color: #999;
  }

  .inner-active {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .inner-active .sep {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

    position:relative;
  }
  .inner-active .sep .title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    align-content: center;
    flex-wrap: wrap;
  }
  .inner-active .sep.image {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .inner-active .sep .gap {
    margin-top: 5px;
    margin-right: 30px;
  }

  .inner-active .sep .item-content {
    margin-top: 5px;

    color: #999;
  }
  .inner-active .sep.d-day {
    margin-top: 10px;
    width: 60px;
    height: 25px;
    background: white;
    border-radius: 15px;
    border: 1px solid #f50000;
    padding: 0 !important;
    display:flex; align-items: center; justify-content: center;
  }

  .inner-active .sep.d-day .d-day-text {
      color: #f50000;
      font-weight:500;
  }


  .inner-active .sep.d-day.after {
    border: 1px solid #AAA;
  }
  .inner-active .sep.d-day.after .d-day-text {
      color: #AAA;
      font-weight:500;
  }

</style>