<template>
    <label :for="id" class="profile">
        <input type="file" :id="id" accept="image/*" @change="changeFile" ref="file">

        <div :class="`img-wrap ${file || imgUrl ? 'active' : ''}`">
            <img :src="fileImgUrl" alt="" v-if="fileImgUrl">
            <img :src="imgUrl" alt="" v-else-if="imgUrl">
            <img src="/images/picturePlus.png" alt="" style="width:17px;" v-else>
        </div>
        <div class="mt-8"></div>
        <h3 class="title" v-if="!(this.file || this.imgUrl)">사진 선택</h3>
    </label>
</template>
<script>
export default {
    props: {
        imgUrl: {
            default(){
                return "";
            }
        },
        id: {
            default() {
                return "thumbnail";
            }
        },
        isDefaultImage: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        fileImgUrl(){
            if(this.file && !this.isDefaultImage)
                return URL.createObjectURL(this.file);
            return "";
        }
    },
    data(){
        return {
            file: "",
            img : "",
        }
    },


    methods: {
        changeFile(event) {
            this.file = event.target.files[0];
            this.$emit("change", this.file);
        },
        // remove(index){
        //     this.files = this.files.filter((img, indexData) => indexData != index);

        //     this.$emit("change", this.files.map(file => file.file));
        // }
    },


}
</script>

<style scoped>
  .profile {
    text-align: center;
  }
  .img-wrap {
    overflow: hidden;
  }
  .img-wrap.active img {
    width: 80px;
  }
</style>