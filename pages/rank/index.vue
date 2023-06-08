<template>
  <div class="area-index">
      <header-type01
      />

      <!-- 내용 영역 -->
      <div class="container">
        <section class="section-ranking">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 10</span>
                        </div>
                        <div class="m-input-checkboxes type01">
                            <div class="mt-8"></div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="1" value="total-rankings" v-model="toggleList">
                                <label for="1">전체</label>
                            </div>
                            <!-- <div class="m-input-checkbox">
                                <input type="radio" id="2" value="daily-rankings" v-model="toggleList">
                                <label for="2">일간</label>
                            </div> -->
                            <div class="m-input-checkbox">
                                <input type="radio" id="3" value="rankings" v-model="toggleList">
                                <label for="3">주간</label>
                            </div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="4" value="monthly-rankings" v-model="toggleList">
                                <label for="4">월간</label>
                            </div>
                        </div>
                        <div class="mt-8"></div>
                        <div class="time-container">
                            <div class="left"></div>
                            <div class="right">
                                <div class="time">
                                    {{ guideText }} 기준
                                </div>
                                <div class="icon-container" >
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.2" d="M18.1828 9.87501C18.1828 11.5181 17.6955 13.1243 16.7827 14.4905C15.8698 15.8567 14.5723 16.9215 13.0543 17.5503C11.5363 18.1791 9.86586 18.3436 8.25433 18.0231C6.64279 17.7025 5.1625 16.9113 4.00065 15.7494C2.8388 14.5876 2.04757 13.1073 1.72702 11.4958C1.40646 9.88423 1.57098 8.21383 2.19977 6.6958C2.82856 5.17777 3.89338 3.88028 5.25957 2.96742C6.62576 2.05456 8.23197 1.56732 9.87508 1.56732C12.0784 1.56732 14.1915 2.44259 15.7495 4.00059C17.3075 5.55858 18.1828 7.67168 18.1828 9.87501Z" fill="#777777"/>
                                        <path d="M9.875 0.875C8.09497 0.875 6.35491 1.40284 4.87487 2.39177C3.39483 3.38071 2.24128 4.78631 1.56009 6.43085C0.8789 8.07538 0.70067 9.88498 1.04794 11.6308C1.3952 13.3766 2.25237 14.9803 3.51104 16.239C4.76971 17.4976 6.37336 18.3548 8.11919 18.7021C9.86502 19.0493 11.6746 18.8711 13.3192 18.1899C14.9637 17.5087 16.3693 16.3552 17.3582 14.8751C18.3472 13.3951 18.875 11.655 18.875 9.875C18.8725 7.48882 17.9235 5.2011 16.2362 3.51382C14.5489 1.82654 12.2612 0.87752 9.875 0.875ZM9.875 17.4904C8.36882 17.4904 6.89646 17.0437 5.64412 16.207C4.39178 15.3702 3.4157 14.1808 2.83931 12.7893C2.26292 11.3977 2.11211 9.86655 2.40595 8.38931C2.69979 6.91207 3.42508 5.55514 4.49011 4.49011C5.55514 3.42508 6.91208 2.69978 8.38931 2.40594C9.86655 2.1121 11.3978 2.26291 12.7893 2.8393C14.1808 3.41569 15.3702 4.39177 16.207 5.64412C17.0438 6.89646 17.4904 8.36882 17.4904 9.875C17.4881 11.894 16.685 13.8297 15.2574 15.2574C13.8297 16.685 11.894 17.4881 9.875 17.4904ZM9.18269 10.5673V5.72115C9.18269 5.53754 9.25563 5.36145 9.38547 5.23162C9.5153 5.10178 9.69139 5.02885 9.875 5.02885C10.0586 5.02885 10.2347 5.10178 10.3645 5.23162C10.4944 5.36145 10.5673 5.53754 10.5673 5.72115V10.5673C10.5673 10.7509 10.4944 10.927 10.3645 11.0568C10.2347 11.1867 10.0586 11.2596 9.875 11.2596C9.69139 11.2596 9.5153 11.1867 9.38547 11.0568C9.25563 10.927 9.18269 10.7509 9.18269 10.5673ZM10.9135 13.6827C10.9135 13.8881 10.8526 14.0889 10.7385 14.2596C10.6243 14.4304 10.4622 14.5635 10.2724 14.6421C10.0826 14.7207 9.87385 14.7413 9.67241 14.7012C9.47097 14.6611 9.28593 14.5622 9.1407 14.417C8.99547 14.2718 8.89656 14.0867 8.85649 13.8853C8.81642 13.6838 8.83699 13.475 8.91559 13.2853C8.99419 13.0955 9.12729 12.9333 9.29806 12.8192C9.46884 12.7051 9.66961 12.6442 9.875 12.6442C10.1504 12.6442 10.4146 12.7536 10.6093 12.9484C10.8041 13.1431 10.9135 13.4073 10.9135 13.6827Z" fill="#777777"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="mt-32"></div>
                        <!-- <div class="rankings">
                            <div class="ranking-wrap" 
                                v-if="districtRegisterCounts.length >= 1"
                                v-for="(rank,index) in uptoThreeDistrictRegisterCounts" :key="rank.district_id"
                            >
                                <div class="ranking" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCounts[index].district_id,
                                        district: districtRegisterCounts[index].district
                                    })"
                                >
                                    <div class="img-wrap">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco">
                                        <img :src="`images/rankings/${index+1}.png`" width="100px" alt="" class="img-rect">
                                        <div class="more">
                                            <span class="zero" v-if="rankingCount(districtRegisterCounts[index]) == 0">−</span>
                                            <template  v-else>
                                                <span class="tri">▲</span>&nbsp;<span style="color:#DC2626"> {{ rankingCount(districtRegisterCounts[index])}} </span>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="fragment">
                                        <p class="subtitle">{{ districtRegisterCounts[index].district }}</p>
                                        <h3 class="title">
                                            <span class="point">{{ index+1 }}</span>위
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- 1,2,3위 -->
                        <div class="rankings">
                            <!-- 2등 -->
                            <div class="ranking-wrap second" v-if="districtRegisterCounts.length >= 2">
                                <div class="ranking" >
                                    <div class="img-wrap">
                                        <!-- <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco"> -->
                                        <img src="images/rankings/main_ranking_2nd.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">2</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ districtRegisterCounts[1].district }}</p>
                                            <div class="badge">
                                                <img :src="getBadgeSrc(rankingCount(districtRegisterCounts[1]))"/>
                                            </div>
                                        </div>
                                        <div :class="getScaleClass(rankingCount(districtRegisterCounts[1]),'ranked')">
                                            <span class="zero" v-if="rankingCount(districtRegisterCounts[1]) == 0">−</span>
                                            <template  v-else>
                                                <span class="tri">▲</span>&nbsp;<span style="color:#DC2626"> {{ rankingCount(districtRegisterCounts[1])}} </span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 1등 -->
                            <div class="ranking-wrap first" v-if="districtRegisterCounts.length >= 1">
                                <div class="ranking">
                                    <div class="img-wrap">
                                        <!-- <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco"> -->
                                        <img src="images/rankings/main_ranking_1st.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">1</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ districtRegisterCounts[0].district }}</p>
                                            <div class="badge">
                                                <img :src="getBadgeSrc(rankingCount(districtRegisterCounts[0]))"/>
                                            </div>
                                        </div>
                                        <div :class="getScaleClass(rankingCount(districtRegisterCounts[0]),'ranked')">
                                            <span class="zero" v-if="rankingCount(districtRegisterCounts[0]) == 0">−</span>
                                            <template  v-else>
                                                <span class="tri">▲</span>&nbsp;<span style="color:#DC2626"> {{ rankingCount(districtRegisterCounts[0])}} </span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 3등 -->
                            <div class="ranking-wrap third" v-if="districtRegisterCounts.length >= 3">
                                <div class="ranking" >
                                    <div class="img-wrap">
                                        <!-- <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco"> -->
                                        <img src="images/rankings/main_ranking_3rd.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">3</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ districtRegisterCounts[2].district }} </p>
                                            <div class="badge">
                                                <img :src="getBadgeSrc(rankingCount(districtRegisterCounts[2]))"/>
                                            </div>
                                        </div>
                                        <div :class="getScaleClass(rankingCount(districtRegisterCounts[2]),'ranked')">
                                            <span class="zero" v-if="rankingCount(districtRegisterCounts[2]) == 0">−</span>
                                            <template  v-else>
                                                <span class="tri">▲</span>&nbsp;<span style="color:#DC2626"> {{ rankingCount(districtRegisterCounts[2])}} </span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box-table" v-if="districtRegisterCounts.length>3">
                            <table class="m-table type01">
                                <thead>
                                <tr>
                                    <th style="width: 100px">순위</th>
                                    <th>마을구분</th>
                                    <th class="align-center">신규가입자</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(districtRegisterCount, index) in districtRegisterCounts" :key="index" 
