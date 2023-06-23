<template>
    <div class="area-region-activity">
        <!-- 헤더영역 -->
        <header-type01 />

        <!-- 내용 영역 -->
        <div class="container">
            <div class="m-visual type01">
                <p class="subtitle">마을 소개</p>
                <h3 class="title">{{this.$store.state.district.district}} 섬기는 사람들</h3>
            </div>

            <div class="m-tabs type01">
                <div class="m-tab-wrap">
                    <nuxt-link to="/infos" class="m-tab">
                        <span class="text">{{this.$store.state.district.district}} 소개</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/staffs" class="m-tab active">
                        <span class="text">섬기는 사람들</span>
                    </nuxt-link>
                </div>
                <div class="m-tab-wrap">
                    <nuxt-link to="/contacts" class="m-tab">
                        <span class="text">내마을 국회의원</span>
                    </nuxt-link>
                </div>
            </div>

            <div class="mt-32"></div>

            <section class="area-staff">
                <div class="m-empty type01" v-if="positions.length === 0">준비중입니다.</div>

                <div class="wrap">
                    <div class="m-tabs type01" v-if="computedCountySections.length > 1">
                        <div class="m-tab-wrap" v-for="(item) in computedCountySections">
                            <div class="m-tab" :class="`${activeCounty === item ? 'active' : ''}`" @click="getCounty(item)">
                                <span class="text">{{ $store.state.district.district }}&nbsp;{{ item }}</span>
                            </div>
                        </div>
                    </div>
                    <ul class="items custom-ul">
                        <li v-for="item in county" :key="item.id">
                            <div class="wrapper">
                                <div class="w-100 bg-orange" v-if="item.available">
                                    <span style="color:white">담당자 모집중</span>
                                </div>
                                <div class="mt-20" v-else></div>
                                <div class="mt-8"></div>
                                <div class="item-container">
                                    <div class="left">
                                        <div class="image-container">
                                            <img src="/images/taegeuk.png" alt="">
                                        </div>
                                        <div class="text-container" >
                                            <p class="title">{{item.name == '' ? '담당자 미정' : nameReplace(item.name)}}</p>
                                            <p class="content">{{item.position}}</p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="item.available">
                                        <div class="m-board-btns">
                                            <div class="m-btns type01" >
                                                <div class="m-btn-wrap ">
                                                    <button type="button" :class="getRegisterClass()" @click.prevent="debounceRegister(item)">
                                                        {{registerStatus? '신청 ⊕' : $auth.user?.district.id == $store.state.district.id? '신청후 대기중' : '신청 불가능'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            

                        </li>
                    </ul>
                </div>
                <img src="/images/about-bg.png" alt="" class="deco-about">
            </section>

                        <quicks 
                :createUrl="'/posts/create'"
                :btnName="'글쓰기'"
            />
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>

</template>

<script>
import InputCamera from '../../components/form/posts/inputCamera';
import InputLink from "../../components/form/posts/inputLink";
import InputImg from "../../components/form/posts/inputImg";
import InputThumbnail from "../../components/form/posts/inputThumbnail";
import InputAddress from "../../components/form/inputAddress";
import Form from "@/utils/Form";
import {debounce} from "@/utils/debounce";
export default {
    components: {InputAddress, InputThumbnail, InputImg, InputLink, InputCamera},
    auth: false,
    data() {
        return {
            rawValues: [],
            positions: [],
            countyLists: [],
            county: [],
            registerStatus: undefined,
            activeCounty: undefined,
            errors: {},

        }
    },

    computed: {
        computedCountySections() {
            const set = [...new Set(this.rawValues.map(item => item.group))];
            // set.splice(set.indexOf(null), 1);
            return set;
        },
    },

    watch: {
        '$store.state.district.id'() {
            this.setCountyLists()
        }
    },
    methods: {
        phoneReplace(phone) {
            if(phone) {
                let num =  phone.replaceAll("[\\s\\-()]", "");
                return num.slice(0,7).padEnd(11,"*");
             }else {
                return;
             }

        },
        nameReplace(name) {
            return name.slice(0,-1) + '*';
        },
        async setCountyLists() {
            this.rawValues = [];
            this.countyLists = [];
            const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/staff`);
            this.rawValues = response.data.data;
            this.computedCountySections.forEach(group => {
                const county = this.rawValues.filter(rawValue => rawValue.group === group);
                this.countyLists.push(
                    this.positions.map(position => {
                        const positionData = county.find(value => value.position === position.position);
                        return {
                            ...position,
                            group: group, //computedCountySections 의 각 원소는 그룹명(1,2,3, ...)이다.
                            district_id: this.$store.state.district.id,
                            id: positionData ? positionData.id : null,
                            available: positionData ? false : true,
                            name: positionData ? positionData.name : "",
                            phone: positionData ? positionData.phone : "",
                            created_at: positionData ? positionData.created_at : "",
                            updated_at: positionData ? positionData.updated_at : "",
                        }
                    })
                )
            })
            this.county = [...this.countyLists[0]];
            this.activeCounty = 1;
            this.registerStatus = response.data.register;
        },
        async getPositions() {
            const response = await this.$axios.get(`/api/districts/${this.$store.state.district.id}/position`);
            this.positions = [
                ...response.data.map(item => {
                    return {
                        ...item,
                        available: true,
                        img: "",
                        name: "",
                        phone: "",
                    }
                })
            ];
            await this.setCountyLists();
        },
        getCounty(item) {
            this.activeCounty = item;
            this.county = [
                ...this.countyLists[item-1]
            ]
        },
        getRegisterClass() {
            const colorClass = this.registerStatus ? 'm-btn type01 height-full bg-revert-primary' : 'm-btn type01 height-full bg-grey'
            return colorClass;
        },
        async register(item) {
            if(this.$auth.user?.district.id !== this.$store.state.district.id) return alert('회원가입하신 지역만 신청 가능합니다.');
            if(!this.registerStatus) return alert('1개의 직분만 신청 가능합니다.');
            const response = await this.$axios.post(`/api/staff/${this.$store.state.district.id}/register`, {
                after: item.position,
                group: item.group,
            });
            if(response) {
                alert('신청이 완료되었습니다.');
                this.registerStatus = false;
            }
        }
    },

    mounted() {
        this.getPositions();
    },
    created() {
        this.debounceRegister = debounce((item) => {
            this.register(item)
        },500);
    }
}
</script>

<style scoped>
    .custom-ul {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        
    }
    .custom-ul li {
        /* list-style: none; */
        display: flex;
        flex-direction: column;
        width: 100%;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        margin-bottom: 5px;
        background: #fafafa;
    }

    .custom-ul li .wrapper {
        height: 85px;
    }

    .custom-ul .item-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .item-container .left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content:center;
        width: 300px;
    }
    
    .item-container .right {
        display: flex;
        flex-direction: column;
    }

    .text-container {
        margin-left : 10px;
    }
    .text-container p {
        line-height: 1.5;
    }
    .text-container .title {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
    }
    .text-container .content {
        font-size: 16px;
        font-weight: 500;
        color: #0BAF00;
        margin: 0;
    }
    .height-full {
        height:100%;
    }
    .m-btns .type01 {
        padding: 10px 10px;
        font-weight: normal;
        font-size: 18px;
    }

    .w-100 {
        width: 115px;
        padding: 0 10px;
    }
    .bg-orange {
        background-color: rgb(254, 124, 30);
        border-radius: 5px;
        padding: 5px 11px 5px 11px;
        font-size: 14px;
    }

</style>
