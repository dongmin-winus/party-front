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
                            <p class="sub">자유마을 활성화의 주인공은 누구?</p>
                            개인랭킹 <span class="point orange">TOP100</span>
                        </div>
                    </div>
                    <div class="point-notice">
                        <svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2" d="M18.1828 9.87501C18.1828 11.5181 17.6955 13.1243 16.7827 14.4905C15.8698 15.8567 14.5723 16.9215 13.0543 17.5503C11.5363 18.1791 9.86586 18.3436 8.25433 18.0231C6.64279 17.7025 5.1625 16.9113 4.00065 15.7494C2.8388 14.5876 2.04757 13.1073 1.72702 11.4958C1.40646 9.88423 1.57098 8.21383 2.19977 6.6958C2.82856 5.17777 3.89338 3.88028 5.25957 2.96742C6.62576 2.05456 8.23197 1.56732 9.87508 1.56732C12.0784 1.56732 14.1915 2.44259 15.7495 4.00059C17.3075 5.55858 18.1828 7.67168 18.1828 9.87501Z" fill="#777777"/>
                            <path d="M9.875 0.875C8.09497 0.875 6.35491 1.40284 4.87487 2.39177C3.39483 3.38071 2.24128 4.78631 1.56009 6.43085C0.8789 8.07538 0.70067 9.88498 1.04794 11.6308C1.3952 13.3766 2.25237 14.9803 3.51104 16.239C4.76971 17.4976 6.37336 18.3548 8.11919 18.7021C9.86502 19.0493 11.6746 18.8711 13.3192 18.1899C14.9637 17.5087 16.3693 16.3552 17.3582 14.8751C18.3472 13.3951 18.875 11.655 18.875 9.875C18.8725 7.48882 17.9235 5.2011 16.2362 3.51382C14.5489 1.82654 12.2612 0.87752 9.875 0.875ZM9.875 17.4904C8.36882 17.4904 6.89646 17.0437 5.64412 16.207C4.39178 15.3702 3.4157 14.1808 2.83931 12.7893C2.26292 11.3977 2.11211 9.86655 2.40595 8.38931C2.69979 6.91207 3.42508 5.55514 4.49011 4.49011C5.55514 3.42508 6.91208 2.69978 8.38931 2.40594C9.86655 2.1121 11.3978 2.26291 12.7893 2.8393C14.1808 3.41569 15.3702 4.39177 16.207 5.64412C17.0438 6.89646 17.4904 8.36882 17.4904 9.875C17.4881 11.894 16.685 13.8297 15.2574 15.2574C13.8297 16.685 11.894 17.4881 9.875 17.4904ZM9.18269 10.5673V5.72115C9.18269 5.53754 9.25563 5.36145 9.38547 5.23162C9.5153 5.10178 9.69139 5.02885 9.875 5.02885C10.0586 5.02885 10.2347 5.10178 10.3645 5.23162C10.4944 5.36145 10.5673 5.53754 10.5673 5.72115V10.5673C10.5673 10.7509 10.4944 10.927 10.3645 11.0568C10.2347 11.1867 10.0586 11.2596 9.875 11.2596C9.69139 11.2596 9.5153 11.1867 9.38547 11.0568C9.25563 10.927 9.18269 10.7509 9.18269 10.5673ZM10.9135 13.6827C10.9135 13.8881 10.8526 14.0889 10.7385 14.2596C10.6243 14.4304 10.4622 14.5635 10.2724 14.6421C10.0826 14.7207 9.87385 14.7413 9.67241 14.7012C9.47097 14.6611 9.28593 14.5622 9.1407 14.417C8.99547 14.2718 8.89656 14.0867 8.85649 13.8853C8.81642 13.6838 8.83699 13.475 8.91559 13.2853C8.99419 13.0955 9.12729 12.9333 9.29806 12.8192C9.46884 12.7051 9.66961 12.6442 9.875 12.6442C10.1504 12.6442 10.4146 12.7536 10.6093 12.9484C10.8041 13.1431 10.9135 13.4073 10.9135 13.6827Z" fill="#777777"/>
                        </svg>
                        <!-- <span @click="pointNoticeOpen = !pointNoticeOpen">개인랭킹 시작일 2023년 7월 1일 기준</span> ▼
                        <transition
                            name="accordion"
                            @enter="start"
                            @after-enter="end"
                            @before-leave="start"
                            @after-leave="end"
                        >
                            <p v-show="pointNoticeOpen">점수계산: 기본점수 1만점, 회원가입(추천인): 50점, 게시글: 25점, 공유: 20점, 좋아요: 5점</p>
                        </transition> -->
                        <span>개인랭킹 시작일 2023년 7월 1일 기준</span>
                        <p>점수계산: 기본점수 1만점, 회원가입(추천인): 50점, 게시글: 25점, 공유: 20점, 좋아요: 5점</p>
                    </div>
                    <ul class="m-table type01 rank-container mt-32" >
                        <li v-for="(item, index) in popularRankings" :key="index" 
                        >
                            <div class="rank">
                                <div class="left" style="display:flex; align-items:center;">
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
                                        <div class="bar-inner" :style="`width:${getPopularPercentage(item)}%; background:${getBarColor(item)}`">
                                            {{ getPopularTotalCount(item) + tokenCount }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
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
    methods: {
        async getPopularRakings(count) {
            const response = await this.$axios.get(`/api/popular-list?limitNumber=${count}&date=year`);
            let data = response.data.map((item) => {
                item.totalCount = this.getPopularTotalCount(item);
                return item;
            })
            data = data.sort((a,b) => {
                return b.totalCount - a.totalCount;
            })
            this.popularRankings = [...data];
        },

        
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
            return share.profile?.url ? share.profile.url : "..@/assets/images/rankings/" + i + ".png";
        },
        subText(i, n) {
            if (i.length <= n) { return i; } 
            else { return i.substring(0, n) + "..."; }
        } 

    },
    mounted () {
        this.getPopularRakings(100);
    },

}
</script>
<style scoped>
    .area-index .section-popular .m-table li:first-child .rank{

box-shadow: 5px 3px 33px 2px rgba(30,212,37,0.49);
-webkit-box-shadow: 5px 3px 33px 2px rgba(30,212,37,0.49);
-moz-box-shadow: 5px 3px 33px 2px rgba(30,212,37,0.49);
}
    /* .area-popular .section-ranking {
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
    } */



</style>