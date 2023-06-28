<template>
  <div class="area-index">
      <header-type01
      />

      <!-- 내용 영역 -->
      <div class="container">
        <section class="section-popular">
            <img src="/images/bannertop.jpg" alt="" width="100%" />
            <div class="wrap">
                <div class="mt-12 content">
                    <div class="m-title type01">
                        <p class="sub"><b>7월</b>의 <b style="font-weight:500;">베스트 회원</b>은 <b>누구?</b></p>
                        개인랭킹 <span class="point orange">TOP 100</span>
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
                                        {{ item.district_name }}
                                    </div>
                                    <p style="margin-left:5px;">{{ replaceText(item.name,10) }}</p>
                                </div>
                                <div class="bar">
                                    <div class="bar-inner" :style="`width:${getPopularPercentage(item)}%; background:${getBarColor(item, )}`">
                                        {{ getPopularTotalCount(item) + tokenCount }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
            tokenCount : 30000,
        }
    },
    async asyncData({ $axios }) {
        const response = await $axios.get('/api/popular-list?limitNumber=100');
        let data = response.data.map((item) => {
            item.totalCount = item.like_count + item.post_count + item.share_count + item.register_count;
            return item;
        })
        data = data.sort((a,b) => {
            return b.totalCount - a.totalCount;
        })
        return {
            popularRankings : data
        }
    },
    methods: {
        getPopularTotalCount(item) {
            return item.like_count + item.post_count + item.share_count + item.register_count;
        },
        getPopularPercentage(item) {
            const total = this.getPopularTotalCount(item) + this.tokenCount;
            const percent = Math.floor((total / 100000) * 100);
            if(percent < 30) return 30;
            if(percent > 100) return 100;
            return percent;
        },
        getBarColor(item) {
            const total = this.getPopularTotalCount(item) + this.tokenCount;
            if(total >= 100000) return 'linear-gradient(0.25turn, #7b5d1e, #f9de8c, #7b5d1e);'
            if(total >= 70000) return '#ff0000';
            if(total >= 50000) return '#f88601';
            if(total >= 30000) return '#ffd800';
            return '#0baf00';
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