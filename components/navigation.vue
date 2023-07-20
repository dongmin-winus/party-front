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

            <div :class="`nav-wrap ${$route.path === '/posts' ? 'active' : ''}`">
                <a href="/posts" class="nav">
                    <div class="img-wrap">
                        <img :src="require(`@/assets/images/${$route.path === '/posts' ? 'newspaper_solid.png' : 'newspaper.png'}`)" alt="" style="width:21px;">
                    </div>
                    <h3 class="title">마을소식</h3> 
                </a>
            </div>
            <div class="nav-wrap">
                <nuxt-link to="/scraps" class="nav">
                    <div class="img-wrap">
                        <img :src="require(`@/assets/images/${$route.path === '/scraps' ? 'scrap_solid.png' : 'scrap.png'}`)" alt="" style="width:21px;">

                    </div>

                    <h3 class="title">내 공유함</h3>
                </nuxt-link>
            </div>

            <div :class="`nav-wrap ${$route.path === '/chat' ? 'active' : ''}`">
                <nuxt-link to="/chat" class="nav">
                    <div class="img-wrap">
                        <img v-if="$route.path === '/chat'" src="@/assets/images/chatActive.svg" alt="" style="width: 19px;"/>
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

    },

    mounted() {

    }
}
</script>
