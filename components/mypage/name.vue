<template>
    <div class="m-board">
        <div class="m-board-fragments">
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <h3 class="title">
                            {{ replaceText(item.name, 2, '**') }}
                        </h3>
                    </div>

                    <div class="right" @click="$emit('makeProxyPhoneCall')">
                        <img :src="everCalled(item)" alt="">
                    </div>
                </div>

                <div class="m-board-bottom">
                    <p class="date">{{ computeDate }}</p>
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
            let date = new Date(this.item.created_at)
            return date.toISOString().replace('T',' ').replace(/\.\d{3}Z/, '');

        },
    },
    methods: {
        everCalled(item) {
            if(item.call_count) {
                return '/images/call_after.png'
            } else {
                return '/images/call_before.png'
            }
        }
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
