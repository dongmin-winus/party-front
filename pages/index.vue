<template>
    <div class="area-index" v-if="!loading">
        <header-type01
        />
        <!-- 내용 영역 -->
        <div style="padding-top:30px">
            <!-- 지역이 본부 x & 로그인 -->
            
            <div class="fragment" v-show="district && district.id != 0">
                <section class="section-ad">
                    <client-only>
                        <carousel
                            :adjustableHeight="true"
                            :loop="true" 
                            :per-page="1"
                            :autoplay="true"
                            :autoplay-timeout="5000"
                            :mouse-drag="false"
                            :pagination-enabled="false"
                        >
                            <slide class="swiper-slide" v-for="(slide,index) in getHomeBanner1" :key="slide.id">
                                <a :href="slide.link_url" target="_blank" class="link">
                                    <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                                </a>
                            </slide>
                        </carousel>
                    </client-only>
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
                                        <img src="@/assets/images/main_icon_staff.png" alt="" class="">
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
            <div class="fragment" v-show="!(district && district.id != 0)">
                <section class="section-ad">
                    <client-only>
                        <carousel
                            :adjustableHeight="true"
                            :loop="true" 
                            :per-page="1"
                            :autoplay="true"
                            :autoplay-timeout="5000"
                            :mouse-drag="false"
                            :pagination-enabled="false"
                        >
                            <slide class="swiper-slide" v-for="(slide,index) in getHomeBanner1" :key="slide.id">
                                <a :href="slide.link_url" target="_blank" class="link">
                                    <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                                </a>
                            </slide>
                        </carousel>
                    </client-only>
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
                                        <div style="position:relative; border:1px solid #bdbdbd; border-radius:10px; height:inherit;">
                                            <div class="recommend">
                                                <span style="color:white;">{{new Date().getMonth()+1}}월추천</span>
                                            </div>
                                            <img class="img" :src="slide.video_thumbnail" alt="-" />
                                            <div class="mt-8"></div>
                                            <p style="font-weight:500; font-size:20px; color:#0BAF00" align="center">{{seperateString(slide.title,'/')[0]}}</p>
                                            <p style="display:block; margin: 0 15px; font-weight:300; font-size:16px; overflow:hidden; white-space:nowrap" align="center" v-html="seperateString(slide.title,'/')[1]"></p>
                                        </div>

                                    </div>
                                </nuxt-link>
                                <div class="mt-8"></div>
                                <nuxt-link :to="`/posts/${activePromotionId}`" class="m-btn type02 bg-revert-primary">자세히보기 +</nuxt-link>

                            </swiper-slide>
                        </swiper>
                        <div class="mt-40"></div>  
                    </div>
                </section>
            </div>

            <section class="section-ranking" :style="`${$auth.user ? ($store.state.district.id !== 0 ?  '' : 'background-color:#F7F7F7; padding:24px 0;') : 'background-color:#F7F7F7; padding:24px 0;'}`">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을별 가입 <span class="point">TOP 100</span>
                        </div>
                        <div class="m-input-checkboxes" :class="`${$auth.user ? ($store.state.district.id !== 0 ?  'type01' : 'type05') : 'type05'}`">
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
                                        <img src="@/assets/images/rankings/main_ranking_2nd.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">2</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <!-- <p class="subtitle">{{ districtRegisterCounts[1].district }}</p> -->
                                            <div style="display:flex; flex-direction:column;">
                                                <p class="subtitle">{{ districtRegisterCounts[1].state }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[1].city }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[1].district }}</p>
                                            </div>
                                            <div class="badge" v-if="getBadgeSrc(rankingCount(districtRegisterCounts[1]))">
                                                <img :src="require(`@/assets/images/${getBadgeSrc(rankingCount(districtRegisterCounts[1]))}`)"/>
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
                                        <img src="@/assets/images/rankings/main_ranking_1st.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">1</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <!-- <p class="subtitle">{{ districtRegisterCounts[0].district }}</p> -->
                                            <div style="display:flex; flex-direction:column;">
                                                <p class="subtitle">{{ districtRegisterCounts[0].state }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[0].city }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[0].district }}</p>
                                            </div>
                                            <div class="badge" v-if="getBadgeSrc(rankingCount(districtRegisterCounts[0]))">
                                                <img :src="require(`@/assets/images/${getBadgeSrc(rankingCount(districtRegisterCounts[0]))}`)"/>
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
                                        <img src="@/assets/images/rankings/main_ranking_3rd.png" width="100px" alt="" class="img-rect">

                                    </div>

                                    <div class="fragment">
                                        <h3 class="title">
                                            <span class="point">3</span>위
                                        </h3>
                                        <div class="subtitle-container">
                                            <!-- <p class="subtitle">{{ districtRegisterCounts[2].district }} </p> -->
                                            <div style="display:flex; flex-direction:column;">
                                                <p class="subtitle">{{ districtRegisterCounts[2].state }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[2].city }}</p>
                                                <p class="subtitle">{{ districtRegisterCounts[2].district }}</p>
                                            </div>
                                            <div class="badge" v-if="getBadgeSrc(rankingCount(districtRegisterCounts[2]))">
                                                <img :src="require(`@/assets/images/${getBadgeSrc(rankingCount(districtRegisterCounts[2]))}`)"/>
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
                                                    <img :src="require(`@/assets/images/rankings/${index+4}.png`)" alt="" srcset="">
                                                </div>
                                                <div class=" fixed-width">
                                                    {{index + 1}}위
                                                </div>
                                                <div>
                                                    {{ districtRegisterCount.state }} {{ districtRegisterCount.city}} {{districtRegisterCount.district}}
                                                </div>                                                
                                            </div>
                                            <div class="right">
                                                <div class="badge" v-if="getBadgeSrc(rankingCount(districtRegisterCount))">
                                                    <img :src="require(`@/assets/images/${getBadgeSrc(rankingCount(districtRegisterCount))}`)"/>
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

            <section class="section-action-ranking" style="background-color:#F7F7F7; padding:24px 0;">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">순위 현황 한 눈에 보기</p>
                            마을 활동랭킹 <span class="point">TOP 10</span>
                        </div>
                        <div class="m-input-checkboxes" :class="`${$auth.user ? ($store.state.district.id !== 0 ?  'type01' : 'type05') : 'type05'}`">
                            <div class="mt-8"></div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="year" value="year" v-model="toggleActionList">
                                <label for="year">전체</label>
                            </div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="week" value="week" v-model="toggleActionList">
                                <label for="week">주간</label>
                            </div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="month" value="month" v-model="toggleActionList">
                                <label for="month">월간</label>
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
                        <div class="mt-32"></div>

                        <!-- 1,2,3위 자리 -->
                        <div class="podium">
                            <div v-for="(item, index) in actionRankings.slice(0,3)"
                                :class="`${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`"
                            >
                                <img :src="require(`@/assets/images/${index == 0 ? 'action_1st.png' : index == 1 ? 'action_2nd.png' : 'action_3rd.png'}`)"  alt="">

                                <div class="ranking-info">
                                    <p class="title">
                                        <span class="point">{{ item.rank }}</span>위&nbsp;
                                        <span class="point">{{ item.district }}</span> 
                                    </p>
                                    <div class="details-container">
                                        <div class="details" :class="`${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`">
                                            <p >{{ countDots(item.my_count) }}{{ item.my_count > 0 ? '▲' : '-' }}</p>
                                            <p>우리동네</p>
                                        </div>
                                        <div class="details" :class="`${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`">
                                            <p>{{ countDots(item.neighbor_count) }}{{ item.neighbor_count > 0 ? '▲' : '-' }}</p>
                                            <p>이웃동네</p>
                                        </div>
                                        <div class="details total">
                                            <p class="total">{{ countDots(item.total_count) }}{{ item.total_count > 0 ? '▲' : '-' }}</p>
                                            <p>총 추천 수</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 4위 이상 -->
                        <div class="mt-12"></div>

                        <!-- TODO 우리 동네 랭킹 점수 필요함 -->
                        <div class="wrapper" v-if="$auth.user?.district_id !== undefined">
                            <ul class="m-table type01 rank-container">
                                <li>
                                    <div class="rank my-town">
                                        <div class="left">
                                            <!-- 100위 안에 들면 primary + 숫자 표기, 그렇지 않으면 #777 '-' 표기 -->
                                            <div :class="`primary`">
                                                {{ actionMyRanking.rank <= 100 ? actionMyRanking.rank : '---' }}위
                                            </div>
                                            <div class="badge">
                                                우리동네
                                            </div>
                                            <div>
                                                {{ $auth.user.district.city }} {{ $auth.user.district.district }}
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="bg-red-30" style="color:red">
                                                {{ countDots(actionMyRanking.total_count) }}{{ actionMyRanking.total_count > 0 ? '▲' : '-' }}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="wrapper" v-if="actionRankings.length > 3">
                            <ul class="m-table type01 rank-container">
                                <li v-for="(item, index) in actionRankings.slice(2)" :key="index" 
                                >
                                    <template v-if="index >= 3 && item">
                                    
                                        <div class="rank">
                                            <div class="left">
                                                <div class="petit-image">
                                                    <img :src="require(`@/assets/images/rankings/${index+4}.png`)" alt="" srcset="">
                                                </div>
                                                <div class=" fixed-width">
                                                    {{item.rank + 1}}위
                                                </div>
                                                <div>
                                                   {{item.state}} {{ item.city }} {{item.district}}
                                                </div>                                                
                                            </div>
                                            <div class="right">
                                                <!-- <div class="badge" v-if="getBadgeSrc(rankingCount(item))">
                                                    <img :src="require(`@/assets/images/${getBadgeSrc(rankingCount(item))}`)"/>
                                                </div> -->
                                                <div class="bg-red-30" style="color:red">
                                                    {{ countDots(item.total_count) }}{{ item.total_count > 0 ? '▲' : '-' }}
                                                </div>
                                            </div>

                                        </div>
                                    </template>
                                </li>
                            </ul>

                            <!-- TODO 마을활동랭킹 TOp 100 페이지 만들어야함 -->
                            <!-- <nuxt-link to="/rank" class="m-btn type02 bg-revert-primary">마을 랭킹 TOP 100 +</nuxt-link> -->
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad">
                <client-only>
                    <carousel
                        :adjustableHeight="true"
                        :loop="true" 
                        :per-page="1"
                        :autoplay="true"
                        :autoplay-timeout="2000"
                        :mouse-drag="false"
                        :pagination-enabled="true"
                        :pagination-position="'bottom'"
                    >
                        <slide class="swiper-slide" v-for="(slide,index) in getHomeBanner2" :key="slide.id">
                            <a :href="slide.link_url" target="_blank" class="link" @click="countClick('banner',slide.id)">
                                <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                            </a>
                        </slide>
                    </carousel>
                </client-only> 
            </section>

            <!-- 자유마을 스토리 -->
            <section class="section-story" v-if="district.id == 0">
                <div class="wrap">
                    <div class="m-title type01">
                        <p class="sub">도란도란 따뜻함이 가득한</p>
                        자유마을 <span class="point">스토리</span>
                    </div>
                    <client-only>
                        <carousel
                            :adjustableHeight="true"
                            :loop="true" 
                            :per-page="1"
                            :autoplay="true"
                            :autoplay-timeout="5000"
                            :mouse-drag="false"
                            :pagination-enabled="true"
                            :pagination-position="'bottom-overlay'"
                        >
                            <slide class="swiper-slide" v-for="(slide,index) in storyList" :key="slide.id">
                                <nuxt-link :to="`/posts/${slide.id}`" style="padding-bottom:32px;">
                                    <div class="story-container">
                                        <div class="ribbon">
                                            <p class="year">{{ new Date().getFullYear() }}</p>
                                            <p class="month">{{ new Date().getMonth() + 1 }}월</p>
                                        </div>
                                        <img class="img" :src="slide.video_thumbnail" alt="-">
                                        <div class="content-container">
                                            <p style="font-size:20px; font-weight:500" v-html="replaceText(slide.title,10)"></p>
                                            <p style="color:#777; overflow:hidden;" v-html="replaceText(slide.content,10)"></p>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </slide>
                        </carousel>
                    </client-only>
                    <div class="mt-12"></div>
                </div>
            </section>

            <!-- TODO 230802 마을사랑 주인공 비활성화 -->
            <!-- <section class="section-popular">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">자유마을 활성화의 주인공은 누구?</p>
                            개인랭킹 <span class="point orange">TOP10</span>
                        </div>
                    </div>
                    <div class="m-input-checkboxes type01">
                        <div class="mt-8"></div>
                        <div class="m-input-checkbox">
                            <input type="radio" id="11" value="year" v-model="togglePopularList">
                            <label for="11">전체</label>
                        </div>
                        <div class="m-input-checkbox">
                            <input type="radio" id="12" value="week" v-model="togglePopularList">
                            <label for="12">주간</label>
                        </div>
                        <div class="m-input-checkbox">
                            <input type="radio" id="13" value="month" v-model="togglePopularList">
                            <label for="13">월간</label>
                        </div>
                        <div class="m-input-checkbox">
                            <input type="radio" id="14" value="statistics" v-model="togglePopularList">
                            <label for="14">통계</label>
                        </div>
                    </div>
                    <div class="time-container mt-8">
                        <div class="left"></div>
                        <div class="right">
                            <div class="time">
                                {{ guideTextPopular }} 기준
                            </div>
                            <div class="icon-container" >
                                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.2" d="M18.1828 9.87501C18.1828 11.5181 17.6955 13.1243 16.7827 14.4905C15.8698 15.8567 14.5723 16.9215 13.0543 17.5503C11.5363 18.1791 9.86586 18.3436 8.25433 18.0231C6.64279 17.7025 5.1625 16.9113 4.00065 15.7494C2.8388 14.5876 2.04757 13.1073 1.72702 11.4958C1.40646 9.88423 1.57098 8.21383 2.19977 6.6958C2.82856 5.17777 3.89338 3.88028 5.25957 2.96742C6.62576 2.05456 8.23197 1.56732 9.87508 1.56732C12.0784 1.56732 14.1915 2.44259 15.7495 4.00059C17.3075 5.55858 18.1828 7.67168 18.1828 9.87501Z" fill="#777777"/>
                                    <path d="M9.875 0.875C8.09497 0.875 6.35491 1.40284 4.87487 2.39177C3.39483 3.38071 2.24128 4.78631 1.56009 6.43085C0.8789 8.07538 0.70067 9.88498 1.04794 11.6308C1.3952 13.3766 2.25237 14.9803 3.51104 16.239C4.76971 17.4976 6.37336 18.3548 8.11919 18.7021C9.86502 19.0493 11.6746 18.8711 13.3192 18.1899C14.9637 17.5087 16.3693 16.3552 17.3582 14.8751C18.3472 13.3951 18.875 11.655 18.875 9.875C18.8725 7.48882 17.9235 5.2011 16.2362 3.51382C14.5489 1.82654 12.2612 0.87752 9.875 0.875ZM9.875 17.4904C8.36882 17.4904 6.89646 17.0437 5.64412 16.207C4.39178 15.3702 3.4157 14.1808 2.83931 12.7893C2.26292 11.3977 2.11211 9.86655 2.40595 8.38931C2.69979 6.91207 3.42508 5.55514 4.49011 4.49011C5.55514 3.42508 6.91208 2.69978 8.38931 2.40594C9.86655 2.1121 11.3978 2.26291 12.7893 2.8393C14.1808 3.41569 15.3702 4.39177 16.207 5.64412C17.0438 6.89646 17.4904 8.36882 17.4904 9.875C17.4881 11.894 16.685 13.8297 15.2574 15.2574C13.8297 16.685 11.894 17.4881 9.875 17.4904ZM9.18269 10.5673V5.72115C9.18269 5.53754 9.25563 5.36145 9.38547 5.23162C9.5153 5.10178 9.69139 5.02885 9.875 5.02885C10.0586 5.02885 10.2347 5.10178 10.3645 5.23162C10.4944 5.36145 10.5673 5.53754 10.5673 5.72115V10.5673C10.5673 10.7509 10.4944 10.927 10.3645 11.0568C10.2347 11.1867 10.0586 11.2596 9.875 11.2596C9.69139 11.2596 9.5153 11.1867 9.38547 11.0568C9.25563 10.927 9.18269 10.7509 9.18269 10.5673ZM10.9135 13.6827C10.9135 13.8881 10.8526 14.0889 10.7385 14.2596C10.6243 14.4304 10.4622 14.5635 10.2724 14.6421C10.0826 14.7207 9.87385 14.7413 9.67241 14.7012C9.47097 14.6611 9.28593 14.5622 9.1407 14.417C8.99547 14.2718 8.89656 14.0867 8.85649 13.8853C8.81642 13.6838 8.83699 13.475 8.91559 13.2853C8.99419 13.0955 9.12729 12.9333 9.29806 12.8192C9.46884 12.7051 9.66961 12.6442 9.875 12.6442C10.1504 12.6442 10.4146 12.7536 10.6093 12.9484C10.8041 13.1431 10.9135 13.4073 10.9135 13.6827Z" fill="#777777"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="point-notice">
                        <svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2" d="M18.1828 9.87501C18.1828 11.5181 17.6955 13.1243 16.7827 14.4905C15.8698 15.8567 14.5723 16.9215 13.0543 17.5503C11.5363 18.1791 9.86586 18.3436 8.25433 18.0231C6.64279 17.7025 5.1625 16.9113 4.00065 15.7494C2.8388 14.5876 2.04757 13.1073 1.72702 11.4958C1.40646 9.88423 1.57098 8.21383 2.19977 6.6958C2.82856 5.17777 3.89338 3.88028 5.25957 2.96742C6.62576 2.05456 8.23197 1.56732 9.87508 1.56732C12.0784 1.56732 14.1915 2.44259 15.7495 4.00059C17.3075 5.55858 18.1828 7.67168 18.1828 9.87501Z" fill="#777777"/>
                            <path d="M9.875 0.875C8.09497 0.875 6.35491 1.40284 4.87487 2.39177C3.39483 3.38071 2.24128 4.78631 1.56009 6.43085C0.8789 8.07538 0.70067 9.88498 1.04794 11.6308C1.3952 13.3766 2.25237 14.9803 3.51104 16.239C4.76971 17.4976 6.37336 18.3548 8.11919 18.7021C9.86502 19.0493 11.6746 18.8711 13.3192 18.1899C14.9637 17.5087 16.3693 16.3552 17.3582 14.8751C18.3472 13.3951 18.875 11.655 18.875 9.875C18.8725 7.48882 17.9235 5.2011 16.2362 3.51382C14.5489 1.82654 12.2612 0.87752 9.875 0.875ZM9.875 17.4904C8.36882 17.4904 6.89646 17.0437 5.64412 16.207C4.39178 15.3702 3.4157 14.1808 2.83931 12.7893C2.26292 11.3977 2.11211 9.86655 2.40595 8.38931C2.69979 6.91207 3.42508 5.55514 4.49011 4.49011C5.55514 3.42508 6.91208 2.69978 8.38931 2.40594C9.86655 2.1121 11.3978 2.26291 12.7893 2.8393C14.1808 3.41569 15.3702 4.39177 16.207 5.64412C17.0438 6.89646 17.4904 8.36882 17.4904 9.875C17.4881 11.894 16.685 13.8297 15.2574 15.2574C13.8297 16.685 11.894 17.4881 9.875 17.4904ZM9.18269 10.5673V5.72115C9.18269 5.53754 9.25563 5.36145 9.38547 5.23162C9.5153 5.10178 9.69139 5.02885 9.875 5.02885C10.0586 5.02885 10.2347 5.10178 10.3645 5.23162C10.4944 5.36145 10.5673 5.53754 10.5673 5.72115V10.5673C10.5673 10.7509 10.4944 10.927 10.3645 11.0568C10.2347 11.1867 10.0586 11.2596 9.875 11.2596C9.69139 11.2596 9.5153 11.1867 9.38547 11.0568C9.25563 10.927 9.18269 10.7509 9.18269 10.5673ZM10.9135 13.6827C10.9135 13.8881 10.8526 14.0889 10.7385 14.2596C10.6243 14.4304 10.4622 14.5635 10.2724 14.6421C10.0826 14.7207 9.87385 14.7413 9.67241 14.7012C9.47097 14.6611 9.28593 14.5622 9.1407 14.417C8.99547 14.2718 8.89656 14.0867 8.85649 13.8853C8.81642 13.6838 8.83699 13.475 8.91559 13.2853C8.99419 13.0955 9.12729 12.9333 9.29806 12.8192C9.46884 12.7051 9.66961 12.6442 9.875 12.6442C10.1504 12.6442 10.4146 12.7536 10.6093 12.9484C10.8041 13.1431 10.9135 13.4073 10.9135 13.6827Z" fill="#777777"/>
                        </svg>
                        <span>개인랭킹 시작일 2023년 7월 1일 기준</span>
                        <p>점수계산: 기본점수 1만점, 회원가입(추천인): 50점, 게시글: 25점, 공유: 20점, 좋아요: 5점</p>
                    </div>
                    <ul class="m-table type01 rank-container mt-32" >
                        <li v-for="(item, index) in popularRankings" :key="index" 
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
                    <nuxt-link to="/popular/rank" class="m-btn type02 bg-revert-primary">개인 랭킹 TOP 100 +</nuxt-link>
                </div>
            </section> -->

            <!-- 우리마을 국회의원 -->
            <section class="section-contact" v-if="district && district.id != 0 && congressmanItem?.congress_code !== ''">
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
                                    <span>활동만족도</span> &nbsp;<img :src="require(`@/assets/images/${makeAvgImg}`)" style="width:25px; height:25px;" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12"></div>
                    <nuxt-link to="/contacts" class="m-btn type02 bg-revert-primary">평가하러가기 +</nuxt-link>
                </div>
            </section>

            <div class="mt-12"></div>
            <section class="section-ad">
                <client-only>
                    <carousel
                        :adjustableHeight="true"
                        :loop="true" 
                        :per-page="1"
                        :autoplay="true"
                        :autoplay-timeout="5000"
                        :mouse-drag="false"
                        :pagination-enabled="false"
                    >
                        <slide class="swiper-slide" v-for="(slide,index) in getHomeBanner3" :key="slide.id">
                            <a :href="slide.link_url" target="_blank" class="link" @click="countClick('banner',slide.id)">
                                <img class="img" v-if="slide.image" :src="slide.image.url" alt="-">
                            </a>
                        </slide>
                    </carousel>
                </client-only>
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
import { mapActions } from 'vuex';
import common from '~/utils/common';
export default {
    name: 'IndexPage',
    auth: false,
    components: {
    },
    mixins: [common],
    data() {
        return {
            //action-ranking
            actionRankings: [],
            actionMyRanking: {},
            toggleActionList: 'year',

            loading: true,

            toggleList: 'total-rankings',
            togglePopularList: 'year',
            guideText: '',
            guideTextPopular: '',
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
            middleBannerOptions: {
                slidesPerView: 'auto',
                centeredSlides: false,
                loop: true,
                autoplay: {
                    delay: 2000,
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
                popularRankUrl: "year"
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
            activePromotionId: 0,
            storyList: [],
            meetingList: [],
            homeBanners: {},

            congressmanItem: null,
            temp: null,
            partyName: '',
            partyClass: undefined,
            tokenCount: 10000,

            pointNoticeOpen: false,
        }
    },
    // async asyncData({$axios}) {
    //     const homeBanners = await $axios.get('/api/banners/home');
    //     const promotionList = await $axios.get('/api/promotion');
    //     const meetingList = await $axios.get('/api/meeting');
    //     return {
    //         promotionList: [
    //             ...promotionList.data.promotion.map((item) => {
    //                 return {
    //                     ...item,
    //                     video_thumbnail: item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg')
    //                 }
    //             })
    //         ],
    //         storyList: [
    //             ...promotionList.data.story.map((item) => {
    //                 return {
    //                     ...item,
    //                     video_thumbnail: item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg')
    //                 }
    //             })
    //         ],
    //         homeBanners: {
    //             ...homeBanners.data,
                
    //         },
    //         meetingList: [
    //             ...meetingList.data.data,
    //         ]
    //     };
    // },
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

        getHomeBanner1() {
            return this.$store.getters.getHomeBanner1;
        },
        getHomeBanner2() {
            return this.$store.getters.getHomeBanner2;
        },
        getHomeBanner3() {
            return this.$store.getters.getHomeBanner3;
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
            let img = 'contacts/f_1.png';
            if(this.evaluateAvg > 80) {
                img = 'contacts/f_5.png';
            }else if(this.evaluateAvg > 60) {
                img = 'contacts/f_4.png';
            }else if(this.evaluateAvg > 40) {
                img = 'contacts/f_3.png';
            }else if(this.evaluateAvg > 20) {
                img = 'contacts/f_2.png';
            }
            return img;
        },


    },

    methods: {
        //test data
        async getActionRankings(date='year') {
            // const actionRankings = await this.$axios.$get('/data/action_ranking_test.json')
            const response = await this.$axios.$get('/api/district-rankings/10', {
                params: {
                    date
                }
            });
            console.log(response,32323)
            this.actionRankings = response.data.sort((a,b) => {
                return b.total_count - a.total_count;
            }).map((item, index) => {
                item['rank'] = index + 1;
                return item;
            })
            if(this.$auth.user) this.actionMyRanking = response.my_district;
        },


        ...mapActions(['FETCH_HOME_BANNER1','FETCH_HOME_BANNER2','FETCH_HOME_BANNER3']),
        async countClick(click_type, click_id) {
        // console.log(click_type, click_id, 333)
        const res = await this.$axios.post('/api/click-count', { click_type, click_id });
        },
        handleBackdropClick(e, className) {
        // console.log(e.srcElement._prevClass,33223)
        if (e.srcElement._prevClass === className) {
            this.activeSidebar = false;
            this.active = false;
            this.$emit('cancel');
        }
        },
        async init() {
            let homeBanners;
            if(!this.$store.state.homebanner1.length > 0) {
                homeBanners = await this.$axios.get('/api/banners/home');

            }
            const promotionList = await this.$axios.get('/api/promotion');
            const meetingList = await this.$axios.get('/api/meeting');
            this.promotionList= [
                ...promotionList.data.promotion.map((item) => {
                    return {
                        ...item,
                        video_thumbnail: item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg')
                    }
                })
            ];
            this.storyList= [
                ...promotionList.data.story.map((item) => {
                    return {
                        ...item,
                        video_thumbnail: item.video_thumbnail.replace(/0\.jpg/g, 'mqdefault.jpg')
                    }
                })
            ];
            if(homeBanners?.data) {
                this.homeBanners= {
                    ...homeBanners.data,
                    
                };
                this.FETCH_HOME_BANNER1(this.homeBanners.banners.filter(banner => {
                    return banner.position === 'top';
                }));
                this.FETCH_HOME_BANNER2(this.homeBanners.banners.filter(banner => {
                    return banner.position === 'middle';
                }));
                this.FETCH_HOME_BANNER3(this.homeBanners.banners.filter(banner => {
                    return banner.position === 'bottom';
                }));
            }

            this.meetingList= [
                ...meetingList.data.data,
            ];
        },
        getActiveIndex(swiper) {
            return swiper.activeIndex;
        },
        runOnChange() {
            // console.log(this.$refs.promotionSwiper.swiper.realIndex,44444)
            this.activePromotionId = this.promotionList[this.$refs.promotionSwiper.swiper.realIndex].id;
        },

        computedPartyClass(partyName) {
            partyName == '국민의힘' ? 'red' : 'blue';
        },
        async getCongressmanInfo(){
            try {
                const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/contacts`)
                if(response) {
                    this.temp = response.data.data;
                    this.review_check = this.temp.review_check;
                    await this.nprlapfmaufmqytet(this.temp.korean_name, this.district?.city); //의원 약력 등 정보
                }
                    
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * 의원 약력 등 추가 정보
         */
         async nprlapfmaufmqytet(name, city = undefined) {
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
                    let info;
                    let infoArr = data.nprlapfmaufmqytet[1].row;
                    if(infoArr.length > 1) {
                        info = infoArr.filter(item => {
                            return item.DAE.includes(city);
                        })
                        this.congressmanItem = {
                            ...this.temp,
                            ...info[0],
                        }
                    }else {
                        this.congressmanItem = {
                            ...this.temp,
                            ...data.nprlapfmaufmqytet[1].row[0],
                        }                       
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
            if(rankingCount >= 1000 && rankingCount < 2000) return 'main_icon_badge_1k.png';
            if(rankingCount >= 2000 && rankingCount < 3000) return 'main_icon_badge_2k.png';
            if(rankingCount >= 3000 ) return 'main_icon_badge_3k.png';
            if(rankingCount < 1000) return false;
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
        // getBarColor(activityIndex, index = -1) {
        //     if(index == 0) return 'linear-gradient(0.25turn, #7b5d1e, #f9de8c, #7b5d1e);'
        //     if(activityIndex >= 90) return '#ff6600';
        //     if(activityIndex >= 80) return '#ffb017';
        //     if(activityIndex <= 79) return '#ffe607';
        // },
        getBarColor(item) {
            const total = this.getPopularTotalCount(item) + this.tokenCount;
            if(total >= 100000) return 'linear-gradient(0.25turn, #7b5d1e, #f9de8c, #7b5d1e);'
            if(total >= 70000) return '#ff0000';
            if(total >= 50000) return '#f88601';
            if(total >= 30000) return '#ffd800';
            return '#0baf00';
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
            const response = await this.$axios.get(`/api/popular-list?limitNumber=${count}&date=${this.form.popularRankUrl}`);
            let data = response.data.map((item) => {
                item.totalCount = this.getPopularTotalCount(item);
                return item;
            })
            data = data.sort((a,b) => {
                return b.totalCount - a.totalCount;
            })
            this.popularRankings = [...data];
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
        switchPopularRankGuide(value) {
            let guideText = '';
            switch(value) {

                case 'week':
                guideText = '전주 토요일 00:00 ~ 일요일 23:59';
                    break;
                case 'month':
                guideText = '매월 1회 (전달 1일부터 말일)';
                    break;
                case 'year':
                    guideText = '총 누적';
                    break;
            }
            this.guideTextPopular = guideText;
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
        toggleActionList(value) {
            this.getActionRankings(value);
        },
        togglePopularList(value) {
            if(value !== 'statistics') {
                this.form.popularRankUrl = value;
                this.switchPopularRankGuide(value);
                this.getPopularRakings(10);
            }else if(value === 'statistics') {
                this.$router.push('/popular/statistics')
            }

        },

        congressmanItem: {
            deep: true,
            handler: function (value) {
                let str = value.DAE.split(" ");
                let partyName = str[str.length-1].trim();
                if(partyName.includes('미래통합당')) {
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
        //action ranking test data
        await this.getActionRankings('year');

        this.$nextTick(function() {
            this.loading = false;
        })
        await this.init();
        this.switchRankGuide('total-rankings');
        this.switchPopularRankGuide('year');
        if(!Cookies.get('allPopClosedToday')) {
            await this.getNoticeContents();
        }

        this.getRankings(10);
        this.getPopularRakings(10);

        if(this.district.id != 0) {
            this.$axios.get("/api/districts/" + this.district.id + "/register_rates")
            .then(response => {
                this.registerRates = response.data.registerRates;
            });
            await this.$store.dispatch('FETCH_CONTACT_REVIEW', this.district.id);
            await this.getCongressmanInfo();

        }


    },

}
</script>
<style scoped>
    .section-story {
        background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
        margin-bottom: 40px;
    }
    .section-story .wrap {
        background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
    }
    .recommend {
        position:absolute;
        display: flex;
        top: 7px;
        left: 5%;
        min-width:60px;
        min-height:32px;
        border-radius: 10px;
        background: #f50000;
        align-items: center; justify-content: center;

    }
    .recommend span {
        color: white;
    }
    .area-index .section-popular .m-table li:first-child .rank{

                box-shadow: 5px 3px 33px 2px rgba(199, 181, 17, 0.49);
-webkit-box-shadow: 5px 3px 33px 2px rgba(199, 181, 17, 0.49);
-moz-box-shadow: 5px 3px 33px 2px rgba(199, 181, 17, 0.49);
}
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
        background-color: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        height: 270px;
        overflow:hidden;
    }

    .swiper-slide .story-container .ribbon {
        position: absolute;
        flex-direction: column;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 10px;
        top: -5px;
        right: 3%;
        min-width: 12%;
        min-height: 80px;
        background:url('@/assets/images/ribbon.png') no-repeat center center;
        background-size:cover;
    }

    .swiper-slide .story-container .ribbon .year {
        font-size: 10px;
    }
    .swiper-slide .story-container .ribbon .month {
        font-size: 14px;
        font-weight: 500;
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
        bottom: 13%;
        left: 5%;

        display:flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .accordion-enter-active,
    .accordion-leave-active {
        will-change: height, opacity;
        transition: height 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
    }

    .accordion-enter,
    .accordion-leave-to {
        height: 0 !important;
        opacity: 0;
    }


</style>
