<template>
  <div class="area-share">
      <header-type01
      />
      
      <!-- 내용 영역 -->
      <div class="container">
        
        <section class="section-ranking">
            <img src="/images/bannertop.jpg" alt="" width="100%">
                <div class="wrap">
                    <div class="mt-12"></div>
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub"><b>6월</b>의 <b style="font-weight:500;">공유왕</b>은 <b>누구?</b></p>
                            공유랭킹 <span class="point orange">TOP 100</span>
                        </div>

                        <!-- 1,2,3위 -->
                        <div class="rankings">
                            <!-- 2등 -->
                            <div class="ranking-wrap second" v-if="shareList.length >= 2">
                                <div class="ranking" >
                                    <div class="img-wrap">
                                        <img :src="getUserImgUrl(shareList[1], 1)" onerror="this.src='images/default_profile.jpeg'" width="100px" alt="" class="img-rect">
                                        <div class="rounded">
                                                <span style="color:#0BAF00;"> {{ shareList[1].share_count }} </span>
                                        </div>

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            2<span class="rank">위</span> <span class="name">{{ this.subText(shareList[1].name, 3) }}</span>
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ shareList[1].state }} {{ shareList[1].district }}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- 1등 -->
                            <div class="ranking-wrap first" v-if="shareList.length >= 1">
                                <div class="ranking" >
                                    <div class="img-wrap">
                                        <img src="https://dotmzh1fysixs.cloudfront.net/1016/crown.png" width="20px" alt="" class="deco">
                                        <img :src="getUserImgUrl(shareList[0], 2)" onerror="this.src='images/default_profile.jpeg'" width="100px" alt="" class="img-rect">
                                        <div class="rounded">
                                                <span style="color:#0BAF00;"> {{ shareList[0].share_count }} </span>
                                        </div>

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            1<span class="rank">위</span> <span class="name">{{ subText(shareList[0].name, 3) }}</span>
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ shareList[0].state }} {{ shareList[0].district }}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- 3등 -->
                            <div class="ranking-wrap second" v-if="shareList.length >= 3">
                                <div class="ranking" >
                                    <div class="img-wrap">
                                        <img :src="getUserImgUrl(shareList[2], 3)" onerror="this.src='images/default_profile.jpeg'" width="100px" alt="" class="img-rect">
                                        <div class="rounded">
                                                <span style="color:#0BAF00;"> {{ shareList[2].share_count }} </span>
                                        </div>

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            3<span class="rank">위</span> <span class="name">{{ shareList[2].name }}</span>
                                        </h3>
                                        <div class="subtitle-container">
                                            <p class="subtitle">{{ shareList[2].state }} {{ shareList[2].district }}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-8"></div>
                        <div class="time-container">
                            <div class="left"></div>
                            <div class="right">
                                <div class="time">
                                    총 누적 기준
                                </div>
                                <div class="icon-container" >
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.2" d="M18.1828 9.87501C18.1828 11.5181 17.6955 13.1243 16.7827 14.4905C15.8698 15.8567 14.5723 16.9215 13.0543 17.5503C11.5363 18.1791 9.86586 18.3436 8.25433 18.0231C6.64279 17.7025 5.1625 16.9113 4.00065 15.7494C2.8388 14.5876 2.04757 13.1073 1.72702 11.4958C1.40646 9.88423 1.57098 8.21383 2.19977 6.6958C2.82856 5.17777 3.89338 3.88028 5.25957 2.96742C6.62576 2.05456 8.23197 1.56732 9.87508 1.56732C12.0784 1.56732 14.1915 2.44259 15.7495 4.00059C17.3075 5.55858 18.1828 7.67168 18.1828 9.87501Z" fill="#777777"/>
                                        <path d="M9.875 0.875C8.09497 0.875 6.35491 1.40284 4.87487 2.39177C3.39483 3.38071 2.24128 4.78631 1.56009 6.43085C0.8789 8.07538 0.70067 9.88498 1.04794 11.6308C1.3952 13.3766 2.25237 14.9803 3.51104 16.239C4.76971 17.4976 6.37336 18.3548 8.11919 18.7021C9.86502 19.0493 11.6746 18.8711 13.3192 18.1899C14.9637 17.5087 16.3693 16.3552 17.3582 14.8751C18.3472 13.3951 18.875 11.655 18.875 9.875C18.8725 7.48882 17.9235 5.2011 16.2362 3.51382C14.5489 1.82654 12.2612 0.87752 9.875 0.875ZM9.875 17.4904C8.36882 17.4904 6.89646 17.0437 5.64412 16.207C4.39178 15.3702 3.4157 14.1808 2.83931 12.7893C2.26292 11.3977 2.11211 9.86655 2.40595 8.38931C2.69979 6.91207 3.42508 5.55514 4.49011 4.49011C5.55514 3.42508 6.91208 2.69978 8.38931 2.40594C9.86655 2.1121 11.3978 2.26291 12.7893 2.8393C14.1808 3.41569 15.3702 4.39177 16.207 5.64412C17.0438 6.89646 17.4904 8.36882 17.4904 9.875C17.4881 11.894 16.685 13.8297 15.2574 15.2574C13.8297 16.685 11.894 17.4881 9.875 17.4904ZM9.18269 10.5673V5.72115C9.18269 5.53754 9.25563 5.36145 9.38547 5.23162C9.5153 5.10178 9.69139 5.02885 9.875 5.02885C10.0586 5.02885 10.2347 5.10178 10.3645 5.23162C10.4944 5.36145 10.5673 5.53754 10.5673 5.72115V10.5673C10.5673 10.7509 10.4944 10.927 10.3645 11.0568C10.2347 11.1867 10.0586 11.2596 9.875 11.2596C9.69139 11.2596 9.5153 11.1867 9.38547 11.0568C9.25563 10.927 9.18269 10.7509 9.18269 10.5673ZM10.9135 13.6827C10.9135 13.8881 10.8526 14.0889 10.7385 14.2596C10.6243 14.4304 10.4622 14.5635 10.2724 14.6421C10.0826 14.7207 9.87385 14.7413 9.67241 14.7012C9.47097 14.6611 9.28593 14.5622 9.1407 14.417C8.99547 14.2718 8.89656 14.0867 8.85649 13.8853C8.81642 13.6838 8.83699 13.475 8.91559 13.2853C8.99419 13.0955 9.12729 12.9333 9.29806 12.8192C9.46884 12.7051 9.66961 12.6442 9.875 12.6442C10.1504 12.6442 10.4146 12.7536 10.6093 12.9484C10.8041 13.1431 10.9135 13.4073 10.9135 13.6827Z" fill="#777777"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="box-table" v-if="shareList.length>3">
                            <table class="m-table type02">
                                <thead>
                                <tr>
                                    <th>순위</th>
                                    <th >회원</th>
                                    <th >소속마을</th>
                                    <th style="width:100px">공유 수</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(share, index) in shareList" :key="index" 
