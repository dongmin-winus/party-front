<template>
    <div class="m-board" @click="$emit('click')">
        <div class="m-board-fragments">
            <div class="m-board-fragment">
                <div class="m-board-top">
                    <div class="left">
                        <div class="left-container">
                            <div class="left-items">
                                {{ computeDate}}
                                
                            </div>
                            <div class="left-items middle">
                                {{item.name }}
                                
                            </div>
                        </div>
                        <!-- <h3 class="title">
                            {{ computeDate}}
                        </h3>
                        <p class="m-board-bottom" style="color: #AAAAAA" >{{ computeDate }} 가입</p> -->
                    </div>
                    <div class="right" @click.stop="$emit('makeProxyPhoneCall')">
                        <img :src="require(`@/assets/images/${everCalled(item)}`)" alt="">
                        <div v-if="showWhiteround(item)" class="white-round">{{ `${item.call_count && item.call_count > 1 ? item.call_count : 0}` }}</div>
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
            return this.formatDate(this.item.created_at, '/')
        },
    },
    methods: {
        everCalled(item) {
            if(item.call_count) {
                return 'call_after_improved.png'
            } else {
                return 'call_before.png'
            }
        },
        wWhiteround(item) {
            return item.call_count && item.call_count > 1
        }
    },

    mounted() {

    }
}
</script>

<style scoped>
    .m-board-top .left {
        width: 250px;
        height: 55px;
    }    
    .m-board-top .left .left-container {
        height:inherit;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .m-board-top .left .left-items {
        width: 50%;
        font-size: 18px;
    }
    .m-board-top .left .left-items.middle {
        text-align: center;
    }
    .m-board-top .right {
        position: relative;
    }
    .m-board-top .right .white-round {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #066500;
        background-color: white;
        color: #066500;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 15px;
        
    }
</style>
