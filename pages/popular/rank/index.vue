<template>
  <div class="area-popular">
      <header-type01
      />

        <!-- 내용 영역 -->
        <div class="container">
            <section class="section-ranking">
                <div class="wrap">
                    <div class="mt-12 content">
                        <div class="m-title type01">
                            <p class="sub"><b>7월</b>의 <b style="font-weight:500;">베스트 회원</b>은 <b>누구?</b></p>
                            개인랭킹 <span class="point orange">TOP 100</span>
                        </div>
                    </div>

                    <div class="rankings mt-12">
                        <!-- 2등 -->
                        <div class="ranking-wrap second" v-if="popularRankings.length >= 2">
                            <div class="ranking" >
                                <div class="img-wrap">
                                    <img :src="getUserImgUrl(popularRankings[1], 1)"  width="100px" alt="2등" class="img-rect">

                                    <div class="rounded">
                                        <span style="color:#0BAF00;"> {{ popularRankings[1].totalCount + 10000 }} </span>
                                    </div>
                                </div>

                                <div class="fragment">
                                    <h3 class="title">
                                        2<span class="rank">위</span> <span class="name">{{ this.subText(popularRankings[1].name, 3) }}</span>
                                    </h3>
                                    <div class="subtitle-container">
                                        <p class="subtitle">{{ popularRankings[1].district_name }}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- 1등 -->
                        <div class="ranking-wrap first" v-if="popularRankings.length >= 1">
                            <div class="ranking" >
                                <div class="img-wrap">
                                    <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco">
                                    <img :src="getUserImgUrl(popularRankings[0], 2)" width="100px" alt="1등" class="img-rect">
                                    <div class="rounded">
                                        <span style="color:#0BAF00;"> {{ popularRankings[0].totalCount + 10000 }} </span>
                                    </div>

                                </div>

                                <div class="fragment">
                                    <h3 class="title">
                                        1<span class="rank">위</span> <span class="name">{{ subText(popularRankings[0].name, 3) }}</span>
                                    </h3>
                                    <div class="subtitle-container">
                                        <p class="subtitle">{{ popularRankings[0].district_name }}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- 3등 -->
                        <div class="ranking-wrap second" v-if="popularRankings.length >= 3">
                            <div class="ranking" >
                                <div class="img-wrap">
                                    <img :src="getUserImgUrl(popularRankings[2], 3)" width="100px" alt="3등" class="img-rect">
                                    <div class="rounded">
                                            <span style="color:#0BAF00;"> {{ popularRankings[2].totalCount + 10000 }} </span>
                                    </div>

                                </div>

                                <div class="fragment">
                                    <h3 class="title">
                                        3<span class="rank">위</span> <span class="name">{{ popularRankings[2].name }}</span>
                                    </h3>
                                    <div class="subtitle-container">
                                        <p class="subtitle">{{ popularRankings[2].district_name }}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="box-table">
                    <table class="m-table type02 popular">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>아이디</th>
                                <th>토탈점수</th>
                                <th>가입</th>
                                <th>게시글</th>
                                <th>공유</th>
                                <th>좋아요</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in popularRankings" :key="index">
                                <template v-if="index >= 3 && item">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td class="red">{{ item.totalCount + tokenCount }}</td>
                                    <td class="orangee">{{ getPercentage(item.register_count, item.totalCount)}}%</td>
                                    <td class="orangee">{{ getPercentage(item.post_count, item.totalCount) }}%</td>
                                    <td class="orangee">{{ getPercentage(item.share_count, item.totalCount) }}%</td>
                                    <td class="orangee">{{ getPercentage(item.like_count, item.totalCount) }}%</td>
                                </template>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </section> 
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
            tokenCount : 10000,
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
        getPercentage(numerator, denominator) {
            const percent = Math.floor((numerator / denominator) * 100);
            if(percent > 100) return 100;
            return percent;
        },
        getPopularTotalCount(item) {
            const likeCount = parseInt(item.like_count);
            const postCount = parseInt(item.post_count);
            const shareCount = parseInt(item.share_count);
            const registerCount = parseInt(item.register_count);
            const total = likeCount + postCount + shareCount + registerCount;
            return total;
        },
        getPopularPercentage(item) {
            const total = this.getPopularTotalCount(item) + this.tokenCount;
            const percent = Math.floor((total / 100000) * 100);
            // if(percent < 30) return 30;
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

        getUserImgUrl(share, i) {
            return share.profile?.url ? share.profile.url : "images/rankings/" + i + ".png";
        },
        subText(i, n) {
            if (i.length <= n) { return i; } 
            else { return i.substring(0, n) + "..."; }
        } 

    },

}
</script>
<style scoped>
    .area-popular .section-ranking {
        margin-top:40px;
    }
    .area-popular .section-ranking .m-title.type01 {
        margin-bottom: 10px;
        text-align: center;
    }

    .area-popular .section-ranking .m-table {
        margin-bottom:16px;
    }

    .area-share .section-ranking .box-table {
        padding:30px 0px 30px 0px; padding-top:10px;
        background-color:#F5F5F5; border-radius:5px;
    }

    .area-popular .section-ranking .rankings {
        display: flex; 
        align-items: flex-end; 
        justify-content: center;
        margin:0 -15px; margin-bottom:36px;
    }
    .area-popular .section-ranking .rankings .ranking-wrap.first {
        height: 320px;
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }

    .area-popular .section-ranking .rankings .ranking-wrap.second {
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }

    .area-popular .section-ranking .rankings .ranking-wrap.third {
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }
    .area-popular .section-ranking .rankings .ranking-wrap:nth-child(2) .deco {
        position:absolute; left:50%; top:0; transform:translateX(-50%);
        z-index:1;
    }

    .area-popular .section-ranking .rankings .ranking {
        text-align: center;
    }
    .area-popular .section-ranking .rankings .img-wrap {
        height:120px;
        
        position:relative;
    }
    .area-popular .section-ranking .ranking .img-wrap .rounded {
        position: absolute;
        background-color: white;
        border: 1px solid #A1A1AA;
        border-radius: 20px;
        width: 80px;
        bottom: 0;
        /* left: 10px; */
    }

    .area-popular .section-ranking .img-wrap .img-rect {
        box-shadow:0px 6px 6px rgba(0,0,0,0.16);
        border-radius:10px;
    }
    .area-popular .section-ranking .rankings .img-wrap img {
        position:absolute; left:50%; top:50%; transform:translate(-50%, -50%);
    }

    .area-popular .section-ranking .ranking .fragment {
        position:relative;
        margin-top:16px;
    }

    .area-popular .section-ranking .ranking .fragment .subtitle {
        margin-bottom:8px;
        font-size:14px; font-weight:bold;
    }
    .area-popular .section-ranking .ranking .fragment .title {
        margin-bottom:4px;
        font-size:17px; font-weight:700; font-family: GmarketSans; color:#000;
    }
    .area-popular .section-ranking .ranking .fragment .title .rank {
        margin-bottom:4px;
        font-size:17px; font-weight:500; font-family: GmarketSans; color:#000;
    }
    .area-popular .section-ranking .ranking .fragment .title .name {
        margin-bottom:4px;
        font-size:17px; font-weight:500; font-family: GmarketSans; color:#000;
    }
    .area-popular .section-ranking .ranking .fragment .title .point {
        font-size:32px; font-weight:bold; font-family: GmarketSans; color:#000;
    }




    .area-popular .section-ranking .m-table .rank {
        border: 1px solid #f5f2f2;
        border-radius: 5px;
        margin-bottom: 5px;
        display: flex;
        align-content: center;
        justify-content: space-between;
        height: 80px;
    }
    .area-popular .section-ranking .m-table li:first-child .rank{
        /* box-shadow: 0px 0px 11px 1px rgba(255,  102 ,  0 ,0.14),
                    0px 0px 19px 6px rgba(255,  102 ,  0 ,0.03),
                    0px 0px 26px 12px rgba(255,  102 ,  0 ,0.14),
                    0px 0px 29px 12px rgba(255,  102 ,  0 ,0.14); */
        box-shadow: 0px 0px 11px 1px rgba(182, 154, 83 ,0.24),
                    0px 0px 19px 6px rgba(182, 154, 83 ,0.03),
                    0px 0px 26px 12px rgba(182, 154, 83 ,0.24),
                    0px 0px 29px 12px rgba(182, 154, 83 ,0.24);
                    
    }
    .area-popular .section-ranking .m-table .rank .left .fixed-width {
        width: 60px;
        font-family:GmarketSans;
        font-size: 20px;
        text-align:center;
    }

    .area-popular .section-ranking .m-table li:first-child .rank .left .fixed-width {
        color: rgb(182, 154, 83);
    }
    .area-popular .section-ranking .m-table .rank .left .point {
        font-size: 28px;
        font-weight: bold;
        font-family:GmarketSans;
        color: #000;
    }
    .area-popular .section-ranking .m-table li:first-child .rank .left .point {
        color: rgb(182, 154, 83);
    }

    .area-popular .section-ranking .m-table .rank .right {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: inherit;
        justify-content: center;
        padding: 10px 0;
    }

    .area-popular .section-ranking .m-table .rank .right .texts {
        display: flex;
        justify-content: flex-start;
        width: inherit;
    }

    .area-popular .section-ranking .m-table .rank .right .bar {
        margin-top: 5px;
        width: inherit;
        border-radius: 5px;
        background-color: #e1e1e1;
    }

    .area-popular .section-ranking .m-table .rank .right .bar .bar-inner {
        height: 25px;
        padding-right: 5px;
        border-radius: 5px;
        color: white;
        text-align: right;
    }
    
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