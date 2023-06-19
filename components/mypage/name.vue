<template>
    <div class="m-board" @click="$emit('click')">
        <div class="m-board-fragments">
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <h3 class="title">
                            {{ item.name }}
                        </h3>
                        <p class="m-board-bottom" style="color: #AAAAAA" >{{ computeDate }} 가입</p>
                    </div>
                    <div class="right" @click.stop="$emit('makeProxyPhoneCall')">
                        <img :src="everCalled(item)" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from '../../utils/common.js'
export default {
    mixins: [common],
    props: {
        item: {
            required: true
        },

    },

    components: {},
    auth: true,
    data() {
        return {
            form: {
                page: 1,
            },
            active: false,
        }
    },
    computed: {
        computeDate() {
            return this.formatDate(this.item.created_at)
        },
    },
    methods: {
        everCalled(item) {
            if(item.call_count) {
                return '/images/call_after.png'
            } else {
                return '/images/call_before.png'
            }
        },
        getCheckImg(item) {
            if( item.call_count) {
                return '/images/ppl_checked.png'
            } else {
                return '/images/ppl_unchecked.png'
            }
        },
    },

    mounted() {

    }
}
</script>

<style scoped>
    
</style>