>
                                    <template v-if="index >= 3 && share">
                                    <td>{{index + 1}}위</td>
                                    <td>{{ subText(share.name, 5) }}</td>
                                    <td>{{ share.district}}</td>
                                    <td>
                                        <div>
                                            <p style="color:rgb(248,134,1);" align="center"> {{ share.share_count }} </p>
                                            
                                        </div>
                                    </td>
                                    </template>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="mt-12"></div>
                    <div class="m-title type03" style="text-align: center;">
                        응원의 댓글을 적어주세요💚
                    </div>
                    <div class="mt-12"></div>
                    <simple-comments :commentable_id="2" :commentable_type="`attendance`"/>

                </div>
            </section>
      </div>
      <navigation />
  </div>
</template>

<script>
import simpleComments from '../../components/simpleComments.vue'
import common from '~/utils/common'
export default {
    name: 'IndexPage',
    auth: false,
    mixins: [common],
    components: {
        simpleComments
    },
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

            shareList: [],
        }
    },
    async asyncData({ $axios }) {
        const { data } = await $axios.get('/api/share-list');
        return { shareList: data.data };
    },
    methods: {
        getUserImgUrl(share, i) {

                return share.profile.url ? share.profile.url : "images/rankings/" + i + ".png";
        },
        subText(i, n) {
            if (i.length <= n) { return i; } 
            else { return i.substring(0, n) + "..."; }
        }   
    }
}
</script>
<style scoped>
    .area-share .section-ranking .m-title.type01 {
        margin-bottom:10px;
        text-align: center;
    }
    .area-share .section-ranking .rankings {
        display: flex; 
        align-items: flex-end; 
        justify-content: center;
        margin:0 -15px; margin-bottom:36px;
    }
    /* .area-share .section-ranking .first .img-wrap {
        position:relative;
    }
    .area-share .section-ranking .first .img-wrap .img {
        box-shadow:0px 6px 6px rgba(0,0,0,0.16); border-radius:100%;
    }
    .area-share .section-ranking .first .img-wrap .deco {
        position:absolute; left:50%; top:-25px; transform:translateX(-50%);
        z-index:1;
    } */
    .area-share .section-ranking .rankings .ranking-wrap.first {
        /* padding:0 30px; */
        height: 320px;
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }

    .area-share .section-ranking .rankings .ranking-wrap.second {
        /* padding:0 30px; */
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }

    .area-share .section-ranking .rankings .ranking-wrap.third {
        width: 110px;
        margin-right:5px;
        margin-left:5px;
        border-radius:5px;

        display:flex; flex-direction:column; align-items: center; justify-content: center;
    }
    /* .area-share .section-ranking .rankings .ranking-wrap:first-child {
        height: 280px;
        background-color:rgb(221,221,221);

    }

    .area-share .section-ranking .rankings .ranking-wrap:nth-child(3) {
        height: 270px;
        background-color:rgb(236,188,153);

    } */
    .area-share .section-ranking .rankings .ranking-wrap:nth-child(2) .deco {
        position:absolute; left:50%; top:0; transform:translateX(-50%);
        z-index:1;
    }

    .area-share .section-ranking .rankings .ranking {
        text-align: center;
        /* width: 80px; */
    }
    .area-share .section-ranking .rankings .img-wrap {
        height:120px;
        
        position:relative;
    }
    .area-share .section-ranking .ranking .img-wrap .rounded {
        position: absolute;
        background-color: white;
        border: 1px solid #A1A1AA;
        border-radius: 20px;
        width: 80px;
        bottom: 0;
        left: 10px;
    }

    .area-share .section-ranking .img-wrap .img-rect {
        box-shadow:0px 6px 6px rgba(0,0,0,0.16);
        border-radius:10px;
    }
    .area-share .section-ranking .rankings .img-wrap img {
        position:absolute; left:50%; top:50%; transform:translate(-50%, -50%);
    }

    .area-share .section-ranking .ranking .fragment {
        position:relative;
        margin-top:16px;
    }

    .area-share .section-ranking .ranking .fragment .subtitle {
        margin-bottom:8px;
        font-size:14px; font-weight:bold;
    }
    .area-share .section-ranking .ranking .fragment .title {
        margin-bottom:4px;
        font-size:17px; font-weight:700; font-family: GmarketSans; color:#000;
    }
    .area-share .section-ranking .ranking .fragment .title .rank {
        margin-bottom:4px;
        font-size:17px; font-weight:500; font-family: GmarketSans; color:#000;
    }
    .area-share .section-ranking .ranking .fragment .title .name {
        margin-bottom:4px;
        font-size:17px; font-weight:500; font-family: GmarketSans; color:#000;
    }
    .area-share .section-ranking .ranking .fragment .title .point {
        font-size:32px; font-weight:bold; font-family: GmarketSans; color:#000;
    }

    .area-share .section-ranking .box-table {
        padding:30px 0px 30px 0px; padding-top:10px;
        background-color:#F5F5F5; border-radius:5px;
    }
    .area-share .section-ranking .m-table {
        margin-bottom:16px;
    }


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

</style>