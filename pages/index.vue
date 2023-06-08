<template>
    <div class="area-index">
        <header-type01
        />
        <!-- 내용 영역 -->
        <div style="padding-top:30px">
            <!-- 지역이 본부 x & 로그인 -->
            <div class="fragment" v-if="district && district.id != 0">
                <section class="section-ad">
                    <swiper :options="bannerOptions">
                        <swiper-slide v-for="(slide,index) in homeBanner3" :key="slide.id">
                            <a :href="slide.link_url" target="_blank" class="link">
                                <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                            </a>
                        </swiper-slide>
                    </swiper> 
                </section>
                <section class="section-values">
                    <img src="https://dotmzh1fysixs.cloudfront.net/1018/base-town.png" alt="" class="base">
                    <div class="wrap">
                        <div class="content">
                            <div class="titles">
                                <nuxt-link to="/infos" class="left m-title type01">
                                    <p class="sub">자유마을 가입현황</p>
                                    {{ district.district }} &gt;
                                </nuxt-link>
                                <nuxt-link to="/staffs" class="right">
                                    <div>
                                        <img src="/images/main_icon_staff.png" alt="" class="">
                                    </div>
                                    <div>
                                        <span>섬기는<br />사람들</span>
                                    </div>
                                </nuxt-link>
                            </div>
                            <div class="mt-8"></div>

                            <div class="boxes">
                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">{{ district.district }} 총 인구수</h3>

                                        <div class="value">
                                            <div class="value-inner">
                                                <p class="text">{{ registerRates.population.toLocaleString() }}명</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">자유마을 가입 수</h3>

                                        <div class="value">
                                            <div class="value-inner">
                                                <p class="text">{{ registerRates.count.toLocaleString() }}명</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="box-wrap">
                                    <div class="box">
                                        <h3 class="title">마을 온도</h3>

                                        <div :class="`value level${registerRateLevel.level}`">
                                            <div class="value-inner">
                                                <p class="text">{{registerRateLevel.label}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-40"></div>

                    <!-- parasole -->
                    <section class="section-parasole" >
                        <div class="m-title type01">
                            다양한 <span class="highlighter-point">파라솔 소식을</span><br/>
                            빠르게 만나보세요
                        </div>
                        <div class="mt-8"></div>
                        <ul class="m-table type01">
                            <li v-for="(item, index) in meetingList" :key="index">
                                <nuxt-link :to="`/somoim/${item.id}`">
                                    <div class="meeting"  v-if="item.img && index == 0">
                                        <div class="image-container" :style="getBackground(item.img)">
                                            <div class="new">NEW</div>
                                            <p class="meeting-date">{{ item.start_date }}</p>
                                            <p class="meeting-title"><span class="board">&#91;{{ item.formatBoard }}&#93;</span>&nbsp;{{ replaceText(item.title,18) }}</p>
                                        </div>
                                    </div>
                                    <div class="meeting"  v-else>
                                        <p class="meeting-date">{{ item.start_date }}</p>
                                        <p class="meeting-title"><span class="board">&#91;{{ item.formatBoard }}&#93;</span>&nbsp;{{ replaceText(item.title,18) }}</p>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                        <div class="mt-8"></div>
                        <nuxt-link to="/somoim" class="m-btn type02 bg-revert-primary">더보기 +</nuxt-link>
                    </section>
                </section>
            </div>

            <!-- 지역이 본부 | 비로그인 -->
            <div class="fragment" v-else>
                <section class="section-ad">
                    <swiper :options="bannerOptions">
                        <swiper-slide v-for="(slide,index) in homeBanner3" :key="slide.id">
                            <a :href="slide.link_url" target="_blank" class="link">
                                <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                            </a>
                        </swiper-slide>
                    </swiper> 
                </section>
                <!-- 마을 홍보 영상들 -->
                <section class="section-promotion" v-if="promotionList.length !== 0">
                    <div class="wrap">
                        <div class="m-title type01">
                            <p class="sub">생생한 지역 인터뷰</p>
                            이달의 <span class="point">마을</span>
                        </div>
                        <swiper :options="swiperOptions">
                            <swiper-slide v-for="(slide,index) in promotionList" :key="slide.id">
                                <nuxt-link :to="`/posts/${slide.id}`">
                                    <div class="content">
                                        
                                        <div style="border:1px solid #bdbdbd; border-radius:10px; height:inherit;">
                                            <img class="img" :src="slide.video_thumbnail" alt="-" />
                                            <div class="mt-8"></div>
                                            <p style="font-weight:500; font-size:20px; color:#0BAF00" align="center">{{slide.title}}</p>
                                            <p style="display:block; margin: 0 15px; font-weight:300; font-size:16px; overflow:hidden; white-space:nowrap" align="center" v-html="slide.content"></p>
                                        </div>
   
                                    </div>
                                </nuxt-link>

                                <div class="mt-8"></div>
                                <nuxt-link :to="`/posts/${slide.id}`" class="m-btn type02 bg-revert-primary">자세히보기 +</nuxt-link>
                            </swiper-slide>
                        </swiper>
                    </div>
                </section>
            </div>


            <section class="section-ranking">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 100</span>
                        </div>
                        <div class="m-input-checkboxes type01">
                            <div class="mt-8"></div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="1" value="total-rankings" v-model="toggleList">
                                <label for="1">전체</label>
                            </div>
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

                        <!-- 1,2,3위 -->
                        <div class="rankings">
                            <!-- 2등 -->
                            <div class="ranking-wrap second" v-if="districtRegisterCounts.length >= 2"
                                style="height:280px background-color:rgb(221,221,221)"
                            >
                                <div class="ranking" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCounts[1].id,
                                        district: districtRegisterCounts[1].district
                                    })"
                                >
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
                                <div class="ranking" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCounts[0].id,
                                        district: districtRegisterCounts[0].district
                                    })"
                                >
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
                                <div class="ranking" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCounts[2].id,
                                        district: districtRegisterCounts[2].district
                                    })"
                                >
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
                        
                        <!-- 4위 이상 -->
                        <div class="wrapper" v-if="districtRegisterCounts.length > 3">
                            <ul class="m-table type01 rank-container">
                                <li v-for="(districtRegisterCount, index) in districtRegisterCounts" :key="index" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCount.id,
                                        district: districtRegisterCount.district
                                    })"
                                >
                                    <template v-if="index >= 3 && districtRegisterCount">
                                    
                                        <div class="rank">
                                            <div class="left">
                                                <div class="petit-image">
                                                    <img :src="`images/rankings/${index+4}.png`" alt="" srcset="">
                                                </div>
                                                <div class=" fixed-width">
                                                    {{index + 1}}위
                                                </div>
                                                <div>
                                                    {{ districtRegisterCount.city}} {{districtRegisterCount.district}}
                                                </div>                                                
                                            </div>
                                            <div class="right">
                                                <div class="badge">
                                                    <img :src="getBadgeSrc(rankingCount(districtRegisterCount))"/>
                                                </div>
                                                <div :class="getScaleClass(rankingCount(districtRegisterCount))">
                                                    <span class="tri">▲ </span>&nbsp;<span> {{ rankingCount(districtRegisterCount) }} </span>
                                                </div>
                                            </div>

                                        </div>
                                    </template>
                                </li>
                            </ul>
                            <nuxt-link to="/rank" class="m-btn type02 bg-revert-primary">마을 랭킹 TOP 100 +</nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad">
                <div class="wrap">
                    <a :href="homeBanner1.link_url" target="_blank" class="link">
                        <img :src="homeBanner1.image.url" alt="">
                    </a>
                </div>
            </section>

            <!-- 우리마을 국회의원 -->
            <section class="section-contact" v-if="district && district.id != 0">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">한눈에 확인하는 국회의원 평가</p>
                            우리마을 <span class="point">국회의원</span>
                        </div>
                        <div :class="`card-${partyClass}`" v-if="partyClass">
                            <div class="mt-32"></div>
                            <div class="m-title type04" style="color:white; text-align:center;">
                                {{ partyName }}
                            </div>
                            <div class="card-content-container">
                                <div class="card">
                                    <div class="card-image" :style="`background-image:url('${congressmanItem.img.url}')`"></div>
                                </div>
                                <p style="font-size:30px; font-weight:700;">{{ congressmanItem.korean_name }} 의원</p>
                                <div class="activity-point">
                                    <span>활동만족도</span> &nbsp;<img :src="makeAvgImg" style="width:25px; height:25px;" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12"></div>
                    <nuxt-link to="/contacts" class="m-btn type02 bg-revert-primary">평가하러가기 +</nuxt-link>
                </div>
            </section>

            <!-- 자유마을 스토리 -->
            <section class="section-story" v-if="district.id == 0">
                <div class="wrap">
                        <div class="m-title type01">
                            <p class="sub">도란도란 따뜻함이 가득한</p>
                            자유마을 <span class="point">스토리</span>
                        </div>
                        <swiper :options="storyOptions">
                            <swiper-slide v-for="(slide,index) in storyList" :key="slide.id">
                                <nuxt-link :to="`/posts/${slide.id}`">
                                    <div class="story-container">
                                        <img class="img" :src="slide.video_thumbnail" alt="-">
                                        <div class="content-container">
                                            <p style="font-size:20px; font-weight:500" v-html="slide.title"></p>
                                            <!-- <p style=" white-space:nowrap;  overflow:hidden;" v-html="slide.content"></p> -->
                                        </div>
                                    </div>
                                </nuxt-link>
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                        <div class="mt-12"></div>
                </div>
            </section>

            <!-- 마을사랑 주인공 -->
            <section class="section-popular">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">자유마을 활성화의 주인공은 누구?</p>
                            마을사랑 <span class="point">주인공</span>
                        </div>
                    </div>
                    <div class="mt-16"></div>
                    <ul class="m-table type01 rank-container" >
                        <li v-for="(item, index) in popularRankings" :key="index" 
                            @click="true"
                            :style="getOpacity(index)"
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
                                        <p style="margin-left:5px;">{{ item.nickname }}</p>
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
                </div>
            </section>


            <section class="section-ad2">
                <a :href="homeBanner2.link_url" target="_blank" class="link">
                    <img :src="homeBanner2.image.url" alt="">
                </a>
            </section>

            <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />
        </div>

        <navigation />
        <Finder
            v-if="activeFinder"
            :title="'주소로 행정동 찾기'"
            :excecute="'변환하기'"
            :cancel="'검색하기'"
            @cancel="closeModal"
            @setContainer="setContainer"
        />
        <modal
            v-if="activateNoticePop"
            :noPaddingModal="true"
            :paddingModal="false"
            :cancelBtn="false"
            @cancel="activateNoticePop = false"
        >
            <template #outter>
                <div 
                    v-for="(content, index) in noticePopupContents" :key="index"
                    v-show="content.id === getCurrentId"
                >
                    <div class="notice-modal">
                        <template v-if="content.image">
                            <a :href="content.link_url" target="_blank">
                            <img :src="content.image.url" alt="" class="modal-content">
                            </a>
                        </template>
                        <template v-if="content.youtube_url">
                            <div class="youtube-container">
                                <iframe :src="getEmbedUrl(content.youtube_url)" allowfullscreen ></iframe>
                            </div>
                        </template> 
                    </div>
                    <div class="btn-container">
                        <button class="btn" @click="closeAllDay(content,index)">하루 동안 그만보기</button>
                        <button class="btn" @click="justClose(content,index)">닫기</button>
                    </div>
                </div>

            </template>
        </modal>
    </div>
