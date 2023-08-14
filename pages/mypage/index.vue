<template>
    <div class="area-mypage">
        <!-- 프로필 수정 팝업 -->
        <profile-pop v-if="isProfilePopActive" @close="closeModal" />

        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <button class="btn-util">
                        <img src="@/assets/images/back.png" alt="" style="width:10px;" @click="$router.back()">
                    </button>
                </div>

                <div class="center">
                    <h3 class="title">내 정보</h3>
                </div>

                <nuxt-link to="/contents/settings" class="btn-util">
                    <img src="@/assets/images/setting.png" alt="" style="width:20px;">
                </nuxt-link>
            </div>
        </div>

        <!-- 내용 영역 -->
        <div class="container">
            <div class="box-info">
                <div class="back">
                    <div class="m-thumbnail type03" :style="`background-image:url('${profileUrl}')`" v-if="this.$auth.user.img"></div>
                    <div class="mt-16 btn-wrap">
                        <div class="inner">
                            <p class="btn-title">{{`${staffCertificated ? staffCertificated : '회원'}`}}</p>

                        </div>
                    </div>
                    <div class="mt-8"></div>
                    <div class="nick-wrap">
                        <span class="nick" @click="isProfilePopActive = true">{{ replaceText(this.$auth.user.nickname,8,"...") }}</span>
                        <button @click="isProfilePopActive = true">
                            <img src="@/assets/images/edit.png" alt="" class="edit">
                        </button>
                    </div>
                    <div class="mt-16 btn-wrap">
                        <div class="edit-button">
                            <nuxt-link to="/auth/edit" class="edit-btn-title">내 정보 수정</nuxt-link>
                        </div>

                    </div>
                </div>
            </div>
            <div class="wrap">
                <!-- <div class="box-info">
                    <div class="info">
                        <div class="m-thumbnail type02" :style="`background-image:url('${this.$auth.user.img.url}')`" v-if="this.$auth.user.img"></div>
                        <h3 class="title">{{ this.$auth.user.nickname }}</h3>
                    </div>

                    <div class="mt-12"></div>

                    <div class="m-btns type01">
                        <div class="m-btn-wrap">
                            <a href="#" class="m-btn type03 bg-lightGray black" style="background-color:#EEE !important;" @click.prevent="isProfilePopActive = true">프로필 수정</a>
                        </div>
                        <div class="m-btn-wrap">
                            <nuxt-link to="/auth/edit" class="m-btn type03 bg-lightGray black" style="background-color:#DDDDDD !important;">내 정보 수정</nuxt-link>
                        </div>
                    </div>
                </div> -->

                <div class="mt-20"></div>

                <div class="m-temp type01">
                    <h3 class="title">마을 사랑 온도</h3>

                    <div :class="`gage-wrap ${activityClass}`">
                        <div class="gage">
                            <div class="active" :style="`width:${this.$auth.user.activity_index >= 100 ? 100 : this.$auth.user.activity_index}%;`"></div>

                            <div class="comment">
                                자유마을 가입 시점 35
                                <img src="@/assets/images/polygon.png" alt="" class="deco">
                            </div>

                            <span class="count">
                                {{ `${this.$auth.user.activity_index >= 100 ? 100 : this.$auth.user.activity_index}` }}
                            </span>
                        </div>
                    </div>

                    <p class="body">
                        ‘애국심’은 자유마을 홈페이지에서 글 작성, 댓글 작성, 받은 좋아요, 받은 싫어요,
                        공유활동과 자유마을 회원가입 수 및 집회 참여를 종합해서 만든 지표입니다.
                    </p>
                </div>
            </div>

            <div class="menus-wrap">
                <div class="mt-12"></div>
                <div class="menus">
                    <div class="wrap">
                        <nuxt-link to="/popular/rank" class="menu">
                            <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                            <p class="text">개인랭킹</p>
                        </nuxt-link>
                        <nuxt-link to="/mypage/qr" class="menu">
                            <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                            <p class="text">내 큐알코드 확인</p>
                        </nuxt-link>
                        <nuxt-link to="/mypage/attendance" class="menu">
                            <img src="@/assets/images/heart-active.png" alt="" class="icon" style="width:14px;">
                            <p class="text">출석체크</p>
                        </nuxt-link>
                        <nuxt-link to="/share" class="menu">
                            <img src="@/assets/images/heart-active.png" alt="" class="icon" style="width:14px;">
                            <p class="text">공유랭킹</p>
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <!-- 253 위원장(지부장)메뉴 -->
            <div class="menus-wrap" v-if="staffCertificated == '총괄팀장'">
                <h3 class="title">충괄지역팀장 활동</h3>
                <div class="mt-12"></div>
                <div class="menus">
                    <div class="wrap">
                        <div class="menu" @click="activeModal=true">
                            <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                            <p class="text">관리지역 선택</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 253 위원장(지부장)메뉴 -->
            <div class="menus-wrap" v-if="staffCertificated == '실행위원장'">
                <h3 class="title">위원장 활동</h3>
                <div class="mt-12"></div>
                <div class="menus">
                    <div class="wrap">
                        <nuxt-link to="/infos/commissioner_namelist" class="menu">
                            <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                            <p class="text">지부 회원명단</p>
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <!-- <div v-if="$auth.hasScope('manager')"> -->
            <!-- 마을대표 메뉴 -->
            <div v-if="staffCertificated == '대표'">
                <div class="menus-wrap">
                    <h3 class="title">나의 조직활동</h3>
                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/infos/namelist" class="menu">
                                <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 회원</p>
                            </nuxt-link>
                            <nuxt-link :to="{path:'/staffs/manage', query:{rep_district_id:represenateDistrict['id'], rep_district_name:represenateDistrict['name']}}" class="menu">
                                <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 임원</p>
                            </nuxt-link> 
                           <!-- <nuxt-link to="/infos/approvals" class="menu">
                                <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                                <p class="text">임원신청현황(삭제)</p>
                            </nuxt-link>  -->
                        </div>
                    </div>
                </div>
                <div class="menus-wrap" >
                    <h3 class="title">나의 마을설정</h3>

                    <div class="menus">
                        <div class="wrap">
                            <!-- <nuxt-link to="/infos/create" class="menu">
                                <img src="@/assets/images/building.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 소개</p>
                            </nuxt-link> -->
                            <!-- <nuxt-link :to="{path:'/staffs/create', query:{group:group,rep_district_id:represenateDistrict['id']}}" class="menu">
                                <img src="@/assets/images/users.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 임원진(삭제)</p>
                            </nuxt-link> -->
                            <!-- <nuxt-link to="/contacts/create" class="menu">
                                <img src="@/assets/images/chart.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내마을 국회의원</p>
                            </nuxt-link> -->
                            <nuxt-link to="/notices/create" class="menu">
                                <img src="@/assets/images/board.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 마을 공지</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을활동</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/likePosts" class="menu">
                                <img src="@/assets/images/heart-active.png" alt="" class="icon" style="width:14px;">
                                <p class="text">좋아요 게시물</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/sharePosts" class="menu">
                                <img src="@/assets/images/shareLink.png" alt="" class="icon" style="width:14px;">
                                <p class="text">공유한 게시물</p>
                            </nuxt-link>
                            <nuxt-link to="/scraps" class="menu">
                                <img src="@/assets/images/wallet.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 공유함</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을소식</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/posts" class="menu">
                                <img src="@/assets/images/edit_document.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 게시글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/comments" class="menu">
                                <img src="@/assets/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 댓글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/participants" class="menu">
                                <img src="@/assets/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 행사 관리</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="menus-wrap">
                    <h3 class="title">나의 마을활동</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/likePosts" class="menu">
                                <img src="@/assets/images/heart-active.png" alt="" class="icon" style="width:14px;">
                                <p class="text">좋아요 게시물</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/sharePosts" class="menu">
                                <img src="@/assets/images/shareLink.png" alt="" class="icon" style="width:14px;">
                                <p class="text">공유한 게시물</p>
                            </nuxt-link>
                            <nuxt-link to="/scraps" class="menu">
                                <img src="@/assets/images/wallet.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 공유함</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="menus-wrap">
                    <h3 class="title">나의 마을소식</h3>

                    <div class="menus">
                        <div class="wrap">
                            <nuxt-link to="/mypage/posts" class="menu">
                                <img src="@/assets/images/edit_document.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 게시글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/comments" href="#" class="menu">
                                <img src="@/assets/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내가 쓴 댓글</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/participants" class="menu">
                                <img src="@/assets/images/comment-black.png" alt="" class="icon" style="width:14px;">
                                <p class="text">내 행사 관리</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <quicks 
                :createUrl="'/qnas'"
                :btnName="'고객센터'"
            />
            <modal
                v-if="activeModal"
                @cancel="activeModal = false"
            >
                <template #inner>
                    <div class="m-pop-title">
                        <p class="subtitle">검색하신 마을에 방문합니다.</p>
                        <span class="point">관리지역 선택</span>
                    </div>
                    <Dropdown
                        :menuTitle="'선거구 선택'"
                        :activate="activeElection"
                        :items="computedElections"
                        :selected="electionSelected"
                        @toggle="toggleElection"
                        @change="changeElection"
                        v-model="selectedItem.election"
                    />
                    <Dropdown
                        :menuTitle="'읍/면/동 선택'"
                        :activate="activeDistrict"
                        :items="computedDistricts"
                        :selected="districtSelected"
                        @toggle="toggleDistrict"
                        @change="changeDistrict"
                        v-model="selectedItem.District"
                    />


                    <div class="mt-20"></div>

                    <button type="button" class="m-btn type03 width-100" @click="toDistrict">검색하기</button>
                </template>
            </modal>
        </div>

        <!-- 하단 네비게이션바 -->
        <navigation />
    </div>
