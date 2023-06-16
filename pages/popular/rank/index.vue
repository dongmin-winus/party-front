<template>
  <div class="area-index">
      <header-type01
      />

      <!-- 내용 영역 -->
      <div class="container">
        <section class="section-popular">
            <div class="wrap">
                <div class="content">
                    <div class="m-title type01">
                        <p class="sub">순위 현황 한 눈에 보기</p>
                        개인랭킹 <span class="point">TOP 100</span>
                    </div>
                </div>
                <div class="mt-16"></div>
                <ul class="m-table type01 rank-container" >
                    <li v-for="(item, index) in popularRankings" :key="index" 
                    >
                        <div class="rank">
                            <div class="left">
                                <div class=" fixed-width">
                                    <span class="point">{{index + 1}}</span>위
                                </div>
                            </div>
                            <div class="right">
                                <div class="texts">
                                    <div class="m-btn type04 bg-lightGray">
                                        {{ item.district }}
                                    </div>
                                    <p style="margin-left:5px;">{{ replaceText(item.nickname,10) }}</p>
                                </div>
                                <div class="bar">
                                    <div class="bar-inner" :style="`width:${item.activity_index}%; background-color:${getBarColor(item.activity_index)}`">
                                        {{ item['activity_index'] }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <nuxt-link to="/popular/rank" class="m-btn type02 bg-revert-primary">개인 랭킹 TOP 100 +</nuxt-link>
            </div>
        </section>
        <div class="mt-12"></div>
        <section class="section-ad2">
            <a href="#" target="_blank" class="link">
                <img src="/images/ad2.png" alt="">
            </a>
        </section>

        <quicks 
            :createUrl="'/posts/create'"
            :btnName="'글쓰기'"
        />
      </div>

      <navigation />
  </div>
</template>

<script>
import common from '@/utils/common.js'
export default {
    name: 'IndexPage',
    auth: false,
    mixins: [common],
    data() {
        return {
            activeFinder:false,
            toggleList: 'total-rankings',
            guideText: '',
            container:{},
            form: {
                district_id: "",
                district: "",
                rankingUrl: "total-rankings",
            },
            registerRates: {
                population: 0,
                count: 0,
                rate: 0,
            },

            popularRankings: [],
        }
    },
    async asyncData({ $axios }) {
        const response = await $axios.get('/api/popular-list?limitNumber=100');
        let maxPopularIdx;
            let data = response.data.map((item,index) => {
                if(index == 0) {
                    maxPopularIdx = item.activity_index;
                    item.activity_index = 100;
                } else {
                    item.activity_index = Math.round(item.activity_index / maxPopularIdx * 100);
                }
                
                return item;
            })
            return {
              popularRankings : data
            }
    },
    methods: {
      getBarColor(activityIndex) {
          if(activityIndex >= 90) return '#ff6600';
          if(activityIndex >= 80) return '#ffb017';
          if(activityIndex <= 79) return '#ffe607';
      },

    },

}
</script>
<style scoped>
    .m-table .rank {
        border: 1px solid #f5f2f2;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 5px;
        padding-left: 5px;
        height: 50px;
        margin-bottom: 2px;
    }
    .rank .left {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .rank .fixed-width {
        width: 50px;
    }
    .rank .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right:0.25rem;
    }
</style>