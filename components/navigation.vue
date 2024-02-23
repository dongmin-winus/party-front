<template>
    <!-- 하단 네비게이션바 -->
    <div class="m-navigation type01">
        <div class="navs">
            <div :class="`nav-wrap ${$route.path === '/' ? 'active' : ''}`">
                <nuxt-link to="/" class="nav">
                    <div class="img-wrap">
                        <img :src="require(`@/assets/images/${$route.path === '/' ? 'home_solid.png' : 'home.png'}`)" alt="" style="width:21px;">
                    </div>

                    <h3 class="title">홈</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path.includes('/posts') ? 'active' : ''}`">
                <a href="/posts" class="nav">
                    <div class="">
                        <img :src="require(`@/assets/images/${$route.path.includes('/posts') ? 'newspaper_solid.png' : 'newspaper.png'}`)" alt="" style="width:21px;">
                    </div>
                    <h3 class="title">마을소식</h3> 
                </a>
            </div>
            <div :class="`nav-wrap ${$route.path.includes('/organization') ? '' : ''}`">
                <nuxt-link to="/organization" class="">
                    <div class="img-wrap organizational_position">
                        <div class="" :class="`${ $route.path.includes('/organization') ? 'organizational_tap_active' : 'organizational_tap' } `">
                            <h3 :class="`${$route.path.includes('/organization') ? 'organizational_title_active' : 'organizational_title'} `">
                                조직<br/>활동
                            </h3>
                        </div>
                    </div>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path.includes('/chat') ? 'active' : ''}`">
                <nuxt-link to="/chat" class="nav">
                    <div class="img-wrap">
                        <img v-if="$route.path.includes('/chat')" src="@/assets/images/chatActive.svg" alt="" style="width: 19px;"/>
                        <img v-else src="@/assets/images/chat.svg" alt="" style="width:19px;">
                        <!-- <img src="@/assets/images/chat-alt-2.png" alt="" style="width:19px;"> -->
                    </div>

                    <h3 class="title">채팅</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path.includes('/mypage') ? 'active' : ''}`">
                <nuxt-link to="/mypage" class="nav">
                    <div class="img-wrap">
                        <img :src="require(`@/assets/images/${$route.path === '/mypage' ? 'user_solid.png' : 'user.png'}`)" alt="" style="width:21px;">
                    </div>

                    <h3 class="title">내 정보</h3>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {

        }
    },

    methods: {
        organBlock() {
            alert('자유마을 조직 개편작업으로 인해 일시적으로 사용이 불가합니다');
        }
    },

    mounted() {

    }
}
</script>

<style>
.organizational_position {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0%);
}
.oranizational_icon {
    width: 36px;
    height: 34px;
}
.organizational_tap {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #0BAF00, #0A8803);
    filter: drop-shadow(0px 2px 6px rgba(11, 175, 0, 0.70));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.organizational_tap_active {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #0BAF00, #0A8803);
    filter: drop-shadow(0px 2px 6px rgba(11, 175, 0, 0.70));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid white;
}
.organizational_title
 {
    margin-top: 4px;
    font-size:16px; 
    color:white;
    line-height: 95%;
    padding-bottom: 5px;
}
.organizational_title_active
 {
    margin-top: 4px;
    font-size:16px;
    font-weight: 500; 
    color:white;
    line-height: 95%;
    padding-bottom: 5px;
}
</style>