<template>
  <div class="area-somoim">
    <!-- 헤더 -->
    <div class="m-header type02">
      <div class="wrap">
        <div class="left">
          <button class="btn-util">
            <nuxt-link to="/">
                <img src="/images/back.png" alt="" style="width:10px;">
            </nuxt-link>
          </button>
        </div>

        <div class="center">
          <h3 class="title">마을 소모임</h3>
        </div>
        <div class="right"></div>
      </div>
    </div>

    <!-- 본문 -->
    <div class="container">

      <div class="mt-32"></div>
      <div class="wrap">
        <div class="m-title type01">
            <p class="sub02">빠르게 만나는 파라솔 소식</p>
            마을 소모임
        </div>
        <div class="mt-12"></div>
        <div class="m-input-text-wrap">
          <div class="m-input-text type01">
              <input type="text" placeholder="검색어를 입력해주세요." v-model="form.word">

              <i class="xi-search m-input-text-deco" @click="search(form.word)"></i>
          </div>
        </div>
        <div class="mt-12"></div>

        <div class="m-boards type01">
          <div :class="`m-board ${item.formatBoard}`" v-for="item in postItems" :key="item.id" @click="move(item)">
            <div class="m-board-top">
                  <div class="left">
                      <span :class="getParticipateClass(item.can_participate)">{{item.can_participate ? '모집중' : '모집마감'}}</span>
                      &nbsp;
                      <span class="title"> {{ sliceTitle(item.title) }}</span>
                  </div>
              </div>

              <div class="m-board-content">
                  <div class="infos" v-if="item.board === 'meetings'">
                      <div class="info">
                          <div class="icon-wrap">
                              <img src="/images/calendar-orange.png" alt="" class="icon" style="width:12px;">
                          </div>

                          <span>{{ item.start_date }} ~ {{ item.end_date }}</span>
                      </div>
                      <div class="info">
                        <div class="icon-wrap">
                          <img src="/images/marker-orange.png" class="icon" alt="">
                        </div>
                        <span>{{ item.address }}  {{ item.address_detail }}</span>
                      </div>
                      <div class="info">
                          <div class="icon-wrap">
                              <img src="/images/users-orange.png" alt="" class="icon" style="width:12px;">
                          </div>

                          <span style="color:#FF7C2E">{{item.participant_count}}</span> <span>명 참여중</span>
                      </div>
                  </div>

              </div>

              <div class="m-board-bottom">
                  <div class="tag light-orange">
                    <img src="/images/parasole.png" class="icon" alt="">
                    <span>파라솔</span>
                  </div>
              </div>
          </div>
        </div>
        <scroll-loading @load="loadMore" v-if="postLinks.next" />
      </div>
      <quicks 
        :createUrl="'/posts/create'"
        :btnName="'글쓰기'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import common from '@/utils/common.js'
export default {
  name: 'somoim-page',
  auth: false,
  mixins: [common],
  computed: {
    district(){
        return this.$store.state.district;
    },
    postItems() {
        return this.$store.getters.getPostItems;
    },
    postLinks() {
        return this.$store.getters.getPostLinks;
    },
    postMeta() {
        return this.$store.getters.getPostMeta;
    },
    y() {
        return this.$store.getters.getPostCurrentY;
    },
  },
  data() {
    return {
      activeState : true,
      activeCount : 3,
      form: {
          board: "meetings",
          page: 0,
          district_id: 0,
          word: this.$route.query.word ? this.$route.query.word: "",
      },

      windowTop: 0,
    }
  },
  methods: {
    ...mapActions(['FETCH_POST_ITEMS','FETCH_POST_LINKS','FETCH_POST_META','FETCH_POST_Y','CLEAR_POST_STATE']),
        loadMore(state) {
            if(this.postMeta.current_page <= this.postMeta.last_page){
                this.form.page = this.postMeta.current_page + 1;

                this.$axios.get("/api/posts", {
                    params: this.form
                }).then(response => {
                    const data = response.data;
                    // let newData = 
                    this.FETCH_POST_ITEMS([
                        ...this.postItems,
                        ...data.data
                    ]);
                    this.FETCH_POST_LINKS(data.links);
                    this.FETCH_POST_META(data.meta);
                    // this.items = {
                    //     ...response.data,
                    //     data: [...this.items.data, ...response.data.data]
                    // };

                    state.loaded();
                });
            }
        },

        //item.user.nickname 을 받아서 6자 이후로는 ... 으로 처리
        replaceText(content){
            if(content.length > 6){
                return content.substring(0,6) + '...';
            }else{
                return content;
            }
        },

        async getItems(){
            this.form.page = 1;

            this.$axios.get("/api/posts", {
                params: this.form
            }).then(response => {
                // this.items = response.data;
                const data = response.data;
                this.FETCH_POST_ITEMS(data.data);
                this.FETCH_POST_LINKS(data.links);
                this.FETCH_POST_META(data.meta);

            });
        },

        replaceContent(content) {
            let replaced = content.replace(/<\/?[^>]+>/ig, " ").replace(/&\s?nbsp;/ig, " ").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g,'&');
            return replaced;
        },

        move(item){
            this.$router.push("/somoim/" + item.id);
        },

        toggleLike(e, item){
            let tempItem = {...item};
            e.preventDefault();
            e.stopPropagation();
            if(!this.$auth.user) {
                this.$router.push("/auth/login");
                return;
            }
            if(tempItem.is_like){
                tempItem.is_like = 0;
                tempItem.like_count -= 1;
            }else{
                tempItem.is_like = 1;
                tempItem.like_count += 1;
            }

            this.FETCH_POST_ITEMS(this.postItems.map(itemData => {
                if(itemData.id == tempItem.id)
                    return tempItem;
                return itemData;
            }));
            // this.items.data = this.items.data.map(itemData => {
            //     if(itemData.id == item.id)
            //         return item;

            //     return itemData;
            // });

            this.$axios.put("/api/likes/posts/" + item.id);
        },

        search(word) {
            if(!word) {
                window.location.href = "/somoim";
            }else {
                window.location.href = "/somoim?word=" + this.form.word;
            }
        },

        getParticipateClass(isClosed) {
            if(isClosed == 0) {
                return 'category closed';
            }else {
                return 'category';
            }
        },

        sliceTitle(title) {
            if(title.length > 10) {
                return title.slice(0,10) + '...';
            }else {
                return title;
            }
        },
        

        onScroll(e) {
            this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
        }
  },
  async mounted() {
        if(this.postItems.length === 0) {
            await this.getItems();
        }else if (this.$route.params.deleted) {
            await this.getItems();
            window.scrollTo(0,this.y)
        }else {
            window.scrollTo(0,this.y)
        }
        window.addEventListener('scroll', this.onScroll)
            
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
        this.FETCH_POST_Y(this.windowTop);
        if(this.$route.name !== 'posts-id') {
            this.CLEAR_POST_STATE();
        }
    }
}
</script>

<style>
  .m-board-bottom .tag {
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 50px;
    width: 80px;
  }
  .m-board-bottom .light-orange {
    background: rgb(255,216,192);
  }
</style>