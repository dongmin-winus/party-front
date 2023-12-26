<template>
    <div class="m-board" >
        <div class="item-container">
            <div class="items">
                {{ computeDate}}
                
            </div>
            <div class="items " @click="$emit('clickName')">
                {{item.name }}
                
            </div>
            <div class="items " @click="$emit('clickNumber')">
                {{item.manager_name?.split(',').length }}
                
            </div>
            <div class="items">
                <img class="call_image" :src="require(`@/assets/images/${everCalled(item)}`)" alt="">
                <div v-if="showWhiteround(item)" class="white-round">{{ `${item.call_count && item.call_count > 1 ? item.call_count : 0}` }}</div>
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
        showWhiteround(item) {
            return item.call_count && item.call_count > 1
        }
    },

    mounted() {

    }
}
</script>

<style scoped>
    /* .m-board-top .left {
        width: 300px;
        height: 55px;
    }     */
    .m-board .item-container{
        height:inherit;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        /* width:100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 50px; */
    }
    .m-board .item-container .items {
        width: 40%;
        font-size: 16px;
        text-align:center;
        position: relative;
    }

     .m-board .items .iems .call-image {
        bottom: -5px;
        right: 15px;
        width: 20px;
        height: 20px;
     }

    .m-board .items .white-round {
        position: absolute;
        bottom: -5px;
        right: 15px;
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
