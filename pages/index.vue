<template>
    <div class="area-index">
        <header-type01
            @updatePosts="updatePosts"
        />

        <!-- 내용 영역 -->
        <div class="container">
            <!-- 지역이 본부 x & 로그인 -->
            <div class="fragment" v-if="district && district.id != 0">
                <section class="section-ad">
                    <div class="wrap">
                        <nuxt-link to="/mypage/attendance" class="link">
                            <img src="/images/attendance-banner.png" alt="">
                        </nuxt-link>
                    </div>
                </section>
                <div class="mt-8"></div>
                <section class="section-banner">
                    <div class="wrap">
                        <div class="content">
                            <h3 class="title">
                                <span class="point">{{ district.district }}의 희망!</span>
                                <br/>대한민국을 사랑하는
                                <br/>당신이 자유마을의 얼굴입니다!
                            </h3>
                            <div class="m-btns type01">
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/infos" class="m-btn type01">{{ district.district }}소개</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/staffs" class="m-btn type01">임원진</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contacts" class="m-btn type01">내마을 국회의원</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="mt-40"></div>
                <section class="section-values">
                    <img src="https://dotmzh1fysixs.cloudfront.net/1018/base-town.png" alt="" class="base">
                    <div class="wrap">
                        <div class="content">
                            <div class="m-title type01">
                                <p class="sub">자유마을 가입현황</p>
                                {{ district.district }}
                            </div>

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
                </section>
            </div>

            <!-- 지역이 본부 | 비로그인 -->
            <div class="fragment" v-else>
                <section class="section-ad">
                    <div class="wrap">
                        <nuxt-link to="/mypage/attendance" class="link">
                            <img src="/images/attendance-banner.png" alt="">
                        </nuxt-link>
                    </div>
                </section>
                <section class="section-banner">
                    <div class="wrap">
                        <div class="content">
                            <h3 class="title">
                                <span class="point">대한민국의 희망!</span>
                                <br/>자유마을에 오신 여러분을
                                <br/>진심으로 환영합니다!
                            </h3>

                            <div class="m-btns type01">
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/about" href="#" class="m-btn type01">자유마을이란</nuxt-link>
                                </div>
                                <div class="m-btn-wrap">
                                    <nuxt-link to="/contents/declares" class="m-btn type01">10대 강령</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section class="section-town">
                <div class="wrap">
                    <div class="content">
                        <div class="m-title type01">
                            <p class="sub">소속 된 마을을 찾을 수 있어요.</p>
                            나의 <span class="point">마을 찾기</span>
                        </div>

                        <input-region
                            input-class="m-input-select type01"
                            :districtContainer="container"
                            :initiationCalled="activeFinder"
                            @change="changeDistrict"
                        />
                        <button class="m-btn type02 width-100" v-touch:tap="search">검색하기</button>
                        <div style="margin-top: 30px;">
                            <span style="color: red">*</span>행정동을 모르실 경우 찾기 버튼을 누르세요.  <button style="color: #0f38bd;" @click.stop="active">찾기</button>
                        </div>
                    </div>
                </div>

                <Finder
                    v-if="activeFinder"
                    :title="'주소로 행정동 찾기'"
                    :excecute="'변환하기'"
                    :cancel="'검색하기'"
                    @cancel="closeModal"
                    @setContainer="setContainer"
                />


            </section>

            <section class="section-ranking">
                <div class="wrap">
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
                            <div class="m-input-checkbox">
                                <input type="radio" id="2" value="daily-rankings" v-model="toggleList">
                                <label for="2">일간</label>
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
                        <div class="rankings">
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
                        </div>

                        <div class="wrapper">
                            <ul class="m-table type01 rank-container">
                                <li v-for="(districtRegisterCount, index) in districtRegisterCounts" :key="index" 
                                    @click="changeDistrictInRanking({
                                        id: districtRegisterCount.district_id,
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
                                            <div class="light">
                                                <div class="bg-grey-30 more"
                                                    v-if="rankingCount(districtRegisterCount) == 0"
                                                >
                                                    <span class="tri">−</span>
                                                </div>
                                                <div class="bg-red-30 more up" v-else>
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
                    <a href="https://ghmon.com" target="_blank" class="link">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1009/banner4.jpg" alt="">
                    </a>
                </div>
            </section>

            <section class="section-notice">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">소식</h3>

                        <nuxt-link to="/posts?board=notices" class="btn-more">
                            <img src="https://dotmzh1fysixs.cloudfront.net/1013/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="notices.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type01">
                        <nuxt-link :to="`/posts/${notice.id}`" class="m-item" v-for="notice in notices.data" :key="notice.id">
                            <div class="m-ratioBox-wrap" v-if="notice.img">
                                <div class="m-ratioBox" :style="`background-image:url('${notice.img.preview_url}');`"></div>
                            </div>
                            <div class="m-ratioBox-wrap" v-else>
                                <div class="m-ratioBox" :style="{backgroundImage: `url('/images/posts/${Math.floor(Math.random() * 8) + 1}.jpg'`}"></div>
                            </div>


                            <div class="content">
                                <p class="subtitle" v-if="notice.district">{{ notice.district.city }} {{notice.district.district}}</p>
                                <p class="subtitle" v-else>전체</p>
                                <h3 class="title">{{notice.title}}</h3>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </section>
            <section class="section-video">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">영상</h3>

                        <nuxt-link to="/posts?board=clips" class="btn-more">
                            <img src="/images/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="clips.data.length === 0">
                        데이터가 없습니다.
                    </div>
                    <div class="m-items type02">
                        <div class="m-item-wrap" v-for="clip in clips.data" :key="clip.id">
                            <nuxt-link :to="`/posts/${clip.id}`" class="m-item" >
                                <div class="m-ratioBox-wrap" v-if="clip.img">
                                    <div class="m-ratioBox">
                                        <img :src="clip.img.preview_url" alt="">
                                    </div>
                                </div>

                                <div class="content">
                                    <h3 class="title">
                                        {{ clip.title }}
                                    </h3>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-photo">
                <div class="wrap">
                    <div class="m-title type02">
                        <h3 class="title">포토</h3>

                        <nuxt-link to="/posts?board=photos" class="btn-more">
                            <img src="/images/arrowRight-gray.png" style="width:9px;" alt="">
                        </nuxt-link>
                    </div>

                    <div class="m-empty type01" v-if="photos.data.length === 0">
                        데이터가 없습니다.
                    </div>

                    <div class="m-items type02">
                        <div class="m-item-wrap" v-for="photo in photos.data" :key="photo.id">
                            <nuxt-link :to="`/posts/${photo.id}`" class="m-item">
                                <div class="m-ratioBox-wrap" v-if="photo.img">
                                    <div class="m-ratioBox" :style="`background-image:url('${photo.img.preview_url}');`"></div>
                                </div>

                                <div class="content">
                                    <h3 class="title">
                                        {{ photo.title }}
                                    </h3>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-ad2">
                <a href="https://m.khmon.com/sign/6936" target="_blank" class="link">
                    <img src="https://jayuvillage-bucket.s3.ap-northeast-2.amazonaws.com/1288/banner-3.jpg" alt="">
                </a>
            </section>

            <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />
        </div>

        <navigation />
        <!-- TODO 230419 슬라이더 비활성화헸음 살릴지 말지 결정안됨 -->
        <!-- <modal
            v-if="activateNoticePop"
            :noPaddingModal="true"
            :paddingModal="false"
            :cancelBtn="false"
        >
            <template #outter>
                <vueper-slides autoplay fixed-height="300px">
                    <vueper-slide
                        v-for="(content, i) in noticePopupContents"
                        :key="i"
                        :image="content.image.url"
                    >
                    </vueper-slide>
                </vueper-slides>
                <div class="btn-container">
                    <button class="btn" @click="closeNoticePopup">하루 동안 그만보기</button>
                    <button class="btn" @click="justClosePopup(1)">닫기</button>
                </div>
            </template>
        </modal> -->
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
                            <img :src="content.image.url" alt="" class="modal-content">
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
export default {
    name: 'IndexPage',
    auth: false,
    components: {
        VueperSlides,VueperSlide
    },
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
        }
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
        }
    },

    methods: { 
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
            }else {
                this.nextNotice(index);
            }
        },
        justClose(content, index) {
            const lastIndex = this.noticePopupContents.length - 1;
            if(lastIndex === index) {
                this.activateNoticePop = false;
            }else {
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

        active() {
            this.activeFinder = true;
        },
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
            this.updatePosts(this.district.id);

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

    },

    async mounted() {
        this.switchRankGuide('total-rankings');
        await this.updatePosts(this.district.id);
        if(!Cookies.get('allPopClosedToday')) {
            await this.getNoticeContents();
        }

        this.getRankings(10);

        if(this.district.id != 0)
            this.$axios.get("/api/districts/" + this.district.id + "/register_rates")
                .then(response => {
                    this.registerRates = response.data.registerRates;
                });

    },

}
</script>
<style scoped>
    .fragment .subtitle {
        font-size: 1.2em !important;
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
    .rank .bg-red-30 {
        width:80px;
        height:34px;
        background-color: #fff2f2;
        border-radius: 5px;
        /* padding: 5px 11px 5px 11px; */
        font-size: 14px;
    }
    .rank .bg-grey-30 {
        width:80px;
        height:34px;
        background-color: #eeeeee;
        border-radius: 5px;
        padding: 5px 11px 5px 11px;
        font-size: 14px;
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
</style>
