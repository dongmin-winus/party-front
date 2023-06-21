<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div class="selects">
                    채팅
                </div>

                <div class="utils">
                    <button class="btn-util">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1033/search.png" style="width:18px;" alt="" @click="activeSearch = !activeSearch">

                        <form @submit.prevent="search" v-if="activeSearch">
                            <div class="m-input-text-wrap">
                                <div class="m-input-text type01">
                                    <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word">

                                    <i class="xi-search m-input-text-deco" @click="search"></i>
                                </div>
                            </div>
                        </form>

                    </button>
                    <button class="btn-util" @click="$router.push('/notices')">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1032/bell.png" style="width:17px;" alt="">

                        <span class="alert blbs orange" v-if="$auth.user && $auth.user.has_new_notice"></span>
                    </button>
                    <button class="btn-util" @click="activeSidebar = true">
                        <img src="/images/Vector.png" alt="" style='width:18px;'>
                    </button>
                </div>
            </div>
        </div>
        <modal
            v-if="activeDisSearch"
            @cancel="activeDisSearch = false"
        >
            <template #inner>
                <div class="m-pop-title">
                    <p class="subtitle">검색하신 마을에 방문합니다.</p>
                    <span class="point">동네 찾기</span>
                </div>

                <input-region 
                    :districtContainer="container"
                    @change="changeDistrict"
                />

                <div class="mt-20"></div>

                <button type="button" class="m-btn type03 width-100" @click="searchDis">검색하기</button>
                <div class="mt-8"></div>
                <div class="image-container" @click="activeFinder = true">
                    <img class="img" src="/images/village-search.png" alt="" >
                </div>
            </template>
        </modal>
        <Finder
            v-if="activeFinder"
            :title="'주소로 행정동 찾기'"
            :excecute="'변환하기'"
            :cancel="'검색하기'"
            @cancel="activeFinder = false"
            @setContainer="setContainer"
        />
    </div>

</template>
<script>
import common from '../utils/common'
export default {
    mixins: [common],
    data() {
        return {
            active: false,
            activeFinder: false,
            activeSidebar: false,
            activeSearch: false,
            activeDisSearch: false,
            container:{},
            searchingDistrict: {},
            form: {
                district: "",
                word: "",
            },
        }
    },

    methods: {
        handleActive() {
            this.active = !this.active;
            this.activeSearch = false;
        },
        setContainer(container) {
            this.container = container;
        },
        scrollTop() {
            window.scrollTo(0, 0);
        },

        search() {
            window.location.href = "/posts?word=" + this.form.word;
        },
        changeDistrict(data){
            if(data.district)
                this.searchingDistrict = data.district;
        },
        searchDis() {
            this.activeDisSearch = false;
            this.toDistrict(this.searchingDistrict);
        },

        toDistrict(district){
            // if(!this.$auth.user)
            //     return this.$router.push("/auth/login");
            if(district) {
                this.$store.commit("changeDistrict", district);

            }else {
                this.$store.commit("changeDistrict", {
                    id: 0,
                    district: "자유마을"
                });
                this.$router.push("/");
            }


            let route = this.$route.name;

            if(route === 'infos' || route === 'staff' || route === 'contacts' 
            || route === 'notices') {
                if(district)
                    location.href=`/${route}`;
            }else if(route === 'index') {
                location.href="/"
            }


            this.activeSidebar = false;
        },
        sideMenuToDistrict(district) {
            this.$store.commit("changeDistrict", district);
            location.href="/"

        },

        toMain(){
            this.$store.commit("changeDistrict", {
                id: 0,
                district: "자유마을"
            });

            location.href="/";

            this.activeSidebar = false;
        },

    },

    computed: {
        district(){
            return this.$store.state.district;
        }
    },

    mounted() {
    }
}
</script>
<style scoped>

.bottom > .utils:nth-child(2) {
    background-color: #fff !important;
    padding-bottom: 5px;
}

.bottom > .utils:nth-child(3) {
    padding-bottom: 40px;
}

.blbs {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse-black 2s infinite;
}


.blbs.orange {
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

.image-container .img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.selects{
    margin-left: 20px;
    font-weight: 500;
    font-size: 20px;
}
</style>
