<template>
    <div class="m-pop type01" id="pop2">
        <div class="m-pop-inner">
            <button class="btn-close m-script-pop" @click="close">
                <img src="/images/x.png" alt="" style="width:21px;">
            </button>
            <div class="nav-wrap">
                <profile-img id="img" :isDefaultImage="isDefaultImage" :imgUrl="profileImage" @change="(data) => this.changeData(data)"/>
            </div>
            <div class="m-input m-input-text type01">
                <input type="text" placeholder="이름 입력" v-model="form.nickname">
            </div>

            <div class="mt-20"></div>
            <button v-show="!isDefaultImage" type="button" class="m-btn type02 bg-red width-100" @click="deleteImg">프로필 삭제</button>
            <div class="mt-8"></div>
            <button type="button" class="m-btn type02 width-100" @click="save">저장하기</button>
        </div>
    </div>
</template>
<script>
// import InputThumbnail from "./form/posts/inputThumbnail.vue"
import ProfileImg from "./form/profileImg.vue"
export default {
    components: {
      // InputThumbnail,
      ProfileImg,
    },
    computed: {
        profileImage() {
            return this.imgUrl? 
                    this.imgUrl: 
                    this.$auth.user.img? 
                        this.$auth.user.img.url: 
                        '/images/profile_sample-preview.jpg';
        },
        isDefaultImage() {
          const regex = /\/([^\/]+)$/; // 슬래시 이후의 문자열을 그룹화
          const fileName = this.profileImage.match(regex)[1];
          return fileName === 'profile_sample-preview.jpg';
        },
    },
    data() {
        return {
            item: "",
            imgUrl: "",
            form: {
                nickname: "",
                profile_photo: "",
            },

            errors: {},

            activeLinkPop: false,
        }
    },

    methods: {

        async save() {
            let result = true;

            await this.$axios.post("/api/auth/check-nickname", this.form).then((response) => {
                if(!response.data.result)
                    result = false;
            });

            if(!result)
                return alert("금지된 닉네임입니다.");

            let form = new FormData();
            form.append("_method","PUT");
            form.append("nickname",this.form.nickname);
            form.append("profile_photo",this.form.profile_photo);
         
          try {
            const { data } = await this.$axios.post(`/api/auth/profile`, form)
            .then(response => {
                alert(response.data.message);
                this.$auth.setUser(response.data.data);
                this.isDefaultImage ? this.$emit('close',this.imgUrl) : this.$emit('close');
                // this.$emit('close',this.imgUrl);
            });
          } catch (error) {
            if (error.response && error.response.data)
              this.errors = error.response.data.errors;
          } 

        },
        async deleteImg() {
        
          this.form.profile_photo = "";

           try { 
                const {data} = await this.$axios.put(`/api/auth/image`, this.form)
                if(data.url) {
                  alert('기본 프로필로 설정되었습니다.');
                  this.imgUrl = data.url;
                }
            } catch (error) {
                if (error.response && error.response.data)
                this.errors = error.response.data.errors;
            } 
        },
        changeData(data) {
          if(data)
            this.imgUrl = `/${data.name}`;
          this.form.profile_photo = data;
        },
        close(){
            this.$emit("close");
        },



    },

    mounted() {
      this.form.nickname = this.$auth.user.nickname;
    }
}
</script>
<style scoped>
.image-wrapper {
      display: flex;
  justify-content: center;
  align-items: center;
}
.m-thumbnail.type03 {
    content:"";
    width:75px; height:75px;
    position:relative;
    background-size:cover; background-position:center; border-radius:100%;
    overflow:hidden;

}
</style>