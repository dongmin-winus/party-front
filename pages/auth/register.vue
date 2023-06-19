<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type02">
            <div class="wrap">
                <div class="left">
                    <img src="/images/arrowLeft-black.png" alt="" style="width:14px;" @click="$router.go(-1)">
                </div>
                <div class="center">
                    <h3 class="title">회원가입</h3>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="area-register-checkPolicy" v-if="step === 1">
            <!-- 내용 영역 -->
            <div class="container">
                <div class="wrap">
                    <div class="mt-40"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" checked v-if="isAgreeAll">
                        <input type="checkbox" v-else>

                        <label for="" @click="agreeAll">전체동의</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree1" v-model="agree1">
                        <label for="agree1">
                            (필수) 이용약관 동의
                            <a href="#" class="link">약관보기</a>
                        </label>
                    </div>

                    <div class="mt-4"></div>

                    <div class="m-input-textarea type01">
                        <div class="fake" id="agreement1">
                            {{ replaceBr(agreement1.content) }}
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree2" v-model="agree2">
                        <label for="agree2">
                            (필수) 개인정보처리방침 동의
                            <a href="#" class="link">약관보기</a>
                        </label>
                    </div>

                    <div class="mt-4"></div>

                    <div class="m-input-textarea type01">
                        <div class="fake" id="agreement2">
                            {{ replaceBr(agreement2.content) }}
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree4" v-model="agree4">
                        <label for="agree4">
                            (필수) 제3자정보제공동의
                            <a href="#" class="link">약관보기</a>
                        </label>
                    </div>

                    <div class="mt-4"></div>

                    <div class="m-input-textarea type01">
                        <div class="fake" id="agreement4">
                            {{ replaceBr(agreement4.content) }}
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree3" v-model="agree3">
                        <label for="agree3">(필수) 행사가입동의</label>
                    </div>
                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree5" v-model="agree5">
                        <label for="agree5">(필수) 영리성광고수신동의</label>
                    </div>
                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree6" v-model="agree6">
                        <label for="agree6">(필수) 만 14세 이상입니다.</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="is_agree_push" v-model="form.is_agree_push">
                        <label for="is_agree_push">(선택) 푸시(알람서비스) 수신 동의</label>
                    </div>

                    <div class="mt-16"></div>

                    <div class="comment">
                        회원가입이 어려우신 경우
                        <br/><a href="tel:15447166" class="point">콜센터 ☎1544-7166</a>로 문의해주세요.
                    </div>
                    <div class="mt-24"></div>

                    <button class="m-btn type02 width-100" @click="next">정보입력</button>
                </div>
            </div>
        </div>

        <div class="area-register" v-if="step === 2" @keydown="() => errors = ''">
            <!-- 내용 영역 -->
            <div class="container">
                <div class="wrap">
                    <div class="mt-40"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">이름</h3>

                        <div class="m-input-text type01">
                            <input type="text" placeholder="이름 입력" v-model="form.nickname">
                        </div>

                        <p class="m-input-error" v-if="errors.nickname" v-text="errors.nickname[0]"></p>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">생년월일</h3>

                        <div class="m-input-text type01">
                            <input type="text" maxlength="6" placeholder="6자리 숫자 입력 (660510)" v-model="form.birth">
                        </div>

                        <p class="m-input-error" v-if="errors.birth" v-text="errors.birth[0]"></p>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">내 지역 선택</h3>

                        <!-- <input-region @change="(data) => {form.district_id = data.district_id}"/> -->
                        <input-region
                            :districtContainer="container"
                            :initiationCalled="activeFinder"
                            @change="changeDistrict"
                        />

                        <p class="m-input-error" v-if="errors.district_id" v-text="errors.district_id[0]"></p>

                      <div class="mt-8">
                            <span style="color: red">*</span>행정동을 모르실 경우 찾기 버튼을 누르세요.  <button style="color: #0f38bd;" v-touch:tap="openFinder">찾기</button>
                        </div>
                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">연락처</h3>

                        <div class="m-input-text type01">
                            <input type="text" maxlength="11" placeholder="번호 입력(01077775555)" v-model="form.phone">
                        </div>

                        <p class="m-input-error" v-if="errors.phone" v-text="errors.phone[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">성별</h3>

                        <div class="m-input-checkboxes type01">
                            <div class="m-input-checkbox">
                                <input type="radio" id="남" value="남" v-model="form.gender">
                                <label for="남">남</label>
                            </div>
                            <div class="m-input-checkbox">
                                <input type="radio" id="여" value="여" v-model="form.gender">
                                <label for="여">여</label>
                            </div>
                        </div>

                        <p class="m-input-error" v-if="errors.gender" v-text="errors.gender[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-wrap">
                        <h3 class="m-input-title type01">추천인 연락처<span style="color: red">(숫자 11자리, 없을경우 빈칸)</span></h3>

                        <div class="m-input-text type01">
                            <input type="text" maxlength="11" placeholder="예:01077775555" v-model="form.referrer">
                        </div>

                        <p class="m-input-error" v-if="errors.referrer" v-text="errors.referrer[0]"></p>

                    </div>

                    <div class="mt-16"></div>

                    <div class="m-input-checkbox type01">
                        <input type="checkbox" id="agree" v-model="form.is_agree_privacy">
                        <label for="agree">개인정보 수집 및 이용에 동의함</label>
                    </div>

                    <div class="mt-24"></div>

                    <div class="m-btns type01">
                        <div class="m-btn-wrap">
                            <button type="submit" class="m-btn type02 width-100" @click="helpRegister">가입 도와주기</button>
                        </div>
                        <div class="m-btn-wrap">
                            <button type="submit" class="m-btn type02 width-100" @click="register">직접 가입하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Finder
            v-if="activeFinder"
            :title="'주소로 행정동 찾기'"
            :excecute="'변환하기'"
            :cancel="'검색하기'"
            @cancel="closeFinder"
            @setContainer="setContainer"
        />
       
    </div>