</template>

<script>
import * as Cookies from "js-cookie";
import {VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css';
import common from '~/utils/common';
export default {
    name: 'IndexPage',
    auth: false,
    components: {
        VueperSlides,VueperSlide
    },
    mixins: [common],
    data() {
        return {
            toggleList: 'total-rankings',
            guideText: '',
            notOpenChecked:false,
            activateNoticePop: false,
            currentId: 0,
            noticePopupContents:[],
            activeFinder:false,
            container:{},

            bannerOptions: {
                slidesPerView: 'auto',
                centeredSlides: false,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            },

            swiperOptions: {
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            },

            storyOptions: {
                slidesPerView: 'auto',
                centeredSlides: true, 
                spaceBetween: 15,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            form: {
                district_id: "",
                district: "",
                rankingUrl: "total-rankings",
            },

            notices: {
                data: [],
                meta: {},
                links: {}
            },

            clips: {
                data: [],
                meta: {},
                links: {}
            },

            photos: {
                data: [],
                meta: {},
                links: {}
            },

            asks: {
                data: [],
                meta: {},
                links: {}
            },

            registerRates: {
                population: 0,
                count: 0,
                rate: 0,
            },

            districtRegisterCounts: [

            ],
            popularRankings: [],
            promotionList: [],
            storyList: [],
            meetingList: [],
            homeBanners:[],

            congressmanItem: null,
            temp: null,
            partyName: '',
            partyClass: undefined,
        }
    },
    async asyncData({$axios}) {
        const homeBanners = await $axios.get('/api/banners/home');
        const promotionList = await $axios.get('/api/promotion');
        const meetingList = await $axios.get('/api/meeting');
        return {
            promotionList: [
                ...promotionList.data.promotion,
            ],
            storyList: [
                ...promotionList.data.story,
            ],
            homeBanners: {
                ...homeBanners.data,
                
            },
            meetingList: [
                ...meetingList.data.data,
            ]
        };
    },
    computed: {
        district(){
            return this.$store.state.district;
        },

        registerRateLevel(){
            if(this.registerRates.rate <= 1)
                return {
                    level:1,
                    label: "낮음"
                };

            if(this.registerRates.rate <= 3)
                return {
                    level:2,
                    label: "보통"
                };

            if(this.registerRates.rate <= 5)
                return {
                    level:3,
                    label: "조금 높음"
                };

            if(this.registerRates.rate <= 10)
                return {
                    level:4,
                    label: "높음"
                };

            if(this.registerRates.rate <= 20)
                return {
                    level:5,
                    label: "매우 높음"
                };

           return {
                level:6,
                label: "아주 높음"
            };
        },

        getCurrentId() {
            return this.currentId;
        },
        uptoThreeDistrictRegisterCounts() {
            return this.districtRegisterCounts.slice(0,3);
        },
        homeBanner1() {
            return this.homeBanners.banners.find(banner => {
                return banner.position === 'home1';
            })
        },
        homeBanner2() {
            return this.homeBanners.banners.find(banner => {
                return banner.position === 'home2';
            })
        },
        homeBanner3() {
            const sliderList = [];
            console.log(this.homeBanners.banners[5], 'check')
            return [this.homeBanners.banners[5], this.homeBanners.banners[6]]
        },
        
        aggregateReviews() {
            let reviews = this.$store.state.contactReviews.data;
            const countBy = this.countBy(reviews, 'grade', [1,2,3,4,5]);
            const result = this.convertObjByKeyDesc(countBy);
            return result;
        },
        options() {
            return this.$store.getters.getOptions
        },
        evaluateAvg() {
            const totalCount = this.totalCount;
            const sum = this.options.reduce((acc, cur, index) => {
                return acc + cur.value * this.aggregateReviews[index].value;
            }, 0);
            return Math.floor((sum / (totalCount * 5)) * 100);
        },
        makeAvgImg(){
            let img = '/images/contacts/f_1.png';
            if(this.evaluateAvg > 80) {
                img = '/images/contacts/f_5.png';
            }else if(this.evaluateAvg > 60) {
                img = '/images/contacts/f_4.png';
            }else if(this.evaluateAvg > 40) {
                img = '/images/contacts/f_3.png';
            }else if(this.evaluateAvg > 20) {
                img = '/images/contacts/f_2.png';
            }
            return img;
        },


    },

    methods: { 
        computedPartyClass(partyName) {
            partyName == '국민의힘' ? 'red' : 'blue';
        },
        async getCongressmanInfo(){
            try {
                const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/contacts`)
                if(response) {
                    this.temp = response.data.data;
                    this.review_check = this.temp.review_check;
                    await this.nprlapfmaufmqytet(this.temp.korean_name); //의원 약력 등 정보
                }
                    
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 약력 등 추가 정보
         */
         async nprlapfmaufmqytet(name) {
            try {
                const {data} = await this.$axios.get(`/portal/openapi/nprlapfmaufmqytet`, {
                    params: {
                        DAESU: '21',
                        NAME: name,
                        type: 'json',
                        key: 'e2e2ddc84af3448a85e4205a03b1bf3a'
                    }
                })

                if(data) {
                    // console.log(data.nprlapfmaufmqytet[1].row[0])
                    this.congressmanItem = {
                        ...this.temp,
                        ...data.nprlapfmaufmqytet[1].row[0],
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        getBackground(img) {
            return `background-image: linear-gradient(to bottom, transparent 0%, black 150%), url(${img.url}); background-size: cover; background-position: 50% 25%; `;
   
        },
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
        getBarColor(activityIndex) {
            if(activityIndex >= 90) return '#ff6600';
            if(activityIndex >= 80) return '#ffb017';
            if(activityIndex <= 79) return '#ffe607';
        },
        getOpacity(index) {
            if(index <= 4) return 'opacity:1';
            if(index <= 7) return 'opacity:0.5';
            return 'opacity:0.3';
        },

        async getNoticeContents() {
            try {
                const {data} = await this.$axios.get('/api/banners/popups')
                if(data.banners.length) {
                    this.noticePopupContents = data.banners.filter(notice => {
                        return !Cookies.get(`popup${notice.id}`)
                    });
                    if(this.noticePopupContents.length === 0) {
                        Cookies.set('allPopClosedToday',true,{expires: 1, secure: false});
                        return;
                    };
                    this.currentId = this.noticePopupContents[0].id;
                    this.activateNoticePop = true;
                }
            } catch (error) {

            }
        },
        closeAllDay(content, index) {
            Cookies.set(`popup${content.id}`,"closed",{expires: 1, secure: false});

            const lastIndex = this.noticePopupContents.length - 1;
            if(lastIndex === index) {
                this.activateNoticePop = false;
            } else {
                this.nextNotice(index);
            }
        },
        justClose(content, index) {
            const lastIndex = this.noticePopupContents.length - 1;
            if(lastIndex === index) {
                this.activateNoticePop = false;
            } else {
                this.nextNotice(index);
            }
        },
        nextNotice(targetIdx) {
            const idx = this.noticePopupContents.findIndex((notice,index) => {
                return index === targetIdx;
            });
            this.currentId =  this.noticePopupContents[idx + 1].id;
        },
        getEmbedUrl(url){
            let id = "";
            let embedUrl = "";
            let match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);

            id = (match&&match[7].length==11)?match[7]:false;

            if(id) {
                embedUrl = "https://www.youtube.com/embed/" + id;
            }

            return embedUrl;
        },

        // active() {
        //     this.activeFinder = true;
        // },
        closeModal() {
            this.activeFinder = false;

        },
        setContainer(container) {
            this.container = container;
        },
        search() {
            if(this.form.district == "" || this.form.district ==  undefined) {
                return;
            }
            this.$store.commit("changeDistrict", this.form.district);
            this.updatePosts(this.district.id);
            window.scrollTo(0,0);
            this.container = {};
        },
        changeDistrictInRanking(data) {
            this.$store.commit("changeDistrict", data);
        },
        changeDistrict(data) {
            this.form.district = data.district
        },

        getRankings(count){
            this.$axios.get(`/api/${this.form.rankingUrl}/${count}`)
                .then(response => {
                    this.districtRegisterCounts = response.data.districtRegisterCounts;
                });
        },
        async getPopularRakings(count) {
            const response = await this.$axios.get(`/api/popular-list?limitNumber=${count}`);
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
            this.popularRankings = data;
        },

        //TODO daily-rankings 현재 처리되고 있지 않음
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

        async updatePosts(districtId) {
            this.$axios.get("/api/posts", {
                params: {
                    board: "notices",
                    district_id: districtId
                }
            }).then(response => {
                this.notices = response.data;
            });

            this.$axios.get("/api/posts", {
                params: {
                    board: "clips",
                    district_id: districtId,
                }
            }).then(response => {
                this.clips = response.data;
            });

            this.$axios.get("/api/posts", {
                params: {
                    board: "photos",
                    district_id: districtId,
                }
            }).then(response => {
                this.photos = response.data;
            });

            this.$axios.get("/api/posts", {
                params: {
                    board: "asks",
                    district_id: districtId,
                }
            }).then(response => {
                this.asks = response.data;
            });
        },

    },
    watch: {
        district (newCount, oldCount) {
            // this.updatePosts(this.district.id);

            this.getRankings(10);

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
            this.getRankings(10);
        },

        congressmanItem: {
            deep: true,
            handler: function (value) {
                let str = value.DAE.split(" ");
                let partyName = str[str.length-1].trim();
                if(partyName === '미래통합당') {
                    this.partyClass = 'red'
                    partyName = '국민의힘';
                }else {
                    this.partyClass = 'blue'
                }
                this.partyName = partyName;
            }
        }
    },

    async mounted() {
        this.switchRankGuide('total-rankings');
        // await this.updatePosts(this.district.id);
        if(!Cookies.get('allPopClosedToday')) {
            await this.getNoticeContents();
        }

        this.getRankings(10);
        this.getPopularRakings(10);

        if(this.district.id != 0) {
            await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district.id);
            await this.getCongressmanInfo();
            this.$axios.get("/api/districts/" + this.district.id + "/register_rates")
                .then(response => {
                    this.registerRates = response.data.registerRates;
                });
        }


    },

}
</script>
<style scoped>
    .titles {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .titles .right {
        max-width: 143px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 30%;
        height: 60px;
        background: #ffffff;
        border:solid 1px #e5e5e5;
        border-radius:5px; 
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        


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
    .rank .fixed-width {
        width: 50px;
    }
    .rank .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right:0.25rem;
    }
    .rank .badge {
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

    .btn-container {
        display: flex;
        width:100%;
        justify-content: center;
        align-content: center;
    }
    .btn-container .btn {
        flex:1;
        height:60px;
        font-size:20px;
        border: 1px solid #e6e6e6;
    }
    .notice-modal {
        height:300px;
    }
    .notice-modal .modal-content {
        width:100%;
        height:100%;
    }
    .youtube-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px; /* 높이는 페이지에 맞게 조정할 수 있습니다. */
    }

    .youtube-container iframe {
        width: 100%;
        height: inherit;
        max-width: 500px; /* 원하는 최대 너비로 조정할 수 있습니다. */
    }

    .swiper-container {
        width: 100%;
        /* padding-left: 50px; */
    }

    /* .swiper-slide {
      width: 85%;
      opacity: 0.4;
      transition: opacity 0.3s;
    } */

    .swiper-slide-active {
        opacity: 1;
    }

    .swiper-slide .content {
      background-color: white;
      height: 250px;
      overflow:hidden;
      border-radius: 10px;
    }
    .swiper-slide .cotent .title {
        font-size: 20px !important;
        font-weight: 500 !important; 
        margin-bottom: 5px;
    }
    .swiper-slide .content .img {
        border-radius: 10px;
        width:100%;
        height:65%;
        object-fit: cover;
    }
    .swiper-slide .content .writer {
        position: absolute;
        right:0;
        bottom: 0;
        margin-bottom: 15px;
        margin-right: 15px;
        color:#bdbdbd;
    }

    .swiper-slide .story-container {
        position: relative;
        background-color: white;
        height: 250px;
        overflow:hidden;
    }

    .swiper-slide .story-container .img {
        border-radius: 10px;
        width:100%;
        height:65%;
        object-fit: cover;
    }

    .swiper-slide .story-container .content-container {
        position:absolute;
        background-color:white;
        border:1px solid #bdbdbd;
        border-radius: 10px;
        width: 90%;
        height:80px;
        bottom: 20%;
        left: 5%;

        display:flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }


</style>
