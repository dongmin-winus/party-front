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
                    <div class="">
                        <img :src="require(`@/assets/images/${$route.path === '/posts' ? 'newspaper_solid.png' : 'newspaper.png'}`)" alt="" style="width:21px;">
                    </div>
                    <h3 class="title">마을소식</h3> 
                </a>
            </div>
            <div :class="`nav-wrap ${$route.path === '/posts' ? '' : ''}`">
                <nuxt-link to="/volunteer/register" class="">
                    <div class="img-wrap organizational_position">
                        <div class="" :class="`${ $route.path === '/posts' ? 'organizational_tap_active' : 'organizational_tap' } `">
                            <img :src="require(`@/assets/images/${$route.path === '/posts' ? 'organizational_solid.png' : 'organizational.png'}`)" alt="" style="width: 23px;">
                             <h3 :class="`${$route.path === '/posts' ? 'organizational_title_active' : 'organizational_title'} `">조직활동</h3>
                        </div>
                       
                    </div>
                      
                  
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

<style>
.organizational_position {
    position: absolute;
    bottom: 10px;
    
}
.oranizational_icon {
    width: 36px;
    height: 34px;
}
.organizational_tap {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: white;
    filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.30));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.organizational_tap_active {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: white;
    filter: drop-shadow(0px 2px 6px rgba(11, 175, 0, 0.70));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.organizational_title
 {
    margin-top: 4px;
    font-size:12px; 
  
    color:#696969;
}
.organizational_title_active
 {
    margin-top: 4px;
    font-size:12px; 
    color:#0baf00;
}
</style>