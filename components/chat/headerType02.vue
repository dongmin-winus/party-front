<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div class="selects">
                    채팅 채널
                </div>
                <div class="utils">
                    <button class="btn-util">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1033/search.png" style="width:18px;" alt=""
                            @click="searchClick">
                            <div class="m-input-text-wrap" v-if="activeSearch">
                                <div class="m-input-text type01">
                                    <input type="text" placeholder="이름을 입력해주세요." @input="change" v-model="search">
                                    <i class="xi-search m-input-text-deco"></i>
                                </div>
                            </div>
                    </button>
                    <button class="btn-util">
                        <img src="https://dotmzh1fysixs.cloudfront.net/1032/bell.png" style="width:17px;" alt="">

                        <span class="alert blbs orange" v-if="$auth.user && $auth.user.has_new_notice"></span>
                    </button>
                    <button class="btn-util" @click="$router.push('/chat/create')">
                        <img src="@/assets/images/Vector.svg" alt="" style='width:18px;'>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import common from '../../utils/common'
export default {
    mixins: [common],
    data() {
        return {
            search:"",
            activeSearch: false,
        }
    },

    methods: {
        searchClick(){
            this.$emit('headerSearch', !this.activeSearch)
            this.activeSearch = !this.activeSearch
        },
        change(e) {
            this.search = e.target.value
        },

    },
    watch: {
        search() {
            this.$emit('searchData', this.search)
        }
    },
    computed: {
    },

    mounted() {
    }
}
</script>
<style scoped>
.bottom>.utils:nth-child(2) {
    background-color: #fff !important;
    padding-bottom: 5px;
}

.bottom>.utils:nth-child(3) {
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

.image-container .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.selects {
    margin-left: 20px;
    font-weight: 500;
    font-size: 20px;
}


</style>