>
                                    <template v-if="index >= 3 && districtRegisterCount">
                                    <td>{{index + 1}}위</td>
                                    <td>{{ districtRegisterCount.city}} {{districtRegisterCount.district}}</td>
                                    <td>
                                        <div class="right">
                                            <div class="badge">
                                                <img :src="getBadgeSrc(rankingCount(districtRegisterCount))"/>
                                            </div>
                                            <div :class="getScaleClass(rankingCount(districtRegisterCount))">
                                                <span class="tri">▲ </span>&nbsp;<span> {{ rankingCount(districtRegisterCount) }} </span>
                                            </div>
                                        </div>
                                    </td>
                                    </template>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </section>

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
export default {
    name: 'IndexPage',
    auth: false,
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

            districtRegisterCounts: [

            ],
        }
    },
    computed: {
        district(){
            return this.$store.state.district;
        },
        uptoThreeDistrictRegisterCounts() {
            return this.districtRegisterCounts.slice(0,3);
        }
    },
    methods: {
        getBadgeSrc(rankingCount) {
            if(rankingCount >= 1000 && rankingCount < 2000) return '/images/main_icon_badge_1k.png';
            if(rankingCount >= 2000 && rankingCount < 3000) return '/images/main_icon_badge_2k.png';
            if(rankingCount >= 3000 ) return '/images/main_icon_badge_3k.png';
        },
        getScaleClass(rankingCount, rankingType='unranked') {
            if(rankingType === 'ranked') {
                if(rankingCount == 0) return 'bg-grey-30 ';
                if(rankingCount < 100) return 'bg-red-30 ';
                if(rankingCount >= 100) return 'bg-orange ';
            }
            if(rankingCount == 0) return 'bg-grey-30 more';
            if(rankingCount < 100) return 'bg-red-30 more up';
            if(rankingCount >= 100 ) return 'bg-orange more';
        },

        search() {
            if(this.form.district == "" || this.form.district ==  undefined) {
                return;
            }
            this.$store.commit("changeDistrict", this.form.district);
            // this.updatePosts(this.district.id);
            window.scrollTo(0,0);
            this.container = {};
        },
        changeDistrict(data) {
            this.form.district = data.district
        },

        getRankings(count){
            this.$axios.get("/api/" + this.form.rankingUrl + "/100")
                .then(response => {
                    this.districtRegisterCounts = response.data.districtRegisterCounts;
                });
        },

        rankingCount(ranking){
            if(this.form.rankingUrl === 'rankings')
                return ranking.now_week_count;

            if(this.form.rankingUrl === 'monthly-rankings')
                return ranking.now_month_count;

            if(this.form.rankingUrl === 'total-rankings')
                return ranking.count;

            return "-";
        },
        switchRankGuide(toggleList) {
            let guideText = '';
            switch(toggleList) {
                case 'daily-rankings':
                    guideText = '전일';
                    break;
                case 'rankings':
                    guideText = '전주 토요일 00:00 ~ 일요일 23:59';
                    break;
                case 'monthly-rankings':
                    guideText = '매월 1회 (전달 1일부터 말일)';
                    break;
                case 'total-rankings':
                    guideText = '총 누적';
                    break;
            }
            this.guideText = guideText;
        },
    },



    watch: {
        district (newCount, oldCount) {
            this.getRankings(100);

            if(this.district.id != 0)
                this.$axios.get("/api/districts/" + this.district.id + "/register_rates")
                    .then(response => {
                        this.registerRates = response.data.registerRates;
                    });
        },
        "form.district"() {
            if(this.container.district)
                this.search()
        },
        toggleList(value) {
            this.form.rankingUrl = value;
            this.switchRankGuide(value);
            this.getRankings(100);
        },

    },

    async mounted() {
        this.switchRankGuide('total-rankings');
        this.getRankings(100);

        if(this.district.id != 0)
            this.$axios.get("/api/districts/" + this.district.id + "/register_rates")
                .then(response => {
                    this.registerRates = response.data.registerRates;
                });

    },

}
</script>
<style scoped>
    .fragment .subtitle-container {
        display: flex;
        justify-content:center;
        align-items: center;
        margin-bottom: 10px;
        background-color: white;
        border-radius: 5px;
        width:100px;
        padding-top: 5px;
    }

    .fragment .subtitle-container .subtitle {
        font-size: 0.9rem !important;
        margin-right:3px;
    }
    .time-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    .time-container .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
    }
    .right .time {
        font-size: 18px;
        font-weight: 300;
        color: #888888;
        padding-right:10px;
    }
    .right .icon-container {
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    .rankings {
        margin: 0px 10px 10px 10px !important;
    }

    .area-index .section-ranking .rankings .fragment .more .tri {
        margin-left:4px;
        font-size:12px;
        color:#DC2626;
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
    .rank .left .petit-image img {
        width:30px;
        height:30px;
        margin: 2px 5px 0px 0px;
    }
    .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right:0.25rem;
    }
    .right .badge {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
    .bg-grey-30 {
        width:100px;
        height:34px;
        background-color: #eeeeee;
        border-radius: 5px;
        padding: 5px 11px 5px 11px;
        font-size: 14px;
    }
    .bg-red-30 {
        width:100px;
        height:34px;
        background-color: #fff2f2;
        border-radius: 5px;
        padding: 5px 11px 5px 11px;
        font-size: 14px;
    }
    .bg-red-30 .tri {
        margin-left:4px;
        font-size:12px !important;
        color: red;
    }
    .bg-orange {
        width:100px;
        height:34px;
        background-color: rgb(254, 124, 30);
        border-radius: 5px;
        padding: 5px 11px 5px 11px;
        font-size: 14px;
    }
    .bg-orange .tri {
        margin-left:4px;
        font-size:12px !important;
        color: white
    }
    .bg-orange span {
        color:white !important;
    }
</style>