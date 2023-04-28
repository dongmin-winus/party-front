<template>
  <div>
    <comment-navigation :commentable_id="form.commentable_id" :commentable_type="form.commentable_type" @created="(obj) => this.updateComment(obj)" />
    <div class="m-comments type01 p-5">
        <!-- <SingleComment v-for="item in items.data" :key="item.id" :item="item" :commentable_id="form.commentable_id" :commentable_type="form.commentable_type"/> -->
        <SimpleComment v-for="item in items.data" :key="item.id" :item="item" :commentable_id="form.commentable_id" :commentable_type="form.commentable_type"/>
    </div>

    <no-ssr>
        <infinite-loading @infinite="loadMore" v-if="items.links.next" />
    </no-ssr>
  </div>
</template>

<script>
import SimpleComment from '../simpleComment.vue';
export default {
    components: {
        SimpleComment
    },
    props: {
        commentable_id: {
            required: true
        },
        commentable_type: {
            default: "post"
        },
    },
    components: {},
    data() {
        return {
            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
                links: {}
            },

            form: {
                page: 1,
                commentable_id: this.commentable_id,
                commentable_type: this.commentable_type,
                align: "desc",
            },
        }
    },
    methods: {
        loadMore(state) {
            if(this.items.meta.current_page <= this.items.meta.last_page){
                this.form.page += 1;

                this.$axios.get("/api/comments", {
                    params: this.form
                }).then(response => {
                    this.items = {
                        ...response.data,
                        data: [...this.items.data, ...response.data.data]
                    };

                    state.loaded();
                });
            }
        },

        getItems(){
            this.form.page = 1;

            this.$axios.get("/api/comments", {
                params: this.form
            }).then(response => {
                this.items = response.data;
                this.items.data = this.items.data.filter(item => !item.deleted_at)
            });
        },
        updateComment(obj) {
            if(obj.type === 'add') {
                this.items.data = [obj.data, ...this.items.data];
                this.$emit('calculateCommentCount', 'add')
            }
            if(obj.type === 'remove') {
                this.items.data = [...this.items.data.filter(el => el !== obj.data)];
                this.$emit('calculateCommentCount', 'remove')
            }

        },
    },

    mounted() {
        this.getItems();
    }
}
</script>

<style scoped>
 .p-5 {
    padding: 5px;
 }
</style>