</template>

<script>
import Form from "@/utils/Form";
import ProfilePop from '../../components/profilePop.vue'
import common from '@/utils/common'
export default {
    mixins: [common],
    components: {
        ProfilePop,
    },
    auth: true,
    data() {
        return {
            isProfilePopActive: false,
            changedUrl: "",
            staffCertificated: false,
            represenateDistrict: null,
            group: null,

            activeModal: false,

            //dropdown
            activeElection: false,
            activeDistrict: false,
            electionSelected: false,
            districtSelected: false,
            selectedItem: {
                election: null,
                district: null,
            },
            elections: [],
            districts: [],
        }
    },
    methods: {
        store() {

        },
        closeModal(profileUrl) {
            this.isProfilePopActive = false;
            this.changedUrl = profileUrl;
        },
        async checkManagerAuth(item) {
            const response = await this.$axios.get(`/api/districts/1/members/check-manager`, {
                params: {
                    phone: item.phone,
                }
            });
            // if(response.data === false) {
            //     this.staffCertificated = false;
            // }else if(response.data.position === '대표') {
            //     this.staffCertificated = '대표';
            //     this.represenateDistrict = {
            //         id:response.data.district_id,
            //         name:response.data.district,
            //     };
            //     this.group = response.data.group;
            // }else if(response.data.position === '위원장') {
            //     this.staffCertificated = '위원장';
            // }else if(response.data.position === '총괄지역팀장') {
            //     this.staffCertificated = '총괄지역팀장';
            //     this.high_id = response.data.id;
            //     await this.getElections();
            // }
            const position = response.data.position;
            if(response.data === false) {
                this.staffCertificated = false;
            }else if(position[0] === 'A0001') {
                this.staffCertificated = position[1];
                this.represenateDistrict = {
                    id:response.data.district_id,
                    name:response.data.district,
                };
                this.group = response.data.group;
            }else if(position[0] == 'C0001') {
                this.staffCertificated = position[1];
            }else if(position[0] == 'C0002') {
                this.staffCertificated = position[1];
                this.high_id = response.data.id;
                await this.getElections();
            }
        },
        
        async getElections() {
            const response = await this.$axios.get(`/api/category/high-show/${this.high_id}`);
            this.elections = response.data;
        },
        async getDistricts(election) {
            const response = await this.$axios.get(`/api/category/high-district`, {params: { election:election }});
            this.districts = response.data;
        },
        toggleElection() {
            this.activeElection = !this.activeElection;
        },
        toggleDistrict() {
            this.activeDistrict = !this.activeDistrict;
        },
        async changeElection(item) {
            const target = this.elections.find(e => e.election === item);
            this.selectedItem.election = item;
            this.electionSelected = true;
            await this.getDistricts(target.election);
        },
        changeDistrict(item) {
            const target = this.districts.find(e => e.district === item);
            this.selectedItem.district = target;
            this.districtSelected = true;
        },
        toDistrict() {
            if(this.selectedItem.election && this.selectedItem.district) {
                this.activeModal = false;
                this.$store.commit("changeDistrict", this.selectedItem.district);
                this.$router.push("/");
            }else {
                alert("선거구와 읍/면/동을 선택해주세요.")
            }
        }
    },

    computed: {
        computedElections() {
            return this.elections.map(item => {
                return item.election
            })
        },
        computedDistricts() {
            return this.districts.map(item => {
                return item.district
            })
        },

        profileUrl() {
            return this.changedUrl ? this.changedUrl :this.$auth.user.img.url;
        },
        activityClass(){            
            
            let activityIndex = this.$auth.user.activity_index;

            if(activityIndex <= 10)
                return "level1";

            if(activityIndex <= 20)
                return "level2";

            if(activityIndex <= 30)
                return "level3";

            if(activityIndex <= 40)
                return "level4";

            if(activityIndex <= 50)
                return "level5";

            if(activityIndex <= 60)
                return "level6";

            if(activityIndex <= 70)
                return "level7";

            if(activityIndex <= 80)
                return "level8";

            if(activityIndex <= 90)
                return "level9";

            return "level10";
        }
    },

    mounted() {
        this.checkManagerAuth({
            phone: this.$auth.user.phone,
        })
    },

}
</script>

<style scoped>
.m-thumbnail.type03 {
    content:"";
    width:75px; height:75px;
    position:relative;
    background-size:cover; background-position:center; border-radius:100%;
    overflow:hidden;

}
.area-mypage .box-info .back {
    padding: 20px 20px 30px 20px;
    background:url("@/assets/images/profile-back.jpg") no-repeat; background-size:cover;
    display:flex; align-items: center; justify-content: center;
    flex-direction: column;
}
.btn-wrap {
  /* div center */
  position: relative;
  display: inline-block;
}
.btn-wrap .inner {
  min-width: 10%;
  padding-left: 15px;
  padding-right: 15px;
  height: 24px;
  background: #ffde00;
  border-radius: 20px;
}
.btn-wrap .edit-button {
  min-width: 20%;
  padding-left: 20px;
  padding-right: 20px;
  height: 45px;
  background: #88a0a3;
  border-radius: 5px;
}
.btn-wrap .btn-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: #000;
}
.btn-wrap .edit-btn-title {
  padding-top: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}
.nick-wrap .nick {
    font-size: 25px;
    font-weight: 500;
    color: #000;
}
.nick-wrap .edit {
    width: 20px;
    height: 20px;
}
</style>
