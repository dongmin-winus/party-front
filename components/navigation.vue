<template>
    <!-- 하단 네비게이션바 -->
    <div class="m-navigation type01">
        <div class="navs">
            <div :class="`nav-wrap ${$route.path === '/' ? 'active' : ''}`">
                <nuxt-link to="/" class="nav">
                    <div class="img-wrap">
                        <img :src="`${$route.path === '/' ? '/images/home_solid.png' : '/images/home.png'}`" alt="" style="width:21px;">
                    </div>

                    <h3 class="title">홈</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path === '/posts' ? 'active' : ''}`">
                <a href="/posts" class="nav">
                    <div class="img-wrap">
                        <img :src="`${$route.path === '/posts' ? '/images/newspaper_solid.png' : '/images/newspaper.png'}`" alt="" style="width:21px;">
                    </div>
                    <h3 class="title">마을소식</h3> 
                </a>
            </div>
            <div class="nav-wrap">
                <nuxt-link to="/scraps" class="nav">
                    <div class="img-wrap">
                        <img :src="`${$route.path === '/scraps' ? '/images/scrap_solid.png' : '/images/scrap.png'}`" alt="" style="width:21px;">

                    </div>

                    <h3 class="title">내 공유함</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path === '/chat' ? 'active' : ''}`">
                <nuxt-link to="/chat" class="nav">
                    <div class="img-wrap">
                        <img v-if="$route.path === '/chat'" src="/images/chatActive.svg" alt="" style="width: 19px;"/>
                        <img v-else src="/images/chat.svg" alt="" style="width:19px;">
                        <!-- <img src="/images/chat-alt-2.png" alt="" style="width:19px;"> -->
                    </div>

                    <h3 class="title">채팅</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path.includes('/mypage') ? 'active' : ''}`">
                <nuxt-link to="/mypage" class="nav">
                    <div class="img-wrap">
                        <img :src="`${$route.path === '/mypage' ? '/images/user_solid.png' : '/images/user.png'}`" alt="" style="width:21px;">
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

    },

    mounted() {

    }
}
</script>
