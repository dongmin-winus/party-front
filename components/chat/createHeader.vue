<template>
    <div>
        <!-- 헤더영역 -->
        <div class="m-header type01">
            <div class="wrap">
                <div @click="$router.back()">
                    <img src="/images/arrowLeft-black.png" style="width:10px;" />
                </div>
                <div class="selects">
                    채팅 회원 명단
                </div>
                <div class="utils">
                    <button class="btn-util">
                        <div class="m-input-text-wrap">
                            <div class="m-input-text type01">
                                <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word">

                                <i class="xi-search m-input-text-deco" @click="search"></i>
                            </div>
                        </div>
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
            active: false,
            activeFinder: false,
            activeSidebar: false,
            activeSearch: false,
            activeDisSearch: false,
            container: {},
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
    display: flex;
    width: 100%;
    justify-content: center;
    font-weight: 500;
    font-size: 20px;
}
</style>