</template>

<script>
import common from '../../utils/common'
import InputRegion from "~/components/inputRegion";

export default {
    components: {InputRegion},
    auth: 'guest',
    mixins:[common],
    data() {
        return {
            activeFinder:false,
            container:{},
            step: 1,
            form: {
                nickname: "",
                birth: "",
                phone: "",
                gender: "남",
                referrer: "",
                district_id: "",
                is_agree_privacy: false,
                is_agree_push: false,
            },
            agree1: false,
            agree2: false,
            agree3: false,
            agree4: false,
            agree5: false,
            agree6: false,

            errors: {},
        }
    },
    async asyncData({$axios}) {
        const agreements = await $axios.$get('/data/agreements.json')
        return {
            agreements
        }
    },

    computed: {
        isAgreeAll() {
            return this.agree1 && this.agree2 && this.agree3 && this.agree4 && this.agree5 && this.agree6 && this.form.is_agree_push;
        },
        agreement1() {
            return this.agreements.find(agreement => agreement.category === 'agreement1')
        },
        agreement2() {
            return this.agreements.find(agreement => agreement.category === 'agreement2')
        },
        agreement4() {
            return this.agreements.find(agreement => agreement.category === 'agreement4')
        }
    },
    methods: {
        openFinder() {
            this.activeFinder = true;
        },
        closeFinder() {
            this.activeFinder = false;
        },
        setContainer(container) {
            this.container = container;
        },
        changeDistrict(data) {
            // this.form.district = data.district
            this.form.district_id = data.district_id
        },
        register() {
            if(!this.validateDate(this.form.birth)) {
                return alert('생년월일을 올바르게 입력해주세요.')
            }
            if(!this.form.is_agree_privacy)
                return alert("필수약관에 동의해주세요.");

            if(this.form.referrer && !this.validatePhone(this.form.referrer))
                return alert('추천인 전화 번호를 올바르게 입력해주세요. 예: 01012345678')
            // this.$axios.post("/api/auth/check-nickname", this.form).then((response) => {
            //     if(!response.data.result)
            //         return alert("금지된 이름입니다.");
            // });

            this.$axios.post("/api/auth/register", this.form)
            .then((response) => {
                this.login({
                    phone: this.form.phone,
                    password: this.form.birth,
                }, () => {
                    this.$router.push("/auth/success");

                        this.$store.commit("changeDistrict",this.$auth.user.district);
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.data)
                        this.errors = error.response.data.errors;
                });


        },
        helpRegister() {
            if(!this.validateDate(this.form.birth)) {
                return alert('생년월일을 올바르게 입력해주세요.')
            }
            if(!this.form.is_agree_privacy)
                return alert("필수약관에 동의해주세요.");

            if(this.form.referrer && !this.validatePhone(this.form.referrer))
                return alert('추천인번호는 11자리로 입력해주세요. 예: 01012345678')

            this.$axios.post("/api/auth/register", this.form)
                .then((response) => {
                    alert('가입신청 완료되었습니다.')
                    this.$router.push("/");
                })
                .catch(e => {
                    if(e.response && e.response.data)
                        this.errors = e.response.data.errors;
                });
        },

        agreeAll() {
            this.agree1 = true;
            this.agree2 = true;
            this.agree3 = true;
            this.agree4 = true;
            this.agree5 = true;
            this.agree6 = true;
            this.form.is_agree_push = true;
        },

        next() {
            if (this.step === 1) {
                if (!this.agree1 || !this.agree2 || !this.agree3 ||!this.agree4 || !this.agree5 || !this.agree6)
                    return alert("필수약관에 동의해주세요.");
            }

            this.step += 1;
        },

        login(data, callback) {
            this.$auth.loginWith('laravelSanctum', {data: data})
                .then((response) => {
                    callback();
                })
                .catch(e => {

                });
        },

        replaceBr(str) {
            const os = require('os');
            return str.replace(/<br>/g, os.EOL);
        }

    },

    mounted() {

    }
}
</script>

<style scoped>
    .fake {
        color: #999;
    }
</style>
